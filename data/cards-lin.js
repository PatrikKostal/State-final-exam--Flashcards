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
    a: "<b>Rotace v rovině o úhel φ:</b> <code>[[cos φ, −sin φ], [sin φ, cos φ]]</code>.<ul><li>Aplikuje se násobením na souřadnice bodu/vektoru</li><li>Pro 90°: cos 90°=0, sin 90°=1 → <code>[[0,−1],[1,0]]</code>, takže bod (x,y) → (−y, x)</li><li>Je to <b>ortogonální matice</b> (det = 1, zachovává délky a úhly)</li></ul>" }
);
