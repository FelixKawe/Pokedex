
import Link from "next/link";
import SearchPokemon from "../../components/SearchPokemon";
import Pagination from "../../components/Pagination";

const POR_PAGINA = 20;

async function buscarPokemon(pagina) {
  const offset = (pagina - 1) * POR_PAGINA;

  const resposta = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${POR_PAGINA}&offset=${offset}`
  );

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os Pokémon.");
  }

  const dados = await resposta.json();

  const pokemonDetalhados = await Promise.all(
    dados.results.map(async (pokemon) => {
      const respostaDetalhes = await fetch(pokemon.url);

      if (!respostaDetalhes.ok) {
        throw new Error("Não foi possível carregar os detalhes.");
      }

      return respostaDetalhes.json();
    })
  );

  return {
    pokemon: pokemonDetalhados,
    total: dados.count,
  };
}

export default async function ListaPokemon({ searchParams }) {
  const parametros = await searchParams;
  const numeroRecebido = Number(parametros?.pagina) || 1;
  const pagina = Math.max(1, Math.floor(numeroRecebido));

  let pokemon = [];
  let totalPaginas = 1;

  try {
    const dados = await buscarPokemon(pagina);

    totalPaginas = Math.max(
      1,
      Math.ceil(dados.total / POR_PAGINA)
    );

    if (pagina > totalPaginas) {
      return (
        <main className="pokemon-container">
          <h1>Pokédex</h1>
          <p>Essa página não existe.</p>
          <Link href="/pokemon?pagina=1">
            Voltar para a primeira página
          </Link>
        </main>
      );
    }

    pokemon = dados.pokemon;
  } catch {
    return (
      <main className="pokemon-container">
        <h1>Pokédex</h1>
        <p>Não foi possível carregar os Pokémon.</p>
        <Link href="/">Voltar ao início</Link>
      </main>
    );
  }

  return (
    <main className="pokemon-container">
      <h1>Pokédex</h1>
      <p>Explore os Pokémon.</p>

      <SearchPokemon />

      <div className="pokemon-grid">
        {pokemon.map((item) => (
          <Link
            key={item.id}
            href={`/pokemon/${item.name}`}
            className="pokemon-card"
          >
            <img
              src={item.sprites.front_default}
              alt={`Pokémon ${item.name}`}
              width="120"
              height="120"
            />

            <p>#{String(item.id).padStart(3, "0")}</p>
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>

      <Pagination
        pagina={pagina}
        totalPaginas={totalPaginas}
      />
    </main>
  );
}
