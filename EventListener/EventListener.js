function handleSearchResults() {
  Items = [];

  if (wasWriting) {
    currentItemsSearch = 0;
    AddCards(false);
  } else {
    currentItems = 0;
    AddCards(true);
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
});

//empeche le rechargment de la page lorsqu'un menu pour trier est utiliser
document.querySelectorAll('.SortMenu a').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
  });
});

document.querySelectorAll('.SortMenu a').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
  });
});


SearchInput.addEventListener("input", (e) => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() =>{
    wasWriting = true;
    const value = e.target.value.toLowerCase();
    SearchValue = value;
    Items = [];
    if (value) {
      AllDataSearch = searchItems(value);
      console.log(AllDataSearch.length, currentItemsSearch)
      if (AllDataSearch.length == 0) {
        NoResults.style.display = "block";
      } else {
        NoResults.style.display = "none";
      }
      if (AllDataSearch.length <= currentItemsSearch) {
        console.log("aaaaa")
        Items = searchItems(value)
        document.querySelector(".btn-afficher-plus").style.display = "none";
        sort(AllDataSearch, false)
        UpdateCards()
      } else {
        console.log("ah");
        AddCards(false)
        
        document.querySelector(".btn-afficher-plus").style.display = "block";
      }
  
    } else {
      Items = [];
      currentItems = 0;
      currentItemsSearch = 0;
      AddCards(true)
      NoResults.style.display = "none";
      document.querySelector(".btn-afficher-plus").style.display = "block"
      AllDataSearch = "nothing";
      wasWriting = false;
    }
  }, 700);
  
});


document.querySelector(".btn-afficher-plus").addEventListener("click", (e) => {
  e.preventDefault();

  let scrollPosition = window.pageYOffset;

  if (wasWriting == false) {
    AddCards(true)
    if (AllData.length <= currentItems) {
      document.querySelector(".btn-afficher-plus").style.display = "none";
    }
  } else {
    AddCards(false)
    if (AllDataSearch.length <= currentItemsSearch) {
      document.querySelector(".btn-afficher-plus").style.display = "none";
    }
  }

  // Ajuster la position de défilement après un court délai
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);
  }, 100); // 100ms de délai (ajustez si nécessaire)
});



document.getElementById("Menu").addEventListener("click", function() {
  document.getElementById("MenuShow").style.transform = "translateX(0)";
  setTimeout(function() {
     document.getElementById("MenuShow").classList.add('active');
     document.querySelector('.blurZone').classList.add('blur');
  }, 10);
  document.querySelector('body').style.overflow = 'hidden';
});

document.addEventListener("click", function(e) {
  if (!document.getElementById('MenuShow').contains(e.target) && e.target !== document.getElementById('Menu')) {
     document.getElementById("MenuShow").style.transform = "translateX(100%)";
     document.getElementById("MenuShow").classList.remove('active');
     document.querySelector('.blurZone').classList.remove('blur');
     document.querySelector('body').style.overflow = 'auto';
  }
});



const LangMode = (e) => {
  localStorage.setItem("language", Language);
  localStorage.setItem("languageCool", LanguageCool);
};

const LangButtons = document.querySelectorAll(".SousMenuScrLa");

LangButtons.forEach(btn => {
  btn.addEventListener("click", LangMode);
});



const toggleColorMode = (e) => {
  if (e.currentTarget.classList.contains("light--hidden")) {
    document.documentElement.setAttribute("color-mode", "light");

  localStorage.setItem("color-mode", "light")
  return;
}
  document.documentElement.setAttribute("color-mode", "dark");


localStorage.setItem("color-mode", "dark");
};

const toggleColorButtons = document.querySelectorAll(".color-mode__btn");

toggleColorButtons.forEach(btn => {
  btn.addEventListener("click", toggleColorMode);
});


const mediaQuery = window.matchMedia('(max-width: 628px)');
  
function handleMatches(e) {
  if (e.matches) {
    var elementADeplacer = document.getElementById('SortMenu');
    var destination = document.getElementById('MenuShow');
    var elementReference = document.getElementById('img-switch-modeMenu')

    destination.insertBefore(elementADeplacer, elementReference);
  }else {
    var elementADeplacer = document.getElementById('MenuShow').querySelector('.SortMenu');
    var destination = document.querySelector('.Search-Sort');
    
    if (elementADeplacer) {
      destination.appendChild(elementADeplacer);
    }
  }
}
mediaQuery.addListener(handleMatches);
handleMatches(mediaQuery);

