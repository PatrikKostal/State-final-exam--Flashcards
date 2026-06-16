# 8. Funkcionální programování

> **Zadání:** Funkcionální programovací paradigma (princip výpočtu, redukční krok, redukční strategie a jejich vlastnosti, příklady). Funkce vyšších řádů a jejich využití. Nepojmenované funkce. Schopnost elementárního programování v Haskellu. (IB015)

# Funkcionální programovací paradigma

**Funkcionální programování** je programování pomocí funkcí $\implies$ hlavní myšlenkou je použití funkcí jako základních stavebních kamenů programů. Klade důraz na **čisté funkce**, **imutabilitu** a **funkce vyšších řádů**.

- Funkcionální paradigma patří mezi **deklarativní** paradigmata (popisuje *co* se má spočítat, ne *jak*)
- **Zápis programu jako výrazu** $\implies$ vyhodnocení programu je zjednodušování (redukce) výrazu

**Redukce** v kontextu funkcionálního programování znamená postupné aplikování funkce na sekvenci hodnot za účelem jejich kombinace do jedné výsledné hodnoty.

> **Redukční krok** je krok, ve kterém je výraz nebo část výrazu nahrazena jednodušším podvýrazem.

## Redukční strategie

> **Redukční strategie** je předpis určující, který podvýraz se v následujícím kroku redukuje.

Pro ukázky níže uvažujme funkce $F(x) = x + 8$ a $G(x) = x \cdot 5$ a výraz $F(G(3))$.

- **Striktní strategie** $\implies$ při úpravě postupujeme **zevnitř**, tedy nejprve upravíme $X$ v $F(X)$ a až pak $F(X)$
	- Při volání funkce nejprve vyhodnotíme **argumenty**, poté funkci
	- Používají ji **imperativní jazyky** (Java, Python)
	- Příklad: $F(G(3)) \to F(3 \cdot 5) \to F(15) \to 15 + 8$
- **Normální strategie** $\implies$ při úpravě postupujeme **zvenčí**, tedy nejprve aplikujeme vnější funkci $F(X)$ a až pak vyhodnotíme $X$
	- Používá ji **Haskell** (s líným vyhodnocováním — pozor, není totéž co líná strategie)
	- Příklad: $F(G(3)) \to G(3) + 8 \to (3 \cdot 5) + 8 \to 15 + 8$
- **Líná strategie** $\implies$ pamatuje si již vyhodnocené výrazy a žádný nevyhodnocuje opakovaně
	- Nelze ji použít, pokud má funkce **vedlejší efekty**
	- Imperativní jazyky ji omezují na logické výrazy (zkrácené vyhodnocování)
	- Umožňuje zpracovávat **nekonečná data**

**Příklad, kde striktní strategie cyklí a normální ne:**

```haskell
f x = take 3 x
f [1..]
```

Striktní strategie by se snažila vyhodnotit nekonečný seznam `[1..]` celý (zacyklí se), normální vyhodnotí jen první 3 prvky.

> **Haskell** používá normální redukční strategii. Vyhodnocuje pouze to, co je potřeba (**líně**).

## Vlastnosti redukčních strategií

**Churchova–Rosserova věta**
> Výsledná hodnota ukončeného výpočtu výrazu nezáleží na redukční strategii: pokud výpočet skončí, je jeho výsledek vždy stejný.

- Věta **nevylučuje** různé chování při různých strategiích — různou délku výpočtů nebo zacyklení. Ale výsledek (pokud výpočet skončí) musí být vždy stejný.

**Perpetualita**
> Jestliže pro nějaký výraz $M$ existuje redukční strategie, s jejímž použitím se úprava výrazu $M$ zacyklí, pak se výpočet zacyklí i s použitím **striktní** redukční strategie.

$\implies$ Striktní strategie je tedy **nejméně bezpečná**.

**Normalizace**
> Jestliže pro nějaký výraz $M$ existuje redukční strategie, s jejímž použitím se úprava výrazu $M$ nezacyklí, pak se výpočet nezacyklí ani s použitím **normální** redukční strategie.

$\implies$ Normální strategie je tedy **nejbezpečnější**.

# Funkce

**Arita** funkce označuje počet jejích parametrů.
- **Nulární** funkce ($n = 0$) jsou konstanty daného typu
- Dále **unární** (1), **binární** (2), **ternární** (3) funkce

Ne všechny funkce v Haskellu jsou **čisté** $\implies$ mohou existovat i globální proměnné nebo lze zapisovat do souborů.

**Rekurze** je definice funkce / datové struktury pomocí sebe sama.
- **Rekurzivní datová struktura** je třeba strom $\implies$ potomci jsou kořeny podstromů

## Funkce vyšších řádů

> **Funkce vyšších řádů** jsou funkce, které buď berou jako argumenty jiné funkce, nebo vracejí funkce jako výsledek.

Umožňují **abstrakci** a **opakované použití kódu**. Příkladem jsou funkce `map`, `filter`, `reduce`.

```haskell
map not [True,False,False]      ⇝* [False,True,True]
let f x = x + 1 in map f [4,5,6] ⇝* [5,6,7]
map even [3,4,5]                 ⇝* [False,True,False]
filter odd [1,2,3]              ⇝* [1,3]
filter (not.odd) [1,2,3]        ⇝* [2]
```

## Nepojmenované (lambda) funkce

> **Lambda funkce** (anonymní funkce) jsou funkce, které nemají jméno a obvykle jsou definovány přímo v místě, kde jsou potřeba; jinak fungují stejně jako normální funkce.

- Funkci lze takto definovat přímo v místě použití
- Kromě Haskellu jsou např. i v Javě
- Použití v Haskellu: `f = (\x -> x*x + x*x)`

## Modifikátory a aplikace funkcí

**Modifikátor funkce** — např. `flip` $\implies$ prohodí pořadí parametrů funkce:
```haskell
flip f x y = f y x
```

**Částečná aplikace** $\implies$ u funkcí aplikovaných na více parametrů hrozí, že je aplikujeme jen na část argumentů.
- Funkce je vnitřně reprezentována jako **řetězec funkcí po jednom argumentu** (currying)
- Pro obejití lze předat více parametrů najednou jako **n-tici (tuple)**

Modifikaci funkce tak, aby přijímala n-tici parametrů namísto jednotlivých, umožňují funkce `curry` a `uncurry`:
```haskell
curry   :: ((a,b) -> c) -> a -> b -> c
curry f x y = f (x,y)

uncurry :: (a -> b -> c) -> (a,b) -> c
uncurry f (x,y) = f x y
```

# Elementární Haskell

**Haskell** je čistě funkcionální, typově bezpečný jazyk (**silně a staticky typovaný**).
- V Haskellu je vše **immutable** pro zajištění čistoty funkcí
- Kompilátor / interpret: **GHC / GHCi**
- Začátek programu: funkce `main`

**Výpis:**
- `putStr "xd"` $\implies$ na stdout: `xd`
- `x = 5`, pak `print x` $\implies$ `5`

**Priorita v Haskellu:** aplikace funkcí má nejvyšší prioritu. Lokální definice mají vyšší prioritu než globální.

![[haskell-definice.png|585]]

## Typy

> **Typ** je množina hodnot, které vykazují jisté společné vlastnosti.

- Slouží jako **komunikační prostředek** pro správné skládání programů

**Monomorfní typy:**
- `Integer` — libovolně velká celá čísla
- `Int` — celá čísla do velikosti slova procesoru
- `Float` — reálná čísla
- `Rational` — racionální čísla
- `Char` — znak (`'a'`, `'2'`, `'>'`)
- `String` — řetězec (`"Toto je řetězec."`); `String` je totéž co `[Char]`
- `Bool` — pouze 2 hodnoty: `True` a `False`

**Polymorfní typ** $\implies$ tzv. **typová proměnná** (`a`, `b`, …) může zastoupit všechny typy se stejnou konstrukcí:
```haskell
fst :: (a,b) -> a
(not, "Coze?")     :: (Bool -> Bool, [Char])
fst (not, "Coze?") :: Bool -> Bool
```

**Polymorfní typ (Union)** $\implies$ typ s více variantami hodnot:
```haskell
data Maybe a = Nothing | Just a
```

**Kvalifikovaný typ** $\implies$ polymorfní typ s omezením pomocí **typových tříd**.

## Typové konstruktory

Konstruktor skládá z menších částí větší celek. Rozlišujeme **hodnotový** (skládá hodnoty) a **typový** (skládá typy) konstruktor — stejná notace má jiný význam podle úrovně:
```haskell
[('a','a'),('a','a')] :: [(Char,Char)]
--  ^ hodnotové                ^ typové
```

## Typové třídy

> **Typová třída** zahrnuje typy s podobnými vlastnostmi. Umožňuje sdílet kód ve striktně typovaných jazycích.

![[typove-tridy.png|323]]

- `Integral` = celočíselné
- `Num` = numerické
- `Ord` = uspořádatelné
- `Eq` = porovnatelné na rovnost
- `Show` / `Read` = převoditelné na řetězec / z řetězce

Příklady kvalifikovaných signatur:
```haskell
odd :: Integral a => a -> Bool
(+) :: Num a => a -> a -> a
```

Hierarchie tříd (např.): `Eq → Ord → Real → Integral`, `Num → Fractional → Floating`.

## Uživatelské typy

Definují se klíčovým slovem `data` (vlevo název typu, vpravo **hodnotové konstruktory**):
```haskell
data Nazev_typu = Hodnotove_konstruktory
data Dny = Po | Ut | St | Ct | Pa | So | Ne
```

**Vzor** je něco jako struct — pojmenovaná n-tice. Jazyk umí n-tice `("xbarnat", "majen10cm")` i seznamy `[12,43,-3,15,29]`.

**Pattern matching** (mapování na vzor):
```haskell
-- mapování seznamu [1,2,3] na vzor a@(x:t):  a = [1,2,3], x = 1, t = [2,3]
f (a@(x:y)) = x : a ++ y
f [1,2,3] ⇝* [1,1,2,3,2,3]
f []      ⇝* ERROR
```

# Seznamy

Seznamy jsou **immutable** a operace se vyhodnocují **líně** $\implies$ umožňují práci s nekonečnými datovými strukturami.

**Základní funkce:**
- `head` — první prvek, `tail` — zbytek bez prvního prvku
- `null :: [a] -> Bool` — `True`, pokud je seznam prázdný
- `fst`, `snd` — projekce n-tice na první a druhou složku

```haskell
fst :: (a,b) -> a   ;   fst (x,y) = x
snd :: (a,b) -> b   ;   snd (x,y) = y
```

**Konstrukce seznamu** operátorem `(:)` (cons) přidá prvek na začátek:
```haskell
(:) 3 [3,3,3] ⇝ [3,3,3,3]
1:2:3:[]      ⇝ [1,2,3]
'A':"hoj"     ⇝ "Ahoj"
"ahoj" = ['a','h','o','j']
```
Nesprávné použití (typová neshoda): `[2]:[3,4,5]`, `[2,3,4]:5`, `'A':[1,2,3]` $\implies$ ERROR.

**Spojování seznamů:**
- `(++) "Ahoj " "světe!"` ⇝ `"Ahoj světe!"`
- `zip :: [a] -> [b] -> [(a,b)]` — spojí dva seznamy do seznamu dvojic
- `concat [[1,2],[2,3],[3,4]]` ⇝ `[1,2,2,3,3,4]`

## Nekonečné seznamy

Seznamy lze definovat jako nekonečné posloupnosti `[1,2..]`.
```haskell
cycle x = x ++ cycle x            -- nekonečné opakování seznamu
iterate f z = z : iterate f (f z) -- opakovaná aplikace funkce
take 4 (iterate not True) ⇝* [True,False,True,False]
take 4 (iterate (+1) 0)   ⇝* [0,1,2,3]
```

## Intenzionální seznamy

> **Intenzionální seznam** je definice seznamu pomocí pravidel, která přepisují prvky nosné množiny.

```haskell
[ 2*n | n <- [0..9] ]
```

- **Generátor** (`n <- [0..9]`) definuje proměnnou pomocí hodnot v seznamu a kvalifikátorů

## Akumulace a katamorfismus

**Akumulační funkce** $\implies$ akumulují prvky seznamu do jedné hodnoty (např. `sum`).

**Akumulátor** je programovací technika, která umožňuje v některých případech nerealizovat rekurzivní návrat (předáváme průběžný výsledek dál).

> **Katamorfismus** je výraz vzniklý nahrazením hodnotových konstruktorů v nějaké hodnotě algebraického typu jinými funkcemi vhodné arity.

**Fold** (skládání seznamu) — varianty se liší směrem skládání a počáteční hodnotou:
```haskell
foldl1 (*)  [1,2,3,4,5]                ⇝* 120
foldl1 (&&) [True,True,True,False,True] ⇝* False
foldl1 (-)  [2,3,2]                    ⇝* -3
foldr1 (-)  [2,3,2]                    ⇝* 1
foldr1 min  [18,12,23]                 ⇝* 12

foldl (*)  0 [1,2,3,4,5]               ⇝* 0
foldl (&&) False [True,True,True,True] ⇝* False
foldl (-)  0 [2,3,2]                   ⇝* -7
foldr (-)  0 [2,3,2]                   ⇝* 1
```

**Směr skládání** rozhoduje, kam se hromadí závorky. U komutativních operací (`*`, `&&`, `min`) na něm nezáleží, u nekomutativních (`-`) ano:
- **`foldl1`** skládá **zleva** (závorky vlevo): `foldl1 (-) [2,3,2] = ((2 - 3) - 2) = (-1 - 2) = -3`
- **`foldr1`** skládá **zprava** (závorky vpravo): `foldr1 (-) [2,3,2] = (2 - (3 - 2)) = (2 - 1) = 1`

Varianty `foldl1`/`foldr1` nepotřebují počáteční hodnotu (vezmou krajní prvek seznamu). Varianty bez `1` (`foldl`/`foldr`) berou navíc **počáteční hodnotu**, kterou přidají na začátek skládání:
- `foldl (-) 0 [2,3,2] = (((0 - 2) - 3) - 2) = -7`
- `foldr (-) 0 [2,3,2] = (2 - (3 - (2 - 0))) = 1`

# Otázky

**1.** Jaký je rozdíl mezi striktní, normální a línou redukční strategií?

> **Odpověď:** **Striktní** vyhodnocuje zevnitř (nejprve argumenty, pak funkci) — používají ji imperativní jazyky. **Normální** vyhodnocuje zvenčí (nejprve vnější funkci) — používá ji Haskell. **Líná** je normální strategie, která si navíc pamatuje již vyhodnocené výrazy a nevyhodnocuje je opakovaně; umožňuje práci s nekonečnými daty, ale nelze ji použít při vedlejších efektech.

**2.** Co říká Churchova–Rosserova věta?

> **Odpověď:** Pokud výpočet výrazu skončí, je jeho výsledek vždy stejný bez ohledu na zvolenou redukční strategii. Strategie se mohou lišit délkou výpočtu nebo tím, zda se zacyklí, ale výsledná hodnota je shodná.

**3.** Která redukční strategie je nejbezpečnější a proč?

> **Odpověď:** **Normální** strategie (díky vlastnosti **normalizace**) — pokud existuje *jakákoli* strategie, se kterou výpočet skončí, skončí i s normální strategií. Naopak **striktní** je nejméně bezpečná (**perpetualita**): zacyklí-li se jakákoli strategie, zacyklí se i striktní.

**4.** Co je funkce vyšších řádů a k čemu slouží?

> **Odpověď:** Funkce, která bere jako argument jinou funkci nebo funkci vrací jako výsledek (např. `map`, `filter`, `foldr`). Umožňuje abstrakci a opětovné použití kódu.

**5.** Co znamená částečná aplikace funkce?

> **Odpověď:** Aplikace funkce jen na část jejích argumentů. Funkce je vnitřně řetězec unárních funkcí (currying), takže `(+) 3` vrátí novou funkci čekající na druhý argument. Chceme-li předávat parametry „najednou", použijeme n-tici a funkce `curry`/`uncurry`.

# Příklady

**1.** Napište funkci, která vrátí druhý prvek seznamu, je-li aplikována na seznam délky alespoň dva.

> **Odpověď:** Pomocí pattern matchingu vytáhneme druhý prvek vzorem `(_:x:_)`:
> ```haskell
> druhy :: [a] -> a
> druhy (_:x:_) = x
> druhy _ = error
> ```
> Vzor `_:x:_` znamená „libovolný první prvek, druhý prvek `x` a libovolný zbytek". Alternativně: `druhy xs = head (tail xs)`.

# Otázky z ISu

**1.** V základním paradigmatu funkcionálního programování se přepisovatelné proměnné
- běžně používají
- používají pouze jako lokální proměnné
- ✅ vůbec nepoužívají

**2.** Pořadí redukčních kroků při výpočtu ve funkcionálním paradigmatu
- může ovlivnit hodnotu výsledku, ke kterému se program v konečném čase dopočítá.
- ✅ může ovlivnit to, zda se program v konečném čase dopočítá k nějakému výsledku.
- nemá na výpočet programu vůbec žádný vliv

**3.** Pokud se program zacyklí při použití striktní redukční strategie,
- pak se nutně zacyklí i při použití normální redukční strategie.
- ✅ pak se může zacyklit i při použití normální redukční strategie.
- pak se nemůže zacyklit při použití normální redukční strategie.

**4.** Referenčně transparentní programovací jazyk Haskell
- ✅ neumožňuje napsat program, který jako svoji výslednou hodnotu spočítá součet dvou zadaných čísel.
- neumožňuje označit jednu hodnotu více různými proměnnými.
- neumožňuje realizovat grafické rozhraní programu.

**5.** Typ je
- velký týpek, který bojuje za práva všech programátorů.
- ✅ množina hodnot, které vykazují jisté společné vlastnosti.
- syntaktický konstrukt, který spojuje typové proměnné šipkou.

**6.** Při částečné aplikaci funkce na vhodný výraz se počet binárních typových konstruktorů (->) v typu výrazu vzniklého částečnou aplikací v porovnání s původním typem částečně aplikované funkce
- garantovaně zvýší
- nezmění
- garantovaně sníží
- ✅ nelze říci, záleží na konkrétní situaci

**7.** Funkce map a filter, které pracují nad seznamy, jsou
- komutativní, tj. nezáleží na pořadí jejich aplikace
- typově identické, neboť pro seznam vrací seznam
- ✅ funkce vyšších řádů
- neplatí ani jedno z výše uvedených tvrzení

**8.** Funkce, která jako svůj první parametr vyžaduje hodnotu nějakého rekurzivně definovaného typu, musí ve své definici
- mít právě dva řádky definice (dva definiční případy), a to jeden pro bázi a jeden řádek pro rekurzivní rozvoj
- mít právě tolik definičních případů, kolik je datových konstruktorů v typu uvedené datové struktury
- ✅ neplatí žádné z ostatních tvrzení

**9.** Použití akumulátoru je
- ✅ označení programovací techniky, která umožňuje v některých případech nerealizovat rekurzivní návrat
- postup, kdy do přepisovatelné proměnné postupně akumuluji hodnoty v zadaném seznamu
- programovací technika, která výrazně šetří výpočtem spotřebovanou energii

**10.** Lambda funkce (nepojmenované funkce)
- ✅ mají zcela stejné chování a typy jako pojmenované funkce
- na rozdíl od pojmenovaných funkcí nelze vůbec skládat
- se chovají stejně jako pojmenované funkce, ovšem jsou jiného typu