function l(r){const s=document.createElement("style");s.textContent=`
    .scale-container {
      position: relative;
      width: 300px;
      height: 150px;
      background: radial-gradient(circle at bottom, #f5f5f5, #e0e0e0);
      border-radius: 150px 150px 0 0;
      border: 2px solid #bbb;
      border-bottom: none;
      margin: 0 auto;
      overflow: hidden;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
    }
    .needle {
      width: 4px;
      height: 140px;
      background: var(--alert-red);
      position: absolute;
      bottom: 0;
      left: 50%;
      transform-origin: bottom center;
      transform: rotate(0deg);
      transition: transform 0.5s cubic-bezier(0.4, 2.5, 0.6, 0.8); /* Bouncy */
      z-index: 2;
    }
    .ticks {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .tick-val {
      position: absolute;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #888;
    }
    .val-49 { bottom: 10px; left: 20px; }
    .val-50 { top: 10px; left: 50%; transform: translateX(-50%); color: var(--success-green); font-weight: bold; }
    .val-51 { bottom: 10px; right: 20px; }
    
    .digital-readout {
      font-family: var(--font-mono);
      font-size: 2rem;
      color: var(--success-green);
      text-align: center;
      margin-top: 10px;
    }
    .controls {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-top: 20px;
    }
  `,r.appendChild(s);const t=document.createElement("div");t.innerHTML=`
    <div class="scale-container">
      <div class="ticks">
        <span class="tick-val val-49">49.0</span>
        <span class="tick-val val-50">50.0</span>
        <span class="tick-val val-51">51.0</span>
      </div>
      <div class="needle" id="needle"></div>
    </div>
    <div class="digital-readout" id="freq-val">50.00 Hz</div>
    <div class="controls">
      <button class="btn" id="add-load">Add Load (Spike)</button>
      <button class="btn" id="add-gen">Dispatch Gen</button>
    </div>
  `,r.appendChild(t);let e=50;const o=t.querySelector("#needle"),a=t.querySelector("#freq-val");function n(){a.textContent=e.toFixed(2)+" Hz";const i=(e-50)*90;o.style.transform=`rotate(${i}deg)`,e<49.5||e>50.5?(a.style.color="var(--alert-red)",o.style.background="var(--alert-red)"):(a.style.color="var(--success-green)",o.style.background="var(--success-green)")}t.querySelector("#add-load").addEventListener("click",()=>{e-=Math.random()*.3+.1,e<49&&(e=49),n()}),t.querySelector("#add-gen").addEventListener("click",()=>{e+=Math.random()*.3+.1,e>51&&(e=51),n()}),setInterval(()=>{Math.abs(e-50)>.05&&(e+=(Math.random()-.5)*.02,n())},1e3)}export{l as render};
