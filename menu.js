function menu() {
    document.getElementById('start').style.display = "block";
    document.getElementById('Menu').style.display = "block";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "none";
}


function home() {
    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "block";
    document.getElementById('helper').style.display = "none";

}

function help() {
    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "block";

}

function nextCharacter() {
    ch++;
    if (ch == 3) { ch = 0;}
    document.getElementById("character").src = characters[ch];
}

function previousCharacter() {
    ch--;
    if (ch == -1) { ch = 2;}
    document.getElementById("character").src = characters[ch];
}
function nextLevel() {
    l++;
    if (l == 3) { l = 0; }
    document.getElementById("level").src = levels[l];
}

function previousLevel() {
    l--;
    if (l == -1) { l = 2; }
    document.getElementById("level").src = levels[l];
}



