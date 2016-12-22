
(function(render, jumpy, background, settings) {})(
    window.render = window.render ||
    new p5(function(p) {
        p.setup = function() {
            p.createCanvas(settings.windowWidth, settings.windowHeight);
            jumpy.init(p, settings.windowWidth / 5, settings.windowHeight / 2);
            background.init(p);
        };

        p.draw = function() {
            p.background(50);
            background.drawBackground();

            // Draw wall
            p.fill(250);
            p.stroke(210);
            p.strokeWeight(5);
            p.rect(
                jumpy.wall.x,
                p.height - jumpy.wall.height,
                jumpy.wall.width,
                jumpy.wall.height);

            // Draw jumpy ball
            p.ellipse(jumpy.pos.x, jumpy.pos.y, settings.radius);

            background.drawForeground();

            jumpy.update();
            background.update();
        };

        p.keyPressed = function() {
            jumpy.jump();
        };

        p.mousePressed = function() {
            jumpy.jump();
        };
    }),
    jumpy,
    background,
    settings);
