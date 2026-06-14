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
    a: "<ul><li><b>Race condition</b> – výsledek závisí na časování přístupů ke sdíleným datům</li><li><b>Deadlock</b> – vlákna se vzájemně blokují (čekání na zdroje v cyklu)</li><li><b>Starvation</b> – vlákno se nikdy nedostane ke zdroji</li><li><b>False sharing</b> – vlákna píší do různých proměnných ve stejné cache-line → zbytečná invalidace</li><li><b>Režie synchronizace a komunikace</b> snižuje zrychlení</li></ul>" }
);
