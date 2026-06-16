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
    a: "<ul><li><b>Typ 0 (obecné gramatiky) = rekurzivně spočetné jazyky</b> = jazyky přijímané Turingovým strojem = <b>částečně rozhodnutelné</b></li><li><b>Rozhodnutelné (rekurzivní) jazyky</b> leží <b>mezi</b> kontextovými (typ 1) a rekurzivně spočetnými (typ 0) – tvoří vlastní třídu, která není přímo v Chomského hierarchii</li><li>Kontextové (typ 1) ⊂ rozhodnutelné ⊂ částečně rozhodnutelné (typ 0)</li></ul>Existují i jazyky mimo typ 0 (ani částečně rozhodnutelné), např. doplněk HALT." },

  { t: "dec",
    q: "Jak se formálně reprezentuje výpočetní problém a co je rozhodovací problém?",
    a: "<b>Výpočetní problém = dvojice (D, out):</b><ul><li><b>D</b> – doména problému (kolekce objektů = <b>instance</b>), vymezuje vstupy</li><li><b>out</b> – funkce přiřazující každé instanci výstup</li></ul><b>Rozhodovací problém</b> vrací jen <b>True/False</b>. Lze ho přeložit na <b>problém příslušnosti</b> (patří slovo do jazyka?) – jazyk = množina vstupů s odpovědí ANO." },

  { t: "dec",
    q: "Jak je formálně definován Turingův stroj (sedmice)?",
    a: "<b>TS = (Q, Σ, Γ, δ, s, Q_acc, Q_rej):</b><ul><li><b>Q</b> – kontrolní stavy</li><li><b>Σ</b> – vstupní abeceda</li><li><b>Γ</b> – pásková abeceda (Σ + zarážka ▷ + prázdné ⊔)</li><li><b>δ</b> – totální přechodová funkce Q×Γ → Q×Γ×{−1,0,+1}</li><li><b>s, Q_acc, Q_rej</b> – počáteční, akceptující, zamítající</li></ul>Levá zarážka ▷ se <b>nikdy nesmí přepsat</b>. Páska je nekonečná." },

  { t: "dec",
    q: "Co je konfigurace TS a jak končí výpočet?",
    a: "<b>Konfigurace = (kontrolní stav, obsah pásky, pozice hlavy)</b> – celkový stav stroje.<ul><li>Slovo <b>akceptováno</b> → výpočet skončí v Q_acc</li><li>Slovo <b>zamítnuto</b> → skončí v Q_rej (nebo se zasekne)</li><li>Jinak TS nad slovem <b>cyklí</b> (neskončí)</li></ul><b>Úplný TS</b> – vždy akceptuje/zamítá, nikdy necyklí." },

  { t: "dec",
    q: "Co říká Churchova–Turingova teze a co je univerzalita?",
    a: "<ul><li><b>Church–Turingova teze</b>: každé reálné výpočetní zařízení lze simulovat Turingovým strojem (nelze dokázat, jen vyvrátit sestrojením silnějšího stroje)</li><li><b>Univerzalita</b>: existuje TS, který simuluje libovolný jiný TS (TS lze zakódovat jako řetězec a poslat na vstup jiného TS)</li></ul>Důsledkem univerzality jsou <b>nerozhodnutelné problémy</b>." },

  { t: "dec",
    q: "Jaký je rozdíl mezi rekurzivním a rekurzivně spočetným jazykem?",
    a: "<ul><li><b>Rekurzivní (Rec)</b> = L(M) pro <b>úplný</b> TS → TS ho <b>rozhoduje</b> (vždy zastaví) = <b>rozhodnutelný</b></li><li><b>Rekurzivně spočetný (RE)</b> = L(M) pro nějaký TS → TS ho <b>akceptuje</b> (na ANO instancích zastaví, jinak může cyklit) = <b>částečně rozhodnutelný</b></li></ul>Rec ⊂ RE. Všechny regulární i bezkontextové jazyky jsou rekurzivní." },

  { t: "dec",
    q: "CHYTÁK: Co když jsou L i doplněk L akceptovány nějakým TS?",
    a: "<b>Pak L je rozhodnutelný (existuje TS, který ho rozhoduje).</b><ul><li>Pustíme paralelně oba akceptující TS; jeden z nich vždy zastaví → odpověď ANO/NE</li></ul><b>Postova věta</b>: L je rozhodnutelný ⟺ L i co-L jsou částečně rozhodnutelné. Doplněk částečně rozhodnutelného (ale nerozhodnutelného) jazyka je <b>nerozhodnutelný</b>." },

  { t: "dec",
    q: "CHYTÁK: Jaký je rozdíl mezi „TS rozhoduje\" a „TS akceptuje\" jazyk?",
    a: "<ul><li><b>TS rozhoduje L</b> – nad <b>všemi</b> slovy zastaví; slova z L akceptuje, ostatní zamítá (nikdy necyklí)</li><li><b>TS akceptuje L</b> – slova z L akceptuje (zastaví a řekne ano), nad ostatními <b>neakceptuje</b> (zamítne <b>nebo cyklí</b>)</li></ul>Rozhodování je silnější. Akceptování stačí pro částečnou rozhodnutelnost." },

  { t: "dec",
    q: "Co je nedeterministický TS a Oracle?",
    a: "<b>NTS má nedeterministickou přechodovou funkci Q×Γ → 2^(...)</b> – výpočet se větví.<ul><li>V pseudokódu se zapisuje <b>Oracle(X)</b> – „uhodne\" prvek z X (větvení)</li><li>Vstup je <b>akceptován, pokud aspoň jeden výpočet vrátí True</b></li></ul>Každé NTS lze simulovat DTS → NTS akceptují právě <b>částečně rozhodnutelné</b> jazyky (nepřidávají sílu, jen kompaktnost)." },

  { t: "dec",
    q: "Jak je formálně definovaná redukce a jaké má důsledky?",
    a: "<b>f: D₁ → D₂ je redukce P₁ ≤ P₂, pokud f je vyčíslitelná (algoritmus vždy zastaví) a zachovává odpovědi:</b> out₁(x)=True ⟺ out₂(f(x))=True.<ul><li>Nerozhodnutelnost L₁ ⟹ <b>nerozhodnutelnost L₂</b></li><li>Rozhodnutelnost L₂ ⟹ rozhodnutelnost L₁</li></ul>Pro <b>důkaz nerozhodnutelnosti</b> redukuji <b>známý nerozhodnutelný</b> problém na zkoumaný." },

  { t: "dec",
    q: "Jak funguje diagonalizace (Cantorova metoda) u nerozhodnutelnosti?",
    a: "<b>Nekonečná matice: řádky = TS Tᵢ, sloupce = vstupy; políčko (i,j) = zda Tᵢ zastaví na j.</b><ul><li>Vezmeme <b>diagonálu</b> a sestrojíme stroj dělající <b>opak</b> Tᵢ na vstupu i</li><li>Spuštění na sobě samém vede ke <b>sporu</b> → problém je nerozhodnutelný</li></ul>Takto Turing dokázal nerozhodnutelnost halting problému i problému příslušnosti (PP)." },

  { t: "dec",
    q: "Jaké jsou další nerozhodnutelné problémy kromě halting problému?",
    a: "<ul><li><b>Problém příslušnosti</b> – akceptuje TS M slovo w?</li><li><b>Postův korespondenční problém (PCP)</b></li><li><b>CFG-EQUIVALENCE</b> – generují dvě bezkontextové gramatiky stejný jazyk?</li><li><b>CFG-REGULARITY</b> – je jazyk CFG regulární?</li></ul>Tyto jsou nerozhodnutelné pro <b>bezkontextové</b> gramatiky; pro <b>regulární</b> by rozhodnout šly." },

  { t: "dec",
    q: "Lze zobecnění Turingova stroje simulovat základním DTS?",
    a: "<b>Ano – všechna zobecnění lze simulovat deterministickým TS</b> (mají stejnou výpočetní sílu).<ul><li>Více pásek, obousměrná páska, nedeterminismus → vše simulovatelné jednopáskovým DTS</li><li>Liší se jen <b>efektivitou</b> (např. NTS lze simulovat exponenciálně pomaleji)</li></ul>To podporuje <b>Church–Turingovu tezi</b> – TS zachytává pojem „algoritmus\"." },

  { t: "dec",
    q: "Jaké jsou uzávěrové vlastnosti rekurzivních a rekurzivně spočetných jazyků?",
    a: "<ul><li><b>Rekurzivní (rozhodnutelné)</b> – uzavřené na <b>vše</b>: ∪, ∩, doplněk, ·, *, rozdíl</li><li><b>Rekurzivně spočetné (RE)</b> – uzavřené na ∪, ∩, ·, *, ale <b>NE na doplněk</b> (∖)</li></ul>Právě neuzavřenost RE na doplněk dokazuje, že <b>halting problém</b> je RE, ale jeho doplněk není ani RE." },

  { t: "dec",
    q: "Proč je halting problém částečně rozhodnutelný, ale ne rozhodnutelný?",
    a: "<ul><li><b>Částečně rozhodnutelný</b>: stroj M na w můžeme <b>simulovat</b> – když zastaví, řekneme ANO. Problém: když cyklí, nikdy nemůžeme s jistotou říct NE.</li><li><b>Není rozhodnutelný</b>: neexistuje TS, který vždy zastaví a správně rozhodne (důkaz diagonalizací)</li></ul>Doplněk halting problému není ani částečně rozhodnutelný." },

  { t: "dec",
    q: "Co je rozhodovací problém a problém příslušnosti?",
    a: "<ul><li><b>Rozhodovací problém</b> – vrací <b>True/False</b> (zjednodušení výpočetního problému)</li><li><b>Problém příslušnosti</b> – patří slovo w do jazyka L? Každý rozhodovací problém lze na něj přeložit (jazyk = množina vstupů s odpovědí ANO)</li></ul>Pro vyhodnocení potřebujeme obecný model – <b>Turingův stroj</b>." },

  { t: "dec",
    q: "Jak se redukce použije pro důkaz rozhodnutelnosti vs nerozhodnutelnosti?",
    a: "<ul><li><b>Důkaz rozhodnutelnosti</b>: redukuj zkoumaný problém A na <b>známý rozhodnutelný</b> B (A ≤ B, B rozhodnutelný ⟹ A rozhodnutelný)</li><li><b>Důkaz nerozhodnutelnosti</b>: redukuj <b>známý nerozhodnutelný</b> problém (halting) na A (halting ≤ A ⟹ A nerozhodnutelný)</li></ul>Pozor na <b>směr</b> redukce – je opačný!" }
);
