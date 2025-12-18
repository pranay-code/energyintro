import { questions } from '../../data.js';
import { jsPDF } from 'jspdf';

export function render(container) {
  const style = document.createElement('style');
  style.textContent = `
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
  `;
  container.appendChild(style);

  container.appendChild(style);

  // Smart Sampling Logic
  function generateQuizSet() {
    const questionsByTopic = {};
    const fundamentalTopics = [
      "Introduction",
      "Energy: The Basics",
      "Generation Mechanics",
      "What is the Grid?",
      "Current Energy Mix"
    ];

    // 1. Group by Topic
    questions.forEach(q => {
      const t = q.topic || 'General';
      if (!questionsByTopic[t]) questionsByTopic[t] = [];
      questionsByTopic[t].push(q);
    });

    const selectedSet = [];
    const remainingPool = [];

    // 2. Pick 1 from each topic (Ensure Coverage)
    Object.keys(questionsByTopic).forEach(topic => {
      const pool = questionsByTopic[topic];
      const selectedIndex = Math.floor(Math.random() * pool.length);
      selectedSet.push(pool[selectedIndex]);

      // Add unselected ones to remaining pool if they are fundamental
      pool.forEach((q, i) => {
        if (i !== selectedIndex && fundamentalTopics.includes(topic)) {
          remainingPool.push(q);
        }
      });
    });

    // 3. Pick remaining to reach 20 (Weighted towards fundamentals)
    while (selectedSet.length < 20 && remainingPool.length > 0) {
      const idx = Math.floor(Math.random() * remainingPool.length);
      selectedSet.push(remainingPool[idx]);
      remainingPool.splice(idx, 1);
    }

    // 4. Shuffle Final Set
    return selectedSet.sort(() => Math.random() - 0.5);
  }

  // Initialize with sampled set
  const quizQuestions = generateQuizSet();

  let currentQ = 0;
  let score = 0;
  let userAnswers = []; // Store { qIdx, selectedIdx, isCorrect }

  const content = document.createElement('div');
  content.className = 'quiz-container';

  function showStart() {
    content.innerHTML = `
      <div class="question-box" style="text-align:center">
        <h2>Ready to Certify?</h2>
        <p>20 Questions (Selected from a larger pool). No Time Limit. 70% to Pass.</p>
        <button class="btn" id="start-btn" style="margin-top:20px">Start Assessment</button>
      </div>
    `;
    content.querySelector('#start-btn').addEventListener('click', showQuestion);
  }

  function showQuestion() {
    if (currentQ >= quizQuestions.length) {
      showResult();
      return;
    }

    const q = quizQuestions[currentQ];
    content.innerHTML = `
      <div class="question-box">
        <div style="margin-bottom:5px; font-size: 0.8rem; text-transform:uppercase; letter-spacing:1px; color:var(--neon-cyan); font-weight:bold;">
          Topic: ${q.topic || 'General'}
        </div>
        <div style="margin-bottom:10px; color:#666; font-size:0.9rem;">Question ${currentQ + 1}/${quizQuestions.length}</div>
        <h3>${q.q}</h3>
        <div class="options-grid">
          ${q.options.map((opt, i) => `<button class="option-btn" data-idx="${i}">${opt}</button>`).join('')}
        </div>
      </div>
    `;

    content.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selected = parseInt(e.target.dataset.idx);
        const isCorrect = selected === q.a;
        if (isCorrect) score++;

        userAnswers.push({ qIdx: currentQ, selectedIdx: selected, isCorrect });

        currentQ++;
        showQuestion();
      });
    });
  }

  function showResult() {
    const percentage = (score / quizQuestions.length) * 100;
    const passed = percentage >= 70;
    const msg = passed ? 'Congratulations! You are a Domain Associate.' : 'Please review the material and try again.';

    // Build Review HTML
    let reviewHtml = '<div class="review-list"><h3>Detailed Review</h3>';
    userAnswers.forEach((ans, index) => {
      const q = quizQuestions[index]; // Note: userAnswers tracks sequential answers to the shuffled set
      if (!ans.isCorrect) {
        reviewHtml += `
          <div class="review-item wrong">
            <p><strong>Q${index + 1}:</strong> ${q.q}</p>
            <p>Your Answer: <span class="wrong-ans">${q.options[ans.selectedIdx]}</span></p>
            <p>Correct Answer: <span class="correct-ans">${q.options[q.a]}</span></p>
          </div>
        `;
      }
    });
    reviewHtml += '</div>';

    content.innerHTML = `
      <div class="result-screen">
        <h2>Assessment Complete</h2>
        <div class="score-display">${score}/${quizQuestions.length}</div>
        <p>${msg}</p>
        ${passed ? `<button class="btn" id="cert-btn" style="margin-top:20px">Download Certificate</button>` : `<button class="btn" id="retry-btn" style="margin-top:20px">Retry</button>`}
        ${reviewHtml}
      </div>
    `;

    if (passed) {
      content.querySelector('#cert-btn').addEventListener('click', generateCertificate);
    } else {
      content.querySelector('#retry-btn').addEventListener('click', () => {
        // Re-sample on retry for a fresh test? 
        // Or keep same? User usually expects same or similar. 
        // Let's re-sample to make it rigorous.
        // But quizQuestions is const. We need to handle this.
        // Ideally we reload the widget.
        // For now, let's just reset stats and use the SAME questions to allow them to pass the specific test they were given.
        currentQ = 0;
        score = 0;
        userAnswers = [];
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

    // Background (White)
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, 'F');

    // Border
    doc.setDrawColor(0, 176, 255); // Neon Cyan
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    // Title
    doc.setTextColor(0, 176, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.text('ACKNOWLEDGEMENT CERTIFICATE', 148.5, 50, { align: 'center' });

    // Subtitle
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'normal');
    doc.text('This certifies that', 148.5, 80, { align: 'center' });

    // Name
    const name = prompt("Enter your name for the certificate:", "Energy Professional");
    if (!name) return;

    doc.setFontSize(30);
    doc.setTextColor(255, 109, 0); // Solar Orange
    doc.text(name, 148.5, 100, { align: 'center' });

    // Description
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(16);
    doc.text('Demonstrated mastery in fundamentals of', 148.5, 120, { align: 'center' });
    doc.text('energy domain from an IPP perspective', 148.5, 130, { align: 'center' });

    // Score & Date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const date = new Date().toLocaleDateString();
    doc.text(`Score: ${score}/${quizQuestions.length} (${(score / quizQuestions.length) * 100}%)`, 148.5, 150, { align: 'center' });
    doc.text(`Date: ${date}`, 148.5, 160, { align: 'center' });

    // Footer
    doc.setFontSize(14);
    doc.setTextColor(0, 176, 255); // Neon Cyan
    doc.text('Now fearlessly grow in the energy industry.', 148.5, 180, { align: 'center' });

    doc.save(`EnergyIntro_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
  }

  container.appendChild(content);
  showStart();
}
