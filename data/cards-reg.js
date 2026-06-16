// 9. Regulární jazyky (IB110)
// Otázka pro státnice PVA – flashcards k tématu "Regulární jazyky".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.reg = { label: "🔤 Regulární jazyky", cls: "tag-reg", order: 9 };

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
    a: "<b>Charakterizace regulárních jazyků pomocí ekvivalence na slovech.</b><ul><li>Jazyk L je regulární <b>právě tehdy</b>, když relace \"nerozlišitelnosti\" má <b>konečně mnoho tříd</b></li><li>Počet těchto tříd = počet stavů <b>minimálního DFA</b></li><li>Dává metodu <b>minimalizace automatu</b> a alternativní důkaz neregularity</li></ul>" },

  { t: "reg",
    q: "Co je gramatika? (formální definice jako čtveřice)",
    a: "<b>Gramatika G = (N, Σ, P, S):</b><ul><li><b>N</b> – konečná množina <b>neterminálů</b> (pomocné symboly)</li><li><b>Σ</b> – množina <b>terminálů</b> (symboly jazyka), N ∩ Σ = ∅</li><li><b>P</b> – množina <b>přepisovacích pravidel</b> α → β</li><li><b>S ∈ N</b> – počáteční (startovací) symbol</li></ul>Jazyk gramatiky = všechna slova z terminálů odvoditelná ze S. Tvar pravidel určuje <b>typ v Chomského hierarchii</b>." },

  { t: "reg",
    q: "Jak převést konečný automat na regulární výraz a na gramatiku?",
    a: "<ul><li><b>DFA → regulární výraz</b>: <b>metoda eliminace stavů</b> – postupně odstraňujeme stavy a hrany přeznačujeme regulárními výrazy, až zbyde počáteční a koncový stav spojený jediným výrazem (lze i přes soustavu rovnic / Ardenovo lemma)</li><li><b>Automat → (pravá lineární) gramatika</b>: stavy = neterminály; přechod p --a--&gt; q dá pravidlo <code>p → a q</code>; pro přijímající stav přidáme <code>p → ε</code></li></ul>" },

  { t: "reg",
    q: "Co je paralelní (synchronní) kompozice automatů?",
    a: "<b>Konstrukce produktového automatu, který simuluje dva automaty zároveň.</b><ul><li>Stavy = <b>dvojice (p, q)</b> stavů obou automatů</li><li>Na vstupní symbol oba automaty udělají přechod <b>synchronně</b></li><li>Volbou přijímajících stavů získáme <b>průnik</b> (oba přijímají) nebo <b>sjednocení</b> (aspoň jeden) jazyků</li></ul>Je to základ důkazu uzávěrových vlastností na průnik a rozdíl." },

  { t: "reg",
    q: "Co je abeceda, slovo, prefix/sufix a prázdné slovo?",
    a: "<ul><li><b>Abeceda Σ</b> – konečná množina symbolů (ε do ní nepatří)</li><li><b>Slovo</b> – konečná posloupnost symbolů; každé slovo je svým prefixem, sufixem i podslovem</li><li><b>Prázdné slovo ε</b> – prefix/sufix/podslovo každého slova; len(ε)=0</li><li><b>Σ*</b> – všechna slova nad Σ</li></ul>Jazyk = libovolná podmnožina Σ*; slovo je <b>akceptováno</b>, dovede-li automat z počátečního do koncového stavu." },

  { t: "reg",
    q: "Jaké jsou tvary pravidel jednotlivých typů Chomského hierarchie?",
    a: "<ul><li><b>Typ 0 (frázové)</b> – neomezený tvar, jen neterminál nalevo</li><li><b>Typ 1 (kontextové)</b> – αAβ → αγβ, |levá| ≤ |pravá|</li><li><b>Typ 2 (bezkontextové)</b> – A → γ (jeden neterminál nalevo)</li><li><b>Typ 3 (regulární)</b> – A → a nebo A → aB</li></ul>Vnoření: typ 3 ⊂ typ 2 ⊂ typ 1 ⊂ typ 0." },

  { t: "reg",
    q: "Jaký je rozdíl mezi pravolineární a levolineární regulární gramatikou?",
    a: "<ul><li><b>Pravolineární</b> – pravá strana ve tvaru <b>aB</b> (terminál + neterminál vpravo)</li><li><b>Levolineární</b> – pravá strana ve tvaru <b>Ba</b></li></ul>Obě generují regulární jazyky, ale <b>nesmí se kombinovat</b> v jedné gramatice. Pravidlo S → ε je povoleno, jen pokud se S nevyskytuje na pravé straně." },

  { t: "reg",
    q: "Proč mají DFA a NFA stejnou sílu a jaký je nárůst stavů při determinizaci?",
    a: "<ul><li>Každý NFA lze převést na DFA <b>podmnožinovou konstrukcí</b> → oba rozpoznávají regulární jazyky</li><li>Stavy DFA = <b>množiny stavů NFA</b>, proto v nejhorším případě <b>exponenciální nárůst</b> (až 2ⁿ stavů)</li></ul>NFA tedy nepřidává sílu, jen úspornost zápisu." },

  { t: "reg",
    q: "Jak se odstraní ε-kroky a jak funguje ε-okolí?",
    a: "<ul><li><b>ε-okolí</b> stavu = množina stavů dosažitelných čistě ε-přechody</li><li>Postup: spočítej, kam dojdeš ε-kroky → udělej normální přechod → znovu ε-uzávěr</li><li>Pokud je v ε-okolí počátečního stavu koncový stav, počáteční stav se stane koncovým</li></ul>ε-NFA, NFA i DFA rozpoznávají stejnou třídu (regulární jazyky)." },

  { t: "reg",
    q: "Co je rozlišitelnost stavů a jak se automat minimalizuje?",
    a: "<b>Dva stavy jsou rozlišitelné slovem w, pokud z nich w vede tak, že právě jeden skončí v koncovém stavu.</b> Nerozlišitelné = <b>ekvivalentní</b>.<ul><li><b>Algoritmus</b>: odstraň nedosažitelné stavy → rozděl na koncové/nekoncové → iterativně zjemňuj třídy podle přechodů → slučuj nerozlišitelné</li></ul>Pro každý regulární jazyk existuje <b>jediný minimální DFA</b>. Minimalizace je v <b>polynomiálním</b> čase." },

  { t: "reg",
    q: "Co je kanonický tvar automatu a jak se testuje ekvivalence dvou automatů?",
    a: "<b>Kanonizace = minimální DFA s pevně daným (kanonickým) přečíslováním stavů</b> podle pořadí průchodu.<ul><li>Celý řetězec: ε-NFA → (odstranění ε) NFA → (determinizace) DFA → (minimalizace) min. DFA → (kanonizace) kanonický DFA</li><li><b>Test ekvivalence</b>: oba automaty zkanonizuj – L(A₁)=L(A₂) ⟺ jsou to <b>totožné</b> automaty</li></ul>" },

  { t: "reg",
    q: "Co říká Kleeneho věta a jaké jsou základní regulární výrazy?",
    a: "<b>Kleeneho věta: regulární výraz má stejnou vyjadřovací sílu jako konečný automat.</b><ul><li>Atomické: <b>∅, ε, a</b> (každý symbol je regex)</li><li>Operace: <b>sjednocení (+), zřetězení (.), Kleeneho hvězda (*)</b></li><li>Příklad: <code>(0|1).0*.1</code> = symbol, pak nuly, pak 1</li></ul>Využití: grep. RE i automaty popisují tutéž třídu (regulární jazyky)." },

  { t: "reg",
    q: "Jaký je rozdíl mezi L* (Kleeneho hvězda) a L⁺ (pozitivní iterace)?",
    a: "<ul><li><b>L*</b> – nula a více zřetězení, <b>vždy obsahuje ε</b> (L⁰ = {ε})</li><li><b>L⁺</b> – jedna a více zřetězení; <b>obsahuje ε jen tehdy, pokud ε ∈ L</b></li></ul>Obecně NEplatí L⁺ = L* − {ε}; rovnost platí jen když L neobsahuje ε." },

  { t: "reg",
    q: "Jak se převede automat na regulární výraz (GNFA, eliminace stavů)?",
    a: "<b>Pracuje se se zobecněným NFA (GNFA), kde hrany nesou celé regulární výrazy.</b><ol><li>Přidej nový počáteční a koncový stav (ε-přechody)</li><li>Postupně <b>odstraňuj mezilehlé stavy</b> a přechody nahrazuj regexy</li></ol>Pravidla: cestu E → F(smyčka) → G nahradíš <b>E·F*·G</b>; paralelní hrany E₁,…,Eₖ sloučíš do <b>(E₁+…+Eₖ)</b>." },

  { t: "reg",
    q: "Jak se sestrojí doplněk regulárního jazyka/výrazu?",
    a: "<b>Postup: regex → NFA → DFA (s totální přechodovou funkcí vč. chybového stavu) → prohození koncových a nekoncových stavů → zpět na regex.</b><ul><li><b>Klíčové</b>: DFA musí mít <b>totální</b> přechodovou funkci, jinak prohození stavů nedá správný doplněk</li></ul>" },

  { t: "reg",
    q: "CHYTÁK: Popisují DFA s jedním koncovým stavem všechny regulární jazyky?",
    a: "<b>NE pro DFA, ANO pro ε-NFA.</b><ul><li><b>ε-NFA s jedním koncovým stavem</b> – popisuje celou třídu regulárních jazyků (přidáme ε-přechody do jednoho koncového)</li><li><b>DFA s jedním koncovým stavem</b> – omezení, NEpopisuje všechny regulární jazyky</li></ul>DFA a NFA mají jinak stejnou sílu; minimalizace je polynomiální, determinizace až exponenciální." },

  { t: "reg",
    q: "CHYTÁK: Na co regulární jazyky NEjsou uzavřeny a co znamená uzavřenost?",
    a: "<ul><li><b>Uzavřenost</b> = <b>konečným počtem</b> operací na jazycích z třídy nevyrobím jazyk mimo třídu (pozor: jen konečným, ne nekonečným!)</li><li>Regulární jazyky <b>jsou</b> uzavřeny na sjednocení, průnik, doplněk, rozdíl, zřetězení, iteraci, reverzi</li><li><b>NEjsou</b> uzavřeny na <b>průnik s nekonečným (neregulárním) jazykem</b></li></ul>" }
);
