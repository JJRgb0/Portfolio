import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { caseStudies, projects, projectAnchor } from "../../content/projects";
import { site } from "../../content/site";

test("@spec:AC-001 home e navegação por âncoras", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    site.hero.title,
  );
  await expect(page.locator("main > section[id]")).toHaveCount(
    site.navigation.length,
  );
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Ir para o conteúdo" }),
  ).toBeFocused();
  for (const { title, id } of site.navigation) {
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: title })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
  for (const project of projects) {
    await expect(page.locator(`#${projectAnchor(project.slug)}`)).toContainText(
      project.name,
    );
  }
  for (const link of await page.locator(".skill-evidence a").all()) {
    const target = await link.getAttribute("href");
    expect(target).toBeTruthy();
    await expect(page.locator(target!)).toHaveCount(1);
  }
});

test("@spec:AC-002 menu móvel prende o foco e fecha por Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Fechar" });
  await expect(dialog).toBeVisible();
  await expect(close).toBeFocused();
  await expect(page.locator("html")).toHaveCSS("overflow-y", "hidden");
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.locator("a").last()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await dialog.getByRole("link", { name: "Projetos" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#projetos$/);
});

test("@spec:AC-003 os dois estudos de caso e a rota 404 abrem", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("article", { name: "kdLux", exact: true })
    .getByRole("link", { name: "Ver estudo de caso" })
    .click();
  await expect(page).toHaveURL(/\/projetos\/kdlux\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("kdLux");
  await expect(page.locator(".purchase-flow > li")).toHaveCount(8);
  await expect(page.locator(".decision-grid > article")).toHaveCount(4);
  await expect(page.locator(".architecture-board")).toHaveAttribute(
    "role",
    "img",
  );
  await page
    .getByRole("navigation", { name: "Navegação entre estudos de caso" })
    .getByRole("link", { name: "Golden Ace" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Golden Ace",
  );
  await expect(
    page.getByRole("heading", { name: "Fluxo de compra" }),
  ).toHaveCount(0);
  await expect(page.locator(".decision-grid > article")).toHaveCount(4);
  const result = await page.goto("/projetos/indisponivel/");
  expect(result?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    site.notFound,
  );
  await page.getByRole("link", { name: "Voltar ao início" }).click();
  await expect(page).toHaveURL("/");
});

test("@spec:AC-004 e-mail abre o cliente e pode ser copiado", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contato");
  await expect(page.getByRole("link", { name: site.email! })).toHaveAttribute(
    "href",
    `mailto:${site.email}`,
  );
  await page.getByRole("button", { name: "Copiar e-mail" }).click();
  await expect(
    page.locator('[aria-live="polite"]').filter({ hasText: "Copiado" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    site.email,
  );
});

for (const path of [
  "/",
  "/projetos/kdlux/",
  "/projetos/golden-ace/",
  "/en/",
  "/en/projects/kdlux/",
  "/en/projects/golden-ace/",
]) {
  test(`@spec:AC-005 acessibilidade e largura em ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    for (const width of [320, 360, 768, 1280, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      if (width === 360 || width === 1280) {
        const audit = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(
          audit.violations.filter(
            ({ impact }) => impact === "serious" || impact === "critical",
          ),
        ).toEqual([]);
      }
    }
    await expect(page.locator("video")).toHaveCount(0);
  });
}

test("@spec:AC-006 páginas exportadas com metadados e imagens de compartilhamento", async ({
  page,
  request,
}) => {
  for (const path of [
    "/",
    "/projetos/kdlux/",
    "/projetos/golden-ace/",
    "/en/",
    "/en/projects/kdlux/",
    "/en/projects/golden-ace/",
  ]) {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new URL(path, site.url).href,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const image = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");
    const resource = await request.get(new URL(image!).pathname);
    expect(resource.ok()).toBeTruthy();
    const bytes = await resource.body();
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
  }
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/projetos/kdlux/");
  expect(sitemap).toContain("/projetos/golden-ace/");
});

test("@spec:AC-007 mídia real dos destaques e carregamento progressivo", async ({
  page,
  request,
}) => {
  for (const project of caseStudies) {
    const media = project.media;
    expect(media).toBeTruthy();
    expect((await request.get(media!.poster)).ok()).toBeTruthy();
    for (const source of [media!.video!.webm, media!.video!.mp4]) {
      const asset = await request.get(source);
      expect(asset.ok()).toBeTruthy();
      const size = (await asset.body()).length;
      expect(size).toBeGreaterThan(1000);
      expect(size).toBeLessThanOrEqual(1_500_000);
    }
  }
  await page.goto("/");
  await expect(page.locator("video")).toHaveCount(0);
  await page.locator("#projeto-kdlux figure").scrollIntoViewIfNeeded();
  const video = page.locator("#projeto-kdlux video");
  await expect(video).toHaveCount(1);
  await expect
    .poll(() => video.evaluate((player: HTMLVideoElement) => player.paused))
    .toBe(false);
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((player: HTMLVideoElement) => player.paused))
    .toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("video")).toHaveCount(0);
});

test("@spec:AC-008 a exportação fica abaixo do limite de JavaScript", async ({
  request,
}) => {
  const { gzipSync } = await import("node:zlib");
  const html = await (await request.get("/")).text();
  expect(html).not.toContain("self.__next_f");
  const sources = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"[^>]*>/gi)].map(
    (match) => match[1],
  );
  expect(sources).toEqual(["/interactions.js"]);
  const source = await request.get(sources[0]);
  expect(source.ok()).toBe(true);
  expect(gzipSync(await source.body()).length).toBeLessThanOrEqual(120_000);
});

test("@spec:AC-009 texto e navegação continuam disponíveis sem JavaScript", async ({
  browser,
}) => {
  const page = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  await page.goto("http://127.0.0.1:4174/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    site.hero.title,
  );
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeHidden();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Projetos" })
    .click();
  await expect(page).toHaveURL(/#projetos$/);
  await page
    .getByRole("article", { name: "kdLux", exact: true })
    .getByRole("link", { name: "Ver estudo de caso" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("kdLux");
  await expect(
    page.getByRole("img", { name: /Vitrine da kdLux/ }),
  ).toBeVisible();
  await page.close();
});
