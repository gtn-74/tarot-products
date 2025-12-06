<script lang="ts">
  import type { Card } from "$lib/domain/models/Card";
  // import { hapticService } from '$lib/application/services/haptic.service';
  // import { VIBRATION_PATTERNS } from '$lib/domain/constants/vibration-patterns';

  interface Props {
    card: Card;
    flipped?: boolean;
    reversed?: boolean;
    onclick?: () => void;
  }

  let { card, flipped = false, reversed = false, onclick }: Props = $props();

  function handleClick() {
    // hapticService.vibrate(VIBRATION_PATTERNS.flip);
    onclick?.();
  }
</script>

<button
  class="tarot-card"
  class:flipped
  class:reversed
  onclick={handleClick}
  aria-label={flipped ? card.name : "Card back"}
>
  <div class="card-inner">
    <div class="card-front">
      <div class="card-content">
        <h3>{card.name}</h3>
        <p class="meaning">
          {reversed ? card.reversedMeaning : card.uprightMeaning}
        </p>
        {#if reversed}
          <span class="reversed-indicator">逆位置</span>
        {/if}
      </div>
    </div>
    <div class="card-back">
      <div class="card-pattern">🔮</div>
    </div>
  </div>
</button>

<style>
  .tarot-card {
    width: 200px;
    height: 300px;
    perspective: 1000px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .tarot-card.flipped .card-inner {
    transform: rotateY(180deg);
  }

  .tarot-card.reversed .card-inner {
    transform: rotateY(180deg) rotateZ(180deg);
  }

  .tarot-card.flipped.reversed .card-inner {
    transform: rotateY(180deg) rotateZ(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .card-front {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: rotateY(180deg);
  }

  .card-back {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  .card-content {
    padding: 20px;
    text-align: center;
  }

  .card-content h3 {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: bold;
  }

  .card-content .meaning {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }

  .card-pattern {
    font-size: 80px;
  }

  .reversed-indicator {
    display: inline-block;
    margin-top: 12px;
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
  }

  @media (max-width: 640px) {
    .tarot-card {
      width: 150px;
      height: 225px;
    }

    .card-content h3 {
      font-size: 16px;
    }

    .card-content .meaning {
      font-size: 12px;
    }

    .card-pattern {
      font-size: 60px;
    }
  }
</style>
