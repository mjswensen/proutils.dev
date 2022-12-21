<script lang="ts">
  import TextField, { type ValidationMessage } from '$lib/TextField.svelte';

  let decoded = '';
  let encoded = '';
  let encodedValidation: ValidationMessage | null = null;

  function onDecodedInput(value: string) {
    decoded = value;
    encoded = encodeURIComponent(value);
    encodedValidation = null;
  }

  function onEncodedInput(value: string) {
    try {
      encoded = value;
      decoded = decodeURIComponent(value);
      encodedValidation = null;
    } catch (err) {
      decoded = '';
      encodedValidation = {
        type: 'warning',
        text: "That doesn't look like URL-encoded data.",
        action: {
          text: 'Encode instead',
          fn: () => {
            decoded = encoded;
            onDecodedInput(decoded);
          },
        },
      };
    }
  }
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
    id="url-decoded"
    label="Decoded data"
    multiline
    placeholder="Decoded..."
    value={decoded}
    onInput={onDecodedInput}
  />
  <TextField
    id="url-encoded"
    label="Encoded data"
    multiline
    placeholder="Encoded..."
    bind:value={encoded}
    onInput={onEncodedInput}
    validationMessage={encodedValidation}
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
