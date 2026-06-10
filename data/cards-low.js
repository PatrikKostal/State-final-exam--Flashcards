// 2. Principy nízkoúrovňového programování (PB111)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.low = { label: "⚙️ Nízkoúrovňové programování", cls: "tag-low", order: 13 };

FC.cards.push(
  { t: "low",
    q: "Jaký je paměťový model programu a jak se dělí?",
    a: "<b>Adresní prostor procesu se dělí na segmenty:</b><ul><li><b>Text (kód)</b> – strojové instrukce (read-only)</li><li><b>Data / BSS</b> – globální a statické proměnné (inicializované / neinicializované)</li><li><b>Halda (heap)</b> – dynamická alokace, roste „nahoru\"</li><li><b>Zásobník (stack)</b> – lokální proměnné, rámce funkcí, roste „dolů\"</li></ul>" },

  { t: "low",
    q: "Co se ukládá na zásobník a co na haldu? Proč je zásobník menší?",
    a: "<ul><li><b>Zásobník</b> – lokální proměnné, parametry, návratové adresy; <b>automatická správa</b> (LIFO), velmi rychlý. Velikost <b>omezená</b> (typicky ~1–8 MB).</li><li><b>Halda</b> – dynamicky alokovaná data (<code>malloc</code>/<code>new</code>), žije, dokud se neuvolní; ruční správa, větší.</li></ul>Zásobník je menší mj. proto, že každé <b>vlákno má vlastní</b> a kontext se přepíná často; velký by plýtval pamětí. <b>OS umí prostor za běhu zvětšit</b> (např. haldu přes <code>brk</code>/<code>mmap</code>)." },

  { t: "low",
    q: "Jaké jsou funkce pro dynamickou alokaci a co dělají?",
    a: "<ul><li><b>malloc(size)</b> – alokuje blok paměti, vrací <code>void*</code> (nebo <code>NULL</code> při selhání); obsah neinicializovaný</li><li><b>calloc</b> – alokuje a vynuluje</li><li><b>realloc(ptr, size)</b> – změní velikost bloku (může přesunout data jinam a vrátit nový ukazatel)</li><li><b>free(ptr)</b> – uvolní blok</li></ul><code>sizeof</code> je <b>operátor</b> (ne funkce), vyhodnocuje se při překladu." },

  { t: "low",
    q: "Co je memory leak a co se stane při double free?",
    a: "<ul><li><b>Memory leak</b> – alokovaná paměť na haldě se <b>nikdy neuvolní</b> a ztratí se na ni odkaz; program postupně <b>spotřebovává paměť</b> (problém u dlouhoběžících procesů)</li><li><b>Double free</b> – dvojí uvolnění téhož bloku → <b>nedefinované chování</b>, poškození struktur alokátoru, pád nebo zneužitelná zranitelnost</li></ul>" },

  { t: "low",
    q: "Co je ukazatel a jaké s ním jsou operace?",
    a: "<b>Ukazatel = proměnná obsahující adresu jiné proměnné v paměti.</b><ul><li><b>&amp;x</b> – adresa proměnné</li><li><b>*p</b> – dereference (přístup k hodnotě na adrese)</li><li>Ukazuje na <b>začátek</b> paměťového bloku</li></ul>Umožňuje nepřímý přístup, předávání odkazem, dynamické struktury (seznamy, stromy)." },

  { t: "low",
    q: "Co je void pointer a jak funguje ukazatelová aritmetika?",
    a: "<ul><li><b>void*</b> – generický ukazatel bez typu; velikost ukazatele je daná architekturou (4 B na 32bit, 8 B na 64bit). <b>Nelze ho dereferencovat ani s ním počítat</b> (neznámá velikost prvku) – nutno přetypovat.</li><li><b>Ukazatelová aritmetika</b>: <code>p + 1</code> posune o <b>velikost jednoho prvku</b> (sizeof typu), ne o 1 bajt. Proto <code>int* + 1</code> = +4 B.</li></ul>" },

  { t: "low",
    q: "Jaký je vztah mezi polem a ukazatelem v C?",
    a: "<ul><li>Jméno pole se ve výrazech <b>chová jako ukazatel na první prvek</b> (<code>arr</code> ≈ <code>&amp;arr[0]</code>)</li><li><code>arr[i]</code> je totéž co <code>*(arr + i)</code></li><li><b>Vícerozměrné pole</b> = pole polí, uloženo souvisle (row-major)</li></ul>Rozdíl: pole má pevnou velikost a alokovanou paměť, ukazatel je jen adresa." },

  { t: "low",
    q: "Co je řetězec (string) v C a co se uloží na poslední pozici?",
    a: "<b>Řetězec v C = pole znaků (char) zakončené nulovým bajtem <code>'\\0'</code>.</b><ul><li>Terminátor <code>\\0</code> označuje konec – funkce jako <code>strlen</code> čtou až k němu</li><li>Pro „ahoj\" je potřeba pole velikosti <b>5</b> (4 znaky + <code>\\0</code>)</li><li>Chybějící terminátor → čtení za hranice (buffer overread)</li></ul>" },

  { t: "low",
    q: "Jak souvisí malloc se stránkováním a co se stane při přístupu na nealokovanou paměť?",
    a: "<ul><li><b>malloc</b> spravuje haldu; když nemá místo, vyžádá si od OS další <b>stránky</b> (přes <code>brk</code>/<code>mmap</code>). Paměť je virtuální, mapovaná na fyzické rámce přes stránkové tabulky.</li><li><b>Přístup na nealokovanou/neplatnou paměť</b>: pokud stránka není namapovaná → <b>segmentation fault</b> (SIGSEGV); jinak nedefinované chování (přepsání cizích dat)</li></ul>" }
);
