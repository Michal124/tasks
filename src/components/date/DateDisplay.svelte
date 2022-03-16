<script lang="ts">
  import type { Date } from "../../types";

  export let date: Date;
</script>

<div class="timeDisplay">
  <p>
    <slot />
  </p>
  <div class="time" on:click>
    {("0" + date.day).slice(-2)}.{("0" + (date.month + 1)).slice(-2)}. {date.year}
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
