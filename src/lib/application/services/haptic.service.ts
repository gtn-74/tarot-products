import type { VibrationPattern } from '$lib/domain/constants/vibration-patterns';

export class HapticService {
	private enabled: boolean = true;

	vibrate(pattern: VibrationPattern | number | number[], force: number = 1.0): void {
		if (!this.enabled) return;
		if (typeof navigator === 'undefined' || !navigator.vibrate) return;

		if (typeof pattern === 'number') {
			navigator.vibrate(Math.floor(pattern * force));
		} else {
			// readonly配列にも対応するため、スプレッド構文で新しい配列を作成
			navigator.vibrate([...pattern].map((v) => Math.floor(v * force)));
		}
	}

	setEnabled(enabled: boolean): void {
		this.enabled = enabled;
	}

	isEnabled(): boolean {
		return this.enabled;
	}

	isSupported(): boolean {
		return typeof navigator !== 'undefined' && 'vibrate' in navigator;
	}
}

export const hapticService = new HapticService();
