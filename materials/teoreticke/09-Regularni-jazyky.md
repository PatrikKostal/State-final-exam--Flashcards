# 9. Regulární jazyky

> **Zadání:** Chomského hierarchie formálních jazyků. Regulární jazyky, jejich reprezentace a převody mezi nimi. Varianty konečných automatů. Nedeterminismus a determinizace automatů. Uzávěrové vlastnosti regulárních jazyků. (IB110)

# Formální jazyk

> **Formální jazyk** je libovolná množina slov nad určitou **abecedou**.

- **Zápis** výčtem nebo podmínkou: $L = \{ aa^n bb^n \mid n > 1 \}$, čili `{tvar | podmínky}`
- Nebo prostým vyjmenováním slov: $L = \{aab, ba\}$
- $L = \{w \mid \#_a(w) = 2\}$ znamená, že každé slovo má přesně 2 áčka

**Abeceda $\Sigma$ (sigma)** je konečná množina **symbolů**.
- Např. $\{a, b, c\}$
- $\Sigma$ je sama o sobě jazykem nad $\Sigma$ obsahujícím všechna jednoznaková slova

**Slovo** je konečná posloupnost prvků dané abecedy.
- Každé slovo je svým vlastním **prefixem** (předpona), **sufixem** (přípona) i **podslovem**
- **Prázdné slovo** je prefixem, sufixem i podslovem každého slova
- **Epsilon $\varepsilon$** značí **prázdné slovo**. Epsilon **nesmí** být součástí abecedy.
- $\text{len}(w)$ → délka slova, $\text{len}(\text{symbol}) = 1$
- **Indexuje se od 1**, $w[i]$ → indexace symbolů

**Slovo je akceptováno**, pokud dovede příslušný automat / gramatiku z **počátečního** do **koncového** stavu.

**Regulární jazyk** je jazyk spadající do **3. typu** Chomského hierarchie.

## Lemma o vkládání (pumping lemma)

> V teorii formálních jazyků je **lemma o vkládání** (pumping lemma) výrok, že každý jazyk z dané třídy jazyků může být „napumpován".

- Každé dostatečně dlouhé slovo v daném jazyce může být rozděleno na části, jejichž zopakováním lze získat opět nějaké slovo z jazyka.
- To znamená, že pokud pro danou třídu jazyků existuje lemma o vkládání, každý jazyk v této třídě, který není konečný, bude obsahovat nekonečně mnoho slov vyprodukovatelných jednoduchým pravidlem daným tímto lemmatem.
- V případě konečných jazyků lze onu „dostatečnou délku slova" nastavit na více, než je délka nejdelšího slova v jazyce.

## Operace nad jazyky

- **Rozdíl** $\Rightarrow$ průnik 1. jazyka s doplňkem 2. jazyka: $L_1 \cap (L_2)'$
- **Sjednocení** $\Rightarrow L_1 \cup L_2$
- **Zřetězení** $\Rightarrow L_1 . L_2$
	- **$i$-tá mocnina** $\Rightarrow L^{i+1} = L . L^i$
	- $L^0 = \{\varepsilon\}$
	- $L^+$ = **pozitivní iterace** jazyka
	- $L^*$ = **iterace** jazyka (Kleeneho hvězda)
	- $\overline{L} = \Sigma^* \setminus L$ = **doplněk** jazyka
- $w^R$ $\Rightarrow$ otočení výrazu → $ww^R$ je tedy **palindrom**

> **Doplněk** jazyka $L$ vzhledem k abecedě $\Sigma$ je jazyk $\Sigma^* \setminus L$, tj. množina všech slov nad abecedou $\Sigma$, která nepatří do jazyka $L$.

# Automaty

**Automat** je zařízení provádějící určité kroky na základě posloupnosti vstupních symbolů. Vizuálně se dá reprezentovat:
- **Tabulkou přechodů**
- **LTS** (Labeled Transition System) $\Rightarrow$ kolečka, šipky a přechody přes 0 a 1
- **Regulárním výrazem**

**Výpočet automatu** je množina stavů, kterých dosáhne při zpracování slova.

**Jazyk automatu** tvoří množina **všech slov akceptovaných automatem $A$** – značíme $L(A)$.
- Může být nekonečný
$$\mathcal{L}(\mathcal{A}) = \{ w \in \Sigma^* \mid s \xrightarrow{w} t \text{ a } t \in F \}$$

Automaty se dělí na **deterministické** a **nedeterministické**.

## DFA (Deterministic Finite Automaton)

DFA je **konečnou reprezentací potenciálně nekonečného objektu**.
- **Konečný** znamená, že disponuje omezenou pamětí $\Rightarrow$ pamatuje si jen současný stav.
- **Deterministický** znamená, že je přechodová funkce **totální** a **jednoznačná** (každá dvojice stav–symbol má právě jeden následující stav):
	- **Totální** zajišťuje, že se automat nikdy nezasekne = každá dvojice (stav, symbol) má definovaný přechod
	- **Jednoznačná (deterministická)** = každá dvojice (stav, symbol) se zobrazí na **právě jeden** stav (ne na množinu stavů jako u NFA). Pozor: nejde o injektivitu – více přechodů může vést do téhož stavu.

DFA zapisujeme jako **uspořádanou pětici** $A = (Q, \Sigma, \delta, s, F)$:
- **$Q$** – konečná neprázdná množina všech možných stavů $q_i$ – **včetně chybového**
- **$\Sigma$** (sigma) – vstupní **abeceda symbolů**, z kterých skládáme stavy
- **$\delta$** (delta) – totální (jednoznačná) přechodová **funkce**: $Q \times \Sigma \to Q$
- **$s$** – počáteční stav
- **$F$** – množina koncových stavů

> **Výpočet automatu** $\mathcal{A}$ nad slovem $w \in \Sigma^*$ inicializovaný ve stavu $q$ je posloupnost stavů $q_0, q_1, \dots, q_{\text{len}(w)}$ taková, že $q_0 = q$ a pro každé $1 \leq i \leq \text{len}(w)$ platí $\delta(q_{i-1}, w[i]) = q_i$. Pokud navíc $q = s$, nazveme tuto posloupnost jednoduše **výpočtem** automatu nad slovem $w$.

**Notace pro výpočet:**
- $\delta(s, a) = t$ neboli „vstupní symbol $a$ převádí stav z $s$ na $t$" značíme $s \xrightarrow{a} t$
- Celá posloupnost symbolů a mezilehlých stavů: $q_0 \xrightarrow{w[1]} q_1 \xrightarrow{w[2]} q_2 \cdots \xrightarrow{w[\text{len}(w)]} q_{\text{len}(w)}$
- Pokud mě nezajímají mezilehlé stavy, stačí jen $s \xrightarrow{w} t$

## Produktový automat

> **Produktový automat** $\Rightarrow$ synchronní paralelní spojení dvou automatů.

- Každý stav je uspořádanou dvojicí stavů automatů $A$ a $B$
- **Automaty musí sdílet abecedu!**
- Celková množina stavů $\Rightarrow$ **kartézský součin** $Q_1 \times Q_2$

**Průnik DFA** $\Rightarrow$ produktový automat, kde $F = F_1 \times F_2$
- Ideou je, že pokud vstup skončí v závěrečném stavu **obou** automatů $\Rightarrow$ máme průnik

**Sjednocení DFA** $\Rightarrow$ produktový automat, kde $F = (F_1 \times Q_2) \cup (Q_1 \times F_2)$
- Ideou je, že vstup skončí v závěrečném stavu **některého** z automatů $\Rightarrow$ máme sjednocení

**Jazyk** přijímaný automatem $M$: $L(M) = \{ w \in \Sigma^* \mid \hat{\delta}(q_0, w) \cap F \neq \emptyset \}$

![[produktovy-automat.png|383]]

Sestrojení produktového automatu slouží také k dokázání **uzavřenosti regulárních operací**.

> **Věta:** Třída regulárních jazyků je uzavřená na sjednocení, průnik a rozdíl.

**Důkaz:** Nechť $L_1$ a $L_2$ jsou regulární jazyky rozpoznávané DFA $\mathcal{M}_1$ a $\mathcal{M}_2$ s totálními přechodovými funkcemi. Bez újmy na obecnosti můžeme předpokládat, že jsou nad stejnou abecedou $\Sigma$. Pak jazyky $L_1 \cup L_2$, $L_1 \cap L_2$ a $L_1 - L_2$ jsou rozpoznávané po řadě automaty $\mathcal{M}_1 \Cup \mathcal{M}_2$, $\mathcal{M}_1 \Cap \mathcal{M}_2$ a $\mathcal{M}_1 \ominus \mathcal{M}_2$ (viz definice 2.9 a poznámka 2.11), jsou tedy regulární. $\square$

> **Věta:** Třída regulárních jazyků je uzavřená na komplement.

**Důkaz:** Plyne z předchozí věty, neboť $\text{co-}L = \Sigma^* - L$. Konstruktivně: nechť $L$ je rozpoznáván DFA $\mathcal{M} = (Q, \Sigma, \delta, q_0, F)$ s totální přechodovou funkcí. Pak $\text{co-}L$ je rozpoznáván automatem $\overline{M} = (Q, \Sigma, \delta, q_0, Q - F)$ (prohození koncových a nekoncových stavů).

> **Věta:** Třída regulárních jazyků je uzavřená na zřetězení.

**Důkaz:** Nechť $L_1, L_2$ jsou rozpoznávané NFA $\mathcal{M}_1, \mathcal{M}_2$. Pak $L_1 . L_2$ je rozpoznáván automatem, který vznikne „napojením" automatů $\mathcal{M}_1$ a $\mathcal{M}_2$ pomocí $\varepsilon$-hran, které vedou z koncových stavů $\mathcal{M}_1$ do počátečního stavu $\mathcal{M}_2$.

**Příklad nezregulárního jazyka:** $L = \{w \in \{a,b\}^* \mid \#_a(w) = \#_b(w)\}$ není regulární. Kdyby byl, pak by díky uzavřenosti na průnik musel být regulární i $L \cap a^*b^* = \{a^i b^i \mid i \geq 0\}$, což ale není.

**Doplněk** získáme prohozením koncových a nekoncových stavů, ovšem automat musí mít **totální přechodovou funkci** (= být schopen vypořádat se se všemi možnými vstupy).

## NFA – zobecnění DFA

**NFA** (Nedeterministický konečný automat) je opět uspořádaná pětice $(Q, \Sigma, \delta, s, F)$ – stejně jako DFA.
- $\delta$ je **nedeterministická** přechodová funkce → $Q \times \Sigma \to 2^Q$ (potenční množina)

Umožňuje jednoduše vytvořit automat akceptující 2 zřetězené jazyky:
- 2 DFA se propojí a vznikne **nedeterministický automat**
- Z původních DFA se stávají jednotlivé větve automatu, které se mohou vykonávat současně
- Slovo je **platné**, pokud dovede **alespoň jednu větev** do akceptujícího stavu
- Přechodová funkce už **není totální** $\Rightarrow$ pokud stav není definovaný, větev se zasekne

**$\varepsilon$-NFA** je NFA s povolenými **epsilon-kroky**:
- Epsilon krok **nevyžaduje čtení znaku** pro přechod (je to tedy „syntaktický cukr")
- Usnadňuje konstrukci NFA z více DFA $\Rightarrow$ vytvořím prázdný vstupní stav a z něj vedu epsilon přechody do jednotlivých DFA větví
- Epsilon-nedeterministická přechodová funkce: $Q \times (\Sigma \cup \{\varepsilon\}) \to 2^Q$
- $D_\varepsilon$ – **epsilon okolí** = kam se mohu dostat jen přes epsilon kroky

**Síla NFA a DFA je stejná:**
- Každý NFA lze zapsat jako DFA
- NFA tedy stejně jako DFA akceptuje pouze **regulární jazyky**
- Abychom převedli NFA na DFA, musíme provést **determinizaci**

# Determinizace automatů

> **Determinizace** automatů znamená zbavení se nedeterminismu a případných epsilon-kroků.

## Odstranění epsilon-kroků

- **Next 1** $= \{t \in Q \mid q \xrightarrow{\varepsilon} t\}$ $\Rightarrow$ stavy, kam dojdu čistě po epsilonech
- **Next 2** $= r \in \text{Next1}$, platí $\delta(r, a) = t$ $\Rightarrow$ stavy, kam z Next1 dojdu bez epsilonů
- **Next 3** $= \{t \in Q \mid \exists p \in \text{Next2}: p \xrightarrow{\varepsilon} t\}$ $\Rightarrow$ stavy, kam dojdu z Next2 čistě po epsilonech
- Platí $\text{Next2} \subseteq \text{Next3}$
- Pokud se nemám kam posunout – počáteční stav je koncový
- **Nefunguje, pokud původní automat akceptuje prázdné slovo:**
	- **Řešení** $\Rightarrow$ přidám na jeho konec nový počáteční stav z koncového – vykopíruji ho mimo automat a s ním přechody z něj
	- Existuje výpočet z $s$ do $e$ právě tehdy, když existuje v původním automatu

![[odstraneni-epsilon-kroku.png|572]]
## Podmnožinová konstrukce (determinizace)

Algoritmus: **podmnožinová konstrukce**

- Pro zjištění, zda dané slovo automat akceptuje, vytvářím strom
- DFA si bude ve svých stavech pamatovat, v jakých všech možných bodech **by se mohl** nacházet původní NFA
- Stavy DFA tedy budou odpovídat **množinám stavů NFA**
- Pomocně se stavy DFA značí jako seznam pomocí `[]` závorek
- Každá množina stavů se stane svým vlastním stavem (např. $p \xrightarrow{0} qs$, kde $qs$ je nový stav)
- Přechody ve sloučeném stavu jsou **sjednocením** přechodů původních stavů
- Když je jeden z množiny stavů koncový $\Rightarrow$ celá množina stavů je koncová

![[determinizace.png|584]]
# Minimalizace

> Každý automat lze minimalizovat **slučováním stavů**.

> **Rozlišitelnost:** Dva stavy $q, r$ automatu $\mathcal{A}$ jsou **rozlišitelné slovem $w$**, pokud pro stavy $q', r'$ takové, že $q \xrightarrow{w} q'$ a $r \xrightarrow{w} r'$, platí, že právě jeden ze stavů $q', r'$ je koncový. Dva stavy jsou **rozlišitelné**, pokud jsou rozlišitelné nějakým slovems. Dva stavy jsou **ekvivalentní**, pokud nejsou rozlišitelné.

**Minimální automat** pro jazyk $L$ je ten, ve kterém:
- $L = L(A)$
- Každý stav je **rozlišitelný** – nulová redundance
- Každý stav je **dosažitelný**
- Pokud je $A$ minimální automat pro jazyk $L(A)$, pak každý další ekvivalentní DFA má $\geq$ stavů.

**Sloučení ekvivalentních stavů:**
- Pokud má automat $A$ 2 ekvivalentní stavy, pak je mohu sjednotit, včetně všech šipek.
- Pak $L(A) = L(A')$.

**Žádné z nekonečně mnoha slov redundantní stavy nerozliší:**
- Proto nehledáme stavy ekvivalentní, ale **rozlišitelné**
- Stavy jsou rozlišitelné, pokud je dokážu rozlišit slovem délky $i \leq$ počet stavů
- Pro každý regulární jazyk existuje **jedinečný minimální DFA**

## Algoritmus minimalizace

1. Nejprve odstraním **nedosažitelné stavy**.
2. Iteruji a vytvářím **třídy rozkladu** I, II, III…
3. Poté sjednotím **jednokrokově ekvivalentní stavy** – stavy ve stejné třídě se stejnými přechody.

Postup ve zkratce:
- Rozdělím stavy do 2 skupin: **koncové stavy** a **zbytek**.
- Substituji celé přechody třídami (např. $(\text{II}, \text{I}) \to \text{I}$, $(\text{I}, \text{I}) \to \text{II}$, …).
- Opakuji, dokud se rozklad nezačne 2 iterace po sobě opakovat (stavy ve stejné skupině se stejnými přechody) – ty pak sloučím.

![[minimalizace.png|528]]
## Kanonické pojmenování

> Cílem je **zafixovat abecedu** podle průchodu automatem.

- Čísluji stavy v pořadí, v jakém na ně narazím (postupně přes symboly abecedy, čísla doplňuji do šířky)
- Pro **každý regulární jazyk** $L$ existuje **jedinečný minimální DFA s kanonickým pojmenováním stavů**.

![[kanonizace.png|399]]
## Převod do kanonického tvaru (kanonizace)

Celá posloupnost převodů:
$$\begin{aligned}
\varepsilon\text{-NFA} &\xrightarrow{\text{odstranění } \varepsilon} \text{NFA} \xrightarrow{\text{determinizace}} \text{DFA} \\
&\xrightarrow{\text{minimalizace}} \text{minimální DFA} \xrightarrow{\text{kanonické přejmenování}} \text{kanonický DFA}
\end{aligned}$$

**Test ekvivalence dvou automatů:**
- Převedu oba automaty $A_1, A_2$ do kanonického tvaru ($A_1', A_2'$)
- Pak $L(A_1) = L(A_2)$ právě tehdy, když $A_1'$ a $A_2'$ jsou **zcela stejné automaty**

**Test na neprázdnost jazyka automatu:**
- Testování jednoduchým automatem akceptujícím prázdný jazyk
- Testování vhodným **grafovým prohledáváním**, zda je z iniciálního stavu dosažitelný nějaký koncový stav

# Gramatika

> **Gramatika** je množina pravidel, která nám umožňuje konečně popisovat potenciálně nekonečný formální jazyk.

- Např. jazyk všech slov z ASCII znaků, které odpovídají syntakticky správným C programům.
- Gramatika má **větší vyjadřovací sílu** než konečné automaty $\Rightarrow$ je vhodná pro **popis syntaxe programovacích jazyků**.
- Jazyk C nemůžeme popsat pomocí DFA.

Gramatika je **uspořádaná čtveřice** $(NTerm, \Sigma, P, S)$:
- **$NTerm$** – neprázdná konečná množina **neterminálů**
- **$\Sigma$** – konečná množina **terminálů**
- **$P$** – konečná množina **přepisovacích pravidel**
- **$S$** – počáteční neterminál

- **Neterminál** je symbol, který lze dále přepisovat pomocí pravidel
- **Terminál** už přepisovat nejde
- **Pravidlo** $(\alpha, \beta)$ typicky zapisujeme $\alpha \to \beta$ (gramatika je vlastně **přepisovací systém**)
- Pokud má více pravidel stejnou levou stranu: $\alpha \to \beta_1 \mid \beta_2 \mid \dots$
- **Odvodit slovo** $\Rightarrow$ zkonstruovat ho použitím přepisovacích pravidel

**Pozor – gramatika generující prázdný jazyk:** $\mathcal{G} = (\{S\}, \{a,b\}, P, S)$ s jediným pravidlem $S \to Sa$ generuje prázdný jazyk, protože **generování nikdy neskončí** (chybí pravidlo přepisující $S$ na terminál).

## Chomského hierarchie

- Hierarchie tříd formálních gramatik generujících formální jazyky.
- Pojem pochází z lingvistiky, 1956 Noam Chomsky.
- **4 typy gramatik** $\Rightarrow$ jsou do sebe **vnořené** = každý následující obsahuje všechny předešlé (typ 3 $\subset$ typ 2 $\subset$ typ 1 $\subset$ typ 0).

![[chomskeho-hierarchie.png|597]]

**Typ 0 – frázové**
- Ničím neomezený tvar pravidel, stačí neterminál na levé straně.
- Výsledné jazyky mohou být akceptovatelné **Turingovým strojem**.

**Typ 1 – kontextové**
- Tvar pravidel: $\alpha A \beta \to \alpha \gamma \beta$
	- $A$ je přesně 1 neterminál
	- $\alpha, \beta, \gamma$ jsou řetězce terminálů a neterminálů
	- $\alpha, \beta$ mohou být prázdné, $\gamma$ je neprázdné
- Pro každé pravidlo platí $|\text{levá strana}| \leq |\text{pravá strana}|$
- Kontextem můžu **podmínit** vykonatelnost pravidla
- Pravidlo $S \to \varepsilon$ je povoleno, pokud se $S$ nevyskytuje na pravé straně žádného pravidla

**Typ 2 – bezkontextové**
- Tvar pravidel: $A \to \gamma$
	- $A$ je přesně 1 neterminál
	- $\gamma$ je neprázdný řetězec neterminálů a terminálů
- Počítá se sem většina programovacích jazyků
- **Parser generátory** $\Rightarrow$ algoritmy schopné načíst gramatiku a zjistit, zda je vložené slovo korektní a co znamená / co kód dělá apod.

**Typ 3 – regulární**
- **Levá strana** $\Rightarrow$ přesně 1 neterminál
- **Pravá strana** $\Rightarrow$ terminál nebo terminál + neterminál
- Pravidlo $S \to \varepsilon$ je povoleno, pokud se $S$ nevyskytuje na pravé straně žádného pravidla
- **Pravolineární** gramatiky mají pravou stranu ve tvaru $aB$.
- **Levolineární** gramatiky mají pravou stranu ve tvaru $Ba$.
	- I levolineární se nazývá regulární, ale nesmíme tyto 2 typy kombinovat.
- Generuje **regulární jazyk**.

| Jazyky | Gramatiky (typ) | Automaty |
|--------|-----------------|----------|
| rekurzivně spočetné | frázové (typ 0) | Turingovy stroje |
| rekurzivní | – | úplné Turingovy stroje |
| kontextové | kontextové (typ 1) | lineárně ohraničené TM |
| bezkontextové | bezkontextové (typ 2) | zásobníkové automaty |
| deterministické CFL | – | deterministické PDA |
| regulární | regulární (typ 3) | konečné automaty |

# Regulární jazyky

> Jazyk je **regulární**, pokud ho akceptuje nějaké DFA, NFA, nebo je generován regulární gramatikou.

- DFA **nedokáže akceptovat nekonečné vstupy** → má omezenou paměť.

**Regulární jazyky jsou uzavřeny na množinové operace** (použitím vznikne opět regulární jazyk):
- Uzávěr na **sjednocení, průnik, rozdíl, zřetězení, iteraci, reverzi a doplněk**

**Díky uzávěrům lze:**
- Vyjadřovat složitější jazyky pomocí jednodušších
- Zjednodušit si důkazy

Na základě uzavřenosti množinových operací můžeme kombinovat 2 DFA $\Rightarrow$ **produktová konstrukce** (synchronní paralelní spojení; automaty musí sdílet abecedu).

# Regulární výrazy

> **Regulární výraz** je matematický koncept určený pro **popis regulárních jazyků**.

- **Kleeneho věta:** Regulární výraz má stejnou vyjadřovací sílu jako automat.
- Jsou praktické $\Rightarrow$ RE mají bohatší syntaxi umožňující pohodlnější práci.
- **Využití:** grep, egrep, fgrep
- **Konstruktivní budování** jazyka $\Rightarrow$ pomocí regulárních operací. Gramatiky se zabývají spíše slovy, regulární výrazy zase celkovým popisem.

**Nejjednodušší regulární jazyky** nad abecedou $\Sigma$:
- $\emptyset$, $\{\varepsilon\}$
- $\{a\}$, $\{b\}$ → singleton jazyky

**Syntax:**
- `Pe(t | p)a` popisuje řetězce „Peta" a „Pepa".
- `Ba*f` popisuje řetězce „Bf", „Baf", „Baaf", „Baaaf" atd.
- `aa . bb` $\Rightarrow$ `aabb`

**Regulární operace** (nenarušují regularitu jazyka!):
- **Sjednocení** $\Rightarrow L_1 \cup L_2$
- **Zřetězení** $\Rightarrow L_1 . L_2$
- **$L^*$ – Kleeneho hvězda** – unární operátor
	- Obsahuje nekonečná zřetězení sebe sama, včetně nultého $\{\varepsilon\}$
- **$L^+$ – pozitivní iterace** jazyka $L$
	- Obecně neplatí, že $L^+ = L^* - \{\varepsilon\}$. Pro množinu slov nad abecedou platí $\{a\}^+ = \{a\}^* - \{\varepsilon\}$ pouze v případě, že $L$ neobsahuje $\varepsilon$.
	- $L^+$ obsahuje $\varepsilon$, pouze pokud $\varepsilon$ náleží $L$
- $L^n$ = $n$-krát zřetězený jazyk $L$

**Regulární výraz skládáme z:**
- Závorek, regulárních operací, $\varepsilon$, $\emptyset$
- **Každý znak je sám o sobě regex**
- $\text{RegEx}(\Sigma)$ je **dobře utvořený** právě tehdy, když je generovaný bezkontextovou gramatikou, kde:
	- $NTerm = \{S\}$
	- $\Gamma = \Sigma \cup \{(, ), *, +, ., \varepsilon, \emptyset\}$
	- $P$: $S \to (S + S) \mid (S.S) \mid S* \mid \varepsilon \mid \emptyset$ a pro každé $a \in \Sigma$ pravidlo $S \to a$

> **Jazyk reprezentovaný výrazem** $E \in RegExp(\Sigma)$, značíme $\mathcal{L}(E)$, je definován rekurzivně:
> - Pro libovolné $a \in \Sigma$ klademe $\mathcal{L}(a) = \{a\}$
> - $\mathcal{L}(\varepsilon) = \{\varepsilon\}$
> - $\mathcal{L}(\emptyset) = \emptyset$
> - Pokud $E = (F + G)$, pak $\mathcal{L}(E) = \mathcal{L}(F) \cup \mathcal{L}(G)$
> - Pokud $E = (F.G)$, pak $\mathcal{L}(E) = \mathcal{L}(F) \cdot \mathcal{L}(G)$

# Převody

## Převod regulární gramatiky na NFA

Mějme gramatiku $\mathcal{G} = (NTerm, \Sigma, P, S)$. Sestrojíme NFA $\mathcal{A}_G = (Q, \Sigma, \delta, s, F)$ takový, že:
- $Q = NTerm \cup \{fin\}$, kde $fin$ je nově přidaný stav
- $s = S$
- $F = \{fin\}$, pokud $S \to \varepsilon \notin P$; jinak $F = \{fin, S\}$, pokud $S \to \varepsilon \in P$
- Přechodová funkce $\delta$ pro každé $A \in NTerm$ a $a \in \Sigma$:
	- pro každé pravidlo tvaru $A \to aB \in P$ přidáme $B$ do množiny $\delta(A, a)$
	- existuje-li v $P$ pravidlo $A \to a$, přidáme do $\delta(A, a)$ stav $fin$
	- nepřidáváme nic, co nevynucují výše uvedená pravidla

## Převod NFA na regulární gramatiku

De facto obrátíme předchozí konstrukci. Mějme NFA $\mathcal{A} = (Q, \Sigma, \delta, s, F)$. Sestrojíme regulární gramatiku $\mathcal{G}_A = (NTerm, \Sigma, P, S)$.

**Pokud počáteční stav $s$ není zároveň koncovým:**
1. Položíme $NTerm = Q$.
2. Množinu pravidel $P$ zkonstruujeme tak, že:
	- pro každý stav $q$, každý znak $a$ a každý **nekoncový** stav $t \in \delta(q, a)$ přidáme pravidlo $q \to at$
	- pro každý stav $q$, každý znak $a$ a každý **koncový** stav $t \in \delta(q, a)$ přidáme pravidla $q \to at$ a $q \to a$
3. Položíme $S = s$.

**Pokud počáteční stav $s$ je akceptující**, postupujeme dle bodů 1 a 2 výše, ale konstrukce se liší v bodě 3: na konci přidáme nový neterminál $S$, prohlásíme ho za počáteční. Pro všechna pravidla tvaru $s \to \beta$ přidáme pravidlo $S \to \beta$ a nakonec přidáme pravidlo $S \to \varepsilon$.

## Převod DFA na gramatiku

Příklad: automat rozpoznávající binární zápisy čísel dělitelných 5, $L = \{w \mid w \in \{0,1\}^* \wedge w \text{ je binární zápis čísla dělitelného 5}\}$:
$$A \to 1B \mid 0A \mid \varepsilon \qquad B \to 0C \mid 1D \qquad C \to 0E \mid 1A \qquad D \to 0B \mid 1C \qquad E \to 0D \mid 1E$$
![[dfa-na-gramatiku.png|299]]
Příklady derivací:
- $A \Rightarrow 0A \Rightarrow 0$ (číslo 0)
- $A \Rightarrow 1B \Rightarrow 10C \Rightarrow 101A \Rightarrow 101$ (číslo 5)
- $A \Rightarrow 1B \Rightarrow 10C \Rightarrow 101A \Rightarrow 1010A \Rightarrow 1010$ (číslo 10)
- $A \Rightarrow 1B \Rightarrow 11D \Rightarrow 111C \Rightarrow 1111A \Rightarrow 1111$ (číslo 15)

## Převod automatu na regulární výraz

- Přidáme nový **počáteční stav** (`start`) a nový **koncový stav** (`fin`). Propojíme je s původním automatem pomocí **epsilon přechodů**.

![[epsilony.png|237]]

- Postupně **odstraňujeme stavy** a šipky nahrazujeme regulárními výrazy tak, aby byl automat opět **ekvivalentní**.
- Při odstranění stavu nahradím podmínky přechodů regulárními výrazy.
- K výslednému regulárnímu výrazu musíme případně **přidat epsilony**.

Pracujeme přitom se **zobecněným NFA (GNFA)**, kde jsou hrany označené celými regulárními výrazy (ne jen symboly). Dvě základní **eliminační pravidla**:
- **Odstranění mezilehlého stavu** se smyčkou $F$: cestu $E \to F^\circlearrowleft \to G$ nahradíme jedinou hranou $(E.F^*.G)$.
- **Sloučení paralelních hran** $E_1, \dots, E_k$ mezi dvěma stavy do jediné hrany $(E_1 + E_2 + \dots + E_k)$.

![[eliminace-stavu.png|455]]

## Doplněk regulárního výrazu

- Postup: regulární výraz → NFA → DFA → prohození koncových a nekoncových stavů → zpět na regulární výraz.
- Příklad: navrhnout regulární výraz, jehož jazyk je doplněk jazyka výrazu $((a+b).b) + ((a.b.a)^*.a)$ nad abecedou $\{a, b\}$.

![[regex-na-nfa.png|248]]
![[nfa-na-dfa.png|357]]
![[dfa-prohodime.png|368]]
![[vetve-sjednoceni.png|384]]
# Otázky

**1.** Co je to pumping lemma (lemma o vkládání)?

> **Odpověď:** Lemma o vkládání je výrok, že každé dostatečně dlouhé slovo z dané třídy jazyků lze rozdělit na části, jejichž zopakováním („napumpováním") získáme opět slovo z jazyka. Používá se hlavně k důkazu, že nějaký jazyk **není** regulární (kontrapozicí – pokud slovo nelze takto napumpovat, jazyk do třídy nepatří).

# Příklady

**1.** Determinizuj následující $\varepsilon$-NFA, poté minimalizuj a kanonizuj.

![[determinizace-priklad-zadani.png|396]]

> **Odpověď:** Postup: nejprve odstraním epsilon-kroky (počáteční stav reprezentuje epsilon okolí $\{s_1, s_2, s_3\}$), poté podmnožinovou konstrukcí vytvořím DFA, sloučím ekvivalentní stavy a nakonec stavy přečísluji v pořadí průchodu (kanonizace).

**2.** Převeď následující DFA na gramatiku a regulární výraz (stav 4 je koncový).

![[determinizace-priklad-2.png|240]]

> **Odpověď:** Regulární výraz: $(0 \mid 1) . 0^* . 1$. Slovo musí začít libovolným symbolem (0 nebo 1 – přechod ze stavu 1), pak libovolně mnoho nul (smyčka na stavu 3) a skončit jedničkou (přechod do koncového stavu 4).

**3.** Najdi doplněk k regulárnímu výrazu.

> **Odpověď:** Regulární výraz převedu na NFA, ten determinizuji na DFA (s totální přechodovou funkcí včetně chybového stavu), prohodím koncové a nekoncové stavy a výsledný automat převedu zpět na regulární výraz.

# Otázky z ISu

**1.** V Chomského hierarchii jsou definovány jednotlivé třídy jazyků tak, že
- každý jazyk je zařazen v právě jedné třídě
- ✅ každá třída jazyků obsahuje kompletně všechny jazyky z méně expresivních tříd
- každá třída jazyků obsahuje kompletně všechny jazyky z více expresivních tříd

**2.** V Chomského hierarchii je třída, která odpovídá
- všem regulárním jazykům s nekonečným počtem slov
- ✅ všem kontextovým jazykům nad konečnou abecedou
- všem jazykům nad konečnou abecedou

**3.** Libovolný regulární jazyk nad konečnou abecedou není možné zadat
- konečnou regulární gramatikou
- konečným automatem
- ✅ konečným výčtem slov

**4.** Pravidla regulární gramatiky mají na levé straně vždy jeden neterminál. Na pravé straně musí mít (s výjimkou epsilon pravidla pro kořen gramatiky)
- právě dva neterminály
- právě jeden terminál a žádný až jeden neterminál, přičemž na jejich pořadí nezáleží
- ✅ právě jeden terminál a žádný až jeden neterminál, přičemž terminál a neterminál jsou vždy v tomtéž pořadí

**5.** Syntax regulárních výrazů musí definovat značku, jejíž sémantický význam odpovídá
- nekonečné iteraci jazyků
- jazyku, který obsahuje právě všechny prvky abecedy
- ✅ jednoprvkovému jazyku, který obsahuje prázdné slovo

**6.** Které z tvrzení o konečných automatech neplatí
- deterministické konečné automaty mají stejnou vyjadřovací sílu jako nedeterministické konečné automaty
- konečné automaty s epsilon-kroky popisují třídu regulárních jazyků i když je omezím na automaty s jedním koncovým stavem
- ✅ deterministické konečné automaty popisují třídu regulárních jazyků i když je omezím na automaty s jedním koncovým stavem

**7.** Minimální jazykově ekvivalentní konečný automat lze z libovolného deterministického konečného automatu zkonstruovat
- ✅ v polynomiálním čase
- v exponenciálním čase
- nelze zkonstruovat (neexistuje algoritmus).

**8.** Determinizace libovolného nedeterministického konečného automatu musí vyústit v konečný automat, který
- má nejvýše n+1 stavů, kde n je počet stavů původního automatu.
- má vždy nejvíce dvojnásobný počet stavů původního automatu.
- má vždy nejvýše kvadratický počet stavů původního automatu.
- ✅ má vždy nejvýše exponenciální počet stavů původního automatu.

**9.** Uzavřenost třídy jazyků na danou operaci znamená, že
- libovolným počtem těchto operací (i nekonečným) aplikovaných na jazyky z dané třídy nevyrobím jazyk, který není v dané třídě
- ✅ libovolným konečným počtem těchto operací aplikovaných na jazyky z dané třídy nevyrobím jazyk, který není v dané třídě
- uvedenou operaci není možné na jazyky z dané třídy aplikovat

**10.** Regulární jazyky nejsou uzavřeny na operaci
- průnik s konečným jazykem
- sjednocení s doplňkem konečného jazyka
- ✅ průnik s nekonečným jazykem
- sjednocení s konečným jazykem