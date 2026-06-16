// 3. Popisná statistika (MB143)
// Otázka pro státnice PVA – flashcards k tématu "Popisná statistika".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.stat = { label: "📊 Popisná statistika", cls: "tag-stat", order: 3 };

FC.cards.push(
  { t: "stat",
    q: "Co je střední hodnota (průměr) a co vyjadřuje?",
    a: "<b>Aritmetický průměr: x̄ = (1/n) Σ xᵢ.</b> Pro náhodnou veličinu <b>E[X] = Σ xᵢ·P(xᵢ)</b> (vážený průměr hodnot pravděpodobnostmi).<ul><li>Vyjadřuje \"těžiště\" dat / očekávanou hodnotu</li><li><b>Citlivá na odlehlé hodnoty</b> (outliers)</li></ul>Příklad: průměr z {2, 4, 9} = (2+4+9)/3 = 5." },

  { t: "stat",
    q: "Co je medián a jak se liší od průměru?",
    a: "<b>Prostřední hodnota seřazených dat</b> (u sudého počtu průměr dvou prostředních).<ul><li>Dělí data na dvě poloviny (50% kvantil)</li><li><b>Odolný vůči odlehlým hodnotám</b> – na rozdíl od průměru</li></ul>Příklad: medián z {1, 2, 100} = 2 (zatímco průměr = 34,3 je zkreslený outlierem)." },

  { t: "stat",
    q: "Co je rozptyl a směrodatná odchylka?",
    a: "<b>Rozptyl = průměr kvadrátů odchylek od střední hodnoty:</b> σ² = (1/n) Σ (xᵢ − x̄)².<ul><li>Měří <b>rozptýlenost (variabilitu)</b> dat kolem průměru</li><li><b>Směrodatná odchylka σ = √rozptyl</b> – ve stejných jednotkách jako data</li></ul>Příklad pro {2,4,6}, x̄=4: σ² = ((−2)²+0²+2²)/3 = 8/3 ≈ 2,67." },

  { t: "stat",
    q: "Co je korelace a jaké nabývá hodnot?",
    a: "<b>Míra lineárního vztahu mezi dvěma veličinami.</b> Korelační koeficient r ∈ <b>⟨−1, 1⟩</b>:<ul><li><b>r = 1</b> – dokonalá rostoucí lineární závislost (body na přímce vzhůru)</li><li><b>r = −1</b> – dokonalá klesající</li><li><b>r = 0</b> – žádná lineární závislost (např. náhodný mrak bodů)</li></ul><b>Pozor:</b> korelace ≠ kauzalita; nezachytí nelineární vztahy." },

  { t: "stat",
    q: "Co je distribuční funkce a funkce hustoty pravděpodobnosti?",
    a: "<ul><li><b>Distribuční funkce F(x) = P(X ≤ x)</b> – pravděpodobnost, že veličina nepřekročí x. Je <b>neklesající</b>, zleva/zprava spojitá, jde od 0 do 1. U diskrétní veličiny je <b>schodovitá</b>, u spojité <b>hladká</b>.</li><li><b>Hustota pravděpodobnosti f(x)</b> (spojitá veličina) – <b>derivace distribuční funkce</b> (F'(x) = f(x)); pravděpodobnost = obsah pod hustotou na intervalu. Celkový obsah = 1.</li></ul>" },

  { t: "stat",
    q: "Co je náhodná veličina a jaká znáš rozdělení?",
    a: "<b>Náhodná veličina</b> přiřazuje výsledkům náhodného pokusu čísla.<ul><li><b>Diskrétní</b>: <b>binomické</b> (počet úspěchů v n pokusech), Poissonovo, rovnoměrné (kostka)</li><li><b>Spojité</b>: <b>normální (Gaussovo)</b>, rovnoměrné, exponenciální</li></ul><b>Binomické</b>: P(k úspěchů) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ." },

  { t: "stat",
    q: "Proč se normální rozdělení jmenuje „normální“ a jak vypadá?",
    a: "<b>Gaussova křivka – symetrický „zvon“ kolem střední hodnoty μ s šířkou danou σ.</b><ul><li>Jmenuje se „normální“, protože <b>přirozeně vzniká</b> všude, kde se sčítá mnoho malých nezávislých vlivů (<b>centrální limitní věta</b>) – je to „normální/typický“ stav</li><li>Pravidlo <b>68–95–99,7 %</b> dat leží v ±1σ / ±2σ / ±3σ</li></ul>" },

  { t: "stat",
    q: "Co jsou odhady statistik a jejich spolehlivost?",
    a: "<b>Z výběru (vzorku) odhadujeme parametry celé populace.</b><ul><li><b>Bodový odhad</b> – jediná hodnota (výběrový průměr odhaduje μ)</li><li><b>Intervalový odhad (interval spolehlivosti)</b> – interval, v němž parametr leží s danou pravděpodobností (např. 95 %)</li><li>Větší vzorek → <b>užší interval, vyšší spolehlivost</b> odhadu</li></ul>" },

  { t: "stat",
    q: "Jaké jsou vzorce pro variace, kombinace a permutace (bez/s opakováním)?",
    a: "<table><tr><td></td><td><b>bez opakování</b></td><td><b>s opakováním</b></td></tr><tr><td><b>Variace</b></td><td>n!/(n−k)!</td><td>nᵏ</td></tr><tr><td><b>Kombinace</b></td><td>C(n,k)=n!/(k!(n−k)!)</td><td>C(n+k−1, k)</td></tr><tr><td><b>Permutace</b></td><td>n!</td><td>n!/(k₁!·k₂!…)</td></tr></table><ul><li><b>Variace</b> – záleží na pořadí; <b>kombinace</b> – nezáleží na pořadí</li></ul>Anagramy BANANA = 6!/(3!·2!·1!) = 60." },

  { t: "stat",
    q: "Jaký je vzorec pro aritmetický a vážený průměr?",
    a: "<ul><li><b>Aritmetický průměr</b>: x̄ = (1/n)·Σ xᵢ</li><li><b>Vážený průměr</b>: x̄ = (Σ xᵢwᵢ) / (Σ wᵢ)</li></ul>Vlastnosti: součet všech odchylek od průměru = 0; průměr je <b>citlivý na extrémní hodnoty</b> (velký rozptyl ho znehodnotí)." },

  { t: "stat",
    q: "Jak je definovaný medián a modus?",
    a: "<ul><li><b>Medián</b> – prostřední hodnota (2. kvartil / 50. percentil); pro spojitou veličinu splňuje ∫_{−∞}^m f(x)dx = 1/2. <b>Odolný vůči extrémům.</b></li><li><b>Modus</b> – nejčastější hodnota (s největší pravděpodobností)</li></ul>CHYTÁK: medián může být i <b>větší</b> než průměr (záleží na zešikmení dat); a nemusí být prvkem souboru." },

  { t: "stat",
    q: "Co jsou kvantily, kvartily a jak souvisí s boxplotem?",
    a: "<b>Kvantily dělí seřazená data na části daného poměru.</b><ul><li><b>Q1 (dolní kvartil)</b> = 25. percentil</li><li><b>Q2 (medián)</b> = 50. percentil</li><li><b>Q3 (horní kvartil)</b> = 75. percentil</li><li>min = 0%, max = 100%</li></ul>Boxplot zobrazuje min, Q1, medián, Q3, max (krabice = mezikvartilové rozpětí)." },

  { t: "stat",
    q: "Jaký je vzorec pro střední hodnotu E[X] (diskrétní i spojitá)?",
    a: "<b>E[X] – vážený průměr hodnot pravděpodobnostmi (očekávaná hodnota):</b><ul><li><b>Diskrétní</b>: E[X] = Σ xᵢ·P(X=xᵢ)</li><li><b>Spojitá</b>: E[X] = ∫ x·f(x) dx</li></ul><b>Linearita</b>: E[aX + b] = a·E[X] + b. (Příklad: E[X]=2 → E[2X−1] = 3.)<br>Průměr se počítá z dat, střední hodnota z pravděpodobností." },

  { t: "stat",
    q: "Jaký je vzorec pro rozptyl Var(X) a směrodatnou odchylku?",
    a: "<b>Rozptyl = střední hodnota kvadrátů odchylek od střední hodnoty:</b><ul><li><b>Var(X) = E[(X − E[X])²] = E[X²] − (E[X])²</b> (výpočetní vzorec)</li><li>Diskrétní: Σ (xᵢ − E[X])²·P(X=xᵢ); spojitá: ∫ (x − E[X])²·f(x) dx</li><li><b>Směrodatná odchylka σ = √Var(X)</b> – ve stejných jednotkách jako data</li></ul>" },

  { t: "stat",
    q: "Co je kovariance a jaký je její vztah ke korelaci?",
    a: "<ul><li><b>Kovariance</b>: Cov(X,Y) = E[(X−E X)(Y−E Y)] = E[XY] − E[X]·E[Y]. Určuje <b>směr</b> lineárního vztahu (+ / − / 0), ne sílu.</li><li><b>Korelační koeficient</b>: ρ = Cov(X,Y) / (√Var(X)·√Var(Y)) ∈ [−1, 1] – kovariance dělená součinem směrodatných odchylek, měří <b>sílu</b> lineárního vztahu</li></ul><b>Kovarianční matice</b> má na diagonále rozptyly, mimo kovariance." },

  { t: "stat",
    q: "Jaké jsou Kolmogorovovy axiomy pravděpodobnosti a co je pravděpodobnostní prostor?",
    a: "<b>P: A → [0,1] je pravděpodobnostní míra, pokud:</b><ul><li><b>P(Ω) = 1</b></li><li>pro disjunktní jevy: <b>P(∪Aᵢ) = Σ P(Aᵢ)</b> (σ-aditivita)</li></ul><b>Pravděpodobnostní prostor</b> = trojice <b>(Ω, A, P)</b>: Ω = elementární jevy, A = jevové pole (σ-algebra), P = míra. Vlastnosti: P(∅)=0, P(Ā)=1−P(A)." },

  { t: "stat",
    q: "Kdy jsou jevy nezávislé a jaký je vzorec pro sjednocení?",
    a: "<ul><li><b>Nezávislé jevy</b>: P(A∩B) = P(A)·P(B). Pak také P(A|B) = P(A).</li><li><b>Sjednocení</b>: P(A∪B) = P(A) + P(B) − P(A∩B)</li><li><b>Neslučitelné</b> jevy: P(A∩B) = 0</li></ul>Pravděpodobnost (příznivé/všechny) ≠ šance (příznivé/nepříznivé)." },

  { t: "stat",
    q: "Jaký je vzorec pro podmíněnou pravděpodobnost a Bayesovu větu?",
    a: "<ul><li><b>Podmíněná pravděpodobnost</b>: P(A|B) = P(A∩B) / P(B) – pravděpodobnost A za předpokladu, že nastal B</li><li><b>Bayesova věta</b>: <b>P(A|B) = P(B|A)·P(A) / P(B)</b> – vztah mezi opačnými podmíněnými pravděpodobnostmi</li><li><b>Úplná pravděpodobnost</b>: P(B) = Σ P(B|Aᵢ)·P(Aᵢ)</li></ul>" },

  { t: "stat",
    q: "Co říká zákon velkých čísel a centrální limitní věta?",
    a: "<ul><li><b>Zákon velkých čísel (LLN)</b> – průměr velkého počtu nezávislých pokusů konverguje ke <b>střední hodnotě μ</b></li><li><b>Centrální limitní věta (CLV)</b> – součet/průměr mnoha nezávislých stejně rozdělených veličin má <b>přibližně normální rozdělení</b> N(0,1) po standardizaci, <b>nezávisle</b> na původním rozdělení</li></ul>CLV vysvětluje, proč je normální rozdělení tak všudypřítomné." },

  { t: "stat",
    q: "Co je distribuční funkce náhodné veličiny a jaké má vlastnosti?",
    a: "<b>F(x) = P(X ≤ x)</b>, ℝ → [0,1].<ul><li>Je <b>neklesající</b> a <b>zprava spojitá</b>, jde od 0 do 1</li><li>Jednoznačně určuje rozdělení (dvě veličiny se stejnou F jsou stejně rozdělené)</li><li><b>CHYTÁK</b>: u <b>diskrétní</b> veličiny je distribuční funkce <b>schodovitá → nespojitá</b></li></ul><b>Hustota</b> f(x) = F'(x) je spojitá obdoba rozdělení pravděpodobnosti." },

  { t: "stat",
    q: "Binomické a alternativní (Bernoulli) rozdělení – vzorec, E, Var?",
    a: "<ul><li><b>Alternativní (Bernoulli)</b>: P(X=1)=p, P(X=0)=1−p. E[X]=p, Var=p(1−p)</li><li><b>Binomické Bin(n,p)</b>: počet úspěchů v n nezávislých pokusech. P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ</li></ul><b>E[X] = np</b>, <b>Var(X) = np(1−p)</b>." },

  { t: "stat",
    q: "Poissonovo rozdělení – vzorec a parametry?",
    a: "<b>Poisson(λ) – počet výskytů vzácného jevu za interval.</b><ul><li>P(X=k) = e^(−λ)·λᵏ / k!, pro k = 0,1,2,…</li><li><b>E[X] = λ</b>, <b>Var(X) = λ</b> (střední hodnota = rozptyl)</li></ul>Aproximuje binomické rozdělení pro velké n a malé p (λ = np)." },

  { t: "stat",
    q: "Geometrické a rovnoměrné diskrétní rozdělení?",
    a: "<ul><li><b>Geometrické</b> – počet neúspěchů před prvním úspěchem: P(X=k) = p·(1−p)ᵏ. E[X] = (1−p)/p</li><li><b>Rovnoměrné diskrétní</b> – n hodnot se stejnou pravděpodobností: P(X=xᵢ) = 1/n (např. kostka)</li></ul>Příbuzná: negativně binomické (počet neúspěchů před k-tým úspěchem), hypergeometrické (tahy bez vracení)." },

  { t: "stat",
    q: "Normální rozdělení – vzorec hustoty a parametry?",
    a: "<b>N(μ, σ²):</b> f(x) = 1/(σ√(2π)) · e^(−(x−μ)²/(2σ²)), pro x ∈ ℝ.<ul><li>Parametry: <b>E[X] = μ</b> (střed), <b>Var(X) = σ²</b> (šířka)</li><li>Symetrická zvonová křivka; pravidlo <b>68–95–99,7 %</b> pro ±1σ/±2σ/±3σ</li><li><b>N(0,1)</b> = standardizované normální rozdělení</li></ul>" },

  { t: "stat",
    q: "Exponenciální a gamma rozdělení?",
    a: "<ul><li><b>Exponenciální Exp(λ)</b> – doba do další události: f(x) = λ·e^(−λx) pro x &gt; 0. <b>E[X] = 1/λ</b>, Var = 1/λ². Bez paměti.</li><li><b>Gamma(α, β)</b> – zobecnění (součet exponenciálních): f(x) = β^α/Γ(α)·x^(α−1)·e^(−βx)</li></ul>" },

  { t: "stat",
    q: "Jaký je rozdíl mezi bodovým a intervalovým odhadem? Co je konfidenční interval?",
    a: "<ul><li><b>Bodový odhad</b> – jediné číslo (např. průměr odhaduje μ)</li><li><b>Intervalový odhad</b> – lepší, nese info o variabilitě</li><li><b>Konfidenční interval</b> 100(1−α)% – dvojice (L,U) s P(L ≤ θ ≤ U) = 1−α</li></ul><b>α</b> = hladina významnosti. Spolehlivost odhadu <b>roste s počtem hodnot</b> (užší interval = přesnější)." },

  { t: "stat",
    q: "Co je metoda maximální věrohodnosti (MLE)?",
    a: "<b>Najde parametry rozdělení, které nejlépe vysvětlují pozorovaná data.</b><ul><li><b>Věrohodnostní funkce</b>: L(θ) = ∏ f(xᵢ, θ) → maximalizujeme</li><li>Praxe: vezmeme <b>logaritmus</b> l(θ) = Σ ln f(xᵢ, θ), zderivujeme podle θ, položíme = 0 a vyřešíme</li><li>Druhou derivací ověříme, že jde o maximum</li></ul>" },

  { t: "stat",
    q: "Co je lineární regrese a jak se hodnotí model?",
    a: "<b>Zkoumá vztah mezi nezávislou X (regresor) a závislou Y (regresand).</b> Model: <b>y = β₀ + β₁x + ε</b> (β₀ intercept, β₁ sklon, ε chyba/reziduál).<ul><li><b>R²</b> – kolik % variability vztah vysvětluje</li><li><b>p-hodnota</b> – statistická významnost (&lt; 0,05 = významné)</li><li>Pro nelineární/binární odezvu se používá <b>linková funkce</b> (logistická regrese)</li></ul>" },

  { t: "stat",
    q: "Co je testování hypotéz a jaké jsou chyby 1. a 2. druhu?",
    a: "<b>H₀ (nulová) – vztah neexistuje; H₁ (alternativní) – existuje.</b><ul><li><b>Chyba 1. druhu</b> – falešné <b>zamítnutí</b> platné H₀ (false positive)</li><li><b>Chyba 2. druhu</b> – <b>nezamítnutí</b> neplatné H₀ (false negative)</li><li><b>Hladina významnosti α</b> – maximální přípustná pravděpodobnost chyby 1. druhu</li></ul>Testy: t-test (střední hodnota), Wilcoxon (medián)." }
);
