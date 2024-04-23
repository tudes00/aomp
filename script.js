const ItemCardTemplate = document.querySelector("[data-item-template]");
const ItemCardContainer = document.querySelector("[data-item-cards-container]");
const SearchInput = document.querySelector("[data-search]");
const CardsPerPage = 100
const baseURL = "https://render.albiononline.com/v1/item/"
const SortMenuTextAZ = document.querySelector('li a[class="SortMenuTextAZ"]')
const SortMenuTextT = document.querySelector('li a[class="SortMenuTextT"]')
const SortMenuTextL = document.querySelector('li a[class="SortMenuTextL"]')
const SortMenuTextLa = document.querySelector('li a[class="SortMenuTextLa"]')
const SousMenuLa = document.querySelector('ul[class="SousMenuScrLa"]');
const SousMenuL = document.querySelector('ul[class="SousMenuScrL"]');
const SousMenuAZ = document.querySelector('ul[class="SousMenuScrAZ"]');
const SousMenuT = document.querySelector('ul[class="SousMenuScrT"]');
const NoResults = document.querySelector('[class="No-Results"]');

let AllData = [];
let Tiers = {};
let AllDataSearch = "nothing";
let Items = [];
let AllDataTier = [];
let AllDataLevel = [];
let AllDataTierLevel = [];
let currentItems = 0;
let currentItemsSearch = 0;
let wasWriting = false;
let sortAZ = "A to Z";
let sortTier = "All tiers";
let sortLevel = "All levels";
let timeoutId;
let ItemsAll;
let SearchValue;
let IsSortingByLevels = false;
let IsSortingByTiers = false;

if ( !localStorage.getItem("language") || !localStorage.getItem("languageCool")) {
  console.log("No language")
  localStorage.setItem("language", "EN-US");
  localStorage.setItem("languageCool", "🇬🇧 EN");
}

let Language = localStorage.getItem("language");
let LanguageCool = localStorage.getItem("languageCool");

function selectOnlyTier(tier) {
  console.log("tier: ", tier)
  AllDataTier = [];
  if (tier !== 9) {
    IsSortingByTiers = true;
    ItemsAll.forEach((item) => {
      if (Tiers["T".concat(tier)].hasOwnProperty(item.UniqueName)) {
        AllDataTier.push(item);
      }
    });
  } else {
    IsSortingByTiers = false;
    AllDataTier = ItemsAll;
  }

  if (AllDataTier.length <= currentItems) {
    document.querySelector(".btn-afficher-plus").style.display = "none";
  } else {
    document.querySelector(".btn-afficher-plus").style.display = "block";
  }
  return AllDataTier;
}

function selectOnlyLevel(level) {
  console.log("level: ", level)
  AllDataLevel = [];
  if (level !== 5 & level !== 0) {
    
    console.log("1level: ", level)
    IsSortingByLevels = true;
    ItemsAll.forEach((item) => {
      if (item.UniqueName.includes("@".concat(level))) {
        AllDataLevel.push(item);
      }
    });
  } else if (level == 5){
    
    console.log("2level: ", level)
    IsSortingByLevels = false;
    AllDataLevel = ItemsAll;
  } else {
    console.log("3level: ", level)
    IsSortingByLevels = true;
    ItemsAll.forEach((item) => {
      if (!item.UniqueName.includes("@")) {
        AllDataLevel.push(item);
      }
    });
  }

  console.log(AllDataLevel);
  if (AllDataLevel.length <= currentItems) {
    document.querySelector(".btn-afficher-plus").style.display = "none";
  } else {
    document.querySelector(".btn-afficher-plus").style.display = "block";
  }
  return AllDataLevel;
}

function selectOnlyTierLevel(tier, level) {
  console.log(tier, level);
  
  AllDataTierLevel = [];
  if (level === null) {
    if (sortLevel === "All levels") {
      level = 5
    }else {
      level = sortLevel
    }
  }
  if (tier === null) {
    if (sortTier === "All tiers") {
      tier = 9
    } else {
      tier = sortTier
    }
  }else {
    tier = "T".concat(tier)
  }
  console.log("Level est différent de 5 ? ", level != 5);
  console.log("Level est différent de 0 ? ", level != 0);
  console.log("Tier est différent de 'T9' ? ", tier != "T9");

  if (level != 5 && level != 0 && tier != "T9") {
    console.log("La condition est vraie : ", tier, level);
    IsSortingByLevels = true;
    IsSortingByTiers = true;
    AllDataTierLevel = [];
    ItemsAll.forEach((item) => {
      if (item.UniqueName.includes("@".concat(level)) & Tiers[tier].hasOwnProperty(item.UniqueName)) {
        AllDataTierLevel.push(item);
      }
    });
  } else if (level == 5){
    IsSortingByLevels = false;
    console.log('2')
    AllDataTierLevel = selectOnlyTier(tier.slice(1, 2));
  } else if (level == 0 & tier != "T9"){
    IsSortingByLevels = true;
    console.log('0, 9 aaaaaaaa')
    ItemsAll.forEach((item) => {
      if (!item.UniqueName.includes("@") & Tiers[tier].hasOwnProperty(item.UniqueName)) {
        AllDataTierLevel.push(item);
      }
    });
  } else if (level == 0 & tier == 9){
    IsSortingByLevels = true;
    console.log('3')
    ItemsAll.forEach((item) => {
      if (!item.UniqueName.includes("@")) {
        AllDataTierLevel.push(item);
      }
    });
  } else if (tier == "T9") {
    IsSortingByTiers = false;
    console.log('4')
    AllDataTierLevel = selectOnlyLevel(level);
  }

  
  if (AllDataTierLevel.length <= currentItems) {
    document.querySelector(".btn-afficher-plus").style.display = "none";
  } else {
    document.querySelector(".btn-afficher-plus").style.display = "block";
  }
  return AllDataTierLevel;
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

  if (sortAZ === "A to Z") {return (a < b) ? -1 : (a > b) ? 1 : 0} else {return (a > b) ? -1 : (a < b) ? 1 : 0}
}

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
        const Name = item.LocalizedNames[Language];
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
        return item.LocalizedNames[Language].toLowerCase().includes(query.toLowerCase()) && Tiers["T".concat(sortTier.slice(1, 2))].hasOwnProperty(item.UniqueName);
      } else {
        return item.LocalizedNames[Language].toLowerCase().includes(query.toLowerCase());
      }
    }
    return false;
  });
  return filteredItems;
}




async function GetTiers() {
  await fetch("https://aomp.vercel.app/TiersData.json")
  .then((res) => res.json())
  .then((data) => {Tiers = data})
}




async function FetchData() {
  AllData = [];
  AllDataSearch = "nothing";
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
    sort(AllData, true)
    
    ItemsAll = AllData;
    console.log("sortTier: ", sortTier);
    console.log("sortLevel: ", sortLevel);
    console.log("IsSortingByLevels: ", IsSortingByLevels);
    console.log("IsSortingByTiers: ", IsSortingByTiers);
    if (sortTier !== "All tiers") {
      if (!IsSortingByLevels) {
        AllData = selectOnlyTier(sortTier.slice(1, 2));
      }else {
        AllData = selectOnlyTierLevel(sortTier.slice(1, 2), null);
      }
    }

    if (sortLevel !== "All levels") {
      if (!IsSortingByTiers) {
        console.log("selectonlylevel")
        AllData = selectOnlyLevel(sortLevel);
      }else {
        AllData = selectOnlyTierLevel(null, sortLevel);
      }
    }
    AddCards()
  })
}

GetTiers();
FetchData();
NoResults.style.display = "none";
