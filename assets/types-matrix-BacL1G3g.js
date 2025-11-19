function d(n){const i=document.createElement("style");i.textContent=`
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
  `,n.appendChild(i);const l=[{id:"chemical",icon:"🧪",label:"Chemical",targets:["thermal"]},{id:"thermal",icon:"🔥",label:"Thermal",targets:["kinetic"]},{id:"kinetic",icon:"⚙️",label:"Kinetic",targets:["electrical","potential"]},{id:"potential",icon:"🌊",label:"Potential",targets:["kinetic"]},{id:"electrical",icon:"⚡",label:"Electrical",targets:["thermal","kinetic","chemical"]},{id:"electromagnetic",icon:"☀️",label:"Electromagnetic",targets:["electrical","thermal"]}],t=document.createElement("div");t.className="matrix-grid";const r=document.createElement("div");r.className="description-box",r.textContent="Click an energy type to see its common transformations.",l.forEach(e=>{const a=document.createElement("div");a.className="energy-node",a.dataset.id=e.id,a.innerHTML=`
      <span class="node-icon">${e.icon}</span>
      <span>${e.label}</span>
    `,a.addEventListener("click",()=>{t.querySelectorAll(".energy-node").forEach(o=>{o.classList.remove("active","target")}),a.classList.add("active"),e.targets.forEach(o=>{const c=t.querySelector(`[data-id="${o}"]`);c&&c.classList.add("target")}),r.innerHTML=`<strong>${e.label}</strong> energy can be converted into <span style="color: var(--solar-orange)">${e.targets.join(", ")}</span> energy.`}),t.appendChild(a)}),n.appendChild(t),n.appendChild(r)}export{d as render};
