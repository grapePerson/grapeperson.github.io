import Konva from 'konva';

export class MonsterView{

    constructor(stage){
        this.stage = stage;        
    };  

    displayLayer(layer){
        this.stage.add(layer);
    };

    initAnimationMove(layer){        
        let that = this;                 
        return new Konva.Animation(function(frame) {           
            let position = layer.getAbsolutePosition();           

            // workarownd due to uexpected behavior of Konva getAbsolutePosition() method.
            if (position.x > -(that.stage.width() / 7)) {
                layer.move({ x: -3, y: 0}); 
            }            
        }, layer);  
    };  

    startAnimation(animation){
        animation.start();
    };

    stopAnimation(animation){
        if(animation.isRunning()){
            animation.stop();
        }        
    };     

    // Is not working yet
    removeLayer(layer){       
        layer.destroyChildren();        
        layer.destroy();        
    };
}