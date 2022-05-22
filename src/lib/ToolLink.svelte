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
    padding: var(--scale-1-5);
    text-decoration: none;
    color: var(--gray-90);
    display: flex;
    align-items: center;
    gap: var(--scale-1-5);
  }
  .tool:hover {
    background-image: linear-gradient(
      to right,
      var(--gray-10),
      var(--gray-20) var(--scale-2)
    );
  }
  .tool.current {
    background-image: linear-gradient(
      to right,
      var(--brand-primary-dark),
      var(--brand-primary) var(--scale-9)
    );
  }
  .title {
    display: flex;
    align-items: baseline;
    gap: var(--scale-2-5);
  }
  .subtitle {
    font-size: var(--scale-3);
    text-transform: uppercase;
    letter-spacing: var(--size-letter-spacing-wide);
    color: var(--gray-90-75);
  }
</style>
