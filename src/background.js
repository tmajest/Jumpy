
/**
 * Draws background particle animation.
 */
(function(background, settings) {

    background.p;
    background.particles = [];
    background.foreground = [];

    /**
     * Initialize the background with p5.
     */
    background.init = function(p) {
        background.p = p;
        for (var i = 0; i < settings.backgroundParticles; i++) {
            var particle = new background.Particle(p);
            if (particle.ra < 0.7)
                background.particles.push(particle);
            else
                background.foreground.push(particle);
        }
    };

    /**
     * Draw the particles in the background.
     */
    background.drawBackground = function() {
        background.p.strokeWeight(4);
        for (var i = 0; i < background.particles.length; i++) {
            var particle = background.particles[i];
            var x = particle.x - (background.p.width / 2);
            var y = particle.y - (background.p.height / 2);
            var strokeAlpha = background.p.map(particle.ra, 0, 1, 40, 100);
            background.p.stroke(100, 100, 100, strokeAlpha);
            background.p.fill(particle.color);
            background.p.ellipse(x, y, particle.radius);
        }
    };

    background.drawForeground = function() {
        background.p.strokeWeight(4);
        for (var i = 0; i < background.foreground.length; i++) {
            var particle = background.foreground[i];
            var x = particle.x - (background.p.width / 2);
            var y = particle.y - (background.p.height / 2);
            var strokeAlpha = background.p.map(particle.ra, 0, 1, 40, 100);
            background.p.stroke(100, 100, 100, strokeAlpha);
            background.p.fill(particle.color);
            background.p.ellipse(x, y, particle.radius);
        }
    };

    /**
     * Update all of the particles positions.
     */
    background.update = function() {
        for (var i = 0; i < background.particles.length; i++) {
            background.particles[i].update();
        }
        for (var i = 0; i < background.foreground.length; i++) {
            background.foreground[i].update();
        }
    };

    background.jump = function() {
        for (var i = 0; i < background.particles.length; i++) {
            var particle = background.particles[i];
            particle.particleSpeed = particle.base / 2.5;
        }
        for (var i = 0; i < background.foreground.length; i++) {
            var particle = background.foreground[i];
            particle.particleSpeed = particle.base / 2.5;
        }
    };

    background.land = function() {
        for (var i = 0; i < background.particles.length; i++) {
            var particle = background.particles[i];
            particle.particleSpeed = particle.base;
        }
        for (var i = 0; i < background.foreground.length; i++) {
            var particle = background.foreground[i];
            particle.particleSpeed = particle.base;
        }
    };

    background.speedUp = function() {
        for (var i = 0; i < background.particles.length; i++) {
            var particle = background.particles[i];
            particle.base += 0.001;
        }
        for (var i = 0; i < background.foreground.length; i++) {
            var particle = background.foreground[i];
            particle.base += 0.001;
        }
    };

    /**
     * Particle class to move randomly in the background.
     */
    background.Particle = function(p) {
        this.ra = p.random();
        this.base = p.map(this.ra, 0, 1, 0.0010, 0.0025);
        this.particleSpeed = this.base;
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
            this.offset.x += this.particleSpeed;
            this.offset.y += this.particleSpeed;
        };
    };

})(window.background = window.background || {}, settings);
