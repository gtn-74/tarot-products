import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		minify: 'terser',
		cssMinify: true,
		rollupOptions: {
			output: {
				manualChunks: {
					'tarot-data': ['./src/lib/domain/constants/tarot-cards.ts']
				}
			}
		}
	}
});
