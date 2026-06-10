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
    a: "<ul><li><b>Vyhodnocení dotazu</b>: optimalizátor zvolí plán podle <b>nákladů</b> (odhad počtu řádků, využití <b>indexů/hašování</b> vs sekvenční sken, pořadí joinů)</li><li><b>Agregační funkce</b>: <code>COUNT, SUM, AVG, MIN, MAX</code> – často s <code>GROUP BY</code> a <code>HAVING</code></li></ul>Příklad: <code>SELECT ročník, COUNT(*) FROM Student GROUP BY ročník;</code>" }
);
