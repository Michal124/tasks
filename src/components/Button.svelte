<script lang="ts">
  export let primary: boolean = false;
</script>

<button on:click class={primary && "primary"}>
  <slot />
</button>

<style lang="scss">
  @import "../styles/colors";
  button {
    margin: 0.5rem 0.25rem 1px 0;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.79rem;
    background-color: $grey-100;
    &.primary {
      background-color: $blue-200;
    }
    &:hover,
    &:focus-visible {
      background-color: $grey-200;
      &.primary {
        background-color: $blue-300;
      }
    }
    &:active {
      background-color: $grey-300;
      &.primary {
        background-color: $blue-400;
      }
    }
  }
</style>
