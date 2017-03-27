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
    // this.world.addBody(new Body({
    //   static : true,
    //   name : 'plataforma',
    //   type : 'rectangle',
    //   x: 496,
    //   y: 100,
    //   mass : 2,
    //   width:  5,
    //   height: 5,
    //   color : 'black'
    // }));
    // this.world.addBody(new Body({
    //   static : false,
    //   name : 'segundo',
    //   type : 'rectangle',
    //   x: 10,
    //   y: 10,
    //   mass : 2,
    //   width:  10,
    //   height: 10,
    //   color : 'blue'
    // }));
    // this.world.addBody(new Body({
    //   static : false,
    //   name : 'segundo4',
    //   type : 'rectangle',
    //   x: 230,
    //   y: 10,
    //   mass : 2,
    //   width:  10,
    //   height: 10,
    //   color : 'green'
    // }));
    //
    this.world.addBody(new Body({
      static : false,
      name : 'segundo4',
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

    // this.world.addBody(new Body({
    //   static : false,
    //   name : 'segundo2',
    //   type : 'rectangle',
    //   x: 100,
    //   y: 280,
    //   mass : 2,
    //   width:  11,
    //   height: 11,
    //   color : 'blue'
    // }));

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

    this.player.setVelocidadHorizontal(0);
    this.player.setVelocidadVertical(0);
		if (this.izquierdoPulsado && !this.derechoPulsado)
		{
        this.player.body.applyForce([-250,this.player.body.getForceY()]);
			this.player.setVelocidadHorizontal(-this.player.velocidadMovimiento);

		}
		else if (!this.izquierdoPulsado && this.derechoPulsado)
		{
      this.player.body.applyForce([250,this.player.body.getForceY()]);
			this.player.setVelocidadHorizontal(this.player.velocidadMovimiento);
		}
    if (this.arribaPulsado && !this.abajoPulsado)
    {
      this.player.setVelocidadVertical(-this.player.velocidadMovimiento);
      this.player.body.applyForce([this.player.body.getForceX(),130]);
      //console.log(this.player.body);
    }
    else if (!this.arribaPulsado && this.abajoPulsado)
    {

      this.player.setVelocidadVertical(this.player.velocidadMovimiento);
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
    estado(e){
      this.focus = e;
    }

}
