var idx, wave, time, ballCounter,ballColor;
var GAMEOVER, ENEMY,PAUSE,MENU;
const G = -9.8;
const BALLRADIUS = 4;
const BALLMASS = 1;
var mapWidth = 2000;


function rewind(you) {
idx = 0;
wave = 5;
ballCounter = 0;
ENEMY = true;
time = 0;
    GAMEOVER = false;
    monsterVelocity.set(0, 0, 0);
    PAUSE = false;
    MENU = false;
    switch (you) {
        case 0:
            ballColor = 0xff0000;
            break;
        case 1:
            ballColor = 0x5200cc;
            break;
        case 2:
            ballColor = 0x00cc00;
            break;
    }
}

var map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
];











