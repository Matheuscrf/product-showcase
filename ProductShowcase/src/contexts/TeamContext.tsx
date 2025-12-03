import { createContext, useState, type ReactNode, useContext } from 'react';
import type { PokemonSimple } from '../types/pokemon';

interface TeamContextData {
  team: PokemonSimple[];
  addToTeam: (pokemon: PokemonSimple) => void;
  removeFromTeam: (pokemonId: string) => void;
  isFavorite: (pokemonId: string) => boolean; 
}
//deixar vazio
const TeamContext = createContext<TeamContextData>({} as TeamContextData);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [team, setTeam] = useState<PokemonSimple[]>([]);
//adicionar
  const addToTeam = (pokemon: PokemonSimple) => {
    if (team.length >= 6) {
      alert("Seu time já está cheio! (Máx: 6)");
      return;
    }
// não deixar o mesmo pokemon duas vezes(testar)
    const alreadyInTeam = team.find(p => p.name === pokemon.name);
    if (alreadyInTeam) {
      alert("Esse Pokémon já está no time!");
      return;
    }
    
    setTeam([...team, pokemon]);
  };
//remover
  const removeFromTeam = (pokemonName: string) => {
    const newTeam = team.filter(p => p.name !== pokemonName);
    setTeam(newTeam);
  };

  const isFavorite = (name: string) => {
    return team.some(p => p.name === name);
  };
  

  return (
    
    
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam, isFavorite }}>
      {children}
    </TeamContext.Provider>
  );
  
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTeam() {
  const context = useContext(TeamContext);
  return context;
}

