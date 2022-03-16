<script lang="ts">
  import User from "./icons/User.svelte";
  export let image = "";
</script>

<div class="profile">
  {#if image}
    <img src={image} alt="profile" />
  {:else}
    <div class="user">
      <User />
    </div>
  {/if}
  <slot />
</div>

<style lang="scss">
  @import "../styles/colors";
  .profile {
    background-color: $grey-300;
    width: 100%;
    padding: 1rem 0.75rem;
    font-size: 1rem;
    display: flex;
    margin-bottom: 1.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    user-select: none;
    img,
    .user {
      height: 2.5rem;
      width: 2.5rem;
      margin-right: 1rem;
      border-radius: 50%;
      object-fit: cover;
    }
    .user {
      background-color: $grey-200;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
