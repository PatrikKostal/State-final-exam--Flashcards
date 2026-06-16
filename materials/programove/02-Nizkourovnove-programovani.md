# 2. Principy nízkoúrovňového programování

> **Zadání:** Paměťový model programu; správa paměti, nízkoúrovňová práce s pamětí, ukazatel, pole a ukazatelová aritmetika, práce s uživatelskými datovými strukturami. Realizace v programovacím jazyku dle vlastní volby. (PB111)

# Paměť

**Paměť** je adresovatelné množství slotů s fixní délkou.

- Do paměti zapisujeme **entity** (řetězce, proměnné atd.). Ty často zabírají více než 1 slot.
- Slot má typicky 1 bajt.
- **Přístup k entitám** $\Rightarrow$ adresa začátku entity, např. `0x0a` (hexadecimální zápis).
- Délka adres se liší podle platformy.

## Paměťový model programu

**Program** je posloupnost instrukcí, dat a údajů potřebných k provedení daného úkolu.

- Každý program je implementací algoritmu.

**Paměť programu** se člení do funkčně oddělených **segmentů**:

- **Textový segment** $\Rightarrow$ zkompilovaný kód programu / instrukce.
- **Zásobník (stack)** $\Rightarrow$ pro každou funkci se mění tzv. **stack-frame**. Ukládají se tam lokální proměnné.
	- Směr alokace adres (od nejvyšší po 0, nebo od 0 po nejvyšší) záleží na architektuře.
- **Halda (heap)** $\Rightarrow$ dynamicky alokovaná paměť.
- **Inicializovaný** datový segment $\Rightarrow$ inicializované globální proměnné.
- **Neinicializovaný** datový segment (bss) $\Rightarrow$ neinicializované globální proměnné.

```
high address  ┌──────────────────────────┐ ⎫ command-line arguments
              │                          │ ⎭ and environment variables
              │          stack           │
              │            ↓             │
              │                          │
              │            ↑             │
              │           heap           │
              ├──────────────────────────┤ ⎫ initialized to
              │ uninitialized data (bss) │ ⎭ zero by exec
              ├──────────────────────────┤ ⎫
              │     initialized data     │ ⎬ read from program
              ├──────────────────────────┤ ⎪ file by exec
              │           text           │ ⎭
low address   └──────────────────────────┘
```

# Datové typy

**C je slabě typovaný jazyk**, čili objekty mohou měnit své typy.

Jazyk umožňuje **implicitní** (provádí kompilátor) i **explicitní** (provádí programátor) typovou konverzi. Přetypovat lze i nekompatibilní data (nebezpečné):

- **Implicitní** konverze interpretuje původní bity očima jiného typu.
- **Explicitní** konverze převede hodnotu do jiného typu (pomocí nějaké vnitřní funkce).

Základní typy: `char`, `int`, `float`, `double`, `bool` (`#include <stdbool.h>`).

- **`wchar_t`** pro Unicode znaky.
- **Modifikátory typů:** `signed`, `unsigned`, `short`, `long`, `long long`.
- **`sizeof()`** vrací počet bajtů v datovém typu.

## Zarovnání paměti

Datové typy jsou často paměťově **zarovnané**:

- Zarovnáváme obvykle na násobky slova procesoru, abychom optimalizovali čtení.
- `int` má 4 bajty, 0 bajtů padding.
- `char` má 1 bajt + 3 bajty padding…
- Zarovnání umožňuje dodatečné optimalizace.

## Bitové operátory

**Bitové operátory** $\Rightarrow$ `&`, `|`, `~`, `^`, `<<`, `>>`:

- **AND:** `Z = X & Y;`
- **OR:** `Z = X | Y;`
- **XOR:** `Z = X ^ Y;`
- **INVERT:** `Z = ~X;`
- **LSHIFT:** `Z = X << 2;` číslo se zvýší
- **RSHIFT:** `Z = X >> 2;` číslo se sníží

Možnost reprezentovat data jako jednotlivé bity (flagy). Čtení pomocí masky.

- **Bitová typová konverze** $\Rightarrow$ pouze jinak interpretujeme bity (neztrátová).
- **Sémantická typová konverze** $\Rightarrow$ např. `double` na `float` (ztráta přesnosti).

## Klíčové slovo `const`

Klíčové slovo **`const`** $\Rightarrow$ označuje konstantu (překladač pak kontroluje, že se nemění). Pomáhá zabránit nechtěným chybám.

`const` lze ošálit:

```c
void foo(const int* carray) {
    carray[0] = 1; // error: assignment of read-only location '*carray'
    int* tmp = carray; // warning: initialization discards qualifiers
                       // from pointer target type
    tmp[0] = 1; // possible, but unwanted! (array was const, tmp is not)
}
```

## Uživatelské datové struktury

Uživatelské datové typy lze také předávat hodnotou i ukazatelem. Kopie se dělí na **mělké** (kopie povrchní struktury) a **hluboké** (kopie struktury i jejích parametrů):

- **Mělká** $\Rightarrow$ přiřazení.
- **Hluboká** $\Rightarrow$ `malloc()` + `memcpy()`.

**Předání datové struktury hodnotou tvoří mělkou kopii.**

### `enum`

**`enum`** je výčtový typ omezující rozsah hodnot. Vnitřně je to `int`, položky lze nahradit jejich indexem.

- Indexy lze i explicitně přiřadit.

```c
enum race_t {
    elf,
    human,
    hobbit
};
enum race_t race1 = elf;
```

### `struct`

**`struct`** je datový typ s definovanou sadou položek. Velikost structu je zarovnaná, takže neodpovídá přesně součtu velikostí jednotlivých položek.

- Přístup ke složkám jde přes tečkovou notaci `structure.x`.
- Pokud máme ukazatel na strukturu, můžeme použít `->` pro automatickou dereferenci:
	- `struct person *person = ...;`
	- `(*person).name == person->name`

```c
enum weapon_t {sword, axe, bow};
struct avatar_t {
    char nick[31];
    int energy;
    enum weapon_t weapon;
};
struct avatar_t myAvatar = {"Hell", 100, axe};
```

> Součet velikostí položek nemusí být roven `sizeof(struct)`. Např. `int` nebude začínat na 31. bajtu (kvůli zarovnání).

### `union`

**`union`** je kombinovaný datový typ. Velikost odpovídá největší možné položce.

- Při použití musíme data nějak interpretovat (vybrat si položku) $\Rightarrow$ **bitová reinterpretace**.
- Union je vhodný, pokud chceme položku znovu-využít s jiným typem.

```c
union energy_t {
    int iEnergy;
    float fEnergy;
    unsigned char bEnergy[10];
};
```

### `typedef`

**`typedef`** slouží k zavedení nového datového typu.

```c
typedef int muj_integer;
typedef int cube[8][8][8];      // cube myCube;
typedef struct avatar_t avatar; // avatar myAvat1;
typedef avatar* pAvatar;        // pAvatar pMyAvat1 = NULL;
```

# Ukazatelová aritmetika

Překladač nahrazuje jména proměnných adresami na stacku.

- **Ukazatel** je adresa ukazující do paměti.
- Ukazatele mají specifické typy, poskytující informace o uložených datech (`int*`, `int***`, `char*`).
- **Operátor `&`** vrací adresu svého argumentu $\Rightarrow$ `int* pX = &promennaX;`
- **`*`** lze poté použít opět pro **dereferenci**, čili nahrazení ukazatele tím, na co ukazuje.

Příklady (pseudosyntaxe, `=>` označuje změnu typu výrazu):

```
 &int  => int*
*(int*) => int
*(int**) => int*
**(int**) => int
*(&int) => int
**(&&int) => int
```

- `int* pX; pX = 10;` (typicky špatně – nechceme měnit ukazatel)
- `int* pX; *pX = 10;` (typicky OK – chceme měnit hodnotu, která je na adrese, na kterou `pX` ukazuje)

```c
myArray[0] = 5;     // OK, first item in myArray
*(myArray + 0) = 6; // OK, first item in myArray
//myArray = 10;     // wrong, we are modifying address itself, not value on address

pArray = myArray + 3; // pointer to 4th item in myArray
//pArray = 5;         // wrong, we are modifying address itself, not value on address
*pArray = 5;          // OK, 4th item
pArray[0] = 5;        // OK, 4th item
*(myArray + 3) = 5;   // OK, 4th item
pArray[3] = 5;        // OK, 7th item of myArray

pArray++; // pointer to 5th item in myArray
pArray++; // pointer to 6th item in myArray
pArray--; // pointer to 5th item in myArray

int numItems = pArray - myArray; // should be 4 (myArray + 4 == pArray)
```

**Přístup mimo povolenou paměť** $\Rightarrow$ **Segmentation fault**.

- Pokud přistoupím za alokovanou paměť, je možné, že se ještě nacházím v zarovnání a program nespadne (moderní jádra to ustojí za cenu výrazného zpomalení).

**NULL ukazatel** je ukazatel na adresu 0. Definován jako `#define NULL ((void *)0)`.

- `int* ptr = 0;` je ekvivalentní NULL pointeru, ale ošklivé.

Ukazatele lze také přetypovávat, nebo mít **`void*` ukazatel** bez znalosti typu.

**Funkční ukazatel** je ukazatel na kód funkce $\Rightarrow$ umožňuje předávání funkce jako parametru.

## Aliasing

**Paměťový aliasing** $\Rightarrow$ na stejné místo paměti může ukazovat více ukazatelů s různými typy.

- Každý ukazatel si pak paměť interpretuje po svém.
- Může vést např. ke ztrátě přesnosti.

**Strict aliasing** $\Rightarrow$ žádné dvě proměnné různého typu neukazují na stejné místo.

- Zavedeno z důvodu možnosti optimalizace.
- Standard vyžaduje, ale lze to vypnout.

# Pole

## Jednorozměrné pole

- Alokace probíhá v době překladu.
- Prvky jsou uloženy kontinuálně.

Deklarace: `datový_typ jméno_proměnné[velikost];`

- `velikost` udává počet prvků pole.

Velikost pole si musíme explicitně pamatovat sami. **Meze nejsou hlídané!!**

- `Pole[5]` vrací adresu 6. prvku. `Pole[0]` a `Pole` jsou ekvivalentní.
- `int*` a `int[10]` jsou rozdílné datové typy.

## Vícerozměrné pole

**Vícerozměrné pole** $\Rightarrow$ `int[10][25];` rozměrů může být víc.

Překladač vícerozměrné pole implementuje jednorozměrně (paměť je jednorozměrná):

![[vicerozmerne-pole-c.png|573]]
## Řetězec

Řetězec je pole charů. Např. `char retezec[100]` je 99 znaků + koncová `\0`.

- Funkce: `strlen`, `strcpy`, `strcat`, `strcmp`…
- Pole řetězců by bylo tzv. **nepravoúhlé pole** (každý řetězec je zpravidla jinak dlouhý).

# Dynamická paměť

Dynamicky alokovat paměť je žádoucí pro flexibilitu systémových prostředků. Program musí umět reagovat na různá data a tomu uzpůsobit své potřeby **za běhu**, např. alokovat více paměti.

Dynamickou alokaci provádíme na **haldě**. Takovou paměť ovšem musíme sami spravovat a postarat se o její dealokaci. Tohle není Java, nemáme Garbage Collector, nikdo to za nás neudělá.

**`void* malloc(size_t n)`** $\Rightarrow$ alokuje souvislý neinicializovaný blok paměti na haldě.

- Varianta **`void* calloc(size_t n, size_t sizeItem)`** $\Rightarrow$ alokuje `n * sizeItem` paměti + inicializuje.

**`void free(void*)`** $\Rightarrow$ explicitně uvolňuje paměť alokovanou pomocí `malloc` / `realloc`…

- Nemaže obsah paměti, pouze ji poskytuje k budoucímu použití!!
- Bez `free` hrozí **memory leaks** (*Remember Valgrind…*).
- **Nesmíme přistupovat k dealokované paměti.**
- **Opakovaná dealokace VADÍ** – je to undefined behaviour a bezpečnostní riziko (CWE-415, *double free*).

**`void* realloc(void* ptr, size_t size)`** $\Rightarrow$ zvětšení či zmenšení bloku paměti v `ptr`. Zachovává obsah.

- Pokud je `ptr` NULL, funguje jako `malloc`. Neinicializuje.

**`void* memset(void* ptr, int value, size_t mem_size)`** $\Rightarrow$ rychlá inicializace paměti na stanovenou hodnotu.

# Ladění

**Debugger** je nástroj pro hledání chyb při vývoji softwaru. Při spuštění s debuggerem se program upraví, aby bylo možné ho přerušovat a tzv. krokovat.

- Debugger může zobrazit hodnoty proměnných i ukazatelů → lze zkoumat obsah zásobníku a haldy.
- **Breakpoint** $\Rightarrow$ debugger na daném místě zastaví. Debuggeru můžeme i přímo napsat podmínku, pod kterou program zastaví – **Conditional breakpoints**.

## Analýza paměti

- **QTCreator** $\Rightarrow$ Windows → View → Memory.
- **Visual Studio** $\Rightarrow$ Debug → Windows → Memory (až po spuštění ladění).
- **Memory breakpointy** $\Rightarrow$ podmíněný breakpoint na změnu v paměti (nutná podpora v CPU).
- **Valgrind** $\Rightarrow$ zachycení memory leaků za běhu, analýza paměti.

## Hardwarová podpora ladění

Ladění usnadňuje hw podpora:

- Speciální flag – **trap flag**.
- Instrukční sada pro virtualizaci…
