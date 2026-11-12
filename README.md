# Vereinfachter digitaler Zwilling eines Förderbands

Stand: 11. November 2026 — **P10-T04 abgeschlossen: Modellgrenzen und Zugangsvoraussetzungen der Werkzeugvarianten dokumentiert und lokal geprüft. Gesamtabnahme offen.** Ursprüngliches Basisziel 7./8. November verfehlt; T04 gemäß Fortsetzungsauftrag am 11. November bearbeitet. Geschätzter Basisaufwand: 3 Stunden ohne Einrichtung und Erweiterungen.

Das Verhalten eines Förderbands soll vor einem Versuch an echter Hardware überprüfbar sein.

Ergebnis: Diskrete Zustandssimulation mit Normalbetrieb, Not-Halt und Sensorfehler sowie reproduzierbaren Ergebnissen.

Vorgesehene Technologien: Python, Tests/QA, Simulation, MATLAB/Simulink, ISG-virtuos/dirigent, SCADA/BMS. Eine Nennung ist kein Nachweis einer Umsetzung.

## Einstieg

1. [Lastenheft](LASTENHEFT.md) lesen.
2. [Abgeschlossenes Ticket P10-T04](tickets/P10-T04.md) öffnen.
3. [Technischen Einstieg](START.md) prüfen und ein Ticket nach dem anderen bearbeiten.
4. [Arbeitsjournal](ARBEITSJOURNAL.md) und echte Nachweise aktualisieren.

Abhängigkeiten: keine weiteren Projekte.

Beschreibung und reproduzierbare Befehle stehen in [START.md](START.md). Der [T03-Soll-Ist-Vergleich](nachweise/P10-T03-pruefung.txt) enthält für jeden Schritt erwartete und beobachtete Ereignisdatensätze. Normalbetrieb, Not-Halt und Sensorfehler stimmen überein. Alle drei synthetischen Beispiele bleiben unverändert. LASTENHEFT.md mit seinen Kriterien A1–A4 bleibt für die gesonderte Gesamtabnahme unverändert; T03 liefert den Vergleichsnachweis für A3. Kein proprietäres Werkzeug wurde ausgeführt; daraus folgt keine praktische Produktkompetenz.

[Erweiterungen](VARIANTEN.md) haben einen eigenen Umsetzungsstand. [Private Unternehmenszuordnung](UNTERNEHMEN.lokal.md) bleibt außerhalb der Git-Verwaltung.

Die [Grenzen und Werkzeugzugänge](START.md#grenzen-und-werkzeugzugaenge--p10-t04) trennen das Python-Lernmodell von industrieller Inbetriebnahme. Für MATLAB/Simulink, ISG-virtuos/ISG-dirigent und eine konkrete SCADA-/BMS-Lernumgebung ist im Projekt kein nutzbarer Zugang belegt; ihre Ausführung bleibt blockiert. Keine dieser Varianten wurde begonnen oder durch eine Ersatzsimulation als beherrscht ausgewiesen. [Lokale T04-Abnahme](nachweise/P10-T04-abnahme.txt). LASTENHEFT.md A1–A4 und `businessImplemented: false` bleiben unverändert; T04 liefert nur den dokumentierten Abgrenzungsnachweis zu A4.

## Projektsprache

Dokumentation, selbst gewählte Bezeichner, Kommentare, Meldungen und Beispieldaten werden auf Deutsch geschrieben. Festgelegte API-Schlüssel, Sprachsyntax und Produktnamen bleiben unverändert.
