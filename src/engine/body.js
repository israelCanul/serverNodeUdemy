
export default class  Body{
  constructor(body){
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
}
