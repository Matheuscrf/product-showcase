import { useEffect, useState } from 'react';
import api from '../services/api';
import type { PokemonListResponse, PokemonSimple } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonSimple[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //limpeza e coletando erros
    (async () => {
      try {
        const response = await api.get<PokemonListResponse>('/pokemon?limit=151');
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Erro ao carregar pokémons", error);
        alert("Erro ao carregar a lista.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
// Efeito de carregamento
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      
      <div className="max-w-6xl mx-auto">
        
      
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
            Pokedéx
          </h1>
          <p className="text-gray-500 mt-2">
           Listando
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {pokemons.map((poke) => (
            <PokemonCard key={poke.name} pokemon={poke} />
          ))}
        </div>

      </div>
    </div>
  );
}