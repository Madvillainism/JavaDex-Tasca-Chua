/* Contando las letras */
/* 
for(let index = 0; index < Contador.length; index++){
    let letter = Contador[index];
    
    if(letterAmount[letter] == undefined){
        letterAmount[letter] = 1;
    }
    else{
        letterAmount[letter]++
    }
}
 */
/* Contador de palabbras */
/* 
function Contador_Palabras(text){
    text = text.replace(/^\s|\s+$/, '');
    text = text.replace(/[ ]{2,}/gi, '');
    text = text.replace(/\n /, '\n');

    return text.split(' ').length;
}

let Palabras = Contador_Palabras(Contador);
 */

/* function Contador(){
/* 
    setTimeout(function(){
    
        let letras = document.getElementById("Contador");
        /* let Rletras = document.getElementById("Rletras"); */
       /*  let Total_Letras = letras.value.length;

        document.getElementById("Rletras").innerHTML = Total_Letras;


    }); */
 
/* 

} */ 

/* document.addEventListener("DOMContentLoaded", e => {
    contadorLetra()
})

const contadorLetra = () => {
    const $Contador = document.getElementById("Contador")
    const $p = document.querySelector("p")
    const $Rletras = document.getElementById("Rletras")

    $Contador.addEventListener("Contador", e => {
        $Rletras.value = e.target.value.length
        $p.textContent = e.target.value
    })
} */



/* Contador de palabbras */

/* function Contador_Palabras(){

    setTimeout(function(){
         
    let texto = document.getElementById("Contador");
    let Cantidad_de_letras = texto.value.length;
    document.getElementById("Rletras").innerHTML = Cantidad_de_letras;

    },10);
   
} */

function countChars(Caracter){
    document.getElementById("letras").innerHTML = Caracter.value.length+' Letras';


}

function Contador_Palabras(){


    let _Contador = document.getElementById("Contador").value;

    _Contador = _Contador.replace (/\r?\n/g," ");
    _Contador = _Contador.replace (/[ ]+/g," ");
    _Contador = _Contador.replace (/^ /,"");
    _Contador = _Contador.replace (/ $/,"");

    let _Palabras = _Contador.split(" ");

    document.getElementById("Palabras").innerHTML = _Palabras.value.length +' Palabras';


}

 
Contador_Palabras();
