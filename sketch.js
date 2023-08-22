var player ,player_flying;
var sky ,sky_bg;
var invisibleGround;
var invisibleGround2;
var tower
score=0

var gamestate = "play";









function preload(){

  player_flying=loadAnimation("flappyBird1.png","flappyBird2.png","flappyBird3.png")
  player_out=loadImage("flappyBird1.png")
    sky_bg=loadImage("sky.jpg")
    tower1=loadImage("Tower1 part1.png")
    tower2=loadImage("Tower2 part1.png")
    tower3=loadImage("Tower3 part1.png")
    tower4=loadImage("Tower4 part1.png")
    tower1_2=loadImage("Tower1 part2.png")
    tower2_2=loadImage("Tower2 part2.png")
    tower3_2=loadImage("Tower3 part2.png")
    tower4_2=loadImage("Tower4 part2.png")
    gameOverImg=loadImage("gameOverImg.png")
    restartImg=loadImage("restartImg.png")
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);

player=createSprite(50,windowHeight/2,70,70);
 player.addAnimation("flying",player_flying);
 player.addAnimation("out",player_out)
 player.scale=0.1
player.setCollider("circle",0,40,40)
  player.debug=false


sky=createSprite(windowWidth/2-10,windowHeight/2)
 sky.addImage("sky1",sky_bg)
 sky.scale=4

 gameOver=createSprite(600,windowHeight/3.5);
 gameOver.addImage(gameOverImg);

 restart=createSprite(600,windowHeight/2.8);
 restart.addImage(restartImg);

 gameOver.scale=1;
 restart.scale=0.6;

 gameOver.visible=false;
 restart.visible=false;


 player.depth=sky.depth+1

 invisibleGround=createSprite(windowWidth/2,windowHeight-40,windowWidth,50);
 invisibleGround.visible=false;

 invisibleGround2=createSprite(windowWidth/2,windowHeight-550,windowWidth,50);
 invisibleGround2.visible=false;

 towerGroup= new Group();
 


 
}

function draw() {
  

  if(player.collide(invisibleGround)){
    player.velocityY=0
  }
  if(player.collide(invisibleGround2)){
    player.velocityY=0
  }
  
    if(gamestate==="play"){
      
      
      if(sky.x<1){
        sky.x=sky.width/2
      }

      score=score+Math.round(getFrameRate()/60);

      if(keyDown("SPACE")){
      player.velocityY=-8
    }

    player.velocityY+=0.5

    spawnTowers()

    if(towerGroup.isTouching(player)){
      gamestate="end"
    }
  }
  if(gamestate==="end"){

    player.velocityY=0
    towerGroup.setVelocityXEach(0)

    gameOver.visible=true;
    restart.visible=true;

    
    player.changeAnimation("out",player_out)


  }

  if(mousePressedOver(restart)){
    reset();
    touches = [];
  }
  
    
  drawSprites();
  textSize(20)
  fill("green")
text("Distance Covered : "+score,50,50)
  }

  function reset(){
  gamestate="play"
  gameOver.visible=false;
  restart.visible=false;

  towerGroup.destroyEach()
    player.x=50;
    player.y=windowHeight/2
  player.changeAnimation("flying",player_flying)

  score=0;

  }


  function spawnTowers(){
   
    
    if(frameCount%100===0){

     

      var towerdown=createSprite(1800,windowHeight-90,10,10)
      towerdown.velocityX=-15
      tower=createSprite(1800,windowHeight-530,10,10)
      tower.velocityX=-15
      
      var rand =Math.round(random(1,4))
      towerdown.x=tower.x;
      switch(rand){
        case 1 : tower.addImage(tower1)
        towerdown.addImage(tower1_2)
       
        
        break;
        case 2 : tower.addImage(tower2)
        towerdown.addImage(tower2_2)

        
        break;
        case 3 : tower.addImage(tower3)
        towerdown.addImage(tower3_2)

      
        break;
        case 4 : tower.addImage(tower4)
        towerdown.addImage(tower4_2)
        
        break;
        default : break;
      }
      


      towerdown.scale=1.75
      tower.scale=1.75
      tower.length=10
      towerGroup.add(tower)
      towerGroup.add(towerdown)
      tower.lifetime=500
      towerdown.lifetime=500
  }
  
  
}
