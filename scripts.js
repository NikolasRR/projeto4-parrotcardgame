
perguntarNumeroDeCartas();

function perguntarNumeroDeCartas () {
    let numeroDeCartas = prompt("numero de cartas");
    while (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 !== 0) {
        numeroDeCartas = prompt("numero de cartas");
    }
    adicionarXCartas(numeroDeCartas);
}

function adicionarXCartas (x) {
    const elementoDasCartas = document.querySelector(".cartas");
    let gifs = "bobrossparrot.gif";
    for (i = 0; i < x; i++) {
        elementoDasCartas.innerHTML += 
        `<div class="carta" onclick="virarCarta(this);">
            <div class="frente face visivel"><img src="/Gifs e Imgs/front.png"></div>
            <div class="verso face escondida"><img src="/Gifs e Imgs/${gifs}"></div>
        </div>`;
    }
}


function virarCarta (estaCarta) {
    const faceVisivel = estaCarta.querySelector(".visivel");
    const faceEscondida = estaCarta.querySelector(".escondida");

}
