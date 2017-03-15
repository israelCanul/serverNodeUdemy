 export default class Player{
  constructor(contexto){
    this.contexto = contexto;
    this.imagen = new Image();
    this.imagen.src = 'img/sprite.png';
    this.spriteWidth = this.imagen.width / 10;
    this.spriteHeight = this.imagen.height / 4;
    this.scaleImg = 1;
    this.animacion = [];
    this.crearAnimaciones();

  }
  dibujar(){
    var ctx = this.contexto
    if(this.contexto){
      ctx.drawImage(this.imagen,this.animacion[0][0],this.animacion[0][1],this.spriteWidth,this.spriteHeight,0,0,this.getWidth(),this.getHeight());
    }
  }
  crearAnimaciones(){
    this.animMoveLeft = [[this.spriteWidth * 6,this.spriteHeight * 0],[this.spriteWidth * 7,this.spriteHeight * 0],[this.spriteWidth * 8,this.spriteHeight * 0]];
    this.animStop = [[this.spriteWidth * 0,this.spriteHeight * 0],[this.spriteWidth * 0,this.spriteHeight * 1],[this.spriteWidth * 1,this.spriteHeight * 2]];
    this.animacion = this.animStop;
  }
  getWidth(){
    return this.scaleImg * this.spriteWidth;
  }
  getHeight(){
    return this.scaleImg * this.spriteHeight;
  }
}
