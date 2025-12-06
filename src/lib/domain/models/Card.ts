export interface Card {
	id: number; // 0-21: Major Arcana, 22-77: Minor Arcana
	name: string; // Card name
	arcana: 'major' | 'minor';
	suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
	number?: number;
	uprightMeaning: string; // Upright meaning
	reversedMeaning: string; // Reversed meaning
	imageUrl: string; // Card image path
}

export interface DrawnCard {
	card: Card;
	position: number; // Position in spread
	reversed: boolean; // Is reversed
}
