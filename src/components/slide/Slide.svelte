<script lang="ts">
  import { onMount } from "svelte";

  export let i: number;
  export let position: number;
  let slide: HTMLDivElement | undefined;
  let adjusment = 1;
  let transition = false;
  let visibility = false;
  let width = 1;

  $: offset =
    Math.abs(i - position) >= 1
      ? i < position
        ? -1 * (adjusment / 16)
        : 1 * (adjusment / 16)
      : (i - position) * (adjusment / 16);
  $: visibility = Math.abs(offset) < 1;
  $: pc = width > 500;

  onMount(() => {
    if (slide) {
      adjusment = slide.getBoundingClientRect().width;
    }
    setTimeout(() => (transition = true), 100);
    width = window.innerWidth;
    window.addEventListener("resize", () => (width = window.innerWidth));
  });
</script>

<div
  bind:this={slide}
  class="slide"
  style={`left: ${offset}rem; ${
    transition && "transition: left 0.5s, opacity 0.5s;"
  } ${visibility ? "opacity: 1;" : "opacity: 0;"}; ${!pc && "bottom: 0;"}`}
>
  <slot />
</div>

<style lang="scss">
  .slide {
    position: absolute;
    margin: auto;
    width: 100%;
  }
</style>
