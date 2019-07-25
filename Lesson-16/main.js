var button = document.getElementsByClassName('js-button_load')[0];

button.onclick = function(){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://reqres.in/api/users?page=2', true);

    xhr.onload = function() {
    	console.log((this.status[0] === 2) ? JSON.parse(this.response).data : (this.status + ' - ' + this.statusText));
    };

    xhr.onerror = function() {
        console.log(this.status + ' - ' + this.statusText);
    };


    
    xhr.onloadend = function() {
        console.log('Запрос завершен');
        console.log(this);
    };
    

    xhr.send();

    // конвертируем полученные с сервера данные из JSON формата и сохраняем в переменную.
    var data = JSON.stringify(xhr.responseText);
    console.log(xhr);
    console.log( xhr.response );
    console.log(data);
};

