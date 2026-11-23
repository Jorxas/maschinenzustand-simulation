window.LAUF = {
 "meta": {
  "python": "3.12.14",
  "quellstand": "151c686",
  "datum": "2026-11-23",
  "pruefer": {
   "befehl": "python -X utf8 nachweise/pruefe_szenarien.py",
   "exitcode": 0,
   "zeile": "BESTANDEN: 3 Szenarien, erlaubte Zustände und Eingaben, gleiche Folgenlängen."
  }
 },
 "modell": {
  "zustaende": [
   "bereit",
   "betrieb",
   "not-halt",
   "fehler"
  ],
  "eingaben": [
   "start",
   "zeitschritt",
   "stopp",
   "not-halt",
   "sensorfehler",
   "ruecksetzen"
  ],
  "anfangszustand": "bereit",
  "zeitschrittSekunden": 1,
  "echteMaschineVerbunden": false
 },
 "tabelle": {
  "bereit": {
   "start": {
    "nachher": "betrieb",
    "bewegung": true,
    "ereignis": "gestartet"
   },
   "zeitschritt": {
    "nachher": "bereit",
    "bewegung": false,
    "ereignis": "unveraendert"
   },
   "stopp": {
    "nachher": "bereit",
    "bewegung": false,
    "ereignis": "unveraendert"
   },
   "not-halt": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "nothalt"
   },
   "sensorfehler": {
    "nachher": "fehler",
    "bewegung": false,
    "ereignis": "sensorfehler"
   },
   "ruecksetzen": {
    "nachher": "bereit",
    "bewegung": false,
    "ereignis": "unveraendert"
   }
  },
  "betrieb": {
   "start": {
    "nachher": "betrieb",
    "bewegung": true,
    "ereignis": "unveraendert"
   },
   "zeitschritt": {
    "nachher": "betrieb",
    "bewegung": true,
    "ereignis": "unveraendert"
   },
   "stopp": {
    "nachher": "bereit",
    "bewegung": false,
    "ereignis": "gestoppt"
   },
   "not-halt": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "nothalt"
   },
   "sensorfehler": {
    "nachher": "fehler",
    "bewegung": false,
    "ereignis": "sensorfehler"
   },
   "ruecksetzen": {
    "nachher": "betrieb",
    "bewegung": true,
    "ereignis": "unveraendert"
   }
  },
  "not-halt": {
   "start": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "gesperrt"
   },
   "zeitschritt": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "unveraendert"
   },
   "stopp": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "unveraendert"
   },
   "not-halt": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "nothalt"
   },
   "sensorfehler": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "unveraendert"
   },
   "ruecksetzen": {
    "nachher": "bereit",
    "bewegung": false,
    "ereignis": "zurueck"
   }
  },
  "fehler": {
   "start": {
    "nachher": "fehler",
    "bewegung": false,
    "ereignis": "gesperrt"
   },
   "zeitschritt": {
    "nachher": "fehler",
    "bewegung": false,
    "ereignis": "unveraendert"
   },
   "stopp": {
    "nachher": "fehler",
    "bewegung": false,
    "ereignis": "unveraendert"
   },
   "not-halt": {
    "nachher": "not-halt",
    "bewegung": false,
    "ereignis": "nothalt"
   },
   "sensorfehler": {
    "nachher": "fehler",
    "bewegung": false,
    "ereignis": "sensorfehler"
   },
   "ruecksetzen": {
    "nachher": "bereit",
    "bewegung": false,
    "ereignis": "zurueck"
   }
  }
 },
 "szenarien": [
  {
   "id": "normalbetrieb",
   "schritte": [
    {
     "zeit": 1,
     "vorher": "bereit",
     "eingabe": "start",
     "nachher": "betrieb",
     "bewegung": true,
     "ereignis": "gestartet",
     "erwartet": "betrieb"
    },
    {
     "zeit": 2,
     "vorher": "betrieb",
     "eingabe": "zeitschritt",
     "nachher": "betrieb",
     "bewegung": true,
     "ereignis": "unveraendert",
     "erwartet": "betrieb"
    },
    {
     "zeit": 3,
     "vorher": "betrieb",
     "eingabe": "stopp",
     "nachher": "bereit",
     "bewegung": false,
     "ereignis": "gestoppt",
     "erwartet": "bereit"
    }
   ],
   "stimmt": true
  },
  {
   "id": "not-halt",
   "schritte": [
    {
     "zeit": 1,
     "vorher": "bereit",
     "eingabe": "start",
     "nachher": "betrieb",
     "bewegung": true,
     "ereignis": "gestartet",
     "erwartet": "betrieb"
    },
    {
     "zeit": 2,
     "vorher": "betrieb",
     "eingabe": "not-halt",
     "nachher": "not-halt",
     "bewegung": false,
     "ereignis": "nothalt",
     "erwartet": "not-halt"
    },
    {
     "zeit": 3,
     "vorher": "not-halt",
     "eingabe": "start",
     "nachher": "not-halt",
     "bewegung": false,
     "ereignis": "gesperrt",
     "erwartet": "not-halt"
    },
    {
     "zeit": 4,
     "vorher": "not-halt",
     "eingabe": "ruecksetzen",
     "nachher": "bereit",
     "bewegung": false,
     "ereignis": "zurueck",
     "erwartet": "bereit"
    }
   ],
   "stimmt": true
  },
  {
   "id": "sensorfehler",
   "schritte": [
    {
     "zeit": 1,
     "vorher": "bereit",
     "eingabe": "start",
     "nachher": "betrieb",
     "bewegung": true,
     "ereignis": "gestartet",
     "erwartet": "betrieb"
    },
    {
     "zeit": 2,
     "vorher": "betrieb",
     "eingabe": "sensorfehler",
     "nachher": "fehler",
     "bewegung": false,
     "ereignis": "sensorfehler",
     "erwartet": "fehler"
    },
    {
     "zeit": 3,
     "vorher": "fehler",
     "eingabe": "ruecksetzen",
     "nachher": "bereit",
     "bewegung": false,
     "ereignis": "zurueck",
     "erwartet": "bereit"
    }
   ],
   "stimmt": true
  }
 ],
 "cli": {
  "erfolg": {
   "befehl": "python src/simulation.py bereit start 0",
   "exitcode": 0,
   "ausgabe": "{\"zeit_sekunden\": 1, \"vorher\": \"bereit\", \"eingabe\": \"start\", \"nachher\": \"betrieb\", \"bewegung\": true, \"ereignis\": \"Band gestartet.\"}",
   "fehlerausgabe": ""
  },
  "fehler": {
   "befehl": "python src/simulation.py bereit foo",
   "exitcode": 1,
   "ausgabe": "",
   "fehlerausgabe": "Simulation fehlgeschlagen: Unbekannte Eingabe: foo"
  }
 }
};
