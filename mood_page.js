let mood = ""

function onHappyClick() {
    mood = 'happy'
    document.getElementById("textField").textContent = "Your mood is: " + mood + ".";
    console.log(mood)
}

function onSadClick() {
    mood = 'sad'
    document.getElementById("textField").textContent = "Your mood is: " + mood + ".";
    console.log(mood)
}