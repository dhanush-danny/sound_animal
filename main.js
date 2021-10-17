function start() {
    navigator.mediaDevices.getUserMedia({
        audio: true
    });
    model = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/_z3mHCjHg/model.json", model_loaded);
}

function model_loaded() {
    model.classify(get_result);
}

function get_result(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        sound_name = r[0].label;
        sound_accuracy = (r[0].confidence * 100).toFixed(0);
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        document.getElementById("sound_result").innerHTML = "I can hear " + sound_name;
        document.getElementById("sound_accuracy").innerHTML = "Accuracy " + sound_accuracy + "%";
        document.getElementById("sound_accuracy").style.color = "rgb(" + red + "," + green + "," + blue + ")";
        document.getElementById("sound_result").style.color = "rgb(" + red + "," + green + "," + blue + ")";
        animal_1 = document.getElementById("all_eveything");
        if (sound_name == "Dog") {
            animal_1.src = "dog.gif";
        } else if (sound_name == "Cat") {
            animal_1.src = "cat.gif";
        } else if (sound_name == "Cow") {
            animal_1.src = "cow.gif";
        } else {
            if (sound_accuracy > 50) {
                animal_1.src = "bgnoise.gif";
                document.getElementById("sound_result").innerHTML = "I can hear " + sound_name;
                document.getElementById("sound_accuracy").innerHTML = "Accuracy " + sound_accuracy + "%";
            } else {
                sound_accuracy = (r[1].confidence * 100).toFixed(0);
                sound_name = r[1].label;
                document.getElementById("sound_result").innerHTML = "I can hear <b>" + sound_name + "</b> But there is a lot of Background Noise";
                document.getElementById("sound_accuracy").innerHTML = "Accuracy " + sound_accuracy + "%";
                if (sound_name == "Dog") {
                    animal_1.src = "dog.gif";
                } else if (sound_name == "Cat") {
                    animal_1.src = "cat.gif";
                } else if (sound_name == "Cow") {
                    animal_1.src = "cow.gif";
                }
            }

        }
    }

}