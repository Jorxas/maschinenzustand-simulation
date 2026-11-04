# Vereinfachter digitaler Zwilling eines Förderbands

Stand: 2. November 2026 — **P10-T02 abgeschlossen: einzelner Python-Zeitschritt mit Ereignisprotokoll entwickelt und lokal geprüft. Vergleich aller drei Szenarien und Gesamtabnahme offen.** Geplanter Abschluss der Basis: 2026-11-07, spätestens 8. November 2026. Geschätzter Basisaufwand: 3 Stunden ohne Einrichtung und Erweiterungen.

Das Verhalten eines Förderbands soll vor einem Versuch an echter Hardware überprüfbar sein.

Ergebnis: Diskrete Zustandssimulation mit Normalbetrieb, Not-Halt und Sensorfehler sowie reproduzierbaren Ergebnissen.

Vorgesehene Technologien: Python, Tests/QA, Simulation, MATLAB/Simulink, ISG-virtuos/dirigent, SCADA/BMS. Eine Nennung ist kein Nachweis einer Umsetzung.

## Einstieg

1. [Lastenheft](LASTENHEFT.md) lesen.
2. [Abgeschlossenes Ticket P10-T02](tickets/P10-T02.md) öffnen.
3. [Technischen Einstieg](START.md) prüfen und ein Ticket nach dem anderen bearbeiten.
4. [Arbeitsjournal](ARBEITSJOURNAL.md) und echte Nachweise aktualisieren.

Abhängigkeiten: keine weiteren Projekte.

Beschreibung und reproduzierbare Befehle stehen in [START.md](START.md). Die [lokale T02-Abnahme](nachweise/P10-T02-pruefung.txt) belegt einen Zeitschritt mit Ereignisdatensatz, die Not-Halt-Folge und die Ablehnung einer unbekannten Eingabe. Alle drei synthetischen Beispiele bleiben unverändert. Der vollständige Szenarienvergleich gehört zu P10-T03; die Lastenheftkriterien A1–A4 bleiben offen. Es wurde kein proprietäres Werkzeug ausgeführt.

[Erweiterungen](VARIANTEN.md) haben einen eigenen Umsetzungsstand. [Private Unternehmenszuordnung](UNTERNEHMEN.lokal.md) bleibt außerhalb der Git-Verwaltung.

## Projektsprache

Dokumentation, selbst gewählte Bezeichner, Kommentare, Meldungen und Beispieldaten werden auf Deutsch geschrieben. Festgelegte API-Schlüssel, Sprachsyntax und Produktnamen bleiben unverändert.
