import Konva from 'konva';

export class PlayerView {
  constructor(stage) {
    this.stage = stage;
    this.playerLoop = null;
  }

  displayLayer(layer){
    this.stage.add(layer);
  }

  initObject(obj){
    obj.start();
  }

  initMoveAnimation(animationMovements,layer){
    this.playerLoop = new Konva.Animation(function(frame) {
        animationMovements();
    }, layer);
  }
  startAnimation(){
    this.playerLoop.start();
  }
}
