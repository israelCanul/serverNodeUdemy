import Physics from 'physicsjs';

const world = Physics({
    // set the timestep
    timestep: 1000.0 / 160,
    // maximum number of iterations per step
    maxIPF: 16,
    // set the integrator (may also be set with world.add())
    integrator: 'verlet',
    sleepDisabled: false,
});

export default Physics(function(world){

  var viewWidth = 500;
  var viewHeight = 300;

  var renderer = Physics.renderer('canvas', {
    el: 'canvas',
    width: viewHeight,
    height: viewHeight,
    meta: true, // don't display meta data
    styles: {
        // set colors for the circle bodies
        'circle' : {
            strokeStyle: '#351024',
            lineWidth: 1,
            fillStyle: '#d33682',
            angleIndicator: '#351024'
        }
    }
  });

  // add the renderer
  world.add( renderer );
  // render on each step
  world.on('step', function(){

    //console.log(world._bodies[0].aabb());
    world.render();
  });

  // bounds of the window
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
  var bh = Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.1,
      cof: 1
  });
var bc = Physics.behavior('body-collision-detection');

world.on('collisions:detected', function( data ){
    console.log(data);
});


// subscribe to collision pair
world.on('collision-pair', function( data ){
    // data.bodyA; data.bodyB...

});

  // constrain objects to these bounds
  world.add(bh);
  var asss = Physics.body('circle', {
    x: 50, // x-coordinate
    y: 30, // y-coordinate
    vx: 0.2, // velocity in x-direction
    vy: 0.01, // velocity in y-direction
    radius: 20,
    mass : 17,
    restitution : 0.5,
    cof:1,
  });
  asss.options({
    name : 'circulito'
  })
  // add a circle
  world.add(
      asss
  );
  world.add(
      Physics.body('circle', {
        x: 60, // x-coordinate
        y: 30, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 20,
        mass : 1,
        restitution : 1,

      })
  );

  // ensure objects bounce when edge collision is detected
  world.add( Physics.behavior('body-impulse-response') );
  world.add (bc);
  // add some gravity
  world.add( Physics.behavior('constant-acceleration') );

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function( time, dt ){

      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

});
