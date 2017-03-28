
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
    this.running = true;

    //this.event =new  CustomEvent('coliciones', { 'data': this.colicion });
    /* Definimos el nombre del evento que es 'build'.*/
    //this.event.initEvent('coliciones', true, true);
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
  deteccionEventos(){

  }
  coliciones(){
    var that = this;

    this.bodies.map((bodyCheck,index)=>{
      /* primera forma de hacer la deteccion de la gravedad y colicion en eje y */
      for (var i = index + 1; i < that.bodies.length; i++) {

          if(bodyCheck.colicionPlataformas(that.bodies[i])){
               if(!bodyCheck.static){
                 this.setValuesOfCollition(bodyCheck,that.bodies[i]);
              //   //bodyCheck.suelo = true;
              //   bodyCheck.acc = 0;
              //   bodyCheck.time =  new Date().getTime();
              //
               }else{
                  this.setValuesOfCollition(that.bodies[i],bodyCheck);
              //   //that.bodies[i].suelo = true;
              //   that.bodies[i].acc = 0;
              //   that.bodies[i].time =  new Date().getTime();
               }
          }

      }

    });

  }
  setValuesOfCollition(first,otro){
    first.applyForce([0,0]);
    first.time =  new Date().getTime();
    // var v1 = [first.x,first.y] ;
    // var v2 = [first.x - first.width,first.y + first.height];
    // var v3 = first.y + first.height;
    // var v4 = v3
    // primero hacemos la validacion para conocer hacia donde apunta la fuerza de empuje del objeto evaluado si hacia
    // arriba o hacia abajo
    // esto de acuerdo al vector que representan lafuersa sobre los 4 ejes del que esta constituido el juego arriba, abajo, izquierda o derecha
    //&& ( ((first.x - first.width) > (otro.x + otro.height)) || ((first.x) < otro.x) )     -------  ( ((first.x + first.width) > otro.x) || ((first.x) < otro.x) )
if(otro.name == "bloque" && first.name == "jugador")   console.log((first.y + first.height) - (first.y_old + first.height)); //console.log((first.y_old + first.height)+" - "+(first.y + first.height)+ " - " + otro.y);
    var avance = (first.y + first.height) - (first.y_old + first.height);
    if(((first.y + first.height) >= otro.y) && first.vectorForce.down && !first.vectorForce.up && (first.y + first.height) <= (otro.y +  avance)){
      first.sety((otro.gety()-first.height));
      first.suelo = true;
    }

    // if(first.vectorForce.left && !first.vectorForce.right && ((first.y + first.height) < otro.y)){
    //   first.x = first.x_old;
    //   first.x = otro.x + otro.width;
    //   first.force.x = 0;
    // }


    if(first.vectorForce.down && !first.vectorForce.up){
        // console.log((first.y + first.height) +" - "+ otro.y);
        // if(((first.y + first.height) >= otro.y) &&  ){
        //   first.sety((otro.gety()-first.height));
        //   first.suelo = true;
        // }

    }
    if(!first.vectorForce.down && first.vectorForce.up && (first.y >= (otro.y + otro.height))){
      first.sety((otro.gety() + otro.height));
      body.force.y = 0;
    }
  }
  gravedadBodies(delta){
    var now = new Date().getTime();
    var that = this;

    this.bodies.map((body)=>{
      //console.log(body.force.y);
      if(!body.static){
        // para lograr esto debesmos adentrarnos en el tema de El rozamiento por deslizamiento
       // la formula para la aceleracion es igual a v
         if(body.force.x != 0){
           var acc = 0;
           if(body.force.x > 0 ){
              acc = (body.force.x - 10) / body.mass ;
              body.vectorForce.right = true;
           }else if(body.force.x < 0 ){
              acc = (body.force.x + 10) / body.mass ;
              body.vectorForce.left = true;
           }
           body.y_old = body.y;
            body.x +=acc /(1000/delta);// se aplica la fuerza de gravedad sobre el cuerpo
         }else{
           body.vectorForce.right = false;
           body.vectorForce.left = false;
         }

        // para aplicar cambios sobre el eye y
        // if(body.suelo){
        //   body.acc = 0;
        //   body.time =  new Date().getTime();
        // }else{

          // contabilisamos el tiempo que a pasado desde que el objeto cae  hasta este punto
          // esto para calcular la fuerza de gravedad aplicada a la caida de un cuerpo
          var t = (now - body.time)/(1000);

          // si se esta aplicando una fuerza sobre el eje Y y si el resultado es un numero mayo a 0 o positivo mandamos a la siguiente
          // condicion
          if(body.force.y>0 && ((-1)*((body.force.y * t) - (0.5 * (this.gravedad * (t * t))))) < 0){
              // de acuerdo a la formula de y = h + v°t - 1/2 g(t*t);
              body.y_old = body.y;
              body.y += (-1)*((body.force.y * t) - (0.5 * (this.gravedad * (t * t))));
              body.vectorForce.down = false;
              body.vectorForce.up = true;
          }else{
            // si no se esta aplicando una fuerza en el eje y y si no esta en contacto
            // con el suelo aplicamos la fuerza de gravedad
            body.vectorForce.down = true;
            body.vectorForce.up = false;
            body.force.y = 0;//se iguala a 0 la fuerza sobre el eje Y
            body.y_old = body.y;
            body.y +=((t * this.gravedad))/(1000/10);// se aplica la fuerza de gravedad sobre el cuerpo

          }
          //if(body.name == 'jugador') console.log(body.vectorForce);
        //}
      }
    });
  }

}
