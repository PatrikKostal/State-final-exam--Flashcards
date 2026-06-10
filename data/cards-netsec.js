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
    a: "<ul><li><b>VPN (Virtual Private Network)</b> – vytvoří <b>šifrovaný tunel</b> přes veřejný internet, takže vzdálený uzel vystupuje jako v lokální síti. Zajišťuje důvěrnost a integritu (často přes IPSec/WireGuard/OpenVPN).</li><li><b>PGP</b> – zabezpečení e-mailu hybridním šifrováním + digitální podpisy; využívá <b>web of trust</b> pro důvěru ve veřejné klíče</li></ul>" }
);
