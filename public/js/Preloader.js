function Preloader(callback){
    let loadManifest = [
        {
            id: "wheel",
            src: "resources/img/wheel.png"
        }, {
            id: "center",
            src: "resources/img/center.png"
        }, {
            id: "pointer",
            src: "resources/img/pointer.png"
        }, {
            id: "shadows",
            src: "resources/img/shadows.png"
        }, {
            id: "background",
            src: "resources/img/background.png"
        }];

    //loading files
    let queue = new createjs.LoadQueue(true);
    queue.on("complete", callback, this);
    queue.loadManifest(loadManifest);
    return queue;
}