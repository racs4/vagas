## Dev Notes

A maioria dos testes encontra-se no controller de usuários em `./src/users/users.controller.js`. O teste 5 encontra-se no arquivo `./src/common/middleware.js`.

Resolvi trocar a busca de nomes por ids, já que estes se auto incrementam e são únicos. Isso também deixa o código mais performático, já que não é necessário percorrer o array inteiro para encontrar um nome, podendo-se realizar uma busca binária que foi implementada neste código.

As rotas da aplicação são as seguintes:

- GET `/users` - Retorna todos os usuários
- GET `/users/:id` - Retorna um usuário específico
- POST `/users` - Cria um novo usuário, passe no body o `name` e o `job` do usuário.
  ```json
  {
    "name": "John Doe",
    "job": "Developer"
  }
  ```
- PUT `/users/:id` - Atualiza um usuário específico, precisa passar uma chave `author` no header da requisição com o id do usuário que está executando o comando. Passe no body um objeto com os campos que serão atualizados, como no exemplo abaixo (note que só precisa passar os campos que serão alterados):

  ```json
  {
    "name": "John Doe",
    "job": "Developer"
  }
  ```
- DELETE `/users/:id` - Deleta um usuário específico, precisa passar uma chave `author` no header da requisição com o id do usuário que está executando o comando.
- GET `/users/:id/access` - Retorna quantas vezes um usuário foi lido.
- PUT `/users/:id/permission` - Atualiza as permissões de um usuário, precisa passar um body com as novas permissões como no exemplo abaixo (note que só precisa passar as permissões que serão alteradas):

  ```json
  {
    "update": true,
    "erase": false
  }
  ```

# Este é um teste para desenvolvedores

# possui 5 testes

## Introdução

Este projeto possui um banco de dados fake em fakeData.js com apenas um registro.
A ideia é melhorar e o CRUD escrito nos 4 arquivos de teste abaixo.

Será a validada a forma de escrita de código.
Escreva códigos que humanos consigam entender.

Fique a vontade para fazer modificaçoes nos serviços, comentários em código, estrutura, mas seja objetivo.

## teste1.js

GET em /user

Possuimos neste arquivo um serviço que faz uma busca no banco fake e retorna um registro.
Este código funciona, mas é possivel melhorar.
Veja o que pode deixar ele melhor escrito e mais performatico.

## teste2.js

POST em /users, descubra a intenção dele e o corrija.

## teste3.js

Este procura um usuário e o deleta da base.
Retorne sucesso para o client caso realmente tenha sido excluido e deixe o código mais performatico.

## teste4.js

Atualiza os dados de um usuário especifico.

## teste5.js

Retorne quantas vezes determinado usuário foi lido no teste1.

## teste 6

Definina uma forma de criar permissão para o usuario, defina se o usuário pode deletar ou atualizar usuários. Crie um middleware para validar essas permissões e adicione no teste4 e teste3.
