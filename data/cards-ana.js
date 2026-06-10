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
    a: "<b>Rovnice, která svazuje neznámou funkci s jejími derivacemi.</b><ul><li>Řešením je <b>funkce</b> (ne číslo)</li><li>Příklad: y' = y má řešení y = C·eˣ</li><li>Popisuje dynamické děje (růst populace, pohyb, ochlazování)</li><li><b>Diferenciální počet</b> obecně studuje derivace a jejich aplikace (extrémy, průběh funkce, aproximace)</li></ul>" }
);
