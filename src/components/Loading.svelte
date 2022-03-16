<div class="circle" />

<style lang="scss">
  @import "../styles/colors";
  .circle {
    margin: 4rem auto;
    height: 2rem;
    width: 2rem;
    border: 1px solid $grey-100;
    border-top: 1px solid $blue-100;
    border-radius: 50%;
    animation: spin 2.25s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    15% {
      transform: rotate(100deg);
    }
    85% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
