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
        spanMascotaJugador.innerHTML = 'Greninja'
    } else if (inputCharizard.checked) {
        spanMascotaJugador.innerHTML = 'Charizard'
    } else if (inputVenusaur.checked) {
        spanMascotaJugador.innerHTML = 'Venusaur'
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
    let inputGreninjaEnemigo = document.getElementById('Greninja-enemigo')
    let inputCharizardEnemigo = document.getElementById('Charizard-enemigo')
    let inputVenusaurEnemigo = document.getElementById('Venusaur-enemigo')

    // Desactivar todos los inputs primero
    inputGreninjaEnemigo.checked = false
    inputCharizardEnemigo.checked = false
    inputVenusaurEnemigo.checked = false

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Greninja'
        inputGreninjaEnemigo.checked = true
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Charizard'
        inputCharizardEnemigo.checked = true
    } else {
        spanMascotaEnemigo.innerHTML = 'Venusaur'
        inputVenusaurEnemigo.checked = true
    }

}

function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function crearMensajes(resultado) {
    let sectionMensajes = document.getElementById('mensajes')
    
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', las mascota del enemigo atacó con ' + ataqueEnemigo + "--" + resultado
    
    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionReiniciar.style.display = "block"
    sectionSeleccionarAtaque.style.display = "none"

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
        crearMensajeFinal("HAS PERDIDO!")
        crearMensajeFinal("DEBES REINICIAR EL JUEGO")
    }else if (vidasEnemigo == 0){
        crearMensajeFinal("HAS GANADO!")
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