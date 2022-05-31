<script lang="ts">
  import TextField from '$lib/TextField.svelte';

  let decoded = '';
  let encoded = '';
  let encodedWarning = '';

  function onDecodedInput(value: string) {
    decoded = value;
    encoded = encodeURIComponent(value);
    encodedWarning = '';
  }

  function onEncodedInput(value: string) {
    try {
      encoded = value;
      decoded = decodeURIComponent(value);
      encodedWarning = '';
    } catch (err) {
      decoded = '';
      encodedWarning = "That doesn't look like URL-encoded data.";
    }
  }

  $: encodedWarningAction = encodedWarning
    ? {
        text: 'Encode instead',
        action: () => {
          decoded = encoded;
          onDecodedInput(decoded);
        },
      }
    : null;
</script>

<div class="layout">
  <header>
    <h1>URL</h1>
    <p>
      Encode strings for use in URLs, or decode URL-encoded data. For advanced
      URL parsing (including query string parameters), see <a
        href="/tools/parse/url">the URL parse tool</a
      >.
    </p>
  </header>
  <TextField
    multiline
    placeholder="Decoded data..."
    value={decoded}
    onInput={onDecodedInput}
  />
  <TextField
    multiline
    placeholder="Encoded data..."
    bind:value={encoded}
    onInput={onEncodedInput}
    warning={encodedWarning}
    warningAction={encodedWarningAction}
  />
</div>

<style>
  .layout {
    height: 100%;
    padding: var(--scale-4);
    display: grid;
    gap: var(--scale-4);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
  }
  header {
    grid-column: 1 / 3;
  }
</style>
