# Pokedéx - Desafio Frontend

## Seção 1: Instruções para rodar

O projeto foi desenvolvido utilizando **React (Vite)** com **Node v18+**.

### Variáveis de Ambiente
Não é necessário configurar variáveis de ambiente (`.env`) secretas, pois a PokeAPI é pública. A URL base já está configurada internamente no serviço de API.

### Instalação e Execução
1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Rodar o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará disponível em `http://localhost:5173`.

---

## Seção 2: Decisões de design

### Estrutura de Pastas
Optei por uma arquitetura focada em **separação de responsabilidades** e **escalabilidade**, evitando a "sopa de arquivos" na raiz:

* **`src/pages`**: Separa as visões principais (`Home` e `Details`), onde cada página gerencia seu próprio ciclo de vida de busca de dados.
* **`src/components`**: Componentes de UI "burros" e reutilizáveis (ex: `PokemonCard`), desacoplados da lógica de negócio.
* **`src/services`**: Centraliza a configuração do `axios` e helpers. Isso permite mudar a BaseURL em um único lugar se necessário.
* **`src/contexts`**: Escolhi usar a **Context API** para o gerenciamento do "Time Pokémon" para evitar *prop drilling* excessivo e manter o estado acessível globalmente.
* **`src/types`**: Interfaces TypeScript centralizadas para garantir tipagem forte e evitar `any`.

### Maior Dificuldade e Superação
A maior dificuldade técnica foi a configuração do **TailwindCSS**. Inicialmente, houve um conflito de versões (o ambiente tentou utilizar a v4 experimental via Vite, que gerou incompatibilidade com o PostCSS configurado).

**Como superei:** Realizei um *downgrade* manual para a versão estável (v3), limpei o cache do Vite e reconfigurei os arquivos `tailwind.config.cjs` e `postcss.config.cjs` para garantir que os estilos fossem processados corretamente pelo pipeline de build padrão.

### O que não tive tempo de fazer
Dentro do timebox, foquei na lógica robusta do gerenciamento de time (adicionar/remover/validar limites no Contexto), mas **não implementei a interface visual da lista do time** na tela Home (apenas o contador é exibido).

**Como eu faria:**
1.  Criaria um componente `TeamSidebar` ou `TeamModal`.
2.  Mapearia o array `team` do Contexto para exibir os sprites dos 6 Pokémons escolhidos.
3.  Adicionaria botões pequenos de "remover" diretamente nessa lista para facilitar a gestão.

---

## Seção 3: Link para Deploy (Bônus)

Não consegui fazer o deploy, tive conflitos com a main branch do projeto.

---

## Seção final: Recomendações

O desafio é muito bem estruturado para avaliar os fundamentos de React.

**Sugestão de melhoria:** Talvez adicionar um requisito explícito sobre paginação (Load More / Infinite Scroll) na listagem da Home, pois carregar 151 itens de uma vez é aceitável para a 1ª geração, mas não escalaria para todas as gerações de Pokémon.