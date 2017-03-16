window.onload = inicio;
function inicio(){
  var juego = new Juego();
  var temporizador = setInterval(function(){juego.controlLoop()},1000/55);
  //Enlazamos los eventos de teclado
  document.onkeydown=function(e){
    juego.pulsarTecla(e);
  };
  document.onkeyup=function(e){
    juego.soltarTecla(e);
  };

}


import Player from './Entities/player';


class Juego{
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.contexto = this.canvas.getContext('2d');
    this.canvas.width=800;
    this.canvas.height=400;
    this.gameRunning = true;
    this.canvas.style.background = 'black';

    //inicializamos los controles
    this.izquierdoPulsado=false;
	  this.derechoPulsado=false;
    this.espacioPulsado=false;

    // creamos el player
    this.player = new Player(0, 0, 35, 35, 1,this);
  }
  iniciar(){
    this.izquierdo = false;
    this.derecho = false;
    this.arriba = false;
    this.abajo = false;
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
		if (this.izquierdoPulsado && !this.derechoPulsado)
		{
			this.player.setVelocidadHorizontal(-this.player.velocidadMovimiento);
		}
		else if (!this.izquierdoPulsado && this.derechoPulsado)
		{
			this.player.setVelocidadHorizontal(this.player.velocidadMovimiento);
		}
  }


  notificarMuerte(){
    console.log('moriste');
  }

  pulsarTecla(e){
  		//Anulamos las acciones por defecto de la tecla
  		e.preventDefault();
      console.log("p"+e.keyCode);
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
  		else if (e.keyCode==39)
  		{
  			//Cursor derecho
  			this.derechoPulsado=true;
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
      console.log("s"+e.keyCode);
  		if (e.keyCode==37)
  		{
  			//Cursor izquierdo
  			this.izquierdoPulsado=false;

  		}
  		else if (e.keyCode==39)
  		{
  			//Cursor derecho
  			this.derechoPulsado=false;
  		}
  		else if (e.keyCode==32)
  		{
  			//espacio
  			this.espacioPulsado=false;
  		}
  	}
}
