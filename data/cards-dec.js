// 10. Rozhodnutelnost (IB110)
// Otázka pro státnice PVA – flashcards k tématu "Rozhodnutelnost".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.dec = { label: "🛑 Rozhodnutelnost", cls: "tag-dec", order: 10 };

FC.cards.push(
  { t: "dec",
    q: "Co je algoritmický problém a co algoritmus?",
    a: "<ul><li><b>Algoritmický problém</b> – přesně zadaná otázka pro nekonečně mnoho vstupů; často jako <b>rozhodovací problém</b> (odpověď ANO/NE), formálně <b>jazyk</b> = množina vstupů s odpovědí ANO</li><li><b>Algoritmus</b> – konečný, jednoznačný postup, který pro vstup po konečném počtu kroků vydá výsledek</li><li><b>Church–Turingova teze</b>: pojem \"algoritmus\" je přesně zachycen <b>Turingovým strojem</b> (vše vyčíslitelné je vyčíslitelné TS)</li></ul>" },

  { t: "dec",
    q: "Co je Turingův stroj a jak je definován?",
    a: "<b>Abstraktní výpočetní model s neomezenou páskou.</b> Skládá se z:<ul><li>nekonečné <b>pásky</b> rozdělené na políčka + <b>čtecí/zápisová hlava</b></li><li>konečné <b>množiny stavů</b> (vč. počátečního a koncových)</li><li><b>přechodové funkce</b>: (stav, čtený symbol) → (nový stav, zapsaný symbol, posun hlavy L/R)</li></ul>V každém kroku přečte symbol, přepíše ho, posune hlavu a změní stav. Slouží jako <b>formální definice algoritmu</b>." },

  { t: "dec",
    q: "Co je rozhodnutelný (rekurzivní) jazyk?",
    a: "<b>Jazyk L je rozhodnutelný, pokud existuje Turingův stroj, který se pro KAŽDÝ vstup zastaví</b> a odpoví správně:<ul><li>vstup ∈ L → přijme (ANO)</li><li>vstup ∉ L → odmítne (NE)</li></ul>Klíčové: stroj se <b>vždy zastaví</b> (\"totální\" algoritmus). Odpovídá problémům, které lze opravdu algoritmicky vyřešit." },

  { t: "dec",
    q: "Co je částečně rozhodnutelný (rekurzivně spočetný) jazyk?",
    a: "<b>Jazyk L je částečně rozhodnutelný, pokud existuje TS, který pro vstupy z L přijme, ale pro vstupy mimo L se může zacyklit (nemusí se zastavit).</b><ul><li>Pro \"ANO\" instance vždy odpoví, pro \"NE\" instance možná běží donekonečna</li><li>= jazyk, jehož slova lze <b>vyjmenovat (enumerovat)</b></li><li>Také zvaný <b>rekurzivně spočetný / Turingovsky rozpoznatelný</b></li></ul>" },

  { t: "dec",
    q: "Jaký je vztah mezi rozhodnutelností a částečnou rozhodnutelností?",
    a: "<b>Věta (Postova):</b> Jazyk L je rozhodnutelný <b>právě tehdy</b>, když jsou částečně rozhodnutelné <b>L i jeho doplněk</b> (L i ko-L).<ul><li>Rozhodnutelné ⊂ částečně rozhodnutelné (ostře)</li><li>Existují jazyky částečně rozhodnutelné, ale ne rozhodnutelné (např. <b>halting problem</b>)</li><li>A jazyky, které nejsou ani částečně rozhodnutelné (např. doplněk halting problému)</li></ul>" },

  { t: "dec",
    q: "Co je problém zastavení (halting problem)?",
    a: "<b>Otázka: zastaví se daný program (Turingův stroj) M na daném vstupu w?</b><ul><li>Formálně jazyk HALT = { ⟨M, w⟩ | M se na w zastaví }</li><li><b>Je nerozhodnutelný</b> – neexistuje algoritmus, který by to vždy správně rozhodl</li><li>Je ale <b>částečně rozhodnutelný</b> (stačí M simulovat; když se zastaví, řekneme ANO)</li></ul>První a nejznámější nerozhodnutelný problém (Turing, 1936)." },

  { t: "dec",
    q: "Jak se dokazuje nerozhodnutelnost halting problému?",
    a: "<b>Sporem pomocí diagonalizace.</b><ul><li>Předpokládejme stroj <b>H</b>, který rozhodne, zda M na w zastaví</li><li>Sestrojíme stroj <b>D</b>, který pro vstup ⟨M⟩ spustí H na ⟨M, M⟩ a udělá <b>opak</b>: zastaví se ⟺ H řekne, že M(⟨M⟩) se NEzastaví</li><li>Spustíme D na sobě samém ⟨D⟩ → <b>spor</b>: D se zastaví ⟺ D se nezastaví</li></ul>Tedy H nemůže existovat." },

  { t: "dec",
    q: "Co je metoda redukce a k čemu slouží?",
    a: "<b>Převod jednoho problému na druhý: A se redukuje na B (A ≤ B), pokud řešení B umožní řešit A.</b><ul><li>Pokud je A nerozhodnutelný a A ≤ B, pak je <b>B také nerozhodnutelný</b> (jinak bychom přes B vyřešili A)</li><li>Standardní technika důkazu nerozhodnutelnosti: redukovat <b>známý nerozhodnutelný problém</b> (halting) na zkoumaný</li><li>Funkce převádějící instance musí být <b>vyčíslitelná</b></li></ul>" },

  { t: "dec",
    q: "Uveď příklady nerozhodnutelných problémů a Riceovu větu.",
    a: "<b>Příklady nerozhodnutelných problémů:</b><ul><li>Halting problem</li><li>Zda dva programy počítají stejnou funkci (ekvivalence)</li><li>Zda program vytiskne dané slovo / přijme prázdný jazyk</li><li>Postův korespondenční problém, neřešitelnost Diofantických rovnic (10. Hilbertův problém)</li></ul><b>Riceova věta:</b> každá <b>netriviální sémantická vlastnost</b> funkce počítané programem je nerozhodnutelná." },

  { t: "dec",
    q: "Co je univerzální Turingův stroj?",
    a: "<b>Turingův stroj U, který dokáže simulovat libovolný jiný TS.</b><ul><li>Na vstupu dostane <b>popis stroje M (kód) a vstup w</b> a simuluje běh M na w</li><li>Je teoretickým základem <b>programovatelného počítače</b> (program jako data)</li><li>Existence U umožňuje diagonalizační konstrukce (např. důkaz halting problému)</li></ul>" },

  { t: "dec",
    q: "Jak souvisí rozhodnutelnost s Chomského hierarchií?",
    a: "<ul><li><b>Typ 0 (obecné gramatiky) = rekurzivně spočetné jazyky</b> = jazyky přijímané Turingovým strojem = <b>částečně rozhodnutelné</b></li><li><b>Rozhodnutelné (rekurzivní) jazyky</b> leží <b>mezi</b> kontextovými (typ 1) a rekurzivně spočetnými (typ 0) – tvoří vlastní třídu, která není přímo v Chomského hierarchii</li><li>Kontextové (typ 1) ⊂ rozhodnutelné ⊂ částečně rozhodnutelné (typ 0)</li></ul>Existují i jazyky mimo typ 0 (ani částečně rozhodnutelné), např. doplněk HALT." }
);
