<script lang="ts">
  export let text: string;
</script>

<span class="icon">{text}</span>

<style>
  .icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: var(--size-large-1);
    height: var(--size-large-1);
    font-size: var(--size-small-2);
    background-image: linear-gradient(
      to bottom,
      var(--gray-90-25),
      var(--gray-90-18)
    );
    border-radius: var(--size-border-radius);
    border: var(--size-border-width) solid var(--gray-90-25);
    backdrop-filter: blur(4px);
    box-shadow: 0 1px 3px var(--gray-00-56);
  }
</style>
