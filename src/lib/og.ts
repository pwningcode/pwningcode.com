import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import satori, { type SatoriOptions } from 'satori';
import { Resvg } from '@resvg/resvg-js';

const fontUrl = (pkg: string, file: string) =>
  fileURLToPath(
    new URL(`../../node_modules/${pkg}/files/${file}`, import.meta.url),
  );

const fonts: SatoriOptions['fonts'] = [
  {
    name: 'Inter',
    data: readFileSync(fontUrl('@fontsource/inter', 'inter-latin-400-normal.woff')),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: readFileSync(fontUrl('@fontsource/inter', 'inter-latin-400-italic.woff')),
    weight: 400,
    style: 'italic',
  },
  {
    name: 'Inter',
    data: readFileSync(fontUrl('@fontsource/inter', 'inter-latin-700-normal.woff')),
    weight: 700,
    style: 'normal',
  },
  {
    name: 'Inter',
    data: readFileSync(fontUrl('@fontsource/inter', 'inter-latin-700-italic.woff')),
    weight: 700,
    style: 'italic',
  },
  {
    name: 'JetBrains Mono',
    data: readFileSync(
      fontUrl('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
    ),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'JetBrains Mono',
    data: readFileSync(
      fontUrl('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff'),
    ),
    weight: 500,
    style: 'normal',
  },
];

const markSvg = readFileSync(
  fileURLToPath(new URL('../../public/PwningCodeWhite.svg', import.meta.url)),
  'utf8',
);

export const markDataUri = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString('base64')}`;

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export async function renderOgPng(tree: unknown): Promise<Buffer> {
  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });
  return Buffer.from(new Resvg(svg).render().asPng());
}
