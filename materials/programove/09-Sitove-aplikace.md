# 9. Síťové aplikace a jejich bezpečnost

> **Zadání:** Základní aplikační protokoly: doručování pošty, přenos souborů, web, jmenná služba. Principy popisu a zajištění kvality služby, použití pro multimédia. Zabezpečení síťové komunikace, autentizace a šifrování, zabezpečení na jednotlivých protokolových vrstvách. (PB156)

# Členění síťových aplikací

Síťové aplikace jsou zahrnuty v **aplikační vrstvě L7**, která poskytuje služby pro uživatele.

## Dle využitého komunikačního modelu

- **Client-server** — komunikace iniciována klientem; pro ustanovení komunikačního kanálu klient zasílá požadavky na server, po ukončení komunikace je kanál uzavřen. Server centralizovaně distribuuje zdroje.
  - valná většina aplikací (www, ftp, dns, ssh, …)
  - **tenký klient** — na straně klienta minimum aplikační logiky
  - **tlustý klient** — opak tenkého
- **Peer-to-peer (P2P)** — jednotliví klienti spolu komunikují přímo, každý uzel poskytuje své zdroje ostatním uzlům a zároveň využívá zdrojů poskytovaných ostatními ⇒ decentralizace zdrojů. Sdílení souborů, Gnutella, FastTrack, VoIP.

## Dle přístupu k informacím

- **Pull model** — přenos dat iniciován klientem (např. webové prohlížeče)
- **Push model** — přenos iniciován serverem na základě uživatelova profilu (např. streaming multimédií)

# Překryvová síť (peer-to-peer)

**P2P síť** je virtuálně vytvořena nad existující síťovou infrastrukturou (**překryvová síť**, overlay network). **Peer** je klient P2P sítě. Data jsou přenášena po fyzické síti s pomocí **peerů**. Síť indexuje a zjišťuje sousedící peery.

![[ptp.png|463]]

## Typy P2P systémů

- **Centralizované P2P** — obsahují vícero centrálních serverů, které peerům poskytují vyhledávací služby pro výběr peerů.
  - Centralizace špatně škáluje, riziko útoků na server, málo robustní.
- **Decentralizované P2P** — žádné centrální servery (jejich povinnosti se rozprostírají mezi peery). Všechny peery si jsou rovny a každý má částečnou představu o síti.
  - **Imunní vůči single-point of failure**
  - **plochá síť** (single-tier) ⇒ rovnoměrné rozložení povinností napříč peery
  - **hierarchická** (multi-tier) ⇒ izolace na státních/univerzitních úrovních ⇒ lepší izolace a bezpečnost
- **Hybridní P2P** — kombinuje výhody obou přístupů. Centrální servery neexistují, ale některé peery jsou prohlášeny za servery (**super-peers**) a slouží ostatním peerům — pomáhají s lokalizací dat ⇒ rychlejší.

![[p2p.png|503]]

## Rozložení dat v P2P

- **Nestrukturovaná topologie** ⇒ každý peer si drží svoje data a povědomí o svých sousedech. Žádné striktní mapování dat na peery, žádná garance rychlosti ani kompletnosti odpovědi. Nelze spolehlivě říct, který peer ukládá co.
- **Strukturovaná topologie** ⇒ lokalitu dat určuje předem daná strategie (distribuovaná hašovací tabulka — DHT, …). Rychlejší vyhledávání za cenu vyšší režie.

# Základní protokoly aplikační vrstvy

**Aplikační vrstva** poskytuje služby uživatelům ⇒ smysl existence sítí.

**Aplikační protokol** definuje typy zpráv, které si aplikace předávají, jejich syntax, sémantiku a pravidla. Kromě uživatelských služeb řeší také mapování adres, management sítě apod.

- **TCP** využívají ⇒ FTP, Telnet, RDP
- **UDP** využívají ⇒ DHCP, TFTP

**Výčet aplikačních protokolů:** DHCP (automatická konfigurace počítačů v síti), DNS, FTP, HTTP, IMAP (Internet Message Access Protocol), IRC (Internet Relay Chat — textová komunikace), NTP (Network Time Protocol — synchronizace hodin), POP3, RTP (Real-time Transport Protocol), RTSP (Real Time Streaming Protocol), SMB (Server Message Block — sdílený přístup k souborům), SMTP (Simple Mail Transfer Protocol — doručování mailů přímým spojením), SSH (zabezpečená náhrada za Telnet), TELNET, SSL/TLS (zabezpečení komunikace šifrováním a autentizací) a další.

## WWW

Web je celosvětová síť fungující na Internetu (**není** Internet). Systém prohlížení, ukládání a odkazování dokumentů nacházejících se v Internetu.

Dokumenty (webové stránky) jsou umístěny na webových serverech a jsou adresovány pomocí **URL** (Uniform Resource Locator), jehož součástí je i doména a jméno počítače. Pro přenos mezi počítači se používá protokol **HTTP**.

Autorem Webu je **Tim Berners-Lee**, který jej vytvořil při svém působení v CERNu. Navrhl jazyk HTML a protokol HTTP, napsal první webový prohlížeč WorldWideWeb a koncem roku 1990 spustil první webový server na světě `info.cern.ch`.

### HTTP

**HTTP** je protokol pro přístup k datům na WWW.

- přenáší data ve formě hypertextových dokumentů — formát HTML
- rozšíření **MIME** umožňuje přenos souborů, audia, videa ⇒ aplikační brána pro další protokoly
- komunikace pomocí **TCP na portu 80** ⇒ klient vyšle požadavek, server pošle odpověď

### URL

**URL** definuje zdroj, který chceme získat. Tvar: `method://host:port/path`

- **method** — metoda (protokol), který má být použit
- **host** — uzel, kde se odkazovaná informace nachází
- **port** — pokud chceme jiný než standardní (nepovinně)
- **path** — cesta, kde se odkazované informace nachází (nepovinně)

### WWW dokumenty

- **statické** — na serveru uložené dokumenty s pevným obsahem (HTML dokumenty)
- **dynamické** — nemají pevný formát, ten se vytváří na základě požadavku klienta (CGI skripty)
- **aktivní** — server poskytuje aplikaci, která poběží na straně klienta (např. Java aplikace)

## DNS (jmenná služba)

**DNS** (Domain Name System) je **jmenná služba** pro překlad doménových (symbolických) jmen na IP adresy počítačů a zpět.

- ukládá dvojice ve **jmenném prostoru**: např. `(seznam.cz, 126.156.12.13)`
- **plochý jmenný prostor** ⇒ jednoslovné názvy (`mujRouterDomaVBrne`)
- **hierarchický** ⇒ oddělování tečkou (standard na internetu): `mujRouter.DomaVBrne.cz`
  - struktura invertovaného stromu, max 128 levelů
  - každý uzel má jmenovku a doménové jméno
  - na konci adresy je nejobecnější doména, nejvyšší úrovně
- **strom je rozdělen do zón** — každou spravuje jiný server. `.cz` server pošle pouze odkaz na server Seznamu a ten už vyhodnotí `seznam.cz` ⇒ vrátí odpověď.
  - **Root zóna** ⇒ 13 serverů

**Vyhodnocení požadavku** (vyhledání IP pro `cs.ucla.edu`): dotaz postupuje od **root** zóny → server TLD domény (`edu`) → autoritativní server domény (`ucla.edu`), který vrátí finální odpověď. Strom: `root → {com, net, org, edu, …} → ucla → cs`.

![[dns.png|263]]

## Doručování pošty

### SMTP

**SMTP** (Simple Mail Transfer Protocol) je mechanismus elektronické pošty.

- doručuje na základě emailových adres, definuje formát, na **portu 25**
- pošta se skládá z **obálky** (adresy odesílatele a příjemce) a **zprávy**
- **MTA** (Mail Transfer Agent) doručuje poštu přes **TCP**
- **emailová adresa** se skládá z lokální části (mailbox) a doménového jména organizace (`local-part@domain-name`); doručení probíhá na základě adres uvedených na obálce

### Doručení e-mailu — 3 části

1. **Doručení lokálnímu poštovnímu serveru (mailserveru)** — poštovní klient (**MUA**, Mail User Agent) ustanoví TCP spojení s poštovním serverem (přes **MSA**, Mail Submission Agent), po předání zprávy (s využitím SMTP) spojení uzavře.
2. **Předání cílovému poštovnímu serveru** — lokální mailserver předá zprávu cílovému mailserveru (SMTP protokolem).
3. **Předání/čtení emailu cílovým poštovním klientem** — iniciováno cílovým uživatelem s využitím protokolů **POP3** či **IMAP4**. Na serveru je ještě správce poštovních schránek — **MDA** (Mail Delivery Agent).

![[mail-delivery.png|678]]

### Přístup ke zprávám — POP3 vs IMAP

| POP3 | IMAP |
|------|------|
| Přístup z nejvíce jednoho klienta | Přístup z více klientů souběžně |
| Offline přístup možný | Prohlížení pošty vyžaduje připojení k internetu |
| Ukládá poštu lokálně | Žádné stahování, jen cache |
| Stažené zprávy se smažou z MDA | Prohlížení zprávy nemaže |
| Šetří diskový prostor serveru | Může šetřit diskový prostor klienta |

> **POP3** stahuje zprávy ze vzdáleného serveru, je možné pracovat offline.
> **IMAP** umožňuje vzdálený přístup ke schránce, pamatuje si stav zprávy (přečtená, nepřečtená).

## FTP (přenos souborů)

**FTP** (File Transfer Protocol) je protokol pro přenos souborů.

- **klient-server** spojení přes **TCP** ⇒ **řídicí** a **datové** spojení (porty 21 a 20)
- **řídicí** komunikace — domluva na parametrech, textový/binární režim atd.
- **datová** komunikace — prostě posílá data
- špatně zabezpečený ⇒ nahrazuje **SFTP**, **FTPS** (varianty s využitím SSL)

![[ftp.png|369]]

## Další protokoly

- **DHCP** je protokol pro automatickou konfiguraci počítačů v síti — přiděluje IP adresu, masku sítě, DNS adresu a bránu.
- **NTP** ⇒ synchronizace vnitřních hodin PC.

# Kvalita služby (QoS)

**QoS** (Quality of Service) je služba pro zajištění kvality (požadovaných vlastností), zabraňuje zahlcení. Nastavuje prioritu různých vlastností, např. **nejkratší delay, nejširší bandwidth**. Rozprostírá se přes vrstvy **L2, L3, L4**.

## Typy

- **Best-effort** — bez QoS, co nejnižší režie (IP protokol)
- **Differentiated Services** — dělí pakety na kategorie; např. snaha o nízkou latenci u her. Zdroje nejsou rezervovány, za běhu se s nimi zachází podle záznamu v hlavičce.
- **Integrated Services** — předem definované požadavky; pokud je síť nesplní, spojení se zamítne. Zdroje se rezervují, uzly si pamatují stav spojení.

## Scheduling

QoS implementuje **scheduling** (plánování fronty):

- **FIFO** ⇒ nejjednodušší, best-effort approach
- **Priority Queuing** ⇒ priorita podle stanovených tříd
- **Weighted Fair Queuing** ⇒ poskytuje časová okna podle přiřazených vah
  - **Round-Robin** mechanismus

## Omezování toků

- **Leaky Bucket** — vyhlazování přenosu, když hrozí přetížení ⇒ zahazuje pakety. „Data protékají stále stejnou rychlostí, jako z děravého kýblu." (převádí burst na konstantní tok)
![[leaky-bucket.png|294]]
- **Token Bucket** — hromadí tokeny při nečinnosti; za každý paket odstraní token ⇒ mírní krátkodobé špičky (umožní omezené bursty).
![[token-bucket.png|393]]

## Prevence zahlcení

**Standardně** se fronty plní a žádné pakety nejsou zahazovány až do případu, kdy je fronta plná. Díky tomu není možná pružná reakce na blížící se zaplnění fronty (odesílatel se to včas nedozví) a může dojít k synchronizaci zahlcení mezi více směrovači a vytváření vln. Tomu se snaží zabránit mechanismy pro prevenci zahlcení.

- **Random Early Detection (RED)** — přesáhne-li zaplnění fronty určitou mez, začne směrovač zahazovat pakety náhodně vybraných toků. Odesílatel tak sníží rychlost odesílání. Pravděpodobnost zahození paketu se zvyšuje se zvyšujícím se zaplněním fronty. Odstraňuje problém globální synchronizace.
- **Weighted Random Early Detection (WRED)** — totéž co RED, avšak pravděpodobnost zahození paketu závisí též na prioritě paketu.

## Kvalita služby v Internetu

- **Integrované služby (Integrated Services)** — aplikace oznámí síti své kvalitativní požadavky na přenos. Síť ověří, zda jsou k dispozici požadované prostředky a rozhodne, zda požadavkům vyhoví (jinak se aplikace může rozhodnout, zda požádá o méně náročné QoS). Pokud lze vyhovět, síť informuje všechny komponenty po cestě k příjemci, ať rezervují odpovídající objem prostředků.
  - **Nevýhodou** je udržování stavu na vnitřních prvcích sítě (problémy se škálovatelností).
- **Rozlišované služby (Differentiated Services)** — síti se neoznamují žádné požadavky na kvalitu přenosu. Každý paket vstupující do sítě je označen značkou, která určuje kvalitativní třídu přenosu (pole **Type of Service** v IPv4 nebo **Traffic Class** v IPv6). Na základě přiřazené třídy je s paketem na vnitřních prvcích zacházeno. Jednoduché, žádné stavové informace na vnitřních prvcích, žádné úvodní zpoždění přenosu.

# Použití pro multimédia — zpracování obrazu/zvuku

- **Vzorkování (sampling)** ⇒ řeší osu X (čas). V pravidelných (diskrétních) intervalech se "změří" (odečte) aktuální hodnota plynulého signálu.
![[vzorkovani.png|370]]
- **Kvantování** ⇒ řeší osu Y (hodnotu). Změřená hodnota ze vzorkování se zaokrouhlí na nejbližší povolenou úroveň (diskrétní hodnotu intenzity).
![[kvantovani.png|376]]
- **Komprese** ⇒ převod na úspornější formát.

# Zabezpečení

## Firewall

**Firewall** je síťové zařízení, které slouží k řízení a zabezpečování síťového provozu mezi sítěmi s různou úrovní důvěryhodnosti a zabezpečení. Monitoruje a kontroluje příchozí a odchozí síťový provoz podle předdefinovaných pravidel. Typicky odděluje věrohodnou, bezpečnou vnitřní síť od okolních sítí (např. Internetu), o kterých předpokládá, že nejsou důvěryhodné nebo bezpečné. Existují softwarové i hardwarové.

- **L3 firewall** — pracuje na síťové vrstvě OSI (jako směrovače). Filtruje provoz podle IP adres, portů a podobných protokolů.
- **L7 firewall** — pracuje na aplikační vrstvě OSI. Umožňuje pokročilejší pravidla filtrování — dokáže analyzovat obsah paketů (malware, hrozby), nikoliv jen IP adresy.
- **Příklad:** `ufw` (Uncomplicated Firewall) v Linuxu (funguje primárně jako **L3/L4 firewall** – filtruje IP adresy a porty, rozhraní nad `iptables`).

## Bezpečnostní funkce

**Bezpečná síť** nabízí následující vlastnosti:

- **Autentizace** ⇒ ověření identity uživatele vůči systému i příjemci (heslo, PIN, privátní klíč, otisk prstu, zornice…)
- **Autorizace** ⇒ oprávnění použít určitou službu/zdroj
- **Účtování (accounting)** ⇒ sleduje využívání služeb uživateli, zaznamenává jejich akce
- **Důvěrnost** ⇒ ochrana přenášených dat před neautorizovaným odhalením (**šifrování**)
- **Integrita** ⇒ ochrana před neautorizovanými akcemi v systému
- **Nepopiratelnost** ⇒ autentizace je jednoznačná a nelze ji později popřít; příjemce i odesílatel jsou jednoznačně identifikováni

# Zabezpečení síťové komunikace

**Kryptografie** je nauka o metodách utajování zpráv.

## Symetrická kryptografie

Využívá **1 klíč** k šifrování i dešifrování.

- **Výhody** ⇒ nenáročná, efektivní
- **Nevýhody** ⇒ klíč se musí distribuovat (riziko)

## Asymetrická kryptografie

Používá **2 klíče** — veřejný a privátní. Šifrovat lze pomocí veřejného klíče, dešifrovat pomocí privátního.

- **Výhody** ⇒ nižší riziko (veřejný klíč lze volně zveřejnit)
- **Nevýhody** ⇒ nízká rychlost, vhodné pro krátké zprávy

## Certifikáty

Jelikož je v asymetrické kryptografii veřejný klíč dostupný všem, odesílatel ke zprávě přibaluje **certifikát**. Certifikát obsahuje jméno vlastníka, veřejný klíč, dobu platnosti a podpis vydavatele. Certifikáty vydávají důvěryhodné organizace (**certifikační autority**, CA).

## Autentizace

Komunikující strany se nejprve musí **autentizovat**. Varianty:

- **Autentizace heslem** — Alice se autentizuje zasláním hesla
	- heslo je šifrované sdíleným symetrickým klíčem.
	- Negarantuje čerstvost hesla (heslo mohlo být odposlechnuto a nyní se jedná o opakovanou autentizaci — možný útok).
	![[autentizace-heslem.png|439]]
- **Autentizace s využitím náhodných čísel**
	- Alice si od Boba vyžádá zaslání náhodného čísla (tzv. **keksík**, nonce)
	- To zašifruje sdíleným symetrickým klíčem
	- Řeší problém čerstvosti.
	![[autentizace-nahodne-cislo.png|438]]
- **Vzájemná autentizace**
	- stejný princip jako předchozí, ale oboustranně.
	![[vzajemna-autentizace.png|438]]

## Diffie-Hellman

Asymetrická kryptografie umožňuje ustanovit sdílený klíč s využitím algoritmu **Diffie-Hellman**. Obě strany znají veřejné hodnoty $N$ a $G$:

1. Alice spočítá $R_1 = G^X \bmod N$ a pošle $R_1$ Bobovi.
2. Bob spočítá $R_2 = G^Y \bmod N$ a pošle $R_2$ Alici.
3. Alice spočítá $K = (R_2)^X \bmod N$, Bob spočítá $K = (R_1)^Y \bmod N$.

Obě strany získají stejný **sdílený tajný klíč** $K$, aniž by jej musely posílat po síti.

![[diffie-hellman.png|498]]

## Digitální podpis

**Digitální podpis** je podepsaný otisk (hash) zprávy. Zajišťuje **integritu**, **nepopiratelnost** i **autentizaci** komunikujících stran.

Obrácený mechanismus asymetrické kryptografie: zprávy jsou šifrovány **privátním** klíčem a dešifrovány **veřejným** klíčem (kdokoliv s veřejným klíčem ověří, že podpis vytvořil majitel privátního klíče).

![[digitalni-podpis.png|670]]

**Varianty použití:**

- **Podpis celého dokumentu**
- **Podpis otisku dokumentu** ⇒ nejvyužívanější. Ze zprávy se vypočte hash a ten se podepíše.
  - odešle se podepsaný hash + plain text zprávy; je to rychlé
  - **hashovací funkce** MD5, SHA-256…

# Zabezpečené protokoly

Zabezpečené protokoly lze provozovat na L7, L4 i na L3.

## L3 síťová vrstva — IPSec

**IP Security (IPSec)** ⇒ kolekce protokolů zajišťující bezpečnou komunikaci na **L3 síťové vrstvě**.

- **Authentication Header (AH)** — zajišťuje autentizaci odesílatele a příjemce a integritu dat v hlavičce
- **Encapsulating Security Payload (ESP)** — přidává šifrování paketů podle dohody obou stran
- lze použít **AH + ESP**
- dokáže zabezpečit všechny datové toky, ale nemá prostředky pro správu klíčů
- **Režimy:**
  - **Transportní mód** ⇒ mezi IP header a tělo je vložen IPSec header
  ![[transportni-mod.png|379]]
  - **Tunelovací mód** ⇒ IPSec header je vložen před IP header, poté se generuje nový IP header
  ![[tunelovaci-mod.png|412]]

## SSL/TLS (mezi L4 a L7)

**Secure Sockets Layer (SSL)** — doslova „vrstva bezpečných socketů". Následovníkem a dnešním standardem je protokol **Transport Layer Security (TLS)** (TLS 1.0 přímo navazuje na SSL 3.0, ale není s ním totožný – někdy se značí jako „SSL 3.1").
- **Kde se nachází:** Z pohledu OSI modelu leží na **L5/L6** (mezi transportní L4 a aplikační L7). Zabezpečuje stávající TCP spojení. V praxi (TCP/IP model) je považován za součást aplikační vrstvy.
- **Účel:** Poskytuje zabezpečení komunikace šifrováním a autentizaci (ověření) komunikujících stran.
- **Využití:** Obalením běžných aplikačních protokolů do TLS vznikají jejich bezpečné varianty, např. **HTTPS** nebo **FTPS**. Po vytvoření spojení (session) je veškerá komunikace šifrovaná.

### Princip fungování

Využívá **asymetrickou šifru** — každá strana má dvojici klíčů (veřejný a soukromý). Veřejný klíč lze zveřejnit; co je jím zašifrováno, rozšifruje jen majitel soukromého klíče.

1. Klient pošle serveru požadavek na SSL spojení spolu s doplňujícími informacemi (verze SSL, nastavení šifrování atd.).
2. Server pošle klientovi odpověď obsahující stejný typ informací a hlavně **certifikát serveru**.
3. Podle přijatého certifikátu si klient ověří autentičnost serveru. Certifikát obsahuje veřejný klíč serveru.
4. Na základě dosud obdržených informací vygeneruje klient **základ šifrovacího klíče**, zašifruje jej veřejným klíčem serveru a pošle mu ho.
5. Server použije svůj soukromý klíč k rozšifrování základu. Z něj vygeneruje jak server, tak klient hlavní **šifrovací klíč**.
6. Klient a server si navzájem potvrdí, že od teď bude jejich komunikace šifrovaná tímto klíčem. Fáze handshake tímto končí.
7. Je ustaveno zabezpečené spojení šifrované vygenerovaným klíčem; aplikace dál komunikují přes šifrované (symetrické) spojení.

### Možné problémy

- **Důvěra k mnoha certifikátům** — v PC je předinstalováno několik CA, kterým prohlížeč automaticky důvěřuje (uživatel si to nemusí uvědomit). V úložišti CA ale může být i nějaká testovací CA, která důvěryhodná není.
- **Podepsaný certifikát je „dobrý" certifikát** — uživatelé předpokládají, že podepsaný certifikát je správný. Certifikát mohl podepsat útočník — je důležité kontrolovat, kdo certifikát vydal.
- **Povolení nebezpečných šifer** — některé šifrovací algoritmy už byly prolomeny; může být povoleno použít překonaný algoritmus.
- **Provozovatel serveru** — HTTPS/SSL zajistí důvěrnost dat jen na cestě od klienta k serveru (a naopak). Provozovatel pak může data uložit v nešifrované podobě do nechráněné databáze.

## L7 aplikační vrstva

### Aplikační brány (Proxy firewally)

Zcela oddělují obě sítě. Fungují na aplikační vrstvě. Komunikace probíhá formou **dvou spojení**: klient (iniciátor) se připojí na aplikační bránu, která příchozí spojení zpracuje. Brána na základě klientova požadavku otevře nové spojení k serveru; odpověď serveru opět brána zachytí a původním spojením ji předá klientovi. Server nevidí adresu klienta, ale pouze vnější adresu brány — ta tedy působí jako nástroj pro překlad adres (**NAT**).

- ✅ vysoké zabezpečení známých protokolů
- ❌ náročné na hardware — brány zpracují mnohonásobně méně spojení a nižší rychlosti než paketové filtry, mají vyšší latenci (odezvu)

### PGP

**Pretty Good Privacy (PGP)** ⇒ protokol na úrovni **L7 aplikační vrstvy** zajišťující důvěrnost, integritu i autentizaci na základě vlastních síťových mechanismů. Nejčastěji se používá k šifrování a podepisování e-mailů.

Funguje jako kompletní balíček stavějící na asymetrické kryptografii, který ale pro praktické použití přidává další mechanismy:
- **Šifrování zpráv (Hybridní model):** Pro rychlost se zpráva zašifruje jednorázovým *symetrickým* klíčem, a teprve tento malý klíč se zašifruje *asymetricky* (veřejným klíčem příjemce).
- **Digitální podpis (Autentizace a integrita):** Ze zprávy se vytvoří otisk (hash), který se zašifruje *soukromým klíčem odesílatele*. Příjemce jej ověří pomocí odesílatelova veřejného klíče.
- **Správa klíčů (Web of Trust):** PGP nepoužívá centrální certifikační autority (CA) jako TLS. Místo toho si uživatelé podepisují veřejné klíče navzájem a vytvářejí tak "pavučinu důvěry".
- **Formátování (ASCII Armor):** Převádí binární šifrovaná data do textového formátu (známé `-----BEGIN PGP MESSAGE-----`), aby je šlo snadno vložit do těla e-mailu.

### Proxy

**Proxy** ⇒ mechanismus oddělující účastníky komunikace. Tvoří se 2 nezávislé komunikační proudy, které spravuje aplikační brána. Účastníci komunikují s bránou ⇒ vysoké zabezpečení, pomalejší rychlost a vyšší latence.

# Otázky

**1.** Popiš symetrické a asymetrické šifrování. Jaké jsou jejich rozdíly?

> **Odpověď:** **Symetrické** používá jeden sdílený klíč pro šifrování i dešifrování — je rychlé a nenáročné, ale klíč se musí bezpečně distribuovat. **Asymetrické** používá dvojici klíčů (veřejný + privátní): co zašifruje veřejný klíč, rozšifruje jen privátní. Je bezpečnější (klíč se nemusí distribuovat), ale pomalé ⇒ vhodné jen pro krátké zprávy. V praxi se kombinují (asymetricky se vymění symetrický klíč, jím se pak šifruje provoz — viz SSL/TLS).

**2.** Popiš rozdíly mezi client-server a peer-to-peer přístupem.

> **Odpověď:** U **client-server** komunikaci iniciuje klient požadavkem na centrální server, který distribuuje zdroje (www, ftp, dns). Centralizace je jednoduchá, ale špatně škáluje a je zranitelná (single-point of failure). U **peer-to-peer** spolu uzly komunikují přímo, každý je zároveň poskytovatel i konzument zdrojů ⇒ decentralizace, odolnost vůči výpadku, ale složitější vyhledávání dat.

**3.** Jak funguje QoS? K čemu se používá? V praxi? Jak funguje scheduling?

> **Odpověď:** **QoS** zajišťuje požadovanou kvalitu přenosu (nízký delay, dostatečný bandwidth) a brání zahlcení; rozprostírá se přes L2–L4. Používá se zejména pro multimédia a real-time aplikace. V praxi: **Integrated Services** (rezervace zdrojů po cestě, stavové) nebo **Differentiated Services** (značkování paketů do tříd, bezstavové). **Scheduling** plánuje pořadí odbavení fronty: FIFO (best-effort), Priority Queuing (podle tříd), Weighted Fair Queuing (časová okna podle vah, round-robin).

**4.** Co je to SSL? Jaké vrstvě odpovídá?

> **Odpověď:** **SSL** (Secure Sockets Layer, předchůdce **TLS**) je protokol zajišťující šifrování a autentizaci komunikace. Pracuje mezi transportní (L4) a aplikační (L7) vrstvou — bývá popisován jako relační/prezentační (L5/L6) nebo jako zabezpečení nad L4. Při handshake si strany asymetricky vymění symetrický klíč, kterým pak šifrují provoz (např. HTTPS, FTPS).

**5.** Co je to IPSec?

> **Odpověď:** **IPSec** je kolekce protokolů zajišťující bezpečnou komunikaci na **L3 síťové vrstvě**. **AH** (Authentication Header) zajišťuje autentizaci a integritu, **ESP** (Encapsulating Security Payload) přidává šifrování; lze kombinovat. Pracuje v transportním (IPSec header mezi IP hlavičkou a tělem) nebo tunelovacím módu (nová IP hlavička, využíváno u VPN).

**6.** Jak funguje elektronická pošta? Jaké protokoly používá?

> **Odpověď:** Odesílatelův klient (**MUA**) předá zprávu lokálnímu mailserveru přes **SMTP** (port 25). Mailserver (**MTA**) ji přes SMTP doručí cílovému mailserveru, kde ji spravuje **MDA**. Příjemce si zprávu vyzvedne klientem protokolem **POP3** (stáhne lokálně, offline) nebo **IMAP** (ponechá na serveru, přístup z více zařízení).

**7.** Co je to DNS a k čemu je? Jak probíhá vyhodnocení požadavku?

> **Odpověď:** **DNS** (Domain Name System) je jmenná služba pro překlad doménových jmen na IP adresy (a zpět). Jmenný prostor je hierarchický (invertovaný strom rozdělený do zón, root zóna = 13 serverů). Vyhodnocení dotazu (např. `seznam.cz`) postupuje od root zóny → server TLD (`.cz`), který vrátí odkaz na autoritativní server domény → ten vrátí finální IP adresu.
