// 4. Grafy a jejich prohledávání (IB000, IB002)
// Otázka pro státnice PVA – flashcards k tématu "Grafy a prohledávání".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.graph = { label: "🕸️ Grafy a prohledávání", cls: "tag-graph", order: 4 };

FC.cards.push(
  { t: "graph",
    q: "Co je graf? (formální definice)",
    a: "<b>Graf G = (V, E)</b>, kde <b>V</b> je množina vrcholů a <b>E</b> množina hran.<ul><li><b>Neorientovaný</b>: hrany jsou <b>dvouprvkové množiny</b> {u,v}</li><li><b>Orientovaný</b>: hrany jsou <b>uspořádané dvojice</b> (u,v) – mají směr</li></ul>Hrana může mít ohodnocení (váhu)." },

  { t: "graph",
    q: "Jaké jsou typy grafů?",
    a: "<ul><li><b>Orientovaný / neorientovaný</b> – hrany se směrem nebo bez</li><li><b>Ohodnocený</b> – hrany mají váhy</li><li><b>Souvislý</b> – mezi každými dvěma vrcholy existuje cesta</li><li><b>Rovinný (planární)</b> – lze nakreslit do roviny bez křížení hran</li><li><b>Úplný graf / klika</b> – každé dva vrcholy spojeny hranou</li><li><b>Strom</b> – souvislý graf bez kružnic</li><li><b>Bipartitní</b>, DAG (orientovaný acyklický)</li></ul>" },

  { t: "graph",
    q: "Co je strom a jak se definuje kořen?",
    a: "<b>Strom = souvislý acyklický (neorientovaný) graf.</b> Pro n vrcholů má právě <b>n−1 hran</b>.<ul><li><b>Neorientovaný strom</b>: kořen lze zvolit libovolně (zakořenění)</li><li><b>Orientovaný strom</b>: kořen je vrchol se <b>vstupním stupněm 0</b>, z něhož vedou cesty ke všem ostatním</li></ul>Listy = vrcholy bez potomků." },

  { t: "graph",
    q: "Co je stupeň vrcholu?",
    a: "<b>Počet hran incidentních s vrcholem.</b><ul><li>U orientovaného grafu rozlišujeme <b>vstupní stupeň</b> (in-degree) a <b>výstupní stupeň</b> (out-degree)</li><li><b>Princip sudosti / handshaking lemma</b>: součet stupňů všech vrcholů = 2·|E| (každá hrana přispěje 2)</li></ul>" },

  { t: "graph",
    q: "Jak se grafy reprezentují v počítači a jaké jsou kompromisy?",
    a: "<ul><li><b>Matice sousednosti</b> (V×V): A[i][j]=1 když existuje hrana. Test hrany O(1), ale <b>paměť O(V²)</b> – vhodné pro <b>husté</b> grafy.</li><li><b>Seznam následníků (sousedů)</b>: pro každý vrchol seznam sousedů. Paměť <b>O(V+E)</b>, průchod sousedů rychlý, test konkrétní hrany pomalejší – vhodné pro <b>řídké</b> grafy.</li></ul>" },

  { t: "graph",
    q: "Jak funguje prohledávání do hloubky (DFS)?",
    a: "<b>Jde co nejhlouběji, pak se vrací (backtracking).</b> Implementace <b>zásobníkem</b> / rekurzí.<ul><li>Často <b>obarvuje vrcholy</b>: bílá (neobjevená), šedá (rozpracovaná), černá (hotová) – pomáhá detekovat <b>cykly</b> (hrana do šedého vrcholu)</li><li><b>Post-order</b> (vrchol zpracován po potomcích) se využívá k <b>topologickému řazení</b> a hledání <b>silně souvislých komponent</b></li><li>Složitost <b>O(V + E)</b></li></ul>" },

  { t: "graph",
    q: "Jak funguje prohledávání do šířky (BFS) a k čemu slouží?",
    a: "<b>Prochází graf po vrstvách – nejdřív všechny sousedy, pak jejich sousedy.</b> Používá <b>frontu (FIFO)</b>.<ul><li>Najde <b>nejkratší cestu v neohodnoceném grafu</b> (nejmenší počet hran)</li><li>Lze použít i na <b>detekci cyklů</b> a test souvislosti/bipartitnosti</li><li>Složitost <b>O(V + E)</b></li></ul>" },

  { t: "graph",
    q: "Co jsou komponenty souvislosti? (formálně)",
    a: "<b>Maximální souvislé podgrafy.</b> Formálně přes <b>relaci dosažitelnosti</b> „existuje cesta mezi u a v\" – ta je <b>reflexivní, symetrická a tranzitivní</b> (ekvivalence), a její <b>třídy ekvivalence</b> jsou právě komponenty souvislosti.<ul><li>U orientovaných grafů rozlišujeme <b>slabě</b> a <b>silně</b> souvislé komponenty (vzájemná dosažitelnost obousměrně)</li><li>Komponenty zjistíme opakovaným DFS/BFS</li></ul>" }
);
