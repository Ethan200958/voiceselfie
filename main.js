var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    console.log(event);
    //console.log(transcript);
    
    if(content == "take my selfie") {
        speech();
        setTimeout(function(){
            snapshot();
            save();
        }, 5000)
        console.log(content);
    }
}

function speech() {
    var synth = window.speechSynthesis;
    var textareaValue = "Taking your selfie in 5 seconds";
    var repeatSpeech = new SpeechSynthesisUtterance(textareaValue);

    synth.speak(repeatSpeech);

    Webcam.attach(camera);
}

Webcam.set({
    width:360,
    height:255,
    image_format: 'png',
    png_quality: 95
});

camera = document.getElementById("camera");


function snapshot() {
    Webcam.snap(function(data_uri) {
      document.getElementById("result").innerHTML = "<img id='selfie_img' src='"+data_uri+"'>";
    })
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}