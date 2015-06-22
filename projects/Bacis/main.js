enchant();
//surfaceのアニメーション
window.onload = function() {
    var game = Game(320, 320);
    game.onload = function () {
        sprite = new Sprite(320, 320);
        surface = new Surface(320, 320);

        sprite.image = surface;

        context = surface.context;
        sprite.addEventListener('enterframe', function() {
            context.beginPath();
            context.StrokeStyle = 'rgb(0, 0, 250)';

            context.rect(Math.random() * 320, Math.random() * 320,
                Math.random() * 100, Math.random() * 100);
            context.closePath();
            context.stroke();
        });
        game.rootScene.addChild(sprite);
    };
    game.start();
};