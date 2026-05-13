import { markDataUri, OG_HEIGHT, OG_WIDTH } from './og';

type Node = {
  type: string;
  props: Record<string, unknown> & { children?: Node | Node[] | string };
};

const el = (
  type: string,
  props: Record<string, unknown> = {},
  children?: Node | Node[] | string,
): Node => ({
  type,
  props: children === undefined ? props : { ...props, children },
});

const BG = '#0c0e0d';
const WHITE = '#ffffff';
const ZINC_200 = '#e4e4e7';
const ZINC_300 = '#d4d4d8';
const ZINC_400 = '#a1a1aa';
const ZINC_500 = '#71717a';
const ZINC_700 = '#3f3f46';
const ACCENT = '#10b981';

const SANS = 'Inter';
const MONO = 'JetBrains Mono';

function pickTitleSize(title: string): number {
  if (title.length <= 30) return 96;
  if (title.length <= 55) return 72;
  return 56;
}

export function siteDefaultTemplate(): Node {
  return el(
    'div',
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        background: BG,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 80px',
        fontFamily: SANS,
        position: 'relative',
      },
    },
    [
      el('img', {
        src: markDataUri,
        width: 240,
        height: 240,
        style: { marginRight: 80 },
      }),
      el(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        },
        [
          el(
            'div',
            {
              style: {
                fontFamily: SANS,
                fontSize: 96,
                fontWeight: 700,
                color: WHITE,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              },
            },
            'pwningcode',
          ),
          el(
            'div',
            {
              style: {
                fontFamily: SANS,
                fontSize: 32,
                fontWeight: 400,
                color: ZINC_300,
                marginTop: 16,
              },
            },
            'Notes from Jason Barnes.',
          ),
          el(
            'div',
            {
              style: {
                fontFamily: SANS,
                fontSize: 24,
                fontWeight: 400,
                fontStyle: 'italic',
                color: ZINC_400,
                marginTop: 8,
              },
            },
            'Solo developer building DownBad and Foreman.',
          ),
        ],
      ),
      el(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: 32,
            right: 40,
            fontFamily: MONO,
            fontSize: 20,
            color: ZINC_500,
          },
        },
        'pwningcode.com',
      ),
    ],
  );
}

type NoteCover = {
  stats?: string[];
  pull?: string;
};

export function noteTemplate(opts: { title: string; cover?: NoteCover; tags?: string[] }): Node {
  const { title, cover, tags = [] } = opts;
  const titleSize = pickTitleSize(title);

  const middle: Node[] = [];

  if (cover?.stats && cover.stats.length > 0) {
    middle.push(
      el(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 28,
          },
        },
        cover.stats.map((s) =>
          el(
            'div',
            {
              style: {
                fontFamily: MONO,
                fontSize: 32,
                color: ZINC_200,
                lineHeight: 1.35,
              },
            },
            s,
          ),
        ),
      ),
    );
  } else if (cover?.pull) {
    middle.push(
      el(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 28,
          },
        },
        [
          el('div', {
            style: {
              width: 4,
              height: 60,
              background: ACCENT,
              marginRight: 20,
            },
          }),
          el(
            'div',
            {
              style: {
                fontFamily: SANS,
                fontSize: 36,
                fontStyle: 'italic',
                color: ZINC_300,
                lineHeight: 1.25,
              },
            },
            cover.pull,
          ),
        ],
      ),
    );
  } else if (tags.length > 0) {
    middle.push(
      el(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 28,
          },
        },
        tags.map((t) =>
          el(
            'div',
            {
              style: {
                fontFamily: MONO,
                fontWeight: 500,
                fontSize: 20,
                color: ZINC_500,
                textTransform: 'uppercase',
                border: `1px solid ${ZINC_700}`,
                borderRadius: 9999,
                padding: '6px 14px',
                marginRight: 8,
                marginBottom: 8,
              },
            },
            t,
          ),
        ),
      ),
    );
  }

  return el(
    'div',
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        padding: 80,
        fontFamily: SANS,
        position: 'relative',
      },
    },
    [
      el(
        'div',
        {
          style: {
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 24,
            color: ZINC_400,
          },
        },
        'pwningcode · notes',
      ),
      el(
        'div',
        {
          style: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 1000,
          },
        },
        [
          el(
            'div',
            {
              style: {
                fontFamily: SANS,
                fontWeight: 700,
                fontSize: titleSize,
                color: WHITE,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              },
            },
            title,
          ),
          ...middle,
        ],
      ),
      el(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: 40,
            right: 80,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
        },
        [
          el(
            'div',
            {
              style: {
                fontFamily: MONO,
                fontSize: 20,
                color: ZINC_400,
                marginRight: 16,
              },
            },
            'pwningcode.com',
          ),
          el('img', {
            src: markDataUri,
            width: 96,
            height: 96,
          }),
        ],
      ),
    ],
  );
}
