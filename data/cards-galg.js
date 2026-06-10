// 5. Grafové algoritmy (IB000, IB002)
// Otázka pro státnice PVA – flashcards k tématu "Grafové algoritmy".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.galg = { label: "🛣️ Grafové algoritmy", cls: "tag-galg", order: 5 };

FC.cards.push(
  { t: "galg",
    q: "Jaký je rozdíl mezi sledem, cestou a jednoduchou cestou?",
    a: "<ul><li><b>Sled (walk)</b> – posloupnost vrcholů a hran, vrcholy i hrany se mohou opakovat</li><li><b>Tah</b> – sled bez opakování hran</li><li><b>Cesta</b> – sled bez opakování <b>vrcholů</b> (tedy i hran)</li></ul>Pojem „jednoduchá cesta\" se používá právě pro cestu bez opakování vrcholů. <b>Kružnice (cyklus)</b> = uzavřená cesta." },

  { t: "galg",
    q: "Co je nejkratší cesta a kdy existuje?",
    a: "<b>Cesta mezi dvěma vrcholy s minimálním součtem vah hran.</b><ul><li>V neohodnoceném grafu = nejmenší počet hran (řeší BFS)</li><li>Existuje, pokud je cíl <b>dosažitelný</b> z počátku</li><li><b>Neexistuje (není dobře definovaná)</b>, pokud na cestě leží <b>záporný cyklus</b> – délku lze snižovat donekonečna</li></ul>" },

  { t: "galg",
    q: "Co je minimální kostra grafu?",
    a: "<b>Kostra = podgraf, který je stromem a obsahuje všechny vrcholy</b> (souvislý, acyklický, n−1 hran).<ul><li><b>Minimální kostra (MST)</b> – kostra s <b>nejmenším součtem vah hran</b></li><li>Definuje se pro souvislý ohodnocený neorientovaný graf</li><li>Hledají ji algoritmy <b>Jarník–Prim</b> a <b>Kruskal</b></li></ul>" },

  { t: "galg",
    q: "Jak funguje Dijkstrův algoritmus a jaká má omezení a složitost?",
    a: "<b>Hledá nejkratší cesty z jednoho zdroje.</b> Hladově vybírá <b>nejbližší dosud nezpracovaný vrchol</b>, relaxuje jeho hrany.<ul><li><b>Omezení: jen nezáporné váhy hran</b> (jinak selže)</li><li>Využívá <b>prioritní frontu (haldu)</b></li><li><b>Složitost O((V+E) log V)</b> s binární haldou (každý vrchol vyjmut jednou, každá hrana jednou relaxována)</li></ul>" },

  { t: "galg",
    q: "Kde a proč Dijkstra selže při záporné hraně?",
    a: "<b>Dijkstra předpokládá, že jednou „uzavřený\" vrchol už má finální vzdálenost</b> (hladová volba). Záporná hrana to může později zlevnit, ale algoritmus se k vrcholu nevrátí.<ul><li>Příklad: A→B = 2, A→C = 5, C→B = −10. Dijkstra uzavře B s hodnotou 2, ale skutečná nejkratší cesta A→C→B = −5</li></ul>Pro záporné hrany se používá Bellman–Ford." },

  { t: "galg",
    q: "Jak funguje Bellman–Fordův algoritmus?",
    a: "<b>Hledá nejkratší cesty z jednoho zdroje i pro záporné hrany.</b><ul><li>Provede <b>(V−1) iterací</b>, v každé <b>relaxuje všechny hrany</b></li><li>Složitost <b>O(V·E)</b> (pomalejší než Dijkstra)</li><li><b>Detekce záporného cyklu</b>: po V−1 iteracích se provede ještě jedna – pokud lze stále relaxovat, existuje <b>záporný cyklus</b></li></ul>" },

  { t: "galg",
    q: "Jaký je rozdíl mezi Dijkstrou a Bellman–Fordem?",
    a: "<table><tr><td></td><td><b>Dijkstra</b></td><td><b>Bellman–Ford</b></td></tr></table><ul><li><b>Záporné hrany</b>: Dijkstra ne, Bellman–Ford ano</li><li><b>Záporný cyklus</b>: jen Bellman–Ford ho odhalí</li><li><b>Složitost</b>: Dijkstra O((V+E)log V) rychlejší, BF O(V·E)</li><li><b>Princip</b>: Dijkstra hladový (prioritní fronta), BF dynamické programování (opakovaná relaxace)</li></ul>" },

  { t: "galg",
    q: "Jak funguje Jarník–Primův algoritmus pro minimální kostru?",
    a: "<b>Roste jeden strom od počátečního vrcholu.</b><ul><li>V každém kroku přidá <b>nejlevnější hranu</b> spojující strom s novým vrcholem</li><li>Používá <b>prioritní frontu</b> (jako Dijkstra)</li><li>Složitost <b>O((V+E) log V)</b></li><li>Vhodný pro <b>husté</b> grafy</li></ul>" },

  { t: "galg",
    q: "Jak funguje Kruskalův algoritmus pro minimální kostru?",
    a: "<b>Bere hrany od nejlevnější a přidává je, pokud nevytvoří cyklus.</b><ul><li>Hrany se <b>seřadí podle váhy</b></li><li>Cykly se testují strukturou <b>Union-Find (disjunktní množiny)</b></li><li>Složitost <b>O(E log E)</b> (dominuje řazení)</li><li>Vhodný pro <b>řídké</b> grafy</li></ul>" },

  { t: "galg",
    q: "Který klasický grafový problém je NP-úplný?",
    a: "<b>Problém obchodního cestujícího (TSP)</b> – najít nejkratší okružní cestu navštěvující všechny vrcholy právě jednou.<ul><li>Související: hledání <b>Hamiltonovské kružnice</b>, <b>barvení grafu</b> k barvami, <b>největší klika</b>, <b>vrcholové pokrytí</b> – všechny NP-úplné</li><li>Naopak nejkratší cesta i minimální kostra jsou v <b>P</b> (řešitelné efektivně)</li></ul>" }
);
