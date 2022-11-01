# Wine - O maior clube de vinhos do mundo!

Bem vindo(a) ao resultado do teste técnico do candidato @RodrigoLimaJesus para empresa WINE.

## Para rodar a aplicação na sua máquina basta

1. Clonar o projeto para sua máquina

- `git clone git@github.com:RodrigoLimaJesus/wine-frontend-challenge.git`

2. Entrar no diretório da aplicação.

- `cd wine-frontend-challenge`

3. Instalar as dependências.

- `npm install`

4. Colocar o projeto para rodar.

- `npm run dev`

### Obs: Caso queira rodar o projeto simulando o ambiente de produção, basta seguir os passos de 1 à 3 acima, mas também

- Gerar uma build do seu projeto com: `npm run build`
- Iniciar sua aplicação com: `npm start`

## E os testes, como faz? Simples!

Nesse projeto foi usado `cypress` para lidar com nossos testes `e2e`, e para rodar eles é bem simples, olha só:

1. Precisamos garantir que nossa aplicação está rodando, por isso lembre de rodar o comando `npm run dev` ou `npm run build` + `npm start` para que nosso servidor seja iniciado.

2. Se quiser rodar os testes apenas no terminal, o que vai consumir menos do seu processador, pode contar com o comando: `npm run cy`

3. Caso deseje visualizar o caminho que o avaliador está tomando ao mexer na aplicação, basta usar o comando: `npm run cy:open`
