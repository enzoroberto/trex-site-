 var trex;
var chao;
var treximg;
var chaoimg;
var chaofalso;
var numeroaleatorio;
var nuvem1;
var nuvemimg;
var trexparadoimg;
var cacto, cactoimg1, cactoimg2, cactoimg3, cactoimg4, cactoimg5, cactoimg7;
var INICIO = 0;
var JOGANDO =1;
var MORREU = 2;
var estadodejogo = INICIO;
var gpcacto;
var gpnuvem;
var trexmortoimg;
var botaoresetimg;
var gameoverimg;
var gameOver;
var restart;

function preload() {
  treximg = loadAnimation("trex1.png","trex3.png","trex4.png");
  chaoimg = loadImage("ground2.png");
  nuvemimg = loadImage("cloud.png");
  cactoimg1 = loadImage("obstacle1.png");
  cactoimg2 = loadImage("obstacle2.png");
  cactoimg3 = loadImage("obstacle3.png");
  cactoimg4 = loadImage("obstacle4.png");
  cactoimg5 = loadImage("obstacle5.png");
  cactoimg7 = loadImage("obstacle6.png");
  trexparadoimg = loadAnimation("trex1.png");
  trexmortoimg = loadAnimation("trex_collided.png");
  botaoresetimg = loadImage("restart.png");
  gameoverimg = loadImage("gameOver.png");
}
function verposicao() {
  text("x:"+ mouseX + " y:" + mouseY, mouseX, mouseY);

}
function pulo() {
  if(keyDown("space")&& trex.isTouching(chao)) {
    trex.velocityY = -13.567;
    if(estadodejogo === INICIO) {
      estadodejogo = JOGANDO;
    }
  }
  trex.velocityY += 0.8;

}

function chaoinfinito() {
  if(chao.x<0) {
    chao.x = chao.width/2
  }
}
function nuvens () {

  if(frameCount%60 === 0) {
    nuvem1 = createSprite(610, numeroaleatorio, 10 , 10);
    nuvem1.velocityX = -2;
    nuvem1.scale = 0.7;
    nuvem1.depth= 1;
    nuvem1.addImage(nuvemimg);
    nuvem1.lifetime = 500;
    gpnuvem.add(nuvem1);
  }
}

function cactos () {
  if(frameCount%60 === 0) {
   cacto =  createSprite(630, 165, 10, 10)
   cacto.velocityX = -5.5;
   cacto.lifetime = 500;
   var num = Math.round(random(1, 6));

   switch(num) {
      case 1:
        cacto.addImage(cactoimg1);
        cacto.scale = 0,34;
        break;
      case 2:
        cacto.addImage(cactoimg2);
        cacto.scale = 0.4;
        break;
      case 3:
        cacto.addImage(cactoimg3);
        cacto.scale = 0.4;
        break;
      case 4:
        cacto.addImage(cactoimg4);
        cacto.scale = 0.4;
        break;
      case 5:
        cacto.addImage(cactoimg5);
        cacto.scale = 0.4;
        break;
      case 6:
        cacto.addImage(cactoimg7);
        cacto.scale = 0.4;
        break;
   }
    gpcacto.add(cacto);
  }



}


function setup(){
  createCanvas(600,200);
  trex = createSprite(50,140);
  chao = createSprite(200,180,400,20);
  chaofalso = createSprite(200,190,400,10);
  trex.addAnimation("parado",trexparadoimg);
  trex.addAnimation("correndo",treximg);
  trex.addAnimation("morto",trexmortoimg);
  trex.depth = 2;
  chao.addImage(chaoimg);
  trex.scale = 0.52;
  chao.velocityX = -3;
  chaofalso.visible = false;
  gpnuvem = new Group ();
  gpcacto = new Group ();
  gameOver = createSprite(300,50,60,18);
  gameOver.addImage("perdeu",gameoverimg);
  restart = createSprite(300,100,60,18);
  restart.addImage("recomece",botaoresetimg);
}

function draw(){
  numeroaleatorio = Math.round(random(30, 70));
  background("white");
  drawSprites();
  verposicao ();
  trex.collide(chaofalso); 

  if(estadodejogo === INICIO) {
    chao.velocityX = 0;
    pulo();
    restart.visible = false;
    gameOver.visible = false;
  }
  if(estadodejogo === JOGANDO) {
    chao.velocityX = -5.5;
    pulo();
    chaoinfinito();
    nuvens();
    cactos();
    trex.changeAnimation("correndo",treximg);
    restart.visible = false;
    gameOver.visible = false;
    if(trex.collide(gpcacto)){
      estadodejogo = MORREU;
    }
  }
  if(estadodejogo === MORREU) {
    trex.velocityX = 0;
    trex.velocityY = 0;
    chao.velocityX = 0;
    gpcacto.destroyEach();
    gpnuvem.destroyEach();
    trex.changeAnimation("morto",trexmortoimg);
    restart.visible = true;
    gameOver.visible = true;
    if(mousePressedOver(restart)) {
      window.location.reload();
    }
  }
}