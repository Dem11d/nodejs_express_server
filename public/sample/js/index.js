document.addEventListener("DOMContentLoaded", function (event) {
    let wheel = new Wheel("canvas");
    let canvas = document.getElementById("canvas");

    canvas.addEventListener("click", function () {
        wheel.startWheel("444");
    });
});





