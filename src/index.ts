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
	Texture,
	autoDetectRenderer,
	// Circle,
	// Point
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

/* graphics */
graphics.x = app.renderer.width / 2;
graphics.y = app.renderer.height / 2;
app.stage.addChild(graphics);

graphics.lineStyle(5, 0x00ff00);
graphics.beginFill(0xff0000);
// graphics.drawCircle(0, 0, 100);

// graphics.drawRect(0, 0, 100, 200);

// graphics.drawStar(0, 0, 5, 100, 40);
// graphics.closePath();

// graphics.drawShape(new Circle(0, 0, 10));

// graphics.drawPolygon([new Point(100, 100), new Point(100, 200), new Point(200, 100)]);



// graphics.moveTo(0, 0);
// graphics.lineTo(100, 100);
// graphics.lineTo(100, 200);
// graphics.lineTo(0, 200);
// graphics.bezierCurveTo(-200, 200, 200, 100, -100, 0);
// graphics.quadraticCurveTo(-200, -100, -200, 0);

let radius = 50;
graphics.arc(0, 0, radius, 0, Math.PI * 2);

app.ticker.add(animate);

let delta = 0;
function animate() {
	delta += 0.1;
	radius = 50 + Math.sin(delta) * 25;
	
	graphics.clear();
	graphics.beginFill(0xff0000);
	graphics.arc(0, 0, radius, 0, Math.PI * 2);
	graphics.endFill();
}

graphics.endFill();


/* bunny animation */
let renderer = autoDetectRenderer({ width: 800, height: 600, backgroundColor : 0x1099bb});  
document.body.appendChild(renderer.view);

let stage = new Container();

let bunnyTexture = Texture.from('bunny.png');  
let carrotTexture = Texture.from('carrot.png');

let bunny = new Sprite(bunnyTexture);

bunny.anchor.x = 0.5;  
bunny.anchor.y = 0.5;

bunny.position.x = 200;  
bunny.position.y = 150;

let background = new Graphics();  
background.beginFill(0x123456);  
background.drawRect(0,0,800,600);  
background.endFill();  
stage.addChild(background);

stage.addChild(bunny);

stage.interactive = true;

stage.on("mousedown", function(){  
  shoot(bunny.rotation, {
    x: bunny.position.x+Math.cos(bunny.rotation)*20,
    y: bunny.position.y+Math.sin(bunny.rotation)*20
  });
})

let carrotBullets: Sprite[] = [];  
let bulletSpeed = 5;

function shoot(rotation : number, startPosition: {x: number, y: number}){  
  let bullet: Sprite = new Sprite(carrotTexture);
  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;
  bullet.rotation = rotation;
  stage.addChild(bullet);
  carrotBullets.push(bullet);
}

function rotateToPoint(mx: number, my: number, px: number, py: number){  
  let dist_Y = my - py;
  let dist_X = mx - px;
  let angle = Math.atan2(dist_Y,dist_X);
  return angle;
}

// start animating
animateBunny();  
function animateBunny() {  
  requestAnimationFrame(animateBunny);

  bunny.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, bunny.position.x, bunny.position.y);

  for(let b=carrotBullets.length-1;b>=0;b--){
    carrotBullets[b].position.x += Math.cos(carrotBullets[b].rotation)*bulletSpeed;
    carrotBullets[b].position.y += Math.sin(carrotBullets[b].rotation)*bulletSpeed;
  }
  // render the container
  renderer.render(stage);
}
