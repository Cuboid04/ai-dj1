var leftWristY=0;
var rightWristY=0;
var leftWristX=0;
var rightWristX=0;
var song="";
var scoreLeftWrist=0;
var scoreRightWrist=0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);

}
function draw(){
    image(video, 0, 0, 600, 500);
    if(scoreLeftWrist > 0.2){
        fill("cyan");
        stroke("lime");
        circle(leftWristX, leftWristY, 20);
        var numberLeftWrist=Number(leftWristY);
        remove_decimal=floor(numberLeftWrist);
        var volume=remove_decimal/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="Volume = "+volume;
    }
    if(scoreRightWrist>0.2){
        fill("yellow");
        stroke("#B0BF1A");
        circle(rightWristX, rightWristY, 20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed = 1";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed = 1.5";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed = 2";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="Speed = 2.5";
            song.rate(2.5);
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}
function modelloaded(){
    console.log("posenet is loaded");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftwristX = "+leftWristX+" leftWristY = "+leftWristY);
        console.log("rightwristX = "+rightWristX+" rightWristY = "+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+ scoreLeftWrist);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("right wrist score = "+ scoreRightWrist);
        }

}
