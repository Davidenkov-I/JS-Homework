var button = document.getElementsByClassName('js-button_load')[0];

var pageUserOn = false; // переменная хранящая значение отрисована ли страница с пользователями
var pageConnectErrorOn = false; // переменная хранящая значение отрисована ли страница с пользователями

var data;       //для хранения данных с сервера
var dataArray;  //для хранения отделенных данных по пользователям


button.onclick = function(){
    if(!pageUserOn){

        //создаем список переменных для хранения данных о пользователе
        //создаются тут т.к. они используются и вне функций, заполняются при вызове функции создания стрницы
        var usersPageConteiner;
        var avatar;
        var firstNameText;
        var lastNameText;

        var eventButton;

        //создаем div в body после основной кнопки
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(document.createElement('div'));
            //добавляем свежесозданному div класс
        var usersPageConteiner = body.getElementsByTagName('div')[0];
        usersPageConteiner.classList.add('users_page-conteiner');

        // если localStorage пуст, отправляем запрос на сервер и заполняем его
        // также выполняем функцию по отрисовке страницы из свежезаполненного localStorage
        if(!localStorage.getItem('dataUsers')){
            var xhr = new XMLHttpRequest();

            xhr.open('GET', 'https://reqres.in/api/users?page=4', true);
            //xhr.open('GET', 'https://reqres', true);
    
            xhr.onload = function() {
            
                localStorage.setItem("dataUsers", xhr.response); //записываем в localStorage
    
                //если страница не отрисована, отрисовать ее
                createPageUsers(); // отрисовываем страницу с пользователями
                pageUserOn = true;
            };
    
            xhr.onerror = function() {
                console.log(this.status + ' - ' + this.statusText);
            };
    
            xhr.onloadend = function() {
                console.log('Запрос завершен');
                console.log(this);

                //если нет соединения выводим сообщение об ошибке пользователю
                if(this.status !== 200){
                    if(!pageConnectErrorOn){
                        body.appendChild(document.createElement('p'));

                        var errorConnectText = document.getElementsByTagName('p')[0];
                        errorConnectText.innerHTML = 'Нет соединения с сервером!!!';
                        errorConnectText.classList.add('connect-error');

                        //прекращаем повторное создание сообщения об ошибке
                        pageConnectErrorOn = true;
                        pageUserOn = true;
                    }
                }
            };
        
            xhr.send();

        }
        //иначе отрисовываем страницу из хранившихся данных localStorage
        else{
            createPageUsers ();
            pageUserOn = true;
        }
    
        // находим кнопку по делегированию
        usersPageConteiner.onclick = function(event){
            var target = event.target;

            if (target.tagName != 'BUTTON') return;

            buttonClick(target); //выполнить действие по нажатию на кнопку
        }


        //функция записи данных в окно под данные с пользователем
        function buttonClick(a){
            buttonDataValue = a.dataset.value;

            avatar.src = dataArray[buttonDataValue].avatar; //изменяем ссылку на аватарку
            firstNameText.textContent = ' ' + dataArray[buttonDataValue].first_name; //изменяем первое имя
            lastNameText.textContent = ' ' + dataArray[buttonDataValue].last_name; // изменяем второе имя

            //убераем фокус со старой кнопки, и ставим на выбранную
            eventButton.classList.remove('button_user-focus'); //удаляем клас отвечающий за подсветку
            a.classList.add('button_user-focus');
            eventButton = a;

        }
    
        // функция отрисовки страници с пользователями
        // вынесена отдельно т.к. используется в разных кусках кода
        function createPageUsers (){

            //извлекаем данные из localStorage, конвертируем из JSON формата и записываем их в переменную
            data = JSON.parse(localStorage.getItem('dataUsers'));
            dataArray = data.data; //вынимаем массив с объектами пользователей

                //создаем кнопки с пользователями, с количеством равным пользователям в базе данных
            for(var i = 0; i < dataArray.length; i++){
                usersPageConteiner.appendChild(document.createElement('button'));

                var newButton = usersPageConteiner.getElementsByTagName('button')[i];
                newButton.classList.add('button_user'); //создаем класс кнопке
                newButton.textContent = 'User ' + (i+1);  //записываем значение в кнопку
                newButton.setAttribute('data-value', i); //создаем дата атрибут со значением равным i
            }

            // присваем фокус первой кнопке
            var firstButton = usersPageConteiner.getElementsByTagName('button')[0];
            firstButton.autofocus = true;

            //если стоит автофокус на первой кнопке, создаем ячейку с выведенными данными 1го пользователя
            if(firstButton.autofocus === true){
                //создаем само окно под данные и аватарку пользователя
                usersPageConteiner.appendChild(document.createElement('div'));
                var userPage = usersPageConteiner.getElementsByTagName('div')[0];
                userPage.classList.add('user_page');

                //создаем в только что созданном div еще div для аватарки
                userPage.appendChild(document.createElement('div'));
                var userImgConteiner = userPage.getElementsByTagName('div')[0];
                userImgConteiner.classList.add('user_img-conteiner');

                //создаем внутри картинку с аватаркой
                userImgConteiner.appendChild(document.createElement('img'));
                avatar = userImgConteiner.getElementsByTagName('img')[0];
                avatar.classList.add('avatar');

                //создаем div для данных пользователя (имени и т.п.)
                userPage.appendChild(document.createElement('div'));
                var userNameConteiner = userPage.getElementsByTagName('div')[1];
                userNameConteiner.classList.add('user_name-conteiner');

                //создаем тег <p> в нутри div с данными имени, а внутри него тег span под само имя
                userNameConteiner.appendChild(document.createElement('p'));
                var firstNameTag = userNameConteiner.getElementsByTagName('p')[0];
                firstNameTag.textContent = 'First Name:';
                firstNameTag.appendChild(document.createElement('span'));

                //создаем тег <p> в нутри div с данными второго имени, а внутри него тег span под само имя
                userNameConteiner.appendChild(document.createElement('p'));
                var lastNameTag = userNameConteiner.getElementsByTagName('p')[1];
                lastNameTag.textContent = 'Last Name:';
                lastNameTag.appendChild(document.createElement('span'));

                //заполняем данными от первого пользователя
                avatar.src = dataArray[0].avatar;
                firstNameTag.getElementsByTagName('span')[0].textContent = ' ' + dataArray[0].first_name;
                lastNameTag.getElementsByTagName('span')[0].textContent = ' ' + dataArray[0].last_name;

                //запись в глобальные переменные
                firstNameText = usersPageConteiner.getElementsByTagName('span')[0];
                lastNameText = usersPageConteiner.getElementsByTagName('span')[1];

                //записываем первую кнопку в переменную для сфокусированных кнопок
                eventButton = usersPageConteiner.getElementsByTagName('button')[0];
                eventButton.classList.add('button_user-focus');

            }
        }
    } 
};





