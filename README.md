# GridGuard: The Energy Domain Onboarding Portal

**GridGuard** is an interactive web application designed to educate new hires and enthusiasts about the complex world of the Energy Grid. It takes users on a journey from the fundamental physics of energy to the economics of modern power markets.

🔗 **Live Demo:** [https://pranay-code.github.io/energyintro/](https://pranay-code.github.io/energyintro/)

## 🌟 Key Features

-   **Interactive Learning:** 17 structured topics covering Physics, Engineering, Economics, and Data Science.
-   **Visual Simulations:**
    -   **Grid Balancing:** Interactive "Pool" analogy for frequency control.
    -   **Weather Dashboard:** Live forecasting using OpenMeteo API & Leaflet Maps.
    -   **Turbine Logic:** Animated visualizations of generation mechanics.
    -   **Battery Arbitrage:** Simulation of energy time-shifting.
-   **Gamified Assessment:** A 20-question quiz with detailed review and certificate generation.
-   **Modern UI:** "Light Sky Blue" theme with glassmorphism and floating animations.

## 🛠️ Tech Stack

-   **Core:** HTML5, CSS3 (Variables, Animations), JavaScript (ES6+).
-   **Build Tool:** Vite.
-   **Libraries:**
    -   `Chart.js` (Data Visualization)
    -   `Leaflet` (Maps)
    -   `jspdf` (Certificate Generation)
-   **APIs:** OpenMeteo (Geocoding & Weather Forecasts).

## 🚀 Getting Started

### Prerequisites
-   Node.js (v14 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/pranay-code/energyintro.git
    cd energyintro
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## 📦 Deployment

To deploy to GitHub Pages:

```bash
npm run deploy
```

## 📄 License

This project is open-source and available under the MIT License.
