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
    a: "<ul><li><b>ER diagram (entitně-vztahový)</b> – konceptuální model: <b>entity</b> (obdélníky), <b>atributy</b>, <b>vztahy</b> (kosočtverce) s <b>kardinalitou</b> (1:1, 1:N, M:N)</li><li><b>Dekompozice</b> – rozdělení relačního schématu na více menších kvůli normalizaci. Musí být <b>bezeztrátová</b> (spojením vznikne původní relace) a ideálně <b>zachovat funkční závislosti</b></li></ul>" }
);
