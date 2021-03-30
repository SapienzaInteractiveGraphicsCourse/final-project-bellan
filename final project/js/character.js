model = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x000000 }));
model.castShadow = true;
var cat;

function character(you) {
    model = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x000000, transparent:true, opacity:0 }));
    model.castShadow = true;
    var  strength, life;
    scene.add(model);

    switch (you) {
        case (0):
            life = 500000;
            strength = 50;
            break;
        case (1):
            life = 1000000;
            strength = 16.7;
            break;
        case (2):
            life = 750000;
            strength = 25;
    }

    cat = { model: model, life: life, strength: strength };

    console.log(cat.life);
    console.log(cat.strength);
}

function lifePoints() {
    if (cat.life <= 0) {
        GAMEOVER = true;
        gameOver();
    }

}