var $ = require("jquery");
const cssScale = 0.95;

var element = document.querySelector('#main .book');
element = element.cloneNode(true);
const cssObject = new CSS3DObject( element );

var element2 = document.querySelector('.illustration');
element2 = element2.cloneNode(true);
const cssObject2 = new CSS3DObject( element2 );


cssObject.rotation.y = Math.PI ;
camera.aspect = canvas.clientWidth / canvas.clientHeight;
camera.updateProjectionMatrix();
vFov = (camera.fov/180)*Math.PI;
let fitDistance = distanceToFitObjectToView(camera.aspect, vFov, element.clientWidth, element.clientHeight);
cssObject.position.z = fitDistance + view.distance;

console.log(fitDistance);

cssObject2.rotation.y = Math.PI ;
cssObject2.position.z = fitDistance + view.distance;

cssScene.add( cssObject );
cssScene.add( cssObject2 );

const pGeo = new THREE.PlaneGeometry( 1, 1, 1, 1);

var pMat = new THREE.MeshPhongMaterial({
    opacity	: 0.05,
    color	: new THREE.Color('black'),
    blending: THREE.NoBlending,
    side	: THREE.DoubleSide,
    // wireframe: true
});
const pl1 = new THREE.Mesh(pGeo, pMat);
cssObject.scale.set(cssScale,cssScale,1);
cssObject2.scale.set(cssScale,cssScale,1);
pl1.position.copy( cssObject.position );
pl1.rotation.copy( cssObject.rotation );
pl1.scale.set(element.clientWidth*cssScale, element.clientHeight*cssScale, 1);
pl1.scale.set(16, 9, 1);
pl1.castShadow = false;
pl1.receiveShadow = true;
scene.add(pl1);
// console.log(pl1);