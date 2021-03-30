// JavaScript source code

var texture = "";
var friction = 1;



function base() {
    var loader = new THREE.TextureLoader();
    switch (l) {

        // skybox
        case 0:
            scene.background = new THREE.Color(0x008fb3);
            scene.fog = new THREE.Fog(0xff6600, 500, 10000);
            var groundTexture = loader.load('textures/grass.jpg');
            
            break;
        case 1:
            scene.background = new THREE.Color(0x330000);
            scene.fog = new THREE.Fog(0xff1a1a, 500, 10000);
            var groundTexture = loader.load('textures/volcano.jpg');

            break;
        case 2:
            scene.background = new THREE.Color(0x000066);
            scene.fog = new THREE.Fog(0x0000cc, 500, 10000);
            var groundTexture = loader.load('textures/ocean_ground.png');
           
            break;

    }
   /* const skymaterial = createSkyMaterial(skyboxImage);
    var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    var skybox = new THREE.Mesh(skyboxGeo, skymaterial);
    scene.add(skybox);*/


    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(100,100);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    var ground_material = Physijs.createMaterial(new THREE.MeshLambertMaterial({ map: groundTexture }), friction, .9);
    // Ground
    ground = new Physijs.BoxMesh(new THREE.CubeGeometry(20000, 0.1, 20000), ground_material, 0 );
    ground.receiveShadow = true;
    scene.add(ground);



    //loadObj();

}

function light(l) {
    var dirLight = new THREE.DirectionalLight(0xccddff, 0.09);
    var ambientLight = new THREE.AmbientLight(0x404040, 0.01);
    dirLight.position.set(50, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(ambientLight);
    scene.add(dirLight);
}


function skyBox(path) {
    let skyMaterial = [];

    for (let i = 1; i < 7; i++) {
        var pathTexture = path + i + ".png"
        let texture = new THREE.TextureLoader().load(pathTexture);
        skyMaterial.push(new THREE.MeshBasicMaterial({ map: texture }))
    }

    for (let i = 0; i < 6; i++)
        skyMaterial[i].side = THREE.BackSide;

    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    let skybox = new THREE.Mesh(skyboxGeo, skyMaterial);
    return skybox;
}
