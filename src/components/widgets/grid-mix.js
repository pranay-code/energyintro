export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .mix-container {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      padding: 20px;
      text-align: center;
      max-width: 400px;
      margin: 0 auto;
      font-family: 'Inter', sans-serif;
    }
    .waffle-grid {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 6px;
      margin: 20px auto;
      width: fit-content;
    }
    .dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #eee;
      transition: transform 0.2s, opacity 0.2s;
      cursor: pointer;
    }
    .dot:hover {
      transform: scale(1.3);
      z-index: 10;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      font-size: 0.8rem;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .legend-item:hover {
      background: #f5f5f5;
    }
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .stats-overlay {
      min-height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }
    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
    }
    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }
    
    /* Colors */
    .coal { background-color: #546E7A; } /* Grey Blue */
    .solar { background-color: #FFC107; } /* Amber */
    .wind { background-color: #03A9F4; } /* Light Blue */
    .hydro { background-color: #00BCD4; } /* Cyan */
    .nuclear { background-color: #9C27B0; } /* Purple */
    .bio { background-color: #8D6E63; } /* Brown */
  `;
    container.appendChild(style);

    // Data (June 2025 Estimates - Total ~476 GW)
    // Percentages approximated to fit 100 dots
    const data = [
        { id: 'coal', label: 'Thermal (Coal/Gas)', percent: 51, capacity: '240 GW', color: '#546E7A' },
        { id: 'solar', label: 'Solar', percent: 22, capacity: '106 GW', color: '#FFC107' },
        { id: 'wind', label: 'Wind', percent: 11, capacity: '50 GW', color: '#03A9F4' },
        { id: 'hydro', label: 'Large Hydro', percent: 10, capacity: '48 GW', color: '#00BCD4' },
        { id: 'bio', label: 'Biomass/Small Hydro', percent: 4, capacity: '23 GW', color: '#8D6E63' },
        { id: 'nuclear', label: 'Nuclear', percent: 2, capacity: '9 GW', color: '#9C27B0' }
    ];

    const content = document.createElement('div');
    content.className = 'mix-container';
    content.innerHTML = `
    <div class="stats-overlay" id="stats-display">
      <div class="stat-value">476 GW</div>
      <div class="stat-label">Total Installed Capacity</div>
    </div>
    <div class="waffle-grid" id="grid"></div>
    <div class="legend" id="legend"></div>
  `;
    container.appendChild(content);

    const grid = content.querySelector('#grid');
    const legend = content.querySelector('#legend');
    const statsDisplay = content.querySelector('#stats-display');

    // Generate Dots
    let dotIndex = 0;
    data.forEach(source => {
        for (let i = 0; i < source.percent; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${source.id}`;
            dot.dataset.source = source.id;
            dot.style.animation = `fadeIn 0.3s ease forwards ${dotIndex * 0.01}s`;
            dot.style.opacity = '0'; // Start hidden for animation

            // Hover Event
            dot.addEventListener('mouseenter', () => showStats(source));
            dot.addEventListener('mouseleave', resetStats);

            grid.appendChild(dot);
            dotIndex++;

            // Animate in
            setTimeout(() => dot.style.opacity = '1', dotIndex * 10);
        }

        // Legend Item
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
      <div class="legend-color ${source.id}"></div>
      <span>${source.label}</span>
    `;
        legendItem.addEventListener('mouseenter', () => {
            highlightSource(source.id);
            showStats(source);
        });
        legendItem.addEventListener('mouseleave', () => {
            resetHighlight();
            resetStats();
        });
        legend.appendChild(legendItem);
    });

    function showStats(source) {
        statsDisplay.innerHTML = `
      <div class="stat-value" style="color: ${source.color}">${source.capacity}</div>
      <div class="stat-label">${source.label} (${source.percent}%)</div>
    `;
    }

    function resetStats() {
        statsDisplay.innerHTML = `
      <div class="stat-value">476 GW</div>
      <div class="stat-label">Total Installed Capacity</div>
    `;
    }

    function highlightSource(sourceId) {
        const dots = grid.querySelectorAll('.dot');
        dots.forEach(dot => {
            if (dot.dataset.source !== sourceId) {
                dot.style.opacity = '0.2';
                dot.style.transform = 'scale(0.8)';
            } else {
                dot.style.opacity = '1';
                dot.style.transform = 'scale(1.1)';
            }
        });
    }

    function resetHighlight() {
        const dots = grid.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.style.opacity = '1';
            dot.style.transform = 'scale(1)';
        });
    }
}
