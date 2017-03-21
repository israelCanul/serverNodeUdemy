
import {velPlayer} from '../config';

export default class {
  constructor(gravedad,juego){
    this.gravedad = gravedad;
    this.juego = juego;
    this.bodies= [];
    this.bodiesOnCollition=[];
    this.width = juego.canvas.width;
    this.height = juego.canvas.height;
    this.colicion = [];
    this.running = true ;
    this.event =new  CustomEvent('coliciones', { 'data': this.colicion });
    /* Definimos el nombre del evento que es 'build'.*/
    this.event.initEvent('coliciones', true, true);
    // Asignamos el evento.
    // document.addEventListener('coliciones', function (e) {
    //   console.log(e.detail);
    // }, false);
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
    if(this.running){
      ctx.save();
      this.bodies.map((body)=>{
        //console.log(body.acc);
        ctx.fillStyle = body.color;
        ctx.fillRect(body.x, body.y, body.width, body.height);
      });
      ctx.restore();
    }
  }
  step(delta){
    this.gravedadBodies(delta);
    this.coliciones();
  }
  coliciones(){
    var that = this;
    //this.bodiesOnCollition
    this.bodies.map((bodyCheck,index)=>{
      that.bodies.map((body,id)=>{
          if(parseInt(index) != parseInt(id)){

            if(bodyCheck.colision(body) && bodyCheck.name != 'plataforma'){
                bodyCheck.suelo = true;
                body.suelo = true;
            }else{
              bodyCheck.suelo = false;
              body.suelo = false;
            }
          }
      });
    });
  }
  gravedadBodies(delta){
    var now = new Date().getTime();
    var that = this;

    this.bodies.map((body)=>{
      if(!body.static){
        if(body.suelo){
          body.acc = 0;
          body.time =  new Date().getTime();
        }else{
          // para este intento vamos a simular la caida de un cuerpo por efecto de la gravedad
          body.acc += this.gravedad * delta;
          var t = (now - body.time)/1000;
          body.y =(t * body.acc )/1000;
        }
      }
    });
  }

}
