// Programové, výpočetní a informační systémy
// 1. Podprogramy a objektově orientované programování (PB006)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.oop = { label: "🧱 Podprogramy a OOP", cls: "tag-oop", order: 12 };

FC.cards.push(
  { t: "oop",
    q: "Co jsou podprogramy a k čemu slouží?",
    a: "<b>Pojmenované bloky kódu (funkce, procedury, metody), které lze opakovaně volat.</b><ul><li>Umožňují <b>znovupoužití kódu</b>, dekompozici, abstrakci</li><li><b>Funkce</b> vrací hodnotu, <b>procedura</b> jen provede akci</li><li>Mají <b>parametry</b> a <b>lokální proměnné</b>; volání používá <b>zásobník</b> (rámec s návratovou adresou a lokálními daty)</li></ul>" },

  { t: "oop",
    q: "Jaký je rozdíl mezi statickým a dynamickým rozsahem jmen?",
    a: "<b>Rozsah (scope) určuje, na kterou definici proměnné se jméno váže.</b><ul><li><b>Statický (lexikální) rozsah</b> – podle <b>místa v kódu</b>, kde je proměnná definovaná (většina jazyků: C, Java, Python)</li><li><b>Dynamický rozsah</b> – podle <b>volajícího kontextu za běhu</b> (např. <b>Bash</b>, starší Lisp)</li></ul>U dynamického rozsahu může funkce „vidět\" proměnné toho, kdo ji zavolal – stejný kód dá jiný výstup podle volání." },

  { t: "oop",
    q: "Jaké jsou způsoby předávání parametrů?",
    a: "<ul><li><b>Hodnotou (by value, in)</b> – předá se <b>kopie</b>, změny se nepromítnou ven (Java primitiva, C)</li><li><b>Odkazem (by reference, inout)</b> – předá se odkaz, změny se projeví (C++ reference, C přes ukazatel)</li><li><b>Výstupní (out)</b> – slouží jen k vrácení hodnoty</li></ul>V <b>Javě</b> se vše předává hodnotou; u objektů se hodnotou předává <b>reference</b>, takže lze měnit obsah objektu (ne ale přepsat samotnou referenci)." },

  { t: "oop",
    q: "K čemu slouží výjimky?",
    a: "<b>Mechanismus pro ošetření chybových / výjimečných stavů odděleně od hlavní logiky.</b><ul><li>Výjimka se <b>vyhodí (throw)</b> a propaguje zásobníkem volání, dokud ji někdo <b>nezachytí (catch)</b></li><li>Oddělí „šťastnou cestu\" od ošetření chyb, nelze ji snadno ignorovat</li><li>Smysluplná vlastní výjimka: např. <code>InsufficientFundsException</code> při výběru z účtu nad rámec zůstatku</li></ul>" },

  { t: "oop",
    q: "Jaký je rozdíl mezi třídou a objektem? Co se děje při instanciování?",
    a: "<ul><li><b>Třída</b> – předpis/šablona (atributy + metody)</li><li><b>Objekt</b> – konkrétní <b>instance</b> třídy v paměti</li></ul>Při <b>instanciování</b> (<code>new</code>): alokuje se paměť (typicky na <b>haldě</b>), inicializují se atributy a zavolá se <b>konstruktor</b> (nastaví počáteční stav). Reference na objekt bývá na zásobníku." },

  { t: "oop",
    q: "Co je zapouzdření a jaké jsou modifikátory přístupu?",
    a: "<b>Zapouzdření (encapsulation) – skrytí vnitřního stavu objektu, přístup jen přes definované rozhraní (metody).</b> Chrání invarianty.<ul><li><b>private</b> – jen uvnitř třídy</li><li><b>protected</b> – třída + potomci (a balík)</li><li><b>public</b> – odkudkoli</li></ul>Atributy bývají <b>private</b>, přístup přes gettery/settery." },

  { t: "oop",
    q: "Co je dědičnost?",
    a: "<b>Mechanismus, kdy třída (potomek) přebírá atributy a metody jiné třídy (rodiče) a může je rozšířit nebo upravit.</b><ul><li>Vyjadřuje vztah <b>„je\"</b> (Pes je Zvíře)</li><li>Podporuje znovupoužití kódu</li><li><b>Abstraktní třída</b> – nelze ji instanciovat, definuje společné rozhraní/část implementace pro potomky</li></ul>" },

  { t: "oop",
    q: "Co je polymorfismus, virtuální metody a dynamická vazba?",
    a: "<b>Polymorfismus – tentýž kód pracuje s objekty různých typů přes společné rozhraní.</b><ul><li><b>Virtuální metoda</b> – metoda, jejíž konkrétní implementace se vybírá podle <b>skutečného typu objektu za běhu</b></li><li><b>Dynamická vazba</b> – navázání volání na implementaci až za běhu (pozdní vazba)</li></ul>Příklad: <code>Zvire z = new Pes(); z.zvuk();</code> zavolá implementaci z <code>Pes</code>." },

  { t: "oop",
    q: "Jaký je rozdíl mezi overloading a overriding?",
    a: "<ul><li><b>Overloading (přetížení)</b> – více metod <b>stejného jména, různé parametry</b> ve stejné třídě; výběr <b>staticky</b> podle typů argumentů</li><li><b>Overriding (překrytí)</b> – potomek <b>nahradí</b> metodu rodiče stejnou signaturou; výběr <b>dynamicky</b> podle typu objektu</li></ul>Overloading = polymorfismus parametrický/ad-hoc, overriding = polymorfismus podtypový." },

  { t: "oop",
    q: "Co je statická metoda a statický atribut?",
    a: "<b>Patří třídě, ne instanci.</b><ul><li><b>static atribut</b> – <b>jediná sdílená kopie</b> pro všechny instance (uloženo v paměti třídy, ne na haldě s objektem)</li><li><b>static metoda</b> – volá se na třídě (<code>Math.sqrt()</code>), nemá <code>this</code>, nepřistupuje k instančním atributům</li></ul>Sama třída (její kód a metadata) je v <b>paměti programu / metaspace</b>." },

  { t: "oop",
    q: "Jaké jsou výhody a nevýhody OOP?",
    a: "<ul><li><b>Výhody</b>: zapouzdření a modularita, znovupoužití (dědičnost), rozšiřitelnost (polymorfismus), modelování reálných entit, snazší údržba</li><li><b>Nevýhody</b>: vyšší režie a složitost, riziko přílišné abstrakce/hluboké hierarchie dědičnosti, horší datová lokalita/výkon oproti nízkoúrovňovému přístupu</li></ul>Realizace v C#/C++/Java – liší se např. vícenásobnou dědičností (C++ ano, Java jen rozhraní)." },

  { t: "oop",
    q: "Jaká jsou hlavní programovací paradigmata?",
    a: "<ul><li><b>Imperativní (procedurální)</b> – popisuje JAK (pořadí instrukcí): strukturované (C), OOP (Java)</li><li><b>Deklarativní</b> – popisuje CO: <b>funkcionální</b> (Haskell – vše funkce), <b>logické</b> (Prolog – definice pravdy)</li></ul>Podle abstrakce: nízkoúrovňové (Assembler, C) vs vysokoúrovňové." },

  { t: "oop",
    q: "Jaký je rozdíl mezi kompilovaným a interpretovaným jazykem?",
    a: "<ul><li><b>Kompilovaný</b> – kód se přeloží do strojového kódu předem (binárka); rychlejší, compiler-side optimalizace (C, Pascal)</li><li><b>Interpretovaný</b> – kód se zpracovává za běhu (interpret/mezikód); vyšší kompatibilita, přehlednost (Python)</li></ul><b>Java</b> – hybridní: bytecode + <b>JIT</b> kompilace za běhu." },

  { t: "oop",
    q: "Jak se dělí typové systémy (silně/slabě, staticky/dynamicky)?",
    a: "<table><tr><td></td><td><b>staticky</b></td><td><b>dynamicky</b></td></tr><tr><td><b>silně</b></td><td>Java, C#, Haskell</td><td>Python, Ruby</td></tr><tr><td><b>slabě</b></td><td>C, C++</td><td>JS, PHP</td></tr></table><ul><li><b>Silně</b> typované – zamezují nepodporované operace; <b>slabě</b> – ne</li><li><b>Staticky</b> – kontrola typů při překladu; <b>dynamicky</b> – za běhu</li><li><b>Typová inference</b> – jazyk odvodí typ sám</li></ul>" },

  { t: "oop",
    q: "Co je abstraktní datový typ (ADT) a generické typy?",
    a: "<ul><li><b>ADT</b> – implementačně nezávislá specifikace dat + povolených operací (Zásobník, Fronta, Množina). Skrývá detaily implementace.</li><li><b>Generické typy</b> – typový polymorfismus <code>Typ&lt;T&gt;</code>; jedna implementace pro různé typy</li></ul>Zapouzdření se realizuje právě pomocí ADT (data + metody pod jedním jménem)." },

  { t: "oop",
    q: "Jaký je rozdíl mezi výrazem, příkazem a operátorem? Co je prefix/infix/postfix?",
    a: "<ul><li><b>Příkaz</b> – provádí akci (přiřazení, if, cyklus)</li><li><b>Výraz</b> – vyhodnotí se na hodnotu</li><li><b>Operátor</b> – vestavěná funkce se speciální notací (unární/binární/ternární)</li></ul>Notace: <b>prefix</b> (+34), <b>infix</b> (3+4), <b>postfix</b> (34+). Vyhodnocení řídí <b>priorita</b> a <b>asociativita</b> (zleva/zprava)." },

  { t: "oop",
    q: "Co je mutabilita, vazba a aliasing?",
    a: "<ul><li><b>Mutable</b> – hodnota se mění, identita zůstává; <b>Immutable</b> – změna hodnoty = nová identita</li><li><b>Vazba (binding)</b> – spojení jména s objektem; statická (překlad) nebo dynamická (běh)</li><li><b>Aliasing</b> – více jmen ukazuje na stejný objekt</li></ul>Objekty na haldě uklízí <b>garbage collector</b>." },

  { t: "oop",
    q: "PŘÍKLAD: Jaký výsledek dá kód při statickém vs dynamickém rozsahu?",
    a: "<b>Pro <code>const b=5; foo(){return b+5;} bar(){int b=2; return foo();}</code>:</b><ul><li><b>Statický rozsah</b> – foo vidí globální b=5 podle <b>struktury kódu</b> → bar() vrátí <b>10</b></li><li><b>Dynamický rozsah</b> – foo vidí b=2 z volajícího bar() podle <b>pořadí volání</b> → bar() vrátí <b>7</b></li></ul>Většina jazyků používá statický (lexikální) rozsah; dynamický má bash, LaTeX." },

  { t: "oop",
    q: "Jaké jsou způsoby předávání parametrů (5 variant)?",
    a: "<ul><li><b>Hodnotou</b> – kopie (mělká u objektů)</li><li><b>Odkazem (sdílením)</b> – předá se reference, efektivní ale nečisté (aliasy)</li><li><b>Jménem</b> – výraz se nevyhodnotí, předá se a vyhodnocuje při použití (funkcionální)</li><li><b>Výsledkem (out)</b> – jen pro vrácení; <b>hodnotou-výsledkem (in-out)</b></li></ul>" },

  { t: "oop",
    q: "Jaký je rozdíl mezi třídou, rozhraním a abstraktní třídou?",
    a: "<ul><li><b>Třída</b> – typ i implementace; instanciuje se <code>new</code> → konstruktor</li><li><b>Rozhraní (interface)</b> – jen deklarace metod (+ konstanty); třída může implementovat <b>více</b> rozhraní; <b>nemá diamond problém</b></li><li><b>Abstraktní třída</b> – může mít abstraktní (jen deklarované) i implementované metody; <b>nelze instanciovat</b></li></ul>Java rozhraní: <code>default</code> a <code>static</code> metody." },

  { t: "oop",
    q: "Co je Liskovové substituční princip (LSP)?",
    a: "<b>Objekt typu T lze kdekoli nahradit objektem podtřídy S bez negativních důsledků.</b><ul><li>Potomek musí dodržet „kontrakt\" rodiče (chovat se kompatibilně)</li><li>Je to <b>L</b> v <b>SOLID</b> a základ <b>podtypového polymorfismu</b></li></ul>Porušení: potomek vyhazuje výjimky / mění chování tak, že kód pracující s rodičem selže." },

  { t: "oop",
    q: "Co je diamond problem a jak se řeší?",
    a: "<b>Třída D dědí z B i C, které obě dědí z A → nejednoznačnost, kterou metodu A použít.</b> Řešení:<ul><li><b>Zákaz</b> vícenásobné dědičnosti tříd (C#, Java – jen rozhraní)</li><li>Dvě kopie A (C++)</li><li>Pořadí deklarací / MRO (Python)</li><li><b>Composition</b> – místo dědičnosti vložit instance jiných tříd dovnitř</li></ul>" },

  { t: "oop",
    q: "Jaké jsou tři druhy polymorfismu?",
    a: "<ul><li><b>Ad-hoc (přetěžování / overloading)</b> – stejné jméno, různé parametry; výběr <b>za překladu</b></li><li><b>Parametrický</b> – generické typy, jedna implementace pro různé typy (určeno v runtime)</li><li><b>Podtypový</b> – proměnná typu T drží objekt podtřídy; OOP přístup (LSP)</li></ul>" },

  { t: "oop",
    q: "Jaký je rozdíl mezi časnou a pozdní vazbou?",
    a: "<table><tr><td></td><td><b>časná (statická)</b></td><td><b>pozdní (dynamická)</b></td></tr><tr><td>kdy</td><td>za překladu</td><td>za běhu</td></tr><tr><td>podle</td><td>deklarovaného typu</td><td>skutečného typu</td></tr><tr><td>C#</td><td><code>new</code> (skrytí)</td><td><code>virtual</code>+<code>override</code></td></tr></table><ul><li>Pozdní vazba je pomalejší (adresa se dohledá), umožňuje <b>overriding</b></li></ul>" },

  { t: "oop",
    q: "Co je tabulka virtuálních metod (VMT / vtable)?",
    a: "<b>Mechanismus pozdní vazby: každý objekt nese ukazatel na tabulku virtuálních metod své třídy.</b><ul><li>Tabulka obsahuje <b>odkazy na implementace</b> virtuálních metod (jedna na třídu, sdílená instancemi)</li><li>Při dědění se zkopíruje; u <b>přepsaných (override)</b> metod se odkaz přesměruje</li><li>Volání = dereference přes vtable (proto pomalejší než časná vazba)</li></ul>" },

  { t: "oop",
    q: "Jak fungují výjimky (checked vs unchecked, try-catch-finally)?",
    a: "<b>Výjimka = objekt nesoucí informace o chybě; propaguje se nahoru zásobníkem volání, dokud ji handler nezachytí.</b><ul><li><b>try-catch-finally</b> – finally se provede <b>vždy</b>; výjimku lze znovu vyhodit (throw)</li><li><b>Checked (kontrolované)</b> – metoda musí chytit nebo deklarovat <code>throws</code></li><li><b>Unchecked</b> – RuntimeException (dělení nulou, index out of bounds)</li></ul>Nevýhoda: obsluha je relativně drahá." },

  { t: "oop",
    q: "Co je event-driven programming?",
    a: "<b>Tok programu řízený událostmi (asynchronní programování), typické pro GUI.</b><ul><li>Události se řadí do <b>fronty</b> (message dispatcher)</li><li>Reagují na ně <b>posluchače (EventListener)</b></li><li>Obsluha běží mimo hlavní vlákno → aplikace <b>nezamrzá</b></li></ul>" },

  { t: "oop",
    q: "Co je princip SOLID?",
    a: "<ul><li><b>S</b> – Single responsibility: třída má jedinou zodpovědnost</li><li><b>O</b> – Open/closed: otevřená pro rozšíření, uzavřená pro modifikaci</li><li><b>L</b> – Liskov substitution: potomek nahraditelný za rodiče</li><li><b>I</b> – Interface segregation: malá specifická rozhraní</li><li><b>D</b> – Dependency inversion: záviset na abstrakcích, ne implementacích</li></ul>" },

  { t: "oop",
    q: "Co je boxing a co jsou čisté funkce/predikáty/generátory?",
    a: "<ul><li><b>Boxing</b> – zabalení hodnotového typu do objektu (Java <code>int</code> → <code>Integer</code>)</li><li><b>Čistá funkce</b> – bez vedlejších efektů, stejný vstup → stejný výstup</li><li><b>Predikát</b> – funkce vracející True/False</li><li><b>Generátor</b> – vrací hodnotu po jedné při <code>.next()</code></li></ul>Procedura (nevrací hodnotu) může mít vedlejší efekty; funkce vrací hodnotu." }
);
