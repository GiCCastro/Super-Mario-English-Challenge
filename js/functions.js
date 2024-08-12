var engine = {
    "colors": ['green', 'purple', 'red', 'yellow', 'black', 'orange', 'grey', 'pink'],
    "hexadecimais": {
        'green': '#02ef00',
        'purple': '#790093',
        'red': '#e90808',
        'yellow': '#e7d703',
        'black': '#141414',
        'orange': 'f16529',
        'grey': '#c0c0c0',
        'pink': '#ff0a54'
    },
    "moedas": 0
}

audioCurrency = new Audio('audio/moeda.mp3');
audioLoser = new Audio('audio/errou.mp3');

function drawColor() {
    var indexDrawnColor = Math.floor(Math.random() * engine.colors.length);
    var nameDrawnColor = engine.colors[indexDrawnColor];
    var legendBoxColor = document.getElementById("box_color");

    legendBoxColor.innerText = engine.colors[indexDrawnColor].toUpperCase();

    return engine.hexadecimais[nameDrawnColor];
}

function applyColor(drawColor) {
    var colorBox = document.getElementById('current_color');

    colorBox.style.backgroundColor = drawColor;
    colorBox.style.backgroundImage = "url('img/caixa-fechada.png')";
    colorBox.style.backgroundSize = "100%";
}

function updateScore(value) {
    var score = document.getElementById("current_score");

    engine.moedas += value;

    if (value < 0) {
        audioLoser.play();
    } else {
        audioCurrency.play();
    }

    score.innerText = engine.moedas;
}

applyColor(drawColor());

//API DE RECONHECIMENTO DE VOZ
var btnRecorder = document.getElementById("btn_respond")
var transcritionAudio = "";
var correctAnswer = ""

if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recorder = new SpeechAPI();

    recorder.continuos = false;
    recorder.lang = 'en-US';

    recorder.onstart = function(){
        btnRecorder.innerText = "Gravando..."
        btnRecorder.style.backgroundColor = "white";
        btnRecorder.style.color = "#1a63c3";
    }

    recorder.onend = function(){
        btnRecorder.innerText = "RESPONDER"
        btnRecorder.style.backgroundColor = "transparent";
        btnRecorder.style.color = "white";
    }

    recorder.onresult = function(event){
        transcritionAudio = event.results[0][0].transcript.toUpperCase();
        correctAnswer =  document.getElementById("box_color").innerText.toUpperCase();
        if(transcritionAudio === correctAnswer){
            updateScore(1)
        }else{
            updateScore(-1)
        }
    }

}else{
    alert('não tem suporte');
}

btnRecorder.addEventListener('click', function(){
    recorder.start();

})