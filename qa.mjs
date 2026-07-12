// Relay visual + DOM QA gate.
//   1. Build:  npm run build
//   2. Serve:  PORT=4112 npm run start   (any free port)
//   3. QA:     PORT=4112 npm run qa       (or: node qa.mjs)
// Screenshots land in ./qa-screenshots. Exits non-zero on any failure.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT || 4112;
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "qa-screenshots");
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const THEMES = ["dark", "light"];

const problems = [];

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 130));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 150));
  });
  await page.waitForTimeout(700);
}

async function runAssertions(page, tag) {
  // Privacy: no email/phone/resume links.
  const badLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && (h.startsWith("mailto:") || h.startsWith("tel:") || /resume/i.test(h) || /\.pdf($|\?)/i.test(h)))
  );
  if (badLinks.length) problems.push(`[${tag}] forbidden links: ${JSON.stringify(badLinks)}`);

  // Footer must NOT credit the stack (banned amendment) — footer-scoped, case-insensitive.
  const footerText = await page.evaluate(() => document.querySelector("footer")?.textContent || "");
  if (/built with/i.test(footerText)) problems.push(`[${tag}] footer contains a "built with" stack credit`);
  if (/tailwind/i.test(footerText)) problems.push(`[${tag}] footer name-drops Tailwind`);
  if (/next\.?js/i.test(footerText)) problems.push(`[${tag}] footer name-drops Next.js`);

  // textContent covers all DOM text regardless of scroll-reveal opacity state.
  const bodyText = await page.evaluate(() => document.body.textContent || "");
  if (/built with/i.test(bodyText)) problems.push(`[${tag}] page contains a "built with" credit`);

  // AWS amendment: chip + three certs, all present and in order.
  if (!/\bAWS\b/.test(bodyText)) problems.push(`[${tag}] AWS not present`);
  const certs = [
    "AWS Solutions Architect",
    "AWS Developer Associate",
    "AWS Cloud Practitioner",
    "AI for Cybersecurity (techNL, 2026)",
    "ISTQB Certified Tester (QA/QC)",
    "EC-Council Cyber-Security Technician",
  ];
  let last = -1;
  for (const c of certs) {
    const idx = bodyText.indexOf(c);
    if (idx === -1) problems.push(`[${tag}] missing cert: ${c}`);
    else if (idx < last) problems.push(`[${tag}] cert out of order: ${c}`);
    last = idx;
  }

  // Five project cards, each with a heading.
  const headings = await page.$$eval("#projects article h3", (els) =>
    els.map((e) => e.textContent?.trim()).filter(Boolean)
  );
  if (headings.length !== 5) problems.push(`[${tag}] expected 5 project headings, found ${headings.length}`);

  for (const id of ["hero", "about", "projects", "contact"]) {
    if (!(await page.$(`#${id}`))) problems.push(`[${tag}] missing section #${id}`);
  }

  const formOk = await page.evaluate(() => {
    const f = document.querySelector('form[name="contact"]');
    return !!(
      f &&
      f.getAttribute("data-netlify") === "true" &&
      f.querySelector('input[name="bot-field"]') &&
      f.querySelector('input[name="form-name"]')
    );
  });
  if (!formOk) problems.push(`[${tag}] contact form missing Netlify wiring`);
}

for (const theme of THEMES) {
  for (const vp of VIEWPORTS) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    if (theme === "light") {
      await context.addInitScript(() => {
        try { localStorage.setItem("theme", "light"); } catch (e) {}
      });
    }
    const page = await context.newPage();
    const tag = `${theme}-${vp.name}`;

    page.on("console", (msg) => {
      if (msg.type() === "error") problems.push(`[${tag}] console.error: ${msg.text()}`);
    });
    page.on("pageerror", (err) => problems.push(`[${tag}] pageerror: ${err.message}`));
    page.on("requestfailed", (req) => {
      if (req.url().includes("favicon.ico")) return;
      problems.push(`[${tag}] requestfailed: ${req.url()} ${req.failure()?.errorText || ""}`);
    });
    page.on("response", (res) => {
      if (res.status() >= 400 && res.url().startsWith(BASE)) problems.push(`[${tag}] http ${res.status()}: ${res.url()}`);
    });

    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    if ((theme === "dark") !== isDark) problems.push(`[${tag}] theme class mismatch (isDark=${isDark})`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) problems.push(`[${tag}] horizontal overflow: ${overflow}px`);

    await page.screenshot({ path: path.join(OUT, `${tag}-hero.png`) });
    await scrollThrough(page);
    await page.screenshot({ path: path.join(OUT, `${tag}-full.png`), fullPage: true });

    await page.addStyleTag({ content: "header{display:none!important}" });
    await page.waitForTimeout(120);
    await page.locator("#about").screenshot({ path: path.join(OUT, `${tag}-about.png`) });
    await page.locator("footer").screenshot({ path: path.join(OUT, `${tag}-footer.png`) });

    await runAssertions(page, tag);
    await browser.close();
    console.log(`captured ${tag}`);
  }
}

console.log("\n=== QA RESULT ===");
if (problems.length === 0) {
  console.log("PASS — no console errors, no 404s, no forbidden links, no footer stack credit, AWS certs present and ordered, 5 project cards.");
} else {
  console.log(`FAIL — ${problems.length} problem(s):`);
  for (const p of problems) console.log(" - " + p);
  process.exitCode = 1;
}
