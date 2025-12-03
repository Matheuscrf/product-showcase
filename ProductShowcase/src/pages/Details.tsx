import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import type { PokemonDetails } from "../types/pokemon";

export function Details() {
  //puxando name da url
  const { name } = useParams<{ name: string }>();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //se estiver vazio
    if (!name) return;

    (async () => {
      try {
        const response = await api.get<PokemonDetails>(`/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar detalhes!");
      } finally {
        setLoading(false);
      }
    })();
  }, [name]); //atualizar quando o nome mudar

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="bg-blue-600 p-6 flex items-center justify-between">
          <Link to="/" className="text-white font-bold hover:underline text-sm">
            &larr; Voltar
          </Link>
          <span className="text-white font-mono font-bold text-xl">
            #{pokemon.id}
          </span>
        </div>
        <div className="flex justify-center -mt-12 relative z-10">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-48 h-48 object-contain bg-gray-100 rounded-full"
            />
          </div>
        </div>
        <div className="p-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 capitalize mb-4">
            {pokemon.name}
          </h1>
          <div className="flex justify-center gap-2 mb-8">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full font-semibold uppercase text-sm tracking-wide"
              >
                {type.name}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm uppercase font-bold tracking-wider">
                Altura
              </span>
              <span className="text-2xl font-bold text-gray-700">
                {pokemon.height / 10} m
              </span>
            </div>
            <div className="flex flex-col border-l border-gray-100">
              <span className="text-gray-400 text-sm uppercase font-bold tracking-wider">
                Peso
              </span>
              <span className="text-2xl font-bold text-gray-700">
                {pokemon.weight / 10} kg
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
