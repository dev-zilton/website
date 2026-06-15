"use client";

import Image from "next/image";
import { type MouseEvent, useMemo, useState } from "react";
import { PRODUTOS_DATABASE, type Produto } from "@/data/produtos";

const FOTOS_CAMA_POR_COR: Record<string, string> = {
  Branco: "/cama-branco.png",
  Cinza: "/cama-cinza.png",
  Preto: "/cama-preto.png",
};

const TABELA_PRECOS_CAMAS = {
  tamanhos: ["Casal", "Queen", "King normal", "King size"] as const,
  componentes: {
    "Base e encosto": {
      Casal: 19000,
      Queen: 22000,
      "King normal": 26000,
      "King size": 32000,
    },
    "Base somente": {
      Casal: 9000,
      Queen: 11000,
      "King normal": 14000,
      "King size": 18000,
    },
    "Encosto somente": {
      Casal: 10000,
      Queen: 12000,
      "King normal": 15000,
      "King size": 18000,
    },
  },
  cabeceiras: 7000,
  colchoes: {
    Casal: 10000,
    Queen: 12000,
    "King normal": 14000,
    "King size": 16000,
  },
};

const CATEGORIAS = [
  "Todos",
  "Camas",
  "Sofás",
  "Cabeceiras",
  "Cadeiras",
] as const;

const POR_QUE = [
  {
    icon: "🏠",
    titulo: "Móveis sob medida",
    texto: "Personalizados para o seu espaço.",
  },
  {
    icon: "🚚",
    titulo: "Entrega em Moçambique",
    texto: "Levamos até si com segurança.",
  },
  {
    icon: "⭐",
    titulo: "Garantia de qualidade",
    texto: "Acabamento premium e durável.",
  },
  {
    icon: "📞",
    titulo: "Atendimento personalizado",
    texto: "Falamos consigo do início ao fim.",
  },
];

const DEPOIMENTOS = [
  {
    nome: "Maria Silva",
    texto:
      "Excelente qualidade e entrega rápida. A sala ficou exatamente como imaginávamos!",
    nota: 5,
  },
  {
    nome: "João Santos",
    texto: "Móveis sob medida de alto padrão. Recomendo a todos!",
    nota: 5,
  },
  {
    nome: "Ana Costa",
    texto:
      "Atendimento personalizado e qualidade excepcional. Minha casa está transformada!",
    nota: 5,
  },
];

const FAQ_ITEMS = [
  {
    pergunta: "Quanto tempo demora a produção?",
    resposta: "7 a 30 dias dependendo do projeto e complexidade do móvel.",
  },
  {
    pergunta: "Fazem móveis personalizados?",
    resposta: "Sim. Fazemos móveis sob medida conforme as suas necessidades.",
  },
  {
    pergunta: "Entregam em todo o país?",
    resposta:
      "Sim, entregamos em todo Moçambique, incluindo Maputo, Beira e Nampula.",
  },
  {
    pergunta: "Quais formas de pagamento aceitam?",
    resposta: "Aceitamos M-Pesa, Emola e transferência bancária.",
  },
  {
    pergunta: "Oferecem garantia?",
    resposta:
      "Sim, todos os móveis têm garantia contra defeitos de fabricação.",
  },
];

const GALERIA_PROJETOS = [
  {
    imagem:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    titulo: "Sala Moderna",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=1200&auto=format&fit=crop",
    titulo: "Quarto Master",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop",
    titulo: "Sala de Jantar",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    titulo: "Cozinha Integrada",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop",
    titulo: "Quarto Infantil",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop",
    titulo: "Sala Luxo",
  },
];

const WHATSAPP_NUMERO = "258843792635";

const REDES_SOCIAIS = [
  {
    nome: "Instagram",
    href: "https://instagram.com/sweetlar.mz",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    nome: "Facebook",
    href: "https://facebook.com/sweetlar.mz",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    nome: "TikTok",
    href: "https://tiktok.com/@sweetlar.mz",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    nome: "Twitter/X",
    href: "https://twitter.com/sweetlar_mz",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

type CarrinhoItem = {
  id: number;
  quantidade: number;
  preco: number;
  tamanho: string;
  cor: string;
  tipo: string;
};

const parsePrecoProduto = (preco: number | string) =>
  Number(
    String(preco)
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^\d.]/g, ""),
  );

const normalizarCarrinhoSalvo = (value: unknown): CarrinhoItem[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const cartItem = item as Partial<CarrinhoItem>;
    if (typeof cartItem.id !== "number") return [];
    const produto = PRODUTOS_DATABASE.find((p) => p.id === cartItem.id);
    if (!produto) return [];
    return [
      {
        id: cartItem.id,
        quantidade:
          typeof cartItem.quantidade === "number" && cartItem.quantidade > 0
            ? cartItem.quantidade
            : 1,
        preco:
          typeof cartItem.preco === "number" && cartItem.preco > 0
            ? cartItem.preco
            : parsePrecoProduto(String(produto.precoMinimo)),
        tamanho: cartItem.tamanho ?? "",
        cor: cartItem.cor ?? "",
        tipo: cartItem.tipo ?? "",
      },
    ];
  });
};

const getCarrinhoItemKey = (item: CarrinhoItem) =>
  `${item.id}-${item.preco}-${item.tamanho}-${item.cor}-${item.tipo}`;

const money = (value: number) =>
  `${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} MT`;

type CardProdutoProps = {
  item: Produto;
  favoritos: number[];
  onAbrirDetalhes: (id: number) => void;
  onToggleFavorito: (id: number) => void;
};

const CardProduto = ({
  item,
  favoritos,
  onAbrirDetalhes,
  onToggleFavorito,
}: CardProdutoProps) => (
  <div
    onClick={() => onAbrirDetalhes(item.id)}
    className="group cursor-pointer rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="relative mb-4 h-60 w-full overflow-hidden rounded-2xl bg-zinc-50">
      <Image
        src={item.imagemPadrao}
        alt={item.nome}
        fill
        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorito(item.id);
        }}
        aria-label="Adicionar aos favoritos"
        className={`absolute right-2 top-2 rounded-full bg-white p-2 shadow-md ${
          favoritos.includes(item.id) ? "text-red-500" : "text-zinc-400"
        }`}
      >
        ❤️
      </button>
      {item.tag && (
        <span className="absolute left-2 top-2 rounded-full bg-sky-500 px-2 py-1 text-[10px] font-bold text-white">
          {item.tag}
        </span>
      )}
    </div>
    <div className="flex items-start justify-between gap-3">
      <div>
        <span className="text-[10px] font-bold uppercase text-sky-600">
          {item.categoria}
        </span>
        <h3 className="mt-1 line-clamp-2 text-base font-bold text-zinc-900">
          {item.nome}
        </h3>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-xs text-zinc-500">⭐ {item.nota}</span>
          <span className="text-[10px] text-zinc-400">({item.avaliacoes})</span>
        </div>
      </div>
      <span className="whitespace-nowrap text-sm font-extrabold text-zinc-900">
        {item.precoMinimo}
      </span>
    </div>
    <div className="mt-4 flex gap-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAbrirDetalhes(item.id);
        }}
        className="flex-1 rounded-xl bg-zinc-900 py-2.5 text-sm text-white transition-all hover:bg-zinc-800"
      >
        Ver detalhes
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorito(item.id);
        }}
        className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm hover:border-sky-500"
      >
        {favoritos.includes(item.id) ? "♥" : "♡"}
      </button>
    </div>
  </div>
);

type MenuSecoesProps = {
  categoriaAtiva: (typeof CATEGORIAS)[number];
  onSelecionar: (cat: (typeof CATEGORIAS)[number]) => void;
};

const MenuSecoes = ({ categoriaAtiva, onSelecionar }: MenuSecoesProps) => (
  <div className="mb-10 flex flex-wrap gap-3">
    {CATEGORIAS.map((cat) => (
      <button
        key={cat}
        type="button"
        onClick={() => onSelecionar(cat)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          categoriaAtiva === cat
            ? "bg-sky-500 text-white"
            : "border border-zinc-200 bg-white text-zinc-600 hover:border-sky-500"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

type PaginaHomeProps = {
  buscaTermo: string;
  setBuscaTermo: (v: string) => void;
  categoriaAtiva: (typeof CATEGORIAS)[number];
  setCategoriaAtiva: (v: (typeof CATEGORIAS)[number]) => void;
  setProdutoSelecionadoId: (id: number | null) => void;
  produtosFiltrados: Produto[];
  produtosMaisVendidos: Produto[];
  produtosNovidades: Produto[];
  favoritos: number[];
  onAbrirDetalhes: (id: number) => void;
  onToggleFavorito: (id: number) => void;
  whatsappMensagemGeral: string;
};

const PaginaHome = ({
  buscaTermo,
  setBuscaTermo,
  categoriaAtiva,
  setCategoriaAtiva,
  setProdutoSelecionadoId,
  produtosFiltrados,
  produtosMaisVendidos,
  produtosNovidades,
  favoritos,
  onAbrirDetalhes,
  onToggleFavorito,
  whatsappMensagemGeral,
}: PaginaHomeProps) => (
  <>
    <section className="relative flex min-h-125 items-center bg-zinc-950 text-white">
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-20 mx-auto max-w-7xl px-4 py-20">
        <span className="mb-4 inline-block text-xs uppercase tracking-[0.3em] text-sky-300">
          SweetLar Moçambique
        </span>
        <h1 className="mb-4 max-w-2xl text-4xl font-black sm:text-6xl">
          Móveis sob medida de alto padrão.
        </h1>
        <p className="mb-8 max-w-md text-zinc-400">
          Escolha a cor, o tamanho ideal e personalize o seu conforto.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("grid-produtos")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-medium text-white"
          >
            Explorar Modelos
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsappMensagemGeral}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm"
          >
            Orçamento no WhatsApp
          </a>
        </div>
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-black text-zinc-900">
          Por que escolher a SweetLar?
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POR_QUE.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-zinc-50 p-6 text-center transition-all hover:bg-zinc-100"
            >
              <div className="mb-4 text-5xl">{item.icon}</div>
              <h3 className="mb-2 font-bold text-zinc-900">{item.titulo}</h3>
              <p className="text-sm text-zinc-500">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-zinc-50/50 py-16">
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        id="grid-produtos"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-black text-zinc-900">Produtos</h2>
            <p className="mt-1 text-zinc-500">
              Escolha por categoria, veja os detalhes e encomende já.
            </p>
          </div>
          <input
            value={buscaTermo}
            onChange={(e) => setBuscaTermo(e.target.value)}
            placeholder="Pesquisar produto..."
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 focus:border-sky-500 focus:outline-none sm:w-96"
          />
        </div>

        <MenuSecoes
          categoriaAtiva={categoriaAtiva}
          onSelecionar={(cat) => {
            setCategoriaAtiva(cat);
            setProdutoSelecionadoId(null);
          }}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {produtosFiltrados.map((item) => (
            <CardProduto
              key={item.id}
              item={item}
              favoritos={favoritos}
              onAbrirDetalhes={onAbrirDetalhes}
              onToggleFavorito={onToggleFavorito}
            />
          ))}
        </div>
      </div>
    </section>

    {produtosMaisVendidos.length > 0 && (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-black text-zinc-900">
            Mais Vendidos
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {produtosMaisVendidos.map((item) => (
              <CardProduto
                key={item.id}
                item={item}
                favoritos={favoritos}
                onAbrirDetalhes={onAbrirDetalhes}
                onToggleFavorito={onToggleFavorito}
              />
            ))}
          </div>
        </div>
      </section>
    )}

    {produtosNovidades.length > 0 && (
      <section className="bg-zinc-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-black text-zinc-900">Novidades</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {produtosNovidades.map((item) => (
              <CardProduto
                key={item.id}
                item={item}
                favoritos={favoritos}
                onAbrirDetalhes={onAbrirDetalhes}
                onToggleFavorito={onToggleFavorito}
              />
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-black text-zinc-900">
          Galeria de Projetos Realizados
        </h2>
        <p className="mb-12 text-center text-zinc-500">
          Ambientes reais transformados com os nossos móveis.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALERIA_PROJETOS.map((projeto, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl">
              <Image
                src={projeto.imagem}
                alt={projeto.titulo}
                width={1200}
                height={800}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-lg font-bold text-white">
                  {projeto.titulo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-zinc-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-black">
          O que os nossos clientes dizem
        </h2>
        <p className="mb-12 text-center text-zinc-400">
          Depoimentos de clientes satisfeitos.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {DEPOIMENTOS.map((dep, i) => (
            <div key={i} className="rounded-2xl bg-zinc-900 p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: dep.nota }).map((_, j) => (
                  <span key={j}>⭐</span>
                ))}
              </div>
              <h4 className="mb-2 font-bold">{dep.nome}</h4>
              <p className="text-zinc-300">{dep.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-black text-zinc-900">
          Perguntas Frequentes
        </h2>
        <p className="mb-12 text-center text-zinc-500">
          Respostas para as dúvidas mais comuns.
        </p>
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6"
            >
              <h3 className="mb-2 font-bold text-zinc-900">{faq.pergunta}</h3>
              <p className="text-zinc-500">{faq.resposta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-black text-zinc-900">Contacte-nos</h2>
        <form className="space-y-4">
          <input placeholder="Nome" className="w-full rounded border p-3" />
          <input placeholder="Telefone" className="w-full rounded border p-3" />
          <textarea
            placeholder="Mensagem"
            className="w-full rounded border p-3"
          />
          <button className="rounded bg-sky-500 px-6 py-3 text-white">
            Enviar
          </button>
        </form>
      </div>
    </section>

    <section className="bg-sky-500 py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-4xl font-black">
          Pronto para transformar sua casa?
        </h2>
        <p className="mb-8 text-xl opacity-90">
          Solicite orçamento no WhatsApp e receba atendimento personalizado.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsappMensagemGeral}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-white px-8 py-4 font-bold text-sky-600 transition-all hover:bg-zinc-100"
          >
            📱 Solicitar Orçamento no WhatsApp
          </a>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("grid-produtos")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-xl border border-white/30 bg-sky-600 px-8 py-4 font-bold text-white transition-all hover:bg-sky-700"
          >
            🛒 Ver Produtos
          </button>
        </div>
      </div>
    </section>
  </>
);

export default function Home() {
  const [categoriaAtiva, setCategoriaAtiva] =
    useState<(typeof CATEGORIAS)[number]>("Todos");
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<
    number | null
  >(null);
  const [buscaTermo, setBuscaTermo] = useState("");

  // ✅ Initializer functions: lêem o localStorage apenas uma vez, no cliente,
  // sem precisar de useEffect nem setState dentro de efeito.
  const [favoritos, setFavoritos] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("sweetlar-favorites");
      return saved ? (JSON.parse(saved) as number[]) : [];
    } catch {
      return [];
    }
  });

  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("sweetlar-cart");
      return saved ? normalizarCarrinhoSalvo(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });

  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] =
    useState<(typeof TABELA_PRECOS_CAMAS.tamanhos)[number]>("Casal");
  const [tipoSelecionado, setTipoSelecionado] =
    useState<keyof typeof TABELA_PRECOS_CAMAS.componentes>("Base e encosto");
  const [corSelecionada, setCorSelecionada] = useState("Cinza");
  const [incluirCabeceira, setIncluirCabeceira] = useState(false);
  const [incluirColchao, setIncluirColchao] = useState(false);
  const [imagemExibida, setImagemExibida] = useState("");
  const [lupaAtiva, setLupaAtiva] = useState(false);
  const [lupaPosicao, setLupaPosicao] = useState({ x: 50, y: 50 });

  const setCarrinhoComPersistencia = (
    updater: CarrinhoItem[] | ((prev: CarrinhoItem[]) => CarrinhoItem[]),
  ) => {
    setCarrinho((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (typeof window !== "undefined")
        localStorage.setItem("sweetlar-cart", JSON.stringify(next));
      return next;
    });
  };

  const setFavoritosComPersistencia = (
    updater: number[] | ((prev: number[]) => number[]),
  ) => {
    setFavoritos((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (typeof window !== "undefined")
        localStorage.setItem("sweetlar-favorites", JSON.stringify(next));
      return next;
    });
  };

  const produtoAtual = PRODUTOS_DATABASE.find(
    (p) => p.id === produtoSelecionadoId,
  );

  const produtosFiltrados = useMemo(() => {
    return PRODUTOS_DATABASE.filter((p) => {
      const matchCategoria =
        categoriaAtiva === "Todos" || p.categoria === categoriaAtiva;
      const matchBusca =
        buscaTermo.trim() === "" ||
        p.nome.toLowerCase().includes(buscaTermo.toLowerCase());
      return matchCategoria && matchBusca;
    });
  }, [categoriaAtiva, buscaTermo]);

  const produtosRelacionados = useMemo(() => {
    if (!produtoAtual) return [];
    return PRODUTOS_DATABASE.filter(
      (p) => p.categoria === produtoAtual.categoria && p.id !== produtoAtual.id,
    ).slice(0, 3);
  }, [produtoAtual]);

  const produtosMaisVendidos = PRODUTOS_DATABASE.filter(
    (p) => p.tag === "Mais Vendido",
  );
  const produtosNovidades = PRODUTOS_DATABASE.filter((p) => p.tag === "Novo");

  const calcularPrecoCama = () => {
    let total = 0;
    const tabelaComponente = TABELA_PRECOS_CAMAS.componentes[tipoSelecionado];
    total += tabelaComponente[tamanhoSelecionado] || 0;
    if (incluirCabeceira) total += TABELA_PRECOS_CAMAS.cabeceiras;
    if (incluirColchao)
      total += TABELA_PRECOS_CAMAS.colchoes[tamanhoSelecionado] || 0;
    return total;
  };

  const getPrecoProduto = () => {
    if (!produtoAtual) return "";
    if (produtoAtual.categoria === "Camas") return money(calcularPrecoCama());
    return produtoAtual.precoMinimo;
  };

  const tratarMudancaDeCor = (novaCor: string) => {
    setCorSelecionada(novaCor);
    if (produtoAtual?.categoria === "Camas") {
      const foto = FOTOS_CAMA_POR_COR[novaCor];
      setImagemExibida(foto || produtoAtual.imagemPadrao);
    }
  };

  const atualizarLupa = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setLupaPosicao({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const abrirDetalhes = (id: number) => {
    const prod = PRODUTOS_DATABASE.find((p) => p.id === id);
    setProdutoSelecionadoId(id);
    if (prod) {
      setCorSelecionada(prod.cores?.[0] || "Cinza");
      setImagemExibida(
        prod.categoria === "Camas"
          ? FOTOS_CAMA_POR_COR[prod.cores?.[0] || "Cinza"] || prod.imagemPadrao
          : prod.imagemPadrao,
      );
      setQuantidade(1);
      setIncluirCabeceira(false);
      setIncluirColchao(false);
      setTamanhoSelecionado("Casal");
      setTipoSelecionado("Base e encosto");
    }
  };

  const adicionarFavorito = (id: number) => {
    setFavoritosComPersistencia((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const adicionarCarrinho = () => {
    if (!produtoAtual) return;
    const novoItem: CarrinhoItem = {
      id: produtoAtual.id,
      quantidade,
      preco:
        produtoAtual.categoria === "Camas"
          ? calcularPrecoCama()
          : parsePrecoProduto(Number(produtoAtual.precoMinimo)),
      tamanho: produtoAtual.categoria === "Camas" ? tamanhoSelecionado : "",
      cor: corSelecionada,
      tipo: produtoAtual.categoria === "Camas" ? tipoSelecionado : "",
    };
    setCarrinhoComPersistencia((prev) => {
      const isMesmoItem = (item: CarrinhoItem) =>
        item.id === novoItem.id &&
        item.preco === novoItem.preco &&
        item.tamanho === novoItem.tamanho &&
        item.cor === novoItem.cor &&
        item.tipo === novoItem.tipo;
      const existente = prev.find(isMesmoItem);
      if (existente) {
        return prev.map((item) =>
          isMesmoItem(item)
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item,
        );
      }
      return [...prev, novoItem];
    });
    setQuantidade(1);
  };

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  const removerDoCarrinho = (itemRemover: CarrinhoItem) => {
    const itemKey = getCarrinhoItemKey(itemRemover);
    setCarrinhoComPersistencia((prev) =>
      prev.filter((item) => getCarrinhoItemKey(item) !== itemKey),
    );
  };

  const whatsappMensagemGeral = encodeURIComponent(
    "Olá SweetLar,\n\nGostaria de receber um orçamento.",
  );
  const whatsappMensagem = produtoAtual
    ? encodeURIComponent(
        `Olá SweetLar,\n\nProduto: ${produtoAtual.nome}\nPreço: ${getPrecoProduto()}\nCor: ${corSelecionada}\nQuantidade: ${quantidade}\n\nGostaria de receber um orçamento.`,
      )
    : "";

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="cursor-pointer text-2xl font-black tracking-tight text-zinc-900"
            onClick={() => {
              setProdutoSelecionadoId(null);
              setCategoriaAtiva("Todos");
              setBuscaTermo("");
            }}
          >
            <span className="text-sky-500">Sweet</span>Lar
          </button>

          <div className="hidden max-w-xl flex-1 px-4 md:flex">
            <input
              value={buscaTermo}
              onChange={(e) => setBuscaTermo(e.target.value)}
              placeholder="Pesquisar produtos..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="hidden items-center gap-2 lg:flex">
              {REDES_SOCIAIS.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={rede.nome}
                  className="text-zinc-400 transition-colors hover:text-zinc-900"
                >
                  {rede.icon}
                </a>
              ))}
            </div>
            <div className="hidden h-5 w-px bg-zinc-200 lg:block" />
            <div className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 sm:flex">
              <span>♡</span>
              <span>{favoritos.length}</span>
            </div>
            <div className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 sm:flex">
              <span>🛒</span>
              <span>{carrinho.length}</span>
            </div>
          </div>
        </div>
      </header>

      {produtoAtual ? (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-400">
            <button
              type="button"
              className="cursor-pointer hover:text-zinc-600"
              onClick={() => setProdutoSelecionadoId(null)}
            >
              Início
            </button>
            <span>/</span>
            <span className="font-medium text-zinc-600">
              {produtoAtual.nome}
            </span>
          </nav>

          <div className="grid grid-cols-1 items-start gap-12 rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm lg:grid-cols-2 sm:p-10">
            <div
              onMouseEnter={() => setLupaAtiva(true)}
              onMouseLeave={() => setLupaAtiva(false)}
              onMouseMove={atualizarLupa}
              className="relative flex min-h-87.5 cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 p-6 lg:min-h-112.5"
            >
              <Image
                src={imagemExibida || produtoAtual.imagemPadrao}
                alt={produtoAtual.nome}
                width={900}
                height={900}
                className="max-h-112.5 rounded-xl object-contain transition-all duration-300"
              />
              {lupaAtiva && (
                <div
                  className="pointer-events-none absolute hidden h-40 w-40 rounded-full border-4 border-white shadow-2xl ring-1 ring-zinc-900/10 md:block"
                  style={{
                    left: `${lupaPosicao.x}%`,
                    top: `${lupaPosicao.y}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundImage: `url("${imagemExibida || produtoAtual.imagemPadrao}")`,
                    backgroundPosition: `${lupaPosicao.x}% ${lupaPosicao.y}%`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "260%",
                  }}
                />
              )}
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-sky-600">
                  {produtoAtual.categoria}
                </span>
                <h1 className="mt-3 mb-2 text-3xl font-extrabold text-zinc-950">
                  {produtoAtual.nome}
                </h1>
                <p className="mb-4 text-3xl font-black text-zinc-900">
                  {getPrecoProduto()}
                </p>
                <p className="mb-8 text-zinc-500">{produtoAtual.descricao}</p>

                <div className="space-y-6 border-t border-zinc-100 pt-6">
                  {produtoAtual.cores?.length > 0 && (
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Cor do Estofo
                      </label>
                      <select
                        value={corSelecionada}
                        onChange={(e) => tratarMudancaDeCor(e.target.value)}
                        className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-3.5 text-sm text-zinc-700 shadow-sm focus:border-sky-500 focus:outline-none"
                      >
                        {produtoAtual.cores.map((cor) => (
                          <option key={cor} value={cor}>
                            {cor}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {produtoAtual.categoria === "Camas" && (
                    <>
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Tamanho do Colchão
                        </label>
                        <select
                          value={tamanhoSelecionado}
                          onChange={(e) =>
                            setTamanhoSelecionado(
                              e.target
                                .value as (typeof TABELA_PRECOS_CAMAS.tamanhos)[number],
                            )
                          }
                          className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-3.5 text-sm text-zinc-700 shadow-sm focus:border-sky-500 focus:outline-none"
                        >
                          {TABELA_PRECOS_CAMAS.tamanhos.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Estrutura de Fabrico
                        </label>
                        <select
                          value={tipoSelecionado}
                          onChange={(e) =>
                            setTipoSelecionado(
                              e.target
                                .value as keyof typeof TABELA_PRECOS_CAMAS.componentes,
                            )
                          }
                          className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-3.5 text-sm text-zinc-700 shadow-sm focus:border-sky-500 focus:outline-none"
                        >
                          <option value="Base e encosto">
                            Estrutura Completa (Base e encosto)
                          </option>
                          <option value="Base somente">
                            Apenas a Base Inferior
                          </option>
                          <option value="Encosto somente">
                            Apenas o Encosto de Parede
                          </option>
                        </select>
                      </div>

                      <div className="max-w-md space-y-3 pt-2">
                        <label className="flex cursor-pointer select-none items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-sm text-zinc-600">
                          <input
                            type="checkbox"
                            checked={incluirCabeceira}
                            onChange={(e) =>
                              setIncluirCabeceira(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-zinc-300 text-sky-500"
                          />
                          <span className="font-medium">
                            Adicionar Kit de Cabeceiras (+7.000,00 MT)
                          </span>
                        </label>
                        <label className="flex cursor-pointer select-none items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-sm text-zinc-600">
                          <input
                            type="checkbox"
                            checked={incluirColchao}
                            onChange={(e) =>
                              setIncluirColchao(e.target.checked)
                            }
                            className="h-4 w-4 rounded border-zinc-300 text-sky-500"
                          />
                          <span className="font-medium">
                            Adicionar Colchão Medicinal (+
                            {TABELA_PRECOS_CAMAS.colchoes[
                              tamanhoSelecionado
                            ].toLocaleString("pt-BR")}{" "}
                            MT)
                          </span>
                        </label>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-zinc-100 pt-6 sm:flex-row sm:items-center">
                  <div className="flex h-12 items-center justify-between rounded-xl border border-zinc-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                      className="px-4 font-bold text-zinc-500"
                    >
                      -
                    </button>
                    <span className="px-6 text-sm font-bold text-zinc-800">
                      {quantidade}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantidade((q) => q + 1)}
                      className="px-4 font-bold text-zinc-500"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={adicionarCarrinho}
                    className="flex-1 rounded-xl bg-zinc-900 px-8 text-sm font-semibold text-white shadow-md transition-all hover:bg-zinc-800"
                  >
                    Adicionar ao carrinho
                  </button>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsappMensagem}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 flex-1 items-center justify-center rounded-xl bg-sky-500 px-8 text-sm font-semibold text-white shadow-md transition-all hover:bg-sky-600"
                  >
                    Pedir no WhatsApp
                  </a>
                </div>

                <div className="mt-6 space-y-1 text-sm text-zinc-500">
                  <p>
                    <strong>Referência:</strong> {produtoAtual.ref}
                  </p>
                  <p>
                    <strong>Medidas:</strong> {produtoAtual.medidas}
                  </p>
                  <p>
                    <strong>Material:</strong> {produtoAtual.material}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {produtoAtual.imagensExtras?.length ? (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {produtoAtual.imagensExtras.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${produtoAtual.nome} extra ${i + 1}`}
                  width={500}
                  height={350}
                  className="h-36 w-full rounded-2xl border border-zinc-100 bg-white object-cover"
                />
              ))}
            </div>
          ) : null}

          {produtosRelacionados.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-black text-zinc-900">
                Produtos relacionados
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {produtosRelacionados.map((item) => (
                  <CardProduto
                    key={item.id}
                    item={item}
                    favoritos={favoritos}
                    onAbrirDetalhes={abrirDetalhes}
                    onToggleFavorito={adicionarFavorito}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <PaginaHome
          buscaTermo={buscaTermo}
          setBuscaTermo={setBuscaTermo}
          categoriaAtiva={categoriaAtiva}
          setCategoriaAtiva={setCategoriaAtiva}
          setProdutoSelecionadoId={setProdutoSelecionadoId}
          produtosFiltrados={produtosFiltrados}
          produtosMaisVendidos={produtosMaisVendidos}
          produtosNovidades={produtosNovidades}
          favoritos={favoritos}
          onAbrirDetalhes={abrirDetalhes}
          onToggleFavorito={adicionarFavorito}
          whatsappMensagemGeral={whatsappMensagemGeral}
        />
      )}

      <aside className="fixed bottom-4 right-4 z-50 w-[92vw] max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold text-zinc-900">Carrinho</h3>
          <span className="text-xs text-zinc-500">{carrinho.length} itens</span>
        </div>
        <div className="max-h-36 space-y-2 overflow-auto pr-1">
          {carrinho.length === 0 ? (
            <p className="text-sm text-zinc-500">Ainda sem itens.</p>
          ) : (
            carrinho.map((item) => {
              const prod = PRODUTOS_DATABASE.find((p) => p.id === item.id);
              return (
                <div
                  key={getCarrinhoItemKey(item)}
                  className="flex items-start justify-between gap-3 border-b border-zinc-100 pb-2 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate pr-2">{prod?.nome}</p>
                    <p className="text-xs text-zinc-400">
                      {[item.cor, item.tamanho, item.tipo]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-zinc-500">x{item.quantidade}</span>
                    <p className="text-xs font-semibold text-zinc-700">
                      {item.preco.toLocaleString("pt-BR")} MT
                    </p>
                    <button
                      type="button"
                      onClick={() => removerDoCarrinho(item)}
                      className="mt-1 text-[11px] font-semibold text-red-500 hover:text-red-600"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="mt-3 flex items-center justify-between text-sm font-bold">
          <span>Total</span>
          <span>{totalCarrinho.toLocaleString("pt-BR")} MT</span>
        </div>
      </aside>

      <footer className="mt-16 border-t border-zinc-100 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <p className="mb-3 text-2xl font-black tracking-tight">
                <span className="text-sky-400">Sweet</span>Lar
              </p>
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-zinc-400">
                Móveis sob medida de alto padrão para transformar a sua casa.
                Fabricamos e entregamos em todo Moçambique.
              </p>
              <div className="flex gap-3">
                {REDES_SOCIAIS.map((rede) => (
                  <a
                    key={rede.nome}
                    href={rede.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={rede.nome}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 transition-all hover:bg-sky-500 hover:text-white"
                  >
                    {rede.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                Produtos
              </h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                {["Camas", "Sofás", "Cabeceiras", "Cadeiras"].map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      className="transition-colors hover:text-white"
                      onClick={() =>
                        document
                          .getElementById("grid-produtos")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                Contacto
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">📍</span>
                  <span>Maputo, Moçambique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">📱</span>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMERO}`}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    +258 84 379 2635
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">⏰</span>
                  <span>Seg – Sáb, 8h – 18h</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-zinc-600 sm:flex-row sm:px-6 lg:px-8">
            <span>
              © 2026 SoluçõesMoçambique. Todos os direitos reservados.
            </span>
            <div className="flex gap-4">
              {REDES_SOCIAIS.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-zinc-300"
                >
                  {rede.nome}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
