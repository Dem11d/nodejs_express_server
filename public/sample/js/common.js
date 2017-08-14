$(document).ready(function(){
    $(".chat__messages").mCustomScrollbar({scrollInertia: 300});
    var slider = document.getElementById('rangeSlider');
    noUiSlider.create(slider, {
        start: [0],
        step: 1,
        range: {
            min: [0],
            max: [100]
        }
    });
    $(".noUi-handle").append("<div id='uiValue'></div>");
    var rangeSliderValueElement = document.getElementById('uiValue');
    slider.noUiSlider.on('update', function( values, handle ) {
        rangeSliderValueElement.innerHTML = "$" + values[handle].slice(0, -3);
    });

    $(".bet-now-btn").click(function(){
        coinClick();
    });

    var oCoin = $(".coin");
    var betBtn = $(".bet-now-btn");
    function coinClick(){
        betBtn.addClass("disabled");
        if(!oCoin.hasClass("anim")){
            oCoin.addClass("anim");
            setTimeout(function(){
                oCoin.removeClass("anim");
                betBtn.removeClass("disabled");
            }, 1000);
        }
    }

    $(".nav__item").click(function(){
        if(!$(this).hasClass("nav__item_active")){
            hideNavTab();
            $(this).addClass("nav__item_active");
            $(".nav-pop-up [data-attr="+$(this).attr("data-attr")+"]").addClass("nav-pop-up__table_visible");
        } else  hideNavTab();
    });
    function hideNavTab(){
        $(".nav__item_active").removeClass("nav__item_active");
        $(".nav-pop-up > div").removeClass("nav-pop-up__table_visible");
    }

    $(".header__control li:not(:first-child)").click(function(){
        $(this).toggleClass("disabled");
    });

    $(".header__mon-acc > div").click(function(e){
        if(!$(this).children().hasClass("active") && $(this).has(e.target).length === 0 && !$(".chat").hasClass("active")){
            $(".header__mon-acc .active").removeClass("active");
            $(this).find(">*").addClass("active");
        } else if($(this).has(e.target).length === 0)
            $(".header__mon-acc .active").removeClass("active");
    });

    $(".profile-nav__item").click(function(){
        $(this).closest(".active").removeClass("active");
    });

    $(".profile-nav__item_profile").click(function(){
        $(".overlay").addClass("active");
        $(".edit-profile").addClass("active");
    });

    $(document).mouseup(function (e){
        var div = $(".header__mon-acc > div");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $(".header__mon-acc .active").removeClass("active");
        }
    });
    $(".cross, .btn_cancel").click(function(){
        $(this).closest(".active").removeClass("active");
        $(this).closest(".visible").removeClass("visible");
        $(".overlay").removeClass("active");
    });
    $(".chat__btn").click(function(){
        $(".chat").toggleClass("active");
    });
    $(".dropdown").hover(
        function() {
            $(".dropdown__content").addClass("visible")
        }, function() {
            $(".dropdown__content").removeClass("visible")
        }
    );
    $(".dropdown__content li").click(function(){
        $(".dropdown__content").removeClass("visible");
        $(".dropdown > div").text($(this).text()).removeClass().addClass($(this).attr("class"));
    });
    $(".window__lin_reg").click(function(){
        $(this).closest(".window_log").removeClass("visible");
        $(".window_reg").addClass("visible");
    });
    $(".smile__btn").click(function(){
        $(".smile__content").toggleClass("active");
    });
    $(".smile__item").click(function(){
        $(this).clone().appendTo(".chat__textarea");
        $(".chat__bottom .smile__item").attr('contenteditable','false');
    });
    $(".create-room-btn").click(function(){
        $(".create-room-modal").addClass("visible");
    });
    $(".made-a-bet").click(function(){
        $(".made-a-bet").append("<div class='made-a-bet__item'>Белый Джо сделал ставку</div>");
        madeBetAnim();
    });
    function madeBetAnim(){
        setTimeout(function(){
            $(".made-a-bet__item:nth-last-child(1)").addClass("active")
        },500)
    }
    $(".progress-bar").click(function(){
        progressBarAnim();
    });
    function progressBarAnim(){
        var pbCurrentTime = $(".progress-bar__current-time");
        var pg = $(".progress-bar");
        var count = 1;

        pg.addClass("progress-bar_anim");
        pbCurrentTime.text(count);

        var anim = setInterval(function(){
            if(count != 60){
                count++;
                pbCurrentTime.text(count);
            }
            else {
                clearInterval(anim);
                pg.removeClass("progress-bar_anim");
                pbCurrentTime.text("0");
            }
        }, 1000);
    }

    function ligthAnim(){
        var aLigth = $(".lamps__wrap");
        setInterval(function(){
            for(let i = 0; i < aLigth.length; i++){
                $(aLigth[i]).children().removeClass("visible");
                let randomNumber = Math.floor(Math.random() * 5);
                let aLigthChild = $(aLigth[i]).children();
                $(aLigthChild[randomNumber]).addClass("visible")
            }
        }, 500);
    }
    $(".lamps").click(function(){
        ligthAnim();
    });
});
