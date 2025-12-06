<script lang="ts">
	import type { DrawnCard } from '$lib/domain/models/Card';
	import type { Spread } from '$lib/domain/models/Spread';
	import Card from './Card.svelte';
	import { flipCard } from '$lib/application/stores/tarot';

	interface Props {
		spread: Spread;
		drawnCards: DrawnCard[];
	}

	let { spread, drawnCards }: Props = $props();

	function handleCardClick(position: number) {
		flipCard(position);
	}
</script>

<div class="spread-container">
	<h2>{spread.name}</h2>

	<div class="spread" class:one-oracle={spread.type === 'one-oracle'} class:three-card={spread.type === 'three-card'} class:celtic-cross={spread.type === 'celtic-cross'}>
		{#each drawnCards as drawnCard (drawnCard.position)}
			<div class="card-position">
				<div class="position-label">{spread.positions[drawnCard.position]}</div>
				<Card
					card={drawnCard.card}
					flipped={drawnCard.flipped}
					reversed={drawnCard.reversed}
					onclick={() => handleCardClick(drawnCard.position)}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.spread-container {
		padding: 40px 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.spread-container h2 {
		text-align: center;
		font-size: 32px;
		margin-bottom: 40px;
		color: #333;
	}

	.spread {
		display: grid;
		gap: 24px;
		justify-content: center;
	}

	.spread.one-oracle {
		grid-template-columns: 1fr;
		place-items: center;
	}

	.spread.three-card {
		grid-template-columns: repeat(3, 1fr);
	}

	.spread.celtic-cross {
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, auto);
	}

	.card-position {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	.position-label {
		font-size: 14px;
		font-weight: bold;
		color: #666;
		text-align: center;
	}

	@media (max-width: 768px) {
		.spread.three-card {
			grid-template-columns: 1fr;
		}

		.spread.celtic-cross {
			grid-template-columns: repeat(2, 1fr);
		}

		.spread-container h2 {
			font-size: 24px;
		}
	}
</style>
