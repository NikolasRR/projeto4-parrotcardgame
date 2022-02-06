// Inicialização de variáveis globais necessárias
let numeroDeCartas = null;
let contadorDeJogadas = 0;
let gifCarta1 = null;
let gifCarta2 = null;

// Inicializo a função que pergunta o número de cartas, após ser respondida, começa a contagem de segundos
perguntarNumeroDeCartas();
let intervaloDoRelogio = setInterval(relogio, 1000);

// Função que pergunta o número das cartas
function perguntarNumeroDeCartas () {
    // Lança um prompt com a pergunta
    numeroDeCartas = prompt("Deseje o número de cartas que deseja jogar. O número deve ser par e entre 4 e 14.");
    // O while se repete até que a resposta seja um número par entre 4 e 14
    while (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 !== 0) {
        numeroDeCartas = prompt("Deseje o número de cartas que deseja jogar. O número deve ser par e entre 4 e 14.");
    }
    // Somento quando o número de cartas é um aceitável que chamamos a função que adiciona as cartas
    adicionarXCartas(numeroDeCartas);
}

// Função para embaralhar uma array
function comparador() { 
	return Math.random() - 0.5; 
}

// Função que adiciona cartas, recebe como argumento o número de cartas escolhido
function adicionarXCartas (numeroDeCartas) {
    // Busco o elemento que irá conter as cartas
    const elementoDasCartas = document.querySelector(".cartas");
    // Crio uma lista com os nomes de todos os gifs, e uma vazia
    let allGifs = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
    let gifs = [];
    // Adiciono na lista 'gifs' pares dos gifs que serão usados
    for (i = 0; i < numeroDeCartas / 2; i++) {
        gifs.push(allGifs[i]);
        gifs.push(allGifs[i]);
    }
    // A lista 'gifs' é embaralhada
    gifs.sort(comparador);
    // Finalmente o for adiciona o número de cartas escolhidas
    for (i = 0; i < numeroDeCartas; i++) {
        elementoDasCartas.innerHTML += 
        `<div class="carta" onclick="virarCarta(this);">
            <div class="face"><img src="/Gifs e Imgs/front.png"></div>
            <div class="face naoVisivel"><img src="/Gifs e Imgs/${gifs[i]}.gif"></div>
        </div>`;
    }
}

// Função que vira a carta, recebe como argumento a carta clicada
function virarCarta (estaCarta) {
    // A primeira div sempre é onde está o papagaio, e a segunda onde está o gif
    const papagaio = estaCarta.querySelector(".carta div:first-child");
    const gif = estaCarta.querySelector(".carta div:last-child");
    // A variável 'antiBug' está aqui para impedir que mais de duas cartas sejam viradas ao mesmo tempo
    const antiBug = document.querySelectorAll(".virada")
    // O if verifica se a carta já está virada e se existem menos que duas cartas viradas
    if (gif.classList.contains("naoVisivel") && antiBug.length < 2) {
        // O lado do papagaio é rotacioando para trás, e o do gif para frente
        papagaio.classList.add("naoVisivel");
        gif.classList.remove("naoVisivel");
        // A carta clicada recebe a classe 'virada', usada no antiBug e para desvirar a carta
        estaCarta.classList.add("virada");
        // O contador de jogadas tem seu valor aumentado em 1, e chamamos a função que compara as cartas
        contadorDeJogadas++;
        compararCartas(gif);
    } 
}

function desvirarCartas (carta1, carta2) {
    const papagaioCarta1 = carta1.querySelector("div:first-child");
    const gifCarta1 = carta1.querySelector("div:last-child");
    const papagaioCarta2 = carta2.querySelector("div:first-child");
    const gifCarta2 = carta2.querySelector("div:last-child");

    papagaioCarta1.classList.remove("naoVisivel");
    gifCarta1.classList.add("naoVisivel");
    carta1.classList.remove("virada");

    papagaioCarta2.classList.remove("naoVisivel");
    gifCarta2.classList.add("naoVisivel");
    carta2.classList.remove("virada");
}

function compararCartas (gif) {
    const cartasViradas = document.querySelectorAll(".virada");
    const carta1 = cartasViradas[0];
    const carta2 = cartasViradas[1];
    if (gifCarta1 === null) {
        gifCarta1 = gif;
    } else if (gifCarta2 === null) {
        gifCarta2 = gif;
        const cartasIguais = gifCarta1.isEqualNode(gifCarta2);
        if (cartasIguais) {
            carta1.classList.remove("virada");
            carta1.classList.add("parEncontrado");
            carta2.classList.remove("virada");
            carta2.classList.add("parEncontrado");
    
            gifCarta1 = null;
            gifCarta2 = null;

            let paresEncontrados = document.querySelectorAll(".parEncontrado").length
            if (paresEncontrados === parseInt(numeroDeCartas)) {
                setTimeout(oJogoAcabou, 500)
            }
        } else {
            setTimeout(desvirarCartas, 1000, carta1, carta2);
            gifCarta1 = null;
            gifCarta2 = null;
        }
    } 
}

function oJogoAcabou () {
    clearInterval(intervaloDoRelogio);
    const elementoRelogio = document.querySelector("span").innerHTML;
    alert(`Você ganhou o jogo em ${contadorDeJogadas} jogadas e levou ${elementoRelogio} segundos`);
    const respostaSimOuNao = prompt("Deseja comoçar um novo jogo? Responda sim para jogar novamente");
    if (respostaSimOuNao === "sim") {
        reiniciarJogo();
    } else {
        const footer = document.querySelector("footer");
        footer.innerHTML = `<button onclick="reiniciarJogo();">Reiniciar jogo</button>`
    }
}

function relogio () {
    const elementoRelogio = document.querySelector("span");
    let segundosEmInt = parseInt(elementoRelogio.innerHTML);
    elementoRelogio.innerHTML = segundosEmInt + 1;
}

function reiniciarJogo () {

    contadorDeJogadas = 0;

    const elementoRelogio = document.querySelector("span");
    elementoRelogio.innerHTML = 0;

    const elementoDasCartas = document.querySelector(".cartas");
    elementoDasCartas.innerHTML = null;

    const footer = document.querySelector("footer");
    footer.innerHTML = null;

    perguntarNumeroDeCartas();
    intervaloDoRelogio = setInterval(relogio, 1000);
}