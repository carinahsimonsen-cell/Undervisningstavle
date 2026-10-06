/* Undervisningstavle – indbygget hjælp. */
(function () {
  'use strict';

  if (document.getElementById('ut-help-overlay')) return;

  const sections = [
    ['Opret din første tavle', `
      <p>Når du åbner undervisningstavlen, ser du et ugeskema. Hver ledig lektion kan få sin egen tavle.</p>

      <h4>Sådan opretter du en tavle</h4>
      <ol>
        <li>Find den dag og lektion, hvor du vil bruge tavlen.</li>
        <li>Klik på den ledige plads i skemaet.</li>
        <li>Skriv et navn, fx <strong>7.B – Dansk</strong>, og vælg eventuelt klasse og fag.</li>
        <li>Klik på <strong>Opret tavle</strong>.</li>
      </ol>
      <p>Klasse og fag er valgfrie ved oprettelsen. Du kan også vælge eller ændre dem senere under <strong>✎ Tavle</strong>. De bruges til at sortere tavlerne i årsoversigten.</p>

      <h4>Find tavlen igen</h4>
      <ol>
        <li>Klik på <strong>← Skema</strong>.</li>
        <li>Find dagen og lektionen, og klik på tavlen.</li>
      </ol>
      <p>Brug pilene <strong>‹</strong> og <strong>›</strong> til at skifte uge. <strong>Denne uge</strong> fører dig tilbage til den aktuelle uge.</p>

      <h4>Ret ringetiderne</h4>
      <ol>
        <li>Klik på <strong>⚙️ Ringetider</strong> i ugeskemaet.</li>
        <li>Ret start- og sluttider. Brug eventuelt <strong>+ Lektion</strong>.</li>
        <li>Klik på <strong>Gem ringetider</strong>.</li>
      </ol>
    `],

    ['Tags og søgning efter gamle tavler', `
      <p>Du kan give hver tavle et eller flere <strong>tags (emneord)</strong>, fx <em>Hitman</em>, <em>Gys</em> eller <em>Læseprøve</em>. Tags er kun et redskab for læreren: <strong>Hverken tagknappen eller tags vises i tavlens visningstilstand.</strong></p>
      <h4>Tilføj tags</h4>
      <ol>
        <li>Åbn tavlen, og klik på den lille <strong>🏷️-knap</strong> ved tavlens overskrift.</li>
        <li>Begynd at skrive et emneord. Hvis du har brugt tagget før, bliver det foreslået.</li>
        <li>Vælg et eksisterende tag, eller opret et nyt. En tavle kan have flere tags.</li>
        <li>Du kan altid gå tilbage og ændre eller fjerne tags – også på gamle tavler.</li>
      </ol>
      <p>Vælg gerne tidligere anvendte tags, så alle tavler i samme forløb kan findes samlet. Store og små bogstaver samt ekstra mellemrum giver ikke forskellige versioner af samme tag.</p>
      <h4>Find tidligere tavler</h4>
      <ol>
        <li>Gå til <strong>← Skema</strong>.</li>
        <li>Klik på <strong>⌕ Find tavler</strong>.</li>
        <li>Søg efter et tag, tavlens navn eller indhold.</li>
        <li>Klik på et resultat for at åbne den gamle tavle.</li>
      </ol>
      <p>Søgningen går på tværs af uger, men finder kun tavler, som er gemt i den aktuelle browser. Vil du have overblik over et helt skoleår, så brug <a href="#ut-help-chapter-3" data-ut-help-target="ut-help-chapter-3">📅 Årsoversigt</a> (se næste afsnit).</p>
    `],

    ['Brug årsoversigten', `
      <p><strong>📅 Årsoversigt</strong> giver dig et historisk overblik over din undervisning. Du skal ikke udfylde en ekstra årsplan: Oversigten bruger dato, klasse, fag og tags fra de tavler, du allerede har oprettet. Den er en lærerfunktion og vises ikke på elevtavlen.</p>
      <h4>Åbn årsoversigten</h4>
      <ol>
        <li>Gå til <strong>← Skema</strong>, og klik på <strong>📅 Årsoversigt</strong>.</li>
        <li>Vælg <strong>skoleår</strong>, <strong>årgang</strong> og <strong>fag</strong>.</li>
        <li>Vælg mellem <strong>Kronologisk</strong> og <strong>Efter emne</strong>.</li>
      </ol>
      <p>Årgangen findes ud fra den tilknyttede klasses navn: Både <strong>7.B</strong> og <strong>7.C</strong> hører fx under <strong>7. årgang</strong>. Fagene kan filtreres hver for sig. Tavler, hvor klasse eller fag mangler, kan findes under <strong>Uden årgang</strong> eller <strong>Uden fag</strong>.</p>
      <h4>Kronologisk – se undervisningen i datoorden</h4>
      <p>Her ser du tavlerne i den rækkefølge, de ligger i skemaet – også tavler uden tags. Du kan fx se, at I arbejdede med <em>Hitman</em>, havde en læseprøve og derefter fortsatte med <em>Hitman</em>. Klik på en tavle for at åbne den.</p>
      <h4>Efter emne – få overblik over et forløb</h4>
      <p>Her samles tavler med samme tag. Klik på fx <strong>Hitman</strong> for at folde emnet ud. Her kan du se:</p>
      <ul>
        <li><strong>Periode:</strong> Hvor mange kalenderuger der gik fra første til sidste tavle med tagget.</li>
        <li><strong>Lektioner:</strong> Antallet af tavler med tagget.</li>
        <li><strong>Planlagt tid:</strong> Summen af de tilgængelige lektionstider beregnet ud fra ringetiderne.</li>
        <li><strong>Ugefordeling:</strong> En graf, der viser, hvor mange tavler med tagget der ligger i hver uge.</li>
        <li><strong>De enkelte tavler:</strong> En kronologisk liste, hvor du kan åbne den gamle planlægning.</li>
      </ul>
      <p class="ut-help-important"><strong>Vigtigt:</strong> Tallene er et overslag til planlægning, ikke en registrering af faktisk undervisningstid. Én tavle tæller som én lektion, selvom lektionen kan rumme flere emner. Hvis ringetider mangler, kan den samlede tid være ufuldstændig.</p>
      <h4>Genbrug et tidligere forløb</h4>
      <p>Åbn en gammel tavle fra oversigten for at se dagsordenen og materialerne. Du kan derefter bruge <strong>Kopiér/flyt…</strong> under <strong>✎ Tavle</strong> til at lave en selvstændig kopi til en ny lektion.</p>
      <p>Du kan tilføje klasse, fag eller tags til gamle tavler med tilbagevirkende kraft. Årsoversigten opdateres derefter automatisk. Tavler og tags gemmes foreløbig lokalt i browseren; se afsnittet <a href="#ut-help-chapter-12" data-ut-help-target="ut-help-chapter-12">Hvor bliver dine tavler gemt?</a>.</p>
    `],

    ['Lav dagens program', `
      <p>Dagsordenen viser eleverne, hvad der skal ske. Hver aktivitet kaldes et <strong>programpunkt</strong>.</p>

      <h4>Tilføj et programpunkt</h4>
      <ol>
        <li>Åbn tavlen, og klik på <strong>+ Nyt punkt</strong>.</li>
        <li>Skriv aktivitetens navn, fx <em>Makkerarbejde</em>.</li>
        <li>Udfyld eventuelt <strong>Beskrivelse</strong>, <strong>🎒 Du skal bruge…</strong>, <strong>Arbejdsform</strong> og <strong>Forventet tid (min.)</strong>.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>
      <p>Du behøver ikke udfylde alle felterne. Gentag, til hele dagens program er oprettet.</p>

      <h4>Ret eller flyt et punkt</h4>
      <p>Klik på <strong>✎</strong> ved punktet for at redigere. Træk i <strong>☰</strong> for at flytte det op eller ned.</p>

      <h4>Vis, hvad I har nået</h4>
      <p>Klik på <strong>✓</strong> ved en gennemført aktivitet eller <strong>↷</strong> ved en aktivitet, I springer over. Du kan fortryde en forkert markering.</p>

      <h4>Giv dagsordenen en overskrift</h4>
      <p>Klik på <strong>+ Tilføj overskrift</strong>, skriv fx <em>Dagens program</em>, og gem. Overskriften kan redigeres senere.</p>
    `],

    ['Tilføj undervisningsmaterialer', `
      <p>Du kan knytte en hjemmeside eller en fil til et bestemt programpunkt.</p>

      <h4>Tilføj et link</h4>
      <ol>
        <li>Opret et punkt med <strong>+ Nyt punkt</strong>, eller klik på <strong>✎</strong> ved et eksisterende punkt.</li>
        <li>Find området <strong>📎 Materiale (valgfrit)</strong>.</li>
        <li>Kopiér adressen fra hjemmesidens adresselinje, og indsæt den i linkfeltet.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>
      <p>Hvis hjemmesiden ikke kan vises inde i tavlen, klik på <strong>↗ Ny fane</strong>. Tavlen husker dit valg for det pågældende link.</p>
      <p><strong>Vil du gemme materialet til senere?</strong> Vælg et forløb under <strong>📁 Gem også i Mine forløb</strong>, før du klikker på <strong>Gem</strong>. Du kan vælge et andet forløb end tavlens tag eller vælge ikke at gemme materialet i ressourcebanken. Se <a href="#ut-help-chapter-14" data-ut-help-target="ut-help-chapter-14">Mine forløb</a>.</p>

      <h4>Tilføj en fil</h4>
      <ol>
        <li>Åbn programpunktets redigering.</li>
        <li>Klik på <strong>📎 Vælg fil</strong>.</li>
        <li>Find filen på computeren, og vælg den.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>

      <p><strong>Skal du vise en præsentation?</strong> Google Slides kan vises direkte på tavlen med et previewlink eller åbnes i en ny fane med et almindeligt link. PowerPoint og Google Slides kan også vises som PDF. Se afsnittet <a href="#ut-help-chapter-6" data-ut-help-target="ut-help-chapter-6">Sådan viser du en PowerPoint eller Google Slides-præsentation</a>.</p>
    `],

    ['Sådan viser du en PowerPoint eller Google Slides-præsentation', `
      <p>Du kan vise præsentationer på undervisningstavlen på tre måder:</p>
      <ul>
        <li><strong>Google Slides med et previewlink:</strong> Præsentationen åbner direkte på tavlen, og animationer og videoer bevares.</li>
        <li><strong>Google Slides med et almindeligt link:</strong> Præsentationen åbner i en ny fane i browseren, ikke direkte på tavlen.</li>
        <li><strong>PowerPoint eller Google Slides som PDF:</strong> Præsentationen kan vises direkte på tavlen, men animationer, overgange og indlejrede videoer virker ikke.</li>
      </ul>

      <h4>A. Vis Google Slides direkte på tavlen med et previewlink</h4>
      <p>Du kan bruge en præsentation fra dit arbejdsdrev, så længe undervisningstavlen er åben i et browservindue, hvor du er logget ind med den arbejdskonto, der har adgang til præsentationen. Du behøver ikke dele præsentationen med en privat Google-konto.</p>

      <p><strong>Sådan gør du:</strong></p>
      <ol>
        <li>Åbn præsentationen i Google Slides fra den konto, hvor den kan vises.</li>
        <li>Kopiér adressen fra browserens adresselinje.</li>
        <li>Find <strong>/edit</strong> i linket. <strong>Slet hele slutningen fra og med /edit, og skriv /preview i stedet.</strong></li>
      </ol>

      <p><strong>Eksempel:</strong></p>
      <p><strong>Før:</strong><br>
      <code>https://docs.google.com/presentation/d/ABC123/edit#slide=id.p5</code></p>

      <p><strong>Efter:</strong><br>
      <code>https://docs.google.com/presentation/d/ABC123/preview</code></p>

      <ol start="4">
        <li>Åbn din undervisningstavle.</li>
        <li>Opret et programpunkt med <strong>+ Nyt punkt</strong>, eller redigér et eksisterende punkt med <strong>✎</strong>.</li>
        <li>Indsæt previewlinket i feltet <strong>📎 Materiale (valgfrit)</strong>, og klik på <strong>Gem</strong>.</li>
      </ol>

      <p><strong>Sådan viser du præsentationen:</strong></p>
      <ol>
        <li>Klik på materialet i dagsordenen.</li>
        <li>Klik én gang inde i præsentationen, så den reagerer på tastaturet.</li>
        <li>Brug piletasterne til at skifte mellem slides.</li>
        <li>Klik eventuelt på <strong>▣ Vis med…</strong>, hvis du vil vise fx dagsordenen ved siden af præsentationen.</li>
        <li>Klik på <strong>✕ Luk</strong>, når du er færdig.</li>
      </ol>

      <p><strong>Fordel:</strong> Animationer og indlejrede videoer fra den oprindelige Google Slides-præsentation virker fortsat. En indlejret YouTube-video kan også sættes i <strong>fuld skærm med videoens egen fuldskærmsknap</strong>, uden at du behøver forlade tavlen.</p>
      <p><strong>Bemærk:</strong> Et Google Slides-preview starter som udgangspunkt fra begyndelsen. Hvis du har brug for at starte midt i præsentationen, er PDF-løsningen nedenfor bedst, fordi du dér kan vælge <strong>Start på slide</strong>.</p>

      <h4>B. Vis Google Slides i en ny fane med et almindeligt link</h4>
      <p>Hvis du ikke kan bruge et previewlink, kan du stadig tilføje et almindeligt link til præsentationen.</p>

      <p><strong>Sådan gør du:</strong></p>
      <ol>
        <li>Åbn præsentationen i Google Slides.</li>
        <li>Kopiér adressen fra browserens adresselinje.</li>
        <li>Åbn din undervisningstavle.</li>
        <li>Opret et programpunkt med <strong>+ Nyt punkt</strong>, eller redigér et eksisterende punkt med <strong>✎</strong>.</li>
        <li>Indsæt det almindelige link i feltet <strong>📎 Materiale (valgfrit)</strong>, og klik på <strong>Gem</strong>.</li>
      </ol>

      <p><strong>Sådan viser du præsentationen:</strong></p>
      <ol>
        <li>Klik på materialet i dagsordenen.</li>
        <li>Præsentationen åbner i en ny fane i browseren.</li>
        <li>Brug Google Slides til at vise præsentationen.</li>
        <li>Skift tilbage til fanen med undervisningstavlen, når du er færdig.</li>
      </ol>

      <p><strong>Bemærk:</strong> Præsentationen vises ikke inde på selve tavlen. Du kan derfor heller ikke bruge <strong>▣ Vis med…</strong> til at vise dagsordenen ved siden af den. Til gengæld kan du bruge præsentationens animationer og videoer.</p>

      <h4>C. Gem en PowerPoint eller Google Slides-præsentation som PDF</h4>
      <p>Hvis du vil vise præsentationen direkte på tavlen, men ikke kan bruge et previewlink, kan du i stedet gemme den som PDF.</p>

      <p><strong>PowerPoint:</strong></p>
      <ol>
        <li>Åbn præsentationen i PowerPoint.</li>
        <li>Klik på <strong>Filer</strong>.</li>
        <li>Find <strong>Gem som</strong>, <strong>Eksportér</strong> eller <strong>Download</strong>. Navnet afhænger af din version.</li>
        <li>Vælg filtypen <strong>PDF (.pdf)</strong>.</li>
        <li>Gem filen et sted, du kan finde igen.</li>
      </ol>

      <p><strong>Google Slides:</strong></p>
      <ol>
        <li>Åbn præsentationen i Google Slides.</li>
        <li>Klik på <strong>Filer → Download → PDF-dokument (.pdf)</strong>.</li>
        <li>Vent, til filen er downloadet.</li>
      </ol>

      <p><strong>Læg PDF-filen på tavlen:</strong></p>
      <ol>
        <li>Åbn din undervisningstavle.</li>
        <li>Opret et programpunkt med <strong>+ Nyt punkt</strong>, eller redigér et eksisterende punkt med <strong>✎</strong>.</li>
        <li>Find <strong>📎 Materiale (valgfrit)</strong>, og klik på <strong>📎 Vælg fil</strong>.</li>
        <li>Find og vælg PDF-filen.</li>
        <li>Vælg eventuelt <strong>Start på slide</strong>, hvis præsentationen skal begynde på en anden side end side 1.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>

      <p><strong>Sådan viser du PDF'en:</strong></p>
      <ol>
        <li>Klik på PDF-materialet i dagsordenen.</li>
        <li>Brug <strong>→</strong> til næste side og <strong>←</strong> til forrige side. Du kan også bruge pilene på skærmen.</li>
        <li>Brug <strong>+</strong>, <strong>−</strong> og <strong>Tilpas</strong> til at ændre størrelsen.</li>
        <li>Klik eventuelt på <strong>▣ Vis med…</strong> for at vise dagsordenen ved siden af.</li>
        <li>Tryk på <strong>Esc</strong>, eller klik på <strong>✕ Luk</strong>, når du er færdig.</li>
      </ol>

      <p class="ut-help-important"><strong>Vigtigt:</strong> Når du gemmer en præsentation som PDF, forsvinder animationer, overgange og indlejrede videoer fra det oprindelige slideshow. PDF-filen viser kun de statiske slides.</p>
    `],

    ['Vis dagsordenen ved siden af dit materiale', `
      <p>Med <strong>▣ Vis med…</strong> kan du vise et materiale sammen med udvalgte elementer fra tavlen.</p>
      <ol>
        <li>Åbn først materialet i stor visning.</li>
        <li>Klik på <strong>▣ Vis med…</strong>.</li>
        <li>Vælg de elementer, du vil have ved siden af materialet, fx dagsordenen eller timeren.</li>
        <li>Vælg en fordeling: <strong>80/20</strong>, <strong>70/30</strong> eller <strong>60/40</strong>.</li>
        <li>Klik på <strong>Gem og vis</strong>.</li>
      </ol>
      <p>Vil du igen se materialet alene, klik på <strong>▣ Vis med…</strong> og derefter <strong>Vis kun materiale</strong>.</p>
      <p>Du kan kun vælge elementer, som allerede er oprettet på tavlen. Timeren fortsætter med at tælle ned i sidevisningen.</p>
    `],

    ['Tilføj ekstra elementer til tavlen', `
      <p>Et <strong>element</strong> er en selvstændig funktion på tavlen – ikke et programpunkt i dagsordenen. Klik på <strong>+ Tilføj element</strong> øverst på tavlen.</p>

      <h4>⏱ Timer</h4>
      <ol>
        <li>Vælg <strong>⏱ Timer</strong>.</li>
        <li>Indstil tiden, og klik på <strong>Indstil</strong>.</li>
        <li>Klik på <strong>Start</strong>. Du kan også sætte timeren på pause eller nulstille den.</li>
        <li>Vælg mellem <strong>Digital nedtælling</strong> og <strong>Visuel timer</strong>. På den visuelle timer bliver det røde felt mindre, efterhånden som tiden går.</li>
        <li>Vælg eventuelt visning af tal og lyd, når tiden udløber.</li>
      </ol>

      <h4>📌 Besked</h4>
      <p>Vælg <strong>📌 Besked</strong>, skriv en besked til eleverne, og gem den.</p>

      <h4>✏️ Tavlenoter</h4>
      <p>Vælg <strong>✏️ Tavlenoter</strong>. Her kan du skrive stikord og noter under undervisningen.</p>

      <h4>▶️ YouTube-video</h4>
      <ol>
        <li>Find videoen på YouTube, og kopiér adressen.</li>
        <li>Vælg <strong>▶️ YouTube-video</strong>.</li>
        <li>Indsæt adressen i <strong>YouTube-link</strong>, og gem.</li>
        <li>Åbn videoen i stor visning, når du vil vise den. Tryk selv på afspil – videoen starter ikke automatisk.</li>
      </ol>
      <p><strong>Videoen afspilles direkte på undervisningstavlen</strong>, ikke ved at sende dig til YouTubes hjemmeside. Videoens titel hentes automatisk, når det er muligt; ellers kan du angive den selv. Du kan også gemme videoen til genbrug i <strong>Mine forløb</strong>.</p>

      <h4>📐 GeoGebra</h4>
      <ol>
        <li>Gem eller download GeoGebra-aktiviteten som en <strong>.ggb-fil</strong>.</li>
        <li>Vælg <strong>📐 GeoGebra</strong>.</li>
        <li>Vælg filen, og gem.</li>
        <li>Åbn aktiviteten i stor visning, hvis du vil arbejde med den på en større flade.</li>
      </ol>

      <h4>👥 Grupper / makkere og 🎯 Én elev</h4>
      <p>Disse funktioner bruger klassens elevliste. Se afsnittet <a href="#ut-help-chapter-9" data-ut-help-target="ut-help-chapter-9">Opret en klasse med elever</a>.</p>
    `],

    ['Opret en klasse med elever', `
      <p>Du behøver ikke oprette en klasse for at bruge dagsordenen. En elevliste bruges blandt andet til grupper, tilfældig elev og fødselsdage.</p>

      <h4>Opret klassen</h4>
      <ol>
        <li>Klik på <strong>← Skema</strong>, hvis du står på en tavle.</li>
        <li>Klik på <strong>👥 Klasser</strong> og derefter <strong>+ Ny klasse</strong>.</li>
        <li>Skriv klassens navn, fx <em>7.B</em>.</li>
        <li>Skriv eleverne i feltet <strong>Elever – ét navn pr. linje</strong>. Tryk Enter mellem hvert navn.</li>
        <li>Tilføj eventuelt fødselsdage.</li>
        <li>Klik på <strong>Gem klasse</strong>.</li>
      </ol>

      <h4>Knyt klassen til en tavle</h4>
      <ol>
        <li>Åbn tavlen.</li>
        <li>Klik på <strong>✎ Tavle</strong>.</li>
        <li>Vælg klassen i <strong>Klasse (valgfri)</strong>, og vælg eventuelt <strong>Fag (valgfrit)</strong>.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>

      <h4>Vælg dagens elever</h4>
      <ol>
        <li>Klik på <strong>👥 Dagens elever</strong>.</li>
        <li>Slå elever fra, som ikke skal indgå i dagens grupper eller lodtrækning.</li>
        <li>Klik på <strong>Luk</strong>.</li>
      </ol>
      <p>Nu kan du tilføje <strong>👥 Grupper / makkere</strong> eller <strong>🎯 Én elev</strong> med <strong>+ Tilføj element</strong>.</p>
    `],

    ['Tilpas tavlens udseende', `
      <h4>Skift baggrund</h4>
      <ol>
        <li>Klik på <strong>🎨 Udseende</strong>.</li>
        <li>Vælg en baggrund, eller brug <strong>Eget baggrundsbillede</strong>.</li>
        <li>Tilpas eventuelt <strong>Baggrundens styrke</strong>, så teksten er nem at læse.</li>
        <li>Klik på <strong>Luk</strong>.</li>
      </ol>

      <h4>Visning uden redigeringsknapper</h4>
      <p>Klik på <strong>👁 Visning</strong> for at få en mere ryddelig tavle under undervisningen. Klik igen for at vende tilbage.</p>

      <h4>Fuld skærm</h4>
      <p>Klik på <strong>⛶ Fuld skærm</strong>, hvis tavlen skal fylde hele skærmen.</p>
    `],

    ['Kopiér en tavle', `
      <p>Du kan genbruge en tavle uden at skrive hele dagsordenen igen.</p>
      <ol>
        <li>Åbn tavlen, du vil kopiere.</li>
        <li>Klik på <strong>✎ Tavle</strong>.</li>
        <li>Vælg <strong>Kopiér/flyt…</strong>.</li>
        <li>Find den ønskede uge med pilene.</li>
        <li>Vælg de lektioner, tavlen skal kopieres til.</li>
        <li>Vælg, om <strong>Nulstil ✓ / ↷ på kopien</strong> skal være markeret, så kopien begynder uden afsluttede eller oversprungne punkter.</li>
        <li>Klik på <strong>Kopiér til … lektioner</strong>.</li>
      </ol>
      <p>Kopieringsvinduet viser hele ugen som et skema med fem hverdage. På en almindelig computerskærm er der bedre plads til at se alle lektionerne på én gang; på mindre skærme kan du scrolle efter behov.</p>
      <p>Kopierne er selvstændige. Ændrer du en kopi, ændrer du ikke den oprindelige tavle. Tags følger med på kopien og kan ændres bagefter.</p>
    `],

    ['Hvor bliver dine tavler gemt?', `
      <p class="ut-help-important"><strong>Vigtigt:</strong> Tavlerne gemmes automatisk i browseren på den computer, hvor du opretter dem. De synkroniseres ikke automatisk til andre computere.</p>
      <p>Hvis du laver en tavle på din private computer, ligger den ikke automatisk på skolens computer, selvom du åbner den samme hjemmeside.</p>
      <p>Brug som udgangspunkt den samme computer og browser til forberedelse og undervisning. Undgå at slette browserens webstedsdata, hvis du vil beholde tavlerne.</p>
    `],

    ['Hvis noget ikke virker', `
      <h4>En hjemmeside viser en fejlmeddelelse</h4>
      <p>Nogle hjemmesider kan ikke vises inde i undervisningstavlen. Klik på <strong>↗ Ny fane</strong>. Tavlen husker valget for det konkrete link.</p>

      <h4>Mit Google Slides-link åbner ikke som slideshow</h4>
      <p>Kontrollér, at linket slutter med <strong>/preview</strong> i stedet for <strong>/edit</strong>, og at du har adgang til præsentationen med den Google-konto, du bruger. Se afsnittet <a href="#ut-help-chapter-6" data-ut-help-target="ut-help-chapter-6">Sådan viser du en PowerPoint eller Google Slides-præsentation</a>.</p>

      <h4>Min PowerPoint virker ikke som slideshow</h4>
      <p>Gem eller download præsentationen som <strong>PDF (.pdf)</strong>, og tilføj <strong>PDF-filen</strong> til et programpunkt. Se afsnittet <a href="#ut-help-chapter-6" data-ut-help-target="ut-help-chapter-6">Sådan viser du en PowerPoint eller Google Slides-præsentation</a>.</p>

      <h4>Min YouTube-video starter ikke</h4>
      <p>Videoen starter ikke automatisk i stor visning. Klik selv på videoens <strong>▶</strong>-knap.</p>

      <h4>En elev mangler i gruppeinddelingen</h4>
      <p>Kontrollér, at eleven står under <strong>👥 Klasser</strong>, at den rigtige klasse er valgt under <strong>✎ Tavle</strong>, og at eleven ikke er slået fra under <strong>👥 Dagens elever</strong>.</p>

      <h4>Jeg kan ikke finde mine tavler på en anden computer</h4>
      <p>Tavlerne gemmes lokalt i browseren og overføres ikke automatisk. Se afsnittet <a href="#ut-help-chapter-12" data-ut-help-target="ut-help-chapter-12">Hvor bliver dine tavler gemt?</a>.</p>

      <h4>Jeg kan ikke finde et emne i årsoversigten</h4>
      <p>Kontrollér, at tavlerne har det rigtige tag, at skoleår og filtre passer, og at klasse og fag er angivet, hvis du filtrerer efter dem. Tavler uden tags vises under <strong>Kronologisk</strong>, men ikke under <strong>Efter emne</strong>.</p>

      <h4>Jeg har markeret et programpunkt forkert</h4>
      <p>Brug fortryd-funktionen ved programpunktet, og vælg derefter den rigtige markering.</p>

      <h4>Jeg kan ikke se redigeringsknapperne</h4>
      <p>Du kan være i visningstilstand. Klik på <strong>👁 Visning</strong> igen.</p>
    `],

    ['Mine forløb – gem og genbrug materialer', `
      <p><strong>📁 Mine forløb</strong> er din ressourcebank til materialer, du vil bruge igen. Her kan du samle links, PDF-filer og understøttede tavleelementer under et undervisningsforløb, fx <em>Industrialiseringen</em> eller <em>Brainbreaks</em>.</p>

      <h4>Opret et forløb</h4>
      <ol>
        <li>Åbn <strong>📁 Mine forløb</strong> fra ugeskemaet.</li>
        <li>Klik på <strong>+ Opret forløb</strong>.</li>
        <li>Giv forløbet et navn, og angiv eventuelt fag, klassetrin og planlægningsnoter.</li>
        <li>Tilføj eventuelt et link eller en PDF direkte i forløbet.</li>
      </ol>
      <p>Når du knytter et materiale i et dagsordenspunkt til et almindeligt undervisningsforløb i <strong>Mine forløb</strong>, får hele tavlen automatisk forløbets navn som tag. Tavlens øvrige tags bevares. En ren materialebank, fx <em>Brainbreaks</em>, giver derimod ikke tavlen et forløbstag.</p>

      <h4>Gem et materiale fra dagsordenen</h4>
      <ol>
        <li>Opret eller redigér et programpunkt med <strong>✎</strong>.</li>
        <li>Indsæt linket, eller vælg en fil under <strong>📎 Materiale (valgfrit)</strong>.</li>
        <li>Find <strong>📁 Gem også i Mine forløb</strong> nederst i redigeringen, og kontrollér, hvilket forløb der er valgt.</li>
        <li>Tryk på <strong>Gem</strong>. Et nyt link kan få sit eget materialenavn, så det er let at genkende senere.</li>
      </ol>
      <p><strong>Bemærk:</strong> Tavlens tag og materialets placering i <strong>Mine forløb</strong> er to forskellige ting. Du kan fx gemme en brainbreak i forløbet <em>Brainbreaks</em>, selvom tavlen har et helt andet tag. Vælg <strong>Gem ikke i Mine forløb</strong>, hvis materialet kun skal ligge på den aktuelle tavle.</p>

      <h4>Gem og genbrug tavleelementer</h4>
      <p>Du kan også gemme understøttede elementer, fx YouTube-videoer, i et forløb. Når du opretter et nyt programpunkt, kan du bruge <strong>📁 Hent fra Mine forløb</strong> til at finde et materiale, du allerede har gemt. Forslagene kan tage hensyn til tavlens tag, fag og klassetrin, men du kan også søge i andre forløb.</p>

      <h4>Se et materiale, før du bruger det</h4>
      <p>Klik på materialets <strong>navn</strong> i <strong>Mine forløb</strong> for at åbne eller forhåndsvise det. PDF-filer og YouTube-videoer vises i tavlen, mens almindelige hjemmesidelinks kan åbnes i en ny fane. Forhåndsvisning tilføjer ikke materialet til din aktuelle tavle. Brug den særskilte <strong>Fjern</strong>-knap, hvis du vil fjerne materialet fra forløbet.</p>

      <h4>Undgå dubletter</h4>
      <p>Hvis du gemmer præcis det samme materiale i det samme forløb igen, forsøger ressourcebanken at undgå dubletter. Kontroller altid, at du har valgt det ønskede forløb, når du gemmer.</p>

      <h4>Hvor er materialerne gemt?</h4>
      <p>Forløb og lokalt tilføjede filer er knyttet til browserens lokale data. De følger ikke automatisk med over på en anden computer. Se afsnittet <a href="#ut-help-chapter-12" data-ut-help-target="ut-help-chapter-12">Hvor bliver dine tavler gemt?</a>.</p>
    `],

    ['Grupper og makkere i dagsordenen', `
      <p>Du kan vælge <strong>en inddeling til hvert dagsordenspunkt</strong>. Inddelingen kan ses allerede før punktet bliver aktivt, og når punktet bliver aktivt, følger den med punktet.</p>

      <h4>Opret og vedligehold faste inddelinger</h4>
      <ol>
        <li>Åbn <strong>👥 Klasser</strong> fra ugeskemaet.</li>
        <li>Find den ønskede klasse, og klik på <strong>👥 Inddelinger</strong>.</li>
        <li>Her kan du oprette, omdøbe, redigere og slette klassens faste inddelinger.</li>
        <li>I redigeringen kan elever trækkes direkte fra én gruppe til en anden eller tilbage til <strong>Ikke placeret</strong>.</li>
      </ol>
      <p>De faste inddelinger hører til klassen og kan derfor oprettes på forhånd, uafhængigt af en bestemt tavle eller lektion.</p>

      <h4>Vælg inddeling til et dagsordenspunkt</h4>
      <ol>
        <li>Åbn punktet med <strong>✎</strong>, eller klik på <strong>+ Nyt punkt</strong>.</li>
        <li>Vælg <strong>👥 Makker</strong> eller <strong>👥👥 Gruppe</strong> under <strong>Arbejdsform</strong>.</li>
        <li>Under <strong>👥 Inddeling til dette dagsordenspunkt</strong> kan du vælge en gemt inddeling, danne en tilfældig inddeling eller oprette en manuel inddeling.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>
      <p>En tilfældig inddeling bliver bevaret, når den først er dannet, så <strong>👥 Vis inddeling</strong> ikke laver nye grupper, hver gang du åbner oversigten.</p>

      <h4>Vis og tilpas til den enkelte time</h4>
      <p>Klik på <strong>👥 Vis inddeling</strong> ved et dagsordenspunkt for at se fordelingen – også ved kommende punkter. Hvis dagens fremmøde eller undervisning kræver en anden fordeling, kan du vælge <strong>✏️ Tilpas til denne time</strong>. Den ændring gælder kun den aktuelle tavle/time og ændrer ikke klassens faste inddeling.</p>
      <p>Under <strong>👥 Dagens elever</strong> kan du slå fraværende elever fra. De skjules midlertidigt fra dagens gruppevisning uden at blive slettet fra den faste inddeling.</p>

      <h4>Ekstra gruppefunktioner</h4>
      <p>Et dagsordenspunkt kan også bruge <strong>↔️ Hvem skal mødes?</strong> og <strong>🚪 Hvem må arbejde udenfor?</strong>. Udearbejde registreres først i historikken, når du aktivt klikker på <strong>🚪 Registrér udearbejde</strong>.</p>
    `]
  ];

  const style = document.createElement('style');
  style.id = 'ut-help-style';

  style.textContent = `
    #ut-help-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 2147483640;
      background: rgba(20,28,38,.72);
      padding: clamp(8px,3vw,28px);
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
    }

    #ut-help-overlay.ut-help-open {
      display: flex;
    }

    #ut-help-panel {
      background: #fff;
      color: #202936;
      width: min(960px,100%);
      height: min(94vh,900px);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 70px #0005;
      overflow: hidden;
      font-family: inherit;
    }

    #ut-help-panel .ut-help-top {
      padding: 17px 23px;
      border-bottom: 1px solid #dce2e9;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
    }

    #ut-help-panel .ut-help-top h2 {
      font-size: 23px;
      margin: 0;
    }

    #ut-help-panel .ut-help-scroll {
      padding: 22px 28px 45px;
      overflow-y: auto;
      scroll-behavior: smooth;
      overscroll-behavior: contain;
      line-height: 1.65;
    }

    #ut-help-panel .ut-help-scroll h3 {
      font-size: 22px;
      margin: 0 0 14px;
      line-height: 1.3;
    }

    #ut-help-panel .ut-help-scroll h4 {
      font-size: 17px;
      margin: 24px 0 7px;
    }

    #ut-help-panel .ut-help-scroll p {
      margin: 10px 0;
    }

    #ut-help-panel .ut-help-scroll ol {
      padding-left: 27px;
      margin: 9px 0 16px;
    }

    #ut-help-panel .ut-help-scroll li {
      padding-left: 4px;
      margin: 5px 0;
    }

    #ut-help-panel .ut-help-index {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(245px,1fr));
      gap: 9px;
      margin: 18px 0 30px;
    }

    #ut-help-panel .ut-help-index a {
      color: #1e4969;
      text-decoration: none;
      background: #f1f5f9;
      border: 1px solid #dce5ed;
      border-radius: 9px;
      padding: 11px 13px;
      font-weight: 600;
      display: block;
    }

    #ut-help-panel .ut-help-index a:hover,
    #ut-help-panel .ut-help-index a:focus {
      background: #e3eef8;
      outline-offset: 2px;
    }

    #ut-help-panel .ut-help-chapter {
      border-top: 1px solid #dce2e9;
      padding: 28px 0 15px;
      scroll-margin-top: 14px;
    }

    #ut-help-panel .ut-help-chapter a[data-ut-help-target] {
      color: #1e4969;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    #ut-help-panel .ut-help-chapter a[data-ut-help-target]:hover,
    #ut-help-panel .ut-help-chapter a[data-ut-help-target]:focus {
      color: #0f3450;
    }

    #ut-help-panel .ut-help-return {
      display: inline-block;
      margin-top: 18px;
      color: #1e4969;
      font-weight: 600;
      text-decoration: underline;
    }

    #ut-help-panel .ut-help-important {
      border-left: 4px solid #bc6926;
      background: #fff7ed;
      padding: 13px 16px;
      border-radius: 6px;
    }

    @media (max-width: 600px) {
      #ut-help-panel .ut-help-scroll {
        padding: 15px 16px 32px;
      }

      #ut-help-panel .ut-help-top {
        padding: 12px 15px;
      }

      #ut-help-panel .ut-help-top h2 {
        font-size: 19px;
      }
    }
  `;

  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'ut-help-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'ut-help-heading');

  const index = sections.map(([title], i) =>
    `<a href="#ut-help-chapter-${i+1}" data-ut-help-target="ut-help-chapter-${i+1}">${i+1}. ${title}</a>`
  ).join('');

  const body = sections.map(([title, content], i) =>
    `<section class="ut-help-chapter" id="ut-help-chapter-${i+1}">
      <h3>${i+1}. ${title}</h3>
      ${content}
      <a class="ut-help-return" href="#ut-help-index" data-ut-help-target="ut-help-index">↑ Tilbage til indholdsfortegnelsen</a>
    </section>`
  ).join('');

  overlay.innerHTML = `
    <div id="ut-help-panel">
      <div class="ut-help-top">
        <h2 id="ut-help-heading">❔ Hjælp til undervisningstavlen</h2>
        <button class="btn" type="button" id="ut-help-close">✕ Luk</button>
      </div>

      <div class="ut-help-scroll" id="ut-help-scroll">
        <p>
          Velkommen! Her finder du trin-for-trin-vejledninger til tavlens funktioner.
          <strong>Er det første gang, du bruger tavlen?</strong>
          Begynd med punkt 1. Ellers kan du klikke på det emne, du vil have hjælp til.
        </p>

        <nav class="ut-help-index" id="ut-help-index" aria-label="Hjælpens indholdsfortegnelse">
          ${index}
        </nav>

        ${body}

        <p><strong>God fornøjelse!</strong> Du behøver ikke lære alle funktionerne på én gang.</p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  let previousFocus;

  function openHelp() {
    previousFocus = document.activeElement;
    overlay.classList.add('ut-help-open');
    document.getElementById('ut-help-scroll').scrollTop = 0;
    document.getElementById('ut-help-close').focus();
  }

  function closeHelp() {
    overlay.classList.remove('ut-help-open');

    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  }

  document.getElementById('ut-help-close').addEventListener('click', closeHelp);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeHelp();
  });

  overlay.querySelectorAll('[data-ut-help-target]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();

      document.getElementById(a.dataset.utHelpTarget)
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('ut-help-open')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeHelp();
    }
  }, true);

  function makeHelpButton() {
    const b = document.createElement('button');
    b.className = 'btn';
    b.type = 'button';
    b.textContent = '❔ Hjælp';
    b.addEventListener('click', openHelp);
    return b;
  }

  const scheduleButton = document.getElementById('classesBtn');

  if (scheduleButton) {
    scheduleButton.insertAdjacentElement('afterend', makeHelpButton());
  }

  const boardButton = document.getElementById('viewBtn');

  if (boardButton) {
    boardButton.insertAdjacentElement('beforebegin', makeHelpButton());
  }

  const fileInput = document.getElementById('materialFile');

  if (fileInput) {
    const reminder = document.createElement('p');
    reminder.className = 'sub';
    reminder.style.margin = '8px 0 0';

    reminder.innerHTML =
      '<strong>PowerPoint eller Google Slides som PDF?</strong> Vælg PDF-filen her. <strong>Google Slides med animationer og video?</strong> Indsæt et almindeligt link eller et /preview-link i linkfeltet ovenfor. Se Hjælp, punkt 4.';

    fileInput.insertAdjacentElement('afterend', reminder);
  }
})();
