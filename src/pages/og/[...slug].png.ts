import type { APIRoute, GetStaticPaths } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';
import { renderOgPng } from '../../lib/og';
import { noteTemplate } from '../../lib/og-templates';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes
    .filter((n) => !n.data.cover?.image)
    .map((n) => ({ params: { slug: n.id }, props: { note: n } }));
};

interface Props {
  note: CollectionEntry<'notes'>;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { note } = props;
  const png = await renderOgPng(
    noteTemplate({
      title: note.data.title,
      cover: note.data.cover,
      tags: note.data.tags,
    }),
  );
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
