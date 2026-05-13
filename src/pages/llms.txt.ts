import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site?.href.replace(/\/$/, '') ?? 'https://pwningcode.com';
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  notes.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines = [
    '# pwningcode',
    '',
    '> Notes from Jason Barnes — solo developer in Ohio building AI-powered software for small businesses through FVC Solutions. Active side projects: Foreman (a Claude Code harness with remote control) and DownBad (uptime monitoring, $50/year flat).',
    '',
    '## About',
    '',
    `- [Home](${site}/): Bio and projects`,
    `- [Notes index](${site}/notes/): All published notes`,
    `- [RSS feed](${site}/rss.xml)`,
    '',
    '## Notes',
    '',
    ...notes.map((n) => {
      const d = n.data.description ?? n.data.title;
      return `- [${n.data.title}](${site}/notes/${n.id}/): ${d}`;
    }),
    '',
    '## Elsewhere',
    '',
    '- GitHub: https://github.com/pwningcode',
    '- LinkedIn: https://www.linkedin.com/in/pwningcode',
    '- Business: https://fvcsolutions.com',
    '- Field notes: https://jasonbarnes.net',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
