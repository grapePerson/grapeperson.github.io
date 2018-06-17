import {AbstractHero} from "../model/AbstractHero";
import random from 'lodash/random';
import * as APPEARANCE from "../constants/appearance";

class Monster extends AbstractHero {
    constructor() {              
        super(`${APPEARANCE.HEROES.monster.name[0][random(0, 2)]} ${APPEARANCE.HEROES.monster.name[1][random(0, 2)]} ${APPEARANCE.HEROES.monster.name[2][random(0, 2)]}`);            
        this.body = [APPEARANCE.HEROES.monster.head[random(0, 2)],
            APPEARANCE.HEROES.monster.body[random(0, 2)],
            APPEARANCE.HEROES.monster.feet[random(0, 2)]
        ];
    }

    getDamaged(value){
        super.getDamaged(value);
    }
}

export {Monster};
