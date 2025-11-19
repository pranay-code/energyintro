export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .matrix-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 100%;
      max-width: 500px;
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
    }
    .energy-node.active {
      background: var(--neon-cyan);
      color: #000;
      box-shadow: 0 0 20px var(--neon-cyan);
    }
    .energy-node.target {
      border-color: var(--solar-orange);
      color: var(--solar-orange);
      box-shadow: 0 0 10px var(--solar-orange);
    }
    .node-icon {
      font-size: 1.5rem;
      margin-bottom: 5px;
      display: block;
    }
    .description-box {
      margin-top: 20px;
      padding: 15px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      min-height: 60px;
      text-align: center;
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.9rem;
    }
  `;
  container.appendChild(style);

  const types = [
    { id: 'chemical', icon: '🧪', label: 'Chemical', targets: ['thermal'] },
    { id: 'thermal', icon: '🔥', label: 'Thermal', targets: ['kinetic'] },
    { id: 'kinetic', icon: '⚙️', label: 'Kinetic', targets: ['electrical', 'potential'] },
    { id: 'potential', icon: '🌊', label: 'Potential', targets: ['kinetic'] },
    { id: 'electrical', icon: '⚡', label: 'Electrical', targets: ['thermal', 'kinetic', 'chemical'] },
    { id: 'electromagnetic', icon: '☀️', label: 'Electromagnetic', targets: ['electrical', 'thermal'] }
  ];

  const grid = document.createElement('div');
  grid.className = 'matrix-grid';

  const descBox = document.createElement('div');
  descBox.className = 'description-box';
  descBox.textContent = 'Click an energy type to see its common transformations.';

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

      // Highlight targets
      type.targets.forEach(targetId => {
        const targetNode = grid.querySelector(`[data-id="${targetId}"]`);
        if (targetNode) targetNode.classList.add('target');
      });

      descBox.innerHTML = `<strong>${type.label}</strong> energy can be converted into <span style="color: var(--solar-orange)">${type.targets.join(', ')}</span> energy.`;
    });

    grid.appendChild(node);
  });

  container.appendChild(grid);
  container.appendChild(descBox);
}
