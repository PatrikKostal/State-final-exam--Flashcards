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
    a: "<ul><li><b>Výhody</b>: zapouzdření a modularita, znovupoužití (dědičnost), rozšiřitelnost (polymorfismus), modelování reálných entit, snazší údržba</li><li><b>Nevýhody</b>: vyšší režie a složitost, riziko přílišné abstrakce/hluboké hierarchie dědičnosti, horší datová lokalita/výkon oproti nízkoúrovňovému přístupu</li></ul>Realizace v C#/C++/Java – liší se např. vícenásobnou dědičností (C++ ano, Java jen rozhraní)." }
);
