export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .venn-widget {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .venn-stage {
      position: relative;
      height: 250px;
      width: 100%;
      max-width: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }

    .circle {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      mix-blend-mode: multiply; /* Blends colors at intersection */
    }

    .circle-renewable {
      background: rgba(0, 200, 83, 0.6);
      border: 2px solid #00C853;
      transform: translateX(-100px); /* Initial separate state */
      z-index: 1;
    }

    .circle-clean {
      background: rgba(0, 176, 255, 0.6);
      border: 2px solid #00B0FF;
      transform: translateX(100px); /* Initial separate state */
      z-index: 1;
    }

    /* Merged State */
    .venn-stage.merged .circle-renewable {
      transform: translateX(-50px);
    }

    .venn-stage.merged .circle-clean {
      transform: translateX(50px);
    }

    .circle-label {
      color: #fff;
      font-weight: bold;
      font-size: 1rem;
      text-shadow: 0 1px 3px rgba(0,0,0,0.3);
      text-align: center;
      pointer-events: none;
    }

    .intersection-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      color: #fff;
      font-weight: bold;
      font-size: 0.9rem;
      text-align: center;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
      z-index: 10;
      transition: transform 0.5s ease 0.8s; /* Delay appearance */
      opacity: 0;
    }

    .venn-stage.merged .intersection-label {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }

    .controls {
      display: flex;
      gap: 10px;
    }

    .action-btn {
      background: #2196F3;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s;
      font-weight: bold;
    }

    .action-btn:hover {
      background: #1976D2;
    }

    .legend {
      display: flex;
      gap: 15px;
      margin-top: 15px;
      font-size: 0.85rem;
      color: #555;
      flex-wrap: wrap;
      justify-content: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    @media (max-width: 480px) {
      .circle {
        width: 140px;
        height: 140px;
      }
      .circle-renewable { transform: translateX(-60px); }
      .circle-clean { transform: translateX(60px); }
      
      .venn-stage.merged .circle-renewable { transform: translateX(-35px); }
      .venn-stage.merged .circle-clean { transform: translateX(35px); }
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="venn-widget">
      <div class="venn-stage" id="venn-stage">
        <div class="circle circle-renewable">
          <span class="circle-label">Renewable<br><small>(Sun/Wind)</small></span>
        </div>
        <div class="circle circle-clean">
          <span class="circle-label">Clean<br><small>(Nuclear)</small></span>
        </div>
        <div class="intersection-label">
          BOTH<br><small>(RECs)</small>
        </div>
      </div>

      <div class="controls">
        <button class="action-btn" id="toggle-btn">Analyze Overlap</button>
      </div>

      <div class="legend">
        <div class="legend-item"><div class="dot" style="background:#00C853"></div>Renewable</div>
        <div class="legend-item"><div class="dot" style="background:#00B0FF"></div>Clean</div>
        <div class="legend-item"><div class="dot" style="background:#00695C"></div>Intersection</div>
      </div>
    </div>
  `;
  container.appendChild(content);

  const stage = content.querySelector('#venn-stage');
  const btn = content.querySelector('#toggle-btn');
  let isMerged = false;

  btn.addEventListener('click', () => {
    isMerged = !isMerged;
    if (isMerged) {
      stage.classList.add('merged');
      btn.textContent = 'Separate Concepts';
    } else {
      stage.classList.remove('merged');
      btn.textContent = 'Analyze Overlap';
    }
  });
}
