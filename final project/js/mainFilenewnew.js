// JavaScript source code


Physijs.scripts.worker = 'js/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var scene, camera, controls;
var renderer, container;

var id;
var loaded = false;

var characters = [], levels = [], you = 0, l = 0;
characters[0] = "warrior.jpg";
characters[1] = "wizard.jpg";
characters[2] = "archer.jpg";
levels[0] = "background/forest.jfif";
levels[1] = "background/volcano.PNG";
levels[2] = "background/ocean.jfif";

var velocity = new THREE.Vector3();
var raycaster = new THREE.Raycaster();
var mouseCoords = new THREE.Vector2();
var pos = new THREE.Vector3();
var car = new THREE.Object3D();

var bones = [];
var monsters = [];
var balls = [];

var FIRST = true;

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);


    clock = new THREE.Clock();

    rewind(you);

    getPointerLock();

    scene = new Physijs.Scene({ reportsize: 200, fixedTimeStep: 1 / 60 });

    scene.setGravity(new THREE.Vector3(0, G, 0));

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 5, 0);

    controls = new THREE.PointerLockControls(camera,document.body);
    scene.add(controls.getObject());

    character(you);
    //scene.add(controls.getObject());

    base();
    light(l);
    loadScene(l);


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousedown', onMouseDown, false); 
    //window.addEventListener('load', onLoadEnd, false);

    move();
    animate();
    

}

function animate() {
    if(load)$('#loading').fadeOut(500);
    if (!GAMEOVER && !PAUSE && !MENU) {

    if (clock.elapsedTime - time > (wave-1)) {
        ENEMY = true;
    }

    var delta = clock.getDelta();

    scene.simulate();

    animatePlayer(delta);
    ENEMY=generateMonsters(clock,monsters.length,ENEMY);
    updateMonster(delta);
    lifePoints();
    damage();


        id = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


function onMouseDown(event) {
    if (!GAMEOVER) {
        raycaster.setFromCamera(mouseCoords, camera);

        ballCounter++;
        var loader = new THREE.TextureLoader();
        // Creates a ball and throws it
        var ballTexture = loader.load('textures/fire.png');
        var ballMaterial = new THREE.MeshPhongMaterial({ map: ballTexture, emissive: ballColor, emissiveIntensity: 1 });
        var ballMass = 6000;
        var ballRadius = 4;
        var ball = new Physijs.SphereMesh(
            new THREE.SphereGeometry(ballRadius, 10, 10),
            ballMaterial,
            ballMass
        );

        ball.castShadow = true;
        //ball.receiveShadow = true;

        ball.position.copy(raycaster.ray.direction);
        ball.position.add(raycaster.ray.origin);

        ball.name = "ball " + ballCounter;

        balls.push(ball);

        scene.add(balls[balls.length - 1]);


        pos.copy(raycaster.ray.direction);
        pos.multiplyScalar(80);
        balls[balls.length - 1].setLinearVelocity(new THREE.Vector3(pos.x, pos.y, pos.z));

        console.log("ball ", ball.name);
    }

}

function getPointerLock() {
    if (!GAMEOVER && !MENU) {
        document.onclick = function () {
            container.requestPointerLock();
        }

        document.addEventListener('pointerlockchange', lockChange, false);
    }
}
function lockChange() {
    if (!GAMEOVER && !MENU) {
        // Turn on controls
        if (document.pointerLockElement === container) {
            // Hide blocker and instructions
            blocker.style.display = "none";
            controls.enabled = true;
            PAUSE = false;
            clock.start();
            requestAnimationFrame(animate);
            // Turn off the controls
        } else {
            // Display the blocker and instruction
            document.getElementById('scene').style.display = 'none';
            blocker.style.display = '';
            controls.enabled = false;
            PAUSE = true;
            clock.stop();
            
        }
    }
}
function onLoadEnd() {
    $('#loading').fadeOut(500);
}
function resume() {
    PAUSE = false;
    clock.start();
    return
}



