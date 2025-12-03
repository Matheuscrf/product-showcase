//Criar contrato de interface tentar resolver problema com url da img
export interface PokemonSimple {
  name: string;
  //tentar usar a url pra puxar o id?
  url: string;
}
//armazenei as resposta da outra interface em results
export interface PokemonListResponse {
  results: PokemonSimple[];
}

export interface PokemonDetails {
  id: number;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  //talvez precise resolver o problema de quando tiver dois tipos!
  types: Array<{
    type: {
      name: string;
    };
  }>;
}
