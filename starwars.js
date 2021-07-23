// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { AudioPlayer } from './music.js';
import { numeroParaRomano } from './roman.js';
import { restartAnimation } from './restart-animation.js';

const API_ENDPOINT = 'https://swapi.dev/api';

const filmesEl = document.querySelector('#filmes ul');
const preIntroducaoEl = document.querySelector('pre.introducao');

let audioUrl = 'audio/tema-sw.mp3';
let coverImageUrl = 'imgs/logo.svg';
let title = 'Intro';
let artist = 'John Williams';


new AudioPlayer().start({audioUrl, coverImageUrl, title, artist}, document.body);

fetch(API_ENDPOINT + '/films')
    .then(resposta => resposta.json())
    .then(dados => {
        let filmesOrdenado = dados.results.sort((a, b) => a.episode_id < b.episode_id ? -1 : 1);
        filmesOrdenado.forEach(element => {
            let romano = numeroParaRomano(element.episode_id).padEnd(3, ' ');
            let liEl = document.createElement('li');
            let liText = 'Episode ' + romano + ' - ' + element.title;
            liEl.innerHTML = liText;
            liEl.addEventListener('click', () => {
                preIntroducaoEl.innerHTML = `Episode ${romano}
                ${element.title}
                
                ${element.opening_crawl}`;
                restartAnimation(preIntroducaoEl);
            });
            filmesEl.appendChild(liEl);
        });
    });
    