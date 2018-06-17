import random from 'lodash/random';
import Konva from 'konva';
import { TaskView } from './TaskView';

export class GameView {
  constructor() {
    this.canvasBackground = document.querySelector('#canvasContainer');
    this.arrBackgroung = ["bg_2.jpg", "bg_3.jpg", "bg_4.jpg"];
    this.header = document.querySelector('#header');
    this.menueContainer = document.querySelector('#MenueContainer');
    this.monsterStatusBarContainer = document.querySelector('#monsterStatusBarContainer');
    this.hpLineMonster = document.querySelector('#hpLineMonster');
    this.monsterName = document.querySelector('#monsterName');
    this.monsterHp = document.querySelector('#monsterHp');
    this.hpLineMonster = document.querySelector('#hpLineMonster');
    this.oneHp =2;//px
    this.modalSpell = document.querySelector('#modalSpell');
    this.spellsListContainer = document.querySelector("#spellsListContainer");
    this.heroHp = document.querySelector('#characterHp')
    this.heroRace = document.getElementsByName('heroRace');
    this.heroGender = document.getElementsByName('heroGender');
    this.nameOfHero = document.querySelector('#nameOfHero');
    this.characterName = document.querySelector('#characterName');
    this.hpLineHero = document.querySelector('#hpLineHero');
    this.characterScore = document.querySelector('#characterScore');
    this.gameFieldContainer = document.querySelector('#gameFieldContainer');
    this.characterIcon = document.querySelector('#characterIcon');
    this.gameOver = document.querySelector('#modalGameOverContainer');
    this.spellButton = document.querySelector(".check-result img");
    this.levelLoop = null;    
  };

  initAnsverListener(func){
    this.spellButton.addEventListener("click",func);
  };

  initRenderLevel(func,layer){
    this.levelLoop = new Konva.Animation(function(frame) {
        func();
    }, layer);
    this.levelLoop.start();
  };

  initKeyDownEventListener(func){
    document.addEventListener('keydown',func);
  };

  initKeyUpEventListener(func){
    document.addEventListener('keyup',func);
  };

  initNameOfHeroListner(func){
    this.nameOfHero.addEventListener('keypress',func);
  };

  initMenueListener(func){
    this.menueContainer.addEventListener('click',func);
  };

  initSpellListListener(func){
    this.spellsListContainer.addEventListener('click',func)
  };

  initFirstAudioSpellListListener(func){
    this.spellsListContainer.addEventListener('mouseover',func)
  };

  initSecondAudioSpellListListener(func){
    this.spellsListContainer.addEventListener('mouseout',func)
  };

  renderNextLevel(){
    this.canvasBackground.style.background = `url(images/backgrounds/${this.arrBackgroung[random(0, 2)]})no-repeat fixed center`;
  };

  callGameOver(){
    this.switchClasses(this.gameOver);
    this.gameOver.classList.add('start-animation');
  }

  showHideSpellView(elem){
    if(elem.classList.contains("hidden-spell")){
      elem.classList.remove("hidden-spell");
      elem.classList.add("show-spell");
    }else{
      elem.classList.remove("show-spell");
      elem.classList.add("hidden-spell");
    }
  }

  returnCheckedRadioGender(){
    const gender = [];
    const radioButtons = [...this.heroRace,...this.heroGender].forEach((elem) => {
      if(elem.checked === true){
         gender.push(elem.value);
      }
    });
    return gender
  };

  returnPlayerName(){
    return this.nameOfHero.value
  };

  switchClasses(element){
    if(element.classList.contains("active")){
      element.classList.remove("active");
      element.classList.add("unactive");
    }else{
      element.classList.remove("unactive");
      element.classList.add("active");
    }
  };

  hideMainHeaderBlocks(){
    this.switchClasses(this.header);
    this.switchClasses(this.menueContainer);
  };

  showHideMonsterStatusBar(){
    this.switchClasses(this.monsterStatusBarContainer);
  };

  showHideSpellsList(player){
    if(this.spellsListContainer.classList.contains("hide")){
      this.spellsListContainer.classList.remove("hide");
      this.spellsListContainer.classList.add("show");
      this.modalSpell.classList.remove("hide");
    }else{
      this.spellsListContainer.classList.remove("show");
      this.spellsListContainer.classList.add("hide");
      setTimeout(()=>{modalSpell.classList.add("hide");},500);
    }
  };

  createHeroImg(element){
    switch (this.returnCheckedRadioGender().join("")){
      case "elffemale":
        element.src="images/heroes-icons/elf-female.png";
        break;
      case "elfmale":
        element.src="images/heroes-icons/elf-male.png";
        break;
      default:
        return null;
    }
  };

  createMonsterStatusBar(monster){
    this.monsterHp.style="";
    this.monsterName.innerText = monster.name;
    this.hpLineMonster.textContent = monster.hp;
  };

  createHeroStatusBar(player){
     this.characterName.innerText = player.name;
     this.hpLineHero.textContent = player.hp;
     this.characterScore.innerText = `Score:${player.score}`;
  };

  renderHeroScore(player){
    this.characterScore.innerText = `Score:${player.score}`;
  }

  renderHpMonster(monster){
    this.hpLineMonster.textContent = monster.hp;
    this.monsterHp.style.width = `${this.oneHp*monster.hp}px`;
  };

  renderHpHero(player){
    this.hpLineHero.textContent = player.hp;
   this.heroHp.style.width = `${this.oneHp*player.hp}px`;
  };

  renderScoreTable(dataArr){
    let table = document.createElement("table");
    let html = "";
    html += '<tr><th>Hero name</th><th>Defeated monsters</th></tr>';
    for(let i = 0; i < dataArr.length; i++){
        html += '<tr><td>' + dataArr[i].name + '</td>';
        html += '<td>' + dataArr[i].count + '</td></tr>';
    }
    table.innerHTML = html;
    document.querySelector(".modal-game-over-container").appendChild(table);
  };
}
