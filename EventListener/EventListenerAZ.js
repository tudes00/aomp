document.addEventListener('DOMContentLoaded', function() {
  
    //pour l'instant trie de A to Z:
    SortMenuTextAZ.addEventListener('touchstart', function(event) {
      SortMenuTextAZ.textContent = sortAZ.concat(" ▲")
      SousMenuAZ.style.display = "block";
    })
  
    document.addEventListener('mousemove', function(event) {
      let tolerance = 11;
      let rect = SortMenuTextAZ.getBoundingClientRect();
      let mouseX = event.clientX;
      let mouseY = event.clientY;
  
      if (
        mouseX >= rect.left - tolerance &&
        mouseX <= rect.right + tolerance &&
        mouseY >= rect.top - tolerance &&
        mouseY <= rect.bottom + tolerance
      ) {} else if(
        !SortMenuTextAZ.contains(event.target) && 
        !SousMenuAZ.contains(event.target)) {
        SortMenuTextAZ.textContent = sortAZ.concat(" ▼");
      }
    });
  
    SortMenuTextAZ.addEventListener('mouseenter', function(event) {
      SortMenuTextAZ.textContent = sortAZ.concat(" ▲")
      SousMenuAZ.style.display = "block";
    })
    document.querySelector('li a[class="A-Z"]').addEventListener('click', function(event) {
      sortAZ = "A to Z"
      SortMenuTextAZ.textContent = sortAZ.concat(" ▼")
      SousMenuAZ.style.display = "none";
      if (wasWriting) {
        Items = []; 
        currentItemsSearch = 0;
        AddCardsSearch()
      } else{
        FetchData()
      }
  
    });
    document.querySelector('li a[class="Z-A"]').addEventListener('click', function(event) {
      sortAZ = "Z to A"
      SortMenuTextAZ.textContent =  sortAZ.concat(" ▼")
      SousMenuAZ.style.display = "none";
      if (wasWriting) {
        Items = []; 
        currentItemsSearch = 0;
        AddCardsSearch()
      } else{
        FetchData()
      }
  
    });
})