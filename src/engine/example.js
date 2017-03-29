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
//if(otro.name == "bloque" && first.name == "jugador")   console.log((first.y + first.height) - (first.y_old + first.height)); //console.log((first.y_old + first.height)+" - "+(first.y + first.height)+ " - " + otro.y);
var avance = (first.y + first.height) - (first.y_old + first.height);
if(((first.y + first.height) >= otro.y) && first.vectorForce.down && !first.vectorForce.up && (first.y + first.height) <= (otro.y +  avance)){
  first.sety((otro.gety()-first.height));
  first.suelo = true;
}
if(first.vectorForce.left && !first.vectorForce.right && (first.y + first.height) > (otro.y +  avance) ){
  first.setx((otro.getx()+otro.width));
}else if( !first.vectorForce.left && first.vectorForce.right && (first.y + first.height) > (otro.y +  avance) && (first.y + first.height) <= (otro.y + otro.height)){
  first.setx((otro.getx()-first.width));
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
