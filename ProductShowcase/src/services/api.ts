import axios from "axios";

//instancia axios
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

//extrair ID
export const getPokemonId = (url: string):string => {
    const parts = url.split('/');
    return parts[parts.length - 2] //penultimo item?
}
//coletar a img sem precisar fazer outra req
export const getPokemonImage = (id:string): string =>{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
export default api;