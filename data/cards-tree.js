// 6. Stromové datové struktury (IB002)
// Otázka pro státnice PVA – flashcards k tématu "Stromové datové struktury".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.tree = { label: "🌳 Stromové struktury", cls: "tag-tree", order: 6 };

FC.cards.push(
  { t: "tree",
    q: "Co je binární vyhledávací strom (BST) a jak se v něm hledá?",
    a: "<b>Binární strom, kde pro každý uzel platí: levý podstrom má menší klíče, pravý větší.</b><ul><li><b>Hledání/vkládání/mazání</b>: porovnáme klíč a jdeme doleva/doprava – složitost <b>O(h)</b>, kde h je hloubka</li><li>Vyvážený strom: <b>O(log n)</b>; <b>nejhorší případ (degenerovaný na seznam): O(n)</b></li><li>Inorder průchod vydá klíče <b>seřazené</b></li></ul>Použití: slovníky, množiny, indexy." },

  { t: "tree",
    q: "Proč BST potřebuje vyvažování a co jsou rotace?",
    a: "<b>Při vkládání v nevhodném pořadí (např. seřazená data) BST degeneruje na lineární seznam → O(n).</b><ul><li><b>Samovyvažovací stromy</b> (AVL, červeno-černé) udržují hloubku <b>O(log n)</b></li><li><b>Rotace</b> – lokální přestrukturování (levá/pravá), které sníží výšku a zachová uspořádání BST</li><li>Rotace má složitost <b>O(1)</b></li></ul>Hloubka stromu přímo určuje složitost operací." },

  { t: "tree",
    q: "Jaká jsou pravidla červeno-černých stromů a jejich složitost?",
    a: "<b>Samovyvažovací BST, kde každý uzel je červený/černý:</b><ul><li>Kořen je černý; červený uzel nemá červeného potomka</li><li>Každá cesta z uzlu do listů (NIL) má <b>stejný počet černých uzlů</b></li></ul>Tím je strom přibližně vyvážený (výška ≤ 2·log n). <b>Insert/delete/search v O(log n)</b>, vyvažuje se <b>rotacemi a přebarvováním</b>. Použití: <code>std::map</code>, TreeMap v Javě, plánovače v jádře." },

  { t: "tree",
    q: "Co je B-strom, jaká má pravidla a kde se používá?",
    a: "<b>Vyvážený vyhledávací strom s vysokým větvením (mnoho klíčů v uzlu).</b><ul><li>Parametr <b>minimální stupeň t</b>: každý uzel (kromě kořene) má t−1 až 2t−1 klíčů</li><li><b>Všechny listy ve stejné hloubce</b></li><li>Vkládá se do listů; při přeplnění se uzel <b>rozdělí (split)</b></li><li>Operace <b>O(log n)</b>, ale s malou výškou → <b>málo přístupů na disk</b></li></ul>Použití: <b>databáze a souborové systémy</b> (varianta B+ strom)." },

  { t: "tree",
    q: "Jak funguje halda (heap) a jakou má vlastnost?",
    a: "<b>Binární strom splňující vlastnost haldy:</b> rodič je vždy ≤ (min-halda) nebo ≥ (max-halda) než potomci. Je to <b>úplný binární strom</b> (všechny vrstvy plné kromě poslední, zarovnané doleva).<ul><li><b>Implementace polem</b> (díky úplnosti): potomci uzlu i jsou 2i+1 a 2i+2 – žádné ukazatele</li><li>Operace <b>insert, extract-min/max v O(log n)</b>, čtení kořene O(1)</li></ul>" },

  { t: "tree",
    q: "K čemu se halda používá a co je heapsort?",
    a: "<ul><li><b>Prioritní fronta</b> – rychlý přístup k minimu/maximu</li><li>Využívají ji <b>Dijkstra a Jarník–Prim</b> (výběr nejbližšího vrcholu)</li><li><b>Heapsort</b> – řazení: postavíme haldu O(n), pak n-krát vyjmeme kořen → <b>O(n log n)</b>, in-place</li></ul>" },

  { t: "tree",
    q: "Srovnání stromových struktur – kdy kterou použít?",
    a: "<ul><li><b>BST (vyvážený / červeno-černý)</b> – slovník/množina v paměti, řazené iterování, O(log n)</li><li><b>B-strom / B+ strom</b> – velká data na disku (DB, FS), minimalizace I/O</li><li><b>Halda</b> – prioritní fronta, výběr min/max, heapsort</li><li>Pro pouhé vyhledávání bez řazení bývá rychlejší <b>hašovací tabulka</b> (O(1) průměrně)</li></ul>" },

  { t: "tree",
    q: "Jaká je uspořádací podmínka BVS a kdo je následník/předchůdce uzlu?",
    a: "<b>Pro každý uzel: levý podstrom &lt; klíč uzlu &lt; pravý podstrom.</b><ul><li>S duplicitami: levý &lt; rodič ≤ pravý</li><li><b>Následník</b> uzlu x = uzel s <b>nejmenším klíčem větším</b> než x</li><li><b>Předchůdce</b> = uzel s <b>největším klíčem menším</b> než x</li></ul>" },

  { t: "tree",
    q: "Jaké jsou tři průchody binárním stromem a co vypisují?",
    a: "<ul><li><b>preorder</b>: kořen → levý → pravý</li><li><b>inorder</b>: levý → kořen → pravý — u BVS vypíše klíče <b>seřazeně</b></li><li><b>postorder</b>: levý → pravý → kořen</li></ul>Příklad inorder „325461897\", preorder „123456789\" – z dvojice průchodů (s inorder) lze strom jednoznačně rekonstruovat." },

  { t: "tree",
    q: "Jak probíhá mazání uzlu v BVS (tři případy)?",
    a: "<ul><li><b>Žádný potomek</b> – uzel prostě smažu</li><li><b>Jeden potomek</b> – potomek nahradí smazaný uzel</li><li><b>Dva potomci</b> – uzel nahradím jeho <b>následníkem nebo předchůdcem</b> (a ten se rekurzivně smaže)</li></ul>" },

  { t: "tree",
    q: "CHYTÁK: Má vyhledávání v BVS vždy složitost O(log n)?",
    a: "<b>NE.</b><ul><li>O(log n) platí jen pro <b>vyvážený</b> BVS</li><li>Nevyvážený BVS může degenerovat na lineární seznam → <b>O(n)</b> v nejhorším případě</li><li>Složitost operací = O(h), kde h je výška stromu</li></ul>Vyvážený strom udržuje výšku log₂(n+1) pomocí rotací (O(1))." },

  { t: "tree",
    q: "Jaká jsou pravidla červeno-černého stromu?",
    a: "<ol><li>Každý uzel je červený, nebo černý</li><li><b>Kořen je černý</b></li><li>Listy (NIL) jsou černé, bez hodnoty</li><li><b>Červený uzel má černého rodiče</b> (žádní dva červení za sebou)</li><li><b>Každá cesta z uzlu do listů má stejný počet černých uzlů</b> (černá výška)</li></ol>Tím je výška ≤ 2·log₂(n+1) → operace O(log n)." },

  { t: "tree",
    q: "Co je černá výška a jak se RB strom vyvažuje po vložení?",
    a: "<ul><li><b>Černá výška</b> uzlu = počet černých uzlů na cestě do listu (bez výchozího uzlu)</li><li>Nový uzel se vloží jako <b>červený</b></li></ul>Má-li červeného rodiče, řeší se 3 případy:<ul><li><b>Strýc červený</b> → přebarvení (otec+strýc černí, praotec červený), pokračuj výš</li><li><b>Strýc černý, vnitřní vnuk</b> → rotace na případ 3</li><li><b>Strýc černý, vnější vnuk</b> → rotace praotce + přebarvení</li></ul>Rotace zachovává uspořádání BVS, je O(1)." },

  { t: "tree",
    q: "Co je B-strom a kolik má klíčů podle minimálního stupně t?",
    a: "<b>n-ární vyvážený vyhledávací strom; uzel s k klíči má k+1 potomků, klíče vymezují intervaly.</b><ul><li>Minimální stupeň <b>t</b>: každý uzel (kromě kořene) má <b>t−1 až 2t−1 klíčů</b></li><li><b>Arita</b> (max potomků) = 2t</li><li>Všechny <b>listy ve stejné hloubce</b>; hloubka ≈ log_t(n)</li></ul>Operace O(log_t n); vysoké větvení → málo přístupů na disk (DB, FS)." },

  { t: "tree",
    q: "Jak funguje štěpení uzlu v B-stromu?",
    a: "<ul><li>Při vkládání do <b>plného</b> uzlu (2t−1 klíčů) se uzel <b>rozdělí</b>: prostřední klíč <b>vystoupá do rodiče</b>, zbytek se rozpadne na dva uzly</li><li><b>Dělení kořene</b> zvyšuje výšku stromu (jediný způsob růstu výšky)</li></ul><b>Preemptivní štěpení</b> – plné uzly štěpíme už při sestupu, aby se každý uzel navštívil jen jednou (důležité pro disk)." },

  { t: "tree",
    q: "Co je B+ strom a čím se liší od B-stromu?",
    a: "<b>Varianta B-stromu, kde jsou všechna data jen v listech.</b><ul><li>Vnitřní uzly drží klíče <b>jen jako směrovníky</b> (intervaly)</li><li>Listy jsou <b>propojené spojovým seznamem</b> → efektivní sekvenční a rozsahové čtení</li><li>Při štěpení listu se prostřední klíč <b>kopíruje</b> (ne přesouvá) do rodiče</li></ul>Zrychluje čtení → používá se v <b>souborových systémech a databázích</b>." },

  { t: "tree",
    q: "Jak se halda reprezentuje v poli (indexy)?",
    a: "<b>Úplný binární strom plněný zleva → uloží se do pole bez ukazatelů.</b> Pro uzel na indexu i:<ul><li><b>levý potomek</b>: 2i+1</li><li><b>pravý potomek</b>: 2i+2</li><li><b>rodič</b>: ⌊(i−1)/2⌋</li></ul>Kořen na indexu 0. Paměť O(n). Příklad maximové haldy: [27,20,16,5,4,3,2,1]." },

  { t: "tree",
    q: "Jaké jsou složitosti operací haldy?",
    a: "<table><tr><td>získání kořene (min/max)</td><td>O(1)</td></tr><tr><td>vložení (insert)</td><td>O(log n)</td></tr><tr><td>vyjmutí kořene</td><td>O(log n)</td></tr><tr><td><b>stavba haldy</b></td><td><b>O(n)</b></td></tr><tr><td>search</td><td>O(n)</td></tr></table><ul><li><b>Insert</b> – přidá na konec a „probublá nahoru\"; <b>extract</b> – kořen nahradí posledním a <b>Heapify</b> (probublá dolů)</li></ul>" },

  { t: "tree",
    q: "Jak funguje heapsort a jaké má vlastnosti?",
    a: "<b>Řazení pomocí haldy:</b><ol><li>Postav maximovou haldu O(n)</li><li>Opakovaně: prohoď kořen (max) s posledním prvkem a zmenši haldu, pak Heapify O(log n)</li></ol><b>Složitost O(n log n)</b>, <b>in situ</b> (in-place), ale <b>NENÍ stabilní</b>." },

  { t: "tree",
    q: "Jak hashovací tabulka řeší kolize?",
    a: "<ul><li><b>Zřetězení (uzavřená adresace)</b> – pod každým indexem spojový seznam; insert O(1), search průměrně O(1), nejhůř O(n)</li><li><b>Otevřená adresace</b> – prvky přímo v tabulce, při kolizi se <b>sonduje</b>:<ul><li><b>lineární sondování</b>: index+1, +2, …</li><li><b>kvadratické</b>: index + (počet kolizí)²</li></ul></li></ul>Při mazání se vkládá značka <b>Deleted</b>, aby search nepřeskočil řetěz." },

  { t: "tree",
    q: "CHYTÁK: Je vyhledávání v hashovací tabulce vždy O(1)?",
    a: "<b>NE.</b><ul><li>O(1) je jen <b>průměrná</b> (očekávaná) složitost</li><li>Při mnoha <b>kolizích</b> (špatná hašovací funkce / vysoký load factor) degraduje na <b>O(n)</b></li></ul>Podobně: prioritní fronta polem má Insert Θ(1), Extract-Min Θ(n); seřazeným polem Insert Θ(n), Extract-Min Θ(1)." },

  { t: "tree",
    q: "CHYTÁK: Lze v binární haldě najít k-té nejmenší / nejmenší větší než x v O(log n)?",
    a: "<ul><li><b>k-té nejmenší</b> pro <b>konstantní k</b> (např. 5.) – ANO, O(log n) (opakované extract na kopii vrcholu stromu)</li><li><b>nejmenší číslo větší než x</b> – <b>NE</b>, halda neudržuje úplné uspořádání, vyžaduje O(n)</li><li><b>najít největší</b> v <b>minimové</b> haldě – O(n) (je v listech)</li></ul>Ověření, zda strom je BVS, jde v Θ(n)." },

  { t: "tree",
    q: "Jaký je rozdíl mezi AVL a červeno-černým stromem?",
    a: "<ul><li><b>AVL</b> – přísněji vyvážený (výšky podstromů se liší max o 1) → <b>rychlejší vyhledávání</b>, ale <b>více rotací</b> při vkládání/mazání</li><li><b>Červeno-černý</b> – volnější vyvážení (výška ≤ 2·log n) → <b>méně rotací</b>, vhodnější pro časté úpravy</li></ul>Oba garantují O(log n). RB se používá v <code>std::map</code>, AVL kde převažuje čtení." },

  { t: "tree",
    q: "Jak se maže klíč z B-stromu (podtečení)?",
    a: "<ul><li><b>Klíč v listu</b> – jen odstranit</li><li><b>Klíč ve vnitřním uzlu</b> – nahradit <b>předchůdcem/následníkem</b></li><li>Při <b>podtečení</b> (méně než t−1 klíčů) → <b>vypůjčení</b> klíče od sourozence, nebo <b>merge</b> (sloučení) uzlů</li></ul>Strom tak zůstává vyvážený se stejnou hloubkou listů." },

  { t: "tree",
    q: "Jaké vlastnosti musí mít hashovací funkce v hashovací tabulce?",
    a: "<ul><li><b>Deterministická</b> – stejný klíč → stejný index</li><li><b>Rovnoměrná</b> – rozprostře klíče rovnoměrně do přihrádek (minimalizuje kolize)</li><li>Rychlá na výpočet</li></ul>Příklad: sečíst binární hodnoty znaků a vzít modulo počet přihrádek. Nejhorší funkce mapuje vše do jedné přihrádky → O(n). (Pozn.: <b>kryptografické</b> hashe navíc vyžadují lavinový efekt a bezkoliznost.)" },

  { t: "tree",
    q: "Jak hloubka stromu souvisí se složitostí operací?",
    a: "<b>Operace BVS (hledání, vkládání, mazání) mají složitost O(h), kde h je hloubka.</b><ul><li><b>Vyvážený</b> strom: h = O(log n) → O(log n)</li><li><b>Degenerovaný</b> (řetěz): h = O(n) → O(n)</li></ul>Proto se používá vyvažování (rotace O(1)), aby h zůstalo logaritmické." }
);
