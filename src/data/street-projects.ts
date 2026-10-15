import type { StreetProject } from "@/types/street-project";

const projects: StreetProject[] = [
  {
    "id": "001",
    "slug": "graffiti-001",
    "title": "Personagem urbano",
    "type": "Graffiti",
    "featured": true,
    "coverImage": "/images/portfolio/graffiti-personagem.webp",
    "description": "Um personagem em vermelho, laranja e preto ocupa o muro. A pintura conversa com as árvores, a luz e a textura do concreto ao redor.",
    "images": [
      {
        "id": "wide",
        "src": "/images/portfolio/graffiti-personagem.webp",
        "alt": "Graffiti de personagem com chapéu em um muro externo, entre árvores e sombras",
        "label": "VISTA GERAL / RUA",
        "aspect": "portrait"
      },
      {
        "id": "detail",
        "src": "/images/portfolio/graffiti-personagem-detalhe.webp",
        "alt": "Detalhe do rosto, do chapéu e das cores do personagem pintado no muro",
        "label": "DETALHE / PERSONAGEM",
        "aspect": "portrait"
      }
    ]
  },
  {
    "id": "002",
    "slug": "arte-urbana-002",
    "title": "Verde no estúdio",
    "type": "Graffiti / interior",
    "featured": true,
    "coverImage": "/images/portfolio/graffiti-verde.webp",
    "description": "Verdes, preto e formas orgânicas levam a linguagem do graffiti para dentro do estúdio. A parede aparece também nos registros das sessões de tattoo.",
    "images": [
      {
        "id": "wall",
        "src": "/images/portfolio/graffiti-verde.webp",
        "alt": "Detalhe de graffiti verde com formas de caveira e mão na parede do estúdio",
        "label": "PAREDE / VERDE",
        "aspect": "landscape"
      },
      {
        "id": "context",
        "src": "/images/portfolio/artista-trabalhando.webp",
        "alt": "Bruel tatuando diante da parede verde do estúdio",
        "label": "CONTEXTO / ESTÚDIO",
        "aspect": "portrait"
      },
      {
        "id": "process",
        "src": "/images/portfolio/processo-costas.webp",
        "alt": "Sessão de tattoo com a pintura verde ao fundo",
        "label": "PELE & PAREDE",
        "aspect": "portrait"
      }
    ]
  },
  {
    "id": "003",
    "slug": "mural-003",
    "title": "Rosa no estúdio",
    "type": "Graffiti / interior",
    "coverImage": "/images/portfolio/graffiti-rosa.webp",
    "description": "Rosa, laranja e traços pretos dão identidade à outra parede do estúdio. O registro aproxima a pintura do espaço onde as tattoos ganham forma.",
    "images": [
      {
        "id": "wall",
        "src": "/images/portfolio/graffiti-rosa.webp",
        "alt": "Detalhe de personagem rosa e laranja pintado na parede do estúdio",
        "label": "PAREDE / ROSA",
        "aspect": "portrait"
      },
      {
        "id": "context",
        "src": "/images/portfolio/estudio.webp",
        "alt": "Vista do estúdio com graffiti rosa na parede, iluminação e sessão de tattoo",
        "label": "CONTEXTO / ESTÚDIO",
        "aspect": "portrait"
      },
      {
        "id": "process",
        "src": "/images/portfolio/processo.webp",
        "alt": "Artista durante uma sessão, com a parede rosa ao fundo",
        "label": "PROCESSO / TATTOO",
        "aspect": "portrait"
      }
    ]
  }
];

export function getStreetProjects() { return projects; }
export function getStreetProject(slug: string) { return projects.find(project => project.slug === slug); }
export function getFeaturedStreetProjects() { return projects.filter(project => project.featured); }
