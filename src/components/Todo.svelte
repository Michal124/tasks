<script>
  import { createEventDispatcher } from "svelte";
  import Done from "./icons/Done.svelte";

  export let done;

  const dispatch = createEventDispatcher();
</script>

<div class="todo">
  <div
    on:click={() => {
      dispatch("done");
    }}
    class={`status ${done ? "done" : ""}`}
  >
    {#if done}
      <Done />
    {/if}
  </div>
  <slot />
</div>

<style lang="scss">
  @import "../styles/colors";
  .todo {
    text-align: left;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    .status {
      user-select: none;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: transparent;
      margin-right: 1rem;
      outline: 1px solid $grey-100;
      display: flex;
      align-items: center;
      justify-content: center;
      &.done {
        outline-color: $blue-200;
        background-color: $blue-200;
      }
    }
  }
</style>
