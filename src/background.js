
/**
 * Draws background particle animation.
 */
(function(background, settings) {

    background.p;
    background.backgroundParticles = [];
    background.foregroundParticles = [];

    /**
     * Draw the given particles.
     */
    var draw = function(particles) {
        background.p.strokeWeight(4);
        for (var i = 0; i < particles.length; i++) {
            var particle = particles[i];
            var x = particle.x - (background.p.width / 2);
            var y = particle.y - (background.p.height / 2);
            var strokeAlpha = background.p.map(particle.ra, 0, 1, 40, 100);
            background.p.stroke(100, 100, 100, strokeAlpha);
            background.p.fill(particle.color);
            background.p.ellipse(x, y, particle.radius);
        }
    };

    /**
     * Initialize the background with p5.
     */
    background.init = function(p) {
        background.p = p;
        for (var i = 0; i < settings.backgroundParticleCount; i++) {
            var particle = new background.Particle(p);
            if (particle.ra < 0.7)
                background.backgroundParticles.push(particle);
            else
                background.foregroundParticles.push(particle);
        }
    };

    /**
     * Draw the particles in the background.
     */
    background.drawBackground = function() {
        draw(background.backgroundParticles);
    };

    /**
     * Draw the particles in the foreground.
     */
    background.drawForeground = function() {
        draw(background.foregroundParticles);
    };

    /**
     * Update all of the particles positions.
     */
    background.update = function() {
        for (var i = 0; i < background.backgroundParticles.length; i++) {
            background.backgroundParticles[i].update();
        }

        for (var i = 0; i < background.foregroundParticles.length; i++) {
            background.foregroundParticles[i].update();
        }
    };

    /**
     * When jumpy jumps, slow the particles down.
     */
    background.jump = function() {
        for (var i = 0; i < background.backgroundParticles.length; i++) {
            var particle = background.backgroundParticles[i];
            particle.speed = particle.baseSpeed / 2.5;
        }

        for (var i = 0; i < background.foregroundParticles.length; i++) {
            var particle = background.foregroundParticles[i];
            particle.speed = particle.baseSpeed / 2.5;
        }
    };

    /**
     * When jumpy lands, the particles resumes at normal speeds.
     */
    background.land = function() {
        for (var i = 0; i < background.backgroundParticles.length; i++) {
            var particle = background.backgroundParticles[i];
            particle.speed = particle.baseSpeed;
        }

        for (var i = 0; i < background.foregroundParticles.length; i++) {
            var particle = background.foregroundParticles[i];
            particle.speed = particle.baseSpeed;
        }
    };

    /**
     * The particles speed up as the game goes on.
     */
    background.speedUp = function() {
        for (var i = 0; i < background.backgroundParticles.length; i++) {
            var particle = background.backgroundParticles[i];
            particle.baseSpeed += 0.001;
        }

        for (var i = 0; i < background.foregroundParticles.length; i++) {
            var particle = background.foregroundParticles[i];
            particle.baseSpeed += 0.001;
        }
    };

    /**
     * Particle class to move randomly in the background.
     */
    background.Particle = function(p) {
        this.ra = p.random();
        this.baseSpeed = p.map(this.ra, 0, 1, 0.0010, 0.0025);
        this.speed = this.baseSpeed;
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.offset = p.createVector(p.random(10000), p.random(10000));

        var alpha = p.map(this.ra, 0, 1, 50, 150);
        this.radius = p.map(this.ra, 0, 1, 3, 15);
        this.color = p.color(p.random(0, 100), p.random(0, 100), p.random(100, 200), alpha);

        /**
         * Update the particle's direction randomly.
         */
        this.update = function() {
            this.x = p.noise(this.offset.x) * p.width * 2;
            this.y = p.noise(this.offset.y) * p.height * 2;
            this.offset.x += this.speed;
            this.offset.y += this.speed;
        };
    };

})(window.background = window.background || {}, settings);
