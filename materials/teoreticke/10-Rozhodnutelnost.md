# 10. Rozhodnutelnost

> **Zadání:** Pojem algoritmického problému a algoritmu. Turingův stroj a problém zastavení. Rozhodnutelnost a částečná rozhodnutelnost, nerozhodnutelnost. Metoda redukce. (IB110)

# Výpočetní problém

> **Výpočetní problém** je jakýkoliv problém, který předkládáme výpočetnímu zařízení, aby jej vyřešilo.

**Algoritmický problém** je výpočetní problém, který k vyřešení vyžaduje specifický **algoritmus**.
- Algoritmicky **neřešitelné** problémy nazýváme **nerozhodnutelné**.

> **Algoritmus** je sekvence kroků / instrukcí nutná k vyřešení problému.

- Algoritmus musí být **konečný** a jednoznačně definovat **vstupy a výstupy**.

## Reprezentace výpočetního problému

Výpočetní problém lze reprezentovat jako dvojici $(\mathcal{D}, out)$:
- **$\mathcal{D}$** – kolekce matematických objektů (**doména problému**). Objekty jsou tzv. **instance problému**.
- **$out$** – funkce, která každému objektu z $\mathcal{D}$ přiřazuje nějaký jiný matematický objekt.
- $\mathcal{D}$ vymezuje **vstupy**, $out$ definuje **výpočet a výstupy**.

**Schéma zápisu problému:**
```
Název problému
INPUT:  Popis prvků domény D
OUTPUT: Popis toho, jak vypadá out(x) pro obecné x ∈ D
```

**Příklad – SINGLE-PAIR-SHORTEST-PATH:**
```
INPUT:  Orientovaný, hranově ohodnocený graf G, jeho vrcholy u, v.
OUTPUT: Číslo n takové, že n je délka nejkratší cesty z u do v v grafu G.
```

> Pokud je problém **rozhodnutelný**, pak existuje algoritmus, který pro libovolný vstup splňující vstupní podmínku vrátí správný výsledek.

## Rozhodovací problémy

> **Rozhodovací problém** vrací pouze **True / False** – rozhoduje o nějaké vlastnosti matematického objektu.

- Jsou **zjednodušením** výpočetních problémů.
- Můžeme pro ně zafixovat **abecedu a jazyk** $\Rightarrow$ přeložit na **problém příslušnosti**.
- **Každý rozhodovací problém lze přeložit na problém příslušnosti.**
- Pro jejich vyhodnocení potřebujeme obecný výpočetní model $\to$ **Turingův stroj**.

> **Problém příslušnosti** $\Rightarrow$ na úrovni 1 a 0 rozhodujeme, zda slovo patří do jazyka, ve kterém všechna slova splňují danou vlastnost. Jde tedy o rozhodovací problém.

# Turingův stroj

> **Turingův stroj (TS)** je obecný model výpočetního zařízení.

- Je to **konečný automat s potenciálně nekonečnou pamětí**.
- Paměť je reprezentována **páskou** s indexovatelnými políčky (buňkami).
- Paměť čte **čtecí hlavička**, která si pamatuje současný index (nikdy nesmí přepsat levou zarážku).

> **Úplný** je takový TS, který vždy **akceptuje / zamítá**. Tedy nikdy necyklí.

## Deterministické Turingovy stroje (DTS)

TS zapisujeme jako **sedmici** $(Q, \Sigma, \Gamma, \delta, s, Q_{acc}, Q_{rej})$:
- **$Q$** – konečná množina **kontrolních stavů**
- **$\Sigma$** – konečná **vstupní abeceda**
- **$\Gamma$** – **pásková abeceda** $\Rightarrow \Sigma$ + levá zarážka $\triangleright$ a prázdné políčko $\sqcup$
	- Levá zarážka $\triangleright$ **nesmí být nikdy přepsána!**
- **$\delta$** – **totální přechodová funkce**: $Q \setminus \{Q_{acc}, Q_{rej}\} \times \Gamma \to Q \times \Gamma \times \{+1, -1, 0, \bot\}$
	- Krok / přechod = (nový kontrolní stav, znak k zápisu, posun indexu)
	- $\bot$ značí **nedefinovaný přechod**
	- Např. $\delta(Q_1, x) = (Q_2, b, +1)$: při čtení `x` ve stavu $Q_1$ zapíšeme na pásku `b`, index na pásce posuneme o $+1$ a přejdeme do stavu $Q_2$
- **$s$** – počáteční konfigurace $(Q_1, \triangleright, +1)$
- **$Q_{acc}$** – akceptující konfigurace
- **$Q_{rej}$** – zamítající konfigurace

![[nekonecna-vstupni-paska.png|413]]
## Konfigurace

> **Konfigurace** je celkový stav TS = (kontrolní stav, paměť / stav pásky, pozice).

Formálně je konfigurace stroje $\mathcal{T} = (Q, \Sigma, \Gamma, \delta, s, q_{acc}, q_{rej})$ libovolná trojice $(s, \alpha, i)$ taková, že:
- $s \in Q$ je aktuální kontrolní stav,
- $\alpha$ je nekonečná posloupnost symbolů z $\Gamma$, která začíná symbolem $\triangleright$ a obsahuje pouze konečně mnoho symbolů různých od $\sqcup$ (aktuální obsah pásky),
- $i \in \{0, 1, 2, \dots\}$ je přirozené číslo udávající aktuální pozici čtecí hlavy.

Pro konfiguraci $(s, \alpha, i)$ a číslo $j$ značí $\alpha[j]$ znak na políčku indexovaném $j$. Nejlevější políčko má index 0, tedy $\alpha[0]$ je vždy rovno $\triangleright$.

**Výsledek výpočtu:**
- Slovo je **akceptováno**, pokud jeho čtení končí v $Q_{acc}$.
- Slovo je **zamítnuto**, pokud jeho čtení končí v $Q_{rej}$.
- Pokud se **zasekneme** (nemáme při čtení kam pokračovat), slovo je **zamítnuto**.
- Pokud nenastane nic z toho $\Rightarrow$ **TS nad slovem cyklí**.

> **TS akceptuje jazyk**, pokud akceptuje slova, která do něj patří, a všechna ostatní zamítá. Přitom nesmí nikdy cyklit.

## Churchova–Turingova teze

- Říká, že **každé reálné výpočetní zařízení simuluje nějaký TS**.
- Je to základ moderní informatiky, nelze ji ovšem dokázat.
- Šlo by ji vyvrátit, kdybychom zkonstruovali stroj, který řeší nějaký nerozhodnutelný problém.

> **Univerzalita** $\Rightarrow$ Turingův stroj dokáže simulovat libovolný jiný Turingův stroj.

- Univerzalita je důvod, proč považujeme Churchovu–Turingovu tezi za pravdivou.
- TS lze zapsat jako **řetězec znaků** (např. binárně pomocí 0 a 1).
- TS lze proto **poslat na vstup jiného TS**.
- Důsledkem této obecnosti jsou **nerozhodnutelné problémy**.

# Rozhodnutelnost

> Problém je **rozhodnutelný**, pokud lze $w \in L$ rozhodnout reálným výpočetním zařízením.

- TS jsou nejobecnějším modelem $\Rightarrow$ pokud problém rozhoduje TS, problém je rozhodnutelný.

> **Rozhodnutelnost** znamená, že existuje **úplný** Turingův stroj, který akceptuje každý řetězec s požadovanou vlastností $P$ a zamítá každý řetězec, který vlastnost $P$ nemá.

> **Nerozhodnutelnost** znamená, že takový Turingův stroj **neexistuje**.

> **Částečná rozhodnutelnost** znamená, že existuje Turingův stroj, který umí **akceptovat** požadovaná slova, ostatní buď zamítá, **nebo cyklí**.

**Doplněk částečně rozhodnutelného problému, který není rozhodnutelný, je nerozhodnutelný.**
- Pokud by totiž existoval rozhodnutelný doplněk, mohli bychom pomocí TS pro doplněk rozhodnout, která slova do doplňku nepatří, a v kombinaci s původním (částečně rozhodnutelným) TS bychom dokázali rozhodnout původní nerozhodnutelný problém.

> **Věta:** Jazyk $L$ je **částečně rozhodnutelný** právě tehdy, když existuje nějaká **gramatika typu 0**, která jej generuje.

## Formální definice rozhodnutelnosti

> Fixujme abecedu $\Sigma$. Problém $L \subseteq \Sigma^*$ je **rozhodnutelný**, jestliže existuje deterministický Turingův stroj $\mathcal{T}$ se vstupní abecedou $\Sigma$ takový, že pro libovolné slovo $w \in \Sigma^*$ platí:
> - pokud $w \in L$, pak je $w$ strojem $\mathcal{T}$ **akceptováno**,
> - pokud $w \notin L$, pak je $w$ strojem $\mathcal{T}$ **zamítnuto**.
>
> Zejména tedy $\mathcal{T}$ nesmí pod žádným vstupním slovem cyklit. V takovém případě říkáme, že $\mathcal{T}$ **rozhoduje** $L$. Problém $L$ je **nerozhodnutelný**, jestliže není rozhodnutelný.

![[rozhodnutelnost-vennuv.png|327]]

Pro rozhodnutelnost potřebujeme, aby DTS **vždy zastavil** a akceptoval jazyk $L$.

**Terminologie:**
- Rozhodnutelné problémy se v literatuře často nazývají **rekurzivními**.
- Částečně rozhodnutelné problémy se často nazývají **rekurzivně spočetnými**.

> TS jsou především teoretické modely, nevhodné pro přímou reálnou konstrukci. Pro ukázku rozhodnutelnosti proto nekonstruujeme TS, ale **pseudokód algoritmu** – na základě C–T teze předpokládáme jeho sestrojitelnost.

# Problém zastavení (Halting problem)

> **Halting problem** $\Rightarrow$ rozhodnout, jestli TS nad daným slovem **zastaví**.

```
HALTING-PROBLEM
INPUT:  Turingův stroj T, slovo w nad jeho vstupní abecedou
OUTPUT: True, pokud T zastaví (tj. necyklí) nad slovem w, jinak False.
```

- Problém je, že nemůžeme s jistotou určit, že TS opravdu **nezastaví** (cyklí), a říct NE.
- Matematicky jde o demonstraci **neuzavřenosti** třídy rekurzivně spočetných jazyků na **doplněk**.

> **Věta (Turing, 1936):** Problém $Halt$ je **nerozhodnutelný**.

**Halting problem je částečně rozhodnutelný** – můžeme rozhodnout alespoň instance, které zastaví (odpověď ANO).

# Zobecněné Turingovy stroje

> **Všechna zobecnění Turingova stroje lze simulovat pomocí DTS!**

- Mohou mít více pásek, obousměrné nekonečné pásky apod.

## Nedeterministické TS (NTS)

- Stejné jako DTS až na **totální nedeterministickou** přechodovou funkci: $Q \times \Gamma \to 2^{Q \times \Gamma \times \{+1, -1, 0\}}$
- Vhodné pro **kompaktní reprezentaci výpočtů**.
- V zápisu algoritmu využíváme **`Oracle(1…n)`** $\to$ funkci, která si sama vybere, kam půjde – stejně jako nedeterministické přechody v automatech.
	- Při provedení instrukce $x \leftarrow Oracle(X)$ algoritmus nedeterministicky vybere nějaký prvek z $X$ a přiřadí ho do $x$. Volba odpovídá větvení výpočtu NTS.
	- Vstup je **akceptován, pokud alespoň jeden výpočet vrátí `True`**.

**Příklad – nedeterministický algoritmus (bez cyklu!) rozhodující, zda pole obsahuje číslo 7:**
```
Input: Pole A délky n
i ← Oracle({1, …, n});
if A[i] == 7 then return True;
else return False;
```

> Stejně jako u NFA nemá NTS modelovat reálné výpočetní zařízení – používá se ke **studiu složitosti** a reprezentaci výpočtů.

**Každé NTS lze simulovat pomocí vhodného DTS.** Zejména ke každému NTS $\mathcal{T}$ existuje DTS $\mathcal{T}'$ se stejnou vstupní abecedou $\Sigma$ takový, že akceptují stejný jazyk. NTS tedy akceptují právě **částečně rozhodnutelné jazyky**. Stejně tak, je-li jazyk $L$ rozhodován nějakým NTS, existuje i DTS rozhodující $L$.

# Třídy jazyků

> **Rekurzivně spočetný jazyk (RE):** $L = L(M)$ pro nějaký TM. Existuje TM, který ho **akceptuje**. Jde o jazyk typu 0.

> **Rekurzivní jazyk (Rec):** $L = L(M)$ pro nějaký **úplný** TM. Existuje TM, který ho **rozhoduje**. Patří sem regulární, bezkontextové, kontextové a další jazyky.

- **Všechny regulární jazyky jsou rozhodnutelné.**
- Každý **rekurzivní** jazyk je i **rekurzivně spočetný**.

## Uzávěry na operace

| Třída jazyků | $\cup$ | $\cap$ | $\setminus$ | $\cdot$ | $*$ | $R$ | $co\text{-}$ | $\cap\,REG$ |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| regulární | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| bezkontextové | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |
| deterministické bezkontextové | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| rekurzivní | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| rekurzivně spočetné | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ |

# Metoda redukce

> **Redukce** je metoda pro porovnání složitosti a určení rozhodnutelnosti výpočetních problémů.

- Cílem je **převést jeden problém na jiný** tak, aby řešení druhého problému šlo použít k řešení toho původního $\Rightarrow$ návrh **transformačního algoritmu** pro převedení problému $A$ na problém $B$.
- Rozhodovací problém $P_1$ lze **redukovat** na problém $P_2$, pokud platí $L_1 \leq L_2$.
	- $P_2$ tedy nemusí jít redukovat na $P_1$.
	- Problémy, pro něž $L_1 \leq L_2$ a zároveň $L_2 \leq L_1$, se nazývají **výpočetně ekvivalentními**.

> **Definice redukce:** Mějme dva rozhodovací problémy $P_1 = (\mathcal{D}_1, out_1)$ a $P_2 = (\mathcal{D}_2, out_2)$. Funkce $f : \mathcal{D}_1 \to \mathcal{D}_2$ je **redukcí** problému $P_1$ na problém $P_2$, jestliže:
> - $f$ je počítaná nějakým algoritmem $A$, který **vždy zastaví** (pro libovolný vstup $x \in \mathcal{D}_1$ vrátí $f(x) \in \mathcal{D}_2$),
> - pro libovolné $x \in \mathcal{D}_1$, pro které platí $out_1(x) = True$, platí i $out_2(f(x)) = True$ (pozitivní instance se převedou na pozitivní),
> - pro libovolné $x \in \mathcal{D}_1$, pro které platí $out_1(x) = False$, platí i $out_2(f(x)) = False$ (negativní instance se převedou na negativní).
>
> Píšeme $P_1 \leq P_2$, jestliže existuje redukce problému $P_1$ na problém $P_2$.

**Důsledky redukce $L_1 \leq L_2$:**
- **Nerozhodnutelnost** $L_1$ implikuje **nerozhodnutelnost** $L_2$.
- **Rozhodnutelnost** $L_2$ implikuje **rozhodnutelnost** $L_1$.
- **Částečná rozhodnutelnost** $L_2$ implikuje **částečnou rozhodnutelnost** $L_1$.
- Pokud $L_1$ **není** částečně rozhodnutelný, pak ani $L_2$ není částečně rozhodnutelný.

> Pro **důkaz rozhodnutelnosti** mohu problém redukovat na rozhodnutelný problém! (Obráceně to nefunguje.)

**Příklady nerozhodnutelných problémů:**
- **Postův problém přiřazení (PCP)**
- **CFG-EQUIVALENCE**
- **CFG-REGULARITY**

Tyto problémy jsou nerozhodnutelné, pokud je na vstupu **bezkontextová** gramatika. Pro **regulární** gramatiku by rozhodnout šly.

# Diagonalizace

> **Diagonalizace** je metoda pro určení (ne)rozhodnutelnosti. Vychází z **Cantorovy diagonální metody**.

- Vytvoříme **nekonečnou matici**, kde řádky odpovídají jednotlivým Turingovým strojům a sloupce vstupům. Položka na pozici $(i, j)$ označuje, zda Turingův stroj $T_i$ zastaví na vstupu $j$.
- Z matice vybereme prvky na **diagonále** a vytvoříme **anti-diagonální stroj** tak, aby pro vstup $i$ dělal přesný **opak** toho, co $T_i$.
- Pokud by byl anti-diagonální TS rozhodnutelný, vede to ke sporu $\Rightarrow$ původní problém je **nerozhodnutelný**.

## Cantorova diagonální metoda – příklad (důkaz sporem)

Zabýváme se **problémem příslušnosti** pro Turingovy stroje: chceme určit, zda $M$ slovo $w$ akceptuje, nebo neakceptuje (příslušnost / nepříslušnost k jazyku $L(M)$). Diagonalizace nám umožňuje dokázat, že problém příslušnosti pro TM je nerozhodnutelný. Jinak řečeno, jazyk

$$PP \overset{def}{=} \{ \langle \mathcal{M} \rangle \# \langle w \rangle \mid \text{stroj } \mathcal{M} \text{ akceptuje } w \}$$

**není rekurzivní.**

## Důkaz nerozhodnutelnosti halting problému (Turing)

Alan Turing použil diagonalizaci k důkazu, že halting problém je nerozhodnutelný:

1. **Předpoklad opaku:** předpokládejme, že existuje rozhodovací stroj $H$, který rozhoduje halting problém. Tedy $H$ bere jako vstup popis Turingova stroje $T$ a jeho vstup $x$ a vrací „ano", pokud $T$ na $x$ zastaví, a „ne", pokud $T$ na $x$ nezastaví.

2. **Konstrukce nového stroje $D$:** vytvoříme TS $D$, který na vstupu $x$:
	- pokud $H$ řekne, že $T_x$ **zastaví** na vstupu $x$, $D$ **nezastaví** (běží donekonečna),
	- pokud $H$ řekne, že $T_x$ **nezastaví** na vstupu $x$, $D$ **zastaví**.

3. **Paradox:** co se stane, když spustíme $D$ na jeho vlastním popisu, tj. $D(D)$?
	- Pokud $H$ řekne, že $D$ zastaví na vstupu $D$, pak $D$ podle své definice **nezastaví**.
	- Pokud $H$ řekne, že $D$ nezastaví na vstupu $D$, pak $D$ podle své definice **zastaví**.

Tento paradox ukazuje, že $H$ nemůže existovat, protože vede k logickému rozporu. Tím je dokázáno, že halting problém je **nerozhodnutelný**. $\square$

# Otázky z ISu

**1.** Jazyk, který odpovídá Ano/Ne problému nad množinou přípustných vstupů, je
- libovolná podmnožina přípustných vstupů, pro něž je odpověď na příslušnou Ano/Ne otázku záporná.
- ✅ množina všech přípustných vstupů, pro něž je odpověď na příslušnou Ano/Ne otázku kladná.
- množina těch vstupů, pro něž neumím rozhodnout, jak odpovědět na příslušnou Ano/Ne otázku.
- jazyk obsahující slova Ano a Ne.

**2.** Problém je algoritmicky rozhodnutelný, právě když jazyk příslušný problému je
- konečný.
- jazyk typu 0, dle Chomského hierarchie.
- ✅ rozhodován nějakým Turingovým strojem.
- existuje algoritmus pro rozhodnutí příslušnosti jednoho vybraného slova do daného jazyka.

**3.** Turingův stroj rozhoduje nějaký jazyk L právě když: (TS akceptuje = zastaví a řekne ano, TS zamítá = zastaví a řekne ne, TS neakceptuje = zamítá, nebo cyklí)
- nad všemi slovy jazyka L svůj výpočet zastaví.
- nad všemi slovy jazyka L svůj výpočet zastaví a slovo akceptuje.
- nad všemi slovy jazyka L svůj výpočet zastaví a slovo akceptuje, nad ostatními slovy neakceptuje.
- nad všemi slovy svůj výpočet zastaví a akceptuje, nebo zamítne.
- ✅ ani jedna z ostatních odpovědí není správná.

**4.** Turingův stroj akceptuje nějaký jazyk L právě když: (TS akceptuje = zastaví a řekne ano, TS zamítá = zastaví a řekne ne, TS neakceptuje = zamítá, nebo cyklí)
- nad všemi slovy jazyka L svůj výpočet zastaví.
- nad všemi slovy jazyka L svůj výpočet zastaví a slovo akceptuje.
- ✅ nad všemi slovy jazyka L svůj výpočet zastaví a slovo akceptuje, nad ostatními slovy neakceptuje.
- nad všemi slovy svůj výpočet zastaví a akceptuje, nebo zamítne.
- ani jedna z ostatních odpovědí není správná.

**5.** Univerzální Turingův stroj je
- Turingův stroj, který umí simulovat výpočet jiného Turingova stroje, který má zakódovaný ve své přechodové funkci.
- Turingův stroj, který akceptuje všechny jazyky typu 0.
- Turingův stroj, který na vstupu dostane kód jiného Turingova stroje a pro zadaný stroj rozhodne, zda může cyklit pro nějaký vstup.
- ✅ Turingův stroj, který na vstupu dostane kód jiného Turingova stroje a kód slova, a pro tuto dvojici věrně simuluje výpočet zadaného stroje nad zadaným slovem.

**6.** Problém je částečně rozhodnutelný, pokud
- není rozhodnutelný.
- není rozhodnutelný a jeho doplněk není ani částečně rozhodnutelný.
- jeho doplněk je částečně rozhodnutelný.
- pro některé instance problému existuje rozhodující algoritmus a pro některé instance ne.
- ✅ ani jedna z ostatních možností.

**7.** Pokud existuje TS, který nad všemi slovy z jazyka L zastaví a akceptuje, pak problém, kterému jazyk L přísluší,
- je rozhodnutelný.
- je nerozhodnutelný.
- není ani částečně rozhodnutelný.
- ✅ může být rozhodnutelný.

**8.** Pokud jazyk L i doplněk jazyka L jsou akceptovány nějakým Turingovým strojem, pak
- ✅ existuje Turingův stroj, který rozhoduje jazyk L.
- neexistuje Turingův stroj, který rozhoduje jazyk L.
- problém odpovídající jazyku L není rozhodnutelný, ale je částečně rozhodnutelný.

**9.** Problém zastavení je
- otázka, jak dlouhá bude brzdná dráha vozu o hmotnosti m, při rychlosti v, koeficientu tření t, efektivitě brzd e, a brzdné síle F vyvíjené na brzdový pedál.
- otázka, zda existuje Turingův stroj, který svůj výpočet vždy zastaví.
- ✅ otázka, zda daný Turingův stroj zastaví svůj výpočet nad daným slovem.

**10.** Pokud se problém A redukuje na problém B, pak
- ✅ z nerozhodnutelnosti A plyne nerozhodnutelnost B.
- z rozhodnutelnosti A plyne rozhodnutelnost B.
- z nerozhodnutelnosti B plyne nerozhodnutelnost A.
- z částečné rozhodnutelnosti B plyne rozhodnutelnost A.