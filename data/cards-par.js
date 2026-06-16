// 12. Paralelní systémy (IB109)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.par = { label: "🔀 Paralelní systémy", cls: "tag-par", order: 23 };

FC.cards.push(
  { t: "par",
    q: "Jaký je rozdíl mezi paralelním a distribuovaným prostředím (sdílená vs distribuovaná paměť)?",
    a: "<ul><li><b>Sdílená paměť</b> – procesory/vlákna přistupují ke <b>společné paměti</b>, komunikují přes sdílené proměnné. Nutná synchronizace (zámky). Modely: OpenMP, POSIX Threads.</li><li><b>Distribuovaná paměť</b> – každý uzel má <b>vlastní paměť</b>, komunikuje <b>posíláním zpráv</b> přes síť. Lépe škáluje na mnoho uzlů. Model: MPI.</li></ul>" },

  { t: "par",
    q: "Co je dekompozice při návrhu paralelních algoritmů a jaké jsou typy?",
    a: "<b>Rozdělení výpočtu na úlohy, které mohou běžet souběžně.</b><ul><li><b>Datová dekompozice</b> – data se rozdělí na části, na každé se provádí stejná operace (SIMD, např. násobení matic po blocích)</li><li><b>Úlohová (funkční) dekompozice</b> – rozdělení podle různých funkcí/kroků (pipeline)</li><li><b>Rekurzivní</b> – rozděl a panuj</li></ul>Cíl: dostatek nezávislých úloh a minimum závislostí." },

  { t: "par",
    q: "Co je mapování a komunikační primitiva?",
    a: "<ul><li><b>Mapování</b> – přiřazení úloh procesorům/vláknům. Cíle: <b>vyvážení zátěže (load balancing)</b> a <b>minimalizace komunikace</b> (často v konfliktu)</li><li><b>Komunikační primitiva</b>:<ul><li><b>Point-to-point</b> – send/receive mezi dvěma procesy</li><li><b>Kolektivní</b> – broadcast, scatter, gather, reduce, barrier (zapojí skupinu procesů)</li></ul></li></ul>" },

  { t: "par",
    q: "Jak se měří výkon paralelních algoritmů (zrychlení, efektivita)?",
    a: "<ul><li><b>Zrychlení (speedup)</b> S(p) = T₁ / Tₚ – kolikrát rychlejší na p procesorech oproti jednomu</li><li><b>Ideální (lineární)</b> zrychlení = p; reálně méně kvůli režii a komunikaci</li><li><b>Efektivita</b> E(p) = S(p) / p – jak dobře jsou procesory využity (ideálně 1)</li></ul>" },

  { t: "par",
    q: "Co říká Amdahlův zákon a co Gustafsonův?",
    a: "<ul><li><b>Amdahlův zákon</b> – při <b>pevné</b> velikosti úlohy omezuje zrychlení <b>sériová část</b>: S ≤ 1 / (s + (1−s)/p), kde s je neparalelizovatelný podíl. Při p→∞ je strop <b>1/s</b>.</li><li><b>Gustafsonův zákon</b> – při <b>rostoucí</b> velikosti úlohy s počtem procesorů roste i paralelní část, takže zrychlení škáluje téměř lineárně (optimističtější pohled)</li></ul>Příklad: 5 % sériový kód → max zrychlení 20×, ať máme jakkoli mnoho procesorů." },

  { t: "par",
    q: "Co je OpenMP?",
    a: "<b>Standard pro paralelní programování ve sdílené paměti (C/C++/Fortran) pomocí direktiv (pragm).</b><ul><li>Model <b>fork-join</b>: hlavní vlákno se na paralelní oblasti rozdělí na tým vláken a po ní se opět spojí</li><li>Příklad: <code>#pragma omp parallel for</code> rozdělí iterace cyklu mezi vlákna</li><li>Podpora pro <b>redukce</b>, kritické sekce, bariéry; vysokoúrovňové, snadné na použití</li></ul>" },

  { t: "par",
    q: "Co jsou POSIX Threads (pthreads)?",
    a: "<b>Nízkoúrovňové API pro práci s vlákny ve sdílené paměti (standard POSIX).</b><ul><li>Explicitní vytváření a řízení vláken: <code>pthread_create</code>, <code>pthread_join</code></li><li>Synchronizace: <b>mutexy</b> (<code>pthread_mutex</code>), <b>podmínkové proměnné</b>, bariéry</li><li>Větší kontrola než OpenMP, ale více kódu a vyšší riziko chyb (race conditions, deadlocky)</li></ul>" },

  { t: "par",
    q: "Co je lock-free přístup a jaké má výhody?",
    a: "<b>Synchronizace bez zámků – pomocí atomických instrukcí místo mutexů.</b><ul><li>Klíčová operace <b>CAS (Compare-And-Swap)</b> – atomicky porovná a zapíše hodnotu</li><li><b>Výhody</b>: žádné uváznutí (deadlock), žádné blokování vláken, lepší škálování</li><li><b>Garance</b>: aspoň jedno vlákno vždy postoupí (lock-free); silnější je <b>wait-free</b> (každé vlákno postoupí v omezeném čase)</li></ul>Nevýhoda: složitá a náchylná na chyby (ABA problém)." },

  { t: "par",
    q: "Co je MPI (Message Passing Interface)?",
    a: "<b>Standard pro paralelní programování v prostředí s distribuovanou pamětí pomocí posílání zpráv.</b><ul><li>Procesy mají vlastní paměť a komunikují <b>explicitně zprávami</b>: <code>MPI_Send</code>, <code>MPI_Recv</code></li><li><b>Kolektivní operace</b>: <code>MPI_Bcast</code>, <code>MPI_Scatter</code>, <code>MPI_Gather</code>, <code>MPI_Reduce</code>, <code>MPI_Barrier</code></li><li>Každý proces má své <b>rank</b> (číslo) v komunikátoru</li><li>Standard pro <b>superpočítače a clustery</b></li></ul>" },

  { t: "par",
    q: "Jaké jsou hlavní problémy a rizika paralelního programování?",
    a: "<ul><li><b>Race condition</b> – výsledek závisí na časování přístupů ke sdíleným datům</li><li><b>Deadlock</b> – vlákna se vzájemně blokují (čekání na zdroje v cyklu)</li><li><b>Starvation</b> – vlákno se nikdy nedostane ke zdroji</li><li><b>False sharing</b> – vlákna píší do různých proměnných ve stejné cache-line → zbytečná invalidace</li><li><b>Režie synchronizace a komunikace</b> snižuje zrychlení</li></ul>" },

  { t: "par",
    q: "Co je Flynnova klasifikace?",
    a: "<b>Dělení paralelních architektur podle instrukcí a dat:</b><ul><li><b>SISD</b> – Single Instruction Single Data: sekvenční výpočty</li><li><b>SIMD</b> – Single Instruction Multiple Data: vektorové instrukce, <b>GPU</b></li><li><b>MIMD</b> – Multiple Instruction Multiple Data: <b>vícejádrové procesory</b></li><li><b>MISD</b> – nepoužívá se</li></ul>" },

  { t: "par",
    q: "Co je cache koherence a false sharing (jak se řeší)?",
    a: "<ul><li><b>Koherence</b> – vždy musí existovat jediná platná hodnota pro místo v paměti sdílené více jádry</li><li><b>False sharing</b> – dvě vlákna mění různé proměnné ve <b>stejné cache line</b>; úprava jednou stranou donutí druhou znovu nahrát celou cache line (zbytečné zpomalení)</li></ul>Řešení: <b>padding</b> (odsadit data na různé cache lines), atomické operace (CAS)." },

  { t: "par",
    q: "K čemu slouží klíčové slovo volatile a co je thread-safe vs reentrantní?",
    a: "<ul><li><b>volatile</b> – hodnota se může nečekaně měnit (jiné vlákno, I/O port, přerušení); vynucuje čtení/zápis do paměti místo registru. <b>Negarantuje pořadí</b> → stále nutná synchronizační primitiva.</li><li><b>Thread-safe</b> – proceduru lze bezpečně volat z více vláken bez synchronizace</li><li><b>Reentrantní</b> – lze ji kdykoli přerušit a spustit znovu na jiném vlákně</li></ul>" },

  { t: "par",
    q: "Co je graf závislostí, kritická cesta a granularita?",
    a: "<ul><li><b>Graf závislostí</b> – částečné uspořádání úloh; úloha je připravena, když jsou hotové její závislosti (topologické uspořádání)</li><li><b>Kritická cesta</b> – cesta grafem s maximální prací (limituje minimální dobu)</li><li><b>Granularita</b>: <b>jemnozrnná</b> (mnoho malých úloh) vs <b>hrubozrnná</b> (větší úlohy, menší režie)</li></ul>Stupeň souběžnosti = max počet souběžných úloh." },

  { t: "par",
    q: "Jaké jsou specializované techniky dekompozice (průzkumová, spekulativní, MAP-REDUCE)?",
    a: "<ul><li><b>Průzkumová</b> – pro prohledávání; každé vlákno jiný směr, po nalezení všechna zastaví (může dát <b>superlineární zrychlení</b>)</li><li><b>Spekulativní</b> – spustí čekající úlohu nad všemi možnými výsledky předchozí (web search)</li><li><b>Hybridní / MAP-REDUCE</b> – rozděl a panuj napříč počítači; hledání minima O(n) → O(log p) při p procesorech</li></ul>" },

  { t: "par",
    q: "Jaké jsou strategie mapování úloh na vlákna (statické vs dynamické)?",
    a: "<ul><li><b>Statické</b> (v době kompilace) – blokové (data po blocích), <b>cyklické</b> (rovnoměrnější zátěž), blokově-cyklické; menší režie</li><li><b>Dynamické</b> (za běhu) – flexibilní, vyrovnává zátěž; <b>samo-plánování</b> (vlákno si vezme další úlohu), <b>afinitní plánování</b> (úlohy cestují levně, drží se na jádrech sdílejících cache)</li></ul>Cíl: rovnoměrná zátěž, menší režie, max souběžnost." },

  { t: "par",
    q: "Jaká je cena komunikace a typy komunikace (blokující, bafrované)?",
    a: "<b>Cena: T = tₛ + m·t_w</b> (latence + objem × cena za jednotku).<ul><li><b>Blokující</b> – proces čeká na dokončení (pošťák čeká před domem); <b>neblokující</b> – běží dál (balík u dveří)</li><li><b>Bafrované</b> – do bufferu (poštovní schránka), nevyžaduje souhru; <b>nebafrované</b> – příjemce musí být přítomen (balík do ruky)</li></ul><b>Embarrassingly parallel</b> – úlohy tak malé, že nepotřebují režii (ray casting)." },

  { t: "par",
    q: "Jaké jsou topologie komunikačních kanálů a kolektivní operace?",
    a: "<b>Topologie:</b> prsten, hvězda (Master-Slave, úzké hrdlo), <b>hyperkostka</b> (log₂n rozměrů), strom.<ul><li><b>One-to-all</b> – Broadcast, Scatter (každý posílá svou část) – přes <b>rekurzivní zdvojení</b> (počet uzlů se zdvojuje)</li><li><b>All-to-one</b> – Gather, <b>Reduce</b> (kombinace přes +, ×, AND…)</li><li><b>All-to-all</b> – E-cube routing na hyperkostkách</li></ul>" },

  { t: "par",
    q: "Co je CAS, ABA problém a hazardní ukazatele?",
    a: "<b>CAS (Compare-And-Swap)</b> – atomicky: pokud *addr == exp, nahraď val (vrátí true/false). Základ lock-free.<ul><li><b>ABA problém</b> – hodnota se změní A→B→A, CAS si myslí, že se nezměnila → workaround: <b>tag/timestamp</b></li><li><b>Hazardní ukazatele</b> – řeší lock-free dealokaci bez GC; vlákna zveřejňují seznam používaných ukazatelů (čítač 0 → lze dealokovat)</li></ul>" },

  { t: "par",
    q: "Jaký je rozdíl mezi lock-free a wait-free, a co je WRRM?",
    a: "<ul><li><b>Lock-free</b> – při souběhu vždy <b>aspoň jedno</b> vlákno dokončí (žádné uváznutí)</li><li><b>Wait-free</b> – silnější: <b>každé</b> vlákno dokončí v omezeném čase</li></ul><b>WRRM (Write-Rarely-Read-Many)</b> – čtenáři vs písaři; při málo zápisech povolí souběžné čtení. Zápis vytvoří kopii a CAS přepne ukazatel (potřebuje GC / hazardní ukazatele). Použití: tabulka kurzů." },

  { t: "par",
    q: "Jak se v POSIX Threads používají podmínkové proměnné?",
    a: "<b>Řeší aktivní čekání spin-locku a režii uspávání.</b><ol><li>Vlákno získá mutex, zkontroluje podmínku</li><li>Je-li false → <code>pthread_cond_wait()</code> (uvolní mutex a čeká)</li><li>Jiné vlákno změní podmínku a <code>pthread_cond_signal()</code></li><li>Probuzené vlákno znovu získá mutex a zkontroluje podmínku</li></ol><code>pthread_cond_broadcast()</code> probudí všechna čekající vlákna (O(n))." },

  { t: "par",
    q: "Jaké jsou hlavní OpenMP direktivy?",
    a: "<b>OpenMP – paralelizace přes pragma direktivy (překladač), přepínač -fopenmp.</b><ul><li><b>parallel</b> – blok běží paralelně (počet vláken OMP_NUM_THREADS, proměnné private/shared)</li><li><b>for</b> – paralelní cyklus (jen v parallel; ordered vynutí pořadí)</li><li><b>single</b> – jen jedno vlákno; <b>sections</b> – podbloky paralelně</li><li><b>reduce</b> – redukce skalárních výsledků; <b>critical/atomic/flush</b></li></ul>" },

  { t: "par",
    q: "Jaké jsou základní funkce MPI?",
    a: "<b>MPI – komunikace zprávami v distribuované paměti, abstrahuje typy přes Datatype.</b><ul><li><b>MPI_Init / MPI_Finalize</b></li><li><b>MPI_COMM_WORLD</b> – skupina všech procesů; <b>MPI_Comm_rank</b> (ID), <b>MPI_Comm_size</b> (počet)</li><li><b>MPI_Send / MPI_Recv</b> (point-to-point), neblokující <b>Isend/Irecv</b></li><li>Kolektivní: <b>MPI_Bcast</b> (rozeslání), <b>MPI_Reduce</b> (sběr + operace)</li></ul>" },

  { t: "par",
    q: "Jak se počítá zrychlení, efektivita a režie?",
    a: "<ul><li><b>Zrychlení S = Tₛ / Tₚ</b> (Tₛ = čas <b>nejlepšího sekvenčního</b> algoritmu, NE paralelního na 1 jádře!)</li><li><b>Efektivita E = S / p = Tₛ / (p·Tₚ)</b> – podíl času věnovaný algoritmu, ne režii</li><li><b>Režie T_o = p·Tₚ − Tₛ</b></li><li><b>Cena C = p·Tₚ</b></li></ul>S použitím p zdrojů <b>nedosáhneme p-násobného</b> zrychlení (kvůli neparalelizovatelné části a režii)." },

  { t: "par",
    q: "Jaký je vzorec Amdahlova zákona a co je superlineární zrychlení?",
    a: "<b>S_max = 1 / ((1−p) + p/Sₚ)</b>, kde p = paralelizovatelný podíl, Sₚ = zrychlení paralelní části.<ul><li>Příklad: p=0,3, Sₚ=4 → S = 1/(0,7 + 0,075) = <b>1,29</b> (129 %)</li><li>Při p→∞ je strop <b>1/(1−p)</b></li></ul><b>Superlineární zrychlení</b> (&gt; p×) – buď falešné (špatný sekvenční referent), nebo skutečné (víc vláken = víc cache, průzkumová dekompozice)." },

  { t: "par",
    q: "Co je škálovatelnost a izoefektivní funkce?",
    a: "<ul><li><b>Škálovatelnost</b> – míra zachování efektivity při růstu počtu jader i vstupu (testovat na reálných datech)</li><li><b>Izoefektivní funkce</b>: Tₛ = K · T_o(W, p) – jak rychle musí růst objem práce W, aby se udržela efektivita při přidávání vláken</li></ul>Čím pomalejší růst (O(p log p) lepší než O(p²)), tím lepší škálování. K = E/(1−E)." }
);
