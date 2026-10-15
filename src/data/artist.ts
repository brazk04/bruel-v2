export type ArtistImage = {
  id: string;
  src: string | null;
  alt: string;
  type: "portrait" | "process" | "studio" | "sketch";
  label: string;
};

// Texto editorial provisório. Substituir pela biografia e pelo acervo fornecidos pelo artista.
export const artist = {
  name: "Bruel",
  base: "Rio Verde — GO",
  country: "Brasil",
  introduction: "Entre pele, tinta e cidade.",
  bio: [
    "Bruel desenvolve uma linguagem visual que atravessa tattoo, graffiti e arte urbana.",
    "Desenho, identidade e rua se encontram em trabalhos que mudam de superfície e de escala sem perder presença.",
  ],
  fields: [
    { number: "01", title: "Desenho", note: "O gesto começa antes de encontrar suporte." },
    { number: "02", title: "Graffiti", note: "A cidade amplia a escala da imagem." },
    { number: "03", title: "Tattoo", note: "O traço encontra o corpo e acompanha uma história." },
    { number: "04", title: "Autoral", note: "As linguagens se cruzam em uma assinatura visual." },
  ],
  process: [
    { number: "01", title: "Ideia", note: "Escuta e direção para entender o que a imagem precisa dizer." },
    { number: "02", title: "Referência", note: "Pesquisa de linguagem, contexto e superfície." },
    { number: "03", title: "Desenho", note: "Composição, teste e ajuste do traço." },
    { number: "04", title: "Execução", note: "A imagem ganha forma na pele, na parede ou no papel." },
  ],
  images: [
    { id: "portrait", src: "/images/portfolio/artista-trabalhando.webp", alt: "Bruel tatuando no estúdio, diante de uma parede com graffiti verde", type: "portrait", label: "ARTIST / EM AÇÃO" },
    { id: "studio", src: "/images/portfolio/estudio.webp", alt: "Estúdio de tattoo com maca, iluminação e graffiti rosa na parede", type: "studio", label: "STUDIO / PELE & PAREDE" },
    { id: "process", src: "/images/portfolio/processo-preto-branco.webp", alt: "Bruel concentrado durante uma sessão de tattoo, em fotografia preto e branco", type: "process", label: "PROCESS / O TRAÇO ACONTECE" },
    { id: "sketch", src: "/images/portfolio/materiais.webp", alt: "Bancada com máquina de tatuagem e recipientes de tinta em preto e branco", type: "sketch", label: "TOOLS / TINTA & MATÉRIA" },
  ] satisfies ArtistImage[],
} as const;
