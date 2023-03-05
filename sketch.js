
var bg, bgImg

var player_stillImage, shooter, player;
var z2;
var zombie;
var heart1, heart2, heart3;
var heartImg;

var zombieGroup;
var bulletGroup;

var score = 0;
var life = 3;
var bullet = 60;
var bulletImg;

var gameState = "fight"


function preload()
{
      player_stillImage = loadImage("normalStance.png");
      shooter = loadImage("shooter.png")
      z2 = loadImage("Z2.png");
      bg_img = loadImage("Background.png");
      heartImg = loadImage("life.png");
      bulletImg = loadImage("bullet.png");
      bgImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(windowWidth, windowHeight)
    bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
    bg.addImage(bgImg);
    bg.scale = 1.1;
    


    player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
    player.addImage(player_stillImage);
    player.scale = 0.3;
    player.debug = true;
    player.setCollider("rectangle",0,0,300,300);


    heart1 = createSprite(displayWidth-150,40,20,20)
    heart1.visible = false;
    heart1.addImage("heart1Img", heartImg);
    heart1.scale = 0.4;

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false;
    heart2.addImage("heart2Img", heartImg);
    heart2.scale = 0.4;

    heart3 = createSprite(displayWidth-150,40,20,20);
    heart3.visible = false;
    heart3.addImage("heart3Img", heartImg);
    heart3.scale = 0.4;

    bulletGroup = new Group();
    zombieGroup = new Group();


}

function draw()
{
  background(0);

  if(gameState === "fight")
  {
    if(life === 3)
    {
      heart1.visible = false;
      heart2.visible = false;
      heart3.visible = true;
    }

    if(life === 2)
    {
      heart1.visible = false;
      heart2.visible = true;
      heart3.visible = false;
    }


    if(life === 1)
    {
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
    }


    if(life===0)
    {
      gameState = "lost";
    }

    if(score==100)
    {
      gameState = "won";
      
    }


    if(keyDown("UP_ARROW") ||touches.length>0)
  {
    player.y = player.y-30;
  }

  if(keyDown("DOWN_ARROW") || touches.length>0)
  {
    player.y = player.y+30;
  }


  if(keyDown("LEFT_ARROW") || touches.length>0)
  {
    player.x = player.x-30;
  }

  if(keyDown("RIGHT_ARROW") || touches.length>0)
  {
    player.x = player.x + 30;
  }

  if(keyWentDown("space"))
  {
    bullet = createSprite(displayWidth-1150,player.y-30);
    bullet.addImage(bulletImg);
    bullet.velocityX = 20;

    bulletGroup.add(bullet);
    player.depth = bullet.depth;
    player.depth = player.deth+2;
    player.addImage(shooter);
    bullets = bullets - 1;

  }

  else if(keyWentUp("space"))
  {
    player.addImage(player_stillImage);
  }


  if(bullets === 0)
  {
    gameState = "bullet";

  }

  if(zombieGroup.isTouching(bulletGroup))
{
  for(var i=0;i<zombieGroup.length;i++)
  {
    if(zombieGroup[i].isTouching(bulletGroup))
    {
      zombieGroup.destroy();
      bulletGroup.destroyEach();

      score = score + 2;
    }
  }
}


if(zombieGroup.isTouching(player))
{
  for(var i;i<zombieGroup.length;i++)
  {
    zombieGroup[i].destroy();

    life=life-1;
  }
}

  }

  enemy();

}



drawSprites();

textSize(20);
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250);
text("Score = " + score,displayWidth-200,displayHeight/2-220);
text("Lives = " + life,displayWidth-200,displayHeight/2-280);

if(gameState == "lost")
{
  textSize(100)
  fill("red");
  text("You Loose ", 400, 400);
  zombieGroup.destroyEach();
  player.destroy();
}

else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();


}



else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();


}







function enemy(){
  if(frameCount%50===0){


    
    zombie = createSprite(random(500,1100),random(100,500),40,40)


    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }


}

