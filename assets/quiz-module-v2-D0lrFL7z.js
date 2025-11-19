import{q as o}from"./index-B_re-WvR.js";import{E as h}from"./jspdf.es.min-D6AoIUCL.js";function y(p){const g=document.createElement("style");g.textContent=`
    .quiz-container {
      max-width: 700px;
      margin: 0 auto;
    }
    .question-box {
      background: rgba(255, 255, 255, 0.8);
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 20px;
    }
    .option-btn {
      background: #fff;
      border: 1px solid #ccc;
      padding: 15px;
      color: #333;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.2s;
      font-weight: 500;
    }
    .option-btn:hover {
      background: var(--bg-light);
      border-color: var(--neon-cyan);
    }
    .result-screen {
      animation: fade-in 0.5s;
      text-align: center;
    }
    .score-display {
      font-size: 3rem;
      font-weight: bold;
      color: var(--neon-cyan);
      margin: 20px 0;
    }
    .review-list {
      text-align: left;
      margin-top: 30px;
      max-height: 400px;
      overflow-y: auto;
    }
    .review-item {
      padding: 15px;
      border-bottom: 1px solid #eee;
    }
    .review-item.wrong {
      background: rgba(213, 0, 0, 0.05);
    }
    .correct-ans {
      color: var(--success-green);
      font-weight: bold;
    }
    .wrong-ans {
      color: var(--alert-red);
      text-decoration: line-through;
    }
  `,p.appendChild(g);let s=0,a=0,d=[];const n=document.createElement("div");n.className="quiz-container";function u(){n.innerHTML=`
      <div class="question-box" style="text-align:center">
        <h2>Ready to Certify?</h2>
        <p>20 Questions. No Time Limit. 70% to Pass.</p>
        <button class="btn" id="start-btn" style="margin-top:20px">Start Assessment</button>
      </div>
    `,n.querySelector("#start-btn").addEventListener("click",x)}function x(){if(s>=o.length){m();return}const t=o[s];n.innerHTML=`
      <div class="question-box">
        <div style="margin-bottom:10px; color:#666">Question ${s+1}/${o.length}</div>
        <h3>${t.q}</h3>
        <div class="options-grid">
          ${t.options.map((e,r)=>`<button class="option-btn" data-idx="${r}">${e}</button>`).join("")}
        </div>
      </div>
    `,n.querySelectorAll(".option-btn").forEach(e=>{e.addEventListener("click",r=>{const c=parseInt(r.target.dataset.idx),i=c===t.a;i&&a++,d.push({qIdx:s,selectedIdx:c,isCorrect:i}),s++,x()})})}function m(){const e=a/o.length*100>=70,r=e?"Congratulations! You are a Domain Associate.":"Please review the material and try again.";let c='<div class="review-list"><h3>Detailed Review</h3>';d.forEach(i=>{const l=o[i.qIdx];i.isCorrect||(c+=`
          <div class="review-item wrong">
            <p><strong>Q${i.qIdx+1}:</strong> ${l.q}</p>
            <p>Your Answer: <span class="wrong-ans">${l.options[i.selectedIdx]}</span></p>
            <p>Correct Answer: <span class="correct-ans">${l.options[l.a]}</span></p>
          </div>
        `)}),c+="</div>",n.innerHTML=`
      <div class="result-screen">
        <h2>Assessment Complete</h2>
        <div class="score-display">${a}/${o.length}</div>
        <p>${r}</p>
        ${e?'<button class="btn" id="cert-btn" style="margin-top:20px">Download Certificate</button>':'<button class="btn" id="retry-btn" style="margin-top:20px">Retry</button>'}
        ${c}
      </div>
    `,e?n.querySelector("#cert-btn").addEventListener("click",b):n.querySelector("#retry-btn").addEventListener("click",()=>{s=0,a=0,d=[],u()})}function b(){const t=new h({orientation:"landscape",unit:"mm",format:"a4"});t.setFillColor(255,255,255),t.rect(0,0,297,210,"F"),t.setDrawColor(0,176,255),t.setLineWidth(3),t.rect(10,10,277,190),t.setTextColor(0,176,255),t.setFont("helvetica","bold"),t.setFontSize(40),t.text("CERTIFICATE OF ACHIEVEMENT",148.5,50,{align:"center"}),t.setTextColor(50,50,50),t.setFontSize(20),t.setFont("helvetica","normal"),t.text("This certifies that",148.5,80,{align:"center"});const e=prompt("Enter your name for the certificate:","Energy Professional");if(!e)return;t.setFontSize(30),t.setTextColor(255,109,0),t.text(e,148.5,100,{align:"center"}),t.setTextColor(50,50,50),t.setFontSize(16),t.text("Has successfully demonstrated mastery of",148.5,120,{align:"center"}),t.text("Energy Grid Physics, Economics, and Data Science",148.5,130,{align:"center"}),t.setFontSize(12),t.setTextColor(100,100,100);const r=new Date().toLocaleDateString();t.text(`Score: ${a}/${o.length} (${a/o.length*100}%)`,148.5,150,{align:"center"}),t.text(`Date: ${r}`,148.5,160,{align:"center"}),t.save("GridGuard_Certificate.pdf")}p.appendChild(n),u()}export{y as render};
