<script lang="ts" context="module">
  export type Type = 'success' | 'error' | 'warning' | 'info';
</script>

<script lang="ts">
  export let type: Type = 'info';
</script>

<div class={'banner ' + type}>
  <slot />
</div>

<style>
  .banner {
    padding: var(--scale-2) var(--scale-4);
    border-radius: var(--size-border-radius-large);
  }
  .success {
    background-color: var(--green-dark);
    color: var(--green-light);
    border: var(--size-border-width) solid var(--green-light-25);
  }
  .error {
    background-color: var(--red-dark);
    color: var(--red-light);
    border: var(--size-border-width) solid var(--red-light-25);
  }
  .warning {
    background-color: var(--yellow-dark);
    color: var(--yellow-light);
    border: var(--size-border-width) solid var(--yellow-light-25);
  }
  .info {
    background-color: var(--blue-dark);
    color: var(--blue-light);
    border: var(--size-border-width) solid var(--blue-light-25);
  }
</style>
