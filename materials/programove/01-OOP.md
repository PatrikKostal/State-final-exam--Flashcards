# 1. Podprogramy a objektově orientované programování

> **Zadání:** Podprogramy, rozsahy jmen, předávání hodnot, výjimky. Objektově orientované programování. Zapouzdření, dědičnost, polymorfismus - principy, použití a implementace. Realizace v jazycích C#, C++ nebo Java (dle vlastní volby). (PB006)

# Programování

**Programovací jazyk** je prostředek pro zápis algoritmů $\Rightarrow$ **program**.

## Dělení dle paradigmat

- **Procedurální (imperativní)** — zásadní je pořadí instrukcí, popisuje jednotlivé úkony algoritmu
	- **Strukturované** (např. C, Pascal) — bloky, cykly, ify
	- **Nestrukturované** (např. FORTRAN, COBOL) — `goto`
	- **Objektově orientované** (např. Java) — objekty
- **Neprocedurální (deklarativní)** — programujeme pomocí definic. Důležité je, *co* se má udělat, ne *jak* se to má udělat
	- **Funkcionální** (Haskell) — všechno jsou funkce
	- **Logické** (Prolog) — definice toho, co je pravda

## Dělení dle míry abstrakce

- **Nízkoúrovňové** $\Rightarrow$ Assembler, C
- **Vysokoúrovňové** $\Rightarrow$ zbytek

## Dělení dle kompilace

**Kompilované** jazyky musí kód nejprve zkompilovat (přeložit do strojového kódu).
- Kompilátor vyplivne spustitelnou binárku obsahující statické dependencies
- Např. C, Pascal, Java

**Interpretované** jazyky:
- Mohou za běhu přímo interpretovat
- Mohou se za běhu překládat do strojového kódu (Java – JIT compiler)
- Mohou se překládat do mezikódu (Python)
- Za běhu není prostor pro **compiler-side** optimalizace
- Výhodou je vysoká **kompatibilita** a přehlednost, vysokoúrovňová správa paměti

# Datové typy

## Jednoduché

- **Ordinální** (celá čísla, boolean, char, enum)
	- **celá čísla** $\Rightarrow$ integer (32 bit), bigInt (libovolná přesnost, omezená jen pamětí)
	- **char** $\Rightarrow$ reprezentace znaku, často ASCII nebo UTF-8
	- **enum** $\Rightarrow$ výčtový typ (specifikuje konstanty, vnitřně celočíselná reprezentace)
- **Neordinální** (desetinná čísla, void)
	- **desetinná čísla** $\Rightarrow$ float (32 bit), double (64 bit), half (16 bit), standard IEEE 754
		- Reprezentovaná znaménkovým bitem, exponentem a mantisou
		- Nepřesné $\Rightarrow$ `0.1 + 0.2 = 0.3000004`
	- **prázdný typ (void)** $\Rightarrow$ indikuje žádnou hodnotu; ukazatel na hodnotu neznámého typu (`void*`)

## Složené

> Pole, string, list, struct, DateTime…

- **Pole** $\Rightarrow$ přístup k prvku přes index
- **String** $\Rightarrow$ pole charů. Může být statické (immutable) nebo dynamické (mutable)
- **List** $\Rightarrow$ dynamická lineární struktura
- **Struct** $\Rightarrow$ tzv. záznam. Obsahuje více pojmenovaných hodnot
- **Union** $\Rightarrow$ typ zahrnující více možných typů, velikost podle největšího možného
- **Tagged Union** $\Rightarrow$ proměnná si pamatuje, který typ byl vybrán (**tag**)
- **Tuple** $\Rightarrow$ $n$-tice

## Ukazatel

**Ukazatel** $\Rightarrow$ adresa do paměti / `null`
- **Dangling pointer** $\Rightarrow$ ukazatel na dealokovanou paměť
- **Odkaz** je vylepšený ukazatel — sám se dereferencuje, nepoužívá aritmetiku

## Abstraktní datový typ

**Abstraktní datový typ (ADT)** je implementačně nezávislá specifikace struktury dat s operacemi povolenými na této struktuře $\Rightarrow$ Zásobník, Fronta, Množina, List, Kolekce.
- Schovává detaily okolnímu světu
- Struktury s metodami, které s nimi pracují — např. gettery a settery

## Generické typy

**Generické typy** $\Rightarrow$ typový polymorfismus — `typ<T>`. Typ musí být explicitně uveden.

## Typování

Jazyky mohou být:
- **silně typované** (zamezují použití nepodporované operace na objektu)
- **slabě typované** (nedefinují nesprávné použití typů)
- **staticky** (kontrolují typy při překladu)
- **dynamicky** (za běhu)

| | staticky | dynamicky |
|---|---|---|
| **silně** | Java, Haskell, C# | Python, Ruby |
| **slabě** | C, C++ (unions, ukazatele, pole, …) | Perl, PHP, JavaScript |

**Odvozování typu (typová inference)** — schopnost programovacího jazyka odvodit typ (například z pravidel zápisu).

## Ekvivalence typů

- **Jmenná ekvivalence** pouze porovnává jména typů
	- **Striktní** $\Rightarrow$ bere typové aliasy jako rozdílné typy
	- **Volná** $\Rightarrow$ aliasing nevadí, typy budou ekvivalentní
- **Strukturální ekvivalence** nahrazuje jména typů přímo definicemi

**Změna typů (type cast)** $\Rightarrow$ jazyky podporují třeba **implicitní/explicitní** konverzi int/float.
**Koerce** $\Rightarrow$ u některých operací stačí, aby byly typy kompatibilní.

# Proměnné

**Proměnná** je oblast v paměti, spárovaná se symbolickým jménem. Obsahuje informaci (hodnotu).

- **Vazba** je spojení mezi věcmi. Může být statická (při kompilaci) nebo dynamická (za běhu)
- **Aliasing** znamená, že více jmen má vazbu na stejný objekt
- Objekty mohou být statické, na zásobníku, nebo na haldě
	- Objekty na haldě explicitně alokujeme a dealokujeme. Uklízí je **garbage collector**
- **Mutable** $\Rightarrow$ hodnota se může měnit, ale identita zůstává stejná
- **Immutable** $\Rightarrow$ změna hodnoty $==$ změna identity

# Řízení toku

## Příkazy

**Příkazy** $\Rightarrow$ provádějí akci, např. přiřazení nebo úpravu toku.
- **Přiřazení:** `x = 42`
- **Podmíněné příkazy:** `if`, `else`, `switch`
- **Cykly:** `for`, `while` (`break`, `continue`)
- **Nepodmíněný skok:** `goto` $\Rightarrow$ není potřeba, nahrazeno `return`, `break` a `continue`
- **Bezpečné goto** $\Rightarrow$ skok pouze vpřed
- **Blok** (tzv. složený příkaz) $\Rightarrow$ `{ příkazy; }`

## Výrazy

**Výrazy** $\Rightarrow$ vyjadřují výpočty (kód, který se vyhodnotí na nějakou hodnotu).
- Např. volání funkce vracející hodnotu, aritmetické výrazy, proměnné, konstanty…
- Výrazem mohou být i komentáře v kódu, pokud jdou přiřadit do proměnné

**Operátor** je vestavěná funkce se speciální notací (`/ + - ^`).
- Operátory mohou být **unární** (`x++`), **binární** (`x+1`, `x*5`) i **ternární** (`x ? 5 : 2`)
- **Operandy** jsou argumenty operátorů
- 3 druhy notací (analogicky s pořadím výpisů v BVS):
	- **prefix** $\Rightarrow$ `+34`, **infix** $\Rightarrow$ `3+4`, **postfix** $\Rightarrow$ `34+`
- Jiná než infixová notace se lépe zpracovává počítačem

**Vyhodnocení výrazů** záleží na **asociativitě** a **prioritě** (v každém jazyku jiné).
- **Priorita** $\Rightarrow$ které operátory se vyhodnotí dřív a které později $\Rightarrow$ `5+6*3` (tzv. neviditelné závorky)
- **Asociativita** $\Rightarrow$ vyhodnocení operátorů se stejnou prioritou $\Rightarrow$ zleva-doprava nebo zprava-doleva
- **Líné vyhodnocování** $\Rightarrow$ o výsledku je možné rozhodnout bez vyhodnocení celého výrazu
	- Např. `A && B && C`

# Rozsahy

**Rozsah** je prostor, ve kterém máme deklarované nějaké entity, např. proměnné. Tyto entity patří do svého rozsahu a nejsou **viditelné** mimo něj.

**Statický rozsah** se určuje během překladu. Závisí na struktuře kódu.
- Každý podprogram má svůj vnořený rozsah
- Objekty jsou viditelné v rozsahu, ve kterém jsou deklarovány, + ve všech vnořených rozsazích
	- Správná deklarace se hledá od vnitřního rozsahu k vnějšímu podle struktury kódu
		- Objekt lze tedy překrýt novou deklarací

**Dynamický rozsah** se určuje za běhu. Závisí na pořadí volání.
- Běžné v interpretovaných jazycích (LaTeX)

**Globální rozsah** $\Rightarrow$ globální proměnné.

V různých jazycích máme různé rozsahy $\Rightarrow$ **funkce**, **blok**, **třída**, **namespace**.

```c
const int b = 5;
int foo() {
    int a = b + 5;
    return a;
}
int bar() {
    int b = 2;
    return foo();
}
int main() {
    foo();  // returns 10
    bar();  // returns ?
    return 0;
}
```

- **Statický rozsah:** hodnoty proměnných záleží na struktuře programu $\Rightarrow$ `bar()` vrátí **10**
- **Dynamický rozsah:** hodnoty proměnných záleží na pořadí volání $\Rightarrow$ `bar()` vrátí **7**

# Podprogram

**Podprogram** je základním mechanismem řízení běhu programu $\Rightarrow$ rozděluje program na menší, uchopitelné části s vlastním kódem a rozsahem. Spustíme jej příkazem, který daný podprogram zavolá.

- **Funkce** je podprogram, který vrací hodnotu — lze ji tedy volat ve výrazu
- **Procedura** je podprogram, který nevrací hodnotu — volá se jako příkaz
	- Procedura nemusí být čistá, může modifikovat globální data

Skládá se z **hlavičky** (jméno, parametry, typy) a **definice**.
- Parametry se ukládají na **zásobníku**
- **Vedlejší efekty** jsou změny někde mimo rozsah funkce
- Výrazy nemají vedlejší efekty $\Rightarrow$ jsou nahrazeny přímo hodnotou
- **Čistá funkce** $\Rightarrow$ nemá žádné vedlejší efekty; pro stejné parametry vrací stejné výsledky
- **Predikát** $\Rightarrow$ funkce vracející `True` / `False`
- **Generátor** $\Rightarrow$ speciální funkce, která provede 1 iteraci a vrátí hodnotu při `.next()`

## Předávání parametrů

- **Hodnotou** $\Rightarrow$ předání vytváří kopii skalární hodnoty / mělkou kopii objektu
- **Odkazem (sdílením)** $\Rightarrow$ předává se odkaz na parametr. Efektivní, ale nečisté, riziko aliasů
	- Odkaz může být read-only (lepší) — sdílení
- **Jménem** $\Rightarrow$ výraz argumentu se nevyhodnocuje, předá se textové jméno. Vyhodnotí se pokaždé, když je třeba ho použít
	- Používá se ve funkcionálním programování
- **Výsledkem** $\Rightarrow$ `out` parametr, do kterého je zkopírován výsledek. Riziko kolize hodnot
- **Hodnotou-výsledkem** $\Rightarrow$ `in-out`

```csharp
void Foo(out int x, out int y) {   // C#
    x = 1;
    y = 2;
}
...
f.Foo(out a, out a);   // kolize hodnot
```

# OOP

**OOP** je paradigma zaměřující se na vývoj systémů pomocí **objektů**, které mezi sebou komunikují. Objekty obsahují logicky spřízněné proměnné a funkce (metody).

**Základní principy** jsou **Abstrakce**, **Zapouzdření**, **Dědičnost** a **Polymorfismus**.

Jazyky: C#, Java, C++…

- **Objekt** vzniká instanciací třídy. Zapouzdřuje metody.
- **Výhody:** lehčí údržba, rychlejší vývoj
- **Nevýhody:** hierarchie objektů vyžaduje správu (žere prostředky)
- V moderním vývoji: výpočetní prostředky $<$ efektivní vývoj

## Třídy a rozhraní

Stavebním kamenem jsou **třídy** a **rozhraní**.

**Třída** je typem i implementací zároveň.
- Instanciace klíčovým slovem `new`, zavolá se **konstruktor**

**Rozhraní** je třída bez implementace. Obsahuje deklarace metod, může i konstanty.
- Rozhraní se mohou rozšiřovat (hierarchie). Třída jich může implementovat více
- Na objekt se pak mohu dívat očima jednoho rozhraní a „nevidět" nic jiného
- **Rozhraní nemá diamond problém**
- **Rozhraní mohou být i generická** — `interface<T>`
- Rozhraní může mít implementované tyto metody (Java):
	- **static** metody $\Rightarrow$ nelze je overridovat, voláme `Interface.funkce()`
	- **default** metody $\Rightarrow$ je to defaultní implementace, třída ji může přepsat

## Abstrakce

**Abstrakce** umožňuje skrývat nedůležité detaily objektu a dívat se na věc high-level očima. K tomu právě slouží rozhraní — skrývá implementaci.

I třídy mohou být **abstraktní** $\Rightarrow$ mohou obsahovat abstraktní metody (pouze deklarované). Potomek poté implementuje abstraktní metody pomocí **Override**. Abstraktní třídu nelze instanciovat.

## Zapouzdření

> Jazyková konstrukce spojující související data a operace pod jediným jménem.

Realizuje se pomocí ADT. ADT existovaly už před OOP, ale nepodporovaly hierarchii, dědičnost atd.

**Řízení přístupu** pomocí klíčových slov:
- `public`, `static`, `protected`, `private`, bez specifikace $==$ package-private
- gettery, settery (přístup k properties)
- `static` $\Rightarrow$ singleton parametry; static třídy nemohou být instanciovány

**Boxing** $\Rightarrow$ enkapsulace hodnotového typu na objekt. Např. v Javě `int` a `Integer`.

### Namespace

**Namespace** zavádí prostor jmen. Poskytuje hierarchická jména bez vazby na jméno souboru.

```csharp
namespace N1.N2 {
    class A {}
    class B {}
}
// je ekvivalentní:
namespace N1 {
    namespace N2 {
        class A {}
        class B {}
    }
}
// plně kvalifikované jméno třídy: N1.N2.B
```

Import jmen pomocí direktivy `using N;` — to importuje všechny typy (a především třídy) z `N`. Neimportuje nic jiného (zejména ne vnořené namespaces). Nutno použít plně kvalifikované jméno třídy (možnost použití aliasů — `using N = N1.N2.B;`).

```csharp
namespace N1.N2 {
    class A {}
}
namespace N3 {
    using N1.N2;
    class B : A {}      // funguje
}
namespace N4 {
    using N1;
    class B : N2.A {}   // selže, N2 unknown
}
```

## Dědičnost

**Dědičnost** umožňuje definici nové třídy s využitím tzv. **rodičovské třídy**.
- Např. třída `SoundDevice` dědí z třídy `Device` její metody (`turnOn`, `turnOff`)
- Dědičnost může být opakovaná (tranzitivně) $\Rightarrow$ tvoří se stromová hierarchie tříd
- Nemusí se dědit všechno. Parametry / metody musí být alespoň `protected` (private věci zůstanou skryty)
- Rodičovské metody mohou být překryty
- Potomek musí ve svém konstruktoru volat **konstruktor** rodiče
- **Destruktor** také volá destruktor rodiče (to řeší garbage collector)

### LSP — Liskov Substitution Principle

> Objekt typu `T` může být, bez negativních důsledků, kdekoliv nahrazen objektem typu `S`, kde `S` je podtřídou (potomkem) `T`.

**Diamond problem** (v2) — třída `D` dědí z `B` i `C`, které obě dědí z `A`:

```csharp
public abstract class A {
    public virtual void Foo() { /* Do something here. */ }
}
public class B : A {
    public override void Foo() { /* Do something else here. */ }
}
public class C : A {
    // no Foo method here
}
public class D : B, C { ... }

D d = new D();
d.Foo();   // What happens here?
```

Možná řešení:
- zakázat (C#)
- dvě kopie objektu třídy A (C++)
- explicitní volba směru, ze kterého dědí
- pořadí deklarací (Python) — `D, B, C, A`

$\Rightarrow$ Problémy s následnou údržbou!

- **Řešení: Composition** $\Rightarrow$ vytvoření instancí objektů uvnitř nové třídy

## Polymorfismus

**Polymorfismus** je vlastnost OOP jazyka, která umožňuje volání více implementací metod na základě generických typů / parametrů.

- **Ad-hoc polymorfismus (Přetěžování)** $\Rightarrow$ přetížení podprogramů se stejným jménem (Overloaded)
	- K výběru správné metody dochází již **za překladu** dle použitých parametrů
	- Typicky se používá u konstruktorů
- **Parametrický polymorfismus** $\Rightarrow$ parametry jsou generické. Podprogram má jedinou implementaci, pro kterou se typy určí v runtime (tzv. **dynamická vazba**)
- **Podtypový polymorfismus** $\Rightarrow$ typ `T` může obsahovat objekt podtřídy `T`. Typicky OOP přístup, viz Liskov Substitution Principle

### Přepisování

- Metody rodiče mohou být přepsány novou implementací (**Override**)
- V některých jazycích to musí být povoleno anotací (**Virtual**) na původní metodě
- Správná metoda se určí za běhu

### Časná vs. pozdní vazba

Při volání metody přes proměnnou (`Device d = new SoundDevice(); d.PrintStatus();`, kde `SoundDevice` dědí z `Device`) je nutné určit, **která** implementace se zavolá:

| | **Časná (statická)** | **Pozdní (dynamická)** |
|---|---|---|
| Anglicky | early / static binding | late / dynamic binding |
| Kdy / podle čeho | za překladu, dle **deklarovaného** typu (`Device`) | za běhu, dle **skutečného** typu (`SoundDevice`) |
| Která metoda | `PrintStatus` z `Device` | `PrintStatus` z `SoundDevice` |
| Klíčové slovo v C# | `new` (skrytí) | `virtual` + `override` (přepsání) |
| Rychlost | rychlejší (adresa známá) | pomalejší (adresa se dohledá za běhu) |

**Pozdní vazba**
- **`virtual` + `override`** (method overriding*) vybírá metodu podle skutečného typu objektu:

```csharp
class Device {
    public virtual void PrintStatus() { ... }    // virtual povolí přepsání
}
class SoundDevice : Device {
    public override void PrintStatus() { ... }    // override přepíše rodiče
}
```

**Časná vazba**
- **`new`** je v C# **výchozí** — metoda se stejným jménem v podtřídě původní metodu rodiče **skryje** (překladač jen upozorní, že má být `new` explicitní); skrytá metoda je stále volatelná přes `base.PrintStatus()`:

```csharp
class SoundDevice : Device {
    public new void PrintStatus() {         // skryje metodu rodiče
        base.PrintStatus();                 // původní lze volat přes base
        ...
    }
}
```

### Tabulka virtuálních metod (VMT)

Aby pozdní vazba zjistila správnou metodu za běhu, nese **každý objekt** ukazatel na **tabulku virtuálních metod** (*vtable*).

- Obsahuje **odkazy na implementace** virtuálních metod (code pointers); překladač vytvoří **jednu tabulku na třídu**, objekty téže třídy ji sdílejí.
- Při dědění se tabulka zkopíruje z rodiče; u **přepsaných** metod (`override`) se odkaz přesměruje, nepřepsané zůstávají na implementaci rodiče.
- Volání proto znamená dereferenci přes vtable (pomalejší než časná vazba).

```
class foo {                  vtable(foo):
    virtual void k(...)        foo::k
    virtual int  l(...)        foo::l
    virtual void m()           foo::m
    virtual double n(...)      foo::n
}
class bar : public foo {     vtable(bar):
    void m() override;         foo::k     (zděděno)
    virtual double s(...)      foo::l     (zděděno)
    virtual char  *t(...)      bar::m     (přepsáno)
}                              bar::s, bar::t  (nové)
```

# Výjimky

**Výjimka** je objekt nesoucí informace o chybě. Jazyky často poskytují předpřipravené typy výjimek a umožňují dodefinování těch uživatelských.

Cílem je zachytit runtime chyby a zabránit pádu programu. Situaci poté oznámit / napravit.

**Propagují se nahoru** $\Rightarrow$ např. abychom uživateli ukázali chybové okénko.
- Typické chyby $\Rightarrow$ index out of bound, dělení nulou, overflow
- Kód je čistější, aplikace robustnější (a travička zelenější)

**Nevýhodou** je, že obsluha výjimek je poměrně drahá.

Konstrukce chytání: **try-catch-finally** (`finally` blok se provede vždy). Výjimky je možné po zachycení znovu hodit (`throw`).

Dělí se na:
- **Kontrolované (checked)** $\Rightarrow$ metody musí výjimku chytit, nebo mít klauzuli `throws`
- **Nekontrolované (unchecked)** $\Rightarrow$ `RuntimeException`

Pokud nastane výjimka (vytvoří se jako objekt), JVM prochází call-stack v opačném směru, dokud nenajde handler, který by výjimku ošetřil. Pokud ho nenajde, program selže (default-handler).

# Event-driven programming

Základním principem tvorby aplikací s GUI je řízení programu **událostmi**. Netýká se však pouze GUI — je to obecnější pojem označující typ **asynchronního programování**, kdy je tok programu řízen událostmi, které nastávají obvykle určitou uživatelskou akcí (klik či pohyb myši, stisk tlačítka atd.).

- Události (jejich popisy) se řadí do fronty message dispatcheru
- Události ošetřují tzv. **posluchače** (EventListener), které na dané události reagují
- Ošetření (reakce na událost) se neprovádí v hlavním vlákně aplikace $\Rightarrow$ aplikace nezamrzá

# SOLID

- **S — Single-responsibility principle:** třída má mít jedinou zodpovědnost. *„There should never be more than one reason for a class to change."*
- **O — Open–closed principle:** entity mají být otevřené pro rozšíření, ale uzavřené pro modifikaci. *„Software entities … should be open for extension, but closed for modification."*
- **L — Liskov substitution principle:** funkce používající ukazatele/reference na bázové třídy musí umět použít objekty odvozených tříd, aniž by o tom věděly. (Viz design by contract.)
- **I — Interface segregation principle:** klienti nemají být nuceni záviset na rozhraních, která nepoužívají.
- **D — Dependency inversion principle:** závislost na abstrakcích, ne na konkrétních implementacích.

# Otázky

**1.** Může třída dědit ze 2 tříd zároveň? Jak?

> **Odpověď:** Záleží na jazyce. **Vícenásobná dědičnost tříd** je možná v C++, ale přináší **diamond problem** (nejednoznačnost při shodných předcích). Java a C# vícenásobnou dědičnost tříd **zakazují** — místo toho lze implementovat **více rozhraní** (`interface`), případně použít **kompozici** (vložení instancí jiných tříd dovnitř nové třídy). Rozhraní diamond problém nemají.
