let ataqueJugador
let ataqueEnemigo
let vidasEnemigo = 3
let vidasJugador = 3
let botonFuego = document.getElementById('boton-fuego')
let botonAgua = document.getElementById('boton-agua')
let botonTierra = document.getElementById('boton-tierra')
let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
let sectionReiniciar = document.getElementById('reiniciar')


function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    let inputGreninja = document.getElementById('Greninja')
    let inputCharizard = document.getElementById('Charizard')
    let inputVenusaur = document.getElementById('Venusaur')
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    
    if (inputGreninja.checked) {
        spanMascotaJugador.innerHTML = `<img src="Greninja.png" alt="Greninja">`
    } else if (inputCharizard.checked) {
        spanMascotaJugador.innerHTML = `<img src="Charizard.png" alt="Charizard">`
    } else if (inputVenusaur.checked) {
        spanMascotaJugador.innerHTML = `<img src="Venuzaur.png" alt="Venusaur">`
    } else {
        sectionSeleccionarMascota.style.display = "flex"
        sectionSeleccionarAtaque.style.display = "none"
        return
    }

    seleccionarMascotaEnemigo()

    setTimeout(() => {
        sectionSeleccionarMascota.style.display = "none"
        sectionSeleccionarAtaque.style.display = "flex"
    }, 1000)
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    let GreninjaEnemigo = document.getElementById('Greninja-enemigo')
    let CharizardEnemigo = document.getElementById('Charizard-enemigo')
    let VenusaurEnemigo = document.getElementById('Venusaur-enemigo')

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = `<img src="Greninja.png" alt="Greninja">`
        GreninjaEnemigo.checked = true
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = `<img src="Charizard.png" alt="Charizard">`
        CharizardEnemigo.checked = true
    } else {    
        spanMascotaEnemigo.innerHTML = `<img src="Venuzaur.png" alt="Venusaur">`
        VenusaurEnemigo.checked = true
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    let ataqueJugadorSpan = document.getElementById('ataque-jugador')
    ataqueJugadorSpan.innerHTML = '🔥 FUEGO'
    ataqueJugadorSpan.className = 'ataque-fuego'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    let ataqueJugadorSpan = document.getElementById('ataque-jugador')
    ataqueJugadorSpan.innerHTML = '💧 AGUA'
    ataqueJugadorSpan.className = 'ataque-agua'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    let ataqueJugadorSpan = document.getElementById('ataque-jugador')
    ataqueJugadorSpan.innerHTML = '🌱 TIERRA'
    ataqueJugadorSpan.className = 'ataque-tierra'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    let ataqueEnemigoSpan = document.getElementById('ataque-enemigo')
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
        ataqueEnemigoSpan.innerHTML = '🔥 FUEGO'
        ataqueEnemigoSpan.className = 'ataque-fuego'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
        ataqueEnemigoSpan.innerHTML = '💧 AGUA'
        ataqueEnemigoSpan.className = 'ataque-agua'
    } else {
        ataqueEnemigo = 'TIERRA'
        ataqueEnemigoSpan.innerHTML = '🌱 TIERRA'
        ataqueEnemigoSpan.className = 'ataque-tierra'
    }

    combate()
}

function crearMensajes(resultado) {
    let sectionMensajes = document.getElementById('mensajes')
    
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultado
    
    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionReiniciar.style.display = "flex"

    let sectionMensajes = document.getElementById('mensajes')

    let parrafoFinal = document.createElement('p')
    parrafoFinal.innerHTML = resultadoFinal
    
    sectionMensajes.appendChild(parrafoFinal)

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
}


function combate(){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueJugador ==  ataqueEnemigo){
        crearMensajes("EMPATE")
    }else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA" || ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO" ||ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        crearMensajes("HAS GANADO!")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        crearMensajes("HAS PERDIDO!")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas(){
    if (vidasJugador == 0){
        crearMensajeFinal("Se acabo el juego --HAS PERDIDO!--")
        crearMensajeFinal("DEBES REINICIAR EL JUEGO")
    }else if (vidasEnemigo == 0){
        crearMensajeFinal("Se acabo el juego --HAS GANADO!--")
        crearMensajeFinal("DEBES REINICIAR EL JUEGO")
    }
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)