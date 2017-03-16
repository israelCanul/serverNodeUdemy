

 export default class Player{
  constructor(contexto){
    this.contexto = contexto;
    this.imagen = new Image();
    this.imagen.src = 'img/sprite.png';
    this.spriteWidth = this.imagen.width / 10;
    this.spriteHeight = this.imagen.height / 4;
    this.scaleImg = 0.8;
    this.animacion = [];
    this.crearAnimaciones();
    this.cont= 0;
  }
  dibujar(){
    var ctx = this.contexto
    if(this.contexto){
      let fotograma = this.animar();
      this.cont++;// contador de la animacion
      ctx.drawImage(this.imagen,fotograma[0],fotograma[1],this.spriteWidth,this.spriteHeight,0,0,this.getWidth(),this.getHeight());
    }
  }
  crearAnimaciones(){
    this.animMoveRight = [[this.spriteWidth * 6,this.spriteHeight * 0],[this.spriteWidth * 7,this.spriteHeight * 0],[this.spriteWidth * 8,this.spriteHeight * 0]];
    this.animMoveLeft = [[this.spriteWidth * 6,this.spriteHeight * 0],[this.spriteWidth * 7,this.spriteHeight * 0],[this.spriteWidth * 8,this.spriteHeight * 0]];
    this.animStop = [[this.spriteWidth * 0,this.spriteHeight * 0],[this.spriteWidth * 0,this.spriteHeight * 0],[this.spriteWidth * 1,this.spriteHeight * 0],[this.spriteWidth * 1,this.spriteHeight * 0],[this.spriteWidth * 2,this.spriteHeight * 0],[this.spriteWidth * 2,this.spriteHeight * 0]];
    this.animMoveUp = [[this.spriteWidth * 6,this.spriteHeight * 0],[this.spriteWidth * 7,this.spriteHeight * 0],[this.spriteWidth * 8,this.spriteHeight * 0]];
    this.animMoveDown = [[this.spriteWidth * 6,this.spriteHeight * 0],[this.spriteWidth * 7,this.spriteHeight * 0],[this.spriteWidth * 8,this.spriteHeight * 0]];
    this.animacion = this.animMoveLeft;
  }
  getWidth(){
    return this.scaleImg * this.spriteWidth;
  }
  getHeight(){
    return this.scaleImg * this.spriteHeight;
  }
  animar(){
    if(this.cont == this.animacion.length){
      this.cont = 0;
    }
    return [this.animacion[this.cont][0],this.animacion[this.cont][1]];
  }
}
