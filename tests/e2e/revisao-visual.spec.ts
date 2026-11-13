import { expect, test } from "@playwright/test";

test("@spec:AC-010 os destaques ocupam a largura disponível no desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projetos");
  const projects = page.locator(".project-featured");
  await expect(projects).toHaveCount(2);
  for (const project of await projects.all()) {
    const card = (await project.boundingBox())!;
    const media = (await project.locator(".media-screen").boundingBox())!;
    const text = (await project.locator(".project-info").boundingBox())!;
    expect(card.width).toBeGreaterThan(1100);
    expect(media.width).toBeGreaterThan(card.width * 0.57);
    expect(text.x).toBeGreaterThan(media.x + media.width);
  }
});

// AC-011 descrevia a pilha substituída. A prova agora usa a cena integrada
// e mantém a verificação de resposta ao cursor e de movimento reduzido.
test("@spec:AC-011 a cena 3D responde ao cursor e respeita movimento reduzido", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const map = page.locator("[data-project-map]");
  const card = map.locator('[data-map-project="golden-ace"]');
  const edge = map.locator('[data-from="golden-ace"]');
  await expect(map.locator("[data-map-project]")).toHaveCount(3);
  await card.hover();
  await expect(edge).toHaveAttribute("data-lit", "");
  await expect(edge.locator(".map-pulse")).toHaveCSS(
    "animation-name",
    "map-active-signal",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(edge.locator(".map-pulse")).toHaveCSS("animation-name", "none");
  await expect(card).toHaveCSS("transition-duration", "0s");
});

test("@spec:AC-012 home e estudos hidratam sem erros no Next em desenvolvimento", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  const base = "http://127.0.0.1:4175";
  const script = await page.request.get(`${base}/interactions.js`);
  expect(script.ok()).toBe(true);

  for (const path of [
    "/",
    "/projetos/kdlux/",
    "/projetos/golden-ace/",
    "/en/",
    "/en/projects/kdlux/",
    "/en/projects/golden-ace/",
  ]) {
    await page.goto(`${base}${path}`);
    await page.locator(".media-screen").first().scrollIntoViewIfNeeded();
    await expect(page.locator(".media-screen video").first()).toBeAttached();
    expect(errors, path).toEqual([]);
  }
});
