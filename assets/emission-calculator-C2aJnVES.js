function p(e){const n=document.createElement("style");n.textContent=`
    .emission-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .cloud-svg {
      width: 200px;
      height: 120px;
      transition: all 0.5s;
    }
    .cloud-path {
      fill: #444;
      transition: fill 0.5s;
    }
    .controls {
      margin-top: 20px;
      width: 80%;
    }
    input[type=range] {
      width: 100%;
      accent-color: var(--neon-cyan);
    }
    .labels {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      margin-top: 5px;
    }
    .stat-display {
      margin-top: 20px;
      font-size: 1.2rem;
      font-weight: bold;
    }
  `,e.appendChild(n);const t=document.createElement("div");t.innerHTML=`
    <div class="emission-container">
      <svg class="cloud-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="cloud-path" d="M17,10c-0.3,0-0.6,0-0.8,0.1c-0.3-2.6-2.5-4.6-5.2-4.6c-2.3,0-4.3,1.5-5,3.5C5.7,9.1,5.3,9,5,9c-2.8,0-5,2.2-5,5s2.2,5,5,5h12c2.8,0,5-2.2,5-5S19.8,10,17,10z"/>
      </svg>
      
      <div class="stat-display">Emissions: <span id="emission-val">1000</span> kg CO2/MWh</div>
      
      <div class="controls">
        <input type="range" id="source-slider" min="0" max="100" value="0">
        <div class="labels">
          <span>100% Coal</span>
          <span>100% Solar</span>
        </div>
      </div>
    </div>
  `,e.appendChild(t);const o=t.querySelector("#source-slider"),i=t.querySelector(".cloud-path"),l=t.querySelector("#emission-val");o.addEventListener("input",a=>{const s=parseInt(a.target.value),c=100-s,d=Math.round(c/100*1e3);l.textContent=d;const r=20+s*.7;i.style.fill=`hsl(0, 0%, ${r}%)`,i.style.opacity=1-s/150})}export{p as render};
