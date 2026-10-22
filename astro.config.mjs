import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://leo-site.quy-caongoc.workers.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
