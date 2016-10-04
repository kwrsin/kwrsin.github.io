enchant();
window.onload = function() {
    var game = new Game(320, 320);
    game.preload('chara1.png');
    game.onload = function() {
        bear1 = new Sprite(32, 32);
        bear1.image = game.assets['chara1.png'];
        bear1.addEventListener('enterframe', function() {
            this.y++;
        });
        game.rootScene.addChild(bear1);

        bear2 = new Sprite(32, 32);
        bear2.image = game.assets['chara1.png'];
        bear2.x = 50;
        bear2.y = 20;
        bear2.frame = 5;
        bear2.addEventListener('enterframe', function() {
            this.x++;
        });
        game.rootScene.addChild(bear2);

        subScene = new Scene();
        label = new Label("Click here");
        label.x = 80;
        label.y = 150;
        subScene.addChild(label);

        game.pushScene(subScene);

        subScene.addEventListener('touchend', function() {
            game.popScene();
        });
    }
    game.start();
}