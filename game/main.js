/**
 * Main Module
 * ===========
 * This module initializes the game.
 * It requires the engine and keyboard module.
 */
define(['./engine', './keyboard'], function(engine, keyboard) {

    //This creates a basic Game setup.
    //The Canvas Element, created by the engine will be attached to the document element with the ID "game" (see HTML)
    engine.initialize({
        target: document.getElementById('game')
    });

    //We create a simple, flat plane.
    //This will be replaced by a "true" 2D object, which we will create later.
    //For now, we work with the native three.js object plane.
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );

    //Add the created object to the engines viewport.
    engine.add_object(plane);

    //Setting the mainloop function.
    //This will be called by the engine BEFORE each rendered frame.
    engine.main_loop = function() {

        //We look if either the left or right key is pressed and rotate the plane in different directions.
        //Notice: we have to rotate around the Z-axis, since we are looking "top down" on our scene.
        //When the "true" 2D Object is created and used, there will be only a simple rotation value to be set.
        if (keyboard.pressed(keyboard.keys.left)) {
            plane.rotation.z += 0.1;
        } else if (keyboard.pressed(keyboard.keys.right)) {
            plane.rotation.z -= 0.1;
        }

    }

    //Tell the keyboard module to listen for keyboard events.
    keyboard.bind();

    //Start the engine!
    engine.run();
});