# Vereinfachter digitaler Zwilling eines Förderbands

Stand: 1. November 2026 — **P10-T01 abgeschlossen: Zustände, Eingaben und drei erwartete Szenarien beschrieben und strukturell geprüft. Simulation und fachliche Abnahme offen.** Geplanter Abschluss der Basis: 2026-11-07, spätestens 8. November 2026. Geschätzter Basisaufwand: 3 Stunden ohne Einrichtung und Erweiterungen.

Das Verhalten eines Förderbands soll vor einem Versuch an echter Hardware überprüfbar sein.

Ergebnis: Diskrete Zustandssimulation mit Normalbetrieb, Not-Halt und Sensorfehler sowie reproduzierbaren Ergebnissen.

Vorgesehene Technologien: Python, Tests/QA, Simulation, MATLAB/Simulink, ISG-virtuos/dirigent, SCADA/BMS. Eine Nennung ist kein Nachweis einer Umsetzung.

## Einstieg

1. [Lastenheft](LASTENHEFT.md) lesen.
2. [Erstes Ticket](tickets/P10-T01.md) öffnen.
3. [Technischen Einstieg](START.md) prüfen und ein Ticket nach dem anderen bearbeiten.
4. [Arbeitsjournal](ARBEITSJOURNAL.md) und echte Nachweise aktualisieren.

Abhängigkeiten: keine weiteren Projekte.

Beschreibung und reproduzierbarer Prüfbefehl stehen in [START.md](START.md). Die Strukturprüfung belegt erlaubte Zustände, Eingaben und gleiche Folgenlängen der drei unveränderten synthetischen Beispiele. Sie liefert keine beobachteten Simulationsergebnisse. Die Lastenheftkriterien A1–A4 bleiben offen; es wurde kein proprietäres Werkzeug ausgeführt.

[Erweiterungen](VARIANTEN.md) haben einen eigenen Umsetzungsstand. [Private Unternehmenszuordnung](UNTERNEHMEN.lokal.md) bleibt außerhalb der Git-Verwaltung.

## Projektsprache

Dokumentation, selbst gewählte Bezeichner, Kommentare, Meldungen und Beispieldaten werden auf Deutsch geschrieben. Festgelegte API-Schlüssel, Sprachsyntax und Produktnamen bleiben unverändert.
