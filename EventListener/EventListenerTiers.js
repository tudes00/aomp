document.addEventListener('DOMContentLoaded', function() {
  
    //Trie par tier:
    SortMenuTextT.addEventListener('touchstart', function(event) {
      SortMenuTextT.textContent = sortTier.concat(" ▲")
      SousMenuT.style.display = "block";
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
        !SortMenuTextT.contains(event.target) && 
        !SousMenuT.contains(event.target)) {
        SortMenuTextT.textContent = sortTier.concat(" ▼");
      }
    });
  
    SortMenuTextT.addEventListener('mouseenter', function(event) {
      SortMenuTextT.textContent = sortTier.concat(" ▲")
      SousMenuT.style.display = "block";
    })
  
    document.querySelector('li a[class="T1"]').addEventListener('click', function(event) {
      sortTier = "T1";
      SelectTier(1);
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
  
    document.querySelector('li a[class="T2"]').addEventListener('click', function(event) {
      sortTier = "T2";
      SelectTier(2);
      
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
    
    document.querySelector('li a[class="T3"]').addEventListener('click', function(event) {
      sortTier = "T3";
      SelectTier(3);
  
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
    
    document.querySelector('li a[class="T4"]').addEventListener('click', function(event) {
      sortTier = "T4";
      SelectTier(4);
      
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
  
    document.querySelector('li a[class="T5"]').addEventListener('click', function(event) {
      sortTier = "T5";
      SelectTier(5);
      
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
    
    document.querySelector('li a[class="T6"]').addEventListener('click', function(event) {
      sortTier = "T6";
      SelectTier(6);
      
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
  
    document.querySelector('li a[class="T7"]').addEventListener('click', function(event) {
      sortTier = "T7";
      SelectTier(7);
      
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
  
    document.querySelector('li a[class="T8"]').addEventListener('click', function(event) {
      sortTier = "T8";
      SelectTier(8);
      
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
  
    document.querySelector('li a[class="All"]').addEventListener('click', function(event) {
      sortTier = "All tiers";
      SelectTier(9);
      
      SortMenuTextT.textContent =  sortTier.concat(" ▼");
      SousMenuT.style.display = "none";
    });
})