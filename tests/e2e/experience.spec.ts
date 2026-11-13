import { expect, test } from "@playwright/test";
import { site } from "../../content/site";

test("@spec:AC-013 o mapa destaca projetos que usam a tecnologia selecionada", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const map = page.locator("[data-project-map]");
  const tech = map.getByRole("button", { name: "Three.js", exact: true });
  await tech.focus();
  await page.keyboard.press("Enter");
  await expect(tech).toHaveAttribute("aria-pressed", "true");
  await expect(map.locator("[data-map-project][data-match]")).toHaveCount(2);
  await expect(map.locator('[data-map-project="kdlux"]')).toHaveAttribute(
    "data-muted",
    "",
  );
  await expect(map.locator("[data-map-edge][data-lit]")).toHaveCount(1);
  await expect(map.locator("[data-map-status]")).toContainText(
    "Golden Ace, Chess OS",
  );
  await map.getByRole("link", { name: "Chess OS", exact: true }).click();
  await expect(page).toHaveURL(/#projeto-chess-os$/);
  const chess = page.getByRole("article", { name: "Chess OS", exact: true });
  await expect(
    chess.getByRole("link", { name: /Demonstração/ }),
  ).toHaveAttribute("href", "https://chess-os-delta.vercel.app/");
  await expect(chess).toContainText("implementação gerada com IA");
});

test("@spec:AC-014 o seletor abre o conteúdo equivalente em português e inglês", async ({
  page,
  context,
  request,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#projetos");
  await page.getByRole("link", { name: "EN — English", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/#projetos$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Applications in motion.",
  );
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="pt-BR"]'),
  ).toHaveAttribute("href", new URL("/", site.url).href);
  await page
    .getByRole("article", { name: "kdLux", exact: true })
    .getByRole("link", { name: "Read case study" })
    .click();
  await expect(page).toHaveURL(/\/en\/projects\/kdlux\/$/);
  await expect(
    page.getByRole("heading", { name: "Checkout flow" }),
  ).toBeVisible();
  await expect(page.locator(".purchase-flow > li")).toHaveCount(8);
  await page.getByRole("link", { name: "PT — Português", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/kdlux\/$/);
  await expect(
    page.getByRole("heading", { name: "Fluxo de compra" }),
  ).toBeVisible();
  await page.goto("/en/#contato");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.locator(".copy-feedback")).toHaveText("Copied");
  const notFound = await page.goto("/en/projects/missing/");
  expect(notFound?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found." }),
  ).toBeVisible();
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "/en/projects/kdlux/",
  );
});
