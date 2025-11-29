export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .matrix-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 100%;
      max-width: 600px;
      margin-bottom: 20px;
    }
    .energy-node {
      background: #fff;
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      color: var(--text-main);
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    .energy-node:hover {
      background: rgba(0, 176, 255, 0.1);
      border-color: var(--neon-cyan);
      transform: translateY(-2px);
    }
    .energy-node.active {
      background: var(--neon-cyan);
      color: #000;
      box-shadow: 0 0 20px var(--neon-cyan);
      border-color: var(--neon-cyan);
    }
    .energy-node.target {
      border-color: var(--solar-orange);
      background: rgba(255, 152, 0, 0.1);
      color: var(--solar-orange);
      box-shadow: 0 0 10px var(--solar-orange);
    }
    .node-icon {
      font-size: 1.8rem;
      margin-bottom: 8px;
      display: block;
    }
    .description-box {
      margin-top: 20px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid var(--neon-cyan);
      border-radius: 12px;
      min-height: 100px;
      text-align: left;
      color: #333;
      font-family: var(--font-main);
      font-size: 1rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    .conversion-list {
      list-style: none;
      padding: 0;
      margin: 10px 0 0 0;
    }
    .conversion-item {
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
    }
    .conversion-item::before {
      content: "→";
      position: absolute;
      left: 0;
      color: var(--solar-orange);
    }
    .example-text {
      font-style: italic;
      color: #666;
      font-size: 0.9em;
    }
  `;
  container.appendChild(style);

  // Expanded data structure with examples
  const types = [
    {
      id: 'chemical',
      icon: '🧪',
      label: 'Chemical',
      conversions: [
        { target: 'thermal', example: 'Burning Coal or Gas (Combustion)' },
        { target: 'electrical', example: 'Battery Discharging (Galvanic Cell)' },
        { target: 'kinetic', example: 'Muscle Movement (ATP)' }
      ]
    },
    {
      id: 'thermal',
      icon: '🔥',
      label: 'Thermal',
      conversions: [
        { target: 'kinetic', example: 'Steam Turbine / Internal Combustion Engine' },
        { target: 'radiant', example: 'Glowing Red Hot Metal (Blackbody Radiation)' }
      ]
    },
    {
      id: 'kinetic',
      icon: '⚙️',
      label: 'Kinetic',
      conversions: [
        { target: 'electrical', example: 'Wind Turbine / Generator (Induction)' },
        { target: 'thermal', example: 'Friction / Brakes heating up' },
        { target: 'potential', example: 'Pumped Hydro (Moving water up)' }
      ]
    },
    {
      id: 'potential',
      icon: '🌊',
      label: 'Potential',
      conversions: [
        { target: 'kinetic', example: 'Water falling from Dam (Hydro)' }
      ]
    },
    {
      id: 'electrical',
      icon: '⚡',
      label: 'Electrical',
      conversions: [
        { target: 'thermal', example: 'Electric Heater / Toaster / Iron' },
        { target: 'kinetic', example: 'Electric Motor / Fan / EV' },
        { target: 'chemical', example: 'Charging a Battery / Electrolysis' },
        { target: 'radiant', example: 'Light Bulb / LED' },
        { target: 'sound', example: 'Loudspeaker' }
      ]
    },
    {
      id: 'radiant',
      icon: '☀️',
      label: 'Radiant',
      conversions: [
        { target: 'electrical', example: 'Solar Panels (PV Effect)' },
        { target: 'thermal', example: 'Solar Water Heater' },
        { target: 'chemical', example: 'Photosynthesis in Plants' }
      ]
    },
    {
      id: 'sound',
      icon: '🔊',
      label: 'Sound',
      conversions: [
        { target: 'electrical', example: 'Microphone (Piezoelectric)' }
      ]
    }
  ];

  const grid = document.createElement('div');
  grid.className = 'matrix-grid';

  const descBox = document.createElement('div');
  descBox.className = 'description-box';
  descBox.innerHTML = '<p style="text-align:center; margin-top: 30px; color: #666;">Click an energy type above to see how it transforms.</p>';

  types.forEach(type => {
    const node = document.createElement('div');
    node.className = 'energy-node';
    node.dataset.id = type.id;
    node.innerHTML = `
      <span class="node-icon">${type.icon}</span>
      <span>${type.label}</span>
    `;

    node.addEventListener('click', () => {
      // Reset
      grid.querySelectorAll('.energy-node').forEach(n => {
        n.classList.remove('active', 'target');
      });

      // Activate clicked
      node.classList.add('active');

      // Highlight targets and build description
      const targets = type.conversions.map(c => c.target);

      targets.forEach(targetId => {
        const targetNode = grid.querySelector(`[data-id="${targetId}"]`);
        if (targetNode) targetNode.classList.add('target');
      });

      // Update Description Box
      let html = `<h3>${type.icon} ${type.label} Energy Conversions</h3><ul class="conversion-list">`;
      type.conversions.forEach(conv => {
        // Find target label
        const targetType = types.find(t => t.id === conv.target);
        const targetLabel = targetType ? targetType.label : conv.target;

        html += `
            <li class="conversion-item">
                To <strong>${targetLabel}</strong>: <span class="example-text">${conv.example}</span>
            </li>
         `;
      });
      html += '</ul>';
      descBox.innerHTML = html;
    });

    grid.appendChild(node);
  });

  container.appendChild(grid);
  container.appendChild(descBox);
}
