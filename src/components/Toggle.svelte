<script lang="ts">
  let selected = false;
</script>

<div class="toggle">
  <p>
    <slot />
  </p>
  <div
    on:click={() => (selected = !selected)}
    tabindex="0"
    on:keydown={(e) => {
      if (e.key === "Enter") selected = !selected;
    }}
    class={`button ${selected ? "selected" : ""}`}
  >
    <div class="circle" />
  </div>
</div>

<style lang="scss">
  @import "../styles/colors";
  .toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-right: 1px;
    p {
      font-size: 0.889rem;
    }
    .button {
      box-sizing: content-box;
      height: 1.1rem;
      width: 2.2rem;
      border-radius: 0.625rem;
      background-color: transparent;
      border: 1px solid transparent;
      outline: 1px solid $grey-100;
      &.selected {
        background-color: $blue-200;
        border-color: $blue-200;
        outline-color: $blue-200;
      }
      .circle {
        height: 1.1rem;
        width: 1.1rem;
        border-radius: 50%;
        background-color: $white-100;
        margin-left: 0%;
        transform: translateX(0);
        transition: margin-left 0.3s linear, transform 0.3s linear;
      }
      &.selected .circle {
        margin-left: 100%;
        transform: translateX(-100%);
      }
      &:focus-visible {
        .circle {
          border: 2px solid $grey-500;
        }
        &.selected .circle {
          border: 2px solid $blue-200;
        }
      }
    }
  }
</style>
