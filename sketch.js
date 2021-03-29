

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world
var backgroundImage
var platform1
var score=0
var slingshot
var ball
var balls=[]
var invisibleground,platform
var cloudsGroup;
var gameState = "onSling"
var gameeState= PLAY;     
var PLAY=1  
var playImg                                                            

function preload(){
    backgroundImage=loadImage("images/background image.png");
    platform1image=loadImage("images/platform images (1).jpg")
    platform2image=loadImage("images/platform images (4).jpg")
    platform3image=loadImage("images/platform images (5).jpg")
    cloudImage=loadImage("images/cloud1.png")
    bottle1image=loadImage("images/bottle.png")
    playImg=loadImage("images/playButton.png")
}


function setup(){
    var canvas=createCanvas(displayWidth-20,displayHeight-20)

    engine = Engine.create();
    world = engine.world;

    //adding the play button
    playButton=createSprite(800,300,20,20)
    playButton.addImage(playImg)
   
    //aADDING THE PLATFORM
    platform1=createSprite(120,390,10,10)
    platform1.addImage(platform1image)
    platform1.scale=0.8

    //adding the platform
    platform2=createSprite(650,270,200,200)
    platform2.addImage(platform2image)
    platform2.scale=0.8

     //adding the platform
     platform3=createSprite(1200,400,200,200)
     platform3.addImage(platform3image)
     platform3.scale=0.8
    
     //adding the bottles
      bottle1=createSprite(620,125,30,30)
      bottle1.addImage(bottle1image)
      bottle1.scale=0.4

      bottle2=createSprite(680,125,30,30)
      bottle2.addImage(bottle1image)
      bottle2.scale=0.4

      bottle3=createSprite(1160,258,30,30)
      bottle3.addImage(bottle1image)
      bottle3.scale=0.4

      bottle4=createSprite(1240,258,30,30)
      bottle4.addImage(bottle1image)
      bottle4.scale=0.4
   
    //adding balls
    ball=new Ball(150,180)
    ball2=new Ball(100/2,50)
    ball3=new Ball(110,50)
    ball4=new Ball(170,50)
    

    balls.push(ball4)
    balls.push(ball3)
    balls.push(ball2)
    balls.push(ball)

    //adding slingshot
     slingshot = new Slingshot(ball.body,{x:150, y:180});

    

    // adding the clouds
    cloudsGroup = createGroup();
    


    //adding ground and platform
   ground=new Ground(400,617,2300,10);
   platform=new Ground(130,380,113,113)
   platform2=new Ground(100,65,100*2,10)

}

function draw(){

    textSize(45)
    fill("rgb(255,205,66)")
    text("PRESS THE PLAY BUTTON !!!"  ,470,500 )
    
    //ADDING NON VISBLITY FUNCTION
    bottle1.visible = false;
    bottle2.visible = false;
    bottle3.visible = false;
    bottle4.visible = false;
    platform1.visible = false;
    platform2.visible = false;
    platform3.visible = false;

     //ADDING THE PLAY BUTTON
    if(mousePressedOver(playButton)) {
        reset();
      }
     
    //ADDING THE GAME STATE
      if(gameeState===PLAY){

      playButton.visible=false
    background(backgroundImage)

    //texting the score
    noStroke();
    textSize(35)
    fill("cream")
    text("Score:-  " + score, width-300, 50)

   
    Engine.update(engine);
    
      //ADDING THE VISIBLITY FUNCTION
     bottle1.visible=true
     bottle2.visible=true
     bottle3.visible=true
     bottle4.visible=true
     platform1.visible=true;
     platform2.visible=true;
     platform3.visible=true;
      
    

    ball.display()
    ball2.display()
    ball3.display()
    ball4.display()
    ground.display()
    platform.display()
    platform2.display()
    slingshot.display();
    bottle1.display()

    spawnClouds()
     
      }
     drawSprites();
}


           function reset(){
                gameeState=PLAY

            } 

        // 1 adding function for spawning of clouds
function spawnClouds() {
    if (frameCount % 90 === 0) {
      var cloud = createSprite(1500,120,40,10);
      cloud.y = Math.round(random( 50,120));
      cloud.addImage(cloudImage);
      cloud.scale = 1;
      cloud.velocityX = -3;
      
       //assign lifetime to the variable
      cloud.lifetime = 500;
      
       //add each cloud to the group
       cloudsGroup.add(cloud);
    }
  }
        
        // 2 adding function for mouse dragged
  function mouseDragged(){
    if (gameState!=="launched"){
         Matter.Body.setPosition(balls[balls.length-1].body, {x: mouseX , y: mouseY});
         Matter.Body.applyForce(balls[balls.length-1].body, balls[balls.length-1].body.position, {x: 5 , y: -5});
         return(false);
     }
 }

      
         // 3 adding function for mouse released
    function mouseReleased(){
        slingshot.fly();
        balls.pop ()
        gameState = "launched";
        return (false)
    }


        // 4 adding function for space key
    function keyPressed(){
        if(keyCode === 32 && gameState==="launched"){
            Matter.Body.setPosition(balls[balls.length-1].body,{x:200/2,y:180})
           slingshot.attach(balls[balls.length-1].body);
           gameState="onSling";
        }
    }