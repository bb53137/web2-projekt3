# web2-projekt3
Napredni razvoj programske potpore za web - Treći projekt (html5)


Otvaranjem index.html učitava se stranica s početnim ekranom s natpisom "BREAKOUT".
Ispod toga je "Press SPACE to begin"

Igra se igra na način da se palica pomiče na tipkama strelica (lijevo i desno), loptica se odbija od palice, rubova ekrana, cigli.
Lopticom gađamo cigale i tako ih rušimo i svaka srušena cigla je 1 bod. Ako loptica padne tj. ne uhvatimo ju palicom onda je GAME OVER i izgubili smo. 
Ako srušimo sve cigle, onda je YOU WIN tj. pobijedili smo.
Pritisne se SPACE za novu rundu.
Best score se sprema u preglednikov local storage i ostaje upamćen.


Da bi se igra pokrenula treba preuzmeti repo i otvoriti index.html.

Sve funkcionalnosti su implementirane:
Igra se prikazuje unutar Canvas elementa fiksne veličine, s crnom pozadinom i bijelim rubom od 5 px.
Prilikom učitavanja stranice prikazuje se početni ekran: "BREAKOUT" i "Press SPACE to begin", centrirano u bijeloj boji.
Igra kreće nakon što se pritisne tipke SPACE.
Automatski se generira 50 cigli (5 redova × 10 stupaca) na vrhu ekrana.
Cigle imaju točno određene RGB boje: smeđa, crvena, roza, zelena i žuta.
Loptica se stvara na palici i kreće dijagonalno pod 45° u proizvoljnom smjeru.
Palica se kontrolira pomoću tipki strelica lijevo i desno.
Loptica se odbija od rubova, palice i cigli, a pri udarcu u ciglu ona nestaje, igrač dobiva 1 bod.
Svi elementi (cigle, palica, loptica) crtaju se direktno u Canvasu, nema korištenja slika.
Svi elementi imaju lagani 3D efekt putem shadowa.
Ako loptica padne ispod dna ekrana, prikazat će se poruka "GAME OVER".
Ako su sve cigle uništene, prikazat će se "YOU WIN!" poruka.
Trenutni rezultat prikazuje se gore lijevo, a best score iz local storeaga gore desno.
Projekt se sastoji od 1 hmtl, 1 css i 1 js datoteke.

Trenutni rezultat prikazuje se gore lijevo, a najbolji rezultat (iz localStorage-a) gore desno.

Projekt se sastoji od jedne HTML, CSS i JavaScript datoteke.
