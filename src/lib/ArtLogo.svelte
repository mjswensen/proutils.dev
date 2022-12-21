<script lang="ts">
  export let small = false;
  $: [width, height] = small ? [12 * 4, 12 * 4] : [130.5 * 4, 24 * 4]; // TODO: get these from CSS scales

  let textMask: HTMLCanvasElement;
  function getTextMask(): HTMLCanvasElement {
    if (!textMask) {
      const canvas = document.createElement('canvas');
      canvas.width = width * 2;
      canvas.height = height * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Error getting text mask canvas context');
      ctx.font = 'italic 900 72px "Source Sans 3"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      if (small) {
        ctx.fillText('P', width / 2, height / 2);
      } else {
        ctx.fillText('ProUtils.dev', width / 2, height / 2);
      }
      textMask = canvas;
    }
    return textMask;
  }

  type Point = { x: number; y: number };
  function getRandomPoint(): Point {
    return { x: Math.random() * width, y: Math.random() * height };
  }

  function action(node: HTMLCanvasElement) {
    const rect = node.getBoundingClientRect();
    const { devicePixelRatio: dpr } = window;
    node.width = rect.width * dpr;
    node.height = rect.height * dpr;
    const ctx = node.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    (function drawFrame(
      ctx: CanvasRenderingContext2D,
      a1Start: Point = getRandomPoint(),
      a2Start: Point = getRandomPoint(),
      b1Start: Point = getRandomPoint(),
      b2Start: Point = getRandomPoint(),
      a1End: Point = getRandomPoint(),
      a2End: Point = getRandomPoint(),
      b1End: Point = getRandomPoint(),
      b2End: Point = getRandomPoint(),
      n: number = 0,
    ) {
      const FRAME_COUNT = 1000;

      // 1. Clear the canvas.

      ctx.clearRect(0, 0, width, height);

      // 2. Draw the frame.
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#fbfdff';
      ctx.fillRect(0, 0, width, height);

      const ctrlA1 = {
        x: a1Start.x + ((a1End.x - a1Start.x) / FRAME_COUNT) * n,
        y: a1Start.y + ((a1End.y - a1Start.y) / FRAME_COUNT) * n,
      };
      const ctrlA2 = {
        x: a2Start.x + ((a2End.x - a2Start.x) / FRAME_COUNT) * n,
        y: a2Start.y + ((a2End.y - a2Start.y) / FRAME_COUNT) * n,
      };
      const ctrlB1 = {
        x: b1Start.x + ((b1End.x - b1Start.x) / FRAME_COUNT) * n,
        y: b1Start.y + ((b1End.y - b1Start.y) / FRAME_COUNT) * n,
      };
      const ctrlB2 = {
        x: b2Start.x + ((b2End.x - b2Start.x) / FRAME_COUNT) * n,
        y: b2Start.y + ((b2End.y - b2Start.y) / FRAME_COUNT) * n,
      };

      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.strokeStyle = '#fc6dab2e';
      for (let x = 0; x <= width; x += 10) {
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(ctrlA1.x, ctrlA1.y, ctrlA2.x, ctrlA2.y, x, height);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#7d53de90';
      for (let x = 0; x <= width; x += 10) {
        ctx.moveTo(x, 0);
        ctx.bezierCurveTo(ctrlB1.x, ctrlB1.y, ctrlB2.x, ctrlB2.y, x, height);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#78e3fd2e';
      for (let y = 0; y <= height; y += 10) {
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(ctrlA1.x, ctrlA1.y, ctrlA2.x, ctrlA2.y, width, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = '#34f6f290';
      for (let y = 0; y <= height; y += 10) {
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(ctrlB1.x, ctrlB1.y, ctrlB2.x, ctrlB2.y, width, y);
      }
      ctx.stroke();

      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(getTextMask(), 0, 0);

      // 3. Calculate new control points.

      if (n === FRAME_COUNT) {
        window.requestAnimationFrame(() =>
          drawFrame(ctx, a1End, a2End, b1End, b2End),
        );
      } else {
        window.requestAnimationFrame(() =>
          drawFrame(
            ctx,
            a1Start,
            a2Start,
            b1Start,
            b2Start,
            a1End,
            a2End,
            b1End,
            b2End,
            n + 1,
          ),
        );
      }
    })(ctx);
  }
</script>

<!-- TODO: alt text is not valid HTML, find another way... title? -->
<canvas
  style="width: {width}px; height: {height}px"
  use:action
  alt="ProUtils.dev logo"
/>
<!-- TODO: redraw on resize? -->
<!-- TODO: redraw on pixel density change? -->
<!-- TODO: animation idea: control points stay the same, endpoints flow around -->

<!-- 
Another idea to explore:
- fixed endpoints (along the edges of the canvas)
- wandering controlpoints
- stroke color calculated from endpoints to form a "gradient" effect

This might be simpler and therefore better suited to the smaller logo.

 -->
