export const topics = [
  {
    id: 'intro',
    title: 'Introduction',
    content: `
      <h2>Powering Modern Life</h2>
      <p>Electricity is the invisible lifeblood of our civilization. From the moment we wake up to the streetlights that guide us home, it powers everything. But have you ever wondered how this energy reaches you?</p>
      <p>In this portal, we will take you on a journey from the fundamental physics of energy to the complex economics of the modern power grid. You will learn how we harvest nature's power, convert it, and deliver it instantly to millions of homes.</p>
      <h3>Why It Matters</h3>
      <p>As an IPP (Independent Power Producer), we are the heart of this system. We generate the power that drives the economy. Understanding this domain is not just about engineering; it's about understanding the pulse of the nation.</p>
      <p><em>Next: Let's start with the basics. What exactly is Energy?</em></p>
    `,
    widgetType: 'intro-widget'
  },
  {
    id: 'energy',
    title: 'Energy: The Basics',
    content: `
      <h2>The Capacity to Perform Work</h2>
      <p>Energy is the fundamental quantitative property that must be transferred to a body or physical system to perform work on the body, or to heat it. It is a conserved quantity; the law of conservation of energy states that energy can be converted in form, but not created or destroyed.</p>
      <p>In our context, we distinguish between <strong>Primary Energy</strong> (raw resources like Coal, Sunlight, Wind) and <strong>Secondary Energy</strong> (Electricity), which is an energy carrier.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> Think of Coal as a "Battery" created by nature over millions of years. We are simply unlocking that stored chemical energy. Sunlight, on the other hand, is a continuous stream of energy that we must catch in real-time.
      </div>

      <h3>Why We Care (IPP Context)</h3>
      <p>We are in the business of converting Primary Energy (free fuel like Sun/Wind or purchased fuel like Coal) into Secondary Energy (Electricity) with maximum efficiency. Every Joule lost in conversion is revenue lost.</p>
      <p><em>Next: Energy comes in many forms. Let's see how they connect.</em></p>
    `,
    widgetType: 'energy-converter'
  },
  {
    id: 'types',
    title: 'Types of Energy',
    content: `
      <h2>Forms & Transformations</h2>
      <p>Energy shapeshifts. To generate power, we often have to force energy through multiple forms:</p>
      <ul>
        <li><strong>Chemical:</strong> Stored in the bonds of coal or gas.</li>
        <li><strong>Thermal:</strong> Released as heat when we burn the fuel.</li>
        <li><strong>Kinetic:</strong> The movement of steam expanding to spin a turbine.</li>
        <li><strong>Electrical:</strong> The final output from the generator.</li>
      </ul>
      
      <div class="example-box">
        <strong>Real World Example:</strong> A car engine works similarly. Chemical (Petrol) -> Thermal (Explosion) -> Kinetic (Piston moving) -> Kinetic (Wheels turning).
      </div>

      <h3>Why We Care</h3>
      <p>Each transformation step incurs a loss. A thermal plant has many steps (Chemical -> Thermal -> Kinetic -> Electrical), leading to lower efficiency (~35%). Solar PV is unique: it goes directly from Electromagnetic (Light) -> Electrical, skipping the mechanical steps.</p>
      <p><em>Next: How do we mechanically generate this power?</em></p>
    `,
    widgetType: 'types-matrix'
  },
  {
    id: 'generation',
    title: 'Generation Mechanics',
    content: `
      <h2>Spinning Magnets & Glowing Silicon</h2>
      <p><strong>Thermal/Wind/Hydro:</strong> Almost all traditional power generation relies on <strong>Electromagnetic Induction</strong>. We use a fuel (Coal/Wind/Water) to spin a magnet inside a coil of wire. The changing magnetic field pushes electrons, creating current.</p>
      <p><strong>Solar PV:</strong> This is the exception. It uses the <strong>Photo-electric effect</strong>. Photons from the sun strike a silicon semiconductor, knocking electrons loose and creating a flow of current directly. No moving parts.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> A bicycle dynamo uses your leg power (Kinetic) to spin a magnet, lighting up the lamp. A solar calculator uses light to power the screen.
      </div>

      <h3>Why We Care</h3>
      <p>Mechanical plants (Wind/Coal) need lubrication, gearbox maintenance, and bearing replacements. Solar plants are solid-state but need panel cleaning to maintain efficiency. The physics dictates the O&M (Operations & Maintenance) strategy.</p>
      <p><em>Next: Once generated, we need to move it. Enter Electricity.</em></p>
    `,
    widgetType: 'turbine-logic'
  },
  {
    id: 'electricity',
    title: 'Electricity & Efficiency',
    content: `
      <h2>The Perfect Carrier</h2>
      <p>Electricity is the preferred energy carrier because it can be transmitted instantly over long distances with relatively low losses. It is "Weightless" energy.</p>
      <p><strong>Efficiency:</strong> However, generating it is inefficient. In a coal plant, the <strong>Carnot Limit</strong> restricts us. For every 100 units of energy in coal, we only get ~35-40 units of electricity. The remaining 60 units are lost as waste heat.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> If you buy 100 apples (Coal Energy) but drop 65 of them on the way home (Heat Loss), you only get to eat 35 (Electricity). That is the reality of thermal power.
      </div>

      <h3>Why We Care</h3>
      <p>That 65% loss is money up the chimney. Improving efficiency by even 0.1% is a massive engineering goal. This is why we track "Heat Rate" (kCal/kWh) obsessively.</p>
      <p><em>Next: Where does this electricity go? Into the Grid.</em></p>
    `,
    widgetType: 'efficiency-waterfall'
  },
  {
    id: 'grid-purpose',
    title: 'What is the Grid?',
    content: `
      <h2>The World's Largest Machine</h2>
      <p>The "Grid" is not just wires; it is a synchronized ecosystem. It connects Generators (Supply) to Consumers (Demand) via Transmission (High Voltage) and Distribution (Low Voltage) networks.</p>
      <p>It acts like a giant pool. Generators pour water (electrons) in, and consumers drain it out. The level (Frequency) must stay constant.</p>
      
      <div style="text-align:center; margin: 20px 0;">
        <img src="./grid-ecosystem.png" style="max-width:100%; border-radius:12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <p style="font-size:0.8rem; color:#666; margin-top:5px">The Grid Ecosystem: From Generation to Consumption</p>
      </div>

      <h3>Why We Care</h3>
      <p>We don't just sell to a customer; we inject into this shared pool. If the pool is full (congestion) or the pipes are too small (transmission constraints), we can't sell our power, even if we can generate it.</p>
      <p><em>Next: What is pouring into this pool right now?</em></p>
    `,
    widgetType: 'grid-purpose'
  },
  {
    id: 'mix',
    title: 'Current Energy Mix',
    content: `
      <h2>The Composition</h2>
      <p>India's grid is a mix of different sources, each playing a role:</p>
      <ul>
        <li><strong>Base Load (Coal/Nuclear):</strong> Runs 24/7 to provide the minimum constant demand. High inertia, slow to change.</li>
        <li><strong>Peaking Power (Hydro/Gas):</strong> Can start fast to meet sudden spikes in demand (e.g., evening lighting).</li>
        <li><strong>Renewables (Solar/Wind):</strong> Variable but clean. They are "Must-Run" (Grid must take them).</li>
      </ul>
      
      <div class="example-box">
        <strong>Real World Example:</strong> Think of Base Load as the steady rhythm of a drum, and Peaking Power as the guitar solos that come in when the song gets intense.
      </div>

      <h3>Why We Care</h3>
      <p>We are shifting from a Coal-heavy portfolio to a Green portfolio. This changes how we operate. We are moving from "Controllable" generation to "Variable" generation.</p>
      <p><em>Next: Why the shift? The environmental cost.</em></p>
    `,
    widgetType: 'grid-mix'
  },
  {
    id: 'impact',
    title: 'Environmental Impact',
    content: `
      <h2>The Cost of Carbon</h2>
      <p>Burning coal releases CO2 (Global Warming), SOx (Acid Rain), NOx (Smog), and Particulate Matter (PM2.5 - Health Hazard). It also consumes vast amounts of water for cooling.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> A single large coal plant can emit as much CO2 in a year as 1 million cars.
      </div>

      <h3>Why We Care</h3>
      <p>Regulations are tightening. Carbon taxes are coming. Investors (ESG Funds) are refusing to fund coal projects. Being "Green" is no longer just PR; it's a financial survival strategy.</p>
      <p><em>Next: The economic case for Renewables.</em></p>
    `,
    widgetType: 'emission-calculator'
  },
  {
    id: 'renewables',
    title: 'Need for Renewables',
    content: `
      <h2>Cheaper & Cleaner</h2>
      <p>Solar and Wind are not just clean; they are now the cheapest sources of new power. The <strong>LCOE (Levelized Cost of Energy)</strong> of Solar has dropped by ~90% in the last decade.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> In 2010, Solar power cost ₹15/unit. Today, it costs ₹2.50/unit. Coal power costs ₹4.50/unit. The economics have flipped.
      </div>

      <h3>Why We Care</h3>
      <p>Low cost means high demand. But "Free Fuel" comes with a catch: Variability. We can't switch the sun on at night.</p>
      <p><em>Next: The challenge of balancing a variable grid.</em></p>
    `,
    widgetType: 'lcoe-trend'
  },
  {
    id: 'grid-balance',
    title: 'Grid Balance',
    content: `
      <h2>The 50Hz Heartbeat</h2>
      <p>The grid must operate at exactly 50Hz. This frequency represents the rotational speed of all generators. It is the heartbeat of the system.</p>
      <ul>
        <li><strong>Supply = Demand:</strong> Frequency stays at 50Hz.</li>
        <li><strong>Supply < Demand:</strong> Frequency drops (Braking effect).</li>
        <li><strong>Supply > Demand:</strong> Frequency rises (Acceleration).</li>
      </ul>
      
      <div class="example-box">
        <strong>Real World Example:</strong> Imagine riding a tandem bike. If your partner stops pedaling (Supply drops) but you keep the same gear (Demand), you slow down (Frequency drops).
      </div>

      <h3>Why We Care</h3>
      <p>If we fail to provide power when promised, the frequency drops, risking a blackout. The grid operator will penalize us heavily for this.</p>
      <p><em>Next: What happens when the sun sets?</em></p>
    `,
    widgetType: 'frequency-scale'
  },
  {
    id: 'challenges',
    title: 'Integration Challenges',
    content: `
      <h2>The Duck Curve</h2>
      <p>Solar produces too much at noon and zero at night. This creates a "Duck" shape in the net demand curve. The grid needs massive ramping capability to handle the sunset (when solar vanishes but lighting demand spikes).</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> It's like a restaurant that is empty at lunch but has 1000 customers walk in at 7 PM. The kitchen (Grid) is under immense stress to serve everyone instantly.
      </div>

      <h3>Why We Care</h3>
      <p>If we generate too much at noon, the grid might "Curtail" us (switch us off) to save the system. We lose revenue during curtailment. We need to predict this.</p>
      <p><em>Next: How do we predict the weather?</em></p>
    `,
    widgetType: 'duck-curve'
  },
  {
    id: 'forecasting',
    title: 'Generation Forecasting',
    content: `
      <h2>Predicting the Fuel</h2>
      <p>Unlike coal, we can't control the Sun or Wind. The "Fuel" falls from the sky. We must forecast it using satellites and weather models.</p>
      <p><strong>Resource Variability:</strong> Look at the charts below. Notice how the resource fluctuates? A coal plant line is flat. A solar/wind line is jagged. This variability makes load matching extremely difficult.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> A cloud passing over a solar farm can drop generation from 100MW to 20MW in seconds. We must predict this to warn the grid.
      </div>

      <h3>Why We Care</h3>
      <p>Accurate forecasts allow us to commit power to the grid. If we say we will generate 100MW and only generate 50MW, we have destabilized the grid.</p>
      <p><em>Next: The financial cost of being wrong.</em></p>
    `,
    widgetType: 'weather-dashboard-v2'
  },
  {
    id: 'dsm',
    title: 'DSM & Penalties',
    content: `
      <h2>Deviation Settlement Mechanism</h2>
      <p>To enforce discipline, the regulator imposes fines. If we deviate from our schedule beyond a limit (e.g., 15%), we pay a penalty called DSM.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> It's like a delivery service. If you promise to deliver at 10 AM and arrive at 12 PM, you pay a late fee. In the grid, this fee is calculated every 15 minutes.
      </div>

      <h3>Why We Care</h3>
      <p>Profit = Revenue - Cost - Penalties. In a low-margin business, minimizing DSM penalties is often the difference between profit and loss.</p>
      <p><em>Next: How do we solve the variability permanently?</em></p>
    `,
    widgetType: 'penalty-simulator'
  },
  {
    id: 'future',
    title: 'Future Technologies',
    content: `
      <h2>Storage & Hydrogen</h2>
      <p><strong>BESS (Battery Energy Storage):</strong> Batteries allow us to store the noon sun and sell it at night. This solves the Duck Curve.</p>
      <p><strong>Green Hydrogen:</strong> We use renewable electricity to split water (Electrolysis) into Hydrogen. This Hydrogen can be stored for months and used in industries like Steel.</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> Batteries turn "Perishable" electricity (must be used now) into "Non-perishable" electricity (can be used later).
      </div>

      <h3>Why We Care</h3>
      <p>This turns intermittent renewable power into firm, round-the-clock power. It allows us to compete directly with coal.</p>
      <p><em>Next: A regulatory nuance.</em></p>
    `,
    widgetType: 'battery-arbitrage'
  },
  {
    id: 'clean-vs-renewable',
    title: 'Clean vs Renewable',
    content: `
      <h2>Definitions Matter</h2>
      <p><strong>Renewable:</strong> Source is replenished naturally (Sun, Wind, Biomass).</p>
      <p><strong>Clean:</strong> Low carbon emissions (Nuclear, Large Hydro).</p>
      <p>Large Hydro (>25MW) was historically not "Renewable" in India, but is "Clean."</p>
      
      <h3>Why We Care</h3>
      <p>Only "Renewable" projects generate RECs (Renewable Energy Certificates). Understanding the classification helps in regulatory compliance and trading.</p>
      <p><em>Next: How do we monetize these certificates?</em></p>
    `,
    widgetType: 'venn-diagram'
  },
  {
    id: 'carbon-markets',
    title: 'Carbon Markets & RECs',
    content: `
      <h2>Selling the "Green" Attribute</h2>
      <p>When we generate renewable power, we produce two things:</p>
      <ol>
        <li><strong>Electricity:</strong> Sold to the grid (e.g., ₹2.50/unit).</li>
        <li><strong>Green Attribute (REC):</strong> A digital certificate proving the power was green.</li>
      </ol>
      <p>Companies that pollute (like Steel or Cement factories) buy these RECs to offset their emissions and meet regulatory targets (RPO - Renewable Purchase Obligation).</p>
      
      <div class="example-box">
        <strong>Real World Example:</strong> It's like buying organic vegetables. You pay for the vegetable (Electricity) plus a premium for the "Organic" label (REC).
      </div>

      <h3>Why We Care</h3>
      <p>RECs are an additional revenue stream. In some cases, we can sell the power cheaply but make our profit from trading RECs in the carbon market.</p>
      <p><em>Next: Where are these projects located?</em></p>
    `,
    widgetType: 'rec-market'
  },
  {
    id: 'statistics',
    title: 'Indian Energy Statistics',
    content: `
      <h2>The National Picture</h2>
      <p>India is a diverse continent. Resources are not evenly distributed. This is why we need a national market to trade power and RECs.</p>
      <ul>
        <li><strong>Rajasthan/Gujarat:</strong> High Solar & Wind (The "Saudi Arabia" of Renewables).</li>
        <li><strong>Tamil Nadu:</strong> High Wind.</li>
        <li><strong>Northeast:</strong> High Hydro.</li>
      </ul>
      
      <h3>Why We Care</h3>
      <p>We build plants where the resource is best (Rajasthan), but we sell power to where the money is (Commercial states like Maharashtra). This requires Inter-State Transmission System (ISTS) access.</p>
      <p><em>Next: Let's test your knowledge.</em></p>
    `,
    widgetType: 'state-explorer'
  },
  {
    id: 'assessment',
    title: 'Final Assessment',
    content: `
      <h2>Prove Your Knowledge</h2>
      <p>Take the 20-question assessment to earn your <strong>Energy Domain Associate</strong> certificate.</p>
      <p>Passing Score: 70% (14/20)</p>
    `,
    widgetType: 'quiz-module-v2'
  }
];

export const questions = [
  { q: "What is the primary difference between Primary and Secondary energy?", options: ["Primary is renewable, Secondary is fossil", "Primary is raw resource, Secondary is a carrier", "Primary is expensive, Secondary is cheap", "No difference"], a: 1 },
  { q: "Which energy transformation occurs in a thermal power plant?", options: ["Chemical -> Thermal -> Kinetic -> Electrical", "Potential -> Kinetic -> Electrical", "Thermal -> Chemical -> Electrical", "Kinetic -> Thermal -> Electrical"], a: 0 },
  { q: "What is the Carnot Limit related to?", options: ["Solar Efficiency", "Wind Speed Limits", "Thermal Plant Efficiency", "Battery Capacity"], a: 2 },
  { q: "How does Solar PV generate electricity?", options: ["Induction", "Photo-electric Effect", "Combustion", "Fission"], a: 1 },
  { q: "What is 'Base Load' power?", options: ["Power used only at peak times", "Power sources that run 24/7 (e.g., Coal)", "Renewable energy only", "Battery storage"], a: 1 },
  { q: "Which emission is NOT typically associated with thermal plants?", options: ["CO2", "SOx", "Nuclear Waste", "PM2.5"], a: 2 },
  { q: "What does LCOE stand for?", options: ["Low Cost of Energy", "Levelized Cost of Energy", "Long-term Coal of Energy", "Levelized Carbon of Energy"], a: 1 },
  { q: "What happens to Grid Frequency if Demand > Supply?", options: ["It increases", "It stays same", "It drops", "It fluctuates wildly"], a: 2 },
  { q: "What is the 'Duck Curve'?", options: ["A bird migration pattern", "Net load curve with high solar penetration", "Wind generation curve", "Coal price trend"], a: 1 },
  { q: "Why is GHI important for forecasting?", options: ["It predicts wind speed", "It measures solar irradiance", "It predicts rain", "It measures coal quality"], a: 1 },
  { q: "What is DSM in the context of the grid?", options: ["Demand Side Management", "Deviation Settlement Mechanism", "Direct Solar Measurement", "Daily Supply Monitor"], a: 1 },
  { q: "What is the main purpose of BESS?", options: ["To generate power", "To store energy for time-shifting", "To cool solar panels", "To burn coal efficiently"], a: 1 },
  { q: "Which of these is 'Clean' but not necessarily 'Renewable'?", options: ["Solar", "Wind", "Nuclear", "Biomass"], a: 2 },
  { q: "Which Indian state is known as a Solar Hub?", options: ["Kerala", "Rajasthan", "West Bengal", "Bihar"], a: 1 },
  { q: "If Scheduled Gen is 100MW and Actual is 80MW, what is the deviation?", options: ["-20%", "20%", "-10%", "0%"], a: 0 },
  { q: "What is the standard Grid Frequency in India?", options: ["60Hz", "50Hz", "100Hz", "220Hz"], a: 1 },
  { q: "What is 'Must-Run' status?", options: ["Plants that must run at full capacity", "Grid must absorb generated power (Renewables)", "Plants that are broken", "Diesel generators"], a: 1 },
  { q: "Scope 2 emissions are:", options: ["Direct emissions", "Indirect from purchased electricity", "Supply chain emissions", "Employee commute"], a: 1 },
  { q: "What converts Kinetic energy to Electrical energy?", options: ["Boiler", "Turbine", "Generator", "Condenser"], a: 2 },
  { q: "Green Hydrogen is produced using:", options: ["Steam Methane Reforming", "Electrolysis with Renewable Energy", "Coal Gasification", "Nuclear Fission"], a: 1 }
];
