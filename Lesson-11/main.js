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

function isPalindrome(str){

	return str.toLowerCase() === str.toLowerCase().split('').reverse().join('');

}

console.log(isPalindrome('Слово'));
console.log(isPalindrome('шалаШ'));


// ЗАДАЧА 4

function areAnagrams (str1, str2){

	return (str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join(''));
            
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
