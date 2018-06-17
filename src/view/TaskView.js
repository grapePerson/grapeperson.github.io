
import {TaskController} from "../controller/TaskController";
import $ from "jquery";
import 'webpack-jquery-ui/sortable';

export class TaskView {
    constructor() {    
        this.init();        
    };
    
    init() {    
        // Temporary element for debug porpose!!!!!!!!!!
        this.trigger = document.querySelector(".trigger");    
        this.modal = document.querySelector(".modal");        
        this.closeButton = document.querySelector(".close-button");        
        this.taskDiv = document.querySelector(".task-wrapper"); 
        this.mathDiv = document.querySelector(".math-content");
        this.englishDiv = document.querySelector(".english-content");
        this.draggableDiv = document.getElementById("wordblock");
        this.spanOperand_1 = document.getElementById("operand1");
        this.spanOperand_2 = document.getElementById("operand2");
        this.spanOperator = document.getElementById("operator_id");
        this.inputResult = document.querySelector("input[name=result]");
        this.spellButton = document.querySelector(".check-result img");
        this.tooltip = document.querySelector(".tooltiptext");
        this.listenBtn = document.querySelector(".audio-btn");
    };

    toggleModal() {
        this.modal.classList.toggle("show-modal");
    };

    displayElement(element) {
        if(element.classList.contains("unactive")){
            element.classList.remove("unactive");
        }
        element.classList.add("active");
    };

    hideElement(element) {
        if(element.classList.contains("active")){
            element.classList.remove("active");
        }
        element.classList.add("unactive");
    };

    displayMath(mathExpressionObj){
        this.displayElement(this.taskDiv);
        this.displayElement(this.mathDiv);
        this.spanOperand_1.innerText = mathExpressionObj.operand_1;
        this.spanOperand_2.innerText = mathExpressionObj.operand_2;
        this.spanOperator.innerText = mathExpressionObj.operator;
        this.inputResult.style.width = "65px";
    };

    clearMath(){
        this.spanOperand_1.innerText = "";
        this.spanOperand_2.innerText = "";
        this.spanOperator.innerText = "";       
        this.clearInput();        
        this.hideElement(this.mathDiv); 
        this.hideElement(this.taskDiv);
    };

    clearInput(){
        this.inputResult.value = "";
        this.inputResult.style.border = "4px solid #006D9C"; 
        this.tooltip.style.visibility = "hidden";
    };

    displayEnglish(word){
        this.displayElement(this.taskDiv);
        this.displayElement(this.englishDiv);
        this.inputResult.style.width = "100%";
        let span = document.getElementById("word1");
        span.innerText = word;
    };

    clearEnglish(){      
        this.clearInput();
        this.hideElement(this.englishDiv); 
        this.hideElement(this.taskDiv);
        this.inputResult.style.width = "3.5rem"; 
        let span = document.getElementById("word1");
        span.innerText = "";        
    };

    displayDraggable(letters){
        this.displayElement(this.draggableDiv);
        this.displayHeading("Drag the letters and drop them in correct order.");        
        const divs = [];        
        for (let i = 0; i < letters.length; i++) {          
          divs.push('<div>' + letters[i] + '</div>');
        }      
        $('#wordblock').html(divs.join(''));
    };

    displayAudio(){
        this.displayElement(this.taskDiv);
        this.displayHeading("Listen to the word and enter it."); 
        this.inputResult.style.width = "100%"; 
        this.displayElement(document.querySelector(".audio-btn"));
    };

    clearAudio(){
        this.hideElement(document.querySelector(".audio-btn"));
        this.hideElement(this.taskDiv);
        this.inputResult.style.width = "3.5rem"; 
    }

    displayHeading(text){
        let h1 = document.getElementById("modal-h1");
        h1.innerText = text;
    };

    changeInputStyle(boolean){        
        if(boolean){
            this.inputResult.style.border = "4px solid #12AF1B";            
            this.tooltip.style.visibility = "hidden";            
        }
        else {
            this.inputResult.style.border = "4px solid #f26f6f";            
            this.tooltip.style.visibility = "visible";
        };
    }

}
