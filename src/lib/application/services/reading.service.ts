import type { Reading, ReadingCard } from '$lib/domain/models/Reading';
import type { SpreadType } from '$lib/domain/models/Spread';
import type { Card } from '$lib/domain/models/Card';

export class ReadingService {
	async saveReading(
		spreadType: SpreadType,
		cards: Array<{ card: Card; position: number; reversed: boolean }>,
		memo?: string
	): Promise<Reading> {
		const response = await fetch('/api/readings', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				spreadType,
				cards: cards.map((c) => ({
					cardId: c.card.id,
					position: c.position,
					reversed: c.reversed
				})),
				memo
			})
		});

		if (!response.ok) {
			throw new Error('Failed to save reading');
		}

		return await response.json();
	}

	async getReadings(): Promise<Reading[]> {
		const response = await fetch('/api/readings');
		if (!response.ok) {
			throw new Error('Failed to fetch readings');
		}
		return await response.json();
	}

	async getReading(id: string): Promise<Reading> {
		const response = await fetch(`/api/readings/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch reading');
		}
		return await response.json();
	}

	async updateReading(id: string, memo: string): Promise<Reading> {
		const response = await fetch(`/api/readings/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ memo })
		});

		if (!response.ok) {
			throw new Error('Failed to update reading');
		}

		return await response.json();
	}

	async deleteReading(id: string): Promise<void> {
		const response = await fetch(`/api/readings/${id}`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error('Failed to delete reading');
		}
	}
}

export const readingService = new ReadingService();
