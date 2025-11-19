export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .market-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      position: relative;
      overflow: hidden;
      height: 200px;
    }
    .entity {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      width: 100px;
    }
    .entity-icon {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    .entity-label {
      font-weight: bold;
      color: #333;
      text-align: center;
      font-size: 0.9rem;
    }
    .exchange-zone {
      flex-grow: 1;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .token {
      position: absolute;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 2s linear;
      opacity: 0;
    }
    .rec-token {
      background: #E8F5E9;
      color: #2E7D32;
      border: 1px solid #2E7D32;
      top: 60px;
    }
    .money-token {
      background: #FFF3E0;
      color: #EF6C00;
      border: 1px solid #EF6C00;
      bottom: 60px;
    }
    .market-label {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem;
      color: #999;
      letter-spacing: 1px;
    }
  `;
    container.appendChild(style);

    container.innerHTML = `
    <div class="market-container">
      <div class="market-label">POWER EXCHANGE</div>
      
      <div class="entity">
        <div class="entity-icon">☀️</div>
        <div class="entity-label">Solar Generator</div>
      </div>

      <div class="exchange-zone" id="exchange-zone">
        <!-- Tokens will animate here -->
      </div>

      <div class="entity">
        <div class="entity-icon">🏭</div>
        <div class="entity-label">Polluting Factory</div>
      </div>
    </div>
    <div style="text-align:center; margin-top:10px; font-size:0.9rem; color:#666;">
      Generators sell power to the grid, but sell the "Green Attribute" (REC) to factories who need to offset emissions.
    </div>
  `;

    function animate() {
        const zone = container.querySelector('#exchange-zone');
        if (!zone) return;

        // REC moves Left -> Right
        const rec = document.createElement('div');
        rec.className = 'token rec-token';
        rec.innerHTML = '📄 1 REC';
        rec.style.left = '10%';
        rec.style.opacity = '1';
        zone.appendChild(rec);

        // Money moves Right -> Left
        const money = document.createElement('div');
        money.className = 'token money-token';
        money.innerHTML = '💰 ₹1000';
        money.style.right = '10%';
        money.style.opacity = '1';
        zone.appendChild(money);

        // Trigger animation
        requestAnimationFrame(() => {
            rec.style.left = '70%';
            money.style.right = '70%';
        });

        // Cleanup
        setTimeout(() => {
            rec.style.opacity = '0';
            money.style.opacity = '0';
            setTimeout(() => {
                rec.remove();
                money.remove();
            }, 500);
        }, 2000);
    }

    // Start loop
    animate();
    setInterval(animate, 3000);
}
