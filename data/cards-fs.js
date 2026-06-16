// 7. Souborové systémy (PB152)
// Otázka pro státnice PVA – flashcards k tématu "Souborové systémy".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.fs = { label: "🗄️ Souborové systémy", cls: "tag-fs", order: 18 };

FC.cards.push(
  { t: "fs",
    q: "Co je souborový systém a jakou má roli?",
    a: "<b>Vrstva OS, která organizuje data na úložišti do souborů a adresářů.</b><ul><li>Mapuje logické soubory na fyzické bloky zařízení</li><li>Spravuje metadata (jméno, velikost, práva, časy)</li><li>Spravuje volné místo a strukturu adresářů</li><li>Příklady: <b>ext4, XFS, btrfs, ZFS (Linux), NTFS (Windows), FAT32/exFAT, APFS (macOS)</b></li></ul>" },

  { t: "fs",
    q: "Co je blokové zařízení a jak se liší od znakového?",
    a: "<ul><li><b>Blokové zařízení</b> – data čte/zapisuje po <b>blocích pevné velikosti</b> (např. 512 B / 4 KiB), umožňuje <b>náhodný přístup</b> a buffering. Příklad: HDD, SSD, USB disk.</li><li><b>Znakové zařízení</b> – proud bytů, sekvenční přístup bez bufferingu. Příklad: terminál, sériový port, <code>/dev/random</code>.</li></ul>" },

  { t: "fs",
    q: "Co je bloková vrstva (block layer) v jádře?",
    a: "<b>Abstraktní vrstva mezi souborovým systémem a ovladači blokových zařízení.</b><ul><li>Jednotné rozhraní – FS nemusí znát detaily konkrétního disku</li><li>Zajišťuje <b>frontu I/O požadavků, slučování (merge), řazení (I/O scheduler), buffer cache</b></li><li>Umožňuje vrstvení: RAID, šifrování (dm-crypt), LVM jako virtuální bloková zařízení</li></ul>" },

  { t: "fs",
    q: "Co je I/O plánovač (scheduler) a proč existuje?",
    a: "<b>Rozhoduje o pořadí provádění požadavků na blokové zařízení.</b><ul><li>U <b>HDD</b> minimalizuje pohyb hlavy (seek time) řazením podle pozice (elevator/lift algoritmus)</li><li>Zajišťuje spravedlnost a slučování sousedních požadavků</li><li>Příklady (Linux): <b>noop, deadline, CFQ</b>; moderní <b>mq-deadline, BFQ, Kyber</b> (multi-queue pro SSD/NVMe)</li><li>U SSD má seek čas nulový, takže jednodušší plánovače stačí</li></ul>" },

  { t: "fs",
    q: "Co je RAID a jaký je rozdíl RAID 0 a RAID 1?",
    a: "<b>Redundant Array of Independent Disks – spojení více disků pro výkon a/nebo redundanci.</b><ul><li><b>RAID 0 (striping)</b> – data rozprostřena přes disky → <b>vyšší výkon</b> a kapacita, ale <b>žádná redundance</b> (selhání 1 disku = ztráta všeho)</li><li><b>RAID 1 (mirroring)</b> – data zrcadlena na 2+ disky → <b>redundance</b>, přežije výpadek disku, ale poloviční využití kapacity</li></ul>" },

  { t: "fs",
    q: "Popiš RAID 5, RAID 6 a RAID 10.",
    a: "<ul><li><b>RAID 5</b> – striping + <b>distribuovaná parita</b>, kapacita n−1 disků, přežije výpadek <b>1</b> disku. Pomalejší zápis (přepočet parity).</li><li><b>RAID 6</b> – <b>dvojitá parita</b>, kapacita n−2, přežije výpadek <b>2</b> disků.</li><li><b>RAID 10 (1+0)</b> – zrcadlené páry spojené stripingem → výkon i redundance, ale poloviční kapacita.</li></ul><b>Pozor:</b> RAID není záloha (nechrání před smazáním/poškozením dat)!" },

  { t: "fs",
    q: "Jak funguje šifrování disku?",
    a: "<b>Transparentní šifrování dat na blokové úrovni (Full Disk Encryption).</b><ul><li>Data se šifrují při zápisu a dešifrují při čtení – aplikace nic nepozná</li><li>Linux: <b>dm-crypt / LUKS</b> jako vrstva blokové vrstvy; Windows: <b>BitLocker</b>; macOS: <b>FileVault</b></li><li>Klíč chráněn heslem/TPM; symetrická šifra <b>AES-XTS</b> (vhodná pro náhodný přístup k blokům)</li><li>Chrání data \"at rest\" – při krádeži/odcizení disku</li></ul>" },

  { t: "fs",
    q: "Co je obyčejný soubor a jak ho FS reprezentuje?",
    a: "<ul><li><b>Obyčejný soubor</b> – pojmenovaná sekvence bytů + metadata; OS nevidí vnitřní strukturu (interpretuje ji aplikace)</li><li>Metadata uložena v <b>inode</b> (v unixových FS): velikost, vlastník, práva, časy (atime/mtime/ctime), počet odkazů, ukazatele na datové bloky</li><li><b>Jméno souboru NENÍ v inode</b> – je v adresáři jako dvojice (jméno → číslo inode)</li></ul>" },

  { t: "fs",
    q: "Co je inode?",
    a: "<b>Datová struktura popisující soubor (kromě jména).</b><ul><li>Obsahuje: typ, práva, vlastníka/skupinu, velikost, časové značky, počet hardlinků, <b>ukazatele na datové bloky</b></li><li>Každý soubor má právě jeden inode, identifikovaný <b>číslem inode</b></li><li>Adresář mapuje jména na čísla inode → více jmen může ukazovat na jeden inode (<b>hardlink</b>)</li></ul>" },

  { t: "fs",
    q: "Jak souborový systém eviduje volné místo?",
    a: "<ul><li><b>Bitmapa</b> – jeden bit na blok (0 = volný, 1 = obsazený). Rychlé hledání souvislých oblastí, kompaktní.</li><li><b>Spojový seznam volných bloků (free list)</b> – každý volný blok ukazuje na další. Jednoduché, ale pomalé hledání souvislého místa.</li><li>Moderní FS používají i <b>extenty</b> a stromy (B-stromy) pro evidenci rozsahů.</li></ul>" },

  { t: "fs",
    q: "Jaké jsou metody alokace bloků souboru?",
    a: "<ul><li><b>Souvislá (contiguous)</b> – soubor v souvislém úseku bloků. Rychlé čtení, ale vzniká <b>externí fragmentace</b> a problém s růstem.</li><li><b>Spojová (linked, FAT)</b> – každý blok ukazuje na další. Bez externí fragmentace, ale pomalý náhodný přístup.</li><li><b>Indexová (inode)</b> – inode drží seznam ukazatelů na bloky; velké soubory řešeny <b>nepřímými bloky</b> (single/double/triple indirect). Používá ext4 apod.</li></ul>" },

  { t: "fs",
    q: "Co jsou přímé a nepřímé odkazy v inode?",
    a: "<b>Schéma adresování datových bloků v unixových FS.</b><ul><li><b>Přímé ukazatele</b> – inode ukazuje přímo na prvních ~12 datových bloků (rychlé pro malé soubory)</li><li><b>Single indirect</b> – ukazatel na blok plný ukazatelů na data</li><li><b>Double indirect</b> – ukazatel na blok ukazatelů na bloky ukazatelů…</li><li><b>Triple indirect</b> – tři úrovně</li></ul>Umožňuje malou režii pro malé soubory a podporu velmi velkých souborů." },

  { t: "fs",
    q: "Co je fragmentace a jaké jsou její druhy?",
    a: "<ul><li><b>Externí fragmentace</b> – volné místo rozdroberné na malé úseky mezi soubory; soubor pak nelze uložit souvisle, i když je dost volného místa celkem</li><li><b>Interní fragmentace</b> – soubor nezaplní celý poslední blok → nevyužité místo uvnitř bloku (např. 1 B soubor zabere celý 4 KiB blok)</li></ul><b>Defragmentace</b> přeskupí data, aby byly souvislé (užitečné u HDD, u SSD zbytečné a škodlivé)." },

  { t: "fs",
    q: "Jak je reprezentována adresářová struktura na disku?",
    a: "<ul><li>Adresáře tvoří <b>strom</b> (hierarchii) s kořenem <code>/</code></li><li><b>Adresář je speciální soubor</b>, jehož obsahem je seznam záznamů <b>(jméno → číslo inode)</b></li><li>Obsahuje vždy <code>.</code> (sám sebe) a <code>..</code> (rodič)</li><li>Pro rychlé vyhledávání ve velkých adresářích se používají <b>hashovací tabulky nebo B-stromy</b> (např. HTree v ext4)</li></ul>" },

  { t: "fs",
    q: "Jaký je rozdíl mezi hardlinkem a symbolickým linkem?",
    a: "<ul><li><b>Hardlink</b> – další jméno ukazující na <b>stejný inode</b>. Soubor existuje, dokud má počet odkazů &gt; 0. Nelze přes hranice FS, nelze na adresáře.</li><li><b>Symbolický link (symlink)</b> – samostatný soubor obsahující <b>cestu</b> k cíli. Může mířit kamkoli (i přes FS), ale rozbije se, když cíl zmizí (\"dangling\").</li></ul>" },

  { t: "fs",
    q: "Co je vstup/výstup mapovaný do paměti (mmap)?",
    a: "<b>Mapování souboru (nebo zařízení) přímo do virtuálního adresního prostoru procesu.</b><ul><li>Přístup k souboru pak probíhá <b>jako ke poli v paměti</b> – bez <code>read</code>/<code>write</code></li><li>Stránky se načítají líně (on-demand) přes <b>page fault</b>; zápisy se zapisují zpět (write-back)</li><li>Výhody: <b>žádné kopírování</b> mezi kernel a user bufferem, snadné sdílení paměti mezi procesy, vhodné pro velké soubory a načítání knihoven/spustitelných souborů</li></ul>" },

  { t: "fs",
    q: "Co je žurnálování (journaling) a proč je důležité?",
    a: "<b>Technika pro zachování konzistence FS po pádu/výpadku napájení.</b><ul><li>Změny se nejprve zapíší do <b>žurnálu (log)</b>, pak teprve na cílové místo</li><li>Po pádu stačí <b>přehrát žurnál</b> místo kontroly celého disku (fsck)</li><li><b>Režimy</b>: journal (data i metadata – nejbezpečnější/nejpomalejší), ordered (jen metadata, data před nimi – výchozí v ext4), writeback (jen metadata, nejrychlejší)</li></ul>" },

  { t: "fs",
    q: "Co je page cache / buffer cache?",
    a: "<b>Cache obsahu souborů a diskových bloků v RAM, kterou spravuje jádro.</b><ul><li>Opakovaná čtení jdou z RAM místo z disku → výrazné zrychlení</li><li>Zápisy se často odkládají (<b>write-back</b>) a slučují; <code>sync</code> je vynutí na disk</li><li>Riziko ztráty neuložených dat při pádu → proto žurnálování a <code>fsync</code></li></ul>" },

  { t: "fs",
    q: "Jak je uspořádán souborový systém na disku?",
    a: "<b>Typické rozložení (unixový FS):</b><ul><li><b>Boot blok</b> – zaváděcí kód</li><li><b>Superblok</b> – metadata celého FS (velikost, počet inode/bloků, umístění struktur)</li><li><b>Bitmapy</b> – evidence volných inode a volných datových bloků</li><li><b>Tabulka inode</b> – metadata všech souborů</li><li><b>Datové bloky</b> – samotný obsah souborů a adresářů</li></ul>" },

  { t: "fs",
    q: "Proč a jak se v souborových systémech používají B+ stromy?",
    a: "<b>Moderní FS (NTFS, btrfs, XFS, ext4 HTree) indexují adresáře a metadata B+ stromy.</b><ul><li><b>Malá výška</b> → málo přístupů na disk i u velkých adresářů (O(log n) místo lineárního hledání)</li><li>Uzly odpovídají velikosti bloku, listy propojené → efektivní procházení</li><li>Rychlé vyhledání souboru podle jména i rozsahové operace</li></ul>" },

  { t: "fs",
    q: "Je čtení u RAID 1 rychlejší než u RAID 0?",
    a: "<ul><li><b>RAID 0 (striping)</b> – zápis i čtení paralelně přes oba disky → vysoká propustnost, ale data jen jednou</li><li><b>RAID 1 (mirroring)</b> – stejná data na obou discích, takže <b>čtení lze rozdělit mezi disky</b> (každý čte jinou část / vyřídí jiný požadavek) → čtení může být velmi rychlé. <b>Zápis</b> ale musí na oba (žádné zrychlení).</li></ul>U HDD hraje roli i poloha hlaviček – nezávislé hlavy obslouží více požadavků současně." },

  { t: "fs",
    q: "Co je VFS (Virtual Filesystem Switch)?",
    a: "<b>API jádra pro jednotný přístup k různým souborovým systémům.</b><ul><li>Aplikace volají stejné operace (open/read/write) bez ohledu na to, zda je pod tím ext4, NTFS, FAT…</li><li>Umožňuje <b>mount</b> – připojení úložiště tak, že jeho kořen se stane složkou v jiném FS</li></ul>Struktura FS bývá implementovaná B-stromy." },

  { t: "fs",
    q: "Jak se implementuje adresář (old-style, hash, tree)?",
    a: "<b>Adresář je seznam záznamů (jméno → inode):</b><ul><li><b>Old-style</b> – netříděný seznam → vyhledání lineární (pomalé)</li><li><b>Hash-based</b> – přečtení jediného bloku, konstantní složitost (pořadí náhodné)</li><li><b>Tree-based (B-strom)</b> – jména jsou klíče, operace logaritmické, optimalizováno pro bloky</li></ul>" },

  { t: "fs",
    q: "Proč inode neobsahuje jméno souboru?",
    a: "<b>Inode drží jen metadata + seznam datových bloků, ne jméno.</b><ul><li>Jméno je v <b>adresáři</b> (jméno → číslo inode) → soubor lze <b>odlinkovat / přejmenovat bez přepisování dat</b></li><li>Na jeden inode může ukazovat více jmen (<b>hardlinky</b>, všechny rovnocenné)</li><li>Speciální inode reprezentuje i adresáře, symlinky, zařízení (special file)</li></ul>" },

  { t: "fs",
    q: "Jaký je rozdíl mezi file descriptorem a handle?",
    a: "<ul><li><b>UNIX – file descriptor</b>: <b>integer index</b> do tabulky otevřených souborů; index zůstane platný i po přesunu souboru</li><li><b>Windows – handle</b>: <b>struktura</b>, ne pouhý integer (nižší abstrakce)</li></ul>Soubor je třeba před prací <b>otevřít</b> (open ověří práva u jádra) a uvolnit." },

  { t: "fs",
    q: "Jak se eviduje volné místo – bitmapa vs tabulka vs B-strom?",
    a: "<ul><li><b>Bitmapa</b> – 1 bit = 1 blok; blok bitmapy (4 KB) pokryje 128 MB; flip bitu je atomický. FS lze dělit na <b>alokační skupiny</b> s vlastní bitmapou.</li><li><b>Tabulka inodů</b> – řádky = inody, alokace přes bitmapu</li><li><b>B-strom</b> – nahradí bitmapy i tabulky; klíčem adresy bloků → podstromy = intervaly volného místa</li></ul>" },

  { t: "fs",
    q: "Jak funguje žurnál a jak ho používá ext4?",
    a: "<b>Žurnál (write-ahead log) udržuje sekvenci akcí, které se mají provést.</b><ul><li>Změny metadat nastanou <b>až po ukončení transakce</b>; při nekonzistenci (výpadek) se nedokončená transakce zahodí a obnoví předchozí stav</li><li><b>ext4 má 2 žurnály</b>: low-level (zápisy do bloků) a high-level (transakce typu „smaž soubor\")</li></ul>Náhrada za pomalý fsck po pádu." },

  { t: "fs",
    q: "Co je checksum a snapshot v souborovém systému?",
    a: "<ul><li><b>Checksum</b> – kontrolní hodnota odvozená z dat (součást metadat) pro <b>detekci korupce</b>; s checksumy jsou data větší</li><li><b>Snapshot</b> – kopie celého FS; posloupnost snapshotů ukládá jen <b>změny</b> oproti předchozímu (jako git)</li></ul>" },

  { t: "fs",
    q: "Co je znakové zařízení a roura (pipe)?",
    a: "<ul><li><b>Znakové zařízení</b> – proud bytů napojený na periferii (tiskárna, terminál), sekvenční přístup</li><li><b>Roura (pipe)</b> – komunikační soubor: jeden proces zapisuje, druhý čte</li></ul>Znakové zařízení používá rouru pro komunikaci periferie ↔ aplikace. Oproti tomu <b>blokové zařízení</b> = adresovatelné pole bloků s náhodným přístupem." },

  { t: "fs",
    q: "PŘÍKLAD: Jak I/O plánovač zrychlí zápisy přeskládáním?",
    a: "<b>Plánovač řadí požadavky do fronty a slučuje sousední, aby minimalizoval pohyb hlavy (seek).</b><ul><li>Příjem prokládaně: A₁B₁C₁A₂B₂A₃C₂B₃C₃ → 9 jednotlivých zápisů</li><li>Po přeskládání: A₁A₂A₃ − B₁B₂B₃ − C₁C₂C₃ → <b>3 souvislé zápisy</b></li></ul>Kontinuální čtení/zápis je nejrychlejší → fragmentace výrazně zpomaluje." },

  { t: "fs",
    q: "Jak přesně funguje memory-mapped I/O (private vs shared, dirty, sync)?",
    a: "<b>Soubor se mapuje do virtuálního adresního prostoru bez fyzických rámců; první přístup → page fault → načtení do page cache.</b><ul><li><b>Private</b> – změny jen ve virtuální paměti procesu (copy-on-write)</li><li><b>Shared</b> – změny se zapíší zpět do souboru</li><li><b>Dirty stránka</b> (změněná) se zapíše na disk; <b>sync</b> vynutí zápis</li></ul>Výhody: méně kopírování, sdílení mezi procesy. Spravuje procesor (rozdíl oproti DMA)." },

  { t: "fs",
    q: "Jaký je rozdíl mezi pollingem a přerušením, PIO a DMA?",
    a: "<ul><li><b>Polling</b> – CPU periodicky kontroluje zařízení (USB host se ptá zařízení); <b>přerušení</b> – zařízení samo „zakřičí\" (PS/2 IRQ)</li><li><b>PIO</b> – procesor aktivně přenáší data (blokující, režie)</li><li><b>DMA</b> – zařízení zapisuje přímo do RAM bez CPU; má plný přístup → <b>IO-MMU</b> řeší zabezpečení překladem adres</li></ul>" },

  { t: "fs",
    q: "Jaké jsou méně obvyklé úrovně RAID (2, 3, 4) a jak funguje šifrování disku?",
    a: "<ul><li><b>RAID 2</b> – po bitech s Hammingovým kódem; <b>RAID 3</b> – po bajtech s dedikovaným paritním diskem; <b>RAID 4</b> – po blocích s dedikovaným paritním diskem (RAID 5 paritu distribuuje)</li><li><b>Šifrování</b> probíhá na úrovni <b>bloků</b> symetrickou blokovou šifrou (<b>AES</b>), zachovává velikost dat</li></ul>Komprese (LZ77, Huffman) je bezztrátová, ztrátová je na disku nevhodná." }
);
