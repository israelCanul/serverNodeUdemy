 export default class Entidad {
   constructor(x,y,w,h,t,c){

     // coordenada actual en el eje x
     this.x = x;
     // coordenada actual en el eje y
     this.y = y;
     //  el ancho del objeto
     this.width = w;
     // el alto del objeto
     this.height = h;
     // el tipo de objeto
     this.tipo = t;
     // velocidad en el eje x
     this.dx = 0;
     // velocidad en el eje y
     this.dy = 0;
     // el color del objeto
     this.color = c;

   }

   moverBase(delta){
     //Actualizamos las posiciones de las coordenadas
     this.x += (delta * this.dx)/1000;
     this.y+=(delta * this.dy)/1000;
   }
   dibujar(ctx){
     ctx.save();
     //ctx.drawImage(this.imagen,this.spriteWidth * 6,this.spriteHeight * 3,this.spriteWidth,this.spriteHeight,this.x,this.y,this.getWidth(),this.getHeight());
     ctx.fillStyle = this.color;
 		 ctx.fillRect(this.x, this.y, this.width, this.height);
     ctx.restore();
   }
   //determinamos si hay colicion con respecto a otro
   colision(otro){
     if (this.x + this.ancho < otro.x) {
       return false;
     }
     if (this.y + this.alto < otro.y) {
       return false;
     }
     if (this.x > otro.x + otro.ancho) {
       return false;
     }
     if (this.y > otro.y + otro.alto) {
       return false;
     }
     return true;
   }
   setVelocidadHorizontal(dxIni){
   		this.dx=dxIni;

   }
   setVelocidadVertical(dyIni){
   		this.dy=dyIni;
   }
}