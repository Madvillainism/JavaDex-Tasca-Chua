
const click = new Audio('click.mp3')
const clock = document.querySelector(".clock");
const button = document.querySelector(".button");

let hours24 = false;
let time = "AM";

const engineClock = ()=>{
    setInterval(getCurrentTime,1000);
}

const getCurrentTime = ()=>{
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if(!hours24){
        time = hours > 12 ? "PM" : "AM";
        hours = hours > 12 ? hours - 12 : hours;
    }

    hours = hours == 0 ? 12 : hours;

    clock.innerHTML = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)} ${time}`;
}

const formatNumber = n =>{
    return n < 10 ? `0${n}` : n;
}

button.addEventListener("click",e=>{
    e.preventDefault();
    click.play();
    hours24 = !hours24;
    getCurrentTime();
})


// getCurrentTime();
engineClock();