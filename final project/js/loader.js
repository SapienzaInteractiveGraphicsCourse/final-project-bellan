function weapons(character) {
    var loader = new THREE.GLTFLoader();
    switch (character) {
        case 0:
            loader.load(
                'models/gltf/sword.glb',
                function (gltf) {
                    sword = gltf.scene;
                    sword.position.set(0, 10, -4);
                    sword.rotation.set(-Math.PI * 0.75, 0, Math.PI * 0.25);
                    sword.scale.set(10, 10, 10);
                    sword.traverse(o => {
                        if (o.isMesh) {
                            o.castShadow = true;
                            o.receiveShadow = true;
                        }
                    });
                    controls.getObject().add(sword);
                    //scene.add(sword);
                });
            break;
        case 1:
            loader.load(
                'models/gltf/wand/wand.gltf',
                function (gltf) {
                    wand= gltf.scene;
                    wand.castShadow = true;
                    controls.getObject().add(wand);
                    wand.position.set(1, 10,-2);
                    wand.rotation.set(-Math.PI*0.25, 0, -Math.PI );
                    collidableObjects.push(wand);
                });
            break;
        case 2:
            loader.load(
                'models/gltf/arrow.glb',
                function (gltf) {
                    arrow = gltf.scene;
                    arrow.castShadow = true;
                    controls.getObject().add(arrow);
                    arrow.position.set(0, 10, 0);
                    arrow.rotation.set(-Math.PI * 0.5, 0, Math.PI * 0.5 * 0.1);
                });
            break;
    }

}

function loadMonsters() {

    var loader = new THREE.GLTFLoader();
    loader.load('models/gltf/monster/monster.gltf',
        function (gltf) {
            monster = gltf.scene;
            monster.castShadow = true;
           

            monster.traverse(function (object) {

                if (object.isMesh) object.castShadow = true;
                if (object.isBone) {
                    bones.push(object);
                }

            });

            /*var boxMaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0x000000, transparent:true, opacity:0 } ), friction, .9);
            var box = new Physijs.BoxMesh(new THREE.CubeGeometry(15, 30, 35), boxMaterial, 10000);
            
            box.position.y = 15;
            //scene.add(box);*/

            /*skeleton = new THREE.SkeletonHelper(monster);
            skeleton.visible = true;
            skeleton.position.set(40, 60, 40);

            skeleton.add(monster);*/
            raycaster.setFromCamera(mouseCoords, camera);

         /*box.add(monster);

            monster.position.x = 5;
            monster.position.y = -15;
            monster.position.z = -17.4;

            raycaster.setFromCamera(mouseCoords, camera);
            box.position.copy(raycaster.ray.direction);
            box.position.add(raycaster.ray.origin);

            scene.add(box);

            pos.copy(raycaster.ray.direction);
            pos.multiplyScalar(80);
            box.setLinearVelocity(new THREE.Vector3(pos.x, pos.y, pos.z));*/
            
        });

}

function loadObj() {
    var loader = new THREE.GLTFLoader();
    loader.load('models/gltf/tree4.glb',
        function (obj) {
            object = obj.scene;
            object.position.set(20, 20, 20);
            object.rotation.set(0, 0, 0);
            scene.add(object);

            });
}
function loadGhost(monster,load) {
    var loader = new THREE.GLTFLoader();
    loader.load('models/gltf/ghost_demon.glb',
        function (obj) {
            object = obj.scene.children[0];
            object = object.children[0];
            object.position.set(0, 0, 0);
            object.rotation.set(0, 0, 0);
            object.scale.set(100,100,100);
            console.log(object);
            monster.load.copy(object);
            monster.add(object);

        });
}

function loadScene(l) {
    const loader = new THREE.GLTFLoader();
    switch (l) {
        case 0:
            var level = "tree.glb";
            break;
        case 1:
            var level = "Volcano.glb"
            break;
        case 2:
            var level= ""
    }

    var path = "models/gltf/" + level;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if (map[i][j] == 1) {
                loader.load(path, function (gltf) {
                    obj = gltf.scene;

                    obj.position.set(i * mapWidth / 10 - mapWidth / 2, 0, j * mapWidth / 10 - mapWidth / 2);
                    switch (l) {
                        case 0:
                            obj.scale.set(1000, 1000, 1000);

                            break;
                        case 1:
                            obj.scale.set(100, 100, 100);
                            break;
                        case 2:
                            obj.scale.set(100, 100, 100);
                    }

                    scene.add(obj);
                }, undefined, function (error) {

                    console.error(error);

                });
                
            }
        }
    }
    loaded = true;

}
