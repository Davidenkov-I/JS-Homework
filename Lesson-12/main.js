// ЗАДАЧА 1

var array = ['Вася', 'Петя', 'Валера'];

function namesArray (arr) {
    var newArray = [];

    for (var i = 0; i < arr.length; i++) {
        newArray[i] = {name: array[i]};
    }

    return newArray;
}

console.log(namesArray(array));



// ЗАДАЧА 2

var array = ['00', '13', '24'];

function timeOfArray (arr) {

    return arr.reduce(function(a , b){
        return a + ' : ' + b;
    }, 'Текущее время');

}

console.log(timeOfArray(array));



// ЗАДАЧА 3

var str1 = 'Написать чистую функцию, которая будет возвращать количество гласных в переданном тексте.'; // 30 гласных

function quantityVowel (str){

    var sumVowel = 0;

    // функция для определения гласных
    function isVowel( chr ){ 
        return 'аеёиоуыэюя'.indexOf( chr.toLowerCase() ) !== -1;
    }

    // счетчик гласных. Через старый добрый фор, зачем что-то усложнять, если не намного короче получится.
    for (var i = 0; i < str.length; i++){
        if ( isVowel(str[i]) ){
            sumVowel++;
        }
    }

    return sumVowel;
}

console.log(quantityVowel(str1));



// ЗАДАЧА 4

var str = 'Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые, восклицательные и вопросительные знаки! Текст необходимо разбить на предложения? Разрешается использовать регулярное выражение в методе split.';


function textDivider (str){

    var newStr = '';
    str = str.split(/[.!?]/);

    function isSymbol( chr ){ 
        return ' ,:'.indexOf( chr ) === -1;
    }
	
    for (var i = 0; i < str.length-1; i++) {

        var sumSymbol = 0;

        for (var x = 0; x < str[i].length; x++){
            if ( isSymbol(str[i][x]) ){
                sumSymbol++;
            }
        }

        newStr += (str[i] + ' (Букв в предложении: ' + sumSymbol + ')\n');

    }

    return newStr;
}


console.log(textDivider(str));