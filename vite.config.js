import { defineConfig } from 'vite';

export default defineConfig({
  // Configures Vite to build online.html as the main entry point
  build: {
    rollupOptions: {
      input: {
        main: './online.html',
      },
    },
  },
});