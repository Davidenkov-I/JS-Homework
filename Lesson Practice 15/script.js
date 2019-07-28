var container = document.getElementById('container');

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 1</a> and <a href="http://google.by">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 3</a> and <a href="http://google.by">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);


localStorage.clear();

var button = document.getElementsByTagName('button')[0];
button.onclick = function (){ 
    var parent = document.getElementsByTagName('p')[0]; 
    var childs = parent.getElementsByTagName('a'); 
    for(var i = 0; i < childs.length; i++){
        childs[i].classList.add('link'); 
    }
}

console.log(container);


container.addEventListener('click', function(event){
    if(event.target.tagName === 'A' && event.target.parentElement === secondPar){
        event.preventDefault();

        if (event.target.textContent in localStorage){
            alert(JSON.parse(localStorage.getItem(event.target.textContent)).path);
        }
        else{
            localStorage.setItem(event.target.textContent,  JSON.stringify({ path: event.target.getAttribute('href') }));
            alert('ссылка была сохранена');
        }
    }
});


