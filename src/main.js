import '../style.css';
import { topics } from './data.js';
import { initSidebar } from './components/sidebar.js';

const mainContent = document.getElementById('main-content');

import * as EnergyConverter from './components/widgets/energy-converter.js';
import * as TypesMatrix from './components/widgets/types-matrix.js';
import * as TurbineLogic from './components/widgets/turbine-logic.js';
import * as EfficiencyWaterfall from './components/widgets/efficiency-waterfall.js';
import * as GridPurpose from './components/widgets/grid-purpose.js';
import * as GridMix from './components/widgets/grid-mix.js';
import * as EmissionCalculator from './components/widgets/emission-calculator.js';
import * as LcoeTrend from './components/widgets/lcoe-trend.js';
import * as FrequencyScale from './components/widgets/frequency-scale.js';
import * as DuckCurve from './components/widgets/duck-curve.js';
import * as WeatherDashboardV2 from './components/widgets/weather-dashboard-v2.js';
import * as PenaltySimulator from './components/widgets/penalty-simulator.js';
import * as BatteryArbitrage from './components/widgets/battery-arbitrage.js';
import * as VennDiagram from './components/widgets/venn-diagram.js';
import * as RecMarket from './components/widgets/rec-market.js';
import * as StateExplorer from './components/widgets/state-explorer.js';
import * as QuizModuleV2 from './components/widgets/quiz-module-v2.js';
import * as IntroWidget from './components/widgets/intro-widget.js';
import * as TransmissionBottleneck from './components/widgets/transmission-bottleneck.js';
import * as EnergySorter from './components/widgets/energy-sorter.js';

const widgetRegistry = {
    'intro-widget': IntroWidget,
    'energy-converter': EnergyConverter,
    'types-matrix': TypesMatrix,
    'turbine-logic': TurbineLogic,
    'efficiency-waterfall': EfficiencyWaterfall,
    'grid-purpose': GridPurpose,
    'grid-mix': GridMix,
    'emission-calculator': EmissionCalculator,
    'lcoe-trend': LcoeTrend,
    'frequency-scale': FrequencyScale,
    'duck-curve': DuckCurve,
    'weather-dashboard-v2': WeatherDashboardV2,
    'penalty-simulator': PenaltySimulator,
    'battery-arbitrage': BatteryArbitrage,
    'venn-diagram': VennDiagram,
    'rec-market': RecMarket,
    'state-explorer': StateExplorer,
    'quiz-module-v2': QuizModuleV2,
    'transmission-bottleneck': TransmissionBottleneck,
    'energy-sorter': EnergySorter
};

// Dynamic Widget Loader
async function loadWidget(widgetType, container) {
    try {
        // Clear previous widget
        container.innerHTML = '';

        const module = widgetRegistry[widgetType];

        if (module && module.render) {
            module.render(container);
        } else {
            console.error(`Widget not found or missing render: ${widgetType}`);
            container.innerHTML = `<p class="error">Widget module not found: ${widgetType}</p>`;
        }
    } catch (error) {
        console.error(`Failed to load widget: ${widgetType}`, error);
        container.innerHTML = `<p class="error">Error loading widget: ${widgetType}</p>`;
    }
}

function renderTopic(topicId) {
    const topicIndex = topics.findIndex(t => t.id === topicId);
    const topic = topics[topicIndex];
    if (!topic) return;

    const nextTopic = topics[topicIndex + 1];
    const prevTopic = topics[topicIndex - 1];

    // Extract "Next: ..." text if it exists (usually at the end of content)
    let content = topic.content;
    let nextHint = '';
    const nextMatch = content.match(/<p><em>(Next:|But what if).*?<\/em><\/p>/);

    if (nextMatch) {
        nextHint = nextMatch[0];
        content = content.replace(nextMatch[0], '');
    }

    // Update Content
    mainContent.innerHTML = `
    <div class="content-card">
      <h1>${topic.title}</h1>
      <div class="topic-content">${content}</div>
      ${topic.widgetType ? `
      <div id="widget-area-${topic.id}" class="widget-container">
        <div class="widget-title">INTERACTIVE MODULE</div>
        <!-- Widget renders here -->
      </div>` : ''}
      
      <div class="navigation-footer">
        ${nextHint ? `<div class="next-hint">${nextHint}</div>` : ''}
        ${!nextTopic ? '<p class="end-msg">You have reached the end of the journey! 🎉</p>' : ''}
        
        <div class="footer-buttons">
          ${prevTopic ? `
            <button class="btn prev-section-btn" data-prev-id="${prevTopic.id}">
              ← Back: ${prevTopic.title}
            </button>
          ` : '<span></span>'}
          
          ${nextTopic ? `
            <button class="btn next-section-btn" data-next-id="${nextTopic.id}">
              Go to: ${nextTopic.title} →
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

    // Load Widget
    const widgetContainer = document.getElementById(`widget-area-${topic.id}`);
    if (topic.widgetType) {
        loadWidget(topic.widgetType, widgetContainer);
    }

    // Add listeners for navigation buttons
    const nextBtn = mainContent.querySelector('.next-section-btn');
    const prevBtn = mainContent.querySelector('.prev-section-btn');

    const handleNav = (targetId) => {
        renderTopic(targetId);
        // Also update active state in sidebar
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.dataset.id === targetId);
        });
        // Scroll to top
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (nextBtn) nextBtn.addEventListener('click', () => handleNav(nextBtn.dataset.nextId));
    if (prevBtn) prevBtn.addEventListener('click', () => handleNav(prevBtn.dataset.prevId));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSidebar(topics, (id) => {
        renderTopic(id);
        // Clean up mobile states regardless of current width (handles rotation)
        const sidebar = document.getElementById('sidebar');
        const app = document.getElementById('app');
        if (sidebar) sidebar.classList.remove('open');
        if (app) app.classList.remove('mobile-sidebar-open');
    });

    // Initial Render
    renderTopic(topics[0].id);

    // Sidebar Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const app = document.getElementById('app');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            if (window.innerWidth > 900) {
                app.classList.toggle('sidebar-collapsed');
            } else {
                sidebar.classList.toggle('open');
                app.classList.toggle('mobile-sidebar-open');
            }
        });

        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', () => {
                if (window.innerWidth > 900) {
                    app.classList.add('sidebar-collapsed');
                } else {
                    sidebar.classList.remove('open');
                    app.classList.remove('mobile-sidebar-open');
                }
            });
        }

        // Close sidebar when clicking outside (on mobile only)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 &&
                sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                e.target !== menuToggle) {
                sidebar.classList.remove('open');
                app.classList.remove('mobile-sidebar-open');
            }
        });
    }
});
