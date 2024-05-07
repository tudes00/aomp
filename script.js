const ItemCardTemplate = document.querySelector("[data-item-template]");
const ItemCardContainer = document.querySelector("[data-item-cards-container]");
const SearchInput = document.querySelector("[data-search]");
const CardsPerPage = 100;
const baseURLimage = "https://render.albiononline.com/v1/item/";
const baseURLimagefake = "https://www.apyart.com/1904-large_default/rouge-pop-500ml.jpg";
const basURLPrices = "https://west.albion-online-data.com/api/v2/stats/prices/"
const baseURLPricesEnd = "?locations=martlock,5003,black-market,caerleon,bridgewatch,fort-sterling,thetford,lymhurst&qualities=1";
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
let DataToAdd = [];
let fullURLprices = "";
let AllURLprices = [];
let DataToAddURLbefore = [];
let DataToAddURL = [];
let DataAddedURL = 0;
let AllPrices = [];
let Language = localStorage.getItem("language");
let LanguageCool = localStorage.getItem("languageCool");

if (!localStorage.getItem("language") || !localStorage.getItem("languageCool")) {
  console.log("No language")
  localStorage.setItem("language", "EN-US");
  localStorage.setItem("languageCool", "🇬🇧 EN");
}

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

async function UpdateCards() {
  while (AllPrices.length == 0) {
    console.log("aaa")
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  console.log("hello")
  while (ItemCardContainer.firstChild) {
    ItemCardContainer.removeChild(ItemCardContainer.firstChild);
  }
  
  Items.forEach((item) => {
    const fullURLimage = baseURLimagefake
    isImgUrl(fullURLimage).then(isImage => {
      if (isImage) {
        const card = ItemCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const image = card.querySelector("[data-image]");
        const bridgewatch = card.querySelector("[bridgewatch]");
        const Name = item.LocalizedNames[Language];
        const itemPrice = AllPrices.flat().find(Item => Item.city === "Bridgewatch" && Item.item_id === item.UniqueName)
        
        image.src = fullURLimage;
        header.textContent = Name
        if (itemPrice && itemPrice.sell_price_min != undefined) {
          bridgewatch.textContent = itemPrice.sell_price_min;
        }
        ItemCardContainer.append(card);
      }
    })
  })
}

function getURL(start) {
  fullURLprices = "";
  DataToAddURLbefore = [];
  DataToAddURL = [];
  for (const item of DataToAdd.slice(start, DataToAdd.length)) {
    DataToAddURL.push(item.UniqueName);
    fullURLprices = basURLPrices + DataToAddURL + baseURLPricesEnd;
    if (fullURLprices.length >= 4096) {
      fullURLprices = basURLPrices + DataToAddURLbefore + baseURLPricesEnd;
      break;
    } else {
      DataAddedURL += 1;
      DataToAddURLbefore.push(item.UniqueName)
    }
  }
}
async function asyncCompressBody(body) {

    const compressedData = await compressBody(body);
    console.log("Data Compressed");

    return compressedData;

}

function compressBody(body) {

    return new Promise( function( resolve, reject ) {

        zlib.deflate(body, (err, buffer) => {
            if(err){
                console.log("Error Zipping");
                reject(err);
            }

            console.log("Zipped");

            resolve(buffer);
        });
    });

}

let headers = new Headers();
headers.append("Content-Type","application/json");
headers.append("Content-Encoding","zlib");


async function fetchPrices() {
  while (DataAddedURL < DataToAdd.length) {
    getURL(DataAddedURL);
    AllURLprices.push(fullURLprices);
  }
  console.log(AllURLprices)
  for (const url of AllURLprices) {
    console.log(url)
    await new Promise(resolve => setTimeout(resolve, 20));
    await fetch(url, {mode: "cors", headers:headers, body:compressedBody})
    .then(res => res.json())
    .then(data => {
      AllPrices.push(data);
    });
    console.log(AllPrices)
  }
  
  console.log("Toutes les requêtes de prix ont été effectuées de manière progressive.");
  
}
function AddCards(tf) {
  if (tf) {
    AllItems = AllData.slice(currentItems, currentItems + CardsPerPage).map((item, index) => {
      Items.push(item);
    })
    currentItems = Items.length;
  } else {
    AllDataSearch = searchItems(SearchValue);
    sort(AllDataSearch, false)
    console.log(currentItemsSearch, currentItemsSearch + CardsPerPage)
    currentItemsSearch = Items.length
    AllItems = AllDataSearch.slice(currentItemsSearch, currentItemsSearch + CardsPerPage).map((item, index) => {
      Items.push(item);
    })
    currentItemsSearch = Items.length;
  }
  UpdateCards();
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
    DataToAdd = AllData;
    console.log(AllData)
    fetchPrices();

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
    AddCards(true);
  })
}

GetTiers();
FetchData();

NoResults.style.display = "none";
