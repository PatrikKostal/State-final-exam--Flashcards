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
    a: "<b>Problém obchodního cestujícího (TSP)</b> – najít nejkratší okružní cestu navštěvující všechny vrcholy právě jednou.<ul><li>Související: hledání <b>Hamiltonovské kružnice</b>, <b>barvení grafu</b> k barvami, <b>největší klika</b>, <b>vrcholové pokrytí</b> – všechny NP-úplné</li><li>Naopak nejkratší cesta i minimální kostra jsou v <b>P</b> (řešitelné efektivně)</li></ul>" },

  { t: "galg",
    q: "Co je ohodnocený (vážený) graf a váha kostry?",
    a: "<b>Vážený graf = graf G s ohodnocením hran w: E → ℝ.</b><ul><li>Každá hrana má <b>váhu</b> (cenu, délku)</li><li><b>Váha kostry/cesty</b> = součet vah jejích hran</li><li>Reprezentace <b>maticí vah</b> W (jako matice sousednosti, ale místo 1 je váha)</li></ul>" },

  { t: "galg",
    q: "Co je Hamiltonovská cesta a jaký má vztah ke kostře?",
    a: "<ul><li><b>Hamiltonovská cesta</b> – jednoduchá cesta procházející <b>všechny vrcholy</b> grafu</li><li>Je to <b>kostra</b> (souvislá, acyklická, n−1 hran), ale obecně <b>NE minimální kostra</b></li><li>Hledání Hamiltonovské cesty/kružnice je <b>NP-úplné</b> (na rozdíl od nejkratší cesty v P)</li></ul>" },

  { t: "galg",
    q: "Jak se definuje délka cesty a kdy je nekonečná či minus nekonečná?",
    a: "<b>Délka cesty = počet hran, u ohodnoceného grafu součet vah.</b><ul><li>Neexistuje-li cesta → délka <b>+∞</b></li><li>Obsahuje-li cesta <b>záporný cyklus</b> → délka <b>−∞</b> (lze ji zkracovat donekonečna)</li></ul>Nejkratší cesta p: pro každou cestu p̄ mezi týmiž vrcholy platí w(p̄) ≥ w(p)." },

  { t: "galg",
    q: "Jaké jsou klíčové vlastnosti nejkratších cest (princip optimality)?",
    a: "<ul><li><b>Každá podcesta nejkratší cesty je opět nejkratší cesta</b> (princip optimality – základ DP)</li><li>Existuje-li nejkratší cesta, existuje i <b>jednoduchá</b> nejkratší cesta (bez opakování vrcholů)</li></ul>To umožňuje relaxaci: postupně zpřesňujeme odhad v.d = nejkratší známá vzdálenost." },

  { t: "galg",
    q: "Co je relaxace hrany?",
    a: "<b>Základní operace všech algoritmů nejkratších cest.</b><ul><li>Pro hranu (u,v): pokud <b>v.d &gt; u.d + w(u,v)</b>, pak <b>v.d = u.d + w(u,v)</b> a v.π = u</li><li>Tj. „našli jsme kratší cestu do v přes u, zapamatuj si ji\"</li></ul>InitSssp nastaví s.d=0, ostatním ∞, předchůdce null." },

  { t: "galg",
    q: "Jaká je složitost Dijkstry podle datové struktury fronty?",
    a: "<table><tr><td><b>fronta</b></td><td><b>celkem</b></td></tr><tr><td>pole</td><td>Θ(V²)</td></tr><tr><td>binární halda</td><td>Θ((V+E)·log V)</td></tr><tr><td>Fibonacciho halda</td><td>Θ(V·log V + E)</td></tr></table><ul><li>Operace: INSERT, EXTRACT-MIN, DECREASE-KEY</li><li>Pro husté grafy (E≈V²) je pole srovnatelné; pro řídké je halda lepší</li></ul>" },

  { t: "galg",
    q: "Jaký je invariant Dijkstrova algoritmu?",
    a: "<b>Jakmile je vrchol odebrán z prioritní fronty (přidán do množiny S), jeho vzdálenost u.d je už finální (nejkratší).</b><ul><li>Platí jen pro <b>nezáporné</b> hrany – proto Dijkstra selže se zápornými (k uzavřenému vrcholu se nevrací)</li><li>Dijkstra = hladový algoritmus (bere vždy lokálně nejbližší vrchol)</li></ul>" },

  { t: "galg",
    q: "Jak vybrat algoritmus nejkratší cesty podle typu grafu?",
    a: "<ul><li><b>Neohodnocený</b> graf → <b>BFS</b></li><li><b>Acyklický (DAG)</b> → relaxace v <b>topologickém uspořádání</b> (O(V+E))</li><li><b>Nezáporné hrany</b> → <b>Dijkstra</b></li><li><b>Záporné hrany</b> → <b>Bellman–Ford</b> (a detekce záporného cyklu)</li></ul>SSSP = Single Source Shortest Path (z jednoho vrcholu do všech)." },

  { t: "galg",
    q: "Jak funguje Kruskalův algoritmus a struktura Union-Find?",
    a: "<b>Hladově staví minimální kostru z nejlevnějších hran.</b><ol><li>Seřadí hrany podle vah</li><li>Pro každou hranu (u,v): pokud FIND-SET(u) ≠ FIND-SET(v) (netvoří cyklus), přidej ji a UNION(u,v)</li></ol><b>Union-Find (disjunktní množiny)</b> testuje, zda vrcholy už jsou propojené. Složitost <b>O(E log E)</b> (dominuje řazení). Funguje i se zápornými hranami." },

  { t: "galg",
    q: "PŘÍKLAD: Dají Kruskal a Prim stejnou minimální kostru?",
    a: "<b>Ano – stejnou kostru (stejný součet vah), ale přidávají hrany v jiném pořadí.</b><ul><li><b>Kruskal</b> bere globálně nejlevnější hrany napříč grafem: CF(1), AF(2), DE(2), CD(3), AB(4)</li><li><b>Prim</b> z vrcholu A roste lokálně: AF(2), FC(1), CD(3), DE(2), AB(4)</li></ul>Při různých vahách je MST jednoznačná; při shodných vahách může být víc MST." },

  { t: "galg",
    q: "CHYTÁK: Zachová se nejkratší cesta, když všem hranám přičteme 1?",
    a: "<b>NE.</b><ul><li>Přičtení konstanty ke každé hraně <b>znevýhodní cesty s více hranami</b></li><li>Cesta s mnoha levnými hranami může být původně nejkratší, ale po přičtení 1 ke každé hraně se stane delší než cesta s méně hranami</li></ul>Nejkratší cesta tedy závisí na <b>součtu</b> vah, ne jen na jejich relativním pořadí." },

  { t: "galg",
    q: "CHYTÁK: Najde Dijkstra cestu v O(V+E)? Existuje nejkratší cesta při záporném cyklu?",
    a: "<ul><li><b>Dijkstra NENÍ O(V+E)</b> – kvůli prioritní frontě je to O((V+E)·log V) nebo Θ(V²). O(V+E) je BFS.</li><li>Při <b>záporném cyklu</b>: nejkratší <b>cesta připouštějící opakování vrcholů</b> neexistuje (−∞), ale nejkratší <b>jednoduchá</b> cesta (bez opakování) existovat může</li></ul>" },

  { t: "galg",
    q: "Jaké jsou varianty problému nejkratších cest?",
    a: "<ul><li><b>SSSP</b> (Single-Source) – z jednoho vrcholu do všech (Dijkstra, Bellman-Ford)</li><li><b>All-pairs</b> – mezi všemi dvojicemi (Floyd-Warshall O(V³))</li><li>Z všech do jednoho – u orientovaného grafu stačí <b>transponovat</b> a řešit SSSP</li></ul>" },

  { t: "galg",
    q: "Co je částečné a lineární uspořádání?",
    a: "<ul><li><b>Částečné uspořádání</b> – reflexivní, antisymetrická, tranzitivní relace; <b>ne každé dva prvky jsou porovnatelné</b> (např. dělitelnost, podmnožiny)</li><li><b>Lineární (úplné) uspořádání</b> – navíc <b>každé dva prvky porovnatelné</b> (např. ≤ na číslech)</li></ul>Topologické uspořádání DAGu je linearizace částečného uspořádání úloh." },

  { t: "galg",
    q: "Proč je Bellman-Ford korektní po V−1 iteracích?",
    a: "<b>Nejkratší jednoduchá cesta má nejvýše V−1 hran.</b><ul><li>Po <b>i-té</b> iteraci jsou správně spočítané vzdálenosti pro cesty s nejvýše <b>i hranami</b></li><li>Po V−1 iteracích jsou tedy hotové všechny nejkratší cesty</li><li>Pokud lze v V-té iteraci ještě relaxovat → <b>záporný cyklus</b></li></ul>Princip dynamického programování (na rozdíl od hladové Dijkstry)." },

  { t: "galg",
    q: "Co jsou hladové (greedy) algoritmy a které grafové je používají?",
    a: "<b>Greedy – v každém kroku volí lokální optimum a doufá v globální.</b><ul><li><b>Dijkstra</b> – bere nejbližší nezpracovaný vrchol</li><li><b>Kruskal</b> – bere nejlevnější hranu bez cyklu</li><li><b>Jarník-Prim</b> – přidává nejlevnější hranu z komponenty</li></ul>U MST i Dijkstry greedy funguje optimálně (matroidová struktura); obecně greedy nemusí dát optimum." }
);
