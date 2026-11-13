import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const root = resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  let path;
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    path = resolve(root, `.${pathname}`);
    if (path !== root && !path.startsWith(root + sep))
      throw new Error("Caminho inválido");
    const info = await stat(path);
    if (info.isDirectory()) path = join(path, "index.html");
    if (!(await stat(path)).isFile()) throw new Error("Arquivo ausente");
  } catch {
    path = pathname?.startsWith("/en/")
      ? join(root, "en/404/index.html")
      : join(root, "404.html");
    response.statusCode = 404;
  }
  const type =
    types[extname(path)] ??
    (path.endsWith("opengraph-image")
      ? "image/png"
      : "application/octet-stream");
  response.setHeader("Content-Type", type);
  if (request.method === "HEAD") response.end();
  else
    createReadStream(path)
      .on("error", () => response.end())
      .pipe(response);
}).listen(Number(process.argv[2] ?? 4173), "127.0.0.1");
