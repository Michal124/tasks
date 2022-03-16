<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => {
    dispatch("click");
  }}
>
  <slot />
</button>

<style lang="scss">
  @import "../../styles/colors";
  button {
    width: 100%;
    text-align: left;
    background-color: transparent;
    padding: 0.25rem 0.75rem;
    font-size: 0.889rem;
    color: $white-200;
    display: flex;
    margin-bottom: 0.75rem;
  }
</style>
