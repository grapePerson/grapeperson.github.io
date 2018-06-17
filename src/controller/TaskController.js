import { Task } from "../model/Task";
import {Utils} from "../utils/Utils";
import { Audio } from "../model/Audio";
import isArray from 'lodash/isArray';
import $ from "jquery";
import 'webpack-jquery-ui/sortable';


export class TaskController {
    constructor(model, view) {
        this.view = view;
        this.model = model;
        this.backMusic = new Audio();
        this.utils = new Utils();
        this.result = "";
        this.isCorrect = null;
        this.checkDraggableResult = (evt) => {
            evt.preventDefault();
            let isCorrect = this.isDraggableCorrect();
            if(isCorrect){
                this.view.displayHeading("You win!");
                this.isCorrect = true;
            }
            if(!isCorrect){
                this.view.displayHeading("You lost!");
                this.isCorrect = false;
            }
            setTimeout(() => {
                this.closeModal();
                this.view.hideElement(this.view.draggableDiv);
            }, 1500);
        };

        this.checkInputResult = (evt) => {
            evt.preventDefault();
            let isCorrect;
            if(isArray(this.result)){
                isCorrect = this.result.some((element) => {
                    return this.view.inputResult.value === element;
                });
            }
            else {
                isCorrect = this.view.inputResult.value == this.result;
            }
            this.view.changeInputStyle(isCorrect);

            if(isCorrect){
                this.view.displayHeading("You win!");
                this.isCorrect = true;
            }
            if(!isCorrect){
                this.view.displayHeading("You lost!");
                this.isCorrect = false;
            }
            setTimeout(() => {
                this.closeModal();
                setTimeout(() => {
                    this.view.clearEnglish();
                    this.view.clearAudio();
                    this.view.clearMath();
                }, 500);
            }, 1500);
        };
        this.init();
    };

    init() {
        this.view.closeButton.addEventListener("click", this.closeModal.bind(this), false);
        this.view.spellButton.addEventListener("click", this.checkInputResult, false);
    };

    closeModal(){
        this.view.toggleModal();
    };

    initMathTask(){
        this.view.toggleModal();
        this.view.displayMath(this.model.mathExpressionObj);
        this.result = this.model.mathExpressionObj.result;
    };

    initEnglishTask(){
        this.view.toggleModal();
        this.view.displayEnglish(this.model.english.word);
        this.result = this.model.english.trans;
    };

    initDraggableTask() {
        this.view.toggleModal();
        this.view.hideElement(this.view.taskDiv);
        this.view.spellButton.removeEventListener("click", this.checkInputResult, false);
        this.view.spellButton.addEventListener("click", this.checkDraggableResult, false);

        $("#wordblock").sortable();
        $("#wordblock").disableSelection();

        let word = this.model.draggbleLetters.correct;
        let letters = this.utils.shuffleItems(word);
        this.result = word;

        this.view.displayDraggable(letters);
    };

    isDraggableCorrect(){
        let resultWord = '';
        $('#wordblock>div').each(function(e) {
            resultWord += $(this).text();
        });
       return resultWord == this.result;
    };

    initAudioTask(){
        this.backMusic.battleMusic.volume = 0.2;
        this.view.toggleModal();
        this.view.displayAudio();

        var synth = window.speechSynthesis;
        let word = this.model.english.word;
        this.result = word;

        this.view.listenBtn.onclick = (event) => {
            event.preventDefault();

            var utterThis = new SpeechSynthesisUtterance(word);
            utterThis.voice = synth.getVoices()[0];
            synth.speak(utterThis);
        }
    };
}
