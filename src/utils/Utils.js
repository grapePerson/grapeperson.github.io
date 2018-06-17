import random from 'lodash/random';
import floor from 'lodash/floor';

export class Utils{

    constructor(){
        this.loadImage = function(imgSrc){
            return new Promise((resolve, reject) => {
                let imgObj = new Image();
                imgObj.src = imgSrc;
                imgObj.onload = () => resolve(imgObj);
                imgObj.onerror = () => reject(new Error("The image is not loaded."));
            });
        };
        this.getImages = function(imageSources){
            let imgArr = [];
            return Promise
            .all(imageSources.map(i => this.loadImage(i)));
        };
    };

    createMathExpression(operand1, operand2, operator, result){
        return {operand_1: operand1,
                operand_2:  operand2,
                operator: operator,
                result: result};
    };

    getSumExpression(){
        let operand1 = random(500);
        let operand2 =  random(500);
        return this.createMathExpression(operand1, operand2, "+", operand1 + operand2);
    };

    getSubtractionExpression(){
        let operand1 = random(500);
        let operand2 =  random(500);
        if((operand1 - operand2) < 0){
            return this.createMathExpression(operand2, operand1, "-", operand2 - operand1);
        }
        else
            return this.createMathExpression(operand1, operand2, "-", operand1 - operand2);
    };

    getDivideExpression (){
        let dividend = random(10, 1000);
        let divisor =  random(1, 10);
        dividend = floor(dividend / divisor) * divisor;
        return this.createMathExpression(dividend, divisor,"/", dividend / divisor);
    };

    getMultiplyExpression(){
        let operand1 = random(300);
        let operand2 =  random(10);
        return this.createMathExpression(operand1, operand2, "*", operand1 * operand2);
    };

    preventCharacter(evt){
        var charval= String.fromCharCode(evt.keyCode);
        if(isNaN(charval)){
            evt.preventDefault();
        }
        return true;
    };

    shuffleItems (string){
        let lettersArr = string.split('');
        let currentIndex = lettersArr.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = random(0, currentIndex-1);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = lettersArr[currentIndex];
          lettersArr[currentIndex] = lettersArr[randomIndex];
          lettersArr[randomIndex] = temporaryValue;
        }
        return lettersArr;
    };

    // ТОP_5 of records - player name and max count of the defeated monster for game, stored in localStorage
    updateLocalStorageData(nameStr, countInt){
        console.log(countInt);
        let recordObj = {name: nameStr, count: countInt};
        let recordArr = [recordObj];
        let storageData = {userList: recordArr};

        if("results" in localStorage){
            let resultsObj = JSON.parse(localStorage.getItem("results"));

            if(resultsObj.userList.length == 5){
                let countArr = [];

                for(let i = 0; i < resultsObj.userList.length; i++){
                    countArr.push(resultsObj.userList[i].count);
                }

                let max = Math.max(...(countArr));
                let min = Math.min(...(countArr));
                if(countInt > min){
                    let index = countArr.indexOf(min);
                    if(index !== -1){
                        resultsObj.userList[index] = recordObj;
                    }
                }
            }
            else if(resultsObj.userList.length < 5) {
                resultsObj.userList.push(recordObj);
            }
            localStorage.setItem("results", JSON.stringify(resultsObj));

        } else {
            localStorage.setItem("results", JSON.stringify(storageData));
        }
    };

    getLocalStorageData(){
        if("results" in localStorage){
            let resultsObj = JSON.parse(localStorage.getItem("results"));
            return resultsObj.userList;
        }
        else return "There are no records in localStorage."
    };

}
