function c(t){const n=document.createElement("style");n.textContent=`
    .venn-container {
      display: flex;
      justify-content: center;
      position: relative;
      height: 300px;
      width: 100%;
    }
    .circle {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #fff;
      transition: all 0.3s;
      cursor: pointer;
      mix-blend-mode: screen;
    }
    .circle-clean {
      background: rgba(0, 229, 255, 0.4);
      left: 50px;
      top: 20px;
      border: 2px solid var(--neon-cyan);
    }
    .circle-renewable {
      background: rgba(0, 230, 118, 0.4);
      right: 50px;
      top: 20px;
      border: 2px solid var(--success-green);
    }
    .circle:hover {
      opacity: 1;
      transform: scale(1.05);
      z-index: 10;
    }
    .tooltip {
      position: absolute;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      padding: 10px;
      border-radius: 4px;
      max-width: 300px;
      text-align: center;
      min-height: 60px;
    }
  `,t.appendChild(n);const e=document.createElement("div");e.innerHTML=`
    <div class="venn-container">
      <div class="circle circle-clean" data-info="CLEAN: Low Carbon. Includes Nuclear & Large Hydro.">
        CLEAN
      </div>
      <div class="circle circle-renewable" data-info="RENEWABLE: Replenished source. Sun, Wind, Biomass.">
        RENEWABLE
      </div>
      <div class="tooltip" id="venn-tooltip">Hover over a zone</div>
    </div>
  `,t.appendChild(e);const o=e.querySelector("#venn-tooltip"),i=e.querySelector(".circle-clean"),r=e.querySelector(".circle-renewable");i.addEventListener("mouseenter",()=>o.textContent=i.dataset.info),r.addEventListener("mouseenter",()=>o.textContent=r.dataset.info)}export{c as render};
