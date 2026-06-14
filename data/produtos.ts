export type Produto = {
  id: number;
  nome: string;
  categoria: string;
  precoMinimo: string;
  imagemPadrao: string;
  ref: string;
  cores: string[];
  tag?: string;
  descricao: string;
  medidas: string;
  material: string;
  avaliacoes: number;
  nota: number;
  imagensExtras?: string[];
};

export const PRODUTOS_DATABASE: Produto[] = [
  {
    id: 1,
    nome: "Cama King Size Premium",
    categoria: "Camas",
    precoMinimo: "19.000,00 MT",
    imagemPadrao: "/cama-preto.png",
    ref: "SL_C1",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Mais Vendido",
    descricao:
      "Cama King Size Premium com acabamento de alto padrão, estrutura reforçada e conforto excepcional.",
    medidas: "198cm x 208cm",
    material: "Estrutura em madeira maciça, estofo premium",
    avaliacoes: 48,
    nota: 4.8,
    imagensExtras: ["/cama-branco.png", "/cama-preto.png"],
  },
  {
    id: 2,
    nome: "Cama Casal Premium",
    categoria: "Camas",
    precoMinimo: "15.000,00 MT",
    imagemPadrao: "/cama-branco.png",
    ref: "SL_C2",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Mais Vendido",
    descricao: "Cama Casal Premium com conforto e estilo para o seu quarto.",
    medidas: "148cm x 208cm",
    material: "Estrutura em madeira, estofo premium",
    avaliacoes: 56,
    nota: 4.9,
    imagensExtras: ["/cama-branco.png", "/cama-preto.png"],
  },
  {
    id: 3,
    nome: "Sofá tecido de cor bege Confort",
    categoria: "Sofás",
    precoMinimo: "28.000,00 MT",
    imagemPadrao: "/bege.png",
    ref: "SL_S1",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Destaque",
    descricao:
      "Sofá retrátil com conforto máximo, ideal para famílias que valorizam conforto e estilo.",
    medidas: "240cm x 95cm",
    material: "Estofo sustentável, estrutura em madeira",
    avaliacoes: 36,
    nota: 4.7,
  },
  {
    id: 4,
    nome: "Sofá bouclé ou pele de carneiro (sherpa)",
    categoria: "Sofás",
    precoMinimo: "28.000,00 MT",
    imagemPadrao: "/bouclé.png",
    ref: "SL_S2",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Destaque",
    descricao:
      "Sofá em L. Possui uma estrutura robusta com braços largos e um formato de chaise que convida ao relaxamento.",
    medidas: "240cm x 95cm",
    material: "Estofo sustentável, estrutura em madeira",
    avaliacoes: 36,
    nota: 4.7,
  },
  {
    id: 5,
    nome: "Chesterfield",
    categoria: "Sofás",
    precoMinimo: "28.000,00 MT",
    imagemPadrao: "/Chesterfield.png",
    ref: "SL_S3",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Destaque",
    descricao:
      "Diferente dos sofás Chesterfield tradicionais (que costumam ser de couro e ter pés baixos de madeira), este modelo é modernizado pelos pés metálicos em estilo palito com acabamento dourado e pelo formato modular funcional.",
    medidas: "240cm x 95cm",
    material: "Estofo sustentável, estrutura em madeira",
    avaliacoes: 36,
    nota: 4.7,
  },
  {
    id: 6,
    nome: "Chesterfield modernizada",
    categoria: "Sofás",
    precoMinimo: "28.000,00 MT",
    imagemPadrao: "/ChesterfieldClassic.png",
    ref: "SL_S4",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Destaque",
    descricao:
      "Poltronas (Duas unidades): Têm um design mais contemporâneo e envolvente, com formato curvo e encosto contínuo. A parte externa é decorada com um matelassê em padrão diamante.",
    medidas: "240cm x 95cm",
    material: "Estofo sustentável, estrutura em madeira",
    avaliacoes: 36,
    nota: 4.7,
  },
  {
    id: 7,
    nome: "Sofá modular contemporâneo cor bege-amarronzado (tom terra)",
    categoria: "Sofás",
    precoMinimo: "32.000,00 MT",
    imagemPadrao: "/contemporâneo.png",
    ref: "SL_S5",
    cores: ["Branco", "Cinza"],
    tag: "Promoção",
    descricao:
      "Sofá de 3 lugares com acabamento luxuoso e conforto excepcional.",
    medidas: "220cm x 90cm",
    material: "Estofo premium, estrutura reforçada",
    avaliacoes: 42,
    nota: 4.8,
  },
  {
    id: 8,
    nome: "MESA DE CABECEIRA 2GAV BELFAST COR ITAUBA AMBER+BR GLOSS",
    categoria: "Cabeceiras",
    precoMinimo: 5190.0, // Alterado para Number
    imagemPadrao: "/cabeceiras.png", // Corrigida a barra
    ref: "L2400XA2200XP608",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Novo",
    descricao:
      "Equipada com 2 gavetas espaçosas, ideais para manter os seus itens pessoais, livros e carregadores sempre à mão e organizados.",
    medidas: "40cm x 35cm x 55cm",
    material: "Madeira maciça com acabamento gloss",
    avaliacoes: 22,
    nota: 4.6, // Vírgula removida daqui
  },
  {
    id: 9,
    nome: "Mesa de Cabeceira Skyline",
    categoria: "Cabeceiras",
    precoMinimo: "6.500,00 MT",
    imagemPadrao: "/cab.png",
    ref: "L570XA599XP405",
    cores: ["Branco", "Mármore"],
    tag: "Novo",
    descricao: "1 nicho aberto + 2 gavetgit initas amplas.",
    medidas: "57cm x 60cm x 40cm",
    material: "Madeira com acabamento em mármore",
    avaliacoes: 18,
    nota: 4.5,
  },
  {
    id: 10,
    nome: "CADEIRA ALTA COR CINZA CLARO",
    categoria: "Cadeiras",
    precoMinimo: "7.990,00 MT",
    imagemPadrao:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop",
    ref: "420*470*920MM",
    cores: ["Branco", "Cinza", "Preto"],
    tag: "Tendência",
    descricao:
      "Cadeira alta ergonómica, ideal para salas de jantar e ambientes modernos.",
    medidas: "42cm x 47cm x 92cm",
    material: "Estofo cinza claro, estrutura metálica",
    avaliacoes: 31,
    nota: 4.7,
  },
];
