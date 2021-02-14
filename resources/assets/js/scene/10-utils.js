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