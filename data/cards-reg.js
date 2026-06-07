// 9. Regulární jazyky (IB110)
// Otázka pro státnice PVA – flashcards k tématu "Regulární jazyky".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.reg = { label: "🔤 Regulární jazyky", cls: "tag-reg", order: 4 };

FC.cards.push(
  { t: "reg",
    q: "Co je abeceda, slovo a formální jazyk?",
    a: "<ul><li><b>Abeceda Σ</b> – konečná neprázdná množina symbolů, např. Σ = {a, b}</li><li><b>Slovo (řetězec)</b> – konečná posloupnost symbolů z abecedy; prázdné slovo značíme <b>ε</b></li><li><b>Σ*</b> – množina všech slov nad abecedou</li><li><b>Formální jazyk</b> – libovolná podmnožina Σ* (množina slov)</li></ul>" },

  { t: "reg",
    q: "Co je Chomského hierarchie formálních jazyků?",
    a: "<b>Čtyři vnořené třídy jazyků podle síly gramatik/automatů:</b><ul><li><b>Typ 0 – rekurzivně spočetné</b>: obecné gramatiky, <b>Turingův stroj</b></li><li><b>Typ 1 – kontextové</b>: kontextové gramatiky, <b>lineárně omezený automat</b></li><li><b>Typ 2 – bezkontextové</b>: bezkontextové gramatiky, <b>zásobníkový automat</b></li><li><b>Typ 3 – regulární</b>: regulární gramatiky, <b>konečný automat</b></li></ul>Platí ostré vnoření: Typ 3 ⊂ Typ 2 ⊂ Typ 1 ⊂ Typ 0." },

  { t: "reg",
    q: "Co jsou regulární jazyky?",
    a: "<b>Nejjednodušší třída Chomského hierarchie (typ 3).</b><ul><li>Jsou to přesně jazyky <b>rozpoznatelné konečným automatem</b></li><li>Ekvivalentně: popsatelné <b>regulárním výrazem</b> nebo generované <b>regulární gramatikou</b></li><li>Konečný automat má jen konečnou paměť (stavy), nemá zásobník ani pásku</li></ul>" },

  { t: "reg",
    q: "Jaké jsou tři ekvivalentní reprezentace regulárních jazyků?",
    a: "<ul><li><b>Konečné automaty</b> (DFA, NFA, NFA-ε) – akceptory</li><li><b>Regulární výrazy</b> – algebraický popis</li><li><b>Regulární (pravé lineární) gramatiky</b> – generativní popis</li></ul>Všechny tři popisují <b>přesně stejnou třídu jazyků</b> a mezi sebou se dají algoritmicky převádět (Kleeneova věta)." },

  { t: "reg",
    q: "Definuj deterministický konečný automat (DFA).",
    a: "<b>Pětice M = (Q, Σ, δ, q₀, F):</b><ul><li><b>Q</b> – konečná množina stavů</li><li><b>Σ</b> – vstupní abeceda</li><li><b>δ: Q × Σ → Q</b> – přechodová funkce (z každého stavu na každý symbol <b>právě jeden</b> přechod)</li><li><b>q₀ ∈ Q</b> – počáteční stav</li><li><b>F ⊆ Q</b> – množina přijímajících stavů</li></ul>Slovo je přijato, pokud po jeho přečtení automat skončí v některém stavu z F." },

  { t: "reg",
    q: "Jaký je rozdíl mezi DFA a NFA?",
    a: "<ul><li><b>DFA (deterministický)</b> – z každého stavu na daný symbol <b>právě jeden</b> následník</li><li><b>NFA (nedeterministický)</b> – přechodová funkce vrací <b>množinu stavů</b> δ: Q × Σ → P(Q); může mít více možností nebo žádnou</li></ul>NFA přijímá slovo, pokud <b>existuje aspoň jedna</b> přijímající výpočetní cesta. <b>Důležité:</b> DFA a NFA rozpoznávají <b>stejnou třídu</b> jazyků (regulární) – nedeterminismus zde nepřidává sílu, jen úspornost zápisu." },

  { t: "reg",
    q: "Co jsou ε-přechody (NFA-ε)?",
    a: "<b>NFA rozšířený o přechody na prázdné slovo ε</b> – automat může změnit stav <b>bez přečtení vstupního symbolu</b>.<ul><li>Usnadňují konstrukce (např. skládání automatů při převodu z regulárního výrazu)</li><li><b>ε-uzávěr</b> stavu = množina stavů dosažitelných jen ε-přechody</li><li>Lze odstranit a převést na běžný NFA, resp. DFA – stále rozpoznává regulární jazyky</li></ul>" },

  { t: "reg",
    q: "Jak funguje determinizace (převod NFA → DFA)?",
    a: "<b>Podmnožinová konstrukce (subset construction):</b><ul><li>Stavy DFA = <b>množiny stavů NFA</b> (proto až 2ⁿ stavů)</li><li>Počáteční stav = ε-uzávěr počátečního stavu NFA</li><li>Přechod: z množiny S na symbol a → ε-uzávěr sjednocení všech δ(q,a) pro q ∈ S</li><li>Přijímající jsou množiny obsahující aspoň jeden přijímající stav NFA</li></ul>Výsledný DFA rozpoznává stejný jazyk; v nejhorším případě <b>exponenciální nárůst</b> počtu stavů." },

  { t: "reg",
    q: "Co jsou regulární výrazy a jaké mají operace?",
    a: "<b>Algebraický popis regulárních jazyků.</b> Základní (atomické): <b>∅, ε, a</b> (symbol). Operace:<ul><li><b>Sjednocení</b>: r + s (nebo r|s) – slovo z r nebo s</li><li><b>Konkatenace</b>: r·s – zřetězení</li><li><b>Iterace (Kleeneho hvězda)</b>: r* – nula a více opakování</li></ul>Příklad: <code>a(a|b)*</code> = slova začínající <b>a</b>. Z reg. výrazu lze sestrojit NFA-ε (Thompsonova konstrukce)." },

  { t: "reg",
    q: "Co je regulární (pravá lineární) gramatika?",
    a: "<b>Gramatika s pravidly tvaru A → aB nebo A → a (popř. A → ε).</b><ul><li>Neterminál se vždy přepisuje na terminál následovaný <b>nejvýše jedním neterminálem napravo</b></li><li>Generuje přesně regulární jazyky</li><li>Odpovídá přímo konečnému automatu: neterminály ≈ stavy, pravidla ≈ přechody</li></ul>" },

  { t: "reg",
    q: "Co říká pumping lemma a k čemu slouží?",
    a: "<b>Nutná podmínka regularity.</b> Pro každý regulární jazyk L existuje konstanta n (\"pumping length\") taková, že každé slovo w ∈ L s |w| ≥ n lze rozdělit na <b>w = xyz</b>, kde:<ul><li>|y| ≥ 1 (y neprázdné)</li><li>|xy| ≤ n</li><li><b>xyᵏz ∈ L pro všechna k ≥ 0</b> (lze \"pumpovat\")</li></ul>Slouží hlavně k <b>důkazu, že jazyk NENÍ regulární</b> – sporem ukážeme, že podmínka nemůže platit." },

  { t: "reg",
    q: "Jak dokážeš, že jazyk není regulární? Uveď příklad.",
    a: "<b>Sporem pomocí pumping lemmatu.</b> Předpokládáme regularitu, vezmeme vhodné slovo délky ≥ n a ukážeme, že žádné rozdělení xyz nelze pumpovat tak, aby zůstalo v jazyce.<br><br>Klasický příklad: <b>L = { aⁿbⁿ | n ≥ 0 }</b> není regulární – konečný automat si nedokáže \"zapamatovat\" počet a, aby ho porovnal s počtem b (má jen konečně stavů). Tento jazyk je ale <b>bezkontextový</b>." },

  { t: "reg",
    q: "Jaké jsou uzávěrové vlastnosti regulárních jazyků?",
    a: "<b>Třída regulárních jazyků je uzavřená na:</b><ul><li><b>Sjednocení, průnik, doplněk</b> (rozdíl)</li><li><b>Konkatenaci</b> a <b>iteraci (Kleeneho hvězdu)</b></li><li><b>Zrcadlový obraz</b>, homomorfismus</li></ul>Tj. aplikací těchto operací na regulární jazyky vznikne opět regulární jazyk. Důkazy konstrukcí automatů (např. doplněk = prohození přijímajících/nepřijímajících stavů v <b>úplném DFA</b>, průnik = součinový automat)." },

  { t: "reg",
    q: "Co říká Myhill–Nerodova věta?",
    a: "<b>Charakterizace regulárních jazyků pomocí ekvivalence na slovech.</b><ul><li>Jazyk L je regulární <b>právě tehdy</b>, když relace \"nerozlišitelnosti\" má <b>konečně mnoho tříd</b></li><li>Počet těchto tříd = počet stavů <b>minimálního DFA</b></li><li>Dává metodu <b>minimalizace automatu</b> a alternativní důkaz neregularity</li></ul>" }
);
