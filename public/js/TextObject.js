function TextObject(text,pos,container){
    const startSize = 55;
    const step = 7;
    const symWidth = 27;
    const segments = 16;

    let textContainer = new createjs.Container();

    if(!TextObject.containers){
        TextObject.containers = [];
    }
    if(TextObject.containers[pos]){
        textContainer = TextObject.containers[pos];
        textContainer.removeAllChildren();
    }
    TextObject.containers[pos]=textContainer;
    container.addChild(textContainer);

    textContainer.regX = 220;
    textContainer.regY = 0;
    textContainer.y =220;
    textContainer.x = 220;
    textContainer.alpha = 0;

    for(let i =0;i<text.length;i++){
        let height = startSize - step*i;
        let textObj = new createjs.Text(text[i],height+"px Arial","white");

        textObj.x =(symWidth*i)+20;
        textObj.y = 0;
        textObj.textAlign = "left";
        textObj.textBaseline = "middle";
        textContainer.addChild(textObj);
    }
    textContainer.rotation = pos*360/segments+90;
    return textContainer;
}