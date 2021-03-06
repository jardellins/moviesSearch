<h1 align="center">
    Movies search
</h1>
<p align="center">Uma app onde podemos encontrar algumas informações de filmes/séries, além de assistir o trailer</p>


- <a href="#sobre">Sobre</a> 
- <a href="#tecnologias">Tecnologias</a>
- <a href="#overview">Overview</a>
- <a href="#iniciando">Iniciando a aplicação</a>


<br/>
<a id="sobre"></a>

## :scroll: Sobre

O projeto tem como objetivo apresentar ao usuário as novidades entre filmes e séries, além de encontrar aquele seu filme favorito. Ao selecionar o filme ou série, temos uma página mostrando algumas informações sobre a produção, como também podemos assistir o trailer oficial. Todas as informações foram extraidas da API do [TMDB](https://www.themoviedb.org/), fui desenvolvendo o design e as interações para que ficasse o mais agradável possível. A aplicação foi construida utilizando React-Native, e utilizando componentes e os Hooks para um melhor aproveitamento. Realizado a construção de modal para a abertura do trailer, onde será possivél assistir o trailer oficial da produção.

<br/>
<a id="tecnologias"></a>

## :wrench: Tecnologias

Esse projeto foi desenvolvido com a seguinte Stack

- [React-Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [react-native-youtube-iframe](https://www.npmjs.com/package/react-native-youtube-iframe)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

<br/>
<a id="overview"></a>

## Overview da Aplicação

<p align="center" >
    
Tela inicial com as novidades de filmes e séries

![Screenshot_2021-06-24-19-37-06-184_host exp exponent](https://user-images.githubusercontent.com/44972197/123342321-e9ec0f00-d525-11eb-9234-384c376a2d1a.jpg)


Tela de Pesquisa
    
![Screenshot_2021-06-24-19-37-10-408_host exp exponent](https://user-images.githubusercontent.com/44972197/123342377-08520a80-d526-11eb-8c9c-93cc9ba18a9b.jpg)



Tela de Filmes
    
![Screenshot_2021-06-24-19-37-18-574_host exp exponent](https://user-images.githubusercontent.com/44972197/123342402-1c960780-d526-11eb-8f74-01e6e5c65dea.jpg)

Telas de Inforação das produções
    
![Screenshot_2021-06-24-19-37-58-036_host exp exponent](https://user-images.githubusercontent.com/44972197/123342488-3cc5c680-d526-11eb-9688-506cd71db83f.jpg)
    
![Screenshot_2021-06-24-19-37-36-394_host exp exponent](https://user-images.githubusercontent.com/44972197/123342492-3f282080-d526-11eb-8880-10f5f43bae55.jpg)
    
![Screenshot_2021-06-24-19-38-13-065_host exp exponent](https://user-images.githubusercontent.com/44972197/123342532-4e0ed300-d526-11eb-98cc-7f6159e9adf0.jpg)
    
<p>
    
<br/>
<a id="iniciando"></a>

## Iniciando a aplicação

Para utilizar os dados da API do [TMDB](https://www.themoviedb.org/) será necessário criar uma conta no site https://www.themoviedb.org/documentation/api e criar um projeto para que seja disponibilado um TOKEN.

## Download do Projeto

```sh

https://github.com/jardellins/moviesSearch.git

```

## Iniciar o Projeto

Entrar no diretório da plaicação

```sh

cd moviesSearch

```

E em seguida rodar os comandos para utilizar com o Expo

```sh
yarn install

expo start
```
