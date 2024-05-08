document.addEventListener('DOMContentLoaded', function() {
  
    //Trie par niveau:
    SortMenuTextL.addEventListener('touchstart', function(event) {
      SortMenuTextL.textContent = sortLevel.concat(" ▲")
      SousMenuL.style.display = "block";
    })
  
    document.addEventListener('mousemove', function(event) {
      let tolerance = 11;
      let rect = SortMenuTextT.getBoundingClientRect();
      let mouseX = event.clientX;
      let mouseY = event.clientY;
  
      if (
        mouseX >= rect.left - tolerance &&
        mouseX <= rect.right + tolerance &&
        mouseY >= rect.top - tolerance &&
        mouseY <= rect.bottom + tolerance
      ) {} else if(
        !SortMenuTextL.contains(event.target) && 
        !SousMenuL.contains(event.target)) {
        SortMenuTextL.textContent = sortLevel.concat(" ▼");
      }
    });
  
    SortMenuTextL.addEventListener('mouseenter', function(event) {
      SortMenuTextL.textContent = sortLevel.concat(" ▲")
      SousMenuL.style.display = "block";
    })
  
    document.querySelector('li a[class="0"]').addEventListener('click', function(event) {
      sortLevel = "0";
      SelectLevel(0);
  
      SortMenuTextL.textContent =  sortLevel.concat(" ▼");
      SousMenuL.style.display = "none";
    });
  
    document.querySelector('li a[class="1"]').addEventListener('click', function(event) {
      sortLevel = "1";
      SelectLevel(1);
  
      SortMenuTextL.textContent =  sortLevel.concat(" ▼");
      SousMenuL.style.display = "none";
    });
  
    document.querySelector('li a[class="2"]').addEventListener('click', function(event) {
      sortLevel = "2";
      SelectLevel(2);
      
      SortMenuTextL.textContent =  sortLevel.concat(" ▼");
      SousMenuL.style.display = "none";
    });
  
    document.querySelector('li a[class="3"]').addEventListener('click', function(event) {
      sortLevel = "3";
      SelectLevel(3);
  
      SortMenuTextL.textContent =  sortLevel.concat(" ▼");
      SousMenuL.style.display = "none";
    });
  
    document.querySelector('li a[class="4"]').addEventListener('click', function(event) {
      sortLevel = "4";
      SelectLevel(4);
      
      SortMenuTextL.textContent =  sortLevel.concat(" ▼");
      SousMenuL.style.display = "none";
    });
  
    document.querySelector('li a[class="AllL"]').addEventListener('click', function(event) {
      sortLevel = "All levels";
      SelectLevel(5);
  
      SortMenuTextL.textContent =  sortLevel.concat(" ▼");
      SousMenuL.style.display = "none";
    });
  });