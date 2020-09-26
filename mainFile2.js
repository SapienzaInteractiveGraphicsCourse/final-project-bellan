


var scene, camera, renderer, stats;
var characters = [], levels=[],ch=0,l=0;
characters[0] = "warrior.jpg";
characters[1] = "wizard.jpg";
characters[2] = "archer.jpg";
levels[0] ="background/forest.jfif"
levels[1] ="background/volcano.png"
levels[2] = "background/ocean.jfif"
var totalCubesWide; 
var collidableObjects = []; 
var map1 = [], map2 = [];
var controls;
var controlsEnabled = false;



function start() {


    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "none";
    document.getElementById('scene').style.display = 'block';

    //getPointerLock();



    base();
    scenario(l);


    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(10, 50, 150);
    camera.lookAt(0, 1, 0);


    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(50,200,100);
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
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);


    animate();
}

function animate() {

    // Render loop

    requestAnimationFrame(animate);


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


function fireBall() { }
function arrow() { }
function sword() { }