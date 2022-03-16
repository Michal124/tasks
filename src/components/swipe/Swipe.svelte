<script lang="ts">
  import { onMount } from "svelte";

  export let i: number;
  export let position: number;
  let oldPosition = position;
  let smooth = false;
  let swipe: HTMLDivElement | undefined;
  let adjusment = 1;

  $: {
    smooth =
      Math.abs(oldPosition - position) > 0.1 &&
      Math.abs(oldPosition - position) <= 0.5;
    oldPosition = position;
  }

  $: offset = (i - position) * (adjusment / 16);
  $: visibility = Math.abs(offset) < 0.75;

  const newAdjusment = () => {
    setTimeout(() => {
      adjusment = swipe.getBoundingClientRect().width;
    }, 100);
  };

  onMount(() => {
    if (swipe) {
      newAdjusment();
      window.addEventListener("resize", newAdjusment);
    }
  });
</script>

<div
  bind:this={swipe}
  class="swipe"
  style={`left: ${offset}rem; ${smooth && "transition: left 0.5s;"} ${
    !visibility && "visibility: hidden;"
  }`}
>
  <slot />
</div>

<style lang="scss">
  .swipe {
    position: absolute;
    width: max-content;
  }
</style>
