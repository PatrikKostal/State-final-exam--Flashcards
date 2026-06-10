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
    a: "<ul><li><b>Audit</b> – nezávislé ověření, že bezpečnostní opatření odpovídají politikám/standardům. <b>Interní</b> (vlastní zaměstnanci) vs <b>externí</b> (nezávislá strana, vyšší důvěryhodnost). Auditor sbírá důkazy, hodnotí, reportuje.</li><li><b>Common Criteria (ISO 15408)</b> – mezinárodní standard pro <b>hodnocení bezpečnosti produktů</b>; úrovně záruky <b>EAL1–EAL7</b>. Další standardy: <b>ISO/IEC 27001</b> (systém řízení bezpečnosti informací).</li></ul>" }
);
