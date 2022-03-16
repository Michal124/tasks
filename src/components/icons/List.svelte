<script lang="ts">
  import { colorDictionary } from "../_dictionaries";
  export let color = colorDictionary.white200;
</script>

<div class="icon" on:click>
  <svg
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 1.09415H13M1.00001 1.09415H1.50001M5 5.06223H13M1.00001 5.06223H1.50001M5 9.09415L13 9.03031M1.00001 9.03031H1.50001"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</div>
