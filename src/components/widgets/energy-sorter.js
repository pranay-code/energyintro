export function render(container) {
    const style = document.createElement('style');
    style.textContent = `
    .sorter-container {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      padding: 20px;
      text-align: center;
      max-width: 500px;
      margin: 0 auto;
    }
    .card-area {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
    }
    .energy-card {
      width: 120px;
      height: 120px;
      background: #f5f5f5;
      border: 2px solid #ddd;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 1.1rem;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .energy-card.correct {
      background: #E8F5E9;
      border-color: #4CAF50;
      transform: scale(1.1);
    }
    .energy-card.wrong {
      background: #FFEBEE;
      border-color: #F44336;
      animation: shake 0.4s;
    }
    .icon {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    .btn-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .choice-btn {
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.9rem;
    }
    .btn-renewable { background: #E8F5E9; color: #2E7D32; border: 1px solid #C8E6C9; }
    .btn-clean { background: #E1F5FE; color: #0277BD; border: 1px solid #B3E5FC; }
    .btn-both { background: #E0F2F1; color: #00695C; border: 1px solid #B2DFDB; }
    .btn-neither { background: #FFEBEE; color: #C62828; border: 1px solid #FFCDD2; }

    .choice-btn:hover { transform: translateY(-2px); filter: brightness(0.95); }
    
    .feedback {
      margin-top: 15px;
      min-height: 40px;
      font-size: 0.9rem;
      color: #555;
    }
    .score-board {
      margin-top: 10px;
      font-size: 0.85rem;
      color: #888;
    }

    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `;
    container.appendChild(style);

    const items = [
        { name: 'Solar', icon: '☀️', type: 'both', reason: 'Correct! Solar is both Clean (Zero Carbon) and Renewable (Infinite).' },
        { name: 'Coal', icon: '🪨', type: 'neither', reason: 'Correct! Coal is neither. It is finite and highly polluting.' },
        { name: 'Nuclear', icon: '⚛️', type: 'clean', reason: 'Correct! Nuclear is Clean (Zero Carbon) but NOT Renewable (Uranium is finite).' },
        { name: 'Wind', icon: '🌬️', type: 'both', reason: 'Correct! Wind is both Clean and Renewable.' },
        { name: 'Gas', icon: '🔥', type: 'neither', reason: 'Correct! Natural Gas is a fossil fuel (Finite & Polluting).' }
    ];

    let currentIndex = 0;
    let score = 0;

    const content = document.createElement('div');
    content.className = 'sorter-container';
    content.innerHTML = `
    <div class="score-board">Score: <span id="score">0</span> / 5</div>
    <div class="card-area" id="card-area">
      <!-- Card injected here -->
    </div>
    <div class="feedback" id="feedback">Select the correct category for the item above.</div>
    <div class="btn-group">
      <button class="choice-btn btn-renewable" data-type="renewable">Renewable Only</button>
      <button class="choice-btn btn-clean" data-type="clean">Clean Only</button>
      <button class="choice-btn btn-both" data-type="both">Both</button>
      <button class="choice-btn btn-neither" data-type="neither">Neither</button>
    </div>
  `;
    container.appendChild(content);

    const cardArea = content.querySelector('#card-area');
    const feedback = content.querySelector('#feedback');
    const scoreDisplay = content.querySelector('#score');
    const buttons = content.querySelectorAll('.choice-btn');

    function showCard() {
        if (currentIndex >= items.length) {
            cardArea.innerHTML = `<div class="energy-card" style="width:100%; border:none; background:transparent;">🎉<br>Game Over!</div>`;
            feedback.textContent = `Final Score: ${score} / ${items.length}`;
            buttons.forEach(btn => btn.disabled = true);
            return;
        }

        const item = items[currentIndex];
        cardArea.innerHTML = `
      <div class="energy-card" id="current-card">
        <div class="icon">${item.icon}</div>
        <div>${item.name}</div>
      </div>
    `;
    }

    function handleChoice(choice) {
        const item = items[currentIndex];
        const card = content.querySelector('#current-card');

        if (choice === item.type) {
            score++;
            scoreDisplay.textContent = score;
            card.classList.add('correct');
            feedback.textContent = item.reason;
            feedback.style.color = '#2E7D32';
        } else {
            card.classList.add('wrong');
            feedback.textContent = `Wrong! ${item.name} is ${item.type.toUpperCase()}.`;
            feedback.style.color = '#C62828';
        }

        currentIndex++;
        setTimeout(() => {
            feedback.style.color = '#555';
            feedback.textContent = 'Next item...';
            showCard();
        }, 1500);
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => handleChoice(btn.dataset.type));
    });

    showCard();
}
