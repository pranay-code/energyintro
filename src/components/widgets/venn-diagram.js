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
  // Draw Circles
  // Renewable (Left)
  ctx.beginPath();
  ctx.arc(120, 125, 90, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 200, 83, 0.5)'; // Darker Green, more opaque
  ctx.fill();
  ctx.strokeStyle = '#00C853';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Clean (Right)
  ctx.beginPath();
  ctx.arc(230, 125, 90, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 176, 255, 0.5)'; // Darker Blue, more opaque
  ctx.fill();
  ctx.strokeStyle = '#00B0FF';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Labels
  ctx.fillStyle = '#1B5E20'; // Dark Green Text
  ctx.font = 'bold 14px Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('RENEWABLE', 90, 125);

  ctx.fillStyle = '#01579B'; // Dark Blue Text
  ctx.fillText('CLEAN', 260, 125);

  ctx.fillStyle = '#004D40'; // Dark Teal Text
  ctx.font = 'bold 12px Roboto, sans-serif';
  ctx.fillText('BOTH', 175, 125);
  ctx.font = '10px Roboto, sans-serif';
  ctx.fillText('(Solar/Wind)', 175, 140);

  // Legend
  const legend = content.querySelector('#venn-legend');
  if (legend) {
    legend.innerHTML = `
      <div class="legend-item"><div class="legend-color-box" style="background:#00C853"></div><strong>Renewable:</strong> Naturally replenished (Sun, Wind).</div>
      <div class="legend-item"><div class="legend-color-box" style="background:#00B0FF"></div><strong>Clean:</strong> Low Carbon (Nuclear, Hydro).</div>
      <div class="legend-item"><div class="legend-color-box" style="background:#004D40"></div><strong>Both:</strong> The sweet spot (RECs).</div>
    `;
  }
}
