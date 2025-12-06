<script lang="ts">
  import { hapticService } from "$lib/application/services/haptic.service";
  import { VIBRATION_PATTERNS } from "$lib/domain/constants/vibration-patterns";
  import type { Card } from "$lib/domain/models/Card";

  interface CardAnimation {
    id: number;
    x: number;
    y: number;
    rotate: number;
  }

  interface Props {
    cards: Card[];
    onShuffle?: () => void;
  }

  let { cards, onShuffle }: Props = $props();

  let isShuffling = $state(false);
  let cardAnimations = $state<CardAnimation[]>([]);

  async function handleShuffle() {
    if (isShuffling) return;

    isShuffling = true;
    // hapticService.vibrate(VIBRATION_PATTERNS.shuffleStart);

    // Scatter cards
    cardAnimations = cards.slice(0, 10).map((card) => ({
      id: card.id,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200,
      rotate: Math.random() * 360,
    }));

    await new Promise((resolve) => setTimeout(resolve, 600));

    // Shuffle vibration
    // hapticService.vibrate(VIBRATION_PATTERNS.shuffling);

    // Gather cards
    cardAnimations = cards.slice(0, 10).map((card) => ({
      id: card.id,
      x: 0,
      y: 0,
      rotate: 0,
    }));

    await new Promise((resolve) => setTimeout(resolve, 600));

    hapticService.vibrate(VIBRATION_PATTERNS.shuffleComplete);
    isShuffling = false;

    onShuffle?.();
  }
</script>

<div class="deck-container">
  <div class="deck">
    {#each cardAnimations as animation, i (animation.id)}
      <div
        class="deck-card"
        style="
					transform: translate({animation.x}px, {animation.y}px) rotate({animation.rotate}deg);
					z-index: {i};
					transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
				"
      >
        <div class="card-back">🔮</div>
      </div>
    {/each}
  </div>

  <button class="shuffle-button" onclick={handleShuffle} disabled={isShuffling}>
    {isShuffling ? "シャッフル中..." : "シャッフル"}
  </button>
</div>

<style>
  .deck-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 40px 20px;
  }

  .deck {
    position: relative;
    width: 200px;
    height: 300px;
  }

  .deck-card {
    position: absolute;
    width: 200px;
    height: 300px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .card-back {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    color: white;
  }

  .shuffle-button {
    padding: 16px 32px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 24px;
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .shuffle-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .shuffle-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .shuffle-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    .deck {
      width: 150px;
      height: 225px;
    }

    .deck-card {
      width: 150px;
      height: 225px;
    }

    .card-back {
      font-size: 60px;
    }

    .shuffle-button {
      padding: 12px 24px;
      font-size: 16px;
    }
  }
</style>
