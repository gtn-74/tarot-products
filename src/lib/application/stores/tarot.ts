import { writable, derived } from 'svelte/store';
import type { Card } from '$lib/domain/models/Card';
import { TAROT_CARDS } from '$lib/domain/constants/tarot-cards';

export interface DeckState {
	cards: Card[];
	isShuffling: boolean;
	drawnCards: Array<{ card: Card; position: number; reversed: boolean; flipped: boolean }>;
}

const initialState: DeckState = {
	cards: [...TAROT_CARDS],
	isShuffling: false,
	drawnCards: []
};

export const deckStore = writable<DeckState>(initialState);

export const isShuffling = derived(deckStore, ($deck) => $deck.isShuffling);
export const drawnCards = derived(deckStore, ($deck) => $deck.drawnCards);
export const deckCards = derived(deckStore, ($deck) => $deck.cards);

export function setShuffling(shuffling: boolean) {
	deckStore.update((state) => ({ ...state, isShuffling: shuffling }));
}

export function setCards(cards: Card[]) {
	deckStore.update((state) => ({ ...state, cards }));
}

export function drawCard(card: Card, position: number, reversed: boolean = false) {
	deckStore.update((state) => ({
		...state,
		drawnCards: [
			...state.drawnCards,
			{ card, position, reversed, flipped: false }
		]
	}));
}

export function flipCard(position: number) {
	deckStore.update((state) => ({
		...state,
		drawnCards: state.drawnCards.map((dc) =>
			dc.position === position ? { ...dc, flipped: true } : dc
		)
	}));
}

export function clearDrawnCards() {
	deckStore.update((state) => ({ ...state, drawnCards: [] }));
}

export function resetDeck() {
	deckStore.set(initialState);
}
