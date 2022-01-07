import { Application, Container, Graphics, Sprite, TextStyle, Text } from 'pixi.js'

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

// prite to show bitmap image
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

// fast speed container
// const particleContainer: ParticleContainer = new ParticleContainer();

// support drawing 
const graphics: Graphics = new Graphics();

graphics.beginFill(0xFF00FF);
graphics.lineStyle(10, 0x00FF00);
graphics.drawCircle(0, 0, 25);
graphics.endFill();

app.stage.addChild(graphics);

graphics.x = 100;
graphics.y = 100;


// text
const textStyle: TextStyle = new TextStyle({
	align: "center",
	fill: "#754c24",
	fontSize: 42,
});

const textObj: Text = new Text ('ㄱㄴㄷㄹ', textStyle);
textObj.text = "This is expensive to change, please do not abuse";

app.stage.addChild(textObj);