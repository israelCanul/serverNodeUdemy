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
    //console.log(delta);
    console.log((this.x + this.width + 5));
    // console.log(((this.x - this.width - this.dx) < 0));
    //console.log(this.x);
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

    this.moverBase(delta);
  }
  colosionadoCon(otro){
		//Si hemos chocado con una nave alienígena, morimos y el juego se acaba
		if (otro instanceof Enemy)
		{
			this.juego.notificarMuerte();
		}
	}
}
