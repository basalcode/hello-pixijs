import { Application, Container, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0xFFFFFF,
	width: 640,
	height: 480
});

const container: Container = new Container();
container.x = 200;
container.y = 0;

app.stage.addChild(container);

const clampy: Sprite = Sprite.from("clampy.png");

clampy.x  = 100;
clampy.y = 100;

container.addChild(clampy);

const bigContainer: Container = new Container();
bigContainer.scale.set(2);
bigContainer.position.x = 100;
bigContainer.y = 200;
app.stage.addChild(bigContainer);

const littleContainer: Container = new Container();
bigContainer.addChild(littleContainer);