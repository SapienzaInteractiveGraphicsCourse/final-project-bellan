// JavaScript source code

const heightSpine = 20;
const radiusSpine = 0.5;
const torsoDepth = 5;
const torsoHeight = 7.5;
var monsterVelocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var life, strength;

function monster2(idx) {

    switch (l) {
        case (0):
            life = 100;
            strength = 50;
            var material = new THREE.MeshPhongMaterial
                ({
                    color: 0x003300, transparent: true, opacity: 1
                });
            003300
            break;
        case (1):
            life = 300;
            strength = 150;
            var material = new THREE.MeshPhongMaterial
                ({
                    color: 0x990000, transparent: true, opacity: 1
                });
            break;           
        case (2):
            life = 200;
            strength = 100;
            var material = new THREE.MeshPhongMaterial
                ({
                    color: 0x000066, transparent: true, opacity: 1
                });
            break;
            
    }

    monsterVelocity.set(0, 0, 0);

    var model = new THREE.Mesh(new THREE.SphereGeometry(5, 10, 10), material);
    var eyeR = new THREE.Mesh(new THREE.SphereGeometry(2, 10, 10), new THREE.MeshPhongMaterial({
        color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1, transparent: true, opacity: 1
    }));
    var eyeL = new THREE.Mesh(new THREE.SphereGeometry(2, 10, 10), new THREE.MeshPhongMaterial({
        color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1, transparent: true, opacity: 1
    }));
    var pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshPhongMaterial({
        color: 0x000000, transparent: true, opacity: 1
    }));
    var pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshPhongMaterial({
        color: 0x000000, transparent: true, opacity: 1
    }));
    var armR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 10, 2), material);
    var armL = new THREE.Mesh(new THREE.BoxGeometry(0.5,10,2), material);

    armR.position.set(-2.5, -5, 0);
    armL.position.set(2.5, -5, 0);
    eyeR.position.set(-1, 0, 3.5);
    eyeL.position.set(1, 0, 3.5);
    pupilL.position.set(0, 0, 2);
    pupilR.position.set(0, 0, 2);



    var load = new THREE.Object3D();
    monster = { model: model, life: life, strength: strength,velocity:monsterVelocity, load:load };
    monster.model.castShadow = true;
    monster.model.receiveShadow = true;
    monster.model.position.set(cat.model.position.x+150*Math.cos(Math.PI/6*idx), 10, cat.model.position.z+150*Math.sin(Math.PI/6*idx));
    monsters.push(monster);
    scene.add(monster.model);


    const spriteMat = new THREE.SpriteMaterial({ color: 0xffffff });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(0, 13, 0);
    sprite.scale.set(10, 1,1);
    monster.model.add(sprite);
    monster.model.add(eyeR);
    monster.model.add(eyeL);
    monster.model.add(armR);
    monster.model.add(armL);
    eyeR.add(pupilR);
    eyeL.add(pupilL);
}

function updateMonster(delta) {
    for (let i = 0; i < monsters.length; i++) {
        var speedMonster = 60 * (0.9 + i / 10);
        var position = new THREE.Vector3();
        position.copy(monsters[i].model.position);

        var direction = new THREE.Vector3();
        direction.subVectors(position, cat.model.position);
        if (35 < direction.length()) {
            direction.normalize();
            monsters[i].model.position.x -= speedMonster * delta * direction.x;
            monsters[i].model.position.z -= speedMonster * delta * direction.z;
        }
        /* else if (20 > direction.length()) {
             direction.normalize();
             monsters[i].model.position.x += speedMonster * delta * direction.x;
             monsters[i].model.position.z += speedMonster * delta * direction.z;
         }*/
        else if (25 > direction.length()) {
            monsters[i].model.position.x += speedMonster * delta;
            monsters[i].model.position.z += speedMonster * delta;
        }
        if (20 > direction.length()) {
            cat.life -= monsters[i].strength;
        }


        if (collisionMonsters(i).isTrue) {
            dir = collisionMonsters(i).direction;
            monsters[i].model.position.x += speedMonster * delta * dir.x;
            monsters[i].model.position.z += speedMonster * delta * dir.z;


        }

        if (position.y > 12) {
            monsters[i].velocity.y += G * 10 * delta;
        }
        else if (position.y <= 10) {
            monsters[i].velocity.y += 10;
        }
        if (monsters[i].velocity.y > 70) {
            monsters[i].velocity.y -= 10;
        }
        if (monsters[i].model.position.y > 30) {
            monsters[i].velocity.y -= 10;
        }
        monsters[i].model.position.y += monsters[i].velocity.y * delta;
        monsters[i].model.lookAt(cat.model.position);

        if (monsters[i].life <= 0) {
            monsters[i].model.material.opacity -= 0.01;
            if (monsters[i].model.material.opacity<0.05) {
                scene.remove(monsters[i].model);
                monsters.splice(i, 1);
            }
        }

    }

    }


      
    
function generateMonsters(clock, length, ENEMY) {
    if (Math.floor(clock.elapsedTime ) % wave == 0 && ENEMY == true && length < 12) {
        monster2(idx);
        idx ++;
        ENEMY = false;
        time = clock.elapsedTime;
    }
    if (idx >= 12) {
        idx = 0;
    }
    return ENEMY;
}

function damage() {

    if (balls.length>1) {
        for (let i = 0; i < monsters.length; i++) {
            var ball = balls[balls.length - 1];
            var monster = monsters[i].model;
            if (ball.geometry.boundingSphere != null && monster.geometry.boundingSphere != null) {
                var ballSphere = new THREE.Sphere(ball.position, ball.geometry.boundingSphere.radius);
                var monsterSphere = new THREE.Sphere(monster.position, monster.geometry.boundingSphere.radius);
                if (ballSphere.intersectsSphere(monsterSphere)) {
                    monsters[i].life -= cat.strength;
                    console.log("monster ", i, " hit. Damage: ", cat.strength, ". Life: ", monsters[i].life);
                    monsters[i].model.children[0].scale.set(monsters[i].life / life * 10, 1, 1);
                    scene.remove(balls[balls.length - 1]);
                    balls.pop();
                     
                }


            }
        }
    }
}


function collisionMonsters(idx) {
    var dir = new THREE.Vector3();
    var collision = { isTrue: false, direction: dir };
    if (monsters[idx].model.geometry.boundingSphere != null) {
        var sphere1 = new THREE.Sphere(monsters[idx].model.position, monsters[idx].model.geometry.boundingSphere.radius+5);
        for (let i = 0; i < monsters.length; i++) {
            if (monsters[i].model.geometry.boundingSphere != null) {
                var sphere2 = new THREE.Sphere(monsters[i].model.position, monsters[i].model.geometry.boundingSphere.radius+5);
                if (idx != i && sphere1.intersectsSphere(sphere2)) {
                    collision.direction.subVectors(sphere1.center, sphere2.center).normalize();
                    collision.isTrue = true;
                }
            }
        }
    }
    return collision
}



