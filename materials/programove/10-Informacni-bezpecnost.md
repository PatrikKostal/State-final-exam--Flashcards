# 10. Základy informační bezpečnosti

> **Zadání:** Základní bezpečnostní funkce a jejich zajištění – důvěrnost, integrita, dostupnost, nepopiratelnost původu. Kryptografická primitiva, protokoly. Řízení rizik, audit, bezpečnostní operace, standardy, hodnocení bezpečnosti. (PV080)

# Kryptografie

**Kryptografie** je obor zabývající se zabezpečenou komunikací dat.

## Základní bezpečnostní funkce

- **Důvěrnost (confidentiality)** — informace jsou přístupné pouze oprávněným osobám.
  - zajišťuje se pomocí **šifrování** dat
- **Integrita** — ochrana dat před neoprávněnou změnou.
  - kódy s detekcí chyby zajišťují odolnost vůči chybám techniky
  - hash zajistí odolnost vůči změnám zprávy útočníkem
- **Nepopiratelnost / neodmítnutelnost (non-repudiation)** — zajištění, že odesílatel zprávy nemůže později popřít, že zprávu odeslal ⇒ možnost identifikace strůjců akcí, pomocí logů nebo digitálního podpisu.
- **Dostupnost (availability)** — data jsou vždy přístupná pouze autorizovaným stranám.
  - SW musí být zabezpečený a odolný vůči útokům
  - zálohy dat, redundance — odolnost vůči selhání úložiště
- **Autentizace** — proces ověření identity uživatelů nebo pravosti dat.
- **Autorizace** — zdroje umožňují přístup pouze entitám s ověřenou identitou.
  - realizuje **Access Control**

> **Trustworthy ≠ trusted:** To, že na nějaký systém spoléháme a vkládáme v něj důvěru (**trusted**), ještě neznamená, že je objektivně bezpečný a tu důvěru si zaslouží (**trustworthy**).

![[security.png|407]]

# Kryptografická primitiva

**Kryptografická primitiva** jsou základní stavební bloky, ze kterých se skládají složitější kryptografické systémy a protokoly ⇒ symetrická a asymetrická šifra, hashování, RNG generátory, MAC.

> **Kerckhoffsův princip** ⇒ bezpečnost musí záviset na utajení klíče, ne na utajení implementace. Zvyšuje ověřitelnost a spolehlivost (možnost nezávislého testování a analýz od třetích stran).

**Šifrování** je proces převodu čitelného textu (plaintext) do nečitelného formátu (ciphertext) za účelem ochrany důvěrnosti (opakem je dešifrování). **Je to mapování.**

## Symetrické šifrování

**Symetrické šifrování** je algoritmus, kde se používá **stejný klíč** pro šifrování i dešifrování.

- klíč musí být tajný ⇒ problém se zabezpečenou distribucí oběma stranám
- existují 2 typy ⇒ **proudové** a **blokové**
- základem je bitová operace **XOR**

Je rychlejší než asymetrické z několika důvodů:

- vyžaduje kratší klíče (typicky 128–256 bitů)
- využívá bitové operace ⇒ umožňuje HW akceleraci

### Proudová šifra

Využívá deterministický RNG (generátor pseudonáhodných čísel).

- nejprve generuje pseudonáhodný **keystream**, který se XORuje s plaintextem
- v každém okamžiku se šifruje pouze 1 bit nebo bajt
- efektivní pro šifrování datových proudů (síťových dat) — typicky rychlejší než bloková šifra
- používá se i pro šifrování souborů s neznámou délkou
- bezpečnostní riziko je opakované použití stejného klíče
- např. **RC4**

### Bloková šifra

Šifrování po blocích, možné i paralelně.

- potřebuje **padding** (riziko útoků — může odhalit klíč na konci)
- **DES** (Data Encryption Standard) ⇒ 56bit klíč, 64bit bloky
  - slabé, ale stále používané; používá **Feistelovu síť**
  - **Triple DES** — workaround pro vyšší bezpečnost: 3× šifrování se 2 klíči
- **AES** (Advanced Encryption Standard / Rijndael) ⇒ náhrada DES, pevný **128bitový blok**, klíče 128/192/256 bitů
  - bezpečnější než DES a zároveň rychlejší (díky HW akceleraci)
  - hlavní klíč je rozšířen na 14 round klíčů

### Režimy blokové šifry

- **ECB** ⇒ každý blok se šifruje nezávisle (jednoduché, naivní, paralelní)
  - umožňuje hledat vzory v ciphertextu — stejné bloky se šifrují na stejný ciphertext!
![[ecb.png|274]] 
- **CBC** ⇒ každý blok závisí na všech předchozích blocích. Obě strany musí znát výchozí vektor (IV). Šifrování nelze paralelizovat.
  $$C_i = E_K(P_i \oplus C_{i-1}), \quad C_0 = IV$$
![[cbc.png|365]] 
- **CTR** ⇒ generuje sekvenci unikátních čítačů speciálně pro každý blok.
  - umožňuje předgenerování i paralelismus
  - aktuální hodnota čítače každého bloku je šifrována a XORována s plaintextem
  - úvodní hodnoty čítačů nastavuje inicializační vektor
![[ctr.png|367]] 

> **nonce** je nějaká hodnota (např. timestamp), její použití předchází replay útokům.

## Asymetrické šifrování

Šifrování s použitím **2 klíčů** — veřejný klíč pro šifrování a soukromý klíč pro dešifrování.

- klíče jsou **matematicky propojené** ⇒ z veřejného nelze jednoduše odvodit ten soukromý
- soukromý klíč lze použít k **podepisování** a veřejný k ověření podpisu
- veřejný klíč je dostupný komukoliv; vydává se k němu certifikát, který potvrzuje komu tento veřejný klíč patří (a váže ho na konkrétní identitu)
- je mnohem pomalejší než symetrické šifrování, klíče jsou obrovské (~4096 bitů)

Např. **RSA** (Rivest-Shamir-Adleman) ⇒ nejpoužívanější asymetrické šifrování.

### RSA

Pro komunikaci Bob → Alice si Alice vygeneruje:

1. tajná prvočísla $p, q$ a veřejné $N = p \cdot q$
2. veřejný exponent $e_A$: $\gcd(e_A, \varphi(N)) = 1$
3. soukromý exponent $d_A$ z $e_A$: $d_A \equiv e_A^{-1} \bmod \varphi(N)$

- **šifrování** veřejným klíčem $(N, e_A)$: $E_A(m) = m^{e_A} \bmod N = c$
- **dešifrování** soukromým klíčem $(N, d_A)$: $D_A(c) = c^{d_A} \bmod N = m$

RSA zabezpečení stojí na výpočetní obtížnosti **faktorizace** ⇒ rozklad na součin prvočísel.

- brute-force je marná snaha
- problémem je bias generovaných klíčů (nejsou zcela RNG, ale jen PRNG)

Kromě šifrování se soukromý klíč používá k podpisu dat a veřejný klíč k ověření podpisu. Abychom mohli důvěřovat veřejným klíčům, certifikační autority vydávají **certifikáty**.

## Certifikát

Certifikát obsahuje verzi, název majitele, vydavatele, klíč, podpis ⇒ **zaručuje autenticitu**.

- je ověřitelný u vydavatele; může být i self-signed
- certifikační autority tvoří hierarchii — **root** je evidovaný přímo v prohlížečích

![[certifikat.png|424]]

## Hashovací funkce

**Hashování** je proces převodu libovolně velkého vstupu do pevně velké výstupní hodnoty (hash), která reprezentuje data a je obvykle jedinečná pro různá data. Zajišťuje **integritu**.

- převod je jednosměrný
- musí splňovat **lavinový efekt (avalanche effect)** ⇒ při změně jednoho bitu se výsledek změní alespoň o 50 %
- jednosměrné hashovací algoritmy ⇒ **SHA-256, MD5**
- rizikem je **kolize** ⇒ hashování 2 různých vstupů na stejnou hodnotu
  - kolizi nikdy nelze 100% vyloučit, protože definiční obor je potenciálně nekonečný

## Digitální podpis

**Digitální podpis** je elektronický ekvivalent ručního podpisu, který zajišťuje **autenticitu**, **integritu** a **nepopiratelnost** autorství digitálních zpráv nebo dokumentů.

- je to přiložený **zašifrovaný hash** odesílané zprávy
- příjemce si může zprávu zahashovat a ověřit shodu
- často poskytována knihovnami:
  - **RSA** ⇒ hash šifrujeme privátním klíčem asymetrického šifrování
  - **DSA** ⇒ USA standard pro digitální podpisy

**Postup:** _Signing_ — z dat se spočítá hash, ten se zašifruje privátním klíčem (= podpis), přiloží se k datům. _Verification_ — příjemce dešifruje podpis veřejným klíčem, sám spočítá hash dat a porovná; pokud se hashe rovnají, podpis je platný.

![[digitalni-podpis-10.png|495]]

## MAC

**MAC** (Message Authentication Code) je koncept podobný digitálnímu podpisu, ovšem místo klíčů asymetrické kryptografie použijeme separátní sdílený klíč (**symetrická šifra**).

- umožňuje ověření **integrity** a **autenticity** zprávy
- pomocí sdíleného klíče se vytvoří MAC (otisk zprávy) pevné délky
- druhá strana s tím stejným klíčem vytvoří otisk zprávy a porovná výsledek
- implementace:
  - **HMAC** ⇒ kombinuje hashování + symetrickou šifru
  - **CMAC** ⇒ bloková symetrická šifra, např. AES

**Možné přístupy ke kombinaci MAC a šifrování:**

- **MAC-then-encrypt** — MAC plaintextu, tag se připojí k plaintextu, pak se šifruje vše dohromady.
  - může selhat (POODLE attack proti SSL 3.0), žádná integrita ciphertextu
  - použité v TLS
- **MAC-ciphertext-after-encrypt** (Encrypt-then-MAC) — plaintext se šifruje bez MAC, MAC se počítá nad ciphertextem a posílá se spolu se zašifrovaným plaintextem.
  - nejbezpečnější, s tím že používáme 2 různé klíče; zaručuje integritu ciphertextu
- **Encrypt-and-MAC-plaintext** — MAC plaintextu i ciphertext, posílají se spolu.
  - nejméně bezpečný z této trojice, neboť i bezpečný MAC může leaknout informace o zprávě
  - použité v SSH
- **AEAD** (Authenticated Encryption with Associated Data) — přístup využívající předchozí přístupy, dovoluje kontrolovat integritu ciphertextu i plaintextu zprávy.

![[mac.png|483]]

## Generátory pseudonáhodných čísel (PRNG)

**PRNG** (Pseudo-Random Number Generators) jsou algoritmy, které generují sekvence čísel, jež se jeví jako náhodné. Příkladem je algoritmus **Mersenne Twister**.

# Kryptografické protokoly

**Kryptografický protokol** zajišťuje distribuci šifrovacího klíče (shared key).

## Diffie-Hellman

**Diffie-Hellman protokol** ⇒ zabezpečená distribuce šifrovacího klíče (pro symetrické šifrování).

- obě strany se spolu dohodnou na prvočísle $p$ a primitivním kořeni $g$
- každá strana si zvolí vlastní číslo $a$, $b$ ⇒ $g^a$, $g^b$, $p$, $g$ jsou zveřejněny
- klíč:
  $$(g^a \bmod p)^b \bmod p = (g^b \bmod p)^a \bmod p$$
- bez předchozí znalosti se obtížně hledá (založeno na výpočtu **diskrétního logaritmu**)

![[diffie-hellman-10.png|494]]

## Station-to-Station (STS)

**STS protokol** ⇒ tzv. autentizované DH. Používá podpisy.

## Kerberos

**Kerberos suite** ⇒ sada autentizačních protokolů zajišťující vzájemnou autentizaci. **Kerberos protokol** je autentizační protokol umožňující prokázání identity.

- využívá symetrickou šifru a KDC (Key Distribution Center)
- **autentizace:**
  1. při přihlášení jménem a heslem se vyrobí hash ⇒ **Secret Key**
  2. klient pošle žádost na **AS** (Authentication Service) z KDC, kde jsou popsány podporované šifry, jméno uživatele a timestamp zašifrovaný Secret klíčem
  3. AS si najde uživatele v **AD** (Active Directory) a vytvoří si jeho Secret Key → dešifruje timestamp
  4. pošle uživateli **Session key** (zašifrovaný Secret klíčem) a **Ticket-Granting Ticket (TGT)** zašifrovaný svým KDC klíčem
  5. uživatel si rozšifruje Session key a uloží TGT
- **pro použití služby potřebujeme Service ticket:**
  1. uživatel posílá žádost o service ticket spolu s TGT a autentifikátorem šifrovaným pomocí session klíče (na **TGS** — Ticket Granting Service)
  2. klient obdrží Service ticket a speciální Session key pro komunikaci se službou
  3. klient odešle svůj service ticket a zašifrovaný autentifikátor serveru, aby se u něj autentizoval
  4. server mu odpoví potvrzením a časovou známkou ⇒ session je zahájeno

![[kerberos.png|418]]

## TLS

**Transport Layer Security (TLS)** ⇒ zajišťuje zabezpečenou komunikaci přes síť. Běží nad transportní vrstvou (typicky využívá TCP spojení) a v rámci OSI modelu se řadí do relační a prezentační vrstvy (funguje vlastně mezi L4 a L7).

- TLS je následníkem **SSL**
- poskytuje **integritu**, **důvěryhodnost** i **autentizaci**
- podporuje DH, Pre-shared key (PSK) i kombinaci obou; HTTPS protokol
- **TLS zahrnuje tři základní fáze:**
  - **Handshake**: dohoda účastníků na podporovaných algoritmech (asymetrická, symetrická, hashování)
  - výměna klíčů založená na šifrování veřejným klíčem a autentizace vycházející z certifikátů
  - šifrování provozu symetrickou šifrou
- **Forward secrecy** (při použití DH): i kdyby byl v budoucnu prozrazen soukromý klíč serveru, nelze jím dešifrovat dříve zaznamenané relace.

![[tls.png|376]]

## SSH

**SSH** ⇒ zabezpečený kanál pro vzdálený terminál (náhrada za telnet).

- **Transport layer protocol** ⇒ autentizace serveru; ustanovuje klíče, způsob výměny informací, poskytuje šifrování a integritu
- **User authentication protocol** ⇒ klient se ověřuje serveru (heslo, kerberos ticket, veřejný klíč klienta)
- **Connection protocol** ⇒ jedno SSH připojení na vícero účelů

# Řízení rizik

**Řízení rizik** je proces identifikace a hodnocení rizik spojených s informačními systémy a daty. Cílem je minimalizovat potenciální dopady bezpečnostních incidentů a zajistit ochranu citlivých informací ⇒ **definuje strategii**.

## Identifikace rizik

- **Asset Identification** — určení, která aktiva (data, hardware, software) jsou kritická pro organizaci
- **Threat Identification** — stanovení potenciálních hrozeb (kybernetické útoky, přírodní katastrofy)
- **Vulnerability Identification** — identifikace slabých míst, která mohou být zneužita hrozbami (neaktualizovaný software, slabá hesla)

## Hodnocení rizik

Předpovídá ztrátu na základě událostí, které mohou nastat. Zkoumá škodové entity, pravděpodobnosti útoků a odhaduje k nim škody.

- **kvalitativní** ⇒ určuje třídy závažnosti, risk rating, počítá skóre
- **kvantitativní** ⇒ metoda **ALE** (Annual Loss Expectancy), vychází z historických dat
- riziko se počítá jako $R = P \cdot V \cdot C$:
  - **Probability** — pravděpodobnost, že nebezpečí existuje
  - **Vulnerability** — počet zranitelností v systému
  - **Cost** — cena za dopad útoku

# Audit bezpečnosti

**Audit bezpečnosti** je systematický proces hodnocení informační bezpečnosti v organizaci. Jeho cílem je zjistit, zda bezpečnostní opatření splňují stanovené požadavky a normy.

- **interní audit** ⇒ zaměřuje se na oddělení ve firmě

**Kroky auditu bezpečnosti:**

1. **Plánování** — stanovení cílů, rozsahu a metodiky auditu
2. **Sbírání dat** — shromažďování informací o bezpečnostních opatřeních a procesech
3. **Výběr testů** s ohledem na testovaný systém
4. **Hodnocení** — analýza shromážděných dat a porovnání s normami a politikami
5. **Zpráva** — dokumentace zjištění, včetně doporučení pro zlepšení

# Standardy bezpečnosti

Standardy bezpečnosti poskytují rámec a osvědčené postupy pro správu informační bezpečnosti.

- **BCP** (Business Continuity Planning) ⇒ standard zabývající se preventivními a reaktivními akcemi, které firmě umožňuje aplikovat před útokem a během obnovy systému po útoku
  - plán podle BCP obsahuje hodnocení rizikovosti, testovací scénáře, soupis opatření
  - BCP ustanovuje dvě metriky obnovy po selhání systému:
    - **RPO** (Recovery Point Objective) ⇒ ustanovuje maximálně přípustné období ztráty údajů z poskytované IT služby 
	    - pohled **do minulosti** – o kolik dat můžeme maximálně přijít
    - **RTO** (Recovery Time Objective) ⇒ ustanovuje maximální přípustný čas, do kterého musí být služba v rámci úrovně obnovena
	    - pohled **do budoucnosti** – jak dlouho může výpadek trvat
- **ISO/IEC 27000** ⇒ souhrn best-practice doporučení
  - **ISMS** = Information Security Management System
  - cyklus **PDCA**: **Plan** (ustanovit politiku a cíle ISMS), **Do** (implementovat a provozovat), **Check** (měřit výkon vůči politice a reportovat managementu), **Act** (nápravná a preventivní opatření pro neustálé zlepšování)

# Hodnocení bezpečnosti

**Hodnocení bezpečnosti** zahrnuje různé metody a techniky pro zajištění bezpečnosti informačních systémů, například:

1. **Penetrační testování (Penetration Testing)**
   - simulace útoků na systém za účelem identifikace zranitelností (Kali Linux)
   - pomáhá organizacím pochopit, jak mohou být jejich systémy kompromitovány a jaké opravy jsou potřebné
2. **Vulnerability Assessment (Hodnocení zranitelností)**
   - systematické prohledávání systému za účelem identifikace a klasifikace zranitelností (např. podle databáze **CWE**)
   - používá se k pravidelnému monitorování a opravování bezpečnostních nedostatků
3. **Bezpečnostní audity**
   - provádění formálních auditů (viz výše) za účelem ověření shody s bezpečnostními normami a politikami

## SecOps

**SecOps** (security operations) — zavedení bezpečnostních praktik v organizaci tak, aby se zlepšila schopnost reagovat na bezpečnostní hrozby a snížilo se riziko úspěšně provedených útoků.

- koordinace mezi bezpečnostními týmy a týmy provozu systémů (správci systémů, vývojáři, síťoví administrátoři)
- pohotová reakce na bezpečnostní incidenty
- monitoring sítě a všech aktivních systémů

# Otázky

**1.** Jaký je rozdíl mezi autorizací a autentizací? V jakém pořadí se provádí?

> **Odpověď:** **Autentizace** je ověření identity — kdo jsi (heslo, klíč, certifikát). **Autorizace** je přiznání oprávnění — co smíš dělat (přístup ke zdroji, službě). Provádí se nejprve autentizace (ověří se identita), teprve poté autorizace (ověřené identitě se přidělí oprávnění) — nelze rozumně přidělovat práva entitě, jejíž identitu jsme neověřili.
