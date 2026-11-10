"""Vergleicht die drei vorhandenen Sollszenarien mit der Python-Simulation."""

import json
from pathlib import Path
import sys

PROJEKTORDNER = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJEKTORDNER))

from src.simulation import zeitschritt_ausfuehren
from pruefe_beispieldaten import beispieldaten_pruefen


# Ergänzt die Zustands-Sollwerte der unveränderten Beispiele um fachliche Folgen.
# Die Sollwerte werden nicht aus der Simulationsfunktion berechnet.
ERWARTETE_FOLGEN = {
    "normalbetrieb": [
        (True, "Band gestartet."),
        (True, "Zustand unverändert."),
        (False, "Band gestoppt."),
    ],
    "not-halt": [
        (True, "Band gestartet."),
        (False, "Not-Halt gesetzt; Band steht."),
        (False, "Start gesperrt; Rücksetzen erforderlich."),
        (False, "Bewusst zurückgesetzt; Band bleibt stehen."),
    ],
    "sensorfehler": [
        (True, "Band gestartet."),
        (False, "Sensorfehler gesetzt; Band steht."),
        (False, "Bewusst zurückgesetzt; Band bleibt stehen."),
    ],
}


def szenarien_pruefen():
    beispieldaten_pruefen()
    modell = json.loads((PROJEKTORDNER / "modell.json").read_text(encoding="utf-8"))
    szenarien = json.loads(
        (PROJEKTORDNER / "beispieldaten/szenarien.json").read_text(encoding="utf-8")
    )
    if len(szenarien) != 3 or {szenario["id"] for szenario in szenarien} != set(ERWARTETE_FOLGEN):
        raise ValueError("Genau Normalbetrieb, Not-Halt und Sensorfehler erforderlich.")
    if modell["echteMaschineVerbunden"] is not False:
        raise ValueError("Diese Prüfung ist ausschließlich ohne echte Maschine vorgesehen.")

    abweichungen = 0
    schritte = 0
    for szenario in szenarien:
        kennung = szenario["id"]
        folgen = ERWARTETE_FOLGEN[kennung]
        if len(szenario["eingaben"]) != len(folgen):
            raise ValueError(f"{kennung}: Anzahl der fachlichen Sollwerte stimmt nicht.")
        zustand = modell["anfangszustand"]
        zeit_sekunden = 0
        print(f"Szenario {kennung}: unabhängig ab {zustand}, Sekunde 0.")
        for nummer, (eingabe, sollzustand, (bewegung, ereignis)) in enumerate(
            zip(szenario["eingaben"], szenario["erwartet"], folgen), start=1
        ):
            soll = {
                "zeit_sekunden": nummer * modell["zeitschrittSekunden"],
                "vorher": modell["anfangszustand"] if nummer == 1 else szenario["erwartet"][nummer - 2],
                "eingabe": eingabe,
                "nachher": sollzustand,
                "bewegung": bewegung,
                "ereignis": ereignis,
            }
            ist = zeitschritt_ausfuehren(zustand, eingabe, zeit_sekunden)
            stimmt = ist == soll
            print(json.dumps({
                "szenario": kennung,
                "schritt": nummer,
                "erwartet": soll,
                "beobachtet": ist,
                "stimmt_ueberein": stimmt,
            }, ensure_ascii=False))
            abweichungen += int(not stimmt)
            schritte += 1
            # Tatsächliche Ergebnisse weiterreichen, damit Abweichungen sichtbar bleiben.
            zustand, zeit_sekunden = ist["nachher"], ist["zeit_sekunden"]
    if abweichungen:
        raise ValueError(f"{abweichungen} von {schritte} Schritten weichen vom Soll ab.")
    print(f"BESTANDEN: 3 Szenarien, {schritte} Schritte, keine Abweichung bei Zeit, Zustand, Bewegung oder Ereignis.")
    print("Nur Python-Modellprüfung; keine echte Maschine, industrielle Sicherheitsabnahme oder praktische Nutzung von MATLAB/Simulink, ISG oder SCADA/BMS.")


if __name__ == "__main__":
    print(f"Python {sys.version.split()[0]}")
    try:
        szenarien_pruefen()
    except (OSError, ValueError, KeyError, TypeError) as fehler:
        print(f"Szenarienprüfung fehlgeschlagen: {fehler}", file=sys.stderr)
        sys.exit(1)
