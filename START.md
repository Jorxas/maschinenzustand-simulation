# Technischer Einstieg — P10

## Grenzen und Werkzeugzugaenge — P10-T04

Stand: 11. November 2026. Dieser Abschnitt dokumentiert ausschließlich die Grenzen und Voraussetzungen. Er belegt keine industrielle Inbetriebnahme und keine praktische Erfahrung mit Simulink, ISG oder SCADA/BMS.

### Abstand zur industriellen Inbetriebnahme

`src/simulation.py` verarbeitet eine Eingabe pro diskretem Schritt. `modell.json` setzt `zeitschrittSekunden` auf `1` und `echteMaschineVerbunden` auf `false`. `bewegung` ist lediglich der boolesche Vergleich des Folgezustands mit `betrieb`. Eine Modellsekunde ist keine gemessene Reaktionszeit. Bandposition, Geschwindigkeit, Masse, Last, Antrieb, Schlupf und Bremsweg werden nicht berechnet; Sensoreingaben stammen aus synthetischen Listen statt aus Messungen einer Anlage. Es gibt keine Kalibrierung oder Validierung gegen eine reale Förderanlage.

Not-Halt bedeutet im Modell einen sofortigen Zustandswechsel ohne Bewegung. Das weist weder ein reales Anhalten noch eine sicherheitsgerichtete Steuerung nach. `ruecksetzen` nimmt die behobene Ursache bereits an; eine getrennte Prüfung von Freigaben, Schutzeinrichtungen oder Sensorsignalen fehlt. Der lokale Test bestätigt allein diese Modellregeln.

Für eine industrielle Inbetriebnahme fehlen hier unter anderem reale Hardware- und E/A-Anbindung, überprüfte Signalzuordnung, Steuerungszyklus und Kommunikationsverhalten, Messungen von Reaktions- und Nachlaufzeiten sowie anlagenspezifische Risiko-, Sicherheits- und Abnahmeprüfungen durch zuständige Fachleute. Diese Aufzählung beschreibt den Abstand des Lernprojekts und ist keine vollständige Inbetriebnahmeanleitung. Keine echte Anlage wurde verbunden, gesteuert oder abgenommen.

### Varianten und Zugang

Die folgenden Voraussetzungen stammen aus den vorhandenen Erweiterungstickets. Im Projekt ist dafür weder ein freigegebener nutzbarer Zugang noch eine Ausführung belegt. Das ist keine Bestandsaufnahme aller installierten Programme oder möglicher persönlicher Lizenzen. Preise und konkrete Lizenzbedingungen wurden nicht geprüft.

| Variante | Voraussetzung vor einer getrennt freizugebenden Ausführung | Aktueller Nachweis und Grenze |
|---|---|---|
| Python-Basis | Vorhandene Python-Laufzeit, lokale synthetische Daten; kein Zugang zu einem proprietären Zielwerkzeug erforderlich. | Lokal ausgeführt. Nachweis gilt ausschließlich für das diskrete Python-Modell. |
| [P10-V01: MATLAB / Simulink](tickets/P10-V01.md) | Verfügbare Lernlizenz mit den für das Beispiel benötigten Produkten sowie nutzbare Installation. | Zugang nicht belegt; Ausführung blockiert und nicht begonnen. Kein Simulink-Modell ausgeführt. |
| [P10-V02: ISG-virtuos / ISG-dirigent](tickets/P10-V02.md) | Lernlizenz oder zugängliches Demonstrationssystem für das konkret verwendete Produkt und ein ausführbares Beispiel. | Zugang nicht belegt; Ausführung blockiert und nicht begonnen. Keine praktische Nutzung eines der beiden Produkte nachgewiesen. |
| [P10-V03: SCADA / BMS](tickets/P10-V03.md) | Konkretes Zielprodukt und geeignete lokale Lernumgebung; bei lizenzpflichtigem Produkt zusätzlich passender freigegebener Lizenzzugang. | Kein konkretes Zielprodukt oder nutzbarer Zugang belegt; Ausführung blockiert und nicht begonnen. SCADA/BMS bezeichnet hier eine Werkzeugkategorie, keine vorhandene Installation. |

Ein späterer Produktnachweis müsste das tatsächlich verwendete Produkt samt Version, Modell beziehungsweise Konfiguration, Eingabe, Startbefehl oder Bedienschritten und beobachtetem Ergebnis enthalten. Ein Vergleich mit Python ersetzt diesen Lauf nicht. Es wurden keine Konten, Lizenzen oder kostenpflichtigen Dienste eingerichtet und keine Erweiterung umgesetzt. Die Erweiterungstickets bleiben geplant; ihre fehlenden Ausführungsvoraussetzungen sind hier als Blockaden festgehalten.

Zutreffende Beschreibung dieses Stands: „Mit Assistentenunterstützung entwickeltes Python-Lernmodell eines Förderbands; drei synthetische Szenarien lokal verglichen, Grenzen dokumentiert; Gesamtabnahme offen.“ Daraus folgen keine praktische Erfahrung mit MATLAB/Simulink, ISG oder SCADA/BMS, industrielle Inbetriebnahme, Zertifizierung oder menschliche Eigenleistung.

### Kleine lokale Abnahme wiederholen

README.md, diesen Abschnitt, projekt.json und tickets/P10-T04.md gemeinsam lesen: Python-Nachweis, fehlende Produktzugänge und Abstand zur realen Anlage müssen ausdrücklich getrennt sein. LASTENHEFT.md bleibt mit A1–A4 offen; keine Gesamtabnahme und keine Erweiterungsfreigabe ableiten.

Zur Kontrolle der beschriebenen Modellannahmen nur den vorhandenen kleinen T02-Prüfer ausführen und die unveränderten Beispieldaten kontrollieren:

~~~powershell
uv run --offline --python 3.12 python -X utf8 nachweise/pruefe_zeitschritt.py
Get-FileHash -Algorithm SHA256 beispieldaten\szenarien.json
git diff --check -- .
~~~

Die tatsächliche Ausgabe und die dokumentarische Sichtprüfung stehen in [P10-T04-abnahme.txt](nachweise/P10-T04-abnahme.txt). Der Prüfer liest `modell.json` und `beispieldaten/szenarien.json` und verwendet `src/simulation.py`; er testet einen Zeitschritt, das vorhandene Not-Halt-Szenario und die Abweisung einer unbekannten Eingabe. Er prüft keine Lizenzen oder industrielle Sicherheit. Die drei synthetischen Szenarien bleiben erhalten; SHA256: `DE690AA230ABB986C8DBB198DCB8E6B59F5FE7F94B5FBB44A3A72F4C03A2353C`. T04 ergänzt keinen neuen Softwaretest und führt keine erneute Gesamtabnahme aus.

## Stand und Ausführung von P10-T03

Im Projektordner:

~~~powershell
uv run --offline --python 3.12 python -X utf8 nachweise/pruefe_szenarien.py
~~~

Mit Python 3.12.14 tatsächlich ausgeführt, Exitcode 0: drei Szenarien, zehn Schritte, keine Abweichung. Der [Prüfer](nachweise/pruefe_szenarien.py) prüft zuerst die Struktur der unveränderten Beispieldaten und führt anschließend jedes Szenario unabhängig ab `bereit` und Sekunde 0 mit `zeitschritt_ausfuehren` aus. Er reicht jeweils die beobachteten Zustände und Zeiten weiter. Die erwarteten Zustände stammen aus `beispieldaten/szenarien.json`; erwartete Bewegung und Ereignismeldungen sind separat im Prüfer festgelegt. Vollständige Soll- und Ist-Datensätze werden je Schritt verglichen, einschließlich Zeit, vorherigem Zustand und Eingabe. Abweichungen führen zu Exitcode 1. Die [tatsächliche Ausgabe](nachweise/P10-T03-pruefung.txt) zeigt beide Seiten.

| Szenario | Erwartete und beobachtete Zustandsfolge | Erwartete und beobachtete Folge |
|---|---|---|
| `normalbetrieb` | `betrieb → betrieb → bereit` | Start bewegt, Zeitschritt erhält Bewegung, Stopp beendet sie. |
| `not-halt` | `betrieb → not-halt → not-halt → bereit` | Not-Halt stoppt, erneuter Start bleibt gesperrt, bewusstes Rücksetzen startet nicht. |
| `sensorfehler` | `betrieb → fehler → bereit` | Sensorfehler stoppt, Rücksetzen führt ohne Wiederanlauf in Bereitschaft. |

Damit war der freigegebene Endpunkt von P10-T03 erreicht. Keine zusätzliche Determinismusprüfung oder vollständige Übergangsmatrix; zum damaligen Abschluss blieben P10-T04 und die Gesamtabnahme offen. Der spätere T04-Abschluss steht oben; die Gesamtabnahme bleibt offen. LASTENHEFT.md wird hier nicht abgehakt. Rücksetzen setzt weiterhin eine behobene Ursache voraus. Nur eine lokale Python-Modellprüfung ohne Steuerung echter Maschinen; kein Nachweis industrieller Sicherheit oder praktischer Nutzung von MATLAB/Simulink, ISG oder SCADA/BMS.

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

Der T02-Prüfer kontrolliert einen einzelnen Schritt von Sekunde 7 auf 8 samt vollständigem Ereignisdatensatz, führt ausschließlich das vorhandene Not-Halt-Beispiel aus und weist eine unbekannte Eingabe ab. Beobachtet: `betrieb → not-halt → not-halt → bereit`, Bewegung nur nach dem ersten Start. Ausgabe: [P10-T02-pruefung.txt](nachweise/P10-T02-pruefung.txt). Der Vergleich aller drei Szenarien wurde separat in P10-T03 ergänzt (oben); eine umfassende Übergangsprüfung ist damit nicht belegt. Die Lastenheftkriterien bleiben unverändert offen. Keine Verbindung mit einer echten Maschine, keine industrielle Sicherheitsfunktion und kein Nachweis praktischer Nutzung von MATLAB/Simulink, ISG oder SCADA/BMS.

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

Alle Szenarien beginnen unabhängig voneinander in `bereit`. Die folgenden Sollwerte stammen aus `beispieldaten/szenarien.json`; der getrennte beobachtete T03-Vergleich steht oben und im Nachweis.

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
