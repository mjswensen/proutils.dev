<script lang="ts">
  export let value = '';
  export let readonly = false;

  async function copy() {
    await navigator.clipboard.writeText(value);
  }

  async function paste() {
    value = await navigator.clipboard.readText();
  }
</script>

<div class="container">
  <textarea bind:value {readonly} />
  <button on:click={paste} disabled={readonly}>Paste</button>
  <button on:click={copy}>Copy</button>
</div>

<style>
  .container {
    display: grid;
    gap: var(--size-small-3);
    grid-template-columns: 1fr 1fr;
  }

  textarea {
    grid-column: 1 / 3;
  }
</style>
