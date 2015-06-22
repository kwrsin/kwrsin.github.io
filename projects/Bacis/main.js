enchant();

window.onload = function() {

    var game = new Game(320, 320);
    game.onload = function() {
        sprite = new Sprite(320, 320);
        surface = new Surface(320, 320);

        sprite.image = surface;
        context = surface.context;
        context.beginPath();

        context.moveTo(50, 50);
        context.lineTo(100, 100);
        context.closePath();
        context.stroke();
        game.rootScene.addChild(sprite);

    };
    game.start();
};