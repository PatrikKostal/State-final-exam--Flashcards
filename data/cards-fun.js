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
    a: "<b>Redukční krok = nahrazení části výrazu (redexu) podle definice funkce.</b> Strategie určuje, který redex redukovat první:<ul><li><b>Striktní (eager, aplikativní)</b> – nejdřív vyhodnotí <b>argumenty</b>, pak aplikuje funkci (call-by-value)</li><li><b>Normální (leftmost-outermost)</b> – nejdřív aplikuje <b>vnější funkci</b>, argumenty vyhodnotí až když jsou potřeba (call-by-name). Tuto strategii používá <b>Haskell</b> (s líným vyhodnocováním)</li><li><b>Líná (lazy)</b> – <b>pamatuje si již vyhodnocené výrazy</b> a žádný nevyhodnocuje opakovaně (sdílení). Umožňuje <b>nekonečná data</b>, ale nelze ji použít při <b>vedlejších efektech</b>. <b>Pozor:</b> líné vyhodnocování ≠ líná strategie</li></ul>" },

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
    a: "<ul><li>Haskell je <b>silně a staticky typovaný</b> s <b>odvozováním typů</b> (type inference)</li><li>Zápis typu: <code>f :: Int -&gt; Int</code>; typové třídy (<code>Num</code>, <code>Eq</code>) umožňují polymorfismus</li></ul><b>Nekonečný seznam jedniček</b> (díky lenosti):<br><code>ones = 1 : ones</code><br>nebo <code>ones = repeat 1</code>. Lze z něj brát konečně mnoho: <code>take 5 ones</code> → <code>[1,1,1,1,1]</code>." },

  { t: "fun",
    q: "Jaké jsou hlavní znaky funkcionálního paradigmatu?",
    a: "<ul><li><b>Deklarativní</b> – popisuje CO, ne JAK</li><li><b>Čisté funkce</b> – bez vedlejších efektů, stejný vstup → stejný výstup (referenční transparentnost)</li><li><b>Immutabilita</b> – data jsou neměnná, žádné přepisovatelné proměnné</li><li><b>Funkce vyšších řádů</b> jako stavební kameny</li></ul>Program = výraz, výpočet = jeho <b>redukce (zjednodušování)</b>." },

  { t: "fun",
    q: "Porovnej striktní, normální a línou redukční strategii na F(G(3)).",
    a: "<b>F(x)=x+8, G(x)=x·5:</b><ul><li><b>Striktní</b> (zevnitř, nejdřív argumenty): F(G(3)) → F(15) → 23. Používá Java, Python.</li><li><b>Normální</b> (zvenčí, nejdřív vnější funkce): F(G(3)) → G(3)+8 → 15+8 → 23.</li><li><b>Líná</b> = normální + <b>pamatuje si</b> vyhodnocené výrazy (nevyhodnocuje opakovaně). Umožňuje <b>nekonečná data</b>, nelze s vedlejšími efekty. Používá Haskell.</li></ul>" },

  { t: "fun",
    q: "Co říká Churchova–Rosserova věta?",
    a: "<b>Pokud výpočet výrazu skončí, je jeho výsledek vždy stejný bez ohledu na redukční strategii.</b><ul><li>Strategie se mohou lišit <b>délkou</b> výpočtu nebo tím, zda se <b>zacyklí</b></li><li>Ale výsledná hodnota (když výpočet skončí) je shodná</li></ul>" },

  { t: "fun",
    q: "Co je perpetualita a normalizace? Která strategie je nejbezpečnější?",
    a: "<ul><li><b>Perpetualita</b>: zacyklí-li se <b>jakákoli</b> strategie, zacyklí se i <b>striktní</b> → striktní je <b>nejméně bezpečná</b></li><li><b>Normalizace</b>: existuje-li <b>jakákoli</b> strategie, se kterou výpočet skončí, skončí i <b>normální</b> → normální je <b>nejbezpečnější</b></li></ul>CHYTÁK: zacyklí-li se striktní strategie, normální se <b>může</b> (ale nemusí) zacyklit." },

  { t: "fun",
    q: "Co jsou funkce vyšších řádů a uveď příklady (map, filter, fold)?",
    a: "<b>Funkce, které berou funkci jako argument nebo ji vracejí.</b><ul><li><code>map f [1,2,3]</code> – aplikuje f na každý prvek → <code>[f 1, f 2, f 3]</code></li><li><code>filter p xs</code> – ponechá prvky splňující predikát p</li><li><code>foldr/foldl</code> – složí seznam do jedné hodnoty</li></ul>Umožňují <b>abstrakci a znovupoužití kódu</b>. map i filter jsou funkce vyšších řádů." },

  { t: "fun",
    q: "Jaký je rozdíl mezi foldl a foldr?",
    a: "<b>Liší se směrem skládání (kam se hromadí závorky):</b><ul><li><b>foldl</b> – zleva: <code>foldl (−) 0 [2,3,2] = (((0−2)−3)−2) = −7</code></li><li><b>foldr</b> – zprava: <code>foldr (−) 0 [2,3,2] = (2−(3−(2−0))) = 1</code></li></ul>U <b>komutativních</b> operací (+, *, min) na směru nezáleží, u <b>nekomutativních</b> (−) ano. Varianty foldl1/foldr1 berou krajní prvek místo počáteční hodnoty." },

  { t: "fun",
    q: "Co je currying a částečná aplikace funkce?",
    a: "<ul><li><b>Currying</b> – funkce více argumentů je vnitřně <b>řetězec unárních funkcí</b>: <code>a -&gt; b -&gt; c</code></li><li><b>Částečná aplikace</b> – aplikace jen na část argumentů; <code>(+) 3</code> vrátí novou funkci čekající na druhý argument</li></ul>Pro předání více argumentů „najednou\" se používá <b>n-tice</b> a funkce <code>curry</code> / <code>uncurry</code>." },

  { t: "fun",
    q: "Co je lambda (nepojmenovaná) funkce a modifikátor flip?",
    a: "<ul><li><b>Lambda</b> – anonymní funkce definovaná v místě použití: <code>\\x -&gt; x*x</code>. Má <b>stejné chování i typy</b> jako pojmenovaná funkce.</li><li><b>flip</b> – prohodí pořadí parametrů: <code>flip f x y = f y x</code></li></ul>" },

  { t: "fun",
    q: "Jaké jsou základní typy v Haskellu?",
    a: "<b>Monomorfní typy:</b><ul><li><b>Int</b> – celé číslo do velikosti slova; <b>Integer</b> – libovolně velké</li><li><b>Float</b>, <b>Rational</b></li><li><b>Char</b> ('a'); <b>String</b> = <b>[Char]</b></li><li><b>Bool</b> – True / False</li></ul><b>Polymorfní typ</b> – typová proměnná (a, b) zastoupí libovolný typ: <code>fst :: (a,b) -&gt; a</code>." },

  { t: "fun",
    q: "Co jsou typové třídy v Haskellu?",
    a: "<b>Sdružují typy s podobnými vlastnostmi → umožňují sdílení kódu (ad-hoc polymorfismus).</b><ul><li><b>Eq</b> – porovnatelné na rovnost</li><li><b>Ord</b> – uspořádatelné</li><li><b>Num</b> – numerické, <b>Integral</b> – celočíselné</li><li><b>Show</b> / <b>Read</b> – převod na/z řetězce</li></ul>Kvalifikovaný typ: <code>odd :: Integral a =&gt; a -&gt; Bool</code>." },

  { t: "fun",
    q: "Jak se definuje vlastní typ (data) a co je pattern matching?",
    a: "<ul><li><b>Vlastní typ</b>: <code>data Dny = Po | Ut | St | ...</code> (vpravo hodnotové konstruktory); <code>data Maybe a = Nothing | Just a</code></li><li><b>Pattern matching</b> – mapování hodnoty na vzor: pro vzor <code>a@(x:t)</code> a seznam [1,2,3] je a=[1,2,3], x=1, t=[2,3]</li></ul>Umožňuje rozlišit báze a rekurzivní případy funkce." },

  { t: "fun",
    q: "Jak se pracuje se seznamy (cons, head/tail, ++)?",
    a: "<ul><li><b>Konstrukce</b> operátorem <code>(:)</code> (cons) – přidá prvek na začátek: <code>1:2:3:[]</code> = [1,2,3]</li><li><code>head</code> – první prvek, <code>tail</code> – zbytek; <code>null</code> – test prázdnosti</li><li><code>(++)</code> – spojení seznamů; <code>zip</code> – do dvojic; <code>concat</code> – zploštění</li></ul>Seznamy jsou <b>immutable</b> a vyhodnocují se <b>líně</b>." },

  { t: "fun",
    q: "Co jsou nekonečné a intenzionální seznamy?",
    a: "<ul><li><b>Nekonečné seznamy</b> (díky lenosti): <code>[1..]</code>, <code>cycle x = x ++ cycle x</code>, <code>iterate f z = z : iterate f (f z)</code>. Bereme z nich konečně: <code>take 4 (iterate (+1) 0)</code> = [0,1,2,3]</li><li><b>Intenzionální seznam</b> – definice pravidlem (generátorem): <code>[ 2*n | n &lt;- [0..9] ]</code></li></ul>" },

  { t: "fun",
    q: "Co je akumulátor jako programovací technika?",
    a: "<b>Technika, kdy předáváme průběžný výsledek dalším voláním → umožňuje nerealizovat rekurzivní návrat (tail rekurze).</b><ul><li>Místo skládání výsledku při návratu z rekurze ho budujeme „cestou dolů\"</li><li>Souvisí s <b>foldl</b> a koncovou rekurzí (úspora zásobníku)</li></ul>Příklad: faktoriál s akumulátorem fact(n, acc)." },

  { t: "fun",
    q: "CHYTÁK: Co znamená referenční transparentnost Haskellu?",
    a: "<b>Výraz lze vždy nahradit jeho hodnotou, aniž se změní chování programu</b> (čisté funkce bez vedlejších efektů).<ul><li>Důsledek (chyták z IS): „čistý\" Haskell sám o sobě neumí <b>vedlejší efekty</b> jako I/O bez monád – proto se říká, že nemůže „jen tak\" vytisknout součet</li><li>I/O se řeší <b>monádou IO</b></li></ul>Pořadí redukčních kroků <b>může ovlivnit, zda výpočet skončí</b>, ne ale výslednou hodnotu (Church-Rosser)." },

  { t: "fun",
    q: "Co je arita funkce a co je redex?",
    a: "<ul><li><b>Arita</b> – počet parametrů funkce: nulární (konstanta), unární, binární, ternární</li><li><b>Redex</b> – část výrazu, kterou lze redukovat (zjednodušit) podle definice funkce</li><li><b>Redukční krok</b> – nahrazení redexu jednodušším podvýrazem</li></ul>Výpočet končí, když ve výrazu není žádný redex (<b>normální forma</b>)." },

  { t: "fun",
    q: "Co jsou hodnotové a typové konstruktory?",
    a: "<b>Konstruktor skládá z menších částí větší celek.</b><ul><li><b>Hodnotový konstruktor</b> – skládá hodnoty (např. <code>Just 5</code>, <code>(1,2)</code>)</li><li><b>Typový konstruktor</b> – skládá typy (např. <code>Maybe Int</code>, <code>[Char]</code>)</li></ul>Stejná notace má jiný význam podle úrovně: <code>[(Char,Char)]</code> – závorky vlevo hodnotové, vpravo typové." },

  { t: "fun",
    q: "PŘÍKLAD: Proč se striktní strategie zacyklí na take 3 [1..]?",
    a: "<b>Funkce <code>take 3 [1..]</code> má vrátit první 3 prvky nekonečného seznamu.</b><ul><li><b>Striktní strategie</b> – nejdřív vyhodnotí argument <code>[1..]</code> (celý nekonečný seznam) → <b>zacyklí se</b></li><li><b>Normální/líná strategie</b> – aplikuje <code>take</code> nejdřív, vyhodnotí jen 3 prvky → <b>[1,2,3]</b></li></ul>Líné vyhodnocování umožňuje práci s nekonečnými strukturami." },

  { t: "fun",
    q: "Jaký je rozdíl mezi imperativním a deklarativním přístupem na příkladu?",
    a: "<b>Suma seznamu:</b><ul><li><b>Imperativní</b>: <code>s=0; for x in xs: s+=x</code> – mění stav proměnné, popisuje JAK</li><li><b>Deklarativní (funkcionální)</b>: <code>foldr (+) 0 xs</code> nebo <code>sum xs</code> – popisuje CO, žádný měnitelný stav</li></ul>Funkcionální kód se skládá z funkcí vyšších řádů, je bez vedlejších efektů." }
);
