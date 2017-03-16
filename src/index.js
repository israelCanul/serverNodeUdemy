window.onload = inicio;
function inicio(){
  var juego = new Juego();
  var temporizador = setInterval(function(){juego.controlLoop()},60);
}


import Player from './Entities/player';


class Juego{
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.contexto = this.canvas.getContext('2d');
    this.canvas.width=400;
    this.canvas.height=200;
    this.gameRunning = true;
    this.canvas.style.backgroundColor="black";

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
    var delta=Math.min(1000/60 ,(new Date().getTime()) - this.tiempoTranscurrido)/1000;
    this.tiempoTranscurrido=new Date().getTime();
    this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height);
    //dibujamos al jugador
    this.player.dibujar();
  }

}
