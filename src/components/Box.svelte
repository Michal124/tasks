<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let active = false;
  let width = 501;

  $: pc = width > 500;

  onMount(() => {
    width = window.innerWidth;
    window.addEventListener("resize", () => (width = window.innerWidth));
  });
</script>

<div
  class="lock"
  style={`${!active && "pointer-events: none;"} opacity: ${
    active ? "1" : "0"
  };`}
  on:click={() => dispatch("cancel")}
/>
<div
  class={pc ? "box" : "mobileBox"}
  style={`${
    !pc
      ? `max-height: ${active ? "100%" : "0"}; bottom: ${
          active ? "0" : "-3rem"
        };`
      : ""
  }
      ${!active && "pointer-events: none;"} opacity: ${active ? "1" : "0"};`}
>
  <slot />
</div>

<style lang="scss">
  @import "../styles/colors";
  .lock {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba($color: #000000, $alpha: 0.4);
    transition: opacity 0.5s;
  }
  .box,
  .mobileBox {
    z-index: 3;
    padding: 1.5rem;
    background-color: $grey-400;
    position: absolute;
    overflow: hidden;
  }
  .box {
    width: 25rem;
    border-radius: 1rem;
    left: 50%;
    top: 4rem;
    transform: translateX(-50%);
    transition: opacity 0.5s;
  }
  .mobileBox {
    left: 0;
    width: 100vw;
    transition: opacity 0.5s, max-height 0.5s linear, bottom 0.5s;
    border-radius: 1rem 1rem 0 0;
  }
</style>
