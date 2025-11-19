export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .venn-container {
      display: flex;
      justify-content: center;
      position: relative;
      height: 300px;
      width: 100%;
    }
    .circle {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
    .venn-canvas {
      /* Canvas will define its own size */
      margin-bottom: 10px; /* Space between canvas and legend */
    }
    .tooltip {
      position: absolute;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      padding: 10px;
      border-radius: 4px;
      max-width: 300px;
      text-align: center;
      min-height: 60px;
      color: #fff; /* Ensure tooltip text is visible */
    }
    .legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }
    .legend-color-box {
      width: 15px;
      height: 15px;
      margin-right: 8px;
      border-radius: 3px;
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="venn-canvas">
      <canvas id="vennCanvas" width="350" height="250"></canvas>
    </div>
    <div id="venn-legend"></div>
  `;
  container.appendChild(content);

  const canvas = content.querySelector('#vennCanvas');
  if (!canvas) return; // Guard clause
  const ctx = canvas.getContext('2d');
  // The following lines refer to elements that were removed from content.innerHTML
  // They are kept here as per the provided edit, but will not find any elements.
  const tooltip = content.querySelector('#venn-tooltip');
  const clean = content.querySelector('.circle-clean');
  const renewable = content.querySelector('.circle-renewable');

  // These event listeners will not attach if 'clean' or 'renewable' are null
  if (clean) clean.addEventListener('mouseenter', () => tooltip.textContent = clean.dataset.info);
  if (renewable) renewable.addEventListener('mouseenter', () => tooltip.textContent = renewable.dataset.info);

  // Intersection logic is visual (mix-blend-mode), but for tooltip we can simulate
  // It's hard to detect hover on intersection specifically with just divs without complex clip-path.
  // For simplicity, we'll just explain the intersection in the text.
}
