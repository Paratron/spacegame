/**
 * Keyboard module
 * ===============
 * This module captures keyboard events and propagates a simple function to test if a certain key is pressed.
 *
 * Simply call pressed(keycode) which will return either true or false.
 * If you can't remember a certain keycode, make use of the keys object, which acts as keycode constants.
 */
define(['./engine'], function(engine) {
    var keys_pressed = {};

    var do_bind = function() {
        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            keys_pressed[e.keyCode] = true;
        }, this);

        document.addEventListener('keyup', function(e) {
            e.preventDefault();
            e.stopPropagation();
            keys_pressed[e.keyCode] = false;
        }, this);
    }

    /**
     * Exposed methods and values to the "outside".
     */
    return {
        keys: {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            space: 32,
            w: 87,
            a: 65,
            s: 83,
            d: 68
        },
        /**
         * Return, if the key with the given keycode is pressed.
         * @param keyCode
         */
        pressed: function(keyCode) {
            if (keys_pressed[keyCode]) return true; else return false;
        },
        /**
         * Binds the Listener to the keyboard.
         */
        bind: function(){
            do_bind();
        }
    }
});