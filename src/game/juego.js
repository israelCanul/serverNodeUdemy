import Player from '../Entities/player';
import {debug} from '../config';
import World from './world';


export default class Juego{
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
    // creamoe el mundo(world)
    this.world = new World(9.8,this);
    // creamos el player
    this.player = new Player(500, 0, 20, 26.8, 1,this);
    this.player.setDebug(debug);// habilito el debug de la entity    //
    this.player.setName('jugador');


    this.world.addBody(this.player.getBody());
    console.log(this.world.getBody('jugador'));
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
      document.dispatchEvent(this.world.event)
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
    this.world.step();
    this.world.render();
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
