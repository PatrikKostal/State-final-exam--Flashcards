# 6. Operační systémy

> **Zadání:** Architektura operačního systému, architektura jádra, základní režimy procesoru. Programovací rozhraní, knihovny. Uživatel, přístupová práva, virtualizace. Virtuální paměť, proces a stránkové tabulky. Vlákno, plánování vláken a procesů. Souběžnost, uváznutí, přidělování zdrojů. Vznik procesu a spuštění programu v systémech POSIX, copy-on-write. (PB152)

# Operační systém

**Operační systém (OS)** je abstrakce nad hardwarem. Vytváří prostředí pro běh aplikací na různých zařízeních bez specifických úprav kódu pro daný hardware $\Rightarrow$ **hardwarová přenositelnost**.

**Co OS umí:**

- Obsluhuje interakce s **uživatelem**, vstupy/výstupy jsou tzv. **periferie**.
- Zpřístupňuje aplikace a soubory $\Rightarrow$ hardwarové a softwarové zdroje.
- Přiděluje **hardwarové prostředky** mezi programy – paměť, procesorový čas.
- Zajišťuje zabezpečení. Aplikace spouští izolovaně.
- **Special purpose** – embedded OS (ořezaná funkcionalita, neaktualizují se).
- **Real-Time** – safety critical (např. autonomní vozy).

## Základní aspekty OS

Architektura OS staví na hierarchických vrstvách $\Rightarrow$ od HW k UI.

- **Abstrakce** $\Rightarrow$ vyšší vrstva skrývá detaily a chování těch nižších.
- **Modularita** $\Rightarrow$ OS disponuje moduly (vnější rozhraní + vnitřní implementace), lze je vyměňovat bez negativního efektu na ostatní moduly.
- **Virtualizace prostředků** $\Rightarrow$ počítač se ke každému programu tváří, že je jen jeho, ale přiděluje mu virtualizované prostředky (namapované fyzické prostředky).
- **Přenositelnost** $\Rightarrow$ nezávislost na specifickém hardwaru.

## Architektury OS

Architektury OS lze dělit na:

- **Kernel-based** $\Rightarrow$ máme jádro, to je „šéf“ – obsluhuje procesy.
- **Vrstvené** $\Rightarrow$ podobně jako ISO/OSI model, ale pro celý OS.
	- Příliš rozdrobené, režie je drahá a těžko se definují hranice.
	- Pomalé, používal Windows NT 4.0.
- **Modulární** $\Rightarrow$ jednotlivé komponenty jádra dělíme podobně jako v OOP.
	- Komunikace skrze rozhraní – macOS.
- **Virtualizované** $\Rightarrow$ např. Java Virtual Machine.
- **Klient-server** $\Rightarrow$ podobně jako v mikrojádru.
	- Procesy se dělí na klientské a serverové.
	- Klienti žádají o přístup ke vzdáleným objektům serveru.
		- Thread-per-request požadavky.

Firmware a aplikační software nejsou součástí OS. **Hardwarová platforma** zahrnuje sadu procesorových instrukcí, I/O kontrolery, linky, firmware a napájení.

## Komponenty OS

- **Kernel (jádro)** – udržuje v chodu ostatní komponenty OS, provádí low-level tasky v privilegovaném režimu. Zajišťuje izolovanost procesů.
- **Knihovny** – high-level services, optimalizované, umí spolupracovat s OS.
	- Např. **libc** – Standard C library: `printf`, `malloc`…
	- Při linkování se stávají součástí programu.
- **Daemons** – programy běžící na pozadí, provádí údržbu a zajišťují provedení periodických úloh.
	- Např. **synchronizace času**, konfigurace síťových adres…
- **Interface** – nadstavba pro interakci s uživatelem.
	- **Shell** (součást systému) – CLI/GUI.
		- Příkazový interpret – zpracovává CMD input.
	- **UI** $\rightarrow$ rendering, OpenGL $\rightarrow$ zajišťují knihovny.
- **Utilities** – programy jako součást OS, základ pro uživatelské ovládání.
	- Nastavení systému, konfigurace, údržba.
	- **File explorer** ve Windows, `chkdsk`, `ifconfig`, textový editor.

**Spuštění:** tlačítko $\Rightarrow$ firmware $\Rightarrow$ bootloader (identifikuje OS) $\Rightarrow$ OS. Při spouštění bývá CPU v 32bitovém režimu kvůli kompatibilitě, později se přepne do 64 bitů.

# Programovací rozhraní a knihovny

**Knihovna** je balík optimalizovaných funkcí a datových typů – společně vytvářejí **API**.

- **Statické** $\rightarrow$ pevně daná hromada funkcí (archivy – `ar`, např. `libc.a`).
	- Jsou potřeba pouze při kompilaci. Jejich kód se zkopíruje do programu. Plýtvání prostředky. Používají se pro `.exe` soubory.
	- **Linker** může kopírovat jen potřebné funkce, vynechá duplicity $\Rightarrow$ optimalizace.
- **Dynamické / sdílené** $\rightarrow$ funkce se do programu nekopírují, ale volají se z knihovny za běhu.
	- Méně duplikace kódu, je možné je upgradovat samostatně, ale musíme dávat pozor na kompatibilitu a závislosti.
	- Více programů může sdílet jednu knihovnu (jeden kód).

Umístění knihoven: **UNIX** `/usr/lib`, **Windows** `C:\Windows\System32`.

Knihovna se skládá z:

- **Hlavičkové soubory** $\rightarrow$ obsahují deklarace funkcí a definují datové typy.
- **Implementace**.

## API

**API (Application Programming Interface)** je abstrakce definující interakce pomocí knihoven, protokolů, funkcí…

- API zajišťuje **přenositelnost programů** / message passing.
- Poskytuje funkcionalitu pro práci s komponentami počítače $\Rightarrow$ umožňuje programovat.
- Většinou napsané v C/C++.
- Např. grafické API $\rightarrow$ Vulkan, DirectX, OpenGL.

## ABI

**ABI (Application Binary Interface)** je soubor pravidel definující komunikaci mezi procesy a jádrem na úrovni strojového kódu. Běžící program komunikuje s jádrem pomocí ABI.

![[os.png|644]]

# Jádro

**Jádro** je část OS, která je při spuštění jako první zavedena do operační paměti a je jí předána kontrola. Jádro systému spravuje systémové prostředky (paměť a čas), vyřizuje systémová volání, procesy atd.

- Běží v **privilegovaném režimu** $\Rightarrow$ je všemocné.
- Jádro je namapované do každého procesu, aby se předešlo drahému přepínání kontextu.

Architektonické členění na **monolitické** a **mikro**. Většinou napsáno v C.

## Monolitické jádro

**Monolitické jádro** $\Rightarrow$ řeší všechno – filesystem, drivery, síť, šifrování, DMA.

- Vše je v privilegovaném režimu.
- Komplexní, složité, ale efektivní $\rightarrow$ netřeba zbytečně přepínat kontext (přerušení).
- **Riziko zabezpečení** $\Rightarrow$ jednotlivé části se ale mohou ovlivňovat.
- Např. Linux.

## Mikrojádro

**Mikrojádro** $\Rightarrow$ snaha co nejvíce věcí řešit mimo jádro. Řeší: hardwarová přerušení, MMU, přidělování prostředků procesům a předávání zpráv (IPC).

- Ideálně má všechno samostatné procesy – tzv. **servery**.
	- Servery pak spravuje tzv. **super-server** mimo privilegovaný režim.
	- Pád serveru $\neq$ pád celého systému.
	- Výhodou je flexibilita, rozšiřitelnost, služby jsou poskytované **výměnou zpráv**.

## Hybridní jádro

**Hybridní jádro** $\Rightarrow$ chiméra obou přístupů.

- Např. Windows $\Rightarrow$ některé věci řeší v jádru (třeba filesystém), aby dosáhl nízké režie.
	- Ostatní kód jádra běží v uživatelském režimu (ovladače).

Existují ještě minimalistické kernely v embedded systémech:

- **Unikernel** – kernel pro spuštění jediné aplikace. Může být užitečné při virtualizaci.
- **Exokernel** – operační systém umožňující aplikacím přímý přístup k hardwarovým prostředkům.

# Režimy procesoru

## Privilegovaný režim

**Privilegovaný režim** – pouze pro kernel.

- Neomezená práva – **nebezpečné**.
- Vykonává citlivé tasky, pracuje s MMU – např. mapování paměti, řízení CPU, vstup/výstup zařízení, práce s registry a zákaz přerušení, přístup k HW.
- Kernel programuje MMU poskytováním překladových tabulek.

## Uživatelský režim

**Uživatelský režim** – běží v něm knihovny, daemony, normální programy atd.

- Spousta akcí je omezena, aby nebyl ohrožen správný chod systému $\Rightarrow$ zabezpečení.
- **x86 má 4 úrovně privilegií** tzv. **ringy** – Ring 0 (kernel, most privileged) přes Ring 1, Ring 2 (device drivers) až Ring 3 (applications, least privileged).

![[x86-ringy.png|334]]

Komunikaci mezi hardwarem a softwarem řeší **DMA (Direct Memory Access)**. HW přistupuje do RAM nezávisle na CPU (asynchronně). CPU to pak jen někdy přečte.

# Proces a vlákno

## Proces

**Proces** je základní jednotka práce s pamětí.

- Jde o spuštěný program $\Rightarrow$ obsahuje dynamicky se měnící data.
- Každý proces má alespoň 1 **vlákno** a vlastní **virtuální adresní prostor**.
- Každý proces má své výpočetní prostředky $\Rightarrow$ **vytvořit proces je drahé**.
- Paralelní úlohy vyžadují meziprocesovou komunikaci $\Rightarrow$ **IPC**.
	- Sdílení paměti, soketů, rour…, OpenMPI.

**Složení procesu:** PID, ID vlastníka, proměnné prostředí, working dir, kód, registry, zásobník, halda, odkazy na otevřené soubory a sdílené knihovny, reakce na signály, kanály IPC $\Rightarrow$ **má soukromí**.

**PCB (Process Control Block)** ukládá všechny parametry procesu, aby je mohl později obnovit.

## Vlákno

**Vlákno** je základní výpočetní jednotka.

- Sekvence instrukcí v kontextu jednoho procesu (na stacku).
- Jednotka plánování OS pro 1 jádro $\Rightarrow$ více vláken $\Rightarrow$ tzv. **multithreading**.
	- Vlákno je **subjektem** plánování.
- Vlákno obsahuje relativně málo prostředků $\Rightarrow$ **je levné**.
- **Složení:** zásobník, registry, program counter, ID, atributy.
- **TCB (Thread Control Block)** ukládá všechny parametry vlákna, aby mohlo fungovat plánování.

Vlákna sdílí prostředky procesu, globální proměnné… $\Rightarrow$ **vyjma zásobníku nemají soukromí**.

- V rámci procesu si tak vlákna předávají pouze reference na data.
- Vyžaduje **kritickou sekci / synchronizační mechanismy**.
- Komunikují sdílenými datovými strukturami $\Rightarrow$ za účelem synchronizace.
- Přepínání vláken umožňuje virtualizaci procesorových prostředků.

![[thread-memory.png|571]]

## Přepínání procesu

Každé jádro procesoru provádí v jednom okamžiku jedno vlákno. Nicméně multitasking umožňuje více procesům sdílet procesory a další systémové prostředky. To znamená, že procesor může přepínat mezi prováděnými procesy, aniž by musely skončit. To se označuje jako **přepínání kontextu** (context switch).

- Kontext je obsah registrů. Ukládá se na zásobník procesu.
- Při přepnutí se zneplatní cache paměť. Ta se neukládá, proto je přepínání tak drahé.
- Při přepnutí se vymění tabulka virtuálních adres.
- Vylévá se **TLB (Translation Lookaside Buffer)** – je to cache na překlady virtuálních adres na fyzické.

Cílem je poskytnout procesům iluzi toho, že mají jádro jen pro sebe.

OS musí při přepnutí uschovat stav procesu, kterému je procesor odebírán. Ten se uchovává v tabulce **PCB (Process Control Block)**, která patří jádru. Zároveň musí OS připravit prostředí pro proces, kterému se procesor přiřadí – jeho stav se obnoví z PCB záznamu.

Režim procesoru se po nastavení kontextu přepne z privilegovaného (režim jádra) na uživatelský režim a řízení se předá uživatelskému programu, který je zodpovědný za (re)start procesu. Doba pro přepnutí procesoru je ale **režijní ztráta** – procesor nedělá nic „užitečného“, takže přepínání může kriticky ovlivnit výkon. Dále vzniká problém synchronizace a uváznutí.

## Stavy procesu

- **Nový (new)** – proces byl právě vytvořen, je identifikovatelný.
- **Připravený (ready)** – proces čeká na přidělení procesoru, je připraven vykonat svou úlohu.
- **Čekající (waiting)** – proces čeká na nějakou událost/události (např. dokončení výpočtu jiného procesu nebo výstup z I/O zařízení).
- **Běžící (running)** – program procesu je právě zpracováván procesorem.
- **Ukončený (terminated)** – proces ukončil svou činnost (ještě stále je identifikovatelný).

![[stav-procesu.png|450]]

Pokud OS disponuje střednědobým plánovačem, ke stavům procesu přibývají:

- **Odložený připravený** (swapped out and ready).
- **Odložený čekající** (swapped out and waiting).

Po celou dobu, ať už se proces nacházel v kterémkoliv stavu, je proces identifikovatelný a uchovává si informace o sobě ve svém PCB.

# POSIX

**POSIX** je obecně uznávaný standard (abstrakce). Platí: `libc` $\Rightarrow$ kombinace jazyka C a POSIXu. POSIX obsahuje wrappery systémových volání.

**Rozhraní v POSIX** – proměnné, funkcionalita, atributy:

- **Obsah** $\Rightarrow$ správa vláken, vzájemná vyloučení, podmínkové proměnné.
- **Init**, **destroy**, **wait** a **signal** a jejich parametry.
- Všechny potřebují **handle** = `pthread_t`.
- Wait potřebuje mutex.
- **Mutex** $\rightarrow$ `pthread_mutexattr_t`, vzájemné vyloučení, čekací funkce, signalizování.
- Přístup ke skrytým objektům pomocí **handle**.
- **Vlákno** $\rightarrow$ `pthread_attr_t`.

Procesy mají hlavní vlákno.

- `pthread_create(pthread_t*, pthread_attr_t*, function, void* arg)` $\Rightarrow$ vytváří vlákno.
- `pthread_exit(void* exit_value)`.
- `pthread_join(pthread_t*, void** value)` $\Rightarrow$ čeká, až dané vlákno skončí.

![[pthread.png|457]]

**Detached threads** $\Rightarrow$ typ vlákna, který nelze spojit pomocí `join`.

V POSIXu je všechno soubor. Musí se explicitně otevírat a uvolňovat. `open` konzultuje s kernelem práva procesu (jestli může k souboru přistupovat). Při otevření získáváme **file descriptor** $\Rightarrow$ index do tabulky. Index je asociován se souborem i pokud by došlo k přesunu souboru ve file systému.

## Vytváření procesu v POSIXu

- **Fork** je duplikace existujícího procesu. Každý pak může pokračovat z daného místa jiným směrem. Jeden je rodič a druhý dítě.
	- Tímto se vytváří kopie virtuálního adresního prostoru $\Rightarrow$ oba procesy si stránky poznačí jako READ-ONLY. Pokud se některý proces pokusí zapsat, jádro mu vytvoří jeho vlastní kopii dat $\Rightarrow$ je v mnohem rychlejší než kopírovat veškerá data. Výsledné procesy sdílí většinu fyzické paměti. Jde o tzv. **copy-on-write trik**.
- **Exec** přepíše veškerou paměť procesu $\rightarrow$ nahraje nový program.
- **Spuštění nového programu** $\rightarrow$ fork + exec. První proces systému $\rightarrow$ `init`.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>

int main(int argc, char **argv)
{
    pid_t pid;
    pid = fork();
    if (pid == 0)
    {
        printf("It is the child process and pid is %d\n", getpid());
        exit(0);
    }
    else if (pid > 0)
    {
        printf("It is the parent process and pid is %d\n", getpid());
    }
    else
    {
        printf("Error while forking\n");
        exit(EXIT_FAILURE);
    }
    return 0;
}
```

## Copy-on-write

Kopírování paměti nemusí data duplikovat (např. při vytváření procesu), ale pouze mapujeme původní fyzická data na nové virtuální adresy $\Rightarrow$ celkově tedy existuje více virtuálních adres ukazujících na stejné místo.

- Data označíme READ-ONLY a doopravdy je kopírujeme teprve, když je chceme modifikovat.

# Paměť

**Paměť** jsou miliony paměťových buněk, ke kterým můžeme přistupovat pomocí adres.

- Existuje nad nimi tzv. **adresní prostor**.

Aby mohl OS poskytovat paměť souběžným procesům, tak paměť virtualizuje a poskytuje pouze virtuální adresy. **Důvody:**

- Distribuce fyzických adres by byla složitá a nebezpečná (programy by se mohly cíleně ovlivňovat).
- Lepší management paměťových mezí mezi programy.

Virtualizací tedy vzniká pro **každý proces virtuální adresní prostor**. Ke každému procesu se váže jeho vlastní **překladová tabulka**.

Překlad mezi **virtuálními** a **fyzickými** adresami řeší **jednotka správy paměti (MMU)**. Ta je součástí procesoru a pracuje velmi rychle. Uchovává překladové tabulky.

- Řeší to fragmentaci. Proces má iluzi souvislého bloku paměti.

![[mmu.png|548]]

## Stránkování

Optimalizace překladu tabulek – tzv. **stránkování**. Překladová tabulka je rozdělena do stránek pro rychlejší přístup tak, že:

- Každá stránka obsahuje $2^n$ adres (tj. má velikost $2^n$ bajtů).
- Každá stránka začíná adresou, která je beze zbytku dělitelná $2^n$.
- Každá stránka je mapována na fyzickou adresu, která je také beze zbytku dělitelná $2^n$.

Tím je docíleno toho, že $n$ spodních bitů fyzické adresy je **shodných** s $n$ spodními bity virtuální adresy.

- Této shodě se říká **offset**.
- Adresa se dále dělí na segmenty (úrovně překladu).

![[virtualni-adresy.png|379]]

> **Příklad:** uvažujme stránku velikosti 4 KiB (celkem běžná velikost), která je tvořena $4096 = 2^{12}$ po sobě jdoucími virtuálními adresami. Máme tedy $n = 12$ a při překladu spodních 12 bitů pouze opíšeme z virtuální adresy do fyzické:
>
> 
> `0xb000'c140  – virtuální adresa
>        `↓↓↓
> `0x????'?140  – odpovídající fyzická adresa
>
> Zároveň překladové tabulky budou 4096-krát menší, než proti naivnímu přístupu 1 adresa = 1 řádek tabulky.

> **Příklad:** Pro systém s 32bitovými adresami se nabízí rozdělení virtuální adresy na 3 segmenty: $2 \times 10$ bitů = dvě úrovně překladu + 12 bitů mapovaných přímo (bez překladu).

Kód programu je ve fyzické paměti uložen pouze jednou. Stránkovací tabulky umožňují nastavení příznaků pro práva čtení a zápisu, aby se zamezilo ovlivňování mezi procesy a zároveň neplýtvalo pamětí. Povolení zápisu lze využít ke komunikaci mezi procesy.

## Externí stránkování

**Externí stránkování** $\Rightarrow$ mapování virtuálních adres na datové úložiště. Vhodné třeba, když nám dochází paměť RAM. Využití:

- **Líné načítání** $\Rightarrow$ využití externího stránkování, tedy načítání programu z disku tak, abychom vždy do operační paměti kopírovali pouze části, které zrovna potřebujeme.
- **Mapování souborů** $\Rightarrow$ externí stránky jsou uloženy v souboru. Program pracuje se souborem stejně, jako by se nacházel v operační paměti. Zjednodušuje to čtení a úpravy.
- Nedávno použité stránky se ukládají do **TLB (Translation Lookaside Buffer)**.

**Stránka** je blok virtuální paměti. Obsahuje rozsah virtuálních adres o pevné velikosti.
**Rámec** je blok fyzické paměti. Obsahuje rozsah fyzických adres o pevné velikosti.

Alternativou k **virtualizaci** paměti je **rezervace**. OS může rezervovat nějaký úsek fyzické paměti pro specifický proces. Je to jednodušší a méně pružné.

# Plánování

Virtualizace procesoru $\Rightarrow$ **plánování zajišťuje plánovač (scheduler)**. Je součástí kernelu.

- Rozhoduje spouštění jednotlivých vláken a přepínání procesů.
- Spouští se v pravidelných intervalech (management procesorového času).
- Cílem je zajistit maximální propustnost, férovost a minimální latenci.
- Spravuje frontu úloh.

**Střídání procesů** $\Rightarrow$ přepnutí stránkovací tabulky a vlákna.

- Fyzické adresy se nemění, ale mapované virtuální adresy ano.
- **TLB (Translation Lookaside Buffer)** je cache urychlující překlad virtuálních adres na fyzické.
- Přepínání není zadarmo!

**Střídání vláken stejného procesu:**

- Částečná změna kontextu, pouze změna registrů.
- Rozlišuje **3 stavy vlákna** pro optimální management: běží, čeká na procesor a čeká na událost.

**Preemptivní plánování** $\Rightarrow$ úlohy netuší, že je může někdo silou pozastavit.

- Programy nemohou zablokovat systém. (Nejčastěji používané.)

**Kooperativní plánování** $\Rightarrow$ procesy se samy vzdávají procesoru.

- Velice efektivní, ale špatný program do toho hodí vidle.

Princip **vláknové afinity** $\Rightarrow$ snaha omezit přenášení vláken mezi jádry.

- Porušuje se v moment, kdy jádro nemá co dělat a ukradne si z fronty cizí práci.
- Záleží na implementaci scheduling algoritmu.

## Scheduling algoritmy

Běží nad frontou vláken – běžících a čekajících.

- **Round-robin scheduling** $\Rightarrow$ nejjednodušší scheduling algoritmus. Všechny procesy mají stejnou prioritu a přiděluje se jim čas rovnoměrně. Pokud proces skončí předčasně, tak se rovnou pokračuje s dalším procesem a zbytečně se nečeká.
- **Shortest Job First** $\Rightarrow$ běží proces, jehož dokončení zabere nejméně času.
	- **Preemptive** – proces může být přerušen a nahrazen procesem vyžadujícím méně času.
	- **Non-preemptive** – vybraný proces běží, dokud nedoběhne, poté se vybere nový nejkratší.

# Souběžnost

**Souběžnost** je vztah mezi událostmi, které mezi sebou nemají přímou souvislost.

**Race condition** $\Rightarrow$ negativní projev nedeterministického chování. Způsobeno **proložením** instrukcí jednotlivých vláken $\Rightarrow$ pořadí není garantováno.

- Vzniká současným přístupem ke sdíleným prostředkům.

Přístup k prostředkům musíme synchronizovat $\Rightarrow$ omezit souběh akcí vytvořením **kritické sekce**. Pomocí mutexů, semaforů, bariér nebo lock-free algoritmů.

## Kritická sekce

**Kritická sekce** je část kódu neproložitelná jinými instrukcemi $\rightarrow$ odolná vůči plánování.

- Obsahuje výpočty citlivé na souběh $\Rightarrow$ podobně jako transakce v databázích.
- Veškeré modifikace a neatomické čtení globálních proměnných musí být **serializováno**. Realizujeme zámkem $\rightarrow$ **bitovou proměnnou**.
- Pro práci s bitovou proměnnou pak musíme používat **atomické** operace.
- Při vstupu do kritické sekce vlákno úspěšně nastaví proměnnou na 0 a při odchodu zase na 1. Ostatní vlákna čekají na uvolnění proměnné $\rightarrow$ **spin-lock**.

## Atomicita

**Atomicita** $\Rightarrow$ neporušitelná celistvost operace / posloupnosti instrukcí.

- Atomickou operaci nemůže scheduler nijak rozpůlit / proložit.
- Atomické operace se používají pro paralelní přístup bez zamykání.
- **CAS (compare-and-swap)** operace – musí být podporováno systémem. Přečte hodnotu z paměti a změní ji pouze, pokud je stejná jako očekávaná hodnota.

**Spin-lock** $\rightarrow$ aktivní čekání, synchronizační smyčka. Vlákno čeká a neustále se snaží vstoupit.

- **Vytěžuje procesor.** Řešením je **uspávání** mezi pokusy o vstup.
- **Petersonův algoritmus** $\Rightarrow$ spravedlivý algoritmus pro řízení vzájemného vyloučení. Vyžaduje atomické zápisy do proměnných $\rightarrow$ bez nich v praxi nefunguje.

## Hladovění, uváznutí, livelock

**Hladovění (starvation)** $\Rightarrow$ vlákno je připravené běžet, ale plánovač (scheduler) mu dlouhodobě nebo trvale odpírá přístup ke zdroji (procesor, zámek), protože soustavně dává přednost jiným vláknům. Vlákno samo je v pořádku, jen se kvůli nespravedlivému přidělování nikdy nedostane na řadu.

**Uváznutí (deadlock)** $\Rightarrow$ vlákna mají neuspořádané inkrementální požadavky na sdílené zdroje.

> Úspěšné dokončení první akce je podmíněno úspěšným dokončením druhé akce.
> Úspěšné dokončení druhé akce je podmíněno úspěšným dokončením první akce.

- Dojde k uváznutí $\rightarrow$ instrukce se proloží, vlákna **vzájemně čekají** zdroje.
- Např. **vlákno 1** $\rightarrow$ `lock(A), lock(B)`; **vlákno 2** $\rightarrow$ `lock(B), lock(A)`.

**Coffmanovy podmínky** – aby nastala šance uváznutí, musí se splnit tyto 4 podmínky:

1. **Vzájemné vyloučení** $\Rightarrow$ zdroj může být přisouzen nejvýše 1 vláknu.
	- Řešeno pomocí virtualizace $\Rightarrow$ např. úkoly pro tiskárnu zapíšu do souboru, odkud tiskárna čte.
2. **Čekající vlastník** $\Rightarrow$ umožňuje si rezervovat více zdrojů (šance čekání na $x$-tý zdroj).
	- Řešení: lze vyřadit předrezervací $\Rightarrow$ uzamčení všech najednou.
3. **Neodnímatelnost** $\Rightarrow$ zdroj nelze vlastníkovi odebrat.
	- Např. fyzickou paměť lze odebrat a odswapovat proces na disk.
	- Neodebratelné zdroje jsou např. tiskárna uprostřed tisknutí.
4. **Kruhové čekání** $\Rightarrow$ v grafu závislostí, kde hrany reprezentují získání zdrojů, je cyklus.
	- Řešení: lze předcházet globálním uspořádáním zdrojů.

Násilným řešením nastalých souběhů je tzv. **pštrosí algoritmus**.

- Pokud jsou deadlocky ojedinělé a jejich prevence by významně snížila výkon, pak systém strčí hlavu do písku a problém neřeší. **Uživatel musí manuálně restartovat PC.**

Některé systémy si dokáží dynamicky udržovat graf závislostí tak, aby dokázaly uváznutí detekovat.

**Livelock** $\Rightarrow$ alespoň jedno vlákno nemůže pokročit ve výpočtech.

- Vlákna aktivně mění svůj stav, ale nedělají žádný reálný pokrok v programu.
- Zbytečně vytěžují procesor. Příliš dlouhé čekání na prostředky $\rightarrow$ starvation.

```c
volatile int a = 0;

// P0                  // P1
while (true) {;        while (a == 0) { };
  a++; a--;            ...;
}...
```

# Synchronizační primitiva

## Mutex

**Mutex** je zámek pro synchronizaci vláken v rámci procesu.

- Umožňuje přístup jen jednomu vláknu, ostatní čekají.
- Běžící vlákno musí poté samo mutex uvolnit. (Pozor, aby každé vlákno uvolnilo pouze vlastní mutex. V základní implementaci není přístup chráněný.)
- `pthread_mutex_init` $\Rightarrow$ vytvoří mutex.
- `pthread_mutex_lock` $\Rightarrow$ blokující volání, dokud se zamknutí nepodaří. Zamknutím vstoupí do kritické sekce.
- `pthread_mutex_unlock` $\Rightarrow$ musí se volat při opouštění kritické sekce.
	- Kód kritické sekce globálně zviditelní.
- `pthread_mutex_trylock` $\Rightarrow$ vhodné, pokud má smysl aktivně čekat. Teoreticky rychlejší než `lock()`.
- Aby se zamezilo systémovým voláním a dlouhým spánkům vláken, existuje (spinlock + futex) implementace. Zámek si kromě zamykacího bitu pamatuje vlákna, která se k němu pokoušejí přistoupit. Při odemykání tedy systém probudí ostatní vlákno pouze, pokud tam nějaké čeká.

## Read-Write lock

**Read-Write lock** – idea je zamykat soubory pouze pro modifikace a umožnit souběžné čtení.

- Dělení vláken na čtenáře a písaře.
- `rdlock` (zámek čtení), `wrlock` (zámek psaní), `unlock` (odemkne zápis nebo sníží počítadlo čtenářů o jedna).
- Alternativou je **Read-Copy-Update (RCU)**.
	- Nemá žádné zámky. Při updatu vytvoří kopii dat a po dokončení operace atomicky změní ukazatel. Je to lock-free. Implementuje počítadlo ukazatelů. (Lock-free je ale jen pro čtenáře; pro více písařů většinou ne.)

## Semafor

**Semafor** je čítač umožňující přístup jen danému počtu vláken.

- Při vstupu vlákna odečítáme, při odchodu přičítáme $\Rightarrow$ 0 = locked.
- Odchod kteréhokoliv vlákna ho může odemknout, narozdíl od mutexu.
- `sem_init()`, `sem_wait()` odečítá, `sem_post()` přičítá.
- POSIX semafory synchronizují vlákna, **System V** semafory celé procesy.

## Bariéra

**Bariéra** zadržuje vlákna až do určitého počtu. Poté se bariéra prolomí.

- Implementuje se podmínkovou proměnnou s čítačem.
- Až se čítač naplní, broadcast probudí všechna vlákna.

## Podmínková proměnná

**Podmínková proměnná** řeší souběžné datové závislosti.

- Metoda `wait` zablokuje volající vlákno, dokud jiné vlákno nezavolá `signal`.
- Podmínková proměnná se vždy používá ve spojení s mutexem. Při volání `wait` se vlákno **musí vzdát mutexu** (atomicky ho uvolní a usne), jinak by ostatní vlákna nemohla vstoupit do kritické sekce a změnit podmínku, na kterou se čeká. Po probuzení (`signal`) si vlákno mutex opět automaticky získá zpět.
- V některých implementacích může vláken čekat víc.

## Monitor

**Monitor** je synchronizační primitivum pro vyšší jazyky.

- Překladač odemyká/zamyká za nás, my jen označíme, který kód má provádět jediné vlákno.
- V Javě klíčové slovo `synchronized`.

## Komunikace sdílenou pamětí

Se souběhem souvisí téma **komunikace pomocí sdílené paměti**. K tomu lze využít libovolné datové struktury ošetřené zámkem.

**Fronta** se často využívá ke komunikaci. **Kruhová fronta** $\Rightarrow$ 2 ukazatele (začátek a konec). Používají se **roury**, **sdílené fronty** (fronta pro více vláken, atomická operace `cmpxchg`).

Alternativou ke sdílení paměti je **předávání zpráv**. Předávání zpráv koreluje s mikrojádrovou architekturou.

# Virtualizace OS

**Virtualizace** je spuštění ve virtuálním prostředí.

- Umožňuje provoz více operačních systémů na jednom fyzickém počítači.
- Staví na **hypervizoru**. Minimální dodatečná režie oproti fyzickému počítači. Zlepšuje izolaci mezi službami. Jednodušší administrace.

## Hypervisor

**Hypervisor** je technika virtualizace – tzv. jádro virtuálního stroje. Stojí mezi hardwarem a virtualizovaným strojem. Kompletně izolovaná fyzická paměť virtuálního stroje od běžícího systému.

**2 typy:**

- **Bare-metal** $\rightarrow$ něco jako mikrokernel, přímo na hardwaru – IBM z/VM.
- **Hosted** $\rightarrow$ běží na systému, potřebuje kernel support – VMWARE.

Vlastnosti virtuálního systému:

- Virtuální systém lze kompletně zastavit (**suspendovat**). Nepozná to.
- Suspendovaný systém lze poslat někam jinam a spustit znovu (**migrace**). Nepozná to.
- Můžeme dělat snapshoty za běhu a ty ukládat (**live migrace**).

## Další techniky

**Container** $\Rightarrow$ virtualizace prostředí za účelem izolace. Velmi rychlé. Např. Docker.

**Emulace** $\Rightarrow$ interpretace instrukcí virtuálním procesorem – Just-In-Time compilation.

- Virtualizujeme HW, který nemáme $\Rightarrow$ např. staré konzole.

**Nativní virtualizace** $\Rightarrow$ přímo spouští instrukce na HW. Vyžaduje podporu ze strany HW.

**Paravirtualizace** je technika virtualizace vyžadující modifikace ve virtualizovaném (guest) OS.

- Dosahuje téměř rychlosti nativního hardwaru. Využívá modifikované ovladače.
- Guest OS o virtualizaci **ví** a musí ji podporovat $\Rightarrow$ s hypervizorem komunikuje napřímo (tzv. hypercalls) místo odchytávání privilegovaných instrukcí. To přináší rychlost, ale vyžaduje úpravy guest OS.
- **Paravirtuální zařízení** $\rightarrow$ speciální ovladače pro virtualizovaná zařízení. Rychlejší než emulace.

## Správa paměti

- **MMU** $\rightarrow$ jednotka správy paměti.
- Řídí ji **kernel** v privilegovaném režimu $\rightarrow$ tvoří tabulku pro překlad stránek.
- Překládá virtuální adresy v paměti na ty fyzické – pomocí **stránkování**.
- Dělí fyzickou a virtuální paměť na stejně velké bloky $\rightarrow$ většinou 4 KB.
- Blok fyzické paměti $\rightarrow$ **rámec**, blok virtuální paměti $\rightarrow$ **stránka**.
- Blok fyzické paměti je možné znovu použít.
- Stránku je možno zapsat do paměti, pokud dochází RAM.
- Stránka je de facto **ukazatel** na fyzickou paměť.

# Kontrola přístupu

Každý proces má vlastníka a taky jeho práva.

**Vlastnictví** souboru uděluje **vlastníkovi** práva dělat s ním cokoliv. Každý soubor má vlastníka a ten má právo jej číst, zapisovat a udělovat tato oprávnění ostatním.

**Uživatel** je základní jednotka vlastnictví a přístupu $\rightarrow$ abstrakce osoby / vlastníka.

- Každý proces vlastní nějaký uživatel. Proces má jeho práva $\Rightarrow$ zastupuje uživatele.
- Každý soubor patří nějakému uživateli.
- **Uživatelem nemusí být člověk** – služby běží pod vyhrazeným systémovým účtem (`www-data`, `postgres`), který slouží jen jako abstrakce jejich práv.

Uživatel se autentizuje, akce se autorizují.

**Principle of least privilege** $\Rightarrow$ snaha přiřadit každému co nejmenší práva. Zaručuje bezpečnost, platí i pro ovladače atd. $\Rightarrow$ izolace komponent.

**Sandbox** je bezpečnostní mechanismus $\rightarrow$ procesy mají omezené prostředky a práva.

- V případě exploitu nemá útočník práva jakkoliv škodit.
- Můžeme spustit přímo na virtuálním stroji $\rightarrow$ **Level Access Control API**.
- Se systémem se pak komunikuje pouze skrze dané API.

## Přístupová práva

**Přístupová práva** $\Rightarrow$ spravováno **access control policy** (zahrnuje vlastníka, akci a objekt).

- **Objekt** $\Rightarrow$ soubor, proces… $\rightarrow$ cokoliv, na co se může vztahovat vlastnictví.
- **Subjekt** $\Rightarrow$ uživatel, role, skupiny.
- **Filesystémy jsou objekt-centrické** $\rightarrow$ povolení se vztahují k jednotlivým objektům.
- **3 × 3 permission bity** $\rightarrow$ `rwxr-x---` / `0750`. Může změnit vlastník + root/superuser.
	- 3 pro usera, 3 pro skupinu, 3 pro ostatní.
- **rwx** $\Rightarrow$ čtení, zápis, provedení – reprezentované v **osmičkové** soustavě (r=4, w=2, x=1).
- **Speciální bity** (4. oktalový digit):
	- `setuid`/`setgid` – program se spustí s právy vlastníka, resp. skupiny souboru, místo práv spouštěče.
		- `setgid` **na adresáři** navíc způsobí, že nově vytvořené soubory zdědí skupinu adresáře (místo primární skupiny tvůrce).
	- **sticky bit** – v adresáři smí soubory mazat/přejmenovat jen jejich vlastník, i když mají ostatní do adresáře zápis (např. `/tmp`).

**Access control policy** (soubor pravidel – kdo má co povoleno) skládá pravidla ze subjektů, akcí a objektů $\Rightarrow$ uživatel (subjekt) smí mazat (akce) soubor (objekt).

- **Discretionary model** $\Rightarrow$ vlastník rozhoduje o tom, kdo dostane práva.
- **Mandatory model** $\Rightarrow$ práva uděluje centrální autorita.

**Kernel** zajišťuje dodržování access policy. Procesy se dožadují přístupu k souborům skrze systémová volání $\Rightarrow$ kernel ověří práva. Systém má k tomuto důvodu databázi uživatelů.

**POSIX** rozlišuje uživatele a skupiny. Dále má root uživatele, který má výjimku z ověřování práv.

**Sticky bit** $\Rightarrow$ nastavený na adresáři způsobí, že soubory v něm smí mazat/přejmenovat (`rm`/`mv`) jen jejich vlastník (případně vlastník adresáře nebo root) — i když mají ostatní do adresáře zápis. Bez něj může mazat kdokoliv, kdo má na adresář právo zápisu. Typicky `/tmp`.

# Otázky

**1.** Co je to operační systém? Jaké jsou jeho komponenty?

> **Odpověď:** OS je abstrakce nad hardwarem zajišťující hardwarovou přenositelnost, správu prostředků (paměť, čas), izolaci procesů a zabezpečení. Hlavní komponenty: **kernel** (jádro v privilegovaném režimu), **knihovny** (libc…), **daemony** (úlohy na pozadí), **interface** (shell, UI) a **utilities** (systémové programy).

**2.** Jaké procesorové módy existují? Co je privilegovaný mód? K čemu slouží?

> **Odpověď:** Existuje **privilegovaný režim** (jen pro kernel – neomezená práva, práce s MMU, řízení CPU, I/O, přerušení) a **uživatelský režim** (knihovny, daemony, programy – omezená práva kvůli bezpečnosti). x86 zavádí 4 úrovně privilegií (ringy 0–3).

**3.** Co to je API a ABI? K čemu slouží?

> **Odpověď:** **API** je rozhraní definující interakce na úrovni knihoven, protokolů a funkcí (zdrojový kód) – zajišťuje přenositelnost programů. **ABI** je soubor pravidel pro komunikaci mezi procesy a jádrem na úrovni strojového kódu (binární rozhraní).

**4.** Co to je proces a vlákno? Jaký je mezi nimi rozdíl? Definice.

> **Odpověď:** **Proces** je spuštěný program – základní jednotka práce s pamětí, má vlastní virtuální adresní prostor a soukromí (drahé na vytvoření). **Vlákno** je základní výpočetní jednotka (sekvence instrukcí) a subjekt plánování; vlákna jednoho procesu sdílí jeho prostředky kromě zásobníku (levné), proto vyžadují synchronizaci.

**5.** Jak funguje plánování (scheduling)? Jaké typy existují? Jaké znáš scheduling algoritmy?

> **Odpověď:** **Plánovač** (součást kernelu) rozhoduje o spouštění vláken a přepínání procesů s cílem maximální propustnosti, férovosti a minimální latence. Typy: **preemptivní** (úlohu lze násilně pozastavit) a **kooperativní** (procesy se vzdávají procesoru samy). Algoritmy: **Round-robin** (rovnoměrné časové kvantum), **Shortest Job First** (preemptivní i non-preemptivní).

**6.** Co je to UNIX a POSIX? Jaké jsou jejich rozdíly?

> **Odpověď:** **UNIX** je konkrétní rodina operačních systémů. **POSIX** je obecně uznávaný standard (abstrakce/rozhraní) definující systémová volání a jejich wrappery – `libc` je kombinací jazyka C a POSIXu. POSIX tedy standardizuje rozhraní, které UNIXové (a další) systémy implementují.

# Příklady

**1.** Uvažme čtyři procesy $P_1, P_2, P_3, P_4$ zařazené do fronty ke spuštění v tomto pořadí, s dobami trvání $P_1 = 53$ ms, $P_2 = 17$ ms, $P_3 = 68$ ms, $P_4 = 24$ ms. Který proces bude aktivní v čase 120 ms při použití **Round Robin** plánování s časovým kvantem 20 ms?

> **Odpověď:** $P_4$. Posloupnost kvant po 20 ms: $P_1$ (0–20), $P_2$ (20–37, dokončen), $P_3$ (37–57), $P_4$ (57–77), $P_1$ (77–97), $P_3$ (97–117), $P_4$ (117–…). V čase 120 ms tedy běží $P_4$.

**2.** Který z následujících algoritmů **nelze** použít jako strategii pro plánování procesoru?
First come first served / Least recently served / Round robin / Earliest deadline first / Shortest remaining time first.

> **Odpověď:** **Least recently served** – není to plánovací strategie procesoru. Ostatní (FCFS, Round robin, Earliest deadline first, Shortest remaining time first) jsou platné scheduling algoritmy.

**3.** Uvažme procesy $P_1, P_2, P_3, P_4$ s časy příchodu a dobami trvání podle tabulky. Jaká je **průměrná čekací doba** při 1 CPU a **preemptivním** Shortest Job First?

| Proces | Čas příchodu | Doba trvání |
|--------|--------------|-------------|
| $P_1$  | 0,0 s        | 7 s         |
| $P_2$  | 2,0 s        | 4 s         |
| $P_3$  | 4,0 s        | 1 s         |
| $P_4$  | 5,0 s        | 4 s         |

> **Odpověď:** **3 s.** Doby čekání (= doba obrátky − doba běhu): $P_1$ čeká 9 s, $P_2$ čeká 1 s, $P_3$ čeká 0 s, $P_4$ čeká 2 s. Průměr $(9 + 1 + 0 + 2)/4 = 3$ s.
