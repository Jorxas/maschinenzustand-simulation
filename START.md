# Technischer Einstieg — P10

## Stand und Grenze von P10-T01

Zustände, Eingaben und drei erwartete Szenarien sind beschrieben. Die Prüfung liest nur JSON-Dateien; sie berechnet keine Zustandsübergänge. `src/simulation.py` bleibt ein initialisierter Einstieg ohne Fachfunktion. Eine echte Maschine ist nicht verbunden. Python ersetzt keinen Ausführungsnachweis für MATLAB/Simulink, ISG oder SCADA/BMS.

## Zustände und Eingaben

Der Anfangszustand ist `bereit`. „Warten“ heißt im Datenmodell `bereit`; die vorhandenen Beispieldaten bleiben unverändert. Ein diskreter Zeitschritt entspricht laut `modell.json` einer Sekunde. Nach jeder Eingabe steht genau ein erwarteter Folgezustand; der Anfangszustand ist nicht Teil der Liste `erwartet`.

| Zustand | Erwartete Bedeutung |
|---|---|
| `bereit` | Band steht und wartet auf einen bewussten Start. |
| `betrieb` | Band bewegt sich. |
| `not-halt` | Band steht; Start bleibt bis zum bewussten Rücksetzen gesperrt. |
| `fehler` | Band steht wegen eines Sensorfehlers; Start bleibt bis zum Rücksetzen gesperrt. |

| Eingabe | Erwartete Bedeutung |
|---|---|
| `start` | Aus `bereit` in `betrieb`; in `betrieb` ohne Änderung, bei Not-Halt oder Fehler gesperrt. |
| `zeitschritt` | Eine Sekunde vergeht; Zustand bleibt erhalten. |
| `stopp` | Aus `betrieb` in `bereit`; sonst bleibt der Zustand erhalten. |
| `not-halt` | Aus jedem Zustand in `not-halt`; Bewegung endet. |
| `sensorfehler` | In `fehler` wechseln; ein bereits gesetzter Not-Halt bleibt erhalten. |
| `ruecksetzen` | Aus `not-halt` oder `fehler` in `bereit`, ohne automatischen Wiederanlauf; sonst ohne Änderung. |

Vereinfachte Modellannahmen: Eingaben werden einzeln in Listenreihenfolge verarbeitet. `ruecksetzen` bedeutet zugleich, dass die Not-Halt-Ursache freigegeben beziehungsweise der Sensorfehler behoben wurde. Ein separater Freigabe- oder Sensorsignalverlauf gehört nicht zu diesen Beispielen. Unbekannte Eingaben sind ungültig. Das ist eine Beschreibung für die spätere Simulation, kein Nachweis industrieller Sicherheitsfunktionen.

## Drei erwartete Szenarien

Alle Szenarien beginnen unabhängig voneinander in `bereit`. Die Folgen stammen aus `beispieldaten/szenarien.json` und sind Sollwerte, keine beobachteten Ergebnisse.

| Szenario | Eingaben in Reihenfolge | Erwartete Zustände nach jeder Eingabe | Erwartetes Ereignis |
|---|---|---|---|
| `normalbetrieb` | `start → zeitschritt → stopp` | `betrieb → betrieb → bereit` | Start setzt das Band in Bewegung, Stopp beendet die Bewegung. |
| `not-halt` | `start → not-halt → start → ruecksetzen` | `betrieb → not-halt → not-halt → bereit` | Not-Halt stoppt; erneuter Start bleibt gesperrt; Rücksetzen führt nur in Bereitschaft. |
| `sensorfehler` | `start → sensorfehler → ruecksetzen` | `betrieb → fehler → bereit` | Sensorfehler stoppt; Rücksetzen nach angenommener Fehlerbehebung führt in Bereitschaft. |

## Beispieldateien prüfen

Im Projektordner mit der vorhandenen Laufzeit ausführen:

~~~powershell
uv run --offline --python 3.12 python -X utf8 nachweise/pruefe_beispieldaten.py
~~~

Der Prüfer verwendet nur die Python-Standardbibliothek. Er prüft den Anfangszustand, die erlaubten Zustände und Eingaben gemäß `modell.json`, die konfigurierte Anzahl von drei Szenarien, eindeutige Kennungen sowie nichtleere Listen mit gleichen Eingabe- und Erwartungslängen. Er meldet Fehler auf Deutsch und beendet sich bei ungültigen Dateien mit einem Fehlercode. Er schreibt keine Beispieldaten um.

Beobachtete Ausgabe: [P10-T01-pruefung.txt](nachweise/P10-T01-pruefung.txt). Auch eine bestandene Strukturprüfung beweist weder korrekte Übergänge noch Determinismus. Die Python-Simulation ist Gegenstand von P10-T02 und wurde in dieser Phase nicht begonnen.
