# 12. Paralelní systémy

> **Zadání:** Paralelní systémy. Základní metody v návrhu paralelních algoritmů – dekompozice, mapování, komunikační primitiva. Výkonnostní analýza paralelních algoritmů. Paralelní algoritmy v prostředí se sdílenou pamětí. OpenMP standard. POSIX Threads. Lock-free přístup. Paralelní algoritmy v prostředí s distribuovanou pamětí. Message Passing Interface (MPI). (IB109)

# Paralelismus

**Paralelní systém** je systém, jehož chování vzniká interakcí souběžných procesů.

**Výpočetní paralelismus** znamená provádět dílčí výpočty souběžně za účelem zvýšení výkonu. Zvyšování výkonu dnes závisí na zvyšování počtu jader ⇒ určitá úroveň paralelismu je nutná pro návrh výkonných a škálovatelných řešení.

**Nevýhody** paralelního programování sestávají z rizika **souběžnosti** a nutnosti **koordinace** (overhead):

- Race-condition, Deadlock, Livelock, Starving, Přetečení, Aktivní čekání (viz Otázka 6 – Operační systémy)
- Pro optimální výkon musíme zátěž rozložit napříč vlákny ⇒ vyšší komplexita návrhu
- Neexistuje debugger pro více procesů naráz. Chybové hlášky musí hlásit identitu vlákna
- **Emergentní jevy** → chování, které není explicitně naprogramované
	- Vzniká shodou okolností jako vedlejší efekt běžících procesů

Pro dělení paralelních systémů se využívá **Flynnova klasifikace**:

- **SISD** → Single Instruction on Single Data ⇒ sekvenční výpočty
- **SIMD** → Single Instruction on Multiple Data ⇒ vektorové instrukce CPU, GPU
- **MIMD** → Multiple Instructions on Multiple Data ⇒ vícejádrové procesory
- **MISD** → Multiple Instructions on Single Data ⇒ nepoužívá se

## Cache

**Cache** je část dat zkopírovaná blíže k procesoru pro rychlejší přístup.

- L1, L2 v režii CPU, RAM paměť jako cache pro data na disku
- **Koherence** → vždy musí existovat jediná platná hodnota asociovaná s místem v paměti
	- Pokud ji sdílí více jader, musíme zajistit konzistenci
- Zápisy procesoru se odkládají a sdružují dle paměťového modelu
- **Cache line** → atomický blok paměti v cache
- **Hit ratio** → úspěšnost obsloužení požadavků hodnotami v cache
- **Vylití cache** → aktualizace dat v paměti hodnotami v cache
	- Pokud je cache příliš malá, **vylévá se příliš často** ⇒ ztráta výkonu
	- Cache může být cíleně vylita a naplněna škodlivým kódem ⇒ **cache poisoning**

**False Sharing** je problém, kdy více vláken přistupuje k různým proměnným uloženým na stejné **cache line**.

- **Po úpravě** 1. vláknem se celá **cache line** označí jako **modifikovaná**.
- 2. vlákno může třeba jen **číst** úplně jinou proměnnou ve stejné cache line, ale modifikace jej donutí zbytečně **nahrát celou cache line znovu**.
- **Řešení**:
	- **Padding** → odsazovat data tak daleko, aby byly na různých cache lines
	- Přiřazení paměťového prostoru jednotlivým vláknům
	- Používat pouze atomické operace – CAS apod.

## Nestálá proměnná – volatile

- **Nestálá** ⇒ její hodnota se může nečekaně měnit ⇒ třeba ji aktualizuje jiné vlákno
- Aktualizace dat se může propsat pouze do registru pro rychlejší přístup
	- Jenže každé vlákno má své vlastní registry ⇒ **Problém**
- **Volatile** vynucuje zapisování změn do paměti, omezuje optimalizace a nepoužívá registry
- **Příklady použití:**
	- Proměnná sdílená mezi souběžnými vlákny/procesy.
	- Proměnná zastupující vstupní / výstupní port.
	- Proměnná modifikovaná procedurou obsluhující přerušení.
- **Riziko** ⇒ zápis do paměti ale **není okamžitý** → shlukování / odkládání pořád hraje roli
	- **Volatile** negarantuje pořadí ⇒ stále musíme použít **synchronizační primitiva**
	- Popis prokládání je součástí paměťového modelu CPU

**Thread-safe** a **reentrantní** procedury:

- Procedura je **thread-safe**, pokud ji lze bezpečně provádět několika vlákny bez synchronizace.
- Procedura je **reentrantní**, pokud může být v kterémkoliv bodě přerušena a spuštěna znovu na jiném vlákně (jakože nová instance) a poté dokončena na původním vlákně.

# Systémová prostředí

**Prostředí se sdílenou pamětí** znamená, že procesy sdílejí globální adresní prostor. Čtou z něj a zapisují asynchronně, což usnadňuje komunikaci.

- **Např.** POSIX, OpenMP, TBB ⇒ využití v systémech s více procesy / vícejádrovými procesory

**Prostředí s distribuovanou pamětí** znamená, že procesy mají oddělené paměťové prostory a komunikují spolu pomocí explicitního zasílání zpráv. Každý proces má také vlastní hodiny.

- Takové systémy mohou např. **poskytovat své výpočetní prostředky přes síť**
- Implementace paralelních úloh pomocí **MPI**
- Zasílání zpráv je bezpečnější, ale složitější, náročnější na režii atd.

# Základní metody v návrhu paralelních algoritmů

## Dekompozice

- **Dekompozice** je rozložení výpočetního problému na paralelizovatelné podproblémy
- Programátor musí identifikovat souběžně proveditelné činnosti
	- Dekomponovat problém na úlohy a úlohy namapovat na vlákna

**Graf závislostí** definuje částečné uspořádání úloh.

- Úloha je připravena k vykonání, pokud jsou dokončené její závislosti (**topologické uspořádání**)
- **Kritická cesta** ⇒ cesta grafem s maximální vykonanou prací

**Granularita** ⇒ stupeň důkladnosti dekompozice.

- Mnoho malých úloh ⇒ **jemnozrnná** granularita
- Větší úlohy ⇒ **hrubozrnná** granularita
- Můžeme **deškálovat** hrubší úlohy za účelem snížení režie

**Stupeň souběžnosti** ⇒ maximální počet souběžných úloh.
Limitem je **vnitřní hranice granularity** ⇒ maximální rozdrobení.

### Obecné způsoby dekompozice

Dekompozice podle dat / dekompozice podle úloh (rekurzivní).

- **Úlohová / rekurzivní dekompozice**
	- Problém dekomponujeme tak, aby se podúlohy mohly dělit stejným způsobem ⇒ **Rozděl a panuj!**
	- Nutné dělit na podobně náročné úlohy ⇒ vyvážená zátěž
	- Quicksort, hledání minima v poli
- **Datová dekompozice** ⇒ podmnožiny dat jsou zpracovány paralelně
	- Např. obrovské matice lze zpracovávat třeba po 32×32 blocích
	- Tedy **více vláken dělá stejnou úlohu nad různými daty**

### Specializované techniky dekompozice

- **Průzkumová dekompozice**
	- Specializovaná technika pro prohledávací úlohy ⇒ dělení dle směrů prohledávání
	- **Cíl** ⇒ snaha o rovnoměrné zatížení procesorů
	- Každému vláknu dáme jinou variantu → každé třeba prohledává jiným směrem
	- Až některé vlákno najde výsledek, všechna zastaví
	- **Využití**: paralelní prohledávání grafů, AI atd.
	- Pokud prohledávám strom, mohu se zanořit třeba do 4. patra a pak nechat každý podstrom prohledávat nějakým vláknem.
- **Spekulativní dekompozice**
	- Vhodná pro sekvenčně závislé datové úlohy
	- Čekající úloha se spustí nad všemi možnými výstupy předcházející úlohy
	- Tím se koná zbytečná práce, vhodné jen pokud můžeme statisticky odhadnout možné výsledky
	- Problémy s přístupem ke sdíleným zdrojům
	- **Využití**: Web Search ⇒ paralelní před-příprava odpovědí na možné dotazy
- **Hybridní dekompozice** ⇒ **Kombinace** různých způsobů dekompozice
	- schéma **MAP-REDUCE**
		- Map-Reduce je programovací model, který dokáže přidělit úlohy a zpracovat výsledky v distribuovaných systémech – napříč počítači.
		- Např. pole dělíme (Rozděl a panuj!) a nad každou částí spouštíme vlákno
		- Tím najdeme minima jednotlivých částí v čase $O(n/p)$
		- Po kombinaci bude celková složitost při dostatku **p** procesorů $O(\log(p))$
		- **Využití**: hledání minima v poli ⇒ sekvenčně $O(n)$

## Mapování

Mapování je proces přiřazování úloh vláknům/procesům.

- **Naivně** ⇒ 1 úloha → 1 vlákno/proces
- **Cíl** ⇒ rovnoměrná zátěž, menší režie, maximální souběžnost
	- K tomu nám pomůže graf závislostí a dobrá granularita

### Statické zadání úloh

Dekompozice řešena v době kompilace. Za běhu se nemění.
Úlohy musí být předem definovány, menší režie, méně komunikace ⇒ **efektivní**.
Např. při zpracování obrazu, kde mám pevně definovanou velikost dat.

**Mapování dle rozdělení dat**

- **Blokové** → dělíme data na bloky. Každý pak přiřadíme jinému vláknu
	- **Např.** prohledávání pole po ¼ mezi 4 vlákny, násobení matic…
	- Data jsou sice rozdělena rovnoměrně, ale míra práce ne!
- **Cyklické** → cyklicky přiřazujeme jednotlivé úlohy procesům
	- Více režie, ale vyvážená distribuce práce
	- **Blokově-cyklické** → cyklicky přiřazuje bloky dat mezi vlákny
		- Bloky časem ubývají, ale vlákna si stále dělí práci ⇒ rovnoměrnost
- Bloky lze distribuovat i **náhodně**, nebo **dělením grafů (3D objekty)**

**Mapování dle rozdělení úloh**

- Dělení podle grafu závislostí, dělení dle **hierarchií** ⇒ do vrstev apod.

### Dynamické zadání úloh

Dekompozice probíhá za běhu ⇒ flexibilní, dynamicky vyrovnává zátěž, nutná komunikace.
Např. zpracování webových požadavků na straně serveru.

**Centralizovaná schémata dynamického mapování**

- Dedikovaná úloha provádí mapování ⇒ shromažďuje úlohy na jednom místě
- **Samo-plánování** → proces si sám po dokončení vezme další úlohu
- **Blokové plánování** → úlohy se přiřazují v blocích

**Distribuované schéma** ⇒ procesy si mohou navzájem vyměňovat úlohy

- **Problém**: cestování úloh je nákladné
- **Afinitní plánování** ⇒ zajišťuje, že úlohy cestují co nejlevněji. Cestování mezi vlákny proběhne v rámci procesu. Pokud jádra sdílí cache, bude se cestovat primárně mezi nimi, aby se předešlo kopírování dat!

## Komunikace

Interakce souběžných úloh je potřeba režírovat ⇒ komunikace, synchronizace…
Cílem je **zlevnit režii** ⇒ snižování cestování dat a množství interakcí.

- **Souběh přístupů** lze řešit dekompozicí ⇒ 1 přístup → 1 úloha
- **Prodlevy při čekání na data** lze řešit konáním jiné práce v mezičase
- **Opakované přístupy** ke sdíleným datům lze zefektivnit read-only / write-only daty
- **Drahou komunikaci** pomocí komunikačních primitiv řeší kolektivní komunikační operace ⇒ **MPI**
- Propustnost komunikace lze zvýšit současnou komunikací mezi procesy

**Embarrassingly parallel** ⇒ dekompozice na tak malé úlohy, že nepotřebují režii. Např. ray casting.

**Cena komunikace** ⇒ latence + objem dat × šířka pásma

$$T = t_s + m \cdot t_w$$

- **Blokující** → po zavolání komunikační funkce čeká proces na její dokončení
	- Bezpečné, ale pomalé ⇒ **pošťák čeká před tvým domem**, dokud se nevrátíš
- **Neblokující** → proces běží dál
	- Rychlejší, ale musíme ověřovat, že komunikace byla dokončena předtím, než začneme využívat komunikovaná data – třeba bariérou
	- Pošťák na tebe **nečeká**. Nechá **balík u dveří.**
- **Bafrované** → komunikace se ukládá do bufferu
	- Nemusí být zpracována ihned, buffer je vlastně **poštovní schránka**
	- Nevyžaduje kooperaci druhé strany ⇒ rychlejší, lepší pro větší zprávy
- **Nebafrované** → příjemce musí být k dispozici, aby mohlo předání proběhnout
	- Komunikace vyžaduje souhru obou stran ⇒ **balík do ruky**

|  | **Blokující** | **Neblokující** |  |
|---|---|---|---|
| **Bafrované** | `send` skončí, jakmile jsou data nakopírována do bafru | `send` skončí, jakmile je inicializován DMA přenos | Asynchronní obsluha bufru, vyšší paměťové nároky |
| **Nebafrované** | `send` skončí až po skončení odpovídajícího `receive` | `send` skončí ihned, odešle se pouze požadavek na komunikaci | Nutnost časové synchronizace účastníků komunikace |
|  | Sémantiku operací nelze porušit | Korektní dokončení operací nutné zjišťovat opakovaným dotazováním se |  |

**DMA** přenos ⇒ Direct Memory Access.

### Topologie komunikačních kanálů

**Komunikační primitiva** závisí na fyzické struktuře ⇒ **topologii komunikačních kanálů**.

Komunikace závisí na návrhu komunikační sítě:

- **Prsten** ⇒ uspořádání na uzlech, neblokující komunikace s okolními 2 uzly
- **Hvězdice** ⇒ spojení přes centrální uzel (úzké místo), Master-Slave model
- **Hyperkostka** ⇒ z uzlů složená $\log_2 n$-rozměrná krychle
	- Počet linek $= O(N \cdot \log(N))$
- **Strom** s aktivními vnitřními uzly

### One-To-All komunikace

- **Problém**: posílat data všem přímo z původního uzlu je neefektivní
- **Technika rekurzivního zdvojení**: v každé iteraci so počet zkomunikovaných uzlů zdvojnásobí. Všechny pak propagují informaci dál
- Nejprve se vyplní 1 rozměr a pak až ten další ⇒ vhodné pro **hyperkostky**
- **Složitost** je $d \cdot \log(p^{1/d})$, $d$ → počet rozměrů, $p$ → počet procesů
	- Složitost bude u zkoušky včetně obrázku

![[one-to-all.png|316]]

- **Broadcast** ⇒ One-To-All distribuce zpráv
- **Scatter** ⇒ One-To-All distribuce tak, že každé vlákno posílá svou část zprávy
	- Minimalizuje duplicitu
### All-To-One komunikace

- Podobný princip s OTA
- Procesy s lichým ID pošlou zprávu všem s ID−1 ⇒ zprávy se zkombinují
- Pak se to posílá na násobky čtyř, osmi… až se vše sejde u 1 uzlu
- **Gather** ⇒ sběr dat od jednotlivých vláken / procesů
- **Reduce** ⇒ sběr a kombinace dat pomocí operací +, ×, AND, OR apod.
	- Vhodné pro statistiky
- **Příklad**: sčítání pole prvků

### All-To-All komunikace

- **Problém**: násobné použití One-To-All je příliš pomalé
- Při vysílání si uzel uloží kopii příchozí zprávy a pak ji spolu se svojí zprávou pošle dál ⇒ ve výsledku má pak každý uzel svou kopii každé zprávy

![[A-T-A.png|579]]

- **E-cube routing**
	- A-T-A algoritmus efektivní pro hyperkostky
	- Cesta se řídí binární reprezentací adres uzlů
	- Nejprve projdeme jeden rozměr, pak další

# Standardy

## POSIX Threads

**POSIX** (Portable Operating System Interface) je jednotné rozhraní zajišťující přenositelnost programů. Často implementované v UNIX systémech.
**PThread** (Posix Threads) je exekuční model nezávislý na programovacím jazyku.

**Obsahem je např.** správa vláken, vzájemná vyloučení, podmínkové proměnné:

- **Init**, **destroy**, **wait** and **signal** a jejich parametry
- Všechny potřebují **handle** = `pthread_t`
- Wait potřebuje mutex
- **Mutex** → `pthread_mutexattr_t`, vzájemné vyloučení, čekací funkce, signalizování
- Přístup ke skrytým objektům pomocí **handle**

**Vlákno** → `pthread_attr_t`

- Procesy mají hlavní vlákno
- `pthread_create(pthread_t*, pthread_attr_t*, function, void* arg)` ⇒ vytváří vlákno
- `pthread_exit(void* exit_value);`
- `pthread_join(pthread_t*, void** value)` ⇒ čeká až dané vlákno skončí
- **Detached Threads** ⇒ typ vlákna, který nelze spojit pomocí join

![[pthread.png|417]]

### POSIX – podmíněné funkce / proměnné

Slouží ke komunikaci / synchronizaci vláken.

Podmínková proměnná ⇒ `pthread_condattr_t`

- `pthread_cond_init(pthread_cond_t*, pthread_condattr_t*)`
- `pthread_cond_destroy(pthread_cond_t*)` ⇒ uvolní mutex a zablokuje vlákno
- `pthread_cond_signal(pthread_cond_t*)` ⇒ signalizuje probuzení vlákna
- `pthread_cond_broadcast(pthread_cond_t*)`
	- Odblokuje všechna vlákna, čekající na podmínkovou proměnnou cond.
	- Časová složitost je $O(n)$, protože funkce musí probudit každé vlákno

**Podmínková proměnná řeší problémy Spin-locku a režii uspávání:**

1. Vlákno, které získá mutex, zkontroluje stav podmínky.
2. Pokud je podmínka false ⇒ uvolňuje zámek a spouští `pthread_cond_wait()` ⇒ čeká
3. Jiné vlákno modifikuje podmínku a spustí `pthread_cond_signal()`
4. Signál probudí čekající vlákno, které se pokusí získat mutex
5. Pokud získá mutex, zkontroluje podmínku

## Lock-free programování

Programování bez zamykání. Pro zajištění integrity používá atomické konstrukce (**CAS**).

Rychlejší, efektivnější škálování než POSIX:

- Odpadá režie zámků, zůstává režie koherence paměti
- Minimální prodlevy pro přístup k datům, **neexistuje uváznutí**

**Složitá implementace** ⇒ korektnost algoritmu, trpí na optimalizace překladače.

- **Lock-free procedura** ⇒ garantuje, že při souběhu vláken alespoň 1 vlákno dokončí, zbytek se může uspat
- **Wait-free procedura** ⇒ Lock-free + navíc garantuje nemožnost vzniku uváznutí při souběhu více vláken

### CAS – Compare And Swap

- Speciálně implementovaná **atomická instrukce**
- HW podpora je omezena na několik bytů – 1 až 2 slova CPU
- `CAS(T* addr, T exp, T val)`
- Porovná obsah pod ukazatelem **addr** s hodnotou **exp**
- V případě rovnosti nahradí obsah **addr** hodnotou **val**
- **Některé implementace vrací bool**
	- **True** – nahrazení proběhlo, obsah == exp
	- **False** – někdo mezitím hodnotu přepsal, exp != obsah
- **CAS2** ⇒ to stejné, ale manipuluje s 2 ukazateli
- Při absenci Garbage Collectoru vzniká **ABA problém**
	- V mezičase může dojít ke 2 přepisům s tím, že 2 přepis nastaví zpátky původní hodnotu ⇒ nevíme, že proběhla změna
	- **Workaround**: použití tagu, timestamp apod. uloženým spolu s hodnotou
- Pokud nepřistupujeme k datům vždy atomicky, musíme se spoléhat na **Garbage Collector**
- Problém lock-free dealokace bez Garbage Collectoru řeší **hazardní ukazatele**
	- Každé vlákno zveřejňuje seznam ukazatelů na data, která používá
	- Úpravy seznamu probíhají pomocí CAS
	- **Čítač** ⇒ kolikrát je zrovna ukazatel používaný ⇒ 0 = dealokace

### WRRM – Write-Rarely-Read-Many

- Dělení vláken na **čtenáře** a **písaře**.
- Pokud probíhá málo zápisů, můžeme povolit **souběžný přístup čtenářů** ⇒ efektivnější
- Všichni čtenáři musí čekat než své akce provedou čekající písaři
- **Zápis** → vytvoří se upravená kopie a pak se v kritické sekci **změní ukazatel**
	- Nemůžeme **provést dealokaci**, některé vlákno by totiž mohlo zrovna číst.
	- **Potřebujeme Garbage Collector**
	- Vždy zaměňujeme pouze ukazatel, protože CAS nedokáže zaměnit celé struktury!
- **Reálné použití** ⇒ WRRM mapa / slovník, např. tabulka kurzů měn
	- Interference mezi čtením a zápisem řeší dealokace s použitím hazardních ukazatelů
	- Každý přístup přidává ukazatel do sdíleného seznamu.
	- Update pak odmazává neaktuální ukazatele.

## OpenMP standard

OpenMP je API umožňující paralelní programování v C a C++.

Paralelizaci řeší překladač. Značí si bloky ve zdrojovém kódu podle direktiv.
Jednodušší použití, programátor nemusí být maestro.
Skrývá problémy POSIX i Lock-free přístupů ⇒ **vhodné pro běžné používání**.

**OpenMP zahrnuje** pragma direktivy, knihovní funkce, proměnné prostředí, přepínač `-fopenmp`.

**Direktiva `parallel`**

- Specifikuje blok, který se vykoná paralelně. Může obsahovat podmínku.
- Počet vláken specifikuje proměnná prostředí – `OMP_NUM_THREADS`
- Proměnné lze zkopírovat do vláken nebo mezi nimi sdílet ⇒ `private` / `shared`
- **Paralelismus lze zanořovat** ⇒ v rámci paralelního bloku mohu znovu použít `parallel`

**Direktiva `single`**

- Specifikuje blok, který musí být vykonán pouze jedním vláknem

**Direktiva `reduce`**

- Po skončení bloků se mohou **skalární výsledky** redukovat

**Direktiva `for`**

- Provedení for cyklu paralelně. Funguje pouze v `parallel` bloku
- Lze použít klauzuli `ordered` ⇒ vynutí pořadí jako v sekvenčním výpočtu

**Direktiva `sections`**

- Blok, v němž dělíme kód do podbloků `section`.
- Section bloky se vykonají paralelně
- Existují direktivy pro `atomic`, `critical` (kritická sekce), `flush` (volatile)
- Knihovní funkce pro mutex
- Evoluce ⇒ **Intel TBB** – knihovna + šablony pro paralelizaci, zamykání apod.

**Příklad použití** – Hello World 7×:

```c
#include <omp.h>
main ()
{
    setenv("OMP_NUM_THREADS", 7);
    #pragma omp parallel
    {
        printf("Hello World \n");
    }
}
```

## MPI – Message Passing Interface

**OpenMPI** je implementace rozhraní pro komunikaci mezi vlákny pro jazyk C.
Řeší problémy s nedeterminismem a synchronizací.
Stavěno tak, aby **fungovalo** na všech architekturách ⇒ proto abstrahuje všechny typy → **Datatype**.

- `MPI_COMM_WORLD` → defaultní skupina všech participujících procesů
- `MPI_Comm_size` → vrací počet participujících procesů
- `MPI_Comm_rank` → vrací identifikátor volajícího procesu

`MPI_Init(int *argc, char ***argv)`

- Musím použít původní parametry z mainu
- Nastavuje MPI prostředí → musí se volat na každém procesoru
- `MPI_Finalize()` ⇒ ukončuje MPI

`MPI_Send(void *buf, int count, MPI_Datatype, int dest, int tag, MPI_Comm comm)`

- Data se abstrahují jako sekvence instancí typu **datatype**

`MPI_Recv(void *buf, int count, MPI_Datatype, int source, int tag, MPI_Comm comm, MPI_Status *status)`

**Neblokující varianty** ⇒ `Isend`, `Irecv`, `Ibcast` apod.

### Kolektivní komunikace

- Všechny procesy v doméně, včetně odesílatele, musí volat odpovídající MPI funkci
- `MPI_Bcast(void *buf, count, MPI_Datatype, int source, MPI_Comm comm)`
	- Rozesílá data z bufferu všem procesům v zadané doméně
	- Všechny participující procesy volat `Bcast` se stejnými parametry, aby si zprávu vyzvedly
- `MPI_Reduce(void *sendbuf, void *recvbuf, count, MPI_Datatype, MPI_Op op, int target, MPI_Comm comm)`
	- Uložím data ze **sendbuf** operací **op** do **recvbuf** procesu **target**

# Výkonnostní analýza

Problémy jdou vždy řešit sekvenčně ⇒ paralelně získáme pouze vyšší rychlost.
**S použitím n-zdrojů ovšem nedosahujeme n-násobného zrychlení!**

- Celý algoritmus nemusí jít paralelizovat!
- S paralelizací přichází **režie**:
	- Komunikace, nerovnoměrná zátěž, synchronizace, čekání na zdroje
- Víc procesorů nemusí pomoci, pokud nás brzdí propustnost paměti

**Superlineární zrychlení** → výkon se zvýší více než n-násobně.

- **Falešné** ⇒ porovnáváme s neoptimálním sekvenčním algoritmem
- **Skutečné superlineární zrychlení**
	- Průzkumová dekompozice úlohy ⇒ efektivnější než sekvenční
	- Více vláken → více cache; v moment, kdy nároky na paměť nerostou p-násobně, nám s přidáním p vláken roste i % dat v cache ⇒ zrychlení nad rámec **Amdahlova zákona**

**Značení:**

- $T_s$ – čas **nejlepšího** sekvenčního algoritmu, **nelze použít $T_p$ pro 1 jádro!!!**
- $T_p$ – čas paralelního algoritmu
- $p$ – počet procesních jednotek
- $T_o$ – časová cena režie ⇒ $T_o = p \cdot T_p - T_s$ (celková práce všech jednotek minus užitečná sekvenční práce)
- **Zrychlení** (speedup) ⇒ $S = T_s / T_p$
- **Cena problému** ⇒ $C = p \cdot T_p$ ($T_p$ cena je optimální, pokud asymptoticky roste stejně jako cena $T_s$)

**Efektivita**

$$E = \frac{S}{p} = \frac{T_s / T_p}{p} = \frac{T_s}{p\,T_p}$$

- **Nikdy nepsat** „podíl času, po který jednotka vykonává užitečný kód"
- Podíl času věnovaný algoritmu a ne režii jeho paralelizace
- Indikátor kvality paralelismu

**Škálovatelnost** je míra zachování efektivity při zvyšování počtu jader a zvětšování vstupu.

- Dobře škálovatelný program si udrží stejnou efektivitu napříč vstupy
- Algoritmus musíme testovat na **reálných datech**
- **Čím menší je poměr $T_s / p$, tím lepší je škálovatelnost**

**Izoefektivní funkce (Isoefficiency)** určuje, jak rychle musí růst objem výpočtu (práce), aby se udržela stejná efektivita při přidávání dalších vláken.
$$T_s = K \cdot T_o(W, p)$$
- Je to metrika **škálovatelnosti**. Čím pomalejší růst z rovnice vyjde (např. $O(p \log p)$ je lepší než $O(p^2)$), tím lépe systém škáluje.
- $W$ (nebo $T_s$) ⇒ **objem užitečné práce** (výpočetní složitost). Nejde jen o "počet bajtů na vstupu", ale o to, kolik operací musí program reálně spočítat.
- $T_o(W, p)$ ⇒ **celková režie** (čas ztracený komunikací a synchronizací), která závisí na objemu práce i počtu vláken.
- $K$ ⇒ konstanta odvozená z cílové efektivity ($K = \frac{E}{1-E}$).
- **Smysl vzorce:** Nepoužívá se k "výpočtu dat". Rovnici analyticky řešíme pro $W$, abychom zjistili vztah: *"O kolikrát musím zvětšit problém ($W$), když přidám procesory ($p$), aby efektivita neklesla vlivem vyšší režie ($T_o$)."*

## Amdahlův zákon

Vzorec stanovující největší možné zrychlení, kterého můžu dosáhnout přidáním vláken vzhledem k tomu, jak velkou část algoritmu paralelizujeme.

$$S_{max} = \frac{1}{(1 - p) + \frac{p}{S_p}}$$

- $S_{max}$ ⇒ maximální teoretický výkon
- $p$ ⇒ paralelizovatelný podíl systému
- $S_p$ ⇒ zrychlení dosažené nad paralelizovatelnou částí

**Příklad**

- Paralelizovat lze 30 % kódu ⇒ $p = 0{,}3$
- Paralelizovatelná část lze urychlit 4-násobně ⇒ $S_p = 4$
- $\dfrac{1}{(1 - 0{,}3) + \frac{0{,}3}{4}} = 1{,}29$ → výkon se zvedne na 129 % původního výkonu

# Příklady

**1.** Napište kód, který pomocí read-write locku vypíše (např. souběžné čtení sdílené struktury více čtenáři, zápis jen jedním písařem).

> **Odpověď:** Cvičení na WRRM / readers-writers – písař drží výlučný zámek a mění ukazatel na novou kopii dat, čtenáři sdílí read-lock. Viz sekce WRRM.

**2.** Napište program s využitím `MPI_Bcast` (viz MiniProjekt 2).

> **Odpověď:** Po `MPI_Init` zjistit rank, na kořenovém procesu naplnit buffer, pak všechny procesy volají `MPI_Bcast` se stejnými parametry a kořenem jako `source`, nakonec `MPI_Finalize`.
