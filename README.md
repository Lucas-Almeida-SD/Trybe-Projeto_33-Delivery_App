# Projeto Delivery App

Esse projeto foi realizado para exercitar o que foi aprendido no Módulo de Back End do curso da [Trybe](https://www.betrybe.com/), ou seja, todos os assuntos abordados durante o módulo, como `Docker`, `MySQL`, `NodeJs`, `arquitetura de software MSC`, `ORM Sequelize`, `autenticação com JWT`, `testes de integração`, `TypeScript`, `Programação Orientada a Objeto (POO)` e `princípios SOLID`.
Todo projeto foi desenvolvido em equipe, no qual meu colegas de projeto foram:

- [Ítalo Lima](https://github.com/Italo9)
- [Kleverson Eller](https://github.com/KleversonEller)
- [Raphael Ramos](https://github.com/raphaelramos22)

O projeto é um aplicação `fullstack` que consiste em um `app de delivery` para uma distribuidora de bebidas.

A parte do `Back-end` é baseada em uma __REST API__ capaz de realizar operações _CRUD_, no qual é possível criar, ler, atualizar e deletar dados de vendas, usuários e produtos.

A parte de `Front-end` é baseada em uma `Single Page Aplication`, composta de 4 fluxos:

- Fluxo comum - composto pelas páginas de __login__ e __cadastro__;

- Fluxo do Cliente: composto pelas páginas de __produtos__, __checkout__, __pedidos__ e __detalhes do pedido__;

- Fluxo do Vendedor: composto pelas páginas de __pedidos__ e __detalhes do pedido__;

- Fluco da Administrador: composto pela página de __usuários__.

## Tecnologias

Back-end

- Node.js

- Express

- JavaScript

- Sequelize

- joi

- JWT

- md5

- Mocha

- Chai

- Sinon

- MySQL

Front-end

- React

- JavaScript

- Tailwind

## Como executar

Recomendações:
- Node v16+

___

Será necessário possuir o SGBD MySQL instalado em sua máquina.

___

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/Trybe-Projeto_33-Delivery_App.git
$ cd Trybe-Projeto_33-Delivery_App
```

___

Para iniciar o `back-end`, execute os comandos abaixo em uma aba do terminal:
```bash
# Instala as dependências e inicia o back-end
$ cd back-end && npm install && npm run db:reset && npm start
```

A __API__ estará disponível na porta `3001` 

___

Para iniciar o `front-end`, execute os comandos abaixo em uma aba do terminal:
```bash
# Instala as dependências e inicia o front-end
$ cd front-end && npm install && npm start
```

___

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)