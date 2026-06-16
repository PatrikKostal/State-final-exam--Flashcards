# 7. Návrh algoritmů

> **Zadání:** Metoda rozděl a panuj, výhody a nevýhody použití rekurze, odstranění rekurze. Vysvětlení principů a implementace řadících rekurzivních algoritmů. Vztah rekurze a matematické indukce. (IB002, IB015)

# Rekurze

> **Rekurze** je definice funkce nebo datové struktury s využitím sebe sama.

Rekurzivní algoritmy iterují voláním sebe sama, dokud nenarazí na **zarážku**.

- **Rekurzivní zarážka** $\Rightarrow$ podmínka ukončující rekurzi / triviální případ, pro který známe výsledek.
- Funguje díky ukládání posloupnosti volání na **zásobník**.

**Druhy rekurze:**

- **Přímá rekurze** $\Rightarrow$ funkce $A$ volá funkci $A$. Říkáme, že se funkce **zanoří**.
- **Nepřímá rekurze** $\Rightarrow$ funkce $A$ volá funkci $B$ a funkce $B$ volá funkci $A$.
- **Tail-rekurze** $\Rightarrow$ volání je až na konci funkce (lze nahradit jednoduchým cyklem).
  - Některé kompilátory toto rovnou nahrazují iterativní verzí $\Rightarrow$ šetří paměť i čas.

> **Fakt:** Každý rekurzivní algoritmus lze převést na iterativní.

**Výhody** $\Rightarrow$ čitelný zápis, intuitivní implementace prohledávání grafů a nekonečných posloupností (Fibonacci).

**Nevýhody** $\Rightarrow$ vyšší paměťová náročnost s rizikem vyčerpání paměti (**stack overflow**).

- Těžší odhad složitosti, často pomalejší než iterativní řešení.

## Odstranění rekurze

Rekurzi lze nahradit použitím nějaké **explicitní datové struktury** (fronty, zásobníku…).

- Někdy ji lze nahradit i obyčejným cyklem.

# Matematická indukce

> **Matematická indukce** je technika důkazu tvrzení o nekonečných posloupnostech.

**Princip matematické indukce** říká, že k důkazu věty

> „Pro každé přirozené (celé) $n \geq k_0$ platí $T(n)$."

stačí ověřit platnost dvou tvrzení:

1. $T(k_0)$ — tzv. **báze** (základ indukce),
2. pro každé $k \geq k_0$: jestliže platí $T(k)$ (**indukční předpoklad**), pak platí také $T(k+1)$ (**indukční krok**).

## Vztah rekurze a indukce

Rekurze jde **opačným směrem** než indukce, nejsou si však vzájemně inverzní.

- **Rekurze** jde od složitého problému k bázi $\Rightarrow$ řeší problém $f(n)$ tím, že se zanoří, aby vyřešila $f(n-1)$.
- **Indukce** bází začíná $\Rightarrow$ ví, že dokáže vyřešit bázi, a snaží se dokázat, že pokud platí $f(n)$, pak platí i $f(n+1)$.

Společné mají to, že **ani indukce, ani rekurze nedokazují řešení počátečního problému** $n$, ale až $n-1$ $\Rightarrow$ pravdivost jednoho kroku se přenáší na ten další.

# Rozděl a panuj

> **Rozděl a panuj** (divide and conquer) je rekurzivní metoda řešení problému jeho rozdělením na dílčí části.

Dělení probíhá, dokud nerozdělíme problém na **triviální mini-problémy**, jejichž výsledky umíme jednoduše sloučit.

- „Mini-problémy" jsou konstantní velikosti.
- **Postup:** Divide $\Rightarrow$ Conquer $\Rightarrow$ Combine (rozděl $\Rightarrow$ vyřeš $\Rightarrow$ zkombinuj).

## Výhody

- **Jednoduchost** — jediné, co potřebujeme, je znát způsob, jak rozložit problém na podproblémy, umět řešit triviální data a zkombinovat výsledné části zpět do jedné.
- **Efektivnost algoritmů** — rozděl a panuj znatelně zlepšuje asymptotickou efektivnost výpočtu; jsme schopni dosáhnout logaritmické složitosti.
- **Paralelismus** — díky rozdělení hlavního problému můžeme podproblémy řešit paralelně.
- **Přístup k paměti** — nejmenší podproblémy můžeme řešit v cache paměti, není třeba přistupovat do pomalejší paměti.
- **Problém zaokrouhlování** — při počítání s desetinnými čísly v pohyblivé řádové čárce umožňuje přesnější výpočty než ekvivalentní iterativní metody.

**Nevýhodou** je použití rekurze, které může zkomplikovat návrh algoritmu a zvýšit paměťové nároky. To lze částečně obejít použitím **explicitního zásobníku** $\Rightarrow$ místo rekurze ukládat podproblémy do zásobníkové struktury v iterativním algoritmu.

> **Postup využívají** merge sort a quick sort.

# Algoritmus

> **Algoritmus** je teoretický princip řešení problému — konečná posloupnost elementárních výpočetních kroků.

Algoritmus má:

- **Vstupní podmínku** $\Rightarrow$ vymezuje vstupy, pro které je algoritmus definován.
- **Invariant cyklu** $\Rightarrow$ tvrzení platící před a po každé iteraci.
- **Výstupní podmínku** $\Rightarrow$ určuje, jak má vypadat výstup odpovídající vstupu.

## Korektnost

- **Úplnost (konvergence)** $\Rightarrow$ pro každý vstup splňující vstupní podmínku výpočet **skončí**.
- **Parciální korektnost** $\Rightarrow$ pro každý vstup, který splňuje vstupní podmínku a **výpočet skončí**, splňuje výsledek výstupní podmínku.
- **Totální korektnost** $\Rightarrow$ úplnost $+$ parciální korektnost.

## Složitost

> **Složitost** vyjadřuje výpočetní náročnost algoritmu.

- **Prostorová složitost** $\Rightarrow$ náročnost na paměť.
- **Extrasekvenční** prostorová složitost neuvažuje vstupní data.
- **In situ** je algoritmus, který kromě výchozích dat potřebuje pouze **konstantní** množství paměti (modifikuje původní data).

**Asymptotická složitost** říká, kolikrát se zvětší složitost, pokud se zvětší vstup $n$-krát.

- Pokud se vstup zvýší dvakrát, algoritmus se složitostí $O(n^2)$ potrvá zhruba $4\times$ déle.

**Asymptotická notace** — pro každou funkci $g : \mathbb{N} \to \mathbb{R}_0^+$ zavedeme množiny funkcí:

- $\mathcal{O}(g) = \{ f \mid \exists c > 0,\, n_0 \in \mathbb{N} : \forall n \geq n_0 : f(n) \leq c \cdot g(n) \}$ — funkce rostoucí **nejvýše tak rychle** jako $g$.
- $\Omega(g) = \{ f \mid \exists c > 0,\, n_0 \in \mathbb{N} : \forall n \geq n_0 : f(n) \geq c \cdot g(n) \}$ — funkce rostoucí **alespoň tak rychle** jako $g$.
- $\Theta(g) = \{ f \mid \exists c_1, c_2 > 0,\, n_0 \in \mathbb{N} : \forall n \geq n_0 : c_1 g(n) \leq f(n) \leq c_2 g(n) \} = \mathcal{O}(g) \cap \Omega(g)$ — funkce rostoucí **stejně rychle** jako $g$.

**Posloupnost složitostí:**

$$O(1) < O(\log\log n) < O(\log n) < O(\log^k n) < O(\sqrt{n}) < O(n) < O(n\log n) < O(n^2) < O(n^k) < O(k^n) < O(n!)$$

## Výpočet složitosti

Složitost určujeme **vyřešením rekurentních rovnic** $\Rightarrow$ substituční metoda, rekurzivní strom, Master theorem.

### Substituční metoda

> **Substituční metoda** $\Rightarrow$ odhad řešení $+$ důkaz indukcí.

Uvažme rekurentní rovnici:

$$T(n) = \begin{cases} 1 & \text{pro } n = 1, \\ 2T(\lfloor n/2 \rfloor) + n & \text{jinak.} \end{cases}$$

Indukcí dokážeme, že $T(n) \leq cn\log n$ pro dostatečně velké $n$ a vhodně zvolené $c$ — tedy $T(n) = O(n\log n)$.

**Indukční krok:** předpokládáme, že tvrzení platí pro všechna $m < n$, tj. pro $m = \lfloor n/2 \rfloor$ platí $T(\lfloor n/2 \rfloor) \leq c\lfloor n/2 \rfloor \log(\lfloor n/2 \rfloor)$. Využitím indukčního předpokladu:

$$\begin{aligned} T(n) &\leq 2\big(c\lfloor n/2 \rfloor \log(\lfloor n/2 \rfloor)\big) + n \\ &\leq cn\log(n/2) + n \\ &= cn\log n - cn\log 2 + n \\ &= cn\log n - cn + n \\ &\leq cn\log n. \end{aligned}$$

**Báze:** stačí, aby nerovnost platila pro dostatečně velká $n$, dokážeme tvrzení pro $n \geq 2$. Základem indukce je platnost vztahu pro $n = 2$ a $n = 3$ (pro $n > 3$ závisí $T(n)$ jen na $T(2)$ a $T(3)$). Dosazením zjistíme $T(2) = 4$ a $T(3) = 5$; volba $c \geq 2$ zajistí $T(2) \leq c \cdot 2\log 2$ i $T(3) \leq c \cdot 3\log 3$.

### Metoda rekurzivního stromu

> **Metoda rekurzivního stromu** $\Rightarrow$ tzv. rozbalení rekurze.

Zápisem stromu počítáme složitosti jednotlivých volání a sčítáme úrovně $\Rightarrow$ součet složitostí míří k výsledku. Lze použít jako odhad rekurentní rovnice i pro přesné počítání.

**Příklad** $T(n) = 3T(\lfloor n/4 \rfloor) + cn^2$ (předpokládáme, že $n$ je mocnina $4$):

![[metoda-rekurzivniho-stromu.png|586]]

Práce po úrovních tvoří **geometrickou řadu** s kvocientem $\tfrac{3}{16} < 1$, takže dominuje kořen:

$$T(n) = cn^2 \sum_{i=0}^{\log_4 n - 1} \Big(\tfrac{3}{16}\Big)^i + \Theta(n^{\log_4 3}) = O(n^2).$$

### Kuchařková věta (Master theorem)

Funguje jen tehdy, je-li funkce v požadovaném tvaru. Nechť $a \geq 1$, $b > 1$ a $c \geq 0$ jsou konstanty a $T(n)$ je definována na nezáporných číslech rekurentní rovnicí

$$T(n) = aT(n/b) + f(n), \qquad f(n) \in \Theta(n^c),$$

kde:

- **$a$** je počet podproblémů, na které se problém rozloží v každé iteraci,
- **$b$** je faktor zmenšení problému,
- **$c$** je mocnina složitosti rozdělení problému.

Potom platí:

$$T(n) \in \begin{cases} \Theta(n^c) & \text{když } a < b^c & (\text{případ 1}), \\ \Theta(n^c \log n) & \text{když } a = b^c & (\text{případ 2}), \\ \Theta(n^{\log_b a}) & \text{když } a > b^c & (\text{případ 3}). \end{cases}$$

# Řadící algoritmy

> **Řadící algoritmy** berou na vstupu posloupnost prvků a jejich cílem je tuto posloupnost seřadit.

- **Stabilní** řadící algoritmus nemění při řazení vzájemné pořadí stejných prvků.
- **In situ** algoritmus modifikuje vstupní pole (není čistý), zato má nižší prostorovou složitost.
- **Přirozený** řadicí algoritmus dokáže rychleji zpracovat již částečně seřazenou posloupnost (insert sort, bubble sort nebo upravený merge sort).

| Algoritmus | nejhorší případ | průměrný případ |
|---|---|---|
| řazení vkládáním (insertion) | $\Theta(n^2)$ | $\Theta(n^2)$ |
| řazení výběrem (selection) | $\Theta(n^2)$ | $\Theta(n^2)$ |
| řazení sléváním (merge) | $\Theta(n\log n)$ | $\Theta(n\log n)$ |
| řazení haldou (heap) | $\Theta(n\log n)$ | $\Theta(n\log n)$ |
| řazení rozdělováním (quick) | $\Theta(n^2)$ | $\Theta(n\log n)$ |
| řazení počítáním (counting) | $\Theta(k+n)$ | $\Theta(k+n)$ |
| číslicové řazení (radix) | $\Theta(d(n+k))$ | $\Theta(d(n+k))$ |
| přihrádkové řazení (bucket) | $\Theta(n^2)$ | $\Theta(n)$ |

## Insertion sort (vkládáním)

In situ a **stabilní**. Bere prvky z neseřazené části a vkládá je na správné místo do seřazené části seznamu.

## Selection sort (výběrem)

In situ, **není stabilní**. Odebírá maximum / minimum a zařazuje jej na konec seřazeného seznamu.

## Merge sort (sléváním)

**Není in situ**, je **stabilní**, **asymptoticky časově optimální**. Patří mezi rozděl a panuj.

![[merge-sort.png|349]]

```java
// sliti dvou setridenych poli do jednoho
public static void merge(int[] list, int[] left, int[] right) {
    int i = 0;
    int j = 0;
    // dokud nevyjedeme z jednoho z poli
    while ((i < left.length) && (j < right.length)) {
        // dosazeni toho mensiho prvku z obou poli a posunuti indexu
        if (left[i] < right[j]) {
            list[i + j] = left[i];
            i++;
        } else {
            list[i + j] = right[j];
            j++;
        }
    }
    // doliti zbytku z nevyprazdneneho pole
    if (i < left.length) {
        while (i < left.length) {
            list[i + j] = left[i];
            i++;
        }
    } else {
        while (j < right.length) {
            list[i + j] = right[j];
            j++;
        }
    }
}

// samotne trideni
public static void merge_sort(int[] list) {
    if (list.length <= 1) // podminka rekurze
        return;
    int center = list.length / 2;        // stred pole
    int[] left = new int[center];        // vytvoreni a naplneni leveho pole
    for (int i = 0; i < center; i++)
        left[i] = list[i];
    // vytvoreni a naplneni praveho pole
    int[] right = new int[list.length - center];
    for (int i = center; i < list.length; i++)
        right[i - center] = list[i];
    merge_sort(left);  // rekurzivni zavolani na obe nova pole
    merge_sort(right);
    merge(list, left, right); // sliti poli
}
```

## Heapsort (haldou)

In situ, **není stabilní**, **asymptoticky časově optimální**.

- Nalijeme data do haldy a pak z ní odebíráme maximum / minimum do seřazeného seznamu.

## Quicksort (rozdělováním)

Vlastnosti závisí na implementaci, průměrná složitost je $\Theta(n\log n)$ (vhodné v praxi). Patří mezi rozděl a panuj.

- V poli zvolíme prvek (**pivot**). Poté přehazujeme prvky tak, aby před pivotem byly menší prvky a za ním větší. Na obou podčástech opakujeme.

Pseudokód (**Lomutovo schéma** – pivotem je poslední prvek):

```
function QuickSort(A, left, right):
    if left < right then
        m = Partition(A, left, right)   // pivot je teď na své finální pozici m
        QuickSort(A, left, m - 1)       // seřaď menší prvky nalevo
        QuickSort(A, m + 1, right)      // seřaď větší prvky napravo

function Partition(A, left, right):
    pivot = A[right]        // pivotem je poslední prvek
    i = left - 1            // i = poslední pozice menších prvků
    for j = left to right - 1 do
        if A[j] <= pivot then
            i = i + 1
            swap(A[i], A[j])    // přesuň menší prvek doleva
    swap(A[i + 1], A[right])    // pivot doprostřed mezi menší a větší
    return i + 1               // vrať novou pozici pivotu
```

## Nekomparativní řazení

> **Algoritmy, které neporovnávají** $\Rightarrow$ counting sort, radix sort, bucket sort.

Řadí čísla počítáním / pravděpodobností, jsou velmi rychlé na GPU a mají **lineární složitost**.

- **Counting sort** řadí čísla podle počtů jejich výskytů $\Rightarrow$ spočítá výskyt každého prvku a následně složí výsledek podle pořadí prvků.
- **Radix sort** — „radix" je počet unikátních číslic v soustavě (pro desítkovou $= 10$).
  - Třídí čísla podle jejich číslic, od nejméně signifikantních po nejvíce signifikantní.
  - Až proiteruje všechny číslice, jsou čísla roztříděná $\Rightarrow$ máme výsledek.
- **Bucket sort** rozděluje vstupní pole do **přihrádek** (kyblíčků) reprezentujících rozsahy, do kterých prvky spadají. Na přihrádkách pak může volat jiný řadicí algoritmus nebo sebe rekurzivně.
  - Výsledek nakopíruje do výstupního pole.
  - Umožňuje optimalizovat řazení obrovských dat — držet v paměti jen určitý počet přihrádek a zbytek mít na disku. Lze paralelizovat.
  - Složitost $O(m \cdot C(n/m))$.

# Otázky

**1.** Co je to rekurze? Jaké jsou její výhody / nevýhody? Co iterativní varianta? Co tail-rekurze?

> **Odpověď:** **Rekurze** je definice funkce s využitím sebe sama; iteruje voláním sebe sama až k **zarážce**. **Výhody**: čitelný a intuitivní zápis (prohledávání grafů, Fibonacci). **Nevýhody**: vyšší paměťová náročnost (riziko **stack overflow**), těžší odhad složitosti, často pomalejší. Každou rekurzi lze převést na **iterativní** variantu (explicitním zásobníkem či cyklem). **Tail-rekurze** má volání až na konci funkce a lze ji nahradit jednoduchým cyklem — některé kompilátory to dělají automaticky.

**2.** Co je to matematická indukce? Jak souvisí s rekurzí?

> **Odpověď:** **Indukce** je technika důkazu tvrzení o nekonečných posloupnostech: ověříme **bázi** $T(k_0)$ a **indukční krok** ($T(k) \Rightarrow T(k+1)$). Souvisí s rekurzí, ale jde **opačným směrem**: rekurze jde od složitého problému k bázi, indukce bází začíná. Obě nedokazují/neřeší rovnou počáteční problém — pravdivost (řešení) jednoho kroku se přenáší na další.

**3.** Co je to algoritmus a z čeho se skládá? Co je invariant cyklu? Co je parciální korektnost a konvergence?

> **Odpověď:** **Algoritmus** je konečná posloupnost elementárních výpočetních kroků; má vstupní podmínku, invariant cyklu a výstupní podmínku. **Invariant cyklu** je tvrzení platící před a po každé iteraci. **Konvergence (úplnost)** znamená, že výpočet pro každý platný vstup skončí. **Parciální korektnost** znamená, že pokud výpočet skončí, splňuje výsledek výstupní podmínku. **Totální korektnost** $=$ úplnost $+$ parciální korektnost.

**4.** Vysvětli rozdíl mezi selection sortem a insertion sortem. Který z nich je in situ?

> **Odpověď:** **Insertion sort** bere prvky z neseřazené části a **vkládá** je na správné místo do seřazené části (je stabilní). **Selection sort** opakovaně **vybírá** minimum/maximum a zařazuje jej na konec seřazené části (není stabilní). **Oba jsou in situ** a oba mají složitost $\Theta(n^2)$.

**5.** Popiš princip Rozděl a panuj. Jaké jsou jeho výhody? Který řadicí algoritmus ho používá? Je stabilní? Jaká je jeho složitost?

> **Odpověď:** **Rozděl a panuj** rekurzivně dělí problém na triviální podproblémy, vyřeší je a zkombinuje (Divide $\Rightarrow$ Conquer $\Rightarrow$ Combine). **Výhody**: lepší asymptotická efektivnost, paralelizovatelnost, lepší práce s cache. Používá ho **merge sort** ($\Theta(n\log n)$, **stabilní**, není in situ) i **quick sort** ($\Theta(n\log n)$ průměrně).

**6.** Které řadicí algoritmy jsou asymptoticky optimální? Jaké znáš nekomparativní řadicí algoritmy a jak fungují?

> **Odpověď:** Asymptoticky optimální (mezi porovnávacími, $\Theta(n\log n)$) jsou **merge sort** a **heapsort**. **Nekomparativní** algoritmy ($O(n)$): **counting sort** (počítá výskyty hodnot), **radix sort** (třídí podle číslic od nejméně signifikantní) a **bucket sort** (rozdělí prvky do přihrádek dle rozsahu a ty doseřadí).

# Příklady

**1.** Vyřešte rekurentní rovnici Hanojských věží $T(n) = 2T(n-1) + 1$ pro $n > 1$, $T(1) = 1$.

> **Odpověď:** $T(n) = 2^n - 1$. Řešíme **zpětným dosazováním**:
> $$\begin{aligned} T(n) &= 2T(n-1) + 1 \\ &= 2[2T(n-2)+1] + 1 = 2^2 T(n-2) + 2 + 1 \\ &= 2^3 T(n-3) + 2^2 + 2 + 1 = \cdots \\ &= 2^i T(n-i) + 2^{i-1} + \cdots + 2 + 1 = 2^i T(n-i) + 2^i - 1 \\ &= 2^{n-1} T(1) + 2^{n-1} - 1 = 2^{n-1} + 2^{n-1} - 1 = 2^n - 1. \end{aligned}$$

**2.** Odhadněte metodou rekurzivního stromu řešení $T(n) = 3T(\lfloor n/4 \rfloor) + cn^2$.

> **Odpověď:** $T(n) = O(n^2)$. Práce na úrovni $i$ je $\big(\tfrac{3}{16}\big)^i cn^2$; součet této klesající geometrické řady je konstantní násobek $cn^2$ a listy přispějí $\Theta(n^{\log_4 3})$, což je řádově méně. Dominuje kořen $\Rightarrow O(n^2)$. (Master theorem: $a = 3$, $b = 4$, $c = 2$, $a < b^c$, tedy případ 1 $\Rightarrow \Theta(n^2)$.)

**3.** Rozhodněte a zdůvodněte, zda jsou následující tvrzení o $3n^5 - 16n + 2$ pravdivá.

> **Odpověď:**
> - a) $\in \mathcal{O}(n^5)$ — **ano** (rozhodující člen $n^5$).
> - b) $\in \mathcal{O}(n)$ — **ne** ($n^5$ je jistě větší než $n$).
> - c) $\in \mathcal{O}(n^{17})$ — **ano** ($n^{17}$ je větší než $n^5$, horní odhad platí).
> - d) $\in \Omega(n^5)$ — **ano**.
> - e) $\in \Theta(n^5)$ — **ano** (zřejmé z a) a d)).
> - f) $\in \Theta(n)$ — **ne** ($n^5$ roste rychleji než $n$).

# Otázky z ISu

> Otázky pocházejí ze společné testové sekce *Algoritmy a datové struktury*. U tvrzení typu ano/ne nebyla v exportu z ISu vyznačena správná odpověď — je doplněna podle standardních výsledků.

**1.** Je následující tvrzení pravdivé? „Řazení haldou (heapsort) je in situ (in-place, s konstantní extra pamětí)."
- ✅ ano
- ne

**2.** Je následující tvrzení pravdivé? „Řazení sléváním (mergesort) je in situ (in-place, s konstantní extra pamětí)."
- ano
- ✅ ne

**3.** Je následující tvrzení pravdivé? „Řazení haldou (heapsort) je stabilní."
- ano
- ✅ ne

**4.** Mějme následující program pro výpočet faktoriálu: `i = 0; f = 1; while i < n do i = i + 1; f = f * i end while; return f`. Která z následujících formulí je invariantem cyklu while v tomto programu?
- ✅ $f = i!$
- $f = n!$
- $f = n! / i!$
- žádná z nabízených odpovědí
- $f = f \cdot i$

**5.** Je dáno pole $A$ obsahující $n$ nenulových celých čísel. Existuje algoritmus s časovou složitostí v $O(n)$ a s konstantní extra pamětí, který najde a vypíše takovou permutaci prvků $A$, že všechna záporná čísla z $A$ předcházejí všem kladným číslům?
- ✅ ano
- ne

**6.** Uvažme analogii binárního vyhledávání prvku $x$ v seřazeném poli $A[1, \ldots, n]$. Namísto rozdělení na poloviny rozdělíme $A$ na třetiny (porovnáme $x$ s $A[\lfloor n/3\rfloor]$ a $A[\lfloor 2n/3\rfloor]$ a rekurzivně vyhledáváme v jedné z třetin) — „ternární vyhledávání". Je pravda, že ternární vyhledávání má časovou složitost v $\mathcal O(\log_2 n)$?
- ✅ ano
- ne

**7.** Těsná asymptotická dolní hranice pro složitost řazení pomocí porovnávání je určena funkcí:
- $n^2$
- ✅ $n \log n$
- $n$
- Dolní hranice není známa.

**8.** Mějme problém $P$ a algoritmus $A$, který tento problém řeší. Dále víme, že časová složitost problému $P$ je kvadratická. Které z následujících tvrzení určitě neplatí?
- Časová složitost algoritmu $A$ patří do třídy $\Theta(n^2)$.
- Časová složitost algoritmu $A$ patří do třídy $\mathcal O(2^n)$.
- Časová složitost algoritmu $A$ patří do třídy $\Theta(2^n)$.
- ✅ Časová složitost algoritmu $A$ patří do třídy $\mathcal O(n \log n)$.

**9.** Je následující tvrzení pravdivé? „Stabilní řadící algoritmus nemění pořadí prvků vstupní posloupnosti."
- ano
- ✅ ne

**10.** Který z uvedených řadicích algoritmů má nejlepší časovou složitost, pokud předpokládáme, že vstupní pole už je seřazeno?
- ✅ insertsort
- mergesort
- heapsort
- quicksort

**11.** Je následující tvrzení pravdivé? „Řazení sléváním (mergesort) je stabilní."
- ✅ ano
- ne

**12.** Je následující tvrzení pravdivé? „Stabilní řadící algoritmus nemění pořadí stejných prvků vstupní posloupnosti."
- ✅ ano
- ne

**13.** Které z následujících tvrzení je pravdivé?
- $2^{3n} \in \Theta(3^{2n})$
- žádné z uvedených tvrzení
- $2^{3n} \in \omega(3^{2n})$
- ✅ $2^{3n} \in o(3^{2n})$

**14.** Když $f(n) \in \mathcal O(g(n))$ a $g(n) \in \mathcal O(h(n))$, tak $f(n) \in \mathcal O(h(n))$.
- ✅ ano
- ne
