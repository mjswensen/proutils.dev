<script lang="ts" context="module">
  export type ValidationMessage = {
    type: 'success' | 'warning' | 'error';
    text: string;
    action?: {
      text: string;
      fn: () => void;
    };
  };
</script>

<script lang="ts">
  import { slide } from 'svelte/transition';
  import Copy from './icons/Copy.svelte';
  import Paste from './icons/Paste.svelte';

  export let id: string;
  export let label: string;
  export let placeholder: string;
  export let value: string;
  export let onInput: (value: string) => void;

  export let multiline: boolean = false;
  export let validationMessage: ValidationMessage | null = null;

  async function copy() {
    await navigator.clipboard.writeText(value);
  }

  async function paste() {
    value = await navigator.clipboard.readText();
    onInput(value);
  }
</script>

<div
  class="container"
  class:success={validationMessage?.type === 'success'}
  class:warning={validationMessage?.type === 'warning'}
  class:error={validationMessage?.type === 'error'}
>
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  {#if multiline}
    <textarea
      {id}
      {placeholder}
      on:input={(evt) => {
        onInput(evt.currentTarget.value);
      }}
      {value}
    />
  {:else}
    <input
      {id}
      type="text"
      {placeholder}
      on:input={(evt) => {
        onInput(evt.currentTarget.value);
      }}
      {value}
    />
  {/if}
  <span class="button-group">
    <button class="clipboard-button" on:click={paste}><Paste /></button>
    <button class="clipboard-button" on:click={copy}><Copy /></button>
  </span>
  {#if validationMessage}
    <span class="validation-message" transition:slide={{ duration: 100 }}>
      {validationMessage.text}
      {#if validationMessage.action}
        <button
          class="validation-action"
          on:click={validationMessage.action.fn}
        >
          {validationMessage.action.text}
        </button>
      {/if}
    </span>
  {/if}
</div>

<style>
  .container {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .container.success {
    --validation-background: var(--green-dark);
    --validation-foreground: var(--green-light);
  }
  .container.warning {
    --validation-background: var(--yellow-dark);
    --validation-foreground: var(--yellow-light);
  }
  .container.error {
    --validation-background: var(--red-dark);
    --validation-foreground: var(--red-light);
  }
  label {
    font-size: var(--scale-3);
    font-weight: bold;
    padding: var(--scale-0-5) var(--scale-2-5);
    color: var(--validation-foreground, var(--gray-80));
    transition: color var(--duration) ease-in-out;
  }
  input,
  textarea {
    width: 100%;
    flex-grow: 1;
    background-color: var(--gray-10);
    color: var(--gray-90);
    border: none;
    padding: var(--scale-1-5) var(--scale-2-5);
    border-radius: var(--size-border-radius-large);
    border-width: var(--size-border-width);
    border-style: solid;
    border-color: var(--validation-background, var(--gray-35));
    transition: border-color var(--duration) ease-in-out;
    z-index: 2;
  }
  input::placeholder,
  textarea::placeholder {
    font-style: italic;
    color: var(--gray-90-75);
  }
  .button-group {
    position: absolute;
    top: var(--scale-6-5);
    right: var(--scale-1-5);
    display: flex;
    gap: var(--scale-1-5);
    z-index: 3;
  }
  .clipboard-button {
    display: inline-flex;
    width: var(--scale-5);
    height: var(--scale-5);
    justify-content: center;
    align-items: center;
    padding: 0;
    border: none;
    background: none;
    color: var(--gray-90-75);
  }
  .clipboard-button:hover {
    color: var(--gray-90);
  }
  .clipboard-button:active {
    color: var(--gray-90-75);
  }
  span.validation-message {
    display: flex;
    gap: var(--scale-1);
    --overlap: var(--scale-1);
    font-family: 'Source Sans 3';
    font-size: var(--scale-3-5);
    font-style: italic;
    padding: calc(var(--scale-0-25) + var(--overlap)) var(--scale-2-5)
      var(--scale-0-25);
    background-color: var(--validation-background);
    color: var(--validation-foreground);
    margin-top: calc(var(--overlap) * -1);
    z-index: 1;
    border-bottom-left-radius: var(--size-border-radius-large);
    border-bottom-right-radius: var(--size-border-radius-large);
  }
  .validation-action {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    font-style: normal;
    font-weight: bold;
    color: var(--validation-foreground);
  }
</style>
