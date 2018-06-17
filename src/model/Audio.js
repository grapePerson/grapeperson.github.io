export class Audio {
  constructor() {
    this.mainMusic = document.querySelector('#mainMusic');
    this.battleMusic = document.querySelector('#battleMusic');
    this.taskAccept = document.querySelector('#taskAccept');
    this.taskDecline = document.querySelector('#taskDecline');
    this.playerWalks = document.querySelector('#playerWalks');
    this.playerChecksSpell = document.querySelector('#playerChecksSpell');
    this.playerCasts = document.querySelector('#playerCasts');
    this.battleMusic.volume = 0.5;
  }
  stopAudio(audio){
    audio.pause();
    audio.currentTime = 0.0;
  }
  playAudio(audio){
    audio.play();
  }
}
