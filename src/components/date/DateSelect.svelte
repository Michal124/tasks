<script lang="ts">
  import Calendar from "./Calendar.svelte";
  import Button from "../Button.svelte";
  import SwipeParent from "../swipe/SwipeParent.svelte";
  import Swipe from "../swipe/Swipe.svelte";
  import { createEventDispatcher } from "svelte";
  import { monthDictionary } from "../_dictionaries";
  import Right from "../icons/Right.svelte";
  import Left from "../icons/Left.svelte";
  import type { Date } from "../../types";
  import { getMonth } from "../../functions";

  let calendarPositon = 1;

  const dispatch = createEventDispatcher();

  let selectedDay: Date = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  let selectedMonth = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
</script>

<div class="month">
  <Left on:click={() => (selectedMonth = getMonth(selectedMonth, -1))} />
  <div
    on:click={() =>
      (selectedMonth = {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      })}
  >
    {monthDictionary[selectedMonth.month]}
    {selectedMonth.year}
  </div>
  <Right on:click={() => (selectedMonth = getMonth(selectedMonth, 1))} />
</div>
<SwipeParent
  on:position={(e) => {
    calendarPositon = e.detail;
    if (Math.abs(calendarPositon - 1) === 1) {
      selectedMonth = getMonth(selectedMonth, calendarPositon - 1);
      calendarPositon = 1;
    }
  }}
  position={calendarPositon}
>
  {#each Array(3) as _, i}
    <Swipe {i} position={calendarPositon}>
      <Calendar
        position={calendarPositon}
        on:selectDay={(e) => (selectedDay = e.detail)}
        {selectedDay}
        selectedMonth={getMonth(selectedMonth, i - 1)}
      />
    </Swipe>
  {/each}
</SwipeParent>
<Button on:click={() => dispatch("cancel")}>Cancel</Button>
<Button on:click={() => dispatch("selected", selectedDay)} primary
  >Confirm</Button
>

<style lang="scss">
  @import "../../styles/colors";
  .month {
    user-select: none;
    color: $white-200;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 12rem;
    }
  }
</style>
