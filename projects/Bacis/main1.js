enchant();
window.onload = function() {
	var game = new Game(320, 320);
	game.preload('chara1.png');
	game.onload = function () {
		group = new Group();

		bear1 = new Sprite(32, 32);
		bear1.image = game.assets['chara1.png'];
		group.addChild(bear1);

		bear2 = new Sprite(32, 32);
		bear2.image = game.assets['chara1.png'];
		bear2.x = 50;
		bear2.y = 20;
		bear2.frame = 5;

		group.addChild(bear2);

		group.addEventListener('enterframe', function() {
			this.x++;
			this.y++;
		});
		game.rootScene.addChild(group);

	}
	game.start();
}