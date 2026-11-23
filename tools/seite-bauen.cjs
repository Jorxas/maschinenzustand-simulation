// Baut die statische Demoseite nach dist/ (nur die Dateien, die der Browser braucht). Aufruf: node tools/seite-bauen.cjs
"use strict";
const fs = require("node:fs"), path = require("node:path");
const wurzel = path.resolve(__dirname, "..");
const ziel = path.join(wurzel, "dist");
fs.rmSync(ziel, { recursive: true, force: true });
for (const datei of ["index.html", "stil.css", "app.js", "daten/lauf.js"]) {
  fs.mkdirSync(path.dirname(path.join(ziel, datei)), { recursive: true });
  fs.copyFileSync(path.join(wurzel, "demo", datei), path.join(ziel, datei));
}
fs.writeFileSync(path.join(ziel, ".nojekyll"), "");
console.log("dist/ gebaut");
