<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import Menu from "../components/icons/Menu.svelte";
  import More from "../components/icons/More.svelte";
  import { _state } from "../store";
  import { BoxType, State } from "../types";
  const dispatch = createEventDispatcher();

  let width = 1;

  $: pc = width > 500;

  let state: State;
  const unsubscriebe = _state.subscribe((x) => (state = x));

  onMount(() => {
    width = window.innerWidth;
    window.addEventListener("resize", () => (width = window.innerWidth));
  });

  onDestroy(unsubscriebe);
</script>

<nav>
  {#if !pc}
    <Menu on:click={() => dispatch("menu")} />
  {/if}
  <div class="text">
    {state.lists.find((x) => x.id === state.activeList).name}
  </div>
  <More on:click={() => _state.set({ ...state, box: BoxType.Settings })} />
</nav>
