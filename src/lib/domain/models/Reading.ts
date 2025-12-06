import type { SpreadType } from './Spread';

export interface ReadingCard {
	id: string;
	readingId: string;
	cardId: number; // 0-77
	position: number; // Position in spread
	reversed: boolean; // Is reversed
}

export interface Reading {
	id: string;
	userId: string;
	timestamp: Date;
	spreadType: SpreadType;
	memo?: string;
	cards: ReadingCard[];
}
