"""Erzeugt demo/daten/lauf.js aus echten Läufen von src/simulation.py.

Aufruf im Projektordner:
    uv run --offline --python 3.12 python -X utf8 demo/erzeugen.py
oder mit jedem Python ab 3.9:  python -X utf8 demo/erzeugen.py

Aufgezeichnet werden: alle 24 Übergänge (4 Zustände mal 6 Eingaben) mit der echten Funktion
zeitschritt_ausfuehren(), die drei Szenarien aus beispieldaten/szenarien.json Schritt für Schritt,
je ein echter Kommandozeilenaufruf (Erfolg und Fehler) und der Lauf des Projektprüfers
nachweise/pruefe_szenarien.py.
"""

import datetime
import importlib.util
import json
import platform
import subprocess
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(WURZEL / "src"))
spec = importlib.util.spec_from_file_location("simulation", WURZEL / "src" / "simulation.py")
simulation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(simulation)

MODELL = json.loads((WURZEL / "modell.json").read_text(encoding="utf-8"))
SZENARIEN = json.loads((WURZEL / "beispieldaten" / "szenarien.json").read_text(encoding="utf-8"))

# Meldungen der echten Funktion -> neutrale Schlüssel (die Texte der Seite stehen im Wörterbuch von app.js)
EREIGNISSE = {
    "Zustand unverändert.": "unveraendert",
    "Not-Halt gesetzt; Band steht.": "nothalt",
    "Sensorfehler gesetzt; Band steht.": "sensorfehler",
    "Bewusst zurückgesetzt; Band bleibt stehen.": "zurueck",
    "Band gestartet.": "gestartet",
    "Start gesperrt; Rücksetzen erforderlich.": "gesperrt",
    "Band gestoppt.": "gestoppt",
}


def schluessel(ereignis):
    if ereignis not in EREIGNISSE:
        raise SystemExit("Unbekannte Meldung: " + ereignis)
    return EREIGNISSE[ereignis]


def kurz(protokoll):
    return {
        "nachher": protokoll["nachher"],
        "bewegung": protokoll["bewegung"],
        "ereignis": schluessel(protokoll["ereignis"]),
    }


def befehl(argumente):
    ergebnis = subprocess.run(
        [sys.executable, "-X", "utf8", "src/simulation.py", *argumente],
        cwd=WURZEL, capture_output=True, text=True, encoding="utf-8",
    )
    return {
        "befehl": "python src/simulation.py " + " ".join(argumente),
        "exitcode": ergebnis.returncode,
        "ausgabe": ergebnis.stdout.strip(),
        "fehlerausgabe": ergebnis.stderr.strip(),
    }


# 1. alle Übergänge
tabelle = {}
for zustand in MODELL["zustaende"]:
    tabelle[zustand] = {}
    for eingabe in MODELL["eingaben"]:
        tabelle[zustand][eingabe] = kurz(simulation.zeitschritt_ausfuehren(zustand, eingabe, 0))

# 2. Szenarien Schritt für Schritt, ab "bereit" und Sekunde 0
szenarien = []
for szenario in SZENARIEN:
    zustand, zeit, schritte = MODELL["anfangszustand"], 0, []
    for eingabe, erwartet in zip(szenario["eingaben"], szenario["erwartet"]):
        protokoll = simulation.zeitschritt_ausfuehren(zustand, eingabe, zeit)
        schritte.append({
            "zeit": protokoll["zeit_sekunden"], "vorher": protokoll["vorher"], "eingabe": eingabe,
            **kurz(protokoll), "erwartet": erwartet,
        })
        zustand, zeit = protokoll["nachher"], protokoll["zeit_sekunden"]
    szenarien.append({
        "id": szenario["id"], "schritte": schritte,
        "stimmt": all(s["nachher"] == s["erwartet"] for s in schritte),
    })

# 3. echte Kommandozeilenaufrufe und der Projektprüfer
cli_ok = befehl(["bereit", "start", "0"])
cli_fehler = befehl(["bereit", "foo"])
pruefer = subprocess.run(
    [sys.executable, "-X", "utf8", "nachweise/pruefe_szenarien.py"],
    cwd=WURZEL, capture_output=True, text=True, encoding="utf-8",
)
zeilen = [z for z in pruefer.stdout.splitlines() if z.startswith("BESTANDEN") or z.startswith("FEHLER")]
git = subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=WURZEL, capture_output=True, text=True).stdout.strip()
# Der Prüfer schreibt keine Dateien; falls ein anderer Stand das tut, bleibt der Arbeitsbaum sauber
subprocess.run(["git", "checkout", "--", "nachweise"], cwd=WURZEL, capture_output=True)

daten = {
    "meta": {
        "python": platform.python_version(), "quellstand": git,
        "datum": datetime.datetime.now(datetime.timezone.utc).date().isoformat(),
        "pruefer": {"befehl": "python -X utf8 nachweise/pruefe_szenarien.py", "exitcode": pruefer.returncode, "zeile": zeilen[0] if zeilen else ""},
    },
    "modell": {
        "zustaende": MODELL["zustaende"], "eingaben": MODELL["eingaben"], "anfangszustand": MODELL["anfangszustand"],
        "zeitschrittSekunden": MODELL["zeitschrittSekunden"], "echteMaschineVerbunden": MODELL["echteMaschineVerbunden"],
    },
    "tabelle": tabelle,
    "szenarien": szenarien,
    "cli": {"erfolg": cli_ok, "fehler": cli_fehler},
}
ziel = WURZEL / "demo" / "daten" / "lauf.js"
ziel.parent.mkdir(parents=True, exist_ok=True)
ziel.write_text("window.LAUF = " + json.dumps(daten, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8", newline="\n")
print("lauf.js geschrieben:", len(szenarien), "Szenarien,", sum(len(v) for v in tabelle.values()), "Übergänge, Prüfer Exitcode", pruefer.returncode)
