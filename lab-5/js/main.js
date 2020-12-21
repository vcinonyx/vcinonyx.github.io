createPlayButton('.box-2');
createAnimationWorkspace();
createAnimationControls();
createAnimationArea();

document.querySelector("#play-button").addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('animationMessage', {detail: {message: 'Opened animation window'}}))
    document.querySelector("#animation-work-container").style.display = "flex"; 
});


function createPlayButton(blockName) {

    let play = document.createElement("button");
    play.id = "play-button";
    play.textContent = "Play Animation";
    play.style = "font-size: 15px;";

    document.querySelector(blockName).append(play);
}


function createAnimationWorkspace() {

    let workContiner = document.createElement("div");
    workContiner.id = "animation-work-container";
    workContiner.style = 
        "position:absolute;  width: 100%; height: 100%;"+
        "display: none; align-items: center; justify-content: center;";

    let workspace = document.createElement("div");
    workspace.id = "animation-work";
    workspace.style = "width: calc(60% + 10px); height: calc(80% + 50px);" +
        "display: flex; flex-direction: column; box-sizing: border-box;"+
        "align-items: flex-end; justify-content: center; border: 1px solid black;";

    workContiner.append(workspace);
    document.querySelector(".grid-container").append(workContiner);
}

function createAnimationArea() {

    let animAreaCanvas = document.createElement("canvas");
    animAreaCanvas.id = "animation-area-canvas";
    animAreaCanvas.style = "width: calc(100% - 10px); height: calc(100% - 60px);" +
        "border: 5px solid red; box-sizing: content-box;" +
        "background-color: gray;";
    animAreaCanvas.style.display = "none";

    let animAreaDiv = document.createElement("div");
    animAreaDiv.id = "animation-area-div";
    animAreaDiv.style = "width: calc(100% - 10px); height: calc(100% - 50px);" +
        "border: 5px solid red; box-sizing: content-box; position: relative; " + 
        "background-color: blue; background-image: url('./img/favicon-32x32.png');";;
    animAreaDiv.style.display = "flex";

    let tex1 = document.createElement("div");
    tex1.id = "Ball";
    tex1.style = " border-radius: 10px; width: 10px; height: 10px; position: absolute; background-color: yellow;";
    animAreaDiv.append(tex1);

    document.querySelector("#animation-work").append(animAreaCanvas);
    document.querySelector("#animation-work").append(animAreaDiv);
}

function createAnimationControls() {

    let controls = document.createElement("div");
    controls.id="animation-controls";
    controls.style = "width: 100%; height: 50px;" +
        "display: flex; flex-direction: row-reverse;" +
        "align-items: center;" +
        "background: white";
        
    let close = document.createElement("button");
    close.id = "close-button";
    close.textContent = "Close";
    close.style.fontSize = "15px";

    let play_1 = document.createElement("button");
    play_1.class = "start-button";
    play_1.id = "play1";
    play_1.textContent = "Start-1";
    play_1.style.fontSize = "15px";

    let play_2 = document.createElement("button");
    play_2.class = "start-button";
    play_2.id = "play2";
    play_2.textContent = "Start-2";
    play_2.style.fontSize = "15px";

    let reload = document.createElement("button");
    reload.id = "reload-button";
    reload.textContent = "Reload";
    reload.style.fontSize = "15px";
    reload.style.display = "none";

    let eventText = document.createElement("p");
    eventText.id = "event-text";
    eventText.style.marginRight = "30%";
    eventText.style.textAlign = "left";
    eventText.style.fontSize = "18px";
    eventText.style.display =  "none";

    let btn_stop = document.createElement("button");
    btn_stop.id = "stop-button";
    btn_stop.textContent = "Stop";
    btn_stop.style.fontSize = "15px";
    btn_stop.style.display = "none";

    controls.append(close);
    controls.append(play_1);
    controls.append(play_2);
    controls.append(btn_stop);    
    controls.append(reload);
    controls.append(eventText);
    document.querySelector("#animation-work").append(controls);
}
