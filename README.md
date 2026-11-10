# Vereinfachter digitaler Zwilling eines Förderbands

Stand: 4. November 2026 — **P10-T03 abgeschlossen: drei vorhandene Szenarien mit insgesamt zehn Schritten lokal gegen erwartete Zustände, Bewegung und Ereignisse geprüft; ohne Abweichung. Gesamtabnahme offen.** Geplanter Abschluss der Basis: 2026-11-07, spätestens 8. November 2026. Geschätzter Basisaufwand: 3 Stunden ohne Einrichtung und Erweiterungen.

Das Verhalten eines Förderbands soll vor einem Versuch an echter Hardware überprüfbar sein.

Ergebnis: Diskrete Zustandssimulation mit Normalbetrieb, Not-Halt und Sensorfehler sowie reproduzierbaren Ergebnissen.

Vorgesehene Technologien: Python, Tests/QA, Simulation, MATLAB/Simulink, ISG-virtuos/dirigent, SCADA/BMS. Eine Nennung ist kein Nachweis einer Umsetzung.

## Einstieg

1. [Lastenheft](LASTENHEFT.md) lesen.
2. [Abgeschlossenes Ticket P10-T03](tickets/P10-T03.md) öffnen.
3. [Technischen Einstieg](START.md) prüfen und ein Ticket nach dem anderen bearbeiten.
4. [Arbeitsjournal](ARBEITSJOURNAL.md) und echte Nachweise aktualisieren.

Abhängigkeiten: keine weiteren Projekte.

Beschreibung und reproduzierbare Befehle stehen in [START.md](START.md). Der [T03-Soll-Ist-Vergleich](nachweise/P10-T03-pruefung.txt) enthält für jeden Schritt erwartete und beobachtete Ereignisdatensätze. Normalbetrieb, Not-Halt und Sensorfehler stimmen überein. Alle drei synthetischen Beispiele bleiben unverändert. LASTENHEFT.md mit seinen Kriterien A1–A4 bleibt für die gesonderte Gesamtabnahme unverändert; T03 liefert den Vergleichsnachweis für A3. Kein proprietäres Werkzeug wurde ausgeführt; daraus folgt keine praktische Produktkompetenz.

[Erweiterungen](VARIANTEN.md) haben einen eigenen Umsetzungsstand. [Private Unternehmenszuordnung](UNTERNEHMEN.lokal.md) bleibt außerhalb der Git-Verwaltung.

## Projektsprache

Dokumentation, selbst gewählte Bezeichner, Kommentare, Meldungen und Beispieldaten werden auf Deutsch geschrieben. Festgelegte API-Schlüssel, Sprachsyntax und Produktnamen bleiben unverändert.
