import gsap from "gsap";

/*------------------------------------*\
  #SCRIPTS
\*------------------------------------*/

var $ = require("jquery");

/********** VIEW VARS ************/

$('.loader').css('display','block');
$('.actions').css('display','none');
global.view = {
  mode: 'three',
  distance: 500,
  rotating: 1.0,
  intro: 1.0,
  tiltX:0,
  tiltY:0, 
  mX:0,
  mY:0
}

$( document ).ready(function() {
  // modules
  function main(){
    require('./modules/scene.js');
    require('./modules/_illustrations.js');
  }
  main();
  setTimeout(() => {
    $('.loader').fadeOut(49);
    if (view.intro == 1.0 && view.mode == 'three') {
        gsap.to(view, {
            intro: 0,
            duration: 2,
            delay:0.4,
            ease:'circ.out',
            onComplete: function() {
              $('.actions').css('opacity','0');
              $('.actions').css('transition','none');
              $('.actions').css('display','flex');
              gsap.to($('.actions'), {
                  opacity: 0.6,
                  duration:1,
                  ease:'circ.out',
                  onComplete: function(){
                    $('.actions').css('opacity','');
                    $('.actions').css('transition','');
                  }
              });
            }
        });
    }
  }, 2950);

  // TODO : gestion du mode de vue par un paramètre dans l'url ?
  if (view.mode == 'three') {
      $('body').addClass('three');
  }
  else if (view.mode == 'classic') {
      $('body').addClass('classic');

  }
  else if (view.mode == 'print') {
      $('body').addClass('classic');
  }
  
  $('.btn--read').on('click', function(){
    $('.actions').removeClass('menu--open');
    $('.btn--read').fadeOut(500);
    gsap.to(view, { 
      distance: 0, 
      rotating:0.1,
      duration:1.5,
      onComplete: function() {
        $('.btn--back').fadeIn(500);
        $('.three #scene-container .book').css('overflow-y','scroll');
      }
    })
  });
  $('.btn--classic').on('click', function(){
      $('.actions').removeClass('menu--open');
      view.mode = 'classic';
      $('#scene-container .book').scrollTop(0);
      $('#scene-container .book').css('overflow-y','hidden');
      $('body').removeClass('three');
      $('body').removeClass('print');
      $('body').addClass('classic');
  });
  $('.btn--back').on('click', function(){
    $('.actions').removeClass('menu--open');
    $('.btn--back').fadeOut(500);
    $('#scene-container .book').css('overflow-y','hidden');
    $('#scene-container .book').animate({scrollTop:0}, 500);
    gsap.to(view, { 
      distance: 500, 
      rotating:1,
      duration:1.5,
      onComplete: function() {
        $('.btn--read').fadeIn(500);
      }
    })
  });
  $('.btn--three').on('click', function(){
      view.mode = 'three';
      view.distance = 500;
      view.rotating= 1.0;
      $('.actions').removeClass('menu--open');
      $('.btn--read').fadeIn(500);
      $('.btn--classic').fadeIn(500);
      $('.btn--back').css('display','none');
      $('.three #scene-container .book').scrollTop(0);
      $('.three #scene-container .book').css('overflow-y','hidden');
      $('body').addClass('three');
      $('body').removeClass('print');
      $('body').removeClass('classic');
  });
  $('.btn--menu').on('click', function(){
      $('.actions').toggleClass('menu--open');
  });
  $('.btn--print').on('click', function(e){
    $('.actions').removeClass('menu--open');
  });

});
