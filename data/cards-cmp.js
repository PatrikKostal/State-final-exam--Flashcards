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
    a: "<b>Je P = NP?</b> Tedy: lze každý problém, jehož řešení jde rychle ověřit, také rychle vyřešit?<ul><li>Jeden z <b>nejdůležitějších otevřených problémů</b> informatiky (Milleniová cena 1 mil. $)</li><li>Obecně se věří, že <b>P ≠ NP</b> (ověřit ≠ vyřešit)</li><li>Kdyby P = NP, zhroutila by se moderní kryptografie a mnoho \"těžkých\" problémů by bylo snadných</li></ul>" },

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
    a: "<ul><li><b>Korektnost přes invariant cyklu</b>: tvrzení platné před každou iterací. Dokáže se <b>inicializace</b> (platí na začátku), <b>zachování</b> (iterace ho udrží), <b>ukončení</b> (po skončení dává správnost). Příklad: u select sortu je invariant „prvních i prvků je seřazeno a jsou nejmenší\".</li><li><b>Složitost</b>: select sort O(n²), merge sort O(n log n), <b>quicksort</b> průměrně O(n log n), nejhůř O(n²)</li></ul>" }
);
