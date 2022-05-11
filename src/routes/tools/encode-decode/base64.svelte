<script lang="ts">
  import TextareaClipboard from '$lib/TextareaClipboard.svelte';

  let encode = true;
  let input = '';
  let output = '';
  let error = '';

  $: {
    try {
      output = encode ? btoa(input) : atob(input);
      error = '';
    } catch {
      output = '';
      error = 'Error decoding. Encode instead?';
    }
  }
</script>

<h1>Base64</h1>
<label>
  <input type="radio" bind:group={encode} name="encode" value={true} />
  Encode
</label>
<label>
  <input type="radio" bind:group={encode} name="encode" value={false} />
  Decode
</label>
<TextareaClipboard bind:value={input} />
<TextareaClipboard bind:value={output} readonly={true} />
{#if error}
  <p>{error}</p>
{/if}
