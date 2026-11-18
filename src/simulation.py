"""Ein diskreter Förderbandschritt mit einem Ereignisprotokoll als JSON."""

import json
from pathlib import Path
import sys

PROJEKTORDNER = Path(__file__).resolve().parents[1]
MODELL = json.loads((PROJEKTORDNER / "modell.json").read_text(encoding="utf-8"))


def zeitschritt_ausfuehren(zustand, eingabe, zeit_sekunden=0):
    """Verarbeitet eine Eingabe in einer Modellsekunde, ohne echte Hardware."""
    if zustand not in MODELL["zustaende"]:
        raise ValueError(f"Unbekannter Zustand: {zustand}")
    if eingabe not in MODELL["eingaben"]:
        raise ValueError(f"Unbekannte Eingabe: {eingabe}")
    if type(zeit_sekunden) is not int or zeit_sekunden < 0:
        raise ValueError("Simulationszeit muss eine nichtnegative ganze Sekundenzahl sein.")

    folgezustand = zustand
    ereignis = "Zustand unverändert."
    if eingabe == "not-halt":
        folgezustand = "not-halt"
        ereignis = "Not-Halt gesetzt; Band steht."
    elif eingabe == "sensorfehler" and zustand != "not-halt":
        folgezustand = "fehler"
        ereignis = "Sensorfehler gesetzt; Band steht."
    elif eingabe == "ruecksetzen" and zustand in ("not-halt", "fehler"):
        folgezustand = "bereit"
        ereignis = "Bewusst zurückgesetzt; Band bleibt stehen."
    elif eingabe == "start":
        if zustand == "bereit":
            folgezustand = "betrieb"
            ereignis = "Band gestartet."
        elif zustand in ("not-halt", "fehler"):
            ereignis = "Start gesperrt; Rücksetzen erforderlich."
    elif eingabe == "stopp" and zustand == "betrieb":
        folgezustand = "bereit"
        ereignis = "Band gestoppt."

    return {
        "zeit_sekunden": zeit_sekunden + MODELL["zeitschrittSekunden"],
        "vorher": zustand,
        "eingabe": eingabe,
        "nachher": folgezustand,
        "bewegung": folgezustand == "betrieb",
        "ereignis": ereignis,
    }


def hauptprogramm(argumente):
    anleitung = "Aufruf: python src/simulation.py ZUSTAND EINGABE [ZEIT_SEKUNDEN]"
    if argumente == ["--hilfe"]:
        print(anleitung)
        return 0
    if len(argumente) not in (2, 3):
        print(anleitung, file=sys.stderr)
        return 1
    try:
        try:
            zeit_sekunden = int(argumente[2]) if len(argumente) == 3 else 0
        except ValueError:
            raise ValueError("Simulationszeit muss eine ganze Sekundenzahl sein.") from None
        protokoll = zeitschritt_ausfuehren(argumente[0], argumente[1], zeit_sekunden)
    except ValueError as fehler:
        print(f"Simulation fehlgeschlagen: {fehler}", file=sys.stderr)
        return 1
    print(json.dumps(protokoll, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(hauptprogramm(sys.argv[1:]))
