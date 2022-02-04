
perguntarNumeroDeCartas();

function perguntarNumeroDeCartas () {
    let numeroDeCartas = prompt("numero de cartas");
    while (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 !== 0) {
        numeroDeCartas = prompt("numero de cartas");
    }
    adicionarXCartas(numeroDeCartas);
}

function comparador() { 
	return Math.random() - 0.5; 
}

function adicionarXCartas (x) {
    const elementoDasCartas = document.querySelector(".cartas");
    let allGifs = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
    let gifs = [];
    for (i = 0; i < x / 2; i++) {
        gifs.push(allGifs[i]);
        gifs.push(allGifs[i]);
    }
    gifs.sort(comparador);
    for (i = 0; i < x; i++) {
        elementoDasCartas.innerHTML += 
        `<div class="carta" onclick="virarCarta(this);">
            <div class="face"><img src="/Gifs e Imgs/front.png"></div>
            <div class="face naoVisivel"><img src="/Gifs e Imgs/${gifs[i]}.gif"></div>
        </div>`;
    }
}


function virarCarta (estaCarta) {
    const faceVisivel = estaCarta.querySelector(".carta div:first-child");
    const faceEscondida = estaCarta.querySelector(".carta div:last-child");

    if (faceVisivel.classList.contains("naoVisivel")) {
        faceVisivel.classList.remove("naoVisivel");
        faceEscondida.classList.add("naoVisivel");
    } else {
        faceVisivel.classList.add("naoVisivel");
        faceEscondida.classList.remove("naoVisivel");
    }
}
