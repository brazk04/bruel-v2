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

O pré-agendamento tem seis etapas e prepara uma mensagem de WhatsApp para revisão e envio pelo visitante. Referências permanecem no navegador e devem ser anexadas na conversa. O agendamento é feito pelo WhatsApp. O contato é centralizado em `src/lib/constants/contact.ts`.

## Área administrativa

Acesse `/admin` pelo link discreto no rodapé. Entre com a senha administrativa, selecione uma seção, edite os títulos ou envie os arquivos e clique em **Salvar e publicar**. Use **Restaurar original** para voltar ao conteúdo inicial de um campo.

O painel aceita imagens JPG, PNG, WebP e AVIF de até 15 MB e vídeos MP4 e WebM de até 150 MB. Os arquivos e as edições ficam no Vercel Blob e são mantidos entre deploys. Os arquivos enviados usam URLs públicas para exibição no site.

Para habilitar o painel, vincule um armazenamento público Vercel Blob para a mídia e um privado para o conteúdo publicado. As variáveis correspondentes são `BLOB_READ_WRITE_TOKEN` e `BRUEL_CONTENT_READ_WRITE_TOKEN`. Configure `BRUEL_ADMIN_PASSWORD_HASH` com o SHA-256 hexadecimal de uma senha aleatória de alta entropia. Use variáveis locais para testar. Os testes locais salvam o conteúdo em um arquivo separado do conteúdo de produção. A troca do hash invalida as sessões anteriores.

## Deploy

Hospedagem na Vercel, com detecção automática de Next.js e branch principal `main`. Configure as variáveis do painel no projeto antes do deploy.

Após autenticar e vincular o projeto:

```sh
vercel deploy
vercel deploy --prod
```

Antes de publicar, execute lint, typecheck e build e valide rotas, mídia, formulário e navegação no build de produção. Não versionar segredos, caches, builds locais ou arquivos de trabalho. A configuração local `.vercel` é ignorada pelo Git.
