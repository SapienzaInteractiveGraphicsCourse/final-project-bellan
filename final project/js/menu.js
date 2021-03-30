function menu() {
    MENU = true;
    document.getElementById('start').style.display = "block";
    document.getElementById('Menu').style.display = "block";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "none";
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('blocker').style.display = "none";
}


function home() {
    MENU = true;
    if (scene!=null) {
        clearAll();
        clock.stop();
    }
    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "block";
    document.getElementById('helper').style.display = "none";
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('blocker').style.display = "none";
}

function help() {
    MENU = true;
    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "block";
    document.getElementById('blocker').style.display = "none";

}

function gameOver() {
    FIRST = false;
    clearAll();
    clock.stop();
    document.getElementById('blocker').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('gameOver').style.display = "block";
    document.getElementById('healtBar').style.display = 'none';

}

function play() {

    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "none";
    document.getElementById('loading').style.display = 'block';
    document.getElementById('healtBar').style.display = 'block';

    init();
}

function nextCharacter() {
    var youstring = you.toString();
    youstring = "you" + youstring;
    document.getElementById(youstring).style.display = 'none';
    you++;
    if (you == 3) { you = 0; }
    youstring = you.toString();
    youstring = "you" + youstring;
    document.getElementById("character").src = characters[you];
    document.getElementById(youstring).style.display = 'block';
}

function previousCharacter() {
    var youstring = you.toString();
    youstring = "you" + youstring;
    document.getElementById(youstring).style.display = 'none';
    you--;
    if (c == -1) { c = 2; }
    youstring = you.toString();
    youstring = "you" + youstring;
    document.getElementById("character").src = characters[you];
    document.getElementById(youstring).style.display = 'block';
}
function nextLevel() {
    var lstring = l.toString();
    lstring = "l" + lstring;
    document.getElementById(lstring).style.display = 'none';
    l++;
    if (l == 3) { l = 0; }
    lstring = l.toString();
    lstring = "l" + lstring;
    document.getElementById("level").src = levels[l];
    document.getElementById(lstring).style.display = 'block';
}

function previousLevel() {
    var lstring = l.toString();
    lstring = "l" + lstring;
    document.getElementById(lstring).style.display = 'none';
    l--;
    if (l == -1) { l = 2; }
    lstring = l.toString();
    lstring = "l" + lstring;
    document.getElementById("level").src = levels[l];
    document.getElementById(lstring).style.display = 'block';
}
function empty(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
}
function clearAll() {

    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
    document.exitPointerLock();
    renderer.domElement.addEventListener('dblclick', null, false);
    scene = null;
    camera = null;
    controls = null;
    empty(container);
}



