<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getDaysInMonth } from "../../functions";

  export let selectedDay: { day: number; month: number; year: number };
  export let selectedMonth: { month: number; year: number };

  const dispatch = createEventDispatcher();

  export let position;
  let odlPos = position;

  const getMonthDate = (selectedMonth: { month: number; year: number }) => {
    let result = [[]];

    let week = 0;
    let weekDay = 0;
    let offset = 0;

    for (
      let i = 0;
      i < getDaysInMonth(selectedMonth.month, selectedMonth.year) + offset;
      i++
    ) {
      if (new Date(selectedMonth.year, selectedMonth.month).getDay() > i + 1) {
        result[week].push(" ");
        offset++;
      } else {
        result[week].push(i - offset + 1);
      }

      weekDay++;
      if (weekDay > 6) {
        weekDay = 0;
        week++;
        result.push([]);
      }
    }

    return result;
  };

  $: monthData = getMonthDate(selectedMonth);
</script>

<div class="parent">
  <table class="calendar">
    <thead>
      <tr>
        <th>Mo</th>
        <th>Tu</th>
        <th>We</th>
        <th>Th</th>
        <th>Fr</th>
        <th>Sa</th>
        <th>Su</th>
      </tr>
    </thead>
    <tbody>
      {#each monthData as week}
        <tr>
          {#each week as day}
            <td
              on:mousedown={() => {
                odlPos = position;
              }}
              on:mouseup={() => {
                if (Math.abs(odlPos - position) === 0) {
                  dispatch("selectDay", {
                    day,
                    month: selectedMonth.month,
                    year: selectedMonth.year,
                  });
                }
              }}
              on:touchstart={() => {
                odlPos = position;
              }}
              on:touchend={() => {
                if (Math.abs(odlPos - position) === 0.2) {
                  dispatch("selectDay", {
                    day,
                    month: selectedMonth.month,
                    year: selectedMonth.year,
                  });
                }
              }}
              class={JSON.stringify({
                day,
                month: selectedMonth.month,
                year: selectedMonth.year,
              }) === JSON.stringify(selectedDay) && "selected"}>{day}</td
            >
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  @import "../../styles/colors";
  .parent {
    height: 16.925rem;
    .calendar {
      table-layout: fixed;
      font-weight: 400;
      padding: 0 0.5rem;
      text-align: center;
      margin-bottom: 1rem;
      user-select: none;
      tbody td {
        padding: 0.5rem;
        &.selected {
          background-color: $blue-200;
          border-radius: 50%;
        }
      }
      thead th {
        color: $white-200;
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.79rem;
      }
    }
  }
</style>
