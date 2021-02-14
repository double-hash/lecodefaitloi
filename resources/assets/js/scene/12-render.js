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