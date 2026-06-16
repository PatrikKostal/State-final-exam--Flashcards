# 1. Lineární algebra

> **Zadání:** Operace s vektory a maticemi, Gaussova eliminace, inverzní matice, determinant. Vlastnosti lineárních operací a skalárního součinu, vektorové podprostory, vektorové báze. Lineární transformace, matice zobrazení, vlastní čísla a vektory a jejich geometrický význam. (MB141)

# Základy

**Lineární algebra** je odvětví věnující se vektorům, soustavám lineárních rovnic a lineárním
transformacím.

**Bod** jsou souřadnice [x, y, z…]

**Vektor** je uspořádaná n-tice bodů $\vec{AB}$ …
- Ve 2D jim můžeme říkat i počáteční a koncový bod
- Sčítání vektorů je **komutativní** ($\vec{x} + \vec{y} = \vec{y} + \vec{x}$) a **asociativní** $(\vec{x} + \vec{y}) + \vec{z} = \vec{x} + (\vec{y} + \vec{z})$
- **Distributivita**: $\vec{x} \cdot (\vec{y} + \vec{z}) = (\vec{x} \cdot \vec{y}) + (\vec{x} \cdot \vec{z})$
- **Kolinearita** vektorů znamená, že jsou rovnoběžné.
- **Nulový vektor** $\vec{AA}$
- **Opačný vektor** k $\vec{u}$ je $-\vec{u}$, tedy k $\vec{AB}$ je $\vec{BA}$
- **Skalární součin** $\Rightarrow \vec{u} \cdot \vec{v} \Rightarrow u_1 \cdot v_1 + u_2 \cdot v_2$
	- Značí se taky $\langle \vec{u}, \vec{v} \rangle$
	- Skalární součin je roven 0, pokud jsou vektory kolmé (souřadnice vektoru nesmí být 0)
	- $> 0$ pokud je jejich úhel ostrý, $< 0$, pokud je tupý
- **Velikost vektoru**: Odvozeno z Pythagorovy věty, $\lVert \vec{u} \rVert = \sqrt{u_1^2 + u_2^2}$
- **Odchylka** vektoru:
$$\cos\alpha = \frac{\langle \vec{u}, \vec{v} \rangle}{\lVert \vec{u} \rVert \cdot \lVert \vec{v} \rVert}, \quad \alpha \in [0, \pi].$$
- Lze tím spočítat odchylku vektoru od přímky
$$\cos\alpha = \frac{|\langle \vec{u}, \vec{v} \rangle|}{\lVert \vec{u} \rVert \cdot \lVert \vec{v} \rVert}, \quad \alpha \in [0, \pi/2].$$
- odchylka v $(0, \pi)$ – dvojice vektorů je orientovaná kladně
- odchylka v $(-\pi, 0)$ – dvojice vektorů je orientovaná záporně

**Kolmý vektor**
- Ve 3D: **Vektorový součin**
$$\vec{u} \times \vec{v} = (u_2 v_3 - v_2 u_3,\ u_3 v_1 - v_3 u_1,\ u_1 v_2 - v_1 u_2)$$
![[3d-kolmy-vektor.png|365]]
	- Výsledkem je vektor kolmý k oběma násobeným vektorům a jeho velikost je rovna obsahu rovnoběžníku sevřeného násobenými vektory.
- Ve 2D: $(u_1, u_2) \Rightarrow (u_2, -u_1)$ nebo $(-u_2, u_1)$

**Přímka**
- **Parametrická** rovnice přímky: $X = A + t\vec{u}$
	- v souřadnicích: $[x, y] = [a_x, a_y] + t(u_x, u_y)$
- **Obecná** rovnice přímky: $px + qy + r = 0$
- **Směrový** vektor přímky $ax + by + c = 0$ je $(-b, a)$
- **Normálový** vektor přímky $ax + by + c = 0$ je $(a, b)$

**Lineární kombinace** je $k$-násobek vektoru nebo součet více vektorů
- **Lineárně nezávislé** jsou vektory, které v množině vektorů nelze vyjádřit lineární kombinací ostatních vektorů

**Afinní kombinace** v rovině je kombinace bodů, které neleží na přímce
- $\alpha A + \beta B + \gamma C$, kde $\alpha + \beta + \gamma = 1$ se nazývá afinní kombinace bodu
	- pokud $\alpha, \beta, \gamma \in [0, 1]$, leží afinní kombinace uvnitř trojúhelníku $ABC$ a nazýváme ji **konvexní kombinace bodu**

# Matice

**Matice** je uspořádané obdélníkové schéma prvků $\implies$ $n$-řádků a $m$-sloupců. Matice reprezentuje lineární zobrazení.
- Matici lze zobecnit jako **soustavu lineárních rovnic** (každý řádek je jedna rovnice)
- **Elementární úpravy**, které nemění vlastnosti matice:
	- Záměna řádků
	- Násobení řádku nenulovým číslem
	- K dané rovnici přičteme $c$-násobek jiné rovnice
- **Schodovitý tvar matice**
	- Pivot (vedoucí koeficient) - první nenulové číslo v řádku
	- Pro každý řádek platí: je-li $a$ pivot $i$-tého řádku, pak $i{+}1$-ní řádek je buď nulový, nebo je jeho pivot vpravo od $a$ (tedy ve sloupci s vyšším indexem).
- **Jednotková matice E** je speciální typ matice, která má 1 na diagonále a v ostatních políčkách 0
- **Pozitivní matice** má pouze kladné hodnoty
- **Primitivní matice** $\implies$ Matice $A$ pro kterou platí $A^k$ je pozitivní. (Mocnění ji zaplní kladnými hodnotami)
	- Nejmenší $k$ se nazývá exponent matice
### Vlastnosti matice
- **Hodnost** matice $\implies$ Počet lineárně nezávislých nenulových řádků ve schodovitém tvaru
	- Pokud nemá žádný lineárně závislý řádek, má **maximální hodnost**
	- **Regulární matice** $\iff$ čtvercová matice s maximální hodností, $\det \neq 0$. Má inverzní matici a všechny řádky/sloupce jsou lineárně nezávislé.
	- **Singulární matice** $\iff$ opak — čtvercová matice, která nemá maximální hodnost, $\det = 0$. Nemá inverzní matici.
- **Symetrie** $\implies$ Každé políčko je symetrické přes diagonálu
- **Antisymetrie** $\implies$ Ani jedno políčko není symetrické přes diagonálu
	- Transpozicí antisymetrické matice získáme původní matici s opačnými znaménky
- **Lineární závislost** $\implies$ Řádky jsou lineárně závislé pokud:
	- Některý řádek je násobkem jiného řádku, nebo součtem více řádků
	- Některý řádek je nulový
	- Matice reprezentuje podprostor a má víc řádků než dimenzí
### Základní operace
- **Sčítání** $\implies$ Sčítat mohu pouze matice ve stejném formátu - sečtu prvky na stejných pozicích
- **Násobení** číslem (intuitivně)
- **Násobení maticí** $\implies$ Můžeme pouze matici $A$ tvaru $k \times n$ s maticí $B$ tvaru $n \times p$
	- Výsledek $A \cdot B$ je matice tvaru $k \times p$
	- Řádky matice $A$ se násobí se sloupky matice $B$
	- Tvar $k \times n \implies k =$ řádky a $n =$ sloupce
	- Asociativní: $A \cdot (B \cdot C) = (A \cdot B) \cdot C$
	- Distributivní vzhledem ke sčítání: $A \cdot (B + C) = A \cdot B + A \cdot C$
- **Inverze** $\implies$ Matice $B$ je inverzní k $A$, pokud $A \cdot B = E$
- **Transpozice** $\implies$ ,,Prohození sloupců a řádků"
	- Determinant čtvercových matic zůstane stejný: $|A^T| = |A|$
### Převod na schodovitý tvar pomocí Gaussovy eliminace
> **Gaussova eliminace je** metoda řešení soustavy lineárních rovnic s využitím matice - převodem na schodovitý tvar pomocí elementárních řádkových úprav.

- Ze schodovitého tvaru vidíme, zda je soustava řešitelná
### Inverze matice
- $B$ je inverzní k $A$: $B = A^{-1}$
- $B$ je inverzní k $A$, když $A \cdot B = B \cdot A = E$
- Pokud k matici existuje inverzní, říkáme ji **invertibilní matice**

Algoritmus:
1. Vedle sebe napíšeme původní matici $A$ a jednotkovou matici $E$.
2. Matici $A$ upravíme na schodovitý tvar.
3. Následně zpětnou eliminací na jednotkovou matici $E$.
4. Tytéž úpravy provádíme soubežně s maticí $E$.
5. Pokud tento algoritmus narazí na vynulování celého řádku v původní matici, znamená to, že inverzní matice neexistuje.
### Determinant čtvercové matice
> Determinantem čtvercové matice řádu $n$ se nazývá součet všech součinů $n$ prvků této matice takových, že v žádném z uvedených součinů se nevyskytují dva prvky z téhož řádku ani z téhož sloupce. Každý součin přitom označíme znaménkem permutace.
- Definován pouze pro čtvercové matice
- **Geometrický význam** determinantu matice $A$ tvaru $n \times n$ bude orientovaný objem rovnoběžnostěnu v $n$-rozměrném prostoru určeného vektory sloupců (nebo řádků) matice $A$
- Absolutní hodnota determinantu matice $3 \times 3$ nad $R$ udává objem rovnoběžnostěnu...
- Jde o **skalár**, který je funkcí prvků matice

Pokud je matice ve schodovitém tvaru, determinant je součinem diagonály. Jinak ho lze získat jako součin prvků na diagonále horní trojúhelníkové matice. Výpočet determinantu pro vyšší řády $\implies$ **Leibnizova formule**

**Cauchyova** věta říká, že platí $|A \cdot B| = |A| \cdot |B|$

**Cramerovo pravidlo** říká, že pokud determinant:
- $= 0 \implies$ matice buď nemá řešení, nebo má nekonečně mnoho řešení
- $\neq 0 \implies$ matice má jednoznačné řešení
- $\neq 0 \implies$ existuje inverzní matice

**Laplaceův rozvoj** $\implies$ Univerzální výpočet determinantu rozvojem podle řádku/sloupce (funguje pro libovolný řád)
- Vybereme řádek (ideálně s nejvíc nulami), každý prvek vynásobíme jeho **minorem** (determinant po škrtnutí jeho řádku a sloupce) a znaménkem $(-1)^{i+j}$, a sečteme
- Znaménka se střídají jako šachovnice $\begin{smallmatrix} + & - & + \\ - & + & - \\ + & - & + \end{smallmatrix}$
- Opakujeme, dokud nedojdeme k $2 \times 2$: $\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$

**Sarrusovo pravidlo** $\implies$ Zjednodušení Laplaceova rozvoje, ale **jen pro $3 \times 3$**
- Sečteme součiny klesajících diagonál ($\searrow$) a odečteme stoupající ($\nearrow$): $\det A = aei + bfg + cdh - ceg - afh - bdi$
### Vlastní čísla a vektory matice
**Vlastní číslo** $\lambda$ je skalár určující změnu velikosti vektoru.
- Geometrický význam vlastního čísla zobrazení je velikost zvětšení/zmenšení vlastního vektoru zobrazení ve svém směru.
- Platí že existuje nenulový vektor $\vec{v}$, pro který platí $A \cdot \vec{v} = \lambda \cdot \vec{v}$

**Vlastní vektor** je takový vektor, že se jeho směr po transformaci nemění $\implies$ vlastní číslo je koeficientem změny jeho velikosti.

**Vlastní podprostor** $\implies$ Množina vlastních vektorů, které náleží stejnému vlastnímu číslu

**Platí:**
- $|A - \lambda E| = 0$
- $(A - \lambda E) \cdot \vec{u} = \vec{0}$
- Determinant $A(\lambda) = |A - \lambda E|$ je tzv. **charakteristický polynom**

**Postup (příklad pro $A = \begin{psmallmatrix} 3 & -1 \\ 2 & 0 \end{psmallmatrix}$):**
1. Sestav charakteristickou rovnici $|A - \lambda E| = 0$: $\begin{vmatrix} 3-\lambda & -1 \\ 2 & -\lambda \end{vmatrix} = 0$
2. Vyčísli determinant → **charakteristický polynom**: $\lambda^2 - 3\lambda + 2 = 0$
3. Vyřeš (kořeny) → **vlastní čísla**: $\lambda_1 = 2,\ \lambda_2 = 1$
4. Každé $\lambda$ dosaď do $(A - \lambda E)\vec{u} = \vec{0}$ a vyřeš → **vlastní vektory**:
	- $\lambda_1 = 2$: $\begin{psmallmatrix} 1 & -1 \\ 2 & -2 \end{psmallmatrix}\vec{u}_1 = \vec{0} \Rightarrow \vec{u}_1 = \begin{psmallmatrix} 2 \\ 2 \end{psmallmatrix}$
	- $\lambda_2 = 1$: $\begin{psmallmatrix} 2 & -1 \\ 2 & -1 \end{psmallmatrix}\vec{u}_2 = \vec{0} \Rightarrow \vec{u}_2 = \begin{psmallmatrix} 1 \\ 2 \end{psmallmatrix}$

Vlastní čísla a vektory se používají k nalezení neměnných částí zobrazení.

### Ortogonální matice
> matice, kdy $A \cdot A^T \implies E$

- Determinant ortogonální matice je $\pm 1$
- **Ortogonalita** $=$ Kolmost
### Vektorové prostory
**Vektorový prostor** $V$ nad polem skalárů $\mathbb{K}$ je neprázdná množina s operacemi sčítání vektorů $+ : V \times V \to V$ a násobení vektoru skalárem $\cdot : \mathbb{K} \times V \to V$, pro které platí:
- **Asociativita** sčítání: $(\vec{u} + \vec{v}) + \vec{w} = \vec{u} + (\vec{v} + \vec{w})$
- **Komutativita** sčítání: $\vec{u} + \vec{v} = \vec{v} + \vec{u}$
- **Nulový vektor**: $\exists\, \vec{0} \in V:\ \vec{u} + \vec{0} = \vec{u}$
- **Opačný vektor**: $\forall \vec{u} \in V\ \exists (-\vec{u}) \in V:\ \vec{u} + (-\vec{u}) = \vec{0}$
- **Distributivita** (skalár přes součet vektorů): $a \cdot (\vec{v} + \vec{w}) = a\vec{v} + a\vec{w}$
- **Distributivita** (součet skalárů přes vektor): $(a + b) \cdot \vec{v} = a\vec{v} + b\vec{v}$
- **Asociativita** násobení skalárem: $a \cdot (b \cdot \vec{v}) = (a \cdot b) \cdot \vec{v}$
- **Jednotkový skalár**: $1 \cdot \vec{v} = \vec{v}$

#### Vektorový podprostor 
> podmnožina $\emptyset \neq U \subseteq V$, která se zúženými operacemi sama tvoří vektorový prostor
- Stačí ověřit uzavřenost na lineární kombinaci: $\forall a, b \in \mathbb{K},\ \forall \vec{v}, \vec{w} \in U:\ a\vec{v} + b\vec{w} \in U$
- Pokud vektor spadá do vektorového podprostoru, podprostor je jeho lineárním obalem.
- Vektory z vektorového prostoru lze pouze sčítat a násobit prvkem z příslušného tělesa.

**Konečněrozměrný** $\implies$ vektorový prostor generovaný konečnou množinou vektorů

**Báze** $\implies$ vektory $\vec{v}_1, \vec{v}_2, \dots, \vec{v}_n \in V$ tvoří bázi, jestliže **generují** $V$ a jsou **lineárně nezávislé**

**Dimenze** $\implies$ počet prvků báze (je stejný pro všechny báze daného prostoru). Značíme $\dim V$

**Lineární obal** je množina všech lineárních kombinací vektorů daného podprostoru. Tvoří podprostor vektorového prostoru, ve kterém jsou tyto vektory obsaženy
- **Součet podprostorů** $\implies$ matice dám vedle sebe ($\vec{u}_1, \vec{u}_2, \vec{u}_3 \mid \vec{v}_1, \vec{v}_2, \vec{v}_3$) — „součet" lineárních rovnic
	- V té velké matici pak najdu **bázi** (nezávislé řádky)
- **Průnik podprostorů** $\implies$ matice dám nad sebe (sloučím) a hledám **řešení** soustavy lineárních rovnic
	- Výsledek bude řešení obou původních matic $\implies$ **průnik**

**Báze vektorového podprostoru**
> Báze je lineárně nezávislá množina vektorů z podprostoru

- Bázi získáme odstraněním lineárně závislých (nadbytečných) vektorů
- **Dimenze podprostoru** je počet vektorů v bázi $=$ hodnost matice
- **Standardní báze** je jednotková matice

**Ortogonální báze** je báze složená z vzájemně kolmých vektorů
- Hledání v podprostoru $\vec{v}_1, \vec{v}_2, \vec{v}_3$ $\implies$ **Gramm-Schmidtův proces**
- **Báze** $(\vec{u}_1, \vec{u}_2, \vec{u}_3)$ — postupně odečítáme průměty do už hotových kolmých vektorů:
	- $\vec{u}_1 = \vec{v}_1$
	- $\vec{u}_2 = \vec{v}_2 - a\,\vec{u}_1$
	- $\vec{u}_3 = \vec{v}_3 - b\,\vec{u}_2 - c\,\vec{u}_1$
- **Koeficienty** dopočítáme z podmínky kolmosti (skalární součin $= 0$):
	- pro $\vec{u}_2$: $0 = \langle \vec{v}_2, \vec{u}_1 \rangle - a\langle \vec{u}_1, \vec{u}_1 \rangle$
	- pro $\vec{u}_3$: $0 = \langle \vec{v}_3, \vec{u}_1 \rangle - b\langle \vec{u}_2, \vec{u}_1 \rangle - c\langle \vec{u}_1, \vec{u}_1 \rangle$
	- a zároveň: $0 = \langle \vec{v}_3, \vec{u}_2 \rangle - b\langle \vec{u}_2, \vec{u}_2 \rangle - c\langle \vec{u}_1, \vec{u}_2 \rangle$
- Vektory $(\vec{u}_1, \vec{u}_2, \vec{u}_3)$ tvoří **ortogonální bázi**

**Ortonormální báze** je ortogonální báze s vektory v jednotlivé velikosti
- Potřebujeme nejprve získat Ortogonální bázi
- Každý vektor vydělím jeho velikostí

**Ortogonální doplněk** je množina kolmých vektorů k podprostoru $U \implies$ **Kolmý podprostor**

**Podprostor je ortogonální**, pokud je skalární součin mezi všemi jeho vektory $0$.
- Stejně lze určit jestli je podprostor kolmý k jinému podprostoru

Souřadnice vektoru v bázi $(\vec{a}, \vec{b}, \vec{c})$ $\implies$ vektor zapíšu jako jejich lineární kombinaci $\vec{v} = x\vec{a} + y\vec{b} + z\vec{c}$
- Výsledné koeficienty $(x, y, z)$ jsou souřadnice vektoru $\vec{v}$ v dané bázi
### Lineární transformace
Jde o zobrazení nad vektorovými podprostory, která zachovává vektorové operace sčítání a násobení skalárem. Tzn., že zachovává:
- **Aditivitu**: $L(\vec{x} + \vec{y}) = L(\vec{x}) + L(\vec{y})$
- **Homogenitu**: $L(\alpha\vec{x}) = \alpha L(\vec{x})$
($L$ je lineární operátor, $\alpha$ skalár, $\vec{x}, \vec{y}$ vektory)

Lze takto popisovat **posunutí**, **otočení**, **zvětšení/zmenšení**, **zkosení**...
- **Rovnoběžná** i **perspektivní projekce**
### Matice zobrazení
Matice **zobrazení** reprezentuje lineární transformaci. Pokud máme např. matici zobrazení rotace o 90 stupňů, pak stačí vynásobit vektor touto maticí, abychom ho o 90 stupňů otočili.

Matici zobrazení získáme tak, že zobrazíme vektory **standardní báze** požadovanou operací. Sloupce matice jsou obrazy těchto vektorů.
- **Det -** $\implies$ zrcadlení
- **Det +** $\implies$ rotace

Lze zobrazovat také do jiných dimenzí. Např. $\varphi: \mathbb{R}^3 \to \mathbb{R}^2$:
$\varphi(x, y, z) = (x+y,\ 3y-2z)$
- Obrazy standardní báze: $\varphi(1,0,0) = (1,0)$, $\varphi(0,1,0) = (1,3)$, $\varphi(0,0,1) = (0,-2)$
- Matice zobrazení: $A_S = \begin{pmatrix} 1 & 1 & 0 \\ 0 & 3 & -2 \end{pmatrix}$
### Afinní transformace
Afinní transformace je zobecněním lineární transformace.
- Dodatečně definuje **posun v prostoru**: $T(\vec{x}) = A\vec{x} + \vec{b}$
	- $A$ je matice, $\vec{x}$ je vstupní vektor, $\vec{b}$ je translace (posunutí)

**Afinní prostor** je úzce spojen s afinní geometrií. Jsou v něm definovány úsečky, přímky, poměry velikostí úseček, nikoliv však vzdálenosti bodů nebo úhly vektorů.
- Afinní prostor je tzv. **vektorový prostor + v**, kde $v$ je pevný vektor posunu.

**Afinní zobrazení** je geometrické zobrazení mezi afinními prostory, které zachovává kolinearitu a dělicí poměr.
- **Parametrický** popis prostoru $ABC$: $X = A + p\vec{AB} + q\vec{AC}$
- **Implicitní** popis $\implies$ Matice $\cdot$ Bod
- Zobrazení afinního prostoru sama na sebe se nazývá **afinita**.
# Euklidovský prostor
**Euklidovský prostor** je vektorový prostor $\mathbb{R}^n$ spolu se skalárním součinem ($\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}$).
- Poskytuje možnost zjistit více informací, např. vzájemná poloha podprostorů, délky, vzdálenosti, úhly.

### Euklidovské operace

**Průnik**
- Vektor leží v podprostoru, pokud je lineární kombinací některých z jeho vektorů.

**Vzdálenosti**
- Vzdálenost bodu od přímky
- Vzdálenost bodu od podprostoru
- Vzdálenost přímek
- Vzdálenost podprostorů

**Odchylky**
- **Odchylka vektorů**:
$$\cos\alpha = \frac{\langle \vec{u}, \vec{v} \rangle}{\lVert \vec{u} \rVert \cdot \lVert \vec{v} \rVert}, \quad \alpha \in [0, \pi].$$
- **Odchylka přímek**:
$$\cos\alpha = \frac{|\langle \vec{u}, \vec{v} \rangle|}{\lVert \vec{u} \rVert \cdot \lVert \vec{v} \rVert}, \quad \alpha \in [0, \pi/2].$$

**Orientace odchylky**
- Odchylka v $(0, \pi)$ – dvojice vektorů je **orientovaná kladně**
- Odchylka v $(-\pi, 0)$ – dvojice vektorů je **orientovaná záporně**

**Odchylky podprostorů** $\implies$ odchylka jejich normálových vektorů

# Příklady

**1.** Uvažme následující soustavu rovnic nad $\mathbb{R}$:
$$\begin{aligned} -3x + 5y - 6z &= 3, \\ -2x + 6y - 2z &= 2, \\ 4y + 3z &= 0. \end{aligned}$$
Které z tvrzení je pravdivé?

> **Odpověď:** Soustava má nekonečně mnoho řešení, přičemž množina všech řešení tvoří **přímku v $\mathbb{R}^3$**. Determinant matice soustavy je $0$ (matice je singulární) a její hodnost je $2$ – zůstává tedy jeden volný parametr, jehož geometrickým obrazem je přímka.

**2.** Vypočtěte
$$\begin{pmatrix} 1 & -2 & 3 \\ 1 & 0 & -1 \end{pmatrix} \cdot \begin{pmatrix} 0 & 4 \\ -1 & -1 \\ 3 & -5 \end{pmatrix}.$$

> **Odpověď:** $\begin{pmatrix} 11 & -9 \\ -3 & 9 \end{pmatrix}$. Násobíme řádky první matice se sloupci druhé; počet sloupců první ($3$) odpovídá počtu řádků druhé ($3$), výsledek je matice $2 \times 2$.

**3.** Která z matic zadává lineární zobrazení $\mathbb{R}^2 \to \mathbb{R}^2$ odpovídající osové souměrnosti podle přímky $y = x$?

> **Odpověď:** $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$. Osová souměrnost podle $y = x$ prohazuje souřadnice: $(x, y) \mapsto (y, x)$.

**4.** Která z množin vektorů tvoří ortonormální bázi vektorového prostoru $\mathbb{R}^3$?

> **Odpověď:** $\left\{ \left(\tfrac{1}{\sqrt{3}}, \tfrac{1}{\sqrt{3}}, \tfrac{-1}{\sqrt{3}}\right), \left(\tfrac{1}{\sqrt{6}}, \tfrac{1}{\sqrt{6}}, \tfrac{2}{\sqrt{6}}\right), \left(\tfrac{-1}{\sqrt{2}}, \tfrac{1}{\sqrt{2}}, 0\right) \right\}$. Každý vektor má jednotkovou velikost a všechny dvojice jsou navzájem kolmé (jejich skalární součiny jsou $0$).

**5.** Jaké hodnoty musí nabývat $x$, aby byl determinant matice $\begin{pmatrix} 2 & -2 & 1 \\ 0 & 3-x & -6 \\ 0 & 1 & -3 \end{pmatrix}$ roven $0$?

> **Odpověď:** $x = 1$. Rozvojem podle prvního sloupce: $\det = 2 \cdot \big((3-x)(-3) - (-6)\cdot 1\big) = 2(3x - 3) = 6x - 6 = 0 \Rightarrow x = 1$.

# Otázky z ISu

**1.** Vektor je
- ✅ prvek vektorového prostoru
- n-tice čísel oddělených čárkou, zapsaných v závorkách
- domácká zkomolenina jména Hektor

**2.** Vektory, které jsou součástí vektorového prostoru, je možné z definice
- sčítat, násobit a násobit prvkem z příslušného tělesa
- ✅ pouze sčítat a násobit prvkem z příslušného tělesa
- pouze sčítat s prvkem z příslušného tělesa

**3.** Skalární součin vektorů je roven nule, pokud jsou vektory
- rovnoběžné
- ✅ na sebe kolmé
- identické

**4.** Výsledkem vektorového součinu dvou vektorů ve standardním euklidovském trojrozměrném prostoru je vektor, který
- ✅ je kolmý na násobené vektory
- leží v rovině definované násobenými vektory
- je vektor, jehož směr nelze určit (ani v pravotočivém souřadném systému)

**5.** Ortogonální báze euklidovského n-rozměrného vektorového prostoru je tvořena pouze vektory, jejichž zápis obsahuje vždy (n-1) nul.
- ano
- ✅ ne

**6.** Ortonormální báze euklidovského n-rozměrného vektorového prostoru je tvořena pouze vektory, jejichž zápis obsahuje vždy (n-1) nul.
- ano
- ✅ ne

**7.** V ortonormální bázi n-rozměrného vektorového prostoru jsou všechny vektory na sebe kolmé.
- ✅ ano
- ne

**8.** Součet délek vektorů v plnohodnotné ortonormální bázi 3D euklidovského vektorového prostoru odpovídá dimenzi vektorového prostoru.
- ✅ ano
- ne

**9.** Nadrovina n-rozměrného vektorového prostoru má dimenzi
- 2, je to rovina
- n+1, předpona nad je zde intuitivně superiorní
- ✅ n-1, a basta!

**10.** Geometrický význam vlastního čísla zobrazení je
- neznámý
- velikost posunu vlastního vektoru zobrazení ve svém směru
- ✅ znám, ale není zde uveden mezi možnostmi

**11.** Determinant čtvercové matice je
- skalár, který odpovídá řádu matice
- skalár, který pro libovolnou matici získám jako součin prvků na diagonále
- ✅ skalár, který získám jako součin prvků na diagonále horní trojúhelníkové matice
- vektor, který je vektorovým součtem vektorů ortonormální báze

**12.** Lineární zobrazení je zobrazení, které
- zachovává sčítání a násobení skalárem a je možné v něm posunout bod nula
- ✅ zachovává sčítání a násobení skalárem, tudíž v něm není možné posunout bod nula
- je zobecnění libovolného afinního zobrazení

**13.** Afinní zobrazení z 2D do 2D vektorového prostoru
- může posunout bod nula a může oblouk zobrazit na přímku
- ✅ může posunout bod nula, ale nemůže oblouk zobrazit na přímku
- nemůže posunout bod nula, ale může oblouk zobrazit na přímku
- nemůže posunout bod nula a nemůže oblouk zobrazit na přímku