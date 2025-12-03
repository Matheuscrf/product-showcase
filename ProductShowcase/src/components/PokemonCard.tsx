import { Link } from "react-router-dom";
import { getPokemonId, getPokemonImage } from "../services/api";
import type { PokemonSimple } from "../types/pokemon";

interface Props {
  pokemon: PokemonSimple;
}

export function PokemonCard({ pokemon }: Props) {
  const id = getPokemonId(pokemon.url);
  const image = getPokemonImage(id);

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer border border-transparent hover:border-blue-500"
    >
      <div className="bg-gray-100 rounded-full p-4 mb-2">
        <img
          src={image}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
          loading="lazy"
        />
      </div>
      <span className="capitalize font-bold text-gray-700 text-lg">
        {pokemon.name}
      </span>
      <span className="text-xs text-gray-400 font-mono mt-1">#{id}</span>
    </Link>
  );
}
