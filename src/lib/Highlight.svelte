<script lang="ts" context="module">
  export const DELIMITER = '^';
</script>

<script lang="ts">
  type Chunk = {
    value: string;
    highlight: boolean;
  };

  export let text: string;

  let chunks: Chunk[];
  $: {
    const ret: Chunk[] = [];
    let toSearch = text;
    let highlight = false;
    while (true) {
      const delIdx = toSearch.indexOf(DELIMITER);
      if (delIdx >= 0) {
        ret.push({
          value: toSearch.substring(0, delIdx),
          highlight,
        });
        toSearch = toSearch.substring(delIdx + 1);
        highlight = !highlight;
      } else {
        ret.push({
          value: toSearch,
          highlight,
        });
        break;
      }
    }
    chunks = ret.filter((chunk) => chunk.value.length > 0);
  }
</script>

<span>
  {#each chunks as chunk}
    <span class:highlight={chunk.highlight}>{chunk.value}</span>
  {/each}
</span>

<style>
  .highlight {
    background-color: var(--brand-secondary-18);
    border-bottom: var(--size-border-width) solid var(--brand-secondary);
  }
</style>
