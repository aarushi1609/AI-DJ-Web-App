harry_potter = "";
peter_pan = "";
frozen = "";
song_name = "";


rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    Posenet = ml5.poseNet(video, modelLoaded);
    Posenet.on("pose", gotResults); 
}

function modelLoaded()
{
    console.log("Posenet is intialized.");
}

function gotResults(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist: ", leftWristX, leftWristY);
        console.log("Right Wrist: ", rightWristX, rightWristY);
        console.log("Left Wrist Score: " + score_leftWrist);
        console.log("Right Wrist Score: ", + score_rightWrist);
    }
}

function preload()
{
    harry_potter = loadSound("harry_potter.mp3");
    peter_pan = loadSound("peter_pan.mp3");
    frozen = loadSound("frozen.mp3");
}

function play()
{
    song_name = document.getElementById("choose").value;
    if(song_name == "hp_theme")
    {
        if(frozen.isPlaying())
        {
            frozen.stop();
        }
        if(peter_pan.isPlaying())
        {
            peter_pan.stop();
        }
        harry_potter.play();
    }
    if(song_name == "frozen")
    {
        if(peter_pan.isPlaying())
        {
            peter_pan.stop();
        }
        if(harry_potter.isPlaying())
        {
            harry_potter.stop();
        }
        frozen.play();
    }
    if(song_name == "peter_pan")
    {
        if(harry_potter.isPlaying())
        {
            harry_potter.stop();
        }
        if(frozen.isPlaying())
        {
            frozen.stop();
        }
        peter_pan.play();
    }
    harry_potter.setVolume(1);
    frozen.setVolume(1);
    peter_pan.setVolume(1);
    harry_potter.rate(1);
    peter_pan.rate(1);
    frozen.rate(1);
}

function stop()
{
    harry_potter.stop();
    frozen.stop();
    peter_pan.stop();
}

function draw()
{
    fill("red");
    image(video, 0, 0, 600, 500);
    
    if(score_leftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 30);

        InNumberLeftWristY = Number(leftWristY);
        removed_decimals = floor(InNumberLeftWristY);
        volume = removed_decimals/500;
        document.getElementById("volume").innerHTML = "Volume: " + volume;
        harry_potter.setVolume(volume);
        frozen.setVolume(volume);
        peter_pan.setVolume(volume);
    }

    if(score_rightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 30);

        if(rightWristY > 0 && rightWristY < 100)
        {
            rate = 0.5;
        }
        if(rightWristY > 100 && rightWristY < 200)
        {
            rate = 1;
        }
        if(rightWristY > 200 && rightWristY < 300)
        {
            rate = 1.5;
        }
        if(rightWristY > 300 && rightWristY < 400)
        {
            rate = 2;
        }
        if(rightWristY > 400 && rightWristY < 500)
        {
            rate = 2.5;
        }
        harry_potter.rate(rate);
        peter_pan.rate(rate);
        frozen.rate(rate);
        document.getElementById("speed").innerHTML = "Speed: " + rate;
    }
}