function Background(stage) {

    let mainContainer = new createjs.Container();
    let preload_source = [
        {
            id: "you_won",
            src: "resources/img/you_won.png"
        },
        {
            id: "lucky",
            src: "resources/img/you_are_lucky.png"
        },
        {
            id: "try_again",
            src: "resources/img/try_again.png"
        },
        {
            id: "next_time",
            src: "resources/img/maybe_next_time.png"
        }];
    let sprite;
    let spriteSheets;
    const shortX = 73;
    const longX = 0;
    const shortY =0;
    const longY =35;

    //initialization preloader

    let preloader = new Preloader(preload_source, handleComplete);

    function handleComplete() {


        spriteSheets = getSpriteSheets();
        sprite = new createjs.Sprite(spriteSheets.lucky);
        sprite.x = longX;
        sprite.y = longY;

        stage.addChild(sprite);


        // let rangeX = document.getElementById("rangeX");
        // let rangeY = document.getElementById("rangeY");
        // rangeX.addEventListener("change", function () {
        //     let value = rangeX.value;
        //     sprite.x = value;
        // });
        // rangeY.addEventListener("change", function () {
        //     let value = rangeY.value;
        //     sprite.y = value;
        //     console.log(sprite.y);
        // });


    }


    stage.addChild(mainContainer);

    function getSpriteSheets() {
        let spriteSheets = {};

        //you_won
        let data = {
            images: [preloader.getResult("you_won")],
            frames: {
                width: 440,
                height: 320,
            },
            framerate: 16,
            animations: {
                show: [0, 40, "anim"],
                anim: [41, 59, "hide"],
                hide: {
                    frames: (function () {
                        let result = [];
                        for (let i = 40; i >= 0; i--) {
                            result.push(i);
                        }
                        return result;
                    }()),
                    next:0

                },
                transparent: 59,
            }
        };
        spriteSheets.you_won = new createjs.SpriteSheet(data);

        //try_again
        data.images = [preloader.getResult("try_again")];
        spriteSheets.try_again = new createjs.SpriteSheet(data);

        //try_again
        data.images = [preloader.getResult("lucky")];
        data.frames.width = 600;
        spriteSheets.lucky = new createjs.SpriteSheet(data);

        //try_again
        data.images = [preloader.getResult("next_time")];
        spriteSheets.next_time = new createjs.SpriteSheet(data);

        return spriteSheets;
    }

    function tryAgain() {
        sprite.spriteSheet = spriteSheets.try_again;
        sprite.gotoAndPlay("show");
        sprite.x = shortX;
        sprite.y = shortY;

    }
    function youWon() {
        sprite.spriteSheet = spriteSheets.you_won;
        sprite.gotoAndPlay("show");
        sprite.x = shortX;
        sprite.y = shortY;

    }
    function lucky() {
        sprite.spriteSheet = spriteSheets.lucky;
        sprite.gotoAndPlay("show");
        sprite.x = longX;
        sprite.y = longY;
    }
    function nextTime() {
        sprite.spriteSheet = spriteSheets.next_time;
        sprite.gotoAndPlay("show");
        sprite.x = longX;
        sprite.y = longY;

    }

    return {
        tryAgain: ()=>tryAgain(),
        youWon: ()=>youWon(),
        lucky: ()=>lucky(),
        nextTime: ()=>nextTime(),
    }

}