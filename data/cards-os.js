// 6. Operační systémy (PB152)
// Otázka pro státnice PVA – flashcards k tématu "Operační systémy".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.os = { label: "💻 Operační systémy", cls: "tag-os", order: 17 };

FC.cards.push(
  { t: "os",
    q: "Co je operační systém a jaké má hlavní úkoly?",
    a: "<b>Software, který spravuje hardware a poskytuje abstrakci pro aplikace.</b><ul><li><b>Správce zdrojů</b> – přiděluje CPU, paměť, I/O zařízení mezi procesy</li><li><b>Abstrakce</b> – skrývá detaily HW (soubory místo bloků, procesy místo registrů)</li><li><b>Rozhraní</b> – mezi uživatelem/aplikacemi a HW</li><li>Hlavní subsystémy: <b>správa procesů, správa paměti, souborový systém, I/O, síť, bezpečnost</b></li></ul>" },

  { t: "os",
    q: "Co je jádro (kernel) operačního systému?",
    a: "<b>Centrální, vždy zavedená část OS běžící v privilegovaném režimu.</b><ul><li>Má plnou kontrolu nad HW</li><li>Zajišťuje plánování, správu paměti, systémová volání, ovladače</li><li>Okolo jádra běží uživatelské procesy v omezeném režimu</li></ul>" },

  { t: "os",
    q: "Jaké jsou typy architektury jádra a jejich vlastnosti?",
    a: "<ul><li><b>Monolitické</b> – vše (ovladače, FS, síť) běží v jednom adresním prostoru jádra. Rychlé, ale chyba v modulu shodí systém. Příklad: <b>Linux</b>.</li><li><b>Mikrojádro</b> – v jádře jen minimum (IPC, plánování, paměť), služby běží jako uživatelské procesy. Stabilní, modulární, ale režie IPC. Příklad: <b>MINIX, QNX, L4</b>.</li><li><b>Hybridní</b> – kompromis, část služeb v jádře. Příklad: <b>Windows NT, macOS (XNU)</b>.</li></ul>" },

  { t: "os",
    q: "Jaké jsou základní režimy procesoru a proč existují?",
    a: "<ul><li><b>Kernel mode (privilegovaný)</b> – přístup ke všem instrukcím a HW</li><li><b>User mode (uživatelský)</b> – omezený, nesmí privilegované instrukce ani přímý přístup k HW</li></ul>Na x86 jde o <b>ringy 0–3</b> (0 = jádro, 3 = aplikace). Důvod: <b>ochrana a izolace</b> – chybný/zlomyslný program nemůže poškodit systém nebo jiné procesy. Přechod do kernel mode jen řízeně přes <b>systémové volání / přerušení / výjimku</b>." },

  { t: "os",
    q: "Co je systémové volání (syscall) a jak funguje?",
    a: "<b>Řízený vstupní bod do jádra – žádost aplikace o službu OS.</b><ul><li>Příklady: <code>read</code>, <code>write</code>, <code>open</code>, <code>fork</code>, <code>mmap</code></li><li>Mechanismus: speciální instrukce (<code>syscall</code>/<code>int 0x80</code>) způsobí <b>trap</b> → přepnutí do kernel mode → jádro ověří parametry a provede operaci → návrat do user mode</li><li>Přepínání režimu má režii, proto se volání minimalizují (buffering)</li></ul>" },

  { t: "os",
    q: "Rozdíl mezi API, ABI a systémovým voláním?",
    a: "<ul><li><b>API</b> – rozhraní na úrovni zdrojového kódu (funkce, parametry), např. POSIX, Win32</li><li><b>ABI</b> – binární rozhraní (konvence volání, rozložení paměti, číslování syscallů) – zaručuje kompatibilitu přeloženého kódu</li><li><b>Syscall</b> – konkrétní přechod do jádra; aplikace ho obvykle nevolá přímo, ale přes <b>knihovní wrapper</b> (libc)</li></ul>" },

  { t: "os",
    q: "Jaký je rozdíl mezi statickými a dynamickými knihovnami?",
    a: "<ul><li><b>Statická</b> (<code>.a</code>, <code>.lib</code>) – kód se zkopíruje do binárky při linkování. Větší soubor, nezávislý, ale aktualizace = překlad znovu.</li><li><b>Dynamická / sdílená</b> (<code>.so</code>, <code>.dll</code>) – linkuje se za běhu. Výhody: <b>jedna kopie v paměti sdílená procesy</b>, menší binárky, aktualizace bez překompilování. Nevýhoda: závislost (\"DLL hell\").</li></ul>" },

  { t: "os",
    q: "Co je virtuální paměť a jaké přináší výhody?",
    a: "<b>Abstrakce, kdy každý proces vidí vlastní souvislý adresní prostor nezávislý na fyzické RAM.</b><ul><li><b>Izolace</b> – procesy se nemohou navzájem přepsat</li><li>Umožňuje běh programu většího než fyzická RAM (swap na disk)</li><li>Zjednodušuje alokaci, sdílení (sdílené knihovny, COW)</li><li>Překlad virtuální → fyzické adresy zajišťuje <b>MMU</b> pomocí stránkových tabulek</li></ul>" },

  { t: "os",
    q: "Vysvětli stránkování (paging) a stránkové tabulky.",
    a: "<ul><li>Virtuální i fyzická paměť rozdělena na bloky pevné velikosti: <b>stránky (pages)</b> a <b>rámce (frames)</b>, typicky 4 KiB</li><li><b>Stránková tabulka</b> mapuje číslo virtuální stránky → číslo fyzického rámce + příznaky (přístupová práva, present, dirty)</li><li>Často <b>víceúrovňové</b> tabulky (úspora paměti)</li><li><b>TLB</b> (Translation Lookaside Buffer) cachuje překlady pro rychlost</li><li><b>Page fault</b> = stránka není v RAM → jádro ji načte (ze swapu/souboru)</li></ul>" },

  { t: "os",
    q: "Co je TLB a co je page fault?",
    a: "<ul><li><b>TLB</b> – hardwarová cache nedávných překladů virtuální→fyzická adresa. Bez ní by každý přístup vyžadoval procházení stránkové tabulky (pomalé).</li><li><b>Page fault</b> – výjimka, když přistupovaná stránka není v RAM (present bit = 0). Jádro ji buď načte z disku (swap/mmap soubor), nebo jde o chybu přístupu (segfault).</li></ul>" },

  { t: "os",
    q: "Co je proces a co obsahuje?",
    a: "<b>Běžící instance programu.</b> OS o něm drží <b>PCB (Process Control Block)</b>:<ul><li>PID, stav (running, ready, blocked…)</li><li>vlastní <b>virtuální adresní prostor</b> (kód, data, halda, zásobník)</li><li>otevřené soubory (file descriptors), registry, čítač instrukcí</li><li>přístupová práva (UID/GID)</li></ul>" },

  { t: "os",
    q: "Jaký je rozdíl mezi procesem a vláknem?",
    a: "<ul><li><b>Proces</b> – vlastní adresní prostor, izolovaný, drahé vytvoření/přepnutí</li><li><b>Vlákno</b> – \"lehký proces\" uvnitř procesu; <b>sdílí adresní prostor</b> (kód, data, halda, soubory) s ostatními vlákny, ale má vlastní zásobník a registry</li></ul><b>Důsledek:</b> komunikace mezi vlákny je snadná (sdílená paměť), ale hrozí <b>race conditions</b> a je nutná synchronizace.</li></ul>" },

  { t: "os",
    q: "Co je plánování (scheduling) a jak dělíme plánovače?",
    a: "<b>Rozhodování, který proces/vlákno poběží na CPU.</b><ul><li><b>Preemptivní</b> – plánovač může odebrat CPU běžícímu procesu (timer interrupt). Lepší odezva, nutná synchronizace.</li><li><b>Nepreemptivní (kooperativní)</b> – proces běží, dokud se sám nevzdá CPU.</li></ul>Cíle: spravedlnost, propustnost, krátká odezva, využití CPU." },

  { t: "os",
    q: "Vyjmenuj a popiš základní plánovací algoritmy.",
    a: "<ul><li><b>FCFS</b> (First-Come-First-Served) – fronta, jednoduché, ale dlouhé úlohy blokují (convoy effect)</li><li><b>SJF / SRTF</b> – nejkratší úloha první, optimální průměrná doba čekání, ale hrozí hladovění</li><li><b>Round Robin</b> – časové kvantum, spravedlivé, dobré pro interaktivní</li><li><b>Prioritní</b> – podle priority (riziko hladovění → aging)</li><li><b>MLFQ</b> (víceúrovňové fronty se zpětnou vazbou) – adaptivní, používá se v praxi</li></ul>" },

  { t: "os",
    q: "Rozdíl mezi souběžností (concurrency) a paralelismem?",
    a: "<ul><li><b>Souběžnost</b> – více úloh \"probíhá\" v překrývajících se intervalech (i na 1 jádře střídáním). Je to o <b>struktuře</b> programu.</li><li><b>Paralelismus</b> – úlohy běží <b>opravdu současně</b> na více jádrech. Je to o <b>provedení</b>.</li></ul>Souběžnost je možná i bez paralelismu a naopak." },

  { t: "os",
    q: "Co je race condition a kritická sekce?",
    a: "<ul><li><b>Race condition</b> – výsledek závisí na nedeterministickém pořadí přístupů více vláken ke sdílenému zdroji (např. dvě vlákna zvyšují čítač)</li><li><b>Kritická sekce</b> – úsek kódu, kde se přistupuje ke sdílenému zdroji a smí v něm být <b>jen jedno vlákno současně</b> (vzájemné vyloučení / mutual exclusion)</li></ul>" },

  { t: "os",
    q: "Jaká znáš synchronizační primitiva?",
    a: "<ul><li><b>Mutex</b> – zámek, jen jedno vlákno drží (vzájemné vyloučení)</li><li><b>Semafor</b> – čítač povolující N současných přístupů; binární semafor ≈ mutex</li><li><b>Condition variable</b> – čekání na podmínku (wait/signal), používá se s mutexem</li><li><b>Monitor</b> – jazyková konstrukce sdružující data + zámek + podmínky</li><li><b>Spinlock</b> – aktivní čekání (busy-wait), vhodný pro krátké sekce v jádře</li></ul>" },

  { t: "os",
    q: "Co je uváznutí (deadlock) a jaké jsou 4 nutné podmínky?",
    a: "<b>Stav, kdy skupina procesů čeká navzájem na zdroje a žádný nemůže pokračovat.</b><br>Coffmanovy podmínky (musí platit <b>všechny čtyři</b>):<ul><li><b>Vzájemné vyloučení</b> – zdroj může držet jen jeden</li><li><b>Hold and wait</b> – proces drží zdroj a čeká na další</li><li><b>Žádné odebrání (no preemption)</b> – zdroj nelze násilně odebrat</li><li><b>Kruhové čekání</b> – cyklus procesů čekajících na sebe</li></ul>" },

  { t: "os",
    q: "Jak lze řešit uváznutí (deadlock)?",
    a: "<ul><li><b>Prevence</b> – porušit některou Coffmanovu podmínku (např. pořadí zámků zabrání kruhovému čekání)</li><li><b>Vyhýbání (avoidance)</b> – bankéřův algoritmus, systém povolí jen \"bezpečné\" stavy</li><li><b>Detekce a zotavení</b> – sledovat graf čekání, při cyklu zabít/restartovat proces</li><li><b>Ignorování (pštrosí algoritmus)</b> – předpoklad, že nastane vzácně; běžné v praxi (Linux, Windows)</li></ul>" },

  { t: "os",
    q: "Jak vzniká proces v systémech POSIX? (fork/exec)",
    a: "<ul><li><b>fork()</b> – vytvoří téměř identickou <b>kopii volajícího procesu</b> (potomka). Vrací 0 v potomkovi, PID potomka v rodiči.</li><li><b>exec()</b> – <b>nahradí obraz procesu</b> novým programem (kód, data), ale zachová PID a otevřené deskriptory.</li><li>Typický vzor spuštění programu: <b>fork() + exec()</b> – rozdvojím se a v potomkovi spustím nový program.</li><li><b>wait()</b> – rodič čeká na ukončení potomka a získá návratový kód.</li></ul>" },

  { t: "os",
    q: "Co je copy-on-write (COW) a proč se používá u fork()?",
    a: "<b>Optimalizace: po fork() rodič i potomek sdílejí stejné fyzické stránky označené jen pro čtení.</b><ul><li>Stránka se <b>fyzicky zkopíruje až při prvním zápisu</b> (page fault → MMU vytvoří kopii)</li><li>Šetří paměť a čas – zvlášť když po fork() hned následuje exec() (kopie by byla zbytečná)</li><li>Sdílené read-only stránky (kód, knihovny) se nekopírují nikdy</li></ul>" },

  { t: "os",
    q: "Co jsou zombie a orphan (osiřelé) procesy?",
    a: "<ul><li><b>Zombie</b> – potomek skončil, ale rodič ještě nezavolal <code>wait()</code>. V tabulce procesů zůstává záznam s návratovým kódem, dokud ho rodič nevyzvedne.</li><li><b>Orphan (sirotek)</b> – rodič skončil dřív než potomek. Sirotka <b>adoptuje init/systemd</b> (PID 1), který za něj zavolá wait.</li></ul>" },

  { t: "os",
    q: "Jak fungují uživatelé a přístupová práva v OS (POSIX)?",
    a: "<ul><li>Každý proces má <b>UID</b> (uživatel) a <b>GID</b> (skupina); <b>root (UID 0)</b> má neomezená práva</li><li>Soubory mají práva pro <b>vlastníka / skupinu / ostatní</b>: <b>r, w, x</b> (čtení, zápis, spuštění) → např. <code>rwxr-xr--</code></li><li><b>setuid/setgid</b> – program běží s právy vlastníka souboru (např. <code>passwd</code>)</li><li>Jádro vynucuje kontroly při systémových voláních</li></ul>" },

  { t: "os",
    q: "Co je virtualizace a jaké jsou její typy?",
    a: "<b>Vytvoření abstraktní/izolované verze prostředku.</b><ul><li><b>Plná virtualizace (hypervisor)</b> – běh celého hostovaného OS. <b>Typ 1 (bare-metal)</b>: Xen, ESXi; <b>Typ 2 (hosted)</b>: VirtualBox, VMware Workstation</li><li><b>Paravirtualizace</b> – host OS upraven, ví o hypervisoru (rychlejší)</li><li><b>Kontejnery</b> – virtualizace na úrovni OS, sdílené jádro, izolace přes namespaces + cgroups (Docker, LXC). Lehčí než VM.</li></ul>" },

  { t: "os",
    q: "Z čeho se skládá operační systém (architektura)?",
    a: "<ul><li><b>Jádro (kernel)</b> – správa HW, procesů, paměti; běží privilegovaně</li><li><b>Knihovny</b> – rozhraní mezi aplikacemi a jádrem (libc), poskytují wrappery syscallů</li><li><b>Démoni / služby</b> – procesy běžící na pozadí (logování, síť, plánovač)</li><li><b>Uživatelské rozhraní</b> – shell, GUI</li></ul>Po startu jádro spustí první proces <b>init / systemd</b> (PID 1), který nastartuje ostatní služby." },

  { t: "os",
    q: "Jak se vypočítá velikost stránky a její vliv?",
    a: "<b>Velikost stránky je mocnina dvojky (typicky 4 KiB = 2¹²).</b><ul><li>Počet bitů offsetu uvnitř stránky = log₂(velikost stránky); zbytek virtuální adresy je číslo stránky</li><li>Příklad: 32bitová adresa, stránka 4 KiB → 12 bitů offset, 20 bitů číslo stránky → 2²⁰ stránek</li></ul><b>Velká stránka</b>: méně záznamů v tabulce a méně TLB miss, ale větší <b>interní fragmentace</b>." },

  { t: "os",
    q: "Co je hladovění (starvation) a jak souvisí s deadlockem?",
    a: "<b>Starvation (hladovění) – proces se neustále odkládá a nikdy nedostane potřebný zdroj/CPU.</b><ul><li>Příčina: nespravedlivé plánování nebo priority (nízkoprioritní proces je trvale přeskakován)</li><li>Řešení: <b>aging</b> – postupné zvyšování priority čekajícího procesu</li></ul>Rozdíl od <b>deadlocku</b>: u deadlocku se procesy <b>vzájemně blokují</b> (nikdo nepokračuje), u starvation systém běží, jen konkrétní proces nedostane šanci." },

  { t: "os",
    q: "Co je problém producenta a konzumenta?",
    a: "<b>Klasický synchronizační problém: producent vkládá data do sdíleného omezeného bufferu, konzument je odebírá.</b><ul><li>Producent musí <b>počkat, je-li buffer plný</b>; konzument <b>počkat, je-li prázdný</b></li><li>Řeší se <b>semafory</b>: jeden počítá volná místa, druhý obsazená, plus <b>mutex</b> na vzájemné vyloučení přístupu k bufferu</li></ul>Demonstruje vzájemné vyloučení i podmíněné čekání." },

  { t: "os",
    q: "Jak fungují přerušení a jaké jsou jejich typy?",
    a: "<b>Přerušení = signál, který přeruší běh procesoru a předá řízení obslužné rutině (handler).</b><ul><li><b>Hardwarové (vnější)</b> – od zařízení (klávesnice, časovač, disk) – asynchronní</li><li><b>Softwarové</b> – vyvolaná instrukcí (systémové volání přes trap)</li><li><b>Výjimky (exceptions)</b> – chyby za běhu (dělení nulou, page fault)</li></ul>Po obsloužení se obnoví původní kontext. Časovač pomocí přerušení umožňuje <b>preemptivní plánování</b>." },

  { t: "os",
    q: "Jaký je rozdíl mezi programem, procesem a vláknem?",
    a: "<ul><li><b>Program</b> – <b>pasivní</b> spustitelný soubor (kód a data) na disku</li><li><b>Proces</b> – <b>běžící</b> instance programu s vlastním adresním prostorem a zdroji</li><li><b>Vlákno</b> – jednotka výpočtu uvnitř procesu, <b>sdílí</b> jeho adresní prostor; proces má aspoň jedno vlákno</li></ul>" },

  { t: "os",
    q: "Jaké jsou architektury OS kromě monolitického a mikrojádra?",
    a: "<ul><li><b>Vrstvené</b> – jako ISO/OSI pro celý OS; rozdrobené, drahá režie (Windows NT 4.0)</li><li><b>Modulární</b> – komponenty jádra jako v OOP přes rozhraní (macOS)</li><li><b>Klient-server</b> – procesy klientské/serverové (jako mikrojádro)</li></ul>Minimalistické: <b>Unikernel</b> (jádro pro jedinou aplikaci), <b>Exokernel</b> (přímý přístup aplikací k HW). Hybridní jádro (Windows) kombinuje výhody mono i mikro." },

  { t: "os",
    q: "Co je DMA a IPC?",
    a: "<ul><li><b>DMA (Direct Memory Access)</b> – HW přistupuje do RAM <b>nezávisle na CPU</b> (asynchronně); CPU si výsledek jen občas přečte → odlehčení procesoru</li><li><b>IPC (meziprocesová komunikace)</b> – procesy mají izolovanou paměť, komunikují přes <b>sdílenou paměť, sokety, roury, zprávy</b> (MPI)</li></ul>Vlákna oproti procesům sdílí paměť přímo (jen reference)." },

  { t: "os",
    q: "Co je PCB/TCB a co se děje při přepnutí kontextu?",
    a: "<ul><li><b>PCB (Process Control Block)</b> – jádro v něm uchovává stav procesu (registry, PID, paměť, soubory)</li><li><b>TCB (Thread Control Block)</b> – obdoba pro vlákno</li></ul><b>Přepnutí kontextu (context switch)</b>: uloží registry, <b>vymění stránkovací tabulku</b>, <b>vyprázdní TLB</b> a cache → proto je <b>drahé</b>. Přepnutí vláken téhož procesu je levnější (jen registry)." },

  { t: "os",
    q: "Jaké jsou stavy procesu?",
    a: "<ul><li><b>Nový (new)</b> – právě vytvořen</li><li><b>Připravený (ready)</b> – čeká na přidělení CPU</li><li><b>Běžící (running)</b> – zpracováván procesorem</li><li><b>Čekající (waiting/blocked)</b> – čeká na událost (I/O)</li><li><b>Ukončený (terminated)</b></li></ul>Se střednědobým plánovačem přibývají <b>odložené (swapped out)</b> stavy." },

  { t: "os",
    q: "Jak se virtuální adresa dělí na číslo stránky a offset?",
    a: "<b>Stránka má velikost 2ⁿ bajtů → spodních n bitů adresy je OFFSET, zbytek číslo stránky.</b><ul><li><b>Offset se při překladu jen opíše</b> z virtuální do fyzické adresy (stránka i rámec jsou zarovnané na 2ⁿ)</li><li>Příklad: stránka 4 KiB = 2¹² → 12 bitů offset, zbytek mapuje MMU</li><li>Vícestupňové tabulky: 32bit adresa → 10+10 bitů (2 úrovně) + 12 offset</li></ul>" },

  { t: "os",
    q: "Co je externí stránkování, líné načítání a mapování souborů?",
    a: "<b>Externí stránkování – mapování virtuálních adres na diskové úložiště (swap).</b><ul><li><b>Líné načítání</b> – do RAM se kopírují jen části programu, které jsou právě potřeba</li><li><b>Mapování souborů (mmap)</b> – soubor se tváří jako paměť, čtení/zápis jsou přístupy do paměti</li><li><b>Page fault</b> – přístup ke stránce, která není v RAM → načtení z disku</li></ul>" },

  { t: "os",
    q: "Co je spin-lock, CAS a Petersonův algoritmus?",
    a: "<ul><li><b>Spin-lock</b> – aktivní čekání ve smyčce (busy-wait); vytěžuje CPU → řeší se uspáváním mezi pokusy</li><li><b>CAS (compare-and-swap)</b> – atomická operace: přečte hodnotu a změní ji jen pokud odpovídá očekávané (základ lock-free)</li><li><b>Petersonův algoritmus</b> – softwarové vzájemné vyloučení pro 2 vlákna; vyžaduje atomické zápisy</li></ul>Kritickou sekci chrání zámek (bitová proměnná) přes atomické operace." },

  { t: "os",
    q: "Jaký je rozdíl mezi hladověním, uváznutím a livelockem?",
    a: "<ul><li><b>Hladovění (starvation)</b> – vlákno je připravené, ale plánovač mu trvale odpírá zdroj (nespravedlivost)</li><li><b>Uváznutí (deadlock)</b> – vlákna se vzájemně blokují (cyklus čekání), nikdo nepokročí</li><li><b>Livelock</b> – vlákna reagují na sebe a mění stav, ale <b>nepostupují</b> (např. oba neustále ustupují)</li></ul>Vláknová afinita = snaha držet vlákno na stejném jádře (kvůli cache)." }
);
