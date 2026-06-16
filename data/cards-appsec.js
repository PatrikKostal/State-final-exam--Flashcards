// 11. Vývoj bezpečných aplikací (PV080)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.appsec = { label: "🔏 Vývoj bezpečných aplikací", cls: "tag-appsec", order: 22 };

FC.cards.push(
  { t: "appsec",
    q: "Jaký je rozdíl mezi autentizací a autorizací?",
    a: "<ul><li><b>Autentizace</b> – ověření <b>„kdo jsi\"</b> (prokázání identity)</li><li><b>Autorizace</b> – rozhodnutí <b>„co smíš\"</b> (jaká práva má ověřená identita)</li></ul>Autentizace předchází autorizaci. <b>Identita</b> = soubor atributů entity; <b>částečná identita</b> = podmnožina atributů pro daný kontext." },

  { t: "appsec",
    q: "Jaké jsou formy autentizace?",
    a: "<b>Tři faktory – „něco, co...\":</b><ul><li><b>znáš</b> – heslo, PIN</li><li><b>máš</b> – token, čipová karta, mobil</li><li><b>jsi</b> – biometrika (otisk, obličej)</li></ul><b>Vícefaktorová autentizace (MFA)</b> kombinuje více faktorů → vyšší bezpečnost. Hesla je třeba ukládat <b>hašovaná se solí</b> (bcrypt/argon2)." },

  { t: "appsec",
    q: "Co je ACL a jaké jsou formy řízení přístupu?",
    a: "<ul><li><b>ACL (Access Control List)</b> – seznam u objektu, kdo a jaká práva k němu má</li></ul>Modely řízení přístupu:<ul><li><b>DAC</b> (Discretionary) – o právech rozhoduje <b>vlastník</b> objektu (unixová práva)</li><li><b>MAC</b> (Mandatory) – práva vynucuje <b>systém</b> podle politiky/klasifikace (vojenské, SELinux)</li><li><b>RBAC</b> (Role-Based) – práva podle <b>rolí</b> uživatele</li><li><b>ABAC</b> – podle atributů</li></ul>" },

  { t: "appsec",
    q: "Co je LDAP?",
    a: "<b>Lightweight Directory Access Protocol – protokol pro přístup k adresářovým službám.</b><ul><li><b>Hierarchická databáze</b> objektů (uživatelé, skupiny, počítače) ve stromu</li><li>Slouží k <b>centrální správě identit a autentizaci</b> (např. Active Directory)</li><li>Aplikace ověřují uživatele dotazem na LDAP server</li></ul>" },

  { t: "appsec",
    q: "Jaké jsou koncepty ochrany soukromí?",
    a: "<ul><li><b>Anonymita</b> – subjekt nelze identifikovat ve skupině</li><li><b>Pseudonymita</b> – jednání pod pseudonymem (lze případně propojit s identitou)</li><li><b>Nespojitelnost (unlinkability)</b> – nelze propojit dvě akce téhož subjektu</li><li><b>Nepozorovatelnost (unobservability)</b> – nelze ani zjistit, že akce proběhla</li></ul>" },

  { t: "appsec",
    q: "Jaké jsou typické síťové útoky a jak se jim předchází?",
    a: "<ul><li><b>DoS / DDoS</b> – zahlcení služby (z mnoha zdrojů) → nedostupnost; obrana: filtrace, rate-limiting, CDN</li><li><b>ARP spoofing / MitM</b> – útočník se vloží mezi komunikaci; obrana: šifrování (TLS), statické ARP, detekce</li><li><b>ICMP flooding</b>, replay útoky</li></ul>Obecná obrana: šifrování, autentizace, firewally, IDS/IPS, aktualizace, segmentace sítě." },

  { t: "appsec",
    q: "Co je challenge-response autentizace a replay útok?",
    a: "<ul><li><b>Challenge-response</b> – server pošle <b>náhodnou výzvu (nonce)</b>, klient odpoví hodnotou závislou na výzvě a tajemství (heslo/klíč). <b>Heslo neputuje po síti</b>.</li><li><b>Replay útok</b> – útočník odposlechne platnou zprávu a <b>znovu ji přehraje</b>. Challenge-response s <b>jednorázovým nonce / časovým razítkem</b> tomu brání (stará odpověď už neplatí).</li></ul>" },

  { t: "appsec",
    q: "Co je bezpečné programování a jaké nástroje analýzy software známe?",
    a: "<ul><li><b>Bezpečné programování</b> – validace vstupů, ochrana proti injection (SQL, XSS), bezpečná práce s pamětí, princip nejmenších oprávnění, ošetření chyb</li><li><b>Statická analýza (SAST)</b> – kontrola <b>zdrojového kódu bez spuštění</b> (lintery, SonarQube, Coverity)</li><li><b>Dynamická analýza (DAST)</b> – test <b>za běhu</b> (fuzzing, penetrační testy, sanitizery)</li></ul>" },

  { t: "appsec",
    q: "Co je použitelná bezpečnost (usable security)?",
    a: "<b>Vyvažování bezpečnosti a použitelnosti – bezpečné systémy musí být i použitelné, jinak je uživatelé obcházejí.</b><ul><li>Faktory použitelnosti: <b>naučitelnost (learnability), zapamatovatelnost (memorability), efektivita (efficiency)</b>, malá chybovost</li><li>Příklad: příliš složitá pravidla na hesla → uživatelé si je píší na papírky (nižší reálná bezpečnost)</li></ul>" },

  { t: "appsec",
    q: "Co je identita a částečná identita?",
    a: "<ul><li><b>Identita</b> – podmnožina atributů dostačující k identifikaci v rámci množiny osob; jedna osoba má <b>více identit</b> podle kontextu</li><li><b>Částečná identita</b> – váže se k <b>rolím</b> (množině uživatelů)</li></ul>Atributy: doménové (škola, stát), funkční (lokalita), časově závislé. <b>Identity management</b> spravuje přístupy a role (princip <b>default-deny</b>: co není povoleno, je zakázáno)." },

  { t: "appsec",
    q: "Jaké jsou modely řízení přístupu (RBAC, MAC, DAC)?",
    a: "<ul><li><b>RBAC (Role-Based)</b> – oprávnění podle <b>rolí</b> (správce, vlastník)</li><li><b>MAC (Mandatory)</b> – přístup řídí centrální <b>politika/tagy</b> (klasifikované informace, SELinux)</li><li><b>DAC (Discretionary)</b> – práva uděluje <b>vlastník zdroje</b> (sdílení Google dokumentu)</li></ul>" },

  { t: "appsec",
    q: "Jaké jsou koncepty ochrany soukromí (anonymita, pseudonymita, nespojitelnost, nepozorovatelnost)?",
    a: "<b>Vždy vůči nějakému datasetu:</b><ul><li><b>Anonymita</b> – použití bez odhalení identity (obtížně dosažitelné)</li><li><b>Pseudonymita</b> – anonymní mezi uživateli, ale identita dohledatelná (odpovědnost za činy)</li><li><b>Nespojitelnost (unlinkability)</b> – akce nelze zpětně přiřadit strůjci</li><li><b>Nepozorovatelnost (unobservability)</b> – nelze ani zjistit, že akce proběhla</li></ul>" },

  { t: "appsec",
    q: "Jaké metody zajišťují anonymitu (Mix Networks, TOR)?",
    a: "<ul><li><b>Mix Networks (Chaum)</b> – fiktivní provoz (dummy traffic) + neoptimální směrování → ztíží analýzu provozu</li><li><b>Onion Routing / TOR</b> – <b>vrstvené šifrování</b>, každý uzel dešifruje jednu vrstvu; interaktivní anonymita v reálném čase</li><li><b>Anonymizing remailers</b> – odstraní hlavičky e-mailu (store-and-forward)</li></ul>" },

  { t: "appsec",
    q: "Co definuje Common Criteria (TOE, TSF, TSC)?",
    a: "<b>Standard pro hodnocení a certifikaci bezpečnosti systémů (nezávislé laboratoře).</b><ul><li><b>TOE (Target Of Evaluation)</b> – hodnocený produkt/systém</li><li><b>TSF (TOE Security Functions)</b> – bezpečnostní funkcionalita (šifrování, autentizace, řízení přístupu)</li><li><b>TSC (TSF Scope of Control)</b> – rozsah a technické požadavky</li></ul>Záruka EAL1–EAL7." },

  { t: "appsec",
    q: "Co je GDPR a eIDAS?",
    a: "<ul><li><b>GDPR (2016)</b> – nařízení EU o ochraně soukromí; osobní data = vše, co může vést k <b>de-anonymizaci</b>; limituje agregaci dat, sankce</li><li><b>eIDAS</b> – framework pro elektronickou identifikaci; úrovně podpisů: <b>electronic</b> → <b>advanced</b> (certifikát) → <b>qualified</b> (eID, právně = vlastnoruční podpis)</li></ul>" },

  { t: "appsec",
    q: "Jaké jsou typy DDoS útoků (direct, reflection, amplification)?",
    a: "<b>DDoS – přetížení služby velkým množstvím požadavků.</b><ul><li><b>Direct</b> – botnet posílá požadavky přímo na cíl</li><li><b>Reflection</b> – útočník <b>podvrhne zdrojovou IP</b> (oběti), legitimní server pošle odpověď oběti</li><li><b>Amplification</b> – malý dotaz vyvolá <b>nepoměrně velkou odpověď</b> (DNS), násobí sílu</li></ul>Obrana: filtrování, caching, rate-limiting." },

  { t: "appsec",
    q: "Jaké jsou další síťové útoky (replay, downgrade, padding, MITM)?",
    a: "<ul><li><b>Replay</b> – znovuzaslání zachycené platné zprávy (obrana: timestamp, nonce)</li><li><b>Dictionary / brute force</b> – zkoušení hesel (obrana: dlouhá hesla, MFA, limit pokusů)</li><li><b>Downgrade</b> – vynucení starší zranitelné verze protokolu</li><li><b>Padding útok</b> – chyba v paddingu odhalí klíč</li><li><b>MITM / ARP spoofing</b> – vložení mezi komunikaci (obrana: TLS, certifikáty, statické ARP)</li></ul>" },

  { t: "appsec",
    q: "Jaký je rozdíl mezi aktivním a pasivním monitoringem?",
    a: "<ul><li><b>Aktivní</b> – vysílá sondy, pinguje, hledá otevřené porty (<b>Nmap</b>); efektivní, ale <b>zjistitelný</b></li><li><b>Pasivní</b> – jen sleduje tok bez účasti, hledá anomálie (<b>Wireshark</b>, Snort); méně efektivní, ale nenápadný</li></ul>" },

  { t: "appsec",
    q: "Jaké jsou přístupy IDS (signature, specification, anomaly)?",
    a: "<b>IDS (Intrusion Detection System) – detekce útočníka v síti.</b><ul><li><b>Signature-based</b> – alarm na známé škodlivé vzory; rychlé, přesné, ale jen <b>známé</b> útoky</li><li><b>Specification-based</b> – alarm na odchylku od povolených akcí; detekuje nové útoky</li><li><b>Anomaly-based</b> – alarm na odchylku od naučeného profilu normálu; detekuje nové, ale více <b>false-positives</b></li></ul>" },

  { t: "appsec",
    q: "Jaký je rozdíl mezi bug, vulnerability, exploit a 0-day?",
    a: "<ul><li><b>Bug</b> – nechtěné chování programu</li><li><b>Vulnerability</b> – zranitelnost (bug dostupný útočníkovi v hodnotném systému)</li><li><b>Exploit</b> – nástroj, který zneužije bug a vykoná payload</li><li><b>0-day</b> – zranitelnost bez existující záplaty, není veřejně známá</li></ul><b>CWE</b> = kategorie slabin, <b>CVE</b> = databáze konkrétních známých zranitelností." },

  { t: "appsec",
    q: "Jaké jsou compiler a runtime ochrany (canary, DEP, ASLR, CFI)?",
    a: "<ul><li><b>Stack canary</b> – náhodná hodnota před návratovou adresou; kontrola proti <b>buffer overflow</b></li><li><b>CFI (Control Flow Integrity)</b> – omezuje cíle skoků (ochrana proti ROP)</li><li><b>DEP</b> – znemožní spustit kód ze zásobníku</li><li><b>ASLR</b> – znáhodňuje rozložení adresního prostoru</li><li><b>Sandboxing</b> – izolace běhu</li></ul>" },

  { t: "appsec",
    q: "Jak se chrání zdrojový kód (SQL injection, fuzzing)?",
    a: "<ul><li><b>Sanitizace / validace vstupů</b> – obrana proti <b>SQL injection</b> (parametrizované dotazy, ne <code>name = 'DROP TABLE'</code>)</li><li><b>Nikdy si neimplementuj vlastní kryptografii</b> – používej prověřené knihovny (Libsodium, OpenSSL)</li><li><b>Fuzzing</b> – posílá programu kvanta náhodných dat a sleduje pády/anomálie</li></ul>" },

  { t: "appsec",
    q: "Jaký je rozdíl mezi statickou a dynamickou analýzou a false positive/negative?",
    a: "<ul><li><b>Statická (SAST)</b> – analýza <b>kódu bez spuštění</b> (Cppcheck, CodeQL)</li><li><b>Dynamická (DAST)</b> – chyby <b>za běhu</b> (Valgrind, sanitizers); <b>taint analysis</b> sleduje propagaci hodnot</li></ul><b>False positive</b> – falešný poplach (otravné); <b>false negative</b> – <b>nedetekovaná</b> zranitelnost (horší!). Automatizace přes CI, Dependabot." },

  { t: "appsec",
    q: "Jaké jsou principy použitelné bezpečnosti (secure defaults, habituation, passphrases)?",
    a: "<b>Usefulness = Utility + Usability; \"Don't blame the user, improve the system\".</b><ul><li><b>Secure defaults</b> – výchozí stav je nejbezpečnější, snížení vyžaduje explicitní akci</li><li><b>Habituation</b> – uživatelé si zvyknou ignorovat časté dialogy (klikají OK) → omezit varování</li><li><b>Passphrases</b> – dlouhé smysluplné fráze se pamatují líp a mají vyšší entropii než náhodné znaky</li></ul>" },

  { t: "appsec",
    q: "Co jsou guidelines pro chybové hlášky NEAT a SPRUCE?",
    a: "<b>NEAT</b> (kdy hlášku ukázat):<ul><li><b>N</b>ecessary, <b>E</b>xplained, <b>A</b>ctionable, <b>T</b>ested</li></ul><b>SPRUCE</b> (jak formulovat):<ul><li><b>S</b>ource, <b>P</b>rocess, <b>R</b>isk, <b>U</b>nique knowledge, <b>C</b>hoices (s doporučením), <b>E</b>vidence</li></ul><b>Impact pyramid</b>: čím výš ve stacku (vývojáři OS), tím méně lidí, ale větší dopad → použitelnost je pro profesionály ještě důležitější." }
);
