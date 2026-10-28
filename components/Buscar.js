"use client";
import { useState } from "react";
import { useEffect } from "react";
import PokemonCard from "./PokemonCard";

export default function Buscapokemon() {
    const [pokemon,setPokemon] = useState([]);
    
    useEffect(() => {
      async function Buscar() {
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon");
        const dados = await resposta.json();  
        setPokemon(dados.results);
        console.log(dados.results.map((p) => p.name));
      } 
      Buscar();
    },[]);
    return (
  <div className="pokemon-grid">
    {pokemon.map((p) => {
      const id = p.url.split("/").filter(Boolean).pop();

      const imagem =
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

      return (
        <PokemonCard
          key={p.name}
          nome={p.name}
          id={id}
          imagem={imagem}
        />
      );
    })}
  </div>
);
}   
    