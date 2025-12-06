<script lang="ts">
	import '../lib/presentation/styles/global.css';
	import { settingsStore } from '$lib/application/stores/settings';
	import { hapticService } from '$lib/application/services/haptic.service';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(async () => {
		// Load settings from API
		try {
			const response = await fetch('/api/settings');
			if (response.ok) {
				const settings = await response.json();
				settingsStore.set({
					vibrationEnabled: settings.vibrationEnabled,
					favoriteSpread: settings.favoriteSpread
				});
				hapticService.setEnabled(settings.vibrationEnabled);
			}
		} catch (error) {
			console.error('Failed to load settings:', error);
		}
	});
</script>

<div class="app">
	<header>
		<div class="container">
			<h1>🔮 Tarot</h1>
			<nav>
				<a href="/">ホーム</a>
				<a href="/settings">設定</a>
			</nav>
		</div>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<div class="container">
			<p>&copy; 2024 Tarot App</p>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	header .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 20px;
	}

	header h1 {
		font-size: 24px;
		margin: 0;
	}

	nav {
		display: flex;
		gap: 20px;
	}

	nav a {
		color: #333;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	nav a:hover {
		color: #667eea;
	}

	main {
		flex: 1;
		padding: 20px 0;
	}

	footer {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		padding: 20px;
		text-align: center;
		color: #666;
		font-size: 14px;
	}

	@media (prefers-color-scheme: dark) {
		header,
		footer {
			background: rgba(0, 0, 0, 0.3);
		}

		nav a {
			color: #f0f0f0;
		}

		nav a:hover {
			color: #667eea;
		}

		footer {
			color: #ccc;
		}
	}

	@media (max-width: 640px) {
		header h1 {
			font-size: 20px;
		}

		nav {
			gap: 12px;
		}

		nav a {
			font-size: 14px;
		}
	}
</style>
