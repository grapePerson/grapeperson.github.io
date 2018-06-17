export class Timer {
  constructor() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timeInterval = null;
  }
  timerFunction() {
    if(this.seconds <=59){
      this.seconds++;
    }
    if(this.seconds===60){
      this.seconds = 0;
      this.minutes++;
    }
    if(this.minutes === 60){
      this.hours++;
      this.minutes =0;
    }
  }
  start(){
    this.timeInterval = setInterval(this.timerFunction.bind(this),1000);
  }
  stop() {
    clearInterval(this.timeInterval);
  }
  get showTime() {
    if(!this.hours){
      return `${this.minutes}:${this.seconds}`
    }else{
      return `${this.hours}:${this.minutes} :${this.seconds}`
    }
  }
  reset() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
}
