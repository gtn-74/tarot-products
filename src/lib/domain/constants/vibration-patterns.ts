export const VIBRATION_PATTERNS = {
	tap: 10, // Light tap
	click: 30, // Button press
	select: [40, 20, 60], // Card selection
	shuffleStart: [50, 30, 50], // Shuffle start
	shuffling: [30, 20, 30, 20, 30, 20, 30], // During shuffle
	shuffleComplete: 150, // Shuffle complete
	flip: [20, 10, 40], // Card flip
	error: [100, 50, 100, 50, 100], // Error
	special: [50, 30, 50, 30, 100] // Special card
} as const;

export type VibrationPattern = (typeof VIBRATION_PATTERNS)[keyof typeof VIBRATION_PATTERNS];
