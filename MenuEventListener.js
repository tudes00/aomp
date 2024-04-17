function handleSearchResults() {
  Items = [];

  if (wasWriting) {
    currentItemsSearch = 0;
    AddCardsSearch();
  } else {
    currentItems = 0;
    AddCards();
  }
  if (AllData.length == 0 || AllDataSearch.length == 0 ) {
    console.log(AllData.length, AllDataSearch.length)
    NoResults.style.display = "block";
  } else {
    NoResults.style.display = "none";
    console.log(AllData.length, AllDataSearch.length)
  }
}

function SelectTier(tier) {
  if (!IsSortingByLevels) {
    AllData = selectOnlyTier(tier);
    
    handleSearchResults()
   } else {
    console.log("IsSortingByLevelsTIers")
    AllData = selectOnlyTierLevel(tier, null);
    
    handleSearchResults()
   }
   console.log(AllData)
}

function SelectLevel(level) {
  if (!IsSortingByTiers) {
    AllData = selectOnlyLevel(level);
    
    handleSearchResults()
   } else {
    console.log("IsSortingByLevelsTIers")
    AllData = selectOnlyTierLevel(null, level);
    
    handleSearchResults()
   }
   console.log(AllData)
}

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