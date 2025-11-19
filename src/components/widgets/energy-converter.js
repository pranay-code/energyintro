export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .converter-stage {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      opacity: 0.5;
      transition: all 0.5s;
    }
    .converter-stage.active {
      opacity: 1;
      transform: scale(1.1);
    }
    .icon-box {
      width: 80px;
      height: 80px;
      border: 2px solid var(--neon-cyan);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0, 176, 255, 0.2);
      color: #333;
    }
    .arrow {
      font-size: 2rem;
      color: var(--text-muted);
      animation: pulse-arrow 1s infinite;
    }
    @keyframes pulse-arrow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    .stage-label {
      font-family: var(--font-mono);
      color: var(--text-main);
      font-size: 0.9rem;
    }
    .flow-container {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 20px;
    }
    .controls {
      margin-top: 30px;
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="flow-container">
      <div class="converter-stage" id="stage-1">
        <div class="icon-box">🔥</div>
        <div class="stage-label">Thermal</div>
      </div>
      <div class="arrow">→</div>
      <div class="converter-stage" id="stage-2">
        <div class="icon-box">⚙️</div>
        <div class="stage-label">Mechanical</div>
      </div>
      <div class="arrow">→</div>
      <div class="converter-stage" id="stage-3">
        <div class="icon-box">⚡</div>
        <div class="stage-label">Electrical</div>
      </div>
    </div>
    <div class="controls">
      <button class="btn" id="animate-btn">Simulate Conversion</button>
    </div>
  `;
  container.appendChild(content);

  const btn = content.querySelector('#animate-btn');
  const stages = [
    content.querySelector('#stage-1'),
    content.querySelector('#stage-2'),
    content.querySelector('#stage-3')
  ];

  btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.textContent = 'Simulating...';

    // Reset
    stages.forEach(s => s.classList.remove('active'));

    // Sequence
    setTimeout(() => stages[0].classList.add('active'), 100);
    setTimeout(() => stages[1].classList.add('active'), 1500);
    setTimeout(() => stages[2].classList.add('active'), 3000);

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Simulate Conversion';
    }, 4500);
  });
}
