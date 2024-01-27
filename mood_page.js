let mood = ""

function onHappyClick() {
    mood = 'happy'
    document.getElementById("textField").textContent = "Your mood is: " + mood + ".";
    console.log(mood)
}

function onSadClick() {
    mood = 'sad'
    document.getElementById("textField").textContent = "Your mood is: " + mood + ".";
}


const button = document.querySelector('button');
button.addEventListener('click', onHappyClick);