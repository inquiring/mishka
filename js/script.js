// add() для добавления класса в список
// remove() для удаления класса из списка
// contains() для проверки наличия класса в списке
// toggle() для переключения класса — добавления при отсутствии в списке и удаления при наличии (с некоторыми особенностями)
// item() для получения класса по его индексу в списке
// toString() для превращения списка в строку
// length для получения количества классов в списке
// value для добавления дополнительных свойств и методов для объекта  classList
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
    } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
    }
});