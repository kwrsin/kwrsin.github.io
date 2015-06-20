enchant();
window.onload = function() {
    game = new Game(320, 320);
    game.preload('Title.png', 'startbutton.png','backButton.png', 'play.png', 'chara0.gif');
    game.onload = function() {
        game.pushScene(new TitleScene());
    }
    game.start();

    TitleScene = enchant.Class.create(enchant.Scene, {
        initialize: function() {
            enchant.Scene.call(this);
            this.background = new Sprite(320, 320);
            this.background.image = game.assets['Title.png'];
            this.addChild(this.background);

            startButton = new Sprite(100, 32);
            startButton.image = game.assets['startbutton.png'];
            this.addChild(startButton);

            startButton.x = 80;
            startButton.y = 260;

            startButton.addEventListener('touchend', function(event) {
                game.pushScene(new PlayScene());
            });
        }
    });

    PlayScene = enchant.Class.create(enchant.Scene, {
        initialize: function() {
            Scene.call(this);
            background2 = new Sprite(320, 320);
            background2.image = game.assets['play.png'];
            this.addChild(background2);

            bear = new Sprite(32, 32);
            bear.image = game.assets['chara0.gif'];
            this.addChild(bear);
            vx = 1;
            vy = 1;
            this.addEventListener('enterframe', function(event) {
                bear.x += vx;
                bear.y += vy;
            });

            backButton = new Sprite(100, 32);
            backButton.image = game.assets['backButton.png'];
            this.addChild(backButton);

            backButton.x = 80;
            backButton.y = 260;

            backButton.addEventListener('touchend', function(event) {
                game.popScene();
            });

        }
    });
}