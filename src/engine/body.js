
export default class  Body{
  constructor(body,fuerza = {x : 0,y : 0}){
      this.static= body.static;
      this.name= body.name;
      this.type= body.type;
      this.x= body.x;
      this.y= body.y;
      this.mass= body.mass;
      this.width= body.width;
      this.height= body.height;
      this.acc= 0;
      this.suelo = false;
      this.time = new Date().getTime();
      this.color = body.color;
      this.force = fuerza;
  }
  colision(otro){
    if (this.x + this.width < otro.x) {
      return false;
    }
    if (this.y + this.height < otro.y) {
      return false;
    }
    if (this.x > otro.x + otro.width) {
      return false;
    }
    if (this.y > otro.y + otro.height) {
      return false;
    }
    return true;
  }
  colicionPlataformas(otro){
    var colicion = true;
    if (this.x + this.width <= otro.x) {
      colicion = false;
    }
    if (this.y + this.height < otro.y) {
      colicion  = false;
    }
    if (this.x >= otro.x + otro.width) {
      colicion  = false;
    }
    if (this.y > otro.y + otro.height) {
      colicion  = false;
    }
    if (this.y + this.height > otro.y && this.y < otro.y && colicion) {
      colicion  = true;
    }
    return colicion;
  }
  getx(){
    return this.x;
  }
  gety(){
    return this.y;
  }
  setx(x){
    this.x = x;
  }
  sety(y){
    this.y = y;
  }
  applyForce(fuerza){
    this.force.y = fuerza[1];
    if(this.force.y>0){
      this.suelo = false;
    }
    this.force.x = fuerza[0];
  }
  getForceY(){
    return this.force.y;
  }
  getForceX(){
    return this.force.x;
  }
}
