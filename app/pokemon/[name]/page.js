
export default async function PokemonDetalhes({ params }) {
    const { name } = await params;

    const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    if (!resposta.ok) {
        return <h1>Pokémon não encontrado.</h1>;
    }

    const pokemon = await resposta.json();

    return (
        <main>
            <a href="/pokemon">Voltar para a lista</a>
            <h1>{pokemon.name}</h1>

            <p>Número: #{pokemon.id}</p>

            <img
                src={pokemon.sprites.front_default}
                alt={`Pokémon ${pokemon.name}`}
            />

            <h2>Tipos</h2>
            {pokemon.types.map((item) => (
                <p key={item.type.name}>
                    {item.type.name}
                </p>
            ))}

            <h2>Habilidades</h2>
            {pokemon.abilities.map((item) => (
                <p key={item.ability.name}>
                    {item.ability.name}
                </p>
            ))}

            <h2>Medidas</h2>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>

            <h2>Atributos</h2>
            {pokemon.stats.map((item) => (
                <p key={item.stat.name}>
                    {item.stat.name}: {item.base_stat}
                </p>
            ))}


        </main>
    );
}
