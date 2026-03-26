<script lang="ts">
  import { flipCard } from "$lib/application/stores/tarot";
  import type { DrawnCard } from "$lib/domain/models/Card";
  import type { Spread } from "$lib/domain/models/Spread";
  import Card from "../Card.svelte";
  import "./style.css";

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

  <div
    class="spread"
    class:one-oracle={spread.type === "one-oracle"}
    class:three-card={spread.type === "three-card"}
    class:celtic-cross={spread.type === "celtic-cross"}
  >
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
