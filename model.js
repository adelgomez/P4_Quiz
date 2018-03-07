const fs = require("fs");

//Nombre del fihcero donde se guardan las preguntas. es un fichero de texto con el JSON de quizzes.
const DB_FILENAME = "quizzes.json";
// En esta variable se mantienen todos los quizzes existentes. Es una array de objetos, donde cada objeto tiene los atributos question y answer para guardar el texto de la pregunta y el de la respuesta.

//Al arrancar la aplicación, esta variable contiene estas cuatro preguntas pero al final del módulo se llama a load() para cargar las preguntas guardadas en el fihero DB_FILENAME. Lo dejo asi porque la primera vex que ejecuto el progrma no existen

//Array de objetos con cada objeto un string, tiene 4 objetos. (antes del load,y DB)

let quizzes = [
    {
        question: "Capital de Italia",
        answer: "Roma"
    },
    {
        question: "Capital de Francia",
        answer: "París"
    },
    {
        question: "Capital de España",
        answer: "Madrid"
    },
    {
        question: "Capital de Portugal",
        answer: "Lisboa"
    }];
//Si hay un error intetneo solucionar el problema sino escojo los datos que hay que leer.
const load = () => {
    fs.readFile(DB_FILENAME,(err,data) => {
        if(err){
            //La primera vez que no existe el fichero
            if(err.code === "ENOENT"){
                save(); //valores iniciales (4 tipicos)
                return;
            }
            throw err;
        }
        let json = JSON.parse(data);
        if(json) {
            quizzes = json;
        }
    });
};
//Guarda las preguntas en el fichero.Guarda en formato JSON el valor de quizzes en el fihcero DB_FILENAME. Si se produce algun tipo de error, se lanza una excepcion que abortará la ejecucion del programa.
const save = () => {
    fs.writeFile(DB_FILENAME,
        JSON.stringify(quizzes),
        err => {
            if(err) throw err;
        });
};








/**
 * Devuelve el número de preguntas existentes
 * @retunrs {number} número total de preguntas existentes
 */

exports.count = () => quizzes.length;

/**
 * Añade un nuevo quiz
 * @param question String con la pregunta
 * @param answer String con la respuesta
 */
exports.add = (question, answer) =>
{
    quizzes.push({
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};
/**
 * Actualiza el quiz situado en la poscion index
 * @param id Clave que identifica el quiz a actualizar
 * @param question String con la pregunta
 * @param answer String con la respuesta
 */

exports.update = (id, question, answer) => {

    const quiz= quizzes[id];
    if(typeof quiz === "undefinde"){
        throw new Error(`El valor del parametro id no es valido`);
    }
    //Quiero quitar un elemento de esa posicion del array. EL problema es que el valor que me  de el id no estuviera correcto por eso para evitar lo que hacemos es guardarlo en esa variable. Si no existe lanzo error parametro dado no valido
    quizzes.splice(id, 1,{
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};
/**
 *Devuelve todos los quizzes existentes
 *
 * Devuelve un clon del valor guardazdo en la varibale quizzes, es decir, devuelve un objeto nuevo con todas las preguntas existentes. Para clonar quizzes se usa stringify + parse.
 *
 * @returns {any}
 */
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

//Creamos un modelo muy sencillo, un array en el que vamos a almacenar las preguntas y las respuestas. Añadir las pregtuntas y respuestas, y poder editarlas luego

exports.getByIndex = id => {
    const quiz = quizzes[id];
    if(typeof quiz === "undefined") {
        throw new Error(`EL valor del parámetro id no es válido.`);
    }
    return JSON.parse(JSON.stringify(quiz));
}
/**
 * Elimina el quiz situado en la posicion dada
 * @param id Clave que identifica el quiz a borrar
 */
exports.deleteByIndex = id => {
    const quiz = quizzes[id];
    if(typeof quiz == "undefined"){
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    quizzes.splice(id,1);
    save();
};

//Carga los quizzes almacenados en el fichero
load();

//Cambiamos el modelo en el minuto 68 para que haya persistencia y todos los cambios que vamos haciendo en un principio sobre el código y que cada vez que salimos no se guardaban, empiecen a quedarse guardados en el programa.
