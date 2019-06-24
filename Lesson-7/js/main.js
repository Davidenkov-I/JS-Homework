var icon = document.querySelector('.mobile-menu');

icon.addEventListener('click', function(e){
    var menu = document.querySelector('.js-burgerMenu');

    //icon.classList.toggle('active');
    menu.classList.toggle('burger-menu');
});