"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import { PRODUTOS_DATABASE, type Produto } from "@/data/produtos";

const FOTOS_CAMA_POR_COR: Record<string, string> = {
  Branco: "/cama-branco.png",
  Cinza: "/cama-cinza.png",
  Preto: "/cama-preto.png",
};

const TABELA_PRECOS_CAMAS = {
  tamanhos: ["Casal", "Queen", "King normal", "King size"],
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
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    titulo: "Sala Moderna",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=600&auto=format&fit=crop",
    titulo: "Quarto Master",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop",
    titulo: "Sala de Jantar",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
    titulo: "Cozinha Integrada",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=600&auto=format&fit=crop",
    titulo: "Quarto Infantil",
  },
  {
    imagem:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
    titulo: "Sala Luxo",
  },
];

const WHATSAPP_NUMERO = "258843792635";

type CarrinhoItem = {
  id: number;
  quantidade: number;
  preco: number;
  tamanho: string;
  cor: string;
  tipo: string;
};

const parsePrecoProduto = (preco: string) =>
  Number(preco.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, ""));

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
          typeof cartItem.quantidade === "number" ? cartItem.quantidade : 1,
        preco:
          typeof cartItem.preco === "number"
            ? cartItem.preco
            : parsePrecoProduto(produto.precoMinimo),
        tamanho: cartItem.tamanho ?? "",
        cor: cartItem.cor ?? "",
        tipo: cartItem.tipo ?? "",
      },
    ];
  });
};

const getCarrinhoItemKey = (item: CarrinhoItem) =>
  `${item.id}-${item.preco}-${item.tamanho}-${item.cor}-${item.tipo}`;

export default function Home() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<
    number | null
  >(null);
  const [buscaTermo, setBuscaTermo] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("Casal");
  const [tipoSelecionado, setTipoSelecionado] = useState("Base e encosto");
  const [corSelecionada, setCorSelecionada] = useState("Cinza");
  const [incluirCabeceira, setIncluirCabeceira] = useState(false);
  const [incluirColchao, setIncluirColchao] = useState(false);
  const [imagemExibida, setImagemExibida] = useState("");
  const [lupaAtiva, setLupaAtiva] = useState(false);
  const [lupaPosicao, setLupaPosicao] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const saved = localStorage.getItem("sweetlar-cart");

    if (saved) {
      try {
        setCarrinho(normalizarCarrinhoSalvo(JSON.parse(saved)));
      } catch {
        setCarrinho([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sweetlar-cart", JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    const saved = localStorage.getItem("sweetlar-favorites");

    if (saved) {
      setFavoritos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sweetlar-favorites", JSON.stringify(favoritos));
  }, [favoritos]);

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
    const tabelaComponente = (TABELA_PRECOS_CAMAS.componentes as any)[
      tipoSelecionado
    ];
    if (tabelaComponente) total += tabelaComponente[tamanhoSelecionado] || 0;
    if (incluirCabeceira) total += TABELA_PRECOS_CAMAS.cabeceiras;
    if (incluirColchao)
      total += (TABELA_PRECOS_CAMAS.colchoes as any)[tamanhoSelecionado] || 0;
    return total;
  };

  const getPrecoProduto = () => {
    if (!produtoAtual) return "";
    if (produtoAtual.categoria === "Camas") {
      return `${calcularPrecoCama().toLocaleString("pt-BR", { minimumFractionDigits: 2 })} MT`;
    }
    return produtoAtual.precoMinimo;
  };

  const tratarMudancaDeCor = (novaCor: string) => {
    setCorSelecionada(novaCor);
    if (produtoAtual?.categoria === "Camas") {
      const foto = FOTOS_CAMA_POR_COR[novaCor];
      if (foto) setImagemExibida(foto);
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
      setCorSelecionada("Cinza");
      setImagemExibida(prod.imagemPadrao);
      setQuantidade(1);
      setIncluirCabeceira(false);
      setIncluirColchao(false);
      setTamanhoSelecionado("Casal");
      setTipoSelecionado("Base e encosto");
    }
  };

  const adicionarFavorito = (id: number) => {
    setFavoritos((prev) =>
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
          : parsePrecoProduto(produtoAtual.precoMinimo),
      tamanho: produtoAtual.categoria === "Camas" ? tamanhoSelecionado : "",
      cor: corSelecionada,
      tipo: produtoAtual.categoria === "Camas" ? tipoSelecionado : "",
    };

    setCarrinho((prev) => {
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

  const totalCarrinho = carrinho.reduce((total, item) => {
    return total + item.preco * item.quantidade;
  }, 0);

  const removerDoCarrinho = (itemRemover: CarrinhoItem) => {
    const itemKey = getCarrinhoItemKey(itemRemover);
    setCarrinho((prev) =>
      prev.filter((item) => getCarrinhoItemKey(item) !== itemKey),
    );
  };

  const whatsappMensagemGeral = encodeURIComponent(
    "Olá SweetLar,\n\nGostaria de receber um orçamento.",
  );

  const whatsappMensagem = produtoAtual
    ? encodeURIComponent(
        `Olá SweetLar,

Produto: ${produtoAtual.nome}
Preço: ${getPrecoProduto()}
Cor: ${corSelecionada}
Quantidade: ${quantidade}

Gostaria de receber um orçamento.`,
      )
    : "";

  const CardProduto = ({ item }: { item: Produto }) => (
    <div
      onClick={() => abrirDetalhes(item.id)}
      className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition-all group"
    >
      <div className="relative h-60 w-full rounded-xl bg-zinc-50 overflow-hidden mb-4">
        <Image
          src={item.imagemPadrao}
          alt={item.nome}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            adicionarFavorito(item.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${
            favoritos.includes(item.id) ? "text-red-500" : "text-zinc-400"
          }`}
        >
          ❤️
        </button>
        {item.tag && (
          <span className="absolute top-2 left-2 bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {item.tag}
          </span>
        )}
      </div>

      <div className="flex justify-between items-start gap-3">
        <div>
          <span className="text-[10px] font-bold text-sky-600 uppercase">
            {item.categoria}
          </span>
          <h3 className="font-bold text-zinc-900 text-base mt-0.5 line-clamp-2">
            {item.nome}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-zinc-500">⭐ {item.nota}</span>
            <span className="text-[10px] text-zinc-400">
              ({item.avaliacoes})
            </span>
          </div>
        </div>
        <span className="text-zinc-900 font-extrabold text-sm whitespace-nowrap">
          {item.precoMinimo}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            abrirDetalhes(item.id);
          }}
          className="flex-1 bg-zinc-900 text-white text-sm py-2.5 rounded-xl hover:bg-zinc-800 transition-all"
        >
          Ver detalhes
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            adicionarFavorito(item.id);
          }}
          className="px-3 py-2.5 rounded-xl border border-zinc-200 text-sm hover:border-sky-500"
        >
          {favoritos.includes(item.id) ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );

  const MenuSecoes = () => (
    <div className="flex flex-wrap gap-3 mb-10">
      {["Todos", "Camas", "Sofás", "Cabeceiras", "Cadeiras"].map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setCategoriaAtiva(cat);
            setProdutoSelecionadoId(null);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            categoriaAtiva === cat
              ? "bg-sky-500 text-white"
              : "bg-white text-zinc-600 border border-zinc-200 hover:border-sky-500"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  const PaginaHome = () => (
    <>
      <section className="relative bg-zinc-950 text-white min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <span className="inline-block mb-4 text-xs uppercase tracking-[0.3em] text-sky-300">
            SweetLar Moçambique
          </span>
          <h1 className="text-4xl sm:text-6xl font-black max-w-2xl mb-4">
            Móveis sob medida de alto padrão.
          </h1>
          <p className="text-zinc-400 max-w-md mb-8">
            Escolha a cor, o tamanho ideal e personalize o seu conforto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("grid-produtos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-sky-500 text-white font-medium py-3 px-6 rounded-xl text-sm"
            >
              Explorar Modelos
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsappMensagemGeral}`}
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 border border-white/20 text-white font-medium py-3 px-6 rounded-xl text-sm backdrop-blur-sm"
            >
              Orçamento no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-zinc-900 mb-12">
            Por que escolher a SweetLar?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {POR_QUE.map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-zinc-900 mb-2">{item.titulo}</h3>
                <p className="text-sm text-zinc-500">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900">Produtos</h2>
              <p className="text-zinc-500 mt-1">
                Escolha por categoria, veja os detalhes e encomende já.
              </p>
            </div>
            <input
              value={buscaTermo}
              onChange={(e) => setBuscaTermo(e.target.value)}
              placeholder="Pesquisar produto..."
              className="w-full sm:w-96 px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <MenuSecoes />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map((item) => (
              <CardProduto key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {produtosMaisVendidos.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-zinc-900 mb-8">
              Mais Vendidos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {produtosMaisVendidos.map((item) => (
                <CardProduto key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {produtosNovidades.length > 0 && (
        <section className="py-16 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-zinc-900 mb-8">
              Novidades
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {produtosNovidades.map((item) => (
                <CardProduto key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-zinc-900 mb-4">
            Galeria de Projetos Realizados
          </h2>
          <p className="text-zinc-500 text-center mb-12">
            Ambientes reais transformados com os nossos móveis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALERIA_PROJETOS.map((projeto, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden group"
              >
                <img
                  src={projeto.imagem}
                  alt={projeto.titulo}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-zinc-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {projeto.titulo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-4">
            O que os nossos clientes dizem
          </h2>
          <p className="text-zinc-400 text-center mb-12">
            Depoimentos de clientes satisfeitos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEPOIMENTOS.map((dep, i) => (
              <div key={i} className="bg-zinc-900 p-6 rounded-2xl">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: dep.nota }).map((_, j) => (
                    <span key={j}>⭐</span>
                  ))}
                </div>
                <h4 className="font-bold mb-2">{dep.nome}</h4>
                <p className="text-zinc-300">{dep.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-zinc-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-zinc-500 text-center mb-12">
            Respostas para as dúvidas mais comuns.
          </p>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div
                key={i}
                className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100"
              >
                <h3 className="font-bold text-zinc-900 mb-2">{faq.pergunta}</h3>
                <p className="text-zinc-500">{faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-zinc-900 mb-8">
            Contacte-nos
          </h2>

          <form className="space-y-4">
            <input placeholder="Nome" className="w-full border p-3 rounded" />

            <input
              placeholder="Telefone"
              className="w-full border p-3 rounded"
            />

            <textarea
              placeholder="Mensagem"
              className="w-full border p-3 rounded"
            />

            <button className="bg-sky-500 text-white px-6 py-3 rounded">
              Enviar
            </button>
          </form>
        </div>
      </section>

      <section className="py-20 bg-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">
            Pronto para transformar sua casa?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Solicite orçamento no WhatsApp e receba atendimento personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsappMensagemGeral}`}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-sky-600 font-bold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all"
            >
              📱 Solicitar Orçamento no WhatsApp
            </a>
            <button
              onClick={() =>
                document
                  .getElementById("grid-produtos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-sky-600 border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-sky-700 transition-all"
            >
              🛒 Ver Produtos
            </button>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-800 font-sans antialiased">
      <header className="border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div
            className="text-2xl font-black tracking-tight text-zinc-900 cursor-pointer"
            onClick={() => {
              setProdutoSelecionadoId(null);
              setCategoriaAtiva("Todos");
              setBuscaTermo("");
            }}
          >
            <span className="text-sky-500">Sweet</span>Lar
          </div>

          <div className="hidden md:flex flex-1 max-w-xl px-4">
            <input
              value={buscaTermo}
              onChange={(e) => setBuscaTermo(e.target.value)}
              placeholder="Pesquisar produtos..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-white">
              <span>♡</span>
              <span>{favoritos.length}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-white">
              <span>🛒</span>
              <span>{carrinho.length}</span>
            </div>
          </div>
        </div>
      </header>

      {produtoAtual ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-xs text-zinc-400 mb-8 flex items-center gap-2 tracking-wide uppercase">
            <span
              className="cursor-pointer hover:text-zinc-600"
              onClick={() => setProdutoSelecionadoId(null)}
            >
              Início
            </span>
            <span>/</span>
            <span className="text-zinc-600 font-medium">
              {produtoAtual.nome}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white p-6 sm:p-10 rounded-3xl border border-zinc-100 shadow-sm">
            <div
              onMouseEnter={() => setLupaAtiva(true)}
              onMouseLeave={() => setLupaAtiva(false)}
              onMouseMove={atualizarLupa}
              className="relative bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex items-center justify-center min-h-[350px] lg:min-h-[450px] overflow-hidden cursor-zoom-in"
            >
              <img
                src={imagemExibida || produtoAtual.imagemPadrao}
                alt={produtoAtual.nome}
                className="rounded-xl max-h-[450px] object-contain transition-all duration-300"
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
                <span className="text-[11px] font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  {produtoAtual.categoria}
                </span>

                <h1 className="text-3xl font-extrabold text-zinc-950 mt-3 mb-2">
                  {produtoAtual.nome}
                </h1>

                <p className="text-3xl font-black text-zinc-900 mb-4">
                  {getPrecoProduto()}
                </p>

                <p className="text-zinc-500 mb-8">{produtoAtual.descricao}</p>

                <div className="space-y-6 border-t border-zinc-100 pt-6">
                  {produtoAtual.cores?.length > 0 && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                        Cor do Estofo
                      </label>
                      <select
                        value={corSelecionada}
                        onChange={(e) => tratarMudancaDeCor(e.target.value)}
                        className="w-full max-w-md p-3.5 border border-zinc-200 rounded-xl bg-white text-sm focus:outline-none focus:border-sky-500 text-zinc-700 shadow-sm"
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
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Tamanho do Colchão
                        </label>
                        <select
                          value={tamanhoSelecionado}
                          onChange={(e) =>
                            setTamanhoSelecionado(e.target.value)
                          }
                          className="w-full max-w-md p-3.5 border border-zinc-200 rounded-xl bg-white text-sm focus:outline-none focus:border-sky-500 text-zinc-700 shadow-sm"
                        >
                          {TABELA_PRECOS_CAMAS.tamanhos.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Estrutura de Fabrico
                        </label>
                        <select
                          value={tipoSelecionado}
                          onChange={(e) => setTipoSelecionado(e.target.value)}
                          className="w-full max-w-md p-3.5 border border-zinc-200 rounded-xl bg-white text-sm focus:outline-none focus:border-sky-500 text-zinc-700 shadow-sm"
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

                      <div className="pt-2 space-y-3 max-w-md">
                        <label className="flex items-center gap-3 text-sm text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-100 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={incluirCabeceira}
                            onChange={(e) =>
                              setIncluirCabeceira(e.target.checked)
                            }
                            className="w-4 h-4 text-sky-500 rounded border-zinc-300"
                          />
                          <span className="font-medium">
                            Adicionar Kit de Cabeceiras (+7.000,00 MT)
                          </span>
                        </label>

                        <label className="flex items-center gap-3 text-sm text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-100 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={incluirColchao}
                            onChange={(e) =>
                              setIncluirColchao(e.target.checked)
                            }
                            className="w-4 h-4 text-sky-500 rounded border-zinc-300"
                          />
                          <span className="font-medium">
                            Adicionar Colchão Medicinal (+
                            {(TABELA_PRECOS_CAMAS.colchoes as any)[
                              tamanhoSelecionado
                            ].toLocaleString("pt-BR")}{" "}
                            MT)
                          </span>
                        </label>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 pt-6 border-t border-zinc-100">
                  <div className="flex items-center justify-between border border-zinc-200 rounded-xl bg-white h-12">
                    <button
                      onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                      className="px-4 text-zinc-500 font-bold"
                    >
                      -
                    </button>
                    <span className="px-6 text-sm font-bold text-zinc-800">
                      {quantidade}
                    </span>
                    <button
                      onClick={() => setQuantidade((q) => q + 1)}
                      className="px-4 text-zinc-500 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={adicionarCarrinho}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold h-12 px-8 rounded-xl text-sm transition-all shadow-md"
                  >
                    Adicionar ao carrinho
                  </button>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMERO}?text=${whatsappMensagem}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-semibold h-12 px-8 rounded-xl text-sm transition-all shadow-md flex items-center justify-center"
                  >
                    Pedir no WhatsApp
                  </a>
                </div>

                <div className="mt-6 text-sm text-zinc-500 space-y-1">
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
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {produtoAtual.imagensExtras.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${produtoAtual.nome} extra ${i + 1}`}
                  className="w-full h-36 object-cover rounded-2xl border border-zinc-100 bg-white"
                />
              ))}
            </div>
          ) : null}

          {produtosRelacionados.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-black text-zinc-900 mb-6">
                Produtos relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {produtosRelacionados.map((item) => (
                  <CardProduto key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <PaginaHome />
      )}

      <aside className="fixed bottom-4 right-4 z-50 w-[92vw] max-w-sm bg-white rounded-2xl border border-zinc-200 shadow-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-zinc-900">Carrinho</h3>
          <span className="text-xs text-zinc-500">{carrinho.length} itens</span>
        </div>
        <div className="space-y-2 max-h-36 overflow-auto pr-1">
          {carrinho.length === 0 ? (
            <p className="text-sm text-zinc-500">Ainda sem itens.</p>
          ) : (
            carrinho.map((item) => {
              const prod = PRODUTOS_DATABASE.find((p) => p.id === item.id);
              return (
                <div
                  key={getCarrinhoItemKey(item)}
                  className="flex items-start justify-between gap-3 text-sm border-b border-zinc-100 pb-2"
                >
                  <div className="min-w-0">
                    <p className="truncate pr-2">{prod?.nome}</p>
                    <p className="text-xs text-zinc-400">
                      {[item.cor, item.tamanho, item.tipo]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
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

      <footer className="border-t border-zinc-200 bg-white text-center py-8 text-xs text-zinc-400 mt-16">
        © 2026 Sweet Lar Moçambique.
      </footer>
    </div>
  );
}
