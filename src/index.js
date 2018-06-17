import {Player} from "./model/Player";
import Konva from 'konva';
import random from 'lodash/random';
import {Monster} from "./model/Monster";
import { MonsterController } from "./controller/MonsterController";
import { MonsterView } from "./view/MonsterView";
import { TaskController } from "./controller/TaskController";
import { TaskView } from "./view/TaskView";
import { GameController } from "./controller/GameController";
import { GameView } from "./view/GameView";
import { Task } from "./model/Task";


const canvasWidth = window.outerWidth;
const canvasHeight = window.innerHeight;
const stage = new Konva.Stage({
    container: 'canvasContainer',
    width: canvasWidth,
    height: canvasHeight
});

const gameView = new GameView();
const gameController = new GameController(gameView,stage);

gameView.initMenueListener(gameController.startGame.bind(gameController));
gameView.initNameOfHeroListner(gameController.checkPressedKey);
