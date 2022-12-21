<!-- TODO: needed? -->

<button class="button"><slot /></button>

<style>
  .button {
    background-color: var(--gray-30);
    color: var(--gray-90);
    padding: var(--scale-1-5) var(--scale-3);
    border: none;
    border-radius: var(--size-border-radius);
    box-shadow: 0 1px 4px var(--gray-00);
    transition: all var(--duration) ease-in-out;
  }
  .button:hover {
    background-color: var(--gray-35);
  }
  .button:active {
    background-color: var(--gray-20);
    box-shadow: none;
  }
</style>
