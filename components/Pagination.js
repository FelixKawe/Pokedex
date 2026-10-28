
"use client";

import { useRouter } from "next/navigation";

export default function Pagination({
  pagina,
  totalPaginas,
}) {
  const router = useRouter();

  function mudarPagina(novaPagina) {
    if (novaPagina < 1 || novaPagina > totalPaginas) {
      return;
    }

    router.push(`/pokemon?pagina=${novaPagina}`);
  }

  return (
    <nav
      className="pagination"
      aria-label="Paginação dos Pokémon"
    >
      <button
        type="button"
        onClick={() => mudarPagina(pagina - 1)}
        disabled={pagina === 1}
      >
        Anterior
      </button>

      <span>
        Página {pagina} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={() => mudarPagina(pagina + 1)}
        disabled={pagina === totalPaginas}
      >
        Próxima
      </button>
    </nav>
  );
}
