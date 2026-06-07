// 3. Nízkoúrovňové výpočetní architektury (PB151)
// Otázka pro státnice PVA – flashcards k tématu "Výpočetní architektury".

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.arch = { label: "🔧 Výpočetní architektury", cls: "tag-arch", order: 3 };

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
    a: "<ul><li><b>Hit</b> – data jsou v cache (rychlé); <b>Miss</b> – nejsou, nutno z pomalejší paměti. <b>Hit rate</b> určuje efektivitu.</li><li><b>Mapování</b>: <b>přímé</b> (blok má 1 možné místo – rychlé, časté konflikty), <b>plně asociativní</b> (kamkoli – pružné, drahé), <b>množinově asociativní</b> (kompromis, např. 4-cestné)</li><li><b>Politika nahrazování</b>: LRU, FIFO, random; <b>zápis</b>: write-through vs write-back</li></ul>" }
);
