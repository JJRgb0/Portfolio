import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const output = "out";
const initialJavaScriptBudget = 120_000;

// These documents navigate with native anchors and load their own deferred script.
// Keep Next's stylesheet, font and image hints and remove only its client runtime.
const nextRuntime =
  /<script\b(?=[^>]*\bsrc="\/_next\/static\/)[^>]*><\/script>|<script>(?:\(self\.__next_f|self\.__next_f)[\s\S]*?<\/script>/gi;
const nextScriptHint =
  /<link\b(?=[^>]*\bhref="\/_next\/static\/)(?=[^>]*\bas="script")[^>]*>/gi;

// Production uses the exported HTML directly. In development, next/script
// waits for hydration before the browser script enhances the document.
const interactionScript = '<script src="/interactions.js" defer></script>';
const analyticsSource =
  process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_SCRIPT ||
  "/_vercel/insights/script.js";
const analytics =
  process.env.VERCEL_ENV === "production"
    ? "<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>" +
      `<script src="${analyticsSource.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")}" defer></script>`
    : "";

const files = await readdir(output, { recursive: true });
for (const file of files.filter((name) => name.endsWith(".html"))) {
  const path = join(output, file);
  const html = (await readFile(path, "utf8"))
    .replace(nextRuntime, "")
    .replace(nextScriptHint, "");
  if (
    html.includes("self.__next_f") ||
    /<script[^>]*src="\/_next\//i.test(html)
  ) {
    throw new Error(`Runtime do Next.js encontrado em ${file}`);
  }
  if (!html.includes("</body>"))
    throw new Error(`Documento sem corpo em ${file}`);
  await writeFile(
    path,
    html.replace("</body>", `${interactionScript}${analytics}</body>`),
  );
}

const home = await readFile(join(output, "index.html"), "utf8");
const scripts = [...home.matchAll(/<script[^>]*\bsrc="([^"]+)"[^>]*>/gi)]
  .map((match) => match[1])
  .filter((src) => src.startsWith("/") && src !== analyticsSource);
const inline = [
  ...home.matchAll(
    /<script(?![^>]*\b(?:type|src)=)[^>]*>([\s\S]*?)<\/script>/gi,
  ),
].map((match) => gzipSync(match[1]).length);
const scriptSizes = await Promise.all(
  [...new Set(scripts)].map(
    async (src) => gzipSync(await readFile(join(output, src))).length,
  ),
);
const total = [...scriptSizes, ...inline].reduce((sum, size) => sum + size, 0);
if (!scripts.includes("/interactions.js") || total > initialJavaScriptBudget) {
  throw new Error(`JavaScript inicial inválido: ${total} bytes gzip`);
}
console.log(`JavaScript inicial da home: ${total} bytes gzip`);
