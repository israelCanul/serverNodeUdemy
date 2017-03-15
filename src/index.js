window.onload = inicio;
function inicio(){
  var juego = new Juego();
  var temporizador = setInterval(function(){juego.controlLoop()},25);
}


import Player from './Entities/player';


class Juego{
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.contexto = this.canvas.getContext('2d');
    this.canvas.width=800;
    this.canvas.height=600;
    this.gameRunning = true;
    //this.canvas.style.backgroundColor="black";
    //if(this.canvas.getContext){
    //   var ctx = this.canvas.getContext('2d');
    //   ctx.fillRect(25,25,100,100);
    //   ctx.clearRect(45,45,60,60);
    //   ctx.fillRect(50,50,50,50);
    // }
    //this.temporizador = setInterval(this.loop(),25);
    //this.iniciar();



    // creamos el player
    this.player = new Player(this.contexto);
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
    this.tiempoTranscurrido=new Date().getTime();
    this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height);
    //dibujamos al jugador 
    this.player.dibujar();
  }

}
