# Guia para Instalação do Docker e Docker Compose

Este [guia](https://docs.docker.com/get-started/get-docker) descreve como instalar o Docker e o Docker Compose no Ubuntu/Windows. Se você já possui o Docker e o Docker Compose instalados, pode ignorar estas instruções.

## Passo 1: Preparando o Ambiente

Antes de iniciar o Docker Compose, é necessário configurar um arquivo de variáveis de ambiente. Siga os passos abaixo para criar e configurar o arquivo .env:

1. Na raiz do projeto, crie um arquivo chamado .env.
2. Copie o conteúdo do arquivo .env.sample e cole no arquivo .env.

## Passo 2: Executando o Projeto com Docker

Após configurar o arquivo .env, você pode iniciar os serviços definidos no Docker Compose. Abra o terminal e execute o comando abaixo para iniciar o projeto:

```bash
docker-compose up -d
```
