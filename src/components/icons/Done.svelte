<script lang="ts">
  import { colorDictionary } from "../_dictionaries";
  export let color = colorDictionary.white200;
</script>

<div class="icon" on:click>
  <svg
    width="11"
    height="8"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.42481 4.33875L3.79308 6.70702L9.42481 1.07529"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</div>
