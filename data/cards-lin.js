// 1. Lineární algebra (MB141)
// Otázka pro státnice PVA – flashcards k tématu "Lineární algebra".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.lin = { label: "🔢 Lineární algebra", cls: "tag-lin", order: 1 };

FC.cards.push(
  { t: "lin",
    q: "Co je vektorový prostor a jaké jsou jeho axiomy?",
    a: "<b>Množina V s operacemi sčítání vektorů a násobení skalárem (z tělesa, např. ℝ), splňující axiomy:</b><ul><li>sčítání je <b>asociativní a komutativní</b>, má <b>nulový vektor</b> a ke každému vektoru <b>opačný</b></li><li>násobení skalárem je <b>distributivní</b> (vůči součtu vektorů i skalárů), <b>asociativní</b> a platí <b>1·v = v</b></li></ul><b>Vektor</b> je prvek vektorového prostoru (uspořádaná n-tice čísel, geometricky šipka se směrem a velikostí)." },

  { t: "lin",
    q: "Co je matice a k čemu všemu slouží?",
    a: "<b>Obdélníkové schéma čísel (m×n).</b><ul><li>Reprezentuje <b>lineární transformaci</b> (zobrazení mezi vektorovými prostory)</li><li>Zápis <b>soustavy lineárních rovnic</b></li><li>Reprezentace dat, grafů (matice sousednosti), rotací a projekcí v grafice</li></ul>Vektory v matici reprezentujeme po souřadnicích – jako <b>řádky nebo sloupce</b>." },

  { t: "lin",
    q: "Co je skalární součin, jaké má vlastnosti a geometrický význam?",
    a: "<b>Skalární součin u·v = Σ uᵢvᵢ</b> (výsledkem je číslo).<ul><li>Vlastnosti: <b>komutativní, distributivní, lineární</b> v každé složce</li><li><b>Geometricky</b>: u·v = |u|·|v|·cos φ, kde φ je úhel mezi vektory</li><li>Z toho <b>úhel</b>: cos φ = (u·v)/(|u|·|v|)</li><li>u·v = 0 ⟺ vektory jsou <b>kolmé</b></li></ul><b>Vektorový součin</b> (jen v 3D) dává vektor kolmý na oba, jeho velikost = obsah rovnoběžníku." },

  { t: "lin",
    q: "Jak se násobí matice?",
    a: "<b>Prvek (i,j) výsledku = skalární součin i-tého řádku první matice a j-tého sloupce druhé.</b><ul><li>Násobit lze jen <b>A(m×n)·B(n×p)</b> = C(m×p) – počet sloupců A = počet řádků B</li><li>Není <b>komutativní</b> (A·B ≠ B·A)</li></ul>Příklad: [[1,2],[3,4]]·[[5,6],[7,8]] = [[1·5+2·7, 1·6+2·8],[3·5+4·7, 3·6+4·8]] = [[19,22],[43,50]]." },

  { t: "lin",
    q: "K čemu slouží Gaussova eliminační metoda a co znamená řádek 0=1?",
    a: "<b>Úprava matice na trojúhelníkový (schodovitý) tvar pomocí elementárních řádkových úprav.</b> Slouží k:<ul><li>řešení soustav lineárních rovnic</li><li>výpočtu hodnosti, inverze, determinantu</li><li>zjištění lineární (ne)závislosti</li></ul>Při řešení soustavy: řádek tvaru <b>0 = 1</b> (vlevo samé nuly, vpravo nenula) znamená <b>spor → soustava nemá řešení</b>. Řádek 0 = 0 znamená nadbytečnou rovnici (nekonečně řešení)." },

  { t: "lin",
    q: "Co je determinant, jak se počítá a jaký má geometrický význam?",
    a: "<b>Číslo přiřazené čtvercové matici.</b><ul><li>2×2: <b>ad − bc</b></li><li>obecně <b>rozvoj podle řádku/sloupce</b> (Laplaceův) nebo přes trojúhelníkový tvar (součin diagonály)</li><li><b>Geometricky</b>: |det| = obsah (2D) / objem (3D) rovnoběžníku/rovnoběžnostěnu nataženého na sloupcové vektory</li><li><b>det = 0</b> ⟺ vektory jsou lineárně závislé ⟺ matice není invertovatelná</li></ul>" },

  { t: "lin",
    q: "Co jsou vlastní čísla a vlastní vektory, jak se počítají a co znamenají?",
    a: "<b>Vlastní vektor v matice A: nenulový vektor, který se transformací jen škáluje:</b> A·v = λ·v, kde <b>λ je vlastní číslo</b>.<ul><li>Počítají se z <b>charakteristické rovnice</b> det(A − λI) = 0 (kořeny = vlastní čísla), poté se dopočítají vektory</li><li><b>Geometrický význam</b>: vlastní vektory jsou směry, které transformace nemění (jen prodlouží/zkrátí λ-krát)</li><li>Využití: PCA, stabilita, Google PageRank</li></ul>" },

  { t: "lin",
    q: "Co je inverzní matice a kdy existuje?",
    a: "<b>Inverzní matice A⁻¹ splňuje A·A⁻¹ = A⁻¹·A = I (jednotková).</b><ul><li>Existuje právě tehdy, když je matice <b>čtvercová a regulární</b> (det ≠ 0, plná hodnost)</li><li>Výpočet: Gaussovou eliminací [A | I] → [I | A⁻¹], nebo přes adjungovanou matici a determinant</li><li>Řeší soustavu A·x = b jako <b>x = A⁻¹·b</b></li></ul>" },

  { t: "lin",
    q: "Co znamená lineární (ne)závislost vektorů a jak ji zjistit?",
    a: "<b>Vektory jsou lineárně nezávislé, pokud jejich jediná lineární kombinace dávající nulový vektor má všechny koeficienty nulové.</b><ul><li>Závislé = některý lze vyjádřit jako kombinaci ostatních</li><li><b>Zjištění</b>: vektory dáme do matice a Gaussovou eliminací převedeme na <b>horní trojúhelníkový tvar</b> – počet nenulových řádků = počet nezávislých vektorů (hodnost)</li></ul>" },

  { t: "lin",
    q: "Co je lineární kombinace, lineární obal, podprostor a báze?",
    a: "<ul><li><b>Lineární kombinace</b> – výraz a₁v₁ + a₂v₂ + … + aₙvₙ</li><li><b>Lineární obal</b> – množina všech lineárních kombinací daných vektorů (generovaný podprostor)</li><li><b>Vektorový podprostor</b> – podmnožina uzavřená na sčítání a násobení skalárem</li><li><b>Báze</b> – <b>lineárně nezávislá</b> množina vektorů, která <b>generuje</b> celý prostor; její velikost = dimenze. Souřadnice vektoru = koeficienty jeho vyjádření v bázi.</li></ul>" },

  { t: "lin",
    q: "Co je lineární transformace a jaký má vztah k maticím?",
    a: "<b>Zobrazení f mezi vektorovými prostory zachovávající lineární strukturu:</b><ul><li><b>f(u + v) = f(u) + f(v)</b></li><li><b>f(a·u) = a·f(u)</b></li></ul>Každou lineární transformaci konečnědimenzionálních prostorů lze zapsat <b>maticí zobrazení</b>; aplikace transformace = násobení vektoru touto maticí. Sloupce matice = obrazy bázových vektorů." },

  { t: "lin",
    q: "Jak vypadá matice rotace a jak se použije?",
    a: "<b>Rotace v rovině o úhel φ:</b> <code>[[cos φ, −sin φ], [sin φ, cos φ]]</code>.<ul><li>Aplikuje se násobením na souřadnice bodu/vektoru</li><li>Pro 90°: cos 90°=0, sin 90°=1 → <code>[[0,−1],[1,0]]</code>, takže bod (x,y) → (−y, x)</li><li>Je to <b>ortogonální matice</b> (det = 1, zachovává délky a úhly)</li></ul>" },

  { t: "lin",
    q: "Jaký je vzorec pro velikost vektoru a pro úhel mezi vektory?",
    a: "<ul><li><b>Velikost (norma)</b> z Pythagorovy věty: <b>‖u‖ = √(u₁² + u₂² + … + uₙ²)</b></li><li><b>Úhel mezi vektory</b>: <b>cos α = ⟨u,v⟩ / (‖u‖·‖v‖)</b>, α ∈ [0, π]</li><li><b>Odchylka přímek</b> bere absolutní hodnotu: cos α = |⟨u,v⟩| / (‖u‖·‖v‖), α ∈ [0, π/2]</li></ul>Skalární součin: ⟨u,v⟩ &gt; 0 ostrý úhel, = 0 kolmé, &lt; 0 tupý úhel." },

  { t: "lin",
    q: "Co je vektorový součin (3D) a jak se počítá?",
    a: "<b>Jen ve 3D: u × v dává vektor kolmý na oba.</b><ul><li>Vzorec: <b>u × v = (u₂v₃ − v₂u₃, u₃v₁ − v₃u₁, u₁v₂ − v₁u₂)</b></li><li><b>Velikost = obsah rovnoběžníku</b> sevřeného vektory: ‖u×v‖ = ‖u‖·‖v‖·sin α</li><li>Směr podle pravidla pravé ruky</li></ul>Ve 2D získáme kolmý vektor jen prohozením a změnou znaménka: (u₁,u₂) → (−u₂, u₁)." },

  { t: "lin",
    q: "Jak se zapisuje přímka a co je směrový a normálový vektor?",
    a: "<ul><li><b>Parametrická rovnice</b>: X = A + t·u (bod + t-násobek směrového vektoru)</li><li><b>Obecná rovnice</b>: ax + by + c = 0</li><li><b>Směrový vektor</b> přímky ax+by+c=0 je <b>(−b, a)</b></li><li><b>Normálový vektor</b> (kolmý k přímce) je <b>(a, b)</b></li></ul>Odchylku podprostorů určíme jako odchylku jejich normálových vektorů." },

  { t: "lin",
    q: "Co je afinní a konvexní kombinace bodů?",
    a: "<b>Afinní kombinace</b>: α·A + β·B + γ·C, kde <b>α + β + γ = 1</b>.<ul><li>Je-li navíc <b>α, β, γ ∈ [0,1]</b>, jde o <b>konvexní kombinaci</b> – leží uvnitř trojúhelníku ABC</li></ul>Rozdíl od lineární kombinace: u lineární nejsou koeficienty omezené (mohou tvořit celý podprostor)." },

  { t: "lin",
    q: "Jaké jsou elementární řádkové úpravy a co je schodovitý tvar?",
    a: "<b>Elementární úpravy (nemění množinu řešení / hodnost):</b><ul><li>záměna dvou řádků</li><li>násobení řádku <b>nenulovým</b> číslem</li><li>přičtení c-násobku jiného řádku</li></ul><b>Schodovitý tvar</b>: pivot (první nenulový prvek řádku) každého dalšího řádku je <b>vpravo</b> od pivotu předchozího; nulové řádky dole. Počet nenulových řádků = <b>hodnost</b>." },

  { t: "lin",
    q: "Co je hodnost matice a kdy je matice regulární vs singulární?",
    a: "<ul><li><b>Hodnost</b> = počet lineárně nezávislých (nenulových) řádků ve schodovitém tvaru</li><li><b>Regulární matice</b> ⟺ čtvercová s <b>maximální hodností</b>, det ≠ 0 → má inverzi, řádky lin. nezávislé</li><li><b>Singulární matice</b> ⟺ čtvercová bez maximální hodnosti, <b>det = 0</b> → nemá inverzi</li></ul>" },

  { t: "lin",
    q: "Co je transpozice, symetrická a antisymetrická matice?",
    a: "<ul><li><b>Transpozice Aᵀ</b> – prohození řádků a sloupců; platí <b>|Aᵀ| = |A|</b></li><li><b>Symetrická</b>: A = Aᵀ (souměrná podle diagonály)</li><li><b>Antisymetrická</b>: Aᵀ = −A (na diagonále nuly)</li><li><b>Ortogonální matice</b>: A·Aᵀ = E, det = ±1, zachovává délky a úhly (kolmost)</li></ul>" },

  { t: "lin",
    q: "Jak se počítá determinant Laplaceovým rozvojem?",
    a: "<b>Rozvoj podle řádku/sloupce (libovolný řád):</b><ul><li>Každý prvek vynásobíme jeho <b>minorem</b> (determinant po vyškrtnutí jeho řádku a sloupce) a znaménkem <b>(−1)^(i+j)</b> (šachovnice)</li><li>Vybíráme řádek/sloupec s nejvíce nulami</li><li>Opakujeme, dokud nedojdeme k 2×2: <b>|a b; c d| = ad − bc</b></li></ul>" },

  { t: "lin",
    q: "Co je Sarrusovo pravidlo (determinant 3×3)?",
    a: "<b>Jen pro matice 3×3.</b> Sečteme součiny <b>klesajících</b> diagonál a odečteme <b>stoupající</b>:<br><b>det A = aei + bfg + cdh − ceg − afh − bdi</b><br>(pro matici [[a,b,c],[d,e,f],[g,h,i]]).<br>Pro vyšší řády Sarrus neplatí – použij Laplaceův rozvoj nebo schodovitý tvar." },

  { t: "lin",
    q: "Co říká Cramerovo pravidlo a Cauchyova věta o determinantu?",
    a: "<ul><li><b>Cramerovo pravidlo</b>: det soustavy ≠ 0 → <b>právě jedno řešení</b> (a existuje inverzní matice); det = 0 → buď žádné, nebo nekonečně mnoho řešení</li><li><b>Cauchyova věta</b>: <b>|A·B| = |A|·|B|</b> (determinant součinu = součin determinantů)</li><li>Determinant ve schodovitém/trojúhelníkovém tvaru = <b>součin prvků na diagonále</b></li></ul>" },

  { t: "lin",
    q: "Co je charakteristický polynom a jak se najdou vlastní čísla?",
    a: "<b>Vlastní číslo λ: existuje nenulový vektor v s A·v = λ·v.</b><ul><li>Plyne z <b>(A − λE)·v = 0</b>, což má nenulové řešení jen když <b>det(A − λE) = 0</b></li><li><b>det(A − λE)</b> je <b>charakteristický polynom</b>; jeho kořeny jsou vlastní čísla</li><li>Vlastní vektory pak dopočítáme dosazením každého λ zpět do (A − λE)v = 0</li></ul>Příklad: A=[[3,−1],[2,0]] → λ²−3λ+2=0 → λ=2, λ=1." },

  { t: "lin",
    q: "Jaký je geometrický význam vlastních čísel a vektorů?",
    a: "<ul><li><b>Vlastní vektor</b> – směr, který se transformací <b>nemění</b> (jen se škáluje)</li><li><b>Vlastní číslo λ</b> – <b>koeficient zvětšení/zmenšení</b> vlastního vektoru v jeho směru</li><li><b>Vlastní podprostor</b> – množina vlastních vektorů příslušejících témuž λ</li></ul>Slouží k nalezení „neměnných\" os zobrazení (např. osy rotace, hlavní směry deformace, PCA)." },

  { t: "lin",
    q: "Co je báze, dimenze a jak se zapisují souřadnice vektoru v bázi?",
    a: "<ul><li><b>Báze</b> – množina vektorů, která <b>generuje</b> prostor a je <b>lineárně nezávislá</b></li><li><b>Dimenze</b> = počet vektorů báze (stejný pro všechny báze); = hodnost matice</li><li><b>Standardní báze</b> = jednotková matice</li><li><b>Souřadnice</b> vektoru v bázi (a,b,c): koeficienty (x,y,z) z vyjádření v = x·a + y·b + z·c</li></ul>" },

  { t: "lin",
    q: "Jak najdu součet a průnik vektorových podprostorů?",
    a: "<ul><li><b>Součet</b> – generující vektory obou podprostorů dám <b>vedle sebe</b> (do řádků jedné matice) a najdu bázi (nezávislé řádky)</li><li><b>Průnik</b> – podprostory beru jako <b>soustavu rovnic</b> a hledám společné řešení</li></ul><b>Lineární obal</b> = množina všech lineárních kombinací daných vektorů (tvoří podprostor)." },

  { t: "lin",
    q: "Co je ortogonální a ortonormální báze, a jak se získá (Gram-Schmidt)?",
    a: "<ul><li><b>Ortogonální báze</b> – vektory jsou navzájem <b>kolmé</b> (skalární součiny = 0)</li><li><b>Ortonormální báze</b> – ortogonální + každý vektor má <b>jednotkovou velikost</b> (vydělíme normou)</li></ul><b>Gram-Schmidtův proces</b>: od každého vektoru postupně <b>odečítáme jeho průměty</b> do už hotových kolmých vektorů → u₁=v₁, u₂=v₂−a·u₁, … (koeficienty z podmínky kolmosti)." },

  { t: "lin",
    q: "Jak se sestaví matice lineárního zobrazení?",
    a: "<b>Zobrazíme vektory standardní báze požadovanou operací; jejich obrazy tvoří sloupce matice.</b><ul><li>Příklad φ:ℝ³→ℝ², φ(x,y,z)=(x+y, 3y−2z): obrazy báze (1,0), (1,3), (0,−2) → A = [[1,1,0],[0,3,−2]]</li><li><b>det &gt; 0</b> → rotace; <b>det &lt; 0</b> → zrcadlení (změna orientace)</li></ul>" },

  { t: "lin",
    q: "Jaký je rozdíl mezi lineární a afinní transformací?",
    a: "<ul><li><b>Lineární transformace</b> – zachovává sčítání a násobení skalárem: L(x+y)=L(x)+L(y), L(αx)=αL(x). <b>Nemůže posunout počátek</b> (0 → 0).</li><li><b>Afinní transformace</b> – zobecnění: <b>T(x) = A·x + b</b> (přidává translaci b), takže <b>může posunout počátek</b></li></ul>Afinní zobrazení zachovává kolinearitu a dělicí poměr (přímka → přímka, ne oblouk)." },

  { t: "lin",
    q: "Co je Euklidovský prostor a jakou má dimenzi nadrovina?",
    a: "<ul><li><b>Euklidovský prostor</b> – vektorový prostor ℝⁿ <b>se skalárním součinem</b>; umožňuje měřit délky, vzdálenosti a úhly</li><li><b>Nadrovina</b> n-rozměrného prostoru má dimenzi <b>n−1</b></li><li><b>Ortogonální doplněk</b> podprostoru U = množina všech vektorů kolmých na U</li></ul>" },

  { t: "lin",
    q: "CHYTÁK: Lze v lineárním zobrazení posunout bod nula? A v afinním?",
    a: "<ul><li><b>Lineární zobrazení – NE</b>. Zachovává násobení skalárem, takže L(0)=0; počátek je vždy pevný.</li><li><b>Afinní zobrazení – ANO</b>, díky translaci b posune i počátek. Ale ani afinní nemůže <b>oblouk zobrazit na přímku</b> (zachovává kolinearitu).</li></ul>" },

  { t: "lin",
    q: "CHYTÁK: Jak je to s ortonormální bází a nulami v zápisu vektorů?",
    a: "<b>Vektory ortonormální (ani ortogonální) báze NEmusí obsahovat (n−1) nul.</b><ul><li>Příklad ortonormální báze ℝ³: (1/√3, 1/√3, −1/√3), (1/√6, 1/√6, 2/√6), (−1/√2, 1/√2, 0) – plné vektory, přesto navzájem kolmé a jednotkové</li><li>V ortonormální bázi jsou všechny vektory <b>na sebe kolmé</b> a mají velikost 1 (součet délek = dimenze)</li></ul>" }
);
