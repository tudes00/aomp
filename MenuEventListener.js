document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("search").value = '';

  //pour l'instant trie de A à Z:
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
    sortAZ = "A à Z"
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
    sortAZ = "Z à A"
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
    AllData = selectOnlyTier(1);
    Items = [];
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });

  document.querySelector('li a[class="T2"]').addEventListener('click', function(event) {
    sortTier = "T2";
    AllData = selectOnlyTier(2);
    Items = [];  
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });
  
  document.querySelector('li a[class="T3"]').addEventListener('click', function(event) {
    sortTier = "T3";
    AllData = selectOnlyTier(3);
    Items = []; 
    currentItems = 0;
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });
  
  document.querySelector('li a[class="T4"]').addEventListener('click', function(event) {
    sortTier = "T4";
    AllData = selectOnlyTier(4);
    Items = []; 
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });

  document.querySelector('li a[class="T5"]').addEventListener('click', function(event) {
    sortTier = "T5";
    AllData = selectOnlyTier(5);
    Items = []; 
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });
  
  document.querySelector('li a[class="T6"]').addEventListener('click', function(event) {
    sortTier = "T6";
    AllData = selectOnlyTier(6);
    Items = []; 
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });

  document.querySelector('li a[class="T7"]').addEventListener('click', function(event) {
    sortTier = "T7";
    AllData = selectOnlyTier(7);
    Items = []; 
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });

  document.querySelector('li a[class="T8"]').addEventListener('click', function(event) {
    sortTier = "T8";
    AllData = selectOnlyTier(8);
    Items = []; 
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });

  document.querySelector('li a[class="All"]').addEventListener('click', function(event) {
    sortTier = "All tiers";
    AllData = selectOnlyTier(9);
    Items = []; 
    if (wasWriting) {
      currentItemsSearch = 0;
      AddCardsSearch();
    } else {
      currentItems = 0;
      AddCards();
    }
    SortMenuTextT.textContent =  sortTier.concat(" ▼");
    SousMenuT.style.display = "none";
  });
});