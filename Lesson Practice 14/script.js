var container = document.getElementById('container');

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 1</a> and <a href="http://google.by">Link 2</a>';
secondPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 3</a> and <a href="http://google.by">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);




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
        alert(event.target.getAttribute('href'));
    }
});


