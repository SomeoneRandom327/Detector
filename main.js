Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality: 90
});

camera = document.getElementById('camera');

Webcam.attach('#camera')


function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById('view').style.display = 'block';
        document.getElementById('result').innerHTML = '<img style="height:265px; width:350px;" id="captured_image" src="' + data_uri + '"/>'
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gekdn7X2c/model.json', modelLoaded);

function modelLoaded() {
    console.log('hi');
}

function check() {
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById('object').innerHTML = results[0].label;
        document.getElementById('accuracy').innerHTML = Math.round((results[0].confidence.toFixed(3))*100) + "%";
    }
}