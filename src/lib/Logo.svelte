<script lang="ts">
  export let size = 156;
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 156 156"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path class="backing" d="m71 48 60 90H71V48Z" />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M71 18H41v120h30v-30a45 45 0 0 0 0-90Z"
    fill="url(#main)"
  />
  <path d="m71 48 60 90H71V48Z" fill="url(#foreground)" />
  <defs>
    <linearGradient
      id="main"
      x1="78.5"
      y1="18"
      x2="78.5"
      y2="138"
      gradientUnits="userSpaceOnUse"
    >
      <stop class="main-top" />
      <stop class="main-bottom" offset="1" />
    </linearGradient>
    <linearGradient
      id="foreground"
      x1="101"
      y1="48"
      x2="101"
      y2="138"
      gradientUnits="userSpaceOnUse"
    >
      <stop class="foreground" />
      <stop class="foreground" offset=".7" stop-opacity=".25" />
    </linearGradient>
  </defs>
</svg>

<style>
  .backing {
    fill: var(--brand-tertiary);
  }
  .main-top {
    stop-color: var(--brand-quaternary);
  }
  .main-bottom {
    stop-color: var(--brand-primary);
  }
  .foreground {
    stop-color: var(--brand-secondary);
  }
</style>
