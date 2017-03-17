//import Juego from './game/juego';
import Juego from './game/pruebas';


window.onload = iniciar;
function inicio(){
const juego = new Juego();
  var temporizador = setInterval(function(){juego.controlLoop()},1000/55);
  //Enlazamos los eventos de teclado
  document.onkeydown=function(e){
    juego.pulsarTecla(e);
  };
  document.onkeyup=function(e){
    juego.soltarTecla(e);
  };
}



function iniciar(){

//const juego = new Juego();

// document.onkeydown=function(e){
//   juego.pulsarTecla(e);
// };
// document.onkeyup=function(e){
//   juego.soltarTecla(e);
// };
// var reqAnimId = window.requestAnimationFrame(loop);
//   function loop(){
//     juego.controlLoop();
//     reqAnimId = window.requestAnimationFrame(loop);
//   }

}

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!window.a)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
