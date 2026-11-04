"""Kleine Abnahme von P10-T02; kein Vergleich aller drei Szenarien."""

import json
from pathlib import Path
import sys

PROJEKTORDNER = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJEKTORDNER))

from src.simulation import zeitschritt_ausfuehren


def verlangen(bedingung, meldung):
    if not bedingung:
        raise AssertionError(meldung)


def zeitschritt_pruefen():
    protokoll = zeitschritt_ausfuehren("betrieb", "zeitschritt", 7)
    verlangen(protokoll == {
        "zeit_sekunden": 8,
        "vorher": "betrieb",
        "eingabe": "zeitschritt",
        "nachher": "betrieb",
        "bewegung": True,
        "ereignis": "Zustand unverändert.",
    }, "Einzelschritt oder Ereignisdatensatz stimmt nicht.")
    print("Einzelschritt: " + json.dumps(protokoll, ensure_ascii=False))

    szenarien = json.loads(
        (PROJEKTORDNER / "beispieldaten/szenarien.json").read_text(encoding="utf-8")
    )
    verlangen(len(szenarien) == 3, "Drei vorhandene Beispiele erforderlich.")
    szenario = next(eintrag for eintrag in szenarien if eintrag["id"] == "not-halt")
    verlangen(len(szenario["eingaben"]) == len(szenario["erwartet"]) == 4,
              "Not-Halt-Beispiel muss vier Schritte enthalten.")
    zustand, zeit_sekunden = "bereit", 0
    for nummer, (eingabe, erwartet) in enumerate(
        zip(szenario["eingaben"], szenario["erwartet"]), start=1
    ):
        protokoll = zeitschritt_ausfuehren(zustand, eingabe, zeit_sekunden)
        verlangen(protokoll["vorher"] == zustand, "Ausgangszustand fehlt im Protokoll.")
        verlangen(protokoll["nachher"] == erwartet, f"Schritt {nummer}: falscher Zustand.")
        verlangen(protokoll["zeit_sekunden"] == nummer, "Falsche Simulationszeit.")
        verlangen(protokoll["bewegung"] == (nummer == 1),
                  "Not-Halt muss stoppen; Start und Rücksetzen dürfen nicht anlaufen.")
        print("Not-Halt: " + json.dumps(protokoll, ensure_ascii=False))
        if eingabe == "start" and zustand == "not-halt":
            verlangen(protokoll["ereignis"] == "Start gesperrt; Rücksetzen erforderlich.",
                      "Gesperrter Start muss protokolliert werden.")
        zustand, zeit_sekunden = protokoll["nachher"], protokoll["zeit_sekunden"]

    try:
        zeitschritt_ausfuehren("bereit", "unbekannt")
    except ValueError as fehler:
        verlangen(str(fehler) == "Unbekannte Eingabe: unbekannt", "Unklare Fehlermeldung.")
        print(f"Ungültige Eingabe korrekt abgewiesen: {fehler}")
    else:
        raise AssertionError("Unbekannte Eingabe wurde angenommen.")
    print("BESTANDEN: Einzelschritt, Ereignisprotokoll, Not-Halt-Beispiel und ungültige Eingabe.")
    print("Kein Vergleich aller drei Szenarien; keine echte Maschine oder proprietäre Anwendung.")


if __name__ == "__main__":
    print(f"Python {sys.version.split()[0]}")
    zeitschritt_pruefen()
