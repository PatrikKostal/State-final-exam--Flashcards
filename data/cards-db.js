// 4. Databáze (PB154)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.db = { label: "🗃️ Databáze", cls: "tag-db", order: 15 };

FC.cards.push(
  { t: "db",
    q: "Co je relace a relační schéma (z databázového i matematického pohledu)?",
    a: "<ul><li><b>Matematicky</b>: relace = podmnožina kartézského součinu domén D₁×…×Dₙ (množina n-tic)</li><li><b>Databázově</b>: relace = <b>tabulka</b>; řádky = <b>n-tice (záznamy)</b>, sloupce = <b>atributy</b></li><li><b>Relační schéma</b> = název relace + množina atributů a jejich domén (struktura tabulky), např. <code>Student(id, jméno, ročník)</code></li><li><b>Doména</b> = množina přípustných hodnot atributu</li></ul>" },

  { t: "db",
    q: "Jaké jsou typy klíčů v relačním modelu?",
    a: "<ul><li><b>Superklíč</b> – množina atributů jednoznačně určující n-tici (může mít nadbytečné atributy)</li><li><b>Kandidátní klíč</b> – <b>minimální</b> superklíč (žádný atribut nelze odebrat)</li><li><b>Primární klíč</b> – zvolený kandidátní klíč pro identifikaci záznamů</li><li><b>Cizí klíč</b> – atribut odkazující na primární klíč jiné (nebo téže) relace → <b>referenční integrita</b></li></ul>" },

  { t: "db",
    q: "Co jsou funkční závislosti?",
    a: "<b>Funkční závislost X → Y znamená, že hodnota atributů X jednoznačně určuje hodnotu atributů Y.</b><ul><li>Příklad: <code>rodné_číslo → jméno, datum_narození</code></li><li>Jsou základem pro definici klíčů a <b>normálních forem</b></li><li>Armstrongovy axiomy (reflexivita, rozšíření, tranzitivita) umožňují odvozovat další závislosti</li></ul>" },

  { t: "db",
    q: "Co jsou normální formy 1NF, 2NF, 3NF a proč normalizujeme?",
    a: "<ul><li><b>1NF</b> – všechny hodnoty <b>atomické</b> (žádné seznamy/vnořené tabulky)</li><li><b>2NF</b> – 1NF + žádný neklíčový atribut nezávisí jen na <b>části</b> složeného klíče (úplná závislost na klíči)</li><li><b>3NF</b> – 2NF + žádná <b>tranzitivní závislost</b> neklíčových atributů na klíči</li></ul><b>Normalizace</b> odstraňuje <b>redundanci</b> a <b>aktualizační anomálie</b>. Platí vnoření: 3NF ⊂ 2NF ⊂ 1NF." },

  { t: "db",
    q: "Co je Boyce-Coddova normální forma (BCNF)?",
    a: "<b>Přísnější varianta 3NF.</b><ul><li>Pro <b>každou</b> netriviální funkční závislost X → Y musí být <b>X superklíč</b></li><li>Odstraňuje i anomálie, které 3NF nechá, když existuje více překrývajících se kandidátních klíčů</li><li>Vztah: <b>BCNF ⊂ 3NF</b> (každá BCNF je 3NF, ne naopak)</li></ul>Někdy nelze dosáhnout BCNF při zachování všech závislostí." },

  { t: "db",
    q: "Co je relační algebra a její základní operace?",
    a: "<b>Formální jazyk dotazů – operace nad relacemi vracející relace.</b><ul><li><b>Selekce σ</b> – vybere <b>řádky</b> splňující podmínku (≈ SQL <code>WHERE</code>)</li><li><b>Projekce π</b> – vybere <b>sloupce</b> (≈ SQL <code>SELECT sloupce</code>)</li><li><b>Přejmenování ρ</b>, <b>spojení ⋈</b>, <b>agregace</b></li><li>Množinové: sjednocení, průnik, rozdíl, kartézský součin</li></ul>Příklad: <code>σ(ročník=1)(Student)</code> = studenti 1. ročníku." },

  { t: "db",
    q: "Jaký je rozdíl mezi přirozeným a vnějším spojením (join)?",
    a: "<ul><li><b>Přirozené spojení (natural/inner join)</b> – spojí n-tice se shodnými hodnotami společných atributů; <b>nespárované řádky vypadnou</b></li><li><b>Vnější spojení (outer join)</b> – zachová i nespárované řádky a doplní <b>NULL</b>:<ul><li>levé / pravé / <b>úplné</b> (full outer) – zachová z levé / pravé / obou tabulek</li></ul></li></ul>" },

  { t: "db",
    q: "Co je ER diagram a co je dekompozice schématu?",
    a: "<ul><li><b>ER diagram (entitně-vztahový)</b> – konceptuální model: <b>entity</b> (obdélníky), <b>atributy</b>, <b>vztahy</b> (kosočtverce) s <b>kardinalitou</b> (1:1, 1:N, M:N)</li><li><b>Dekompozice</b> – rozdělení relačního schématu na více menších kvůli normalizaci. Musí být <b>bezeztrátová</b> (spojením vznikne původní relace) a ideálně <b>zachovat funkční závislosti</b></li></ul>" },

  { t: "db",
    q: "Co je redundance a inkonzistence dat?",
    a: "<ul><li><b>Redundance</b> – opakovaný výskyt stejné informace (zbytečné, plýtvání místem)</li><li><b>Inkonzistence</b> – porušení nastavených pravidel (např. dva záznamy sdílejí unikátní ID)</li></ul>Redundance vede k <b>aktualizačním anomáliím</b> – proto normalizujeme. Relační model staví na <b>predikátové logice</b> (data jako n-ární relace)." },

  { t: "db",
    q: "Co je atribut, doména a jak je to s hodnotou null?",
    a: "<ul><li><b>Atribut</b> – atomická hodnota datového typu (sloupec má název, typ, doménu)</li><li><b>Doména</b> – množina povolených hodnot atributu</li><li><b>null</b> patří do <b>každé domény</b></li></ul>Relace = množina n-tic (řádků) <b>bez duplicit</b>; podmnožina kartézského součinu domén." },

  { t: "db",
    q: "Jakých 6 základních operací má relační algebra?",
    a: "<b>Procedurální dotazovací jazyk, operace uzavřené nad relacemi:</b><ul><li><b>σ (selekce)</b> – vybírá řádky podle podmínky</li><li><b>Π (projekce)</b> – vybírá sloupce</li><li><b>∪ (sjednocení)</b>, <b>− (rozdíl)</b> – kompatibilní relace (stejná arita)</li><li><b>× (kartézský součin)</b> – všechny kombinace</li><li><b>ρ (přejmenování)</b> – mění názvy atributů</li></ul>Odvozené: ∩ (průnik), ⋈ (join), agregace G." },

  { t: "db",
    q: "Jak funguje přirozené spojení (natural join) přes relační algebru?",
    a: "<b>r ⋈ s spojí řádky se shodnými hodnotami společných atributů.</b> Vyjádřeno základními operacemi:<br><b>r ⋈ s = Π(σ_{r.B=s.B ∧ …}(r × s))</b><ul><li>Z kartézského součinu <b>selekcí</b> ponecháme shodné společné atributy</li><li><b>Projekcí</b> odstraníme duplicitní sloupce</li></ul>Nespárované řádky vypadnou (inner join)." },

  { t: "db",
    q: "Jaké jsou varianty vnějšího spojení (outer join)?",
    a: "<b>Rozšiřuje natural join, chybějící hodnoty doplní null:</b><ul><li><b>Left outer (r ⟕ s)</b> – průnik + všechny záznamy z <b>levé</b> tabulky</li><li><b>Right outer (r ⟖ s)</b> – průnik + všechny z <b>pravé</b></li><li><b>Full outer (r ⟗ s)</b> – záznamy z <b>obou</b> tabulek</li></ul>" },

  { t: "db",
    q: "Jak fungují agregační funkce v relační algebře?",
    a: "<b>G – avg, min, max, sum, count.</b><ul><li>Často s <b>seskupením</b>: ₚₒᵦₒčₖₐ G _sum(stav)(účet) seskupí podle pobočky a sečte</li><li><b>count</b> vrací <b>0</b> pro null; ostatní funkce vrací <b>null</b> pro null</li></ul>Výsledky agregací je vhodné <b>přejmenovat</b> (ρ)." },

  { t: "db",
    q: "Jaké jsou typy funkčních závislostí?",
    a: "<b>X → Y: stejná hodnota X ⟹ stejná hodnota Y.</b><ul><li><b>Triviální</b>: Y ⊆ X (platí vždy)</li><li><b>Úplná (full)</b>: Y závisí na celém X, ne na žádné jeho části</li><li><b>Částečná (parciální)</b>: stačí část X (∃ γ ⊂ X: γ → Y)</li><li><b>Tranzitivní</b>: X → γ → Y (přes prostředníka)</li></ul>Příklad tranzitivní: rodné číslo → datum narození." },

  { t: "db",
    q: "Jaké jsou Armstrongovy axiomy?",
    a: "<b>Pravidla pro odvozování funkčních závislostí (hledání uzávěru F⁺):</b><ul><li><b>Reflexivita</b>: Y ⊆ X ⟹ X → Y</li><li><b>Rozšíření</b>: X → Y ⟹ XZ → YZ</li><li><b>Tranzitivita</b>: X → Y, Y → Z ⟹ X → Z</li></ul>Odvozené: sjednocení (X→Y, X→Z ⟹ X→YZ), dekompozice (X→YZ ⟹ X→Y, X→Z), pseudotranzitivita." },

  { t: "db",
    q: "Co přesně porušuje 2NF a 3NF?",
    a: "<ul><li><b>2NF</b> = 1NF + žádná <b>parciální závislost</b> neklíčového atributu na části složeného klíče (když AB→CD, nesmí B→C)</li><li><b>3NF</b> = 2NF + žádná <b>tranzitivní závislost</b> (když AB→C→D, porušení). Formálně: každá netriviální α→β má α superklíč, nebo β−α je v kandidátním klíči</li></ul>" },

  { t: "db",
    q: "Čím se BCNF liší od 3NF a jaký to má háček?",
    a: "<b>BCNF: pro každou netriviální závislost α→β musí být α SUPERKLÍČ</b> (ruší 3NF výjimku „β je prvočíselný atribut\").<ul><li>Rozdíl se projeví jen u <b>překrývajících se kandidátních klíčů</b></li><li><b>Háček</b>: dekompozice do BCNF může <b>ztratit funkční závislost</b> – proto se někdy zůstává u 3NF</li></ul>Vztah: BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF." },

  { t: "db",
    q: "Co musí splňovat dekompozice a zlepšuje normalizace výkon?",
    a: "<ul><li><b>Bezztrátovost</b> – spojením menších schémat vznikne přesně původní relace (žádné falešné řádky)</li><li><b>Zachování závislostí</b> – (F₁ ∪ … ∪ Fₙ)⁺ = F⁺</li></ul><b>CHYTÁK</b>: normalizace zlepšuje <b>konzistenci a omezuje redundanci</b>, ale <b>NEzlepšuje výkon</b> (víc tabulek = víc joinů, někdy se naopak denormalizuje kvůli rychlosti)." },

  { t: "db",
    q: "Jaké jsou databázové modely?",
    a: "<ul><li><b>Relační</b> – data jako n-ární relace (tabulky), založeno na predikátové logice (nejrozšířenější)</li><li><b>Síťový</b> – záznamy propojené ukazateli (graf)</li><li><b>Hierarchický</b> – stromová struktura (rodič-potomek)</li></ul>Databázový model určuje logickou strukturu a způsob ukládání dat." },

  { t: "db",
    q: "Co je superklíč, kandidátní a primární klíč přesně?",
    a: "<ul><li><b>Superklíč</b> – množina atributů jednoznačně identifikující n-tici (může být <b>nadbytečná</b>)</li><li><b>Kandidátní klíč</b> – <b>minimální</b> superklíč (žádný atribut nelze odebrat)</li><li><b>Primární klíč</b> – vybraný kandidátní klíč</li><li><b>Cizí klíč</b> – kandidátní klíč z jiné relace (definuje vztah)</li></ul>" },

  { t: "db",
    q: "Co je 0NF a proč musí být doména atomická v 1NF?",
    a: "<ul><li><b>0NF</b> – schéma má aspoň jeden atribut s jednou hodnotou</li><li><b>1NF</b> – všechny domény (atributy) jsou <b>atomické</b> (nedělitelné)</li></ul>Neatomické hodnoty (seznamy, vnořené tabulky) komplikují ukládání a vedou k redundanci. Řetězce a adresy se považují za atomické (nebo se adresa rozdělí na atributy)." },

  { t: "db",
    q: "PŘÍKLAD: Jak postupuje dekompozice schématu do 3NF/BCNF?",
    a: "<ol><li>Dej všechny atributy do jednoho schématu R, urči klíč</li><li>Není-li ve 2NF (parciální závislost na části klíče), rozděl → samostatné relace</li><li>Není-li ve 3NF (tranzitivní závislost, např. Typ stroje → Příkon), rozděl dál</li></ol>Výsledek: každé schéma drží jen atributy plně/přímo závislé na svém klíči → 3NF/BCNF, bezztrátově." },

  { t: "db",
    q: "Co je kartézský součin v relační algebře a proč potřebuje přejmenování?",
    a: "<b>r × s – relace všech kombinací řádků obou relací.</b><ul><li>Problém: mají-li relace <b>společné atributy</b>, vzniká konflikt jmen → nutné <b>přejmenování (ρ)</b></li><li>Je základem <b>spojení (join)</b>: r ⋈ s = projekce(selekce(r × s))</li></ul>Množinové operace (∪, −, ∩) vyžadují <b>kompatibilitu</b> (stejná arita a domény)." },

  { t: "db",
    q: "Co je relace z matematického a z databázového pohledu?",
    a: "<ul><li><b>Matematicky</b> – podmnožina kartézského součinu domén D₁×…×Dₙ (množina n-tic), <b>bez duplicit</b> a bez daného pořadí</li><li><b>Databázově</b> – tabulka: řádky = n-tice, sloupce = atributy</li></ul><b>Vazby</b> mezi relacemi vznikají, když sdílejí atributy (cizí klíče). Relace = obsah, schéma = struktura." },

  { t: "db",
    q: "Co je doménová a referenční integrita?",
    a: "<ul><li><b>Doménová integrita</b> – hodnota atributu musí být z jeho domény (přípustných hodnot); <code>CREATE DOMAIN</code></li><li><b>Referenční integrita</b> – cizí klíč v podřízené tabulce musí odkazovat na <b>existující záznam</b> v nadřízené tabulce (nebo být NULL)</li></ul>Integritní omezení chrání databázi před nekonzistencí." },

  { t: "db",
    q: "Co je projekce a selekce a jak se mapují na SQL?",
    a: "<ul><li><b>Selekce σ_P(r)</b> – vybere <b>řádky</b> splňující podmínku P → SQL <code>WHERE</code></li><li><b>Projekce Π_{A,B}(r)</b> – vybere <b>sloupce</b> A, B → SQL <code>SELECT A, B</code></li></ul>Projekce dovoluje i aritmetiku na sloupcích (např. limit − stav). Celý SELECT-FROM-WHERE = Π(σ(r₁ × r₂))." },

  { t: "db",
    q: "Co je tranzitivní funkční závislost (chyták u 3NF)?",
    a: "<b>X → Y → Z, kde Z závisí na klíči X jen nepřímo přes Y</b> (a Y není klíč).<ul><li>Příklad: <code>čísloStroje → typStroje → příkon</code></li><li>3NF tranzitivní závislosti <b>zakazuje</b> → příkon patří do samostatné relace (typStroje → příkon)</li></ul>Vede k aktualizačním anomáliím (změna příkonu na více místech)." }
);
