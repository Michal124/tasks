<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Item from "./Item.svelte";

  export let items: string[];
  export let startPosition = 0;
  let position = startPosition;

  let moving = false;
  let movingPosition: number;

  const dispatch = createEventDispatcher();

  onMount(() => {
    document.addEventListener("mousemove", (e) => {
      if (moving) {
        const move = (movingPosition - e.screenY) / 32;
        if (position + move > 0) {
          if (position + move < items.length - 1) {
            position += move;
          } else {
            position = items.length - 1;
          }
        } else {
          position = 0;
        }
        movingPosition = e.screenY;
      }
    });
    document.addEventListener("mouseup", () => {
      moving = false;
      position = Math.round(position);
      dispatch("position", position);
    });
    document.addEventListener("touchmove", (e) => {
      if (moving) {
        const touch = e.targetTouches[0];
        const move = (movingPosition - touch.screenY) / 32;
        if (position + move > 0) {
          if (position + move < items.length - 1) {
            position += move;
          } else {
            position = items.length - 1;
          }
        } else {
          position = 0;
        }
        movingPosition = touch.screenY;
      }
    });
    document.addEventListener("touchend", () => {
      moving = false;
      position = Math.round(position);
      dispatch("position", position);
    });
  });
</script>

<div
  class="select"
  on:touchstart={(e) => {
    const touch = e.targetTouches[0];
    moving = true;
    movingPosition = touch.screenY;
  }}
  on:mousedown={(e) => {
    moving = true;
    movingPosition = e.screenY;
  }}
>
  {#each items as item, i}
    <Item {i} {position}>{item}</Item>
  {/each}
</div>

<style lang="scss">
  @import "../../styles/colors";
  .select {
    height: 10rem;
    width: 3rem;
    text-align: center;
    padding: 0 1rem;
    margin: 0 1rem;
    position: relative;
    overflow: hidden;
  }
</style>
