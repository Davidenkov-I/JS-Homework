// Задача 1

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};

var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);

function deepClone(obj) {
    var newObj = {};
    var newArray = [];

    for (var key in obj) {
        if(typeof(obj[key]) === 'string' || typeof(obj[key]) === 'number' || typeof(obj[key]) === 'boolean' || 
        typeof(obj[key]) === 'undefined' || typeof(obj[key]) === 'function'){
            newObj[key] = obj[key];
        }
        else if(Array.isArray(obj[key])){
            for(var i = 0; i < obj[key].length; i++){
                if(typeof(obj[key][i]) === 'string' || typeof(obj[key][i]) === 'number' || typeof(obj[key][i]) === 'boolean' || 
                typeof(obj[key][i]) === 'undefined' || typeof(obj[key][i]) === 'function'){
                    newArray[newArray.length] = obj[key][i];
                }
                else{
                    newArray[newArray.length] = deepClone(obj[key][i]);
                }
            }

            newObj[key] = newArray;

        }
        else if(typeof(obj[key]) === 'object'){
            if(obj[key] === null){
                newObj[key] = obj[key];
            }
            else {
                newObj[key] = deepClone(obj[key]);
            }
        }
    }
      
    return newObj;

}