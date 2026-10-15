# Bruel

Site/portfólio de Bruel — Tattoo, Graffiti e Arte.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4 e CSS
- Vercel

Node.js 22 LTS. O lockfile é versionado para instalações reproduzíveis.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Build

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

## Estrutura

- `src/app`: páginas, metadata e estilos globais.
- `src/components`: navegação, galerias, diálogos e formulário.
- `src/data`: trabalhos de tattoo e projetos de arte urbana.
- `src/lib`: configuração do site e mensagens de contato.
- `src/assets/fonts`: fontes locais Barlow Condensed e IBM Plex Mono, com licenças OFL.
- `public/images` e `public/videos`: mídia usada pelo frontend.

Rotas: `/`, `/trabalhos`, `/street`, `/street/graffiti-001`, `/street/arte-urbana-002`, `/street/mural-003`, `/sobre` e `/agendar`. Há uma página 404 própria.

O pré-agendamento tem seis etapas e prepara uma mensagem de WhatsApp para revisão e envio pelo visitante. Referências permanecem no navegador e devem ser anexadas na conversa. Não há backend, banco de dados ou envio automático. O contato é centralizado em `src/lib/constants/contact.ts`.

## Deploy

Hospedagem na Vercel, com detecção automática de Next.js e branch principal `main`. Não são necessárias variáveis de ambiente.

Após autenticar e vincular o projeto:

```sh
vercel deploy
vercel deploy --prod
```

Antes de publicar, execute lint, typecheck e build e valide rotas, mídia, formulário e navegação no build de produção. Não versionar segredos, caches, builds locais ou arquivos de trabalho. A configuração local `.vercel` é ignorada pelo Git.
