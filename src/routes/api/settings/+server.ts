import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Mock settings storage
let mockSettings = {
	id: 'settings-1',
	userId: 'demo-user',
	vibrationEnabled: true,
	favoriteSpread: 'one-oracle'
};

export const GET: RequestHandler = async () => {
	return json(mockSettings);
};

export const PUT: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		mockSettings = {
			...mockSettings,
			...data
		};

		return json(mockSettings);
	} catch (error) {
		console.error('Failed to update settings:', error);
		return json({ error: 'Failed to update settings' }, { status: 500 });
	}
};
