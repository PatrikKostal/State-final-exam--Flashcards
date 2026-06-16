// 10. Základy informační bezpečnosti (PV080)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.sec = { label: "🛡️ Informační bezpečnost", cls: "tag-sec", order: 21 };

FC.cards.push(
  { t: "sec",
    q: "Jaké jsou základní bezpečnostní funkce?",
    a: "<b>CIA + nepopiratelnost:</b><ul><li><b>Důvěrnost (Confidentiality)</b> – data vidí jen oprávnění (šifrování, řízení přístupu)</li><li><b>Integrita (Integrity)</b> – data nejsou neoprávněně změněna (haše, podpisy)</li><li><b>Dostupnost (Availability)</b> – služba je dostupná, když je třeba (zálohy, redundance)</li><li><b>Nepopiratelnost původu (Non-repudiation)</b> – původce nemůže popřít autorství (digitální podpis)</li></ul>" },

  { t: "sec",
    q: "Kdy použít symetrické a kdy asymetrické šifrování?",
    a: "<ul><li><b>Symetrické (AES)</b> – <b>rychlé</b>, vhodné na <b>velký objem dat / dlouhý soubor</b>; problém je bezpečně doručit klíč</li><li><b>Asymetrické (RSA)</b> – řeší <b>distribuci klíčů</b> a podpisy, ale je pomalé → použije se jen na malá data / přenos klíče</li></ul>V praxi <b>hybridně</b>: asymetricky se vymění symetrický klíč, jím se šifruje soubor." },

  { t: "sec",
    q: "Co je hašovací funkce a jaké má mít vlastnosti?",
    a: "<b>Funkce mapující libovolně dlouhý vstup na výstup pevné délky (otisk).</b> Kryptograficky má být:<ul><li><b>Jednosměrná</b> – z haše nelze získat vstup</li><li><b>Slabá bezkoliznost</b> – k danému vstupu těžko najít jiný se stejným hašem</li><li><b>Silná bezkoliznost</b> – těžko najít <b>jakékoli</b> dva vstupy se stejným hašem</li></ul>Příklady: <b>SHA-2/3</b> (bezpečné), <b>MD5, SHA-1</b> (prolomené). Funkce „vše→0\" je technicky haš, ale bezcenná (samé kolize)." },

  { t: "sec",
    q: "Jak funguje RSA a na čem stojí jeho bezpečnost?",
    a: "<b>Asymetrická šifra založená na obtížnosti faktorizace.</b><ul><li><b>Generování klíčů</b>: zvol prvočísla p, q; n = p·q; φ(n) = (p−1)(q−1); zvol e nesoudělné s φ(n); spočti d = e⁻¹ mod φ(n)</li><li><b>Veřejný klíč</b> (e, n), <b>soukromý</b> (d, n)</li><li>Šifrování: c = mᵉ mod n; dešifrování: m = cᵈ mod n</li></ul>Bezpečnost stojí na tom, že <b>faktorizace velkého n</b> (a tím získání d) je výpočetně neproveditelná." },

  { t: "sec",
    q: "Co jsou kryptografická primitiva?",
    a: "<b>Základní stavební bloky kryptografických protokolů:</b><ul><li><b>Symetrické šifry</b> (AES) – důvěrnost</li><li><b>Asymetrické šifry</b> (RSA, ECC) – distribuce klíčů, podpisy</li><li><b>Hašovací funkce</b> (SHA) – integrita</li><li><b>MAC / HMAC</b> – integrita + autenticita se sdíleným klíčem</li><li><b>Generátory náhodných čísel</b>, výměna klíčů (Diffie-Hellman)</li></ul>Z primitiv se skládají protokoly (TLS, podpisy)." },

  { t: "sec",
    q: "Co je řízení rizik (kvalitativní vs kvantitativní analýza)?",
    a: "<b>Proces identifikace, hodnocení a ošetření rizik (riziko ≈ hrozba × zranitelnost × dopad).</b><ul><li><b>Kvalitativní analýza</b> – slovní/relativní hodnocení (nízké/střední/vysoké), rychlá, subjektivní</li><li><b>Kvantitativní</b> – číselné vyjádření (např. <b>ALE = roční očekávaná ztráta</b> = pravděpodobnost × dopad v penězích)</li></ul>Ošetření: snížit, přenést (pojištění), přijmout, vyhnout se." },

  { t: "sec",
    q: "Co je bezpečnostní audit a co Common Criteria?",
    a: "<ul><li><b>Audit</b> – nezávislé ověření, že bezpečnostní opatření odpovídají politikám/standardům. <b>Interní</b> (vlastní zaměstnanci) vs <b>externí</b> (nezávislá strana, vyšší důvěryhodnost). Auditor sbírá důkazy, hodnotí, reportuje.</li><li><b>Common Criteria (ISO 15408)</b> – mezinárodní standard pro <b>hodnocení bezpečnosti produktů</b>; úrovně záruky <b>EAL1–EAL7</b>. Další standardy: <b>ISO/IEC 27001</b> (systém řízení bezpečnosti informací).</li></ul>" },

  { t: "sec",
    q: "Co znamená trustworthy vs trusted a Kerckhoffsův princip?",
    a: "<ul><li><b>Trusted</b> – systém, na který spoléháme (vkládáme důvěru)</li><li><b>Trustworthy</b> – systém, který si tu důvěru <b>objektivně zaslouží</b> (je opravdu bezpečný)</li></ul>To, že systému důvěřujeme, neznamená, že je bezpečný. <b>Kerckhoffsův princip</b>: bezpečnost musí stát na <b>utajení klíče, ne implementace</b> (umožní nezávislé ověření)." },

  { t: "sec",
    q: "Jaký je rozdíl mezi proudovou a blokovou šifrou?",
    a: "<ul><li><b>Proudová</b> – generuje pseudonáhodný <b>keystream</b>, XORuje s plaintextem po bitu/bajtu; rychlá pro proudy/neznámou délku (RC4). Riziko: opakované použití klíče.</li><li><b>Bloková</b> – šifruje po blocích, potřebuje <b>padding</b>; <b>DES</b> (56bit klíč, Feistelova síť), <b>3DES</b>, <b>AES</b> (128bit blok, klíče 128/192/256)</li></ul>Základem symetrické šifry je operace <b>XOR</b>." },

  { t: "sec",
    q: "Jaké jsou režimy blokové šifry (ECB, CBC, CTR)?",
    a: "<ul><li><b>ECB</b> – každý blok nezávisle; <b>nebezpečné</b> – stejný blok → stejný ciphertext (odhalí vzory)</li><li><b>CBC</b> – Cᵢ = E(Pᵢ ⊕ Cᵢ₋₁), C₀ = IV; blok závisí na předchozích, nelze paralelizovat</li><li><b>CTR</b> – šifruje čítač a XORuje s plaintextem; <b>paralelizovatelné</b>, předgenerování</li></ul><b>Nonce</b> (jednorázová hodnota / timestamp) předchází replay útokům." },

  { t: "sec",
    q: "Jak přesně funguje algoritmus RSA?",
    a: "<b>Generování klíčů:</b><ol><li>tajná prvočísla p, q; veřejné <b>N = p·q</b></li><li>veřejný exponent e: gcd(e, φ(N)) = 1</li><li>soukromý exponent <b>d ≡ e⁻¹ mod φ(N)</b></li></ol>Šifrování: <b>c = mᵉ mod N</b>; dešifrování: <b>m = cᵈ mod N</b>.<br>Bezpečnost stojí na obtížnosti <b>faktorizace</b> N. Veřejný klíč (N,e), soukromý (N,d). Klíče ~2048–4096 bitů." },

  { t: "sec",
    q: "Jaké vlastnosti musí mít hashovací funkce?",
    a: "<b>Převádí libovolně velký vstup na pevně dlouhý otisk (jednosměrně), zajišťuje integritu.</b><ul><li><b>Lavinový efekt</b> – změna 1 bitu vstupu změní ≥ 50 % výstupu</li><li><b>Bezkoliznost</b> – těžko najít dva vstupy se stejným hashem (kolizi nelze nikdy 100% vyloučit – nekonečný def. obor)</li></ul>Příklady: <b>SHA-256</b> (bezpečné), MD5/SHA-1 (prolomené)." },

  { t: "sec",
    q: "Jak funguje digitální podpis (signing a verification)?",
    a: "<ul><li><b>Signing</b>: spočítej hash dat → zašifruj ho <b>privátním klíčem</b> = podpis → přilož k datům</li><li><b>Verification</b>: dešifruj podpis <b>veřejným klíčem</b>, sám spočítej hash dat, porovnej</li></ul>Zajišťuje <b>autenticitu, integritu, nepopiratelnost</b>. Implementace: RSA, <b>DSA</b>." },

  { t: "sec",
    q: "Co je MAC a jak ho lze kombinovat se šifrováním?",
    a: "<b>MAC (Message Authentication Code) – otisk zprávy pevné délky vytvořený SDÍLENÝM symetrickým klíčem; integrita + autenticita.</b><ul><li><b>HMAC</b> (hash + klíč), <b>CMAC</b> (bloková šifra)</li></ul>Kombinace:<ul><li><b>Encrypt-then-MAC</b> – nejbezpečnější (integrita ciphertextu)</li><li><b>MAC-then-encrypt</b> (TLS), <b>Encrypt-and-MAC</b> (SSH)</li><li><b>AEAD</b> – autentizované šifrování s asociovanými daty</li></ul>" },

  { t: "sec",
    q: "Jak funguje protokol Diffie-Hellman a Station-to-Station?",
    a: "<b>Diffie-Hellman – ustaví sdílený symetrický klíč přes nezabezpečený kanál.</b><ul><li>Veřejné p (prvočíslo), g (primitivní kořen); každá strana zvolí tajné a/b</li><li>Sdílený klíč: (gᵃ mod p)ᵇ = (gᵇ mod p)ᵃ mod p</li><li>Bezpečnost: obtížnost <b>diskrétního logaritmu</b></li></ul>Sám DH je zranitelný na <b>MitM</b> → <b>STS (Station-to-Station)</b> = autentizované DH s podpisy." },

  { t: "sec",
    q: "Jak funguje Kerberos?",
    a: "<b>Autentizační protokol se symetrickou šifrou a KDC (Key Distribution Center).</b><ol><li>Z hesla se odvodí <b>Secret Key</b></li><li>Klient → AS (Authentication Service) → dostane <b>Session Key</b> + <b>TGT (Ticket-Granting Ticket)</b></li><li>S TGT žádá <b>TGS</b> o <b>Service Ticket</b> pro konkrétní službu</li><li>Service Ticket + autentifikátor → server ověří klienta</li></ol>Umožňuje single sign-on a vzájemnou autentizaci." },

  { t: "sec",
    q: "Jaké jsou fáze TLS a co je forward secrecy?",
    a: "<b>TLS (následník SSL) – integrita, důvěrnost, autentizace; mezi L4 a L7.</b><ol><li><b>Handshake</b> – dohoda na algoritmech + autentizace certifikáty</li><li><b>Výměna klíčů</b> – veřejným klíčem / DH</li><li><b>Šifrování provozu</b> symetrickou šifrou</li></ol><b>Forward secrecy</b> (s DH): prozrazení soukromého klíče serveru v budoucnu <b>neumožní</b> dešifrovat dříve zaznamenané relace." },

  { t: "sec",
    q: "Jak se počítá riziko a jaké jsou metody hodnocení rizik?",
    a: "<b>Riziko R = P · V · C</b> (Probability × Vulnerability × Cost).<ul><li>Identifikace: aktiva (assets), hrozby (threats), zranitelnosti (vulnerabilities)</li><li><b>Kvalitativní</b> – třídy závažnosti, risk rating</li><li><b>Kvantitativní</b> – <b>ALE (Annual Loss Expectancy)</b> z historických dat</li></ul>Ošetření: snížit, přenést, přijmout, vyhnout se." },

  { t: "sec",
    q: "Co je BCP, RPO a RTO?",
    a: "<b>BCP (Business Continuity Planning)</b> – preventivní a reaktivní opatření před útokem a při obnově.<ul><li><b>RPO (Recovery Point Objective)</b> – maximální přípustná <b>ztráta dat</b> (pohled do minulosti – o kolik dat přijdeme)</li><li><b>RTO (Recovery Time Objective)</b> – maximální přípustný <b>čas výpadku</b> (pohled do budoucnosti – jak dlouho může trvat obnova)</li></ul>" },

  { t: "sec",
    q: "Co je ISO/IEC 27000, ISMS a cyklus PDCA?",
    a: "<b>ISO/IEC 27000 – souhrn best-practice pro řízení informační bezpečnosti.</b><ul><li><b>ISMS (Information Security Management System)</b> – systém řízení</li><li><b>PDCA cyklus</b>: <b>Plan</b> (politika a cíle) → <b>Do</b> (implementace) → <b>Check</b> (měření, reporting) → <b>Act</b> (náprava, zlepšování)</li></ul>ISO 27001 je certifikovatelná norma." },

  { t: "sec",
    q: "Jaké jsou metody hodnocení bezpečnosti (pentest, vulnerability assessment)?",
    a: "<ul><li><b>Penetrační testování</b> – simulace útoků pro nalezení zranitelností (Kali Linux)</li><li><b>Vulnerability Assessment</b> – systematické prohledání a klasifikace zranitelností (databáze <b>CWE</b>)</li><li><b>Bezpečnostní audit</b> – formální ověření shody s normami</li></ul><b>SecOps</b> – propojení bezpečnostních a provozních týmů, monitoring, reakce na incidenty." },

  { t: "sec",
    q: "Jak funguje SSH a z jakých protokolů se skládá?",
    a: "<b>SSH – zabezpečený kanál pro vzdálený terminál (náhrada telnetu).</b><ul><li><b>Transport layer protocol</b> – autentizace serveru, ustavení klíčů, šifrování, integrita</li><li><b>User authentication protocol</b> – klient se ověří (heslo, veřejný klíč, Kerberos)</li><li><b>Connection protocol</b> – jedno spojení pro více účelů (multiplexing)</li></ul>" },

  { t: "sec",
    q: "Jak se zajišťují jednotlivé bezpečnostní funkce?",
    a: "<ul><li><b>Důvěrnost</b> – <b>šifrování</b></li><li><b>Integrita</b> – hash (proti útočníkovi), detekční kódy (proti chybám techniky)</li><li><b>Dostupnost</b> – zálohy, redundance, odolnost vůči útokům</li><li><b>Nepopiratelnost</b> – digitální podpis, logy</li></ul><b>Autentizace</b> (ověření identity) předchází <b>autorizaci</b> (přidělení oprávnění) – nelze přidělovat práva neověřené entitě." },

  { t: "sec",
    q: "Proč je symetrické šifrování rychlejší než asymetrické?",
    a: "<ul><li><b>Kratší klíče</b> (128–256 bitů vs ~2048–4096 u asymetrického)</li><li>Využívá <b>bitové operace</b> (XOR, posuny) → umožňuje <b>hardwarovou akceleraci</b> (AES instrukce v CPU)</li></ul>Asymetrické počítá <b>modulární mocnění velkých čísel</b> – výpočetně drahé. Proto se v praxi <b>hybridně</b>: asymetricky se vymění symetrický klíč relace." },

  { t: "sec",
    q: "Co je PRNG, nonce a AEAD?",
    a: "<ul><li><b>PRNG (Pseudo-Random Number Generator)</b> – deterministicky generuje zdánlivě náhodná čísla (Mersenne Twister); pro kryptografii nutný <b>CSPRNG</b></li><li><b>Nonce</b> – jednorázová hodnota (timestamp/čítač) proti <b>replay útokům</b></li><li><b>AEAD (Authenticated Encryption with Associated Data)</b> – šifrování + integrita ciphertextu i plaintextu v jednom (GCM)</li></ul>" },

  { t: "sec",
    q: "Proč je režim ECB nebezpečný a CBC/CTR lepší?",
    a: "<b>ECB šifruje každý blok nezávisle → stejný blok plaintextu dá stejný ciphertext</b> → odhalí <b>vzory</b> (slavný „šifrovaný tučňák\" je stále rozpoznatelný).<ul><li><b>CBC</b> – řetězí bloky přes XOR s předchozím + IV → stejné bloky dají různý ciphertext</li><li><b>CTR</b> – šifruje čítač → paralelizovatelné a bez vzorů</li></ul>" },

  { t: "sec",
    q: "Jaký je vztah mezi MAC a digitálním podpisem?",
    a: "<ul><li><b>MAC</b> – integrita + autenticita pomocí <b>sdíleného symetrického klíče</b> (rychlé, ale obě strany znají klíč → <b>nepopiratelnost NE</b>)</li><li><b>Digitální podpis</b> – privátní/veřejný klíč → navíc <b>nepopiratelnost</b> (jen majitel privátního klíče mohl podepsat)</li></ul>MAC je rychlejší, podpis poskytuje silnější záruky." }
);
