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
            var bones = [];
            monster = gltf.scene;
            monster.position.set(20,20, 20);
            monster.rotation.set(0, 0, 0);
            scene.add(monster);
            monster.traverse(o => {
                if (o.isBone) {
                    bones.push(o);
                }
                
            });
        });

}
