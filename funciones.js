//Declaracion variables globales
var numdado, lugarjugador1, lugarjugador2, posicion, posicionRojo, posicionAzul,
        jugadorActual, mensaje, peonactual, pregunta, respuesta,
        textoRespuestaCorrecta, sentido, contesto, cantpreg, respcorrecta;
var jugadores = [];
var vecpreg = [];
var jugadoresOrdenados = [];

window.onload = iniciar;

function iniciar() { //Re-establece todo el juego excepto el vector jugadores a cero
    $(peonAzul).animate({top: '415px', left: '35px'}, 0);
    $(peonRojo).animate({top: '405px', left: '25px'}, 0);
    generarRespuestas();
    generarPreguntas();
    vecpreg = [];
    sentido = "negativo";
    cantpreg = 0;
    contesto = 0;
    posicion = 0;
    numdado = 0;
    posicionRojo = 0;
    posicionAzul = 0;
    jugadorActual = "Jugador Azul";
    mensaje = "";
    peonactual = "peonAzul";
    mensajes.innerHTML = "";
    document.getElementById("jugadorAzul").innerHTML = "Jugador Uno";
    document.getElementById("jugadorRojo").innerHTML = "Jugador Dos";
    document.getElementById("log").style.display = "inline";
    document.getElementById("over").style.display = "inline";
    document.getElementById("comenzarJuego").onclick = comenzar;
    document.getElementById("mensajes").style.color = "blue";
    document.getElementById("rank").style.display = "none";
}                        //Re-establece todo el juego excepto el vector jugadores a cero

function comenzar() { //Chequea que los nombres de jugadores sean correctos e inicia el juego
    if (nombreJugador1.value != nombreJugador2.value && nombreJugador1.value != "" && nombreJugador2.value != "") {
        document.getElementById("log").style.display = "none";
        document.getElementById("over").style.display = "none";
        document.getElementById("jugadorAzul").innerHTML = nombreJugador1.value;
        document.getElementById("jugadorRojo").innerHTML = nombreJugador2.value;
        agregarJugadores();
        document.getElementById("nombreJugador1").value = "";
        document.getElementById("nombreJugador2").value = "";
        agregarMensaje(jugadorActual + " tire el dado");
        document.getElementById("dado").onclick = tirardado;
        document.getElementById("reiniciarJuego").onclick = iniciar;
    }
    else {
        alert("Debe ingresar nombres para los jugadores, y que sean distintos");
    }
}                       //Chequea que los nombres de jugadores sean correctos e inicia el juego

function tirardado() { //Genera un numero aleatorio y los peones avanzan segun lo sacado
    numdado = Math.floor((Math.random() * 6 + 1));
    switch (numdado) {
        case 1:
            dado.src = "img/1.png";
            break;
        case 2:
            dado.src = "img/2.png";
            break;
        case 3:
            dado.src = "img/3.png";
            break;
        case 4:
            dado.src = "img/4.png";
            break;
        case 5:
            dado.src = "img/5.png";
            break;
        case 6:
            dado.src = "img/6.png";
            break;
    }
    agregarMensaje(jugadorActual + " saco un " + numdado);
    if (peonactual == "peonAzul") {
        efectuarAnimacion(peonAzul, posicionAzul, numdado, 1);
        posicionAzul += numdado;
        var posicion = posicionAzul;
    } else {
        efectuarAnimacion(peonRojo, posicionRojo, numdado, 1);
        posicionRojo += numdado;
        var posicion = posicionRojo;
    }
    if (peonactual == "peonAzul") {
        if (posicionAzul >= casilleros.length) {
            asignarVictoria();
        } else {
            hacerPregunta(posicion);
        }
    } else {
        if (posicionRojo >= casilleros.length) {
            asignarVictoria();
        } else {
            hacerPregunta(posicion);
        }
    }
}                      //Genera un numero aleatorio y los peones avanzan segun lo sacado

function tirardado2() { //Genera un numero aleatorio y hace retroceder o avanzar casilleros segun un sentido dado
    numdado = Math.floor((Math.random() * 6 + 1));
    switch (numdado) {
        case 1:
            dado.src = "img/1.png";
            break;
        case 2:
            dado.src = "img/2.png";
            break;
        case 3:
            dado.src = "img/3.png";
            break;
        case 4:
            dado.src = "img/4.png";
            break;
        case 5:
            dado.src = "img/5.png";
            break;
        case 6:
            dado.src = "img/6.png";
            break;
    }
    agregarMensaje(jugadorActual + " saco un " + numdado);
    if (sentido == "positivo") {
        if (peonactual == "peonAzul") {
            if (posicionAzul + numdado >= casilleros.length) {
                efectuarAnimacion(peonAzul, posicionAzul, numdado, 1);
                posicionAzul += numdado;
                var posicion = posicionAzul;
                asignarVictoria();
            } else {
                efectuarAnimacion(peonAzul, posicionAzul, numdado, 1);
                posicionAzul += numdado;
                var posicion = posicionAzul;
            }
        }
        if (peonactual == "peonRojo") {
            if (posicionRojo + numdado >= casilleros.length) {
                efectuarAnimacion(peonRojo, posicionRojo, numdado, 1);
                posicionRojo += numdado;
                var posicion = posicionRojo;
                asignarVictoria();
            } else {
                efectuarAnimacion(peonRojo, posicionRojo, numdado, 1);
                posicionRojo += numdado;
                var posicion = posicionRojo;
            }
        }
    }
    if (sentido == "negativo") {
        if (peonactual == "peonAzul") {
            if (posicionAzul - numdado <= 0) {
                efectuarAnimacion(peonAzul, posicionAzul, -posicionAzul, 0);
                posicionAzul -= posicionAzul;
                var posicion = posicionAzul;
            } else {
                efectuarAnimacion(peonAzul, posicionAzul, -numdado, 0);
                posicionAzul -= numdado;
                var posicion = posicionAzul;
            }
        }
        if (peonactual == "peonRojo") {
            if (posicionRojo - numdado <= 0) {
                efectuarAnimacion(peonRojo, posicionRojo, -posicionRojo, 0);
                posicionRojo -= posicionRojo;
                var posicion = posicionRojo;
            } else {
                efectuarAnimacion(peonRojo, posicionRojo, -numdado, 0);
                posicionRojo -= numdado;
                var posicion = posicionRojo;
            }
        }
    }
    sentido = "negativo";
    document.getElementById("dado").onclick = tirardado;
    cambiaturno();
}                     //Genera un numero aleatorio y hace retroceder o avanzar casilleros segun un sentido dado

function cambiaturno() { //Asigna valores y clases para definir de que jugador es el turno
    var clase;
    if (jugadorActual == "Jugador Azul") {
        jugadorActual = "Jugador Rojo";
        peonactual = "peonRojo";
        clase = "textoRojo";
    }
    else {
        jugadorActual = "Jugador Azul";
        peonactual = "peonAzul";
        clase = "textoAzul";
    }
    agregarMensaje(jugadorActual + ", tire el dado</p>");
}                    //Asigna valores y clases para definir de que jugador es el turno

function hacerPregunta(posicion) { //Genera las tarjetas de pregunta segun el casillero donde caiga el peon
    var tipopregunta = casilleros[posicion].tipo;
    var preg, respuesta1, respuesta2, respuesta3, respuesta4;
    var numeroPregunta = Math.round((Math.random() * pregunta.length));
    if (chequearPregunta(numeroPregunta) == true) {
        preg = pregunta[numeroPregunta][1];
        respuesta1 = respuesta[numeroPregunta][2];
        respuesta2 = respuesta[numeroPregunta][5];
        respuesta3 = respuesta[numeroPregunta][8];
        respuesta4 = respuesta[numeroPregunta][11];
        respcorrecta = pregunta[numeroPregunta][2];
        switch (parseInt(respcorrecta)) {
            case 1:
                textoRespuestaCorrecta = respuesta1;
                break;
            case 2:
                textoRespuestaCorrecta = respuesta2;
                break;
            case 3:
                textoRespuestaCorrecta = respuesta3;
                break;
            case 4:
                textoRespuestaCorrecta = respuesta4;
                break;
        }
        txtpregunta.innerHTML = preg;
        textoRespuesta1.innerHTML = respuesta1;
        textoRespuesta2.innerHTML = respuesta2;
        textoRespuesta3.innerHTML = respuesta3;
        textoRespuesta4.innerHTML = respuesta4;
        document.getElementById("respuesta1").checked = false;
        document.getElementById("respuesta2").checked = false;
        document.getElementById("respuesta3").checked = false;
        document.getElementById("respuesta4").checked = false;
        switch (tipopregunta) {
            case "arroyo":
                agregarMensaje(jugadorActual + " cayo en un arroyo, cruza al siguiente casillero");
                arroyo();
                break;
            case"pradera":
                vecpreg.push(numeroPregunta);
                tittarj.innerHTML = "Pradera";
                agregarMensaje(jugadorActual + " cayo en una pradera ");
                $(".cabezalTarjeta").css("background-color", "rgba(252,130,69,1)");
                document.getElementById("over").style.display = "block";
                document.getElementById("tarj").style.display = "block";
                document.getElementById("botonRespuesta").onclick = pradera;
                break;
            case "insecto":
                vecpreg.push(numeroPregunta);
                tittarj.innerHTML = "Insecto";
                $(".cabezalTarjeta").css("background-color", "rgba(170,92,161,1)");
                document.getElementById("over").style.display = "block";
                document.getElementById("tarj").style.display = "block";
                document.getElementById("botonRespuesta").onclick = insecto;
                break;
            case "balsa":
                agregarMensaje(jugadorActual + " cayo en una balsa, avanza al siguiente casillero ");
                arroyo();
                break;
            case "trampa":
                vecpreg.push(numeroPregunta);
                tittarj.innerHTML = "Trampa";
                agregarMensaje(jugadorActual + " cayo en una trampa ");
                $(".cabezalTarjeta").css("background-color", "rgba(0,147,38,1)");
                document.getElementById("over").style.display = "block";
                document.getElementById("tarj").style.display = "block";
                document.getElementById("botonRespuesta").onclick = trampa;
                break;
            case "madriguera":
                agregarMensaje(jugadorActual + " cayo en una madriguera, la mulita descansa y pierde el turno ");
                madriguera();
                break;
        }
    } else {
        hacerPregunta(posicion);
    }
}          //Genera las tarjetas de pregunta segun el casillero donde caiga el peon

function verificaRespuesta() { //Chequea que el jugador elija una opcion y devuelve si la respuesta fue correcta o no
    if (document.getElementById("respuesta1").checked == false && document.getElementById("respuesta2").checked == false && document.getElementById("respuesta3").checked == false && document.getElementById("respuesta4").checked == false) {
    }
    else {
        if (document.getElementById("respuesta1").checked == true)
            respelegida = 1;
        if (document.getElementById("respuesta2").checked == true)
            respelegida = 2;
        if (document.getElementById("respuesta3").checked == true)
            respelegida = 3;
        if (document.getElementById("respuesta4").checked == true)
            respelegida = 4;
        if (respelegida == parseInt(respcorrecta)) {
            document.getElementById("over").style.display = "none";
            document.getElementById("tarj").style.display = "none";
            return true;
        }
        else {
            document.getElementById("over").style.display = "none";
            document.getElementById("tarj").style.display = "none";
            return false;
        }
    }
}              //Chequea que el jugador elija una opcion y devuelve si la respuesta fue correcta o no

function agregarMensaje(mensaje) { //Agrega a la div mensajes un nuevo parrafo con el formado del jugador actual
    if (jugadorActual == "Jugador Azul") {
        clase = "textoAzul";
    } else {
        clase = "textoRojo";
    }
    $(mensajes).prepend("<p class='" + clase + "'>" + mensaje + "</p>")
}          //Agrega a la div mensajes un nuevo parrafo con el formado del jugador actual

function arroyo() { //Funcionamiento de la casilla Arroyo
    document.getElementById("over").style.display = "none";
    document.getElementById("tarj").style.display = "none";
    if (peonactual == "peonAzul") {
        efectuarAnimacion(peonAzul, posicionAzul, 1, 1);
        posicionAzul += 1;
        var posicion = posicionAzul + 1;
        cambiaturno();
    }
    else {
        efectuarAnimacion(peonRojo, posicionRojo, 1, 1);
        posicionRojo += 1;
        var posicion = posicionRojo + 1;
        cambiaturno();
    }
}                         //Funcionamiento de la casilla Arroyo

function pradera() { //Funcionamiento de la casilla Pradera
    if (verificaRespuesta() == true) {
        agregarMensaje(jugadorActual + " contesto correctamente!</p>");
        cambiaturno();
    }
    if (verificaRespuesta() == false) {
        agregarMensaje(jugadorActual + " contesto incorrectamente, la respuesta correcta era: " + textoRespuestaCorrecta + ", retrocede 2 casilleros</p>");
        if (peonactual == "peonAzul") {
            if (posicionAzul < 2) {
                efectuarAnimacion(peonAzul, posicionAzul, -1, 0);
                posicionAzul -= 1;
                var posicion = posicionAzul - 1;
            }
            else {
                efectuarAnimacion(peonAzul, posicionAzul, -2, 0);
                posicionAzul -= 2;
                var posicion = posicionAzul - 2;
            }
        }
        else {
            if (posicionRojo < 2) {
                efectuarAnimacion(peonRojo, posicionRojo, -1, 0);
                posicionRojo -= 1;
                var posicion = posicionRojo - 1;
            }
            else {
                efectuarAnimacion(peonRojo, posicionRojo, -2, 0);
                posicionRojo -= 2;
                var posicion = posicionRojo - 2;
            }
        }
        cambiaturno();
    }
}                        //Funcionamiento de la casilla Pradera

function insecto() { //Funcionamiento de la casilla Insecto * Version Desafio *
    if (cantpreg == 0) {
        agregarMensaje(jugadorActual + " cayo en un insecto, tendra 5 intentos para contestar 3 preguntas, sino debera retroceder");
    }
    if (verificaRespuesta() == true) {
        contesto++;
        agregarMensaje(jugadorActual + " contesto correctamente " + contesto + " de 3 preguntas!</p>");
        cantpreg++;
        hacerPregunta(3);
    }
    if (verificaRespuesta() == false) {
        agregarMensaje(jugadorActual + " contesto incorrectamente, la respuesta correcta era: " + textoRespuestaCorrecta + "</p>");
        cantpreg++;
        hacerPregunta(3);
    }
    if (contesto == 3) {
        agregarMensaje(jugadorActual + " paso la prueba, tire el dado para avanzar</p>");
        sentido = "positivo";
        document.getElementById("dado").onclick = tirardado2;
        cantpreg = 0;
        contesto = 0;
        document.getElementById("over").style.display = "none";
        document.getElementById("tarj").style.display = "none";
    }
    if (cantpreg == 5) {
        agregarMensaje(jugadorActual + " fallo la prueba, tire el dado para retroceder</p>");
        document.getElementById("over").style.display = "none";
        document.getElementById("tarj").style.display = "none";
        document.getElementById("dado").onclick = tirardado2;
        cantpreg = 0;
        contesto = 0;
    }
}                        //Funcionamiento de la casilla Insecto * Version Desafio *

function balsa() { //Funcionamiento de la casilla Balsa
    document.getElementById("over").style.display = "none";
    document.getElementById("tarj").style.display = "none";
    if (peonactual == "peonAzul") {
        efectuarAnimacion(peonAzul, posicionAzul, 1, 1);
        posicionAzul += 1;
        var posicion = posicionAzul + 1;
        cambiaturno();
    }
    else {
        efectuarAnimacion(peonRojo, posicionRojo, 1, 1);
        posicionRojo += 1;
        var posicion = posicionRojo + 1;
        cambiaturno();
    }
}                          //Funcionamiento de la casilla Balsa

function trampa() { //Funcionamiento de la casilla Trampa
    if (verificaRespuesta() == true) {
        agregarMensaje(jugadorActual + " contesto correctamente! Avanza 2 casilleros</p>");
        if (peonactual == "peonAzul") {
            efectuarAnimacion(peonAzul, posicionAzul, 2, 1);
            posicionAzul += 2;
            var posicion = posicionAzul + 2;
        }
        else {
            efectuarAnimacion(peonRojo, posicionRojo, 2, 1);
            posicionRojo += 2;
            var posicion = posicionRojo + 2;
        }
        cambiaturno();
    }
    if (verificaRespuesta() == false) {
        agregarMensaje(jugadorActual + " contesto incorrectamente, la respuesta correcta era: " + textoRespuestaCorrecta + ", retrocede 2 casilleros</p>");
        if (peonactual == "peonAzul") {
            if (posicionAzul < 2) {
                efectuarAnimacion(peonAzul, posicionAzul, -1, 0);
                posicionAzul -= 1;
                var posicion = posicionAzul - 1;
            }
            else {
                efectuarAnimacion(peonAzul, posicionAzul, -2, 0);
                posicionAzul -= 2;
                var posicion = posicionAzul - 2;
            }
        }
        else {
            if (posicionRojo < 2) {
                efectuarAnimacion(peonRojo, posicionRojo, -1, 0);
                posicionRojo -= 1;
                var posicion = posicionRojo - 1;
            }
            else {
                efectuarAnimacion(peonRojo, posicionRojo, -2, 0);
                posicionRojo -= 2;
                var posicion = posicionRojo - 2;
            }
        }
        cambiaturno();
    }
}                         //Funcionamiento de la casilla Trampa

function madriguera() { //Funcionamiento de la casilla Madriguera
    document.getElementById("over").style.display = "none";
    document.getElementById("tarj").style.display = "none";
    cambiaturno();
}                     //Funcionamiento de la casilla Madriguera

function generarPreguntas() { //Pasa las preguntas a una matriz de preguntas
    pregunta = [];
    var pregunta1 = "";
    pregunta1 = preguntas.split("\n");
    for (var i = 0 in pregunta1) {
        var partepregunta = pregunta1[i].split("@");
        pregunta.push(partepregunta);
    }
}               //Pasa las preguntas a una matriz de preguntas

function generarRespuestas() { //Pasa las respuestas a una matriz de respuestas
    respuesta = [];
    var respuesta1 = "";
    respuesta1 = respuestas.split("\n");
    for (var i = 0 in respuesta1) {
        var partepregunta = respuesta1[i].split("@");
        respuesta.push(partepregunta);
    }
}              //Pasa las respuestas a una matriz de respuestas

function asignarVictoria() { //Termina el juego asignando punto al ganador y generando la tabla de ranking
    mensajes.innerHTML = "";
    agregarMensaje(jugadorActual + " es el ganador del juego!!! ");
    $(".cabezalTarjeta").css("background-color", "rgba(230,119,57,1)");
    dado.onclick = "";
    if (jugadorActual == "Jugador Azul") {
        jugadores[lugarjugador1]["puntaje"] += 1;
    }
    else {
        jugadores[lugarjugador2]["puntaje"] += 1;
    }
    tablaRanking.innerHTML = "";
    ordenarJugadores();
    for (var i = 0 in jugadores) {
        tablaRanking.innerHTML += "<tr><td>" + jugadores[i]["nombre"] + "</td><td>" + jugadores[i]["puntaje"] + "</td></tr>";
    }
    document.getElementById("over").style.display = "block";
    document.getElementById("rank").style.display = "block";
}                //Termina el juego asignando punto al ganador y generando la tabla de ranking

function agregarJugadores() { //Agrega jugadores al vector jugadores o carga los valores previos del jugador (si ya existia)
    var verificarjugador1 = false;
    var verificarjugador2 = false;
    if (jugadores.length == 0) {
        var nuevoJugador1 = {'nombre': jugadorAzul.innerHTML, 'puntaje': 0};
        var nuevoJugador2 = {'nombre': jugadorRojo.innerHTML, 'puntaje': 0};
        jugadores[0] = nuevoJugador1;
        jugadores[1] = nuevoJugador2;
        lugarjugador1 = 0;
        lugarjugador2 = 1;
    }
    else {
        for (var i = 0 in jugadores) {
            if (jugadores[i]["nombre"] == nombreJugador1.value) {
                lugarjugador1 = i;
                verificarjugador1 = true;
            }
            if (jugadores[i]["nombre"] == nombreJugador2.value) {
                lugarjugador2 = i;
                verificarjugador2 = true;
            }
        }
        if (verificarjugador1 == false) {
            var nuevoJugador = {'nombre': nombreJugador1.value, 'puntaje': 0};
            jugadores[jugadores.length] = nuevoJugador;
            lugarjugador1 = jugadores.length - 1;
        }
        if (verificarjugador2 == false) {
            var nuevoJugador2 = {'nombre': nombreJugador2.value, 'puntaje': 0};
            jugadores[jugadores.length] = nuevoJugador2;
            lugarjugador2 = jugadores.length - 1;
        }
    }
}               //Agrega jugadores al vector jugadores o carga los valores previos del jugador (si ya existia)

function chequearPregunta(numeroPregunta) { //Chequea que la pregunta a realizar no haya sido usada anteriormente durante el juego
    var preguntaDistinta = true;
    if (vecpreg.length == pregunta.length) {
        alert("Se acabaron las preguntas, Repartiendo mazo de preguntas...");
        vecpreg = [];
    }
    for (var i = 0; i < pregunta.length; i++) {
        if (vecpreg[i] == numeroPregunta) {
            preguntaDistinta = false;
        }
    }
    return preguntaDistinta;
} //Chequea que la pregunta a realizar no haya sido usada anteriormente durante el juego

function ordenarJugadores() { //Ordena el vector jugadores segun el puntaje de los jugadores
    jugadoresOrdenados = [];
    var mayor = 0;
    var i = 0;
    while (jugadores.length > 0) {
        for (i in jugadores) {
            if (jugadores[i]["puntaje"] > mayor) {
                mayor = i;
            }
        }
        for (i in jugadores) {
            if (jugadores[i]["puntaje"] > jugadores[mayor]["puntaje"]) {
                mayor = i;
            }
        }
        jugadoresOrdenados[jugadoresOrdenados.length] = jugadores[mayor];
        jugadores.splice(mayor, 1);
        mayor = 0;
    }
    jugadores = jugadoresOrdenados;
} //Ordena el vector jugadores segun el puntaje de los jugadores