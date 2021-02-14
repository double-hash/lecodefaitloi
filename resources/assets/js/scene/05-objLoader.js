
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