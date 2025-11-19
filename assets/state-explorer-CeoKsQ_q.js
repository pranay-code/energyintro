import{C as i}from"./auto-sRkgK8jz.js";function p(n){const l=document.createElement("canvas");n.appendChild(l);const a=document.createElement("div");a.style.marginTop="20px",a.innerHTML=`
    <select id="state-select" style="padding: 10px; background: #333; color: #fff; border: 1px solid #555; border-radius: 4px;">
      <option value="RJ">Rajasthan</option>
      <option value="TN">Tamil Nadu</option>
      <option value="MH">Maharashtra</option>
      <option value="KA">Karnataka</option>
      <option value="UP">Uttar Pradesh</option>
    </select>
  `,n.appendChild(a);const o={RJ:{thermal:8,renewable:18,name:"Rajasthan"},TN:{thermal:10,renewable:16,name:"Tamil Nadu"},MH:{thermal:25,renewable:10,name:"Maharashtra"},KA:{thermal:10,renewable:15,name:"Karnataka"},UP:{thermal:20,renewable:4,name:"Uttar Pradesh"}},e=new i(l,{type:"bar",data:{labels:["Thermal (GW)","Renewable (GW)"],datasets:[{label:"Installed Capacity",data:[8,18],backgroundColor:["#424242","#00E676"]}]},options:{responsive:!0,plugins:{title:{display:!0,text:"Rajasthan Capacity Mix",color:"#E0E0E0"},legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{color:"#A0A0A0"}},x:{ticks:{color:"#A0A0A0"}}}}});a.querySelector("#state-select").addEventListener("change",r=>{const s=r.target.value,t=o[s];e.data.datasets[0].data=[t.thermal,t.renewable],e.options.plugins.title.text=`${t.name} Capacity Mix`,e.update()})}export{p as render};
