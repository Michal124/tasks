<script lang="ts">
  export let i: number;
  export let position: number;

  $: top = (i - position) * 2 + 5;
  $: rotate = (i - position) * 30;
  $: color = Math.abs(i - position) < 0.5 ? "white" : "grey";
</script>

<div
  class={`item ${color}`}
  style={`top: ${top}rem; transform: translate(-50%, -50%) rotateX(${rotate}deg);`}
>
  <slot />
</div>

<style lang="scss">
  @import "../../styles/colors";
  .item {
    position: absolute;
    font-size: 1.266rem;
    left: 50%;
    &.grey {
      color: $white-300;
    }
    &.white {
      color: $white-100;
    }
  }
</style>
