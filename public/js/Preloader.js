function Preloader(source,callback){

    //loading files
    let queue = new createjs.LoadQueue(true);
    queue.on("complete", callback, this);
    queue.loadManifest(source);
    return queue;
}