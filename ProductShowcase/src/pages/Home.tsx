import { useEffect, useState } from 'react';
import api from '../services/api';
import type { PokemonListResponse, PokemonSimple } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonSimple[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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
   //filtro para buscar um pokemon
  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

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
       
        </header>
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all"
              placeholder="Buscar Pokémon por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredPokemons.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-xl">Nenhum Pokémon encontrado com o nome "{search}".</p>
            <button 
              onClick={() => setSearch('')}
              className="mt-4 text-blue-600 font-semibold hover:underline"
            >
              Limpar busca
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredPokemons.map((poke) => (
            <PokemonCard key={poke.name} pokemon={poke} />
          ))}
        </div>

      </div>
    </div>
  );
}