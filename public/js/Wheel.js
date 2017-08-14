function Wheel(canvasId) {
    let canSpin = false;
    const segments = 16;
    const circle = 360;
    const segment_length = circle / segments;

    //initialization preloader
    let preloader = new Preloader(handleComplete);

    let stage = new createjs.Stage(canvasId);
    let rotationContainer = new createjs.Container();
    let mainContainer = new createjs.Container();
    mainContainer.alpha = 0;

    stage.addChild(mainContainer);

    function handleComplete() {

        renderWheel();

        createjs.Ticker.addEventListener("tick", function () {
            stage.update();
        });
        createjs.Ticker.setFPS(35);

    }

    function renderWheel() {


        //rotationContainer

        rotationContainer.regX = 220;
        rotationContainer.regY = 220;
        rotationContainer.x = 300;
        rotationContainer.y = 300;

        //wheel
        let wheel = new createjs.Bitmap(preloader.getResult("wheel"));
        rotationContainer.addChild(wheel);
        console.log(wheel);

        //background
        let background = new createjs.Bitmap(preloader.getResult("background"));
        mainContainer.addChild(background);
        background.x = 50;
        background.y = 50;

        //wheel layer
        mainContainer.addChild(rotationContainer);

        //shadows
        let shadows = new createjs.Bitmap(preloader.getResult("shadows"));
        mainContainer.addChild(shadows);
        shadows.x = 80;
        shadows.y = 80;

        //center
        let center = new createjs.Bitmap(preloader.getResult("center"));
        mainContainer.addChild(center);
        center.x = 245;
        center.y = 250;


        //pointer
        let pointer = new createjs.Bitmap(preloader.getResult("pointer"));
        mainContainer.addChild(pointer);
        pointer.x = 260;

        canSpin = true;

        function prettyShow() {
            createjs.Tween.get(mainContainer)
                .to({alpha: 1}, 2000, createjs.Ease.quadOut);
        }

        prettyShow();

    }

    function startWheel(winNumber, callback) {
        canSpin = false;
        let timeCoef = 100;

        let win_position = nextRand(15);
        console.log(`win position is ${win_position}`);

        let present_position = getNextPosition(15 - Math.ceil((rotationContainer.rotation - segment_length / 2) % 360 / (segment_length)));
        console.log(`present position is ${present_position}`);
        let rotationSource = {
            starter: {
                wheels: 2,
                time: 30 * timeCoef,
                pattern: createjs.Ease.backIn
            },
            rotating: {
                wheels: 8,
                time: 45 * timeCoef,
                pattern: createjs.Ease.linear
            },
            stopping: {
                wheels: 3,
                time: 45 * timeCoef,
                pattern: createjs.Ease.quadOut
            }
        };

        let offset = getOffset(present_position, win_position);

        console.log(`offset is ${offset}`);

        let deviationBorder = 2;    //maximum Convergence to border
        let deviation = Math.ceil(nextRand(segment_length - 2 * deviationBorder) - ((segment_length - 2 * deviationBorder) / 2));
        console.log(`deviation = ${deviation}`);
        let wheelOffset = offset * segment_length + deviation;

        rotationContainer.rotation = rotationContainer.rotation % 360;


        let starterRotation = rotationContainer.rotation + circle * rotationSource.starter.wheels;
        let positionWithoutDeviation = circle - present_position * segment_length;

        let rotatingRotation = circle * (rotationSource.rotating.wheels + rotationSource.starter.wheels) + wheelOffset + positionWithoutDeviation;
        let rotatingTime = rotationSource.rotating.time * rotationSource.rotating.wheels * circle / rotatingRotation;

        let rotationData = {
            starter: {
                rotation: starterRotation,
                time: rotationSource.starter.time,
                pattern: rotationSource.starter.pattern,
            },
            rotating: {
                rotation: rotatingRotation,
                time: rotatingTime,
                pattern: rotationSource.rotating.pattern,
            },
            stopping: {
                rotation: rotatingRotation + rotationSource.stopping.wheels * circle,
                time: rotationSource.stopping.time,
                pattern: rotationSource.stopping.pattern,
            }
        };


        console.log(`number is ${winNumber}`);
        console.log(rotationData);
        createjs.Tween.get(rotationContainer)
        //wheel rotation

            .call(hideText)
            // .wait(2000)
            .to({rotation: rotationData.starter.rotation}, rotationData.starter.time, rotationData.starter.pattern)
            .call(fillNumbers)
            .to({rotation: rotationData.rotating.rotation}, rotationData.rotating.time, rotationData.rotating.pattern)
            .call(appearText)
            .to({rotation: rotationData.stopping.rotation}, rotationData.stopping.time, rotationData.stopping.pattern)
            .call(useCallback)
            .call(() => canSpin = true);

        function hideText() {

            if (TextObject.containers) {
                console.log("hiding text");
                for (let i = 0; i < TextObject.containers.length; i++) {
                    let tween = createjs.Tween.get(TextObject.containers[i], {override: true})
                        .to({alpha: 0}, 3200);
                }
            } else
                console.log("there is no text to hide");
        }

        function appearText() {

            if (TextObject.containers) {
                console.log(`appearing text`);
                for (let i = 0; i < TextObject.containers.length; i++) {
                    let tween = createjs.Tween.get(TextObject.containers[i], {override: true})
                        .to({alpha: 1}, 2000);
                }
            } else
                console.log("there is nothing to show");
        }


        function fillNumbers() {
            console.log("filling numbers");


            let numbers = [];
            numbers[0] = winNumber;
            //filling array
            while (numbers.length <= segments) {
                let number = nextRand(65535);
                if (!~numbers.indexOf(number))
                    numbers.push(number);
            }
            //render numbers
            for (let i = 0, current = win_position; i < 16; i++, current = getNextPosition(current)) {
                new TextObject(numbers[i] + "", current, rotationContainer);
            }
        }


        function useCallback() {
            if (callback) {
                callback();
            }
        }

        function nextRand(number) {
            return Math.floor(Math.random() * ++number);
        }

        function getOffset(oldPosition, newPosition) {
            //in front direction
            let position = oldPosition;
            let frontDirection = 0;
            if (oldPosition == newPosition)
                return 0;
            while (position != newPosition) {
                position = getNextPosition(position);
                frontDirection++;
            }
            let backDirection = 0;
            //in backward direction
            position = oldPosition;
            while (position != newPosition) {
                position = getPreviousPosition(position);
                backDirection++;
            }

            return frontDirection <= backDirection ? frontDirection * (-1) : backDirection;


        }

        function getNextPosition(pos) {
            return pos === (segments - 1) ? 0 : pos + 1;
        }

        function getPreviousPosition(pos) {
            return pos === 0 ? segments - 1 : pos - 1;
        }
    }

    function startWheelFromOutside(win,callback){
        if (canSpin)
            startWheel(win,callback);
    }

    return {
        startWheel: startWheelFromOutside
    }


}