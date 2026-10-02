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
        <li>Skriv et navn, fx <strong>7.B – Dansk</strong>.</li>
        <li>Klik på <strong>Opret tavle</strong>.</li>
      </ol>
      <p>Du behøver ikke vælge en klasse endnu. Det kan du gøre senere.</p>

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

      <h4>Tilføj en fil</h4>
      <ol>
        <li>Åbn programpunktets redigering.</li>
        <li>Klik på <strong>📎 Vælg fil</strong>.</li>
        <li>Find filen på computeren, og vælg den.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>

      <p><strong>Skal du vise en præsentation?</strong> Google Slides kan vises direkte på tavlen med et previewlink eller åbnes i en ny fane med et almindeligt link. PowerPoint og Google Slides kan også vises som PDF. Se punkt 4.</p>
    `],

    ['Sådan viser du en PowerPoint eller Google Slides-præsentation', `
      <p>Du kan vise præsentationer på undervisningstavlen på tre måder:</p>
      <ul>
        <li><strong>Google Slides med et previewlink:</strong> Præsentationen åbner direkte på tavlen, og animationer og videoer bevares.</li>
        <li><strong>Google Slides med et almindeligt link:</strong> Præsentationen åbner i en ny fane i browseren, ikke direkte på tavlen.</li>
        <li><strong>PowerPoint eller Google Slides som PDF:</strong> Præsentationen kan vises direkte på tavlen, men animationer, overgange og indlejrede videoer virker ikke.</li>
      </ul>

      <h4>A. Vis Google Slides direkte på tavlen med et previewlink</h4>
      <p>Hvis din arbejdsplads ikke tillader direkte visning af Google Slides, kan du vælge at dele præsentationen med din private Google-konto, hvis du har en.</p>

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
      <code>https://docs.google.com/presentation/d/ABC123/preview
