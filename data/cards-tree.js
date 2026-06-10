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
    a: "<ul><li><b>BST (vyvážený / červeno-černý)</b> – slovník/množina v paměti, řazené iterování, O(log n)</li><li><b>B-strom / B+ strom</b> – velká data na disku (DB, FS), minimalizace I/O</li><li><b>Halda</b> – prioritní fronta, výběr min/max, heapsort</li><li>Pro pouhé vyhledávání bez řazení bývá rychlejší <b>hašovací tabulka</b> (O(1) průměrně)</li></ul>" }
);
