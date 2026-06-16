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
    a: "<b>Maximální souvislé podgrafy.</b> Formálně přes <b>relaci dosažitelnosti</b> „existuje cesta mezi u a v\" – ta je <b>reflexivní, symetrická a tranzitivní</b> (ekvivalence), a její <b>třídy ekvivalence</b> jsou právě komponenty souvislosti.<ul><li>U orientovaných grafů rozlišujeme <b>slabě</b> a <b>silně</b> souvislé komponenty (vzájemná dosažitelnost obousměrně)</li><li>Komponenty zjistíme opakovaným DFS/BFS</li></ul>" },

  { t: "graph",
    q: "Co říká věta o součtu stupňů (handshaking lemma)?",
    a: "<b>Součet stupňů všech vrcholů = 2·|E|</b> (vždy sudý).<ul><li>Každá hrana přispěje 2 do součtu stupňů</li><li>Důsledek: počet vrcholů <b>lichého stupně je vždy sudý</b></li></ul>Značení: Δ(G) = max stupeň, δ(G) = min stupeň. <b>d-regulární graf</b> má všechny stupně stejné (Δ = δ)." },

  { t: "graph",
    q: "Jaký je rozdíl mezi orientovaným a neorientovaným grafem?",
    a: "<ul><li><b>Neorientovaný</b>: hrany jsou dvouprvkové množiny {u,v}, obousměrné; ireflexivní (žádné smyčky)</li><li><b>Orientovaný (digraf)</b>: E ⊆ V×V, hrany jsou uspořádané dvojice (u,v) – mají směr; mohou mít <b>smyčku</b> (u,u)</li></ul>U orientovaného: stupeň = vstupní + výstupní; klíčový pojem <b>dosažitelnost</b>. <b>Transpozice</b> = obrácení všech hran, <b>symetrizace</b> = zapomenutí směru." },

  { t: "graph",
    q: "Co je bipartitní graf a jak souvisí s lichými cykly?",
    a: "<b>Graf, jehož vrcholy lze rozdělit na dvě disjunktní množiny tak, že hrany vedou jen mezi nimi.</b><ul><li><b>Graf je bipartitní ⟺ neobsahuje kružnici liché délky</b></li><li>Každý <b>strom</b> je bipartitní</li><li>Ověření bipartitnosti: BFS s obarvováním dvěma barvami</li></ul>CHYTÁK: bipartitní graf určitě <b>neobsahuje cyklus liché délky</b> (sudé může)." },

  { t: "graph",
    q: "Co je úplný graf a kolik má hran?",
    a: "<b>Úplný graf Kₙ – každé dva vrcholy spojeny hranou.</b><ul><li>Počet hran = <b>C(n,2) = n(n−1)/2</b></li><li>Příklad: K₅ má 10 hran</li></ul><b>Klika</b> = úplný podgraf. <b>Eulerovský graf</b> (lze nakreslit jedním tahem) = souvislý graf, kde má <b>každý vrchol sudý stupeň</b>." },

  { t: "graph",
    q: "Co je podgraf, indukovaný podgraf a izomorfismus grafů?",
    a: "<ul><li><b>Podgraf</b> H ⊆ G – podmnožina vrcholů a libovolná podmnožina hran mezi nimi</li><li><b>Indukovaný podgraf</b> – obsahuje <b>všechny</b> hrany G mezi vybranými vrcholy</li><li><b>Izomorfismus</b> – bijekce f: V(G)→V(H) zachovávající hrany (u,v hrana ⟺ f(u),f(v) hrana)</li></ul>Izomorfní grafy mají stejný počet vrcholů, hran i stejné rozložení stupňů." },

  { t: "graph",
    q: "Jaké jsou klíčové vlastnosti stromu?",
    a: "<b>Strom = souvislý acyklický graf.</b><ul><li>Mezi každými dvěma vrcholy vede <b>právě jedna cesta</b></li><li>Pro n vrcholů má <b>přesně n−1 hran</b></li><li>Přidáním jedné hrany vznikne <b>právě jedna kružnice</b></li></ul><b>Les</b> = acyklický graf (nemusí být souvislý); jeho komponenty jsou stromy. Počet hran lesa = počet vrcholů − počet stromů." },

  { t: "graph",
    q: "Co je kořenový strom, výška a hloubka?",
    a: "<ul><li><b>Kořenový strom</b> – má vybraný kořen (hloubka 0), vzniká hierarchie potomků; uzel bez potomků = <b>list</b></li><li><b>Hloubka uzlu</b> – počet hran od kořene</li><li><b>Výška stromu</b> – počet hran od kořene k nejvzdálenějšímu listu</li><li><b>Úplný n-ární strom</b> – všechny listy ve stejné hloubce, každý vnitřní uzel má přesně n synů</li></ul>" },

  { t: "graph",
    q: "Jaký je rozdíl mezi silnou a slabou souvislostí?",
    a: "<b>Jen u orientovaných grafů:</b><ul><li><b>Silná souvislost</b> – mezi každými dvěma vrcholy existuje orientovaná cesta (respektuje směr)</li><li><b>Slabá souvislost</b> – cesta existuje při <b>ignorování orientace</b> šipek</li></ul><b>Silné komponenty</b> = třídy ekvivalence vzájemné dosažitelnosti; najde je <b>Kosaraju–Sharir</b> v O(V+E) (DFS, transpozice, druhé DFS)." },

  { t: "graph",
    q: "Porovnej matici sousednosti a seznam následníků (paměť a složitosti).",
    a: "<table><tr><td></td><td><b>matice</b></td><td><b>seznam</b></td></tr><tr><td>paměť</td><td>Θ(V²)</td><td>Θ(V+E)</td></tr><tr><td>test hrany (u,v)</td><td>O(1)</td><td>O(deg u)</td></tr><tr><td>sousedé u</td><td>Θ(V)</td><td>Θ(deg u)</td></tr></table><ul><li><b>Matice</b> – vhodná pro <b>husté</b> grafy, rychlý test hrany</li><li><b>Seznam</b> – vhodný pro <b>řídké</b> grafy, úsporný</li></ul>" },

  { t: "graph",
    q: "Jak DFS klasifikuje hrany a obarvuje vrcholy?",
    a: "<b>Klasifikace hran při průchodu:</b><ul><li><b>Stromová</b> – do nově objeveného vrcholu</li><li><b>Zpětná</b> – do předka (značí <b>cyklus</b>)</li><li><b>Dopředná</b> – do potomka (přeskočení)</li><li><b>Příčná</b> – do jiné větve</li></ul><b>Barvy</b>: bílá (neobjevený) → šedá (rozpracovaný) → černá (hotový). Hrana do <b>šedého</b> = zpětná = cyklus. DFS ukládá <b>discovery (d)</b> a <b>finish (f)</b> časy." },

  { t: "graph",
    q: "Co je topologické uspořádání a jak souvisí s DFS?",
    a: "<b>Lineární uspořádání vrcholů DAGu, kde pro každou hranu (u,v) je u před v.</b><ul><li>Zachovává závislosti (vhodné pro plánování úloh)</li><li>Získá se jako <b>opačné pořadí časů dokončení (finish) z DFS</b> (reverse postorder)</li><li>Existuje <b>jen pro acyklický</b> orientovaný graf</li></ul>" },

  { t: "graph",
    q: "CHYTÁK: Které prohledávání projde nekonečný strom v konečném čase?",
    a: "<b>BFS</b> (do šířky).<ul><li>Má-li strom nekonečnou větev, <b>DFS</b> se v ní zacyklí a nikdy nedojde k ostatním vrcholům</li><li><b>BFS</b> prochází po vrstvách, takže každý vrchol v konečné hloubce navštíví v konečném čase</li></ul>BFS také hledá <b>nejkratší cestu v počtu hran</b> a používá <b>frontu</b> (ne zásobník)." },

  { t: "graph",
    q: "CHYTÁK: Pro jaký orientovaný graf má DFS strom vždy stejný tvar nezávisle na startu?",
    a: "<b>Pro cyklus.</b><ul><li>U orientovaného <b>cyklu</b> vyprodukuje DFS vždy izomorfní strom (lineární cestu), ať začneme kdekoli</li><li>U obecných grafů tvar DFS stromu závisí na startovním vrcholu i pořadí sousedů</li></ul>Detekce orientovaného cyklu jde v O(V+E) (zpětná hrana při DFS)." },

  { t: "graph",
    q: "Jak BFS počítá vzdálenosti a co je vzdálenost v grafu?",
    a: "<ul><li><b>Vzdálenost</b> dvou vrcholů = <b>minimální počet hran</b> cesty mezi nimi (v neohodnoceném grafu)</li><li><b>BFS</b> z vrcholu s ji spočítá pro všechny vrcholy: vrstva po vrstvě přiřazuje vzdálenosti 0, 1, 2, …</li><li>Funguje díky frontě – vrcholy se zpracovávají v pořadí rostoucí vzdálenosti</li></ul>" },

  { t: "graph",
    q: "CHYTÁK: Existuje-li hrana (v,t), je při DFS vždy klasifikovaná jako stromová?",
    a: "<b>NE.</b><ul><li>Hrana (v,t) je stromová jen tehdy, je-li t <b>objevený poprvé</b> právě z v</li><li>Pokud byl t už objeven dříve (jinou cestou), bude to dopředná, zpětná nebo příčná hrana</li></ul>Podobně: dosažitelnost u→v neimplikuje konkrétní vztah časových známek d/f (v může být objeveno dřív i později – příčná hrana)." },

  { t: "graph",
    q: "PŘÍKLAD: Kolik hran lze odebrat z K₅, aby zůstal souvislý? Kolik 4-cyklů má K₃,₄?",
    a: "<ul><li><b>K₅</b> má C(5,2)=10 hran; souvislý graf na 5 vrcholech potřebuje aspoň kostru o 4 hranách → lze odebrat <b>nejvýše 6</b> hran</li><li><b>4-cykly v K₃,₄</b>: vyber 2 vrcholy z každé strany: C(3,2)·C(4,2) = 3·6 = <b>18</b></li></ul>Tyto kombinatorické úvahy se na grafech objevují často." },

  { t: "graph",
    q: "Co je DAG (orientovaný acyklický graf) a k čemu slouží?",
    a: "<b>Orientovaný graf bez orientovaných cyklů.</b><ul><li>Má aspoň jeden vrchol se vstupním stupněm 0 (zdroj) a jeden s výstupním 0 (stok)</li><li>Lze ho <b>topologicky uspořádat</b></li><li>Použití: závislosti úloh, build systémy, verzování (git), výpočetní grafy</li></ul>Detekce cyklu (= ne DAG) přes DFS a zpětnou hranu, O(V+E)." },

  { t: "graph",
    q: "Jaký je rozdíl mezi Eulerovským a Hamiltonovským grafem?",
    a: "<ul><li><b>Eulerovský tah</b> – projde každou <b>hranu</b> právě jednou; existuje ⟺ souvislý graf má <b>0 nebo 2 vrcholy lichého stupně</b> (snadné rozhodnout)</li><li><b>Hamiltonovská kružnice</b> – projde každý <b>vrchol</b> právě jednou; rozhodnutí existence je <b>NP-úplné</b></li></ul>Podobně znějící, ale výpočetně zcela odlišné problémy." },

  { t: "graph",
    q: "Jak se grafy reprezentují hashovací tabulkou a kdy se to hodí?",
    a: "<b>Alternativa k matici a seznamu: hrany v hashovací tabulce (hash set/map).</b><ul><li>Test hrany {u,v}: <b>O(1)</b> (jako matice)</li><li>Paměť <b>O(V+E)</b> (jako seznam)</li><li>Přidání i odstranění hrany: očekávaně O(1)</li></ul>Kombinuje výhody obou – vhodné pro dynamické grafy s častými změnami hran." },

  { t: "graph",
    q: "Co je k-regulární graf a stupňová posloupnost?",
    a: "<ul><li><b>k-regulární graf</b> – všechny vrcholy mají stejný stupeň k (Δ = δ = k)</li><li><b>Stupňová posloupnost</b> – seznam stupňů všech vrcholů; její součet je sudý (= 2|E|)</li></ul>Ne každá posloupnost je realizovatelná grafem (Erdős–Gallai podmínka). Příklad k-regulárního: cyklus je 2-regulární, úplný graf Kₙ je (n−1)-regulární." }
);
