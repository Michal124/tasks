<script lang="ts">
  import { colorDictionary } from "../_dictionaries";
  export let color = colorDictionary.white200;
</script>

<div class="icon" on:click>
  <svg
    width="7"
    height="11"
    viewBox="0 0 7 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.03149 1.03146L2.03149 5.03146L6.03149 9.03146"
      stroke={color}
      stroke-width="2.06293"
      stroke-linecap="round"
    />
  </svg>
</div>
