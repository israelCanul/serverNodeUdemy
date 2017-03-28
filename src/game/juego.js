import Player from '../Entities/player';
import {debug} from '../config';
import World from './world';
import Body from '../engine/body';

export default class Juego{
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.contexto = this.canvas.getContext('2d');
    this.canvas.width=800;
    this.canvas.height=600;
    this.gameRunning = false;
    //this.canvas.style.background = 'yellow';
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
    this.world = new World(980,this);
    // creamos el player
    this.player = new Player(200, 0, 20, 26.8, 1,this);
    this.player.setDebug(debug);// habilito el debug de la entity    //
    this.player.setMass(3);
    this.player.setName('jugador');

    this.focus = false;

    this.world.addBody(new Body({
      static : true,
      name : 'plataforma',
      type : 'rectangle',
      x: 0,
      y: 300,
      mass : 2,
      width:  600,
      height: 1,
      color : 'black'
    }));

    this.world.addBody(this.player.getBody());

    this.world.addBody(new Body({
      static : false,
      name : 'bloque',
      type : 'rectangle',
      x: 190,
      y: 200,
      mass : 2,
      width:  15,
      height: 10,
      color : 'green'
    }));


    this.world.addBody(new Body({
      static : true,
      name : 'segundo4',
      type : 'rectangle',
      x: 100,
      y: 230,
      mass : 2,
      width:  15,
      height: 10,
      color : 'green'
    }));

    this.world.addBody(new Body({
      static : false,
      name : 'segundo4',
      type : 'rectangle',
      x: 80,
      y: 230,
      mass : 2,
      width:  3,
      height: 3,
      color : 'green'
    }));

    console.log(this.world.getBody('jugador'));
  }
  iniciar(){
    this.enemigos = [];
  }
  controlLoop(){
    var stop = false;
    document.addEventListener('coliciones', function (e) {
     console.log(e.data);
     stop = true ;
    }, false);
    if(this.gameRunning && !stop ){
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
    this.world.step(delta);
    this.player.mover(delta);
    this.world.render();
    //dibujamos al jugador
    this.player.dibujar(this.contexto);


		if (this.izquierdoPulsado && !this.derechoPulsado)
		{
        this.player.body.applyForce([-250,this.player.body.getForceY()]);


		}
		else if (!this.izquierdoPulsado && this.derechoPulsado)
		{
      this.player.body.applyForce([250,this.player.body.getForceY()]);

		}
    if (this.arribaPulsado && !this.abajoPulsado)
    {
      if(this.player.body.suelo){
        this.player.body.applyForce([this.player.body.getForceX(),130]);
      }
    }
    else if (!this.arribaPulsado && this.abajoPulsado)
    {

    }else if(!this.izquierdoPulsado && !this.derechoPulsado){
      this.player.body.applyForce([0,0]);
    }
  }
  notificarMuerte(){
    console.log('moriste');
  }
  pulsarTecla(e){
  		//Anulamos las acciones por defecto de la tecla
  		e.preventDefault();

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
    estado(e){
      this.focus = e;
    }

}
