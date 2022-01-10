import { Emitter } from 'pixi-particles';
import { 
	Application, 
	Container, 
	Graphics, 
	Sprite, 
	TextStyle, 
	Text, 
	BitmapFont, 
	BitmapText, 
	filters, 
	ParticleContainer, 
	Texture
} from 'pixi.js'
import * as particleSettings from "../static/emitter.json";
import { Scene } from './Scene';

/* app setting */
const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0xFFFFFF,
	width: window.innerWidth,
	height: window.innerHeight
});

/* container */
const container: Container = new Container();
container.x = 200;
container.y = 0;

app.stage.addChild(container);

/* sprite */ 
// shows bitmap image
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

/* particle container */
// fast speed container
// cannot have grand child
// const particleContainer: ParticleContainer = new ParticleContainer();

/* graphics */
// support drawing feature
const graphics: Graphics = new Graphics();

graphics.beginFill(0xFF00FF);
graphics.lineStyle(10, 0x00FF00);
graphics.drawCircle(0, 0, 25);
graphics.endFill();

app.stage.addChild(graphics);

graphics.x = 100;
graphics.y = 100;


/* text */
const textStyle: TextStyle = new TextStyle({
	align: "center",
	fill: "#754c24",
	fontSize: 42,
});

const textObj: Text = new Text ('ㄱㄴㄷㄹ', textStyle);
textObj.text = "This is expensive to change, please do not abuse";

app.stage.addChild(textObj);

/* bitmap text */
BitmapFont.from("comic 32", {
	fill: "#ffffff",
	fontFamily: "Comic Sans MS",
	fontSize: 32 
});

const bitmapText: BitmapText = new BitmapText("I love baking, my family, and my friends",
	{
		fontName: "comic 32",
		fontSize: 32,
		tint: 0xFF0000
	}
);

bitmapText.text = "This is cheap";
bitmapText.text = "Change it as much as you want";
bitmapText.x = 0;
bitmapText.y = 600;

app.stage.addChild(bitmapText);

/* filter */
const blurFilter = new filters.BlurFilter();

clampy.filters = [ blurFilter ];

/* particle */
const particleContainer = new ParticleContainer();
app.stage.addChild(particleContainer);

const emitter = new Emitter(particleContainer, Texture.from("particleTexture.png"), particleSettings);
emitter.autoUpdate = true;
emitter.updateSpawnPos(200, 100);
emitter.emit = true;

/* context */
class A {
	// private myName: string = "I am A";
	public method: Function = () => {};
}

class B {
	private myName: string = "I am B";
	public printName() {
		console.log(this.myName);
	}
}

const a = new A();
const b = new B();
a.method = b.printName;
a.method();
b.printName();

a.method = b.printName.bind(b);
a.method();

/* scene code spliting */
const sceneApp = new Application({
	view: document.getElementById('pixi-scene-canvas') as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480,
});

const scene: Scene = new Scene(sceneApp.screen.width, sceneApp.screen.height);
app.stage.addChild(scene);

scene.x = 0;
scene.y = 600;