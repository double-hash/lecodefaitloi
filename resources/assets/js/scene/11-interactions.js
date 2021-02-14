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