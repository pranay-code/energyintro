export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
    .market-container {
      display: flex;
      flex-direction: column; /* Vertical Layout */
      align-items: center;
      padding: 30px 20px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      position: relative;
      overflow: hidden;
      min-height: 400px;
      width: 100%;
      box-sizing: border-box;
      gap: 20px;
    }
    .entity {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      width: 100%;
      flex-shrink: 0;
    }
    .entity-icon {
      font-size: 3rem;
      margin-bottom: 5px;
      background: #f5f5f5;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #eee;
    }
    .entity-label {
      font-weight: bold;
      color: #333;
      text-align: center;
      font-size: 0.9rem;
    }
    .exchange-zone {
      flex-grow: 1;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      min-height: 150px;
    }
    .path-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background: #eee;
      transform: translateX(-50%);
      z-index: 1;
    }
    .token {
      position: absolute;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: top 2.5s linear, bottom 2.5s linear, opacity 0.3s ease;
      opacity: 0;
      white-space: nowrap;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      z-index: 3;
      left: 50%;
      transform: translateX(-50%);
    }
    .rec-token {
      background: #E8F5E9;
      color: #2E7D32;
      border: 1px solid #2E7D32;
      top: 10px; /* Start near top */
    }
    .money-token {
      background: #FFF3E0;
      color: #EF6C00;
      border: 1px solid #EF6C00;
      bottom: 10px; /* Start near bottom */
    }
    .market-label {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%) rotate(90deg);
      font-size: 0.8rem;
      color: #ccc;
      letter-spacing: 2px;
      font-weight: bold;
      pointer-events: none;
    }
    @media (max-width: 480px) {
      .market-label {
        display: none;
      }
    }
  `;

  container.innerHTML = `
    <div class="market-container">
      <div class="market-label">POWER EXCHANGE</div>
      
      <!-- Top Entity: Generator -->
      <div class="entity">
        <div class="entity-icon">☀️</div>
        <div class="entity-label">Renewable Generator</div>
      </div>

      <!-- Middle: Exchange Zone -->
      <div class="exchange-zone" id="exchange-zone">
        <div class="path-line"></div>
        <!-- Tokens animate here -->
      </div>

      <!-- Bottom Entity: Buyer -->
      <div class="entity">
        <div class="entity-icon">🏭</div>
        <div class="entity-label">Polluting Factory</div>
      </div>
    </div>
    <div style="text-align:center; margin-top:10px; font-size:0.9rem; color:#666;">
      Generators sell power to the grid, but sell the "Green Attribute" (REC) to factories who need to offset emissions.
    </div>
  `;
  container.appendChild(style);

  function animate() {
    const zone = container.querySelector('#exchange-zone');
    if (!zone) return;

    // REC moves Top -> Bottom
    const rec = document.createElement('div');
    rec.className = 'token rec-token';
    rec.innerHTML = '📄 1 REC';
    rec.style.top = '0%';
    rec.style.opacity = '1';
    zone.appendChild(rec);

    // Money moves Bottom -> Top
    const money = document.createElement('div');
    money.className = 'token money-token';
    money.innerHTML = '💰 ₹1000';
    money.style.bottom = '0%';
    money.style.opacity = '1';
    zone.appendChild(money);

    // Trigger animation
    requestAnimationFrame(() => {
      rec.style.top = '80%';
      money.style.bottom = '80%';
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
