# 7. Souborové systémy

> **Zadání:** Blokové zařízení, bloková vrstva, I/O plánovač, RAID, šifrování disku. Obyčejné soubory, alokace volného místa, fragmentace. Adresářová struktura a její reprezentace na disku. Vstup a výstup mapovaný do paměti. (PB152)

# Souborový systém

**Souborový systém** je hierarchické uspořádání souborů přístupné uživateli. Jde o virtualizaci úložiště (službu OS).

- Uložen v perzistentní paměti (na disku)
- **Mount** → připojení úložiště / zařízení → kořen se stane složkou jiného systému
- Typy: ext4 (Linux), NTFS (Windows), …
- **VFS (Virtual Filesystem Switch)** – API jádra pro unifikovaný přístup k různým souborovým systémům
  - Struktura filesystému je implementována pomocí B-stromů

## Soubor

**Soubor** je základní jednotka organizace dat v souborovém systému.

- Jde o přidělené bloky + **metadata**
  - Metadata drží info o vlastníkovi, změnách, vytvoření a příslušných blocích (po jednom i spojitým rozsahem)
- Podporuje operace čtení (`POSIX-read`) a zápisu (`POSIX-write`)
- Pro práci se soubory je musíme otevřít → **File Descriptor**
- Abstrakce skrývá jejich blokový charakter; zápis za konec souboru soubor automaticky prodlužuje
- Lze **mapovat do operační paměti** → líné načítání, sdílení napříč procesy
- **Spustitelný soubor** obsahuje instrukce programu, počáteční hodnoty registrů a programového čítače

## Složka (adresář)

**Složka** je základní prvek cesty k souboru – vnitřní uzel file-system hierarchie.

- Důležitá pro přehlednost a efektivitu
- **Cesta** popisuje strukturu složek, která vede k cíli
- Složka je seznam (list) namapovaných i-nodů

Implementace složky:

- **Old-Style** → netříděný seznam jmen a i-nodů → velmi pomalé
- **Hash-Based** → většinou stačí přečíst jediný blok, konstantní složitost → efektivní
  - Pořadí položek je náhodné
- **Tree-Based** → B-strom, optimalizovaný pro block-level přístup
  - Jména položek jsou klíče, operace jsou logaritmické

![[filesystem.png|195]]

## I-node

**I-node** je anonymní file-like objekt – reprezentuje složky, soubory i symlinky.

- Používá se v POSIXových souborových systémech
- Obsahuje **metadata**, identifikační číslo a seznam datových bloků (pokud jde o soubor)
- **Neobsahuje jméno** → soubor lze odlinknout bez přepisování dat
- **File i-node** → obsahuje také seznam datových bloků
- **Hardlink** → specifikuje jméno pro existující i-node; může jich být více (rovnocenných)
- **Symlink (měkký odkaz)** → pouze cesta k i-nodu
  - **Dangling symlink** → cesta k neexistujícímu i-nodu
- **Special file i-node** → specifikace zařízení jako souboru
- Existuje fixní počet i-nodů → mohou být uloženy v bitmapách, tabulkách nebo B-stromech

## File Descriptor

- **UNIX** – má tabulku právě otevřených souborů; každému přiřazuje index (integer), podle kterého se k otevřenému souboru přistupuje
- **Windows** – file descriptoru se říká **handle**; jde o strukturu, nikoli pouhý integer → nižší abstrakce

## Snapshoty

**Snapshoty** jsou kopie celého filesystému. Pokud máme posloupnost snapshotů, obsahují pouze změny oproti předchozímu (jako git).

- Velikost se odvíjí od počtu změn oproti aktuálnímu stavu

## Superblock

**Superblock** jsou metadata filesystému – lokace bitmap i-nodů, velikost bloku, velikost filesystému.

- Souborový systém si udržuje více kopií superbloku

# Implementace souborového systému

Implementace souborového systému se podřizuje blokové abstrakci. Musí zajišťovat operace s minimálním počtem blokových přístupů a umět ošetřit přerušení operací, souběhy a chyby.

## Bitmapa

**Bitmapa** se využívá k mapování volných bloků paměti – 1 bit reprezentuje jeden blok, který může mít až 4 KB. Blok bitmapy tedy pokryje 128 MB úložiště. Mapování je pevné a flipování bitů je atomické.

- Souborový systém lze dělit do **alokačních skupin**, kde má každá vlastní bitmapu + informace o své obsazenosti

## Tabulka i-nodů

**Tabulky** se využívají pro mapování metadat o jednotlivých souborech; jednotlivé řádky jsou i-uzly.

- Často je uložena vícekrát v úložišti pro co nejrychlejší přístup
- Alokaci jednotek provádí bitmapou

## B-strom

**B-strom** je schopen nahradit samotné bitmapy i tabulky. Jde o samovyvažovací $n$-ární vyhledávací strom. Konzistence se řeší nepřepisováním uzlů na místě, ale vytvořením nového uzlu a následnou rekurzivní opravou.

- Klíčem mohou být adresy bloků → podstromy pak tvoří intervaly, ve kterých lze hledat neobsazené místo

## Žurnál a konzistence

**Konzistence** může být narušena výpadkem energie či jinou chybou. **Žurnál** udržuje sekvenci záznamů o akcích, které se mají provést (**write-ahead log**). Záznamy jsou seskupeny do transakcí – **změny metadat nastanou až po ukončení transakce nad soubory**. Při nekonzistenci se celá transakce zahodí a obnoví se předchozí stav. Za cenu poměrně komplikované struktury získáváme záruky konzistence a možnost zotavení.

- Příkladem žurnálu je **ext4** (Linux) → 2 žurnály:
  1. Low-level pro zápisy do bloků
  2. High-level pro transakce – např. „smaž soubor"

## Fragmentace

**Fragmentace** je tzv. roztříštěnost. Postupným zápisem a mazáním se vytváří prázdné místo mezi alokovanými bloky → pracnější hledání. **Defragmentace** znamená opětovné slepení dat k sobě.

- **Vnitřní fragmentace** je důsledkem toho, že je výhodné aby soubory začínaly na začátku bloku. Pokud je soubor menší, zbytek bloku zůstane prázdný.
- **Vnější fragmentace** znamená, že soubory jsou roztroušené napříč souborovým systémem, namísto aby byly soustředěné v souvislém kusu → pomalé čtení

## Checksum

**Checksum** je mechanismus pro detekci korupce dat.

- Součást metadat, odvíjí se od předem určené operace s daty (s checksumy jsou data větší)

# Bloková vrstva

**Bloková vrstva** je část OS zajišťující nízkoúrovňový přístup k úložišti. Souborový systém je vytvořen nad blokovou vrstvou a nemusí řešit specifika hardwaru.

- Blok je základní jednotka → základní operací je přesun bloků mezi RAM a diskem (**asynchronní**)
- Přístup k blokům je pouze sekvenční → **fragmentace dat výrazně snižuje rychlost**
- Zápisy na disk se cachují do **zapisovacích bufferů** (vyrovnávací paměť)

## Blokové zařízení

**Blokové zařízení** je abstrakce nad paměťovými zařízeními – disk-like devices = pole bloků.

- Zápisy po blocích pevné velikosti (512 B až 4 KB) → tvoří adresovatelné pole bloků
- Latenci přístupu skrývá **cache** → obsahuje nejčastěji používané bloky
- Např. USB flash disk, SSD, …

**Blokové operace** → asynchronní komunikace mezi RAM a trvalým úložištěm; procesor očekává potvrzení dokončení operace.

## Minimalizace latence

- **Latence** je doba mezi požadavkem a odpovědí
- **Mezipaměť** řeší opakovaný přístup k adresám v úložišti → pamatuje si již jednou čtená data
  - Některá data se načítají s předstihem (**prefetch**) – např. při přehrávání videa následující snímky; minimalizuje idling
- **Vyrovnávací paměť** dělá totéž, ale pro požadavky na zápis do úložiště (opačný směr)
  - **Propojená** → může ukládat bloková data rovnou do mezipaměti a obsahovat pouze frontu požadavků na zápis, které do mezipaměti ukazují
  - **Nezávislá** → znevaliduje odpovídající záznamy v mezipaměti a zapíše data na disk

## Znakové zařízení

**Znakové zařízení** je roura napojená na periferii (např. tiskárnu).

- **Roura** je komunikační soubor → 1 proces zapisuje, druhý čte
- Znakové zařízení tedy používá rouru pro komunikaci mezi periferií a aplikacemi

## I/O plánovač

**I/O plánovač** spravuje požadavky na čtení a zápis; důležitý hlavně u pomalých HDD.

- Tvoří **frontu** zapisovacích bufferů → zapisuje v optimálním pořadí, aby se urychlilo pozdější čtení
- Nejrychlejší je kontinuální čtení / zápis

> **Příklad:** Uvažme 3 souběžná vlákna A, B, C, která provedou každé 3 operace zápisu na postupně se zvyšující adresy. OS přijme požadavky v proloženém pořadí $A_1 B_1 C_1 A_2 B_2 A_3 C_2 B_3 C_3$. Pokud je bude zpracovávat v pořadí příjmu, provede 9 jednotlivých zápisů. Pokud je uloží do fronty a přeskládá, může je sloučit do 3 souvislých zápisů po 3 blocích: $A_1 A_2 A_3 - B_1 B_2 B_3 - C_1 C_2 C_3$.

# Vstup a výstup (IO)

## Standard IO

**Standard IO** je API pro vstup a výstup → implementuje funkce čtení a zápisu do souborů.

- Neefektivní – data se bufferují v mezipaměti a musí se kopírovat do soukromé paměti procesu
- Při zápisu kernel uzamkne soubor pro ostatní procesy

## Memory-Mapped IO

**Memory-Mapped IO** je mapování souborů přímo do **virtuální paměti (adresního prostoru) procesu**.

- Do virtuálního adresního prostoru se vytvoří mapování bez fyzických rámců; při prvním přístupu nastane **page fault** → OS načte stránku z disku do **page cache v RAM** a namapuje ji
- Nahrávání je tedy **líné** (on-demand); obraz může sdílet více procesů zároveň
- **Výhody:** Redukuje kopírování a střídání kontextu
- **Dirty stránka** (v page cache modifikovaná, jiná než na disku) způsobí zápis zpět na disk
- Výhodné pro read-heavy vytížení i random read access
- Změny v mapovaném souboru:
  - **Private** – úprava dat pouze ve virtuální paměti
  - **Shared** – úpravy se zapíší i do souboru v úložišti
- **`sync`** → kontrola, že data v RAM byla skutečně zapsána na disk

> Standard IO i Memory-Mapped IO spravuje procesor → hlavní rozdíl oproti DMA.

# Periferie

**Periferie** je zařízení, které produkuje a konzumuje data / události. Hodnoty se mění bez účasti OS → **událost**. OS musí být schopen taková data včas číst, dříve než je přepíší data nová.

- **Polling** → chování CPU, kdy periodicky kontroluje, jestli zařízení vyžaduje jeho pozornost.
  - Využívá ho myš, klávesnice (USB), disky.
  - **USB vs. PS/2:**
    - **PS/2** (staré) používá **hardwarová přerušení** (IRQ) – zařízení „zakřičí“ na CPU okamžitě při události. Má nulovou latenci, ale vyžaduje vyhrazený port a IRQ linku pro každé zařízení (neškáluje).
    - **USB** (moderní) je **hostitelská sběrnice** (host-device) – zařízení nemůže mluvit samo od sebe, musí čekat, až se ho hostitel (PC) zeptá (**polling**). To umožňuje na jeden řadič připojit až 127 zařízení (skrze huby) bez kolizí na sběrnici.
    - **Efektivita:** Polling u USB obvykle provádí **USB řadič** (hardware) nezávisle na CPU. CPU přeruší až v momentě, kdy řadič skutečně obdrží data.
    - **Latence:** Moderní periferie pollují s vysokou frekvencí (1000 Hz i více $\Rightarrow$ latence pod 1 ms), což je pro člověka nepostřehnutelné a eliminuje to režii spojenou se správou mnoha IRQ linek.

## PIO a DMA

**Programový vstup/výstup (PIO)** je jednoduchá metoda: paměť zařízení se namapuje na fyzické adresy procesoru. Procesor aktivně načítá data – rychlé pro malé objemy, ale blokující a náročné na režii při delším čtení.

**Přímý přístup do paměti (DMA)** je asynchronní metoda, kdy zařízení zapisuje přímo do operační paměti bez účasti procesoru. Zařízení má neomezený přístup do RAM → **může přepsat kód jádra apod.** K tomu slouží **DMA controller**. Dokončení zápisu se oznamuje pomocí přerušení.

**IO-MMU** (podobně jako MMU) je jednotka řešící překlad adres mezi operační pamětí a periferií, čímž zajišťuje zabezpečení DMA.

## Sběrnice

**Sběrnice** (BUS, např. USB) je soustava pro přenos dat. Dělí se na fyzickou část (obvody) a logickou (adresace, konfigurace). Strana sběrnice napojená na procesor je tzv. **hostitelská**.

**Terminál** je periferie určená pro komunikaci s uživatelem. Výstup na obrazovku je „virtuální terminál".

# RAID

**RAID** (Redundant Array of Independent Disks) je zapojení více disků jako jednoho zařízení.

- Řeší především problémy spolehlivosti paměti; jde o tzv. **obrácenou virtualizaci** – schováváme více zařízení do jednoho
- **Hardwarově** → řídí se mimo OS, skrze speciální RAID kartu
- **Softwarově** → je součástí blokové vrstvy
  - Více disků se v OS tváří jako jedno virtuální zařízení
  - Bloková vrstva distribuuje data napříč jednotlivými disky
- **Výhody:** Ochrana před ztrátou dat pomocí redundance, rychlejší čtení

## RAID 0
> Rozdělení dat přes více disků, bez duplikace

![[raid0.png|127]]

## RAID 1
> Duplikace stejných dat přes více disků (zrcadlení)

![[raid1.png|128]]

## RAID 2
> Rozdělení dat na úrovni bitů s kontrolou chyb Hammingovým kódem
- Nestandardní, méně používaný

![[raid2.png|410]]

**Hammingův kód** je lineární kód pro detekci až dvou chybných bitů a pro opravu 1 bitu.

## RAID 3
> Rozdělení dat na úrovni bajtů s paritním diskem
- Nestandardní, méně používaný

![[raid3.png|296]]

## RAID 4
> Rozdělení dat na úrovni bloků s dedikovaným paritním diskem
- Nestandardní, méně používaný

![[raid4.png|270]]

## RAID 5
> Rozdělení dat na úrovni bloků, parita distribuována na všech discích

![[raid5.png|256]]

## RAID 6
> Jako RAID 5, ale se dvěma paritními bloky (vyšší odolnost)

![[raid6.png|327]]

## RAID 10 (1 + 0)
> Kombinace strippingu a zrcadlení, vyžaduje alespoň 4 disky
- Víceúrovňový typ RAID. Dále se používají: 01, 50, 600, 100, ...

![[raid10.png|243]]

# Šifrování a komprese

## Šifrování

**Šifrování** je mechanismus pro zabezpečení dat před nepovolaným čtením.

- Šifrování probíhá na úrovni bloků
- Data se při zápisu šifrují **symetrickou blokovou šifrou** pomocí klíče
- **Symetrická bloková šifra**, např. **AES** (Rijndael), zachovává velikost dat
  - Bity se nalijí do matic a tam se provádějí úpravy
  - Pro kontrolu integrity → checksum (s checksumy jsou data větší)

## Komprese

**Komprese** je algoritmus pro bezztrátové zmenšení velikosti souborů → reorganizace dat.

- Obtížná implementace při zachování efektivity náhodného přístupu
- Algoritmy: LZ77, LZW, Huffman Coding
- Ztrátová komprese je na úrovni disku nevhodná
