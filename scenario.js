// JavaScript source code

var texture = "";



function base() {
    var loader = new THREE.TextureLoader();
    switch (l) {
        case 0:

            scene.background = new THREE.Color(0xcce0ff);
            scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
            var groundTexture = loader.load('textures/grass.jpg');
            
            break;
        case 1:
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xcce0ff);
            scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
            var groundTexture = loader.load('textures/volcano.jpg');

            break;
        case 2:
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xcce0ff);
            scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
            var groundTexture = loader.load('textures/ocean_ground.png');
           
            break;

    }
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
    mesh.position.y = 0;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
}
/*
*/

function scenario(level) {
    scene = new THREE.Scene();
    //pointer();
    base();


    switch (level) {
        case 0:
            texture_wall = "background/forest.jfif";
            texture_soil = "textures/grass.jpg";
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    map1[i] = map1_forest[i];
                    map2[i] = map2_forest[i];
                }

            }

            break;
        case 1:
            texture_wall = "background/volcano.png";
            texture_soil = "textures/volcano.jpg";
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    map1[i] = map1_volcano[i];
                    map2[i] = map2_volcano[i];
                }

            }
            break;
        case 2:
            texture_wall = "background/ocean.png";
            texture_soil = "textures/ocean_ground.png";
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    map1[i] = map1_ocean[i];
                    map2[i] = map2_ocean[i];
                }

            }
            break;
    }
    //console.log(map1[1]);
    scenario1();
    scenario2();
    createPerimWalls();

}

function scenario1() {
    // wall details

    var texture = new THREE.TextureLoader().load(texture_soil);
    var cubeGeo = new THREE.BoxGeometry(UNITWIDTH, UNIT1HEIGHT, UNITWIDTH);
    var cubeMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    // Keep cubes within boundry walls
    var widthOffset = UNITWIDTH / 2;
    // Put the bottom of the cube at y = 0
    var heightOffset = UNIT1HEIGHT / 2;

    // See how wide the map is by seeing how long the first array is
    totalCubesWide = map1[0].length;

    // Place walls where 1`s are
    for (var i = 0; i < totalCubesWide; i++) {
        for (var j = 0; j < map1[i].length; j++) {
            // If a 1 is found, add a cube at the corresponding position
            if (map1[i][j]) {
                // Make the cube
                var cube = new THREE.Mesh(cubeGeo, cubeMat);
                // Set the cube position
                cube.position.z = (i - totalCubesWide / 2) * UNITWIDTH + widthOffset;
                cube.position.y = heightOffset;
                cube.position.x = (j - totalCubesWide / 2) * UNITWIDTH + widthOffset;
                // Add the cube
                scene.add(cube);
                // Used later for collision detection
                collidableObjects.push(cube);
            }
        }
    }
    // The size of the maze will be how many cubes wide the array is * the width of a cube
}
function scenario2() {

    var texture = new THREE.TextureLoader().load(texture_soil);
    var cubeGeo = new THREE.BoxGeometry(UNITWIDTH, UNIT2HEIGHT, UNITWIDTH);
    var cubeMat = new THREE.MeshBasicMaterial({ map: texture,side:THREE.DoubleSide });

    // Keep cubes within boundry walls
    var widthOffset = UNITWIDTH / 2;
    // Put the bottom of the cube at y = 0
    var heightOffset = UNIT2HEIGHT / 2;

    // See how wide the map is by seeing how long the first array is
    totalCubesWide = map2[0].length;

    // Place walls where 1`s are
    for (var i = 0; i < totalCubesWide; i++) {
        for (var j = 0; j < map2[i].length; j++) {
            // If a 1 is found, add a cube at the corresponding position
            if (map2[i][j]) {
                // Make the cube
                var cube = new THREE.Mesh(cubeGeo, cubeMat);
                // Set the cube position
                cube.position.z = (i - totalCubesWide / 2) * UNITWIDTH + widthOffset;
                cube.position.y = heightOffset;
                cube.position.x = (j - totalCubesWide / 2) * UNITWIDTH + widthOffset;
                // Add the cube
                scene.add(cube);
                // Used later for collision detection
                collidableObjects.push(cube);
            }
        }
    }
    // The size of the maze will be how many cubes wide the array is * the width of a cube

}

function createPerimWalls() {
    var texture = new THREE.TextureLoader().load(texture_wall);
    var halfMap = mapSize / 2;  // Half the size of the map
    var sign = 1;               // Used to make an amount positive or negative

    // Loop through twice, making two perimeter walls at a time
    for (var i = 0; i < 2; i++) {
        var perimGeo = new THREE.PlaneGeometry(mapSize, UNIT2HEIGHT*2);
        // Make the material double sided
        var perimMat = new THREE.MeshBasicMaterial({ map: texture,side:THREE.DoubleSide });
        // Make two walls
        var perimWallLR = new THREE.Mesh(perimGeo, perimMat);
        var perimWallFB = new THREE.Mesh(perimGeo, perimMat);

        // Create left/right wall
        perimWallLR.position.set(halfMap * sign, UNIT2HEIGHT , 0);
        perimWallLR.rotation.y = degreesToRadians(90);
        scene.add(perimWallLR);
        // Used later for collision detection
        collidableObjects.push(perimWallLR);
        // Create front/back wall
        perimWallFB.position.set(0, UNIT2HEIGHT , halfMap * sign);
        scene.add(perimWallFB);

        // Used later for collision detection
        collidableObjects.push(perimWallFB);

        sign = -1; // Swap to negative value
    }
}
