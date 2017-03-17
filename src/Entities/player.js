import {velPlayer} from '../config';
import Entidad from './entidad';
import Enemy from './entidad';

 export default class Player extends Entidad{
  constructor(x,y,w,h,t,juego){
    super(x,y,w,h,t,"blue");
    this.juego = juego;
    this.velocidadMovimiento = velPlayer;
    // this.cabeza = [this.width - (this.width * .6) ,this.height -(this.height * .7)];
    // this.torzo = [this.width - (this.width * .5),this.height -(this.height * .65)];
    // this.pie = [this.width-(this.width * .8),this.height-(this.height * .65)]
    // this.brazo = [this.width-(this.width * .8),this.height-(this.height * .65)]
    this.pos = 0;
    this.sprite = {
      correrR : [5,0,1,2,3,4,5],
      correrL : [6,7,8,9,10,11],
      stop : [12]
    }
    this.animContador = 0;
    this.frameDraw = 0;
    this.frame = 0;
    this.frames = 3;


    //  el ancho del objeto
    this.widthImg = 100;
    // el alto del objeto
    this.heightImg = 134;
  }
  sincronizarFrames(){
    let frame = this.frame;
    let frames = this.frames;
        if (frame < frames){
            this.frame++;
            console.log('s');
            return true;
        } else {
            this.frame = 0;
        }
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

    this.setFrame();
    this.moverBase(delta);
  }
  colosionadoCon(otro){
		//Si hemos chocado con una nave alienígena, morimos y el juego se acaba
		if (otro instanceof Enemy)
		{
			this.juego.notificarMuerte();
		}
	}
  setFrame(){

    if(this.sincronizarFrames()) return;

    if(this.juego.derechoPulsado){
      this.animContador++;
      if(this.animContador >= this.sprite.correrR.length){
        this.animContador=0;
      }

      this.frameDraw = this.sprite.correrR[this.animContador];

    }else if(this.juego.izquierdoPulsado){
          this.animContador++;
          if(this.animContador >= this.sprite.correrL.length){
            this.animContador=0;
          }
          this.frameDraw = this.sprite.correrL[this.animContador];

    }else{
      this.animContador++;
      if(this.animContador >= this.sprite.stop.length){
        this.animContador=0;
      }
      this.frameDraw = this.sprite.stop[this.animContador];
    }
  }

  dibujar(ctx){

    ctx.drawImage(this.juego.imgSprites,((this.juego.imgSprites.width/(this.juego.imgSprites.width/this.widthImg))*this.frameDraw), 0,this.widthImg,this.heightImg, this.x, this.y,this.width, this.height);
  }

}
