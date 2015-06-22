enchant();
window.onload = function() {

    var game = new Game(320, 320);
    game.preload('chara1.png');
    game.onload = function() {
        bear = new Sprite(32, 32);
        bear.image = game.assets['chara1.png'];
        game.rootScene.addChild(bear);


        game.rootScene.addEventListener('touchend', function(event) {
            bear.x = event.x;
            bear.y = event.y;
        });
    }
    game.start();
}