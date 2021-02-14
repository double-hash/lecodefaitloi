var $ = require("jquery");

$( document ).ready(function() {
    var i = $('.illustration .i');

    var lgth = i.length /2;
    console.log(lgth); 
    var ind = 0;
    
    var animations = [
        function(){
            $('.i').css({
                top: '',
                left: ''
            });
            $('.illustration').removeClass('illustration--4');
            $('.illustration').addClass('illustration--1');
            $.each(i, function (index) {
                $(i[index]).css('top', ((100 / lgth) * (index) + '%'));
                if ((index % lgth) == 0 || (index % lgth) == 15) {
                    $(i[index]).addClass('round');
                }
            });
        },
        function(){
            $('.i').css({
                top: '',
                left: ''
            });
            $('i').removeClass('round');
            $('.illustration').removeClass('illustration--1');
            $('.illustration').addClass('illustration--2');
        },
        function(){
            $('.i').css({
                top: '',
                left: ''
            });
            $('.illustration').removeClass('illustration--2');
            $('.illustration').addClass('illustration--3');
        },
        function(){
            $('.i').css({
                top: '',
                left: ''
            });
            $('.illustration').removeClass('illustration--3');
            $('.illustration').addClass('illustration--4');
        },
    ]
    
    
    var ind = 0;
    animations[ind]();
    changeAnimIndex(ind);
    
    function changeAnimIndex(ind){
        window.setInterval(function(){
            if (ind >= animations.length - 1){
                animations[ind]();
                return ind = 0;
            }
            else {
                animations[ind]();
                return ind++;
            }
        }, 60000);
    }; 
    
});


