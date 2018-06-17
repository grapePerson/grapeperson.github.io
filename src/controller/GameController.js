import random from 'lodash/random';
import isArray from 'lodash/isArray';
import { Player } from "../model/Player";
import { PlayerController } from "../controller/PlayerController";
import { PlayerView } from "../view/PlayerView";
import { SpellController } from "../controller/SpellController";
import { SpellView } from "../view/SpellView";
import {Monster} from "../model/Monster";
import { MonsterController } from "../controller/MonsterController";
import { MonsterView } from "../view/MonsterView";
import { Audio } from "../model/Audio";
import { TaskController } from "../controller/TaskController";
import { TaskView } from "../view/TaskView";
import { Task } from "../model/Task";
import {Utils} from "../utils/Utils";
import { Timer } from "../model/Timer";


export class GameController {

  constructor(view,stage) {
    this.gameView = view;
    this.stage = stage;
    this.timer = new Timer();
    this.audio = new Audio();
    this.player = null;
    this.playerController = null;
    this.playerView = null;
    this.monster = null;
    this.monsterView = null;
    this.monsterController = null;
    this.task = null;
    this.taskView = null;
    this.taskController = null;
    this.spellView = null;
    this.spellController = null;
    this.gameOverTimer = null;
    this.utils = new Utils();
    this.ansverSend = false;
  }

  keyDownListener(ev){
    if(ev.keyCode ===39){
      this.playerController.presedKey='right';
      if(this.playerController.playerCanWalk === true){
        this.audio.playAudio(this.audio.playerWalks);
      }
    }
    if(ev.keyCode ===37){
      this.playerController.presedKey='left';
      if(this.playerController.playerCanWalk === true){
        this.audio.playAudio(this.audio.playerWalks);
      }
    }
  }

  keyUpListener(ev){
    if(ev.keyCode ===39){
      this.playerController.presedKey = null;
      if(this.playerController.playerCanWalk === true){
        this.audio.stopAudio(this.audio.playerWalks);
      }
    }
    if(ev.keyCode ===37){
      this.playerController.presedKey = null;
      if(this.playerController.playerCanWalk === true){
        this.audio.stopAudio(this.audio.playerWalks);
      }
    }
  }

  checkPressedKey(ev){
    if(ev.charCode >= 32 && ev.charCode <= 64){
      ev.preventDefault();
    }else if(ev.charCode >= 91 && ev.charCode <= 96){
      ev.preventDefault();
    }else if(ev.charCode >= 123 && ev.charCode <= 126){
      ev.preventDefault();
    }
  }

  startSoundCheckSpell(ev){
    if(ev.target.tagName === 'SPAN'){
        this.audio.playAudio(this.audio.playerChecksSpell);
        this.gameView.showHideSpellView(ev.target.parentNode.children[1]);
    }
  }

  stopSoundCheckSpell(ev){
    if(ev.target.tagName === 'SPAN'){
        this.audio.stopAudio(this.audio.playerChecksSpell);
        this.gameView.showHideSpellView(ev.target.parentNode.children[1]);
    }
  }

  checkNameHero(){
    if(this.gameView.nameOfHero.value === ""){
      alert("Please, enter the name of your hero!");
      return false;
    }else if (this.gameView.nameOfHero.value.length < 5) {
      alert("The hero name should be at least 5 characters.");
      return false;
    }else{
      return true;
    }
  }

  RenderingLevel(){
    let x = window.innerWidth - 130;
    if(this.playerController.character.attrs.x > x){
      this.playerController.backPlayerStopMove()
      this.monster = new Monster();
      this.monsterView = new MonsterView(this.stage);
      this.monsterController = new MonsterController(this.monster,this.monsterView);
      this.gameView.renderNextLevel();
      this.gameView.createMonsterStatusBar(this.monster);
      this.gameView.showHideMonsterStatusBar();
      this.monsterController.createMonster();
      this.monsterController.monsterMove();
      setTimeout(()=>{
        this.gameView.showHideSpellsList(this.player)
      },200);
      this.audio.stopAudio(this.audio.mainMusic);
      this.audio.playAudio(this.audio.battleMusic);
    }
  }

  takeTaskForSpell(spellId){
    switch (spellId) {
      case 'fireBallSpell':
        setTimeout(()=>{
          this.taskController.initMathTask()
        },1000);
        break;
      case 'iceWodgeSpell':
        setTimeout(()=>{
          this.taskController.initEnglishTask()
        },1000);
        break;
      case 'cuttingWindSpell':
        setTimeout(()=>{
          this.taskController.initDraggableTask()
        },1000);
        break;
      case 'stoneWodgeSpell':
        setTimeout(()=>{
          this.taskController.initAudioTask()
        },1000);
        break;
      default:
        return null;
      }
  }

  spellList(ev){
    if(ev.target.tagName === 'SPAN'){
        this.spellView = new SpellView(this.stage);
        this.spellController = new SpellController(this.spellView);
        this.gameView.showHideSpellsList(this.player);
        this.spellController.createPlayerSpell(ev.target.parentNode.id);
        this.spellController.createMonsterSpell();
        this.task = new Task();
        this.taskView = new TaskView();
        this.taskController = new TaskController(this.task, this.taskView);
        this.takeTaskForSpell(ev.target.parentNode.id);
      }
  }

  checkTaskAnsver(ev){
    ev.preventDefault();
    setTimeout(()=>{
      this.taskController.view.spellButton.removeEventListener("click", this.taskController.checkInputResult, false);
      this.taskController.view.spellButton.removeEventListener("click", this.taskController.checkDraggableResult, false);
      if(!this.ansverSend){
        this.ansverSend = true;
        if(this.taskController.isCorrect){
          this.audio.playAudio(this.audio.taskAccept);
          this.monster.getDamaged(50);
          setTimeout(()=>{
            this.audio.playAudio(this.audio.playerCasts);
            this.spellController.playerCastSpell(this.playerController);
            this.ansverSend = false;
          },2000);
          setTimeout(()=>{
            this.gameView.renderHpMonster(this.monster);
          },2000);
        }else{
          this.audio.playAudio(this.audio.taskDecline);
          this.player.getDamaged(50);
          setTimeout(()=>{
            this.audio.playAudio(this.audio.playerCasts);
            this.spellController.monsterCastSpell();
            this.ansverSend = false
          },2000);
          setTimeout(()=>{
            this.playerController.palayerGetDmg = true;
          },3200)
          setTimeout(()=>{
            this.playerController.palayerGetDmg = false;
          },4000);
          setTimeout(()=>{
            this.gameView.renderHpHero(this.player);
          },2000);
        }
        this.hpCharactersTrigger();
      }
    },100);
  };

  stopGame(){
    this.audio.stopAudio(this.audio.battleMusic);
    this.audio.stopAudio(this.audio.mainMusic);
    this.utils.updateLocalStorageData(this.player.name,this.player.defeatedMonster); ////   Temp for debug !!!!!!!!!!!!!!!
    let storageData = this.utils.getLocalStorageData();
    if(isArray(storageData)){
      this.gameView.renderScoreTable(storageData);
    }
    this.gameView.callGameOver();
    this.stopGameOverTimer();
    this.timer.stop();
  }

  hpCharactersTrigger(){
    if(this.player.hp === 0){
      setTimeout(()=>{
        this.stopGame();
      },4000);
    }else if(this.monster.hp === 0){
      setTimeout(()=>{
        this.playerController.playerCanWalk = true;
        this.audio.stopAudio(this.audio.battleMusic);
        this.audio.playAudio(this.audio.mainMusic);
        this.gameView.showHideMonsterStatusBar();
        this.monsterController.destroyMonster();
        this.player.addToScore(20);
        this.gameView.renderHeroScore(this.player);
      },4000);
    }else{
      setTimeout(()=>{
        this.gameView.showHideSpellsList(this.player);
      },4000);
    }
  }
  startGameOverTimer(){
    this.gameOver = setInterval(()=>{
      if(this.timer.minutes >= 2){
        this.stopGame()
      }
    },1000)
  }
  stopGameOverTimer(){
    clearInterval(this.gameOver);
  }
  startGame(ev){
    switch (ev.target.id) {
      case "goToMainMenue":
        this.gameView.switchClasses(this.gameView.menueContainer.children[0]);
        this.gameView.switchClasses(this.gameView.menueContainer.children[1]);
        this.gameView.createHeroImg(document.querySelector('#heroImg'));
        this.audio.playAudio(this.audio.mainMusic);
        break;
      case "radioElfRace":
        this.gameView.createHeroImg(document.querySelector('#heroImg'));
        break;
      case "radioGenderMale":
        this.gameView.createHeroImg(document.querySelector('#heroImg'));
        break;
      case "radioGenderFemale":
        this.gameView.createHeroImg(document.querySelector('#heroImg'));
        break;
      case "starGame":
        if(this.checkNameHero()){
          this.startGameOverTimer();
          this.gameView.hideMainHeaderBlocks();
          this.timer.start();
          this.player = new Player(this.gameView.nameOfHero.value,this.gameView.returnCheckedRadioGender()[1],this.gameView.returnCheckedRadioGender()[0]);
          this.gameView.switchClasses(this.gameView.gameFieldContainer);
          this.gameView.createHeroImg(this.gameView.characterIcon);
          this.gameView.createHeroStatusBar(this.player);
          this.playerView = new PlayerView(this.stage);
          this.playerController = new PlayerController(this.player,this.playerView);
          this.gameView.initKeyDownEventListener(this.keyDownListener.bind(this));
          this.gameView.initKeyUpEventListener(this.keyUpListener.bind(this));
          this.gameView.initAnsverListener(this.checkTaskAnsver.bind(this));
          this.playerController.setCoordinatesSprites();
          this.playerController.createPlayer();
          this.playerController.playerCanWalk = true;
          this.gameView.initRenderLevel(this.RenderingLevel.bind(this),this.playerController.layer);
          this.gameView.initSpellListListener(this.spellList.bind(this));
          this.gameView.initFirstAudioSpellListListener(this.startSoundCheckSpell.bind(this));
          this.gameView.initSecondAudioSpellListListener(this.stopSoundCheckSpell.bind(this));

          //else throw new Error

        }
        break;
      default:
        return null;
    }
  }
}
