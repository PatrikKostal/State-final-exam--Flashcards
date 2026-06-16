# 2. Základy matematické analýzy

> **Zadání:** Relace a zobrazení, vlastnosti reálných funkcí, polynomy, spojité funkce a limity, derivace, neurčitý a určitý integrál, geometrický význam. (IB000, MB142)

# Relace ("vztah")

> **Relace** mezi množinami $A_1, A_2, \dots, A_k$ (pro $k \in \mathbb{N}$) je libovolná podmnožina kartézského součinu
> $$R \subseteq A_1 \times A_2 \times \cdots \times A_k.$$

Pokud $A_1 = A_2 = \cdots = A_k = A$, hovoříme o **$k$-ární relaci $R$ na $A$**. Speciálně tak mluvíme o **binární** ($k = 2$), **ternární** ($k = 3$) nebo **unární** ($k = 1$) relaci.

## Klasifikace

Relace lze rozdělit podle počtu množin kartézského součinu:

- **Unární relací** nazveme každou podmnožinu množiny $M$.
- **Binární relací** nazveme každou množinu uspořádaných dvojic $[x, y] \in M^2$.
- **Ternární relací** nazveme každou množinu uspořádaných trojic $[x, y, z] \in M^3$.
- Ostatní relace označujeme buď souhrnným názvem **$n$-ární relace**, nebo konkrétně podle vzoru: kvartární, pentární, sextární, septární, oktární, nonární atp.

## Zobrazení

> **Zobrazení** $f : X \to Y$ z množiny $X$ do množiny $Y$ je binární relace, která ke každému prvku $x$ množiny $X$ přiřazuje nejvýše jeden prvek $y$ množiny $Y$ tak, že $[x, y] \in f$.

Pokud jde o číselné množiny, označujeme zobrazení jako **funkci**.

Zobrazení lze **skládat** $\Rightarrow f \circ g \Rightarrow f(g(x))$.

**Vlastnosti zobrazení:**
- **Injektivní** (prosté) – každý prvek oboru hodnot je mapován **nejvýše** jedním prvkem definičního oboru
- **Surjektivní** (zobrazení na) – každý prvek oboru hodnot je mapován **alespoň** jedním prvkem definičního oboru
- **Bijektivní** – každý prvek oboru hodnot je mapován **právě** jedním prvkem definičního oboru

![[vlastnosti-zobrazeni.png|362]]
# Funkce

**Funkce** je zobrazení mapující číselné prvky **definičního oboru** na prvky **oboru hodnot**.

- **Totální funkce** je funkce definující hodnotu pro každý prvek definičního oboru
- **Parciální funkce** nemusí mít definovanou hodnotu pro každý prvek definičního oboru
- **Prostá funkce** je jiný název pro injektivní funkci
- **Inverzní funkce** prohazuje $D_f$ a $H_f$ – pro výsledek původní funkce vrací výchozí hodnotu
	- Inverzní funkce existuje pouze tehdy, je-li původní funkce injektivní
- **Konstantní funkce** $\Rightarrow \forall x_1, x_2 \in M$ platí $f(x_1) = f(x_2)$

## Vlastnosti průběhu reálných funkcí

- **Definiční obor $D$** – množina přípustných hodnot argumentu (vstupní hodnoty)
- **Obor hodnot $H$** – množina přípustných hodnot $y$ (výstupní hodnoty)
- Průsečíky grafu funkce se souřadnými osami
- Body nespojitosti
- **Sudá**: $f(x) = f(-x)$ – souměrná podle osy $y$
- **Lichá**: $-f(x) = f(-x)$ – souměrná podle počátku soustavy
- **Periodická funkce** vždy splňuje $f(x + p) = f(x)$
	- Jediná funkce sudá a lichá zároveň je $f(x) = 0$
	- Součet **lichých** funkcí $\Rightarrow$ **lichá** funkce
	- Součet **sudých** funkcí $\Rightarrow$ **sudá** funkce
- **Omezenost** (ohraničení)
	- shora – existuje číslo **větší** než všechny z $H$
		- Funkce $f$ je shora omezená, pokud existuje $A \in \mathbb{R}$ takové, že pro všechna $x \in D(f)$ platí $A > f(x)$.
	- zdola – existuje číslo **menší** než všechny z $H$
		- Funkce $f$ je zdola omezená, pokud existuje $A \in \mathbb{R}$ takové, že pro všechna $x \in D(f)$ platí $A < f(x)$.

## Vlastnosti z 1. derivace

- Pokud je 1. derivace $0$, pak je funkce konstantní $\Rightarrow$ tečna je rovnoběžná s osou $x$
- **Intervaly monotonie** – funkce je klesající / rostoucí / neklesající / nerostoucí
	- **Stacionární body** ($f' == 0$) dělí rostoucí / klesající úseky
		- **Rostoucí** $\to f' > 0$
		- **Klesající** $\to f' < 0$
		- Nerostoucí, neklesající…
		- **Ryze monotónní** $\Rightarrow$ buď rostoucí, nebo klesající
- **Lokální extrémy** $\Rightarrow$ vyskytují se ve stacionárních bodech, kde se zároveň mění směr růstu funkce
	- 1\. derivace je v tom bodě $0$ nebo nedefinovaná
	- ve 2. derivaci je tento bod $< 0$ (lokální maximum), $> 0$ (lokální minimum), $= 0$ (neprůkazné)
	- pokud existuje **jediné** minimum/maximum, říkáme mu **ostré**

## Vlastnosti z 2. derivace

- **Prohnutí**
	- **Konvexní** $\to f'' > 0$
	- **Konkávní** $\to f'' < 0$
- **Inflexní body** $\to$ body, kde se střídá konvexnost a konkávnost
	- Pokud $f''(x) = 0$ a zároveň $f'''(x) \neq 0$, pak se jedná o inflexní bod

![[konvexni-konkavni.png|297]]

**Asymptota** je přímka, jejíž vzdálenost od křivky funkce se s rostoucí hodnotou zmenšuje.
- Nevlastní limita má tzv. asymptotu bez směrnice

# Polynom (mnohočlen)

Polynom je výraz složený z proměnných, sčítání, odčítání a násobení (dělení nesmí).

> **Polynom** je funkce $P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$, kde $a_n \neq 0$ a $a_0, \dots, a_n \in \mathbb{R}$.

- Jednotlivé prvky rovnice jsou tzv. **koeficienty**
- **Kořenem polynomu** je $x$, pro které $P(x) = 0$
- Rozklad na kořenové činitele: např. $(x^2 - 1) \Rightarrow (x - 1)(x + 1)$
- Polynomy druhého řádu řešíme kvadratickou rovnicí

## Hornerovo schéma

Slouží k nalezení (celočíselných) kořenů polynomu a k jeho rozkladu na součin kořenových činitelů.

**Příklad.** Určete celočíselné kořeny polynomu $P(x) = x^5 + 9x^4 + 26x^3 + 20x^2 - 24x - 32$.

Celočíselnými kořeny mohou být pouze dělitelé čísla $a_0 = -32$, tedy: $\pm 1, \pm 2, \pm 4, \pm 8, \pm 16, \pm 32$. Pomocí Hornerova schématu zjišťujeme, zda je některé z nich skutečně kořenem (postupujeme od menších čísel k větším):

|     | $1$ | $9$  | $26$ | $20$ | $-24$        | $-32$ |
| --- | --- | ---- | ---- | ---- | ------------ | ----- |
| $1$ | $1$ | $10$ | $36$ | $56$ | $32$         | $0$   |
| 1   | 1   | 11   | 47   | 103  | 135 $\neq$ 0 |       |

Číslo $1$ je tedy kořenem a platí:
$$x^5 + 9x^4 + 26x^3 + 20x^2 - 24x - 32 = (x - 1)(x^4 + 10x^3 + 36x^2 + 56x + 32).$$

Z třetího řádku vyplývá, že číslo 1 je pouze jednoduchým kořenem.

Opakováním postupu na „zbytkovém" polynomu zjistíme, že $-2$ je (alespoň dvojnásobným) kořenem, a po rozkladu zbylé kvadratické rovnice dostaneme celkový rozklad:
$$P(x) = (x - 1)(x + 2)^3 (x + 4).$$

- Pokud vyjde kořen $0$, ale při kontrole polynom nevrací $0$, kořen neexistuje.

# Limity

> **Limita** je matematická konstrukce vyjadřující, že se hodnoty zadané funkce nebo posloupnosti blíží libovolně blízko k nějakému bodu. Právě tento bod je pak označován jako **limita**.

- **Vlastní limita** $\Rightarrow$ blíží se ke konkrétnímu číslu. Jde vyčíslit.
- **Nevlastní limita** $\Rightarrow$ blíží se k nekonečnu. Nekonečna se nazývají **nevlastní body**.

> **Definice (limita).** Buď $x_0, L \in \mathbb{R}^*$. Funkce $f$ má v bodě $x_0$ limitu $L$, píšeme
> $$\lim_{x \to x_0} f(x) = L,$$
> pokud pro každé okolí $\mathcal{O}(L)$ bodu $L$ existuje okolí $\mathcal{O}(x_0)$ bodu $x_0$ tak, že pro všechna $x \in \mathcal{O}(x_0) \setminus \{x_0\}$ je $f(x) \in \mathcal{O}(L)$.

**Vlastnosti limit:**
- Funkce $f$ má v bodě $x_0 \in \mathbb{R}^*$ nejvýše jednu limitu.
- Má-li $f$ vlastní limitu $L \in \mathbb{R}$ v bodě $x_0 \in \mathbb{R}^*$, potom je funkce $f$ na nějakém (ryzím) okolí bodu $x_0$ ohraničená.
- Limita existuje, právě když existují obě jednostranné limity a jsou si rovny:
$$\lim_{x \to x_0} f(x) = L \iff \lim_{x \to x_0^-} f(x) = L = \lim_{x \to x_0^+} f(x).$$

- **Okolí bodu** je množina bodů blízko určitého bodu $\Rightarrow$ definovaného intervalem.
- **Ryzí okolí** je okolí bodu bez samotného bodu.

# Spojitost

> **Spojitá funkce** je, když se každý její funkční bod rovná vlastní limitě v tomto bodě.

Funkce $f$ je spojitá v bodě $x_0 \in \mathbb{R}$, jestliže v tomto bodě existuje vlastní limita $L$, existuje funkční hodnota $f(x_0)$ a tato dvě čísla jsou si rovna:
$$\lim_{x \to x_0} f(x) = f(x_0).$$

Spojitost zprava a spojitost zleva v bodě $x_0$ se definuje stejně, ale s pomocí jednostranné limity:
$$\lim_{x \to x_0^+} f(x) = f(x_0), \qquad \lim_{x \to x_0^-} f(x) = f(x_0).$$

**Vlastnosti spojitých funkcí:**
- Jsou-li funkce $f$ a $g$ spojité v bodě $x_0$, pak jsou zde spojité i funkce $f \pm g$, $f \cdot g$ a $\frac{f}{g}$ (pro $g(x_0) \neq 0$).
- **Záměnnost limitního přechodu a funkce:** Nechť $x_0 \in \mathbb{R}^*$. Je-li $\lim_{x \to x_0} g(x) = M$ a je-li funkce $f$ spojitá v bodě $y_0 = M$, potom
$$\lim_{x \to x_0} f(g(x)) = f\!\left(\lim_{x \to x_0} g(x)\right) = f(M).$$
- Je-li funkce $g$ spojitá v bodě $x_0$ a funkce $f$ spojitá v bodě $y_0 = g(x_0)$, potom je složená funkce $f \circ g$ spojitá v bodě $x_0$.

## Body nespojitosti

**Body nespojitosti** $\Rightarrow$ funkce není pro daný bod definovaná.

- **Bod odstranitelné nespojitosti**
	- Funkce má v daném bodě totožné obě vlastní jednostranné limity
	- Spočítám limitu a dodefinuji ji jako funkční bod
	$$\lim_{x \to a^+} f(x) = \lim_{x \to a^-} f(x), \quad \text{ale} \quad \lim_{x \to a^+} f(x) \neq f(a) \neq \lim_{x \to a^-} f(x)$$
- **Bod nespojitosti 1. druhu – skok**
	- Funkce má v daném bodě rozdílné vlastní jednostranné limity
	$$\lim_{x \to a^+} f(x) \neq \lim_{x \to a^-} f(x)$$
- **Bod nespojitosti 2. druhu** $\to$ alespoň jedna jednostranná limita je nevlastní

![[body-nespojitosti.png|394]]
# Diferenciální počet

Diferenciální počet se zabývá studiem změn funkcí. Hlavním nástrojem je **derivace**.

Reálná čísla jsou obrazy bodů na přímce.

**Závora** množiny je prvek, který je větší (**horní závora**) nebo menší (**dolní závora**) než všechny ostatní prvky množiny. **Závora nemusí být součástí množiny** (může být nadhodnocená / podhodnocená).

> **Supremum a infimum v $\mathbb{R}$.** Nechť je dána neprázdná množina $A \subseteq \mathbb{R}$. Prvek $b \in \mathbb{R}$ nazveme horní závorou množiny $A$, pokud $\forall x \in A : x \leq b$. Obdobně se definuje dolní závora množiny $A$ jako prvek $a \in \mathbb{R}$ s vlastností $a \leq x$ pro všechny $x \in A$.

- **Supremum** – nejmenší horní závora množiny (tedy největší prvek)
- **Infimum** – největší dolní závora množiny (tedy nejmenší prvek)
- **Interval** – podmnožina reálných čísel ohraničená dvěma krajními body
	- otevřený $(a, b)$ – krajní body **nepatří** do intervalu
	- uzavřený $[a, b]$ – krajní body **patří** do intervalu
	- polouzavřený $[a, b)$ – pouze $a$ **patří** do intervalu
	- nekonečný interval $(-\infty, \infty)$, $[a, \infty)$, $(a, \infty)$, $(-\infty, b]$, $(-\infty, b)$ – neohraničený zdola nebo shora

## Derivace

> **Bod derivace** je sklonem tečny ke grafu funkce $\Rightarrow$ směrnice tečny ke křivce funkce.

> **Definice (derivace).** Nechť $x_0 \in \mathcal{D}(f)$. Pokud existuje limita
> $$\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} \quad \text{(vlastní nebo nevlastní)},$$
> nazýváme tuto limitu derivací funkce $f$ v bodě $x_0$ a značíme $f'(x_0)$. Je-li tato limita nevlastní ($\pm\infty$), nazývá se $f'(x_0)$ nevlastní derivací funkce $f$ v bodě $x_0$.

- Intuitivně: 2 body na křivce svírají sečnu, sklon $=$ $\frac{f(x + \Delta x) - f(x)}{\Delta x}$
	- Pokud se k sobě budou ty 2 body limitně blížit, sečna se překlopí v tečnu.
- Pokud má funkce v bodě derivaci, pak je v tomto bodě spojitá.

> **Derivace funkce** definuje změnu (růst či pokles) její hodnoty v poměru ke změně jejího argumentu, pro velmi malé změny argumentu.

Reálné použití třeba ve fyzice $\Rightarrow$ rychlost je derivace dráhy a zrychlení derivace rychlosti.

**Kladná / záporná derivace** říkáme derivaci, která je na celém svém oboru hodnot rostoucí / klesající.

### Pravidla derivací

| $f$ | $f'$ | $\mathcal{D}(f)$ | Pozn. |
| --- | --- | --- | --- |
| $\text{const.}$ | $0$ | $\mathbb{R}$ | |
| $x^n$ | $n x^{n-1}$ | $\mathbb{R}$ | $n \in \mathbb{N}$ |
| $x^a$ | $a x^{a-1}$ | $x > 0$ | $a \in \mathbb{R}$ |
| $e^x$ | $e^x$ | $\mathbb{R}$ | |
| $a^x$ | $a^x \ln a$ | $\mathbb{R}$ | $a > 0$ |
| $\ln x$ | $\frac{1}{x}$ | $x > 0$ | |
| $\log_a x$ | $\frac{1}{x \ln a}$ | $x > 0$ | $a \in (0,1) \cup (1, +\infty)$ |
| $\sin x$ | $\cos x$ | $\mathbb{R}$ | |
| $\cos x$ | $-\sin x$ | $\mathbb{R}$ | |
| $\operatorname{tg} x$ | $\frac{1}{\cos^2 x}$ | $x \neq \frac{\pi}{2} + k\pi$ | |
| $\operatorname{cotg} x$ | $-\frac{1}{\sin^2 x}$ | $x \neq k\pi$ | |
| $\arcsin x$ | $\frac{1}{\sqrt{1 - x^2}}$ | $\langle -1, 1\rangle$ | v $\pm 1$: jen jednostranné derivace |
| $\arccos x$ | $-\frac{1}{\sqrt{1 - x^2}}$ | $\langle -1, 1\rangle$ | v $\pm 1$: jen jednostranné derivace |
| $\operatorname{arctg} x$ | $\frac{1}{1 + x^2}$ | $\mathbb{R}$ | |
| $\operatorname{arccotg} x$ | $-\frac{1}{1 + x^2}$ | $\mathbb{R}$ | |
| $\sinh x$ | $\cosh x$ | $\mathbb{R}$ | |
| $\cosh x$ | $\sinh x$ | $\mathbb{R}$ | |

**Pravidla počítání derivací:**
- **Linearita**: $(af + bg)' = af' + bg'$ pro funkce $f, g$ a konstanty $a, b$
	- speciálně platí $(af)' = af'$ a $(f + g)' = f' + g'$
- **Derivace součinu**: $(fg)' = f'g + fg'$
- **Derivace podílu**: $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$ (pro $g \neq 0$)
- **Derivace složené funkce**: $f(x) = h(g(x)) \Rightarrow f'(x) = h'(g(x)) \cdot g'(x)$

### Základní vzorce (limity)

$$\lim_{x \to 0} \frac{\sin x}{x} = 1, \qquad \lim_{x \to 0} \frac{e^x - 1}{x} = 1, \qquad \lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1,$$
$$\lim_{x \to 0} \frac{1 - \cos x}{x} = 0, \qquad \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e.$$

**Goniometrické funkce:**

| | $\sin$ | $\cos$ | $\operatorname{tg}$ | $\operatorname{cotg}$ |
| --- | --- | --- | --- | --- |
| $0$ | $0$ | $1$ | $0$ | $+\infty$ |
| $\pi/6$ | $1/2$ | $\sqrt{3}/2$ | $1/\sqrt{3}$ | $\sqrt{3}$ |
| $\pi/4$ | $\sqrt{2}/2$ | $\sqrt{2}/2$ | $1$ | $1$ |
| $\pi/3$ | $\sqrt{3}/2$ | $1/2$ | $\sqrt{3}$ | $1/\sqrt{3}$ |
| $\pi/2$ | $1$ | $0$ | $+\infty$ | $0$ |
| $\pi$ | $0$ | $-1$ | $0$ | není |
| | lichá | sudá | lichá | lichá |

**Cyklometrické funkce:**

| | $\arcsin$ | $\arccos$ | $\operatorname{arctg}$ | $\operatorname{arccotg}$ |
| --- | --- | --- | --- | --- |
| $+\infty$ | | | $\pi/2$ | $0$ |
| $-\infty$ | | | $-\pi/2$ | $0$ |
| parita | lichá | nic | lichá | lichá |
| def. obor | $\langle -1, 1\rangle$ | $\langle -1, 1\rangle$ | $\mathbb{R}$ | $\mathbb{R}$ |
| obor hodnot | $[-\pi/2, \pi/2]$ | $[0, \pi]$ | $(-\pi/2, \pi/2)$ | $(0, \pi)$ |

**Extra:**
- $\ln()$ nemůže brát záporná čísla
- $\ln(0) \to -\infty$
- $\ln(1) \to 0$
- $\ln$ není lichý
- $e^0 = 1$
- $e^{\ln 2} = 2$ apod.
- $e^{-\ln 2} = \frac{1}{2}$ apod.
- $e^\infty = \infty$
- $e^{-\infty} = 0$

**Neurčité výrazy:**
- $\infty - \infty$ = neurčitý výraz (nutná úprava – vytknout, sloučit zlomky apod.)
- $\infty / 0 = \infty$
- $0 / \infty = 0$
- $0/0$ = příklad by měl jít upravit, vytknout a pak dát jiný výsledek
- $\infty / \infty$ = příklad by měl jít upravit, vytknout a pak dát jiný výsledek
- $0$ na mocninu $==$ neexistuje
- $1/{+0} = +\infty$, $\quad 1/{-0} = -\infty$

**Parciální derivace** $\Rightarrow$ pokud má funkce více proměnných, pak derivujeme jen podle jedné z nich a ostatní bereme jako konstanty.

**Rolleova věta** $\Rightarrow$ pokud je funkce v daném intervalu spojitá, pak existuje bod, pro který je derivace rovna $0$ $\to$ bod, kdy je tečna rovnoběžná s osou $x$.

## l'Hospitalovo pravidlo

- Vhodné pro úpravu neurčitých vý∑razů.
$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}.$$
- Funkce musí být nenulové v okolí čísla $a$.
- Musí platit právě jedna z uvedených podmínek:
	- $\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$
	- $\lim_{x \to a} f(x) = \pm\infty$ a $\lim_{x \to a} g(x) = \pm\infty$

## Taylorův polynom

Taylorův polynom je mocninná řada.

Používá se **k polynomiální aproximaci funkcí**, protože platí, že všechny derivace Taylorova polynomu až do stupně $n$ mají ve středu polynomu stejné funkční hodnoty jako odpovídající derivace funkce $f$.

$$T(x) := f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2}(x - x_0)^2 + \frac{f'''(x_0)}{3!}(x - x_0)^3 + \cdots + \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n.$$

Pokud jdu od $x_0 = 0$ $\to$ říká se tomu **Maclaurinova řada**. Obecně:

$$\sum_{k=0}^{\infty} \frac{f^{(k)}(a)}{k!}(x - a)^k.$$

## Diferenciál funkce

> **Diferenciálem funkce** je $\mathrm{d}f(x_0) = f'(x_0) \cdot h$, tj. $\mathrm{d}y = f'(x)\,\mathrm{d}x$.

- Obyčejnou **diferenciální rovnicí** nazýváme rovnici, v níž se vyskytuje derivace neznámé funkce jedné nezávislé proměnné.
	- **Řád diferenciální rovnice** $\Rightarrow$ nejvyšší derivace v rovnici
- Diferenciál určuje přírůstek funkční hodnoty na tečně.

![[diferencial.png|228]]

# Integrál

## Určitý integrál (Riemannův integrál)

> Určuje plochu ohraničenou grafem funkce $f$ a osou $x$ na intervalu $[a, b]$.

Reprezentuje plochu mezi osami $a$, $b$ pod křivkou grafu. Lze ho vyčíslit:

$$P = \int_a^b f(x)\,\mathrm{d}x = \text{orientovaná plocha mezi grafem funkce } f \text{ a osou } x.$$

- $a$ – dolní mez integrálu (dolní odhad)
- $b$ – horní mez integrálu (horní odhad)
- Výsledek $==$ integrál v $b$ $-$ integrál v $a$

## Neurčitý integrál

> **Neurčitý integrál** funkce je množina jejích primitivních funkcí, lišících se v hodnotě přičítané konstanty.

**Primitivní funkce $F$** k funkci $f$ = když ji zderivujeme, dostaneme původní funkci $f$.

- Neurčitý integrál je opak derivace
- Určuje obsah pod celou křivkou původní funkce
- Nemá horní / dolní mez $\Rightarrow$ je definován pro všechna $x$.

## Základní integrační metody

Výsledkem integrace je **primitivní funkce**.

### Per partes

$$\int u'(x) \cdot v(x)\,\mathrm{d}x = u(x) \cdot v(x) - \int u(x) \cdot v'(x)\,\mathrm{d}x.$$

**Příklad:**
$$\int x \cos x\,\mathrm{d}x \quad \begin{vmatrix} u' = \cos x & u = \sin x \\ v = x & v' = 1 \end{vmatrix} = x \sin x - \int \sin x\,\mathrm{d}x = $$ $$x \sin x - (-\cos x) + C = \boxed{x \sin x + \cos x + C}.$$

### Substituční metoda

$$\int f(\varphi(x)) \cdot \varphi'(x)\,\mathrm{d}x = \int f(t)\,\mathrm{d}t \quad [= F(t) = F(\varphi(x))].$$

**Příklad:**
$$\int \frac{2x}{(x^2 + 1)^2}\,\mathrm{d}x \quad \begin{vmatrix} t = x^2 + 1 \\ \mathrm{d}t = 2x\,\mathrm{d}x \end{vmatrix} = \int \frac{1}{t^2}\,\mathrm{d}t = \int t^{-2}\,\mathrm{d}t = \frac{t^{-1}}{-1} + C = -\frac{1}{t} + C = \boxed{-\frac{1}{x^2 + 1} + C}.$$

# Otázky

**Co je to relace a jaké má klasifikace?**
> Relace mezi množinami $A_1, \dots, A_k$ je libovolná podmnožina kartézského součinu $R \subseteq A_1 \times \cdots \times A_k$. Klasifikujeme ji podle počtu množin (arity): **unární** ($k = 1$ – podmnožina $M$), **binární** ($k = 2$ – uspořádané dvojice), **ternární** ($k = 3$ – uspořádané trojice) a obecně **$n$-ární**.

**Jaké existují druhy zobrazení?**
> Podle toho, kolika prvky definičního oboru je mapován prvek oboru hodnot:
> - **Injektivní** (prosté) – nejvýše jedním prvkem,
> - **Surjektivní** (na) – alespoň jedním prvkem,
> - **Bijektivní** – právě jedním prvkem.

**Co je prostá funkce?**
> Prostá funkce je jiný název pro **injektivní** funkci – každý prvek oboru hodnot je mapován nejvýše jedním prvkem definičního oboru. Pouze pro prostou funkci existuje funkce inverzní.

**Jaké jsou typy monotónnosti funkce?**
> Z 1. derivace určujeme intervaly monotonie: funkce je **rostoucí** ($f' > 0$), **klesající** ($f' < 0$), **neklesající** a **nerostoucí**. Funkce **ryze monotónní** je buď rostoucí, nebo klesající. Hranice úseků tvoří **stacionární body** ($f' = 0$).

**Co je limita + definice?**
> Limita vyjadřuje, že se hodnoty funkce blíží libovolně blízko k nějakému bodu (tomuto bodu pak říkáme limita). Rozlišujeme **vlastní** (blíží se ke konkrétnímu číslu) a **nevlastní** (blíží se k nekonečnu).
>
> Buď $x_0, L \in \mathbb{R}^*$. Funkce $f$ má v bodě $x_0$ limitu $L$, píšeme $\lim_{x \to x_0} f(x) = L$, pokud pro každé okolí $\mathcal{O}(L)$ bodu $L$ existuje okolí $\mathcal{O}(x_0)$ bodu $x_0$ tak, že pro všechna $x \in \mathcal{O}(x_0) \setminus \{x_0\}$ je $f(x) \in \mathcal{O}(L)$.

**Definuj spojitou funkci.**
> Funkce $f$ je spojitá v bodě $x_0$, jestliže v tomto bodě existuje vlastní limita, existuje funkční hodnota $f(x_0)$ a tato dvě čísla jsou si rovna: $\lim_{x \to x_0} f(x) = f(x_0)$.

**Co je závora množiny?**
> Závora je prvek, který je větší (**horní závora**) nebo menší (**dolní závora**) než všechny prvky množiny; nemusí být jejím prvkem. Nejmenší horní závora je **supremum**, největší dolní závora je **infimum**.

**Jaké jsou základní integrační metody?**
> - **Per partes**: $\int u'(x) v(x)\,\mathrm{d}x = u(x) v(x) - \int u(x) v'(x)\,\mathrm{d}x$,
> - **Substituční metoda**: $\int f(\varphi(x)) \varphi'(x)\,\mathrm{d}x = \int f(t)\,\mathrm{d}t$.

# Příklady

**Limita** (typ $0/0$, l'Hospital nebo úprava):
$$\lim_{x \to 2} \frac{\frac{1}{x} - \frac{1}{2}}{x - 2} = -\frac{1}{4}.$$

**Derivace podílu:**
$$\left(\frac{x^2 + 1}{x^2 - 1}\right)' = \frac{-4x}{(x^2 - 1)^2}.$$

**Derivace složené funkce:**
$$\left(\sqrt{x^2 + x}\right)' = \frac{2x + 1}{2\sqrt{x^2 + x}}.$$

**Druhá derivace:**
$$\left(\sqrt{x}\right)'' = -\frac{1}{4x\sqrt{x}}.$$

**Integrál (per partes):**
$$\int x \ln x\,\mathrm{d}x = \frac{x^2}{2}\ln x - \frac{x^2}{4} + C.$$

**Integrál (substituce):**
$$\int x^2 \cos x^3\,\mathrm{d}x = \frac{1}{3}\sin x^3 + C.$$

# Otázky z ISu

**1.** Binární relace je
- ✅ podmnožina kartézského součinu
- telefonní nebo jiná časově omezená komunikace dvou účastníků
- množina dvouprvkových množin

**2.** Zobrazení
- je relace, která není uspořádáním ani ekvivalencí
- ✅ lze skládat
- lze sčítat a násobit

**3.** Jaký je vztah mezi spojitostí funkce a existencí její derivace?
- Je-li funkce v nějakém bodě spojitá, pak má v tomto bodě derivaci.
- ✅ Má-li funkce v nějakém bodě derivaci, pak je v tomto bodě spojitá.
- Funkce je v daném bodě spojitá, právě když v něm má derivaci.
- Neplatí žádné z uvedených tvrzení.

**4.** Derivace nekonstantní polynomiální funkce
- ✅ je vždy polynom nižšího řádu
- je vždy polynomem, ale může mít i stejný nebo vyšší řád
- nemusí být vůbec polynom

**5.** Derivace funkce v daném bodě
- je vždy menší než hodnota funkce v tomto bodě
- je vždy větší nebo rovna hodnotě funkce v tomto bodě
- ✅ neplatí ani jedno

**6.** Určitý integrál funkce f od b do c je
- ✅ pro nezápornou funkci f roven obsahu plochy vymezené grafem této funkce, osou x, a přímkami x=b a x=c
- stejný jako neurčitý integrál, akorát se pod symbol integrálu napíše b a nad něj c
- definován jen pro nezáporné funkce

**7.** Existuje-li neurčitý integrál derivace funkce f, tak
- je identický funkci f, protože integrace je inverzní proces k derivování
- ✅ má tvar f+c, kde c je libovolná konstanta
- neplatí ani jedno z výše uvedených tvrzení

**8.** Diferenciální rovnice
- popisují funkci diferenciálu v autě
- popisují rozdíl mezi dvěma či více funkcemi
- ✅ jsou rovnice, kde se vyskytují funkce a jejich derivace
