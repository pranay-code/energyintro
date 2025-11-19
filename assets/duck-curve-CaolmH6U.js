import{C as y}from"./auto-sRkgK8jz.js";function h(n){const o=document.createElement("style");o.textContent=`
    .controls {
      width: 80%;
      margin: 20px auto;
      text-align: center;
    }
    input[type=range] {
      width: 100%;
      accent-color: var(--solar-orange);
    }
  `,n.appendChild(o);const l=document.createElement("canvas");n.appendChild(l);const t=document.createElement("div");t.className="controls",t.innerHTML=`
    <label>Solar Penetration: <span id="solar-val">0</span>%</label>
    <input type="range" id="solar-slider" min="0" max="50" value="0">
  `,n.appendChild(t);const s=Array.from({length:24},(e,a)=>a),r=[60,58,55,53,55,60,70,80,85,88,90,92,92,90,88,85,85,90,95,98,95,85,75,65],i=s.map(e=>e<6||e>18?0:Math.sin((e-6)*Math.PI/12)),d=new y(l,{type:"line",data:{labels:s.map(e=>`${e}:00`),datasets:[{label:"Total Demand",data:r,borderColor:"#A0A0A0",borderDash:[5,5],fill:!1},{label:"Net Load (Demand - Solar)",data:[...r],borderColor:"#FF9100",backgroundColor:"rgba(255, 145, 0, 0.2)",fill:!0,tension:.4}]},options:{responsive:!0,scales:{y:{beginAtZero:!0,max:120,title:{display:!0,text:"GW"}}}}}),c=t.querySelector("#solar-slider"),p=t.querySelector("#solar-val");c.addEventListener("input",e=>{const a=parseInt(e.target.value);p.textContent=a;const u=a,m=r.map((b,v)=>b-i[v]*u);d.data.datasets[1].data=m,d.update()})}export{h as render};
