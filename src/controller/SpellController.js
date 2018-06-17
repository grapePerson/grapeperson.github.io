import Konva from 'konva';
import { animationsSpells } from "../constants/canvas";
export class SpellController {
    constructor(view) {
    this.spellView = view;
    this.spellImgPlayer = null;
    this.spellPlayer = null;
    this.layerPlayer = new Konva.Layer();
    this.spellImgMonster = null;
    this.spellMonster = null;
    this.layerMonster = new Konva.Layer();
  }

  takeSpriteForSpell(SpellId){
    switch (SpellId) {
      case 'fireBallSpell':
        this.spellImgPlayer.src = 'images/spells/fireBall.png';
        this.spellPlayer.attrs.animation = 'fireBallSpell';
        break;
      case 'iceWodgeSpell':
        this.spellImgPlayer.src = 'images/spells/iceBall.png';
        this.spellPlayer.attrs.animation = 'iceWodgeSpell';
        break;
      case 'cuttingWindSpell':
        this.spellImgPlayer.src = 'images/spells/tornado.png';
        this.spellPlayer.attrs.animation = 'cuttingWindSpell';
        break;
      case 'stoneWodgeSpell':
        this.spellImgPlayer.src = 'images/spells/boulder.png';
        this.spellPlayer.attrs.animation = 'stoneWodgeSpell';
        break;
      default:
        return null;
    }
  }
  createPlayerSpell(spellName){
    this.spellImgPlayer  = new Image();
    this.spellPlayer = new Konva.Sprite({
      x: 70,
      y: window.innerHeight - 300,
      image: this.spellImgPlayer ,
      animations: animationsSpells,
      frameRate: 8,
      frameIndex: 0
    });
    this.takeSpriteForSpell(spellName);
  };

  createMonsterSpell(){
    this.spellImgMonster  = new Image();
    this.spellMonster = new Konva.Sprite({
      x: window.innerWidth-(window.innerWidth / 3),
      y: window.innerHeight - 300,
      image: this.spellImgMonster ,
      animations: animationsSpells,
      frameRate: 8,
      frameIndex: 0
    });
    this.spellImgMonster.src = 'images/spells/boulder.png';
    this.spellMonster.attrs.animation = 'stoneWodgeSpell';
  };

  playerCastSpell(obj){
    obj.playerCast = true;
    setTimeout(()=>{obj.playerCast=false},1000)
    setTimeout(()=>{
      this.layerPlayer.add(this.spellPlayer);
      this.spellView.displayLayer(this.layerPlayer);
      this.spellView.initObject(this.spellPlayer);
      this.spellView.initSpellAnimationPlayer(this.spellPlayerMovements.bind(this),this.layerPlayer);
      this.spellView.startAnimationPlayer();
    },500)
  }

  monsterCastSpell(){
      this.layerMonster.add(this.spellMonster);
      this.spellView.displayLayer(this.layerMonster);
      this.spellView.initObject(this.spellMonster);
      this.spellView.initSpellAnimationMonster(this.spellMonsterMovements.bind(this),this.layerMonster);
      this.spellView.startAnimationMonster();
  }

  spellMonsterMovements(){
    if(this.spellMonster.attrs.x > 10){
       this.spellMonster.setX(this.spellMonster.attrs.x - 20);
    }
    else{
      this.spellMonster.destroy();
      this.spellView.stopAnimationMonster();
    }
  }

  spellPlayerMovements(){
    if(this.spellPlayer.attrs.x < window.innerWidth - 100){
       this.spellPlayer.setX(this.spellPlayer.attrs.x + 20);
    }
    else{
      this.spellPlayer.destroy();
      this.spellView.stopAnimationPlayer();
    }
  }
}
