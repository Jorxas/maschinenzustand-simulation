// Browserprüfung der gebauten Demo (vorher: node tools/seite-bauen.cjs). Braucht puppeteer-core und einen installierten
// Chrome oder Edge (BROWSER_PFAD). Die Seite wird wie auf GitHub Pages unter /maschinenzustand-simulation/ ausgeliefert;
// Laufzeitfehler, externe Anfragen und waagrechter Überlauf bei 390 px lassen die Prüfung scheitern.
// Optional: --bilder=<ordner> schreibt Aufnahmen (Desktop und Handy, Deutsch und Französisch).
const fs = require("node:fs"), path = require("node:path"), http = require("node:http"), assert = require("node:assert/strict");
const puppeteer = require("puppeteer-core");
const dist = path.resolve(__dirname, "../dist");
const bilder = process.argv.find((a) => a.startsWith("--bilder="))?.slice(9);
const typen = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
const server = http.createServer((q, r) => {
  const p = decodeURIComponent(new URL(q.url, "http://x").pathname).replace(/^\/maschinenzustand-simulation/, "") || "/";
  const f = path.join(dist, p.endsWith("/") ? p + "index.html" : p);
  if (!f.startsWith(dist) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.statusCode = 404; return r.end("nicht gefunden"); }
  r.setHeader("Content-Type", typen[path.extname(f)] || "application/octet-stream");
  r.end(fs.readFileSync(f));
});
const browserPfad = process.env.BROWSER_PFAD || ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((f) => fs.existsSync(f));
if (!browserPfad) throw new Error("BROWSER_PFAD auf einen installierten Chrome oder Edge setzen.");
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const basis = `http://127.0.0.1:${server.address().port}/maschinenzustand-simulation/`;
  const browser = await puppeteer.launch({ executablePath: browserPfad, headless: true });
  const fehler = [], extern = [];
  try {
    const s = await browser.newPage();
    s.on("pageerror", (e) => fehler.push("Seitenfehler: " + e.message));
    s.on("console", (m) => { if (m.type() === "error") fehler.push("Konsole: " + m.text()); });
    s.on("requestfailed", (r) => fehler.push("Anfrage fehlgeschlagen: " + r.url()));
    s.on("response", (r) => { if (r.status() >= 400) fehler.push("HTTP " + r.status() + " " + r.url()); });
    s.on("request", (r) => { if (!r.url().startsWith("data:") && new URL(r.url()).hostname !== "127.0.0.1") extern.push(r.url()); });
    const text = () => s.$eval("body", (e) => e.innerText);
    const status = () => s.$eval("#status", (e) => e.innerText.replace(/\s+/g, " "));
    const sprache = () => s.$eval("html", (e) => e.lang);
    const ueberlauf = () => s.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    const taste = (n) => s.evaluate((n) => document.querySelectorAll("#tasten button")[n].click(), n); // 0 start 1 zeitschritt 2 stopp 3 not-halt 4 sensorfehler 5 ruecksetzen
    const zeilen = () => s.$$eval("#protokoll tbody tr", (l) => l.length);
    const knopf = (l) => s.evaluate((l) => document.querySelector(`#sprachwahl [data-sprache=${l}]`).click(), l);

    // Deutsch ist Standard
    await s.setViewport({ width: 1280, height: 1000 });
    await s.goto(basis, { waitUntil: "networkidle0" });
    assert.equal(await sprache(), "de", "Standardsprache Deutsch");
    assert.match(await text(), /Förderband: Was passiert nach einem Not-Halt\?/);
    assert.match(await text(), /Ausgabe eines echten Laufs des Projekts/);
    assert.equal(await s.title(), "Förderband Zustandsmodell Demo");
    assert.match(await status(), /bereit.*steht.*0 s/);
    assert.equal(await s.$$eval("#uebergaenge tbody td", (l) => l.length), 24, "alle 24 Übergänge sichtbar");
    if (bilder) { fs.mkdirSync(bilder, { recursive: true }); await s.screenshot({ path: path.join(bilder, "desktop-de-leer.png"), fullPage: true }); }

    // Start, Not-Halt, gesperrter Start, Rücksetzen, Start
    await taste(0);
    assert.match(await status(), /Betrieb.*läuft.*1 s/);
    await taste(3);
    assert.match(await status(), /Not-Halt.*steht.*2 s/);
    await taste(0);
    assert.match(await status(), /Not-Halt.*steht.*3 s/, "Start nach Not-Halt bleibt gesperrt");
    assert.match(await s.$eval("#protokoll", (e) => e.innerText), /Start gesperrt; Rücksetzen erforderlich\./);
    await taste(5);
    assert.match(await status(), /bereit.*steht.*4 s/);
    await taste(0);
    assert.match(await status(), /Betrieb.*läuft.*5 s/);
    assert.equal(await zeilen(), 5);
    // Tastatur: Fokus auf Stopp, Enter drückt
    await s.evaluate(() => document.querySelectorAll("#tasten button")[2].focus());
    await s.keyboard.press("Enter");
    assert.match(await status(), /bereit.*steht.*6 s/, "Tastatur bedient die Eingaben");
    if (bilder) await s.screenshot({ path: path.join(bilder, "desktop-de.png"), fullPage: true });

    // Szenario abspielen
    await s.evaluate(() => document.querySelectorAll("#szenarien button")[1].click());
    await warte(100);
    assert.equal(await zeilen(), 4, "Not-Halt-Szenario hat vier Schritte");
    assert.match(await status(), /bereit.*steht.*4 s/);
    assert.equal(await s.$$eval("#szenarien .stimmt", (l) => l.length), 3, "alle drei Szenarien stimmen überein");

    // Französisch per Schalter, Verlauf bleibt erhalten
    await knopf("fr"); await warte(100);
    assert.equal(await sprache(), "fr", "html lang wechselt auf fr");
    assert.match(await text(), /Tapis roulant : que se passe-t-il après un arrêt d'urgence \?/);
    assert.match(await text(), /Sortie d'une vraie exécution du projet/);
    assert.equal(await s.title(), "Démo modèle d'états tapis");
    assert.match(await s.url(), /lang=fr/);
    assert.equal(await zeilen(), 4);
    assert.match(await s.$eval("#protokoll", (e) => e.innerText), /Démarrage bloqué ; un réarmement est nécessaire\./);
    assert.match(await status(), /prêt.*à l'arrêt.*4 s/);
    await taste(3);
    assert.match(await status(), /arrêt d'urgence.*à l'arrêt.*5 s/);
    assert.doesNotMatch(await s.$eval("main", (e) => e.innerText), /Anwendungsfall|Aktueller Zustand|Zeitschritt \(|Grenzen\b/, "keine deutschen Reste im französischen Haupttext");
    if (bilder) await s.screenshot({ path: path.join(bilder, "desktop-fr.png"), fullPage: true });
    // zurück auf Deutsch
    await knopf("de"); await warte(100);
    assert.equal(await sprache(), "de");
    assert.match(await text(), /Förderband: Was passiert nach einem Not-Halt\?/);
    assert.doesNotMatch(await s.url(), /lang=/);

    // ?lang=fr direkt
    await s.goto(basis + "?lang=fr", { waitUntil: "networkidle0" });
    assert.equal(await sprache(), "fr", "?lang=fr");
    assert.match(await text(), /Essaie cette suite/);

    // Handy: kein waagrechter Überlauf in beiden Sprachen, auch nach Eingaben und Szenario
    await s.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    for (const l of ["de", "fr"]) {
      await s.goto(basis + (l === "fr" ? "?lang=fr" : ""), { waitUntil: "networkidle0" });
      assert.equal(await ueberlauf(), false, `kein waagrechter Überlauf (${l}, leer)`);
      for (const n of [0, 4, 0, 5, 0, 3]) await taste(n);
      await s.evaluate(() => document.querySelectorAll("#szenarien button")[2].click());
      await s.evaluate(() => document.querySelectorAll("#szenarien button")[0].click());
      await warte(150);
      assert.equal(await ueberlauf(), false, `kein waagrechter Überlauf (${l}, mit Verlauf)`);
      assert.doesNotMatch(await text(), /[\u2013\u2014]/, "keine Gedankenstriche im Text");
      if (bilder) await s.screenshot({ path: path.join(bilder, `handy-${l}.png`), fullPage: true });
    }
  } finally { await browser.close(); server.close(); }
  assert.deepEqual(fehler, [], "keine Laufzeitfehler");
  assert.deepEqual(extern, [], "keine externen Anfragen");
  console.log("Browserprüfung bestanden: Deutsch als Standard, Wechsel auf Französisch und zurück, ?lang=fr, Eingaben und Szenarien, Tastatur, kein Überlauf bei 390 px; keine Fehler, keine externen Anfragen.");
})().catch((e) => { console.error(e); process.exitCode = 1; server.close(); });
