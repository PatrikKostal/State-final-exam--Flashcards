// 8. Sítě (PB156)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.net = { label: "🌐 Sítě", cls: "tag-net", order: 19 };

FC.cards.push(
  { t: "net",
    q: "Jaké jsou vrstvy modelu ISO/OSI a jejich funkce?",
    a: "<b>7 vrstev (odspodu):</b><ol><li><b>Fyzická</b> – přenos bitů, signály</li><li><b>Spojová (linková)</b> – rámce, MAC adresy, přístup k médiu</li><li><b>Síťová</b> – směrování, IP adresy</li><li><b>Transportní</b> – spojení end-to-end, porty (TCP/UDP)</li><li><b>Relační</b> – relace mezi aplikacemi</li><li><b>Prezentační</b> – formát/šifrování/kódování dat</li><li><b>Aplikační</b> – služby aplikací (HTTP, DNS)</li></ol>Každá vrstva komunikuje s odpovídající vrstvou protějšku a přidává/odebírá hlavičku (zapouzdření)." },

  { t: "net",
    q: "Jak se ISO/OSI porovnává s modelem TCP/IP?",
    a: "<b>TCP/IP má 4 (nebo 5) vrstev:</b><ul><li><b>Aplikační</b> (= aplikační+prezentační+relační OSI)</li><li><b>Transportní</b> (TCP, UDP)</li><li><b>Síťová / internetová</b> (IP)</li><li><b>Vrstva síťového rozhraní</b> (= spojová + fyzická)</li></ul>TCP/IP je <b>praktický</b> (popisuje reálný internet), OSI je <b>referenční/teoretický</b> model. Adresace: fyzická (MAC) na L2, IP na L3, port na L4." },

  { t: "net",
    q: "Co dělá fyzická vrstva a jak funguje Manchester kódování?",
    a: "<b>Přenáší jednotlivé bity jako fyzické signály</b> (napětí, světlo, rádio); řeší kódování, modulaci, média.<ul><li><b>Manchester kódování</b> – každý bit reprezentuje <b>přechod uprostřed intervalu</b>: 0 = přechod ↓, 1 = přechod ↑ (IEEE 802.3, nebo opačně dle konvence)</li><li>Výhoda: <b>samosynchronizace</b> (hodiny v signálu); nevýhoda: <b>dvojnásobná šířka pásma</b></li></ul>Příklad „010\": ↓ ↑ ↓ (tři přechody)." },

  { t: "net",
    q: "Co řeší spojová vrstva (MAC, řízení přístupu k médiu)?",
    a: "<b>Přenos rámců mezi sousedními uzly, adresace MAC adresami, řízení přístupu ke sdílenému médiu.</b><ul><li><b>CSMA/CD</b> (Ethernet) – naslouchej, vysílej, <b>detekuj kolize</b> a opakuj (drátové sítě)</li><li><b>CSMA/CA</b> (Wi-Fi) – <b>vyhýbání se kolizím</b> (kolize nelze spolehlivě detekovat v rádiu), potvrzování</li></ul>MAC adresa = 48bitový fyzický identifikátor síťové karty." },

  { t: "net",
    q: "Jaký je rozdíl mezi hubem, switchem a bridgem?",
    a: "<ul><li><b>Hub (rozbočovač)</b> – L1, hloupě <b>opakuje signál na všechny porty</b> (jedna kolizní doména)</li><li><b>Switch (přepínač)</b> – L2, <b>učí se MAC adresy</b> a posílá rámec jen na cílový port (oddělené kolizní domény)</li><li><b>Bridge (most)</b> – L2, spojuje dva segmenty sítě; switch je v podstatě vícePortový bridge</li></ul>" },

  { t: "net",
    q: "Co dělá síťová vrstva a jak funguje ARP?",
    a: "<ul><li><b>Síťová vrstva</b> – <b>směrování</b> paketů mezi sítěmi podle <b>IP adres</b>, protokol IP (best-effort, bez záruky doručení), směrovače (routery)</li><li><b>ARP (Address Resolution Protocol)</b> – zjišťuje <b>MAC adresu k dané IP</b> v lokální síti: uzel pošle broadcast „kdo má IP X?\", vlastník odpoví svou MAC adresou (uloží se do ARP cache)</li></ul>" },

  { t: "net",
    q: "Jaký je rozdíl mezi TCP a UDP?",
    a: "<ul><li><b>TCP</b> – <b>spojově orientovaný, spolehlivý</b>: navázání spojení (handshake), potvrzování, <b>řazení</b>, opakování ztracených segmentů, řízení toku a zahlcení. Pro web, e-mail, přenos souborů.</li><li><b>UDP</b> – <b>nespojový, nespolehlivý</b>: posílá datagramy bez záruky a pořadí, <b>nízká režie a latence</b>. Pro streaming, hry, DNS, VoIP.</li></ul>Oba používají <b>porty</b> k identifikaci aplikace." },

  { t: "net",
    q: "Jak funguje třícestný handshake (TCP)?",
    a: "<b>Navázání TCP spojení ve třech krocích:</b><ol><li>Klient → server: <b>SYN</b> (se sekvenčním číslem x)</li><li>Server → klient: <b>SYN-ACK</b> (svoje seq y, potvrzení x+1)</li><li>Klient → server: <b>ACK</b> (potvrzení y+1)</li></ol>Tím se obě strany <b>dohodnou na počátečních sekvenčních číslech</b> a synchronizují. Ukončení probíhá čtyřcestně (FIN/ACK)." },

  { t: "net",
    q: "Proč se používá přepínání paketů místo přepínání okruhů?",
    a: "<ul><li><b>Přepínání okruhů</b> – vyhradí se pevná cesta na celou dobu spojení (telefon). Garantuje pásmo, ale <b>plýtvá</b> při nečinnosti a špatně škáluje.</li><li><b>Přepínání paketů</b> – data rozdělena na <b>pakety</b> směrované nezávisle, sdílení linek (<b>statistické multiplexování</b>). Efektivnější využití, odolnost vůči výpadkům, ale proměnné zpoždění.</li></ul>" },

  { t: "net",
    q: "Co je gateway a co je multicast?",
    a: "<ul><li><b>Gateway (brána)</b> – propojuje sítě; na L3 router (mezi IP sítěmi), obecně i převod mezi protokoly na vyšších vrstvách</li><li><b>Multicast</b> – doručení jednoho paketu <b>skupině</b> příjemců najednou (na rozdíl od unicast 1:1 a broadcast všem). Šetří pásmo u streamů/IPTV.</li></ul>Topologie sítě: <b>hvězda (star)</b>, <b>sběrnice (bus)</b>, kruh, mesh." },

  { t: "net",
    q: "Jaké jsou klíčové parametry sítě?",
    a: "<ul><li><b>Bandwidth (šířka pásma)</b> – kapacita kanálu (Mbps, Gbps)</li><li><b>Packet loss</b> – % ztracených paketů</li><li><b>Zpoždění (latence)</b>; <b>RTT (Round-Trip-Time)</b> – tam i zpět</li><li><b>Jitter (rozptyl)</b> – variabilita zpoždění jednotlivých paketů</li></ul>" },

  { t: "net",
    q: "Jaký je rozdíl mezi virtuálním okruhem a datagramovým přístupem u paketových sítí?",
    a: "<ul><li><b>Virtuální okruh (connection-oriented)</b> – na začátku se ustaví cesta, všechny pakety relace jdou <b>stejnou trasou</b> (ATM, Frame Relay)</li><li><b>Datagramový přístup (connectionless)</b> – každý paket (datagram) směrován <b>nezávisle</b> (Internet)</li></ul>Liší se od <b>přepínání okruhů</b> (telefon), kde je vyhrazený fyzický kanál na celou dobu." },

  { t: "net",
    q: "Jaké jsou metody kódování signálu na fyzické vrstvě?",
    a: "<ul><li><b>NRZ-L</b> – úroveň určuje bit; <b>NRZ-I</b> – 1 = změna polarity, 0 = beze změny (odolnější)</li><li><b>Manchester</b> – každý bit = přechod uprostřed (samosynchronizace, ale dvojnásobné pásmo)</li><li><b>4B/5B</b> – 4 bity → 5bitový vzor (nejvýše 3 nuly po sobě, synchronizace, detekce chyb)</li></ul>" },

  { t: "net",
    q: "Jaké jsou typy multiplexingu?",
    a: "<ul><li><b>FDM (frekvenční)</b> – analogová, každý signál na vlastní frekvenci (rádio); <b>OFDM</b> u WiFi (kanály)</li><li><b>WDM (vlnová)</b> – varianta FDM pro <b>optické kabely</b> (barvy světla)</li><li><b>TDM (časová)</b> – digitální, v daný okamžik vysílá jeden (Ethernet), nutná synchronizace</li></ul>" },

  { t: "net",
    q: "Co obsahuje ethernetový rámec a jak řeší chyby?",
    a: "<b>Preambule | cílová MAC | zdrojová MAC | typ | data | CRC</b><ul><li><b>MAC adresa</b> – jednoznačný identifikátor (lze měnit kvůli anonymizaci)</li><li><b>CRC</b> – kontrolní součet pro detekci chyb</li></ul>Chybové řízení: detekce (parita, CRC) + retransmise (ARQ), nebo <b>FEC</b> (oprava přes redundanci, Hammingův kód)." },

  { t: "net",
    q: "Jaký je rozdíl mezi Aloha, CSMA/CD a CSMA/CA?",
    a: "<ul><li><b>Aloha</b> – vysílá pořád, při kolizi náhodné čekání (neefektivní)</li><li><b>CSMA/CD</b> – naslouchá, vysílá, <b>detekuje kolize</b> a posílá jam signál → <b>drátový Ethernet</b></li><li><b>CSMA/CA</b> – <b>vyhýbá se kolizím</b> (vysílá jen když je ticho), kolize nedetekuje za běhu → <b>WiFi</b></li></ul>CHYTÁK: CD = drát, CA = bezdrát (ne naopak)." },

  { t: "net",
    q: "Jaký je rozdíl mezi bridgem a switchem a co je backward learning?",
    a: "<ul><li><b>Bridge</b> – L2, rozhoduje <b>softwarově</b> (pomalejší), málo portů</li><li><b>Switch</b> – L2, rozhoduje <b>hardwarově (ASIC)</b>, wire-speed, mnoho portů; switch ≈ víceportový bridge</li></ul>Oba <b>dělí kolizní doménu</b> (každý port = vlastní), učí se MAC přes <b>backward learning</b> (poslouchají provoz). Cykly řeší <b>Spanning Tree (STP)</b> – minimální kostra, blokuje nadbytečné porty." },

  { t: "net",
    q: "Jaká zařízení propojují sítě na jednotlivých vrstvách?",
    a: "<ul><li><b>L1 – Repeater/Hub</b> (opakuje signál, jedna kolizní doména)</li><li><b>L2 – Bridge/Switch</b> (MAC adresy)</li><li><b>L3 – Router</b> (IP adresy, směrování)</li><li><b>L7 – Gateway</b> (převod protokolů)</li></ul>" },

  { t: "net",
    q: "Jaký je rozdíl mezi IPv4 a IPv6?",
    a: "<ul><li><b>IPv4</b> – <b>32bitové</b> adresy (dekadicky), TTL, fragmentace na cestě, adresy vyčerpány</li><li><b>IPv6</b> – <b>128bitové</b> (hexadecimálně), jednodušší hlavička, <b>IPsec zabudovaný</b>, anycast, žádný broadcast (nahrazen multicastem)</li></ul>IP je <b>best-effort</b> (nespojovaná, nepotvrzovaná) host-to-host služba. Přechod: dvojí zásobník, tunelování, translátory." },

  { t: "net",
    q: "K čemu slouží ARP, ICMP a DHCP?",
    a: "<ul><li><b>ARP</b> – překlad IP → MAC v LAN (broadcast „kdo má IP X?\")</li><li><b>ICMP</b> – chybové a stavové zprávy (ping = Echo Request/Reply); ICMPv6 + NDP nahrazuje ARP</li><li><b>DHCP</b> – dynamické přidělení IP adres zařízením</li></ul>" },

  { t: "net",
    q: "Co je MTU a jak se řeší fragmentace v IPv4 vs IPv6?",
    a: "<b>MTU (Maximum Transmission Unit)</b> – maximální velikost paketu na dané L2 lince.<ul><li><b>IPv4</b> – uzel/router může paket <b>fragmentovat</b> (transportní hlavičku nese jen první fragment)</li><li><b>IPv6</b> – routery <b>nefragmentují</b>; pošlou ICMP „Packet too big\" → zdroj zmenší (<b>Path MTU discovery</b>)</li></ul>" },

  { t: "net",
    q: "Co je classful adresování, CIDR, subnetting a NAT?",
    a: "<ul><li><b>Classful</b> – třídy A/B/C/D(multicast)/E podle úvodních bitů; plýtvavé</li><li><b>CIDR (classless)</b> – beztřídní adresace s maskou /n, jemnější dělení, agregace</li><li><b>Subnetting</b> – dělení rozsahu na podsítě; <b>supernetting</b> – slučování</li><li><b>NAT/PAT</b> – skrývá privátní sítě za jednu veřejnou IP (mapuje IP:port v překladové tabulce)</li></ul>" },

  { t: "net",
    q: "Jaký je rozdíl mezi unicast, broadcast, multicast a anycast?",
    a: "<ul><li><b>Unicast</b> – 1:1, jedno rozhraní</li><li><b>Broadcast</b> – všem na LAN (192.168.x.255); jen IPv4</li><li><b>Multicast</b> – skupině zájemců (IPv4 třída D, IPv6 ff00::/8)</li><li><b>Anycast</b> – jedna IP sdílená více uzly, doručí se <b>topologicky nejbližšímu</b> (např. 8.8.8.8)</li></ul>" },

  { t: "net",
    q: "Jak se dělí směrovací algoritmy (Distance Vector vs Link State)?",
    a: "<ul><li><b>Distance Vector (Bellman-Ford)</b> – sousedé si vyměňují <b>celé tabulky</b>, počítají počet hopů</li><li><b>Link State (Dijkstra)</b> – sousedé si multicastem posílají info o linkách, počítají nejkratší cestu (<b>OSPF</b>)</li><li><b>Path Vector</b> – udržuje celé cesty, rozhoduje podle politik (<b>BGP</b>, mezidoménové)</li></ul>Statické vs dynamické směrování; směrování = celková činnost, forwarding = akce jednoho routeru." },

  { t: "net",
    q: "Jak se rozdělují porty a co je ARQ?",
    a: "<b>Porty (0–65535):</b> well-known (0–1023, IANA), registrované (1024–49151), dynamické (49152–65535). IP+port = socket.<br><b>ARQ (Automatic Repeat reQuest)</b> – potvrzování (ACK):<ul><li><b>Stop-and-Wait</b> – po každém paketu čeká na ACK</li><li><b>Go-Back-N</b> – posílá průběžně, při ztrátě se vrátí k checkpointu</li><li><b>Selective-Repeat</b> – bufferuje out-of-order pakety</li></ul>" },

  { t: "net",
    q: "Jak probíhá TCP handshake a ukončení spojení?",
    a: "<b>Navázání (3-way handshake):</b><ul><li>SYN (klient, seq x) → SYN-ACK (server, seq y, ack x+1) → ACK (ack y+1)</li></ul><b>Ukončení (4-way):</b> FIN → ACK → FIN-ACK → ACK (obě strany ukončí své vysílání zvlášť).<br>TCP čísluje <b>bajty</b>, shlukuje do <b>segmentů</b>; ack number = číslo příštího očekávaného bajtu." },

  { t: "net",
    q: "Jaký je rozdíl mezi řízením toku a řízením zahlcení v TCP?",
    a: "<ul><li><b>Řízení toku (flow control)</b> – chrání <b>příjemce</b>; sleduje volný buffer příjemce (<b>rwnd – receive window</b>)</li><li><b>Řízení zahlcení (congestion control)</b> – chrání <b>síť</b>; odhaduje propustnost oknem <b>cwnd</b>, při ztrátě paketů zpomalí (<b>AIMD</b>)</li></ul>Odesílatel se řídí <b>menším</b> z oken (rwnd/cwnd). UDP neřídí nic." },

  { t: "net",
    q: "Jaké jsou komunikační modely (client-server, P2P, pull, push)?",
    a: "<ul><li><b>Client-server</b> – klient iniciuje (request-response), centralizace (WWW, FTP, DNS)</li><li><b>Peer-to-peer</b> – rovnocenné uzly sdílí zdroje, decentralizace (BitTorrent)</li><li><b>Pull model</b> – přenos iniciuje klient (prohlížeč)</li><li><b>Push model</b> – server posílá sám (IPTV streaming)</li></ul>" },

  { t: "net",
    q: "Co dělají relační, prezentační a aplikační vrstva?",
    a: "<ul><li><b>L5 relační</b> – relace (může zahrnovat víc L4 spojení), checkpointy; <b>simplex/poloduplex/duplex</b></li><li><b>L6 prezentační</b> – kódování (ASCII/UTF-8), komprese (ZIP), šifrování (TLS)</li><li><b>L7 aplikační</b> – síťové protokoly (HTTP, SMTP, DNS)</li></ul>" }
);
