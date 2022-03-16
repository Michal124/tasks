<script lang="ts">
  import { colorDictionary } from "../_dictionaries";
  export let color = colorDictionary.white200;
</script>

<div class="icon" on:click>
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.93831 13.9383V1.93829M1.93831 7.93829H13.9383"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</div>
