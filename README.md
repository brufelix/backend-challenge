# Guia para Instalação do Docker e Docker Compose

Este [guia](https://docs.docker.com/get-started/get-docker) descreve como instalar o Docker e o Docker Compose no Ubuntu/Windows. Caso você já tenha o Docker e o Docker Compose instalados, por favor, desconsidere estas instruções.

## Passo 1: Executando o projeto com Docker

Primeiro, assegure-se de que seu sistema está atualizado com os pacotes do guia anterior. Abra o terminal e execute o seguinte comando:

```bash 
docker-compose up -d
```

## Executando o projeto sem a utilização do Docker

Dentro da pasta web, crie um arquivo chamado .env e copie para ele o conteúdo do arquivo .env.sample. Em seguida, instale as dependências necessárias. Certifique-se de que está utilizando a *versão 20 do Node.js*.

```bash 
yarn install
```
OU

```bash 
npm i
```

Depois da conclusão da instalação, execute:

```bash 
yarn run dev
```

OU 

```bash 
npm run dev
```