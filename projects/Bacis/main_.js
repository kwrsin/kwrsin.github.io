enchant();
window.onload = function() {
	game = new Game(320, 320);
	game.onload = function() {
		hello = new Label("hello.bear");
		hello.x = 10;
		hello.y = 150;
		game.rootScene.addChild(hello);
	}
	game.start();
}
