// Demo zum Förderband-Zustandsmodell: arbeitet mit aufgezeichneten Ausgaben der echten Funktion
// zeitschritt_ausfuehren() (demo/daten/lauf.js). Alle sichtbaren Texte stehen im Wörterbuch TEXTE (de und fr);
// die aufgezeichneten Ausgaben (Zustandsnamen, Zahlen, Schlüssel) sind sprachneutral.
(function () {
  "use strict";
  var LAUF = window.LAUF;

  var TEXTE = {
    de: {
      titel: "Förderband Zustandsmodell Demo",
      sprung: "Zum Inhalt springen",
      marke: "Lernprojekt · maschinenzustand-simulation",
      sprachwahl: "Sprache",
      h1: "Förderband: Was passiert nach einem Not-Halt?",
      lead: "Ein kleines Python-Modell beschreibt, wie ein Förderband auf Start, Stopp, Not-Halt, Sensorfehler und Rücksetzen reagiert. Hier kannst du die Eingaben selbst drücken.",
      herkunft: "<b>Ausgabe eines echten Laufs des Projekts</b>: Python {python}, Quellstand {quellstand}, Lauf vom {datum}. Jeder Klick schlägt eine echte Ausgabe von `zeitschritt_ausfuehren()` nach.",
      hAufgabe: "Aufgabe",
      tAufgabe: "Normalbetrieb, Not-Halt und Sensorfehler eines Förderbands sollen vor Versuchen an echter Hardware nachvollziehbar durchgespielt werden. Ein Not-Halt darf dabei nicht einfach verschwinden.",
      hDaten: "Daten",
      tDaten: "Das Modell in `modell.json` (vier Zustände, sechs Eingaben, ein Zeitschritt von einer Sekunde) und drei synthetische Szenarien in `beispieldaten/szenarien.json`. Es gibt keine Messwerte einer Anlage.",
      hFall: "Anwendungsfall: Not-Halt und Sensorfehler durchspielen",
      tFall: "Probiere diese Folge: Start, Not-Halt, noch einmal Start, Rücksetzen, Start. Nach dem Not-Halt bleibt der Start gesperrt, bis bewusst zurückgesetzt wird. Zurückgesetzt läuft das Band nicht von selbst an.",
      aktuell: "Aktueller Zustand", band: "Band", zeit: "Modellzeit",
      laeuft: "läuft", steht: "steht",
      sek: "{n} s",
      eingabenTitel: "Eingabe senden",
      strahl: "Zustandsverlauf",
      strahlLeer: "Noch keine Eingabe gesendet. Das Band ist im Zustand bereit.",
      protokoll: { zeit: "Zeit", eingabe: "Eingabe", vorher: "Vorher", nachher: "Nachher", band: "Band", ereignis: "Meldung" },
      protokollLeer: "Noch keine Schritte.",
      tProtokoll: "Jede gültige Eingabe verbraucht genau eine Modellsekunde, auch ein gesperrter Start. Die Meldungen sind die Texte aus der Ausgabe von `src/simulation.py`.",
      neu: "Neu beginnen (bereit, Sekunde 0)",
      warnung: "Das ist ein Zustandsmodell auf dem Papier des Rechners: Es steuert keine Maschine und ist keine Sicherheitssteuerung. `bewegung` ist nur der Vergleich „Zustand ist Betrieb“. Position, Geschwindigkeit oder Bremsweg werden nicht berechnet.",
      hSzen: "Die drei Szenarien des Projekts",
      tSzen: "Diese Folgen stehen in `beispieldaten/szenarien.json`. Die Spalte „erwartet“ stammt aus dieser Datei, die Spalte „Lauf“ aus der echten Funktion.",
      szenario: { normalbetrieb: "Normalbetrieb", "not-halt": "Not-Halt", sensorfehler: "Sensorfehler" },
      abspielen: "Im Simulator abspielen",
      stimmt: "Alle Schritte stimmen überein.",
      abweichung: "Abweichung!",
      colEingabe: "Eingabe", colLauf: "Lauf", colErwartet: "erwartet",
      hTabelle: "Alle 24 Übergänge",
      tTabelle: "Jeder Zustand mit jeder Eingabe, einzeln mit der echten Funktion berechnet. Fett: der Zustand ändert sich. Auffällig: Not-Halt wirkt aus jedem Zustand, ein Sensorfehler im Not-Halt ändert nichts, und Rücksetzen im Betrieb hat keine Wirkung.",
      colZustand: "Zustand ↓ / Eingabe →",
      hCli: "Echter Kommandozeilenaufruf",
      tCli: "So ruft man genau einen Schritt auf. Die Ausgabe ist ein JSON-Datensatz. Eine unbekannte Eingabe wird mit einer deutschen Fehlermeldung und Exitcode 1 abgewiesen.",
      ausgabe: "Ausgabe", fehlerausgabe: "Fehlerausgabe", exitcode: "Exitcode",
      hErgebnis: "Ergebnis",
      ergebnis: [
        "Alle 24 Kombinationen aus Zustand und Eingabe wurden mit dem Originalcode berechnet und sind hier abrufbar.",
        "Die drei Szenarien (Normalbetrieb, Not-Halt, Sensorfehler) stimmen Schritt für Schritt mit den erwarteten Zuständen überein.",
        "Der Prüfer des Projekts (`nachweise/pruefe_szenarien.py`) wurde für diese Demo ausgeführt: Exitcode {pruef}. {pruefzeile}",
        "Nach Rücksetzen bleibt das Band bereit und steht: Ein erneuter Start muss bewusst erfolgen.",
      ],
      hGrenzen: "Grenzen",
      grenzen: [
        "Lernprojekt mit synthetischen Daten, mit KI-Unterstützung entwickelt und geprüft. Keine Aussage über Berufserfahrung.",
        "Keine echte Maschine, kein Simulink-, ISG- oder SCADA-Produktlauf. Eine Modellsekunde ist keine gemessene Reaktionszeit.",
        "Not-Halt bedeutet hier nur einen sofortigen Zustandswechsel. Das weist weder ein reales Anhalten noch eine sicherheitsgerichtete Steuerung nach. Rücksetzen nimmt an, dass die Ursache behoben ist.",
        "Diese Seite ist statisch: Python läuft nicht im Browser. Die Ausgaben wurden vorab aufgezeichnet (`demo/erzeugen.py`). Weil das Modell nur 24 Übergänge hat, sind alle möglichen Klicks abgedeckt.",
      ],
      hEntscheidungen: "Entscheidungen im Projekt",
      entscheidungen: [
        "Zustände und Eingaben sind explizit in `modell.json` festgelegt, die Zeit läuft in festen Schritten.",
        "Ein Start ist nur aus dem Zustand bereit möglich. Nach Not-Halt oder Fehler bleibt er gesperrt.",
        "Not-Halt hat Vorrang vor allen anderen Signalen.",
        "Rücksetzen führt in den Zustand bereit, nicht zurück in den Betrieb.",
      ],
      fText: "Diese Seite gehört zum Lernprojekt maschinenzustand-simulation. Die gezeigten Ausgaben stammen aus einem echten Lauf des Python-Codes, nicht aus einer Nachbildung.",
      fCode: "Quellcode auf GitHub", fPortfolio: "Portfolio",
      zustand: { bereit: "bereit", betrieb: "Betrieb", "not-halt": "Not-Halt", fehler: "Fehler" },
      eingabe: { start: "Start", zeitschritt: "Zeitschritt", stopp: "Stopp", "not-halt": "Not-Halt", sensorfehler: "Sensorfehler", ruecksetzen: "Rücksetzen" },
      ereignis: {
        unveraendert: "Zustand unverändert.", nothalt: "Not-Halt gesetzt; Band steht.", sensorfehler: "Sensorfehler gesetzt; Band steht.",
        zurueck: "Bewusst zurückgesetzt; Band bleibt stehen.", gestartet: "Band gestartet.", gesperrt: "Start gesperrt; Rücksetzen erforderlich.", gestoppt: "Band gestoppt.",
      },
      pruefzeile: "Ergebnis: bestanden.",
    },
    fr: {
      titel: "Démo modèle d'états tapis",
      sprung: "Aller au contenu",
      marke: "Projet d'apprentissage · maschinenzustand-simulation",
      sprachwahl: "Langue",
      h1: "Tapis roulant : que se passe-t-il après un arrêt d'urgence ?",
      lead: "Un petit modèle Python décrit comment un tapis roulant réagit à Démarrer, Arrêt, arrêt d'urgence, défaut de capteur et réarmement. Ici, tu peux envoyer les commandes toi-même.",
      herkunft: "<b>Sortie d'une vraie exécution du projet</b> : Python {python}, état du code {quellstand}, exécution du {datum}. Chaque clic consulte une vraie sortie de `zeitschritt_ausfuehren()`.",
      hAufgabe: "Tâche",
      tAufgabe: "Le fonctionnement normal, l'arrêt d'urgence et le défaut de capteur d'un tapis roulant doivent pouvoir être rejoués de façon compréhensible avant des essais sur du vrai matériel. Un arrêt d'urgence ne doit pas simplement disparaître.",
      hDaten: "Données",
      tDaten: "Le modèle dans `modell.json` (quatre états, six entrées, un pas de temps d'une seconde) et trois scénarios synthétiques dans `beispieldaten/szenarien.json`. Il n'y a aucune mesure d'une installation réelle.",
      hFall: "Cas d'usage : rejouer arrêt d'urgence et défaut de capteur",
      tFall: "Essaie cette suite : Démarrer, arrêt d'urgence, encore Démarrer, Réarmer, Démarrer. Après l'arrêt d'urgence, le démarrage reste bloqué jusqu'à un réarmement volontaire. Après le réarmement, le tapis ne redémarre pas tout seul.",
      aktuell: "État actuel", band: "Tapis", zeit: "Temps du modèle",
      laeuft: "en marche", steht: "à l'arrêt",
      sek: "{n} s",
      eingabenTitel: "Envoyer une entrée",
      strahl: "Déroulement des états",
      strahlLeer: "Aucune entrée envoyée pour l'instant. Le tapis est dans l'état prêt.",
      protokoll: { zeit: "Temps", eingabe: "Entrée", vorher: "Avant", nachher: "Après", band: "Tapis", ereignis: "Message" },
      protokollLeer: "Aucune étape pour l'instant.",
      tProtokoll: "Chaque entrée valide consomme exactement une seconde de modèle, même un démarrage bloqué. Les messages sont les textes de la sortie de `src/simulation.py`, traduits ici.",
      neu: "Recommencer (prêt, seconde 0)",
      warnung: "Il s'agit d'un modèle d'états sur ordinateur : il ne pilote aucune machine et n'est pas une commande de sécurité. `bewegung` est seulement la comparaison « l'état est en service ». Position, vitesse et distance de freinage ne sont pas calculées.",
      hSzen: "Les trois scénarios du projet",
      tSzen: "Ces suites figurent dans `beispieldaten/szenarien.json`. La colonne « attendu » vient de ce fichier, la colonne « exécution » de la vraie fonction.",
      szenario: { normalbetrieb: "Fonctionnement normal", "not-halt": "Arrêt d'urgence", sensorfehler: "Défaut de capteur" },
      abspielen: "Rejouer dans le simulateur",
      stimmt: "Toutes les étapes concordent.",
      abweichung: "Écart !",
      colEingabe: "Entrée", colLauf: "Exécution", colErwartet: "attendu",
      hTabelle: "Les 24 transitions",
      tTabelle: "Chaque état avec chaque entrée, calculé un par un avec la vraie fonction. En gras : l'état change. À noter : l'arrêt d'urgence agit depuis tout état, un défaut de capteur pendant l'arrêt d'urgence ne change rien, et le réarmement en service n'a aucun effet.",
      colZustand: "État ↓ / entrée →",
      hCli: "Vrai appel en ligne de commande",
      tCli: "Voici comment appeler exactement une étape. La sortie est un enregistrement JSON. Une entrée inconnue est refusée avec un message d'erreur en allemand et le code de sortie 1.",
      ausgabe: "Sortie", fehlerausgabe: "Sortie d'erreur", exitcode: "Code de sortie",
      hErgebnis: "Résultat",
      ergebnis: [
        "Les 24 combinaisons d'état et d'entrée ont été calculées avec le code d'origine et sont consultables ici.",
        "Les trois scénarios (fonctionnement normal, arrêt d'urgence, défaut de capteur) concordent étape par étape avec les états attendus.",
        "Le vérificateur du projet (`nachweise/pruefe_szenarien.py`) a été exécuté pour cette démo : code de sortie {pruef}. {pruefzeile}",
        "Après le réarmement, le tapis reste prêt et à l'arrêt : un nouveau démarrage doit être décidé volontairement.",
      ],
      hGrenzen: "Limites",
      grenzen: [
        "Projet d'apprentissage avec données synthétiques, développé et vérifié avec l'aide d'une IA. Aucune affirmation sur une expérience professionnelle.",
        "Pas de vraie machine, pas d'exécution avec Simulink, ISG ou SCADA. Une seconde de modèle n'est pas un temps de réaction mesuré.",
        "L'arrêt d'urgence signifie ici seulement un changement d'état immédiat. Cela ne prouve ni un arrêt réel ni une commande orientée sécurité. Le réarmement suppose que la cause est éliminée.",
        "Cette page est statique : Python ne tourne pas dans le navigateur. Les sorties ont été enregistrées à l'avance (`demo/erzeugen.py`). Comme le modèle n'a que 24 transitions, tous les clics possibles sont couverts.",
      ],
      hEntscheidungen: "Décisions dans le projet",
      entscheidungen: [
        "Les états et les entrées sont définis explicitement dans `modell.json`, le temps avance par pas fixes.",
        "Un démarrage n'est possible que depuis l'état prêt. Après un arrêt d'urgence ou un défaut, il reste bloqué.",
        "L'arrêt d'urgence est prioritaire sur tous les autres signaux.",
        "Le réarmement ramène à l'état prêt, pas à l'état en service.",
      ],
      fText: "Cette page accompagne le projet d'apprentissage maschinenzustand-simulation. Les sorties affichées viennent d'une vraie exécution du code Python, pas d'une imitation.",
      fCode: "Code source sur GitHub", fPortfolio: "Portfolio",
      zustand: { bereit: "prêt", betrieb: "en service", "not-halt": "arrêt d'urgence", fehler: "défaut" },
      eingabe: { start: "Démarrer", zeitschritt: "Pas de temps", stopp: "Arrêt", "not-halt": "Arrêt d'urgence", sensorfehler: "Défaut capteur", ruecksetzen: "Réarmer" },
      ereignis: {
        unveraendert: "État inchangé.", nothalt: "Arrêt d'urgence activé ; le tapis est à l'arrêt.", sensorfehler: "Défaut de capteur activé ; le tapis est à l'arrêt.",
        zurueck: "Réarmement volontaire ; le tapis reste à l'arrêt.", gestartet: "Tapis démarré.", gesperrt: "Démarrage bloqué ; un réarmement est nécessaire.", gestoppt: "Tapis arrêté.",
      },
      pruefzeile: "Résultat : réussi.",
    },
  };

  var SPRACHEN = { de: "de-DE", fr: "fr-FR" };
  var sprache = "de";
  var verlauf = [];
  var T = function () { return TEXTE[sprache]; };

  function format(text, werte) {
    return text.replace(/\{(\w+)\}/g, function (_, k) { return werte && werte[k] != null ? werte[k] : "{" + k + "}"; });
  }
  function el(name, klasse, text) {
    var e = document.createElement(name);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }
  function reich(ziel, text) {
    ziel.textContent = "";
    text.split(/(`[^`]+`|<b>.*?<\/b>)/).forEach(function (teil) {
      if (!teil) return;
      if (teil[0] === "`") ziel.appendChild(el("code", null, teil.slice(1, -1)));
      else if (teil.slice(0, 3) === "<b>") ziel.appendChild(el("strong", null, teil.slice(3, -4)));
      else ziel.appendChild(document.createTextNode(teil));
    });
  }
  function setze(id, text) { reich(document.getElementById(id), text); }
  function liste(id, eintraege, werte) {
    var ul = document.getElementById(id);
    ul.textContent = "";
    eintraege.forEach(function (t) { var li = el("li"); reich(li, format(t, werte)); ul.appendChild(li); });
  }
  function sek(n) { return format(T().sek, { n: new Intl.NumberFormat(SPRACHEN[sprache]).format(n) }); }
  function zustandsname(z) { return T().zustand[z]; }
  function aktuellerZustand() { return verlauf.length ? verlauf[verlauf.length - 1].nachher : LAUF.modell.anfangszustand; }
  function aktuelleZeit() { return verlauf.length ? verlauf[verlauf.length - 1].zeit : 0; }

  function senden(eingabe) {
    var vorher = aktuellerZustand();
    var echt = LAUF.tabelle[vorher][eingabe];
    verlauf.push({ zeit: aktuelleZeit() + LAUF.modell.zeitschrittSekunden, vorher: vorher, eingabe: eingabe, nachher: echt.nachher, bewegung: echt.bewegung, ereignis: echt.ereignis });
    renderSim();
  }

  function renderKopf() {
    var t = T(), m = LAUF.meta;
    document.documentElement.lang = sprache;
    document.title = t.titel;
    document.getElementById("sprung").textContent = t.sprung;
    document.getElementById("marke").textContent = t.marke;
    document.getElementById("sprachwahl").setAttribute("aria-label", t.sprachwahl);
    Array.prototype.forEach.call(document.querySelectorAll("#sprachwahl button"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-sprache") === sprache));
    });
    setze("h1", t.h1); setze("lead", t.lead);
    setze("herkunft", format(t.herkunft, { python: m.python, quellstand: m.quellstand, datum: new Intl.DateTimeFormat(SPRACHEN[sprache], { dateStyle: "long", timeZone: "UTC" }).format(new Date(m.datum + "T00:00:00Z")) }));
    setze("h-aufgabe", t.hAufgabe); setze("t-aufgabe", t.tAufgabe);
    setze("h-daten", t.hDaten); setze("t-daten", t.tDaten);
    setze("h-fall", t.hFall); setze("t-fall", t.tFall);
    setze("l-tasten", t.eingabenTitel); setze("l-strahl", t.strahl);
    setze("t-protokoll", t.tProtokoll); setze("t-warnung", t.warnung);
    document.getElementById("neu").textContent = t.neu;
    setze("h-szen", t.hSzen); setze("t-szen", t.tSzen);
    setze("h-tabelle", t.hTabelle); setze("t-tabelle", t.tTabelle);
    setze("h-cli", t.hCli); setze("t-cli", t.tCli);
    setze("h-ergebnis", t.hErgebnis);
    liste("l-ergebnis", t.ergebnis, { pruef: m.pruefer.exitcode, pruefzeile: m.pruefer.exitcode === 0 ? t.pruefzeile : "" });
    setze("h-grenzen", t.hGrenzen); liste("l-grenzen", t.grenzen);
    setze("h-entscheidungen", t.hEntscheidungen); liste("l-entscheidungen", t.entscheidungen);
    setze("f-text", t.fText);
    document.getElementById("f-code").textContent = t.fCode;
    document.getElementById("f-portfolio").textContent = t.fPortfolio;
  }

  function renderSim() {
    var t = T(), z = aktuellerZustand();
    var status = document.getElementById("status");
    status.textContent = "";
    var a = el("div", "z-" + z);
    a.appendChild(el("small", null, t.aktuell));
    a.appendChild(el("span", "gross", zustandsname(z)));
    a.appendChild(el("span", "kennung", "  " + z));
    status.appendChild(a);
    var laeuft = LAUF.tabelle[z].zeitschritt.bewegung;
    var b = el("div");
    b.appendChild(el("small", null, t.band));
    var bw = el("span", "gross");
    bw.appendChild(el("span", "lampe" + (laeuft ? " an" : "")));
    bw.appendChild(document.createTextNode(laeuft ? t.laeuft : t.steht));
    b.appendChild(bw);
    status.appendChild(b);
    var c = el("div");
    c.appendChild(el("small", null, t.zeit));
    c.appendChild(el("span", "gross", sek(aktuelleZeit())));
    status.appendChild(c);

    var tasten = document.getElementById("tasten");
    tasten.textContent = "";
    LAUF.modell.eingaben.forEach(function (e) {
      var k = el("button", e === "not-halt" || e === "sensorfehler" ? "rot" : null, t.eingabe[e]);
      k.type = "button";
      k.addEventListener("click", function () { senden(e); });
      tasten.appendChild(k);
    });

    var strahl = document.getElementById("zeitstrahl");
    strahl.textContent = "";
    if (!verlauf.length) strahl.appendChild(el("li", "leer", t.strahlLeer)); else {
      verlauf.forEach(function (s) {
        var li = el("li", "t-" + s.nachher);
        li.appendChild(document.createTextNode(zustandsname(s.nachher) + " "));
        li.appendChild(el("small", null, sek(s.zeit)));
        strahl.appendChild(li);
      });
    }

    var tab = document.getElementById("protokoll");
    tab.textContent = "";
    var kopf = el("tr");
    ["zeit", "eingabe", "vorher", "nachher", "band", "ereignis"].forEach(function (k) { var th = el("th", k === "zeit" ? "zahl" : null, t.protokoll[k]); th.scope = "col"; kopf.appendChild(th); });
    var thead = el("thead"); thead.appendChild(kopf); tab.appendChild(thead);
    var tb = el("tbody");
    if (!verlauf.length) {
      var lr = el("tr"); var ld = el("td", "leer", t.protokollLeer); ld.colSpan = 6; lr.appendChild(ld); tb.appendChild(lr);
    }
    verlauf.forEach(function (s) {
      var tr = el("tr");
      tr.appendChild(el("td", "zahl", sek(s.zeit)));
      tr.appendChild(el("td", null, t.eingabe[s.eingabe]));
      tr.appendChild(el("td", null, zustandsname(s.vorher)));
      tr.appendChild(el("td", null, zustandsname(s.nachher)));
      tr.appendChild(el("td", null, s.bewegung ? t.laeuft : t.steht));
      tr.appendChild(el("td", "ereignis", t.ereignis[s.ereignis]));
      tb.appendChild(tr);
    });
    tab.appendChild(tb);
  }

  function renderSzenarien() {
    var t = T(), box = document.getElementById("szenarien");
    box.textContent = "";
    LAUF.szenarien.forEach(function (s) {
      var k = el("article", "karte");
      k.appendChild(el("h3", null, t.szenario[s.id]));
      var w = el("div", "tabelle"), tab = el("table");
      var kopf = el("tr");
      ["zeit", "colEingabe", "colLauf", "colErwartet"].forEach(function (key) {
        var th = el("th", key === "zeit" ? "zahl" : null, key === "zeit" ? t.protokoll.zeit : t[key]); th.scope = "col"; kopf.appendChild(th);
      });
      var thead = el("thead"); thead.appendChild(kopf); tab.appendChild(thead);
      var tb = el("tbody");
      s.schritte.forEach(function (x) {
        var tr = el("tr");
        tr.appendChild(el("td", "zahl", sek(x.zeit)));
        tr.appendChild(el("td", null, t.eingabe[x.eingabe]));
        tr.appendChild(el("td", null, zustandsname(x.nachher)));
        tr.appendChild(el("td", null, zustandsname(x.erwartet) + (x.nachher === x.erwartet ? " ✓" : " ✗")));
        tb.appendChild(tr);
      });
      tab.appendChild(tb); w.appendChild(tab); k.appendChild(w);
      k.appendChild(el("p", s.stimmt ? "stimmt" : "stopp", s.stimmt ? t.stimmt : t.abweichung));
      var knopf = el("button", "knopf", t.abspielen);
      knopf.type = "button";
      knopf.addEventListener("click", function () {
        verlauf = s.schritte.map(function (x) { return { zeit: x.zeit, vorher: x.vorher, eingabe: x.eingabe, nachher: x.nachher, bewegung: x.bewegung, ereignis: x.ereignis }; });
        renderSim();
        document.getElementById("status").scrollIntoView({ block: "center" });
      });
      k.appendChild(knopf);
      box.appendChild(k);
    });
  }

  function renderUebergaenge() {
    var t = T(), tab = document.getElementById("uebergaenge");
    tab.textContent = "";
    var kopf = el("tr");
    var th0 = el("th", null, t.colZustand); th0.scope = "col"; kopf.appendChild(th0);
    LAUF.modell.eingaben.forEach(function (e) { var th = el("th", null, t.eingabe[e]); th.scope = "col"; kopf.appendChild(th); });
    var thead = el("thead"); thead.appendChild(kopf); tab.appendChild(thead);
    var tb = el("tbody");
    LAUF.modell.zustaende.forEach(function (z) {
      var tr = el("tr");
      var th = el("th", null, zustandsname(z)); th.scope = "row"; tr.appendChild(th);
      LAUF.modell.eingaben.forEach(function (e) {
        var r = LAUF.tabelle[z][e];
        var td = el("td", "uebergang");
        td.appendChild(el("span", r.nachher === z ? "gleich" : "wechsel", (r.nachher === z ? "= " : "→ ") + zustandsname(r.nachher)));
        td.title = t.ereignis[r.ereignis];
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
    tab.appendChild(tb);
  }

  function renderCli() {
    var t = T(), box = document.getElementById("cli");
    box.textContent = "";
    [LAUF.cli.erfolg, LAUF.cli.fehler].forEach(function (c) {
      box.appendChild(el("pre", "codeblock", "> " + c.befehl));
      box.appendChild(el("p", "beschr", t.exitcode + " " + c.exitcode + " · " + (c.exitcode === 0 ? t.ausgabe : t.fehlerausgabe)));
      box.appendChild(el("pre", "codeblock", c.exitcode === 0 ? c.ausgabe : c.fehlerausgabe));
    });
  }

  function alles() { renderKopf(); renderSim(); renderSzenarien(); renderUebergaenge(); renderCli(); }
  function setzeSprache(neu, url) {
    sprache = neu;
    if (url) {
      try {
        var u = new URL(window.location.href);
        if (neu === "de") u.searchParams.delete("lang"); else u.searchParams.set("lang", neu);
        window.history.replaceState(null, "", u.toString());
      } catch (e) { /* ohne Adressleiste weiter */ }
    }
    alles();
  }

  Array.prototype.forEach.call(document.querySelectorAll("#sprachwahl button"), function (b) {
    b.addEventListener("click", function () { setzeSprache(b.getAttribute("data-sprache"), true); });
  });
  document.getElementById("neu").addEventListener("click", function () { verlauf = []; renderSim(); });

  var anfang = "de";
  try { if (new URLSearchParams(window.location.search).get("lang") === "fr") anfang = "fr"; } catch (e) { /* Standard */ }
  setzeSprache(anfang, false);
})();
