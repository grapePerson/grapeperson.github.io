import Konva from 'konva';
export class SpellView {
  constructor(stage) {
    this.stage = stage;
    this.spellLoopPlayer = null;
    this.spellLoopMonster = null;
  }

  displayLayer(layer){
      this.stage.add(layer);
  };

  initObject(obj){
    obj.start();
  }
  initSpellAnimationPlayer(SpellAnimation,layer){
    this.spellLoopPlayer = new Konva.Animation(function(frame) {
     SpellAnimation(this.spellLoopPlayer)
    },layer);
  }

  startAnimationPlayer(){
    this.spellLoopPlayer.start();
  }

  stopAnimationPlayer(){
    this.spellLoopPlayer.stop();
  }

  initSpellAnimationMonster(SpellAnimation,layer){
    this.spellLoopMonster = new Konva.Animation(function(frame) {
     //вызываем фунцкию которая отвечает за поведение спрайта
     SpellAnimation(this.spellLoopMonster)
    },layer);
  }

  startAnimationMonster(){
    this.spellLoopMonster.start();
  }

  stopAnimationMonster(){
    this.spellLoopMonster.stop();
  }
}
