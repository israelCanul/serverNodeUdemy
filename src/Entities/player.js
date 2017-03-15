 export default class Player{
  constructor(contexto){
    console.log('entro');
    this.contexto = contexto;
    this.dibujar();
  }
  dibujar(){
    var ctx = this.contexto;
    if(this.contexto){
      ctx.fillRect(25,25,100,100);
      ctx.clearRect(45,45,60,60);
      ctx.fillRect(50,50,50,50);
    }
  }
}
