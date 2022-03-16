<button on:click>
  <slot />
</button>

<style lang="scss">
  @import "../styles/colors";
  button {
    z-index: 0;
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    display: flex;
    padding: 0.75rem 1rem;
    border-radius: 1.5rem;
    font-size: 0.889rem;
    background-color: $blue-200;
    &:hover,
    &:focus-visible {
      background-color: $blue-300;
    }
    &:active {
      background-color: $blue-400;
    }
  }
</style>
