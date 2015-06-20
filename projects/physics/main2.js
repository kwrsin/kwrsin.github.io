enchant();
window.onload = function() {
    game = new Game(320, 320);
    game.preload('icon0.png', 'map2.png');
    game.onload = function() {
        world = new PhysicsWorld(0.0, 9.8);

        for(var i = 0;i < 8; i++) {
            var floor =
                new PhyBoxSprite(
                    320, 16,
                    enchant.box2d.STATIC_SPRITE,
                    1.0, 0.5, 0.0, true);
            floor.image = new Surface(16, 16);
            floor.image.draw(
                game.assets['map2.png'],
                0, 0, 16, 16, 0, 0, 16, 16);
            floor.x = 0;
            floor.y = i * 32 + 64;
            game.rootScene.addChild(floor);
        }

        apple = new PhyCircleSprite(8,
            enchant.box2d.DYNAMIC_SPRITE,
            1.0, 0.5, 0.0, true);
        apple.image = game.assets['icon0.png'];
        apple.frame = 15;
        apple.x = 160;
        apple.y = 0;
        game.rootScene.addChild(apple);

        game.rootScene.onenterframe = function() {

            world.step(game.fps);
            apple.contact(function(sprite) {
                sprite.destroy();
            });
        }

    };

    game.start();
};