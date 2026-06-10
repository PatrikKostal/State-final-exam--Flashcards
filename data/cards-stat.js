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
    a: "<b>Z výběru (vzorku) odhadujeme parametry celé populace.</b><ul><li><b>Bodový odhad</b> – jediná hodnota (výběrový průměr odhaduje μ)</li><li><b>Intervalový odhad (interval spolehlivosti)</b> – interval, v němž parametr leží s danou pravděpodobností (např. 95 %)</li><li>Větší vzorek → <b>užší interval, vyšší spolehlivost</b> odhadu</li></ul>" }
);
