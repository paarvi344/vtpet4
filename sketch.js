var dog,sadDog,happyDog,garden,washroom,livingRoom,milkBottle2, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/Happy.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/WashRoom.png");
bedroom=loadImage("images/BedRoom.png");
livingRoom=loadImage("images/Living Room.png");
milkBottle2=loadImage("images/milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  background("green");
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(550,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the Dog ");
  feed.position(500,15);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(400,15);
  addFood.mousePressed(addFoods);
}

function draw() {
  currentTime=hour();

  if(foodS=0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
  }else{
    dog.addImage(sadDog);
    milkBottle2.visible=false;
  }
  
  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    milkBottle2.visible=true;
    dog.y=250;
  }

  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
  }
  var Bath = createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
  }
var Sleep = createButton("I am very sleepy");
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
  gameState=4;
  database.ref('/').update({'gameState':gameState});
}));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
  }
  var Play = createButton("Let's play");
  Play.position(500,160);
if(Play.mousePressed(function(){
  gameState=5;
  database.ref('/').update({'gameState':gameState});
}));
  if(gameState===5){
    dog.addImage(livingRoom);
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
  }
  var PlayInGarden = createButton("Let's play in the park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
    if(gameState===6){
      dog.addImage(garden);
      dog.scale=0.175;
      milkBottle2.visible=false;
      dog.y=250;
    }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function writeStock(x){
  database.ref('/').update({
    food:x
  });

}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  
  foodS++;
  database.ref('/').update({
  food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
