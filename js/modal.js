var button = document.getElementById('modal');
var modal = document.getElementsByClassName('modal');
console.log(modal[0].classList.contains('modal_visible'));
button.addEventListener('click', function() {
  if (modal[0].classList.contains('modal_visible')) {
    modal[0].classList.remove('modal_visible');
  } else {
    modal[0].classList.add('modal_visible');
  }
});

