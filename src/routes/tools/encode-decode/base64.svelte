<script lang="ts">
  import TextField, { type ValidationMessage } from '$lib/TextField.svelte';

  let decoded = '';
  let encoded = '';
  let encodedValidation: ValidationMessage | null = null;

  function onDecodedInput(value: string) {
    decoded = value;
    encoded = btoa(value);
    encodedValidation = null;
  }

  function onEncodedInput(value: string) {
    try {
      encoded = value;
      decoded = atob(value);
      encodedValidation = null;
    } catch (err) {
      decoded = '';
      encodedValidation = {
        type: 'warning',
        text: "That doesn't look like base64 data.",
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
    <h1>Base64</h1>
    <p>Quickly and easily encode or decode base64 data.</p>
  </header>
  <TextField
    id="base64-decoded"
    label="Decoded data"
    multiline
    placeholder="Decoded..."
    value={decoded}
    onInput={onDecodedInput}
  />
  <TextField
    id="base64-encoded"
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
