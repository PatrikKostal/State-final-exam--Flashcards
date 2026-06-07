// 7. Souborové systémy (PB152)
// Otázka pro státnice PVA – flashcards k tématu "Souborové systémy".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.fs = { label: "🗄️ Souborové systémy", cls: "tag-fs", order: 2 };

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
    a: "<b>Cache obsahu souborů a diskových bloků v RAM, kterou spravuje jádro.</b><ul><li>Opakovaná čtení jdou z RAM místo z disku → výrazné zrychlení</li><li>Zápisy se často odkládají (<b>write-back</b>) a slučují; <code>sync</code> je vynutí na disk</li><li>Riziko ztráty neuložených dat při pádu → proto žurnálování a <code>fsync</code></li></ul>" }
);
