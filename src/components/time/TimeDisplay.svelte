<script lang="ts">
  export let time: { hours: number; minutes: number };
</script>

<div class="timeDisplay">
  <p>
    <slot />
  </p>
  <div class="time" on:click>
    {("0" + time.hours).slice(-2)} : {("0" + time.minutes).slice(-2)}
  </div>
</div>

<style lang="scss">
  @import "../../styles/colors";
  .timeDisplay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-right: 1px;
    p {
      font-size: 0.889rem;
    }
    .time {
      font-size: 0.889rem;
      color: $white-200;
      user-select: none;
    }
  }
</style>
