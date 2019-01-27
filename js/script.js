// add() для добавления класса в список
// remove() для удаления класса из списка
// contains() для проверки наличия класса в списке
// toggle() для переключения класса — добавления при отсутствии в списке и удаления при наличии (с некоторыми особенностями)
// item() для получения класса по его индексу в списке
// toString() для превращения списка в строку
// length для получения количества классов в списке
// value для добавления дополнительных свойств и методов для объекта  classList
var menuItem = document.querySelector('.menu__item');
var menuItem1 = document.getElementById('uniq14953563348152');
var menuItem2 = document.getElementById('uniq14953563348153');
var menuItem3 = document.getElementById('uniq14953563348154');
var menuItem4 = document.getElementById('uniq14953563348155');
var navToggle = document.querySelector('.menu__btn-burger');

// navToggle.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
    if (navToggle.classList.contains('menu__btn-burger--active')) {
        navToggle.classList.remove('menu__btn-burger--active');
        menuItem1.setAttribute('hidden', true);
        menuItem2.setAttribute('hidden', true);
        menuItem3.setAttribute('hidden', true);
        menuItem4.setAttribute('hidden', true);


    } else {
        navToggle.classList.add('menu__btn-burger--active');
        menuItem1.removeAttribute('hidden');
        menuItem2.removeAttribute('hidden');
        menuItem3.removeAttribute('hidden');
        menuItem4.removeAttribute('hidden');
    }
});
