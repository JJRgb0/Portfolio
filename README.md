# Portfólio de Rubens Galani

Portfólio de desenvolvimento full stack com projetos selecionados, competências vinculadas a evidências e dois estudos de caso técnicos.

## Stack e decisões

- Next.js App Router, TypeScript estrito e Tailwind CSS. React e React DOM completam as dependências de produção.
- A exportação estática gera HTML, sitemap, robots e imagens sociais no build. Links internos e âncoras usam a navegação nativa. O build final retira o runtime de hidratação do HTML exportado e verifica o limite de JavaScript. Um script local ativa menu, cópia e mídia.
- Fontes OFL empacotadas localmente via `next/font`. O mapa do hero conecta capturas reais em perspectiva pelas tecnologias compartilhadas. O movimento respeita a preferência do navegador. Capturas em WebP e loops sob demanda mostram os projetos reais.
- Os dados e os textos editoriais ficam em `content/`. A home vincula competências aos cards que as sustentam.

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run format:check
npm run build
npx playwright install chromium
npm test
```

`npm test` verifica a exportação de `out/` e abre o Next em desenvolvimento para verificar hidratação e console. Execute `npm run build` antes dos testes. O workflow de qualidade executa as mesmas verificações em push e pull request.

## Estrutura

- `app/` contém as rotas estáticas em português e inglês, seus metadados e estilos. O português fica na raiz, e a versão em inglês em `/en/`.
- `components/` contém a home, a navegação e o template dos estudos.
- `content/` contém os dados tipados e a configuração pública.
- `public/` contém mídia e currículo.
- `tests/` contém os testes de navegador.
- `.spec/features/portfolio-editorial/` contém a arquitetura fornecida e o mapa de testes.

## Atualização de conteúdo

- **Currículo.** Adicione `public/cv/curriculo.pdf` e defina `resume: "/cv/curriculo.pdf"` em `content/site.ts`. O header, o hero e o contato passam a oferecer o download.
- **AX.** Altere `discloseAx` para `false` em `content/site.ts` para ocultar o card, os links de evidência e as tecnologias associadas exclusivamente ao projeto.
- **Mídia.** Os pôsteres e loops vêm das demos públicas da [kdLux](https://kdlux.com.br/) e do [Golden Ace](https://golden-ace-arcade.vercel.app/). O Chess OS usa uma captura da [demonstração pública](https://chess-os-delta.vercel.app/). As capturas foram feitas com viewport de 1440 × 900 a 2×.

## Publicação

Na Vercel, vincule o repositório à branch de produção `main`, use o preset Next.js, diretório raiz `.` e saída estática `out`. O build padrão é `npm run build`. Na migração de um projeto existente, revise as configurações antigas de raiz e build no painel.

A URL pública padrão é `https://rubens-dmg.vercel.app`. Quando houver domínio próprio, adicione-o no painel e defina `NEXT_PUBLIC_SITE_URL` com sua URL para atualizar canonical, sitemap e Open Graph.

Ative Web Analytics no painel antes de publicar. O HTML de produção usa o script oficial da Vercel. Se o painel mostrar um caminho de script específico, configure `NEXT_PUBLIC_VERCEL_ANALYTICS_SCRIPT` com esse caminho. [Documentação da Vercel](https://vercel.com/docs/analytics/quickstart)

O campo About do GitHub pode usar a descrição acima, a URL pública e os tópicos `nextjs`, `typescript`, `tailwindcss` e `portfolio`.
