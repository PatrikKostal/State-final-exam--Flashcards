// 7. Návrh algoritmů (IB002, IB015)
// Otázka pro státnice PVA – flashcards k tématu "Návrh algoritmů".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.alg = { label: "🧩 Návrh algoritmů", cls: "tag-alg", order: 7 };

FC.cards.push(
  { t: "alg",
    q: "Co je metoda rozděl a panuj (divide and conquer)?",
    a: "<b>Strategie návrhu algoritmů ve třech krocích:</b><ol><li><b>Rozděl</b> – rozděl problém na menší podproblémy stejného typu</li><li><b>Panuj</b> – vyřeš podproblémy rekurzivně (triviální přímo)</li><li><b>Spoj</b> – zkombinuj řešení podproblémů do výsledku</li></ol>Příklady: <b>merge sort, quick sort, binární vyhledávání</b>, Karatsuba. Složitost často přes <b>master teorém</b>." },

  { t: "alg",
    q: "Jak funguje merge sort a proč má složitost O(n log n)?",
    a: "<b>Rozděl a panuj řazení:</b><ol><li>Pole rozdělí na <b>dvě poloviny</b></li><li>Každou rekurzivně seřadí</li><li><b>Merge</b> – slije dvě seřazené poloviny lineárním průchodem (O(n))</li></ol><b>Důkaz O(n log n)</b>: rekurzivní strom má <b>výšku log n</b> (půlení), na <b>každé úrovni</b> se spojuje celkem <b>O(n)</b> prvků → n·log n. Je stabilní, ale potřebuje O(n) paměti navíc." },

  { t: "alg",
    q: "Jak funguje quick sort a jaká je jeho složitost?",
    a: "<b>Rozděl a panuj:</b> zvolí <b>pivot</b>, rozdělí pole na menší/větší než pivot (partition), pak rekurzivně seřadí obě části.<ul><li><b>Průměrně O(n log n)</b>, in-place, v praxi velmi rychlý</li><li><b>Nejhorší případ O(n²)</b> – špatná volba pivotu (např. už seřazené pole s krajním pivotem)</li><li>Řeší se <b>náhodným/medián pivotem</b></li></ul>" },

  { t: "alg",
    q: "Jak funguje rekurze a jak vypadá rekurzivní vs iterativní faktoriál?",
    a: "<b>Rekurze = funkce volá sama sebe</b> na menším vstupu, dokud nedojde k <b>bázovému případu</b>.<ul><li><b>Rekurzivní</b>: <code>fact(n) = if n≤1 then 1 else n*fact(n-1)</code></li><li><b>Iterativní</b>: <code>r=1; for i=2..n: r*=i; return r</code></li></ul>Každé rekurzivní volání má vlastní rámec na <b>zásobníku</b> (riziko přetečení při hluboké rekurzi)." },

  { t: "alg",
    q: "Co je koncová (tail) rekurze a proč je užitečná?",
    a: "<b>Tail rekurze = rekurzivní volání je úplně poslední operací funkce</b> (výsledek se nijak dál neupravuje).<ul><li>Kompilátor ji umí přeložit na <b>cyklus</b> (tail-call optimization) – <b>bez růstu zásobníku</b></li><li>Faktoriál upravíme přidáním <b>akumulátoru</b>: <code>fact(n,acc) = if n≤1 then acc else fact(n-1, n*acc)</code></li></ul>" },

  { t: "alg",
    q: "Jaké jsou výhody a nevýhody rekurze a jak ji odstranit?",
    a: "<ul><li><b>Výhody</b>: čitelný, elegantní kód pro problémy s rekurzivní strukturou (stromy, rozděl a panuj)</li><li><b>Nevýhody</b>: režie volání, <b>přetečení zásobníku</b>, opakované výpočty</li></ul><b>Odstranění rekurze</b>: převod na <b>iteraci</b> s explicitním zásobníkem, <b>tail-call</b> optimalizace, nebo <b>dynamické programování / memoizace</b> (uchování dílčích výsledků)." },

  { t: "alg",
    q: "Jaký je vztah rekurze a matematické indukce?",
    a: "<b>Jsou to dvě strany téže mince.</b><ul><li><b>Indukce</b> dokazuje tvrzení: <b>báze</b> (platí pro nejmenší případ) + <b>indukční krok</b> (platí-li pro n, platí pro n+1)</li><li><b>Rekurze</b> řeší: <b>bázový případ</b> + <b>rekurzivní krok</b> (řešení z menších instancí)</li></ul>Proto se <b>korektnost rekurzivního algoritmu dokazuje indukcí</b> podle velikosti vstupu." },

  { t: "alg",
    q: "Jak se dokazuje korektnost algoritmu (invariant cyklu)?",
    a: "<ul><li><b>Rekurzivní algoritmus</b>: <b>indukcí</b> – ukážeme správnost báze a že z korektních dílčích výsledků plyne korektní celek</li><li><b>Iterativní algoritmus</b>: <b>invariant cyklu</b> – tvrzení platné před každou iterací. Dokazujeme: <b>inicializace</b> (platí na začátku), <b>iterace</b> (zachová se), <b>ukončení</b> (po skončení dává správný výsledek)</li></ul>" }
);
