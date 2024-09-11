import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
} as UserConfig);
