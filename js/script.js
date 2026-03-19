var navToggle = document.querySelector('.menu__btn-burger');
var menuItems = document.querySelectorAll('.menu__item[id]');

if (navToggle && menuItems.length) {
    var isMobile = window.matchMedia('(max-width: 699px)');

    function syncMenuState() {
        var shouldHideItems = isMobile.matches && !navToggle.classList.contains('menu__btn-burger--active');

        for (var i = 0; i < menuItems.length; i++) {
            if (i === 0) {
                menuItems[i].removeAttribute('hidden');
                continue;
            }

            if (shouldHideItems) {
                menuItems[i].setAttribute('hidden', true);
            } else {
                menuItems[i].removeAttribute('hidden');
            }
        }
    }

    syncMenuState();

    if (typeof isMobile.addEventListener === 'function') {
        isMobile.addEventListener('change', syncMenuState);
    } else if (typeof isMobile.addListener === 'function') {
        isMobile.addListener(syncMenuState);
    }

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('menu__btn-burger--active');
        syncMenuState();
    });
}
