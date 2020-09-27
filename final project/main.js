


var scene, camera,renderer,stats ;

function start() {

    document.getElementById('start').style.display = "none";
    document.getElementById('Menu').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('helper').style.display = "none";

    var container = document.getElementById('scene');

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(1, 2, - 3);
    camera.lookAt(0, 1, 0);


    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa100a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x50B84E);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(- 3, 10, - 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

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

function fireBall() { }
function arrow() { }
function sword() { }