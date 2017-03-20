import Physics from 'physicsjs';

var world = Physics();

  var viewWidth = 500;
  var viewHeight = 300;

  var renderer = Physics.renderer('canvas', {
    el: 'canvas',
    width: viewWidth,
    height: viewHeight,
    meta: false, // don't display meta data
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
    console.log('asas');
    world.render();
  });

  // bounds of the window
  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  // constrain objects to these bounds
  world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.99
  }));

  // add a circle
  world.add(
      Physics.body('circle', {
        x: 50, // x-coordinate
        y: 30, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 20
      })
  );

  world.add(Physics.body('convex-polygon', {
    // place the center of the square at (0, 0)
    x: 0,
    y: 0,
    vertices: [
        { x: 0, y: 0 },
        { x: 0, y: 20 },
        { x: 20, y: 20 },
        { x: 20, y: 0 }
    ]
}));

  // ensure objects bounce when edge collision is detected
  world.add( Physics.behavior('body-impulse-response') );
   // add some gravity
  world.add( Physics.behavior('constant-acceleration') );
  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function( time, dt ){
    console.log(time);
      world.step();
  });
  // start the ticker
  Physics.util.ticker.start();




export default world;

// Physics(function(world){
//
//   var viewWidth = 500;
//   var viewHeight = 300;
//
//   var renderer = Physics.renderer('canvas', {
//     el: 'canvas',
//     width: viewWidth,
//     height: viewHeight,
//     meta: false, // don't display meta data
//     styles: {
//         // set colors for the circle bodies
//         'circle' : {
//             strokeStyle: '#351024',
//             lineWidth: 1,
//             fillStyle: '#d33682',
//             angleIndicator: '#351024'
//         }
//     }
//   });
//
//   // add the renderer
//   world.add( renderer );
//   // render on each step
//   world.on('step', function(){
//     console.log('asas');
//     world.render();
//   });
//
//   // bounds of the window
//   var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
//
//   // constrain objects to these bounds
//   world.add(Physics.behavior('edge-collision-detection', {
//       aabb: viewportBounds,
//       restitution: 0.99,
//       cof: 0.99
//   }));
//
//   // add a circle
//   world.add(
//       Physics.body('circle', {
//         x: 50, // x-coordinate
//         y: 30, // y-coordinate
//         vx: 0.2, // velocity in x-direction
//         vy: 0.01, // velocity in y-direction
//         radius: 20
//       })
//   );
//
//   // ensure objects bounce when edge collision is detected
//   world.add( Physics.behavior('body-impulse-response') );
//    // add some gravity
//   world.add( Physics.behavior('constant-acceleration') );
//   // subscribe to ticker to advance the simulation
//   Physics.util.ticker.on(function( time, dt ){
//     console.log(time);
//       world.step( time );
//   });
//   // start the ticker
//   //Physics.util.ticker.start();
//
// });
