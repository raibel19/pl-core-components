import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tsconfigPaths from 'vite-tsconfig-paths';

// Lee el package.json para obtener las dependencias y marcarlas como externas
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

// Extraemos las llaves de dependencies y peerDependencies para marcarlas como externas
const externalPackages = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

// Creamos expresiones regulares para cada paquete externo para que Rollup los trate como externos incluso si se importan con sub-rutas (e.g., 'react/jsx-runtime')
const regexesOfPackages = externalPackages.map((pkgName) => new RegExp(`^${pkgName}(/.*)?$`));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tsconfigPaths({
    //   projects: [resolve(__dirname, 'tsconfig.lib.json')],
    // }),
    tsconfigPaths(),
    libInjectCss(),
    dts({ tsconfigPath: resolve(__dirname, 'tsconfig.lib.json') }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react/jsx-runtime', 'react/jsx-dev-runtime', ...regexesOfPackages, /^node:.*/],
      input: Object.fromEntries(
        glob
          .sync(
            [
              // 'lib/**/*.{ts,tsx}',
              'lib/main.ts',
              'lib/tailwind.config-components.ts',
              'lib/components/index.ts',
              'lib/components/**/index.ts?(x)',
            ],
            { ignore: ['lib/**/*.d.ts'] },
          )
          .map((file) => [
            //The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
  },
});
