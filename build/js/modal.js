var button = document.getElementById('modal');
var modal = document.getElementsByClassName('modal');
var modalElement = modal[0];

if (button && modalElement) {
  button.addEventListener('click', function() {
    if (modalElement.classList.contains('modal_visible')) {
      modalElement.classList.remove('modal_visible');
    } else {
      modalElement.classList.add('modal_visible');
    }
  });
}
