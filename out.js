const figlet = require('figlet');
const chalk =require('chalk');



/**
 * Dar color a un String
 *
 * @param msg Es string al que hay que dar color.
 * @param color EL color con el que pintar msg.
 * @returns {String} Devuelve el string msg con el color indicado.
 */
const colorize = (msg, color) => {
    if (typeof color !== "undefined"){
        msg = chalk[color].bold(msg);
    }
    return msg;
};

/**
 * Escribe un mensaje de log.
 *Me dan el mensaje y el color con el que quiero pintarlo, si no me dan el color pues paso solo el mensaje
 * @param msg EL string a escribir
 * @param color Color del texto
 */
const log = (msg, color) => {
    console.log(colorize(msg,color));
};

/**
 * Escribir un mensaje de log grande
 *
 * @param msg Texto a escribir
 * @param color Color de texto.
 */
const biglog = (msg, color) => {
    log(figlet.textSync(msg, { horizontalLayout: 'full'}), color);
};
/**
 * Escribe el mensaje de error emsg, pone la palabra error en rojo y luego pinta el mensaje de error en rojo después de dos puntos y como texto de fofo amarillo brillante
 * @param emsg Texto del mensaje de error
 */
//ponemos de fondo un amarillo brillante
const errorlog = (emsg) => {
    log(`${colorize("Error","red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")}`);
};

exports = module.exports = {
    colorize,
    log,
    biglog,
    errorlog

};