export type SpreadType = 'one-oracle' | 'three-card' | 'celtic-cross';

export interface Spread {
	type: SpreadType;
	name: string;
	positions: string[]; // Position names (e.g., ['Past', 'Present', 'Future'])
	cardCount: number;
}

export const SPREADS: Record<SpreadType, Spread> = {
	'one-oracle': {
		type: 'one-oracle',
		name: 'ワンオラクル',
		positions: ['今日のカード'],
		cardCount: 1
	},
	'three-card': {
		type: 'three-card',
		name: 'スリーカード',
		positions: ['過去', '現在', '未来'],
		cardCount: 3
	},
	'celtic-cross': {
		type: 'celtic-cross',
		name: 'ケルト十字',
		positions: [
			'現在の状況',
			'障害',
			'意識',
			'無意識',
			'過去',
			'近い未来',
			'あなた自身',
			'周囲の環境',
			'希望と恐れ',
			'最終結果'
		],
		cardCount: 10
	}
};
