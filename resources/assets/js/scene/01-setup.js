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

