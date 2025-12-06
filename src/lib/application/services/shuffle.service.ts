import { TAROT_CARDS } from '$lib/domain/constants/tarot-cards';
import type { Card } from '$lib/domain/models/Card';

export class ShuffleService {
	shuffle(cards: Card[] = TAROT_CARDS): Card[] {
		const shuffled = [...cards];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	drawCards(count: number, cards: Card[] = TAROT_CARDS): Card[] {
		const shuffled = this.shuffle(cards);
		return shuffled.slice(0, count);
	}
}

export const shuffleService = new ShuffleService();
