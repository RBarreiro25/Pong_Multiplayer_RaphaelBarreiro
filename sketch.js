//variáveis da bolinha
let xBola = 300;
let yBola = 200;
let diametroBola = 13;
let raioBola = diametroBola / 2;

//velocidade da bolinha
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//variáveis da raquete
let xRaquete = 7;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis do oponente
let xRaqueteOponente = 583;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente,
                         yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar();
  marcaPonto();
  limiteRaquetes();
  centralizarBolaAposPonto();
}

function mostraBola(){
  circle(xBola, yBola, diametroBola);
}

function movimentaBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificaColisaoBorda(){
  if (xBola > width - raioBola ||
      xBola < raioBola) {
    velocidadeXBola *= -1;
  }
  if (yBola > height - raioBola ||
      yBola < raioBola){
    velocidadeYBola *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x , y, 
       comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBola - raioBola < xRaquete + comprimentoRaquete && yBola - raioBola < yRaquete + alturaRaquete && yBola + raioBola > yRaquete) {
    velocidadeXBola *= -1}
  raquetada.play();
  }

function verificaColisaoRaquete(x, y){
  colidiu =
collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBola, yBola, raioBola);
  if (colidiu){
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(209, 0 , 13));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(209, 0 , 13));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBola > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}

function limiteRaquetes(){
  if (yRaquete < 0) {
    yRaquete = 0;
  }
  if (yRaqueteOponente < 0){
    yRaqueteOponente = 0;
  }
  if (yRaquete > height - alturaRaquete) {
    yRaquete = height - alturaRaquete;
  }
  if (yRaqueteOponente > height - alturaRaquete) {
    yRaqueteOponente = height - alturaRaquete;
  }
}

function centralizarBolaAposPonto(){
  if (xBola < 10 || xBola > 590) {
    xBola = 300;
    yBola = 200;
  }
}