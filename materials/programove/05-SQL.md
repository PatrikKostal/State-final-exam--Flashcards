# 5. SQL, transakce, dotazy

> **Zadání:** Syntaxe a sémantika příkazů. Příkazy pro dotazování a aktualizaci dat, agregační funkce, triggery a uložené procedury, definici dat, integritní omezení. Transakční zpracování, jeho vlastnosti. Základní principy vyhodnocování dotazů (náklady na vyhodnocení dotazu, využití indexování a hašování). (PB154)

# SQL

**SQL (Structured Query Language**, dříve SEQUEL) je standardizovaný **neprocedurální** dotazovací jazyk používaný pro práci s daty v relačních databázích. Jeho vývoj započala firma IBM, standardy vydává ANSI.

# Syntaxe a sémantika příkazů

Syntaxe jazyka SQL je podobná anglickému jazyku. Nerozlišuje velká a malá písmena, ale je zvykem psát názvy příkazů velkými písmeny. Nadbytečné bílé znaky se ignorují. Každý systém poskytuje většinu funkcí uvedených v mezinárodní normě, může však používat další speciální funkce nebo vynechávat volitelné. Řádkové komentáře realizujeme dvěma pomlčkami (`--`), blokové lomítkem a hvězdičkou (`/* ... */`).

## Jazykové prvky

- **Příkaz** (command, statement) – řetězec znaků v souladu s pravidly formátu a syntaxe normy.
	- Ukončují se středníkem (volitelné).
	- Např. `SELECT`, `DELETE`, `UPDATE`.
- **Dotaz** (query) – příkaz, který **vrací relaci** (může být prázdná).
	- Např. `SELECT * FROM s`.
- **Klauzule** (clause) – jednotlivé komponenty příkazů/dotazů.
- **Predikát** (predicate) – podmínka vyhodnocovaná podle **tříhodnotové logiky SQL (3VL)** (pravda / nepravda / neznámé), nebo podle pravdivostních hodnot (pravda / nepravda).
	- Omezují účinky příkazů a dotazů, nebo mění tok programu.
- **Výraz** (expression) – konstanta nebo funkce vracející skalární hodnotu (číslo).
	- Textové řetězce se uzavírají do jednoduchých uvozovek (v některých systémech dvojité nebo obrácené uvozovky).

### Příklad rozboru příkazu

```sql
UPDATE country
SET population = population + 1
WHERE name = 'USA';
```

- **Dotaz:** celý obsah příkazu
- **Klauzule:** každý řádek
- **Predikát:** `name = 'USA'`
- **Výraz:** `population + 1`, `'USA'`
- **Operátor:** `=`

```sql
SELECT name
FROM country
WHERE name LIKE 'P%';
```

- **Dotaz:** celý obsah příkazu
- **Klauzule:** každý řádek
- **Predikát:** `name LIKE 'P%'`
- **Výraz:** `'P%'`
- **Operátor:** `LIKE`

## Příkazy

Příkazy jazyka SQL se dělí na čtyři základní skupiny:

- **DML (Data Manipulation Language)** – příkazy pro manipulaci s daty: `INSERT`, `SELECT`, `UPDATE`, `DELETE`.
- **DDL (Data Definition Language)** – umožňuje specifikaci informací o relacích: `CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`. Specifikuje mj.:
	- schéma pro každou relaci,
	- doménu hodnot spojených s každým atributem,
	- integritní omezení,
	- množinu indexů udržovaných pro každou relaci,
	- bezpečnostní a autorizační informace o každé relaci,
	- fyzickou strukturu uložení na disk pro každou relaci.
- **DCL (Data Control Language)** – příkazy pro nastavování přístupových práv a řízení transakcí: `COMMIT`, `ROLLBACK`, `GRANT` (přidělení oprávnění), `REVOKE` (odnětí práv).
- **Ostatní** nebo speciální příkazy.

## Operátory (část predikátu)

- `=, <>, <, >, <=, >=` – klasické porovnání porovnatelných hodnot.
- `BETWEEN` – rozsah porovnatelných hodnot, **inkluzivní** z obou stran.
- `LIKE` – shoda s nějakým vzorem (`First_Name LIKE 'Will%'`).
	- case-insensitive (záleží na collation; v PostgreSQL je case-sensitive, v MySQL obvykle ne)
- `IN` – rovnost s některou z hodnot (`DeptCode IN (101, 103, 209)`).
- `IS` / `IS NOT` – porovnání s `NULL`.
- `IS NOT DISTINCT FROM` – hodnoty jsou stejné, nebo jsou obě `NULL`.
- `AS` – změna názvu pole při prohlížení výsledků (`SELECT employee AS 'department1'`).

## Datové typy

- **`char(n)`** – řetězec s pevnou délkou $n$ definovanou uživatelem.
- **`varchar(n)`** – řetězec s proměnnou délkou maximálně $n$ definovanou uživatelem.
- **`int`** – celočíselný integer.
- **`real`** – číslo s pohyblivou řádovou čárkou v dvojkové aritmetice (např. IEEE 754).
- **`float(n)`** – číslo s pohyblivou čárkou s uživatelem definovanou přesností na alespoň $n$ míst.
- **`date`, `time`, `timestamp`** – vestavěné datové typy pro datum a čas.
- **`numeric(p, d)`** – číslo s pevnou čárkou s přesností na $p$ míst, z toho $d$ míst vpravo od čárky.
- Uživatelem definované typy (`CREATE TYPE`).

# Příkazy pro dotazování a aktualizaci dat (DML)

Jedná se o příkazy pro získání dat z databáze a pro jejich úpravy. Výsledkem dotazů jsou relace.

## SELECT

Klauzule `SELECT` odpovídá operaci **projekce** ($\Pi$) v relační algebře. Vypisuje požadované atributy relace uvedené v klauzuli `FROM`, volitelně s omezeními podle klauzule `WHERE`. Na konstanty nebo atributy v klauzuli `SELECT` lze aplikovat aritmetické výrazy s operátory `+ - * /`.

```sql
SELECT a_1, ..., a_n   -- projekce (povinné)
FROM r_1, ..., r_m     -- kartézský součin (povinné)
WHERE p                -- selekce (nepovinné)
```

kde $a_i$ je atribut, $r_i$ relace a $p$ predikát. Všechny tři klauzule mají v relační algebře své zastoupení.

**Příklady:**

```sql
SELECT *                 -- všechny atributy
FROM relation;

SELECT DISTINCT *        -- všechny atributy bez duplicit
FROM relation;

SELECT ALL name          -- atribut jméno, zachová duplicity
FROM instructor;

SELECT name, salary * 100  -- jméno a plat vynásobený 100
FROM instructor;

SELECT name        -- názvy krajin začínající na C nebo s populací > 100 mil.
FROM country
WHERE name LIKE 'C%' OR population > 100000000;

SELECT id, name          -- instruktoři s platem mezi 500 a 600
FROM instructor
WHERE salary BETWEEN 500 AND 600;

SELECT *                 -- kartézský součin relací
FROM instructor, student;
```

## INSERT

Vloží záznam do **právě jedné** tabulky. Hodnoty zadané při `INSERT` musí splňovat všechny podmínky pro sloupce (např. primární klíč, podmínky `CHECK` a `NOT NULL`). Pokud podmínky nejsou splněny nebo nastane syntaktická chyba, záznam se nevloží a databázový stroj pošle chybový kód a hlášku.

```sql
-- vložení nové n-tice do relace instructor
INSERT INTO instructor
VALUES ('Hlavátka', 20000, 'lang');

-- s explicitním výčtem sloupců a více n-ticemi
INSERT INTO instructor (name, salary, dept)
VALUES ('Hlavátka', 20000, 'lang'), ('Karel', 40000, 'arts');

-- vložení výsledku vnořeného dotazu
INSERT INTO table <SQL>;
```

- Vnořený dotaz musí vracet relaci **kompatibilní** s tabulkou (stejné atributy a typy).
- Nesmí obsahovat hodnoty primárních klíčů již přítomných v tabulce (duplicate error).

## UPDATE

Upraví libovolný počet záznamů z **právě jedné** tabulky. Upravované záznamy musí odpovídat definované podmínce, uživatel musí mít dostatečná práva a nové hodnoty nesmí kolidovat s podmínkami (např. primární klíč, `CHECK`, `NOT NULL`).

```sql
-- zvýší plat těm, kteří dostávají méně než 10 tisíc
UPDATE instructor
SET salary = salary * 1.05
WHERE salary < 10000;

-- pomocí vnořeného příkazu (musí vracet jednu hodnotu s jedním atributem)
UPDATE tbl SET attribute = (<SQL>);

-- pomocí podmínky (P je predikát)
UPDATE tbl SET attribute = CASE WHEN <P> THEN <val1> ELSE <val2> END;
```

## DELETE

Odstraní libovolný počet záznamů z **právě jedné** tabulky. Je třeba dávat pozor na vnořené SQL dotazy v predikátu (`WHERE cena < SELECT AVG(cena) FROM auto`) – při mazání se hodnota `AVG` mění.

```sql
-- smazání instruktorů jazykového oddělení
DELETE FROM instructor
WHERE dept = 'lang';
```

## MERGE

Kombinace `INSERT` a `UPDATE` – zařazení záznamu do tabulky, kdy v případě splnění specifikované podmínky je záznam změněn.

```sql
MERGE INTO jmeno_tabulky [USING jmeno_tabulky ON (podmínka)]
WHEN MATCHED THEN UPDATE SET sloupec1 = hodnota1 [, sloupec2 = hodnota2 ...]
WHEN NOT MATCHED THEN INSERT (sloupec1 [, sloupec2 ...]) VALUES (hodnota1 [, hodnota2 ...]);
```

## GROUP BY

Použití `GROUP BY` nabízí možnost volat tzv. **agregační funkce**. Nejběžnější použití je získání počtu záznamů odpovídajících každé jednotlivé hodnotě jiného sloupce, časté je také získání součtu, aritmetického průměru či jiných statistických hodnot z vybíraných záznamů. $\Rightarrow$ Roztřídí záznamy podle nějakého parametru.

```sql
SELECT a FROM tbl GROUP BY b;
-- ✗ 'a' není v GROUP BY ani v agregaci; třídy se dělí podle b a výsledek by mohl obsahovat více hodnot a

SELECT b, COUNT(a) FROM tbl GROUP BY b HAVING COUNT(a) < 3;
-- ✓ v SELECT je jen groupovaný sloupec b a agregace COUNT(a); HAVING filtruje skupiny

SELECT b FROM tbl WHERE a = 'hodnota' GROUP BY b;
-- ✓ WHERE se provede před GROUP BY (atribut 'a' ještě existuje), v SELECT je jen groupovaný sloupec b
```

> Pozor: každý sloupec v `SELECT` listu musí být buď v `GROUP BY`, nebo uvnitř agregační funkce. Proto je `SELECT *` se seskupením ve striktním SQL chyba (`*` zahrnuje i negroupované, neagregované sloupce) – povolené je jen při seskupení podle primárního/unikátního klíče.

## Operace JOIN

- Propojuje více tabulek do jedné relace.
- Typicky používané jako poddotazy v klauzuli `FROM`.
- **Podmínka spojení** (join condition) definuje, které n-tice ve dvou relacích si odpovídají a které atributy jsou ve výsledku spojení.
- **Typy spojení:** inner join, left outer join, right outer join, full outer join.
- **Podmínky spojení:** `NATURAL`, `ON`, `USING`; bez nich kartézský součin.

```sql
-- na atributech se společným názvem
t1 NATURAL [<libovolný> FULL OUTER] JOIN t2

-- neeliminuje duplicitní sloupce, pokud má t2 také 'a'
t1 [<libovolný> INNER JOIN] t2 ON t1.a = t2.b

-- obě relace musí mít atributy a, b
t1 [<libovolný> LEFT OUTER JOIN] t2 USING (a, b)
```

> `USING (a, b)` je syntaktický cukr za `ON t1.a = t2.a AND t1.b = t2.b`; navíc společné sloupce ve výsledku nezdvojuje.

**Příklad:**

```sql
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```

`INNER JOIN` neřeší duplikáty, musíme je nějak eliminovat:

```sql
SELECT a.column_name
FROM table_name a
INNER JOIN table_name b ON a.column_name = b.column_name
WHERE a.primary_key > b.primary_key;
```

Přehled typů spojení (Vennův diagram – zelená = vrácené řádky):

- **INNER JOIN** – průnik obou tabulek.
- **LEFT JOIN** – celá levá tabulka + průnik.
- **RIGHT JOIN** – celá pravá tabulka + průnik.
- **FULL OUTER JOIN** – obě tabulky celé.

![[join-types.png|525]]

## Klauzule HAVING

- Následuje podmínka, která operuje s agregačními funkcemi, provede se **PO** vyhodnocení výrazu (po `WHERE`).
- Při použití s `GROUP BY` (explicitně či implicitně) je nutnost, aby použité atributy mimo argumenty agregačních funkcí byly zahrnuty v `GROUP BY`.

```sql
SELECT COUNT(*) FROM tbl HAVING id < 5;            -- ✗ implicitní GROUP BY (celá tabulka), id není groupované ani agregované
SELECT id FROM tbl GROUP BY id HAVING id < 5;      -- ✓ id je v GROUP BY, HAVING filtruje skupiny
SELECT COUNT(*) FROM tbl WHERE id < 5;             -- ✓ filtr na řádky patří do WHERE (běží před agregací)
```

> **Společné pravidlo:** jakmile se seskupuje (`GROUP BY`, explicitně i implicitně přes agregaci), platí pro `SELECT` i `HAVING` **úplně stejný zákaz** – nesmí obsahovat surové (neagregované) sloupce, které nejsou v `GROUP BY`. Povolené jsou jen agregace nebo groupované sloupce. `HAVING` bez `GROUP BY` bere celou tabulku jako jednu skupinu; filtr na jednotlivé řádky (`id < 5`) proto patří do `WHERE`.

# Agregační funkce

Uvedení agregační funkce znamená **implicitní použití `GROUP BY`** bez specifikovaných argumentů – celá tabulka jako jedna skupina. S použitím `GROUP BY` explicitně seskupíme vybrané řádky podle ekvivalence definované argumenty v `GROUP BY` a spočítáme nad nimi výsledek určité aritmetické nebo statistické funkce.

## COUNT

Vrací počet záznamů, které vyhovují zadané podmínce, respektive seskupení. Proto je v zásadě jedno, který ze sloupců má jako argument (často se používá hvězdičková konvence). Pro vrácení počtu unikátních hodnot určitého sloupce se ke `COUNT()` přidává klíčové slovo `DISTINCT`. Ve tvaru `COUNT(nazev_sloupce)` je vrácen počet záznamů, které nemají v daném sloupci hodnotu `NULL`.

```sql
SELECT COUNT(*) FROM `uzivatele` WHERE `pocet_clanku` > 0;
```

Jako jediná funkce vrací `0` pro `NULL`, ostatní vrací `NULL`.

## AVG / SUM / MIN / MAX

- **`AVG`** – průměr dané hodnoty ve všech záznamech: ``SELECT AVG(`pocet_clanku`) FROM `uzivatele`; ``
- **`SUM`** – součet všech hodnot daného sloupce: ``SELECT SUM(`pocet_clanku`) FROM `uzivatele` WHERE `datum_narozeni` > '1980-1-1'; ``
- **`MIN`** – nejmenší hodnota: ``SELECT MIN(`datum_narozeni`) FROM `uzivatele`; ``
- **`MAX`** – maximum: ``SELECT MAX(`pocet_clanku`) FROM `uzivatele`; ``

# Ostatní

## AS

Vytvoří **alias** (přejmenování) tak, aby se nám s atributy (sloupci) lépe v dotazu pracovalo.

```sql
SELECT `jmeno`, COUNT(*) AS `pocet` FROM `uzivatele` GROUP BY `jmeno`;
```

- Lze vynechávat (`SELECT x.attribute FROM strasne-dlouhy-nazev-tabulky x`).
- Nutnost u některých mezivýsledků (často pro vnořené SQL – pojmenovat výsledek).

## Vnořené SQL

`<relace>` může být výsledek vnořeného SQL dotazu, omezený na jeden atribut. `<op>` je operace z `<, >, >=, <=, =, !=`.

| Konstrukce | Význam |
|---|---|
| `atribut IN / NOT IN (<relace>)` | zda je hodnota atributu v jednoatributové `<relace>` |
| `atribut <op> SOME (<relace>)` | `2 < SOME {1,2,3}` → true (pozor na významy) |
| `atribut <op> ALL (<relace>)` | `2 < ALL {1,2,3}` → false (pozor na významy) |
| `EXISTS / NOT EXISTS (<relace>)` | povoleno i více atributů, neprázdná / prázdná |

Vnořené SQL lze také použít všude tam, kde je atribut či relace. Pokud používám vnořené SQL místo atributu, musí mít výsledek právě jednu hodnotu v jednom sloupci (`SELECT name, (SELECT AVG(vek) FROM table2) AS prumer FROM table1`). Pokud odpovídá relaci, musí mít výsledek přesně takový tvar, aby se dal ve vnějším SQL použít dle situace (existující názvy – atributy pro `JOIN` apod.).

# Triggery (spouštěče)

**Spouštěč** v databázi specifikuje činnosti, které se mají provést nad databázovou tabulkou v případě definované události. Definovanou událostí může být například vložení nebo smazání dat. Často slouží pro složitější kontrolu integrity dat.

Pro aktivaci tohoto mechanismu musíme:

1. Specifikovat podmínky, za jakých je spouštěč prováděn.
2. Specifikovat akce, které se budou dít při jeho spuštění.

Triggery jsou definovány ve většině moderních databázových systémů, mírně se však liší v sémantice svého provedení. Klíčové rozdíly jsou zejména v:

- kdy přesně se trigger spustí,
- jak proběhne (co ho může přerušit),
- jakým způsobem se řeší vzájemné volání triggerů, pokud je vůbec umožněno,
- jak (a jestli vůbec) jsou ošetřeny nekonečné cykly vzájemného volání.

**Základní rozdělení:**

- **DML trigger** – prováděn automaticky v odpovědi na DML událost (`INSERT`, `UPDATE`…).
- **DDL trigger** – spouští se při `CREATE`, `DROP`, `ALTER` operacích.
- **Logon trigger** – spouští se při vytvoření uživatelské session.

```sql
CREATE TRIGGER jmeno_triggeru
ON jmeno_tabulky
FOR akce
AS sql_prikaz_k_provedeni
```

**Příklad** – v tabulce `platy` odstraním záznam pracovníka, pokud jej smažeme v tabulce `lidé`:

```sql
CREATE TRIGGER aktualizuj_platy
ON lidé
FOR DELETE
AS DELETE FROM platy WHERE platy.osoba_id IN (SELECT id FROM deleted)
```

> Smazané řádky nejsou v těle triggeru dostupné přímým odkazem (`lide.id` na nic neukazuje), ale přes speciální pseudo-tabulku `deleted` (v T-SQL; ve standardu / PostgreSQL `OLD`).

Obecnější tvar:

```sql
CREATE TRIGGER jmeno_triggeru [AFTER/BEFORE] UPDATE OF tbl ON sloupec
REFERENCING OLD [ROW/TABLE] AS stara_hodnota
REFERENCING NEW [ROW/TABLE] AS nova_hodnota
FOR EACH [ROW/TABLE]
WHEN <predicate>
BEGIN
  <SQL>
END;
```

# Uložené procedury

Jsou to databázové objekty, které neobsahují data, ale programy, které se nad daty v databázi mají vykonávat. Mají své parametry a lokální proměnné, které nejsou zvenku vidět.

Uložená procedura je uložena v databázi. To znamená, že se k ní lze chovat stejně jako ke každému jinému objektu databáze (index, pohled, trigger apod.) – lze ji založit, upravovat a smazat pomocí příkazů dotazovacího jazyka databáze.

Pro psaní uložených procedur je obvykle používán specifický jazyk konkrétní databáze, který je rozšířením jejího dotazovacího jazyka. V případě Oraclu je to procedurální jazyk **PL/SQL**, u MS SQL Serveru se jedná o **T-SQL**.

Zpravidla obsahují posloupnost příkazů jazyka SQL a příkazy pro řízení běhu, které zpracovávají tabulky z databáze. Pomáhají vykonat složitější operace, než bychom vykonali přímo pomocí SQL.

-  **+ Zisk na výkonu** v porovnání s posloupností standardních SQL příkazů. Při prvním provádění procedury je vytvořen prováděcí plán činnosti, ten je poté uložen do vyrovnávací paměti a následné opakování téže procedury je pak mnohem rychlejší než provádění obdobných příkazů SQL.
- **+ Nepřerušitelnost** provádění procedury – po spuštění je procedura provedena sekvenčně jako celek.
- **+** Umožňuje vytvořit **další vrstvu zabezpečení** databáze, uživatelům pak stačí přidělovat práva pro spuštění procedur.
- **+** Možnost propojení více uložených procedur, jakési dávkové programy.

- **-** Nutnost správy procedur (parametry, vhodnost použití).
- **-** Další jazyk a příkazy.

**Příklad pomocí T-SQL:**

```sql
-- chceme uložit dotaz:
SELECT * FROM Adresy WHERE Adresy.Name = 'Novak'

-- procedura:
USE MojeDatabaze
GO
CREATE PROCEDURE dbo.VyberAdresy
AS
SELECT * FROM Adresy
WHERE Adresy.Name = 'Novak'
GO

-- spuštění procedury:
EXEC dbo.VyberAdresy

-- s parametrem:
CREATE PROCEDURE dbo.VyberAdresy @Jmeno nvarchar(30)
-- (dobrým zvykem je definovat výchozí hodnotu parametru, aby nedocházelo k chybám: @Jmeno nvarchar(30) = NULL)

-- spuštění s parametrem:
EXEC dbo.VyberAdresy @Jmeno = 'Novak'
```

**Příklad u PostgreSQL:**

```sql
-- chceme uložit dotaz:
SELECT * FROM Customers WHERE city = (proměnná)

-- procedura:
CREATE PROCEDURE customer_find_by_city (cityname VARCHAR)
LANGUAGE SQL
AS $$
SELECT * FROM Customers WHERE city = cityname
$$;

-- spuštění procedury:
CALL customer_find_by_city('Brno');
```

# Příkazy pro definici dat (DDL)

Těmito příkazy se vytvářejí struktury databáze – tabulky, indexy, pohledy a další objekty. Vytvořené struktury lze také upravovat, doplňovat a mazat.

## CREATE

Vytvoření objektu v databázi.

```sql
CREATE TABLE nazev_tabulky (nazev_atributu1 typ_atributu1(omezeni), ... další atributy);
```

**Příklad** – vytvoření nové tabulky `instructor`:

```sql
CREATE TABLE instructor (
  id     char(5),
  name   varchar(20),
  salary numeric(8,2)
);
```

## ALTER

Mění existující objekty. V případě změny tabulky se může jednat o přidání, úpravu, odstranění sloupce, změnu datového typu sloupce apod.

```sql
ALTER TABLE instructor ADD city varchar(20);
ALTER TABLE table_name DROP COLUMN column_name;
```

## DROP

Odstraňování relací nebo sloupců.

```sql
DROP INDEX index_name ON table_name;
DROP TABLE table_name;
```

# Integritní omezení

**Integritní omezení** chrání databázi proti náhodnému poškození. Zajišťují, že oprávněné změny v databázi nevedou ke ztrátě konzistence dat.

- **`NOT NULL`** – nemůže ukládat `NULL` hodnoty.
- **`UNIQUE`** – zajistí, aby každý řádek sloupce měl unikátní hodnotu.
- **`PRIMARY KEY`** – kombinace `NOT NULL` a `UNIQUE`.
- **`FOREIGN KEY`** – zajistí, aby hodnota v jedné tabulce odpovídala hodnotě v druhé.
- **`CHECK`** – zajistí, aby hodnota ve sloupci splňovala danou podmínku.
- **`DEFAULT`** – specifikuje výchozí hodnotu pro sloupec.
- **`INDEX`** – indexy se používají k urychlení získání dat z databáze. Uživatel ho nevidí, ale dotaz se díky němu může zpracovat rychleji. (Pozn.: vytvoření indexu způsobí, že aktualizovat tabulku s indexy zabere více času – indexy se musí také aktualizovat – proto je dobré vytvářet indexy pouze na sloupcích, které jsou často čtené.)

```sql
CREATE TABLE person (
  p_id    int NOT NULL PRIMARY KEY,
  op      char(10) UNIQUE NOT NULL,
  name    varchar(255) NOT NULL,
  species varchar(255) DEFAULT 'human',
  j_id    int FOREIGN KEY REFERENCES job_table (j_id),
  CHECK (p_id > 0)
);
```

## Omezení domény

Základní forma omezení integrity.

```sql
CREATE DOMAIN doména NUMERIC(5,2);
-- doména je deklarována jako dekadické číslo s pěti číslicemi, z nichž 2 jsou za desetinnou čárkou
```

## Referenční integrita

Definuje se cizím klíčem pro dvojici tabulek. Vyžaduje, aby pro každý záznam v **podřízené** tabulce, pokud obsahuje data vztahující se k **nadřízené** tabulce, existoval odpovídající záznam v nadřízené tabulce.

# Transakční zpracování a jeho vlastnosti

**Transakce** je posloupnost operací (část programu), která přistupuje a aktualizuje (mění) data. Transakce pracuje s konzistentní databází. Během spuštěné transakce může být databáze v nekonzistentním stavu, ve chvíli, kdy je transakce úspěšně dokončena, databáze musí být konzistentní.

Dva hlavní problémy: různé **výpadky** (chyba hardware, pád systému) a **souběžné spuštění** více transakcí.

## ACID

Pro zajištění integrity dat musí databázový systém zaručovat **ACID**:

- **Atomičnost (Atomicity)** – transakce se provede buď celá, nebo se neprovede vůbec.
- **Konzistence (Consistency)** – před a po provedení transakce zůstává databáze v konzistentním stavu. Explicitní omezení na integritu dat (primární klíče…) i implicitní omezení (z logiky systému, např. při převodu peněz platí před i po, že součet zůstatků účtů je stejný).
- **Izolovanost (Isolation)** – operace prováděné uvnitř transakce jsou viditelné pouze pro tuto transakci (ačkoli může být více transakcí spouštěno současně, každá transakce nesmí vědět o ostatních současně běžících transakcích). Dočasné mezivýsledky transakce musí být skryté pro ostatní transakce, tj. pro každou dvojici transakcí $T_i$ a $T_j$ platí, že z pohledu transakce $T_i$ je buď $T_j$ dokončena před spuštěním $T_i$, nebo je $T_j$ spuštěna až po dokončení $T_i$.
- **Trvalost (Durability)** – změny provedené dokončenou transakcí jsou uloženy v databázi a nemohou být ztraceny.

**Příklad** – transakce převádí 500 Kč z účtu A na účet B:

1. $\text{čti}(A)$
2. $A := A - 500$
3. $\text{zapiš}(A)$
4. $\text{čti}(B)$
5. $B := B + 500$
6. $\text{zapiš}(B)$

- **Požadavek atomičnosti** – pokud transakce skončí chybou po kroku 3 a před krokem 6, systém by měl zajistit, že provedené změny nebudou uloženy do databáze, jinak by byla v nekonzistentním stavu.
- **Požadavek konzistence** – součet zůstatků na účtech A a B je nezměněn provedením transakce.
- **Požadavek izolovanosti** – pokud mezi kroky 3 a 6 je dovoleno jiné transakci číst částečně aktualizovanou databázi, bude mít k dispozici nekonzistentní databázi (součet A+B bude menší, než by měl být). Izolovanosti lze velmi jednoduše dosáhnout použitím sériového spuštění transakcí, tj. jedna po druhé. Avšak současný běh více transakcí má významné výhody.
- **Požadavek trvanlivosti** – pokud byla uživateli již vrácena odpověď o úspěšném provedení transakce, všechny provedené změny jsou stálé a musí přežít i výpadek databáze.

## Úrovně izolace

- **Read uncommitted** – nejnižší úroveň, při které transakce okamžitě vidí všechny změny provedené ostatními transakcemi. Může nastat problém **dirty read** (čtení nepotvrzených a později zrušených dat), **non-repeatable read** (problém neopakovatelného čtení – dva po sobě jdoucí stejné `SELECT` vrací různé výsledky) a výskyt **fantomů** (v DB se objevují věci, co tam před chvílí nebyly).
- **Read committed** – jedna transakce vidí data změněná druhou transakcí okamžitě po jejich potvrzení. Stále může nastat problém neopakovatelného čtení nebo výskytu fantomů.
- **Repeatable read** – je zaručeno, že v průběhu transakce nemůže dojít k problému neopakovatelného čtení. Stále ale může dojít k výskytu fantomů.
- **Serializable** – nejpřísnější úroveň odpovídající situaci, jako by všechny paralelně zpracovávané transakce běžely ve skutečnosti jedna po druhé. Nemůže dojít ani k výskytu fantomů.

Přehled, které jevy jsou na dané úrovni **povoleny**:

| Úroveň izolace | Dirty Read | Non-Repeatable Read | Phantom |
|---|---|---|---|
| Read uncommitted | ano | ano | ano |
| Read committed | ne | ano | ano |
| Repeatable read | ne | ne | ano |
| Snapshot | ne | ne | ne |
| Serializable | ne | ne | ne |

### Fantom

**Fantom** je nově vložený (nebo smazaný) řádek, který se v rámci probíhající transakce objeví, ačkoli logicky měl být zamčen po celou dobu transakce.

**Příklad** nad stavem `{[Pepa, 52, m], [Jaroslav, 46, m], [Eva, 55, ž], [Dáša, 30, ž]}`:

- **T1:** najdi nejstaršího zaměstnance-muže a nejstarší zaměstnankyni-ženu (`SELECT * FROM Zaměstnanci ...` + `INSERT INTO Statistika ...`).
- **T2:** vlož zaměstnance Františka a smaž zaměstnankyni Evu (`INSERT INTO Zaměstnanci ...`, `DELETE FROM Zaměstnanci ...`).

T1 zamkne muže (sdílené zámky `S(Pepa)`, `S(Jaroslav)`) a spočítá $M = \max\{R(\text{Pepa}), R(\text{Jaroslav})\}$. Mezitím T2 provede `Insert(František, 72, m)` (fantom – lze vložit zaměstnance muže, ačkoli by logicky měli být zamčeni **všichni** muži po celou T1), zamkne ženy `X(Eva), X(Dáša)`, `Delete(Eva)` a `COMMIT`. Poté T1 zamkne ženy, spočítá $\check{Z} = \max\{R(\text{Dáša})\}$ a vloží výsledek.

Ačkoli rozvrh splňuje **striktní 2PL**, výsledek `[Pepa, Dáša]` je nekorektní – neodpovídá ani sériovému rozvrhu T1, T2 (vrátil by `[Pepa, Eva]`), ani T2, T1 (vrátil by `[František, Dáša]`).

## Stavy transakce

Transakce může být v jednom z uvedených stavů:

- **Aktivní (Active)** – počáteční stav; transakce zůstává v tomto stavu, dokud běží.
- **Částečně potvrzená (Partially Committed)** – jakmile byla provedena poslední operace transakce.
- **Chybující (Failed)** – po zjištění, že normální běh transakce nemůže pokračovat.
- **Zrušená (Aborted)** – poté, co byla transakce vrácena (rolled back) a databáze vrácena do stavu před spuštěním transakce. Dvě možnosti po zrušení transakce:
	- znovu spustit transakci – pouze pokud nedošlo k logické chybě,
	- zamítnout transakci.
- **Potvrzená (Committed)** – po úspěšném dokončení.

![[stavy-transakce.png|360]]

## Implementace atomičnosti a trvanlivosti

Využívá se schéma **stínové databáze** – v jednu chvíli je aktivní pouze jedna transakce. Pointer ukazuje na konzistentní kopii databáze. Všechny změny se provádí ve stínové kopii. V případě chyby je použita konzistentní kopie a stínová smazána. V opačném případě se stínová stane tou konzistentní a ta, na kterou ukazuje pointer, je smazána. Užitečná pro textové editory, ale nevhodná pro databáze (spuštění transakce vyžaduje vytvořit kopii celé databáze). Proto se u DB používají **logy** nebo **journals**.

## Souběžné zpracování transakcí

Více transakcí může být spuštěno současně. Výhody:

- **+** Zvýšené využití procesoru a disku, které vede k vyšší transakční propustnosti: jedna transakce může používat procesor, zatímco jiná disk.
- **+** Snížená průměrná doba odezvy: krátké transakce nemusí čekat na dokončení dlouhých.

Nevýhody:

- **-** Aby se předešlo problémům s přepisováním dat, je nutné zamykání řádků či tabulek.
- **-** Je nutná režie na řešení a předcházení uváznutí (deadlock).

### Deadlock

Stav, kdy transakce A čeká na prostředky, které drží transakce B, a transakce B čeká na prostředky, které má uvolnit transakce A. Řeší se ukončením jedné z transakcí – nelze čistě vyřešit a je nutné mu předcházet.

### Plány

**Plány** jsou posloupnosti, které určují časové pořadí provádění instrukcí souběžných transakcí.

- Plán pro množinu transakcí musí obsahovat všechny operace prováděné těmito transakcemi.
- Musí zachovávat pořadí instrukcí stejné jako v každé jednotlivé transakci.

![[plany-transakci.png|418]]

### Serializovatelnost

Základní předpoklad: každá jednotlivá transakce zachovává konzistenci databáze (sériový plán tedy též zachovává konzistenci databáze). Plán je **serializovatelný**, když je ekvivalentní sériovému plánu. Ignorujeme všechny instrukce kromě **čtení** a **zápisu** a předpokládáme, že transakce mohou provádět libovolné výpočty na datech v lokálních vyrovnávacích pamětech mezi čteními a zápisy. Naše zjednodušené plány se skládají pouze z operací čtení a zápisu.

### Atomické operace

Atomická operace znamená, že její vykonání je **nedělitelné** – buď proběhne zcela úspěšně, nebo zcela neúspěšně. Atomickými operacemi jsou například „vlož jeden záznam", „zobraz jeden záznam" apod.

Vykonání **neatomické** operace je dělitelné: dojde-li při vykonávání příkazu k chybě, operace, které již byly vykonány, nebudou vráceny zpět. To se týká například operací, které mají vliv na větší množství řádků.

# Základní principy vyhodnocování dotazů

## Základní kroky

1. **Analýza dotazu (parsing) a překlad** – přeložení dotazu do interní reprezentace, která je následně přeložena do relační algebry. Analyzátor ověří správnou syntaxi a existenci relací.
2. **Optimalizace** – nalezení nejlevnějšího plánu pro vykonání dotazu. Výraz může mít více ekvivalentních výrazů: $\sigma_{\text{zůstatek} < 2500}(\Pi_{\text{zůstatek}}(\text{účet})) = \Pi_{\text{zůstatek}}(\sigma_{\text{zůstatek} < 2500}(\text{účet}))$. Mezi všemi možnými výrazy se snažíme najít ten, který má nejlevnější plán pro vyhodnocení. Odhad ceny plánu je založený na statistických informacích v databázovém katalogu.
3. **Vyhodnocení** – **stroj pro vyhodnocení dotazu** (query-execution/evaluation engine) bere na vstupu plán pro vyhodnocení dotazu, spustí plán a vrátí výsledky dotazu.

## Míry nákladů dotazů

Mnoho způsobů, jak měřit a odhadovat náklady (cenu), např. počet diskových přístupů, CPU čas nebo dokonce komunikační režie v distribuovaných nebo paralelních systémech. Cena přístupu na disk má typicky převahu a dá se snadno odhadnout. Tento odhad započítává:

- počet vyhledání (seek) × průměrná cena vyhledání,
- počet přečtených bloků × průměrná cena čtení bloku,
- počet zapsaných bloků × průměrná cena zápisu bloku.
	- Cena zápisu bloku > cena čtení bloku (po zápisu se data ještě kontrolně čtou).

Náklady algoritmů závisí na velikosti vyrovnávacích pamětí v operační paměti, protože **více paměti snižuje náklady na čtení z disku**. Tedy velikost paměti by měla být parametr pro odhad ceny dotazu; často se používá nejhorší odhad. Odhad nákladů algoritmu $A$ se značí $E_A$. Náklady pro zápis na disk nejsou uvažovány.

## Operace výběru

**Sekvenční průchod souborem** – vyhledávací algoritmus, který hledá a vrací záznamy vyhovující podmínce ($A$ = algoritmus).

- $A1$: **lineární vyhledávání** – postupně projde každý blok v souboru a otestuje všechny záznamy. Odhad nákladů (počet čtení bloku z disku) $E_{A1} = b_r$, popř. $E_{A1} = b_r / 2$, pokud je podmínka na atributu, který je vyhledávacím klíčem (po jeho nalezení lze vyhledávání ukončit – průměrně projdeme polovinu).
- $A2$: **binární vyhledávání** – použitelné, pokud výběrová podmínka je operátor rovnosti na atributu, který je klíčem. Předpokládáme, že bloky jsou spojitě za sebou. Odhad ceny (počet bloků přečtených z disku):
$$E_{A2} = \lceil \log_2(b_r) \rceil + \lceil SC(A,r) / f_r \rceil - 1$$
	- $\lceil \log_2(b_r) \rceil$ – náklady na nalezení první n-tice binárním hledáním; tomu se rovná i odhad ceny, pokud je podmínka rovnosti na klíči.
	- $SC(A,r)$ – počet záznamů splňujících podmínku.
	- $\lceil SC(A,r) / f_r \rceil$ – počet bloků, které obsahují tyto záznamy.

# Indexování

**Indexování** se používá pro zrychlení přístupu k požadovaným datům. Na druhou stranu dojde ke zpomalení operací (`INSERT`, `UPDATE`) měnících obsah indexovaných sloupců. Vytvořením indexu databázový systém zarezervuje pro požadovaný index určitou část paměťového prostoru a uloží do něj informace o rozmístění hodnot indexovaných sloupců v tabulce. Pokud později dojde k dotazu týkajícímu se indexovaných sloupců, není tabulka prohledávána podle toho, jak jsou za sebou řádky uloženy, ale pomocí informací uložených v paměťovém prostoru indexu, kde je přistupováno přímo k relevantním řádkům tabulky (něco jako rejstřík v knize).

**Vyhledávací klíč (search key)** – atribut nebo množina atributů používaný pro vyhledávání záznamů v souboru.

**Indexový soubor** se skládá ze záznamů (index entries) ve tvaru `|vyhledávací klíč | ukazatel|`. Indexový soubor je typicky mnohem menší než původní soubor. Máme dva základní typy indexů:

- **Řazené** – klíče jsou uspořádané.
- **Hašovací** – klíče jsou rovnoměrně rozprostřeny po adresovém prostoru hašovací funkce.

**Metriky pro porovnávání indexů:** typy efektivně podporovaných přístupů (dotaz na přesnou shodu, dotaz na rozsah), přístupová doba, doba pro vložení záznamu, doba pro smazání záznamu, prostorová režie.

## Řazené indexy

Indexové záznamy jsou uloženy uspořádané podle vyhledávacího klíče, např. katalog autorů v knihovně.

- **Primární index** – seřazený sekvenční soubor; index, jehož vyhledávací klíč určuje pořadí záznamů v souboru; často nazývaný **shlukující index**. Vyhledávací klíč primárního indexu nemusí být ve všech případech primárním klíčem. Může být řídký i hustý.
- **Sekundární index** – index, jehož vyhledávací klíč určuje jiné pořadí než v seřazeném sekvenčním souboru; nazývaný **neshlukující index**. Může být pouze hustý.
- **Index-sekvenční soubor** – seřazený sekvenční soubor s primárním indexem.

**Hustý indexový soubor** – indexový záznam je uložen pro každou hodnotu vyhledávacího klíče (stejné hodnoty se ale v indexu neopakují).

![[husty-index.png|406]]

**Řídký indexový soubor** – indexové záznamy jsou pouze pro některé hodnoty vyhledávacího klíče. Pro nalezení záznamu s vyhledávacím klíčem $K$ musíme:

1. Nalézt indexový záznam s největším vyhledávacím klíčem menším než $K$.
2. Prohledat sekvenční soubor od tohoto záznamu.

Méně prostoru pro uložení indexu a méně udržujících operací při vkládání a mazání záznamu. Obecně je ale při vyhledávání pomalejší než hustý index. Vhodné řešení je řídký indexový soubor s indexovým záznamem pro každý blok v souboru.

![[ridky-index.png|418]]

## Víceúrovňový index

Pokud se primární index nevejde do operační paměti, mohou být přístupy pomalé (a tím pádem drahé). Pro snížení počtu diskových přístupů k indexovému souboru se primární index považuje za sekvenční soubor na disku a vytvoří se pro něj řídký index.

- **Vnější (outer) index** je řídký index na primárním indexu.
- **Vnitřní (inner) index** je primární index na souboru.

Pokud se i vnější index nevejde do paměti, můžeme vytvořit další úroveň. Indexy na všech úrovních musí být aktualizovány při vkládání nebo mazání.

![[viceurovnovy-index.png|273]]

## B⁺ stromy

Alternativou a zároveň nejpoužívanější indexovou strukturou v databázových systémech jsou **B⁺ stromy**. Jedná se o víceúrovňový index ve tvaru vyváženého $n$-árního stromu. Výhodou je, že se při vkládání/mazání provádí automatická reorganizace pouze s malými, lokálními změnami, nevýhodou je ale režie a zvýšené prostorové nároky.

**B⁺-strom** je strom s jedním kořenem splňující následující podmínky:

- Všechny cesty od kořene k listům mají stejnou délku.
- Každý uzel, který není kořenem nebo listem, má potomků $\lceil n/2 \rceil$ až $n$.
- Listový uzel má $\lceil (n-1)/2 \rceil$ až $n-1$ hodnot (klíčů).
- Zvláštní případy:
	- Pokud kořen stromu není zároveň list, potom má nejméně 2 potomky.
	- Pokud je kořen současně listem (strom má 1 uzel), počet uložených hodnot je mezi 0 a $n-1$.

Vlastnosti každého listu:

- Pro každé $i = 1, 2, \dots, n-1$ ukazatel $P_i$ odkazuje buď na záznam s klíčem $K_i$, nebo na blok ukazatelů na záznamy, kde každý záznam má klíč $K_i$. Pokud index není primární, potom jsou uloženy odkazy na bloky.
- Pokud $L_i, L_j$ jsou listy a $i < j$, potom klíče v $L_i$ jsou menší než klíče v $L_j$.
- $P_n$ ukazuje na další list.

**B⁺-strom** pro relaci *účet* $(n=3)$

![[bp-tree-n3.png|468]]

**B⁺-strom** pro relaci *účet* $(n=5)$

![[bp-tree-n5.png|481]]

# Hašování

## Statické hašování

**Kyblík (bucket)** je základní úložná jednotka obsahující jeden nebo více záznamů (kyblík je obvykle tvořen jedním diskovým blokem). V hašovací souborové organizaci získáme kyblík, kde je hledaný záznam uložen, přímo z jeho vyhledávacího klíče pomocí **hašovací funkce**. Hašovací funkce $h$ je funkce převádějící množinu vyhledávacích klíčů $K$ na množinu adres jednotlivých kyblíků $B$. Hašovací funkce se používá jak při vyhledávání záznamu, tak při vkládání a mazání. Záznamy s rozdílnými klíči mohou být uloženy ve stejném kyblíku, tak celý obsah kyblíku musí být sekvenčně prohledán.

Nevhodné pro **ranged queries** (na rozdíl od řazených nemůže najít dolní hodnotu a lineárně brát, dokud nenarazí na horní; musí projít vše).

### Hašovací funkce

Nejhorší hašovací funkce mapuje všechny vyhledávací klíče do jednoho kyblíku, což vede k vyhledávacímu času závislému na počtu klíčů v souboru. Ideální hašovací funkce je **rovnoměrná**, tj. každý kyblík obsahuje stejné množství klíčů z množiny všech možných hodnot vyhledávacího klíče. Ideální hašovací funkce je náhodná a každý kyblík má přiřazen stejný počet záznamů bez ohledu na aktuální rozložení vyhledávacích klíčů v souboru. Typicky hašovací funkce pracují s interní binární podobou vyhledávacího klíče. Např. pro řetězcový klíč může být binární zápis všech znaků v řetězci sečten a adresa kyblíku je výsledkem operace modulo celkový počet kyblíků.

### Otevřené hašování (open hashing, closed addressing)

Hledaná hodnota vždy leží na adrese vypočítané danou funkcí, hodnota se zde hledá sekvenčně. Může dojít k přetečení kyblíku (nedostatečný počet kyblíků, asymetrické rozložení klíčů), řešení pomocí **přetokových kyblíků** (overflow chaining).

### Uzavřené hašování (closed hashing, open addressing)

Používá se hašovací funkce počítající adresu na základě hodnoty klíče a kroku ve výpočtu. Pokud hodnota neleží na dané adrese, `i++` pro získání jiné. Používají se lineární přírůstky (primární shlukování) / polynomiální (sekundární shlukování) / kombinace dvou hašovacích funkcí (nejlepší „náhodnost"). Při mazání je nutné označit `DELETED`, aby zde prohledávání nezastavilo. Neplýtvá místem, ale může být pomalé, pokud hodně kolizí – v nejhorším případě projdeme všechny adresy. Nutnost reorganizace při dosažení limitu adres.

Hašování může být použito nejen jako souborová organizace, ale i jako indexová struktura. **Hašovací index** organizuje vyhledávací klíče spolu s ukazateli na záznamy v hašovací souborové organizaci. Jsou vždy používány **jako sekundární indexy** (tzn. vždy husté, i když jsou konstruovány nad primárním).

### Problémy statického hašování

Mapování na pevnou množinu kyblíků (plýtvání místa, problém, když se databáze zvětšuje).

## Dynamické hašování

Vhodné pro databáze, které **mění svou velikost**. Umožňuje modifikovat hašovací funkci. Jednou z forem dynamického hašování je **rozšiřitelné hašování**:

- hašovací funkce generuje velká čísla,
- vždy se používá offset (prefix) pro získání adresy kyblíku, délka je $i$ bitů; $0 \le i \le 32$,
- na počátku je $i = 0$,
- hodnota $i$ se zvyšuje nebo snižuje podle velikosti souboru,
- aktuální počet kyblíků je menší než $2^i$, to se také dynamicky mění kvůli slévání a rozdělování kyblíků.

Lokální `i` určují prefix adres, které padnou do dané oblasti (např. $i_1 = 1 \rightarrow$ adresy typu `0*`). Při zaplnění kyblíku se zvýší jeho lokální hloubka a kyblík se rozdělí; pokud lokální hloubka překročí globální $i$, zdvojnásobí se tabulka adres kyblíků (`bucket address table`).

![[dynamicke-hasovani.png|612]]