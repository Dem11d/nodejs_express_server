document.addEventListener("DOMContentLoaded", function (event) {


    let stage = new createjs.Stage("canvas");
    createjs.Ticker.addEventListener("tick", function (event) {
        stage.update(event);
    });
    createjs.Ticker.setFPS(60);

    let bgContainer = new createjs.Container();
    let wheelContainer = new createjs.Container();
    stage.addChild(bgContainer);
    stage.addChild(wheelContainer);

    let bg = new Background(bgContainer);
    let wheel = new Wheel(wheelContainer);

    // let bg = new Backhround("canvas");
    let canvas = document.getElementById("canvas");

    canvas.addEventListener("click", function () {
        wheel.startWheel("444");
    });

    let nextTime = document.getElementById("nextTime");
    let lucky = document.getElementById("lucky");
    let won = document.getElementById("won");
    let tryAgain = document.getElementById("tryAgain");

    nextTime.addEventListener("click",()=>bg.nextTime());
    lucky.addEventListener("click",()=>bg.lucky());
    won.addEventListener("click",()=>bg.youWon());
    tryAgain.addEventListener("click",()=>bg.tryAgain());

});




