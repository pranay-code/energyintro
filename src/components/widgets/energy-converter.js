export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .converter-container {
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      font-family: 'Inter', sans-serif;
    }
    .source-selector {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    .source-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #eee;
      background: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .source-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .source-btn.active {
      border-color: #2196F3;
      background: #E3F2FD;
      transform: scale(1.1);
    }
    
    .path-display {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 120px;
      flex-wrap: wrap;
    }
    
    .stage {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease;
    }
    .stage.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .stage-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      border: 2px solid transparent;
      transition: all 0.3s;
    }
    .stage.active .stage-icon {
      background: #fff;
      border-color: #4CAF50;
      box-shadow: 0 0 15px rgba(76, 175, 80, 0.3);
      transform: scale(1.1);
    }
    
    .stage-label {
      font-size: 0.8rem;
      color: #666;
      font-weight: 500;
    }
    
    .arrow {
      color: #ccc;
      font-size: 1.2rem;
      opacity: 0;
      transition: opacity 0.5s;
    }
    .arrow.visible {
      opacity: 1;
    }
    
    .description {
      margin-top: 20px;
      font-size: 0.9rem;
      color: #555;
      min-height: 40px;
      font-style: italic;
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.className = 'converter-container';
  content.innerHTML = `
    <div class="source-selector">
      <button class="source-btn active" data-source="coal" title="Coal">🪨</button>
      <button class="source-btn" data-source="wind" title="Wind">💨</button>
      <button class="source-btn" data-source="solar" title="Solar">☀️</button>
      <button class="source-btn" data-source="hydro" title="Hydro">💧</button>
      <button class="source-btn" data-source="biomass" title="Biomass">🌱</button>
    </div>
    
    <div class="path-display" id="path-display">
      <!-- Stages injected here -->
    </div>
    
    <div class="description" id="desc-text">
      Select a source to see how it becomes electricity.
    </div>
  `;
  container.appendChild(content);

  const pathDisplay = content.querySelector('#path-display');
  const descText = content.querySelector('#desc-text');
  const buttons = content.querySelectorAll('.source-btn');

  const sources = {
    coal: {
      stages: [
        { icon: '🪨', label: 'Chemical' },
        { icon: '🔥', label: 'Thermal' },
        { icon: '⚙️', label: 'Mechanical' },
        { icon: '⚡', label: 'Electrical' }
      ],
      desc: "Coal is burned (Thermal) to make steam, which spins a turbine (Mechanical)."
    },
    wind: {
      stages: [
        { icon: '💨', label: 'Kinetic' },
        { icon: '⚙️', label: 'Mechanical' },
        { icon: '⚡', label: 'Electrical' }
      ],
      desc: "Wind moves the blades directly (Kinetic -> Mechanical)."
    },
    solar: {
      stages: [
        { icon: '☀️', label: 'Radiant' },
        { icon: '⚡', label: 'Electrical' }
      ],
      desc: "Solar PV is special. It converts light directly to electricity with no moving parts!"
    },
    hydro: {
      stages: [
        { icon: '🌊', label: 'Gravitational' },
        { icon: '💨', label: 'Kinetic' },
        { icon: '⚙️', label: 'Mechanical' },
        { icon: '⚡', label: 'Electrical' }
      ],
      desc: "Falling water (Gravity) gains speed (Kinetic) to spin the turbine."
    },
    biomass: {
      stages: [
        { icon: '🌱', label: 'Chemical' },
        { icon: '🔥', label: 'Thermal' },
        { icon: '⚙️', label: 'Mechanical' },
        { icon: '⚡', label: 'Electrical' }
      ],
      desc: "Similar to coal, but uses organic matter as fuel."
    }
  };

  function renderPath(sourceKey) {
    const data = sources[sourceKey];
    descText.textContent = data.desc;
    pathDisplay.innerHTML = '';

    data.stages.forEach((stage, index) => {
      // Arrow (except for first item)
      if (index > 0) {
        const arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.textContent = '→';
        pathDisplay.appendChild(arrow);
      }

      // Stage
      const stageEl = document.createElement('div');
      stageEl.className = 'stage';
      stageEl.innerHTML = `
        <div class="stage-icon">${stage.icon}</div>
        <div class="stage-label">${stage.label}</div>
      `;
      pathDisplay.appendChild(stageEl);
    });

    // Animate
    const elements = pathDisplay.children;
    Array.from(elements).forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
        if (el.classList.contains('stage')) {
          el.classList.add('active');
          // Remove active class after a short delay to simulate "passing through"
          setTimeout(() => el.classList.remove('active'), 1000);
          // Keep the last one active (Electrical)
          if (i === elements.length - 1) {
            setTimeout(() => el.classList.add('active'), 1000);
          }
        }
      }, i * 300);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPath(btn.dataset.source);
    });
  });

  // Initial render
  renderPath('coal');
}
