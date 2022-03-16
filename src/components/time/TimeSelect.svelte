<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Button from "../Button.svelte";
  import Select from "../select/Select.svelte";

  const dispatch = createEventDispatcher();

  let time = { hours: 12, minutesPos: 0 };
</script>

<div class="selectGroup">
  <Select
    on:position={(e) => (time.hours = e.detail)}
    startPosition={time.hours}
    items={[
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ]}
  />
  :
  <Select
    on:position={(e) => (time.minutesPos = e.detail)}
    startPosition={time.minutesPos}
    items={["00", "15", "30", "45"]}
  />
</div>
<Button on:click={() => dispatch("cancel")}>Cancel</Button>
<Button
  on:click={() =>
    dispatch("selected", { hours: time.hours, minutes: time.minutesPos * 15 })}
  primary>Confirm</Button
>
