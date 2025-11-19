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
import * as WeatherDashboard from './components/widgets/weather-dashboard-v2.js';
import * as PenaltySimulator from './components/widgets/penalty-simulator.js';
import * as BatteryArbitrage from './components/widgets/battery-arbitrage.js';
import * as VennDiagram from './components/widgets/venn-diagram.js';
import * as RecMarket from './components/widgets/rec-market.js';
import * as StateExplorer from './components/widgets/state-explorer.js';
import * as QuizModule from './components/widgets/quiz-module-v2.js';
import * as IntroWidget from './components/widgets/intro-widget.js';

const WIDGETS = {
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
    'weather-dashboard-v2': WeatherDashboard,
    'penalty-simulator': PenaltySimulator,
    'battery-arbitrage': BatteryArbitrage,
    'venn-diagram': VennDiagram,
    'rec-market': RecMarket,
    'state-explorer': StateExplorer,
    'quiz-module-v2': QuizModule,
    'intro-widget': IntroWidget
};

// Dynamic Widget Loader
async function loadWidget(widgetType, container) {
    try {
        // Clear previous widget
        container.innerHTML = '';

        const module = WIDGETS[widgetType];

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

    // Initial Render
    renderSidebar();
    renderTopic(topics[0].id);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking a nav item on mobile
        sidebar.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && e.target.closest('.nav-item')) {
                sidebar.classList.remove('open');
            }
        });

        // Close sidebar when clicking outside (on main content)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                e.target !== menuToggle) {
                sidebar.classList.remove('open');
            }
        });
    }
});
