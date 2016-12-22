
/**
 * Handles jumpy game logic.
 */
(function(jumpy, wall, background, settings) {

    jumpy.p5;
    jumpy.pos;
    jumpy.ySpeed;
    jumpy.wall;
    jumpy.wallSpeed;
    jumpy.jumps;
    jumpy.maxJumps;

    /**
     * Initialize jumpy variables.
     */
    jumpy.init = function(p, x, y) {
        jumpy.p5 = p;
        jumpy.pos = jumpy.p5.createVector(x, y);
        jumpy.ySpeed = 0;
        jumpy.wall = wall.newWall(jumpy.p5.width);
        jumpy.wallSpeed = 4;
        jumpy.jumps = 0;
        jumpy.maxJumps = 3;
        jumpy.jumping = false;
    };

    /**
     * Update ball by applying force of gravity.
     */
    jumpy.update = function() {
        jumpy.ySpeed += settings.gravity;
        jumpy.pos.y += jumpy.ySpeed;

        if (jumpy.p5.frameCount % 600 == 0) {
            jumpy.wallSpeed++;
            background.speedUp();
        }

        if (jumpy.pos.y >= settings.windowHeight - (settings.radius / 2)) {
            jumpy.pos.y = settings.windowHeight - (settings.radius / 2);
            jumpy.ySpeed = 0;
            jumpy.jumps = 0;
            background.land();
        }

        jumpy.wall.x -= jumpy.wallSpeed;
        if (jumpy.wall.x < -20) {
            jumpy.wall = wall.newWall(jumpy.p5.width);
            }

        if (jumpy.pos.x + (settings.radius / 2) >= jumpy.wall.x &&
            jumpy.pos.x <= jumpy.wall.x + 10 &&
            jumpy.pos.y >= settings.windowHeight - jumpy.wall.height)
            jumpy.p5.noLoop();
    };

    jumpy.jump = function() {
        if (jumpy.jumps < jumpy.maxJumps) {
            jumpy.ySpeed = -settings.jumpForce;
            jumpy.jumps++;
            background.jump();
        }
    };

})(window.jumpy = window.jumpy || {}, wall, background, settings);
