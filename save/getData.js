
const fs = require('fs');
const number = 11
let AllData = [];
let Tiers = require(`./Tier${number-1}.json`);



async function AddTier(itemNo, itemE, len) {
  await fetch(`https://gameinfo.albiononline.com/api/gameinfo/items/${itemNo}/data`, {
    mode: "cors",
    headers: {
      "Origin": "https://aomp.vercel.app/"
    }
  })
  .then((res) => {
    if (!res.status === 404) {
      throw new Error(`HTTP error! status: ${res.status}, ${itemNo}`);
    } else if (res.ok) {
      return res.json();
    }
    
  })
  .then((data) => {
    if (data && Object.keys(data).length > 0) {
      const Tier = "T" + data.tier;
      Tiers[Tier][len] = itemE;
    } else {
      console.error(".");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}

  
  
async function FetchData() {
  AllData = [];
  await fetch("https://aomp.vercel.app/item.json")
    .then((res) => res.json())
    .then((data) => {
      AllItems = data.slice(((number-1)*1000),data.length).map((item, index) => {
        if (item.LocalizedNames) {
          AllData.push(item);
          let itemTier = item.UniqueName;
          if (item.UniqueName.includes("@")) {
            itemTier = item.UniqueName.slice(0, -2);
          }
          return AddTier(itemTier, item.UniqueName, item.UniqueName);
        }
      });
      return Promise.all(AllItems);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
    const contenu = JSON.stringify(Tiers, null, 2); 
          
    const cheminDuFichier = `Tier${number}.json`;
    await fs.promises.writeFile(cheminDuFichier, contenu, (erreur) => {
        if (erreur) {
            console.error("Erreur lors de l'écriture dans le fichier :", erreur);
            return;
        }
        });
    console.log("Done");
}

FetchData();
