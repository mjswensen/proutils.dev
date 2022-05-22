<script lang="ts">
  import { slide } from 'svelte/transition';
  import Copy from './icons/Copy.svelte';
  import Paste from './icons/Paste.svelte';

  export let placeholder: string;
  export let value: string;
  export let onInput: (value: string) => void;

  export let multiline: boolean = false;
  export let warning: string | null = null;
  export let warningAction: {
    text: string;
    action: () => void;
  } | null = null;

  async function copy() {
    await navigator.clipboard.writeText(value);
  }

  async function paste() {
    value = await navigator.clipboard.readText();
    onInput(value);
  }
</script>

<div class="container">
  {#if multiline}
    <textarea
      {placeholder}
      class:warning-state={!!warning}
      on:input={(evt) => {
        onInput(evt.currentTarget.value);
      }}
      {value}
    />
  {:else}
    <input
      type="text"
      class:warning-state={!!warning}
      {placeholder}
      bind:value
    />
  {/if}
  <span class="button-group">
    <button class="clipboard-button" on:click={paste}><Paste /></button>
    <button class="clipboard-button" on:click={copy}><Copy /></button>
  </span>
  {#if warning}
    <span class="warning" transition:slide={{ duration: 100 }}>
      {warning}
      {#if warningAction}
        <button class="warning-action" on:click={warningAction.action}>
          {warningAction.text}
        </button>
      {/if}
    </span>
  {/if}
</div>

<style>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
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
    border: var(--size-border-width) solid var(--gray-35);
    transition: border-color var(--duration) ease-in-out;
    z-index: 2;
  }
  input.warning-state,
  textarea.warning-state {
    border-color: var(--yellow-dark);
  }
  input::placeholder,
  textarea::placeholder {
    font-style: italic;
    color: var(--gray-90-75);
  }
  .button-group {
    position: absolute;
    top: var(--scale-1-5);
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
  span.warning {
    display: flex;
    gap: var(--scale-1);
    --overlap: var(--scale-1);
    font-family: 'Source Sans 3';
    font-size: var(--scale-3-5);
    font-style: italic;
    padding: calc(var(--scale-0-25) + var(--overlap)) var(--scale-2-5)
      var(--scale-0-25);
    background-color: var(--yellow-dark);
    color: var(--yellow-light);
    margin-top: calc(var(--overlap) * -1);
    z-index: 1;
    border-bottom-left-radius: var(--size-border-radius-large);
    border-bottom-right-radius: var(--size-border-radius-large);
  }
  .warning-action {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    font-style: normal;
    font-weight: bold;
    color: var(--yellow-light);
  }
</style>
