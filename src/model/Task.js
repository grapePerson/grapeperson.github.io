import * as TASKS from "../constants/tasks";
import random from 'lodash/random';
import {Utils} from "../utils/Utils";


export class Task {
    constructor(){        
        this.utils = new Utils(); 
        this.mathExpressionObj = this.getMathExpression();   
        this.english = TASKS.ENGLISH.words[random(0, TASKS.ENGLISH.words.length - 1)];
        this.draggbleLetters = TASKS.DRAGGABLE_LETTER.words[random(0, TASKS.DRAGGABLE_LETTER.words.length - 1)]
    };    

    getMathOperation(){
        return ["+", "-", "/", "*"][random(0, 3)];
    };

    getMathExpression(){
        let mathOperation = this.getMathOperation();
        switch (mathOperation) {
            case "+":   
                return this.utils.getSumExpression();
                break;   
            case "-":  
                return this.utils.getSubtractionExpression();
                break;
            case "*":  
                return this.utils.getMultiplyExpression();
                break; 
            case "/":  
                return this.utils.getDivideExpression();
                break;                             
        }   
    };

}