import type { APIRoute } from 'astro';
import { renderOgPng } from '../lib/og';
import { siteDefaultTemplate } from '../lib/og-templates';

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgPng(siteDefaultTemplate());
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
