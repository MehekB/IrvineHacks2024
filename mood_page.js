let mood = ""
function onHappyClick() {
    alert ('Happy clicked!')
    mood = 'happy'
}

const button = document.querySelector('button');
button.addEventListener('click', onHappyClick);