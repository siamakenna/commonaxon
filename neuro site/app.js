const state = {
  route: "home",
  user: load("nba_user", null),
  githubProfile: load("nba_github_profile", ""),
  savedSearches: load("nba_saved_searches", []),
  journalEntries: load("nba_journal_entries", []),
  resources: load("nba_resources", seedResources()),
  lastPubMed: [],
  lastTrials: [],
};

state.resources = mergeSeedResources(state.resources);
save("nba_resources", state.resources);

const diseaseOptions = [
  ["alzheimer", "Alzheimer disease"],
  ["dementia", "Dementia and cognitive decline"],
  ["parkinson", "Parkinson disease"],
  ["als", "ALS / motor neuron disease"],
  ["huntington", "Huntington disease"],
  ["multiple-sclerosis", "Multiple sclerosis"],
  ["epilepsy", "Epilepsy"],
  ["stroke", "Stroke and vascular brain injury"],
  ["migraine", "Migraine and chronic headache"],
  ["tbi", "Traumatic brain injury"],
  ["autism", "Autism and neurodevelopment"],
  ["adhd", "ADHD and attention"],
  ["neuropathy", "Peripheral neuropathy"],
  ["brain-tumor", "Brain tumors"],
  ["long-covid", "Long COVID neurological symptoms"],
  ["rare-neuro", "Rare neurological disorders"],
];

const measureOptions = [
  ["incidence", "Incidence / new cases"],
  ["prevalence", "Prevalence / existing cases"],
  ["diagnosis", "Diagnosis access"],
  ["screening", "Screening and early detection"],
  ["specialist", "Specialist access"],
  ["trial-access", "Clinical trial access"],
  ["treatment", "Treatment access"],
  ["outcome", "Outcome burden"],
  ["mortality", "Mortality"],
  ["caregiver", "Caregiver burden"],
  ["cost", "Out-of-pocket cost"],
  ["transport", "Transportation barrier"],
  ["language", "Language access"],
  ["digital", "Digital access"],
  ["trust", "Trust and research history"],
];

const geographyOptions = [
  "United States",
  "All states",
  "Northeast",
  "Mid-Atlantic",
  "South",
  "Midwest",
  "West",
  "Rural counties",
  "Urban communities",
  "Suburban communities",
  "Tribal lands",
  "U.S. territories",
  "Border communities",
  "Low-income ZIP codes",
  "Medically underserved areas",
  "Appalachian communities",
  "Delta region",
  "Major metro areas",
  "College and university communities",
  "Diaspora communities",
  "Global comparison",
];

const sourceLayerOptions = [
  "CDC WONDER exports",
  "CDC PLACES",
  "AHRQ Healthcare Cost and Utilization Project",
  "AHRQ National Healthcare Quality and Disparities Report",
  "NIH / NINDS public data",
  "ClinicalTrials.gov",
  "PubMed / NCBI E-utilities",
  "Census ACS demographics",
  "County Health Rankings",
  "Health Resources and Services Administration",
  "Medicare public-use files",
  "Medicaid public-use files",
  "National Health Interview Survey",
  "Behavioral Risk Factor Surveillance System",
  "Community resource directory",
  "User-uploaded CSV",
];

const communityLensOptions = [
  "Black / African American",
  "African immigrant communities",
  "Caribbean communities",
  "Asian American",
  "South Asian",
  "East Asian",
  "Southeast Asian",
  "Native Hawaiian / Pacific Islander",
  "Latine / Hispanic",
  "Indigenous / Native American",
  "Middle Eastern / North African",
  "Multiracial",
  "Religious minority communities",
  "Faith-based communities",
  "Religiously unaffiliated communities",
  "Women",
  "Men",
  "Intersex people",
  "Transgender people",
  "Non-binary people",
  "Two-spirit people",
  "LGBTQ+",
  "Disabled people",
  "Neurodivergent people",
  "Caregivers",
  "Older adults",
  "Youth and students",
  "First-generation students",
  "Community college students",
  "Minority-serving institution communities",
  "Low-income communities",
  "Uninsured / underinsured",
  "Immigrant communities",
  "Refugee communities",
  "Non-English speakers",
  "Justice-impacted people",
  "Veterans",
  "Rural communities",
  "People experiencing housing insecurity",
];

const moduleCards = [
  {
    route: "atlas",
    title: "Disparity Atlas",
    icon: "▥",
    text: "See where brain health outcomes differ by race, income, gender, and place.",
  },
  {
    route: "research",
    title: "Research Hub",
    icon: "▤",
    text: "Find papers with PubMed or search Sci-Bot when you want help reading the literature.",
  },
  {
    route: "translator",
    title: "AI Translator",
    icon: "A↔",
    text: "Turn dense abstracts into patient, community, scientist, and policy summaries.",
  },
  {
    route: "trials",
    title: "Trial Finder",
    icon: "⌁",
    text: "Look for active studies and ask whether participation is actually accessible.",
  },
  {
    route: "portfolio",
    title: "Portfolio",
    icon: "◇",
    text: "Connect your research, lived experience, resources, and reflection notes.",
  },
];

const atlasRows = [
  { group: "Black or African American", incidence: 1.22, diagnosis: 0.74, outcome: 1.31 },
  { group: "Hispanic or Latino", incidence: 1.08, diagnosis: 0.81, outcome: 1.18 },
  { group: "Asian American", incidence: 0.91, diagnosis: 0.86, outcome: 0.96 },
  { group: "Indigenous / Native American", incidence: 1.19, diagnosis: 0.7, outcome: 1.29 },
  { group: "Middle Eastern / North African", incidence: 1.03, diagnosis: 0.78, outcome: 1.11 },
  { group: "Multiracial", incidence: 1.06, diagnosis: 0.8, outcome: 1.13 },
  { group: "Rural low-income", incidence: 1.18, diagnosis: 0.69, outcome: 1.27 },
  { group: "Women", incidence: 1.14, diagnosis: 0.92, outcome: 1.08 },
  { group: "Men", incidence: 1.01, diagnosis: 0.88, outcome: 1.04 },
  { group: "Transgender / non-binary", incidence: 1.04, diagnosis: 0.73, outcome: 1.15 },
  { group: "LGBTQ+ caregivers", incidence: 1.02, diagnosis: 0.77, outcome: 1.12 },
  { group: "Disabled people", incidence: 1.13, diagnosis: 0.76, outcome: 1.24 },
  { group: "Non-English speakers", incidence: 1.09, diagnosis: 0.66, outcome: 1.22 },
  { group: "Uninsured / underinsured", incidence: 1.17, diagnosis: 0.64, outcome: 1.32 },
];

const diseaseData = {
  alzheimer: [1.22, 1.08, 0.91, 1.18, 1.14, 1.02],
  parkinson: [1.05, 0.97, 0.86, 1.21, 0.88, 1.06],
  als: [0.94, 0.89, 0.83, 1.16, 0.91, 1.04],
  huntington: [0.88, 0.84, 0.8, 1.11, 0.95, 1.01],
};

const app = document.querySelector("#app");
const accountLabel = document.querySelector("#accountLabel");
const authButton = document.querySelector("#authButton");
const authDialog = document.querySelector("#authDialog");
const authForm = document.querySelector("#authForm");
const authName = document.querySelector("#authName");
const authEmail = document.querySelector("#authEmail");

window.addEventListener("hashchange", route);
authButton.addEventListener("click", openAuth);
authForm.addEventListener("submit", saveAuth);

route();
renderAccount();

function route() {
  state.route = location.hash.replace("#", "") || "home";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === state.route);
  });

  const views = {
    home: renderHome,
    atlas: renderAtlas,
    research: renderResearch,
    translator: renderTranslator,
    trials: renderTrials,
    portfolio: renderPortfolio,
  };

  (views[state.route] || renderHome)();
  app.focus({ preventScroll: true });
}

function renderHome() {
  app.innerHTML = `
    <section class="home-screen" aria-labelledby="homeTitle">
      <div class="home-intro">
        <h1 id="homeTitle">CommonAxon</h1>
        <p class="lede">
          A plain-language research map for brain health equity. Search papers, trials, data, and community resources without losing the human story.
        </p>
        <form class="search-box" id="globalSearch">
          <input class="search-input" id="globalQuery" placeholder="Search Alzheimer care gaps, Parkinson trials, caregiver resources..." />
          <button class="primary-button" type="submit">Search</button>
        </form>
        <div class="quick-search-actions" aria-label="Article search shortcuts">
          <button class="secondary-button" id="homeSciBotSearch" type="button">Search Sci-Bot articles</button>
          <button class="quiet-button" id="homePubMedSearch" type="button">Search PubMed</button>
        </div>
      </div>
      <div class="home-module-list" aria-label="CommonAxon modules">
          ${moduleCards
            .map(
              (card) => `
                <a class="home-module" href="#${card.route}">
                  <span class="module-icon" aria-hidden="true">${card.icon}</span>
                  <span>
                  <h3>${card.title}</h3>
                  <p>${card.text}</p>
                  </span>
                </a>
              `,
            )
            .join("")}
      </div>
    </section>
  `;

  document.querySelector("#globalSearch").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.querySelector("#globalQuery").value.trim();
    if (!query) return;
    sessionStorage.setItem("nba_pending_query", query);
    location.hash = "research";
  });
  document.querySelector("#homePubMedSearch").addEventListener("click", () => {
    const query = document.querySelector("#globalQuery").value.trim() || "brain health equity";
    sessionStorage.setItem("nba_pending_query", query);
    location.hash = "research";
  });
  document.querySelector("#homeSciBotSearch").addEventListener("click", () => {
    const query = document.querySelector("#globalQuery").value.trim() || "brain health equity";
    window.open(sciBotUrl(query), "_blank", "noreferrer");
  });
}

function renderAtlas() {
  app.innerHTML = `
    <section class="module-page" aria-labelledby="atlasTitle">
      ${pageHead(
        "Disparity Atlas",
        "A simple dashboard for spotting gaps in diagnosis, care access, and outcomes by race, income, gender, and place.",
        "atlasTitle",
      )}
      <form class="toolbar" id="atlasControls">
        <label>Disease area
          <select id="atlasDisease">
            ${diseaseOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
          </select>
        </label>
        <label>Measure
          <select id="atlasMeasure">
            ${measureOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
          </select>
        </label>
        <button class="primary-button" type="submit">Update</button>
      </form>
      <section class="filter-panel" aria-label="Atlas equity filters">
        <div>
          <div class="filter-head">
            <h2>Geography</h2>
            <span class="fine-print">Choose one or many</span>
          </div>
          ${renderCheckboxGroup("atlasGeo", geographyOptions, ["United States", "Rural counties"])}
        </div>
        <div>
          <div class="filter-head">
            <h2>Community lens</h2>
            <span class="fine-print">Race, ethnicity, gender, sex, access, and lived context</span>
          </div>
          ${renderCheckboxGroup("atlasLens", communityLensOptions, ["Black / African American", "Low-income communities", "LGBTQ+"])}
        </div>
        <div>
          <div class="filter-head">
            <h2>Source layers</h2>
            <span class="fine-print">Prototype source map</span>
          </div>
          ${renderCheckboxGroup("atlasSources", sourceLayerOptions, ["CDC WONDER exports", "AHRQ Healthcare Cost and Utilization Project", "ClinicalTrials.gov"])}
        </div>
      </section>
      <div class="metric-grid">
        <article class="metric-card"><p>Highest burden index</p><strong id="highestMetric">1.31x</strong></article>
        <article class="metric-card"><p>Largest access gap</p><strong id="gapMetric">31%</strong></article>
        <article class="metric-card"><p>Equity priority</p><strong id="priorityMetric">Rural low-income</strong></article>
      </div>
      <div class="two-col">
        <section class="content-panel">
          <h2>Demographic comparison</h2>
          <div class="chart-wrap" id="barChart"></div>
        </section>
        <section class="content-panel">
          <h2>Geographic signal</h2>
          <p class="fine-print" id="atlasContext">This prototype uses sample values until validated public-health exports are loaded.</p>
          <div class="map-grid" id="mapGrid"></div>
        </section>
      </div>
      <section class="content-panel">
        <h2>Trend line</h2>
        <svg class="trend-chart" id="trendChart" viewBox="0 0 800 260" role="img" aria-label="Five year trend chart"></svg>
      </section>
    </section>
  `;

  const controls = document.querySelector("#atlasControls");
  controls.addEventListener("submit", (event) => {
    event.preventDefault();
    updateAtlas();
  });
  document.querySelectorAll(".choice-input").forEach((input) => input.addEventListener("change", updateAtlas));
  updateAtlas();
}

function updateAtlas() {
  const disease = document.querySelector("#atlasDisease").value;
  const measure = document.querySelector("#atlasMeasure").value;
  const diseaseValues = getDiseaseValues(disease, measure, atlasRows.length);
  const rows = atlasRows.map((row, index) => ({
    ...row,
    activeValue: getMeasureValue(row, measure, diseaseValues[index], index),
  }));
  const max = Math.max(...rows.map((row) => row.activeValue), 1.35);
  const highest = rows.reduce((best, row) => (row.activeValue > best.activeValue ? row : best), rows[0]);
  const geos = getCheckedValues("atlasGeo");
  const lenses = getCheckedValues("atlasLens");
  const sources = getCheckedValues("atlasSources");

  document.querySelector("#highestMetric").textContent = `${highest.activeValue.toFixed(2)}x`;
  document.querySelector("#gapMetric").textContent = `${Math.round((1 - Math.min(...rows.map((row) => row.diagnosis))) * 100)}%`;
  document.querySelector("#priorityMetric").textContent = highest.group;
  document.querySelector("#atlasContext").textContent =
    `Showing ${labelFor(diseaseOptions, disease)} / ${labelFor(measureOptions, measure)} for ${selectedLabel(geos)} with ${selectedLabel(lenses)}. Source layers: ${selectedLabel(sources)}.`;

  document.querySelector("#barChart").innerHTML = rows
    .map(
      (row) => `
      <div class="bar-row">
        <span class="bar-label">${row.group}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${Math.round((row.activeValue / max) * 100)}%"></span></span>
        <span class="bar-value">${row.activeValue.toFixed(2)}x</span>
      </div>
    `,
    )
    .join("");

  document.querySelector("#mapGrid").innerHTML = ["WA", "CA", "TX", "IL", "MI", "NY", "PA", "MD", "DC", "NC", "GA", "FL", "LA", "PR", "VI", "GU"]
    .map((code, index) => {
      const value = 42 + ((index * 11 + disease.length + measure.length + lenses.length * 3) % 48);
      return `<span class="map-cell" title="${code} priority score ${value}" style="background:${heatColor(value)}">${code}</span>`;
    })
    .join("");

  renderTrend(rows);
}

function renderTrend(rows) {
  const svg = document.querySelector("#trendChart");
  const points = [2019, 2020, 2021, 2022, 2023, 2024].map((year, index) => {
    const mean = rows.reduce((sum, row) => sum + row.activeValue, 0) / rows.length;
    return { year, value: mean + (index - 2.4) * 0.025 + Math.sin(index) * 0.025 };
  });
  const x = (index) => 54 + index * 138;
  const y = (value) => 220 - (value - 0.75) * 210;
  const path = points.map((point, index) => `${index ? "L" : "M"} ${x(index)} ${y(point.value)}`).join(" ");
  svg.innerHTML = `
    <path d="M54 220 H744 M54 40 V220" fill="none" stroke="#b9c8c6" stroke-width="1" />
    <path d="${path}" fill="none" stroke="#1d6f6b" stroke-width="4" stroke-linecap="round" />
    ${points
      .map(
        (point, index) => `
          <circle cx="${x(index)}" cy="${y(point.value)}" r="5" fill="#134d4a"></circle>
          <text x="${x(index)}" y="244" text-anchor="middle" fill="#5c6b70" font-size="13">${point.year}</text>
          <text x="${x(index)}" y="${y(point.value) - 12}" text-anchor="middle" fill="#273b43" font-size="13">${point.value.toFixed(2)}x</text>
        `,
      )
      .join("")}
  `;
}

function renderCheckboxGroup(name, options, defaults = []) {
  return `
    <div class="checkbox-grid">
      ${options
        .map(
          (option) => `
            <label class="choice-chip">
              <input class="choice-input" type="checkbox" name="${name}" value="${escapeAttr(option)}" ${defaults.includes(option) ? "checked" : ""} />
              <span>${option}</span>
            </label>
          `,
        )
        .join("")}
    </div>
  `;
}

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function selectedLabel(values) {
  if (!values.length) return "all groups";
  if (values.length <= 2) return values.join(" and ");
  return `${values.slice(0, 2).join(", ")} + ${values.length - 2} more`;
}

function labelFor(options, value) {
  return options.find(([optionValue]) => optionValue === value)?.[1] || value;
}

function getDiseaseValues(disease, measure, length) {
  const base = diseaseData[disease] || [];
  return Array.from({ length }, (_, index) => {
    if (typeof base[index] === "number") return base[index];
    const seed = [...`${disease}-${measure}-${index}`].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return Number((0.82 + (seed % 58) / 100).toFixed(2));
  });
}

function getMeasureValue(row, measure, diseaseValue, index) {
  if (measure === "incidence") return diseaseValue;
  if (measure === "prevalence") return Number((diseaseValue + 0.04).toFixed(2));
  if (measure === "diagnosis") return row.diagnosis;
  if (measure === "outcome") return row.outcome;
  const seed = [...`${row.group}-${measure}-${index}`].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const accessMeasures = ["screening", "specialist", "trial-access", "treatment", "language", "digital", "trust"];
  const barrierMeasures = ["mortality", "caregiver", "cost", "transport"];
  if (accessMeasures.includes(measure)) return Number((0.58 + (seed % 39) / 100).toFixed(2));
  if (barrierMeasures.includes(measure)) return Number((0.96 + (seed % 45) / 100).toFixed(2));
  return diseaseValue;
}

function renderResearch() {
  const pending = sessionStorage.getItem("nba_pending_query") || "";
  sessionStorage.removeItem("nba_pending_query");
  app.innerHTML = `
    <section class="module-page" aria-labelledby="researchTitle">
      ${pageHead(
        "Research Hub",
        "Search for brain health papers with PubMed, then use Sci-Bot when you want an article-focused research assistant.",
        "researchTitle",
      )}
      <form class="toolbar dual-actions" id="pubmedForm">
        <label>Search words
          <input id="pubmedQuery" value="${escapeHtml(pending || "Alzheimer disease health disparities")}" />
        </label>
        <label>Publication window
          <select id="pubmedWindow">
            <option value="5">Last 5 years</option>
            <option value="10">Last 10 years</option>
            <option value="20">Last 20 years</option>
            <option value="">Any year</option>
          </select>
        </label>
        <label>Result count
          <select id="pubmedCount">
            <option>8</option>
            <option>12</option>
            <option>20</option>
          </select>
        </label>
        <label>Focus term
          <select id="pubmedFocus">
            <option value="health disparities">Health disparities</option>
            <option value="African American">African American</option>
            <option value="rural health">Rural health</option>
            <option value="caregiver">Caregiver</option>
          </select>
        </label>
        <button class="primary-button" type="submit">Search PubMed</button>
        <button class="secondary-button" id="searchSciBot" type="button">Search Sci-Bot</button>
      </form>
      <div class="two-col">
        <section class="content-panel">
          <div class="dialog-head">
            <div>
              <h2>Results</h2>
              <p class="fine-print">PubMed results appear here. Sci-Bot opens in a new tab because it does not provide a public API.</p>
            </div>
            <button class="secondary-button" id="saveResearchSearch" type="button">Save search</button>
          </div>
          <div class="results-list" id="pubmedResults"></div>
        </section>
        <aside class="content-panel">
          <h2>Saved searches</h2>
          <div class="results-list" id="savedSearches"></div>
        </aside>
      </div>
    </section>
  `;

  document.querySelector("#pubmedForm").addEventListener("submit", (event) => {
    event.preventDefault();
    runPubMedSearch();
  });
  document.querySelector("#saveResearchSearch").addEventListener("click", () => {
    const query = document.querySelector("#pubmedQuery").value.trim();
    if (query) saveSearch("PubMed", query);
  });
  document.querySelector("#searchSciBot").addEventListener("click", () => {
    const query = document.querySelector("#pubmedQuery").value.trim() || "brain health equity";
    saveSearch("Sci-Bot", query);
    window.open(sciBotUrl(query), "_blank", "noreferrer");
  });
  document.querySelector("#pubmedResults").addEventListener("click", (event) => {
    const button = event.target.closest("[data-translate]");
    if (!button) return;
    sessionStorage.setItem("nba_translate_seed", button.dataset.translate);
    location.hash = "translator";
  });
  renderSavedSearches();
  runPubMedSearch();
}

async function runPubMedSearch() {
  const container = document.querySelector("#pubmedResults");
  const query = document.querySelector("#pubmedQuery").value.trim();
  const focus = document.querySelector("#pubmedFocus").value;
  const years = document.querySelector("#pubmedWindow").value;
  const count = document.querySelector("#pubmedCount").value;
  const term = [query, focus].filter(Boolean).join(" ");
  if (!term) return;

  container.innerHTML = `<p class="loading">Searching PubMed...</p>`;
  try {
    const currentYear = new Date().getFullYear();
    const dates = years ? `&mindate=${currentYear - Number(years)}&maxdate=${currentYear}&datetype=pdat` : "";
    const esearch = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=${count}${dates}&term=${encodeURIComponent(term)}`;
    const searchResponse = await fetch(esearch);
    if (!searchResponse.ok) throw new Error("PubMed search failed");
    const searchData = await searchResponse.json();
    const ids = searchData.esearchresult?.idlist || [];
    if (!ids.length) {
      container.innerHTML = `<div class="empty-state">No PubMed records matched this search.</div>`;
      return;
    }
    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`;
    const summaryResponse = await fetch(summaryUrl);
    if (!summaryResponse.ok) throw new Error("PubMed summary failed");
    const summaryData = await summaryResponse.json();
    state.lastPubMed = ids.map((id) => summaryData.result[id]).filter(Boolean);
    renderPubMedResults(state.lastPubMed);
  } catch (error) {
    state.lastPubMed = fallbackPapers(term);
    container.innerHTML = `<p class="notice error">Live PubMed fetch was unavailable in this browser session, so prototype examples are shown.</p>`;
    container.insertAdjacentHTML("beforeend", pubMedMarkup(state.lastPubMed));
  }
}

function renderPubMedResults(records) {
  const container = document.querySelector("#pubmedResults");
  container.innerHTML = pubMedMarkup(records);
}

function pubMedMarkup(records) {
  return records
    .map((record) => {
      const title = record.title || "Untitled PubMed record";
      const authors = record.authors?.slice(0, 3).map((author) => author.name).join(", ") || "Author details unavailable";
      const journal = record.fulljournalname || record.source || "Journal unavailable";
      const year = record.pubdate || "Date unavailable";
      const uid = record.uid || record.id || "";
      const sciQuery = `${title} ${journal}`;
      return `
        <article class="result-card">
          <h3>${title}</h3>
          <div class="result-meta">
            <span>${authors}</span>
            <span>${journal}</span>
            <span>${year}</span>
          </div>
          <div class="actions">
            <a class="secondary-button" href="https://pubmed.ncbi.nlm.nih.gov/${uid}/" target="_blank" rel="noreferrer">Open PubMed</a>
            <a class="secondary-button" href="${sciBotUrl(sciQuery)}" target="_blank" rel="noreferrer">Search Sci-Bot</a>
            <button class="quiet-button" type="button" data-translate="${escapeAttr(title)}">Use in Translator</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTranslator() {
  const seedText = sessionStorage.getItem("nba_translate_seed") || "";
  sessionStorage.removeItem("nba_translate_seed");
  app.innerHTML = `
    <section class="module-page" aria-labelledby="translatorTitle">
      ${pageHead(
        "AI Translator",
        "Paste an abstract and get versions for patients, community advocates, scientists, and policy readers.",
        "translatorTitle",
      )}
      <div class="two-col">
        <form class="content-panel stack-form" id="translatorForm">
          <label>Abstract or research summary
            <textarea id="abstractInput" placeholder="Paste an abstract about brain health, care gaps, biomarkers, caregiving, or a clinical trial.">${escapeHtml(seedText)}</textarea>
          </label>
          <label>Primary audience
            <select id="audienceSelect">
            <option>Patients and families</option>
              <option>Community advocates</option>
              <option>Peer scientists</option>
              <option>Policy staff</option>
            </select>
          </label>
          <button class="primary-button" type="submit">Generate translations</button>
          <p class="fine-print">
            Prototype mode uses a local sample translator. Add a secure Claude endpoint before collecting real health text.
          </p>
        </form>
        <aside class="content-panel">
          <h2>Suggested prompt contract</h2>
          <table class="data-table">
            <tr><th>Input</th><td>Abstract text, reading level, community context, output type.</td></tr>
            <tr><th>Guardrail</th><td>No diagnosis, no treatment instruction, cite uncertainty plainly.</td></tr>
            <tr><th>Output</th><td>Patient summary, advocate brief, peer synthesis, policy or social post.</td></tr>
          </table>
        </aside>
      </div>
      <section class="translation-grid" id="translationOutput"></section>
    </section>
  `;

  document.querySelector("#translatorForm").addEventListener("submit", (event) => {
    event.preventDefault();
    translateAbstract();
  });
}

function translateAbstract() {
  const text = document.querySelector("#abstractInput").value.trim();
  const output = document.querySelector("#translationOutput");
  if (!text) {
    output.innerHTML = `<p class="notice error">Paste an abstract first.</p>`;
    return;
  }

  const keywords = extractKeywords(text);
  const plain = summarize(text, 32);
  output.innerHTML = `
    <article class="translation-card">
      <h3>Patient-accessible <span class="pill">plain language</span></h3>
      <p>${plain} The main takeaway is that research findings should be discussed with a clinician or trusted care team before making health decisions.</p>
    </article>
    <article class="translation-card">
      <h3>Community advocate <span class="pill">action brief</span></h3>
      <p>This study can support community conversations about ${keywords.slice(0, 3).join(", ")}. Useful advocacy questions include who was recruited, who was missing, and whether results are accessible to underrepresented families.</p>
    </article>
    <article class="translation-card">
      <h3>Peer-level synthesis <span class="pill">scientific</span></h3>
      <p>The abstract appears to center ${keywords.slice(0, 5).join(", ")}. A peer review should evaluate cohort composition, endpoint validity, model assumptions, and whether disparity measures are powered for subgroup inference.</p>
    </article>
    <article class="translation-card">
      <h3>Policy or social thread <span class="pill">public-facing</span></h3>
      <ol>
        <li>Neuroscience findings matter most when communities can understand and use them.</li>
        <li>This paper raises questions about access, representation, and translation.</li>
        <li>Equity-centered research should report who benefits, who is missing, and what changes next.</li>
      </ol>
    </article>
  `;
}

function renderTrials() {
  app.innerHTML = `
    <section class="module-page" aria-labelledby="trialsTitle">
      ${pageHead(
        "Trial Finder",
        "Find active studies and quickly check whether participation looks realistic for families and care teams.",
        "trialsTitle",
      )}
      <form class="toolbar" id="trialsForm">
        <label>Condition
          <input id="trialCondition" value="Alzheimer disease" />
        </label>
        <label>Location
          <input id="trialLocation" placeholder="Maryland, Washington DC, United States" />
        </label>
        <label>Status
          <select id="trialStatus">
            <option value="RECRUITING">Recruiting</option>
            <option value="NOT_YET_RECRUITING">Not yet recruiting</option>
            <option value="">Any active status</option>
          </select>
        </label>
        <button class="primary-button" type="submit">Find trials</button>
      </form>
      <section class="filter-panel compact" aria-label="Trial community filters">
        <div>
          <div class="filter-head">
            <h2>Community lens</h2>
            <span class="fine-print">Use these to frame your review and saved search</span>
          </div>
          ${renderCheckboxGroup("trialLens", communityLensOptions, ["Black / African American", "Caregivers", "Low-income communities"])}
        </div>
      </section>
      <div class="two-col">
        <section class="content-panel">
          <div class="dialog-head">
            <div>
              <h2>Clinical trials</h2>
              <p class="fine-print" id="trialLensContext">Live results from ClinicalTrials.gov v2 when available.</p>
            </div>
            <button class="secondary-button" id="saveTrialSearch" type="button">Save search</button>
          </div>
          <div class="results-list" id="trialResults"></div>
        </section>
        <aside class="content-panel">
          <h2>Equity review checklist</h2>
          <table class="data-table">
            <tr><th>Representation</th><td>Does eligibility exclude common comorbidities or non-English speakers?</td></tr>
            <tr><th>Access</th><td>Are visits remote, compensated, near transit, or caregiver-aware?</td></tr>
            <tr><th>Trust</th><td>Is the study transparent about data use, return of results, and community partners?</td></tr>
          </table>
        </aside>
      </div>
    </section>
  `;

  document.querySelector("#trialsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    runTrialSearch();
  });
  document.querySelector("#saveTrialSearch").addEventListener("click", () => {
    const query = document.querySelector("#trialCondition").value.trim();
    if (query) saveSearch("ClinicalTrials.gov", query);
  });
  document.querySelector("#trialResults").addEventListener("click", (event) => {
    const button = event.target.closest("[data-resource]");
    if (!button) return;
    const resource = JSON.parse(button.dataset.resource);
    state.resources.unshift(resource);
    save("nba_resources", state.resources);
    button.textContent = "Added";
    button.disabled = true;
  });
  document.querySelectorAll('input[name="trialLens"]').forEach((input) => input.addEventListener("change", runTrialSearch));
  runTrialSearch();
}

async function runTrialSearch() {
  const container = document.querySelector("#trialResults");
  const condition = document.querySelector("#trialCondition").value.trim();
  const location = document.querySelector("#trialLocation").value.trim();
  const status = document.querySelector("#trialStatus").value;
  const lenses = getCheckedValues("trialLens");
  if (!condition) return;

  container.innerHTML = `<p class="loading">Searching ClinicalTrials.gov...</p>`;
  try {
    const params = new URLSearchParams({
      "query.cond": condition,
      pageSize: "8",
      format: "json",
    });
    if (location) params.set("query.locn", location);
    if (status) params.set("filter.overallStatus", status);
    const response = await fetch(`https://clinicaltrials.gov/api/v2/studies?${params.toString()}`);
    if (!response.ok) throw new Error("ClinicalTrials.gov search failed");
    const data = await response.json();
    state.lastTrials = data.studies || [];
    document.querySelector("#trialLensContext").textContent =
      `Live ClinicalTrials.gov results. Review lens: ${selectedLabel(lenses)}. These lenses are not used as hard API filters because trials rarely tag identity access well.`;
    renderTrialResults(state.lastTrials);
  } catch (error) {
    state.lastTrials = fallbackTrials(condition);
    container.innerHTML = `<p class="notice error">Live ClinicalTrials.gov fetch was unavailable in this browser session, so prototype examples are shown.</p>`;
    container.insertAdjacentHTML("beforeend", trialMarkup(state.lastTrials));
  }
}

function renderTrialResults(studies) {
  const container = document.querySelector("#trialResults");
  if (!studies.length) {
    container.innerHTML = `<div class="empty-state">No matching studies found.</div>`;
    return;
  }
  container.innerHTML = trialMarkup(studies);
}

function trialMarkup(studies) {
  return studies
    .map((study) => {
      const protocol = study.protocolSection || {};
      const id = protocol.identificationModule?.nctId || study.nctId || "NCT unavailable";
      const title = protocol.identificationModule?.briefTitle || study.title || "Untitled trial";
      const status = protocol.statusModule?.overallStatus || study.status || "Status unavailable";
      const summary = protocol.descriptionModule?.briefSummary || study.summary || "Summary unavailable.";
      const locations = protocol.contactsLocationsModule?.locations || [];
      const firstLocation = locations[0]
        ? [locations[0].city, locations[0].state, locations[0].country].filter(Boolean).join(", ")
        : "Location not listed";
      return `
        <article class="result-card">
          <h3>${title}</h3>
          <div class="result-meta">
            <span class="pill">${status.replaceAll("_", " ")}</span>
            <span>${id}</span>
            <span>${firstLocation}</span>
          </div>
          <p>${summarize(summary, 36)}</p>
          <div class="actions">
            <a class="secondary-button" href="https://clinicaltrials.gov/study/${id}" target="_blank" rel="noreferrer">Open study</a>
            <button class="quiet-button" type="button" data-resource="${escapeAttr(
              JSON.stringify({
                name: title,
                type: "Trial",
                communities: "Trial candidates, caregivers, community advocates",
                description: summarize(summary, 24),
                url: `https://clinicaltrials.gov/study/${id}`,
              }),
            )}">Add to resources</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPortfolio() {
  app.innerHTML = `
    <section class="module-page" aria-labelledby="portfolioTitle">
      ${pageHead(
        "Portfolio",
        "A reflective research log that connects methods, broader impacts, community needs, and public code.",
        "portfolioTitle",
      )}
      <div class="portfolio-grid">
        <section class="content-panel">
          <h2>Reflection compass</h2>
          <p class="fine-print">A structured space for turning research notes into motivation, project language, and broader-impact ideas.</p>
          <table class="data-table">
            <tr><th>Observe</th><td>What did I notice in science, care, or community?</td></tr>
            <tr><th>Bridge</th><td>How does my lived experience shape the question I am asking?</td></tr>
            <tr><th>Build</th><td>What is one small action, resource, or sentence I want to keep?</td></tr>
          </table>
          <div class="identity-wheel" aria-label="Identity wheel visualization"></div>
        </section>
        <section class="content-panel">
          <h2>Research note</h2>
          <form class="stack-form" id="journalForm">
            <div class="form-row">
              <label>Date
                <input id="journalDate" type="date" value="${new Date().toISOString().slice(0, 10)}" />
              </label>
              <label>Mood / energy
                <select id="journalMood">
                  <option>Grounded</option>
                  <option>Curious</option>
                  <option>Hopeful</option>
                  <option>Frustrated</option>
                  <option>Tired</option>
                  <option>Focused</option>
                  <option>Unsure</option>
                </select>
              </label>
            </div>
            <label>Tags or lens
              <input id="journalLens" placeholder="Access, methods, mentorship, clinical trials, community care..." />
            </label>
            <label>Prompt
              <select id="journalPrompt">
                <option>What did I learn today?</option>
                <option>Where did I notice an access gap?</option>
                <option>Who is missing from this research?</option>
                <option>What part of my story belongs in my science?</option>
                <option>What would make this finding easier for a family to use?</option>
                <option>What sentence could become part of a personal statement?</option>
              </select>
            </label>
            <label>Reflection
              <textarea id="journalText" placeholder="Today I noticed... This connects to the research because... One thing I want to carry forward is..."></textarea>
            </label>
            <button class="primary-button" type="submit">Save research note</button>
          </form>
          <div class="results-list" id="journalEntries"></div>
        </section>
      </div>
      <section class="content-panel">
        <div class="dialog-head">
          <div>
            <h2>GitHub profile</h2>
            <p class="fine-print">Link the public code home for this project, your portfolio repositories, or a future GitHub Pages deployment.</p>
          </div>
        </div>
        <form class="github-form" id="githubForm">
          <input id="githubProfile" placeholder="https://github.com/your-username" value="${escapeAttr(state.githubProfile)}" />
          <button class="primary-button" type="submit">Save GitHub link</button>
          <a class="secondary-button ${state.githubProfile ? "" : "disabled-link"}" id="openGithubProfile" href="${escapeAttr(state.githubProfile || "#")}" target="_blank" rel="noreferrer">Open GitHub</a>
        </form>
        <p class="fine-print" id="githubStatus">${state.githubProfile ? "GitHub profile link saved in this browser." : "Add your GitHub URL when you are ready to connect the project publicly."}</p>
      </section>
      <section class="content-panel">
        <div class="dialog-head">
          <div>
            <h2>Community resource connector</h2>
            <p class="fine-print">Curated starter database for care, advocacy, and STEM pipeline resources. Search and save records locally.</p>
          </div>
          <input id="resourceFilter" placeholder="Filter resources" aria-label="Filter resources" />
        </div>
        <div class="resource-grid" id="resourceGrid"></div>
      </section>
      <section class="content-panel">
        <div class="dialog-head">
          <div>
            <h2>Exports and uploads</h2>
            <p class="fine-print">Download your local prototype data or upload a CommonAxon backup JSON file.</p>
          </div>
        </div>
        <div class="export-grid">
          <button class="secondary-button" id="exportAllData" type="button">Export all JSON</button>
          <button class="secondary-button" id="exportNotesCsv" type="button">Export notes CSV</button>
          <button class="secondary-button" id="exportResourcesCsv" type="button">Export resources CSV</button>
          <label class="upload-button">
            Upload backup JSON
            <input id="importBackup" type="file" accept="application/json,.json" />
          </label>
        </div>
        <p class="fine-print" id="exportStatus">Exports include saved searches, research notes, resources, GitHub profile link, and prototype account metadata stored in this browser.</p>
      </section>
    </section>
  `;

  document.querySelector("#journalForm").addEventListener("submit", saveJournalEntry);
  document.querySelector("#githubForm").addEventListener("submit", saveGithubProfile);
  document.querySelector("#resourceFilter").addEventListener("input", renderResources);
  document.querySelector("#exportAllData").addEventListener("click", exportAllData);
  document.querySelector("#exportNotesCsv").addEventListener("click", () => exportCsv("commonaxon-research-notes.csv", state.journalEntries));
  document.querySelector("#exportResourcesCsv").addEventListener("click", () => exportCsv("commonaxon-resources.csv", state.resources));
  document.querySelector("#importBackup").addEventListener("change", importBackup);
  renderJournalEntries();
  renderResources();
}

function saveJournalEntry(event) {
  event.preventDefault();
  const lens = document.querySelector("#journalLens").value.trim();
  const text = document.querySelector("#journalText").value.trim();
  const prompt = document.querySelector("#journalPrompt").value;
  const mood = document.querySelector("#journalMood").value;
  const entryDate = document.querySelector("#journalDate").value;
  if (!text) return;
  state.journalEntries.unshift({
    id: crypto.randomUUID(),
    lens: lens || "General reflection",
    prompt,
    mood,
    text,
    entryDate,
    createdAt: new Date().toISOString(),
  });
  save("nba_journal_entries", state.journalEntries);
  document.querySelector("#journalForm").reset();
  renderJournalEntries();
}

function renderJournalEntries() {
  const container = document.querySelector("#journalEntries");
  if (!container) return;
  if (!state.journalEntries.length) {
    container.innerHTML = `<div class="empty-state">Saved reflections will appear here.</div>`;
    return;
  }
  container.innerHTML = state.journalEntries
    .map(
      (entry) => `
        <article class="journal-entry">
          <time>${entry.entryDate || new Date(entry.createdAt).toLocaleDateString()}</time>
          <span class="pill">${escapeHtml(entry.mood || "Reflection")}</span>
          <h3>${escapeHtml(entry.lens)}</h3>
          ${entry.prompt ? `<p class="fine-print">${escapeHtml(entry.prompt)}</p>` : ""}
          <p>${escapeHtml(entry.text)}</p>
        </article>
      `,
    )
    .join("");
}

function saveGithubProfile(event) {
  event.preventDefault();
  const input = document.querySelector("#githubProfile");
  const status = document.querySelector("#githubStatus");
  const link = document.querySelector("#openGithubProfile");
  const value = input.value.trim();
  if (value && !/^https:\/\/github\.com\/[A-Za-z0-9-]+\/?$/.test(value)) {
    status.textContent = "Please enter a profile URL like https://github.com/your-username.";
    return;
  }
  state.githubProfile = value;
  save("nba_github_profile", state.githubProfile);
  link.href = value || "#";
  link.classList.toggle("disabled-link", !value);
  status.textContent = value ? "GitHub profile link saved in this browser." : "GitHub profile link cleared.";
}

function renderResources() {
  const filter = (document.querySelector("#resourceFilter")?.value || "").toLowerCase();
  const resources = state.resources.filter((resource) =>
    [resource.name, resource.type, resource.communities, resource.description].join(" ").toLowerCase().includes(filter),
  );
  document.querySelector("#resourceGrid").innerHTML = resources
    .map(
      (resource) => `
        <article class="resource-card">
          <span class="pill">${resource.type}</span>
          <h3>${resource.name}</h3>
          <p>${resource.description}</p>
          <p class="fine-print">${resource.communities}</p>
          <a class="secondary-button" href="${resource.url}" target="_blank" rel="noreferrer">Open resource</a>
        </article>
      `,
    )
    .join("");
}

function renderSavedSearches() {
  const container = document.querySelector("#savedSearches");
  if (!container) return;
  if (!state.savedSearches.length) {
    container.innerHTML = `<div class="empty-state">Saved searches will appear here.</div>`;
    return;
  }
  container.innerHTML = state.savedSearches
    .map(
      (search) => `
        <article class="result-card">
          <span class="pill">${search.source}</span>
          <h3>${escapeHtml(search.query)}</h3>
          <p class="fine-print">${new Date(search.createdAt).toLocaleString()}</p>
        </article>
      `,
    )
    .join("");
}

function saveSearch(source, query) {
  state.savedSearches.unshift({
    id: crypto.randomUUID(),
    source,
    query,
    createdAt: new Date().toISOString(),
  });
  state.savedSearches = state.savedSearches.slice(0, 20);
  save("nba_saved_searches", state.savedSearches);
  renderSavedSearches();
}

function openAuth() {
  if (state.user) {
    state.user = null;
    save("nba_user", null);
    renderAccount();
    return;
  }
  authName.value = "";
  authEmail.value = "";
  authDialog.showModal();
}

function saveAuth(event) {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const email = authEmail.value.trim();
  if (!email) return;
  state.user = {
    name: authName.value.trim() || email.split("@")[0],
    email,
    createdAt: new Date().toISOString(),
  };
  save("nba_user", state.user);
  authDialog.close();
  renderAccount();
}

function renderAccount() {
  accountLabel.textContent = state.user ? state.user.name : "Guest mode";
  authButton.textContent = state.user ? "Sign out" : "Sign in";
}

function pageHead(title, text, id) {
  return `
    <header class="page-head">
      <p class="eyebrow">CommonAxon</p>
      <h1 id="${id}">${title}</h1>
      <p>${text}</p>
    </header>
  `;
}

function sciBotUrl(query) {
  return `https://sci-bot.ru/?q=${encodeURIComponent(query)}`;
}

function exportAllData() {
  const payload = {
    app: "CommonAxon",
    exportedAt: new Date().toISOString(),
    user: state.user,
    githubProfile: state.githubProfile,
    savedSearches: state.savedSearches,
    journalEntries: state.journalEntries,
    resources: state.resources,
  };
  downloadFile("commonaxon-backup.json", JSON.stringify(payload, null, 2), "application/json");
  setExportStatus("Downloaded CommonAxon backup JSON.");
}

function exportCsv(filename, rows) {
  if (!rows.length) {
    setExportStatus("Nothing to export yet.");
    return;
  }
  const headers = [...rows.reduce((keys, row) => {
    Object.keys(row).forEach((key) => keys.add(key));
    return keys;
  }, new Set())];
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(",")),
  ].join("\n");
  downloadFile(filename, csv, "text/csv");
  setExportStatus(`Downloaded ${filename}.`);
}

async function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    if (Array.isArray(payload.savedSearches)) {
      state.savedSearches = payload.savedSearches;
      save("nba_saved_searches", state.savedSearches);
    }
    if (Array.isArray(payload.journalEntries)) {
      state.journalEntries = payload.journalEntries;
      save("nba_journal_entries", state.journalEntries);
    }
    if (Array.isArray(payload.resources)) {
      state.resources = payload.resources;
      save("nba_resources", state.resources);
    }
    if (payload.user) {
      state.user = payload.user;
      save("nba_user", state.user);
      renderAccount();
    }
    if (typeof payload.githubProfile === "string") {
      state.githubProfile = payload.githubProfile;
      save("nba_github_profile", state.githubProfile);
    }
    renderJournalEntries();
    renderResources();
    setExportStatus("Uploaded backup JSON and refreshed local data.");
  } catch (error) {
    setExportStatus("Could not read that backup file. Please upload a CommonAxon JSON export.");
  } finally {
    event.target.value = "";
  }
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function csvCell(value) {
  if (value === undefined || value === null) return "";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function setExportStatus(message) {
  const status = document.querySelector("#exportStatus");
  if (status) status.textContent = message;
}

function mergeSeedResources(resources) {
  const existing = Array.isArray(resources) ? resources : [];
  const byName = new Map(existing.map((resource) => [resource.name, resource]));
  seedResources().forEach((resource) => {
    if (!byName.has(resource.name)) byName.set(resource.name, resource);
  });
  return [...byName.values()];
}

function seedResources() {
  return [
    {
      name: "ClinicalTrials.gov",
      type: "Trials",
      communities: "Patients, caregivers, underrepresented trial participants",
      description: "Official registry for clinical studies with recruiting status, eligibility, and site locations.",
      url: "https://clinicaltrials.gov/",
    },
    {
      name: "National Institute of Neurological Disorders and Stroke",
      type: "Research",
      communities: "Neuroscience trainees, patients, families",
      description: "Federal source for neurological disorder research updates, funding priorities, and patient education.",
      url: "https://www.ninds.nih.gov/",
    },
    {
      name: "Black In Neuro",
      type: "STEM network",
      communities: "Black neuroscience students and researchers",
      description: "Community network centering Black scholars in neuroscience and related fields.",
      url: "https://www.blackinneuro.com/",
    },
    {
      name: "Alzheimer's Association",
      type: "Care",
      communities: "Families, caregivers, community educators",
      description: "Care resources, support groups, education, and research updates for dementia communities.",
      url: "https://www.alz.org/",
    },
    {
      name: "Parkinson's Foundation",
      type: "Care",
      communities: "Patients, caregivers, clinicians",
      description: "Education, helpline access, community programs, and research participation information.",
      url: "https://www.parkinson.org/",
    },
    {
      name: "National Society of Black Engineers",
      type: "Pipeline",
      communities: "Black engineers, STEM students, early-career technologists",
      description: "Professional and student network supporting Black engineers across education and industry.",
      url: "https://www.nsbe.org/",
    },
    {
      name: "NIH Research Training and Career Development",
      type: "Research training",
      communities: "Students, early-career researchers, trainees, mentors",
      description: "Federal starting point for research training, career development, and funding pathways.",
      url: "https://researchtraining.nih.gov/",
    },
    {
      name: "SAGE Advocacy and Services for LGBTQ+ Elders",
      type: "Care",
      communities: "LGBTQ+ older adults, caregivers, families",
      description: "Support and advocacy for LGBTQ+ elders, including aging, caregiving, and access resources.",
      url: "https://www.sageusa.org/",
    },
    {
      name: "National Center for Transgender Equality",
      type: "Advocacy",
      communities: "Transgender people, non-binary people, policy advocates",
      description: "Policy and advocacy resources for transgender equity, healthcare access, and civil rights.",
      url: "https://transequality.org/",
    },
    {
      name: "Disability Rights Education and Defense Fund",
      type: "Disability rights",
      communities: "Disabled people, caregivers, accessibility advocates",
      description: "Legal and advocacy resources focused on disability rights, access, education, and healthcare equity.",
      url: "https://dredf.org/",
    },
    {
      name: "National Health Law Program",
      type: "Health access",
      communities: "Low-income communities, Medicaid users, uninsured and underinsured people",
      description: "Legal and policy resources for health access, Medicaid, reproductive health, disability, and equity.",
      url: "https://healthlaw.org/",
    },
    {
      name: "National Alliance for Caregiving",
      type: "Caregiving",
      communities: "Caregivers, families, aging communities",
      description: "Research and resources focused on caregiver needs, policy, and support systems.",
      url: "https://www.caregiving.org/",
    },
    {
      name: "The Michael J. Fox Foundation Trial Finder",
      type: "Trials",
      communities: "Parkinson disease patients, caregivers, trial participants",
      description: "Study-matching resource for Parkinson disease research participation.",
      url: "https://www.michaeljfox.org/trial-finder",
    },
    {
      name: "ALS Association",
      type: "Care",
      communities: "ALS patients, caregivers, clinicians, advocates",
      description: "Care services, research updates, advocacy, and support for people affected by ALS.",
      url: "https://www.als.org/",
    },
    {
      name: "Multiple Sclerosis Association of America",
      type: "Care",
      communities: "MS patients, caregivers, clinicians",
      description: "Programs, education, MRI access support, and wellness resources for people living with MS.",
      url: "https://mymsaa.org/",
    },
    {
      name: "Huntington's Disease Society of America",
      type: "Care",
      communities: "Huntington disease families, caregivers, genetic-risk communities",
      description: "Support, education, advocacy, and research information for Huntington disease communities.",
      url: "https://hdsa.org/",
    },
    {
      name: "Epilepsy Foundation",
      type: "Care",
      communities: "People with epilepsy, caregivers, schools, employers",
      description: "Education, seizure first aid, advocacy, and support resources for epilepsy communities.",
      url: "https://www.epilepsy.com/",
    },
    {
      name: "Migrant Clinicians Network",
      type: "Language access",
      communities: "Immigrant communities, migrant workers, non-English speakers",
      description: "Clinical and public-health resources for migrant and immigrant health access.",
      url: "https://www.migrantclinician.org/",
    },
    {
      name: "Interfaith America",
      type: "Community",
      communities: "Faith-based communities, religious minority communities, civic partners",
      description: "Resources and networks for interfaith cooperation, pluralism, and community-centered civic work.",
      url: "https://www.interfaithamerica.org/",
    },
    {
      name: "African Communities Together",
      type: "Community",
      communities: "African immigrant communities, diaspora families, community advocates",
      description: "Community organization focused on African immigrant civic power, rights, and services.",
      url: "https://africans.us/",
    },
  ];
}

function fallbackPapers(term) {
  return [
    {
      uid: "39300001",
      title: `Health equity considerations in ${term}`,
      authors: [{ name: "Prototype Author" }, { name: "Community Coauthor" }],
      fulljournalname: "Neuroinformatics and Equity",
      pubdate: "2024",
    },
    {
      uid: "39300002",
      title: "Representation, diagnosis delay, and care access in brain health cohorts",
      authors: [{ name: "Atlas Working Group" }],
      fulljournalname: "Journal of Translational Neuroscience",
      pubdate: "2023",
    },
  ];
}

function fallbackTrials(condition) {
  return [
    {
      nctId: "NCT00000001",
      title: `Community-centered ${condition} observational study`,
      status: "RECRUITING",
      summary: "Prototype study record focused on inclusive recruitment, caregiver-aware visits, and transparent data sharing.",
    },
    {
      nctId: "NCT00000002",
      title: `${condition} biomarker study with remote participation options`,
      status: "NOT_YET_RECRUITING",
      summary: "Prototype study record showing how access details can be surfaced for participants and advocates.",
    },
  ];
}

function extractKeywords(text) {
  const stop = new Set("about across after also among and are because been between from into that their these this through using with within without".split(" "));
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 4 && !stop.has(word));
  return [...new Set(words)].slice(0, 8).concat(["equity", "access"]).slice(0, 8);
}

function summarize(text, limit) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  return escapeHtml(words.slice(0, limit).join(" ") + (words.length > limit ? "..." : ""));
}

function heatColor(value) {
  if (value > 76) return "#134d4a";
  if (value > 62) return "#1d6f6b";
  if (value > 50) return "#315c82";
  return "#748286";
}

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  if (value === null) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}
