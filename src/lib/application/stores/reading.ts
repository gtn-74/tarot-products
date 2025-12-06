import { writable } from 'svelte/store';
import type { Reading } from '$lib/domain/models/Reading';

export const readingsStore = writable<Reading[]>([]);
export const currentReading = writable<Reading | null>(null);

export function setReadings(readings: Reading[]) {
	readingsStore.set(readings);
}

export function addReading(reading: Reading) {
	readingsStore.update((readings) => [reading, ...readings]);
}

export function updateReadingInStore(id: string, updatedReading: Reading) {
	readingsStore.update((readings) =>
		readings.map((r) => (r.id === id ? updatedReading : r))
	);
}

export function deleteReadingFromStore(id: string) {
	readingsStore.update((readings) => readings.filter((r) => r.id !== id));
}

export function setCurrentReading(reading: Reading | null) {
	currentReading.set(reading);
}
