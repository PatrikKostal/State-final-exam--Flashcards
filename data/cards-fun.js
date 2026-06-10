// 8. Funkcionální programování (IB015)
// Otázka pro státnice PVA – flashcards k tématu "Funkcionální programování".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.fun = { label: "λ Funkcionální programování", cls: "tag-fun", order: 8 };

FC.cards.push(
  { t: "fun",
    q: "Jaký je princip výpočtu ve funkcionálním programování a rozdíl imperativní vs deklarativní?",
    a: "<ul><li><b>Imperativní</b> – popisuje <b>JAK</b> (posloupnost příkazů měnících stav, proměnné, cykly)</li><li><b>Deklarativní / funkcionální</b> – popisuje <b>CO</b> se má spočítat (vyhodnocování výrazů, žádný měnitelný stav)</li></ul>Výpočet = <b>postupné zjednodušování (redukce) výrazu</b> aplikací funkcí. Funkce jsou <b>čisté</b> (bez vedlejších efektů), data <b>neměnná</b>." },

  { t: "fun",
    q: "Co je redukční krok a jaké jsou redukční strategie?",
    a: "<b>Redukční krok = nahrazení části výrazu (redexu) podle definice funkce.</b> Strategie určuje, který redex redukovat první:<ul><li><b>Striktní (eager, aplikativní)</b> – nejdřív vyhodnotí <b>argumenty</b>, pak aplikuje funkci (call-by-value)</li><li><b>Normální (líná, leftmost-outermost)</b> – nejdřív aplikuje <b>vnější funkci</b>, argumenty vyhodnotí až když jsou potřeba (call-by-name)</li></ul>" },

  { t: "fun",
    q: "Jaká je vlastnost normální vs striktní strategie? (příklad zacyklení)",
    a: "<b>Normální strategie je „normalizující\":</b> pokud výraz má normální formu (výsledek), normální strategie ji najde – striktní nemusí.<ul><li>Příklad: <code>const x y = x</code> a nekonečný výraz <code>loop = loop</code></li><li><code>const 1 loop</code>: <b>striktní</b> se snaží vyhodnotit <code>loop</code> → <b>zacyklí se</b>; <b>normální</b> rovnou vrátí <code>1</code></li></ul>" },

  { t: "fun",
    q: "Jaká je nevýhoda normální strategie a co je líné vyhodnocování?",
    a: "<b>Nevýhoda normální strategie: argument může být vyhodnocen vícekrát</b> (pokud se ve funkci použije opakovaně).<ul><li>Řešení: <b>líné vyhodnocování (lazy evaluation)</b> – normální strategie + <b>sdílení</b> (každý výraz se vyhodnotí <b>nejvýše jednou</b>, výsledek se zapamatuje)</li><li>Používá ho <b>Haskell</b>; umožňuje <b>nekonečné datové struktury</b></li></ul>" },

  { t: "fun",
    q: "Co jsou funkce vyšších řádů a jak implementovat map?",
    a: "<b>Funkce, která bere funkci jako argument nebo ji vrací.</b> Klasické: <b>map, filter, fold (reduce)</b>.<ul><li><b>map</b> aplikuje funkci na každý prvek seznamu</li></ul>V Haskellu:<br><code>map :: (a -&gt; b) -&gt; [a] -&gt; [b]</code><br><code>map _ [] = []</code><br><code>map f (x:xs) = f x : map f xs</code>" },

  { t: "fun",
    q: "Co jsou nepojmenované (lambda) funkce?",
    a: "<b>Funkce bez jména, definovaná „na místě\".</b><ul><li>Haskell: <code>\\x -&gt; x + 1</code> (přičti 1)</li><li>Užitečné jako argumenty funkcí vyšších řádů: <code>map (\\x -&gt; x*x) [1,2,3]</code> → <code>[1,4,9]</code></li><li>Vychází z <b>lambda kalkulu</b> – teoretického základu funkcionálního programování</li></ul>" },

  { t: "fun",
    q: "Jak fungují typy v Haskellu a jak napsat nekonečný seznam jedniček?",
    a: "<ul><li>Haskell je <b>silně a staticky typovaný</b> s <b>odvozováním typů</b> (type inference)</li><li>Zápis typu: <code>f :: Int -&gt; Int</code>; typové třídy (<code>Num</code>, <code>Eq</code>) umožňují polymorfismus</li></ul><b>Nekonečný seznam jedniček</b> (díky lenosti):<br><code>ones = 1 : ones</code><br>nebo <code>ones = repeat 1</code>. Lze z něj brát konečně mnoho: <code>take 5 ones</code> → <code>[1,1,1,1,1]</code>." }
);
