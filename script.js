"helo"


const ItemCardTemplate = document.querySelector("[data-item-template]");
const ItemCardContainer = document.querySelector("[data-item-cards-container]");
const SearchInput = document.querySelector("[data-search]");
const CardsPerPage = 75
const baseURL = "https://render.albiononline.com/v1/item/"
const SortMenuTextAZ = document.querySelector('li a[class="SortMenuTextAZ"]')
const SortMenuTextT = document.querySelector('li a[class="SortMenuTextT"]')
const SousMenuAZ = document.querySelector('ul[class="SousMenuScrAZ"]');
const SousMenuT = document.querySelector('ul[class="SousMenuScrT"]');


let AllData = [];
let Tiers = {};
let AllDataSearch = "";
let Items = []; 
let currentItems = 0;
let currentItemsSearch = 0;
let wasWriting = false;
let sortAZ = "A à Z";
let sortTier = "All tiers";
let timeoutId;
let ItemsAllTiers;
let AllDataTier = [];
let SearchValue;

function selectOnlyTier(tier) {
  console.log("tier: ", tier)
  AllDataTier = [];
  if (tier !== 9) {
    ItemsAllTiers.forEach((item) => {
      if (Tiers["T".concat(tier)].hasOwnProperty(item.UniqueName)) {
        AllDataTier.push(item);
      }
    });
  } else {
    AllDataTier = ItemsAllTiers;
  }

  console.log(AllDataTier);
  return AllDataTier;
}


function isImgUrl(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  if (sortAZ === "A à Z") {return (a < b) ? -1 : (a > b) ? 1 : 0} else {return (a > b) ? -1 : (a < b) ? 1 : 0}
}

//empeche le rechargment de la page lorsqu'un menu pour trier est utiliser
document.querySelectorAll('.SortMenu a').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
  });
});

function sort(data, tf) {
  const categories = {};
  data.forEach((element) => {
    
    const index = element.Index;
    
    categories[index] = {
      LocalizationNameVariable: element.LocalizationNameVariable,
      LocalizationDescriptionVariable: element.LocalizationDescriptionVariable,
      LocalizedNames: element.LocalizedNames,
      LocalizedDescriptions: element.LocalizedDescriptions,
      Index: element.Index,
      UniqueName: element.UniqueName,
    };
  });
    if (tf) {
      AllData = Object.values(categories)
      .sort((a, b) => {
        if (a.LocalizedNames && a.LocalizedNames["FR-FR"] && b.LocalizedNames && b.LocalizedNames["FR-FR"]) {
          return compareStrings(a.LocalizedNames["FR-FR"], b.LocalizedNames["FR-FR"]);
        }
        return 0;
      });
    } else {
      AllDataSearch = Object.values(categories)
      .sort((a, b) => {
        if (a.LocalizedNames && a.LocalizedNames["FR-FR"] && b.LocalizedNames && b.LocalizedNames["FR-FR"]) {
          return compareStrings(a.LocalizedNames["FR-FR"], b.LocalizedNames["FR-FR"]);
        }
        return 0;
    })
    console.log(AllDataSearch)
  }
}

function UpdateCards() {
  while (ItemCardContainer.firstChild) {
    ItemCardContainer.removeChild(ItemCardContainer.firstChild);
  }
  Items.forEach((item) => {
    const fullURL = baseURL.concat(item.UniqueName)
    isImgUrl(fullURL).then(isImage => {
      if (isImage) {
        const card = ItemCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const image = card.querySelector("[data-image]");
        const Name = item.LocalizedNames['FR-FR'];
        image.src = fullURL;
        header.textContent = Name;
        ItemCardContainer.append(card);
      }
    })
  })
}

function AddCards() {
  AllItems = AllData.slice(currentItems, currentItems + CardsPerPage).map((item, index) => {
    Items.push(item);
  })
  currentItems = Items.length;
  UpdateCards()
}

function AddCardsSearch() {
  AllDataSearch = searchItems(SearchValue);
  sort(AllDataSearch, false)
  console.log(currentItemsSearch, currentItemsSearch + CardsPerPage)
  currentItemsSearch = Items.length
  AllItems = AllDataSearch.slice(currentItemsSearch, currentItemsSearch + CardsPerPage).map((item, index) => {
    Items.push(item);
  })
  currentItemsSearch = Items.length;
  UpdateCards()
}

function searchItems(query) {
  const filteredItems = AllData.filter(item => {
    if (item.LocalizedNames) {
      if (sortTier !== "All tiers") {
        return item.LocalizedNames['FR-FR'].toLowerCase().includes(query.toLowerCase()) && Tiers["T".concat(sortTier.slice(1, 2))].hasOwnProperty(item.UniqueName);
      } else {
        return item.LocalizedNames['FR-FR'].toLowerCase().includes(query.toLowerCase());
      }
    }
    return false;
  });
  return filteredItems;
}


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
      if (AllDataSearch.length <= currentItemsSearch) {
        console.log("aaaaa")
        Items = searchItems(value)
        document.querySelector(".btn-afficher-plus").style.display = "none";
        sort(AllDataSearch, false)
        UpdateCards()
      } else {
        console.log("ah");
        AddCardsSearch()
        
        document.querySelector(".btn-afficher-plus").style.display = "block";
      }
  
    } else {
      Items = [];
      currentItems = 0;
      currentItemsSearch = 0;
      AddCards()
      document.querySelector(".btn-afficher-plus").style.display = "block"
      wasWriting = false;
    }
  }, 200);
  
});

async function GetTiers() {
  await fetch("https://aomp.vercel.app/TiersData.json")
  .then((res) => res.json())
  .then((data) => {Tiers = data})
}




async function FetchData() {
  AllData = [];
  AllDataSearch = "";
  Items = []; 
  currentItems = 0;
  currentItemsSearch = 0;
  await fetch("https://aomp.vercel.app/item.json")
  .then((res) => res.json())
  .then((data) => {
    AllItems = data.slice(0, data.length).map((item, index) => {
      if (item.LocalizedNames) {
        AllData.push(item);
      }
    })
    sort(data, true)
    
    ItemsAllTiers = AllData;
    if (sortTier !== "All tiers") {
      AllData = selectOnlyTier(sortTier.slice(1, 2));
    }
    AddCards()
  })
}

GetTiers();
FetchData()

document.querySelector(".btn-afficher-plus").addEventListener("click", () => {
  
  if (wasWriting == false) {
    AddCards()
  } else {
    if (AllDataSearch.length <= currentItemsSearch) {
      document.querySelector(".btn-afficher-plus").style.display = "none";
    } else {
      AddCardsSearch()
    }
  }
});