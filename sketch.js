//Create variables here
var dog, happyDog , database, foodS, foodStock,foodObj;
var dogImg,bgimage;
var buttonF,buttonA
var milkimg
var fedTime, lastFed

function preload()
{

	//load images here

  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  bgimage   = loadImage("download.jpg");

}

function setup() {
	createCanvas(1000,500);

  dog = createSprite(450,290,20,30);
  dog.addImage(dogImg);
  dog.scale=0.3;

  foodObj = new Food();

  database = firebase.database();
  foodStock = database.ref('Food')
  foodStock.on("value", readStock);

 buttonA = createButton('Buy food');
 buttonA.position(1100,150)
 buttonF = createButton('Feed food');
 buttonF.position(1210,150)
}


function draw() {  
background(bgimage)
/*
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

if(foodS===0){
 foodS=20
}*/
foodObj.display();

fedTime = database.ref('FeedTime')
fedTime.on("value", function(data){
lastFed=data.val();
});


buttonA.mousePressed(()=>{
  addFood();
})

buttonF.mousePressed(()=>{
  feedFood();
})



  drawSprites();

  //add styles here
  stroke("black")
  fill("lightblue");
  textSize(30);
  text("food = "+foodS,390,160);
  fill("yellow");
  //text("press the up arrow to feed your dog",214,90);





}

function addFood(x){
  foodS++

  database.ref("/").update({
  Food:foodS
  })

}


function feedFood(){
  dog.addImage(dogImg);
  foodObj. updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock()
   // feedTime:hour
  })
}


function readStock(data){

  foodS=data.val();
  foodObj. updateFoodStock(foodS);
  
}

function writeStock(x) {

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref("/").update({
  Food:x
  })
  
  }





