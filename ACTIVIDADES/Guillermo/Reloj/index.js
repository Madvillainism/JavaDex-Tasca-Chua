/* const $tiempo = document.querySelector('.Tiempo');
const $fecha = document.querySelector('.Fecha');

function digitalClock() {
    let f = new Date();
    let dia = f.getDate();
    let mes = f.getMonth() + 1;
    let year = f.getFullYear();
    let diaSemana = f.getDay();

    dia = ('0' + dia).slice(-2); 
    mes = ('0' + mes).slice(-2);

    let timeString = f.toLocaleTimeString();
    $tiempo.innerHTML = timeString;

    let semana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue','Vie', 'Sab'];
    let showSemana = (semana[diaSemana]);

    $fecha.innerHTML = `${dia}-${mes}-${year} ${showSemana}`;    
}
setInterval(()=>{
    digitalClock();
}, 1000); */


function clock(){
    var today = new Date();

    var hora = today.getHours();
    var minuto = today.getMinutes();
    var segundos = today.getSeconds();
    let periodo = "AM";

    if(hora >= 12){
        periodo = "PM";
    }

    var formatoValue = formatoBtn.getAttribute("data-format");
    
    if(formatoValue === "12"){
        hora = hora > 12 ? hora % 12 : hora;
    }
   

    if(hora < 10){
        hora = "0" + hora;
    }

    if(minuto < 10){
        minuto = "0" + minuto;
    }
    if(segundos < 10){
        segundos = "0" + segundos;
    }

    document.querySelector(".hora").innerHTML = hora;
    document.querySelector(".minuto").innerHTML = minuto;
    document.querySelector(".segundos").innerHTML = segundos;
    document.querySelector(".periodo").innerHTML = periodo
}

var updateClock = setInterval(clock, 500);


//Get del mes
function Mes(){
    var today = new Date();
    const dayNumber = today.getDate();
    const year = today.getFullYear();
    const dayName = today.toLocaleString("default", {weekday: "long"});
    const monthName = today.toLocaleString("dafault", {month: "short"});

    document.querySelector(".mes-name").innerHTML = monthName;
    document.querySelector(".dia-name").innerHTML = dayName;
    document.querySelector(".dia-numero").innerHTML = dayNumber;
    document.querySelector(".year").innerHTML = year;
}

var updateClock = setInterval(Mes, 1000);

const formatoBtn = document.querySelector(".formato-btn");

formatoBtn.addEventListener("click", () => {
    formatoBtn.classList.toggle("active");

    var formatoValue = formatoBtn.getAttribute("data-format");

    if(formatoValue === "12"){
        formatoBtn.setAttribute("data-format", "24");
    }else{
        formatoBtn.setAttribute("data-format", "12");
    }
});


//Menu

const dotMenuBtn = document.querySelector(".btn-Menu");
const dotMenu = document.querySelector(".dot-menu");

    dotMenuBtn.addEventListener("click", () => {
        dotMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if(e.target.id !== "active-menu"){
        dotMenu.classList.remove("active");
    }
});