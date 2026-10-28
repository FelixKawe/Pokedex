import Link from "next/link";
import PokemonCard from "../components/PokemonCard";
import Buscapokemon from "@/components/Buscar";

export default function Home(){
  return (
    <main>
      <h1>Pokedex Do Momento</h1>
      <p>Explore o mundo dos Pokemon!</p>
      <Buscapokemon/>
    </main>
  );
}