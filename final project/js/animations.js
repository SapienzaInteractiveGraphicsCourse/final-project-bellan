function animate_weapon(ch,delta) {
    if (controls.enabled) {
        switch (ch) {
            case 0:
                sword_animation();
                break;
            case 1:
                fireball_animation(delta);
                break;
            case 2:
                break;
        }
    }
}


function sword_animation() {
    if (FIRE) {
        controls.getObject().children[1].rotation.x -= 0.1;
        temp = 1;
        
    }
    if (controls.getObject().children[1].rotation.x >=0) {
        console.log("not fire");
            FIRE = false;

        }
    if (!FIRE && controls.getObject().children[1].rotation.x> -Math.PI * 0.75) {
        controls.getObject().children[1].rotation.x -= 0.1;

        }
    
}

function fireball_animation(delta) {

    //var ballShape = new CANNON.Sphere(0.2);
    //ball = true;

    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var ball = new THREE.Mesh(geometry, material);

    ball.position = controls.getObject().position;


    // var ballBody = new CANNON.Body({ mass: BALLMASS });
    //ballBody.addShape(ballShape);

    ball.name = "ball";
    //ballBody.name = "ballBody";
    targetVec = controls.getDirection();


velfire.x = targetVec.x * VELFIRE;
    velfire.y = targetVec.y * VELFIRE;
    velfire.z = targetVec.z * VELFIRE;

    if (FIRE && !BALL) {

        scene.add(ball);

        FIRE = false;
        BALL = true;


    }
    if (BALL) {

        ball.position.x += velfire.x * delta;
        ball.position.z -= velfire.z * delta;
        ball.position.y += velfire.y - G * delta * delta;
        //world.addBody(ballBody);

        if (ball.position.y <= 2) {
            BALL = false;
            scene.remove(ball);
        }

        }
}






