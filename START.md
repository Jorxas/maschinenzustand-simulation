# Technischer Einstieg — P10

## Stand und Ausführung von P10-T02

`src/simulation.py` führt genau einen diskreten Schritt aus. Im Projektordner:

~~~powershell
uv run --offline --python 3.12 python -X utf8 src/simulation.py bereit start 0
~~~

Beobachtet mit Python 3.12.14: Zeit `1`, vorher `bereit`, Eingabe `start`, nachher `betrieb`, Bewegung `true`, Ereignis „Band gestartet.“ Der vollständige JSON-Datensatz steht in [P10-T02-einzelschritt.txt](nachweise/P10-T02-einzelschritt.txt). Ohne angegebenen Zeitwert beginnt der Schritt bei `0`; `--hilfe` zeigt den Aufruf. Ungültige Zustände, Eingaben oder Zeiten führen zu einer deutschen Fehlermeldung und Exitcode 1.

Die Funktion `zeitschritt_ausfuehren(zustand, eingabe, zeit_sekunden=0)` gibt ein Protokoll mit `zeit_sekunden`, `vorher`, `eingabe`, `nachher`, `bewegung` und `ereignis` zurück. Jede gültige Eingabe verbraucht genau die eine Modellsekunde, auch ein gesperrter Start oder eine Eingabe ohne Zustandsänderung. `zeitschritt` bedeutet eine Sekunde ohne weiteren Steuerbefehl. Nur `betrieb` bedeutet Bewegung; eine Position oder Bandgeschwindigkeit wird nicht berechnet. Die Zeit ist simuliert, kein Wandzeitstempel. Der Aufrufer übergibt für einen weiteren Schritt `nachher` und `zeit_sekunden` des vorherigen Ergebnisses. Die Kommandozeile schreibt pro Aufruf einen JSON-Datensatz auf die Standardausgabe; sie speichert keinen Zustand zwischen Aufrufen.

Kleine lokale Abnahme:

~~~powershell
uv run --offline --python 3.12 python -X utf8 nachweise/pruefe_zeitschritt.py
~~~

Der Prüfer kontrolliert einen einzelnen Schritt von Sekunde 7 auf 8 samt vollständigem Ereignisdatensatz, führt ausschließlich das vorhandene Not-Halt-Beispiel aus und weist eine unbekannte Eingabe ab. Beobachtet: `betrieb → not-halt → not-halt → bereit`, Bewegung nur nach dem ersten Start. Ausgabe: [P10-T02-pruefung.txt](nachweise/P10-T02-pruefung.txt). Es gibt hier keinen automatischen Vergleich aller drei Szenarien und keine umfassende Übergangsprüfung; das bleibt P10-T03. Die Lastenheftkriterien bleiben unverändert offen. Keine Verbindung mit einer echten Maschine, keine industrielle Sicherheitsfunktion und kein Nachweis praktischer Nutzung von MATLAB/Simulink, ISG oder SCADA/BMS.

## Stand und Grenze von P10-T01

Zum Abschluss von P10-T01 waren Zustände, Eingaben und drei erwartete Szenarien beschrieben. Dessen Strukturprüfung liest nur JSON-Dateien; sie berechnet keine Zustandsübergänge. Die Fachfunktion wurde erst in P10-T02 ergänzt. Eine echte Maschine ist nicht verbunden. Python ersetzt keinen Ausführungsnachweis für MATLAB/Simulink, ISG oder SCADA/BMS.

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

Vereinfachte Modellannahmen: Eingaben werden einzeln in Listenreihenfolge verarbeitet. `ruecksetzen` bedeutet zugleich, dass die Not-Halt-Ursache freigegeben beziehungsweise der Sensorfehler behoben wurde. Ein separater Freigabe- oder Sensorsignalverlauf gehört nicht zu diesen Beispielen. Unbekannte Eingaben sind ungültig. Das ist eine Modellbeschreibung, kein Nachweis industrieller Sicherheitsfunktionen.

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

Beobachtete Ausgabe: [P10-T01-pruefung.txt](nachweise/P10-T01-pruefung.txt). Auch eine bestandene Strukturprüfung beweist weder korrekte Übergänge noch Determinismus. In P10-T01 wurde die Python-Simulation nicht begonnen; der spätere T02-Stand ist oben getrennt beschrieben.
