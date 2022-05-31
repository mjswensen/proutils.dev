<script lang="ts">
  export let small = false;
</script>

{#if small}
  <span>ProUtils.dev</span>
{:else}
  <h1>ProUtils.dev</h1>
{/if}

<style>
  h1,
  span {
    font-weight: 900;
    font-style: italic;
  }

  h1 {
    font-size: var(--scale-16);
  }
  span {
    font-size: var(--scale-6);
  }
</style>
