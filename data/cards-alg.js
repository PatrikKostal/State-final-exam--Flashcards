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
    a: "<ul><li><b>Rekurzivní algoritmus</b>: <b>indukcí</b> – ukážeme správnost báze a že z korektních dílčích výsledků plyne korektní celek</li><li><b>Iterativní algoritmus</b>: <b>invariant cyklu</b> – tvrzení platné před každou iterací. Dokazujeme: <b>inicializace</b> (platí na začátku), <b>iterace</b> (zachová se), <b>ukončení</b> (po skončení dává správný výsledek)</li></ul>" },

  { t: "alg",
    q: "Jaké jsou druhy rekurze a jak souvisí se zásobníkem?",
    a: "<ul><li><b>Přímá</b> – funkce A volá A (zanoření)</li><li><b>Nepřímá</b> – A volá B, B volá A</li><li><b>Tail (koncová)</b> – volání je až úplně poslední operace; lze nahradit cyklem</li></ul>Rekurze funguje díky ukládání volání na <b>zásobník</b> (každé volání = rámec), musí mít <b>zarážku</b> (bázový případ). <b>Každou rekurzi lze převést na iteraci</b> (cyklem nebo explicitním zásobníkem)." },

  { t: "alg",
    q: "Co je matematická indukce a jak přesně souvisí s rekurzí?",
    a: "<b>Důkaz tvrzení T(n) pro všechna n ≥ k₀:</b><ol><li><b>Báze</b>: platí T(k₀)</li><li><b>Indukční krok</b>: platí-li T(k), platí i T(k+1)</li></ol>Rekurze jde <b>opačným směrem</b>: od složitého problému k bázi (řeší f(n) přes f(n−1)), indukce začíná bází. Společné: ani jedno nedokazuje rovnou počáteční krok – <b>pravdivost se přenáší krok po kroku</b>. Korektnost rekurze se dokazuje indukcí." },

  { t: "alg",
    q: "Co je úplnost, parciální a totální korektnost algoritmu?",
    a: "<ul><li><b>Úplnost (konvergence)</b> – pro každý platný vstup výpočet <b>skončí</b></li><li><b>Parciální korektnost</b> – <b>pokud</b> výpočet skončí, výsledek splňuje výstupní podmínku</li><li><b>Totální korektnost</b> = úplnost + parciální korektnost</li></ul>Algoritmus má vstupní podmínku, invariant cyklu a výstupní podmínku." },

  { t: "alg",
    q: "Jaké jsou výhody metody rozděl a panuj?",
    a: "<ul><li><b>Efektivnost</b> – často sníží složitost (až na logaritmickou úroveň dělení)</li><li><b>Paralelismus</b> – podproblémy lze řešit nezávisle souběžně</li><li><b>Cache</b> – malé podproblémy se vejdou do rychlé cache</li><li><b>Přesnost</b> – u float výpočtů menší zaokrouhlovací chyby</li></ul>Nevýhoda: režie rekurze (lze obejít explicitním zásobníkem)." },

  { t: "alg",
    q: "Jak se počítá složitost rekurzivních algoritmů?",
    a: "<b>Vyřešením rekurentní rovnice T(n):</b><ul><li><b>Substituční metoda</b> – odhad řešení + důkaz indukcí</li><li><b>Metoda rekurzivního stromu</b> – rozbalení rekurze, sečtení práce po úrovních (geometrická řada)</li><li><b>Master theorem (kuchařková věta)</b> – přímý vzorec pro tvar T(n)=aT(n/b)+f(n)</li></ul>Příklad: Hanojské věže T(n)=2T(n−1)+1 → <b>T(n)=2ⁿ−1</b>." },

  { t: "alg",
    q: "Jak zní Master theorem (kuchařková věta)?",
    a: "<b>Pro T(n) = a·T(n/b) + f(n), kde f(n) ∈ Θ(nᶜ):</b><ul><li><b>a &lt; bᶜ</b> → T(n) ∈ Θ(nᶜ) (dominuje slučování)</li><li><b>a = bᶜ</b> → T(n) ∈ Θ(nᶜ·log n)</li><li><b>a &gt; bᶜ</b> → T(n) ∈ Θ(n^(log_b a)) (dominují listy)</li></ul>a = počet podproblémů, b = faktor zmenšení, c = mocnina slučování. Příklad merge sort: a=2, b=2, c=1 → a=bᶜ → Θ(n log n)." },

  { t: "alg",
    q: "Co znamená stabilní, in situ a přirozený řadicí algoritmus?",
    a: "<ul><li><b>Stabilní</b> – <b>nemění vzájemné pořadí stejných prvků</b> (CHYTÁK: ne pořadí celé posloupnosti!)</li><li><b>In situ (in-place)</b> – kromě vstupu jen <b>konstantní</b> extra paměť (modifikuje původní pole)</li><li><b>Přirozený</b> – rychlejší na <b>částečně seřazených</b> datech (insertion sort, bubble sort)</li></ul>" },

  { t: "alg",
    q: "Jaké jsou složitosti hlavních řadicích algoritmů?",
    a: "<table><tr><td></td><td><b>nejhorší</b></td><td><b>průměr</b></td></tr><tr><td>insertion / selection</td><td>Θ(n²)</td><td>Θ(n²)</td></tr><tr><td>merge / heap</td><td>Θ(n log n)</td><td>Θ(n log n)</td></tr><tr><td>quick</td><td>Θ(n²)</td><td>Θ(n log n)</td></tr><tr><td>counting</td><td>Θ(k+n)</td><td>Θ(k+n)</td></tr></table>Asymptoticky optimální porovnávací: <b>merge sort, heapsort</b>." },

  { t: "alg",
    q: "Porovnej insertion sort a selection sort.",
    a: "<ul><li><b>Insertion (vkládáním)</b> – bere prvky z neseřazené části a <b>vkládá</b> na správné místo do seřazené; <b>stabilní</b>, in situ, přirozený (rychlý na seřazených datech)</li><li><b>Selection (výběrem)</b> – opakovaně <b>vybírá</b> minimum/maximum a dává na konec seřazené části; <b>není stabilní</b>, in situ</li></ul>Oba Θ(n²). Na <b>již seřazeném</b> poli je nejlepší <b>insertion sort</b>." },

  { t: "alg",
    q: "Jaké vlastnosti má merge sort a heapsort?",
    a: "<ul><li><b>Merge sort</b> – rozděl a panuj, <b>stabilní</b>, asymptoticky optimální Θ(n log n), ale <b>NENÍ in situ</b> (potřebuje O(n) navíc)</li><li><b>Heapsort</b> – přes haldu, <b>in situ</b>, Θ(n log n), ale <b>NENÍ stabilní</b></li></ul>" },

  { t: "alg",
    q: "Jak funguje quicksort a Lomutovo schéma (partition)?",
    a: "<b>Rozděl a panuj: zvol pivot, rozděl pole na menší/větší, rekurzivně seřaď části.</b><ul><li><b>Lomuto</b>: pivot = poslední prvek; procházíme polem a menší prvky přesouváme doleva (index i), nakonec pivot na pozici i+1</li><li>Průměr Θ(n log n), nejhůř Θ(n²) (špatný pivot), in situ, není stabilní</li></ul>" },

  { t: "alg",
    q: "Jaké jsou nekomparativní řadicí algoritmy a proč jsou lineární?",
    a: "<b>Neporovnávají prvky → obcházejí dolní mez Θ(n log n):</b><ul><li><b>Counting sort</b> – spočítá výskyty hodnot, pak složí výsledek; Θ(n+k)</li><li><b>Radix sort</b> – třídí podle číslic od nejméně významné; Θ(d(n+k))</li><li><b>Bucket sort</b> – rozdělí do přihrádek dle rozsahu, ty doseřadí; Θ(n) v průměru</li></ul>Vhodné pro celá čísla / omezený rozsah, paralelizovatelné." },

  { t: "alg",
    q: "CHYTÁK: Jaká je dolní mez řazení porovnáváním?",
    a: "<b>Θ(n log n)</b> – žádný porovnávací algoritmus nemůže být v nejhorším případě asymptoticky lepší.<ul><li>Plyne z toho, že rozhodovací strom má n! listů (permutací) a výška ≥ log(n!) = Θ(n log n)</li><li><b>Nekomparativní</b> algoritmy (counting, radix) tuto mez obcházejí, protože neporovnávají – ale fungují jen za speciálních podmínek</li></ul>" },

  { t: "alg",
    q: "PŘÍKLAD: Jaký je invariant cyklu u iterativního faktoriálu?",
    a: "<b>Pro <code>i=0; f=1; while i&lt;n: i=i+1; f=f*i</code> je invariantem <code>f = i!</code></b>.<ul><li>Před cyklem: i=0, f=1=0! ✓</li><li>Po každé iteraci stále f = i!</li><li>Po skončení i=n, takže f = n! (výstupní podmínka)</li></ul>Tohle je typická státnicová úloha na invariant cyklu." },

  { t: "alg",
    q: "Co znamená malé o a malé ω (na rozdíl od O a Ω)?",
    a: "<ul><li><b>O(g)</b> – f roste nejvýše jako g (≤, může i stejně rychle)</li><li><b>o(g)</b> – f roste <b>ostře pomaleji</b> než g (lim f/g = 0)</li><li><b>ω(g)</b> – f roste <b>ostře rychleji</b> než g</li></ul>Příklad: 2³ⁿ ∈ o(3²ⁿ), protože 8ⁿ roste pomaleji než 9ⁿ. Platí tranzitivita: f∈O(g) ∧ g∈O(h) ⟹ f∈O(h)." },

  { t: "alg",
    q: "PŘÍKLAD: Jak se řeší rekurence zpětným dosazováním (Hanojské věže)?",
    a: "<b>T(n) = 2T(n−1) + 1, T(1) = 1:</b><ul><li>= 2[2T(n−2)+1]+1 = 4T(n−2)+2+1</li><li>= 2ⁱ·T(n−i) + 2ⁱ−1</li><li>pro i = n−1: 2ⁿ⁻¹·1 + 2ⁿ⁻¹−1 = <b>2ⁿ−1</b></li></ul>Postupné rozbalování rekurence a nalezení vzoru." },

  { t: "alg",
    q: "Jaké jsou nekomparativní řadicí algoritmy detailně?",
    a: "<ul><li><b>Counting sort</b> – spočítá výskyt každé hodnoty, pak složí; Θ(n+k), vhodné pro malý rozsah k</li><li><b>Radix sort</b> – třídí podle číslic od nejméně významné; Θ(d(n+k)), d = počet číslic</li><li><b>Bucket sort</b> – rozdělí do přihrádek podle rozsahu, ty doseřadí; Θ(n) průměrně, lze paralelizovat</li></ul>Obcházejí dolní mez Θ(n log n), protože neporovnávají." },

  { t: "alg",
    q: "Proč na stabilitě řazení záleží?",
    a: "<b>Stabilní algoritmus zachová pořadí prvků se stejným klíčem.</b><ul><li>Důležité při <b>řazení podle více kritérií</b> (např. nejdřív podle jména, pak stabilně podle věku → zachová abecední pořadí v rámci věku)</li></ul>Stabilní: insertion, merge, counting. Nestabilní: selection, heap, quick. CHYTÁK: stabilní algoritmus <b>nemění pořadí stejných</b>, ne celé posloupnosti." },

  { t: "alg",
    q: "Jak volba pivotu ovlivňuje quicksort?",
    a: "<ul><li><b>Dobrý pivot</b> (medián) → vyvážené půlení → Θ(n log n)</li><li><b>Špatný pivot</b> (min/max, např. krajní prvek u seřazeného pole) → jedna část prázdná → <b>Θ(n²)</b></li></ul>Řešení: <b>náhodný pivot</b> nebo <b>medián ze tří</b> (median-of-three) → nejhorší případ je nepravděpodobný." }
);
