
/**
 * Wall object that jumpy jumps over.
 */
(function(wall) {

    /**
     * Wall constructor function.
     */
    wall.Wall = function(width, height, x) {
        this.width = width;
        this.height = height;
        this.x = x;
    };

    /**
     * Creates a new jumpy wall..
     */
    wall.newWall = function(x) {
        var height = (Math.random() * 200) + 100;
        return new wall.Wall(20, height, x);
    };

})(window.wall = window.wall || {});
