/*-------------- IMPORTS ----------------*/
import * as THREE from 'three/build/three.module.js';

import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

/*-------------- SETUP ----------------*/
const canvas = document.querySelector('#scene');;
const renderer = new THREE.WebGLRenderer({canvas, alpha : true, antialias: true });
// renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;  
renderer.domElement.style.zIndex = '1';
renderer.domElement.style.width = "100%"; 
renderer.domElement.style.height = "100%";  
const scene = new THREE.Scene();
 
{
    const near = 1000;
    const far = 10000;
    const color = 0x000000;
    scene.fog = new THREE.Fog(color, near, far);
    // scene.fog = new THREE.FogExp2(color, 0.001);
    scene.background = new THREE.Color(color); 
    renderer.setClearColor('black');
}


// CSS 3D CANVAS
const cssCanvas = document.querySelector('#scene-content');
const cssRenderer = new CSS3DRenderer();
// cssRenderer.setPixelRatio( window.devicePixelRatio );
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
// cssRenderer.domElement.style.position = 'absolute';
// cssRenderer.domElement.style.top = 0;
var cssScene = new THREE.Scene();

document.getElementById('scene-content').appendChild( cssRenderer.domElement );


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


// import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2.js';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
// import { MtlObjBridge } from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

/*-------------- OBJLoader ----------------*/
// let monitor;
// {
//     const mtlLoader = new MTLLoader();
//     mtlLoader.load('assets/scene/monitor.mtl', (mtlParseResult) => {
//         const objLoader = new OBJLoader2();
//         const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
//         objLoader.addMaterials(materials);
//         objLoader.load('assets/scene/monitor.obj', (root) => {
//             monitor = root;
//             root.scale.set(0.3,0.3,0.3);
//             root.rotation.y = (Math.PI/180) * 90;
//             root.position.x = 1;
//             root.position.z = 10;
//             scene.add(root);
//         });
//     });
// }

// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// import {DeviceOrientationControls} from "three/examples/jsm/controls/DeviceOrientationControls";

/*-------------- CONTROLS ----------------*/
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.update(); //controls.update() must be called after any manual changes to the camera's transform
// controls.target.z =  1;
// controls.target.z =  camera.position.z + 0.01; //fps-like controls

// const controls = new DeviceOrientationControls( camera, renderer.domElement );

/*----------------------------------------------
    LIGHTS
-----------------------------------------------*/
let ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);


/*----------------------------------------------
    GEOMETRIES
-----------------------------------------------*/



import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js';
// import {BloomPass} from 'three/examples/jsm/postprocessing/BloomPass.js';

/*----------------------------------------------
    POST-PROCESSING
-----------------------------------------------*/
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera)); 

// const bloomPass = new BloomPass(
//     0.2,    // strength
//     50,   // kernel size
//     4,    // sigma ?
//     512,  // blur render target resolution
// );
// composer.addPass(bloomPass);

const filmPass = new FilmPass(
    0.3,   // noise intensity
    0.1,  // scanline intensity
    180,    // scanline count
    false,  // grayscale
);

// filmPass.renderToScreen = true;
// composer.addPass(filmPass);
composer.setSize(canvas.width, canvas.height);
/*----------------------------------------------
    UTILS
-----------------------------------------------*/
function resizeRendererToDisplaySize(renderer, cssRenderer) {
    // const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    
    if (needResize) {
        renderer.setSize(width, height, false);
        cssRenderer.setSize(width, height, false);
    }
    return needResize;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function getViewNearPoints() {
    var points = []
    // Top left corner
    points.push(new THREE.Vector3().set(-1,1,-1).unproject(camera));
    // Top right corner
    points.push(new THREE.Vector3().set(1,1,-1).unproject(camera));
    // Bottom left corner
    points.push(new THREE.Vector3().set(-1,-1,-1).unproject(camera));
    // Bottom right corner
    points.push(new THREE.Vector3().set(1,-1,-1).unproject(camera));
    return points;
}

/**
 * Convert vertical field of view to horizontal field of view, given an aspect
 * ratio. See https://arstechnica.com/civis/viewtopic.php?f=6&t=37447
 *
 * @param vfov - The vertical field of view.
 * @param aspect - The aspect ratio, which is generally width/height of the viewport.
 * @returns - The horizontal field of view.
 */
function vfovToHfov(vfov, aspect) {
    const {tan, atan} = Math
    return atan(aspect * tan(vfov / 2)) * 2
}

/**
 * Get the distance from the camera to fit an object in view by either its
 * horizontal or its vertical dimension.
 *
 * @param size - This should be the width or height of the object to fit.
 * @param fov - If `size` is the object's width, `fov` should be the horizontal
 * field of view of the view camera. If `size` is the object's height, then
 * `fov` should be the view camera's vertical field of view.
 * @returns - The distance from the camera so that the object will fit from
 * edge to edge of the viewport.
 */
function _distanceToFitObjectInView(size, fov){
    const {tan} = Math
    return size / (2 * tan(fov / 2))
}

function distanceToFitObjectToView(
    cameraAspect,
    cameraVFov,
    objWidth,
    objHeight
    ){
    const objAspect = objWidth / objHeight
    const cameraHFov = vfovToHfov(cameraVFov, cameraAspect)

    let distance= 0
    
    if (objAspect > cameraAspect) {
    distance = _distanceToFitObjectInView(objHeight, cameraVFov)
    } else if (objAspect <= cameraAspect) {
    distance = _distanceToFitObjectInView(objWidth, cameraHFov)
    }
    return distance
}
import gsap from "gsap";

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;                                                        
var yDown = null;  

//TODO : Déplacer menu mobile en le draggant ?

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}; 

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          /* left swipe */
        } else {
          /* right swipe */
        }
        // view.tiltY = xDiff;
        gsap.to(view, {
            tiltY : view.tiltY - (xDiff * 0.07),
            duration: 1,
        });
    } else {
        if ( yDiff > 0 ) {
        /* up swipe */ 
        } else { 
        /* down swipe */
        }   
        // view.tiltY = xDiff;
        gsap.to(view, {
            tiltX : view.tiltX - (yDiff * 0.02),
            duration: 1,
        });                                                               
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

window.onmousemove = function(e) {
  if (view.mode == 'three') {
    gsap.to(view, {
        tiltX : (e.pageY / window.innerHeight) - 0.5,
        tiltY: (e.pageX / window.innerWidth) - 0.5,
        duration: 4,
        ease: "easeOut",
    });
  }
};
/*----------------------------------------------
    RENDER LOOP
-----------------------------------------------*/
let then = 0;

function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    const speed = 0.5;
    const rot = now * speed;
    
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    vFov = (camera.fov/180)*Math.PI;
    fitDistance = distanceToFitObjectToView(camera.aspect, vFov, element.clientWidth, element.clientHeight);
    if (resizeRendererToDisplaySize(renderer,cssRenderer)) {
        // const canvas = renderer.domElement;
        // camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // camera.updateProjectionMatrix();
        // vFov = (camera.fov/180)*Math.PI;
        // fitDistance = distanceToFitObjectToView(camera.aspect, vFov, element.clientWidth, element.clientHeight);
        composer.setSize(canvas.width, canvas.height);
    }

    // pl1.rotation.y = rot * 1.0;

    cssObject.position.z = fitDistance + view.distance;
    cssObject2.position.z = (fitDistance*1) + view.distance;
    
    pl1.position.copy( cssObject.position );

    pl1.scale.set(element.clientWidth*(1.-view.intro), element.clientHeight*(1.-view.intro), 1);
    cssObject.scale.set(1 - view.intro, 1 - view.intro, 1);
    cssObject2.scale.set(1 - view.intro, 1 - view.intro, 1);

    pl1.material.opacity = 0.05 + view.intro; 

    cssObject.rotation.x = (-view.tiltX - view.mX) * view.rotating ;
    cssObject.rotation.y = (Math.PI) + ((view.tiltY + view.mY)* view.rotating)+ (0.5*view.intro);
    
    cssObject2.rotation.copy(cssObject.rotation);
    pl1.rotation.copy(cssObject.rotation);

    if (view.tiltX > 0.001 || view.tiltX < -0.01) {
        view.tiltX=view.tiltX*0.99;
    }
    else {
        view.tiltX = 0;
    }


    if (view.tiltY > 0.01 || view.tiltY < -0.01) {
        view.tiltY=view.tiltY*0.99;
    }
    else {
        view.tiltY = 0;
    }

    // controls.update();// required sif controls.enableDamping or controls.autoRotate are set to true

    composer.render(deltaTime);
    cssRenderer.render( cssScene, camera );

    requestAnimationFrame(render);
}

requestAnimationFrame(render);