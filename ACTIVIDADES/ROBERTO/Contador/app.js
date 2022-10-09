
let textDOM= document.querySelector(".Counter__Text");
let infoDOM = document.querySelector(".Counter__Info");

textDOM.addEventListener("input",e=>{
    let content = e.target.value;
    let info = getCountInfo(content);
    showData(info);
});

const getCountInfo = content=>{
    let info = {
        size : content.length,
        words : content
            .replace(/[ ]+/g," ")
            .replace(/^ /,"")
            .replace(/ $/,"")
            .split(" ").length,
        chars : content
            .split("")
            .filter((char) => char !== " ").length,
        numbers: content
            .split("")
            .filter((char) => !isNaN(char) && char !== " ").length,
        whiteSpaces: content
            .split("")
            .filter(char => char == " ").length
    }
    return info;
}

const showData = info =>{
    const {size, words, chars, numbers, whiteSpaces} = info;

    if(size != 0){
        infoDOM.classList.remove("hidden");
        infoDOM.innerHTML = `El tamaño es de ${size}, tiene ${words} palabras, posee ${whiteSpaces} espacios en blanco y tiene ${chars} caracteres de los cuales ${numbers} son numeros`;}
    else
        infoDOM.classList.add("hidden");
}