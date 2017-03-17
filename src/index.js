window.onload = inicio;
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

const juego = new Juego();
document.onkeydown=function(e){
  juego.pulsarTecla(e);
};
document.onkeyup=function(e){
  juego.soltarTecla(e);
};



var reqAnimId = window.requestAnimationFrame(loop);
  function loop(){
    juego.controlLoop();
    reqAnimId = window.requestAnimationFrame(loop);
  }

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




import Player from './Entities/player';
import {debug} from './config';

class Juego{
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.contexto = this.canvas.getContext('2d');
    this.canvas.width=600;
    this.canvas.height=400;
    this.gameRunning = false;
    this.canvas.style.background = 'white';

    //inicializamos los controles
    this.izquierdoPulsado=false;
	  this.derechoPulsado=false;
    this.espacioPulsado=false;
    this.arribaPulsado = false;
    this.abajoPulsado = false;

    this.imgSprites = new Image();
    this.imgSprites.src = 'img/correrSprite.png';

    this.imgSprites.onload = function() {
        this.gameRunning = true;

    };
    // creamos el player
    this.player = new Player(500, 0, 20, 26.8, 1,this);
    this.player.setDebug(debug);// habilito el debug de la entity


  }
  iniciar(){
    this.enemigos = [];
  }
  controlLoop(){

    if(this.gameRunning){
      this.loop();
    }else{
      this.tiempoTranscurrido=new Date().getTime();
			this.gameRunning=true;
    }
  }
  loop(){
    // calculamos el tiempo delta
    var delta=(new Date().getTime()) - this.tiempoTranscurrido;
    if(Number.isNaN(delta)){
      delta = 0;
    }
    this.tiempoTranscurrido=new Date().getTime();
    this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height);
    //movemos al jugador
    this.player.mover(delta);

    //dibujamos al jugador
    this.player.dibujar(this.contexto);

    this.player.setVelocidadHorizontal(0);
    this.player.setVelocidadVertical(0);
		if (this.izquierdoPulsado && !this.derechoPulsado)
		{
			this.player.setVelocidadHorizontal(-this.player.velocidadMovimiento);
		}
		else if (!this.izquierdoPulsado && this.derechoPulsado)
		{
			this.player.setVelocidadHorizontal(this.player.velocidadMovimiento);
		}
    if (this.arribaPulsado && !this.abajoPulsado)
    {
      this.player.setVelocidadVertical(-this.player.velocidadMovimiento);
    }
    else if (!this.arribaPulsado && this.abajoPulsado)
    {
      this.player.setVelocidadVertical(this.player.velocidadMovimiento);
    }
  }


  notificarMuerte(){
    console.log('moriste');
  }

  pulsarTecla(e){
  		//Anulamos las acciones por defecto de la tecla
  		e.preventDefault();


  		//Si estamos en el dinal de una partida, se espera la pulsación ENTER
  		// if (this.esperandoTecla && e.keyCode==13)
  		// {
  		// 	this.empezarJuego();
  		// 	return;
  		// }
  		if (e.keyCode==37)
  		{
  			//Cursor izquierdo
  			this.izquierdoPulsado=true;
  		}
      else if (e.keyCode==40)
  		{
  			//espacio
  			this.abajoPulsado=true;
  		}
  		else if (e.keyCode==39)
  		{
  			//Cursor derecho
  			this.derechoPulsado=true;
  		}
      else if (e.keyCode==38)
  		{
  			//espacio
  			this.arribaPulsado=true;
  		}
  		else if (e.keyCode==32)
  		{
  			//espacio
  			this.espacioPulsado=true;
  		}

  	};
  	/**
  	*
  	*/
  	soltarTecla(e){
  		e.preventDefault();

  		if (e.keyCode==37)
  		{
  			//Cursor izquierdo
  			this.izquierdoPulsado=false;

  		}
      else if (e.keyCode==40)
  		{
  			//espacio
  			this.abajoPulsado=false;
  		}
  		else if (e.keyCode==39)
  		{
  			//Cursor derecho
  			this.derechoPulsado=false;
  		}
      else if (e.keyCode==38)
  		{
  			//espacio
  			this.arribaPulsado=false;
  		}
  		else if (e.keyCode==32)
  		{
  			//espacio
  			this.espacioPulsado=false;
  		}
  	}
}
