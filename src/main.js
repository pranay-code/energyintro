import '../style.css';
import { topics } from './data.js';
import { initSidebar } from './components/sidebar.js';

const mainContent = document.getElementById('main-content');

// Dynamic Widget Loader
async function loadWidget(widgetType, container) {
    try {
        // Clear previous widget
        container.innerHTML = '';

        // Import the specific widget module
        const module = await import(`./components/widgets/${widgetType}.js`);
        if (module && module.render) {
            module.render(container);
        } else {
            container.innerHTML = '<p class="error">Widget module found but no render function.</p>';
        }
    } catch (error) {
        console.error(`Failed to load widget: ${widgetType}`, error);
        container.innerHTML = `<p class="error">Widget loading pending implementation: ${widgetType}</p>`;
    }
}

function renderTopic(topicId) {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    // Update Content
    mainContent.innerHTML = `
    <div class="content-card">
      <h1>${topic.title}</h1>
      <div class="topic-content">${topic.content}</div>
      <div id="widget-area-${topic.id}" class="widget-container">
        <div class="widget-title">INTERACTIVE MODULE</div>
        <!-- Widget renders here -->
      </div>
    </div>
  `;

    // Load Widget
    const widgetContainer = document.getElementById(`widget-area-${topic.id}`);
    if (topic.widgetType) {
        loadWidget(topic.widgetType, widgetContainer);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSidebar(topics, renderTopic);

    // Load first topic by default
    renderTopic(topics[0].id);
});
