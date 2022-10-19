function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('session');

    if (hrs >= 12){
        session.innerHTML = 'p.m';
    } else{
        session.innerHTML = 'a.m';
    }

    if (hrs > 12){
        hrs = hrs - 12;
    }

    if (hrs <  10) {
        document.getElementById('hours').innerHTML = "0" + hrs;
    } else {

        document.getElementById('hours').innerHTML = hrs;
    }

    if (min <  10) {
        document.getElementById('minutes').innerHTML = "0" + min;
    } else {

        document.getElementById('minutes').innerHTML = min;
    }

    if (sec <  10) {
        document.getElementById('seconds').innerHTML = "0" + sec;
    } else {

        document.getElementById('seconds').innerHTML = sec;
    }
    
    
    
}

setInterval (displayTime, 10);