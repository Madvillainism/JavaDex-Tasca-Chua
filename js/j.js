window.addEventListener('scroll', function()  {
    let elements = document.getElementsByClassName('scroll-content');
    let screenSize = window.innerHeight;
    
      for(var i = 0; i < elements.length; i++) {
        let element = elements[i];
  
        if(element.getBoundingClientRect().top +300 < screenSize) {
          element.classList.add('visible');
        }
      }
  });
  
  
  window.addEventListener('scroll', function()  {
    let elements = document.getElementsByClassName('scroll-content1');
    let screenSize = window.innerHeight;
    
      for(var i = 0; i < elements.length; i++) {
        let element = elements[i];
  
        if(element.getBoundingClientRect().top -500 < screenSize) {
          element.classList.add('visible1');
        }
      }
  });