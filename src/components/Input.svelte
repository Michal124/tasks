<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let startValue = "";
  export let name: string;
  export let type: "text" | "password";

  let input: HTMLInputElement | undefined;

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (input) {
      input.value = startValue;
    }
  });
</script>

<label for={name}><slot />:</label>
<input
  bind:this={input}
  id={name}
  {type}
  on:input={(e) => {
    // @ts-ignore
    dispatch("change", e.target.value);
  }}
/>

<style lang="scss">
  @import "../styles/colors";
  label {
    text-align: left;
    display: block;
    font-size: 0.79rem;
    color: $white-200;
    margin-bottom: 0.25rem;
  }
  input {
    background-color: transparent;
    font-size: 0.889rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid $grey-100;
    border-radius: 0.375rem;
    width: 100%;
    &:focus-visible {
      border-color: $blue-100;
    }
  }
</style>
