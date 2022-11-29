song = "";
leftWristX =0;
leftWristY =0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
function preload(){
    song = loadSound("music.mp3")
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,model_loaded);
    posenet.on('pose' , gotposes);
}

function model_loaded(){
    console.log("Posenet is Initialized");
}
function draw(){
    image(video,0,0,600,500);
    fill('red');
    stroke('red');

    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500 ;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotposes(results){
    if(results.length > 0 ){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreleftWrist = "+scoreleftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = "+leftWristX+ "leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = "+rightWristX+ "RightWristY = "+rightWristX);
    }
}
