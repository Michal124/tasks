<script lang="ts">
  import Sidebar from "../components/sidebar/Sidebar.svelte";
  import SidebarButton from "../components/sidebar/SidebarButton.svelte";
  import Home from "../components/icons/Home.svelte";
  import List from "../components/icons/List.svelte";
  import { _state } from "../store";
  import { BoxType, State } from "../types";
  import { createEventDispatcher, onDestroy } from "svelte";
  import Add from "../components/icons/Add.svelte";

  let state: State;

  const dispatch = createEventDispatcher();
  const unsubscriebe = _state.subscribe((x) => (state = x));

  export let active;

  const closeClick = (method: () => any) => {
    method();
    dispatch("cancel");
  };

  onDestroy(unsubscriebe);
</script>

<Sidebar {active} on:close={() => dispatch("cancel")}>
  <SidebarButton
    on:click={() =>
      closeClick(() => {
        _state.set({ ...state, box: BoxType.AddList });
      })}
  >
    <Add />
    <div class="text">New List</div>
  </SidebarButton>
  <div class="spacer" />
  {#each state.lists as list}
    <SidebarButton
      on:click={() =>
        closeClick(() => _state.set({ ...state, activeList: list.id }))}
    >
      <List />
      <div class="text">{list.name}</div>
    </SidebarButton>
  {/each}
</Sidebar>

<style lang="scss">
  @import "../styles/colors";
  .spacer {
    margin-top: 1rem;
  }
</style>
