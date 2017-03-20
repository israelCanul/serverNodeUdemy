

export default class {
  constructor(gravedad,juego){
    this.gravedad = gravedad;
    this.juego = juego;
    this.bodies= [];
    this.width = juego.canvas.width;
    this.height = juego.canvas.height;

    this.event =new  CustomEvent('build', { 'detail': this.bodies });
    /* Definimos el nombre del evento que es 'build'.*/
    this.event.initEvent('coliciones', true, true);
    // Asignamos el evento.
    document.addEventListener('coliciones', function (e) {
      console.log(e.detail);
    }, false);
  }
  setGravedad(gravedad){
    this.gravedad = gravedad;
  }
  setBounds(width,height){
    this.width = width;
    this.height = height;
  }
  addBody(body){
    this.bodies.push(body);
  }
  getBody(name){
      let body = this.bodies.map((body)=>{
      if(body.name ){
        return body;
      }
    });
    return body;
  }
  render(){
    var ctx = this.juego.contexto;
    ctx.save();
    this.bodies.map((body)=>{
      ctx.fillRect(body.x, body.y, body.width, body.height);
    });
    ctx.restore();
  }
  step(){

  }

}
