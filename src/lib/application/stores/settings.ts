import { writable } from 'svelte/store';
import type { SpreadType } from '$lib/domain/models/Spread';

export interface UserSettings {
	vibrationEnabled: boolean;
	favoriteSpread: SpreadType;
}

const defaultSettings: UserSettings = {
	vibrationEnabled: true,
	favoriteSpread: 'one-oracle'
};

export const settingsStore = writable<UserSettings>(defaultSettings);

export function updateSettings(settings: Partial<UserSettings>) {
	settingsStore.update((current) => ({ ...current, ...settings }));
}

export function setVibrationEnabled(enabled: boolean) {
	settingsStore.update((settings) => ({ ...settings, vibrationEnabled: enabled }));
}

export function setFavoriteSpread(spread: SpreadType) {
	settingsStore.update((settings) => ({ ...settings, favoriteSpread: spread }));
}
