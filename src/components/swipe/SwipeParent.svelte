<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  let width = 1;
  let height = 1;
  let moving = false;
  let movingPosition: number;
  let max = 1;

  export let position;

  let swipeParent: HTMLDivElement | undefined;

  const move = (e: { screenX: number }) => {
    if (moving) {
      const move = (movingPosition - e.screenX) / (width * 16);
      if (position + move >= 0) {
        if (position + move <= max) position += move;
        else position = max;
      } else position = 0;
      dispatch("position", position);
      movingPosition = e.screenX;
    }
  };

  const stop = () => {
    moving = false;
    position = Math.round(position);
    dispatch("position", position);
  };

  const newDimensions = () => {
    setTimeout(() => {
      console.log(swipeParent);
      const dimensions = swipeParent.children[0].getBoundingClientRect();
      width = dimensions.width / 16;
      height = dimensions.height / 16;
    }, 100);
  };

  onMount(() => {
    if (swipeParent) {
      newDimensions();
      max = swipeParent.children.length - 1;
      window.addEventListener("resize", newDimensions);
    }
    document.addEventListener("mousemove", (e) => {
      move(e);
    });
    document.addEventListener("mouseup", () => {
      stop();
    });
    document.addEventListener("touchmove", (e) => {
      move(e.targetTouches[0]);
    });
    document.addEventListener("touchend", () => {
      stop();
    });
  });
</script>

<div
  bind:this={swipeParent}
  class="swipeParent"
  on:touchstart={(e) => {
    const touch = e.targetTouches[0];
    moving = true;
    movingPosition = touch.screenX;
  }}
  on:mousedown={(e) => {
    moving = true;
    movingPosition = e.screenX;
  }}
  style={`width: ${width}rem; height: ${height}rem`}
>
  <slot />
</div>

<style lang="scss">
  .swipeParent {
    margin: auto;
    overflow: hidden;
    position: relative;
  }
</style>
