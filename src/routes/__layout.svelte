<slot />

<style>
  /* Reset */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :global(body, h1, h2, h3, h4, p, figure, blockquote, dl, dd) {
    margin: 0;
  }

  :global(body) {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
  }

  :global(a:not([class])) {
    text-decoration-skip-ink: auto;
  }

  :global(input, button, textarea, select) {
    font: inherit;
  }

  /* Base */

  :global(html) {
    --ratio: 0.75;
    --size-regular: 1em;

    --size-small-1: calc(var(--size-regular) * var(--ratio));
    --size-small-2: calc(var(--size-small-1) * var(--ratio));
    --size-small-3: calc(var(--size-small-2) * var(--ratio));

    --size-large-1: calc(var(--size-regular) / var(--ratio));
    --size-large-2: calc(var(--size-large-1) / var(--ratio));
    --size-large-3: calc(var(--size-large-2) / var(--ratio));
    --size-large-4: calc(var(--size-large-3) / var(--ratio));

    font-size: 12pt;
    line-height: calc(1 / var(--ratio));

    background-color: var(--background-color);
    color: var(--foreground-color);
    font-family: system-ui;
  }

  /* Theme */

  :global(html) {
    --background-color: #eeeeee;
    --foreground-color: #333333;
  }
  /* @media (prefers-color-scheme: dark) {
    :global(html) {
      --background-color: #333333;
      --foreground-color: #eeeeee;
    }
  } */
</style>
