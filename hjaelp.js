
/* Undervisningstavle – indbygget hjælp. Tilføj <script src="hjaelp.js"></script> før </body> i index.html. */
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
      <p><strong>Skal du vise PowerPoint eller Google Slides?</strong> Læs punkt 4 først. Præsentationen skal gemmes som PDF.</p>
    `],

    ['Sådan viser du en PowerPoint eller Google Slides-præsentation', `
      <p class="ut-help-important"><strong>Vigtigt:</strong> Du skal først gemme eller downloade præsentationen som en <strong>PDF-fil (.pdf)</strong>. Det er PDF-filen, du skal bruge på undervisningstavlen – ikke den oprindelige PowerPoint-fil eller et Google Slides-link.</p>

      <h4>A. PowerPoint</h4>
      <ol>
        <li>Åbn præsentationen i PowerPoint.</li>
        <li>Klik på <strong>Filer</strong>.</li>
        <li>Find <strong>Gem som</strong>, <strong>Eksportér</strong> eller <strong>Download</strong>. Navnet afhænger af din version.</li>
        <li>Vælg filtypen <strong>PDF (.pdf)</strong>.</li>
        <li>Gem filen et sted, du kan finde igen, fx <em>Downloads</em>.</li>
      </ol>

      <h4>B. Google Slides</h4>
      <ol>
        <li>Åbn præsentationen i Google Slides.</li>
        <li>Klik på <strong>Filer</strong> → <strong>Download</strong> → <strong>PDF-dokument (.pdf)</strong>.</li>
        <li>Vent, til filen er downloadet.</li>
      </ol>

      <h4>C. Læg PDF-filen på tavlen</h4>
      <ol>
        <li>Åbn din undervisningstavle.</li>
        <li>Klik på <strong>+ Nyt punkt</strong>, eller redigér et eksisterende punkt med <strong>✎</strong>.</li>
        <li>Find <strong>📎 Materiale (valgfrit)</strong>, og klik på <strong>📎 Vælg fil</strong>.</li>
        <li>Find og vælg <strong>PDF-filen</strong>.</li>
        <li>Vælg eventuelt <strong>Start på slide</strong>, hvis præsentationen skal begynde på en anden side end side 1.</li>
        <li>Klik på <strong>Gem</strong>.</li>
      </ol>

      <h4>D. Vis slideshowet</h4>
      <ol>
        <li>Klik på PDF-materialet i dagsordenen.</li>
        <li>Brug <strong>→</strong> til næste side og <strong>←</strong> til forrige side. Du kan også bruge pilene på skærmen.</li>
        <li>Brug <strong>+</strong>, <strong>−</strong> og <strong>Tilpas</strong> til at ændre størrelsen.</li>
        <li>Tryk på <strong>Esc</strong>, eller klik på <strong>✕ Luk</strong>, når du er færdig.</li>
      </ol>
      <p><strong>Bemærk:</strong> Animationer og overgange fra den oprindelige præsentation følger ikke med i PDF-filen.</p>
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

      <h4>📐 GeoGebra</h4>
      <ol>
        <li>Gem eller download GeoGebra-aktiviteten som en <strong>.ggb-fil</strong>.</li>
        <li>Vælg <strong>📐 GeoGebra</strong>.</li>
        <li>Vælg filen, og gem.</li>
        <li>Åbn aktiviteten i stor visning, hvis du vil arbejde med den på en større flade.</li>
      </ol>

      <h4>👥 Grupper / makkere og 🎯 Én elev</h4>
      <p>Disse funktioner bruger klassens elevliste. Se punkt 7.</p>
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
        <li>Vælg klassen i <strong>Klasse (valgfri)</strong>.</li>
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
      <p>Kopierne er selvstændige. Ændrer du en kopi, ændrer du ikke den oprindelige tavle.</p>
    `],

    ['Hvor bliver dine tavler gemt?', `
      <p class="ut-help-important"><strong>Vigtigt:</strong> Tavlerne gemmes automatisk i browseren på den computer, hvor du opretter dem. De synkroniseres ikke automatisk til andre computere.</p>
      <p>Hvis du laver en tavle på din private computer, ligger den ikke automatisk på skolens computer, selvom du åbner den samme hjemmeside.</p>
      <p>Brug som udgangspunkt den samme computer og browser til forberedelse og undervisning. Undgå at slette browserens webstedsdata, hvis du vil beholde tavlerne.</p>
    `],

    ['Hvis noget ikke virker', `
      <h4>En hjemmeside viser en fejlmeddelelse</h4>
      <p>Nogle hjemmesider kan ikke vises inde i undervisningstavlen. Klik på <strong>↗ Ny fane</strong>. Tavlen husker valget for det konkrete link.</p>

      <h4>Min PowerPoint virker ikke som slideshow</h4>
      <p>Gem eller download præsentationen som <strong>PDF (.pdf)</strong>, og tilføj <strong>PDF-filen</strong> til et programpunkt. Se punkt 4.</p>

      <h4>Min YouTube-video starter ikke</h4>
      <p>Videoen starter ikke automatisk i stor visning. Klik selv på videoens <strong>▶</strong>-knap.</p>

      <h4>En elev mangler i gruppeinddelingen</h4>
      <p>Kontrollér, at eleven står under <strong>👥 Klasser</strong>, at den rigtige klasse er valgt under <strong>✎ Tavle</strong>, og at eleven ikke er slået fra under <strong>👥 Dagens elever</strong>.</p>

      <h4>Jeg kan ikke finde mine tavler på en anden computer</h4>
      <p>Tavlerne gemmes lokalt i browseren og overføres ikke automatisk. Se punkt 10.</p>

      <h4>Jeg har markeret et programpunkt forkert</h4>
      <p>Brug fortryd-funktionen ved programpunktet, og vælg derefter den rigtige markering.</p>

      <h4>Jeg kan ikke se redigeringsknapperne</h4>
      <p>Du kan være i visningstilstand. Klik på <strong>👁 Visning</strong> igen.</p>
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

      #ut-help-panel .ut-help-scroll h3 {
        font-size: 20px;
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
      '<strong>PowerPoint eller Google Slides?</strong> Download præsentationen som PDF først, og vælg derefter PDF-filen her.';

    fileInput.insertAdjacentElement('afterend', reminder);
  }
})();
