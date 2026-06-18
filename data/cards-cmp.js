// 11. Složitost (IB110)
// Otázka pro státnice PVA – flashcards k tématu "Složitost".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.cmp = { label: "⏱️ Složitost", cls: "tag-cmp", order: 11 };

FC.cards.push(
  { t: "cmp",
    q: "Jaký je rozdíl mezi složitostí algoritmu a složitostí problému?",
    a: "<ul><li><b>Složitost algoritmu</b> – počet kroků (čas) či paměti, které <b>konkrétní algoritmus</b> spotřebuje v závislosti na velikosti vstupu (obvykle nejhorší případ)</li><li><b>Složitost problému</b> – složitost <b>nejlepšího možného</b> algoritmu řešícího daný problém (dolní mez napříč všemi algoritmy)</li></ul>Algoritmus dává <b>horní mez</b> složitosti problému; dolní meze se dokazují obtížně." },

  { t: "cmp",
    q: "Vysvětli asymptotickou notaci O, Ω a Θ.",
    a: "<b>Popisuje růst funkce pro velká n (zanedbává konstanty a nižší členy):</b><ul><li><b>O(g)</b> – horní mez: f roste <b>nejvýše</b> jako g (f ≤ c·g)</li><li><b>Ω(g)</b> – dolní mez: f roste <b>aspoň</b> jako g</li><li><b>Θ(g)</b> – těsný odhad: f roste <b>přesně</b> jako g (zároveň O i Ω)</li></ul>Příklad: třídění porovnáváním je Θ(n log n) v nejhorším případě." },

  { t: "cmp",
    q: "Co je třída P?",
    a: "<b>Třída rozhodovacích problémů řešitelných v polynomiálním čase na deterministickém Turingově stroji.</b><ul><li>Existuje algoritmus s časovou složitostí O(nᵏ) pro nějakou konstantu k</li><li>Považována za třídu <b>\"prakticky efektivně řešitelných\"</b> problémů</li><li>Příklady: řazení, nejkratší cesta, prvočíselnost (AKS), maximální párování</li></ul>" },

  { t: "cmp",
    q: "Co je třída NP?",
    a: "<b>Problémy řešitelné v polynomiálním čase na NEdeterministickém TS.</b> Ekvivalentně (a názorněji):<ul><li>Problémy, jejichž <b>řešení (certifikát) lze v polynomiálním čase ověřit</b></li><li>\"Najít je těžké, ověřit snadné\"</li><li>Příklady: SAT, barvení grafu, Hamiltonovská kružnice, problém batohu, klika</li></ul>Platí <b>P ⊆ NP</b> (co umím rychle vyřešit, umím i rychle ověřit)." },

  { t: "cmp",
    q: "Proč je nedeterminismus / verifikace klíčem k NP?",
    a: "<b>Dva ekvivalentní pohledy na NP:</b><ul><li><b>Nedeterministicky</b>: stroj \"uhodne\" řešení a ověří ho v polynomiálním čase (paralelně zkouší všechny možnosti)</li><li><b>Verifikace</b>: existuje polynomiální <b>verifikátor</b> V, který pro instanci s odpovědí ANO dostane <b>certifikát</b> (svědka) a ověří správnost</li></ul>Příklad: u SAT je certifikátem ohodnocení proměnných – dosazení a ověření je rychlé." },

  { t: "cmp",
    q: "Co je otázka P vs NP?",
    a: "<b>Je P = NP?</b> Tedy: lze každý problém, jehož řešení jde rychle ověřit, také rychle vyřešit?<ul><li>Jeden z <b>nejdůležitějších otevřených problémů</b> informatiky (Mileniová cena 1 mil. $)</li><li>Obecně se věří, že <b>P ≠ NP</b> (ověřit ≠ vyřešit)</li><li>Kdyby P = NP, zhroutila by se moderní kryptografie a mnoho \"těžkých\" problémů by bylo snadných</li></ul>" },

  { t: "cmp",
    q: "Co je polynomiální redukce?",
    a: "<b>Převod problému A na problém B funkcí vyčíslitelnou v polynomiálním čase tak, že:</b> vstup x ∈ A ⟺ f(x) ∈ B.<ul><li>Značíme <b>A ≤ₚ B</b></li><li>Pokud A ≤ₚ B a B ∈ P, pak i A ∈ P (\"B je aspoň tak těžký jako A\")</li><li>Základní nástroj pro definici <b>NP-těžkosti a NP-úplnosti</b> a pro důkazy, že je problém těžký</li></ul>" },

  { t: "cmp",
    q: "Co znamená NP-těžkost (NP-hard)?",
    a: "<b>Problém H je NP-těžký, pokud se na něj dá polynomiálně redukovat KAŽDÝ problém z NP</b> (∀L ∈ NP: L ≤ₚ H).<ul><li>Je \"aspoň tak těžký\" jako všechny problémy v NP</li><li><b>Nemusí být v NP</b> ani být rozhodovací (např. optimalizační či nerozhodnutelné problémy mohou být NP-těžké)</li><li>Pokud bychom uměli NP-těžký problém vyřešit v P, platilo by P = NP</li></ul>" },

  { t: "cmp",
    q: "Co je NP-úplnost (NP-complete)?",
    a: "<b>Problém je NP-úplný, pokud je zároveň (1) v NP a (2) NP-těžký.</b><ul><li>Jsou to <b>nejtěžší problémy v NP</b></li><li>Pokud by <b>jediný</b> NP-úplný problém byl v P, pak <b>P = NP</b> (a všechny v P)</li><li>Vzájemně na sebe polynomiálně redukovatelné</li></ul>Příklady: <b>SAT, 3-SAT, barvení grafu, Hamiltonovská kružnice, problém kliky, batoh, vrcholové pokrytí</b>." },

  { t: "cmp",
    q: "Co říká Cook–Levinova věta?",
    a: "<b>Problém splnitelnosti booleovských formulí (SAT) je NP-úplný.</b><ul><li>První dokázaný NP-úplný problém (Cook 1971, Levin)</li><li>Důkaz: výpočet libovolného nedeterministického polynomiálního TS lze zakódovat do booleovské formule</li><li>Význam: dává <b>\"výchozí\" NP-úplný problém</b>, ze kterého se redukcí dokazuje NP-úplnost dalších</li></ul>" },

  { t: "cmp",
    q: "Jak se dokazuje, že je problém NP-úplný?",
    a: "<b>Dva kroky:</b><ol><li><b>Ukázat, že je v NP</b> – navrhnout certifikát a polynomiální verifikátor</li><li><b>Ukázat NP-těžkost</b> – polynomiálně redukovat <b>nějaký známý NP-úplný problém</b> (např. 3-SAT) na náš problém</li></ol>Klíčové je správné nasměrování redukce: <b>známý těžký ≤ₚ náš nový</b>." },

  { t: "cmp",
    q: "Jaké další složitostní třídy navazují na P a NP?",
    a: "<ul><li><b>co-NP</b> – doplňky NP problémů (rychlé ověření \"NE\" instance)</li><li><b>PSPACE</b> – řešitelné v polynomiálním <b>prostoru</b>; platí P ⊆ NP ⊆ PSPACE</li><li><b>EXPTIME</b> – exponenciální čas</li><li><b>L / NL</b> – logaritmický prostor</li></ul>Známé ostré oddělení: <b>P ⊊ EXPTIME</b>. Většina vztahů (P vs NP, NP vs PSPACE) zůstává otevřená." },

  { t: "cmp",
    q: "Co říká Savitchova věta a jaký je vztah PSPACE a NPSPACE?",
    a: "<b>Savitchova věta: NPSPACE = PSPACE</b>, přesněji NSPACE(f) ⊆ DSPACE(f²).<ul><li>Nedeterministický prostor lze deterministicky simulovat s <b>jen kvadratickým nárůstem</b> paměti</li><li>Důvod „kvadraticky\": rekurzivní procedura <b>REACH</b> (dosažitelnost konfigurace v 2ᵏ krocích přes půlení) <b>šetří paměť</b> – znovupoužívá stejný prostor pro podvýpočty</li></ul>Důsledek: u <b>prostorové</b> složitosti determinismus vs nedeterminismus nehraje velkou roli (na rozdíl od otevřeného P vs NP)." },

  { t: "cmp",
    q: "Jak se dokazuje korektnost a složitost řadicích algoritmů (invariant cyklu)?",
    a: "<ul><li><b>Korektnost přes invariant cyklu</b>: tvrzení platné před každou iterací. Dokáže se <b>inicializace</b> (platí na začátku), <b>zachování</b> (iterace ho udrží), <b>ukončení</b> (po skončení dává správnost). Příklad: u select sortu je invariant „prvních i prvků je seřazeno a jsou nejmenší\".</li><li><b>Složitost</b>: select sort O(n²), merge sort O(n log n), <b>quicksort</b> průměrně O(n log n), nejhůř O(n²)</li></ul>" },

  { t: "cmp",
    q: "Co je polynomiální a co exponenciální algoritmus a proč je hranice efektivity?",
    a: "<ul><li><b>Polynomiální</b>: Time(n) ∈ O(nᵏ) pro konstantu k → považován za <b>efektivní</b></li><li><b>Exponenciální</b>: Time(n) ∈ O(2^(nᵏ)) → v praxi nepoužitelný pro velká n</li></ul>Hranice „efektivní = polynomiální\" je teoretická konvence (i n¹⁰⁰ je polynom). Asymptoticky: O(nᵏ) &lt; O(kⁿ)." },

  { t: "cmp",
    q: "Jak jsou definovány třídy P, NP, EXP, PSPACE a EXPSPACE?",
    a: "<b>Časové třídy:</b><ul><li><b>P</b> – řešitelné v polynomiálním čase na <b>deterministickém</b> TS</li><li><b>NP</b> – v polynomiálním čase na <b>nedeterministickém</b> TS</li><li><b>EXP</b> – v exponenciálním čase</li></ul><b>Prostorové třídy:</b><ul><li><b>PSPACE</b> – polynomiální paměť</li><li><b>EXPSPACE</b> – exponenciální paměť</li></ul>" },

  { t: "cmp",
    q: "Jaké jsou inkluze mezi P, NP, PSPACE a EXPTIME?",
    a: "<b>P ⊆ NP ⊆ PSPACE ⊆ EXPTIME ⊆ EXPSPACE</b><ul><li>P ⊆ NP – P je speciální případ NP</li><li>NP ⊆ PSPACE – nedeterministický polynomiální výpočet lze projít v polynomiální paměti</li><li>Jediné jisté <b>ostré</b> oddělení: P ⊊ EXPTIME a PSPACE ⊊ EXPSPACE</li></ul>P vs NP i NP vs PSPACE zůstávají <b>otevřené</b>." },

  { t: "cmp",
    q: "Co je polynomiální redukce a její klíčový důsledek?",
    a: "<b>f: Σ₁* → Σ₂* je polynomiální redukce L₁ ≤ₚ L₂, pokud:</b><ul><li>f se počítá <b>deterministickým TS v polynomiálním čase</b></li><li>w ∈ L₁ ⟺ f(w) ∈ L₂</li></ul><b>Důsledek</b>: pokud L₂ ∈ P a L₁ ≤ₚ L₂, pak i <b>L₁ ∈ P</b>. (Obyčejná redukce z rozhodnutelnosti nestačí – zanedbává čas.)" },

  { t: "cmp",
    q: "Jaké problémy patří do P a jaké do NP (ale nevíme zda do P)?",
    a: "<ul><li><b>P</b>: řazení, nejkratší cesta (SSSP), minimální kostra, <b>NSD (Euklides)</b>, <b>prvočíselnost (AKS)</b></li><li><b>NP</b> (zatím bez známého P algoritmu): <b>faktorizace</b> (základ RSA!), <b>izomorfismus grafů</b>, SUBSET-SUM, SAT, celočíselné programování</li></ul>Bezpečnost RSA stojí na tom, že faktorizace <b>není známo, že by byla v P</b>." },

  { t: "cmp",
    q: "Jaké jsou klasické NP-úplné problémy?",
    a: "<ul><li><b>SAT / 3-SAT</b> – splnitelnost booleovské formule (Cook–Levin)</li><li><b>CLIQUE</b> – existuje klika velikosti ≥ k?</li><li><b>VERTEX-COVER</b> – vrcholové pokrytí velikosti ≤ k?</li><li><b>SUBSET-SUM</b> – podmnožina se součtem t?</li><li><b>TSP</b> (rozhodovací), <b>problém batohu</b>, barvení grafu</li></ul>Všechny jsou navzájem polynomiálně redukovatelné." },

  { t: "cmp",
    q: "Co je TQBF a proč je kanonický PSPACE-úplný problém?",
    a: "<b>TQBF (True Quantified Boolean Formula)</b> – je pravdivá plně kvantifikovaná booleovská formule (každá proměnná svázaná ∀ nebo ∃)?<ul><li>Zobecnění SATu (u SATu jsou všechny proměnné jen ∃)</li><li><b>Kanonický PSPACE-úplný</b> problém (jako SAT pro NP)</li><li>Modeluje <b>hry dvou hráčů</b> (šachy, dáma) – „existuje můj tah, že pro každý tah soupeře…\"</li></ul>" },

  { t: "cmp",
    q: "CHYTÁK: Co plyne o složitosti problému z algoritmu se složitostí O(f(n))?",
    a: "<b>Že složitost problému je NEJVÝŠE O(f(n))</b> (algoritmus dává <b>horní mez</b>).<ul><li>Pro důkaz Θ(f(n)) musíme navíc dokázat <b>dolní mez</b> – že neexistuje algoritmus v o(f(n))</li><li>Má-li problém lineární složitost, <b>může</b> existovat i pomalejší algoritmus O(n²), který ho řeší (jen není optimální)</li></ul>" },

  { t: "cmp",
    q: "CHYTÁK: Může exponenciální problém patřit do PSPACE? Patří TQBF do NP?",
    a: "<ul><li>Problém s <b>exponenciální časovou</b> složitostí <b>může</b> patřit do <b>PSPACE</b> (např. prochází exponenciálně mnoho možností, ale opakovaně používá málo paměti)</li><li><b>TQBF NEpatří (zřejmě) do NP</b> – je PSPACE-úplný; je „nad\" NP</li></ul>Platí L ≤ₚ SAT ⟹ L ≤ₚ TQBF (protože SAT ≤ₚ TQBF); a L ∈ P ⟹ L ≤ₚ SAT." },

  { t: "cmp",
    q: "CHYTÁK: Jak přesně se dokazuje NP-těžkost problému A?",
    a: "<b>Polynomiální redukcí z NĚJAKÉHO známého NP-těžkého problému NA A</b> (směr: známý těžký ≤ₚ A).<ul><li>NE naopak (A ≤ₚ něco z NP by neukázalo těžkost)</li><li>Pro <b>NP-úplnost</b> navíc ukázat A ∈ NP (certifikát + polynomiální verifikace)</li></ul>Připomínka definic: <b>NP-těžký</b> = každý problém z NP se na něj redukuje; <b>NP-úplný</b> = NP-těžký a zároveň v NP." },

  { t: "cmp",
    q: "Jaký je rozdíl mezi časovou a prostorovou složitostí a jak se měří?",
    a: "<ul><li><b>Časová složitost</b> – počet kroků v závislosti na velikosti vstupu (worst/avg/best case)</li><li><b>Prostorová složitost</b> – maximální velikost použité paměti</li></ul>Prostorová se zkoumá na TS se <b>dvěma páskami</b> (read-only vstup + read-write pracovní), aby se nepočítal vstup. <b>In situ</b> = konstantní extra paměť." },

  { t: "cmp",
    q: "Co je certifikát a verifikátor u NP problému?",
    a: "<b>K pozitivním instancím NP problému existuje polynomiálně ověřitelný certifikát (svědek).</b><ul><li>Příklad SUBSET-SUM: certifikát = konkrétní podmnožina; ověření = sečíst a porovnat s t (lineárně)</li><li>Příklad SAT: certifikát = ohodnocení proměnných; ověření = dosadit</li></ul><b>NP = problémy s polynomiálním verifikátorem.</b> Nalezení certifikátu je těžké, ověření snadné." },

  { t: "cmp",
    q: "Jak NedeterminisTický TS souvisí s třídou NP?",
    a: "<b>NP = problémy řešitelné v polynomiálním čase na NEdeterministickém TS.</b><ul><li>NTS „uhodne\" správnou větev výpočtu (Oracle) a ověří ji v polynomiálním čase</li><li>Simulace NTS deterministickým TS prochází <b>všechny větve</b> → exponenciální zpomalení</li></ul>Proto P ⊆ NP ⊆ EXPTIME; otázka P = NP zůstává otevřená." },

  { t: "cmp",
    q: "PŘÍKLAD: Patří regulární jazyky a třídění do P?",
    a: "<ul><li><b>Regulární jazyky</b> – rozpoznání slova DFA je <b>lineární</b> → v P (a tedy i v PSPACE)</li><li><b>Třídění, nejkratší cesta, prvočíselnost (AKS)</b> – v P</li><li><b>Faktorizace</b> – v NP, ale není známo, zda v P (základ RSA)</li></ul>CHYTÁK: má-li problém lineární složitost, stále <b>může</b> existovat i pomalejší (O(n²)) algoritmus, který ho řeší." }
);
