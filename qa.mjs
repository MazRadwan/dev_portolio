// Relay visual + DOM QA gate.
//   1. Build:  npm run build
//   2. Serve:  PORT=4112 npm run start
//   3. QA:     PORT=4112 npm run qa   (or: node qa.mjs)
// Screenshots land in ./qa-screenshots. Exits non-zero on any failure.
import { chromium, webkit, devices } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT || 4112;
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "qa-screenshots");
fs.mkdirSync(OUT, { recursive: true });

const THEMES = ["dark", "light"];
const problems = [];
const note = (t, m) => problems.push(`[${t}] ${m}`);

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 250));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 150));
  });
  await page.waitForTimeout(600);
}

// True visual visibility: rendered box with non-zero size and effective opacity.
async function visibleInfo(page, selector) {
  return page.evaluate((sel) => {
    const els = Array.from(document.querySelectorAll(sel));
    return els.map((el) => {
      const r = el.getBoundingClientRect();
      let op = 1;
      for (let n = el; n; n = n.parentElement) {
        const o = parseFloat(getComputedStyle(n).opacity);
        if (!Number.isNaN(o)) op = Math.min(op, o);
      }
      const cs = getComputedStyle(el);
      return { w: r.width, h: r.height, opacity: op, display: cs.display, visibility: cs.visibility };
    });
  }, selector);
}

async function assertContent(page, tag) {
  const badLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && (h.startsWith("mailto:") || h.startsWith("tel:") || /resume/i.test(h) || /\.pdf($|\?)/i.test(h)))
  );
  if (badLinks.length) note(tag, `forbidden links: ${JSON.stringify(badLinks)}`);

  const footerText = await page.evaluate(() => document.querySelector("footer")?.textContent || "");
  if (/built with/i.test(footerText)) note(tag, `footer has a "built with" stack credit`);
  if (/tailwind/i.test(footerText)) note(tag, `footer name-drops Tailwind`);
  if (/next\.?js/i.test(footerText)) note(tag, `footer name-drops Next.js`);

  const bodyText = await page.evaluate(() => document.body.textContent || "");
  if (/built with/i.test(bodyText)) note(tag, `page has a "built with" credit`);
  if (!/\bAWS\b/.test(bodyText)) note(tag, `AWS not present`);
  // Certs live in an audit table (credential / issuer / year / state cells).
  const expectedCerts = [
    "AWS Developer Associate",
    "AWS Cloud Practitioner",
    "AI for Cybersecurity",
    "ISTQB Certified Tester (QA/QC)",
    "EC-Council Cyber-Security Technician",
  ];
  const certRows = await page.$$eval('[data-testid="certs-table"] tbody tr td:first-child', (els) =>
    els.map((e) => (e.textContent || "").trim())
  );
  if (certRows.length !== expectedCerts.length)
    note(tag, `expected ${expectedCerts.length} cert rows, found ${certRows.length}`);
  expectedCerts.forEach((c, i) => {
    if (certRows[i] !== c) note(tag, `cert row ${i} = "${certRows[i] ?? "∅"}", expected "${c}"`);
  });
  const certTableText = await page.$eval('[data-testid="certs-table"]', (t) => t.textContent || "").catch(() => "");
  if (!certTableText.includes("techNL")) note(tag, `certs table missing issuer techNL`);
  if (!certTableText.includes("2026")) note(tag, `certs table missing year 2026`);

  // Identity: the h1's accessible name is stable and the full name is in the DOM
  // regardless of the typing animation's current frame.
  const h1 = await page.$eval("h1", (el) => ({
    label: el.getAttribute("aria-label"),
    text: el.textContent || "",
  }));
  if (h1.label !== "Maz Radwan") note(tag, `h1 aria-label = "${h1.label}", expected "Maz Radwan"`);
  if (!h1.text.includes("Maz Radwan")) note(tag, `h1 missing full name in DOM`);

  const headings = await page.$$eval("#projects article h3", (els) =>
    els.map((e) => e.textContent?.trim()).filter(Boolean)
  );
  if (headings.length !== 5) note(tag, `expected 5 project headings, found ${headings.length}`);

  for (const id of ["hero", "about", "projects", "contact"]) {
    if (!(await page.$(`#${id}`))) note(tag, `missing section #${id}`);
  }

  const formOk = await page.evaluate(() => {
    const f = document.querySelector('form[name="contact"]');
    return !!(f && f.querySelector('input[name="bot-field"]') && f.querySelector('input[name="form-name"]'));
  });
  if (!formOk) note(tag, `contact form missing Netlify wiring`);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) note(tag, `horizontal overflow: ${overflow}px`);
}

// Content must be visible with NO JavaScript (no SSR'd hidden reveal states).
async function assertNoJs(engine, tag) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "load" });
  const h1 = (await visibleInfo(page, "h1"))[0];
  if (!h1 || h1.opacity < 0.99 || h1.w < 1 || h1.h < 1) note(tag, `h1 not visible without JS: ${JSON.stringify(h1)}`);
  const nameText = await page.$eval("h1", (el) => el.textContent || "").catch(() => "");
  if (!nameText.includes("Maz Radwan")) note(tag, `h1 missing full name without JS`);
  const cards = await visibleInfo(page, "#projects article h3");
  if (cards.length !== 5) note(tag, `expected 5 cards without JS, got ${cards.length}`);
  cards.forEach((c, i) => {
    if (c.opacity < 0.99 || c.w < 1 || c.h < 1) note(tag, `card ${i + 1} not visible without JS: ${JSON.stringify(c)}`);
  });
  await browser.close();
}

// Mobile nav modal: opens (visible + aria-expanded), closes on Escape.
async function assertNavModal(engine, tag, screenshot) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const btn = page.locator('[aria-controls="mobile-menu"]');
  await btn.click();
  await page.waitForTimeout(600); // let the drop + stagger settle

  const expanded = await btn.getAttribute("aria-expanded");
  if (expanded !== "true") note(tag, `aria-expanded not true after open (${expanded})`);
  const menu = (await visibleInfo(page, "#mobile-menu"))[0];
  if (!menu || menu.opacity < 0.99 || menu.visibility !== "visible") note(tag, `menu not visible after open: ${JSON.stringify(menu)}`);
  const rows = await visibleInfo(page, "#mobile-menu .tui-menu__row");
  if (rows.length < 3) note(tag, `expected >=3 menu rows, got ${rows.length}`);
  rows.forEach((r, i) => {
    if (r.opacity < 0.99) note(tag, `menu row ${i + 1} not visible after open (opacity ${r.opacity})`);
  });
  if (screenshot) await page.screenshot({ path: path.join(OUT, `${tag}-navopen.png`) });

  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const expanded2 = await btn.getAttribute("aria-expanded");
  if (expanded2 !== "false") note(tag, `aria-expanded not false after Escape (${expanded2})`);
  const menu2 = (await visibleInfo(page, "#mobile-menu"))[0];
  if (menu2 && menu2.visibility !== "hidden" && menu2.opacity > 0.01) note(tag, `menu still visible after Escape: ${JSON.stringify(menu2)}`);

  await browser.close();
}

// Smart-sticky header regression — MUST stay in the default matrix so a future
// round that breaks or drops the header fails the gate. Mobile only.
async function assertSmartSticky(engine, contextOpts, tag) {
  const browser = await engine.launch();
  const ctx = await browser.newContext({ ...contextOpts });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const h = await page.$eval("header", (el) => el.offsetHeight);
  const ty = () =>
    page.$eval("header", (el) => {
      const t = getComputedStyle(el).transform;
      return !t || t === "none" ? 0 : new DOMMatrix(t).m42; // translateY
    });
  const settleAt = async (y) => {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(700); // 150ms settle debounce + 250ms tween + buffer
  };

  // (c) near the top → fully visible
  await settleAt(0);
  let t = await ty();
  if (Math.abs(t) > 1) note(tag, `sticky: header not visible near top (ty=${t})`);

  // (a) scroll down well past 200px + pause → settled hidden
  await settleAt(600);
  t = await ty();
  if (t > -(h - 1)) note(tag, `sticky: header not settled hidden after scroll-down (ty=${t}, h=${h})`);

  // (b) scroll up + pause → settled visible
  await settleAt(400);
  t = await ty();
  if (Math.abs(t) > 1) note(tag, `sticky: header not settled visible after scroll-up (ty=${t})`);

  // (d) menu open mid-page → header pinned visible (and stays pinned)
  await settleAt(600);
  await settleAt(420); // scroll up so the header is visible + tappable, still mid-page
  const preOpen = await ty();
  if (Math.abs(preOpen) > 1) note(tag, `sticky: header not visible before opening menu (ty=${preOpen})`);
  await page.locator('[aria-controls="mobile-menu"]').click();
  await page.waitForTimeout(450);
  t = await ty();
  if (Math.abs(t) > 1) note(tag, `sticky: header not pinned when menu open (ty=${t})`);
  await page.evaluate(() => window.scrollTo(0, 900)); // try to scroll while open
  await page.waitForTimeout(450);
  t = await ty();
  if (Math.abs(t) > 1) note(tag, `sticky: header not pinned while scrolling with menu open (ty=${t})`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  await browser.close();
}

async function runViewport(engine, contextOpts, theme, tag, { screenshots }) {
  const browser = await engine.launch();
  const opts = { ...contextOpts, colorScheme: theme === "dark" ? "dark" : "light" };
  const ctx = await browser.newContext(opts);
  if (theme === "light") {
    await ctx.addInitScript(() => { try { localStorage.setItem("theme", "light"); } catch (e) {} });
  }
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") note(tag, `console.error: ${m.text()}`); });
  page.on("pageerror", (e) => note(tag, `pageerror: ${e.message}`));
  page.on("requestfailed", (r) => { if (!r.url().includes("favicon.ico")) note(tag, `requestfailed: ${r.url()}`); });
  page.on("response", (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) note(tag, `http ${r.status()}: ${r.url()}`); });

  await page.goto(BASE, { waitUntil: "networkidle" });
  // Settle: the console boots (~1.5s) and the name completes its first type-out
  // and enters the hold, so screenshots show the full name + resolved console.
  await page.waitForTimeout(screenshots ? 4200 : 500);

  const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  if ((theme === "dark") !== isDark) note(tag, `theme class mismatch (isDark=${isDark})`);

  if (screenshots) await page.screenshot({ path: path.join(OUT, `${tag}-hero.png`) });
  await scrollThrough(page);
  if (screenshots) {
    await page.screenshot({ path: path.join(OUT, `${tag}-full.png`), fullPage: true });
    await page.addStyleTag({ content: "header{display:none!important}" });
    await page.waitForTimeout(120);
    await page.locator("#about").screenshot({ path: path.join(OUT, `${tag}-about.png`) });
    await page.locator("footer").screenshot({ path: path.join(OUT, `${tag}-footer.png`) });
  }

  await assertContent(page, tag);
  await browser.close();
}

// ---- run matrix ----
const desktop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const mobile = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 };
const iphone = devices["iPhone 15"];

for (const theme of THEMES) {
  // Chromium — full assertions + screenshots.
  await runViewport(chromium, desktop, theme, `${theme}-desktop`, { screenshots: true });
  await runViewport(chromium, mobile, theme, `${theme}-mobile`, { screenshots: true });
  // WebKit (Safari) — desktop + iOS device profile, assertions only.
  await runViewport(webkit, desktop, theme, `${theme}-webkit-desktop`, { screenshots: false });
  await runViewport(webkit, { ...iphone }, theme, `${theme}-webkit-ios`, { screenshots: false });
  console.log(`matrix done: ${theme}`);
}

// Mobile nav modal (chromium + webkit-iOS).
await assertNavModal(chromium, "chromium-navmodal", true);
await assertNavModal(webkit, "webkit-navmodal", false);
console.log("nav modal checks done");

// Smart-sticky header regression (chromium mobile + webkit iPhone 15).
await assertSmartSticky(chromium, { viewport: { width: 390, height: 844 } }, "chromium-sticky");
await assertSmartSticky(webkit, { ...iphone }, "webkit-sticky");
console.log("smart-sticky checks done");

// No-JS progressive-enhancement smoke (chromium + webkit).
await assertNoJs(chromium, "chromium-nojs");
await assertNoJs(webkit, "webkit-nojs");
console.log("no-js checks done");

console.log("\n=== QA RESULT ===");
if (problems.length === 0) {
  console.log("PASS — chromium+webkit(+iOS), no-JS content visible, nav modal opens/closes, smart-sticky header settles/pins, no stack credit, AWS certs ordered, 5 cards, no overflow, zero console errors.");
} else {
  console.log(`FAIL — ${problems.length} problem(s):`);
  for (const p of problems) console.log(" - " + p);
  process.exitCode = 1;
}
