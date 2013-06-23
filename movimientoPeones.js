/*Posiciones de las fichas para cada casillero y tipo de casillero de aquí 
 * se obtiene cantidad total de casilleros (indexado con asociativos)
 * 
 * @type Array
 */

var casilleros = new Array(
        {topPos: 410, leftPos: 0, tipo: "inicio", },
        {topPos: 420, leftPos: 155, tipo: "arroyo"},
{topPos: 416, leftPos: 255, tipo: "pradera"},
{topPos: 410, leftPos: 359, tipo: "insecto"},
{topPos: 405, leftPos: 456, tipo: "balsa"},
{topPos: 350, leftPos: 566, tipo: "trampa"},
{topPos: 270, leftPos: 556, tipo: "pradera"},
{topPos: 191, leftPos: 544, tipo: "insecto"},
{topPos: 121, leftPos: 524, tipo: "arroyo"},
{topPos: 57, leftPos: 509, tipo: "madriguera"},
{topPos: -13, leftPos: 479, tipo: "trampa"},
{topPos: -7, leftPos: 398, tipo: "arroyo"},
{topPos: -3, leftPos: 326, tipo: "madriguera"},
{topPos: -4, leftPos: 252, tipo: "pradera"},
{topPos: 1, leftPos: 177, tipo: "balsa"},
{topPos: 15, leftPos: 85, tipo: "trampa"},
{topPos: 80, leftPos: 61, tipo: "pradera"},
{topPos: 140, leftPos: 50, tipo: "madriguera"},
{topPos: 220, leftPos: 40, tipo: "arroyo"},
{topPos: 311, leftPos: 30, tipo: "insecto"});
/*Desfasaje para que cuando compartan casillero los peones no se superpongan
 * 
 * @type Number
 */
var desfasajeAzul = 8;
var desfasajeRojo = -desfasajeAzul;
/*Tiempo en milisegndos que demora cada animación de un casillero a otro
 * 
 * @type Number
 */
var tiempoAnimacion = 800;
/* Hace la animación del peón correspondiente, recibe como parámetros el peon, el casillero actual y la cantidad de casilleros a avanzar
 * 
 * @param {type} _peonAnimar
 * @param {type} _casilleroActual
 * @param {type} _cantidadCasilleros
 * @param {type} _avance
 * @returns {undefined}
 */
function efectuarAnimacion(_peonAnimar, _casilleroActual, _cantidadCasilleros, _avance)
{
    var desf;
    if ($(_peonAnimar).attr("id") == $("#peonAzul").attr("id"))
    {
        desf = desfasajeAzul;
    }
    else
    {
        desf = desfasajeRojo;
    }
    if (_avance)
    {
        for (var i = 1; i <= _cantidadCasilleros; i++)
        {
            var casilleroFinal = _casilleroActual + i;
            if (casilleroFinal < casilleros.length)
            {
                $(_peonAnimar).animate({
                    top: (casilleros[casilleroFinal].topPos + desf) + 'px',
                    left: (casilleros[casilleroFinal].leftPos + desf) + "px",
                    width: 107 - (400 - casilleros[casilleroFinal].topPos) * 0.03
                },
                tiempoAnimacion,
                        null);
            } else
            {
                $(_peonAnimar).animate({
                    top: (casilleros[0].topPos + desf) + 'px',
                    left: (casilleros[0].leftPos + desf) + "px",
                    width: 107 - (400 - casilleros[0].topPos) * 0.03
                },
                tiempoAnimacion,
                        null);
            }
        }
    }
    else
    {
        for (var i = -1; i >= _cantidadCasilleros; i--)
        {
            var casilleroFinal = _casilleroActual + i;
            $(_peonAnimar).animate({
                top: (casilleros[casilleroFinal].topPos + desf) + 'px',
                left: (casilleros[casilleroFinal].leftPos + desf) + "px",
                width: 107 - (400 - casilleros[casilleroFinal].topPos) * 0.03
            },
            tiempoAnimacion,
                    null);
        }
    }
}
                