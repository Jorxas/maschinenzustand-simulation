# Zustände eines Förderbands simulieren

Normalbetrieb, Not-Halt und Sensorfehler eines Förderbands sollen vor Versuchen an echter Hardware nachvollziehbar geprüft werden.

![Projektaufbau](dokumentation/ueberblick.svg)

**Veröffentlichungsstand: Phase 4/4.** Dieses eigenständige Repository übernimmt zunächst den bereits lokal committeten Stand. Weitere fachliche Phasen werden im Abstand von mindestens vier Stunden veröffentlicht. Die technische Entwicklung und die öffentliche Veröffentlichung haben unterschiedliche echte Zeitpunkte.

## Was hier zu sehen ist

| Schritt | Inhalt | Hier veröffentlicht |
|---|---|---|
| 1 | Zustände und Szenarien | Ja |
| 2 | Diskreter Simulationskern | Ja |
| 3 | Reproduzierbare Szenarien | Ja |
| 4 | Zeitschritt- und Fehlerfallprüfung | Ja |

## Fachlicher Nutzen

Zustandsmodellierung, reproduzierbare Simulation und technische Fehlerfallanalyse.

## Lokal starten

Im geklonten Repository ausführen; die benötigte Laufzeit muss installiert sein. Python-Beispiele verwenden 3.12, Node-Beispiele 24 und C# die im Projekt angegebene .NET-Version. Befehle mit uv laden die dort genau bezeichneten Pakete bei Bedarf.

```powershell
python -X utf8 nachweise/pruefe_szenarien.py
```

Ausführliche technische Befehle: [START.md](START.md). [Öffentlicher Prüfstand](ABNAHME.json) und [Quellphasen](VERLAUF.json) dokumentieren Herkunft und echte Ausführungsdaten. Eine neue Repositorykopie ist kein neuer nativer Desktoplauf.

## Ergebnis des lokal geprüften Schlussstands

Normalbetrieb, Not-Halt und Sensorfehler mit festem Zeitschritt tatsächlich ausgeführt.

## Grenzen

Keine echte Maschine und kein Simulink-, ISG- oder SCADA-Produktlauf.

Eigenes kleines Lernprojekt mit synthetischen Daten, mit KI-Unterstützung entwickelt und geprüft. Keine Aussage über Berufserfahrung, menschliche Arbeitsstunden oder praktische Verwendung weiterer nur geplanter Produkte.

## Entwicklungshistorie

[Entwicklungshistorie](HISTORIE.md): die vorhandenen lokalen Änderungen, ihre ursprünglichen Daten und die spätere GitHub-Übernahme.
