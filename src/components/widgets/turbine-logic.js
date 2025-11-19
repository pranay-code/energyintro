export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .gen-container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-bottom: 20px;
    }
    .gen-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 150px;
    }
    /* Turbine */
    .turbine-pole {
      width: 8px;
      height: 80px;
      background: #A0A0A0;
      position: relative;
      top: 40px;
    }
    .turbine-blades {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -50px;
      left: -46px;
      transition: transform 2s ease-in;
    }
    .blade {
      width: 10px;
      height: 50px;
      background: var(--neon-cyan);
      position: absolute;
      left: 45px;
      top: 0;
      transform-origin: bottom center;
      border-radius: 50% 50% 0 0;
    }
    .blade:nth-child(1) { transform: rotate(0deg); }
    .blade:nth-child(2) { transform: rotate(120deg); }
    .blade:nth-child(3) { transform: rotate(240deg); }
    
    .spinning .turbine-blades {
      animation: spin 1s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }

    /* Solar */
    .solar-panel {
      width: 100px;
      height: 60px;
      background: #37474F;
      border: 2px solid #90A4AE;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 2px;
      transform: perspective(200px) rotateX(30deg);
      transition: all 0.5s;
    }
    .cell {
      background: #1a237e;
      width: 100%;
      height: 100%;
    }
    .glowing .cell {
      background: var(--solar-orange);
      box-shadow: 0 0 10px var(--solar-orange);
    }
    
    .label {
      margin-top: 50px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
    }
  `;
  container.appendChild(style);

  const content = document.createElement('div');
  content.innerHTML = `
    <div class="gen-container">
      <div class="gen-box">
        <div class="turbine-pole">
          <div class="turbine-blades" id="turbine">
            <div class="blade"></div>
            <div class="blade"></div>
            <div class="blade"></div>
          </div>
        </div>
        <div class="label">Induction Generator</div>
      </div>
      
      <div class="gen-box">
        <div class="solar-panel" id="solar">
          <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
          <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
        </div>
        <div class="label">Photo-Electric Effect</div>
      </div>
    </div>
    <button class="btn" id="activate-btn">Activate Generation</button>
  `;
  container.appendChild(content);

  const btn = content.querySelector('#activate-btn');
  const turbine = content.querySelector('#turbine');
  const solar = content.querySelector('#solar');
  let active = false;

  btn.addEventListener('click', () => {
    active = !active;
    if (active) {
      content.parentElement.classList.add('spinning'); // Helper for scope? No, specific classes
      turbine.parentElement.parentElement.classList.add('spinning'); // Wait, animation is on blades
      turbine.parentElement.classList.add('spinning'); // No, blades is child of pole? No.

      // Correct selection
      turbine.parentElement.parentElement.querySelector('.turbine-blades').style.animation = 'spin 1s linear infinite';
      solar.classList.add('glowing');
      btn.textContent = 'Deactivate';
    } else {
      turbine.parentElement.parentElement.querySelector('.turbine-blades').style.animation = 'none';
      solar.classList.remove('glowing');
      btn.textContent = 'Activate Generation';
    }
  });
}
