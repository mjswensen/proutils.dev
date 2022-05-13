<script lang="ts">
  import { page } from '$app/stores';
  import TextIcon from './TextIcon.svelte';
  import Highlight from './Highlight.svelte';

  export let href: string;
  export let title: string;
  export let icon: string;
  export let subtitle: string = '';

  $: current = $page.url.pathname === href;
</script>

<a class="tool" class:current {href}>
  <TextIcon text={icon} />
  <span class="title">
    <Highlight text={title} />
    {#if subtitle}
      <span class="subtitle">{subtitle}</span>
    {/if}
  </span>
</a>

<style>
  .tool {
    border-radius: var(--size-border-radius);
    padding: var(--size-small-3);
    text-decoration: none;
    color: var(--gray-90);
    display: flex;
    align-items: center;
    gap: var(--size-small-3);
  }
  .tool:hover {
    background-image: linear-gradient(
      to right,
      var(--gray-10),
      var(--gray-20) var(--size-small-3)
    );
  }
  .tool.current {
    background-image: linear-gradient(
      to right,
      var(--brand-primary-dark),
      var(--brand-primary) var(--size-large-3)
    );
  }
  .title {
    display: flex;
    align-items: baseline;
    gap: var(--size-small-2);
  }
  .subtitle {
    font-size: var(--size-small-1);
    text-transform: uppercase;
    letter-spacing: var(--size-letter-spacing-wide);
    color: var(--gray-90-75);
  }
</style>
