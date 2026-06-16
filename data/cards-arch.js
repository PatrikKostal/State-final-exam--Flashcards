// 3. Nízkoúrovňové výpočetní architektury (PB151)
// Otázka pro státnice PVA – flashcards k tématu "Výpočetní architektury".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.arch = { label: "🔧 Výpočetní architektury", cls: "tag-arch", order: 14 };

FC.cards.push(
  { t: "arch",
    q: "Co je poziční číselná soustava a jak je definovaná?",
    a: "<b>Soustava, kde hodnota číslice závisí na její pozici.</b> Hodnota = Σ cᵢ · zⁱ, kde z je <b>základ (báze)</b>.<ul><li><b>Dvojková (z=2)</b> – číslice 0,1 (bit) – základ počítačů</li><li><b>Desítková (z=10)</b> – 0–9</li><li><b>Šestnáctková (z=16)</b> – 0–9, A–F – kompaktní zápis binárních dat</li><li><b>Osmičková (z=8)</b></li></ul>Příklad: 101₂ = 1·4 + 0·2 + 1·1 = 5₁₀." },

  { t: "arch",
    q: "Jak se převádí mezi číselnými soustavami?",
    a: "<ul><li><b>Do desítkové</b>: roznásobit číslice mocninami základu a sečíst</li><li><b>Z desítkové</b>: opakované <b>dělení základem</b>, zbytky čteme odspodu</li><li><b>Bin ↔ Hex</b>: po <b>čtveřicích bitů</b> (1 hex číslice = 4 bity), např. 1101 1010₂ = DA₁₆</li><li><b>Bin ↔ Oct</b>: po trojicích bitů</li></ul>Hex/oct jsou jen kompaktní zápis binárního – proto rychlé převody." },

  { t: "arch",
    q: "Jak se v počítači zobrazují celá čísla bez znaménka a se znaménkem?",
    a: "<ul><li><b>Bez znaménka (unsigned)</b> – n bitů → rozsah 0 až 2ⁿ−1</li><li><b>Přímý kód (sign-magnitude)</b> – nejvyšší bit = znaménko, zbytek velikost; problém: <b>dvě nuly</b> (+0, −0)</li><li><b>Jedničkový doplněk</b> – záporné = negace bitů; opět dvě nuly</li><li><b>Dvojkový doplněk</b> – standard; záporné = negace + 1. Jediná nula, rozsah −2ⁿ⁻¹ … 2ⁿ⁻¹−1</li></ul>" },

  { t: "arch",
    q: "Proč se používá dvojkový doplněk a jak se počítá?",
    a: "<b>Záporné číslo: znegovat všechny bity a přičíst 1.</b> (Nebo: −x = 2ⁿ − x.)<ul><li>Příklad (8 bitů): −5 = ~00000101 + 1 = 11111011</li><li><b>Výhody</b>: jediná reprezentace nuly; <b>sčítání i odčítání</b> používá tutéž operaci jako u unsigned (HW nemusí řešit znaménka)</li><li>Nejvyšší bit funguje jako znaménkový (1 = záporné)</li></ul>" },

  { t: "arch",
    q: "Jak funguje binární aritmetika a co je přetečení (overflow)?",
    a: "<ul><li><b>Sčítání</b> bit po bitu s přenosem (carry), stejně jako v desítkové</li><li><b>Odčítání</b> = přičtení dvojkového doplňku</li><li><b>Carry (přenos)</b> – přenos z nejvyššího bitu (důležité u unsigned)</li><li><b>Overflow (přetečení)</b> – výsledek se nevejde do rozsahu znaménkového typu; nastane, když se sčítají dvě čísla stejného znaménka a výsledek má opačné znaménko</li></ul>" },

  { t: "arch",
    q: "Co je vnitřní a vnější kód? Co je BCD?",
    a: "<ul><li><b>Vnitřní kód</b> – způsob reprezentace dat uvnitř počítače (dvojkový doplněk, IEEE 754, …)</li><li><b>Vnější kód</b> – pro komunikaci s okolím / člověkem (ASCII, Unicode/UTF-8, BCD)</li><li><b>BCD (Binary Coded Decimal)</b> – každá desítková číslice kódována 4 bity zvlášť (např. 25 = 0010 0101). Snadný převod na text, ale méně úsporné; používá se v kalkulačkách, financích.</li></ul>" },

  { t: "arch",
    q: "Jaký je rozdíl mezi detekčními a opravnými kódy? Uveď příklady.",
    a: "<ul><li><b>Detekční kódy</b> – jen odhalí chybu (ne opraví). <b>Parita</b> (přidá bit tak, aby byl počet jedniček sudý/lichý) – odhalí 1bitovou chybu. <b>CRC</b> – polynomiální kontrolní součet, odhalí shluky chyb (sítě, disky).</li><li><b>Opravné kódy</b> – chybu odhalí <b>i opraví</b>. <b>Hammingův kód</b> – opraví 1bitovou chybu pomocí více paritních bitů; používá ECC paměti.</li></ul>Klíčový pojem: <b>Hammingova vzdálenost</b> kódu určuje schopnost detekce/opravy." },

  { t: "arch",
    q: "Jaký je rozdíl mezi kombinačními a sekvenčními obvody?",
    a: "<ul><li><b>Kombinační obvod</b> – výstup závisí <b>jen na aktuálních vstupech</b> (žádná paměť). Skládá se z <b>hradel</b> (AND, OR, NOT, XOR…). Příklady: sčítačka, multiplexor, dekodér.</li><li><b>Sekvenční obvod</b> – výstup závisí na vstupech <b>i na vnitřním stavu</b> (paměti). Základní prvek = <b>klopný obvod (flip-flop)</b>, řízeno <b>hodinovým signálem</b>. Příklady: registry, čítače, paměti.</li></ul>" },

  { t: "arch",
    q: "Co je klopný obvod (flip-flop)?",
    a: "<b>Základní paměťový prvek uchovávající 1 bit.</b><ul><li>Má stabilní stavy 0/1, mění je podle vstupů a obvykle hran hodinového signálu (clock)</li><li>Typy: <b>D</b> (zapamatuje vstup), <b>RS</b>, <b>JK</b>, <b>T</b> (klopí stav)</li><li>Z flip-flopů se skládají <b>registry</b> a <b>čítače</b>; je to stavební kámen sekvenčních obvodů</li></ul>" },

  { t: "arch",
    q: "Jaké jsou základní parametry a typy pamětí?",
    a: "<b>Parametry:</b> kapacita, přístupová doba (latence), propustnost, energetická náročnost, volatilita, cena/bit.<ul><li><b>RAM</b> (volatilní): <b>SRAM</b> (rychlá, drahá – cache) vs <b>DRAM</b> (hustá, levnější, nutné obnovování – hlavní paměť)</li><li><b>ROM / Flash</b> (nevolatilní) – uchová data bez napájení</li><li><b>Registry</b> – nejrychlejší, přímo v CPU</li></ul>" },

  { t: "arch",
    q: "Co je paměťová hierarchie a proč existuje?",
    a: "<b>Vrstvy pamětí seřazené podle rychlosti, ceny a kapacity:</b><br><b>registry → cache (L1/L2/L3) → RAM → disk (SSD/HDD)</b><ul><li>Směrem dolů: <b>pomalejší, větší, levnější</b></li><li>Cíl: iluze velké a zároveň rychlé paměti za rozumnou cenu</li><li>Funguje díky <b>lokalitě přístupů</b> (časové a prostorové) – často používaná data jsou ve vyšších, rychlejších vrstvách</li></ul>" },

  { t: "arch",
    q: "Jaká je základní architektura procesoru?",
    a: "<b>Hlavní části CPU:</b><ul><li><b>ALU</b> (aritmeticko-logická jednotka) – počítá (sčítání, logické operace)</li><li><b>Řadič (control unit)</b> – dekóduje instrukce a řídí ostatní části</li><li><b>Registry</b> – malá rychlá paměť (operandy, mezivýsledky)</li><li><b>PC (čítač instrukcí)</b>, <b>IR (instrukční registr)</b>, stavový registr (příznaky)</li><li><b>Sběrnice</b> – propojení s pamětí a I/O</li></ul>" },

  { t: "arch",
    q: "Jaký je rozdíl mezi von Neumannovou a Harvardskou architekturou?",
    a: "<ul><li><b>Von Neumannova</b> – program i data ve <b>společné paměti</b> a po jedné sběrnici. Jednodušší, ale <b>von Neumannovo úzké hrdlo</b> (sběrnice je úzké místo).</li><li><b>Harvardská</b> – <b>oddělená paměť a sběrnice</b> pro instrukce a data → souběžný přístup, rychlejší. Časté u mikrokontrolérů, DSP.</li></ul>Moderní CPU: navenek von Neumann, uvnitř <b>oddělené L1 cache</b> pro instrukce a data (modifikovaná Harvardská)." },

  { t: "arch",
    q: "Co je instrukční cyklus procesoru?",
    a: "<b>Opakovaný cyklus zpracování jedné instrukce (fetch-decode-execute):</b><ol><li><b>Fetch</b> – načtení instrukce z paměti podle PC</li><li><b>Decode</b> – řadič rozpozná instrukci a operandy</li><li><b>Execute</b> – ALU/jednotky provedou operaci</li><li><b>Write-back</b> – uložení výsledku, posun PC na další instrukci</li></ol>Moderní procesory cyklus překrývají pomocí <b>zřetězení (pipeline)</b>." },

  { t: "arch",
    q: "Co znamená programování procesoru na nízké úrovni?",
    a: "<ul><li><b>Strojový kód</b> – binární instrukce, kterým procesor přímo rozumí (operační kód + operandy)</li><li><b>Assembler (jazyk symbolických adres)</b> – čitelné mnemotechnické zkratky (MOV, ADD, JMP) překládané 1:1 na strojový kód</li><li><b>Instrukční sada (ISA)</b> – rozhraní mezi HW a SW (x86, ARM, RISC-V), definuje instrukce, registry, režimy adresování</li></ul>" },

  { t: "arch",
    q: "Co je mikroprogramování?",
    a: "<b>Způsob realizace řadiče, kde se každá strojová instrukce rozkládá na posloupnost jednodušších kroků – mikroinstrukcí (mikrokód).</b><ul><li>Mikroinstrukce řídí jednotlivé signály a přenosy uvnitř CPU</li><li>Uloženy v <b>řídicí paměti</b> procesoru</li><li><b>Výhoda</b>: flexibilita, snadná úprava/oprava instrukční sady (typické pro <b>CISC</b>)</li><li>Alternativa: <b>pevně zapojený (hardwired) řadič</b> – rychlejší, typický pro RISC</li></ul>" },

  { t: "arch",
    q: "Jaký je rozdíl mezi architekturami RISC a CISC?",
    a: "<ul><li><b>CISC</b> (Complex Instruction Set) – mnoho složitých instrukcí, různá délka, instrukce může pracovat přímo s pamětí; často <b>mikroprogramovaný</b> řadič. Příklad: <b>x86</b>.</li><li><b>RISC</b> (Reduced Instruction Set) – málo jednoduchých instrukcí pevné délky, <b>load/store</b> architektura (s pamětí jen load/store), mnoho registrů, vhodné pro <b>pipeline</b>. Příklad: <b>ARM, RISC-V, MIPS</b>.</li></ul>Dnešní x86 jsou uvnitř CISC, který se překládá na RISC-like mikrooperace." },

  { t: "arch",
    q: "Co je vyrovnávací paměť (cache) a na jakém principu funguje?",
    a: "<b>Rychlá malá paměť (SRAM) mezi CPU a RAM, uchovávající často používaná data.</b> Využívá <b>princip lokality</b>:<ul><li><b>Časová lokalita</b> – nedávno použitá data se brzy použijí znovu</li><li><b>Prostorová lokalita</b> – brzy se použijí sousední adresy (proto se načítají celé <b>bloky/řádky</b>)</li></ul>Úrovně <b>L1, L2, L3</b> (L1 nejmenší/nejrychlejší). Zrychluje přístup výrazně oproti hlavní paměti." },

  { t: "arch",
    q: "Co je cache hit/miss a jak se cache mapuje?",
    a: "<ul><li><b>Hit</b> – data jsou v cache (rychlé); <b>Miss</b> – nejsou, nutno z pomalejší paměti. <b>Hit rate</b> určuje efektivitu.</li><li><b>Mapování</b>: <b>přímé</b> (blok má 1 možné místo – rychlé, časté konflikty), <b>plně asociativní</b> (kamkoli – pružné, drahé), <b>množinově asociativní</b> (kompromis, např. 4-cestné)</li><li><b>Politika nahrazování</b>: LRU, FIFO, random; <b>zápis</b>: write-through vs write-back</li></ul>" },

  { t: "arch",
    q: "Jak se reprezentují reálná čísla (IEEE 754)?",
    a: "<b>Norma IEEE 754 ukládá číslo ve tvaru ± mantisa × 2^exponent.</b> Pro 32bit (single):<ul><li><b>1 bit znaménko</b></li><li><b>8 bitů exponent</b> (s posunem/bias 127)</li><li><b>23 bitů mantisa</b> (s implicitní jedničkou před desetinnou čárkou)</li></ul>Umožňuje obrovský rozsah, ale jen <b>konečnou přesnost</b> → zaokrouhlovací chyby (0.1 nelze přesně). Speciální hodnoty: ±0, ±∞, NaN." },

  { t: "arch",
    q: "Co jsou minimalizační metody logických funkcí?",
    a: "<b>Zjednodušení booleovského výrazu na méně hradel.</b><ul><li><b>Booleova algebra</b> – úpravy podle zákonů (de Morgan, distributivita…)</li><li><b>Karnaughova mapa (K-mapa)</b> – grafická metoda: do tabulky se zakreslí jedničky a slučují se sousední do co největších skupin (mocniny 2)</li><li><b>Quine–McCluskey</b> – tabulková, algoritmizovatelná metoda pro více proměnných</li></ul>Cíl: menší, levnější a rychlejší obvod." },

  { t: "arch",
    q: "Co je polosčítačka a úplná sčítačka?",
    a: "<ul><li><b>Polosčítačka (half adder)</b> – sečte 2 bity, výstupy <b>součet S = A⊕B</b> (XOR) a <b>přenos C = A·B</b> (AND). Neumí započítat přenos zdola.</li><li><b>Úplná sčítačka (full adder)</b> – sečte 3 bity (A, B, přenos Cᵢₙ), dává součet a přenos. Řetězením úplných sčítaček vznikne <b>vícebitová sčítačka</b>.</li></ul>" },

  { t: "arch",
    q: "Jak se rychle převádí mezi binární, osmičkovou a šestnáctkovou soustavou?",
    a: "<ul><li><b>BIN ↔ OCT</b>: 1 osmičková číslice = <b>3 bity</b></li><li><b>BIN ↔ HEX</b>: 1 hex číslice = <b>4 bity</b></li><li><b>OCT ↔ HEX</b>: přes binární (2 kroky)</li></ul>Příklad: 1101 1010₂ = DA₁₆ = 332₈. Poziční soustava: A = Σ aᵢ·zⁱ (z = základ)." },

  { t: "arch",
    q: "Porovnej přímý, inverzní, doplňkový a aditivní kód.",
    a: "<ul><li><b>Přímý</b> – nejvyšší bit znaménko; <b>dvě nuly</b>, složitá aritmetika</li><li><b>Inverzní</b> – záporné = negace bitů; dvě nuly, při přenosu nutná <b>korekce +1</b></li><li><b>Doplňkový</b> – záporné = negace+1; <b>jediná nula</b>, asymetrický rozsah (−2ⁿ⁻¹..2ⁿ⁻¹−1), nejpoužívanější</li><li><b>Aditivní (s posunem/bias)</b> – přičítá konstantu, umožňuje <b>přímé porovnání</b> jako nezáporných; používá exponent v IEEE 754</li></ul>" },

  { t: "arch",
    q: "Jak přesně se uloží číslo do IEEE 754 (float)?",
    a: "<b>F = ± mantisa · 2^exp; 1 bit znaménko + 8 bitů exponent + 23 bitů mantisa.</b><ul><li><b>Exponent</b> – aditivní kód (bias 127), <b>mantisa</b> – přímý kód, normalizovaná (vedoucí 1 se <b>neukládá</b>)</li></ul>Příklad 6,5 = 110,1₂ = 1,101·2² → znaménko 0, exponent 2+127=129=10000001, mantisa 1010…0." },

  { t: "arch",
    q: "Jaké jsou parametry Hammingova kódu (7,4)?",
    a: "<b>Hammingův kód – paritní bity na pozicích mocnin 2, každý hlídá paritu podmnožiny bitů.</b><ul><li><b>(7,4)</b>: 4 datové + 3 paritní bity, <b>minimální Hammingova vzdálenost d = 3</b></li><li>Obecně: opraví ⌊(d−1)/2⌋ chyb, detekuje d−1 chyb → (7,4) <b>opraví 1 bit, detekuje 2</b></li><li><b>Rozšířený (8,4) = SECDED</b>: přidá celkovou paritu, d=4 (oprava 1, detekce 2)</li></ul>Syndrom udává, který bit je chybný." },

  { t: "arch",
    q: "Co je Booleova algebra a De Morganovy zákony?",
    a: "<b>Algebra nad {0,1} s operacemi ∧ (AND), ∨ (OR), ¬ (NOT).</b> Klíčové zákony:<ul><li><b>De Morgan</b>: ¬(x∧y) = ¬x ∨ ¬y; ¬(x∨y) = ¬x ∧ ¬y</li><li>distributivita, absorpce (x ∨ (x∧y) = x), komplementarita (x ∧ ¬x = 0)</li></ul>Hradla: NOT, AND, OR, NAND, NOR, <b>XOR (Y = ¬A·B + A·¬B)</b>. Hradla nemají paměť (kombinační)." },

  { t: "arch",
    q: "Jaké jsou typy pamětí (RAM, ROM, EPROM, EEPROM, CAM)?",
    a: "<ul><li><b>RAM/RWM</b> – čtení i zápis, <b>volatilní</b> (SRAM rychlá/cache, DRAM hustá/hlavní)</li><li><b>ROM</b> – jen čtení, nevolatilní (firmware)</li><li><b>EPROM</b> – mazatelná UV světlem; <b>EEPROM/Flash</b> – elektricky přepisovatelná</li><li><b>CAM (asociativní)</b> – přístup podle <b>obsahu/tagu</b>, ne adresy (cache, směrovače)</li></ul>Paměťová buňka DRAM = 1 tranzistor + 1 kondenzátor." },

  { t: "arch",
    q: "Co je endianita (little vs big endian)?",
    a: "<b>Způsob uložení bajtů víceбajtového čísla v paměti.</b><ul><li><b>Little-endian</b> – nejméně významný bajt na <b>nejnižší adrese</b> (x86); výhoda: char a int na stejné adrese mají stejnou hodnotu</li><li><b>Big-endian</b> – nejvýznamnější bajt na nejnižší adrese (síťové pořadí)</li></ul>" },

  { t: "arch",
    q: "Jaké cachovací algoritmy a úrovně cache znáš?",
    a: "<ul><li><b>L1</b> – vlastní na jádro, 1–3 cykly; <b>L2</b> – obvykle na jádro; <b>L3</b> – sdílená všemi jádry, MB</li></ul>Vyhazovací algoritmy:<ul><li><b>LRU</b> (Least Recently Used) – vyhodí nejdéle nepoužitá data</li><li><b>LFU</b> (Least Frequently Used) – vyhodí nejméně používaná</li></ul><b>Prefetch</b> – přednačtení dat dopředu." },

  { t: "arch",
    q: "Co jsou registry A a PC a co je strojový vs instrukční cyklus?",
    a: "<ul><li><b>Registry</b> – nejrychlejší úložiště v CPU (velikost 1 slovo); <b>A</b> = střádač (accumulator), <b>PC</b> = čítač instrukcí (drží adresu další instrukce)</li><li><b>Strojový cyklus</b> – čas na čtení jednoho slova z paměti</li><li><b>Instrukční cyklus</b> – výběr + provedení instrukce</li></ul>Stav procesoru = aritmetické registry + PC + ukazatel zásobníku." },

  { t: "arch",
    q: "Co je zásobník volání (call stack) a jeho stack-frame?",
    a: "<b>Souvislá oblast paměti uchovávající návratové adresy při zanoření do podprogramů.</b> Každý <b>stack-frame</b> obsahuje:<ul><li>lokální proměnné, návratovou adresu, parametry</li></ul><b>Stack Pointer</b> ukazuje na vrchol zásobníku, <b>Frame Pointer</b> na začátek aktuálního rámce. Instrukce PUSH/POP nemají kontrolu přetečení." },

  { t: "arch",
    q: "Jaké jsou typy přerušení a jak se noř (vnořují)?",
    a: "<ul><li><b>Vnější (hardwarové)</b> – od I/O zařízení, <b>asynchronní</b>, přes řadič přerušení</li><li><b>Vnitřní (výjimky)</b> – vyvolá procesor (dělení nulou, výpadek stránky, porušení ochrany)</li><li><b>Softwarové</b> – instrukce, <b>synchronní</b>; používá se pro <b>systémová volání</b></li></ul>K přerušení dojde jen <b>mezi instrukcemi</b>; mohou se <b>nořit</b> (přerušení s vyšší prioritou přeruší obsluhu). Je to synchronizační prostředek." },

  { t: "arch",
    q: "Jak pipelining souvisí s RISC a jaký je rozdíl RISC vs CISC v instrukcích?",
    a: "<b>Pipelining (zřetězení)</b> překrývá fáze instrukcí (Fetch, Decode, Execute, Memory, Write-back) jako pásová výroba → dokončí ~1 instrukci/takt (CPI≈1).<ul><li><b>RISC</b> má <b>pevnou délku a jednotný formát</b> instrukcí → zřetězení usnadňuje; práce s pamětí jen LOAD/STORE</li><li><b>CISC</b> – složité instrukce různé délky, instrukce může pracovat přímo s pamětí (ADD X,Y)</li></ul>RISC: víc kódu, jednodušší HW, víc registrů." },

  { t: "arch",
    q: "Co je DMA a offload přerušení?",
    a: "<ul><li><b>DMA (Direct Memory Access)</b> – zařízení přistupuje do paměti <b>bez procesoru</b> (odlehčení CPU u von Neumanna)</li><li><b>Offload přerušení</b> – jednotka (např. síťová karta) mapovaná do paměti s vlastní výpočetní jednotkou zpracuje přerušení sama a zapíše výsledek do paměti, aby neobtěžovala procesor</li></ul>" }
);
