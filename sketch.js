var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;



var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70;



var gameState = "fight"

var lose, winning, explosionSound;


function preload(){
  


  shooterImg = loadImage("player.png")
  shooter_shooting = loadImage("player.png")

  zombieImg = loadImage("inimigo.png")

  bgImg = loadImage("fundo.png")



}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 4
  

//criando o sprite do jogador
player = createSprite(100, 500, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //criando sprites para representar vidas restantes

   

    //criando grupos de zumbis e balas
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  //exibindo a imagem apropriada de acordo com as vidas restantes



  //vá para gameState "won" se a pontuação for 100
  if(score==100){
    gameState = "won"

  }

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando o espaço for pressionado
if(keyWentDown("space")){
  bullet = createSprite(player.x, player.y,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1

}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//vá para gameState "bullet" quando o jogador ficar sem balas
if(bullets==0){
  gameState = "bullet"

    
}

//destrua o zumbi quando a bala o tocar e aumente a pontuação
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()

 
        score = score+2
        } 
  
  }
}

//reduza a vida e destrua o zumbi quando o jogador o tocar
if(zombieGroup.isTouching(player)){

 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}

//chame a função para gerar zumbis
enemy();
}




drawSprites();

//exibindo a pontuação e as vidas e balas restantes
textSize(20)
  fill("white")
text("Balas = " + bullets,displayWidth-210,displayHeight/2-250)
text("Pontuação = " + score,displayWidth-200,displayHeight/2-220)
text("Vidas = " + life,displayWidth-200,displayHeight/2-280)

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("Você Perdeu ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("Você Venceu",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destrua o zumbi, o jogador e as balas e exiba uma mensagem no gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("Você não tem mais balas!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//criando função para gerar zumbis
function enemy(){
  if(frameCount%50===0){

    //dando posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(1200,1500),random(100,1000),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -7
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}