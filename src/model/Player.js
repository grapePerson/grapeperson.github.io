import {AbstractHero} from "../model/AbstractHero";


export class Player extends AbstractHero {
  constructor(name,gender,race) {
    super(name)
    this.gender = gender;
    this.race = race;
    this.score = 0;
    this.defeatedMonster = 0;
  }
  getDamaged(value){
    super.getDamaged(value);
  }
  getHealed(value){
    this.hp += value;
  }
  addToScore(points){
    this.score += points;
    this.defeatedMonster += 1;
  }
}
