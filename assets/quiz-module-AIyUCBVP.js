import{q as m}from"./index-BDdPelv7.js";import{E as b}from"./jspdf.es.min-BUQxU--x.js";function h(a){const c=document.createElement("style");c.textContent=`
    .quiz-container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    .question-box {
      background: rgba(255, 255, 255, 0.05);
      padding: 30px;
      border-radius: 12px;
      border: 1px solid var(--glass-border);
      margin-bottom: 20px;
    }
    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 20px;
    }
    .option-btn {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid #555;
      padding: 15px;
      color: #E0E0E0;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .option-btn:hover {
      background: rgba(0, 229, 255, 0.1);
      border-color: var(--neon-cyan);
    }
    .result-screen {
      animation: fade-in 0.5s;
    }
    .score-display {
      font-size: 3rem;
      font-weight: bold;
      color: var(--neon-cyan);
      margin: 20px 0;
    }
    .pass { color: var(--success-green); }
    .fail { color: var(--alert-red); }
  `,a.appendChild(c);let i=0,s=0;const o=m,n=document.createElement("div");n.className="quiz-container";function l(){n.innerHTML=`
      <div class="question-box">
        <h2>Ready to Certify?</h2>
        <p>20 Questions. No Time Limit. 70% to Pass.</p>
        <button class="btn" id="start-btn" style="margin-top:20px">Start Assessment</button>
      </div>
    `,n.querySelector("#start-btn").addEventListener("click",d)}function d(){if(i>=o.length){u();return}const t=o[i];n.innerHTML=`
      <div class="question-box">
        <div style="margin-bottom:10px; color:#888">Question ${i+1}/${o.length}</div>
        <h3>${t.q}</h3>
        <div class="options-grid">
          ${t.options.map((e,r)=>`<button class="option-btn" data-idx="${r}">${e}</button>`).join("")}
        </div>
      </div>
    `,n.querySelectorAll(".option-btn").forEach(e=>{e.addEventListener("click",r=>{parseInt(r.target.dataset.idx)===t.a&&s++,i++,d()})})}function u(){const e=s/o.length*100>=70,r=e?"pass":"fail",p=e?"Congratulations! You are a Domain Associate.":"Please review the material and try again.";n.innerHTML=`
      <div class="result-screen">
        <h2>Assessment Complete</h2>
        <div class="score-display ${r}">${s}/${o.length}</div>
        <p>${p}</p>
        ${e?'<button class="btn" id="cert-btn" style="margin-top:20px">Download Certificate</button>':'<button class="btn" id="retry-btn" style="margin-top:20px">Retry</button>'}
      </div>
    `,e?n.querySelector("#cert-btn").addEventListener("click",g):n.querySelector("#retry-btn").addEventListener("click",()=>{i=0,s=0,l()})}function g(){const t=new b({orientation:"landscape",unit:"mm",format:"a4"});t.setFillColor(18,18,18),t.rect(0,0,297,210,"F"),t.setDrawColor(0,229,255),t.setLineWidth(2),t.rect(10,10,277,190),t.setTextColor(0,229,255),t.setFont("helvetica","bold"),t.setFontSize(40),t.text("CERTIFICATE OF ACHIEVEMENT",148.5,50,{align:"center"}),t.setTextColor(255,255,255),t.setFontSize(20),t.setFont("helvetica","normal"),t.text("This certifies that",148.5,80,{align:"center"});const e=prompt("Enter your name for the certificate:","Energy Professional");if(!e)return;t.setFontSize(30),t.setTextColor(255,145,0),t.text(e,148.5,100,{align:"center"}),t.setTextColor(255,255,255),t.setFontSize(16),t.text("Has successfully demonstrated mastery of",148.5,120,{align:"center"}),t.text("Energy Grid Physics, Economics, and Data Science",148.5,130,{align:"center"}),t.setFontSize(12),t.setTextColor(160,160,160);const r=new Date().toLocaleDateString();t.text(`Score: ${s}/${o.length} (${s/o.length*100}%)`,148.5,150,{align:"center"}),t.text(`Date: ${r}`,148.5,160,{align:"center"}),t.setFontSize(10),t.text("GridGuard Domain Onboarding Portal",148.5,190,{align:"center"}),t.save("GridGuard_Certificate.pdf")}a.appendChild(n),l()}export{h as render};
