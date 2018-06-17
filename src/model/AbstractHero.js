class AbstractHero {
  constructor(name) {
    this.name = name;
    this.hp = 100;
  }
  getDamaged(value){
    this.hp -= value;
  }
  get heroState(){
    return (`имя ${this.name} жизни ${this.hp}`);
  }
}

export {AbstractHero};
