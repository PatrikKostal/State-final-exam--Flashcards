# 3. Nízkoúrovňové výpočetní architektury

> **Zadání:** Číselné soustavy, vztahy mezi soustavami, zobrazení celého čísla v počítači, aritmetika. Kódy, vnitřní, vnější, detekční a opravné. Obvody a paměti: parametry, architektura. Procesor, programování, mikroprogramování. Architektury: RISC/CISC, vyrovnávací paměti. (PB151)

# Číselné soustavy

**Číselná soustava** je způsob reprezentace čísel pomocí posloupnosti číslic. Dělí se na:

- **Polyadické** (poziční) $\Rightarrow$ desítková, binární atd.
- **Nepolyadické** (nepoziční) $\Rightarrow$ římské číslice.

**Vlastnost polyadických soustav** – hodnotu čísla získáme jako součet číslic vynásobených mocninou základu $z$:

$$A = a_n \cdot z^n + a_{n-1} \cdot z^{n-1} + \dots + a_1 \cdot z^1 + a_0 \cdot z^0$$

## Převody

- **BIN $\leftrightarrow$ OCT** – 1 číslice OCT = 3 bity BIN.
- **BIN $\leftrightarrow$ HEX** – 1 číslice HEX = 4 bity BIN.
- **OCT $\leftrightarrow$ HEX** – převést na 2 kroky (OCT $\leftrightarrow$ BIN $\leftrightarrow$ HEX).

# Reprezentace čísel

**Nejčastější typy kódování:** pevná řádová čárka, pohyblivá řádová čárka, BCD.

## Přirozený kód

**Přirozený (přímý) kód** ukládá do bitů přímo **binární obraz čísla**. Nejlevější bit indikuje znaménko.

- Rozsah $(-127, 127)$ – má kladnou i zápornou nulu.
- Je intuitivní, ale vyžaduje složitější aritmetické operace.

## Inverzní kód

**Inverzní kód** funguje pro kladná čísla stejně jako přirozený kód. Záporná čísla mají bity invertované. Při přetečení ze znaménkového bitu, nebo při součtu kladného a záporného čísla, kdy vznikne kladný výsledek, **musíme přičíst +1**.

- **Opačné číslo lze získat jednoduše inverzí.** Sčítání / odčítání lze nahradit **slučováním**.
- Rozsah $(-127, 127)$ – má kladnou i zápornou nulu.

![[inverzni-kod.png|294]]
## Doplňkový kód

**Doplňkový kód** řeší problémy přirozeného i inverzního kódu.

- Jde o nejrozšířenější reprezentaci čísel se znaménkem v počítačích.
- Kladná čísla jsou v přirozeném kódu, záporná převádíme (tam i zpět) negací bitů + 1.
- **Výhodou** je, že nemáme 2 různé nuly.
- Odpadá nutnost korekce při přetečení.
- Rozsah je nesymetrický $(-128, 127)$.

![[doplnkovy-kod.png|551]]
## Aditivní kód

**Aditivní kód** je tzv. kód s posunutou nulou.

K binárnímu obrazu čísla přičítáme zvolenou konstantu **posun (bias)** $\Rightarrow$ hodnota 0 se pak uloží jako bitový vzor rovný tomuto posunu (**obraz nuly**), který leží zhruba uprostřed rozsahu (pod ním záporná čísla, nad ním kladná).

- **Rozsah závisí na zvoleném posunu** – posun jen určuje, které nejmenší číslo lze reprezentovat (vzorů je vždy $2^n$).
- V praxi se používají dva posuny: **$2^{n-1}-1$** (obraz nuly `0111…1`, používá exponent v **IEEE 754**) a **$2^{n-1}$** (obraz nuly `1000…0`, tzv. **offset binary** = dvojkový doplněk s obráceným nejvyšším bitem).
- **Výhodou** je, že lze kladná i záporná čísla přímo porovnávat jako nezáporné bitové vzory.

| Desítkový zápis | Aditivní kódování (posun 8) | Dvojkový doplněk |
|---|---|---|
| 7 | 1111 | 0111 |
| 6 | 1110 | 0110 |
| 5 | 1101 | 0101 |
| 4 | 1100 | 0100 |
| 3 | 1011 | 0011 |
| 2 | 1010 | 0010 |
| 1 | 1001 | 0001 |
| 0 | 1000 | 0000 |
| −1 | 0111 | 1111 |
| −2 | 0110 | 1110 |
| −3 | 0101 | 1101 |
| −4 | 0100 | 1100 |
| −5 | 0011 | 1011 |
| −6 | 0010 | 1010 |
| −7 | 0001 | 1001 |
| −8 | 0000 | 1000 |

## Váhový kód

**Váhový kód** přiřazuje jednotlivým řádům nové „váhy“.

- Např. pro váhy 4-4-3-2 bychom zapsali číslo 8 jako `1100`.
- 4 bity dvojkové soustavy by měly váhy 8-4-2-1.
- Variantou je tzv. **komplementární kód** – čísla jsou si navzájem inverzní se svým zbytkem do 9.
	- Kód 3-1-3-2 je komplementární, neboť 4 zapíšeme jako `1100` a 5 jako `0011` $\Rightarrow$ jsou si inverzní a jejich součet je 9.

## BCD

**BCD** je váhový kód 8-4-2-1, kde každé 4 bity reprezentují desítkovou číslici. Data tedy zabírají více paměti, ovšem vyhneme se zaokrouhlovacím chybám $\Rightarrow$ doslova simulujeme desítkovou soustavu v bitech.

- **Unpacked decimal** $\Rightarrow$ 1 bajt == 1 číslice, plýtvá místem. 4 nejvyšší bity mohou obsahovat konstanty / dodatečné informace (např. znaménko, nebo prostě `1111`).
- **Packed decimal** $\Rightarrow$ každé 4 bity obsahují číslici.

Automaticky můžeme převod implementovat pomocí **čítače**, nebo **Hornerova schématu**. Převod mezi binárním a BCD zápisem se realizuje algoritmem posuvů a korekcí (shift-and-add-3, resp. korekce −3 / +3 podle směru převodu, když číslice $\geq 5$).

![[bcd-pervod.png|539]]
## IEEE 754

**IEEE 754** je standard pro reprezentaci desetinných čísel v binární soustavě.

- Využívá tzv. **plovoucí desetinnou čárku** $\Rightarrow$ semilogaritmický tvar zobrazení čísla $F = m \cdot Z^{exp}$.
- **Exponent** $\Rightarrow$ aditivní kód, **mantisa** $\Rightarrow$ přímý kód.

| ± (1 b) | Exponent (8 b) | Mantisa (23 b) |
|---|---|---|

Mantisa se ukládá **normalizovaně** – číslo se posune tak, aby před řádovou čárkou byla jediná `1`. Ta se neukládá (tzv. *implicitní jednička*), v paměti je jen zlomková část.

**Příklad – uložení čísla $6{,}5$ jako 32bitový `float`:**

1. **Binárně:** $6{,}5_{10} = 110{,}1_2$.
2. **Normalizace:** $110{,}1_2 = 1{,}101_2 \cdot 2^{2}$ $\Rightarrow$ exponent $= 2$, mantisa $= 101$ (vedoucí `1` se neukládá).
3. **Znaménko:** kladné $\Rightarrow$ `0`.
4. **Exponent v aditivním kódu** (posun 127): $2 + 127 = 129 = 10000001_2$.
5. **Mantisa** (doplněná zprava nulami na 23 bitů): `10100000000000000000000`.

$$\underbrace{0}_{\pm}\;\underbrace{10000001}_{\text{exp}}\;\underbrace{10100000000000000000000}_{\text{mantisa}}$$

# Kódy

Kódy se dělí na **vnitřní**, **vnější**, **detekční** a **opravné**.

## Vnitřní kódy

**Vnitřní kódy** jsou kódy použité uvnitř systému. Např. k reprezentaci čísel: BCD, doplňkový kód…

- **K reprezentaci textu:** ASCII: 1 bajt = 1 písmeno.

## Vnější kódy

**Vnější kódy** jsou kódy, kde má každý znak svoji ordinální numerickou hodnotu.

- **Unicode** $\Rightarrow$ 1 znak má více bajtů. Větší znaková sada.
- **UTF-8**…

## Detekční kódy

**Detekční kódy** zavádějí určitou redundanci, aby bylo možné odhalit poškozená data.

- **Paritní bity:** přidává jeden bit, aby celkový počet jedniček v kódu byl sudý nebo lichý.
- **Kontrolní součty (checksums):** hodnoty vypočítané z datového bloku, které se přidávají k datům a umožňují detekci chyb při přenosu $\Rightarrow$ např. doslovně součet všech přenášených čísel.
- **CRC (Cyclic Redundancy Check):** pokročilejší metoda kontroly, která používá polynomiální dělení ke generování kontrolních kódů.

## Opravné kódy

**Opravné kódy** poskytují dostatečnou redundanci k opravě poškozených dat.

- **Zdvojení** informace by umožnilo chybu detekovat.
- **Ztrojení** ji umožní také opravit.
- **Hammingův kód** implementuje kontrolní matice $\Rightarrow$ paritní bity na pozicích (mocninách dvojky) v datovém bloku. Každý paritní bit symbolizuje paritu počtu jedniček v podmnožině bitů.
	- Varianta $(7,4)$ má **minimální Hammingovu vzdálenost 3**. Obecně platí: opravit lze $\lfloor (d-1)/2 \rfloor$ chyb, detekovat $d-1$ chyb.
	- $(7,4)$ tedy **opraví 1 libovolný bit** (datový i paritní – podle syndromu, tj. které parity nesedí) a **detekuje 2 chyby** (ale neopraví je).
	- **Rozšířený Hammingův kód $(8,4)$** přidá celkový paritní bit $\Rightarrow$ vzdálenost 4, tzv. **SECDED** (Single Error Correction, Double Error Detection).

![[hamminguv-kod.png|178]]

Grafické zobrazení Hammingova kódu pro 4 datové bity $(d1,d2,d3,d4)$ a 3 paritní bity $(p1,p2,p3)$
# Obvody

## Booleova algebra

**Booleova algebra** je nauka o operacích na množině $\{0, 1\}$. Používá se v obvodech, $1 = \text{TRUE}$, $0 = \text{FALSE}$. Základem Booleovy algebry jsou logické proměnné a logické operace.

- Zápisy pravdivostní tabulkou, pomocí Vennových diagramů nebo jako logické rovnice.
- **Booleova algebra** je šestice $(A, \wedge, \vee, \neg, 1, 0)$, kde:
	- $A$ – množina literálů (proměnných), které nabývají hodnoty 0 a 1.
	- $\wedge$ – konjunkce (AND, `&&`, $\times$, sériové zapojení).
	- $\vee$ – disjunkce (OR, `||`, $\cup$, +, paralelní zapojení).
	- $\neg$ – negace (-, $\overline{x}$, NOT, !).

**Základní pravidla:**

| Pravidlo | Zápis | Význam |
|---|---|---|
| komutativita | $x \wedge y = y \wedge x$ | nezáleží na pořadí |
| distributivita | $x \vee (y \wedge z) = (x \vee y) \wedge (x \vee z)$ | závorky můžeme „roznásobit“ |
| neutralita | $x \wedge 1 = x$,  $x \vee 0 = x$ | $x$ a 1 je $x$; $x$ nebo 0 je $x$ |
| komplementarita | $x \wedge \neg x = 0$,  $x \vee \neg x = 1$ | $x$ a $\neg x$ je 0; $x$ nebo $\neg x$ je 1 |
| nedegenerovanost | $1 \neq 0$ | 1 se nerovná 0 |
| asociativita | $(x \vee y) \vee z = x \vee (y \vee z)$,  $(x \wedge y) \wedge z = x \wedge (y \wedge z)$ | |
| absorpce | $x \vee (x \wedge y) = x$,  $x \wedge (x \vee y) = x$ | |
| agresivita nuly | $x \wedge 0 = 0$ | |
| agresivita jedničky | $x \vee 1 = 1$ | |
| idempotence | $x \vee x = x$,  $x \wedge x = x$ | |
| absorpce negace | $x \vee (\neg x \wedge y) = x \vee y$,  $x \wedge (\neg x \vee y) = x \wedge y$ | |
| dvojitá negace | $\neg(\neg x) = x$ | |
| De Morganovy zákony | $\neg x \wedge \neg y = \neg(x \vee y)$,  $\neg x \vee \neg y = \neg(x \wedge y)$ | |
| komplementárnost 0 a 1 | $\neg 0 = 1$,  $\neg 1 = 0$ | |

## Hradla

**Hradla** se skládají z tranzistorů. Základní typy a jejich výstupy:

- **NOT:** $Y = \overline{A}$
- **AND:** $Y = A \cdot B$
- **OR:** $Y = A + B$
- **NAND:** $Y = \overline{A \cdot B}$
- **NOR:** $Y = \overline{A + B}$
- **XOR (exclusive OR):** $Y = \overline{A}B + A\overline{B}$

![[hradla.png|607]]

Hradla nemají žádnou paměť. K tomu existují složitější obvody (sekvenční).

# Paměti

**Paměť** je elektronické médium pro uchovávání dat.

- **Druhy:** vnější, vnitřní, permanentní, registry.
- **Vlastnosti:** kapacita, přístup (přímý / sekvenční), perzistence, spolehlivost, rychlost…
- **Paměťová buňka** se skládá z 1 tranzistoru a 1 kondenzátoru.

**Typy pamětí:**

- **Vnitřní paměť** $\Rightarrow$ pro čtení i zápis: RWM (Read-Write), RAM (Random Access).
	- Je **volatilní**, tj. drží data jen pokud je napájena.
	- **Registry** – paměť přímo na čipu procesoru, nejrychlejší.
- **Vnější paměť** $\Rightarrow$ dlouhodobé uchování dat (HDD, SSD, USB flash disky).
- **Permanentní paměť** $\Rightarrow$ ROM (Read-Only), nevolatilní, vhodné pro různé firmware apod.
	- **EPROM** – paměť, kterou lze smazat ultrafialovým světlem a znovu naprogramovat.
	- **EEPROM** – lze mazat a normálně přepisovat.
- **Asociativní paměť** $\Rightarrow$ CAM (Content Addressable).
	- K datům lze přistupovat na základě jejich tagů a ne adres $\Rightarrow$ vhodné např. v síťových směrovačích pro rychlé hledání IP adres.
	- Typicky cache paměti.

## Endianita

**Endianita** je způsob uložení čísel v paměti.

- **Little-Endian** $\Rightarrow$ nejméně významný bajt bude na nejmenší adrese – pořadí bajtů 4 – 3 – 2 – 1.
- **Big-Endian** $\Rightarrow$ nejvýznamnější bajt bude na nejmenší adrese – pořadí bajtů 1 – 2 – 3 – 4.
- **Middle-Endian** $\Rightarrow$ pořadí bajtů 3 – 4 – 1 – 2 nebo 2 – 1 – 4 – 3.

Little-Endian má výhodu, že stejná hodnota s různým typem má stejnou adresu (např. 8bitový `char` a 32bitový `int`).

## Cache

**Cache** je paměť typu SRAM (Static RAM). Paměť je **asociativní** (adresovatelná, lze ji „indexovat“). Má specifikovanou část pro instrukce a pro data.

Často existuje více úrovní cache pamětí. Čím dále od procesoru, tím větší a pomalejší.

- **L1 cache** $\Rightarrow$ každé jádro procesoru má vlastní L1 cache, přístup v řádu 1–3 cyklů.
- **L2 cache** $\Rightarrow$ sdílená napříč několika jádry, ale většinou pro 1 jádro. Stále je v procesoru.
- **L3 cache** $\Rightarrow$ sdílená napříč všemi jádry, může mít i několik megabajtů.
	- Využívá Read-Write lock.

![[l1-l2-l3-cache.png|183]]

**Cachovací algoritmy** určují, která data z cache vylít a která ponechat.

- **LRU (Least Recently Used)** $\Rightarrow$ v případě požadavku na paměť vylije nejdéle nepoužitá data.
- **LFU (Least Frequently Used)** $\Rightarrow$ v případě požadavku na paměť vylije nejméně využívanou informaci (počítá si přístupy).

**Vyrovnávací paměť** obsahuje frontu požadavků na zápis dat, aby nebyl procesor blokován.

**Mezipaměť** je podobná vyrovnávací paměti, ale řeší stejný problém v opačném směru. Ukládá často načítaná data do rychlejší paměti, aby snížila dobu přístupu. Používá se i technika **prefetch**.

Cache i RAM jsou kombinací obou.

# Procesor

**Procesor** je synchronní stroj řízený řadičem. Pracuje ve dvojkovém doplňkovém kódu. Provádí výpočet vykonáváním instrukcí $\Rightarrow$ **elementárních příkazů** definovaných v instrukčním setu.

Dělí se dle:

- **velikosti slova v bitech** tj. šířka operandu, který je procesor schopen zpracovat v jednom kroku (16bitový, 32bitový, 64bitový…).
- **struktury procesoru** – RISC, CISC, jednoduché procesory (ochrana paměti), jednočipový mikropočítač (samostatně činný procesor, v periferiích), DSP (digitální signálový procesor zaměřený na zpracování signálu).
- **počtu jader**.

**Instrukce** je pokyn k elementárnímu výpočtu. Jde o **operační kód + nepovinné adresy operandů**. Zapisují se číselně, např. `0x31012000`.

**Základní frekvence** – tzv. takt procesoru. Udává, kolik provede operací za sekundu (ne instrukcí – viz dále).

**Slovo** je největší velikost dat, se kterou procesor dokáže pracovat naráz (třeba 32 bitů).

- **Strojový cyklus** je čas potřebný ke čtení jednoho slova z paměti (v taktech).
- **Instrukční cyklus** je čas potřebný pro výběr a provedení instrukce (v taktech).
- Výběr instrukcí řídí **registr PC** – čítač instrukcí.

## Části procesoru

- **Sada registrů** je speciální úložiště přímo v procesoru (velikost je 1 slovo).
	- Každý procesor může mít více registrů. Dělí se na obecné a řídicí (adresy, stavové registry).
	- 1 registr je vlastně *1 proměnná*, nedělí se na bajty, je monolitický.
	- Registry nejsou indexovatelné jako obyčejná paměť. Jména registrů jsou pevnou součástí instrukcí $\Rightarrow$ máme instrukce pro každou kombinaci registrů.
	- **A** – střádač – 8bitový (bajt) (Accumulator).
	- **PC** – čítač instrukcí – 16bitový (slovo) (Program Counter) – drží virtuální adresu vykonávané instrukce $\Rightarrow$ rozhoduje o směru instrukčního toku.
- **Paměť** – 64 KB.
	- adresovatelná jednotka = bajt.
	- data – 8bitová.

> Konkrétní šířky (A 8 bitů, PC 16 bitů, paměť 64 KB) **závisí na procesoru** – jde o hodnoty didaktického 8bitového modelu (typ Intel 8080). Šířka PC určuje velikost adresovatelné paměti ($2^{16}$ = 64 KB). Dnešní procesory mají typicky 64bitové registry i PC.

## Fáze procesoru

- **Výběr** (operačního kódu z paměti nebo operandu / adresy operandu z paměti).
- **Provedení** instrukce.
- **Obsluha přerušení.**

Fáze řídí **PC** (Program Counter) a **IP** (Instruction Pointer).

**Stav procesoru** se skládá z:

- hodnot uložených v aritmetických registrech,
- hodnoty programového čítače,
- hodnoty ukazatele zásobníku.

## Instrukční set

- **LDA** (Load A Direct) $\Rightarrow$ naplní registr A obsahem bajtu z paměti.
- **STA** (Store A Direct) $\Rightarrow$ uloží registr A do paměti.
- **JMP** (Jump Unconditional) $\Rightarrow$ nepodmíněný skok na adresu (např. pro spuštění podprogramu).
- **MOV** $\Rightarrow$ přiřadí hodnotu z registru do registru.
- **Aritmetické:** ADD, SUB, DIV, MUL, INC, DEC…
- **Logické:** AND, OR, XOR…
- **Podmíněné skoky** – na základě flagů:
	- **JC** $\Rightarrow$ CY=1
	- **JNC** $\Rightarrow$ CY=0
	- **JZ** $\Rightarrow$ Z=1
	- **JNZ** $\Rightarrow$ Z=0
	- **JP** $\Rightarrow$ S=0
	- **JM** $\Rightarrow$ S=1
- **Zásobník** $\Rightarrow$ PUSH, POP, nemá kontrolu přetečení.

## Zásobník volání

**Zásobník volání (callstack)** je spojitá oblast virtuálního adresního prostoru $\Rightarrow$ pamatuje si původní adresu při zanoření do podprogramu, aby se mohl program vrátit zpátky.

Každý **stack-frame** podprogramu obsahuje lokální proměnné (Locals), návratovou adresu (Return Address) a parametry (Parameters). **Stack Pointer** ukazuje na vrchol zásobníku, **Frame Pointer** na začátek aktuálního rámce.

> Zásobník a zásobník volání je to samé. V kontextu zásobník vs. halda jde o statickou vs. dynamickou alokaci.

![[zasobnik.png|544]]

# Přerušení

Procesor (1 jádro) **přeruší** práci a začne se věnovat něčemu jinému.

- Přerušení běží v privilegovaném režimu.
- **K přerušení může dojít** pouze mezi instrukcemi, nikoli během nich.
- Procesor mívá flag, který **povoluje / zakazuje** přerušení (IF – Interrupt Flag).
- Přerušení je zakázáno bezprostředně po zahájení obsluhy předchozího přerušení.
	- Zákaz je jen automatický a krátký – na dobu **uložení kontextu**; obsluha pak může přerušení znovu povolit, díky čemuž se mohou **nořit** (typicky jen přerušení s vyšší prioritou).
	- Přerušení vzniklé během zákazu se **neztratí** – zůstává **čekající (pending)** a doručí se po povolení. Ztratit se může jen shluk událostí na stejné lince nad rámec bufferu / pending bitu.

V operačním systému se přerušení používá např. k signalizování vstupu na periferii.

- Čili k synchronizaci periferie a softwaru $\Rightarrow$ **jde o synchronizační prostředek**.

**Přerušovací systém** pozastaví právě prováděnou akci a uloží její stav (preemptivně).

- Přerušení se mohou **nořit** $\Rightarrow$ čili **přerušení může přerušit přerušení**.

**Obsluha přerušení** je realizována podprogramem, který rozliší typ přerušení a správně na něj reaguje.

- Po obsloužení se vykoná instrukce RET a pokračuje se v předchozí práci.

**Typů přerušení** je celkově 256 a jsou uloženy v tabulce spolu s příslušnými podprogramy. Tabulka přerušení je přístupná z každého adresního prostoru, aby se nemusel přepínat proces.

**Souběh přerušení** je ošetřen spinlockem napříč jádry a **explicitním zákazem přerušení** na jádře, které zrovna zpracovává nějaké přerušení. (Spinlock = musí se na něj aktivně čekat.)

## Průběh přerušení

1. Procesor obdrží signál přerušení $\Rightarrow$ dokončí současnou instrukci a přepne do **obsluhy přerušení**.
2. Při vstupu do obsluhy se zakážou další vnější přerušení a na stack se uloží přerušená práce.
3. Obsluha vykoná akci a uvede procesor zpátky do původního stavu.
4. Naplánuje zbývající akce (obsluha druhé úrovně) na pozdější vykonání – tento krok vyžaduje komunikaci se zbytkem jádra (někde musí informaci o potřebné návazné akci převzít jiná část jádra, která je s obsluhou přerušení jinak souběžná).

## Základní typy přerušení

- **Vnější přerušení (hardwarové)** $\Rightarrow$ přichází ze vstupně-výstupních zařízení.
	- Vstupně-výstupní zařízení si může asynchronně vyžádat pozornost procesoru a zajistit tak svoji obsluhu.
	- Vnější přerušení jsou do procesoru doručována prostřednictvím **řadiče přerušení**, což je specializovaný obvod, který umožňuje stanovit prioritu jednotlivých přerušení, rozdělovat je mezi různé procesory a další související akce.
- **Vnitřní přerušení** vyvolává sám procesor, který tak signalizuje problémy při zpracovávání strojových instrukcí a umožňuje operačnímu systému na tyto události nejvhodnějším způsobem reagovat. Jedná se například o pokus dělení nulou, porušení ochrany paměti, nepřítomnost matematického koprocesoru, výpadek stránky a podobně.
- **Softwarové přerušení** je speciální strojová instrukce (obvykle je jich v procesoru k dispozici několik). Tento typ přerušení je na rozdíl od druhých dvou typů **synchronní**, je tedy vyvoláváno zcela záměrně umístěním příslušné strojové instrukce přímo do prováděného programu.
	- Jedná se o podobný způsob jako vyvolání klasického podprogramu (podprogramem je zde ISR = obsluha přerušení uvnitř operačního systému), avšak procesor se může zachovat jinak. Instrukce softwarového přerušení se proto **využívá pro vyvolání služeb operačního systému z běžícího procesu** (tzv. **systémové volání**).
	- Uživatelská úloha tak sice nemůže skočit do prostoru jádra operačního systému, ale může k tomu využít softwarové přerušení. Při použití privilegovaného režimu může softwarové přerušení aktivovat privilegovaný stav.

## Offload přerušení

Některé jednotky, např. síťová karta, mohou být mapovány do paměti a mít vlastní výpočetní jednotku, která přerušení zpracuje a zapíše sama do paměti tak, aby nemusela obtěžovat procesor.

# Mikroprogramování

**Mikroprogramování** je technika používaná v návrhu a implementaci procesorů, kde se instrukce procesoru realizují prostřednictvím sekvence jednodušších operací nazývaných **mikroinstrukce**. Tyto mikroinstrukce jsou uloženy v takzvané mikroprogramové paměti (microcode storage), která je obvykle menší než hlavní paměť a je rychlejší na přístup.

- **Mikroprogramování** je psaní mikrokódu.
- **Mikroinstrukce** $\Rightarrow$ základní operace procesoru na nejnižší úrovni (HW-level).
- **Mikroprogramový řadič** je řadič řízený mikroprogramem.

Typicky třeba Addition $\Rightarrow$ read A, read B, ALU addition, store to A.

Umožňuje definici složitějších operací k instrukčnímu setu.

> **Chyby v mikrokódu** mohou vést k bezpečnostním zranitelnostem – např. [Meltdown](https://en.wikipedia.org/wiki/Meltdown_(security_vulnerability)).

# Architektury

## Von Neumannova architektura

**Von Neumannova architektura** je abstrakce počítače. Definuje 5 hlavních modulů:

![[von-neumannova-arch.png|472]]

- **Vstupní zařízení:** zařízení určená pro vstup programu a dat.
- **ALU** (aritmeticko-logická jednotka): jednotka provádějící veškeré aritmetické výpočty a logické operace.
	- Obsahuje sčítačky, násobičky a komparátory.
- **Řadič:** řídicí jednotka, která řídí činnost všech částí počítače.
	- Toto řízení je prováděno pomocí řídicích signálů, které jsou zasílány jednotlivým modulům.
	- Reakce na řídicí signály, stavy jednotlivých modulů jsou naopak zasílány zpět řadiči pomocí stavových hlášení.
- **Operační paměť:** slouží k uchování zpracovávaného programu, zpracovávaných dat a výsledků výpočtu.
- **Výstupní zařízení:** zařízení určená pro výstup výsledků, které program zpracoval.

Předpis pro řešení úlohy je převeden do posloupnosti instrukcí. Údaje a instrukce jsou vyjádřeny binárně a uchovávají se v paměti na místech označených adresami. Ke změně pořadí provádění instrukcí se používají instrukce podmíněného a nepodmíněného skoku. Programem řízené zpracování dat probíhá v počítači samočinně.

**Princip:**

- Do operační paměti se pomocí vstupních zařízení přes ALU umístí program, který bude provádět výpočet. Stejným způsobem se do operační paměti umístí data, která bude program zpracovávat.
- Pak proběhne vlastní výpočet, jehož jednotlivé kroky provádí ALU.
- Tato jednotka je v průběhu výpočtu spolu s ostatními moduly řízena řadičem počítače.
- Mezivýsledky výpočtu jsou ukládány do operační paměti.
- Po skončení výpočtu jsou výsledky poslány přes ALU na výstupní zařízení.

### Odlišnosti dnešních počítačů

- Podle von Neumannova schématu počítač pracuje vždy nad jedním programem. To vede k velmi špatnému využití strojového času. Je tedy obvyklé, že počítač zpracovává paralelně více programů zároveň (**multitasking**).
- Počítač může disponovat i více než jedním procesorem.
- Existují vstupní / výstupní zařízení, která umožňují jak vstup, tak výstup dat (programu).
- Program se do paměti nemusí zavést celý, ale je možné zavést pouze jeho část a ostatní části zavádět až v případě potřeby.
- Přístup do paměti nemusí být nutně přes logickou jednotku (**DMA**).

## Harvardská architektura

**Harvardská architektura** má **oddělenou paměť (a sběrnici) pro instrukce a pro data** – na rozdíl od von Neumanna, kde sdílí jednu.

- **Výhoda:** instrukce a data lze číst současně $\Rightarrow$ rychlejší, navíc nelze přepsat kód jako data (bezpečnost).
- **Nevýhoda:** méně flexibilní, dražší.
- Používá se v **mikrokontrolerech a DSP**. Moderní CPU jsou hybridní (**modifikovaná Harvardská**) – sdílená hlavní paměť, ale oddělená L1 cache pro instrukce a data.

![[harvardska-architektura.png|312]]

## RISC (i860) – Reduced Instruction Set Computer

**RISC** je architektura s instrukcemi navrženými tak, aby byly rychlé a jednoduché.

- V každém taktu by měla být dokončena jedna instrukce, ale její vykonání může trvat déle.
	- Umožňuje to **pipelining (zřetězení)** – fáze instrukce (Fetch, Decode, Execute, Memory, Write-back) se překrývají jako pásová výroba. Jedna instrukce trvá víc taktů (**latence**), ale dokončí se ~1 instrukce/takt (**propustnost**, CPI ≈ 1). Pevná délka a jednotný formát RISC instrukcí zřetězení usnadňují.
- Malý počet instrukcí a způsobů adresování.
- Práce s pamětí výhradně pomocí LOAD / STORE.
- Instrukce mají pevnou délku a jednotný formát.
- RISC vyžaduje méně tranzistorů než CISC $\Rightarrow$ **více místa pro registry**.
- Složitost se z HW přesouvá do kompilátoru.

**RISC** $\Rightarrow$ více kódu, méně instrukcí, jednodušší HW, složitější kompilátor, rychlejší běh. **Využití** v mobilních procesorech (ARM).

## CISC (8086) – Complex Instruction Set Computer

**CISC** je architektura s velkým instrukčním setem $\Rightarrow$ kompaktní kód. Jednodušší návrh překladačů. Nízký výkon. **Využití** v Intel x86.

| RISC | CISC |
|---|---|
| Méně bitů na operační kód $\Rightarrow$ menší instrukční set. | Více bitů na operační kód $\Rightarrow$ větší instrukční set. |
| Každá instrukce dělá méně. | Každá instrukce zvládne více. |
| Sečtení dvou čísel: `LDA X`, `ADD Y`. | Sečtení dvou čísel: `ADD X, Y`. |
| Více instrukcí na úkol; důraz na snížení počtu cyklů na jednu instrukci. | Méně instrukcí na úkol; důraz na málo řádků kódu, ale více cyklů na instrukci. |
| Více RAM na uložení instrukcí. | Spustitelný kód zabírá méně RAM. |
| Vysokoúrovňový kompilátor je složitější a pomalejší (více práce). | Vysokoúrovňový kompilátor je jednodušší a rychlejší (objektový kód blíže zdroji). |
| Programátoři v assembleru mají více práce. | Snazší pro programátory v assembleru. |
| Jednodušší čipy, méně součástek, levnější výroba. | Složitější čipy, dražší návrh i výroba. |
| Více bitů na operand $\Rightarrow$ přímo adresovatelných více míst v paměti. | Méně bitů na operand $\Rightarrow$ méně přímo adresovatelných míst. |
| Méně adresovacích režimů. | Více adresovacích režimů. |
