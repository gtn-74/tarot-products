<script lang="ts">
	import { settingsStore, setVibrationEnabled, setFavoriteSpread } from '$lib/application/stores/settings';
	import { hapticService } from '$lib/application/services/haptic.service';
	import { VIBRATION_PATTERNS } from '$lib/domain/constants/vibration-patterns';
	import { SPREADS, type SpreadType } from '$lib/domain/models/Spread';

	let currentSettings = $state($settingsStore);

	$effect(() => {
		currentSettings = $settingsStore;
	});

	async function handleToggleVibration() {
		const newValue = !currentSettings.vibrationEnabled;
		setVibrationEnabled(newValue);
		hapticService.setEnabled(newValue);

		if (newValue) {
			hapticService.vibrate(VIBRATION_PATTERNS.click);
		}

		await saveSettings();
	}

	async function handleChangeFavoriteSpread(spread: SpreadType) {
		setFavoriteSpread(spread);
		hapticService.vibrate(VIBRATION_PATTERNS.click);
		await saveSettings();
	}

	async function saveSettings() {
		try {
			await fetch('/api/settings', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					vibrationEnabled: currentSettings.vibrationEnabled,
					favoriteSpread: currentSettings.favoriteSpread
				})
			});
		} catch (error) {
			console.error('Failed to save settings:', error);
		}
	}
</script>

<div class="settings-page">
	<div class="container">
		<h1>設定</h1>

		<section class="settings-section">
			<h2>振動フィードバック</h2>
			<div class="setting-item">
				<div class="setting-info">
					<h3>振動を有効にする</h3>
					<p>カードをタップしたりシャッフルする際に振動します</p>
				</div>
				<button
					class="toggle"
					class:enabled={currentSettings.vibrationEnabled}
					onclick={handleToggleVibration}
					aria-label="振動のオン/オフ"
				>
					<span class="toggle-slider"></span>
				</button>
			</div>
		</section>

		<section class="settings-section">
			<h2>お気に入りスプレッド</h2>
			<div class="spread-list">
				{#each Object.values(SPREADS) as spread}
					<button
						class="spread-item"
						class:selected={currentSettings.favoriteSpread === spread.type}
						onclick={() => handleChangeFavoriteSpread(spread.type)}
					>
						<div class="spread-info">
							<h3>{spread.name}</h3>
							<p>{spread.cardCount}枚のカード</p>
						</div>
						{#if currentSettings.favoriteSpread === spread.type}
							<span class="check">✓</span>
						{/if}
					</button>
				{/each}
			</div>
		</section>

		<section class="settings-section">
			<h2>情報</h2>
			<div class="info-list">
				<div class="info-item">
					<span class="label">バージョン</span>
					<span class="value">0.0.1</span>
				</div>
				<div class="info-item">
					<span class="label">振動API対応</span>
					<span class="value">{hapticService.isSupported() ? '対応' : '非対応'}</span>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.settings-page {
		padding: 40px 20px;
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		font-size: 36px;
		margin-bottom: 40px;
		text-align: center;
	}

	.settings-section {
		margin-bottom: 48px;
	}

	.settings-section h2 {
		font-size: 24px;
		margin-bottom: 24px;
		padding-bottom: 12px;
		border-bottom: 2px solid rgba(0, 0, 0, 0.1);
	}

	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.setting-info h3 {
		font-size: 18px;
		margin-bottom: 8px;
	}

	.setting-info p {
		font-size: 14px;
		color: #666;
	}

	.toggle {
		width: 60px;
		height: 32px;
		background: #ccc;
		border: none;
		border-radius: 16px;
		position: relative;
		cursor: pointer;
		transition: background 0.3s;
	}

	.toggle.enabled {
		background: #667eea;
	}

	.toggle-slider {
		position: absolute;
		top: 4px;
		left: 4px;
		width: 24px;
		height: 24px;
		background: white;
		border-radius: 50%;
		transition: transform 0.3s;
	}

	.toggle.enabled .toggle-slider {
		transform: translateX(28px);
	}

	.spread-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.spread-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background: white;
		border: 2px solid #e0e0e0;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s;
		text-align: left;
	}

	.spread-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.spread-item.selected {
		border-color: #667eea;
		background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
	}

	.spread-info h3 {
		font-size: 18px;
		margin-bottom: 4px;
	}

	.spread-info p {
		font-size: 14px;
		color: #666;
	}

	.check {
		font-size: 24px;
		color: #667eea;
		font-weight: bold;
	}

	.info-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		padding: 16px 20px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.info-item .label {
		font-weight: 500;
	}

	.info-item .value {
		color: #666;
	}

	@media (prefers-color-scheme: dark) {
		.settings-section h2 {
			border-bottom-color: rgba(255, 255, 255, 0.2);
		}

		.setting-item,
		.spread-item,
		.info-item {
			background: rgba(255, 255, 255, 0.1);
			border-color: rgba(255, 255, 255, 0.2);
		}

		.setting-info p,
		.spread-info p,
		.info-item .value {
			color: #ccc;
		}

		.spread-item.selected {
			background: linear-gradient(135deg, #667eea30 0%, #764ba230 100%);
			border-color: #667eea;
		}
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 28px;
		}

		.settings-section h2 {
			font-size: 20px;
		}

		.setting-item,
		.spread-item {
			padding: 16px;
		}
	}
</style>
