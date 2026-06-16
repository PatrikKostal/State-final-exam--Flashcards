# 4. Grafy a jejich prohledávání

> **Zadání:** Typy grafů, stromy, stupně vrcholů, orientované grafy, reprezentace grafů. Algoritmy prohledávání grafu do hloubky a do šířky a jejich využití. Komponenty souvislosti. (IB000, IB002)

# Graf

> **Graf** je uspořádaná dvojice $G = (V, E)$, kde $V$ je konečná množina **vrcholů** a $E$ je množina **hran** – množina vybraných dvouprvkových podmnožin množiny vrcholů, tj. $E \subseteq \binom{V}{2}$.

- Vrcholy značíme jako $V$, hrany jako $E$.

![[graf-priklad.png|177]]
Příklad: $V = \{1, 2, 3, 4\}, \quad E = \{\{1,2\}, \{1,3\}, \{1,4\}, \{3,4\}\}$

## Stupeň vrcholu

Každý vrchol grafu má **stupeň** $d_G(v)$, čili počet z něj vycházejících hran.

- Nejvyšší stupeň v grafu se zapisuje jako $\Delta(G)$ a nejnižší $\delta(G)$.
- **$d$-regulární** je graf, kde mají všechny jeho vrcholy stejný stupeň, čili platí $\Delta(G) = \delta(G)$.

![[stupne-grafu.png|427]]

> **Věta**: Součet stupňů v grafu je vždy sudý, roven dvojnásobku počtu hran (neorientovaný graf).

## Orientovaný graf

Hrany grafu jsou pouze jednosměrné (píšou se jako šipky).

> **Definice:** **Orientovaný graf** je uspořádaná dvojice $D = (V, E)$, kde $V$ je množina vrcholů a $E \subseteq V \times V$ je množina hran – tj. podmnožina uspořádaných dvojic vrcholů.

- **Stupeň vrcholu** je v orientovaných grafech součet vstupních a výstupních hran.
- Hrana míří z vrcholu do vrcholu $(u, v)$. Pokud míří sama do sebe $\Rightarrow$ **orientovaná smyčka** $(u, u)$.
- Pro orientované grafy uvažuj pojem **dosažitelnosti** (existuje cesta propojující dané vrcholy?).
- **Transpozice grafu** $\Rightarrow$ obrátím všem hranám orientaci.

## Neorientovaný graf

Šipky jsou obousměrné.

- Považujeme ho za **ireflexivní**, vrcholy nemají hrany do sebe.
- **Symetrizace** je převod orientovaného grafu na neorientovaný (zapomenutí směru šipek).

# Typy neorientovaných grafů

**Bipartitní** graf je takový, jehož množinu vrcholů lze rozdělit na 2 disjunktní množiny tak, že žádné 2 vrcholy ve stejné množině nejsou spojeny hranou.

- Každý strom je bipartitní.
- Graf je bipartitní právě tehdy, neobsahuje-li kružnici liché délky.

**Základní typy grafů:**

![[typy-neorientovanych-grafu.png|607]]

> Graf $G = (V, E)$ je **úplný**, pokud $|E| = \binom{|V|}{2}$. Z toho plyne, že úplný graf o $n$ vrcholech má právě $\frac{n(n-1)}{2}$ hran.

## Podgraf

> **Definice:** **Podgrafem** grafu $G$ rozumíme libovolný graf $H$ na podmnožině vrcholů $V(H) \subseteq V(G)$, který má za hrany libovolnou podmnožinu hran grafu $G$ mající oba vrcholy ve $V(H)$.
>
> Píšeme $H \subseteq G$, tj. stejně jako množinová inkluze (ale význam je trochu jiný).

> **Definice:** **Indukovaným podgrafem** je podgraf $H \subseteq G$ takový, který obsahuje všechny hrany grafu $G$ mezi dvojicemi vrcholů z $V(H)$.

![[podgraf.png|454]]

## Izomorfismus

> **Definice 9.6.** **Izomorfismus** $\cong$ grafů $G$ a $H$ je bijektivní (vzájemně jednoznačné) zobrazení $f : V(G) \to V(H)$, pro které platí, že každá dvojice vrcholů $u, v \in V(G)$ je spojená hranou v $G$ právě tehdy, když je dvojice $f(u), f(v)$ spojená hranou v $H$.


![[izomorfni-graf.png|221]]

- **Izomorfní grafy** mají stejný počet hran i vrcholů a zobrazují na sebe vrcholy o stejných stupních.
- Izomorfní relace jsou **reflexivní**, **symetrické** i **tranzitivní**.
- Algoritmy pro ověření izomorfismu nepoužívají brute-force, ale fungují podobně jako hledání kanonického pojmenování pro DFA.

## Eulerovský graf

**Eulerovský graf** $\Rightarrow$ souvislý graf, kde má každý vrchol sudý stupeň. Jde nakreslit jedním tahem!

# Strom

**Strom** je minimální souvislý graf bez kružnic (**acyklický**). Strom může být orientovaný i neorientovaný.

- Mezi každými dvěma vrcholy stromu vede právě jediná cesta.
- Přidáním jedné nové hrany do stromu vznikne právě jedna kružnice.

**Les** je graf bez kružnic, ale nemusí být souvislý $\Rightarrow$ jednotlivé komponenty souvislosti jsou stromy.

![[les.png|299]]

- Počet hran = počet vrcholů − počet stromů

## Kořenový strom

**Kořenový strom** má jeden vrchol zvolený jako **kořen**.

- Vzniká hierarchie potomků $\Rightarrow$ vrcholy (uzly) mají potomky atd.
  - Uzel bez potomstva je **list**.
- **Výška** $\Rightarrow$ počet hran dělící kořen od nejvzdálenějšího listu.
  - Pokud jde o uzel, mluvíme o **hloubce** (kolik hran jej dělí od kořene).
- Kořen je v hloubce 0.
- Kořenové stromy jsou izomorfní, pokud zobrazují kořen na kořen.

**$n$-ární kořenový strom** $\Rightarrow$ každý uzel má nejvýše $n$ synů.

- Jsou-li všechny listy ve stejné hloubce a každý vnitřní uzel má přesně $n$ synů, **strom je úplný**.

Strom může být **uspořádaný** – mít definované pořadí vrcholů (např. seřazené prvky v inorder výpisu).

**Využití** (stromové datové struktury): binární stromy, haldy, BVS, RB tree (6. otázka).

# Komponenty souvislosti

> **Definice:** **Komponentami souvislosti** grafu $G$ nazveme třídy ekvivalence relace $\sim$ na $V(G)$. Jinak se také komponentami souvislosti myslí podgrafy indukované na těchto třídách ekvivalence.

**Komponenta souvislosti** je taková maximální podmnožina uzlů grafu, pro kterou platí, že mezi každými dvěma uzly vede cesta.

- **Souvislost** v grafu je schopnost pohybovat se odkudkoliv kamkoliv podél hran.
- **Vzdálenost** mezi vrcholy souvislého grafu je pak minimální počet hran, které je od sebe dělí.

## 2 typy souvislostí

Rozlišujeme v orientovaném grafu:

- **Silná** $\Rightarrow$ mezi každými 2 vrcholy existuje cesta.
- **Slabá** $\Rightarrow$ mezi každými 2 vrcholy existuje cesta (která nebere v úvahu orientaci šipek).

![[komponenty-souvislosti.png|386]]

> **Definice:** **Silné komponenty** orientovaného grafu $D$ jsou třídy ekvivalence relace $\approx$. Orientovaný graf $D$ je **silně souvislý**, pokud má nejvýše jednu silnou komponentu.

## Kosaraju–Sharir

Algoritmus **Kosaraju–Sharir** najde silně souvislé komponenty v orientovaném grafu. Složitost je lineární $O(V + E)$.

1. Nejprve prozkoumá graf pomocí DFS.
2. Vrcholy si ukládá v opačném pořadí, než v jakém dokončil jejich průzkum (reverse postorder).
3. Transponuje graf.
4. Postupně iteruje přes získaný list vrcholů, z každého volá DFS.
   - Každým DFS získá 1 souvislou silnou komponentu. Vrcholy, které ji tvoří, odstraní ze listu.
   - Tohle provádí, dokud není list prázdný.

# Reprezentace grafů

Grafy lze reprezentovat (mimo grafických náčrtů) jako **matice sousednosti** nebo **seznam následníků**.

## Matice sousednosti

![[matice-sousednosti.png|476]]

Graf $G = (V, E)$ je reprezentovaný maticí $A = (a_{ij})$ rozměrů $|V| \times |V|$, kde

$$a_{ij} = \begin{cases} 1 & \text{pokud } (i, j) \in E \\ 0 & \text{jinak} \end{cases}$$

- Prostorová složitost: $\Theta(V^2)$
- Vhodné pro **husté grafy**
- Časová složitost výpisu všech sousedů vrcholu $u$ je $\Theta(V)$
- Časová složitost ověření zda $(u, v) \in E$ je $\Theta(1)$

## Seznam následníků

![[seznam-nasledniku.png|594]]

- Graf $G = (V, E)$ je reprezentovaný polem $Adj$ velikosti $|V|$.
- Položka v $Adj$ je seznam následníků vrcholu.
- Prostorová složitost: $\Theta(V + E)$
- Vhodné pro **řídké grafy**
- Časová složitost výpisu všech sousedů vrcholu $u$ je $\Theta(deg(u))$ ($deg(u)$ je stupeň vrcholu $u$)
- Časová složitost ověření zda $(u, v) \in E$ je $O(deg(u))$

## Srovnání

| | matice sousednosti | seznam následníků | hašovací tabulka |
|---|---|---|---|
| test $\{u, v\} \in E$ | $O(1)$ | $O(V)$ | $O(1)$ |
| test $(u, v) \in E$ | $O(1)$ | $O(V)$ | $O(1)$ |
| seznam sousedů vrcholu $v$ | $O(V)$ | $O(1 + deg(v))$ | $O(1 + deg(v))$ |
| seznam hran | $O(V^2)$ | $O(V + E)$ | $O(V + E)$ |
| přidání hrany | $O(1)$ | $O(1)$ | $O(1)^*$ |
| odstranění hrany | $O(1)$ | $O(V)$ | $O(1)^*$ |

\* očekávaná složitost

# Algoritmy prohledávání grafu

Průzkum grafu tvoří stromy dle pořadí nalezených vrcholů. Hrany přitom dělíme na:

- **Stromová hrana** $\Rightarrow$ nově objevená hrana do nově objeveného vrcholu.
- **Zpětná hrana** $\Rightarrow$ spojení vrcholu s předchůdcem nebo smyčka.
- **Dopředná hrana** $\Rightarrow$ spojuje vrchol s jeho následníkem.
- **Příčná hrana** $\Rightarrow$ propojuje vrchol s následníkem z jiné větve.

Pro efektivitu průchodu (zamezení cyklů apod.) se vrcholy dělí / obarvují na:

- **Neobjevený** (bílý)
- **Právě zpracovávaný** (šedý)
- **Zpracovaný** (černý) $\Rightarrow$ jeho větev je kompletně prohledaná

Stejného efektu lze docílit zapamatováním si časových známek $\Rightarrow$ **discovery** a **finish time**. Podle časových známek lze později vyčíst třeba pořadí objevení apod.

## Topologické uspořádání

**Topologické uspořádání** je sekvence vrcholů taková, že pro každou jeho hranu $(u, v)$ platí, že vrchol $u$ je před vrcholem $v$.

- V sekvenci jsou tedy zachované závislosti. Kořen je nejlevější vrchol.
- Jde o opačné pořadí než v jakém dokončíme prohledávání každého uzlu při DFS.

## DFS (Depth-First Search)

**DFS** je tzv. průzkum do hloubky. Při průchodu se pro každou větev zanoříme úplně do hloubky. **Složitost je $O(V + E)$.**

- Může uváznout v nekonečné větvi.
- Pro zamezení opakovaného průchodu (cykly apod.) se vrcholy obarvují. Vrchol při nalezení obarvím šedě, po prozkoumání černě.
  - Pokud narazím na šedý vrchol $\Rightarrow$ našel jsem cyklus.
  - Bílé zůstanou nedosažitelné vrcholy.

```
function DFS((V, E))
    foreach u ∈ V do  u.color = white;  u.π = None
    time = 0
    foreach u ∈ V do
        if u.color == white then  DfsVisit((V, E), u)

function DfsVisit((V, E), u)
    time += 1
    u.d = time
    u.color = gray
    foreach v ∈ Adj[u] do
        if v.color == white then
            v.π = u
            DfsVisit((V, E), v)
    u.color = black
    time += 1
    u.f = time
```

Intuitivní je použít rekurzi (simuluje zásobník a udržuje správné pořadí).

```
DFS(G, u)
    u.visited = true
    for each v ∈ G.Adj[u]
        if v.visited == false
            DFS(G, v)

init() {
    For each u ∈ G
        u.visited = false
    For each u ∈ G
        DFS(G, u)
}
```

**Používá se při:**

- Hledání vrcholu, backtrackingu…
- Hledání silných komponent $\Rightarrow$ graf projdeme, otočíme hrany a projdeme znovu (Kosaraju–Sharir).
- Detekci cyklu $\Rightarrow$ nalezení zpětné hrany.
- Hledání topologického uspořádání.

## BFS (Breadth-First Search)

**BFS** je tzv. průzkum do šířky. Při každém průchodu nejprve projdeme vrchol, jeho děti a pak děti dětí… **Složitost je $O(V + E)$.**

```
function BFS((V, E), s)
    foreach u ∈ V \ {s} do
        u.visited = False
    s.visited = True
    Q = ∅
    Enqueue(Q, s)
    while Q not empty do
        u = Dequeue(Q)
        foreach (u, v) ∈ E do
            if not v.visited then
                v.visited = True
                Enqueue(Q, v)
```

- Vhodné je použití **fronty** (FIFO struktura) $\Rightarrow$ udržuje správné pořadí zpracování vrcholů.
- BFS průchod vytváří tzv. **BFS strom**.

![[bfs-strom.png|445]]

**Využití:**

- Dijkstrův algoritmus využívá BFS s implementací prioritní fronty.
- Hledání nejkratší cesty v neohodnoceném grafu.
- Primův algoritmus (nejmenší kostra).
- Ověření bipartitity.

# Otázky

**Co je to graf? Z čeho se skládá? Jaký je rozdíl mezi orientovaným a neorientovaným?**
> Graf je uspořádaná dvojice $G = (V, E)$ – množiny **vrcholů** $V$ a **hran** $E$. V **neorientovaném** grafu jsou hrany obousměrné (dvouprvkové podmnožiny vrcholů), v **orientovaném** jsou jednosměrné (uspořádané dvojice, šipky).

**Co je souvislost grafu?**
> Schopnost pohybovat se odkudkoliv kamkoliv podél hran – mezi každými dvěma vrcholy vede cesta. U orientovaných grafů rozlišujeme **silnou** (cesta respektuje orientaci) a **slabou** (orientaci ignoruje) souvislost.

**Co je to strom? A les? Vysvětli strom průchodu grafem. Jaké hrany najdeme při průchodu?**
> **Strom** je minimální souvislý acyklický graf (mezi dvěma vrcholy vede právě jedna cesta). **Les** je graf bez kružnic, jehož komponenty jsou stromy. Průchod grafem (DFS/BFS) vytváří strom dle pořadí objevených vrcholů; hrany dělíme na **stromové**, **zpětné**, **dopředné** a **příčné**.

**Co je to DFS? K čemu je to dobré?**
> Průzkum do hloubky – pro každou větev se zanoříme úplně do hloubky, $O(V+E)$. Využití: backtracking, hledání silných komponent (Kosaraju–Sharir), detekce cyklu (zpětná hrana), topologické uspořádání.

**Co je to BFS? K čemu je to dobré?**
> Průzkum do šířky – procházíme po vrstvách pomocí fronty (FIFO), $O(V+E)$. Využití: nejkratší cesta v neohodnoceném grafu, Dijkstrův a Primův algoritmus, ověření bipartitity.

# Příklady

**1.** Které tvrzení o algoritmu prohledávání do hloubky (DFS) je pravdivé?

> **Odpověď:** Algoritmus klasifikuje hrany grafu do čtyř skupin: **stromové, dopředné, zpětné a příčné**. (DFS nedokáže jedním během vypsat všechny cykly a nefunguje úplně stejně jako BFS – liší se nejen použitím zásobníku místo fronty.)

**2.** Spustíme DFS na orientovaném grafu, který každému vrcholu $v$ přiřadí čas objevení $v.d$ a čas dokončení $v.f$. Existuje-li cesta z $u$ do $v$, které z následujících tvrzení obecně platí — $u.f > v.f$, $u.d < v.d$, $u.d > v.d$, nebo $u.f < v.f$?

> **Odpověď:** Žádné z nich. Časové známky svazují jen vztah předek–potomek ve **DFS lese** (věta o závorkování), ne obecnou dosažitelnost v grafu. Existuje-li cesta $u \to v$, neznamená to, že $v$ je potomkem $u$ ve stromu — $v$ může být objeveno z jiného startovního vrcholu *dříve* než $u$ (příčná hrana). Podle pořadí, v jakém DFS vrcholy navštíví, pak může vyjít kterákoli z nerovností i její opak, takže žádná neplatí univerzálně.

**3.** Kolik existuje podgrafů izomorfních cyklu délky $4$ v úplném bipartitním grafu $K_{3,4}$?

> **Odpověď: 18.** Cyklus délky $4$ použije 2 vrcholy z každé strany: $\binom{3}{2} \cdot \binom{4}{2} = 3 \cdot 6 = 18$ (každá taková čtveřice tvoří právě jeden $4$-cyklus).

**4.** Jaký je maximální možný počet hran úplného grafu na pěti vrcholech $K_5$, po jejichž odstranění zůstane graf souvislý?

> **Odpověď: 6.** $K_5$ má $\binom{5}{2} = 10$ hran. Souvislý graf na 5 vrcholech potřebuje aspoň kostru o $4$ hranách, takže lze odstranit nejvýše $10 - 4 = 6$ hran.

**5.** Nechť $u$ a $v$ jsou libovolné dva různé vrcholy úplného grafu $K_5$. Jaký je počet cest délky $3$ mezi $u$ a $v$? (Cesta nesmí opakovat vrcholy ani hrany.)

> **Odpověď: 6.** Cesta $u - a - b - v$ má dva vnitřní vrcholy z 3 zbývajících; uspořádaných dvojic $(a, b)$ je $3 \cdot 2 = 6$ a v úplném grafu je každá platná.

**6.** Uvažme hranově ohodnocený neorientovaný graf daný následující maticí sousednosti (nepřítomnost hrany je značena pomocí „−"). Který vrchol má největší vzdálenost od vrcholu $d$?

|     | $a$ | $b$ | $c$ | $d$ | $e$ | $f$ |
| --- | --- | --- | --- | --- | --- | --- |
| $a$ | −   | −   | −   | 9   | −   | 3   |
| $b$ | −   | −   | 3   | 5   | 4   | −   |
| $c$ | −   | 3   | −   | 1   | 7   | 3   |
| $d$ | 9   | 5   | 1   | −   | −   | −   |
| $e$ | −   | 4   | 7   | −   | −   | 4   |
| $f$ | 3   | −   | 3   | −   | 4   | −   |

> **Odpověď: $e$.** Nejkratší vzdálenosti od $d$: $c=1$, $b=4$ (přes $c$), $f=4$ (přes $c$), $a=7$ (přes $c, f$), $e=8$ (přes $c$). Největší vzdálenost má vrchol $e$.

**7.** Uvažme orientovaný graf na obrázku. Který z následujících vrcholů objevíme při prohledávání do šířky z vrcholu $a$ dříve než při prohledávání do hloubky z téhož vrcholu? (Sousedy algoritmy objevují abecedně.) Možnosti: $b$, $f$, $e$, $c$, $g$.

![[04-grafy-priklad-7.png|157]]

> **Odpověď: $g$.** Vrchol $g$ je přímý následník $a$, takže ho BFS objeví hned v 1. vrstvě. DFS jdoucí abecedně se nejprve celý zanoří přes $b$ a $d$, a k $g$ se dostane až mnohem později.

# Otázky z ISu

> Otázky pocházejí ze společné testové sekce *Algoritmy a datové struktury*. U tvrzení typu ano/ne nebyla v exportu z ISu vyznačena správná odpověď — je doplněna podle standardních výsledků.

**1.** Nechť v orientovaném grafu $G$ existuje hrana z vrcholu $v$ do vrcholu $t$. Pak při průzkumu grafu $G$ do hloubky z vrcholu $v$ musí platit, že hrana $(v, t)$ je klasifikována jako stromová.
- ano
- ✅ ne

**2.** Pro prohledávání grafu do hloubky (DFS) platí:
- Dokážeme pomocí něj najít všechny cykly v grafu.
- ✅ Klasifikuje hrany v grafu na stromové, dopředné, zpětné a příčné.
- Funguje pouze pro stromy, pro obecné grafy musíme použít jiný druh prohledávání.
- Funguje stejně jako BFS, jen s tím rozdílem, že místo fronty použijeme zásobník.

**3.** Mějme bipartitní graf G. Které tvrzení o grafu G určitě neplatí?
- Graf G obsahuje vrchol stupně 10.
- Graf G obsahuje cyklus sudé délky.
- ✅ Graf G obsahuje cyklus liché délky.
- Graf G obsahuje právě jeden vrchol.

**4.** Je dán orientovaný graf $G = (V, E)$. Existuje algoritmus se složitostí v $\mathcal O(V + E)$, který rozhoduje, zda v $G$ existuje orientovaný cyklus?
- ✅ ano
- ne

**5.** Pro jaký typ orientovaného grafu platí, že jeho DFS strom má tvar, který je nezávislý na tom, ve kterém vrcholu průzkum grafu začíná a jaké je uspořádání následníků jednotlivých vrcholů (tj. všechny vyprodukované DFS stromy jsou grafově izomorfní)?
- acyklický graf
- ✅ cyklus
- pro každý graf
- pro žádný graf

**6.** Mějme nekonečný binární strom (tj. binární strom, v němž je alespoň jedna nekonečná větev). Jaké prohledávání grafu zaručeně projde každý vrchol tohoto stromu v konečném čase?
- IFS (prohledávání do nekonečna)
- ✅ BFS (prohledávání do šířky)
- DFS (prohledávání do hloubky)
- žádné, takové prohledávání není možné

**7.** Pro prohledávání grafu do šířky (BFS) platí:
- ✅ Hledá nejkratší cesty, pokud za délku cesty považujeme počet hran.
- K implementaci používáme zásobník.
- Na neorientovaných grafech se zacyklí.
- Klasifikuje hrany v grafu na stromové, dopředné, zpětné a příčné.
