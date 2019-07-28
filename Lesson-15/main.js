
table = document.getElementsByTagName('table')[0];

table.onclick = function(event){
    var target = event.target;
    
    if(target.tagName != 'TD') return;

    //если ячейка имеет дата атрибут, то выполнить функцию по созданию строки в начале таблици
    if(target.hasAttribute('data-table')){
        createTableLine();
    }
    //если ячейка не имеет дата атрибута, то выполнить функцию по созданию в ячейке инпута
    if(!target.hasAttribute('data-table')){
        tableInput(target);
    }

};

//функция создания строки таблици в самом начале
function createTableLine(){
    tableLine = document.createElement('tr'); //создаем тег строки
    tableLine.innerHTML = '<td></td>\n<td></td>\n<td></td>'; //запихиваем в тег строки 3 ячейки столбцов
    tableFirstLine = table.getElementsByTagName('tr')[0]; //находим первый дочерний элемент строки

    document.getElementsByTagName('tbody')[0].insertBefore(tableLine, tableFirstLine);
}

var selectedTd; // переменная для хранения делегированного объекта
var input; //переменная для хранения инпута из делегированного объекта

//функция создания инпута в ячейке таблици
function tableInput(a){
    selectedTd = a;
    var cellValue = selectedTd.textContent; //сохраняем содержимое ячейки
    selectedTd.textContent = ''; // очищаем содержимое ячейки
    var tableInput = document.createElement('input'); //создаем инпут в буфер
    selectedTd.appendChild(tableInput); //перемещаем инпут из буфера в ячейку таблици
    input = selectedTd.getElementsByTagName('input')[0]; //сохраняем инпут в переменную
    input.value = cellValue; //присваиваем значение текста ячейки в инпут
    input.focus(); //устанавливаем фокус инпуту

    if(input){
        input.onblur = function(){
            selectedTd.textContent = input.value;
            input.remove();
        };
    }
}

