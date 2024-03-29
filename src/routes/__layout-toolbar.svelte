<script lang="ts" context="module">
  type Tool = { url: string; title: string; icon: string };
  type Category = { title: string; tools: Tool[] };
  type FlatTool = Tool & { category: string };

  const categories: Category[] = [
    {
      title: 'Convert',
      tools: [
        {
          url: '/tools/convert/color',
          title: 'Color',
          icon: '#',
        },
        {
          url: '/tools/convert/number',
          title: 'Number',
          icon: '0x',
        },
        {
          url: '/tools/convert/timestamp',
          title: 'Timestamp',
          icon: 'T',
        },
      ],
    },
    {
      title: 'Develop',
      tools: [
        {
          url: '/tools/develop/regex',
          title: 'Regex',
          icon: '.*',
        },
      ],
    },
    {
      title: 'Encode / Decode',
      tools: [
        {
          url: '/tools/encode-decode/base64',
          title: 'Base 64',
          icon: '64',
        },
        {
          url: '/tools/encode-decode/html-entity',
          title: 'HTML Entity',
          icon: '&;',
        },
        {
          url: '/tools/encode-decode/jwt',
          title: 'JWT',
          icon: 'J',
        },
        {
          url: '/tools/encode-decode/url',
          title: 'URL',
          icon: '%',
        },
      ],
    },
    {
      title: 'Format',
      tools: [
        {
          url: '/tools/format/css',
          title: 'CSS',
          icon: 'h1',
        },
        {
          url: '/tools/format/html',
          title: 'HTML',
          icon: '</>',
        },
        {
          url: '/tools/format/javascript',
          title: 'JavaScript',
          icon: 'JS',
        },
      ],
    },
    {
      title: 'Inspect',
      tools: [
        {
          url: '/tools/inspect/diff',
          title: 'Diff',
          icon: '+/-',
        },
      ],
    },
    {
      title: 'Parse',
      tools: [
        {
          url: '/tools/parse/url',
          title: 'URL',
          icon: '://',
        },
      ],
    },
    {
      title: 'Transform',
      tools: [
        {
          url: '/tools/transform/json',
          title: 'JSON',
          icon: '{}',
        },
      ],
    },
  ];

  const searchTargets = categories.reduce<FlatTool[]>(
    (acc, { title, tools }) =>
      acc.concat(tools.map((tool) => ({ ...tool, category: title }))),
    [],
  );

  const version = __APP_VERSION__;
</script>

<script lang="ts">
  import fuzzysort from 'fuzzysort';
  import ToolLink from '$lib/ToolLink.svelte';
  import Logo from '$lib/Logo.svelte';
  import { DELIMITER } from '$lib/Highlight.svelte';

  let filterString = '';

  let result: Fuzzysort.KeyResults<FlatTool>;
  $: result = fuzzysort.go(filterString, searchTargets, { key: 'title' });
</script>

<div class="container">
  <nav class="sidebar">
    <a class="home" href="/"><Logo small /></a>
    <input
      class="filter"
      type="search"
      placeholder="Filter..."
      bind:value={filterString}
    />
    <div class="groups">
      {#if result.length}
        <div class="group">
          {#each result as tool (tool.obj.url)}
            <ToolLink
              href={tool.obj.url}
              title={fuzzysort.highlight(tool, DELIMITER, DELIMITER) ||
                tool.obj.title}
              subtitle={tool.obj.category}
              icon={tool.obj.icon}
            />
          {/each}
        </div>
      {:else}
        {#each categories as category}
          <div class="group">
            <span class="category-heading">{category.title}</span>
            {#each category.tools as tool}
              <ToolLink href={tool.url} title={tool.title} icon={tool.icon} />
            {/each}
          </div>
        {/each}
      {/if}
    </div>
    <footer>Version {version}</footer>
  </nav>
  <main>
    <slot />
  </main>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: var(--scale-72) 1fr;
    height: 100%;
  }
  .sidebar {
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: var(--scale-3);
    background-color: var(--gray-00);
    padding: var(--scale-3);
  }
  .home {
    text-align: center;
    text-decoration: none;
    color: var(--gray-90);
  }
  .filter {
    background-color: var(--gray-00);
    color: var(--gray-90);
    border: var(--size-border-width) solid var(--gray-40);
    border-radius: var(--size-border-radius);
    padding: var(--scale-1) var(--scale-2);
  }
  .filter::placeholder {
    color: var(--gray-90-75);
    font-style: italic;
  }
  .groups {
    display: flex;
    flex-direction: column;
    gap: var(--scale-3);
    overflow-y: scroll;
    flex: 1;
  }
  .group {
    display: flex;
    flex-direction: column;
  }
  .category-heading {
    display: inline-block;
    font-size: var(--scale-3);
    text-transform: uppercase;
    letter-spacing: var(--size-letter-spacing-wide);
    padding: var(--scale-1) var(--scale-2);
    color: var(--gray-90-75);
  }
  .sidebar footer {
    text-align: center;
    font-size: var(--scale-3);
    color: var(--gray-50);
  }
</style>
