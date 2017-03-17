/**********************************/
/* Juan Gabriel Rodríguez Carrión */
/*    jlabstudio.com       2011   */
/**********************************/

/**
* Ésta clase será la que arranque y gestione la lógica del juego, y de
* preparar el contexto gráfico donde dibujarlo. Además también se encargará
* de leer los eventos del teclado para controlar al jugador.
*
* El bucle principal del juego se encargará de hacer que cada entidad se mueva,
* y luego de que se dibuje en el lugar adecuado. También controlará los movimientos
* de la nave del jugador.
*
* Como clase mediadora, recibirá información de algunos eventos que ocurran
* (por ejemplo, la destrucción de un alien, o la muerte del jugador) y realizará
* las acciones apropiadas.
*/
function Juego(){
	//Div creado donde mostraremos los mensajes de final de partida
	this.panel;
	//El canvas en el que se va a dibujar
	this.canvas;
	//El contexto gráfico donde dibujar todo el juego
	this.contexto;
	//Lista de entidades (aliens y disparos) a gestionar
	this.listaEntidades=[];
	//Lista de entidades a eliminar en el siguiente ciclo del bucle principal
	this.listaEntidadesEliminar=[];
	//Nave del jugador
	this.nave;
	//Velocidad de movimiento horizontal del jugador (pixels/segundo)
	this.velocidadMovimiento=300;
	//Tiempo transcurrido desde el últimio disparo
	this.ultimoDisparo=0;
	//Intervalor de tiempo que tiene que pasar entre disparos en milisegundos
	this.intervaloDisparo=500;
	//El número de alines que quedan
	this.contadorAliens;

	//True si el juego está funcionando
	this.gameRunning=false;
	//True si en la siguiente ciclo del bucle debe hacerse alguna comprobación lógica
	this.logicaRequerida=false;

	//True si el juego está detenido por algún motivo (game over, pantalla completada, etc)
	this.esperandoTecla=false;
	//Teclas pulsadas en un momento dado
	this.izquierdoPulsado=false;
	this.derechoPulsado=false;
	this.espacioPulsado=false;

	this.tiempoTranscurrido;
	/**
	* Prepara el canvas para construir el juego
	*/
	this.constructor=function(idCanvas){
		//Recuperamos el contexto gráfico donde dibujar
		this.canvas=document.getElementById(idCanvas);
		this.canvas.width=800;
		this.canvas.height=600;
		this.canvas.style.backgroundColor="black";
		this.contexto=this.canvas.getContext('2d');

		//Creamos y posicionamos el panel de los mensajes justo encima del canvas
		this.panel=document.createElement("div");
		this.panel.style.display="none";
		this.panel.style.position="absolute";
		this.panel.style.top=this.canvas.offsetTop;
		this.panel.style.left=this.canvas.offsetLeft;
		this.panel.style.width=this.canvas.width;
		this.panel.style.height=this.canvas.height;
		this.panel.style.paddingTop="250px";
		this.panel.style.textAlign="center";
		this.panel.style.color="yellow";
		this.panel.style.fontSize="x-large";

		document.body.appendChild(this.panel);
		//Iniciamos las entidades
		this.iniciarEntidades();
	};

	/**
	* Devuelve la anchura del canvas
	*/
	this.getAnchuraCanvas=function(){
		return this.canvas.width;
	};
	/**
	* Resetea las variables necesarias para comenzar una partida
	*/
	this.empezarJuego=function(){
		this.listaEntidades=[];
		this.listaEntidadesEliminar=[];
		this.iniciarEntidades();

		this.izquierdoPulsado=false;
		this.derechoPulsado=false;
		this.espacioPulsado=false;

		this.tiempoTranscurrido=new Date().getTime();
		this.esperandoTecla=false;
	};

	/**
	* Resetea las entidades al estado de inicio (nave y aliens).
	*/
	this.iniciarEntidades=function(){
		//Crea la nave del jugador en el centro de la pantalla.
		this.nave=new EntidadNave();
		this.nave.constructor(this,370,550);
		this.listaEntidades.push(this.nave);

		//Crea el bloque de aliens (4 filas con 12 aliens espaciados en cada una)
		this.contadorAliens=0;
		for (var fila=0;fila<5;fila++)
		{
			for (var i=0;i<12;i++)
			{
				var alien=new EntidadAlien();
				alien.constructor(this,100+i*50,50+fila*30);
				this.listaEntidades.push(alien);
				this.contadorAliens++;
			}
		}
	};

	/**
	* Notificaciones de las entidades del juego que requieren comprobar alguna lógica
	* del juego en la próxima oportunidad (normalmente como resultado de algún evento
	* del juego)
	*/
	this.actualizaLogica=function(){
		this.logicaRequerida=true;
	};


	/**
	* Introduce en la lista de entidades a eliminar, la nueva entidad
	*
	* entidad es la entidad a eliminar
	*/
	this.eliminarEntidad=function(entidad){
		this.listaEntidadesEliminar.push(entidad);
	};

	/**
	* Notificación de que el jugador ha muerto, y por consiguiente, perdido la partida
	*/
	this.notificarMuerte=function(){
		this.panel.innerHTML="La tierra ha sido destruida tras una invasion alienígena por tu culpa.<br/>Presiona ENTER para intentarlo de nuevo.";
		this.esperandoTecla=true;
	};
	/**
	* Notificación de que el jugador ha ganado la partida
	*/
	this.notificarVictoria=function(){
		this.panel.innerHTML="¡Felicidades! ¡De momento seguimos vivos, pero se acercan nuevos enemigos!<br/>Presiona ENTER para atacarlos.";
		this.esperandoTecla=true;
	};

	/**
	* Notificación de que un Alien ha sido alcanzado por un disparo
	*/
	this.notificarAlienDestruido=function(){
		//Decrementamos el contador de alines.
		this.contadorAliens--;
		//Si no queda ninguno, hemos ganado la partida
		if (this.contadorAliens==0)
		{
			this.notificarVictoria();
		} else
		{
			//Incrementamos la velocidad horizontal un 2% de todos las entidades del tipo alien que queden.
			var n=this.listaEntidades.length;
			for (var i=0;i<n;i++)
			{
				if (this.listaEntidades[i] instanceof EntidadAlien)
				{
					this.listaEntidades[i].setVelocidadHorizontal(this.listaEntidades[i].getVelocidadHorizontal()*1.02);
				}
			}
		}
	};

	/**
	* La nave del jugador intenta disparar. Si ha pasado tiempo suficiente desde
	* el último disparo, se procede con el nuevo.
	*/
	this.intentarDisparar=function(){
		//Si estamos esperando que se pulse la tecla ENTER, es que estamos en el final de una partida
		if (this.esperandoTecla)
		{
			return;
		}
		//Comprobamos que se pueda disparar, según el tiempo transcurrido desde el último disparo
		var t=new Date().getTime();
		if (t-this.ultimoDisparo<this.intervaloDisparo)
		{
			return;
		}
		this.ultimoDisparo=t;
		var disparo=new EntidadDisparo();
		disparo.constructor(this,this.nave.getX()+19, this.nave.getY());
		this.listaEntidades.push(disparo);
	};

	/**
	* Bucle principal del juego
	*/
	this.loop=function(){
		if (this.gameRunning)
		{
			//Calculamos el tiempo delta
			var delta=(new Date().getTime()) - this.tiempoTranscurrido;
			this.tiempoTranscurrido=new Date().getTime();
			//Borramos todo lo que haya en el canvas.
			this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height);
			//Movemos cada entidad según el tiempo delta transcurrido
			var n=this.listaEntidades.length;
			if (!this.esperandoTecla)
			{
				for (var i=0;i<n;i++)
				{
					this.listaEntidades[i].mover(delta);
				}
			}
			//Dibujamos todas las entidades
			for (var i=0;i<n;i++)
			{
				this.listaEntidades[i].dibujar(this.contexto);
			}
			//Detección de las colisiones de las entidades
			for(var i=0;i<n-1;i++)
			{
				for(var j=i+1;j<n;j++)
				{
					var uno=this.listaEntidades[i];
					var otro=this.listaEntidades[j];
					if (uno.getTipo()!=otro.getTipo() && uno.colision(otro))
					{
						uno.colosionadoCon(otro);
						otro.colosionadoCon(uno);
					}
				}
			}

			//Eliminamos las entidades que estén en la lista a eliminar
			var m=this.listaEntidadesEliminar.length;
			for(var i=0;i<m;i++)
			{
				var n=this.listaEntidades.length;
				for(var j=0;j<n;j++)
				{
					if (this.listaEntidadesEliminar[i]==this.listaEntidades[j])
					{
						this.listaEntidades.splice(j,1);
						break;
					}
				}
			}
			this.listaEntidadesEliminar=[];
			//Si algun alien ha llegado a algún margen del mapa, le decimos a cada alien que cambie
			//sentido de movimiento y se deplace un poco hacia abajo, según su lógica de movimientos
			if (this.logicaRequerida)
			{
				var n=this.listaEntidades.length;
				for (var i=0;i<n;i++)
				{
					this.listaEntidades[i].logica();
				}
				this.logicaRequerida=false;
			}
			//Si se está esperando que se pulse ENTER, es que estamos en el final de una partida, y hay que mostrar
			//el panel de mensajes por HTML
			if (this.esperandoTecla)
			{
				this.panel.style.display="block";
			}
			else
			{
				this.panel.style.display="none";
			}

			//Resolvemos los movimientos y disparos de la nave según las teclas pulsadas
			this.nave.setVelocidadHorizontal(0);
			if (this.izquierdoPulsado && !this.derechoPulsado)
			{
				this.nave.setVelocidadHorizontal(-this.velocidadMovimiento);
			}
			else if (!this.izquierdoPulsado && this.derechoPulsado)
			{
				this.nave.setVelocidadHorizontal(this.velocidadMovimiento);
			}
			if (this.espacioPulsado)
			{
				this.intentarDisparar();
			}
		}
	};

	/**
	* Método de control para hacer que cuando se arranque el juego, el
	* tiempo delta tenga un valor apropiado
	*/
	this.controlLoop=function(){
		if (this.gameRunning)
		{
			this.loop();
		}
		else
		{
			this.tiempoTranscurrido=new Date().getTime();
			this.gameRunning=true;
		}
	};

	/**
	* Notificación de tecla pulsada
	*
	* e tecla pulsada
	*/
	this.pulsarTecla=function(e){
		//Anulamos las acciones por defecto de la tecla
		e.preventDefault();

		//Si estamos en el dinal de una partida, se espera la pulsación ENTER
		if (this.esperandoTecla && e.keyCode==13)
		{
			this.empezarJuego();
			return;
		}
		if (e.keyCode==37)
		{
			//Cursor izquierdo
			this.izquierdoPulsado=true;
		}
		else if (e.keyCode==39)
		{
			//Cursor derecho
			this.derechoPulsado=true;
		}
		else if (e.keyCode==32)
		{
			//espacio
			this.espacioPulsado=true;
		}

	};
	/**
	*
	*/
	this.soltarTecla=function(e){
		e.preventDefault();
		if (e.keyCode==37)
		{
			//Cursor izquierdo
			this.izquierdoPulsado=false;

		}
		else if (e.keyCode==39)
		{
			//Cursor derecho
			this.derechoPulsado=false;
		}
		else if (e.keyCode==32)
		{
			//espacio
			this.espacioPulsado=false;
		}
	};
}




// crearAnimaciones(){
//   this.animMoveRight = [[this.spriteWidth * 6,this.spriteHeight * 3],[this.spriteWidth * 7,this.spriteHeight * 3],[this.spriteWidth * 8,this.spriteHeight * 0]];
//   this.animMoveLeft = [[this.spriteWidth * 6,this.spriteHeight * 0],[this.spriteWidth * 7,this.spriteHeight * 0],[this.spriteWidth * 8,this.spriteHeight * 0]];
//   this.animStop = [[this.spriteWidth * 0,this.spriteHeight * 0],[this.spriteWidth * 2,this.spriteHeight * 0]];
//   this.animMoveDown = [[this.spriteWidth * 0,this.spriteHeight * 0],[this.spriteWidth * 1,this.spriteHeight * 0],[this.spriteWidth * 2,this.spriteHeight * 0]];
//   this.animMoveUp = [[this.spriteWidth * 3,this.spriteHeight * 0],[this.spriteWidth * 4,this.spriteHeight * 0],[this.spriteWidth * 5,this.spriteHeight * 0]];
//   this.animacion = this.animStop ;
//   //this.animar();
//   this.fotograma = [this.animacion[0][0],this.animacion[0][1]];
// }



// animar(){
// 	var that = this;
// 	window.setInterval(function(){
// 		if(that.cont == that.animacion.length){
// 			that.cont = 0;
// 		}
// 		console.log(that.cont);
// 		that.fotograma = [that.animacion[that.cont][0],that.animacion[that.cont][1]];
// 		that.cont++;//
// 	},1000/5);
// }












//@sobreescribimos
dibujar(ctx){
	//super.dibujar(ctx);
	var cabeza = this.cabeza;
	var torzo = this.torzo;
	var brazo = this.brazo;
	// condicional para hacer debug del player
	this.debugLog('sss');
	if(this.debug){
		ctx.save();
		ctx.fillStyle = 'yellow';
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	}

	ctx.save();

	ctx.fillStyle = 'black';
	ctx.fillRect(this.x+((this.width / 2) - (cabeza[0]/2)), this.y, cabeza[0], cabeza[1]);
	ctx.fillStyle = '#750A0A';
	ctx.fillRect(this.x+((this.width / 2) - (torzo[0]/2)), this.y + cabeza[1], torzo[0], torzo[1]);
	ctx.fillStyle = '#00ffff';
	// aqui se dibuja los brazos
	if(this.juego.derechoPulsado){
		ctx.fillRect(this.x+((this.width / 2) - (brazo[0]/2)), this.y + cabeza[1], brazo[0], brazo[1]);
		//ctx.fillRect(this.x+((this.width / 2) + (torzo[0]/2)), this.y + cabeza[1], brazo[0], brazo[1]);
	}else if(this.juego.izquierdoPulsado){
		ctx.fillRect(this.x+((this.width / 2) - (torzo[0]/2)) - brazo[0], this.y + cabeza[1], brazo[0], brazo[1]);
		ctx.fillRect(this.x+((this.width / 2) + (torzo[0]/2)), this.y + cabeza[1], brazo[0], brazo[1]);
	}else{
		ctx.fillRect(this.x+((this.width / 2) - (torzo[0]/2)) - brazo[0], this.y + cabeza[1], brazo[0], brazo[1]);
		ctx.fillRect(this.x+((this.width / 2) + (torzo[0]/2)), this.y + cabeza[1], brazo[0], brazo[1]);
	}
	this.drawPies(ctx);

	ctx.fill();
	ctx.restore();
	if(this.pos==8){
		this.pos=0;
	}else{
		this.pos++;
	}

}
drawPies(ctx){
	/*
	no valido para posicion inicial
	//ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);//derecho
	*/

	ctx.fillStyle = '#0000ff';
	if(this.juego.derechoPulsado){
		switch (this.pos) {
			case 0:
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);// izquierdo
			//izquierdo
				break;
			case 1:
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);// izquierdo
			//izquierdo
				break;
			case 2:
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0]), this.y + this.cabeza[1] + this.torzo[1]  , this.pie[0], (this.pie[1]/2));// izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
			//izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);//derecho

				break;
			case 3:
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0]), this.y + this.cabeza[1] + this.torzo[1]  , this.pie[0], (this.pie[1]/2));// izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
			//izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);//derecho

				break;
			case 4:

			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1]  , this.pie[0], (this.pie[1]/2));// izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
			//izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], (this.pie[1]/2));//derecho
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo

				break;
			case 5:

			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1]  , this.pie[0], (this.pie[1]/2));// izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
			//izquierdo
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], (this.pie[1]/2));//derecho
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo

				break;
			case 6:
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);//derecho
			//izquierdp
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], (this.pie[1]/2));//derecho
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo

				break;
			case 7:
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);//derecho
			//izquierdp
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], (this.pie[1]/2));//derecho
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo

				break;
			default:
			ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);// izquierdo
			//izquierdo

		}

		/*posicion [0]
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);// izquierdo
		 //izquierdo
*/

		 /* posicion [1]
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0]), this.y + this.cabeza[1] + this.torzo[1]  , this.pie[0], (this.pie[1]/2));// izquierdo
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
		 //izquierdo
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);//derecho
*/
		 /* posicion [2]
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1]  , this.pie[0], (this.pie[1]/2));// izquierdo
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) + (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
		 //izquierdo
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], (this.pie[1]/2));//derecho
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
*/
		 /* posicion [3]
		 //derecho`
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);//derecho
		 //izquierdp
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0]/2), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], (this.pie[1]/2));//derecho
		 ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)) - (this.pie[0] * 1.5), this.y + this.cabeza[1] + this.torzo[1] + (this.pie[1]/2)  , this.pie[0], (this.pie[1]/2));// izquierdo
*/



		// ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);
		// ctx.fillRect(this.x+((this.width / 2) - (this.pie[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);

	}else if(this.juego.izquierdoPulsado){
		ctx.fillRect(this.x+((this.width / 2) - (this.torzo[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);
		ctx.fillRect(this.x+((this.width / 2) - (this.torzo[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);
	}else{
		ctx.fillRect(this.x+((this.width / 2) + (this.torzo[0]/2) - this.pie[0]), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);
		ctx.fillRect(this.x+((this.width / 2) - (this.torzo[0]/2)), this.y + this.cabeza[1] + this.torzo[1], this.pie[0], this.pie[1]);
	}

}
