#!/usr/bin/env node
import fs from "fs";
import path from "path";

const rootDir = process.cwd();

/** -----------------------------
 *  Config (istersen CLI ile büyütürüz)
 *  ----------------------------- */
const ignoredDirectories = new Set([
  "node_modules",
  ".git",
  ".next",
  ".turbo",
  "dist",
  "build",
  "coverage",
  ".vercel",
]);

// Source taranacak dosya tipleri (Tailwind class'ları burada string olarak olur)
const sourceExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".md",
  ".mdx",
]);

// Varsayılan “kod kökleri”
const sourceRoots = ["app", "components", "lib", "pages", "src"];

// CSS dosyaları
const cssExtensions = new Set([".css"]);

// Safelist dosyası (opsiyonel)
const safelistPath = path.join(rootDir, "tools", "css-safelist.txt");

/** -----------------------------
 *  Helpers
 *  ----------------------------- */
function walkDirectory(dir, onFile) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(fullPath, onFile);
    } else {
      onFile(fullPath);
    }
  }
}

function readTextSafe(fp) {
  try {
    return fs.readFileSync(fp, "utf8");
  } catch {
    return "";
  }
}

function isCssFile(fp) {
  return cssExtensions.has(path.extname(fp));
}

function isSourceFile(fp) {
  return sourceExtensions.has(path.extname(fp));
}

function rel(fp) {
  return path.relative(rootDir, fp);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** -----------------------------
 *  CSS collection
 *  ----------------------------- */
function collectCssFiles() {
  const cssFiles = new Set();

  walkDirectory(rootDir, (filePath) => {
    if (!isCssFile(filePath)) return;

    const relative = rel(filePath);

    // tools içindeki css dosyalarını dışarıda tut (istersen kaldır)
    if (relative.startsWith(`tools${path.sep}`)) return;

    // beklenen konumlar + module css
    const isStyles = relative.startsWith(`styles${path.sep}`);
    const isPublicCss = relative.startsWith(`public${path.sep}css${path.sep}`);
    const isModuleCss = relative.endsWith(".module.css");

    if (isStyles || isPublicCss || isModuleCss) {
      cssFiles.add(relative);
    }
  });

  return Array.from(cssFiles).sort();
}

/**
 * CSS’ten class adlarını çıkarır.
 * - :global(.foo)
 * - .foo:hover
 * - .foo.bar
 * - .foo\+bar (escaped) -> foo\+bar'ı raw yakalar, kullanım string'inde genelde "foo+bar" olur (nadiren)
 */
function collectClassDefinitions(cssFiles) {
  const defs = new Map(); // className -> [{file, line}]
  const classSelectorRegex =
    /(^|[^a-zA-Z0-9_-])\.([A-Za-z_-][A-Za-z0-9_-]*)(?=[^A-Za-z0-9_-]|$)/g;

  for (const cssFile of cssFiles) {
    const abs = path.join(rootDir, cssFile);
    const content = readTextSafe(abs);
    if (!content) continue;

    const lines = content.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let m;
      while ((m = classSelectorRegex.exec(line))) {
        const className = m[2];
        // bazen bootstrap gibi ".row" vs. olur - normal.
        const arr = defs.get(className) ?? [];
        arr.push({ file: cssFile, line: i + 1 });
        defs.set(className, arr);
      }
      classSelectorRegex.lastIndex = 0;
    }
  }

  return defs;
}

/** -----------------------------
 *  Source collection
 *  ----------------------------- */
function collectSourceTexts() {
  const texts = [];

  for (const root of sourceRoots) {
    const rootPath = path.join(rootDir, root);
    if (!fs.existsSync(rootPath)) continue;

    walkDirectory(rootPath, (filePath) => {
      if (!isSourceFile(filePath)) return;
      texts.push(readTextSafe(filePath));
    });
  }

  return texts;
}

/** -----------------------------
 *  Safelist
 *  ----------------------------- */
function loadSafelist() {
  if (!fs.existsSync(safelistPath)) return new Set();
  const raw = readTextSafe(safelistPath);
  const set = new Set();
  raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith("#"))
    .forEach((l) => set.add(l));
  return set;
}

/** -----------------------------
 *  Usage detection (Tailwind-aware)
 *  ----------------------------- */
function isClassUsedInSources(className, sources) {
  // 1) Düz kelime sınırı araması (className="foo", "foo", 'foo', template)
  const safe = escapeRegExp(className);
  const wordBoundary = new RegExp(`(^|[^A-Za-z0-9_-])${safe}([^A-Za-z0-9_-]|$)`);

  // 2) CSS Modules: styles.foo / styles["foo"] / styles['foo']
  const stylesDot = new RegExp(`\\bstyles\\.${safe}\\b`);
  const stylesBracket = new RegExp(`\\bstyles\\[(["'])${safe}\\1\\]`);

  // 3) clsx/cn/classnames/twMerge/cva gibi fonksiyonlarda kullanım:
  // Bunlar genelde string literal içinde geçer => wordBoundary yeterli.
  // Ama “{ foo: condition }” gibi objede key olarak da geçer:
  const objKey = new RegExp(`([,{]\\s*)(["'])?${safe}\\2\\s*:`);

  // 4) Dinamik: foo-${x} veya foo-${something}
  const dynamicPrefix = className.includes("-")
    ? className
    : className; // basit: prefix eşleşmesini aşağıda daha genel yapacağız

  const prefix = className.replace(/-\d+$/, "").replace(/\d+$/, "");
  const dynTemplate = new RegExp(`${escapeRegExp(prefix)}[-_]?\\$\\{`);

  for (const content of sources) {
    if (!content) continue;

    if (
      wordBoundary.test(content) ||
      content.includes(className) || // hızlı fallback
      stylesDot.test(content) ||
      stylesBracket.test(content) ||
      objKey.test(content) ||
      dynTemplate.test(content)
    ) {
      return true;
    }
  }

  return false;
}

/** -----------------------------
 *  Main
 *  ----------------------------- */
function main() {
  const cssFiles = collectCssFiles();
  if (cssFiles.length === 0) {
    console.error("No CSS files found in expected directories.");
    process.exit(1);
  }

  const defs = collectClassDefinitions(cssFiles);
  const classNames = Array.from(defs.keys()).sort();
  const sources = collectSourceTexts();
  const safelist = loadSafelist();

  const unused = [];

  for (const className of classNames) {
    if (safelist.has(className)) continue;

    const used = isClassUsedInSources(className, sources);
    if (!used) unused.push(className);
  }

  if (unused.length === 0) {
    console.log("All CSS classes are referenced in source files (or safelisted).");
    return;
  }

  // Rapor: class + nerede tanımlı
  for (const name of unused) {
    const where = defs.get(name) ?? [];
    const locations = where
      .slice(0, 5)
      .map((w) => `${w.file}:${w.line}`)
      .join(", ");

    console.log(`UNUSED: .${name}${locations ? `  (defined: ${locations}${where.length > 5 ? ", ..." : ""})` : ""}`);
  }

  // Exit code: CI'da fail istersen 1 yapabilirsin; şimdilik 0
  // process.exit(1);
}

main();
