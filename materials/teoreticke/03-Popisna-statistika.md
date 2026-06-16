# 3. Popisná statistika

> **Zadání:** Popisná statistika, střední hodnota, medián, rozptyl, korelace. Odhady statistik a jejich spolehlivost. Distribuční funkce, rozdělení náhodných veličin a jejich příklady. (MB143)

# Opakování kombinatoriky

- **Kombinace** je neuspořádaná $k$-tice z $n$ prvků.
- **Variace** je uspořádaná $k$-tice z $n$ prvků podmnožiny.
- **Permutace** je uspořádaná $n$-tice z $n$ prvků (variace se všemi prvky).

|               | Bez opakování        | S opakováním                          |
| ------------- | -------------------- | ------------------------------------- |
| **Variace**   | $\dfrac{n!}{(n-k)!}$ | $n^k$                                 |
| **Kombinace** | $\dbinom{n}{k}$      | $\dbinom{n + k - 1}{k}$               |
| **Permutace** | $n!$                 | $\dfrac{n!}{k_1! \cdot k_2! \cdots k_n!}$ |

**Příklady** (pro $\{A, B, C\}$, resp. $\{A, B, C, D\}$, $k = 2$):

| | množina | výsledky |
| --- | --- | --- |
| permutace | $\{A, B, C\}$ | ABC, ACB, BAC, BCA, CAB, CBA |
| kombinace | $\{A, B, C, D\}$ | AB, AC, AD, BC, BD, CD |
| kombinace s opakováním | $\{A, B, C, D\}$ | AA, AB, AC, AD, BB, BC, BD, CC, CD, DD |
| variace | $\{A, B, C, D\}$ | AB, AC, AD, BA, BC, BD, CA, CB, CD, DA, DB, DC |
| variace s opakováním | $\{A, B, C\}$ | AA, AB, AC, BA, BB, BC, CA, CB, CC |

# Popisná statistika

> **Statistika** je disciplína zabývající se sběrem, prezentací, analýzou a interpretací dat.

> **Popisná statistika** je disciplína kvantitativně popisující hlavní vlastnosti statistického souboru. Není to matematická disciplína.

- **Statistický soubor** je množina všech objektů (statistických jednotek), které jsou předmětem statistického zkoumání. Je to konečná a neprázdná množina.
- **Statistická jednotka** je prvek statistického souboru.
	- Každá jednotka si drží „naměřená data" tzv. **statistické znaky**.
	- Výskyt hodnoty znaku se nazývá **absolutní** četnost.
	- V poměru k absolutní četnosti se udává **relativní** četnost.

## Druhy statistických znaků

Statistické znaky se dělí na 3 druhy:

- **kvantitativní**
	- **diskrétní**: celá čísla (např. počet hvězdiček)
	- **spojité**: reálná čísla z nějakého intervalu (např. rozměry výrobku)
- **kvalitativní**
	- **ordinální**: slova, třídy
	- **nominální**: barvy, tvary… (nelze je uspořádat)
- **alternativní**: specifické varianty dat (např. muž / žena)

Podle uplatnitelných měřítek:
- **nominální** – mezi hodnotami není žádný vztah, jde pouze o četnosti možných hodnot (např. politická strana v ČR nebo učitelé MU při zkoumání obliby)
- **ordinální** – totéž jako předchozí, ale s přidaným uspořádáním (např. počet hvězdiček u hotelu v bedekrech)
- **intervalové** – jde o číselné hodnoty, ale jde o porovnání velikostí, nikoliv absolutní hodnotu (např. u měření teplot je poloha nuly dohodnuta, ale není podstatná)
- **poměrové** – máme pevně stanovené měřítko a nulu (např. většina fyzikálních veličin)

**Např.**
- Soubor: Žáci školy A
- Jednotka: Žák
	- Kvantitativní znaky: Známky
	- Kvalitativní znaky: Jméno
	- Alternativní znak: Pohlaví

## Aritmetický průměr

- Aritmetický průměr je podíl součtu hodnot a počtu statistických jednotek.
- Součet všech odchylek od aritmetického průměru je roven $0$.
- Aritmetický průměr je ovlivnitelný velkým rozptylem. Pak není relevantní informací.

$$\overline{x} = \frac{1}{n} \cdot \sum_{i=1}^{n} x_i.$$

**Vážený průměr** – každá hodnota má váhu.

$$\overline{x} = \frac{\sum_{i=1}^{n} x_i w_i}{\sum_{i=1}^{n} w_i}.$$

## Medián (tzv. prostřední hodnota)

- Medián je hodnota rozdělující množinu hodnot na poloviny podle pravděpodobnosti nabytí.
	- Tedy 2. kvartil nebo také 50. percentil.
	- Není ovlivněn extrémními hodnotami.
	- **Fun fact:** absolutní hodnota rozdílu mezi mediánem a aritmetickým průměrem daného rozdělení je menší nebo rovna jedné směrodatné odchylce.

Vzorec ($m$ = medián):
$$\int_{-\infty}^{m} f(x)\,\mathrm{d}x = \frac{1}{2}.$$

**Kvantily (boxplot):**
- Maximum = 100% kvantil
- Horní kvartil = 75% kvantil
- Medián = 50% kvantil
- Dolní kvartil = 25% kvantil
- Minimum = 0% kvantil

![[kvantily.png|201]]
## Modus

**Modus** (nejčastěji vyskytující se hodnota) je hodnota s největší pravděpodobností.

## Střední hodnota (E)

**Střední hodnota** (tzv. „vážený průměr" rozdělení / očekávaná hodnota):
- Je to vážený průměr, kde vahou každé veličiny je pravděpodobnost výskytu.
- Při rovnoměrném rozdělení $\Rightarrow$ aritmetický průměr.
- Pro obecnou náhodnou veličinu se definuje jako **Lebesgueův integrál**:
$$\mathrm{E}\,X = \int_{\Omega} X(\omega)\,\mathrm{d}P(\omega).$$
	- pro diskrétní náhodnou veličinu $X$ je
	$$\mathrm{E}\,X = \sum_{x_i} x_i \cdot P(X = x_i).$$
	- pro spojitou náhodnou veličinu $X$ je
	$$\mathrm{E}\,X = \int_{\mathbb{R}} x \cdot f(x)\,\mathrm{d}x.$$

> Průměr se počítá z dat, střední hodnota z pravděpodobností náhodné veličiny.

## Rozptyl / variance (D)

**Rozptyl** (rozdělení kolem střední hodnoty) – tzv. střední kvadratická odchylka.
- Rozptyl je střední hodnota kvadrátů odchylek od střední hodnoty.
- Charakterizuje proměnlivost rozdělení pravděpodobnosti náhodné veličiny kolem střední hodnoty.

$$\sigma^2(X) = \mathrm{E}(X^2) - [\mathrm{E}(X)]^2.$$

- pro diskrétní náhodnou veličinu $X$ je
$$\operatorname{Var} X = \sum_{x_i} (x_i - \mathrm{E}\,X)^2 \cdot P(X = x_i).$$
- pro spojitou náhodnou veličinu $X$ je
$$\operatorname{Var} X = \int_{\mathbb{R}} (x - \mathrm{E}\,X)^2 \cdot f(x)\,\mathrm{d}x.$$
- pro obecnou náhodnou veličinu
$$\operatorname{Var} X = \mathrm{E}(X - \mathrm{E}\,X)^2 = \int_{\Omega} (X(\omega) - \mathrm{E}\,X)^2\,\mathrm{d}P(\omega).$$

Grafické určení rozptylu: výsledek je součet obsahu čtverců / počet čtverců.

![[rozptyl.png|424]]

## Směrodatná odchylka

Jde o druhou odmocninu z rozptylu. Odpovídá tomu, nakolik se od sebe typicky liší jednotlivé naměřené hodnoty.
- Odpovídá jednotkám původních dat $\Rightarrow$ je tedy intuitivnější.
- Průměr nemusí odpovídat údajům, pokud existují vysoké odchylky. Proto počítáme směrodatnou odchylku.

## Kvantily

**Kvantily** dělí uspořádanou datovou sadu na části určitého poměru. Existují kvartily, percentily, medián…

- **První** kvartil (Q1): 25. percentil, tedy hodnota, pod kterou leží 25 % datové sady.
- **Druhý** kvartil (Q2): 50. percentil (medián), tedy hodnota dělící data na poloviny.
- **Třetí** kvartil (Q3): 75. percentil, hodnota, pod kterou leží 75 % datové sady.

## Kovariance a korelace

**Kovariance** rozhoduje o existenci lineární závislosti mezi veličinami $X$ a $Y$.
- Svou hodnotou vyjadřuje směr (pozitivní či negativní závislost, $0$ žádná).
- Neudává sílu závislosti.

$$\operatorname{Cov}(X, Y) = \mathrm{E}(X - \mathrm{E}\,X)(Y - \mathrm{E}\,Y) = \mathrm{E}(XY) - \mathrm{E}\,X \cdot \mathrm{E}\,Y.$$

**Korelace** měří sílu lineární závislosti mezi veličinami $X$ a $Y$.
- Výpočtem získáváme **korelační koeficient** $\in [-1, 1]$.
- Čím víc se jeho hodnota blíží ke krajům, tím více se graf závislosti narovnává.
- $1$ (přímá závislost), $-1$ (nepřímá závislost). V obou případech se graf blíží přímce.
- $0$ (nekorelují), nelze statisticky zjistit lineární závislost.

$$\rho_{X,Y} = \frac{\mathrm{E}(XY) - \mathrm{E}(X)\mathrm{E}(Y)}{\sqrt{\mathrm{E}(X^2) - \mathrm{E}(X)^2}\,\sqrt{\mathrm{E}(Y^2) - \mathrm{E}(Y)^2}} = \frac{\operatorname{Cov}(X, Y)}{\sqrt{D(X)}\,\sqrt{D(Y)}}.$$

- Je to kovariance dělená součinem směrodatných odchylek.

![[korelace.png|465]]
### Kovarianční matice

- **Kovarianční matice** obsahuje kovariance mezi páry proměnných v mnoharozměrném datasetu.
- Na diagonále má rozptyly (kovariance sama se sebou).

$$\begin{pmatrix} \operatorname{cov}(X_1, X_1) & \operatorname{cov}(X_1, X_2) & \cdots & \operatorname{cov}(X_1, X_n) \\ \operatorname{cov}(X_2, X_1) & \operatorname{cov}(X_2, X_2) & \cdots & \operatorname{cov}(X_2, X_n) \\ \vdots & \vdots & \ddots & \vdots \\ \operatorname{cov}(X_n, X_1) & \operatorname{cov}(X_n, X_2) & \cdots & \operatorname{cov}(X_n, X_n) \end{pmatrix}$$

- Používá se pro popis rozdělení ve složitých datasetech (multivarianční rozdělení apod.).
- Existuje i **korelační matice**.

# Pravděpodobnost

> **Pravděpodobnost** vyjadřuje, jak velkou mírou můžeme daný elementární jev očekávat.

> **Definice.** Množinová funkce $P : \mathcal{A} \to [0, 1]$ je **pravděpodobnostní míra** na $(\Omega, \mathcal{A})$, jestliže splňuje:
> - $P(\Omega) = 1$,
> - jsou-li $A_1, A_2, \dots \in \mathcal{A}$ disjunktní, pak $P\left(\bigcup_i A_i\right) = \sum_i P(A_i)$.

**Vlastnosti:**
- $P(\emptyset) = 0$
- $A \in \mathcal{A} \Rightarrow P(\Omega \setminus A) = 1 - P(A)$
- $A, B \in \mathcal{A},\ A \subseteq B \Rightarrow P(A) \leq P(B)$ a $P(B \setminus A) = P(B) - P(A)$

**Pravděpodobnost $\neq$ šance:**
- Šance je počet příznivých ku počtu nepříznivých.
- Pravděpodobnost je počet příznivých ku všem.
- Např. šance hodit kostku je $1:5$, pravděpodobnost je $1:6$.

## Pravděpodobnostní prostor

> **Pravděpodobnostní prostor** je matematická konstrukce domova náhody. Modeluje náhodný jev.

Jde o trojici $(\Omega, \mathcal{A}, P)$, kde:
- $\Omega$ je neprázdná množina elementárních jevů $\Rightarrow$ všech možných výsledků
- $\mathcal{A}$ je množina náhodných jevů (dataset) $\to$ dvojice $(\Omega, \mathcal{A})$ je tzv. **jevové pole**
- $P$ je funkce přiřazující každému náhodnému jevu jeho pravděpodobnost z intervalu $\langle 0, 1\rangle$

**Příklad** (hod mincí):
- prostor elementárních jevů: $\Omega = \{\text{„hlava"}, \text{„orel"}\}$
- elementární jevy: $\omega_1 = \text{„hlava"}$, $\omega_2 = \text{„orel"}$
- jevová $\sigma$-algebra: $\mathcal{A} = \{\emptyset, \{\omega_1\}, \{\omega_2\}, \Omega\}$
- interpretace jevů:
	- $A = \emptyset$ … „nepadne ani hlava ani orel" nebo „padne hlava a současně orel"
	- $B = \{\omega_1\}$ … „padne hlava"
	- $C = \{\omega_2\}$ … „padne orel"
	- $D = \Omega$ … „padne hlava nebo orel"

- **Náhodný pokus** je činnost závislá na náhodě $\Rightarrow$ výsledkem je elementární jev.
- **Náhodný jev** je prvek jevového pole (např. hod kostkou).
	- Doplňkový jev popisuje opačný případ jevu.
	- Elementární jev $\omega$ je výsledkem náhodného jevu.

**Operace s jevy:**
- $C = A \cup B$ – jev $C$ nastane, pokud nastane jev $A$ **nebo** jev $B$
- $C = A \cap B$ – jev $C$ nastane, pokud nastane jev $A$ **a současně** jev $B$
- $\overline{A} = \Omega - A$ – jev $\overline{A}$ je **opačný** k jevu $A$

**Statistická nezávislost** $\Rightarrow$ např. 1. a 2. hod kostkou na sobě nezávisí.
- Dva náhodné jevy jsou nezávislé, pokud $P(A \cap B) = P(A) \cdot P(B)$.
- **Sjednocení** $\Rightarrow P(A \cup B) = P(A) + P(B) - P(A \cap B)$.

- Jevy jsou **neslučitelné**, pokud je jejich průnik nulový.
- **Nemožný** jev $\Rightarrow$ pravděpodobnost $0$.

**Závislé jevy** jsou takové, že výskyt jednoho ovlivňuje pravděpodobnost druhého.
- $P(A \cap B) \neq P(A) \cdot P(B) \Rightarrow$ pravděpodobnost, že oba jevy nastanou současně, není rovna součinu pravděpodobností jednotlivých jevů $\Rightarrow$ jevy jsou závislé.

**Podmíněná pravděpodobnost** je pravděpodobnost jevu omezená na podmnožinu splňující nějakou podmínku.
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}.$$
Pravděpodobnost, že nastal jev $A$, za předpokladu, že nastal jev $B$.

## Věty

### Bayesova věta

Je věta teorie pravděpodobnosti. Udává, jak podmíněná pravděpodobnost jevu souvisí s opačnou podmíněnou pravděpodobností.

> Pro podmíněné pravděpodobnosti náhodných jevů $A, B \in \mathcal{A}$ splňujících $P(A) > 0$ a $P(B) > 0$ platí vztah
> $$P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}.$$

- $P(A \mid B)$ je podmíněná pravděpodobnost jevu $A$ za předpokladu, že nastal jev $B$.
- $P(B \mid A)$ je podmíněná pravděpodobnost jevu $B$ za předpokladu, že nastal jev $A$.

### Zákon velkých čísel (ZVČ / LLN)

> Zprůměrováním výsledků velkého počtu nezávislých pokusů stejného typu se blížíme ke střední hodnotě výsledku pokusu.

> Uvažujme nezávislé a stejně rozdělené náhodné veličiny $X_1, X_2, \dots$ s konečnou střední hodnotou $\mu$. Pak platí, že
> $$\frac{1}{n} \sum_{i=1}^{n} X_i \xrightarrow[n \to \infty]{s.j.} \mu.$$

### Centrální limitní věta (CLV / CLT)

> Dostatečně velký výběr z mnoha nezávislých vlivů stejného typu má přibližně normální rozdělení nezávisle na původním rozložení statistického souboru.

> Uvažujme nezávislé a stejně rozdělené náhodné veličiny $X_1, X_2, \dots$ s konečnou střední hodnotou $\mu$ a konečným kladným rozptylem $\sigma^2$. Pak platí, že
> $$\frac{\sum_{i=1}^{n} X_i - n\mu}{\sqrt{n\sigma^2}} \xrightarrow[n \to \infty]{d} N(0, 1).$$

### Věta o úplné pravděpodobnosti

$$P(B) = \sum_i P(B \cap A_i) = \sum_i P(B \mid A_i) \cdot P(A_i).$$

# Náhodná veličina

> **Náhodná veličina** je měřitelná funkce $X$ přiřazující každému elementárnímu jevu nějakou hodnotu.

- Jde o zobrazení z prostoru elementárních jevů $\Omega$ do měřitelného prostoru $X : (\Omega, \mathcal{A}) \to (\mathbb{R}, B(\mathbb{R}))$.
- Náhodná veličina je reálná, pokud přiřazuje číslo. Např. $X(\text{rub}) = 0$, $X(\text{líc}) = 1$.

**Výběrový prostor** (jevové pole) je tzv. **prostor hodnot náhodné veličiny**. Náhodná veličina pro něj definuje pravděpodobnostní míru $\Rightarrow$ **rozdělení** náhodné veličiny $P_X$.
$$P_X(A) = P(X \in A) \quad \text{pro } A \in B(\mathbb{R}).$$

**Distribuční funkce** náhodné veličiny $X$ je funkce $F(x) = P(X \leq x)$, $\mathbb{R} \to [0, 1]$.
- Jde o pravděpodobnost toho, že bude veličina $X$ menší než nějaká mez $x$.
- Jednoznačně určuje toto rozdělení. Funkce je neklesající a **zprava spojitá** (u diskrétní náhodné veličiny má skoky, není tedy spojitá v běžném smyslu).

> Dvě náhodné veličiny jsou stejně rozdělené, pokud mají stejné distribuční funkce.

- **Spojitá náhodná veličina** $\Rightarrow$ nabývá nespočetně mnoha hodnot. Výskyt hodnot se označuje jako **hustota**.
- **Diskrétní náhodná veličina** (nespojitá) $\Rightarrow$ nabývá spočetně mnoha hodnot po „skocích" (celých číslech).

## Náhodný vektor

Náhodný vektor je pole náhodných veličin, definovaných na stejném pravděpodobnostním prostoru. Používají se pro modelování chování více proměnných současně $\Rightarrow$ finanční prognózy, modely rizika apod.

Rozdělení dělíme na **sdružené**, **marginální** a **podmíněné**.

**Sdružená distribuční funkce** je funkce $F_{X_1, \dots, X_n} : \mathbb{R}^n \to [0, 1]$ daná předpisem
$$F_{X_1, \dots, X_n}(x_1, \dots, x_n) = P(X_1 \leq x_1, \dots, X_n \leq x_n), \quad (x_1, \dots, x_n)^\top \in \mathbb{R}^n.$$

**Marginální distribuční funkce** je $F_{X_i} : \mathbb{R} \to [0, 1]$, kde $F_{X_i}(x_i) = P(X_i \leq x_i)$, $x_i \in \mathbb{R}$, $i \in \{1, \dots, n\}$.

# Rozdělení

Rozdělení popisuje hustotu dat.

## Diskrétní rozdělení

**Geometrické rozdělení** (Geometric distribution) – $X$ představuje počet neúspěchů před prvním úspěchem v sérii nezávislých pokusů, všechny se stejnou pravděpodobností úspěchu $p$.
$$P(X = x) = \begin{cases} p(1 - p)^x & x \in \{0, 1, 2, \dots\} \\ 0 & \text{jinak} \end{cases}$$

**Negativně binomické rozdělení** (Negative binomial dist.) – $X$ představuje počet neúspěchů před $k$-tým úspěchem v sérii nezávislých pokusů, všechny se stejnou pravděpodobností úspěchu $p$.
$$P(X = x) = \begin{cases} \binom{x + k - 1}{k - 1} p^k (1 - p)^x & x \in \{0, 1, 2, \dots\} \\ 0 & \text{jinak} \end{cases}$$

**Hypergeometrické rozdělení** (Hypergeometric dist.) – $X$ představuje počet vytažených bílých koulí, provedeme-li $n$ tahů z urny, v níž je $K$ bílých a $N - K$ černých koulí. Oproti binomickému rozdělení se koule po jednotlivých tazích do urny nevracejí, jde o výběr z konečné populace, jejíž složení se každým tahem mění.
$$P(X = x) = \begin{cases} \dfrac{\binom{K}{x}\binom{N - K}{n - x}}{\binom{N}{n}} & x \in \{0, 1, 2, \dots, n\} \\ 0 & \text{jinak} \end{cases}$$

**Poissonovo rozdělení** (Poisson distribution) – $X$ může nabýt kterékoliv z hodnot $\{0, 1, 2, \dots\}$.
$$P(X = x) = \begin{cases} \dfrac{e^{-\lambda}\lambda^x}{x!} & x \in \{0, 1, 2, \dots\} \\ 0 & \text{jinak} \end{cases}$$
kde $\lambda > 0$ je (pevně daný) parametr rozdělení.

**Alternativní rozdělení** (Bernoulli distribution) – $X$ může nabýt hodnoty $1$ (úspěch, s pravděpodobností $p$) nebo $0$ (neúspěch).
$$P(X = x) = \begin{cases} p & x = 1 \\ 1 - p & x = 0 \\ 0 & \text{jinak} \end{cases}$$

**Binomické rozdělení** (Binomial distribution) – $X$ představuje počet úspěchů ($1$) v $n$ nezávislých pokusech, všechny se stejnou pravděpodobností úspěchu $p$.
$$P(X = x) = \begin{cases} \binom{n}{x} p^x (1 - p)^{n - x} & x \in \{0, \dots, n\} \\ 0 & \text{jinak} \end{cases}$$

**Rovnoměrné rozdělení** (Uniform distribution) – $X$ může nabýt kterékoliv z hodnot $\{x_1, \dots, x_n\}$, všechny se stejnou pravděpodobností.
$$P(X = x) = \begin{cases} \dfrac{1}{n} & x \in \{x_1, \dots, x_n\} \\ 0 & \text{jinak} \end{cases}$$

## Spojitá rozdělení

**Normální rozdělení** (Normal distribution) – $X$ může nabýt kterékoliv z hodnot v $\mathbb{R}$.
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x - \mu)^2}{2\sigma^2}} = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\left\{-\frac{1}{2\sigma^2}(x - \mu)^2\right\},$$
kde $\mu \in \mathbb{R}$ a $\sigma^2 > 0$ jsou (pevně dané) parametry rozdělení.
- Střední hodnota: $\mathrm{E}(X) = \mu$
- Rozptyl: $D(X) = \sigma^2$

**Exponenciální rozdělení** (Exponential distribution) – $X$ může nabýt kterékoliv z hodnot v intervalu $(0, \infty)$.
$$f(x) = \begin{cases} \lambda e^{-\lambda x} & x \in (0, \infty) \\ 0 & \text{jinak} \end{cases}$$
kde $\lambda > 0$ je (pevně daný) parametr rozdělení.

**Gamma rozdělení** (Gamma distribution) – $X$ může nabýt kterékoliv z hodnot v intervalu $(0, \infty)$.
$$f(x) = \begin{cases} \dfrac{\beta^\alpha}{\Gamma(\alpha)} x^{\alpha - 1} e^{-\beta x} & x \in (0, \infty) \\ 0 & \text{jinak} \end{cases}$$
kde $\alpha > 0$ a $\beta > 0$ jsou (pevně dané) parametry rozdělení.

# Statistický odhad

Pokud máme nějaká data a předpokládáme, že spadají do nějakého rozdělení $\Rightarrow$ `fitdistr` v R studiu.
- Odhady parametrů rozdělení $\Rightarrow$ **bodový** a **intervalový** odhad.
	- **Bodový odhad** je třeba průměr $\Rightarrow$ informace o datovém souboru je 1 číslo.
	- **Intervalový odhad** je třeba konfidenční interval.

## Metoda maximální věrohodnosti (MLE)

Manuálně používáme metodu maximální věrohodnosti:
1. máme pozorovaná data $x$ a náhodnou veličinu $X$, o které si myslíme, že se řídí známým rozdělením s parametry $\theta$
2. napíšeme si hustotu (pravděpodobnostní funkci) daného rozdělení $f(x, \theta)$
3. spočítáme **věrohodnostní funkci**
$$L(x, \theta) = \prod_{i=1}^{n} f(x, \theta) \to \max$$
4. spočítáme **logaritmickou věrohodnost**
$$l(x, \theta) = \ln L(x, \theta) = \sum_{i=1}^{n} \ln f(x, \theta)$$
5. spočítáme **skórovou funkci** – derivaci $l(x, \theta)$ podle $\theta$
6. položíme ji rovnu nule a vyjádříme $\theta$ – máme odhad $\hat\theta$
7. znovu zderivujeme a ověříme, že jsme našli maximum

## Intervalový odhad

Intervalový odhad je obecně lepší, protože poskytuje informace o variabilitě dat.
Mezi intervalové odhady patří třeba **konfidenční interval** $\Rightarrow 100(1 - \alpha)\,\%$.
Konfidenční interval je dvojice statistik $(L, U)$, pro kterou platí $P(L \leq \theta \leq U) = 1 - \alpha$.
- **Zjednodušeně:** Neznámý parametr leží v intervalu s $(1 - \alpha)$ pravděpodobností.
- $\alpha$ je **hladina významnosti** – stanovuje maximální míru množství náhodných pokusů, v nichž může být testovaná hypotéza náhodným pokusem vyvrácena.
- Interval s přesností 95 % znamená, že 95 % hodnot spadá do tohoto intervalu. Čím užší, tím přesnější.
- S šířkou klesá jeho přesnost a také význam.

![[konfidencni-interval.png|355]]
# Statistické experimenty

**Náhodný výběr** $\Rightarrow$ podstatou statistických metod je, že nemusíme analyzovat všechny jednotky, ale provést výběr hodnot s některým rozdělením (vhodné při práci s velkými daty).

Výběr musí být **reprezentativní** a **homogenní** (bez vlivu vnějších faktorů). Často se prostě vybírá náhodně.

## Regresní analýza

**Regresní analýza** je statistická metoda umožňující nám prozkoumat vztah mezi dvěma proměnnými – tzv. nezávisle proměnnou ($X$ – nazýváme regresor) a tzv. závisle proměnnou ($Y$ – nazýváme regresand, cílová proměnná).

### Lineární regresní model

Jednoduchý lineární regresní model:
$$y = \beta_0 + \beta_1 x + \epsilon$$
- $y$: závislá proměnná
- $x$: nezávislá proměnná
- $\beta_0$: intercept (osa $y$)
- $\beta_1$: sklon přímky (regresní koeficient)
- $\epsilon$: chyba (reziduál)

- $\beta + \beta + \beta \Rightarrow$ uvažujeme více parametrů
- $\beta \cdot \beta \Rightarrow$ uvažujeme interakci parametrů

**Hodnocení modelu:**
- $(\beta_1, \beta_2, \dots, \beta_n)$ určují změnu závislé proměnné (v rovnici). Je to „sklon".
- $R^2$ odpovídá tomu, kolik % rozdělení vysvětluje daný vztah.
- $R^2$ adjusted dodatečně uvažuje také počet parametrů (složitost modelu).
- **P-hodnota** udává statistickou významnost. Je to pravděpodobnost, že je modelovaný vztah nevýznamný. $< 0{,}05$ se bere jako významné, $0$ se bere jako chyba.
- **Null deviance**: jak dobře predikuje data model jen s interceptem.
- **Residual deviance**: jak dobře predikuje data náš model (čím menší, tím lepší).

## Testování hypotéz

Testování hypotéz je statistická metoda k přijetí či zamítnutí hypotézy na základě statistických dat.
Nulová hypotéza $H_0 \Rightarrow$ předpokládá, že vztah neexistuje. Alternativní $H_1$ předpokládá, že existuje.
- **Chyba 1. druhu** $\Rightarrow$ falešné zamítnutí nulové hypotézy.
- **Chyba 2. druhu** $\Rightarrow$ nezamítnutí nulové hypotézy, i když je nepravdivá.

**Testy:**
- `t.test` $\Rightarrow$ test střední hodnoty, pro normální rozdělení nebo CLV.
- `wilcox.test` $\Rightarrow$ test mediánu.
- Wilsonův interval.

**Zobecněný lineární model:**
- `anova(mod1, mod2)` ptá se, jestli mohu redukovat mod2 na mod1. Jde o analýzu rozptylu.

**Regrese s binárními odezvami:**
- Lineární model je monotónní $\Rightarrow$ problém – nedokáže modelovat nelinearitu.
- U dat, která nemají normální rozdělení, nemá smysl reprezentovat jejich vztahy přímkou. K převodu na lineární regresi používáme **linkovou funkci**.

**Síla testu:** `power.t.test`.

# Otázky a příklady

**1.** Uvažme statistický soubor s prvky $1, 2, 3, 4, 5, 6, 7$. Jaký je nejnižší možný počet prvků, které musíme k souboru přidat, aby jeho medián byl roven $6$?

> **Odpověď: 4.** Soubor má 7 prvků s mediánem $4$. Aby byl medián $6$, je potřeba přidat $4$ prvky $\geq 6$ (např. čtyři šestky). Vznikne soubor o 11 prvcích, jehož 6. (prostřední) hodnota je $6$.

**2.** Určete počet anagramů slova BANANA. (Anagram je slovo, které vznikne změnou pořadí písmen původního slova.)

> **Odpověď: 60.** Permutace s opakováním: slovo má 6 písmen, z toho 3$\times$ A, 2$\times$ N, 1$\times$ B:
> $$\frac{6!}{3! \cdot 2! \cdot 1!} = \frac{720}{12} = 60.$$

**3.** Uvažme náhodnou veličinu $X$ se střední hodnotou $2$. Určete střední hodnotu veličiny $Y = 2X - 1$.

> **Odpověď: 3.** Z linearity střední hodnoty: $\mathrm{E}(Y) = 2\,\mathrm{E}(X) - 1 = 2 \cdot 2 - 1 = 3$.

**4.** Mějme pravděpodobnostní funkci $P$ a dva stochasticky nezávislé náhodné jevy $A$ a $B$ takové, že $P(B) \neq 0$. Které tvrzení obecně platí?

> **Odpověď:** $P(A \mid B) = P(A)$. Pro nezávislé jevy platí $P(A \cap B) = P(A)P(B)$, a tedy $P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(A)P(B)}{P(B)} = P(A)$.

# Otázky z ISu

## Kombinatorika a pravděpodobnost

**1.** Permutace n-prvkové množiny je
- uspořádaná k-tice obsahující každý prvek z původní množiny nejvýše jednou
- ✅ uspořádaná k-tice obsahující každý prvek z původní množiny právě jednou
- multi-množina obsahující každý prvek z původní množiny právě jednou

**2.** Kombinační číslo n nad k je rovno
- n! / k!
- n! / (n-k)!
- ✅ n! / (k!·(n-k)!)

**3.** Kombinace využijeme, pokud z nějaké množiny objektů vybíráme určitý počet objektů, přičemž
- ✅ nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat opakovaně.
- záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat znovu.

**4.** Počet kombinací k prvků z n prvkové množiny
- ✅ získám jako počet k-členných variací z n-prvkové množiny děleno počtem permutací k-prvkové množiny
- n! / (n-k)!
- k! / (k!·(n-k)!)

**5.** Variace využijeme, pokud z nějaké množiny objektů vybíráme určitý počet objektů, přičemž
- ✅ záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat znovu.
- nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat opakovaně.

**6.** Variace s opakováním využijeme, pokud z nějaké množiny objektů vybíráme určitý počet objektů, přičemž
- záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- ✅ záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat znovu.
- nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat opakovaně.

**7.** Kombinace s opakováním využijeme, pokud z nějaké množiny objektů vybíráme určitý počet objektů, přičemž
- záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty nelze vybrat znovu.
- záleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat znovu.
- ✅ nezáleží na pořadí, v jakém tyto objekty vybíráme, vybrané objekty lze vybrat opakovaně.

**8.** Distribuční funkce pro diskrétní náhodnou veličinu je vždy nutně
- ✅ nespojitá
- rostoucí
- neomezená

**9.** Pravděpodobnost, že na standardní šestistěnné hrací kostce padlo číslo větší než jedna, pokud vím, že padlo číslo menší než čtyři, je
- 2/6
- 3/6
- ✅ 4/6

**10.** Bayesova věta z teorie pravděpodobnosti je
- vztah, kterým se spočítá podmíněná pravděpodobnost jevu A při platnosti jevu B.
- ✅ souvislost mezi podmíněnou pravděpodobností jevu A při platnosti jevu B a pravděpodobností jevu B při platnosti jevu A.
- zákon, že součet pravděpodobností výskytu jednotlivých jevů je roven jedné.
- pravidlo, že pravděpodobnost současného výskytu dvou nezávislých jevů je rovna součinu pravděpodobností výskytu jednotlivých jevů.

## Popisná statistika

**1.** Slovo popisná ve spojení se statistikou říká, že
- statistika nuda je, ovšem popisuje cenné údaje a proto se u ní hodně píše
- popisuje nádheru světa, života a vůbec
- ✅ pouze popisuje charakteristiky souboru dat

**2.** Střední hodnota souboru diskrétních dat je
- pravděpodobnostní hodnota, jejíž číselné vyjádření je středově souměrné
- hodnota, která se vyskytuje s nejvyšší četností
- hodnota, která byla pravděpodobnostně naměřena ve středu
- ✅ je četností vážený průměr všech hodnot

**3.** Medián je
- označení speciálního druhu medu.
- hodnota ze souboru dat, pro níž platí, že alespoň polovina hodnot ze souboru je ostře menší, a alespoň polovina hodnot ze souboru je ostře větší.
- ✅ hodnota, která se v souboru dat nemusí vyskytovat.
- mediální magnát.

**4.** Mějme neprázdný soubor hodnot, pro který určíme správně průměr a medián. Vztah průměru a mediánu je takový, že
- obě hodnoty si nemohou nikdy být rovny.
- medián si zachovává svou hodnotu, i když z dat odeberu jeden prvek, zatímco průměr nikoliv.
- medián je nižší než průměr (medián není ovlivněn extrémními vysokými hodnotami).
- ✅ v některých případech může medián být větší než průměr.

**5.** Jako rozptyl je ve statistice označováno
- průměr kvadrátů odchylek od střední hodnoty.
- střední hodnota odchylek od střední hodnoty.
- střední hodnota odchylek od kvadrátu střední hodnoty.
- ✅ střední hodnota kvadrátů odchylek od střední hodnoty.
- střední hodnota kvadrátů odchylek od průměru.

**6.** Korelace ve statistice je
- doplněk binární relace vzhledem ke kartézkému součinu nosných množin.
- ✅ vzájemný lineární vztah mezi dvěma veličinami.
- statisticky významné pozorování, že v ČR míra rozvodovosti souvisí s četností nemanželského sexu.

**7.** Hodnota hladiny významnosti (často označována jako alfa)
- ✅ stanovuje maximální míru množství náhodných pokusů, v nichž může být testovaná hypotéza náhodným pokusem vyvrácena.
- stanovuje pravděpodobnostní hodnotu výskytu nejvýznamnějšího jevu v souboru dat.
- byla stanovena historicky Ronaldem Fisherem v roce 1925 na hodnotu 30%.

**8.** Spolehlivost statistického odhadu
- ✅ roste s počtem hodnot náhodné veličiny, ze kterých statistický odhad provádím.
- klesá s počtem hodnot náhodné veličiny, ze kterých statistický odhad provádím.
- se nemění s počtem hodnot náhodné veličiny, ze kterých statistický odhad provádím.

**9.** Hustota pravděpodobnosti u spojitých náhodných veličin je analogií k
- ✅ rozložení pravděpodobnosti u diskrétních náhodných veličin.
- odchylce od střední hodnoty u souboru dat diskrétní náhodné veličiny.
- četnosti výskytu extrémních hodnot v souboru dat diskrétní náhodné veličiny.