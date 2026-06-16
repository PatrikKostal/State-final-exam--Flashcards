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
    a: "<ul><li><b>malloc</b> spravuje haldu; když nemá místo, vyžádá si od OS další <b>stránky</b> (přes <code>brk</code>/<code>mmap</code>). Paměť je virtuální, mapovaná na fyzické rámce přes stránkové tabulky.</li><li><b>Přístup na nealokovanou/neplatnou paměť</b>: pokud stránka není namapovaná → <b>segmentation fault</b> (SIGSEGV); jinak nedefinované chování (přepsání cizích dat)</li></ul>" },

  { t: "low",
    q: "Jaké segmenty obsahuje paměťový model programu (detailně)?",
    a: "<b>Od nízkých adres nahoru:</b><ul><li><b>Text</b> – zkompilovaný kód (instrukce), read-only</li><li><b>Initialized data</b> – inicializované globální/statické proměnné</li><li><b>BSS</b> – neinicializované globální proměnné (vynulované při exec)</li><li><b>Halda (heap)</b> – dynamická alokace, roste nahoru</li><li><b>Zásobník (stack)</b> – lokální proměnné, stack-frame na funkci, roste dolů</li></ul>" },

  { t: "low",
    q: "Co je zarovnání paměti (alignment) a jak ovlivňuje sizeof structu?",
    a: "<b>Datové typy se zarovnávají na násobky slova procesoru → rychlejší čtení.</b><ul><li>Mezi položkami vzniká <b>padding</b> (výplň)</li><li>Proto <b>sizeof(struct) ≠ součet velikostí položek</b></li></ul>Příklad: struct s <code>char</code> (1B) + <code>int</code> (4B) zabere 8 B (3 B padding za charem), aby int začínal na zarovnané adrese." },

  { t: "low",
    q: "Jaké jsou bitové operátory v C a k čemu slouží?",
    a: "<ul><li><b>&amp;</b> AND, <b>|</b> OR, <b>^</b> XOR, <b>~</b> negace</li><li><b>&lt;&lt;</b> posun vlevo (×2), <b>&gt;&gt;</b> posun vpravo (÷2)</li></ul>Použití: <b>příznaky (flagy)</b> v jednotlivých bitech, čtení přes <b>masku</b>. Bitová konverze = jiná interpretace stejných bitů (neztrátová); sémantická konverze (double→float) ztrácí přesnost." },

  { t: "low",
    q: "Jaký je rozdíl mezi mělkou a hlubokou kopií?",
    a: "<ul><li><b>Mělká kopie</b> – zkopíruje povrchní strukturu (přiřazení); vnořené ukazatele sdílí stejnou paměť. <b>Předání struktury hodnotou tvoří mělkou kopii.</b></li><li><b>Hluboká kopie</b> – zkopíruje i data, na která se ukazuje (<code>malloc</code> + <code>memcpy</code>)</li></ul>Mělká kopie → riziko aliasů a dvojího uvolnění." },

  { t: "low",
    q: "Co je struct, union a enum v C?",
    a: "<ul><li><b>struct</b> – záznam s pojmenovanými položkami (přístup <code>.</code> nebo <code>-&gt;</code> přes ukazatel); zarovnaný</li><li><b>union</b> – sdílí paměť pro více typů, velikost = největší položka; <b>bitová reinterpretace</b> (vybereme jednu položku)</li><li><b>enum</b> – výčtový typ, vnitřně <code>int</code> s indexy</li></ul><code>typedef</code> zavádí alias/nový název typu." },

  { t: "low",
    q: "Co je funkční ukazatel a void* ukazatel?",
    a: "<ul><li><b>Funkční ukazatel</b> – ukazatel na kód funkce → umožňuje <b>předat funkci jako parametr</b> (callbacky)</li><li><b>void*</b> – generický ukazatel bez typu; nelze dereferencovat ani s ním počítat bez přetypování</li></ul><b>NULL</b> = ukazatel na adresu 0, <code>#define NULL ((void*)0)</code>." },

  { t: "low",
    q: "Co je paměťový aliasing a strict aliasing?",
    a: "<ul><li><b>Aliasing</b> – na stejné místo paměti ukazuje více ukazatelů (případně <b>různých typů</b>), každý si ho interpretuje po svém</li><li><b>Strict aliasing</b> – pravidlo, že dva ukazatele <b>různých typů</b> NEukazují na totéž; umožňuje kompilátoru optimalizace (lze vypnout)</li></ul>Porušení strict aliasingu → nedefinované chování." },

  { t: "low",
    q: "Jak se v paměti ukládá vícerozměrné pole a co je nepravoúhlé pole?",
    a: "<ul><li><b>Vícerozměrné pole</b> (<code>int a[10][25]</code>) je v paměti uloženo <b>jednorozměrně</b> (řádek po řádku, row-major)</li><li><b>Meze se nehlídají</b>; <code>pole[0]</code> ≡ <code>pole</code> ≡ adresa prvního prvku</li><li><b>Nepravoúhlé pole</b> – pole řetězců různé délky (pole ukazatelů)</li></ul>Pozor: <code>int*</code> a <code>int[10]</code> jsou rozdílné typy." },

  { t: "low",
    q: "K čemu slouží calloc, realloc a memset?",
    a: "<ul><li><b>malloc(n)</b> – alokuje n bajtů, <b>neinicializuje</b></li><li><b>calloc(n, size)</b> – alokuje n·size bajtů a <b>vynuluje</b></li><li><b>realloc(ptr, size)</b> – změní velikost bloku, <b>zachová obsah</b> (může přesunout); NULL ptr → jako malloc</li><li><b>memset(ptr, val, n)</b> – rychle nastaví n bajtů na hodnotu</li></ul><code>free</code> jen uvolní (obsah nemaže)." },

  { t: "low",
    q: "K čemu slouží debugger a Valgrind?",
    a: "<ul><li><b>Debugger</b> (gdb) – krokování, <b>breakpointy</b> (i podmíněné), čtení proměnných/ukazatelů, prohlížení zásobníku a haldy</li><li><b>Valgrind</b> – detekce <b>memory leaků</b>, neplatných přístupů a chyb práce s pamětí za běhu</li></ul>HW podpora: <b>trap flag</b> pro krokování, memory breakpointy (nutná podpora CPU)." },

  { t: "low",
    q: "K čemu slouží klíčové slovo const a jak ho lze obejít?",
    a: "<b>const označuje konstantu – překladač hlídá, že se hodnota nemění (prevence chyb).</b><ul><li>Lze ho „ošálit\": přiřazením <code>const int*</code> do necosnt ukazatele (kompilátor jen varuje), pak přes něj zapsat</li><li>Je to ale <b>nechtěné a nebezpečné</b> (undefined behaviour, pokud byl objekt skutečně konstantní)</li></ul>" },

  { t: "low",
    q: "Co je paměť a jak se k ní přistupuje?",
    a: "<b>Paměť = adresovatelné pole slotů pevné délky (slot typicky 1 bajt).</b><ul><li>Entity (proměnné, struktury) zabírají více slotů; přistupuje se přes <b>adresu začátku</b> (hex, např. <code>0x0a</code>)</li><li>Délka adres závisí na platformě (32/64 bit)</li><li>Překladač nahrazuje jména proměnných adresami na zásobníku</li></ul>" },

  { t: "low",
    q: "Proč je C slabě typovaný a jaké jsou typové konverze?",
    a: "<b>C dovolí přetypovat i nekompatibilní data (nebezpečné).</b><ul><li><b>Implicitní konverze</b> – provádí kompilátor; <b>bitová</b> jen jinak interpretuje stejné bity (neztrátová)</li><li><b>Explicitní (cast)</b> – programátor; <b>sémantická</b> konverze (double→float) může ztratit přesnost</li></ul><code>sizeof</code> je <b>operátor</b> (vyhodnocen při překladu), ne funkce." },

  { t: "low",
    q: "Jak fungují operátory & a * a co je dangling pointer?",
    a: "<ul><li><b>&amp;x</b> – vrací <b>adresu</b> (int → int*)</li><li><b>*p</b> – <b>dereference</b>, nahradí ukazatel hodnotou na adrese (int* → int)</li></ul>Pozor: <code>int* p; p = 10;</code> mění <b>ukazatel</b> (špatně); <code>*p = 10;</code> mění <b>hodnotu na adrese</b> (správně). <b>Dangling pointer</b> = ukazatel na již dealokovanou paměť." },

  { t: "low",
    q: "Jak se v paměti ukládá struct a proč sizeof(struct) ≠ součet položek?",
    a: "<b>Kvůli zarovnání (alignment) vzniká mezi položkami padding.</b><ul><li>Příklad: <code>struct { char nick[31]; int energy; }</code> – int nezačne na 31. bajtu, ale na nejbližší zarovnané adrese (násobek 4)</li><li>Přístup k položkám: <code>s.x</code> nebo <code>p-&gt;x</code> (= <code>(*p).x</code>) přes ukazatel</li></ul>" },

  { t: "low",
    q: "Co je typedef a jak se používá?",
    a: "<b>Zavádí nový název (alias) datového typu pro lepší čitelnost.</b><ul><li><code>typedef int muj_int;</code></li><li><code>typedef struct avatar_t avatar;</code> → pak jen <code>avatar a;</code></li><li><code>typedef avatar* pAvatar;</code> → ukazatelový typ</li></ul>Usnadňuje práci se složitými typy (pole polí, ukazatele na funkce)." },

  { t: "low",
    q: "Proč je zásobník menší než halda a může program za běhu měnit velikost?",
    a: "<ul><li><b>Zásobník je menší</b> (~1–8 MB) mj. proto, že <b>každé vlákno má vlastní</b> a kontext se přepíná často; velký by plýtval pamětí</li><li><b>OS umí za běhu zvětšit prostor</b> – haldu přes <code>brk</code>/<code>sbrk</code> nebo <code>mmap</code>; zásobník automaticky roste do limitu</li></ul>Směr růstu (nahoru/dolů) závisí na architektuře." },

  { t: "low",
    q: "Co se ukládá na zásobník a co na haldu?",
    a: "<ul><li><b>Zásobník</b> – lokální proměnné, parametry, návratové adresy; <b>automatická</b> správa (LIFO), rychlý, omezená velikost</li><li><b>Halda</b> – dynamicky alokovaná data (<code>malloc</code>/<code>new</code>); žije, dokud ji neuvolníme; <b>ruční</b> správa (v C bez GC)</li></ul>Globální a statické proměnné jsou v data/BSS segmentu, ne na zásobníku ani haldě." },

  { t: "low",
    q: "Co se stane při přístupu mimo alokované pole (meze se nehlídají)?",
    a: "<b>C meze polí NEhlídá → nedefinované chování.</b><ul><li>Přístup do <b>nenamapované stránky</b> → <b>segmentation fault</b> (SIGSEGV)</li><li>Přístup do <b>namapované, ale cizí</b> paměti → tiché přepsání dat (zákeřné), nebo se „ještě vejde\" do zarovnání</li></ul>Základ zranitelností typu <b>buffer overflow</b> – obrana: stack canary, ASLR, kontrola délky." }
);
