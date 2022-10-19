const textField= document.getElementById("contador");
const caracteres = document.getElementById("lettercount");
const palabras = document.getElementById("wordcount");
const lineas = document.getElementById("linecount");
const clearbtn = document.getElementById("clearbtn");

function contarletras() {
    let text = textField.value;
    letters =text.trim();

    if (letters[0] ==="") {
    caracteres.innerText = 0
    } else {
        caracteres.innerText = letters.length;
    }
}

function contarpalabras(){

    let text = textField.value;
    text=text.trim();

    const words= text.split(" ");

    if (words[0]==="") {
    palabras.innerText = 0
    } else {
        palabras.innerText = words.length;
    }
}

function contarlineas(){

    let text = textField.value;
    text=text.trim();

    const lines= text.split('\n');

    if (lines[0] ==="") {
    lineas.innerText = 0
    } else {
        lineas.innerText = lines.length;
    }
}

clearbtn.onclick = () => {
    textField.value = "";
    contarletras();
    contarpalabras();
    contarlineas();
}