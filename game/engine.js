define(function() {
    var scene,
        camera,
        renderer,
        running = false; //Is switched by run() and pause()

    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    var requestAnimationFrame = (function(callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    /**
     * Main Game Loop.
     */
    var main = function() {
        out.main_loop();
        renderer.render(scene, camera);
        if (running) requestAnimationFrame(main);
    }

    /**
     * Exposed methods to the "outside"
     */
    var out = {
        /**
         * The target DOM container where the Canvas Element is added to.
         * Will be set through the initialize() function.
         */
        target: null,
        /**
         * Prepares the game engine for run.
         * @param params
         */
        initialize: function(params) {
            //Create our game scene.
            scene = new THREE.Scene();

            //Creating a new orthographic camera.
            //This camera type lacks perspective, which we don't need for a 2D game, anyways.
            camera = new THREE.OrthographicCamera(
                left = window.innerWidth / -2,
                right = window.innerWidth / 2,
                top = window.innerHeight / 2,
                bottom = window.innerHeight / -2,
                near = -2000,
                far = 1000
            );

            //Positioning the camera above of all objects.
            camera.position.z = 100;

            //Add the camera to the scene.
            scene.add(camera);

            camera.lookAt(scene.position);

            //Finally set up the renderer.
            //@TODO: detect the browsers webgl capability and fall back to canvas if necessary.
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

            //Append the renderer to the DOM - now we are ready for rendering.
            params.target.appendChild(renderer.domElement);
            this.target = params.target;
        },
        /**
         * Starts the rendering process.
         */
        run: function() {
            running = true;
            main();
        },
        /**
         * Puts the rendering to halt, until run() is called again.
         */
        pause: function() {
            running = false;
        },
        /**
         * Sets the camera position to a new point.
         * @param point
         */
        set_camera: function(point) {
            camera.position.x = point.x;
            camera.position.y = point.y;
        },
        /**
         * Adds a new object to the Scene.
         * @param object
         */
        add_object: function(object) {
            scene.add(object);
        },
        /**
         * The main loop, called on every frame.
         */
        main_loop: function(){}
    }
    return out;
});