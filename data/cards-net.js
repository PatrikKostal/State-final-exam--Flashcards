// 8. Sítě (PB156)

window.FC = window.FC || { topics: {}, cards: [] };

FC.topics.net = { label: "🌐 Sítě", cls: "tag-net", order: 19 };

FC.cards.push(
  { t: "net",
    q: "Jaké jsou vrstvy modelu ISO/OSI a jejich funkce?",
    a: "<b>7 vrstev (odspodu):</b><ol><li><b>Fyzická</b> – přenos bitů, signály</li><li><b>Spojová (linková)</b> – rámce, MAC adresy, přístup k médiu</li><li><b>Síťová</b> – směrování, IP adresy</li><li><b>Transportní</b> – spojení end-to-end, porty (TCP/UDP)</li><li><b>Relační</b> – relace mezi aplikacemi</li><li><b>Prezentační</b> – formát/šifrování/kódování dat</li><li><b>Aplikační</b> – služby aplikací (HTTP, DNS)</li></ol>Každá vrstva komunikuje s odpovídající vrstvou protějšku a přidává/odebírá hlavičku (zapouzdření)." },

  { t: "net",
    q: "Jak se ISO/OSI porovnává s modelem TCP/IP?",
    a: "<b>TCP/IP má 4 (nebo 5) vrstev:</b><ul><li><b>Aplikační</b> (= aplikační+prezentační+relační OSI)</li><li><b>Transportní</b> (TCP, UDP)</li><li><b>Síťová / internetová</b> (IP)</li><li><b>Vrstva síťového rozhraní</b> (= spojová + fyzická)</li></ul>TCP/IP je <b>praktický</b> (popisuje reálný internet), OSI je <b>referenční/teoretický</b> model. Adresace: fyzická (MAC) na L2, IP na L3, port na L4." },

  { t: "net",
    q: "Co dělá fyzická vrstva a jak funguje Manchester kódování?",
    a: "<b>Přenáší jednotlivé bity jako fyzické signály</b> (napětí, světlo, rádio); řeší kódování, modulaci, média.<ul><li><b>Manchester kódování</b> – každý bit reprezentuje <b>přechod uprostřed intervalu</b>: 0 = přechod ↑, 1 = přechod ↓ (nebo opačně dle konvence)</li><li>Výhoda: <b>samosynchronizace</b> (hodiny v signálu); nevýhoda: <b>dvojnásobná šířka pásma</b></li></ul>Příklad „010\": ↑ ↓ ↑ (tři přechody)." },

  { t: "net",
    q: "Co řeší spojová vrstva (MAC, řízení přístupu k médiu)?",
    a: "<b>Přenos rámců mezi sousedními uzly, adresace MAC adresami, řízení přístupu ke sdílenému médiu.</b><ul><li><b>CSMA/CD</b> (Ethernet) – naslouchej, vysílej, <b>detekuj kolize</b> a opakuj (drátové sítě)</li><li><b>CSMA/CA</b> (Wi-Fi) – <b>vyhýbání se kolizím</b> (kolize nelze spolehlivě detekovat v rádiu), potvrzování</li></ul>MAC adresa = 48bitový fyzický identifikátor síťové karty." },

  { t: "net",
    q: "Jaký je rozdíl mezi hubem, switchem a bridgem?",
    a: "<ul><li><b>Hub (rozbočovač)</b> – L1, hloupě <b>opakuje signál na všechny porty</b> (jedna kolizní doména)</li><li><b>Switch (přepínač)</b> – L2, <b>učí se MAC adresy</b> a posílá rámec jen na cílový port (oddělené kolizní domény)</li><li><b>Bridge (most)</b> – L2, spojuje dva segmenty sítě; switch je v podstatě vícePortový bridge</li></ul>" },

  { t: "net",
    q: "Co dělá síťová vrstva a jak funguje ARP?",
    a: "<ul><li><b>Síťová vrstva</b> – <b>směrování</b> paketů mezi sítěmi podle <b>IP adres</b>, protokol IP (best-effort, bez záruky doručení), směrovače (routery)</li><li><b>ARP (Address Resolution Protocol)</b> – zjišťuje <b>MAC adresu k dané IP</b> v lokální síti: uzel pošle broadcast „kdo má IP X?\", vlastník odpoví svou MAC adresou (uloží se do ARP cache)</li></ul>" },

  { t: "net",
    q: "Jaký je rozdíl mezi TCP a UDP?",
    a: "<ul><li><b>TCP</b> – <b>spojově orientovaný, spolehlivý</b>: navázání spojení (handshake), potvrzování, <b>řazení</b>, opakování ztracených segmentů, řízení toku a zahlcení. Pro web, e-mail, přenos souborů.</li><li><b>UDP</b> – <b>nespojový, nespolehlivý</b>: posílá datagramy bez záruky a pořadí, <b>nízká režie a latence</b>. Pro streaming, hry, DNS, VoIP.</li></ul>Oba používají <b>porty</b> k identifikaci aplikace." },

  { t: "net",
    q: "Jak funguje třícestný handshake (TCP)?",
    a: "<b>Navázání TCP spojení ve třech krocích:</b><ol><li>Klient → server: <b>SYN</b> (se sekvenčním číslem x)</li><li>Server → klient: <b>SYN-ACK</b> (svoje seq y, potvrzení x+1)</li><li>Klient → server: <b>ACK</b> (potvrzení y+1)</li></ol>Tím se obě strany <b>dohodnou na počátečních sekvenčních číslech</b> a synchronizují. Ukončení probíhá čtyřcestně (FIN/ACK)." },

  { t: "net",
    q: "Proč se používá přepínání paketů místo přepínání okruhů?",
    a: "<ul><li><b>Přepínání okruhů</b> – vyhradí se pevná cesta na celou dobu spojení (telefon). Garantuje pásmo, ale <b>plýtvá</b> při nečinnosti a špatně škáluje.</li><li><b>Přepínání paketů</b> – data rozdělena na <b>pakety</b> směrované nezávisle, sdílení linek (<b>statistické multiplexování</b>). Efektivnější využití, odolnost vůči výpadkům, ale proměnné zpoždění.</li></ul>" },

  { t: "net",
    q: "Co je gateway a co je multicast?",
    a: "<ul><li><b>Gateway (brána)</b> – propojuje sítě; na L3 router (mezi IP sítěmi), obecně i převod mezi protokoly na vyšších vrstvách</li><li><b>Multicast</b> – doručení jednoho paketu <b>skupině</b> příjemců najednou (na rozdíl od unicast 1:1 a broadcast všem). Šetří pásmo u streamů/IPTV.</li></ul>Topologie sítě: <b>hvězda (star)</b>, <b>sběrnice (bus)</b>, kruh, mesh." }
);
