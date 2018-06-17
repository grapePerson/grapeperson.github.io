//import { layer } from "../constants/canvas";
import Konva from 'konva';
import { elfMale , elfFemale } from "../constants/canvas";

export class PlayerController {

  constructor(model,view) {
    this.player = model;
    this.playerView = view;
    this.layer = new Konva.Layer(); ;
    this.animationsCharacter = null;
    this.characterImg = null;
    this.character  = null;
    this.stringSrcPart = null;
    this.presedKey = null;
    this.palayerGetDmg = false;
    this.playerCanWalk = false;
    this.playerCast = false;
  }

  createPlayer(){
    this.characterImg = new Image();
    this.characterImg.src = `images/heroes-icons/${this.stringSrcPart}-stay.png`;//строка пути к картинке
    this.character = new Konva.Sprite({
        x: 10,
        y: window.innerHeight - 300,
        image: this.characterImg,
        animation: 'stay',
        animations: this.animationsCharacter,
        frameRate: 6,
        frameIndex: 0
    });
    this.layer.add(this.character);
    this.playerView.displayLayer(this.layer);
    this.playerView.initObject(this.character);
    this.playerView.initMoveAnimation(this.animationMovements.bind(this),this.layer)
    this.playerView.startAnimation();
  }

  setCoordinatesSprites(){
    switch (`${this.player.race+this.player.gender}`) {
      case "elffemale":
        this.animationsCharacter = elfFemale;
        this.stringSrcPart = 'elf-female';
        break;
      case "elfmale":
        this.animationsCharacter = elfMale;
        this.stringSrcPart = 'elf-male';
        break;
      default:
        return null;
    };
  }

  animationMovements(){
    let x = window.innerWidth - 130;
    if(this.presedKey==='left' && this.character.attrs.x!==10 && this.playerCanWalk){
        this.characterImg.src=`images/heroes-icons/${this.stringSrcPart}-walk.png`;
        this.character.attrs.animation = 'walking';
        this.character.setX(this.character.attrs.x - 5);
    }
    if(this.presedKey==='right' && this.playerCanWalk) {
      this.characterImg.src=`images/heroes-icons/${this.stringSrcPart}-walk.png`;
      this.character.attrs.animation = 'walking';
      this.character.setX(this.character.attrs.x + 10);
    }
    if(this.presedKey === null && !this.playerCast){
      this.characterImg.src=`images/heroes-icons/${this.stringSrcPart}-stay.png`;
      this.character.attrs.animation = 'stay';
    }
    if(this.playerCast){
      this.characterImg.src=`images/heroes-icons/${this.stringSrcPart}-cast.png`;
      this.character.attrs.animation = 'cast';
    }
    if(this.palayerGetDmg){
      this.characterImg.src=`images/heroes-icons/${this.stringSrcPart}-get-damaged.png`;
      this.character.attrs.animation = 'getDamaged';
    }
  }

  backPlayerStopMove(){
    this.character.setX(10);
    this.playerCanWalk = false;
  }

  playerDoCast(){
    this.playerCast = true;//каст игрока
    setTimeout(()=>{
      this.playerCast=false
    },1000)
  }
}
