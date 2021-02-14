
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