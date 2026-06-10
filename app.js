// Logika flashcards. Data se načítají z data/cards-*.js do globálního window.FC
// (FC.topics = metadata témat, FC.cards = pole karet). Tento soubor se připojuje
// jako poslední, takže už má všechny karty k dispozici.

const FC = window.FC || { topics: {}, cards: [] };
const CARDS = FC.cards;

// Mapa témat: { os: {label, cls}, ... } – pro vykreslení štítků
const TOPICS = FC.topics;

// Pořadí témat podle pole "order" v datových souborech
const TOPIC_ORDER = Object.keys(TOPICS).sort((a, b) => TOPICS[a].order - TOPICS[b].order);

// Témata s order <= 11 patří do teoretické části (TZI), zbytek do praktické (PVIS)
const THEORY_MAX_ORDER = 11;

let deck = [], idx = 0, flipped = false;
let filter = "all";
const KEY = "pva_flashcards_progress_v1";
let progress = JSON.parse(localStorage.getItem(KEY) || "{}");

function buildFilters() {
  const el = document.getElementById("filters");
  el.innerHTML = "";

  const addChip = (id, label) => {
    const c = document.createElement("div");
    c.className = "chip" + (filter === id ? " active" : "");
    c.textContent = label;
    c.onclick = () => { filter = id; buildDeck(); buildFilters(); };
    el.appendChild(c);
  };
  const addSection = (text) => {
    const s = document.createElement("div");
    s.className = "filter-section";
    s.textContent = text;
    el.appendChild(s);
  };

  // Obecné filtry
  addChip("all", "📚 Vše");
  addChip("again", "🔁 Jen k opakování");

  // Teoretická část
  addSection("Teoretické základy");
  TOPIC_ORDER.filter(id => TOPICS[id].order <= THEORY_MAX_ORDER)
    .forEach(id => addChip(id, TOPICS[id].label));

  // Praktická část
  addSection("Programové a inf. systémy");
  TOPIC_ORDER.filter(id => TOPICS[id].order > THEORY_MAX_ORDER)
    .forEach(id => addChip(id, TOPICS[id].label));
}

function cardId(card) { return CARDS.indexOf(card); }

function buildDeck() {
  if (filter === "all") deck = [...CARDS];
  else if (filter === "again") deck = CARDS.filter(c => progress[cardId(c)] === "again");
  else deck = CARDS.filter(c => c.t === filter);
  if (deck.length === 0) deck = [...CARDS]; // fallback
  idx = 0; flipped = false;
  render();
}

function render() {
  const card = deck[idx];
  document.getElementById("qText").innerHTML = card.q;
  document.getElementById("aText").innerHTML = card.a;
  const top = TOPICS[card.t];
  const tag = '<span class="' + top.cls + '">' + top.label + '</span>';
  document.getElementById("frontTag").innerHTML = tag;
  document.getElementById("backTag").innerHTML = tag;
  document.getElementById("card").classList.remove("flipped");
  flipped = false;
  document.getElementById("counter").textContent = (idx + 1) + " / " + deck.length;
  document.getElementById("deckSize").textContent = deck.length;
  updateStats();
}

function updateStats() {
  const known = Object.values(progress).filter(v => v === "known").length;
  const again = Object.values(progress).filter(v => v === "again").length;
  document.getElementById("knownCount").textContent = known;
  document.getElementById("againCount").textContent = again;
  const done = known + again;
  document.getElementById("progressFill").style.width = (done / CARDS.length * 100) + "%";
}

function flip() {
  flipped = !flipped;
  document.getElementById("card").classList.toggle("flipped", flipped);
}
function next(e) { if (e) e.stopPropagation(); idx = (idx + 1) % deck.length; render(); }
function prev(e) { if (e) e.stopPropagation(); idx = (idx - 1 + deck.length) % deck.length; render(); }

function mark(status, e) {
  if (e) e.stopPropagation();
  progress[cardId(deck[idx])] = status;
  localStorage.setItem(KEY, JSON.stringify(progress));
  updateStats();
  next();
}

function shuffle(e) {
  if (e) e.stopPropagation();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  idx = 0; render();
}

function resetProgress(e) {
  if (e) e.stopPropagation();
  if (confirm("Opravdu vymazat veškerý postup?")) {
    progress = {}; localStorage.removeItem(KEY); updateStats();
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") { e.preventDefault(); flip(); }
  else if (e.code === "ArrowRight") next();
  else if (e.code === "ArrowLeft") prev();
  else if (e.key.toLowerCase() === "k") mark("known");
  else if (e.key.toLowerCase() === "o") mark("again");
  else if (e.key.toLowerCase() === "s") shuffle();
});

buildFilters();
buildDeck();
