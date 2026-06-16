# 11. Vývoj bezpečných aplikací

> **Zadání:** Řízení identity a přístupu. Ochrana soukromí – koncepty a metody. Bezpečné programování, statické a dynamické nástroje pro analýzu bezpečnosti software. Použitelná bezpečnost. (PV080)

# Řízení identity a přístupu

**Identita** je podmnožina atributů, která je dostačující k identifikaci v rámci nějaké množiny osob.

- jedna osoba může mít **více identit** v závislosti na kontextu
- **částečná identita** se vztahuje k rolím — váže se k množině uživatelů

**Atributy identity** mohou být:

- **doménové** ⇒ škola, práce, stát
- **funkční** ⇒ lokalita, sociální skupiny, biologické
- **časově závislé** ⇒ trvalé, získané, měnící se

**Autentizace** ověřuje identitu (člověka heslem / biometrií, stroj např. klíčem).

**Autorizace** je proces povolení k provedení operace na základě příslušných oprávnění.

**Identity management** je systém politik pro správu přístupů a rolí.

- **Default-Deny princip** ⇒ pokud něco není explicitně povoleno, je to zakázáno
- využívá asymetrickou kryptografii — certifikáty, digitální podpisy, PKI

## Modely řízení přístupu

- **Role-based (RBAC)** ⇒ systém definuje **role** — pojmenované skupiny oprávnění
  - uživatel může mít přidělenou nějakou roli, např. správce, vlastník Discord serveru
- **Mandatory (MAC)** ⇒ přístup centrálně řídí definované bezpečnostní politiky
  - o přístupu rozhodují především **tagy**, které mohou mít uživatelé i zdroje
  - typické pro systémy s klasifikovanými informacemi
- **Discretionary (DAC)** ⇒ práva ke zdroji uděluje uživatelům **vlastník zdroje**
  - příklad: práva k úpravě Google dokumentu

# Ochrana soukromí

**Soukromí** se v informatice zabývá využitím osobních dat a dalších citlivých informací.

- jde o jedno ze základních lidských práv
- **soukromá data** jsou data, která lidé nechtějí mít veřejně dohledatelná
- **osobní data** jsou data, která mohou osobu identifikovat
- každá firma má nějaké **zásady ochrany soukromí**

## Koncepty ochrany soukromí v systému

Vlastnosti uvažujeme vždy vůči nějakému **datasetu**.

- **Anonymita** ⇒ systém umožňuje uživateli jej používat bez odhalení své identity
  - je obtížně dosažitelná
- **Pseudonymita** je anonymita s využitím **pseudonymů** ⇒ uživatel je anonymní mezi uživateli, ale jeho identita je dohledatelná
  - TSF vyžaduje možnost určení identity ⇒ uživatel je tedy zodpovědný za své činy
- **Nespojitelnost (unlinkability)** ⇒ umožňuje provádět akce v systému bez zpětného dohledání totožnosti strůjce
- **Nepozorovatelnost (unobservability)** je nespojitelnost na úrovni uživatelů ⇒ vyžaduje, aby uživatelé ani subjekty nemohli zpozorovat, jestli nějaká akce probíhá

## Metody pro zajištění anonymity a soukromí

- **Mix Networks (Chaum 1981)** ⇒ dosahují anonymity a nespojitelnosti využitím fiktivních zpráv (dummy traffic) a neoptimálního směrování. Omezují možnost analýzy provozu.
- **Onion Routing / TOR** ⇒ využívá vrstvené šifrování (každý uzel dešifruje jednu vrstvu). Poskytuje interaktivní anonymitu v reálném čase.
- **Anonymizing Remailers (např. Mixminion)** ⇒ servery, které odstraní hlavičky z e-mailu a předají ho dál (princip store-and-forward).

# Standardy a regulace

## Common Criteria

**Common Criteria** je standard pro hodnocení a certifikaci bezpečnosti systémů.

- hodnocení vykonávají specializované laboratoře — výsledky jsou obecně uznávané
- **TOE** (Target Of Evaluation) — produkt nebo systém, který je předmětem hodnocení (SW, OS)
- **TSF** (TOE Security Functions) — HW/SW/FW používaný systémem; v kontextu Common Criteria jde o bezpečnostní funkcionalitu hodnocenou v rámci TOE (např. šifrování údajů, autentizace uživatelů, řízení přístupu)
- **TSC** (TSF Scope of Control) — rozsah interakcí v bezpečnostním systému; technické požadavky, které musí hodnocený produkt splňovat, aby byl certifikován jako vyhovující (např. minimální úroveň síly šifrování nebo požadavek na bezpečnou správu klíčů)

TSF je jádro bezpečnostních funkcí uvnitř TSC, které řídí interakce mezi uživateli (**Users**), subjekty (**Subjects**), objekty (**Objects**) a zdroji (**resources**) uvnitř hodnoceného TOE.

![[common-criteria.png|408]]

## GDPR

**GDPR** (2016) je nařízení EU, které definuje sankce za porušení soukromí.

- limituje **agregaci** dat a jejich procesování
- dle GDPR jsou osobní data všechna, která mohou vést k **de-anonymizaci** (email apod.)

## eIDAS

**eIDAS** je evropské nařízení definující framework pro elektronickou identifikaci osob. Specifikuje **úrovně elektronických podpisů**:

1. **Electronic signature** — obyčejný elektronický podpis
2. **Advanced electronic signature** — jakýkoliv certifikát
3. **Qualified electronic signature** — vytvořený s pomocí eID, tokenů apod. (mohou je vydávat různé služby — Česká pošta, eIdentity…). Je právně stejně mocný jako vlastnoruční podpis.

# Síťové útoky

**Útok** je úmyslný čin pro získání dat, ke kterým útočník nemá přístup.

- **útočník** cílí na bugy a nepokryté scénáře, aby získal data, propašoval škodlivý kód, přerušil službu…
- síťový útok vyžaduje **monitoring** ⇒ odposlouchávání sítě za účelem získání informací

## Monitoring

Monitoring může využít jak útočník, tak firma, která se pokouší odhalit potenciálního útočníka.

- **Aktivní** ⇒ vysílání sond, pingování a měření rychlosti odezvy, hledání otevřených portů
  - mapování sítě útočníkem je zjistitelné a může předcházet útoku
  - nástroje: **Nmap**
- **Pasivní** ⇒ sledování síťového toku bez vlastní účasti; hledá anomálie, vzorce a slabá místa
  - není tak efektivní jako aktivní monitoring, ale není tak nápadný
  - nástroje: **Wireshark**, **Snort**…

## Typy útoků

- **Brute force** ⇒ zkoušení všech možných kombinací hrubou silou
  - *obrana:* dlouhá hesla, omezení počtu pokusů, vícefaktorová autentizace
- **Replay** ⇒ zachycení platných zpráv v síti a jejich znovuzaslání
  - *obrana:* šifrování, timestampy, countery, omezená časová platnost zpráv
- **Dictionary útok** ⇒ zkoušení běžných, statisticky nejvíce používaných hesel
  - *obrana:* vynucení komplexních a dlouhých hesel
- **Downgrade útok** ⇒ vynucení použití starší verze komunikačního protokolu
  - *obrana:* vynucení nejnovějších verzí a aktualizací
- **Padding útok** ⇒ využití chyby implementace, kdy padding na konci zprávy odhalí část klíče
  - *obrana:* použití algoritmů, které tento problém řeší
- **DDoS** (Distributed Denial of Service) ⇒ pokus o přetížení velikým množstvím requestů
  - **Direct (přímý) DDoS:** Útočník (botnet) posílá požadavky *přímo* na cíl.
  - **Reflection (reflektivní) DDoS:** Útočník pošle dotaz na legitimní server v síti (např. DNS), ale podvrhne (spoofne) zdrojovou IP adresu tak, aby vypadala jako IP oběti. Legitimní server pak svou odpověď pošle oběti.
  - **Amplification (zesílení):** Často se kombinuje s reflection útokem. Útočník pošle na server malý dotaz, ale vyvolaná odpověď je nepoměrně větší (např. vyžádání celého DNS záznamu). Útočník si tím šetří vlastní linku a násobí sílu útoku.
  - *obrana:* filtrování opakovaných requestů, caching
- **MITM** (Man-in-the-Middle) ⇒ zachycení a měnění komunikace mezi dvěma stranami (phishing, krádež komunikace)
  - *obrana:* TLS, ověřování certifikátů autorit
  ![[mitm.png|351]] 
- **Address resolution útok** ⇒ útočník manipuluje ARP tabulkami, aby přesměroval komunikující zařízení
  - jde o obdobu MITM; *obrana:* statické ARP, TLS šifrovaný provoz…

> **MITM proti Diffie-Hellmanu:** útočník (Charlie) se vloží mezi Alici a Boba a s každým ustaví vlastní DH klíč. Alice si myslí, že sdílí klíč $K_A = (g^{b^*})^a$ s Bobem, ale ve skutečnosti ho sdílí s Charliem, který zná $a^*, b^*$ a může komunikaci číst i měnit. Obranou je autentizace klíčů (certifikáty).

## Detekce a hodnocení

**CWE** (Common Weakness Enumeration) ⇒ záznamy běžných zranitelností; základ pro identifikaci zranitelností a jejich patchování.

**IDS** (Intrusion Detection System) ⇒ snaha o detekci útočníka v síti.

| Přístup IDS | Alarm spustí… | Pro / proti |
|---|---|---|
| **signature-based** (expert definuje škodlivé vzory) | událost odpovídá známým škodlivým vzorům | signatury z známých útoků; rychlé, přesné (méně false-positives); detekuje jen už známé útoky |
| **specification-based** (expert definuje povolené akce) | událost se odchyluje od specifikace povolených akcí dané aplikace | ručně vytvořená specifikace povoleného; umí detekovat nové útoky; nehlásí poplach na nově viděné povolené události; specifikace jsou závislé na protokolu / programu |
| **anomaly-based** (profil normálu naučený z dat) | událost se odchyluje od profilu normálního chování | potřebuje trénovací období pro vytvoření profilů; umí detekovat nové útoky; false-positives (abnormální může být neškodné); přesnost závisí na profilovaných příznacích |

**Hodnocení zabezpečení sítě** ⇒ hledání a prioritizace zranitelností v systému.

- aktivní monitoring vlastní sítě
- hledání slabin podle záznamů v CWE
- **penetration testing**: Kali Linux

# Bezpečné programování a vývoj SW

Základem je **defenzivní programování** ⇒ snaha být připraven na všechny možné chyby, které se nevyhnutelně někdy objeví. Cílí na dosud neznámé chyby.

- poskytovat nezabezpečený software může být protizákonné
- firmy vypisují finanční odměnu za nalezení bugů v produkci (**bug bounty**)

**Taxonomie chyb:**
- **Bug** ⇒ nechtěné chování programu.
- **Vulnerability** ⇒ zranitelnost; bug, který je dostupný útočníkovi (v systému, který má nějakou hodnotu).
- **Exploit** ⇒ nástroj, který bug zneužije a zároveň vykoná škodlivý kód (payload).
- **0-day** ⇒ zranitelnost, pro kterou ještě neexistuje záplata a není veřejně známá.

## Ochrana podle úrovně

- **ve zdrojovém kódu** ⇒ ověření vstupů (žádné `name = DROP ALL TABLES`), **sanitizace**
  - obrana proti **SQL injection** útoku
  - **Nikdy neimplementovat vlastní kryptografii** — vždy používat prověřené knihovny (např. Libsodium, OpenSSL).
- **testování** ⇒ dynamic checkers, **fuzzing**, code review, CWE (seznam kategorií slabin), **CVE** (databáze konkrétních známých zranitelností)
  - **fuzzing** ⇒ posílá do programu kvanta náhodných dat a sleduje, co se stane; výstupy analyzuje
- **compiler** ⇒ 
  - **Stack canary** — náhodná hodnota vložená před návratovou adresu na zásobníku, která se kontroluje proti přetečení (buffer overflow).
  - **CFI (Control Flow Integrity)** — omezuje platné cíle skoků programu (ochrana proti ROP útokům).
- **prostředí spuštění** ⇒ **DEP** (Data Execution Prevention, znemožní spustit kód ze zásobníku), **ASLR** (Address Space Layout Randomization, znáhodňuje adresní prostor paměti), **sandboxing**
- **development lifecycle**
  - **Microsoft Secure Development Lifecycle (SDL)**
  - ověřené a aktualizované knihovny (sledování závislostí, např. přes Dependabot)

## Bezpečnostní analýza

**Bezpečnostní analýza** se snaží odhalit zranitelnosti v designu aplikace.

- **Statická analýza** ⇒ odhaluje chyby na základě kódu — **Cppcheck**, **CodeQL**
- **Dynamická analýza** ⇒ zachytává chyby za běhu — **Valgrind**, sanitizers
  - evaluuje volání funkcí a paměť ⇒ vidí memory leaks, access violations, policy violations
  - **taint analysis** ⇒ zkoumá propagaci hodnot za běhu programu — detailní analýza
- **automatická analýza v gitu** ⇒ **CI** (Continuous Integration), **dependabot**

Příliš konzervativní analýzy mají riziko **false-positives**. Horší jsou **false-negatives** ⇒ nedetekované problémy.

**Častá rizika:** legacy code, cena opravy, zákazníci neupdatují, 3rd party libraries.

# Použitelná bezpečnost

**Použitelná bezpečnost** je balanc mezi využitelností a zabezpečením. Zaměřuje se na interakci lidí a systémů.

- základní princip: **Don't blame the user, improve the system** (neobviňuj uživatele, vylepši systém).
- **Usefulness = Utility + Usability** (použitelnost se skládá z kritérií: Learnability, Efficiency, Memorability, Errors a Satisfaction).
- bezpečnostní opatření musí být **user-friendly**, jinak je nikdo nebude chtít používat.

**Klíčové principy a problémy:**
- **Secure defaults:** Výchozí stav systému by měl být vždy ten nejbezpečnější. Snížení bezpečnosti musí vyžadovat explicitní snahu.
- **Habituation (habituace):** Zvykání si na opakující se podněty. Uživatelé mají tendenci častá varování ignorovat (automaticky klikají na "OK"). Řešením je omezit množství dialogů jen na ty skutečně důležité.
- **Passphrases vs. Hesla:** Dlouhé smysluplné fráze (passphrases) se pamatují lépe než složité shluky náhodných znaků a poskytují srovnatelnou nebo vyšší entropii vůči útoku hrubou silou.

Příklady v uživatelském rozhraní:
- **ověřování integrity dat** ⇒ vizuální hashe (např. unikátní avatar generovaný z hashe namísto porovnávání textových řetězců)
- implementace user-friendly **chybových hlášek** — např. srozumitelně popsaný expired certifikát u webové stránky, ikona zámku

### Impact pyramid

> Čím výše v softwarovém stacku (od koncových uživatelů přes administrátory, vývojáře aplikací a knihoven až po vývojáře OS), tím menší počet lidí, ale tím větší dopad jejich rozhodnutí. Použitelnost je proto **ještě důležitější pro IT profesionály** — jejich chyba se propaguje na všechny pod nimi.

![[impact-pyramid.png|379]]

## Guideline chybových hlášek

- **NEAT**
  - **Necessary** — je hláška nezbytná?
  - **Explained** — je chyba dostatečně vysvětlená?
  - **Actionable** — má uživatel všechny kroky vysvětlené?
  - **Tested** — je aplikace otestovaná na všechny scénáře?
- **SPRUCE** (jak hlášku formulovat)
  - **Source** — předat uživateli informaci o zdroji chyby
  - **Process** — dát uživateli postup
  - **Risk** — vysvětlit, co se může stát po výběru možnosti
  - **Unique Knowledge** — informace, kterou má uživatel
  - **Choices** — uvést seznam všech možností a jasně doporučit tu správnou
  - **Evidence** — zvýraznit informace pro uživatelovo rozhodnutí
