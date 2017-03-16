import {velPlayer} from '../config';
import Entidad from './entidad';
import Enemy from './entidad';

 export default class Player extends Entidad{
  constructor(x,y,w,h,t,juego){
    super(x,y,w,h,t,"blue");
    this.juego = juego;
    this.velocidadMovimiento = velPlayer;

  }

  mover(delta){
    // verificamos que el objeto no es fuera del canvas que el valr de x mas el ancho del objeto sea menor a
    if (this.dx<0 && this.x<10)
   {
     return;
   }
   //Si estamos en el margen derecho del mapa, no podemos movernos más a la derecha
   if (this.dx>0 && this.x>this.juego.canvas.width-(this.width+10))
   {
     return;
   }
   if (this.dy<0 && this.y<10)
  {
    return;
  }
  //Si estamos en el margen derecho del mapa, no podemos movernos más a la derecha
  if (this.dy>0 && this.y>this.juego.canvas.height-(this.height+10))
  {
    return;
  }
    this.moverBase(delta);
  }
  colosionadoCon(otro){
		//Si hemos chocado con una nave alienígena, morimos y el juego se acaba
		if (otro instanceof Enemy)
		{
			this.juego.notificarMuerte();
		}
	}
  //@sobreescribimos
  dibujar(ctx){
    //super.dibujar(ctx);
    var cabeza = [this.width - (this.width * .6) ,this.height -(this.height * .7)];
    var torzo = [this.width - (this.width * .5),this.height -(this.height * .6)];
    var pie = [this.width-(this.width * .8),this.height-(this.height * .7)]
    var brazo = [this.width-(this.width * .8),this.height-(this.height * .65)]
    // condicional para hacer debug del player
    this.debugLog('sss');
    if(this.debug){
      ctx.save();
      ctx.strokeStyle = "#FF0000";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
      ctx.save();
    }


    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x+((this.width / 2) - (cabeza[0]/2)), this.y, cabeza[0], cabeza[1]);
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x+((this.width / 2) - (torzo[0]/2)), this.y + cabeza[1], torzo[0], torzo[1]);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x+((this.width / 2) - (torzo[0]/2)), this.y + cabeza[1] + torzo[1], pie[0], pie[1]);
    ctx.fillRect(this.x+((this.width / 2) + (torzo[0]/2) - pie[0]), this.y + cabeza[1] + torzo[1], pie[0], pie[1]);
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(this.x+((this.width / 2) - (torzo[0]/2)) - brazo[0], this.y + cabeza[1], brazo[0], brazo[1]);
    ctx.fillRect(this.x+((this.width / 2) + (torzo[0]/2)), this.y + cabeza[1], brazo[0], brazo[1]);

    ctx.restore();
  }
}
