import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// This would be imported from the parent +server.ts in a real implementation
// For now, we'll use a simple in-memory store
let mockReadings: any[] = [];

export const GET: RequestHandler = async ({ params }) => {
	const reading = mockReadings.find((r) => r.id === params.id);

	if (!reading) {
		return json({ error: 'Reading not found' }, { status: 404 });
	}

	return json(reading);
};

export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const data = await request.json();
		const index = mockReadings.findIndex((r) => r.id === params.id);

		if (index === -1) {
			return json({ error: 'Reading not found' }, { status: 404 });
		}

		mockReadings[index] = {
			...mockReadings[index],
			memo: data.memo
		};

		return json(mockReadings[index]);
	} catch (error) {
		console.error('Failed to update reading:', error);
		return json({ error: 'Failed to update reading' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	const index = mockReadings.findIndex((r) => r.id === params.id);

	if (index === -1) {
		return json({ error: 'Reading not found' }, { status: 404 });
	}

	mockReadings.splice(index, 1);
	return json({ success: true });
};
