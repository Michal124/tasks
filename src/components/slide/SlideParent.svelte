<script lang="ts">
  import { onMount } from "svelte";

  let height = 1;
  let transition = false;

  export let watch: any = false;
  export let position;
  $: watch, watchChange();
  $: position, newHeight();

  let slideParent: HTMLDivElement | undefined;

  const watchChange = () => {
    transition = false;
    setTimeout(() => {
      newHeight();
    }, 100);
    setTimeout(() => {
      transition = true;
    }, 200);
  };

  const newHeight = () => {
    if (slideParent && slideParent.children.length > 0) {
      height =
        slideParent.children[position].getBoundingClientRect().height / 16;
    }
  };

  onMount(() => {
    setTimeout(() => {
      newHeight();
      transition = true;
    }, 100);
  });
</script>

<div
  bind:this={slideParent}
  class="slideParent"
  style={`height: ${height}rem; ${transition && "transition: height 0.5s;"}`}
>
  <slot />
</div>

<style lang="scss">
  .slideParent {
    width: 100%;
    margin: auto;
    overflow: hidden;
    position: relative;
  }
</style>
