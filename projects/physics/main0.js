enchant();
window.onload = function() {
    game = new Game(320, 320);
    game.preload('icon0.png', 'map2.png');
    game.onload = function() {
        gx = 0.0;
        gy = 9.8;
        world = new PhysicsWorld(gx, gy);
        apple = new PhyCircleSprite(8, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 1.0, true);
        apple.image = game.assets['icon0.png'];
        apple.frame = 15;
        apple.position = {x: 160, y:20};
        apple.applyImpulse(new b2Vec2(Math.random(), 0));
        game.rootScene.addChild(apple);

        floor = new PhyBoxSprite(320, 16, enchant.box2d.STATIC_SPRITE, 1.0, 0.5, 0.0, true);
        floor.image = new Surface(16, 16);
        floor.image.draw(game.assets['map2.png'], 0, 0, 16, 16, 0, 0, 16, 16);
        floor.x = 0;
        floor.y = 304;
        game.rootScene.addChild(floor);

        game.rootScene.addEventListener('enterframe', function() {
            world.step(game.fps);
        });
    }
    game.start();
}