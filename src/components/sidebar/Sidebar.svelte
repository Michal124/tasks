<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let active = false;
  let width = 1;

  $: pc = width > 500;

  onMount(() => {
    width = window.innerWidth;
    window.addEventListener("resize", () => (width = window.innerWidth));
  });
</script>

{#if pc}
  <div class="sidebar">
    <slot />
  </div>
{:else}
  <div
    class="lock"
    style={`${!active && "pointer-events: none;"} opacity: ${
      active ? "1" : "0"
    };`}
    on:click={() => dispatch("close")}
  />
  <div class="sidebarMobile" style={`left: ${active ? "0" : "-16rem"};`}>
    <slot />
  </div>
{/if}

<style lang="scss">
  @import "../../styles/colors";
  .lock {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba($color: #000000, $alpha: 0.4);
    transition: opacity 0.5s;
  }
  .sidebar,
  .sidebarMobile {
    z-index: 2;
    padding: 1.5rem;
    background-color: $grey-400;
    height: 100%;
    width: 16rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;
  }
  .sidebarMobile {
    position: absolute;
    top: 0;
    transition: left 0.5s;
  }
</style>
