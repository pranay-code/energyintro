function y(a){const r=document.createElement("style");r.textContent=`
    .arb-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 500px;
      margin-bottom: 20px;
    }
    .node {
      width: 80px;
      height: 80px;
      border: 2px solid #444;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      position: relative;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .battery-level {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background: var(--success-green);
      opacity: 0.5;
      transition: height 1s;
      border-radius: 10px;
    }
    .flow-line {
      flex-grow: 1;
      height: 4px;
      background: #333;
      position: relative;
      margin: 0 10px;
    }
    .electron {
      width: 12px;
      height: 12px;
      background: var(--neon-cyan);
      border-radius: 50%;
      position: absolute;
      top: -4px;
      left: 0;
      opacity: 0;
    }
    .day-mode .electron {
      animation: flow-right 1s infinite linear;
    }
    .night-mode .electron {
      animation: flow-right 1s infinite linear reverse;
    }
    @keyframes flow-right {
      0% { left: 0; opacity: 1; }
      100% { left: 100%; opacity: 1; }
    }
    .label {
      font-size: 0.8rem;
      margin-top: 5px;
      color: #aaa;
    }
  `,a.appendChild(r);const e=document.createElement("div");e.innerHTML=`
    <div class="arb-container" id="scene">
      <div class="node">
        <div id="source-icon">☀️</div>
        <div class="label" id="source-label">Solar</div>
      </div>
      
      <div class="flow-line">
        <div class="electron"></div>
      </div>
      
      <div class="node">
        <div class="battery-level" id="bat-level"></div>
        <div style="z-index:2">🔋</div>
        <div class="label">BESS</div>
      </div>
      
      <div class="flow-line" id="grid-line" style="opacity:0">
        <div class="electron"></div>
      </div>
      
      <div class="node" id="grid-node" style="opacity:0.3">
        <div>🏭</div>
        <div class="label">Grid</div>
      </div>
    </div>
    
    <button class="btn" id="toggle-btn">Switch to Night (Discharge)</button>
  `,a.appendChild(e);const i=e.querySelector("#toggle-btn"),t=e.querySelector("#scene"),o=e.querySelector("#bat-level"),n=e.querySelector("#source-icon"),c=e.querySelector("#source-label"),l=e.querySelector("#grid-line"),d=e.querySelector("#grid-node");let s=!0;o.style.height="20%",t.classList.add("day-mode"),i.addEventListener("click",()=>{s=!s,s?(i.textContent="Switch to Night (Discharge)",t.classList.remove("night-mode"),t.classList.add("day-mode"),n.textContent="☀️",c.textContent="Solar",n.parentElement.style.opacity=1,l.style.opacity=0,d.style.opacity=.3,o.style.height="90%"):(i.textContent="Switch to Day (Charge)",t.classList.remove("day-mode"),n.parentElement.style.opacity=.3,l.style.opacity=1,d.style.opacity=1,l.querySelector(".electron").style.animation="flow-right 1s infinite linear",o.style.height="10%")})}export{y as render};
