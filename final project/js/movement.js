var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var speed = 600;



function animatePlayer(delta) {

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y += G * 10.0 * delta;

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

    if (!(moveForward || moveBackward || moveLeft || moveRight) ) {
        velocity.x = 0;
        velocity.z = 0;
    }

    if (cat.model.position.x > 2000) {
        controls.getObject().translate(-velocity.x * delta);
    }
    if (cat.model.position.z > 2000) {
        controls.getObject().translate(-velocity.z * delta);
    }
    controls.getObject().translateX(velocity.x * delta);
    controls.getObject().translateZ(velocity.z * delta);
    controls.getObject().position.y += (velocity.y * delta);



    if (controls.getObject().position.y < 15) {

        velocity.y = 0;
        controls.getObject().position.y = 15;

        canJump = true;

    }

    cat.model.position.copy(controls.getObject().position);
    cat.model.position.y -= 5;



}

function move() {
    var onKeyDown = function (event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if (canJump === true) velocity.y += 100;
                canJump = false;
                break;

        }

    };

    var onKeyUp = function (event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

}
