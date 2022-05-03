prediction_1=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach ('#camera')

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5.version:',ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/028HT9eM8/",modelLoaded);
function modelLoaded(){
    console.log('ModelLoaded!');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The First Prediction Is"+ prediction_1;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_name1").innerHTML=results[0].label;
        document.getElementById("result_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(prediction_1=="Victory"){
            document.getElementById("emoji_1").innerHTML="&#9996;";
        }
        if(prediction_1=="Best"){
            document.getElementById("emoji_1").innerHTML="&#128532;";
        }
        if(prediction_1=="Amazing"){
            document.getElementById("emoji_1").innerHTML="&#128548;";
        }
    }
}