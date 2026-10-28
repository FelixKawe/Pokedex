import Link from "next/link";

export default function PokemonCard({ nome, id, imagem }) {
  return (
    <Link href={`/pokemon/${nome}`}>
      <article className="pokemon-card">
      <img src={imagem} alt={`Pokémon ${nome}`} />
       
      <p>#{String(id).padStart(3, "0")}</p>
      <h2>{nome}</h2>
      </article>
      </Link>
  );
}