# 8. Sítě

> **Zadání:** Modely vrstev počítačových sítí (ISO/OSI, TCP/IP): funkcionalita a součinnost vrstev, adresace. Fyzická vrstva, signály a jejich kódování, řízení přístupu k médiu. Propojování počítačových sítí. Síťové protokoly, přepínání a směrování, multicast. Zajištěný přenos dat, sestavení a ukončení spojení. Transportní protokoly. (PB156)

# Základy sítí

**Síť** je skupina zařízení propojených komunikačními kanály. Sdílí hardwarové zdroje, data, software...

**Vlastnosti sítě:**
- **Delivery** → schopnost doručení
- **Accuracy** → správnost doručení
- **Timeliness** → včasnost doručení

**Požadavky:** efektivita, spolehlivost, decentralizace, řízení toku dat...

**Komponenty sítě:**
![[komponenty-site.png|373]]

**Parametry sítě:**
- **Bandwidth** (šířka pásma) — udává kapacitu přenosového kanálu v Mbps, Gbps
- **Packet loss** — průměrný počet ztracených paketů za určité období v %
- **Zpoždění** — čas od odeslání do přijetí
  - **RTT** (Round-Trip-Time) — zpoždění měří cestu tam i zpět
- **Rozptyl** (**jitter**) — variabilita ve zpožděních jednotlivých paketů; statistická veličina

> **Síťový protokol** definuje formát a pořadí zpráv vyměňovaných mezi dvěma či více komunikujícími entitami, stejně jako akce vykonané při odeslání/příjmu daných zpráv.

# Propojování počítačových sítí

## Přepínání okruhů (Circuit Switching) – spojovaná síť

Vytváří se komunikační kanál, přes který putují všechna data. Po ukončení okruhu se ukončuje i přenos. Před začátkem přenosu je stanoveno spojení, které je udržováno během celé komunikace. Informace o spojení jsou udržovány v síti – musí uchovávat stav.

Okruh může být pevný nebo vytvářen na žádost. Jednoduchá implementace kvality služby. Např.: analogové telefonní sítě — vrstva L1.

## Přepínání paketů (Packet Switching) – nespojovaná síť

Zasílání nezávislých datových jednotek (paketů).

- **Virtuální kanály** (Virtual Circuits Approach):
  - na začátku přenosu ustavena cesta (implementováno na L2/L3)
  - všechny pakety jedné relace putují po stejné trase
  - využito ve WAN, Frame Relay, ATM
  - spojovaná (connection-oriented) služba

![[spojovane-site.png|417]]

- **Datagramový přístup** (Datagram Approach):
  - každý paket obsluhován zcela nezávisle na ostatních
  - nespojovaná (connectionless) služba, pakety se zde nazývají **datagramy**
  - např. Internet

![[nespojovane-site.png|439]]

# Síťové modely

Síťové modely popisují procesy v komunikačních systémech.

## ISO/OSI a TCP/IP model

**ISO/OSI** model má 7 vrstev a zajišťuje kompatibilitu komunikačních systémů napříč výrobci. Autorem je organizace ISO. Každá vrstva je zodpovědná za nějakou funkcionalitu a komunikuje pouze se sousedními vrstvami (jde o abstrakci; vrstvy nemusí korespondovat s implementací).

| Vrstva | Název              | Popis                                                                                     |
| ------ | ------------------ | ----------------------------------------------------------------------------------------- |
| L7     | **Aplikační**      | Rozhraní mezi uživatelem a aplikacemi; síťové aplikace a protokoly (HTTP, FTP, DNS…)      |
| L6     | **Prezentační**    | Jednotná prezentace dat na obou stranách; kódování, šifrování, komprese                   |
| L5     | **Relační**        | Správa spojení mezi komunikujícími aplikacemi; checkpointy, relace, dialog                |
| L4     | **Transportní**    | Adresace a doručení dat komunikačního procesu; process-to-process delivery, spolehlivost  |
| L3     | **Síťová**         | Adresace a doručení paketů mezi uzly; hledá nejkratší cestu, směrování                    |
| L2     | **Datového spoje** | Přenos dat (rámců) mezi dvěma uzly přes sdílené médium; MAC adresace, hop-to-hop delivery |
| L1     | **Fyzická**        | Přenos bitů přenosovým médiem; kódování signálů, bit synchronization                      |

**TCP/IP model** je reakcí na příliš granulovaný ISO/OSI model. Slučuje L5–L7 do **Aplikační vrstvy** a L1–L2 do **Vrstvy přístupu k síti/médiu**.

![[isoosi-tcpip.png|458]]

**TCP/IP:**
![[tcp-ip.png|458]]

# L1 Fyzická vrstva

Přenáší bity skrze sdílené přenosové médium $\Rightarrow$ kóduje do signálu (point-to-point delivery).

**Signál** je časová funkce reprezentující změny fyzikálních vlastností.

- **Analogový signál** je spojitý. Dokáže přenášet binární data **modulací** (střídá frekvenci, amplitudu, fázi). Analogová vysílání mohou probíhat současně na různých frekvencích.
- **Digitální signál** rozlišuje pouze 1 a 0. Vyžaduje transformaci kódování. Přenáší také digitalizovaný analogový obsah. Přenosové médium je **sdílené** $\Rightarrow$ pomyslnou výhybku tvoří L2 vrstva.

## Kódování

- **Přímé kódování:** amplituda = 1, nic = 0
- **NRZ-L** $\Rightarrow$ 1 = záporná, 0 = kladná amplituda
- **NRZ-I** $\Rightarrow$ 1 = změna polarizace amplitudy, 0 = beze změny; odolnější vůči synchronizačním chybám
- **Manchester** $\Rightarrow$ každý bit kódují 2 prvky signálu (samosynchronizovatelné). Každý bit zahrnuje změnu signálu — pokud nedojde ke změně, víme, že tam byla chyba.
![[manchester.png|366]]
- **4B/5B** $\Rightarrow$ uměle zavedená redundance za účelem synchronizace.
  - 4-bitové bloky jsou nahrazeny 5-bitovými vzory dle tabulky
  - Neplatné vzory indikují chybu
  - Nejvýše 3 nuly po sobě $\Rightarrow$ vyhýbá se velkému počtu nul po sobě (předchází situacím, kdy nevíme, zda jde o vysílání nebo „no signal")

**Samoopravný kód** umí většinu chyb opravit, některé detekovat, některé nezjistit.

## Multiplexing

**Multiplexing** je technika sdílení přenosové soustavy více souběžnými komunikacemi.

- **Frequency-Division Multiplexing** (FDM) $\Rightarrow$ analogová metoda. Každý přenášený signál je modulován s vlastní unikátní frekvencí, proto mohou všechna rádia vysílat současně.
  - **WiFi** používá **OFDM** = Ortogonální FDM, **dělí prostor na kanály**
- **Wave-Division Multiplexing** (WDM) $\Rightarrow$ analogová metoda. Varianta FDM pro **optické kabely**. Každý kanál reprezentuje barva světla (dle vlnové délky).
- **Time-Division Multiplexing** (TDM) $\Rightarrow$ digitální metoda. V libovolném okamžiku kanál využívá pouze jeden vysílající $\Rightarrow$ nutnost synchronizace. Např. **fyzické ethernet kabely**.

# L2 Vrstva datového spoje (Data Link Layer)

Přijímá pakety od L1 a transformuje je do **rámců**. Opravuje chyby. Řídí **node-to-node delivery** (lokální LAN síť). Mezi uzly je vytvořeno spojení (okruh), které je udržováno během celé doby komunikace.

Tvoří rámce, fyzické adresování a řízení toku a chyb.

**Ethernetový rámec:**

```
┌───────────┬───────────┬──────────┬──────┬───────────────┬─────┐
│ preambule │  cílová   │ zdrojová │  typ │     data      │ CRC │
│           │  adresa   │  adresa  │      │               │     │
└───────────┴───────────┴──────────┴──────┴───────────────┴─────┘
```

- **preambule**: identifikace rámce
- Cílová a zdrojová adresa (**MAC adresa** — jednoznačný identifikátor)
  - MAC adresu jde měnit (třeba přes appku na mobilu). Některá zařízení generují pro každé připojení novou MAC adresu $\Rightarrow$ snaha o anonymizaci. Např.: `00–11–09–95–26–FE`
- **CRC** je kontrolní součet (detekce chyb)

Vrstva eliminuje kolize při násobném připojení k WiFi apod.

## Chybové řízení

- **Error Detection, Automatic Request for Retransmission**
  - Sudá/lichá parita, **CRC** (Cyclic Redundancy Check)
- **Forward Error Correction** (FEC) $\Rightarrow$ detekce a oprava s využitím redundance dat
  - Např. **Hammingův kód** (samoopravný kód)

Přístup ke sdílenému přenosovému médiu se řídí přes MAC adresy $\Rightarrow$ **eliminuje kolize**.

## Protokoly neřízeného přístupu k médiu

- **Aloha** $\Rightarrow$ všichni vysílají pořád. Při kolizi stanice počká náhodnou dobu a zkusí to znovu (neefektivní).
- **CSMA/CD** $\Rightarrow$ před vysíláním zkontroluje dostupnost média.
  - Při vysílání aktivně detekuje kolize $\Rightarrow$ může k ní dojít jen pokud začnou vysílat současně
  - Při kolizi zastaví a čeká náhodnou dobu než začne znovu vysílat
  - V reakci na kolizi vyšle jam signál, aby ji oznámil ostatním (**Ethernet**)
- **CSMA/CA** $\Rightarrow$ stanice se pokusí vysílat, jen když nikdo nevysílá. Pokud někdo vysílá, čeká náhodnou dobu (**WiFi**)
  - Není efektivní, protože během vysílání nedetekuje kolizi — zbytečně tak odvysílá všechna data a až zpětně si všimne, že cíl přijal chybu $\Rightarrow$ musí to zkusit znovu

![[csma.png|589]]

## Protokoly řízeného přístupu k médiu

**Způsoby:** získávání práv, rezervace, vyzývání k vysílání nebo předávání práva k vysílání.

## Topologie sítí na L2

**Topologie sítí** je fyzické uspořádání stanic. Rozsáhlejší sítě se tvoří spojením menších topologií (LAN sítí).

**Bridge** i **switch** jsou L2 zařízení, která propojují části sítě a přeposílají rámce podle MAC adres (pomocí backward learningu). Obě **rozdělují kolizní doménu** — každý port tvoří samostatnou kolizní doménu, takže kolize se mezi porty nešíří. (Broadcast doménu nedělí ani jedno — to až router/VLAN.)

- **Bridge** je starší koncept. O přeposílání rámců rozhoduje **softwarově**, je proto pomalejší. Typicky má málo portů, ale může jich mít i více.
- **Switch** dělá totéž **hardwarově** (pomocí ASIC), takže pracuje řádově rychleji (wire-speed) a mívá mnoho portů. Při jednom zařízení na port má **každé zařízení vlastní kolizní doménu** → kolize prakticky zanikají a lze přejít na plně duplexní provoz.

Zjednodušeně se proto switch popisuje jako „víceportový bridge", ale hlavní rozdíl je v hardwarové vs. softwarové realizaci a výkonu.

**Backward Learning Algorithm** $\Rightarrow$ Bridge se naučí umístění stanic dle MAC adres, aby správně směroval rámce. Poslouchá komunikaci a učí se umístění zařízení.

V síti lze tvořit cykly. **Spanning Tree Algorithm** pak spočítá minimální kostru, aby se jim vyhnul (běží na bridzích i switchích).
- Implementace po vzoru **Primova/Dijkstrova** algoritmu (každé zařízení počítá nejkratší cestu ke kořeni)
1. Každý bridge/switch posílá periodicky zprávy **(BPDU v rámci STP)**
2. Podle zpráv od sousedů upravuje definici nejbližší cesty (preferuje nižší adresu, tzv. Bridge ID)
3. Nejkratší cesty definují aktivní porty zařízení. Ostatní porty **zablokuje** (tzv. Blocking state)

**Kolizní doména** je komunikační prostor, kde když začne vysílat více zařízení, signál je znehodnocen.

### Sběrnicová topologie
- CSMA/CD protokol, náchylná k defektům
- **Kolizní doména** $\Rightarrow$ všechny stanice

![[sbernicova-topologie.png|367]]

### Kruhová topologie
- Zprávy putují v jednom směru, právo k vysílání se předává (pešek), riziko defektů
- **Kolizní doména** $\Rightarrow$ všechny stanice

![[kruhova-topologie.png|294]]

### Hvězdicová topologie
- Centrální propojovací hub/bridge/switch
- Na hubu závisí kolizní doména:
  - **L1 hub** $\Rightarrow$ všechny stanice
  - **bridge/switch** $\Rightarrow$ pouze 2 sousedící stanice

![[hvezdicova-topologie.png|233]]

## Propojování (Internetworking)

Propojuje jednotlivé sítě pro vznik internetu. Zpřístupňuje vzdálené servery, zvyšuje dosah.

- L1 = Repeater, L2 = bridge/switch, L3 = Router, L7 = Gateway

![[internetworking.png|251]]

# L3 Síťová vrstva

- **Poskytuje služby pro L4.** Požaduje jednoznačnou identifikaci každého zařízení.
- Logicky spojuje samostatné LAN sítě. Poskytuje uniformní prostředí **WAN** (Wide Area Network).
- **Základní služba je nespojovaná a nepotvrzovaná** (na této vrstvě se nevytváří permanentní komunikační tunely a nezpracovávají potvrzení; tyto vlastnosti simuluje až transportní vrstva).
- Zajišťuje hledání optimální cesty pro pakety.
- Zařízení: **Router**
- Překlad adres z L2 řeší **ARP** (Address Resolution Protocol) $\Rightarrow$ ARP request pakety zasílané do celé LAN

## IP protokol

**IP protokol** je nejrozšířenější protokol síťové vrstvy.

- Zodpovědný za dopravu dat (datagramů) napříč uzly $\Rightarrow$ **host-to-host** delivery
- **Přepínání paketů** je metoda pro rozdělení dat na malé části, které mohou cestovat sítí $\Rightarrow$ dělí se na pakety/**datagramy**
  - Každý uzel přepošle datagram na nějaký bližší uzel
  - **Datagram** je paket v nespojovaných a nepotvrzovaných službách
- Tzv. best-effort služba (nespolehlivá). Doplněn protokoly ICMP, ARP, RARP, IGMP…

**IPv4** — 32bitové adresy, **TTL** (Time to Live — max hopy před terminací)
- **DS** $\Rightarrow$ třída v rámci QoS
- **Fragmentuje** zdrojový uzel/směrovač, **Skládá** cílový uzel

**IPv6** — 128bitové adresy, výhody: větší adresní prostor, jednodušší hlavička, real-time přenos, podpora šifrování
- **Podporuje zabezpečené přenosy** $\Rightarrow$ integrace IPsec přímo v IPv6

**IPv4 a IPv6 datagramy:**

![[ip-datagramy.png|663]]

**IPsec** je sada protokolů pro zabezpečení IP komunikace — řeší autentizaci, integritu a šifrování.

Přechod mezi IPv4 a IPv6 je pozvolný. Řeší se:
- **Dvojím zásobníkem** pro dvojí podporu
- **Tunelováním**, kdy se IPv6 datagram zabalí do IPv4 datagramu
- **Translátory**, kdy se přeloží IPv6 datagram do IPv4 datagramu

## Fragmentace paketů — MTU

**MTU** (Maximum Transmission Unit) $\Rightarrow$ maximální velikost dat. MTU určují možnosti příjemce a vlastnosti L2 sítě. Pokud je paket příliš velký:
- **IPv4** — každý uzel ho může fragmentovat do menších paketů s novou hlavičkou, pokud narazí na příliš úzké spojení
- **IPv6** generuje ICMP zprávu „Packet too big". Je zahozen.
  - Uzel pošle zpět **Path MTU discovery** zprávu — zdroj zmenší velikost a zkusí celou cestou projít znovu

## DHCP

**DHCP** $\Rightarrow$ přiřazuje dynamické IP adresy zařízením.

## Překlad adres (Address Resolution)

Překládá IP adresy na fyzické adresy z L2.
- **IPv4** (32 bit, dekadicky), **IPv6** (128 bit, hexadecimálně)

## IPv4 adresy

- **Unicast** $\Rightarrow$ identifikace 1 síťového rozhraní $\Rightarrow$ `192.168.8.2`
- **Broadcast** $\Rightarrow$ posílání dat všem možným příjemcům na LAN
  - Zjišťování zařízení na síti $\Rightarrow$ `192.168.8.255`
- **Multicast** $\Rightarrow$ zasílá data všem příjemcům, kteří projeví zájem
  - Online konference, streamování

## IPv6 adresy

- **Unicast** $\Rightarrow$ identifikace 1 síťového rozhraní
- **Multicast** $\Rightarrow$ zasílá data všem příjemcům, kteří projeví zájem
- **Anycast** $\Rightarrow$ jednu IP adresu sdílí více zařízení; síť paket doručí vždy pouze **jednomu** z nich – tomu topologicky **nejblíže** (např. DNS Googlu 8.8.8.8)
- Broadcast není — nahrazen multicast skupinou all-hosts

## ICMP

**ICMP** (Internet Control Message Protocol) poskytuje informace o chybách v přenosu paketů IP protokolem a stavu sítě.
- Do IP datagramu je zabalena ICMP zpráva (např. `ping` využívá *Echo Request/Reply*)
- **ICMPv6** pro IPv6 (navíc zcela nahrazuje protokol ARP pro zjišťování MAC adres – tzv. NDP)

# Přidělování adres

IPv4 adresy již byly spotřebovány. **Localhost**: `127.0.0.1`

## Classful Addressing

Zcela první metoda přidělování adres. Adresní prostor rozdělen do 5 tříd:
- **třída A:** (začíná bitem `0`) $2^7$ sítí, každá z nich $2^{24}$ uzlů
- **třída B:** (začíná bity `10`) $2^{14}$ sítí, každá z nich $2^{16}$ uzlů
- **třída C:** (začíná bity `110`) $2^{21}$ sítí, každá z nich $2^8$ uzlů
- **třída D:** (začíná bity `1110`) multicastové adresy
- **třída E:** (začíná bity `1111`) rezervovaný prostor

| Třída | 1. oktet (rozsah) | Binární tvar masky                      | Desítkový tvar | Prefix |
| ----- | ----------------- | --------------------------------------- | -------------- | ------ |
| A     | 1 – 126           | `11111111` `00000000 00000000 00000000` | 255.0.0.0      | /8     |
| B     | 128 – 191         | `11111111 11111111` `00000000 00000000` | 255.255.0.0    | /16    |
| C     | 192 – 223         | `11111111 11111111 11111111` `00000000` | 255.255.255.0  | /24    |
| D     | 224 – 239         |                                         |                |        |

*(Pozn.: V binárním zápisu masky sítě představují jedničky (`1`) část adresy určující síť – **Net ID**, a nuly (`0`) část adresy určující konkrétní zařízení – **Host ID**).*

**Problémy:** plýtvání rozsahem — nadměrné množství směrovacích tabulek.

- Nedostatek IPv4 adres se řeší **subnetting** (dílčí dělení přiděleného rozsahu)
- **Subnetting** vytváří tříúrovňovou hierarchii (adresa sítě, podsítě a uzlu)
- **Supernetting** místo dělení spojuje sousední IP adresy

## Classless Addressing

**CIDR** (Classless Inter-Domain Routing) $\Rightarrow$ popisuje pravidla IP adres, významu masek, supernetting a subnetting. Nahrazuje třídy a přiděluje adresy po CIDR blocích.
- $\Rightarrow$ Adresy závisí na poskytovateli
- IPv6 přímo podporuje classless CIDR
- Cílem bylo umožnit jemnější dělení na podsítě pomocí masek s daným počtem bitů
  - Mělo to snížit rychlost vyčerpávání

**Příklady moderních beztřídních (CIDR) masek:**

| CIDR zápis | Binární tvar masky                    | Desítkový tvar  |
| ---------- | ------------------------------------- | --------------- |
| `/13`      | `11111111 11111000 00000000 00000000` | 255.248.0.0     |
| `/25`      | `11111111 11111111 11111111 10000000` | 255.255.255.128 |

## NAT

**NAT** (Network Address Translation) $\Rightarrow$ mechanismus pro snížení tempa vyčerpávání adresního prostoru pro uživatele. Skrývá vnitřní sítě za externí adresy. Umožňuje připojit víc počítačů pod jednu veřejnou IP adresu.

- Sdílení jedné veřejné IP řeší **porty** (tzv. **PAT** / **NAPT** — Port Address Translation): router každému odchozímu spojení přiřadí jiný zdrojový port a v **překladové tabulce** si pamatuje dvojici `(vnitřní IP:port ↔ veřejná IP:port)`.
- Podle této tabulky pak směruje odpovědi zpět ke správnému počítači ve vnitřní síti.

Vnitřní (privátní) adresní rozsahy, které NAT typicky skrývá:

| Range | Total |
|-------|-------|
| `10.0.0.0` — `10.255.255.255` | $2^{24}$ |
| `172.16.0.0` — `172.31.255.255` | $2^{20}$ |
| `192.168.0.0` — `192.168.255.255` | $2^{16}$ |

# Směrování (routing)

**Směrování** je proces hledání optimální cesty mezi dvěma uzly.
- Jednotlivé **linky** (cesty) jsou ohodnocené dle vytížení, rychlosti, zpoždění…
- Každý uzel předává paket sousednímu uzlu, který je nejblíže cíli $\Rightarrow$ **hop**
- **Směrování** je souhrnná činnost směrovačů, **Forwarding** je akce jednoho směrovače

**Směrovací tabulka** (routing table) udržuje záznamy o cestách v síti. Rozhoduje dle IP prefixů. Je lokální $\Rightarrow$ každý směrovač (router) má svou.
- Udržuje si v ní globální data $\Rightarrow$ nejlepší cesty k síťovým prefixům v celé síti

![[smerovaci-tabulka.png|427]]

Směrování může být:
- **Statické** $\Rightarrow$ ručně vytvořené záznamy, vhodné jen pro statické topologie
- **Dynamické** $\Rightarrow$ složité algoritmy reagují na změny v síti
  - **BGP** (Border Gateway Protocol) $\Rightarrow$ dynamický směrovací protokol. Podporuje komplexní topologie, směrovače si vyměňují popis celých cest včetně skoků, používá CIDR pro agregaci cest, směruje podle politik.

**Mezidoménové směrování** $\Rightarrow$ využívá Path Vector směrovací protokoly, které vznikly úpravou Distance Vector směrovacích protokolů a podporují rozhodování podle politik.
- *path vector* = udržuje informaci o cestě, která se dynamicky aktualizuje
- *distance vector* = najde nejlepší cestu pro pakety na základě vzdálenosti (počet routerů po cestě)

## Dynamické směrování

- **Centralizované** $\Rightarrow$ **RCC** (Routing Control Center) sbírá info od směrovačů, počítá optimální cesty a distribuuje tabulky. Hůře škáluje.
- **Izolované** $\Rightarrow$ vše si řeší směrovače samy (náhodně, všem, nebo **Backward Learning algoritmem**)
- **Distribuované** $\Rightarrow$ sousedé spolu komunikují, periodicky upravují tabulky

## Směrovací algoritmy

- **Distance Vector** (Bellman-Ford) — sousední směrovače si musí vyměňovat kompletní kopie svých tabulek a počítají počet potřebných hopů
- **Link State** (Dijkstra) — sousední směrovače používají multicast, aby si posílali informace o na sebe připojených linkách. Nejkratší cestu pak počítají Dijkstrou.
  - Protokol **OSPF** (Open Shortest Path First)

## Multicast

**Multicast** $\Rightarrow$ zasílání dat všem koncovým stanicím (streamer and receivers). Multicast identifikuje skupiny příjemců na základě adres vyňatých z klasického routování.

**Multicastová IP adresa:**
- IPv4: třída D (`224.0.0.0` – `239.255.255.255`)
- IPv6: prefix `ff00::/8`

- Rozsah omezuje **TTL**, škálování je neomezené, snadný terč DDoS
- **Source Based Tree** přístup $\Rightarrow$ periodický broadcast, zaplavuje LAN sítě
- **Shared Tree** $\Rightarrow$ ustanovuje Meeting pointy. Zájemci kontaktují MP. Méně zatěžuje síť

**Multicastové protokoly:**
- Source-Based Tree: DVMRP, MOSPF, PIM-DM (PIM Dense Mode)
- Group-Shared Tree: CBT, PIM-SM (PIM Sparse Mode)

![[multicast-protokoly.png|447]]

# L4 Transportní vrstva

- Poskytuje služby L5 vrstvě. Přijímá data a předává je aplikaci.
- Poskytuje spolehlivé komunikační protokoly $\Rightarrow$ zajišťují doručení dat bez chyb; řídí tok, zahlcení, mohou opravovat chyby, CRC…
- Nejnižší **end-to-end** služby
- Umí tvořit pakety, řídit spojení, adresovat, QoS

![[l4.png|389]]

L4 adresuje na základě IP adresy a portů (0–65535). Porty se dělí do 3 tříd:
- **Well-known** (0–1023), přidělované organizací IANA
- **Registrované** (1024–49151), volně přiřaditelné, lze zaregistrovat
- **Dynamické** (49152–65535), dynamicky přiřazené

## ARQ

**ARQ** (Automatic Repeat reQuest) je mechanismus pro zajištění spolehlivosti. Posílání potvrzení o doručení. **Pozitivní ACK** $\Rightarrow$ paket došel, **Negativní ACK** $\Rightarrow$ paket nedošel.

- **Stop-and-Wait** $\Rightarrow$ jednoduchý, neefektivní — po každém paketu se čeká na ACK, po timeoutu se paket považuje za ztracený
- **Go-Back-N ARQ** $\Rightarrow$ posílá pakety neustále, periodicky se vrací ACK s číslem nejnověji přijatého paketu. Pakety, které dorazí mimo pořadí, se zahazují.
  - Pokud se paket ztratí, příjemce odešle ACK posledního validního paketu a odesílatel se k tomuto „checkpointu" vrátí.
![[go-back-n-arq.png|354]]
- **Selective-Repeat ARQ** $\Rightarrow$ out-of-order pakety se bufferují
- **Piggybacking** — technika, kdy se ACK připojí „na záda" zpět směřujícímu paketu při obousměrné komunikaci

## UDP

**UDP** (User Datagram Protocol) je transportní protokol poskytující nespojovanou službu.
- Jednoduchý, rychlý, minimální režie, best-effort
- **Neověřuje doručení.** Datagramy jsou nečíslované. Vhodný pro real-time, multicasty, DNS, TFTP.
- Používá se pro přenos multimediálních dat — streamy, videohovory, DNS dotazy

![[udp.png|347]]

## TCP

**TCP** (Transmission Control Protocol) poskytuje spojovanou a spolehlivou službu.
- Ustanovuje spojení (tzv. **handshake**) mezi startem a cílem. Zbytek směrovačů o něm neví.
- Pouze **point-to-point** komunikace, **duplexní**, end-to-end
- Čísluje bajty (od náhodného začátku) a shlukuje je do **segmentů**, které cíl musí agregovat a skládat
- Spolehlivost na úkor rychlosti a latence, implementuje **Go-Back-N ARQ / Selective-Repeat ARQ**

**Hlavička TCP:**
![[tcp.png|429]]

Popis polí:
- **řídící data (control)** — 6 bitů identifikujících nejrůznější řídící informace
  - URG: Urgent pointer is valid, ACK: Acknowledgement is valid, PSH: Request for push
  - RST: Reset the connection, SYN: Synchronize sequence numbers, FIN: Terminate the connection
- **velikost okna (window size)** — velikost okna, které musí komunikující strana spravovat (určeno pro účely řízení toku)
- **kontrolní součet (checksum)** — kontrolní součet TCP segmentu (hlavička + data)
- **urgentní data (urgent pointer)** — zasílání dat mimo pořadí
- **volby (options)**

**Acknowledgement number** je číslo **příštího očekávaného** bajtu (tj. o 1 vyšší než poslední správně přijatý bajt). Pokud se ztratí paket nebo potvrzení, po timeoutu pokračuje odesílatel od posledního ACK.

### TCP Handshake

- **SYN** — odesílatel posílá iniciální sekvenční číslo
- **SYN-ACK** $\Rightarrow$ příjemce potvrzuje přijetí sekvenčního čísla
- **ACK** $\Rightarrow$ odesílatel potvrzuje a začne odesílat

![[tcp-handshake.png|404]]

### TCP Fin

- **FIN** $\Rightarrow$ žádost o ukončení, kterákoliv ze stran ji může poslat
- **ACK** — druhá strana potvrzuje přijetí FIN
- **FIN-ACK** — druhá strana posílá segment + FIN, aby definitivně ukončila své vysílání
- **ACK** — první strana přijímá ukončení

![[tcp-fin.png|407]]

### Řízení zahlcení

**Congestion control** přizpůsobuje rychlost vysílání dostupné kapacitě sítě.
- Detekce na základě ztráty paketů z důvodu přehlcení
- **Pokud nedorazí ACK, přenos zpomalí, aby předešel přehlcení**
- Velikost okna se odhaduje během přenosu (**AIMD** algoritmus)
- IP síť nedodává informace o dostupné přenosové kapacitě
- **RTT** (Round-Trip-Time) problém — TCP není ready na vysokou latenci

#### Řízení toku vs. Řízení zahlcení

TCP na rozdíl od UDP aktivně brzdí odesílatele, aby nedošlo k ucpání linky či přetížení protistrany:

| Přístup k řízení | Kdo je chráněn | Jak to funguje |
| :--- | :--- | :--- |
| **Bez řízení** (UDP) | **Nikdo** | Odesílatel střílí data maximální rychlostí bez ohledu na to, zda to příjemce nebo síť stíhá. Co se nestihne, to se zahodí. |
| **Řízení toku** (Flow Control) | **Příjemce** (Koncový uzel) | Zabraňuje tomu, aby rychlý odesílatel zahltil pomalejšího příjemce. Odesílatel sleduje velikost volného bufferu u příjemce (tzv. *Receive Window - rwnd*). |
| **Řízení zahlcení** (Congestion Control)| **Síť** (Routery na cestě)| Zabraňuje zhroucení celé sítě. Odesílatel "hádá" propustnost sítě pomocí okna zahlcení (tzv. *Congestion Window - cwnd*). Pokud se začnou ztrácet pakety, TCP předpokládá zácpu na síti a prudce zpomalí vysílání. |

*(Pozn.: Odesílatel u TCP vždy odesílá data rychlostí podle toho, které z oken (rwnd nebo cwnd) je v danou chvíli menší – řídí se tím nejužším hrdlem).*

## Porovnání TCP a UDP

| TCP | UDP |
|-----|-----|
| spojované | nespojované |
| zajištěné | nezajištěné |
| proud | blok |

# L5 Relační vrstva

Abstrakce nad L4. **Jedna relace** může zahrnovat více L4 spojení.
- Řídí synchronizaci s checkpointy (zamezí ztrátě dat při chybě)
- **Simplexní** — jednosměrná komunikace, např. rádio
- **Poloduplexní** — střídavá komunikace, např. vysílačky (předává data token)
- **Duplexní** — současná komunikace, např. telefonát

# L6 Prezentační vrstva

Zajišťuje jednotnou prezentaci dat na obou stranách komunikace.
- Řeší **kódování** znaků (např. ASCII, UTF-8), **kompresi** dat (např. ZIP) a **šifrování** (např. SSL/TLS).*

# L7 Aplikační vrstva

Poskytuje služby uživatelům, síťové aplikační protokoly (HTTP, SMTP, DNS…).

**Komunikační modely:** client-server a peer-to-peer.

**Client-Server**
- Komunikace je iniciována klientem (klient = aplikační program ovládaný uživatelem).
- Po ustavení komunikačního kanálu klient zasílá požadavky na server, ten mu odpovídá (mechanismus *request-response*).
- Po ukončení komunikace je komunikační kanál uzavřen.
- Centralizace zdrojů.
- Valná většina aplikací v Internetu (WWW, FTP, DNS, SSH…).

**Peer-to-Peer**
- Jednotliví klienti spolu komunikují přímo (uzly jsou si rovnocenné).
- Každý uzel poskytuje své zdroje (výpočetní síla, úložná kapacita…) ostatním uzlům.
- Každý uzel využívá zdrojů poskytovaných ostatními uzly (decentralizace zdrojů).
- Příklad: Sdílení souborů (Gnutella, FastTrack, BitTorrent), Skype, VoIP…

## Pull model vs Push model

**Pull model**
- Přenos dat je iniciován klientem (forma požadavek-odpověď).
- Příklad: webové prohlížeče.
- Vlastnosti: asymetrický datový tok, rozmanité požadavky na propustnost.

**Push model**
- Přenos dat je iniciován serverem automaticky na základě znalosti uživatelova profilu (požadavků).
- Příklad: streaming multimédií (IPTV).
- Vlastnosti: jednosměrný datový tok, definované (a stálé) požadavky na propustnost (a na zpoždění, jitter…).

# Otázky

**1.** Co je to multicast?

> **Odpověď:** Multicast je zasílání dat skupině příjemců, kteří o příjem projeví zájem. Využívá multicastové IP adresy (IPv4: třída D `224.0.0.0–239.255.255.255`, IPv6: prefix `ff00::/8`). Rozsah šíření omezuje TTL. Protokoly se dělí na Source Based Tree (DVMRP, MOSPF, PIM-DM) a Shared Tree (CBT, PIM-SM).

**2.** Popiš ISO/OSI model. Jaké má vrstvy? Co která dělá?

> **Odpověď:** ISO/OSI má 7 vrstev: L1 fyzická (přenos bitů, kódování), L2 datového spoje (rámce, MAC adresy, hop-to-hop), L3 síťová (pakety, IP adresy, směrování), L4 transportní (process-to-process, porty, spolehlivost), L5 relační (relace, checkpointy), L6 prezentační (kódování, šifrování, komprese), L7 aplikační (síťové aplikace). TCP/IP slučuje L5–L7 do Aplikační a L1–L2 do Vrstvy přístupu k médiu.

**3.** Jak funguje adresování v L4?

> **Odpověď:** L4 adresuje pomocí IP adresy (z L3) a **portu** (0–65535). Porty jsou well-known (0–1023, IANA), registrované (1024–49151) a dynamické (49152–65535). Kombinace IP + port tvoří socket jednoznačně identifikující komunikující aplikaci.

**4.** Jaké existují topologie lokálních sítí?

> **Odpověď:** Sběrnicová (sdílené médium, CSMA/CD, kolizní doména = všechny stanice), kruhová (pešek, jednosměrný provoz, kolizní doména = všechny stanice) a hvězdicová (centrální hub/switch; s L1 hubem kolizní doména = všechny stanice, s bridge/switchem = pouze 2 sousedící stanice).

**5.** Jak funguje TCP a UDP? Popiš navazování a ukončování spojení.

> **Odpověď:** **UDP** je nespojovaný, nečísluje datagramy, nepotvrzuje doručení — rychlý, best-effort. **TCP** je spojovaný, čísluje bajty, potvrzuje doručení (ARQ), řídí tok a zahlcení. **Handshake:** SYN → SYN-ACK → ACK. **Ukončení:** FIN → ACK → FIN-ACK → ACK (obě strany musí potvrdit ukončení svého vysílání).

**6.** Jak funguje IP protokol? Jak se řeší docházení adres? Proč dochází?

> **Odpověď:** IP protokol zajišťuje host-to-host doručení datagramů přes přepínání paketů — každý uzel předá paket bližšímu uzlu dle směrovací tabulky. Je best-effort (nespojovaný, nepotvrzovaný). IPv4 adresy (32 bit) jsou vyčerpány kvůli masivnímu rozšíření internetu. Řeší se: **CIDR** (classless adresování, efektivnější dělení), **NAT** (skrývá celé sítě za jednu veřejnou IP), přechodem na **IPv6** (128 bit).

**7.** Jaký je rozdíl mezi datagramem a paketem?

> **Odpověď:** **Paket** je obecný termín pro jednotku dat přenesených sítí. **Datagram** je konkrétní typ paketu — jednotka v nespojovaných, nepotvrzovaných službách (L3, UDP), kdy každý datagram putuje sítí nezávisle na ostatních bez záruky doručení či pořadí.

# Příklady

**1.** Mechanismus pro zpomalení vyčerpání adresního prostoru IPv4 je:

> **Odpověď:** Beztřídní adresování pomocí CIDR notace a překlad síťových adres (NAT).

**2.** Uvažujte fyzickou vrstvu (L1) modelu ISO/OSI. Co je její primární funkcí, jaké standardy s ní souvisí a jak definuje adresování?

> **Odpověď:** Přenos bitů z předaných rámců mezi odesílatelem a příjemcem; používá standardy RS-232-C, CCITT V.24, CCITT X.21, IEEE 802.x; avšak nedefinuje žádné adresování.

**3.** Jaké jsou výhody sítí s cykly a jak se eliminují zacyklené pakety?

> **Odpověď:** Robustnost sítě (odolnost proti výpadkům). Distribuovaný algoritmus Spanning Tree (STP) předchází vzniku cyklů na L2 vrstvě, nebo parametr TTL omezuje maximální počet skoků (hopů) paketu na L3 vrstvě.

**4.** Která možnost uvádí příklad média s kolizní doménou na vrstvě datového spoje (L2) a jak tyto kolize řeší?

> **Odpověď:** V lokálních sítích postavených na sběrnicové nebo kruhové topologii propojených pomocí bridge (mostů) se kolize nešíří přes bridge a pro přístup na médium se používají protokoly MAC (Medium Access Control, např. CSMA/CD).

**5.** TCP poskytuje řízení toku a řízení zahlcení (flow and congestion control). Toho je dosaženo pomocí:

> **Odpověď:** Je nasazen mechanismus pozitivního a negativního potvrzování (ACK). Pokud je linka zahlcená, potvrzení nedorazí, a tudíž se přenos od posledního potvrzení opakuje pomalejší rychlostí.

**6.** Jaké síťové protokoly se využijí při úpravě směrovacích tabulek hraničního routeru, pokud aktualizaci provádí správce routeru osobně na dálku přes rozhraní příkazové řádky?

> **Odpověď:** DNS, SSH, TCP, IP, ARP a případně BGP.

**7.** Současné počítačové sítě fungují hlavně díky rozsáhlé standardizaci. Které tvrzení je pravdivé?

> **Odpověď:** Značná část standardů jsou pouze takzvané "Request for Comments" (RFC dokumenty).

**8.** Které tvrzení **neplatí** pro řízení přístupu k médiu (MAC)?

> **Odpověď:** Protokol CSMA/CA je nasazen pro kabelový Ethernet, zatímco CSMA/CD je nasazen v bezdrátovém Ethernetu (Wi-Fi). *(Vysvětlení: Správně je to přesně naopak — CSMA/CD se používá pro drátový Ethernet, CSMA/CA pro Wi-Fi.)*

**9.** Router obdrží dva IPv4 pakety, které tvoří jeden UDP datagram. Odchozí rozhraní má ještě menší MTU než to příchozí. Jaké tvrzení odpovídá standardnímu chování routeru?

> **Odpověď:** Router okamžitě fragmentuje každý příchozí paket na potřebný počet odchozích paketů, aktualizuje offsety užitečného zatížení a nastaví hlavičku UDP **pouze v prvním** odchozím paketu. (Při IP fragmentaci nese transportní hlavičku jen první fragment; ostatní fragmenty obsahují jen IP hlavičku a data.)
