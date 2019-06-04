enchant();
window.onload = function() {
    game = new Game(320, 320);
    game.preload('icon0.png', 'icon1.png', 'map2.png');
    game.onload = function() {
        world = new PhysicsWorld(0.0, 9.8);
        var pos =  [{x:144, y:32},
                    {x:160, y:32},
                    {x:176, y:32},
                    {x:152, y:48},
                    {x:168, y:48},
                    {x:160, y:64}];
        for(var i = 0;i < 6; i++) {
            var ball = new PhyCircleSprite(
                8, enchant.box2d.DYNAMIC_SPRITE,
                1.0, 0.5, 0.8, true);
            ball.image = game.assets['icon1.png'];
            ball.frame = i + 2;
            ball.position = pos[i];
            game.rootScene.addChild(ball);
        }
        apple = new PhyCircleSprite(
            8, enchant.box2d.DYNAMIC_SPRITE,
            1.0, 0.5, 0.8, true);
        apple.image = game.assets['icon0.png'];
        apple.frame = 15;
        apple.position = {x: 160, y: 296};
        game.rootScene.addChild(apple);

        floor = new PhyBoxSprite(320, 16,
            enchant.box2d.STATIC_SPRITE,
            1.0, 0.5, 0.0, true);
        floor.image = new Surface(16, 16);
        floor.image.draw(game.assets['map2.png'],
            0, 0, 16, 16, 0, 0, 16, 16);
        floor.position = {x: 160, y: 312};
        game.rootScene.addChild(floor);

        apple.addEventListener(Event.TOUCH_END, function(e) {
            p = this.position;
            h = Math.sqrt(Math.pow(e.x - p.x, 2) +
                Math.pow(e.y - p.y, 2));
            a = (e.x - p.x) / h;
            b = (e.y - p.y) / h;

            a = isNaN(a) ? 0: a;
            b = isNaN(b) ? 0: b;

            this.applyImpulse(new b2Vec2(-1 * a, -5 * b));

        });

        game.rootScene.onenterframe = function(e) {
            world.step(game.fps);
        };

    };
    game.start();
};