


var scene, camera, renderer, stats;
var world;
var characters = [], levels = [], ch = 0, l = 0;
characters[0] = "warrior.jpg";
characters[1] = "wizard.jpg";
characters[2] = "archer.jpg";
levels[0] = "background/forest.jfif"
levels[1] = "background/volcano.png"
levels[2] = "background/ocean.jfif"
var totalCubesWide,controls;
var collidableObjects = [];
var map1 = [], map2 = [];
var controlsEnabled = false;
var rayXL, rayXR, rayY, rayZF, rayZB;
var Weapon = new THREE.Object3D();
var mouseCoords = new THREE.Vector2();
var pos = new THREE.Vector3();
var raycaster = new THREE.Raycaster();
var fireball = new THREE.Object3D();


var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var BALL = false;

var velocity = new THREE.Vector3();
var velfire = new THREE.Vector3();
var direction = new THREE.Vector3();
var quat = new THREE.Quaternion();


var tem=0;

var clock;

var speed=600;





function play() {
    var container = document.getElementById('container');
    var blocker = document.getElementById('blocker');
    var instruction = document.getElementById('instruction');

    PLAYGAME = true;

    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "none";
    document.getElementById('scene').style.display = 'block';
    getPointerLock();
    init();
}
function init() {

    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 10,0);
    camera.lookAt(0, 10, 0);

    controls = new THREE.PointerLockControls(camera);
    world = new CANNON.World();


    scenario(l,ch);
    scene.add(controls.getObject());

    Weapon = controls.getObject().children[0];



    controls.getObject().position.x = 20;
    controls.getObject().position.z = -20;
    rayXL = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 10);
    rayXR = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 10);
    rayZF = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 10);
    rayZB = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 10);
    rayY = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

    /*var hemiLight = new THREE.HemisphereLight(0xffffff, 0x50B84E);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);*/

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(50, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    //ground 

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    move();
    loadMonsters();

    animate();
    //console.log(scene.children[34]);
}

function animate() {



    // Render loop

        var delta = clock.getDelta();
        animatePlayer(delta);


    requestAnimationFrame(animate);
    window.onmousedown = function (e) {
        console.log("fire bleah");
        console.log(PLAYGAME);
        if (PLAYGAME && controls.enabled) {
            if (e.button == 0) {
                FIRE = true;
                console.log("fire");
            }
        }
    }

    animate_weapon(ch,delta);
    renderer.render(scene, camera);


}




function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}

function getPointerLock() {
    document.onclick = function () {
        container.requestPointerLock();
    }

    document.addEventListener('pointerlockchange', lockChange, false);
}
function lockChange() {
    // Turn on controls
    if (document.pointerLockElement === container) {
        // Hide blocker and instructions
        blocker.style.display = "none";
        controls.enabled = true;
        // Turn off the controls
    } else {
        // Display the blocker and instruction
        blocker.style.display = "";
        controls.enabled = false;
    }
}





