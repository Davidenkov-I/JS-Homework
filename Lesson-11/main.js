// ЗАДАЧА 1

function filterArr(array){

    function func(v, i, a){
        return v > 0;
    }

    return array.filter(func);

}

filterArr([-1, 0, 2, 34, -2]);

// ЗАДАЧА 2

var array = [-2, 0, -7, 5, 4, 10];

var foundArr = array.find(function(arr){
    return arr > 0;
});

console.log(foundArr);

// ЗАДАЧА 3

function isPalindrome(str1){

    var str = str1;

    str = str.toLowerCase();

    var arrayStr = str.split('');
    var arrayStrReverse = str.split('');

    arrayStrReverse.reverse();

    var bool;

    // тут мог быть метод every
    for(var i = 0; i < arrayStr.length; i++){
        if (arrayStr[i] !== arrayStrReverse[i]){
            bool = false;
            break;
        }
        bool = true;
    }

    return bool;
}

console.log(isPalindrome('Слово'));
console.log(isPalindrome('шалаШ'));


// ЗАДАЧА 4

function areAnagrams (str1, str2){

    if (str1.length !== str2.length){
        return false;
    }

    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    var bool;

    for (var i = 0; i < str1.length; i++){
		
        if (str2.indexOf(str1[i]) === -1){
			
            bool = false;
            break;
        }

        bool = true;
        str2.replace(str1[i], '');		
    }

    return bool;

}

console.log(areAnagrams('кот', 'отк'));
console.log(areAnagrams('кот', 'атк'));
console.log(areAnagrams('кот', 'отко'));

// ЗАДАЧА 5

function divideArr(array, number){

    var newArray = [];

    for (var i =0; i <= array.length; i++) {

        if (array.length >= number){

            newArray[i] = array.splice(0, number);
        }
        else if (array.length < number){

            newArray[i] = array.splice(0, array.length);
        }
    }

    return newArray;
}

console.log(divideArr([1, 2, 3, 4], 2));
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3));
