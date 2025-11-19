import { questions } from '../../data.js';
import { jsPDF } from 'jspdf';

export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
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
  `;
    container.appendChild(style);

    let currentQ = 0;
    let score = 0;

    // Shuffle questions for randomness (optional, but good)
    // const shuffledQs = [...questions].sort(() => 0.5 - Math.random());
    // Keeping order for now to match the learning flow roughly, or just use as is.
    const quizQs = questions;

    const content = document.createElement('div');
    content.className = 'quiz-container';

    function showStart() {
        content.innerHTML = `
      <div class="question-box">
        <h2>Ready to Certify?</h2>
        <p>20 Questions. No Time Limit. 70% to Pass.</p>
        <button class="btn" id="start-btn" style="margin-top:20px">Start Assessment</button>
      </div>
    `;
        content.querySelector('#start-btn').addEventListener('click', showQuestion);
    }

    function showQuestion() {
        if (currentQ >= quizQs.length) {
            showResult();
            return;
        }

        const q = quizQs[currentQ];
        content.innerHTML = `
      <div class="question-box">
        <div style="margin-bottom:10px; color:#888">Question ${currentQ + 1}/${quizQs.length}</div>
        <h3>${q.q}</h3>
        <div class="options-grid">
          ${q.options.map((opt, i) => `<button class="option-btn" data-idx="${i}">${opt}</button>`).join('')}
        </div>
      </div>
    `;

        content.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selected = parseInt(e.target.dataset.idx);
                if (selected === q.a) score++;
                currentQ++;
                showQuestion();
            });
        });
    }

    function showResult() {
        const percentage = (score / quizQs.length) * 100;
        const passed = percentage >= 70;
        const cssClass = passed ? 'pass' : 'fail';
        const msg = passed ? 'Congratulations! You are a Domain Associate.' : 'Please review the material and try again.';

        content.innerHTML = `
      <div class="result-screen">
        <h2>Assessment Complete</h2>
        <div class="score-display ${cssClass}">${score}/${quizQs.length}</div>
        <p>${msg}</p>
        ${passed ? `<button class="btn" id="cert-btn" style="margin-top:20px">Download Certificate</button>` : `<button class="btn" id="retry-btn" style="margin-top:20px">Retry</button>`}
      </div>
    `;

        if (passed) {
            content.querySelector('#cert-btn').addEventListener('click', generateCertificate);
        } else {
            content.querySelector('#retry-btn').addEventListener('click', () => {
                currentQ = 0;
                score = 0;
                showStart();
            });
        }
    }

    function generateCertificate() {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Background
        doc.setFillColor(18, 18, 18);
        doc.rect(0, 0, 297, 210, 'F');

        // Border
        doc.setDrawColor(0, 229, 255); // Neon Cyan
        doc.setLineWidth(2);
        doc.rect(10, 10, 277, 190);

        // Title
        doc.setTextColor(0, 229, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(40);
        doc.text('CERTIFICATE OF ACHIEVEMENT', 148.5, 50, { align: 'center' });

        // Subtitle
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        doc.text('This certifies that', 148.5, 80, { align: 'center' });

        // Name (Placeholder or Prompt)
        const name = prompt("Enter your name for the certificate:", "Energy Professional");
        if (!name) return;

        doc.setFontSize(30);
        doc.setTextColor(255, 145, 0); // Solar Orange
        doc.text(name, 148.5, 100, { align: 'center' });

        // Description
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Has successfully demonstrated mastery of', 148.5, 120, { align: 'center' });
        doc.text('Energy Grid Physics, Economics, and Data Science', 148.5, 130, { align: 'center' });

        // Score & Date
        doc.setFontSize(12);
        doc.setTextColor(160, 160, 160);
        const date = new Date().toLocaleDateString();
        doc.text(`Score: ${score}/${quizQs.length} (${(score / quizQs.length) * 100}%)`, 148.5, 150, { align: 'center' });
        doc.text(`Date: ${date}`, 148.5, 160, { align: 'center' });

        // Footer
        doc.setFontSize(10);
        doc.text('GridGuard Domain Onboarding Portal', 148.5, 190, { align: 'center' });

        doc.save('GridGuard_Certificate.pdf');
    }

    container.appendChild(content);
    showStart();
}
