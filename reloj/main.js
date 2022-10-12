function updateTime() {
    let dateInfo = new Date();

    let hr,
      _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
      sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
      ampm = (dateInfo.getHours() >= 12) ? "PM" : "AM";
  
    if (dateInfo.getHours() == 0) {
      hr = 12;
    } else if (dateInfo.getHours() > 12) {
      hr = dateInfo.getHours() - 12;
    } else {
      hr = dateInfo.getHours();
    }
  
    let currentTime = hr + ":" + _min + ":" + sec;
  
    // print time
    document.getElementsByClassName("hms")[0].innerHTML = currentTime;
    document.getElementsByClassName("ampm")[0].innerHTML = ampm;
  
    /* date */
    let dow = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado"
      ],
      month = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembtr",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      day = dateInfo.getDate();
  
    let currentDate = dow[dateInfo.getDay()] + ", " + day + " de" + " " + month[dateInfo.getMonth()];
  
    document.getElementsByClassName("date")[0].innerHTML = currentDate;
  };
  
  updateTime();
  setInterval(function() {
    updateTime()
  }, 1000);