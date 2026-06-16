// 5. SQL, transakce a zpracování dotazů (PB154)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.sql = { label: "📝 SQL a transakce", cls: "tag-sql", order: 16 };

FC.cards.push(
  { t: "sql",
    q: "Jaká je základní syntaxe SELECT, INSERT, UPDATE a ALTER TABLE?",
    a: "<ul><li><code>SELECT sloupce FROM tabulka WHERE podmínka;</code></li><li><code>INSERT INTO tabulka (a, b) VALUES (1, 'x');</code> – lze i bez všech atributů (zbytek dostane default/NULL)</li><li><code>UPDATE tabulka SET a = 1 WHERE id = 5;</code></li><li><code>ALTER TABLE tabulka ADD COLUMN c INT;</code> – mění strukturu (DDL)</li></ul>Příklad dotazu: <code>SELECT jméno FROM Student WHERE ročník = 1;</code>" },

  { t: "sql",
    q: "Co jsou integritní omezení a jaké existují?",
    a: "<b>Pravidla zajišťující správnost a konzistenci dat.</b><ul><li><b>PRIMARY KEY</b> – jednoznačnost + NOT NULL</li><li><b>FOREIGN KEY</b> – referenční integrita (odkaz musí existovat)</li><li><b>UNIQUE</b> – jedinečnost hodnot</li><li><b>NOT NULL</b>, <b>CHECK</b> (podmínka na hodnotu), <b>DEFAULT</b></li></ul>Databáze odmítne operaci, která by omezení porušila." },

  { t: "sql",
    q: "Co jsou triggery a uložené procedury?",
    a: "<ul><li><b>Trigger</b> – kód <b>automaticky spuštěný</b> při události (INSERT/UPDATE/DELETE) na tabulce. Použití: auditní log, vynucení složitějších pravidel, kaskádové úpravy.</li><li><b>Uložená procedura</b> – pojmenovaný blok SQL/procedurálního kódu uložený v DB, volaný explicitně. Zapouzdřuje logiku, sníží přenos dat, lze parametrizovat.</li></ul>" },

  { t: "sql",
    q: "Co je transakce a co znamenají ACID vlastnosti?",
    a: "<b>Transakce = posloupnost operací provedená jako jeden nedělitelný celek.</b> ACID:<ul><li><b>Atomicity (atomicita)</b> – vše, nebo nic</li><li><b>Consistency (konzistence)</b> – zachová integritní omezení</li><li><b>Isolation (izolace)</b> – souběžné transakce se navzájem neovlivní</li><li><b>Durability (trvalost)</b> – po commitu změny přežijí i pád</li></ul>" },

  { t: "sql",
    q: "Jaké jsou úrovně izolace transakcí a jaké problémy řeší?",
    a: "<b>Od nejslabší po nejsilnější:</b><ul><li><b>READ UNCOMMITTED</b> – dovoluje <b>dirty read</b></li><li><b>READ COMMITTED</b> – brání dirty read, dovolí <b>non-repeatable read</b></li><li><b>REPEATABLE READ</b> – brání i tomu, dovolí <b>phantom read</b></li><li><b>SERIALIZABLE</b> – plná izolace (jako sériové provedení)</li></ul>Vyšší izolace = méně anomálií, ale nižší souběžnost (více zamykání)." },

  { t: "sql",
    q: "Jak se implementují vlastnosti transakcí a co je ROLLBACK?",
    a: "<ul><li><b>Logování (write-ahead log)</b> – před změnou se zapíše do logu; po pádu lze <b>redo/undo</b> → atomicita + trvalost</li><li><b>Stínové databáze (shadow paging)</b> – změny do kopií stránek, commit přepne ukazatele</li><li><b>Zamykání / MVCC</b> – izolace</li></ul><b>ROLLBACK</b> = zrušení transakce a vrácení DB do stavu před jejím začátkem (opak <code>COMMIT</code>)." },

  { t: "sql",
    q: "Co je indexování a jaké jsou typy indexů?",
    a: "<b>Pomocná datová struktura urychlující vyhledávání (za cenu paměti a pomalejších zápisů).</b><ul><li><b>Hustý index</b> – záznam pro každý klíč; <b>řídký</b> – jen pro některé (např. začátky bloků)</li><li><b>Primární</b> – nad seřazeným klíčem (určuje fyzické uspořádání); <b>sekundární</b> – nad jiným atributem</li><li>Typicky implementováno <b>B+ stromem</b> nebo hašováním</li></ul>" },

  { t: "sql",
    q: "Proč se v databázích používají B+ stromy?",
    a: "<b>B+ strom – vyvážený strom s vysokým větvením, kde data jsou jen v listech a listy jsou propojené.</b><ul><li><b>Malá výška</b> → málo přístupů na disk (O(log n))</li><li>Vnitřní uzly jen směrují → víc klíčů na blok</li><li>Propojené listy → efektivní <b>rozsahové dotazy</b> a sekvenční čtení</li><li>Bloky odpovídají velikosti diskové stránky</li></ul>" },

  { t: "sql",
    q: "Co je hašování a proč se pro indexování nepoužívá MD5/SHA1?",
    a: "<ul><li><b>Hašování</b> – hašovací funkce mapuje klíč na číslo přihrádky (bucket) → vyhledání <b>O(1)</b> v průměru. Vhodné pro <b>rovnostní dotazy</b>, ne pro rozsahové.</li><li><b>MD5/SHA1</b> jsou <b>kryptografické</b> haše – pomalé a zbytečně robustní; pro indexy stačí rychlé nekryptografické funkce. Navíc kryptohaše neřeší rozložení do přihrádek lépe a jsou výpočetně drahé.</li></ul>" },

  { t: "sql",
    q: "Jak se vyhodnocují dotazy a co jsou agregační funkce?",
    a: "<ul><li><b>Vyhodnocení dotazu</b>: optimalizátor zvolí plán podle <b>nákladů</b> (odhad počtu řádků, využití <b>indexů/hašování</b> vs sekvenční sken, pořadí joinů)</li><li><b>Agregační funkce</b>: <code>COUNT, SUM, AVG, MIN, MAX</code> – často s <code>GROUP BY</code> a <code>HAVING</code></li></ul>Příklad: <code>SELECT ročník, COUNT(*) FROM Student GROUP BY ročník;</code>" },

  { t: "sql",
    q: "Jak se dělí SQL příkazy (DML, DDL, DCL)?",
    a: "<b>SQL je neprocedurální (deklarativní) dotazovací jazyk.</b><ul><li><b>DML</b> (manipulace dat): SELECT, INSERT, UPDATE, DELETE</li><li><b>DDL</b> (definice dat): CREATE, ALTER, DROP – schéma, domény, omezení, indexy</li><li><b>DCL</b> (řízení): GRANT, REVOKE (práva), COMMIT, ROLLBACK</li></ul>" },

  { t: "sql",
    q: "Jak SELECT-FROM-WHERE odpovídá relační algebře?",
    a: "<ul><li><b>SELECT</b> sloupce → <b>projekce (Π)</b></li><li><b>FROM</b> tabulky → <b>kartézský součin (×)</b></li><li><b>WHERE</b> podmínka → <b>selekce (σ)</b></li></ul><b>DISTINCT</b> odstraní duplicity, <b>ALL</b> je ponechá. Pořadí provádění: FROM → WHERE → GROUP BY → HAVING → SELECT." },

  { t: "sql",
    q: "Jaké jsou operátory v predikátu (WHERE)?",
    a: "<ul><li><b>BETWEEN a AND b</b> – rozsah, <b>inkluzivní</b> z obou stran</li><li><b>LIKE 'P%'</b> – shoda se vzorem (% = libovolný řetězec, _ = 1 znak)</li><li><b>IN (1,2,3)</b> – rovnost s některou hodnotou</li><li><b>IS NULL / IS NOT NULL</b> – test na NULL (ne =, NULL se nerovná ničemu)</li></ul>SQL používá <b>tříhodnotovou logiku</b> (true/false/unknown)." },

  { t: "sql",
    q: "Jaké jsou typy JOIN a podmínky spojení?",
    a: "<ul><li><b>INNER JOIN</b> – jen průnik (spárované řádky)</li><li><b>LEFT/RIGHT OUTER</b> – celá levá/pravá tabulka + průnik (nespárované → NULL)</li><li><b>FULL OUTER</b> – obě tabulky celé</li></ul>Podmínky: <b>NATURAL</b> (společné atributy), <b>ON</b> (libovolná podmínka), <b>USING (a)</b> (cukr za ON t1.a=t2.a, nezdvojuje sloupec). Bez podmínky → kartézský součin." },

  { t: "sql",
    q: "Jaké je pravidlo pro GROUP BY a HAVING?",
    a: "<b>Při seskupení musí být každý sloupec v SELECT buď v GROUP BY, nebo uvnitř agregace.</b><ul><li><b>WHERE</b> filtruje <b>řádky před</b> agregací; <b>HAVING</b> filtruje <b>skupiny po</b> agregaci</li><li><code>SELECT *</code> se seskupením je chyba (zahrnuje negroupované sloupce)</li></ul>Příklad: <code>SELECT b, COUNT(a) FROM t GROUP BY b HAVING COUNT(a)&lt;3;</code>" },

  { t: "sql",
    q: "Jaké konstrukce umožňuje vnořené SQL (poddotazy)?",
    a: "<ul><li><b>atribut IN/NOT IN (poddotaz)</b> – je hodnota mezi výsledky?</li><li><b>op SOME (poddotaz)</b> – platí pro <b>alespoň jednu</b> (2 &lt; SOME {1,2,3} → true)</li><li><b>op ALL (poddotaz)</b> – platí pro <b>všechny</b> (2 &lt; ALL {1,2,3} → false)</li><li><b>EXISTS/NOT EXISTS</b> – je výsledek (ne)prázdný?</li></ul>Poddotaz místo atributu musí vracet jednu hodnotu." },

  { t: "sql",
    q: "Co jsou triggery a jak přistupují ke starým/novým hodnotám?",
    a: "<b>Kód automaticky spuštěný při události na tabulce.</b><ul><li><b>DML trigger</b> (INSERT/UPDATE/DELETE), <b>DDL trigger</b> (CREATE/DROP), <b>Logon trigger</b></li><li>BEFORE/AFTER, FOR EACH ROW/STATEMENT</li><li>Staré/nové hodnoty přes <b>OLD/NEW</b> (resp. pseudo-tabulky <code>deleted</code>/<code>inserted</code> v T-SQL)</li></ul>Použití: kontrola integrity, audit, kaskádové úpravy." },

  { t: "sql",
    q: "Jaké jsou výhody uložených procedur?",
    a: "<b>Programy uložené v databázi (PL/SQL v Oracle, T-SQL v MS SQL), volané explicitně.</b><ul><li><b>Výkon</b> – prováděcí plán se vytvoří jednou a cachuje</li><li><b>Nepřerušitelnost</b> – běží sekvenčně jako celek</li><li><b>Bezpečnost</b> – uživateli stačí právo na spuštění procedury</li></ul>Nevýhoda: nutnost správy, další jazyk." },

  { t: "sql",
    q: "Jaká jsou integritní omezení v SQL?",
    a: "<ul><li><b>NOT NULL</b> – nesmí být prázdné</li><li><b>UNIQUE</b> – jedinečné hodnoty</li><li><b>PRIMARY KEY</b> = NOT NULL + UNIQUE</li><li><b>FOREIGN KEY ... REFERENCES</b> – referenční integrita (odkaz musí existovat v nadřízené tabulce)</li><li><b>CHECK (podmínka)</b>, <b>DEFAULT</b></li></ul>Chrání databázi před nekonzistencí; porušení → operace se neprovede." },

  { t: "sql",
    q: "Co přesně znamenají ACID vlastnosti (na příkladu převodu peněz)?",
    a: "<b>Převod 500 Kč z A na B:</b><ul><li><b>Atomicita</b> – buď proběhnou obě části (odečtení i přičtení), nebo žádná</li><li><b>Konzistence</b> – součet A+B zůstane stejný (integritní omezení dodržena)</li><li><b>Izolace</b> – jiná transakce nevidí mezistav (A už odečteno, B ještě ne)</li><li><b>Durabilita</b> – po commitu změny přežijí i pád</li></ul>" },

  { t: "sql",
    q: "Jaké anomálie povolují jednotlivé úrovně izolace?",
    a: "<table><tr><td><b>úroveň</b></td><td>dirty</td><td>non-rep.</td><td>phantom</td></tr><tr><td>READ UNCOMMITTED</td><td>ano</td><td>ano</td><td>ano</td></tr><tr><td>READ COMMITTED</td><td>ne</td><td>ano</td><td>ano</td></tr><tr><td>REPEATABLE READ</td><td>ne</td><td>ne</td><td>ano</td></tr><tr><td>SERIALIZABLE</td><td>ne</td><td>ne</td><td>ne</td></tr></table><ul><li><b>Dirty read</b> – čtení nepotvrzených dat; <b>non-repeatable</b> – dva SELECTy vrátí jiné hodnoty; <b>phantom</b> – objeví se nový řádek</li></ul>" },

  { t: "sql",
    q: "Jaké jsou stavy transakce a jak se implementuje atomicita?",
    a: "<b>Stavy: active → partially committed → committed</b> (nebo → failed → aborted).<ul><li><b>Stínová databáze (shadow paging)</b> – změny v kopii, commit přepne ukazatel; nevhodné pro DB (kopíruje celou DB)</li><li><b>Log (write-ahead log / journal)</b> – zapíše změny před provedením, po pádu redo/undo → standard v DB</li></ul>" },

  { t: "sql",
    q: "Co je serializovatelnost a dvoufázové zamykání (2PL)?",
    a: "<ul><li><b>Plán je serializovatelný</b>, je-li ekvivalentní nějakému <b>sériovému</b> plánu (transakce jedna po druhé) → zachová konzistenci</li><li><b>2PL (two-phase locking)</b> – transakce nejdřív jen získává zámky (rostoucí fáze), pak je jen uvolňuje (klesající fáze)</li></ul><b>Deadlock</b> – transakce čekají navzájem na zámky; řeší se ukončením jedné (rollback)." },

  { t: "sql",
    q: "Jaké jsou kroky vyhodnocení dotazu a jak se měří náklady?",
    a: "<ol><li><b>Parsing a překlad</b> – do relační algebry, kontrola syntaxe</li><li><b>Optimalizace</b> – výběr nejlevnějšího plánu z ekvivalentních výrazů (podle statistik v katalogu)</li><li><b>Vyhodnocení</b> – execution engine spustí plán</li></ol>Náklady dominuje <b>přístup na disk</b>: počet seeků × cena + počet bloků × cena čtení/zápisu. Více paměti (bufferu) snižuje náklady." },

  { t: "sql",
    q: "Jaký je rozdíl mezi primárním a sekundárním, hustým a řídkým indexem?",
    a: "<ul><li><b>Primární (shlukující) index</b> – určuje <b>fyzické pořadí</b> záznamů; může být hustý i řídký</li><li><b>Sekundární (neshlukující)</b> – jiné pořadí; musí být <b>hustý</b></li><li><b>Hustý</b> – záznam pro každou hodnotu klíče; <b>řídký</b> – jen pro některé (např. začátky bloků), úspornější ale pomalejší</li></ul>Při mnoha úrovních → <b>víceúrovňový index</b> nebo B⁺ strom." },

  { t: "sql",
    q: "Jaké jsou parametry B⁺ stromu jako databázového indexu?",
    a: "<b>Vyvážený n-ární strom, nejpoužívanější DB index:</b><ul><li>Všechny cesty kořen→list <b>stejně dlouhé</b></li><li>Vnitřní uzel (kromě kořene) má ⌈n/2⌉ až n potomků</li><li><b>Data/odkazy jen v listech</b>, listy <b>propojené</b> → efektivní rozsahové dotazy</li></ul>Výhoda: lokální reorganizace při vkládání/mazání. Vhodný i pro range queries (na rozdíl od hašování)." },

  { t: "sql",
    q: "Jaký je rozdíl mezi statickým a dynamickým, otevřeným a uzavřeným hašováním?",
    a: "<ul><li><b>Statické</b> – pevný počet kyblíků (bucket); problém při růstu DB. <b>Dynamické (rozšiřitelné)</b> – mění počet kyblíků za běhu (prefix bitů).</li><li><b>Otevřené hašování (closed addressing)</b> – kolize do <b>přetokových kyblíků</b> (řetězení)</li><li><b>Uzavřené (open addressing)</b> – sondování dalších adres; mazání značkou DELETED</li></ul>Hašování je rychlé na rovnost, <b>nevhodné pro rozsahové dotazy</b>." }
);
