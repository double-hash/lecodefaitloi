/*----------------------------------------------
    CAMERA PROPERTIES
-----------------------------------------------*/
// const fov = 75;
const near = 1;
const far = 4000;
const camera = new THREE.PerspectiveCamera(45, 2, near, far);
let vFov = (camera.fov/180)*Math.PI;

camera.position.set(0,-0.005,-2);
camera.lookAt(0,0,100);
scene.add(camera);

let nearPoints = getViewNearPoints();
console.log(nearPoints);

let vWidth = Math.abs(nearPoints[0].x - nearPoints[1].x); 
let vHeight = Math.abs(nearPoints[2].y - nearPoints[0].y); 
const pDepth = 0.2;