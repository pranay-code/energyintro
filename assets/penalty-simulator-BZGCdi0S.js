function v(i){const a=document.createElement("style");a.textContent=`
    .game-container {
      text-align: center;
      width: 100%;
      max-width: 400px;
    }
    .input-group {
      margin: 20px 0;
    }
    input {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--glass-border);
      color: var(--text-main);
      padding: 10px;
      border-radius: 4px;
      font-family: var(--font-mono);
      width: 100px;
      text-align: center;
    }
    .result-box {
      background: rgba(0, 0, 0, 0.5);
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
      min-height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .penalty-text {
      color: var(--alert-red);
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 10px;
    }
    .safe-text {
      color: var(--success-green);
      font-size: 1.2rem;
      margin-top: 10px;
    }
  `,i.appendChild(a);const e=document.createElement("div");e.innerHTML=`
    <div class="game-container">
      <div class="input-group">
        <label>Schedule (MW): </label>
        <input type="number" id="schedule-input" value="10">
      </div>
      <button class="btn" id="sim-btn">Simulate 15-min Block</button>
      
      <div class="result-box" id="result-area">
        <p style="color: #888;">Click Simulate to see if weather matches your schedule.</p>
      </div>
    </div>
  `,i.appendChild(e);const s=e.querySelector("#sim-btn"),d=e.querySelector("#schedule-input"),c=e.querySelector("#result-area");s.addEventListener("click",()=>{const t=parseFloat(d.value);if(!t||t<=0)return;const u=Math.random()*.6-.3,r=t*(1+u),o=(r-t)/t*100,l=Math.abs(o);let n=`
      <div>Actual Generation: <strong>${r.toFixed(2)} MW</strong></div>
      <div>Deviation: <strong>${o.toFixed(2)}%</strong></div>
    `;if(l>15){const p=Math.round(l*1e3);n+=`<div class="penalty-text">PENALTY: ₹${p}</div>`,n+='<div style="font-size:0.8rem; color:#aaa">Deviation > 15% limit</div>'}else n+='<div class="safe-text">NO PENALTY</div>',n+='<div style="font-size:0.8rem; color:#aaa">Within 15% band</div>';c.innerHTML=n})}export{v as render};
