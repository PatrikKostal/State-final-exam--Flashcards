# 4. Databáze

> **Zadání:** Relační model dat, relační schéma, klíče relačních schémat, relační algebra (projekce, selekce, agregace, přejmenování), spojování relací. Funkční závislosti, normální formy (1NF, 2NF, 3NF, Boyce-Coddova NF), vztahy mezi normálními formami. Dekompozice relačních schémat, normalizace schématu. (PB154)

# Data a databáze

**Data** jsou údaje, které mají určitou vypovídací schopnost. Mohou být určitým způsobem uspořádány (seřazeny, např. podle velikosti, chronologicky atd.) a jsou uživateli k dispozici v různých formách (tabulky, grafy, zvukové signály, grafická forma atd.).

- **Redundance** je opakovaný výskyt stejné informace – zbytečné.
- **Inkonzistence** je porušení nastavených pravidel.
	- Např. 2 záznamy sdílí ID, i když by mělo být unikátní.

**Databáze** je uspořádaná množina dat.

**Databázový model** určuje logickou strukturu dat a jejich ukládání.

- Existuje **relační**, **síťový** a **hierarchický**.

# Relační model

**Relační model** je databázový model založený na predikátové logice. Předpokládá, že všechna data lze reprezentovat jako $n$-ární matematické relace. Databáze využívající relační model jsou **relační databáze**.

**Atribut** je atomická hodnota nějakého datového typu. Hodnoty atributů plní sloupce.

- **Sloupec** má definovaný název, typ a doménu.
- **Doména** je množina povolených hodnot atributu. `null` je v každé doméně.

**Relace** je podmnožinou kartézského součinu $n$ domén $\Rightarrow$ množina $n$-tic.

- Nesmí obsahovat duplicitní $n$-tice.
- Když různé relace obsahují stejné atributy, vznikají **vazby**.

Soubor relací se nazývá **relační schéma**.

## Části databáze / jejich znázornění

| RELACE | TABULKA |
|---|---|
| Schéma relace | Záhlaví tabulky |
| Jméno atributu | Jméno sloupce |
| Atribut | Sloupec |
| $N$-tice relace | Řádek tabulky |

**Příklad relace:**

| učo  | jméno          | katedra | plat  |
| ---- | -------------- | ------- | ----- |
| 1001 | Jana Oblá      | grafika | 25000 |
| 2222 | Petr Rychlý    | prog    | 40000 |
| 2552 | Jiří Novotný   | prog    | 35000 |
| 3535 | Petra Kabelová | sítě    | 30000 |
| 8000 | Jan Nevěřil    | teorie  | 30000 |

- **Atributy:** učo, jméno, katedra, plat.
- **Formálně:** $R = (\text{učo}, \text{jméno}, \text{katedra}, \text{plat})$.

## Klíče

**Superklíč** je množina atributů dostatečně unikátní k nalezení korespondujícího záznamu.

- Nezáleží na redundanci, atributů může být více, než je potřeba.

**Kandidátní klíč** je minimalizovaný superklíč. Žádný atribut nelze odebrat.

**Primární klíč** je námi vybraný kandidátní klíč. Např. rodné číslo.

**Cizí klíč** je kandidátním klíčem z jiné relace. Jeho uložením definujeme vztah mezi relacemi.

# Relační algebra

**Relační algebra** je procedurální dotazovací jazyk s 6 základními operacemi.

- Operace jsou uzavřené nad relacemi $\Rightarrow$ na vstupu berou relaci a vrací relaci.

## Selekce $\sigma$ (sigma)

**Selekce** $\sigma$ vybírá řádky odpovídající zadaným parametrům.

$$\sigma_P(r) = \{\, t \mid t \in r \wedge P(t) \,\}$$

- $P(t)$ představuje podmínky.
- Např. $\sigma_{A=B \,\wedge\, D>5}(r)$ vrátí jen ty řádky, kde se rovná $A$ a $B$ a zároveň $D > 5$.

![[selekce.png|296]]

## Projekce $\Pi$ (Pí)

**Projekce** $\Pi$ vybírá sloupce, dovoluje i aritmetické operace na sloupcích.

$$\Pi_{A_1, A_2, \dots, A_k}(r)$$

- Příklad: „Vypište jména zákazníků a sumu, jakou si ještě mohou půjčit“ $\Rightarrow$ $\Pi_{\text{jméno},\; \text{limit} - \text{stav}\;(\text{úvěr})}$ spočítá nový sloupec z rozdílu dvou.

![[projekce.png|347]]

## Sjednocení $\cup$

**Sjednocení** $\cup$ spojí kompatibilní relace. Musí mít stejnou **aritu** a doménu atributů.

$$r \cup s = \{\, t \mid t \in r \vee t \in s \,\}$$

- **Arita** znamená stejný počet atributů (sloupců).

![[sjednoceni-relacni-algebra.png|258]]

## Rozdíl $-$

**Rozdíl** $-$ odebere z relace průnik s jinou relací. Musí mít stejnou aritu a typy atributů.

$$r - s = \{\, t \mid t \in r \wedge t \notin s \,\}$$

![[rozdil-relacni-algebra.png|239]]

## Kartézský součin $\times$

**Kartézský součin** $\times$ vytvoří relaci všech možných kombinací řádků mezi relacemi.

$$r \times s = \{\, t q \mid t \in r \wedge q \in s \,\}$$

- Problém nastává, když mezi sebou mají relace průnik (stejné atributy) $\Rightarrow$ **nutné přejmenování**.

![[kartezsky-soucin.png|289]]

## Přejmenování $\rho$ (Ró)

**Přejmenování** $\rho$ vrací relaci s atributy pojmenovanými dle našich parametrů.

$$\rho_{\text{nova\_r}(\text{nove\_jmeno}_1, \text{nove\_jmeno}_2, \dots)}(r)$$

- Vhodné je přejmenovávat výsledky agregačních funkcí nebo u kartézského součinu, aby se zamezilo konfliktům.

## Agregační funkce $G$

**Agregační funkce** $G$ – `avg`, `min`, `max`, `sum`, `count`.

- `count` vrací 0 pro `null`, ostatní funkce vrací `null` pro `null`.
- Příklad: ${}_{\text{pobočka}}\, G\, _{\text{sum}\,(\text{stav})}(\text{účet})$ seskupí podle pobočky a sečte stavy účtů.

![[agregace.png|414]]

## Dodatečné funkce pro lepší zacházení

**Set Intersection (průnik)** $\cap$ vrací $n$-tice, které jsou v obou relacích.

![[prunik.png|274]]

**Natural Join $\bowtie$ (přirozené spojení)** spojí tabulky přes jejich společné atributy.

$$r \bowtie s = \Pi_{r.A,r.B,r.C,r.D,s.E}\big(\sigma_{r.B = s.B \,\wedge\, r.D = s.D}(r \times s)\big)$$

- Vychází z kartézského součinu, ze kterého selekcí ponecháme jen řádky se shodnými společnými atributy a projekcí odstraníme duplicitní sloupce.

![[natural-join.png|471]]

**Outer Join (vnější spojení)** rozšiřuje přirozené spojení. Chybějící hodnoty vyplňuje `null`.

- **left outer join** ($r ⟕ s$) – kromě průniku připojí všechny záznamy z $r$.
- **right outer join** ($r ⟖ s$) – kromě průniku připojí všechny záznamy z $s$.
- **full outer join** ($r ⟗ s$) – zahrne záznamy z obou tabulek.

![[outer-join.png|496]]

# Funkční závislosti

**Funkční závislost** je vztah mezi atributy $X \rightarrow Y$ znamenající, že 2 řádky se stejnou hodnotou $X$ nemohou mít různou hodnotu $Y$. (Od slova funkce)

- Určení funkčních závislostí nám slouží k správné dekompozici relací a předcházení redundance.
- $X \rightarrow Y \implies X$ určuje  $Y$ a $Y$ závisí na $X$

![[funkcni-zavislost.png|143]]

**Triviální** funkční závislost: $Y \subseteq X$ (závislost atributu na nadmnožině sebe sama). Platí vždy automaticky.

![[trivialni-f-zavislost.png|144]]

**Úplná (full)** funkční závislost: $Y$ závisí na celém $X$, ale ne na žádné jeho vlastní podmnožině: $\neg\exists \gamma \subset X : \gamma \rightarrow Y$.

![[uplna-f-zavislost.png|146]]

**Částečná** funkční závislost: opak úplné – $\exists \gamma \subset X : \gamma \rightarrow Y$ (stačí část $X$).

**Tranzitivní** funkční závislost: $\exists \gamma : X \rightarrow \gamma \wedge \gamma \not\rightarrow X \wedge \gamma \rightarrow Y \wedge Y \notin (X \cup \gamma)$.

- Např. datum narození funkčně závisí na rodném čísle.

## Armstrongovy axiomy

Uzávěr množiny funkčních závislostí lze nalézt pomocí **Armstrongových axiomů** – pravidel pro odvození funkčních závislostí.

- **Reflexivita** – je-li $Y \subseteq X \subseteq A$, pak $X \rightarrow Y$.
- **Rozšíření** – pokud je $X \rightarrow Y$ a $Z \subseteq A$, pak $XZ \rightarrow YZ$.
- **Tranzitivita** – pokud je $X \rightarrow Y$ a $Y \rightarrow Z$, pak $X \rightarrow Z$.

- **Pseudotranzitivita** – pokud je $X \rightarrow Y$ a $WY \rightarrow Z$, pak $XW \rightarrow Z$.
- **Sjednocení** – pokud je $X \rightarrow Y$ a $X \rightarrow Z$, pak $X \rightarrow YZ$.
- **Dekompozice** – pokud je $X \rightarrow YZ$, pak $X \rightarrow Y$ a $X \rightarrow Z$.
- **Zúžení** – pokud je $X \rightarrow Y$ a $Z \subseteq Y$, pak $X \rightarrow Z$.

> $A$ je množina všech atributů (velká písmena jsou množiny atributů). Sjednocení/dekompozice odpovídají skládání a rozkládání kombinací atributů.

# Normální formy

Normální formy jsou pravidla, která když databáze dodržuje, mají lepší vlastnosti.

## 0NF

**0NF** $\Rightarrow$ schéma relace má alespoň 1 atribut s 1 hodnotou.

## 1NF

**1NF** říká, že všechny domény (tedy i všechny jejich atributy) jsou **atomické**.

- Neatomické hodnoty komplikují ukládání a často znamenají redundanci.
- Stringy považujeme za nedělitelné. Adresa rozdělena na jednotlivé atributy.

![[1nf.png|390]]

## 2NF

**2NF** splňuje 1NF a říká, že každý neklíčový atribut závisí na každém **celém** kandidátním klíči.

- Významně snižuje redundanci.
- Když $AB \rightarrow CD$, pak nesmí být $B \rightarrow C$ (neexistuje **parciální závislost** na kandidátním klíči).
- Může být $AB \rightarrow C$ a $C \rightarrow D$ – tranzitivní závislost je povolena.

![[2nf.png|505]]

Řešení:

![[2nf-reseni.png|452]]

## 3NF

**3NF** splňuje 2NF a říká, že neklíčová data jsou vzájemně nezávislá.

- Když $AB \rightarrow CD$, pak nesmí být $C \rightarrow D$ (neexistuje **tranzitivní závislost**).
- Platí alespoň jedna z následujících vlastností (pro každou závislost $\alpha \rightarrow \beta$):
	- $\alpha \rightarrow \beta$ je triviální (tj. $\beta \subseteq \alpha$),
	- $\alpha$ je superklíč relace $R$,
	- každý atribut $A$ v $\beta - \alpha$ je obsažen v nějakém kandidátním klíči $R$ (pozn.: každý atribut může být v jiném kandidátním klíči).

![[3nf.png|379]]

Řešení:

![[3nf-reseni.png|417]]

## BCNF (Boyce-Coddova)

**BCNF** splňuje 3NF, ale navíc ruší výjimku „$\beta - \alpha$ je v kandidátním klíči". Levá strana každé netriviální závislosti tedy **musí být superklíč** – pro každou $\alpha \rightarrow \beta$ platí:

- $\alpha \rightarrow \beta$ je triviální ($\beta \subseteq \alpha$), nebo
- $\alpha$ je superklíč relace $R$.

Rozdíl proti 3NF se projeví jen u **překrývajících se kandidátních klíčů** – jinak jsou totožné.

**Příklad** – relace $\text{VÝUKA}(\text{student}, \text{předmět}, \text{vyučující})$ se závislostmi:

- $\{\text{student}, \text{předmět}\} \rightarrow \text{vyučující}$,
- $\text{vyučující} \rightarrow \text{předmět}$.

Stav:

- **Ve 3NF je** – $\text{předmět}$ je prvočíselný atribut.
- **V BCNF není** – $\text{vyučující}$ není superklíč.

Dekompozice na $\text{UČÍ}(\text{vyučující}, \text{předmět})$ a $\text{ZAPSÁNO}(\text{student}, \text{vyučující})$ ale **ztratí závislost** $\{\text{student}, \text{předmět}\} \rightarrow \text{vyučující}$ – její atributy nejsou v žádné výsledné relaci pohromadě.

> Proto je BCNF někdy příliš silná a nahrazuje se 3NF.

## Vztahy mezi normálními formami

$$\text{BCNF} \subset \text{3NF} \subset \text{2NF} \subset \text{1NF}$$

# Dekompozice schémat

**Dekompozice** $\Rightarrow$ rozklad relačního schématu na menší schémata.

- Zachovává data (**bezztrátovost**).
- Zachovává funkční závislosti $\Rightarrow$ $(F_1 \cup F_2 \cup \dots \cup F_n)^+ = F^+$.

**Příklad postupu** - funkční závislosti: 

Číslo výrobku $\rightarrow$ Název výrobku
Číslo stroje $\rightarrow$ Název stroje, Příkon stroje, Typ stroje
Typ stroje $\rightarrow$ Příkon stroje
Číslo výrobku, Číslo stroje $\rightarrow$ Výkon stroje
Číslo výrobku, Číslo stroje $\rightarrow$ Cena výrobku):

1. Nejprve dáme všechny atributy do jednoho relačního schématu:
$$\begin{aligned} R = (\;& \text{Číslo výrobku}, \text{Název výrobku}, \text{Cena výrobku}, \text{Číslo stroje}, \\ & \text{Název stroje}, \text{Příkon stroje}, \text{Typ stroje}, \text{Výkon stroje} \;) \end{aligned}$$
2. Klíčem je množina {Číslo výrobku, Číslo stroje}. Protože jsou všechny atributy nedělitelné, je schéma v **1NF**. Není ale **2NF**, protože např. Název stroje není plně závislý na celém klíči, ale pouze na jeho části.
3. Provedeme dekompozici na relační schémata:
	- $R_1 = (\text{Číslo výrobku}, \text{Název výrobku})$
	- $R_2 = (\text{Číslo stroje}, \text{Název stroje}, \text{Příkon stroje}, \text{Typ stroje})$
	- $R_3 = (\text{Číslo výrobku}, \text{Číslo stroje}, \text{Výkon stroje}, \text{Cena výrobku})$
	- $R_1$ a $R_3$ jsou už v **3NF** (neobsahují tranzitivní závislosti na klíč). $R_2$ je pouze **2NF**, protože Příkon stroje je tranzitivně závislý na klíči Číslo stroje (přes Typ stroje).
4. Provedeme dekompozici schématu $R_2$ na schémata:
	- $R_{2a} = (\text{Číslo stroje}, \text{Název stroje}, \text{Typ stroje})$
	- $R_{2b} = (\text{Typ stroje}, \text{Příkon stroje})$
	- Teď jsou schémata $R_1, R_{2a}, R_{2b}, R_3$ v **3NF** a dokonce i v **BCNF**.

# Normalizace

**Normalizace** je dekompozice za účelem ulehčení práce s daty (lepší manipulace, redundance, konzistence). Ale **nezlepšuje výkon**.

- Provádí se právě převodem do normálních forem.
- Relace udržují funkční závislosti.
