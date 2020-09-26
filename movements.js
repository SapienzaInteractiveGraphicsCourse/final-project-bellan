function animatePlayer(delta) {

    var position = new THREE.Vector3();
    position.copy(controls.getObject().position)
    rayY.ray.origin.copy(controls.getObject().position);

    rayY.ray.origin.y -= 10;

    var interY = rayY.intersectObjects(collidableObjects);

    var onObject = interY.length > 0;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta;

    if (moveForward) {
        velocity.z -= speed * delta;
    }
    if (moveBackward) {
        velocity.z += speed * delta;
    }

    if (moveLeft) {
        velocity.x -= speed * delta;
    }
    if (moveRight) {
        velocity.x += speed * delta;
    }

    if (!(moveForward || moveBackward || moveLeft || moveRight)) {
        velocity.x = 0;
        velocity.z = 0;
    }

    controls.getObject().translateX(velocity.x * delta);
    controls.getObject().translateZ(velocity.z * delta);

    rayXL.ray.origin.copy(controls.getObject().position);
    rayXR.ray.origin.copy(controls.getObject().position);
    rayZF.ray.origin.copy(controls.getObject().position);
    rayZB.ray.origin.copy(controls.getObject().position);

    rayXR.ray.origin.x += 10;
    rayXL.ray.origin.x -= 10;
    rayZF.ray.origin.z -= 10;
    rayZB.ray.origin.z += 10;

    var interXR = rayXR.intersectObjects(collidableObjects);
    var interXL = rayXL.intersectObjects(collidableObjects);
    var interZF = rayZF.intersectObjects(collidableObjects);
    var interZB = rayZB.intersectObjects(collidableObjects);

    var againstXR = interXR.length > 0;
    var againstXL = interXL.length > 0;
    var againstZF = interZF.length > 0;
    var againstZB = interZB.length > 0;

    if (againstXL || againstXR || againstZB || againstZF) {

        controls.getObject().position.x = position.x;
        controls.getObject().position.z = position.z;
    }

    if (onObject === true) {

        velocity.y = Math.max(0, velocity.y);
        canJump = true;

    }

    controls.getObject().position.y += (velocity.y * delta);

    if (controls.getObject().position.y < 10) {

        velocity.y = 0;
        controls.getObject().position.y = 10;

        canJump = true;

    }
    rayXL.ray.origin.copy(controls.getObject().position);
    rayXR.ray.origin.copy(controls.getObject().position);
    rayZF.ray.origin.copy(controls.getObject().position);
    rayZB.ray.origin.copy(controls.getObject().position);


    rayXR.ray.origin.x += 5;
    rayXL.ray.origin.x -= 5;
    rayZF.ray.origin.z -= 5;
    rayZB.ray.origin.z += 5;



    var interXR = rayXR.intersectObjects(collidableObjects);
    var interXL = rayXL.intersectObjects(collidableObjects);
    var interZF = rayZF.intersectObjects(collidableObjects);
    var interZB = rayZB.intersectObjects(collidableObjects);

    var againstXR = interXR.length > 0;
    var againstXL = interXL.length > 0;
    var againstZF = interZF.length > 0;
    var againstZB = interZB.length > 0;
}
