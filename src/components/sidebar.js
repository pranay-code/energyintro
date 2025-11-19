export function initSidebar(topics, onSelect) {
    const navLinks = document.getElementById('nav-links');

    topics.forEach((topic, index) => {
        const div = document.createElement('div');
        div.className = 'nav-item';
        if (index === 0) div.classList.add('active');

        div.innerHTML = `
      <span class="nav-number">${index + 1}</span>
      <span class="nav-text">${topic.title.split(':')[0]}</span>
    `; // Simplified title for sidebar

        div.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            div.classList.add('active');

            // Trigger callback
            onSelect(topic.id);
        });

        navLinks.appendChild(div);
    });
}
