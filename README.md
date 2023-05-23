## Descrição

Os requisitos funcionais e não funcionais da aplicação podem ser encontrados em https://github.com/trakto/desafio_backend.

## Instalação das dependências

Pelo terminal, execute o seguinte comando na raiz do projeto.

```bash
$ npm install
```

## Executando o app

Primeiramente, garanta que existe uma instância do MongoDb escutando requisições na porta 27017 ou modifique a variável connectionString do arquivo ./src/database.module.ts para o correspondente da sua instância. Depois, execute um comandos a seguir.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Teste

Com a aplicação em execução, acesse o endereço http://localhost:3000/api. Clique no botão Try it out correspondente ao endpoint /image/save, preencha o body da requisição conforme especificado abaixo e clique no botão Execute.

```bash
# Padrão de envio da requisição
{
    "image": URL
    "compress": number
}

# Exemplo
{
    "image": "https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg",
    "compress": 0.9
}
```