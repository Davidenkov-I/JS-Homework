
var buttonStart = document.getElementsByTagName('button')[0], // находим кнопку старта

// находим все 6 тега span отвечающих за значения времени
// записывается в переменную чтобы сократить работу программы и не вызывать поиск span 3 раза чтобы записать в нужные 
// переменные отвечающие за время
    spanArray = document.getElementsByTagName('span'),

// переменные для хранения span элементов с текстом времени
    minutesDecade = spanArray[0],
    minutes = spanArray[1],
    secondsDecade = spanArray[2],
    seconds = spanArray[3],
    miliSecondsDecade = spanArray[4],
    miliSeconds = spanArray[5],

    timeSave = document.getElementsByClassName('time_save')[0], // находим контейнер для записи сохраненных результатов времени
    stopwotch = document.getElementsByClassName('stopwotch')[0], // находим контейнер секундомера
    timeConteiner = document.getElementsByClassName('time_conteiner')[0], // находим контейнер хранящий ячейки с временем

    buttonReset,
    buttonSave,


    minutesDecadeValue = 0, // переменная для хранения текущего значения десятков минут
    minutesValue = 0, //переменная для хранения текущего значения минут
    secondsDecadeValue = 0, //переменная для хранения текущего значения десятков секунд
    secondsValue = 0, //переменная для хранения текущего значения секунд
    miliSecondDecadeValue = 0, //переменная для хранения текущего значения десятков милисекунд
    miliSecondValue = 0, //переменная для хранения текущего значения милисекунд

    arrayMarks = [], // массив для хранения меток
    timeData = [], // переменная для хранения времени

    stopWotchToggle = false, // отвечает за работу счетчика секундомера
    timer, //переменная для запуска setInterval
    iter = 10; // настраиваемая переменная отвещающая за то каким будет интервал


//если есть в localstorage то загрузить данные и записать их в нужные переменные
if(localStorage.getItem('time')){
    timeData = JSON.parse(localStorage.getItem('time'));

    minutesDecadeValue = timeData[0];
    minutesValue = timeData[1];
    secondsDecadeValue = timeData[2];
    secondsValue = timeData[3];
    miliSecondDecadeValue = timeData[4];
    miliSecondValue = timeData[5];

    minutesDecade.innerHTML = minutesDecadeValue;
    minutes.innerHTML = minutesValue;
    secondsDecade.innerHTML = secondsDecadeValue;
    seconds.innerHTML = secondsValue;
    miliSecondsDecade.innerHTML = miliSecondDecadeValue;
    miliSeconds.innerHTML = miliSecondValue/10;
}

// если в localStorage имеется ключ state то создает кнопки reset и save. Также меняет дата-атрибуты стартовой кнопки
if(localStorage.getItem('state')){
    switch (JSON.parse(localStorage.getItem('state'))){
        case 'stop':
            createStopwotchPage();
            //buttonStart.setAttribute('data-value', 'stop'); //изменяем значение дата атрибута на stop
            buttonStart.dataset.value = 'stop';
            buttonStart.innerHTML = 'Stop'; // меняем текст кнопки

            buttonReset.onclick = funButtonReset;
            buttonSave.onclick = funButtonSave;

            stopWotchToggle = true;
            timer = setInterval(iterationStopwotch, iter);
            break;

        case 'run':
            createStopwotchPage();
            //buttonStart.setAttribute('data-value', 'run'); //изменяем значение дата атрибута на run
            buttonStart.dataset.value = 'run';
            buttonStart.innerHTML = 'Run'; // меняем текст кнопки

            buttonReset.onclick = funButtonReset;
            buttonSave.onclick = funButtonSave;
            break;
    }
}

//если в localStorage имеется ключ marks то берет данные и на основе них создаем метки
if(localStorage.getItem('marks')){
    arrayMarks = JSON.parse(localStorage.getItem('marks')); //записываем данные из localStorage в массив для хранения меток

    //мне нравится for!!!) и говорят голый for работает быстрее
    for(var i = 0; i < arrayMarks.length; i++){
        var loadSaveElement = document.createElement('p');
        loadSaveElement.innerHTML = arrayMarks[i]; // создаем строку с меткой
        timeSave.appendChild(loadSaveElement); // добавляем строку с меткой в DOM
    }
}

buttonStart.onclick = buttonStartClick;


// функция прохода по итерации секундомера
function iterationStopwotch(){
    if(stopWotchToggle === false){  // если значение false останавливаем таймер
        clearInterval(timer);
    }

    miliSecondValue += iter; //каждую итерацию увеличивает милисекунды на указанное число


    if(miliSecondValue >= 100){  
        miliSecondValue -= 100;
        miliSecondDecadeValue += 1;

        if(miliSecondDecadeValue >= 10){
            miliSecondDecadeValue -= 10;
            secondsValue += 1;

            setTimeout(writeLocalstorage, 10);

            if(secondsValue >= 10){
                secondsValue -= 10;
                secondsDecadeValue += 1;

                if(secondsDecadeValue >= 6){
                    secondsDecadeValue -= 6;
                    minutesValue += 1;

                    if(minutesValue >= 10){
                        minutesValue -= 10;
                        minutesDecadeValue += 1;

                        if(minutesDecadeValue >= 6){
                            stopWotchToggle = false;

                            setTimeout(stopwotchZero, iter+5);

                            buttonSave.remove(); //удаляем кнопку save
                            buttonStart.style.display = 'none'; // скрываем основную кнопку
                        }

                        minutesDecade.innerHTML = minutesDecadeValue;
                    }

                    minutes.innerHTML = minutesValue;
                }

                secondsDecade.innerHTML = secondsDecadeValue;
            }

            seconds.innerHTML = secondsValue;
        }

        miliSecondsDecade.innerHTML = miliSecondDecadeValue;
    }

    miliSeconds.innerHTML = miliSecondValue / 10;

    timeData[0] = minutesDecadeValue;
    timeData[1] = minutesValue;
    timeData[2] = secondsDecadeValue;
    timeData[3] = secondsValue;
    timeData[4] = miliSecondDecadeValue;
    timeData[5] = miliSecondValue;

}


// функция обнуления
function stopwotchZero(){
    miliSecondValue = 0;
    miliSecondDecadeValue = 0;
    secondsValue = 0;
    secondsDecadeValue = 0;
    minutesValue = 0;
    minutesDecadeValue = 6;

    miliSeconds.innerHTML = 0;
}

// функция нажатия на кнопку start
function buttonStartClick(){
    switch(buttonStart.dataset.value){
        case 'start':        
            createStopwotchPage();
            localStorage.setItem('state', JSON.stringify('stop'));

            //запускаем секундомер
            stopWotchToggle = true;
            timer = setInterval(iterationStopwotch, iter); 
            break;
        case 'stop':        
            buttonStart.dataset.value = 'run'; //изменяем значение дата атрибута на run
            buttonStart.innerHTML = 'Run'; // меняем текст кнопки
            localStorage.setItem('state', JSON.stringify('run'));

            stopWotchToggle = false; //останавливаем секундомер

            setTimeout(writeLocalstorage, iter+5);
            break;
        case 'run':
            buttonStart.dataset.value = 'stop'; //изменяем значение дата атрибута на stop
            buttonStart.innerHTML = 'Stop'; // меняем текст кнопки
            localStorage.setItem('state', JSON.stringify('stop'));

            //запускаем секундомер
            stopWotchToggle = true;
            timer = setInterval(iterationStopwotch, iter); 
            break;
    }

    buttonReset.onclick = funButtonReset;
    buttonSave.onclick = funButtonSave;
    
}


//функция записи в localStorage
function writeLocalstorage(){
    localStorage.setItem('time', JSON.stringify(timeData));
}

//функция создания основных кнопок
function createStopwotchPage(){
    buttonStart.dataset.value = 'stop'; //изменяем значение дата атрибута на stop
    buttonStart.innerHTML = 'Stop'; // меняем текст кнопки

    //создаем кнопку reset
    stopwotch.insertBefore(document.createElement('button'), timeSave); //само создание кнопки
    buttonReset = document.getElementsByTagName('button')[1]; //находим созданную кнопку
    buttonReset.innerHTML = 'Reset'; //записываем текст в кнопку

    //создаем кнопку save
    stopwotch.insertBefore(document.createElement('button'), timeSave); //само создание кнопки
    buttonSave = document.getElementsByTagName('button')[2]; //находим созданную кнопку
    buttonSave.innerHTML = 'Save'; //записываем текст в кнопку
}

//функция нажатия на кнопку reset
function funButtonReset(){
    stopWotchToggle = false; //стопает секундомер

    setTimeout(timeoutMilisecondReset, iter+5); //вызывает функцию очистки
}

//функция по очистке полей и обнуления данных
//введена для вызова ее через интервал после нажатия на кнопку reset, из-за временной задерки между нажатием на кнопку и отключением счетчика
function timeoutMilisecondReset(){

    //сбрасываем стартовую кнопку
    buttonStart.dataset.value = 'start'; //изменяем значение дата атрибута на run
    buttonStart.innerHTML = 'Start'; // меняем текст кнопки

    buttonStart.style.display = 'block';

    //обнуляем переменные отвещающие за значения времени
    minutesDecadeValue = 0;
    minutesValue = 0;
    secondsDecadeValue = 0;
    secondsValue = 0;
    miliSecondDecadeValue = 0;
    miliSecondValue = 0;

    //обнуляем цифры в счетчике
    minutes.innerHTML = '0';
    minutesDecade.innerHTML = '0';
    seconds.innerHTML = '0';
    secondsDecade.innerHTML = '0';
    miliSeconds.innerHTML = '0';
    miliSecondsDecade.innerHTML = '0';

    //очищаем метки
    timeSave.innerHTML = '';

    buttonReset.remove(); //удаляем кнопку reset
    buttonSave.remove(); //удаляем кнопку save

    arrayMarks = []; // очищаем массив меток

    //очищаем localStorage
    if(localStorage.getItem('marks')){
        localStorage.removeItem('marks');
    }
    if(localStorage.getItem('time')){
        localStorage.removeItem('time');
    }
    if(localStorage.getItem('state')){
        localStorage.removeItem('state');
    }

}

//функция нажатия на кнопку save
function funButtonSave(){
    var newSaveElement = document.createElement('p');
    newSaveElement.innerHTML = (arrayMarks.length+1) +') ' + minutesDecadeValue + minutesValue + ':' + secondsDecadeValue + secondsValue + ':' + miliSecondDecadeValue + (miliSecondValue / 10); // создаем строку с меткой
    timeSave.appendChild(newSaveElement); // добавляем строку с меткой в DOM

    //сохраняем полученное значение в массив меток
    arrayMarks.push(newSaveElement.innerHTML);

    //сохраняем данные по меткам в localStorage
    localStorage.setItem('marks', JSON.stringify(arrayMarks));
}