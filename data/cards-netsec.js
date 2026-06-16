// 9. Síťové aplikace a jejich bezpečnost (PB156)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.netsec = { label: "🔐 Síťové aplikace a bezpečnost", cls: "tag-netsec", order: 20 };

FC.cards.push(
  { t: "netsec",
    q: "Jaké jsou mailové protokoly a jak fungují?",
    a: "<ul><li><b>SMTP</b> (port 25/587) – <b>odesílání</b> a přenos pošty mezi servery (push)</li><li><b>POP3</b> (110/995) – <b>stažení</b> pošty z serveru na klienta (typicky smaže ze serveru)</li><li><b>IMAP4</b> (143/993) – přístup k poště <b>ponechané na serveru</b>, synchronizace více zařízení</li></ul>Klient odesílá přes SMTP, čte přes POP3/IMAP." },

  { t: "netsec",
    q: "Jaké jsou protokoly pro přenos souborů a jejich zabezpečené varianty?",
    a: "<ul><li><b>FTP</b> – přenos souborů, <b>nešifrovaný</b> (heslo i data v plaintextu), používá řídicí a datový kanál</li><li><b>FTPS</b> – FTP přes <b>TLS/SSL</b> (šifrovaná nadstavba FTP)</li><li><b>SFTP</b> – úplně <b>jiný protokol</b> přes <b>SSH</b> (port 22), ne příbuzný FTP</li></ul>" },

  { t: "netsec",
    q: "Jak funguje DNS?",
    a: "<b>Domain Name System – překlad doménových jmen na IP adresy.</b><ul><li><b>Hierarchický jmenný prostor</b>: kořen → <b>TLD</b> (.cz, .com) → doména 2. řádu → subdomény</li><li><b>Rekurzivní/iterativní dotazování</b> přes systém serverů; výsledky se <b>cachují</b> (TTL)</li><li><b>Registrátoři</b> spravují registrace domén pod TLD</li></ul>Běží primárně přes UDP (port 53)." },

  { t: "netsec",
    q: "Co je QoS a jak se řídí tok dat?",
    a: "<b>Quality of Service – zajištění kvality přenosu</b> (šířka pásma, zpoždění, jitter, ztrátovost) pro citlivé aplikace (VoIP, video).<ul><li><b>Token Bucket</b> – povolí nárazy do velikosti „kbelíku\" tokenů (řídí průměrnou rychlost)</li><li><b>Leaky Bucket</b> – vyhladí tok na konstantní rychlost</li><li><b>WRED</b> – preventivní zahazování paketů při hrozícím zahlcení</li></ul>" },

  { t: "netsec",
    q: "Jaký je rozdíl mezi symetrickým a asymetrickým šifrováním a co je hybridní?",
    a: "<ul><li><b>Symetrické</b> – stejný klíč pro šifrování i dešifrování, <b>rychlé</b>, problém s distribucí klíče. Příklady: <b>AES, DES, 3DES</b></li><li><b>Asymetrické</b> – pár <b>veřejný/soukromý klíč</b>, řeší distribuci, ale <b>pomalé</b>. Příklad: <b>RSA</b></li><li><b>Hybridní</b> – asymetricky se bezpečně přenese <b>symetrický klíč relace</b>, samotná data se pak šifrují rychlým symetrickým algoritmem (TLS, PGP)</li></ul>" },

  { t: "netsec",
    q: "Jak fungují digitální podpisy? Je rychlejší podpis nebo šifrování?",
    a: "<b>Podpis = zašifrování haše zprávy soukromým klíčem odesílatele.</b><ul><li>Příjemce ověří <b>veřejným klíčem</b> → zaručí <b>autenticitu, integritu, nepopiratelnost</b></li><li>Podepisuje se <b>haš</b> (krátký), ne celá zpráva → efektivní</li></ul>Podpis i ověření jsou asymetrické operace; ověření veřejným klíčem (malý exponent u RSA) bývá <b>rychlejší</b> než podepisování soukromým klíčem." },

  { t: "netsec",
    q: "Jak se zabezpečují jednotlivé protokolové vrstvy (IPSec, TLS)?",
    a: "<ul><li><b>Aplikační vrstva</b> – PGP/S-MIME (e-mail), HTTPS</li><li><b>Transportní</b> – <b>TLS/SSL</b> (šifruje TCP spojení, používá hybridní šifrování a certifikáty)</li><li><b>Síťová</b> – <b>IPSec</b> (šifrování/autentizace IP paketů, základ <b>VPN</b>); režimy transport a tunnel</li></ul>Nižší vrstva = transparentní pro aplikace, vyšší = jemnější kontrola." },

  { t: "netsec",
    q: "Co je VPN a co je PGP?",
    a: "<ul><li><b>VPN (Virtual Private Network)</b> – vytvoří <b>šifrovaný tunel</b> přes veřejný internet, takže vzdálený uzel vystupuje jako v lokální síti. Zajišťuje důvěrnost a integritu (často přes IPSec/WireGuard/OpenVPN).</li><li><b>PGP</b> – zabezpečení e-mailu hybridním šifrováním + digitální podpisy; využívá <b>web of trust</b> pro důvěru ve veřejné klíče</li></ul>" },

  { t: "netsec",
    q: "Jaké jsou typy P2P sítí a co je překryvová síť?",
    a: "<b>P2P = překryvová (overlay) síť nad fyzickou infrastrukturou; peer je klient i poskytovatel zdrojů.</b><ul><li><b>Centralizované</b> – centrální server pro vyhledávání (špatně škáluje)</li><li><b>Decentralizované</b> – žádný server, odolné vůči single-point-of-failure</li><li><b>Hybridní</b> – někteří peeři jsou <b>super-peers</b></li></ul>Data: <b>nestrukturovaná</b> (každý drží své) vs <b>strukturovaná</b> (DHT – distribuovaná hašovací tabulka)." },

  { t: "netsec",
    q: "Jak funguje HTTP a co obsahuje URL?",
    a: "<ul><li><b>HTTP</b> – přístup k datům na WWW, přenáší HTML (rozšíření <b>MIME</b> pro soubory/média), přes <b>TCP port 80</b> (request-response)</li><li><b>URL</b>: <code>method://host:port/path</code></li></ul>WWW dokumenty: <b>statické</b> (pevný HTML), <b>dynamické</b> (generované, CGI), <b>aktivní</b> (běží na klientovi). HTTPS = HTTP přes TLS." },

  { t: "netsec",
    q: "Jak je strukturovaný DNS a jak probíhá vyhodnocení dotazu?",
    a: "<b>Hierarchický jmenný prostor (invertovaný strom rozdělený do zón).</b><ul><li><b>Root zóna</b> = 13 serverů; pod ní TLD (.cz, .com), pak domény 2. řádu</li><li>Každou zónu spravuje jiný server (autoritativní)</li></ul>Vyhodnocení <code>cs.ucla.edu</code>: dotaz jde <b>root → TLD (edu) → autoritativní (ucla.edu)</b> → finální IP. Výsledky se cachují (TTL), běží přes UDP port 53." },

  { t: "netsec",
    q: "Jak funguje e-mail (MUA, MSA, MTA, MDA)?",
    a: "<ol><li><b>MUA (Mail User Agent)</b> = klient → předá zprávu přes <b>SMTP</b> (port 25) lokálnímu serveru (MSA)</li><li><b>MTA (Mail Transfer Agent)</b> doručí SMTP zprávu cílovému mailserveru</li><li><b>MDA (Mail Delivery Agent)</b> spravuje schránky; příjemce čte přes <b>POP3/IMAP</b></li></ol>E-mail = obálka (adresy) + zpráva; adresa <code>local@domain</code>." },

  { t: "netsec",
    q: "Jaký je rozdíl mezi POP3 a IMAP?",
    a: "<table><tr><td><b>POP3</b></td><td><b>IMAP</b></td></tr><tr><td>1 klient</td><td>více klientů</td></tr><tr><td>offline</td><td>vyžaduje připojení</td></tr><tr><td>stáhne lokálně</td><td>nechá na serveru (cache)</td></tr><tr><td>maže ze serveru</td><td>pamatuje stav (přečteno…)</td></tr></table>" },

  { t: "netsec",
    q: "Jaké jsou typy QoS a jak se plánuje fronta (scheduling)?",
    a: "<ul><li><b>Best-effort</b> – bez QoS (IP)</li><li><b>Differentiated Services</b> – pakety značeny do tříd, bezstavové</li><li><b>Integrated Services</b> – rezervace zdrojů po cestě, stavové (hůře škáluje)</li></ul>Scheduling: <b>FIFO</b>, <b>Priority Queuing</b> (podle tříd), <b>Weighted Fair Queuing</b> (časová okna podle vah, round-robin)." },

  { t: "netsec",
    q: "Jak fungují Leaky Bucket, Token Bucket a RED/WRED?",
    a: "<ul><li><b>Leaky Bucket</b> – vyhladí tok na <b>konstantní</b> rychlost (děravý kýbl), bursty zahazuje</li><li><b>Token Bucket</b> – hromadí tokeny při nečinnosti → povolí <b>omezené bursty</b></li><li><b>RED</b> – při zaplňování fronty náhodně zahazuje pakety (předchází globální synchronizaci); <b>WRED</b> zohledňuje prioritu paketu</li></ul>" },

  { t: "netsec",
    q: "Co je vzorkování a kvantování při zpracování multimédií?",
    a: "<ul><li><b>Vzorkování (sampling)</b> – osa X (čas): v diskrétních intervalech se odečte hodnota spojitého signálu</li><li><b>Kvantování</b> – osa Y (hodnota): naměřená hodnota se zaokrouhlí na nejbližší povolenou úroveň</li><li><b>Komprese</b> – převod na úspornější formát</li></ul>" },

  { t: "netsec",
    q: "Co je firewall a jak se liší L3 a L7 firewall?",
    a: "<b>Řídí provoz mezi sítěmi s různou úrovní důvěry podle pravidel.</b><ul><li><b>L3/L4 firewall</b> – filtruje podle <b>IP adres a portů</b> (rychlý, jako router; např. ufw/iptables)</li><li><b>L7 (aplikační) firewall</b> – analyzuje <b>obsah paketů</b> (malware, hrozby), pokročilá pravidla</li><li><b>Proxy / aplikační brána</b> – zcela odděluje sítě dvěma spojeními (NAT), vysoké zabezpečení, ale pomalé</li></ul>" },

  { t: "netsec",
    q: "Co jsou bezpečnostní funkce sítě (AAA + CIA)?",
    a: "<ul><li><b>Autentizace</b> – ověření identity (heslo, klíč, biometrika)</li><li><b>Autorizace</b> – oprávnění použít zdroj</li><li><b>Accounting</b> – sledování využití/akcí</li><li><b>Důvěrnost</b> (šifrování), <b>Integrita</b>, <b>Nepopiratelnost</b></li></ul>(První tři = <b>AAA</b>.)" },

  { t: "netsec",
    q: "Co je certifikát a certifikační autorita (CA)?",
    a: "<b>Protože je veřejný klíč dostupný všem, je třeba ověřit, komu patří.</b><ul><li><b>Certifikát</b> obsahuje jméno vlastníka, veřejný klíč, dobu platnosti a <b>podpis vydavatele</b></li><li><b>Certifikační autorita (CA)</b> – důvěryhodná organizace, která certifikáty vydává a podepisuje</li></ul>Riziko: důvěra k mnoha předinstalovaným CA, podepsaný ≠ důvěryhodný (kdo ho vydal?)." },

  { t: "netsec",
    q: "Jak řeší autentizace problém čerstvosti (nonce)?",
    a: "<ul><li><b>Autentizace heslem</b> (šifrovaným sdíleným klíčem) – negarantuje <b>čerstvost</b>, hrozí <b>replay útok</b> (odposlechnuté heslo přehráno znovu)</li><li><b>Challenge-response s nonce</b> – ověřovatel pošle <b>náhodné číslo (nonce)</b>, druhá strana ho zašifruje sdíleným klíčem → stará odpověď už neplatí</li><li><b>Vzájemná autentizace</b> – totéž oboustranně</li></ul>" },

  { t: "netsec",
    q: "Jak funguje výměna klíčů Diffie-Hellman?",
    a: "<b>Ustaví sdílený tajný klíč bez jeho posílání po síti.</b> Veřejné N, G:<ol><li>Alice: R₁ = Gˣ mod N → pošle Bobovi</li><li>Bob: R₂ = Gʸ mod N → pošle Alici</li><li>Alice: K = R₂ˣ mod N; Bob: K = R₁ʸ mod N → <b>stejný K</b></li></ol>Bezpečnost stojí na obtížnosti diskrétního logaritmu." },

  { t: "netsec",
    q: "Jak přesně funguje digitální podpis?",
    a: "<b>Obrácená asymetrická kryptografie: podepisuje se PRIVÁTNÍM klíčem, ověřuje VEŘEJNÝM.</b><ul><li>Ze zprávy se spočítá <b>hash</b> (MD5/SHA-256), ten se zašifruje privátním klíčem odesílatele</li><li>Pošle se podepsaný hash + plaintext; příjemce ověří veřejným klíčem</li></ul>Zajišťuje <b>integritu, nepopiratelnost i autentizaci</b>. Podpis hashe (ne celého dokumentu) je rychlejší." },

  { t: "netsec",
    q: "Jak funguje IPSec (AH, ESP, módy)?",
    a: "<b>Kolekce protokolů pro zabezpečení na L3 (síťová vrstva).</b><ul><li><b>AH (Authentication Header)</b> – autentizace a integrita (ne šifrování)</li><li><b>ESP (Encapsulating Security Payload)</b> – přidává <b>šifrování</b></li></ul>Módy: <b>transportní</b> (IPSec header mezi IP hlavičkou a tělem) a <b>tunelovací</b> (nová IP hlavička – základ VPN). Nemá vlastní správu klíčů." },

  { t: "netsec",
    q: "Jak probíhá TLS/SSL handshake?",
    a: "<b>Hybridní šifrování: asymetricky se vymění symetrický klíč, jím se pak šifruje provoz.</b><ol><li>Klient → požadavek (verze, šifry)</li><li>Server → odpověď + <b>certifikát</b> (veřejný klíč)</li><li>Klient ověří certifikát, vygeneruje základ klíče, zašifruje veřejným klíčem serveru a pošle</li><li>Server dešifruje privátním klíčem → obě strany odvodí <b>symetrický klíč</b></li></ol>TLS leží mezi L4 a L7; vytváří HTTPS, FTPS." },

  { t: "netsec",
    q: "Jaké aplikační protokoly používají TCP a které UDP?",
    a: "<ul><li><b>TCP</b> (spolehlivé): HTTP(80), HTTPS(443), FTP(21/20), SMTP(25), SSH(22), IMAP, POP3, Telnet, RDP</li><li><b>UDP</b> (rychlé): DNS(53), DHCP, TFTP, NTP, streaming (RTP)</li></ul>Aplikační protokol definuje typy zpráv, syntax, sémantiku a pravidla komunikace." },

  { t: "netsec",
    q: "Co je WWW a kdo ho vytvořil?",
    a: "<b>Web je systém prohlížení a odkazování dokumentů na Internetu – NENÍ to Internet (běží na něm).</b><ul><li>Autor <b>Tim Berners-Lee</b> (CERN, 1990) – navrhl HTML, HTTP, první prohlížeč i server</li><li>Dokumenty adresovány <b>URL</b>, přenášeny <b>HTTP</b></li></ul>" },

  { t: "netsec",
    q: "Jaké jsou prevence zahlcení a co je WRED?",
    a: "<b>Standardně se fronta plní, dokud není plná → pak teprve zahazuje (vznikají vlny synchronizace).</b><ul><li><b>RED (Random Early Detection)</b> – při překročení meze náhodně zahazuje pakety (pravděpodobnost roste se zaplněním) → odstraní globální synchronizaci</li><li><b>WRED</b> – RED zohledňující <b>prioritu</b> paketu (méně důležité zahazuje dřív)</li></ul>" },

  { t: "netsec",
    q: "Proč je FTP nezabezpečené a jaké jsou bezpečné alternativy?",
    a: "<ul><li><b>FTP</b> – přenáší heslo i data <b>v plaintextu</b>; používá <b>řídicí (21)</b> a <b>datové (20)</b> spojení</li><li><b>FTPS</b> – FTP přes <b>TLS/SSL</b> (šifrovaná nadstavba)</li><li><b>SFTP</b> – úplně jiný protokol přes <b>SSH</b> (port 22), ne příbuzný FTP</li></ul>" }
);
