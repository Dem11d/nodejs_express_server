function TextObject(text,pos,container){

    console.log("new textObject");
    const startSize = 55;
    const stepV = 7;
    const stepH = 2;
    const symWidth = 35;
    const segments = 16;

    const colors = [
        "#FA52F9",
        "#FB4BF7",
        "#FA47E4",
        "#FC63EA",
        "#FDB455",
        "#FEF161",
        "#FEFC63",
        "#FDFB5E",
        "#EFFA87",
        "#4AFEEF",
        "#40FDF2",
        "#47FEFC",
        "#99FDFD",
        "#3AF2FC",
        "#884FF8",
        "#FA4BF9",
    ];

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


    for(let i =0;i<text.length;i++){
        let height = startSize - stepV*i;
        let textObj = new createjs.Text(text[i],height+"px Arial",colors[pos]);
        let x=20;
        for(let j = 1;j<=i;j++){
            x+=symWidth-stepH*i
        }
        textObj.x =x;
        textObj.y = 0;
        textObj.textAlign = "left";
        textObj.textBaseline = "middle";
        let shadow = new createjs.Shadow(colors[pos], 0, 0, 7);
        textObj.shadow = shadow;
        textContainer.addChild(textObj);

    }
    textContainer.rotation = pos*360/segments+90;
    return textContainer;
}
