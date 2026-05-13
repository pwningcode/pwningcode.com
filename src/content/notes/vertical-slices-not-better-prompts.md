---
title: 'Vertical slices, not better prompts'
description: "What I learned running hundreds of Claude Code tasks overnight, breaking everything, and why vertical integration tests got me further."
pubDate: 2026-05-13
draft: false
tags: ['claude-code', 'agents', 'foreman']
cover:
  stats:
    - "27 iterations"
    - "90 endpoints fixed"
    - "243 tests · 19 scenarios"
    - "~1hr on Opus 4.7, AFK"
---

> 27 iterations to fix 90 distinct method/path combinations. 243 test cases across 19 scenarios. About an hour on Opus 4.7. AFK.

I tried plan decomposition. Then decomposition into smaller tasks to keep context small. Then I ran hundreds of tasks overnight expecting to wake up to a working feature. I woke up to a broken repo.

Prompts and plans are not enough. Not for anything beyond simple changes.

What got me past it: pinning the unit of work to vertical slices, writing acceptance tests as the source of truth, and splitting the agent loop into a context-light orchestrator and a context-heavy fixer. The rest of this post is how that breaks down.

**Contents**

- [Claude develops horizontally](#claude-develops-horizontally)
- [Vertical slices, with tight feedback](#vertical-slices-with-tight-feedback)
- [Precondition: you need the patterns first](#precondition-you-need-the-patterns-first)
- [Step 1: generate the integration tests](#step-1-generate-the-integration-tests)
- [Step 2: orchestrator and fixer, not one agent](#step-2-orchestrator-and-fixer-not-one-agent)
- [Results](#results)
- [What this doesn't fix](#what-this-doesnt-fix)
- [In summary](#in-summary)

## Claude develops horizontally

If you plan a feature with Claude it will identify all the bits and bobs across every layer that need to change, outline them for you, and everything will "look" just fine. You approve the plan and the output is not quite what you expected. Claude prefers to code in layers, from the bottom up; the database migrations, the repositories, the services, the API, then the web site, and maybe some unit tests.

This isn't really a Claude bug. Humans do the same thing handed a flat task list without acceptance criteria — we just do it slower and get bored before the damage compounds. Agents don't get bored. They'll happily build the next layer on top of the wrong assumption all night.

I've tried TDD and Integration Tests both. Hundreds of passing tests; in isolation. It looks like progress, except it isn't. It's a thin film of code across the whole feature, with few end-to-end paths that actually work.

The schema is half-right because the API isn't designed yet. The API stubs out features the UI doesn't need. The UI is wired to endpoints that don't return real data. The tests pass because they assert on the stubs.

This is the horizontal failure mode, and it gets worse the bigger the plan is, the bigger the project, and the bigger the repo. More tasks, more shallow passes, more places where the pieces don't quite line up. You can't fix this with better prompts. The prompt isn't the problem. The unit of work is.

## Vertical slices, with tight feedback

My latest iteration is to concentrate planning on acceptance tests of vertical slices and have Claude iterate until those acceptance tests pass.

The idea is to have Claude (or sub-agents) concentrate on a single route from top to bottom instead of bottom up. I spent a lot of time mocking up the web UI and I wanted the data contracts that drive the UI to be the source of truth.

The trick is enforcing the slicing. Claude will not slice on its own. Asked to build a feature, it will spread wide every time. You have to constrain it.

## Precondition: you need the patterns first

A caveat that's load-bearing enough to deserve its own heading: this only worked because I already had architectural patterns in place from hours and hours of semi-successful prompting. Feature-based monorepo boundaries, Zod contracts as the single source of validation, the `apps/web → libs/web-api-client → apps/web-api → DB` shape locked in.

Without that, Claude would generate integration tests that encode the wrong contracts, and the fixer loop would ratchet you toward the wrong design — fast and confidently. The integration tests are only a useful spec when the shape they're encoding is already roughly right.

If your project is greenfield, do this in a smaller scope first: build one feature horizontally and slowly, then use that as the pattern Claude generates tests against. `// TODO: Make a skill for this`

## Step 1: generate the integration tests

I prompted Claude to scour the web UI and generate the integration test suite. The shape of the prompt: import the real `web-api-client`, no mocks, one test per route + method, scenarios that chain (add → update → delete) so the DB state composes, output a machine-readable `last-run.json` for the orchestrator to read later. Full prompt below if it's useful.

> The UI's request/response contracts are the source of truth. The tests assert what a real user gets, with no mocks in the middle.

<details>
<summary>Full prompt — generate the suite</summary>

```markdown
I would like us to create an integration test suite specificly towards exercising the "apps/web <-> apps/web-api-client <-> apps/web-api <-> database" vertical to ensure that ALL expectations are met from the apps/web UI perspective. The request/response contracts consumed by the web app are the source of truth.

I want every possible route vertical to be tested. For each vertical, this should help ensure:

- request/response contracts are correct and properly hydrated with the data the UI expects
- the web-api-client is properly configured and typed
- routes are valid and tested
- the API does as expected for each route
- validations are exercised (good and bad)
- the database schema supports what is expected

Do:
- write an integration test for each route and each method
- cooridinate tests so that data is clear, expected, and supports integration tests (add, then update, then delete for instance)
- integration tests should output each test's status in a clean, easy to understand, human readable format that can then be fed back to Claude to address issues
- add a 'npm run integration:web' script for easy execution
- import and use the web-api-client directly (integration scripts will be written in TypeScript)
- add the tests to the tests/integration/suites/web folder
- write test scripts to match the expectations of the apps/web UI
- we are only writing tests: scour the UI code to indentify expected behavior and results (using multiple data scenerios) and write use-case style integration tests

Don't:
- change any application code to meet the expectations of the integration tests (we will address issues later)
- update or change any existing integration tests
- don't reference any other NX projects that are not the source of truth
```

</details>


Once the tests were written, they all failed — kind of. Gotchas I forgot to itemize up front: rate-limit middleware tripping on the test runner (good, that meant the middleware worked), no seed data, no test user with a known password/token. Once those were in, I was in business.

## Step 2: orchestrator and fixer, not one agent

This is the real meat and potatoes. To go AFK, I split the work into two agents:

- **The orchestrator** never reads source files. Its entire view of the world is the `summary` block and failing test names from `last-run.json` (read through a narrow `jq` slice) and a running in-context log with three sections: baseline, fixed, parked. Each iteration it spawns one sub-agent, reads back a ~200-word structured summary, and updates the log.
- **The fixer** runs in a fresh context per iteration. It reads the skill file, picks one failing test, traces it through allowed-scope code only (`web-api-client`, `web-api-contracts`, `web-api`), makes the minimal change, re-runs the suite, and exits with a structured summary.

The reason this works is that the orchestrator's context window stays tiny. It never sees test output, never sees source files, never accumulates the state of 27 iterations of debugging. That state lives in the log it maintains, which is intentionally small. The fixers burn context on the work and throw it away. You get coherence without long-context degradation.

> Long contexts rot. Fresh fixer per iteration, orchestrator stays small. That's the whole trick.

Both prompts are below.

<details>
<summary>Orchestrator prompt</summary>

```markdown
# Fix Web Integration Tests — Orchestrator

You are the **orchestrator** for an AFK run that fixes the web integration
suite. You do not fix tests yourself. Your only job is to spawn one
sub-agent per iteration, track progress in a small running log, and stop
when the suite is green or no further progress is possible.

This pattern keeps your context window tiny — sub-agents burn their own
context on the work and exit. You never read test output, source files,
or `last-run.json` excerpts beyond the small slice you need to decide
whether to keep going.

## Setup (run once at start)

1. Read `tests/integration/suites/web/fix-expectations-skill.md` once so
   you know what each sub-agent will be doing. Do **not** quote it back
   to the user; you don't need to.
2. Run the suite once to establish a baseline:


   npm run integration:web


3. Read **only** the `summary` and the list of failing test names from
   `tests/integration/suites/web/last-run.json`. Use a narrow read:


   jq '{summary, failures: [.scenarios[].tests[] | select(.passed == false)] | map(.name)}' tests/integration/suites/web/last-run.json


   Record the baseline `failed` count. This is your starting point.

4. Initialize an in-context log with three sections (keep this updated
   throughout the run — it is the only persistent state across
   iterations):


   ### Run log
   - Baseline: failed=N (list)

   ### Fixed
   (empty)

   ### Parked
   (empty)


## Iteration loop

Repeat until a stop condition fires (see "Stop conditions" below).

### Step 1 — Spawn a sub-agent

Use the `Agent` tool with `subagent_type: "general-purpose"`. The
sub-agent runs in a fresh context with no memory of prior iterations.
Give it a fully self-contained prompt — do not assume it has read
anything.

Sub-agent prompt template (fill in `<CURRENT_FAILED_COUNT>` and
`<PARKED_TEST_NAMES>` from your log):


You are doing ONE iteration of an autonomous test-fixing loop.

Read the full instructions at:
tests/integration/suites/web/fix-expectations-skill.md

That file is your spec. Follow it strictly. In summary: the web
integration suite has failing tests; fix the code (in the allowed
scope only) to make ONE failing test pass.

Constraints specific to this iteration:
- Pick ONE failing test that is NOT in this parked list:
  <PARKED_TEST_NAMES>
- Make the minimal code change to fix it.
- Verify by running `npm run integration:web` and reading
  `tests/integration/suites/web/last-run.json`.
- The current `summary.failed` count is <CURRENT_FAILED_COUNT>. After
  your fix, the new count must be <CURRENT_FAILED_COUNT> - 1 OR you
  must park the test (if it is blocked per the skill rules).
- Do not attempt more than one test. Exit as soon as one is fixed or
  parked.

Return a short structured summary (under 200 words):
- OUTCOME: "fixed" | "parked" | "no-progress"
- TEST: scenario + test name you targeted
- FILES: list of files you modified (allowed scope only)
- REASON: one sentence — what was wrong, or why parked
- NEW_FAILED_COUNT: from the new last-run.json
- NEW_PARKED: any test name you concluded should be parked


### Step 2 — Update the log

Read the sub-agent's structured summary. Update your in-context log:

- `OUTCOME: fixed` → add an entry under **Fixed** with the test name
  and files changed. Update current failed count.
- `OUTCOME: parked` → add to **Parked** with test name + reason.
  Failed count stays the same; that test is excluded from future
  iterations.
- `OUTCOME: no-progress` → the sub-agent could not move the needle.
  Add the test name to **Parked** with reason "no-progress" so the
  next sub-agent skips it. Increment a `noProgressStreak` counter.

Reset `noProgressStreak` to 0 on any `fixed` outcome.

### Step 3 — Decide whether to continue

Check stop conditions (next section). If none fire, loop back to Step 1.

## Stop conditions

Stop the loop and produce the final report when **any** of these are
true:

1. **Suite is green.** `summary.failed === 0` in the latest
   `last-run.json`. (You can verify with the same `jq` command from
   setup; do **not** read the whole file.)
2. **Nothing left to fix.** Every currently-failing test name appears in
   your **Parked** list.
3. **Stalled.** `noProgressStreak >= 2`. Two iterations in a row failed
   to move the failed count down or park anything new — further
   iterations are unlikely to help.
4. **Hard infra failure.** A sub-agent reports the suite cannot run at
   all (bootstrap crash, DB unreachable, web-api won't start, runner
   throws). Surface this immediately — do not keep spawning sub-agents
   against broken infra.
5. **Iteration cap.** You have run **30 iterations**. This is a safety
   valve against runaway cost; if you hit it, stop and report.

## Final report

When the loop ends, output **one** consolidated report to the user.
Format:


## Web integration suite — AFK run complete

**Final status:** passed=X, failed=Y, skipped=Z (from last-run.json)
**Iterations run:** N
**Stop reason:** <suite green | nothing left to fix | stalled | infra | cap>

### Fixed (M tests)
- <Scenario › Test name> — <files changed>
- ...

### Parked (K tests)
- <Scenario › Test name> — <reason>
  - Hypothesis: <one line on what the human would need to decide>
- ...

### Notes
<anything the human should know — e.g. "infra failure stopped run early",
or "two scenarios contradict each other on field X — needs human call">


Do **not** produce intermediate reports. Silence between iterations is
expected and correct.

## Rules of engagement (orchestrator-level)

- **Never edit code yourself.** Spawn a sub-agent for any code change.
- **Never read source files** other than `last-run.json` (narrow
  `jq` slices only) and the skill file once at startup. Sub-agents do
  the reading.
- **Never relax the skill rules.** If a sub-agent reports a test was
  fixed by editing `apps/web` or another out-of-scope path, treat that
  as a regression — record it under **Parked** with a "violation: rolled
  back" note and ask the next sub-agent to revert. The skill is the
  contract.
- **Sub-agents run sequentially**, not in parallel. The DB state and
  `last-run.json` are shared, so concurrent runs would corrupt both.
- **Don't summarize iterations to the user mid-run.** One report at
  the end.

## Quick mental model


orchestrator (this prompt)
  └── reads last-run.json summary
  └── for each iteration:
        spawn general-purpose sub-agent
          └── reads skill file
          └── fixes one test
          └── verifies via npm run integration:web
          └── returns a short summary
        update Fixed/Parked log
        check stop conditions
  └── emit final consolidated report


That's it. Start by reading the skill file, run the baseline suite, and
begin the loop.
```

</details>

<details>
<summary>Fixer prompt</summary>

```markdown
# Fix Web Integration Test Expectations

You are iteratively making the web integration suite pass. Run this prompt
repeatedly. Each iteration: pick the next failing test, fix the underlying
code, re-run, repeat. Stop when the suite is fully green (or only
`expectedFailure: true` tests are still failing).

## Goal

`npm run integration:web` passes. The integration tests are the spec — they
encode what an authenticated `apps/web` user expects from the
`apps/web → libs/web-api-client → apps/web-api → DB` path. We change the
**code** to match the test, not the test to match the code.

## Allowed scope (you may modify)

- `libs/web-api-client/`
- `libs/web-api-contracts/`
- `apps/web-api/`

## Out of scope (DO NOT modify)

- `tests/**` — never edit the integration tests, runner, scenarios, helpers,
  bootstrap, or types. If a test seems wrong, surface it; do not "fix" it.
- `apps/web/**` — this is the source of truth. It already does what the
  user expects. Read it for reference; never change it.
- Any other `apps/*` or `libs/*` project not listed in "Allowed scope".
  Treat them as in-flux refactor zones with wrong logic — do not read
  them for patterns, do not import from them, do not let them inform your
  fix.

## Source of truth

When a test asserts a behavior, the truth-stack is:

1. The test itself (what it asserts is what the user expects).
2. `apps/web/` — when the test is ambiguous, look at how `apps/web`
   constructs the request, parses the response, or names a field. That is
   what real users get. The downstream code should serve `apps/web`.
3. `libs/web-api-contracts/` — the wire contract `apps/web` and the API
   share. Drift here is the most common cause of failure.

If `apps/web` and another package disagree, `apps/web` wins and the other
package is wrong.

## Iteration loop

1. **Run the suite.**

   npm run integration:web

   Report-only check: read `tests/integration/suites/web/last-run.json` for
   structured failures (each failure includes `expectation`, `request`,
   `response`, and `error`).

2. **Pick one failing test.** Prefer the lowest-numbered scenario with a
   real failure. Skip tests whose `expectedFailure: true` flag is set —
   those are tracked feature gaps, not bugs (see the "Expected failures"
   list in `tests/integration/suites/web/README.md`). If all remaining
   failures are `expectedFailure`, the suite is effectively green — stop.

3. **Reproduce the failure mentally.** From the JSON failure entry:
   - Read the `expectation` — that is what the user expects.
   - Read the scenario file at
     `tests/integration/suites/web/scenarios/<NN>-*.scenario.ts` for the
     full assertion (READ ONLY — do not edit).
   - Read `request` and `response` snapshots to see what actually
     happened.

4. **Trace the path.** Walk the request through allowed-scope code only:
   - `libs/web-api-client/` — how the client call is built.
   - `libs/web-api-contracts/` — request/response Zod schemas.
   - `apps/web-api/` — the route handler, validation, response shaping.
   Cross-reference with `apps/web/` (read-only) to confirm what the user
   actually expects. Do not look at any other project for "how it's done."

5. **Form a hypothesis.** Be explicit: "The test expects X. The code does
   Y. The fix is to change Z in `<file>:<line>` so the path produces X."
   If the contract is the gap, fix it in `libs/web-api-contracts/` and
   propagate to client + api.

6. **Make the minimal change.** Edit only files in the allowed scope.
   - Don't refactor adjacent code.
   - Don't add features not required by the failing test.
   - Don't add error handling for impossible cases.
   - Match existing style.
   - If a contract change creates a type error in `apps/web`, **stop and
     surface it** — `apps/web` is the source of truth and out of scope.
     The contract is probably wrong; rethink the fix.

7. **Verify locally.** Before re-running the full suite:

   nx run web-api-contracts:build
   nx run web-api-client:build
   nx run web-api:typecheck   # or build

   Run only the projects you touched. Fix any type errors before moving
   on.

8. **Re-run the suite.**

   npm run integration:web

   Confirm the targeted test now passes and no previously-passing test
   regressed. Read `last-run.json` for the diff. If a previously passing
   test now fails, your fix has unintended scope — narrow it.

9. **Repeat from step 1** until the suite is green.

## Rules of engagement

- **Never modify tests.** If a test looks wrong, document it in your
  response and stop — do not edit it.
- **Never modify `apps/web`.** It is the spec.
- **Never read or import from out-of-scope projects.** If you find
  yourself wanting to copy a pattern from `apps/*` or `libs/*`,
  stop — the answer lives in `apps/web` + the test.
- **Don't run migrations.** Per project rules, migrations are applied by
  the developer. The integration suite's bootstrap handles `db:reset` on
  its own; don't run it manually outside the suite.
- **Don't start `web-api:dev`.** The suite owns the API lifecycle. Kill
  any stray instance before running.
- **No `expectedFailure` chasing.** If a failing test is tagged
  `expectedFailure: true`, leave it alone unless the user explicitly
  asked for it.
- **One failure at a time.** Resist batching fixes — small, verified
  changes regress less.
- **No silent catches, no `z.any()`, no default exports.** Standard
  project rules apply.

## Keep going — the human may be AFK

The human running this prompt is likely **away from keyboard**. Do not
pause work to ask a question whenever you can possibly skip the blocker
and keep making progress on other tests.

**Default behavior is forward motion.** When a single test would require
out-of-scope changes, contradicts `apps/web`, or is otherwise blocked:

1. Add it to a running "blocked" list (in your working notes).
2. Move on to the next failing test.
3. Keep iterating until you have exhausted every test you can fix
   without violating the rules.
4. **Only at the very end**, once you can no longer make forward
   progress on any remaining failure, surface the full blocked list to
   the human in one consolidated report.

This means: blocked tests do not end the run. They get parked. You move
to the next scenario, the next test, the next file. You report blockers
as a batch at the end, not one at a time.

### Park a test (don't surface) when:

- A fix would require editing `apps/web` or any out-of-scope project —
  note it and move on.
- A test's expectation appears to contradict `apps/web` — note both
  sides and move on.
- Two scenarios contradict each other — note both and move on.
- The fix is non-obvious and you'd want a second opinion — try once
  with your best hypothesis; if it makes things worse, revert and park
  it.

### Hard stop (surface immediately) only when:

- The suite cannot run at all (bootstrap crashes, DB unreachable,
  `web-api` won't start, runner/reporter throws).
- The DB is in an unexpected state and the suite's own `db:reset`
  doesn't recover it.
- A change you made caused regressions you cannot undo.
- You have no remaining unblocked failures and want to report the
  parked list.

In short: **fix everything you can, park what you can't, surface once at
the end.** Silence between iterations is fine — keep working.

## Success criteria

The run is "done" when one of:

- `npm run integration:web` reports `failed: 0` (verify via
  `tests/integration/suites/web/last-run.json` — `summary.failed === 0`).
  `expectedFailure: true` tests always report as passing regardless of
  actual outcome, so they don't affect this count.
- Every remaining failure is **parked** (out-of-scope, contradicts
  `apps/web`, etc.) and you have no more unblocked tests to attempt.

When you finish, produce one consolidated end-of-run report containing:

- **Fixed:** list of tests that now pass, with the file(s) you changed.
- **Parked:** list of tests still failing, each with: scenario+test
  name, the rule that blocked you (out-of-scope, contradicts
  `apps/web`, infra, etc.), and a short hypothesis for what the human
  would need to decide or change.
- **Suite status:** the final `summary.passed` / `summary.failed` /
  `summary.skipped` from `last-run.json`.

Do not surface the parked list mid-run. One report, at the end.
```

</details>

Then I just ask Claude to run the orchestrator while I'm AFK.

## Results

First gap was missing routes — a quick "code review" session of the test suite in a clean session caught it. Always review the generated tests from a separate context; don't let the agent that wrote them grade its own work.

The orchestrator took 27 iterations to fix 90 distinct method/path combinations across 243 test cases in 19 scenarios. About an hour on Opus 4.7. From prompt-fixing never-ending UI ↔ API bugs to every endpoint working.

## What this doesn't fix

Vertical slices with acceptance tests proved to be pretty powerfull. They are not the whole job. Other things to consider though:

- **Cross-slice drift.** Each slice green, A + B + C broken. Slices are the right unit for *building*; they're a terrible unit for noticing that the whole system is rotting one passing test at a time. You still need someone (or something) reading across slices for coherence. Maybe some use-case based integration tests or stress tests would help.
- **Security-by-absence.** The tests assert intended behavior. They do not assert the absence of unintended behavior — auth bypass, IDOR, SQL injection, plan-gating side doors. An agent following acceptance tests will happily ship a working feature with an open door next to it.
- **The unsaid.** The agent builds what's specified. If idempotency isn't in the spec, it isn't in the code. If retries aren't in the spec, neither is backoff. Acceptance tests encode requirements, not the absence of foot-guns.

The rest of the usual suspects — performance under load, concurrency, time bugs, observability, migration safety — still apply. Vertical slicing is orthogonal to all of them.

I also still have UI bugs. Saving data isn't returning on fresh queries; I have to look into it.

Next: solidify some architectural skills for the agents to reference and add them to my `CLAUDE.md` files, so feature planning starts from "what's the acceptance test" rather than "what files do we touch."

## In summary

Prompts get you started. Plans get you a sketch. Agents and skills, sliced vertically with fast feedback and a context-light coordinator, get you working code. So far.
