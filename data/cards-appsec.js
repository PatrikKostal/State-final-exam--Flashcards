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
    a: "<b>Vyvažování bezpečnosti a použitelnosti – bezpečné systémy musí být i použitelné, jinak je uživatelé obcházejí.</b><ul><li>Faktory použitelnosti: <b>naučitelnost (learnability), zapamatovatelnost (memorability), efektivita (efficiency)</b>, malá chybovost</li><li>Příklad: příliš složitá pravidla na hesla → uživatelé si je píší na papírky (nižší reálná bezpečnost)</li></ul>" }
);
