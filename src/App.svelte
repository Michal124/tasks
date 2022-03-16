<script lang="ts">
  import Sidebar from "./app/Sidebar.svelte";
  import Nav from "./app/Nav.svelte";
  import Box from "./app/Box.svelte";
  import { _state } from "./store";
  import { onMount } from "svelte";
  import Main from "./app/Main.svelte";

  let sidebar = false;

  onMount(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () =>
        navigator.serviceWorker.register("./serviceWorker.js")
      );
    }
  });
</script>

<Nav on:menu={() => (sidebar = true)} />
<div class="content">
  <Sidebar active={sidebar} on:cancel={() => (sidebar = false)} />
  <Main />
</div>
<Box />
