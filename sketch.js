var restart, restartimg, gameover, gameoverimg;
var bird, birdimg, birdimg2;
var backimg;
var  backgroundimg, backgroundimg2;
var moonimg;
var cheksound, diesound, jumpsound;
var obstacle;
var gv = -6
var cloudimage ;
var gamestate = "serve";
var ob1, ob2, ob3, ob4;
var trex ,trex_running, trexcollided;
var ground , groundimage;
var invisibleGround ;
var highscore = 0;
var score = 0;
var time = 0
var sun, sunimg;
var gamestate = "play";
function preload(){
  backgroundimg = loadImage("backgroundimg.png")
  restartimg = loadImage("restart.png");
  gameoverimg = loadImage("gameover.png");
  cloudimage = loadImage("cloud.png");
  trex_running = loadAnimation("trex_1.png","trex_2.png","trex_3.png");
  trexcollided = loadImage("trexcollided.png");
  ob1 = loadImage("obstacle1.png"); 
  ob2 = loadImage("obstacle2.png");
   ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  sunimg = loadImage("sun.png");
  jumpsound = loadSound("jump.wav")
  diesound = loadSound("collided.wav")
  groundimg = loadImage("ground.png");
  checksound  = loadSound("ck.mp3");
  backgroundimg2 = loadImage("nightsky.jpg")
  birdimg = loadImage("bluebirdr.gif")
  birdimg2 = loadImage("bluebird.png")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
   sun = createSprite(width-50,100,10,10);
  sun.addAnimation("sun", sunimg);
  sun.scale = 0.1;
  trex = createSprite(50,height-70,20,50);
  
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexcollided);
  trex.setCollider('circle',0,0,260)
  trex.scale = 0.08
   //trex.debug=true
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundimg);
  ground.x = width/2
  
  
   gameover = createSprite(width/2,height/2- 50);
  gameover.addImage(gameoverimg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartimg);
  
  gameover.scale = 0.5;
  restart.scale = 0.1;

 
    
  
  
 
  obstaclegroup = createGroup();
  cloudgroup = createGroup();
   birdgroup = createGroup();
  
  
}
function draw(){
  background(backgroundimg);
  
   gameover.visible = false;
  restart.visible = false;
 trex.depth = ground.depth + 1
   textSize(20)
  textFont("algerian");
  fill("black ")
  text("SCORE :" + score, 30 , 50);
  text("HIGHSCORE: "+ highscore, 30, 30);
 
  trex.collide(invisibleGround)
 
  if(gamestate == "play"){
    // background changing
    if(time < 500){
    time = time + Math.round((getFrameRate()/60));
    }
    spawncloud();
    spawnobstacle();
    spawnbirds();
    if(score> highscore){
      highscore = score
    }
    if(score> 0 && score%100 == 0){
     checksound.play();
    }
     ground.velocityX = -(6 + 3*score/100);
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
     score = score + Math.round((getFrameRate()/60));
    trex.velocityY = trex.velocityY + 0.8
    
     if(touches.length > 0 && trex.y > height - 120||keyDown("space")&& trex.y > height - 120){
      jumpsound.play(); 
    trex.velocityY = -11.5   ; 
       touches = []
     }
    
   
    if(obstaclegroup.isTouching(trex)|| birdgroup.isTouching(trex)){
      trex.addImage(trexcollided)
     
      //trex.velocityY = -12;
      // jumpsound.play(); 
     diesound.play();
      gamestate = "end";
    }
  }
   else if(gamestate == "end"){
    
    trex.changeAnimation("collided", trexcollided)
    trex.velocityY = 0
    restart.visible = true;
    gameover.visible = true;
    ground.velocityX = 0;
     
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
     birdgroup.setVelocityXEach(0)
     birdgroup.setLifetimeEach(-1);
  obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    if(touches.length > 0||mousePressedOver(restart)){
      trex.changeAnimation("running", trex_running)
      frameCount = 0
      jumpsound.play();
      gamestate = "play"
      obstaclegroup.destroyEach();
      cloudgroup.destroyEach();
      birdgroup.destroyEach();
      score = 0;
      touches = []
      
    }
   
    
  }
  drawSprites();   
}

function spawncloud(){
   if (frameCount % 60 === 0) {
    var cloud = createSprite(width,height-300,40,10);
    cloud.y = Math.round(random(100,ground.y - 110));
    cloud.addImage(cloudimage);
    cloud.scale = 0.66;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 550;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    gameover.depth = cloud.depth + 1
     restart.depth = cloud.depth + 1
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
  
}
function spawnobstacle(){
  if(frameCount%(65)  == 0 && score < 550){
    
  var obstacle = createSprite(width,height - 95, 10, 10);
    obstacle.scale = 0.66
    
   // obstacle.collide(invisibleGround)
     
      obstacle.velocityX = - (6 + 3*score/100 )
    
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
        case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       
       break;
       
       
       default:break;
   }
   
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
    
     
   }  
   else if(frameCount%47 == 0 && score > 550 && score<850){
    var obstacle = createSprite(width,height - 95, 10, 10);
    obstacle.scale = 0.66
     
    // obstacle.collide(invisibleGround)
      obstacle.velocityX = - (6 + 3*score/100 )
    
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
        case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       
       break;
       
      
       
       default:break;
   }
   
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
    }
   else if(frameCount%40 == 0 && score > 850 && score<1500){
    var obstacle = createSprite(width,height - 95, 10, 10);
    obstacle.scale = 0.66
     
    // obstacle.collide(invisibleGround)
      obstacle.velocityX = - (6 + 3*score/100 )
    
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
        case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       
       break;
       
      
       
       default:break;
   }
   
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
    }
  else if(frameCount% 39 == 0 && score > 1500){
  var obstacle = createSprite(width,height - 95, 10, 10);
    obstacle.scale = 0.66
     //obstacle.setCollider("circle", 0, 0, 100)
     //obstacle.collide(invisibleGround)
      obstacle.velocityX = - (6 + 3*score/100 )
    //obstacle.debug = true
   var r = Math.round(random(1, 6))
   switch(r){
     case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
       break;
        case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       
       break;
       
       default:break;
   }
   
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
    
  }
}

function spawnbirds(){
  if(score > 350 ){
    if(frameCount%100 == 0){
       bird = createSprite(width, 200, 10, 10);
      
      
  bird.addAnimation("bird", birdimg);
       
      
     
  bird.scale = 0.2;
      
      bird.y = Math.round(random(height/2 - 60, height/2 + 70 ))
      
        bird.velocityX = random (-15,- 20 );
      
      
      bird.lifetime = 550;
      birdgroup.add(bird);
     
      console.log(bird.velocityX)
    }
  }
}

