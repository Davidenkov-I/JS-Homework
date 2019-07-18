// ЗАДАЧА 1

var array = ['Вася', 'Петя', 'Валера'];

function namesArray (arr) {

    return arr.map(function(element){
        return {name: element};
    });

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

// задача 5

var str = 'Написать функцию, которая привет будет принимать текст в качестве параметра. Привет у текста должны быть пробелы, точки, запятые,восклицательные и вопросительные знаки. Текст необходимо разбить на предложения по точкам, восклицательным ивопросительным знакам убрав их разрешается использовать регулярное выражение в методе split.Для каждого привет из предложений вывести текст предложения и рядом количество букв в нем привет без учета пробелов, запятыхи именно букв.';
//4 слова привет


function maxReiteration(str){

    var number = 0;  // счетчик повторений слова
    var max = 0; // хранит максимальное число повторений
    var words = []; //массив раздельных слов
    var word = ''; // текущее проверяемое слово
    var accum = ''; // сохраненное слово с максимальным числом повторений

    //разделяем текст на отдельные слова, с нижним регистром и отсортированные
    words = str.toLowerCase().split(/[, .!?:]/).sort(); 

    //цикл который берет слова по порядку и пробегает по всем словам ища совпадения
    for( var i = 0; i < words.length; i++){

        word = words[i];

        for ( var x = 0; x < words.length; x++){

            if (word === words[x] && word !== ''){
                number++;
            }
        }

        // если число повторений слова больше текущего максимального значения, то переписать слово и количество повторений
        if (number > max){
            accum = word;
            max = number;
        }
        number = 0; // скидывает счетчик слова. В противном случае все слова будут суммироваться по количеству повторений
    }

    return 'Максимальное число повторений слова ' + accum + ' ' + max + ' раз';
	

}


console.log(maxReiteration(str));