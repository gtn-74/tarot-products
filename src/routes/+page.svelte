<script lang="ts">
  import Deck from "$lib/presentation/components/Deck.svelte";
  import Spread from "$lib/presentation/components/Spread.svelte";
  import {
    deckStore,
    setCards,
    drawCard,
    clearDrawnCards,
    drawnCards,
  } from "$lib/application/stores/tarot";
  import { shuffleService } from "$lib/application/services/shuffle.service";
  import { readingService } from "$lib/application/services/reading.service";
  import { SPREADS, type SpreadType } from "$lib/domain/models/Spread";
  import { hapticService } from "$lib/application/services/haptic.service";
  import { VIBRATION_PATTERNS } from "$lib/domain/constants/vibration-patterns";

  let selectedSpread = $state<SpreadType>("one-oracle");
  let showSpread = $state(false);
  let currentDrawnCards = $state($drawnCards);

  $effect(() => {
    currentDrawnCards = $drawnCards;
  });

  function handleShuffle() {
    const shuffled = shuffleService.shuffle();
    setCards(shuffled);
  }

  function handleDrawCards() {
    clearDrawnCards();
    const spread = SPREADS[selectedSpread];
    const cards = shuffleService.drawCards(spread.cardCount);

    cards.forEach((card, index) => {
      const reversed = Math.random() > 0.7; // 30% chance of reversed
      drawCard(card, index, reversed);
    });

    showSpread = true;
    // hapticService.vibrate(VIBRATION_PATTERNS.select);
  }

  async function handleSaveReading() {
    if (currentDrawnCards.length === 0) return;

    try {
      await readingService.saveReading(
        selectedSpread,
        currentDrawnCards.map((dc) => ({
          card: dc.card,
          position: dc.position,
          reversed: dc.reversed,
        })),
        ""
      );
      hapticService.vibrate(VIBRATION_PATTERNS.shuffleComplete);
      alert("リーディングを保存しました！");
    } catch (error) {
      console.error("Failed to save reading:", error);
    //   hapticService.vibrate(VIBRATION_PATTERNS.error);
      alert("保存に失敗しました");
    }
  }

  function handleReset() {
    clearDrawnCards();
    showSpread = false;
  }
</script>

<div class="page">
  <div class="container">
    <section class="hero">
      <h1>タロット占い</h1>
      <p>カードをシャッフルして、あなたの運命を占いましょう</p>
    </section>

    {#if !showSpread}
      <section class="spread-selector">
        <h2>スプレッドを選択</h2>
        <div class="spread-options">
          {#each Object.values(SPREADS) as spread}
            <button
              class="spread-option"
              class:selected={selectedSpread === spread.type}
              onclick={() => {
                selectedSpread = spread.type;
                hapticService.vibrate(VIBRATION_PATTERNS.click);
              }}
            >
              <h3>{spread.name}</h3>
              <p>{spread.cardCount}枚</p>
            </button>
          {/each}
        </div>
      </section>

      <section class="deck-section">
        <Deck cards={$deckStore.cards} onShuffle={handleShuffle} />
        <button class="draw-button" onclick={handleDrawCards}>
          カードを引く ({SPREADS[selectedSpread].cardCount}枚)
        </button>
      </section>
    {:else}
      <section class="spread-section">
        <Spread
          spread={SPREADS[selectedSpread]}
          drawnCards={currentDrawnCards}
        />
        <div class="actions">
          <button class="action-button save" onclick={handleSaveReading}>
            保存
          </button>
          <button class="action-button reset" onclick={handleReset}>
            もう一度引く
          </button>
        </div>
      </section>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: 40px 20px;
  }

  .hero {
    text-align: center;
    margin-bottom: 60px;
  }

  .hero h1 {
    font-size: 48px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero p {
    font-size: 18px;
    color: #666;
  }

  .spread-selector {
    margin-bottom: 60px;
  }

  .spread-selector h2 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 32px;
  }

  .spread-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .spread-option {
    padding: 24px;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .spread-option:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .spread-option.selected {
    border-color: #667eea;
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  }

  .spread-option h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .spread-option p {
    color: #666;
    font-size: 14px;
  }

  .deck-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .draw-button {
    padding: 16px 48px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border: none;
    border-radius: 24px;
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .draw-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .draw-button:active {
    transform: translateY(0);
  }

  .spread-section {
    animation: fadeIn 0.5s ease-in-out;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }

  .action-button {
    padding: 12px 32px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .action-button.save {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .action-button.reset {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .action-button:active {
    transform: translateY(0);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-color-scheme: dark) {
    .spread-option {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .spread-option.selected {
      background: linear-gradient(135deg, #667eea30 0%, #764ba230 100%);
      border-color: #667eea;
    }

    .spread-option p {
      color: #ccc;
    }

    .hero p {
      color: #ccc;
    }
  }

  @media (max-width: 640px) {
    .hero h1 {
      font-size: 32px;
    }

    .hero p {
      font-size: 16px;
    }

    .spread-selector h2 {
      font-size: 24px;
    }

    .spread-options {
      grid-template-columns: 1fr;
    }

    .draw-button {
      padding: 12px 32px;
      font-size: 16px;
    }

    .actions {
      flex-direction: column;
    }
  }
</style>
