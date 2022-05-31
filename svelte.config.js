import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
      },
    },
  },

  version: { name: pkg.version },
};

export default config;
