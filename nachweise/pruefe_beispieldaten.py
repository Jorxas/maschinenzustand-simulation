"""Prüft die synthetischen Beispieldateien strukturell, ohne Simulation."""

import json
from pathlib import Path
import sys


PROJEKTORDNER = Path(__file__).resolve().parents[1]


def beispieldaten_pruefen():
    modell = json.loads((PROJEKTORDNER / "modell.json").read_text(encoding="utf-8"))
    konfiguration = json.loads(
        (PROJEKTORDNER / "projekt.json").read_text(encoding="utf-8")
    )
    szenarien = json.loads(
        (PROJEKTORDNER / "beispieldaten/szenarien.json").read_text(encoding="utf-8")
    )
    zustaende = modell["zustaende"]
    eingaben = modell["eingaben"]
    for bezeichnung, werte in (("Zustände", zustaende), ("Eingaben", eingaben)):
        if not isinstance(werte, list) or not werte:
            raise ValueError(f"{bezeichnung}: nichtleere Liste erforderlich.")
        if not all(isinstance(wert, str) and wert for wert in werte):
            raise ValueError(f"{bezeichnung}: nichtleere Zeichenketten erforderlich.")
        if len(set(werte)) != len(werte):
            raise ValueError(f"{bezeichnung}: doppelte Werte sind ungültig.")
    if modell["anfangszustand"] not in zustaende:
        raise ValueError("Anfangszustand ist nicht erlaubt.")
    if not isinstance(szenarien, list) or len(szenarien) != konfiguration["expectedRecords"]:
        raise ValueError("Szenarioanzahl stimmt nicht mit projekt.json überein.")
    kennungen = set()
    for szenario in szenarien:
        kennung = szenario["id"]
        if not isinstance(kennung, str) or not kennung or kennung in kennungen:
            raise ValueError("Szenariokennung fehlt oder ist doppelt.")
        kennungen.add(kennung)
        eingabefolge = szenario["eingaben"]
        erwartungsfolge = szenario["erwartet"]
        if not isinstance(eingabefolge, list) or not isinstance(erwartungsfolge, list):
            raise ValueError(f"{kennung}: Eingaben und Erwartungen müssen Listen sein.")
        if not eingabefolge or len(eingabefolge) != len(erwartungsfolge):
            raise ValueError(f"{kennung}: Folgen müssen nichtleer und gleich lang sein.")
        if any(wert not in eingaben for wert in eingabefolge):
            raise ValueError(f"{kennung}: unbekannte Eingabe.")
        if any(wert not in zustaende for wert in erwartungsfolge):
            raise ValueError(f"{kennung}: unbekannter erwarteter Zustand.")
        print(f"{kennung}: {len(eingabefolge)} Eingaben, {len(erwartungsfolge)} Erwartungen; gültig.")
    print(f"BESTANDEN: {len(szenarien)} Szenarien, erlaubte Zustände und Eingaben, gleiche Folgenlängen.")
    print("Nur Strukturprüfung; keine Simulation und kein proprietäres Werkzeug ausgeführt.")


if __name__ == "__main__":
    print(f"Python {sys.version.split()[0]}")
    try:
        beispieldaten_pruefen()
    except (OSError, ValueError, KeyError, TypeError) as fehler:
        print(f"Prüfung fehlgeschlagen: {fehler}", file=sys.stderr)
        sys.exit(1)
