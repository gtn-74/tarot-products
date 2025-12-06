import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Reading } from '$lib/domain/models/Reading';

// Mock data storage (in-memory)
let mockReadings: Reading[] = [
	{
		id: '1',
		userId: 'demo-user',
		timestamp: new Date('2024-12-01T10:00:00'),
		spreadType: 'one-oracle',
		memo: 'First reading!',
		cards: [{ id: '1-1', readingId: '1', cardId: 0, position: 0, reversed: false }]
	}
];

let nextId = 2;

export const GET: RequestHandler = async () => {
	return json(mockReadings);
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		const newReading: Reading = {
			id: String(nextId++),
			userId: 'demo-user',
			timestamp: new Date(),
			spreadType: data.spreadType,
			memo: data.memo,
			cards: data.cards.map((c: any, index: number) => ({
				id: `${nextId - 1}-${index}`,
				readingId: String(nextId - 1),
				cardId: c.cardId,
				position: c.position,
				reversed: c.reversed
			}))
		};

		mockReadings = [newReading, ...mockReadings];

		return json(newReading, { status: 201 });
	} catch (error) {
		console.error('Failed to create reading:', error);
		return json({ error: 'Failed to create reading' }, { status: 500 });
	}
};
