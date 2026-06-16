// 2. Základy matematické analýzy (MB142)
// Otázka pro státnice PVA – flashcards k tématu "Matematická analýza".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.ana = { label: "📈 Matematická analýza", cls: "tag-ana", order: 2 };

FC.cards.push(
  { t: "ana",
    q: "Co je relace a co zobrazení (funkce)?",
    a: "<ul><li><b>Relace</b> (binární) – libovolná <b>podmnožina kartézského součinu</b> A × B (množina uspořádaných dvojic). Obecně n-ární relace ⊆ A₁×…×Aₙ.</li><li><b>Zobrazení / funkce</b> – relace, která <b>každému prvku z definičního oboru přiřadí nejvýše jeden</b> prvek z oboru hodnot. <b>Totální funkce</b> přiřadí každému prvku právě jeden (definovaná všude).</li></ul>" },

  { t: "ana",
    q: "Jaké jsou základní vlastnosti reálných funkcí?",
    a: "<ul><li><b>Monotonie</b> – rostoucí / klesající (nerostoucí, neklesající)</li><li><b>Ohraničenost</b> – shora/zdola/oboustranně</li><li><b>Parita</b> – sudá (f(−x)=f(x)), lichá (f(−x)=−f(x))</li><li><b>Prostota (injektivita)</b> – různé vstupy → různé výstupy</li><li><b>Periodičnost</b>, spojitost, definiční obor a obor hodnot</li></ul>Polynom = funkce tvaru aₙxⁿ+…+a₁x+a₀; stupeň = nejvyšší mocnina." },

  { t: "ana",
    q: "Co znamená, že je funkce spojitá? (formální definice)",
    a: "<b>Funkce f je spojitá v bodě a, pokud limita v bodě a existuje a rovná se funkční hodnotě:</b> lim<sub>x→a</sub> f(x) = f(a).<ul><li>Epsilon-delta: ∀ε&gt;0 ∃δ&gt;0: |x−a|&lt;δ ⟹ |f(x)−f(a)|&lt;ε</li><li>Intuitivně: <b>graf lze nakreslit jedním tahem</b> bez zvednutí tužky (žádné skoky/díry)</li><li>Funkce spojitá na uzavřeném intervalu nabývá max/min (Weierstrass) a všech mezihodnot (Bolzano)</li></ul>" },

  { t: "ana",
    q: "Co je limita funkce? (epsilon-delta a geometrický význam)",
    a: "<b>lim<sub>x→a</sub> f(x) = L:</b> hodnoty f(x) se libovolně blíží L, když se x blíží a.<ul><li><b>Formálně</b>: ∀ε&gt;0 ∃δ&gt;0: 0&lt;|x−a|&lt;δ ⟹ |f(x)−L|&lt;ε</li><li><b>Geometricky</b>: ať zvolíme jakkoli úzký pás ±ε kolem L, existuje okolí ±δ kolem a, kde graf v tomto pásu zůstává</li><li>Limita popisuje chování funkce <b>v okolí bodu</b>, ne nutně v bodě samém</li></ul>" },

  { t: "ana",
    q: "Co je derivace a jaký má význam?",
    a: "<b>Derivace f'(a) = lim<sub>h→0</sub> (f(a+h) − f(a)) / h</b> – okamžitá rychlost změny funkce.<ul><li><b>Geometricky</b>: směrnice <b>tečny</b> ke grafu v bodě a</li><li>f' &gt; 0 → funkce roste, f' &lt; 0 → klesá, f' = 0 → kandidát na extrém</li><li>Druhá derivace popisuje konvexitu/konkávitu</li></ul>Příklady: (xⁿ)' = n·xⁿ⁻¹, (sin x)' = cos x." },

  { t: "ana",
    q: "Co je neurčitý a určitý integrál a jaký mají geometrický význam?",
    a: "<ul><li><b>Neurčitý integrál</b> ∫f(x)dx = F(x) + C – množina <b>primitivních funkcí</b> (F' = f), inverze k derivaci</li><li><b>Určitý integrál</b> ∫<sub>a</sub><sup>b</sup> f(x)dx = F(b) − F(a) (Newton–Leibniz) – číslo</li></ul><b>Geometrický význam určitého integrálu</b>: <b>obsah orientované plochy</b> mezi grafem a osou x (nad osou +, pod osou −). Příklad: ∫<sub>0</sub><sup>2π</sup> sin x dx = 0 (kladná a záporná část se vyruší)." },

  { t: "ana",
    q: "Co je diferenciální rovnice?",
    a: "<b>Rovnice, která svazuje neznámou funkci s jejími derivacemi.</b><ul><li>Řešením je <b>funkce</b> (ne číslo)</li><li>Příklad: y' = y má řešení y = C·eˣ</li><li>Popisuje dynamické děje (růst populace, pohyb, ochlazování)</li><li><b>Diferenciální počet</b> obecně studuje derivace a jejich aplikace (extrémy, průběh funkce, aproximace)</li></ul>" },

  { t: "ana",
    q: "Jak se klasifikují relace podle arity?",
    a: "<b>Relace mezi A₁,…,Aₖ je libovolná podmnožina kartézského součinu R ⊆ A₁×…×Aₖ.</b> Podle počtu množin (arity):<ul><li><b>Unární</b> (k=1) – podmnožina množiny M</li><li><b>Binární</b> (k=2) – množina uspořádaných dvojic</li><li><b>Ternární</b> (k=3) – uspořádané trojice</li><li>obecně <b>n-ární</b></li></ul>" },

  { t: "ana",
    q: "Jaký je rozdíl mezi injektivním, surjektivním a bijektivním zobrazením?",
    a: "<b>Podle toho, kolika prvky definičního oboru je mapován prvek oboru hodnot:</b><ul><li><b>Injektivní (prosté)</b> – <b>nejvýše</b> jedním (různé vstupy → různé výstupy)</li><li><b>Surjektivní (na)</b> – <b>alespoň</b> jedním (celý obor hodnot je pokryt)</li><li><b>Bijektivní</b> – <b>právě</b> jedním (injektivní i surjektivní)</li></ul>Zobrazení lze <b>skládat</b>: (f∘g)(x) = f(g(x))." },

  { t: "ana",
    q: "Co je totální, parciální a inverzní funkce?",
    a: "<ul><li><b>Totální funkce</b> – má definovanou hodnotu pro <b>každý</b> prvek definičního oboru</li><li><b>Parciální funkce</b> – nemusí být definovaná všude</li><li><b>Inverzní funkce</b> – prohazuje definiční obor a obor hodnot; <b>existuje pouze pro injektivní (prostou) funkci</b></li></ul>" },

  { t: "ana",
    q: "Co znamená, že funkce je sudá, lichá nebo periodická?",
    a: "<ul><li><b>Sudá</b>: f(x) = f(−x) – souměrná podle osy y</li><li><b>Lichá</b>: −f(x) = f(−x) – souměrná podle počátku</li><li><b>Periodická</b>: f(x + p) = f(x) pro periodu p</li></ul>Jediná funkce sudá i lichá zároveň je f(x)=0. Součet lichých funkcí je lichý, součet sudých je sudý." },

  { t: "ana",
    q: "Co znamená, že je funkce omezená (shora/zdola)?",
    a: "<ul><li><b>Shora omezená</b>: ∃ A ∈ ℝ tak, že pro všechna x platí f(x) &lt; A</li><li><b>Zdola omezená</b>: ∃ A ∈ ℝ tak, že f(x) &gt; A pro všechna x</li><li><b>Omezená</b> = shora i zdola</li></ul>Souvisí se supremem/infimem oboru hodnot." },

  { t: "ana",
    q: "Co určujeme z první derivace (monotonie, extrémy)?",
    a: "<ul><li><b>f' &gt; 0</b> → funkce <b>roste</b>; <b>f' &lt; 0</b> → <b>klesá</b>; <b>f' = 0</b> → stacionární bod</li><li><b>Ryze monotónní</b> = buď rostoucí, nebo klesající na celém intervalu</li><li><b>Lokální extrém</b> nastává ve stacionárním bodě, kde se mění směr růstu</li></ul>Tečna ke grafu má v daném bodě směrnici f'(x); je-li f'=0, je tečna rovnoběžná s osou x." },

  { t: "ana",
    q: "Co určujeme z druhé derivace (konvexita, inflexe)?",
    a: "<ul><li><b>f'' &gt; 0</b> → funkce je <b>konvexní</b> (prohnutí nahoru, „údolí\")</li><li><b>f'' &lt; 0</b> → <b>konkávní</b> (prohnutí dolů, „kopec\")</li><li><b>Inflexní bod</b> – kde se konvexnost a konkávnost střídá; platí f''(x)=0 a zároveň f'''(x)≠0</li><li>Test extrému: f''(x)&lt;0 → lokální maximum, f''(x)&gt;0 → lokální minimum</li></ul>" },

  { t: "ana",
    q: "Co je polynom a jak se hledají jeho kořeny (Hornerovo schéma)?",
    a: "<b>P(x) = aₙxⁿ + … + a₁x + a₀, kde aₙ ≠ 0.</b> Kořen = x, pro které P(x)=0.<ul><li><b>Celočíselné kořeny</b> mohou být jen <b>dělitelé absolutního členu a₀</b></li><li><b>Hornerovo schéma</b> – efektivně vyčíslí P v bodě a zároveň vydělí (x−kořen); umožní rozklad na kořenové činitele</li></ul>Derivace nekonstantního polynomu je <b>vždy polynom nižšího řádu</b>." },

  { t: "ana",
    q: "Jaká je formální (okolíková) definice limity a kdy limita existuje?",
    a: "<b>lim_{x→x₀} f(x) = L</b>: pro každé okolí O(L) existuje okolí O(x₀) tak, že pro všechna x ∈ O(x₀)∖{x₀} je f(x) ∈ O(L).<ul><li>Funkce má v bodě <b>nejvýše jednu</b> limitu</li><li><b>Limita existuje ⟺ obě jednostranné limity existují a jsou si rovny</b>: lim⁻ = lim⁺ = L</li><li><b>Vlastní</b> = konečné číslo, <b>nevlastní</b> = ±∞</li></ul>" },

  { t: "ana",
    q: "Jaká je definice spojitosti funkce v bodě?",
    a: "<b>Funkce f je spojitá v x₀, pokud existuje vlastní limita, existuje f(x₀) a jsou si rovny:</b> lim_{x→x₀} f(x) = f(x₀).<ul><li>Spojitost zachovává operace: f±g, f·g, f/g (pro g≠0) i složení spojitých funkcí</li><li><b>Má-li funkce v bodě derivaci, je tam spojitá</b> (opačně ne!)</li></ul>" },

  { t: "ana",
    q: "Jaké jsou druhy bodů nespojitosti?",
    a: "<ul><li><b>Odstranitelná nespojitost</b> – obě jednostranné limity stejné, ale ≠ f(a) (nebo f(a) nedefinováno); lze dodefinovat</li><li><b>Nespojitost 1. druhu (skok)</b> – jednostranné limity se <b>liší</b> (obě vlastní)</li><li><b>Nespojitost 2. druhu</b> – alespoň jedna jednostranná limita je <b>nevlastní</b> (±∞)</li></ul>" },

  { t: "ana",
    q: "Co je závora, supremum a infimum množiny?",
    a: "<ul><li><b>Horní závora</b> – prvek ≥ všechny prvky množiny; <b>dolní závora</b> – ≤ všechny. Nemusí být prvkem množiny.</li><li><b>Supremum</b> = <b>nejmenší horní závora</b></li><li><b>Infimum</b> = <b>největší dolní závora</b></li></ul>Příklad: pro (0,1) je supremum 1, infimum 0 (ani jedno není prvkem množiny)." },

  { t: "ana",
    q: "Jaká je definice derivace a její geometrický význam?",
    a: "<b>f'(x₀) = lim_{x→x₀} (f(x) − f(x₀)) / (x − x₀).</b><ul><li><b>Geometricky</b>: směrnice (sklon) <b>tečny</b> ke grafu v bodě x₀</li><li>Limitní přechod od sečny (dva body) k tečně (body splynou)</li><li>Fyzikálně: rychlost = derivace dráhy, zrychlení = derivace rychlosti</li></ul>" },

  { t: "ana",
    q: "Jaká jsou pravidla pro derivování (součin, podíl, složená funkce)?",
    a: "<ul><li><b>Linearita</b>: (af + bg)' = af' + bg'</li><li><b>Součin</b>: <b>(f·g)' = f'g + fg'</b></li><li><b>Podíl</b>: <b>(f/g)' = (f'g − fg') / g²</b></li><li><b>Složená funkce (řetízkové pravidlo)</b>: <b>[h(g(x))]' = h'(g(x)) · g'(x)</b></li></ul>" },

  { t: "ana",
    q: "Jaké jsou derivace základních funkcí?",
    a: "<ul><li><b>(xⁿ)' = n·xⁿ⁻¹</b>, (c)' = 0</li><li><b>(eˣ)' = eˣ</b>, (aˣ)' = aˣ·ln a</li><li><b>(ln x)' = 1/x</b></li><li><b>(sin x)' = cos x</b>, <b>(cos x)' = −sin x</b></li><li>(tg x)' = 1/cos²x, (cotg x)' = −1/sin²x</li><li>(arctg x)' = 1/(1+x²), (arcsin x)' = 1/√(1−x²)</li></ul>" },

  { t: "ana",
    q: "Jaké jsou důležité základní limity?",
    a: "<ul><li><b>lim_{x→0} (sin x)/x = 1</b></li><li><b>lim_{x→0} (eˣ−1)/x = 1</b></li><li>lim_{x→0} ln(1+x)/x = 1</li><li>lim_{x→0} (1−cos x)/x = 0</li><li><b>lim_{n→∞} (1 + 1/n)ⁿ = e</b></li></ul>" },

  { t: "ana",
    q: "Co je l'Hospitalovo pravidlo a kdy se použije?",
    a: "<b>Pro neurčité výrazy typu 0/0 nebo ∞/∞:</b> lim f(x)/g(x) = lim f'(x)/g'(x).<ul><li>Musí platit právě jeden z případů: lim f = lim g = 0, nebo obě limity = ±∞</li><li>Funkce musí být nenulové v okolí bodu</li><li>Lze opakovat, dokud výraz zůstává neurčitý</li></ul>Jiné neurčité tvary (∞−∞, 0·∞) se nejprve upraví na zlomek." },

  { t: "ana",
    q: "Co je Taylorův polynom a k čemu slouží?",
    a: "<b>Polynomiální aproximace funkce v okolí bodu x₀.</b><ul><li>T(x) = f(x₀) + f'(x₀)(x−x₀) + f''(x₀)/2!·(x−x₀)² + … + f⁽ⁿ⁾(x₀)/n!·(x−x₀)ⁿ</li><li>Všechny derivace do stupně n se ve středu shodují s funkcí</li><li>Pro střed x₀=0 se nazývá <b>Maclaurinova řada</b></li></ul>" },

  { t: "ana",
    q: "Co je diferenciál funkce a Rolleova věta?",
    a: "<ul><li><b>Diferenciál</b>: df(x₀) = f'(x₀)·h, tj. dy = f'(x)·dx – přírůstek funkční hodnoty <b>po tečně</b></li><li><b>Rolleova věta</b>: je-li f spojitá na [a,b], má derivaci na (a,b) a f(a)=f(b), pak existuje bod, kde <b>f'=0</b> (tečna rovnoběžná s osou x)</li><li><b>Parciální derivace</b> – u funkce více proměnných derivujeme podle jedné, ostatní bereme jako konstanty</li></ul>" },

  { t: "ana",
    q: "Jaký je rozdíl mezi určitým a neurčitým integrálem?",
    a: "<ul><li><b>Určitý integrál</b> ∫ₐᵇ f(x)dx – <b>číslo</b>, orientovaná plocha mezi grafem a osou x na [a,b]; = F(b) − F(a)</li><li><b>Neurčitý integrál</b> ∫ f(x)dx = F(x) + C – <b>množina primitivních funkcí</b> (F' = f), inverze k derivaci</li></ul><b>CHYTÁK</b>: ∫ derivace funkce f má tvar <b>f + C</b> (ne přesně f, kvůli konstantě)." },

  { t: "ana",
    q: "Jak funguje integrace per partes a substitucí?",
    a: "<ul><li><b>Per partes</b>: ∫ u'·v dx = u·v − ∫ u·v' dx (pro součiny, např. x·cos x, x·ln x)</li><li><b>Substituce</b>: ∫ f(φ(x))·φ'(x) dx = ∫ f(t) dt, kde t = φ(x)</li></ul>Příklad substituce: ∫ 2x/(x²+1)² dx, t=x²+1, dt=2x dx → ∫ t⁻² dt = −1/(x²+1) + C." },

  { t: "ana",
    q: "CHYTÁK: Jaký je vztah spojitosti a derivace?",
    a: "<b>Má-li funkce v bodě derivaci, pak je v tomto bodě spojitá.</b><ul><li>Obrácená implikace <b>neplatí</b> – spojitá funkce nemusí mít derivaci (např. |x| v bodě 0 má „špičku\")</li><li>Tedy: derivace ⟹ spojitost, ale ne naopak</li></ul>" }
);
