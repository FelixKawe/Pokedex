
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPokemon() {
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  function pesquisar(evento) {
    evento.preventDefault();

    const nomePesquisado = nome.trim().toLowerCase();

    if (!nomePesquisado) {
      setErro("Digite o nome de um Pokémon.");
      return;
    }

    setErro("");
    router.push(`/pokemon/${encodeURIComponent(nomePesquisado)}`);
  }

  return (
    <section className="pokemon-search">
      <form onSubmit={pesquisar}>
        <input
          type="text"
          value={nome}
          onChange={(evento) => {
            setNome(evento.target.value);
            setErro("");
          }}
          placeholder="Digite o nome de um Pokémon..."
          aria-label="Nome do Pokémon"
        />

        <button type="submit">Pesquisar</button>
      </form>

      {erro && <p role="alert">{erro}</p>}
    </section>
  );
}
