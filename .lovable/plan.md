# SPOT vernieuwen tot compleet demonstratieprototype

## Doel
SPOT wordt een camera-first, mobielvriendelijke webapp waarin bewoners zonder account snel een fictieve melding kunnen maken, buurtmeldingen kunnen volgen en hun eigen voortgang kunnen bekijken. De bestaande meldingen, detailweergave en statusbewerking blijven behouden en worden visueel en functioneel uitgebreid. Alle slimme hulp, kaartpunten, locaties en gemeentelijke acties blijven duidelijk gesimuleerd.

## Uitvoering

### 1. Gedeelde basis en demonstratiegegevens
- Breid de twaalf bestaande fictieve meldingen uit met consistente straten in één testwijk, afstand, ernst, kaartpositie, statusuitleg, tijdlijn, eventuele voor/nafoto en openbare gemeentereactie.
- Voeg de categorieën `Overlast` en `Weg of stoep` en de status `Wordt beoordeeld` toe.
- Houd bewonersbevestigingen per browsersessie eenmalig en bied een zichtbare knop om alle demo-instellingen en gegevens te herstellen.
- Bouw herbruikbare onderdelen voor logo, knoppen, statussen, stappenindicator, kaartplaceholder, meldingskaarten, lege/fouttoestanden en tijdlijnen.

### 2. Camera-first start en volledige meldflow
- Vervang de startpagina door een schermvullende camera-ervaring met SPOT-identiteit, hulp/sluiten, privacywaarschuwing, ronde ontspanknop, upload en voorbeeldfoto’s.
- Vraag camera- en locatietoegang alleen na een bewuste actie. Bij weigering of onbeschikbaarheid blijft uploaden en kiezen uit voorbeeldfoto’s direct bruikbaar.
- Maak een vierstappenflow: `Foto`, `Details`, `Controleren`, `Gereed`, met rustige overgangen, sluitereffect, foto opnieuw kiezen en duidelijke terug-/doorgaanacties.
- Details bevatten een compacte foto, categorie, korte omschrijving, voorgestelde locatie met corrigeerbare demonstratiekaart en ernstinschatting.
- Toon vaste slimme suggesties voor categorie en omschrijving, steeds als aanpasbare suggestie gemarkeerd.
- Toon maximaal drie mogelijke dubbele meldingen met de keuzes `Ja, ik ervaar dit ook` en `Nee, nieuwe melding maken`.
- Voeg een volledig bewerkbare controleweergave en een succesweergave toe met fictief nummer, locatie, status en duidelijke prototypewaarschuwing.
- Voeg bruikbare demonstraties toe voor camerafout, locatiefout, ongeldig bestand, ontbrekend veld en offline conceptstatus.

### 3. Bewonersnavigatie en schermen
- Maak de navigatie mobiel als vaste onderbalk met `Melden`, `In de buurt`, `Mijn meldingen` en `Profiel`; `Melden` krijgt de prominente cameraknop.
- Laat dezelfde navigatie op grotere schermen veranderen in een compacte zijbalk, zonder inhoud te bedekken.
- Vernieuw `In de buurt` met zoeken, kaart/lijstwissel, categorie/status/afstand/datumfilters en een mobiel filterpaneel.
- Gebruik een lokaal getekende kaart met fictieve markeringen en detailpaneel; er komt geen externe kaartdienst.
- Maak `Ik ervaar dit ook` direct beschikbaar op kaarten en detailweergave, met eenmalige bevestiging en subtiele telanimatie.
- Voeg `Mijn meldingen` toe met status-tijdlijnen, uitleg en data per stap, voor/naweergave bij opgeloste meldingen en een feedbackkeuze met optionele toelichting.
- Voeg `Profiel` toe voor gastmodus, gemeentevoorkeur, eenvoudige taal, grotere tekst, minder beweging, privacy-informatie en herstel van demo-inhoud.

### 4. Gemeentelijke demonstratieomgeving
- Geef `/dashboard` een aparte professionele desktopgerichte indeling die ook mobiel bruikbaar blijft.
- Voeg samenvattende aantallen, fictieve kaart, filters, categorie-overzicht/grafiek en oude meldingen toe.
- Maak een geselecteerde melding inspecteerbaar met foto, locatie, beschrijving, ernst, bevestigingen, statuswijziging en openbare reactie.
- Voeg handmatige markeringen `mogelijk dubbel` en `ongeldig` toe.
- Toon een transparante aandachtssuggestie gebaseerd op ouderdom, categorie, ernst en bevestigingen, met expliciete vermelding dat de medewerker beslist.

### 5. Visuele stijl, beweging en toegankelijkheid
- Vernieuw het ontwerpsysteem naar diep marineblauw, fris turquoise/groen, lichte neutralen, oranje waarschuwingen en rood alleen voor fouten/gevaar.
- Gebruik Inter, royale fotovlakken, compacte afgeronde vormen, rustige schaduwen, begrijpelijke Nederlandse tekst en consistente iconen met labels.
- Voeg functionele animaties van circa 150–300 ms toe voor schermwissels, sluiter, selecties, kaartlocatie, bevestigingen, succes en tijdlijnupdates.
- Respecteer `verminder beweging`, zorg voor toetsenbordbediening, duidelijke focus, tekstalternatieven, minimaal 44px aanraakvlakken, tekstzoom en statuslabels naast kleur.
- Zet de documenttaal op Nederlands en geef iedere nieuwe pagina eigen titel, omschrijving en deelmetadata.

## Paginastructuur
- `/` — camera-first melden
- `/melden` — dezelfde meldflow als blijvende directe ingang
- `/meldingen` — In de buurt, kaart en lijst
- `/meldingen/$id` — meldingdetails en bevestigen
- `/mijn-meldingen` — persoonlijke demo-tijdlijnen en feedback
- `/profiel` — gastmodus, voorkeuren, toegankelijkheid, privacy en demoherstel
- `/dashboard` — gemeentelijke demonstratieomgeving

## Technische details
- Alles blijft lokaal in React-demostatus; er komt geen database, accountregistratie, betaalde AI, GPS-provider of gemeentelijke API.
- Camera gebruikt alleen na toestemming de browsercamera; upload en vaste voorbeelden blijven de gegarandeerde demonstratieroute.
- Locatie en kaart zijn fictief en worden lokaal aangepast.
- Bestaande afbeeldingsbestanden worden hergebruikt; extra visuele situaties worden met de beschikbare neutrale beelden samengesteld.
- De routebestanden blijven typeveilig volgens de bestaande TanStack-structuur; nieuwe navigatielinks en pagina’s worden tegelijk toegevoegd.

## Controle
- Test de volledige flow van foto tot succes, inclusief aanpassen, dubbele melding bevestigen, fouttoestanden en demoherstel.
- Test kaart/lijstfilters, eenmalig bevestigen, tijdlijnfeedback en gemeentelijke status/reactie/markering.
- Controleer telefoon-, tablet- en desktopweergave, toetsenbordfocus, minder beweging, grote tekst, contrast en afwezigheid van overlap.
- Controleer de actuele bouw-, runtime- en browsermeldingen en alle paginametadata.
