<script lang="ts">
  import Fuse from 'fuse.js';

  let filterString = '';

  const tools = [
    {
      url: '/tools/encode-decode/base64',
      title: 'Base 64',
      category: 'Encode / Decode',
    },
    {
      url: '/tools/encode-decode/html-entity',
      title: 'HTML Entity',
      category: 'Encode / Decode',
    },
    {
      url: '/tools/encode-decode/url',
      title: 'URL',
      category: 'Encode / Decode',
    },
    {
      url: '/tools/encode-decode/jwt',
      title: 'JWT',
      category: 'Encode / Decode',
    },
    {
      url: '/tools/convert/color',
      title: 'Color',
      category: 'Convert',
    },
    {
      url: '/tools/convert/timestamp',
      title: 'Timestamp',
      category: 'Convert',
    },
    {
      url: '/tools/develop/regex',
      title: 'Regex',
      category: 'Develop',
    },
    {
      url: '/tools/transform/json',
      title: 'JSON',
      category: 'Transform',
    },
  ];

  const fuse = new Fuse(tools, {
    keys: ['title'],
  });

  $: result = filterString
    ? fuse.search(filterString)
    : tools.map((tool) => ({ item: tool }));
</script>

<div class="container">
  <nav class="sidebar">
    <a href="/">ProUtils.dev</a>
    <input type="search" placeholder="Filter..." bind:value={filterString} />
    {#each result as tool (tool.item.url)}
      <a class="tool" href={tool.item.url}>
        {tool.item.title}
      </a>
    {/each}
  </nav>
  <main>
    <slot />
  </main>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: var(--size-small-1);
    padding: var(--size-small-1);
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--size-small-3);
  }
  .tool {
    display: block;
    background-color: #ddd;
    padding: var(--size-small-3) var(--size-small-1);
    border: 1px solid #ccc;
  }
</style>
