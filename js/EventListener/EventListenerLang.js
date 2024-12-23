function change() {
    SortMenuTextLa.textContent =  LanguageCool.concat(" ▼");
    SousMenuLa.style.display = "none";
    document.getElementById("search").value = '';
    del();
    FetchData();
}

document.addEventListener('DOMContentLoaded', function() {
    if ( !localStorage.getItem("language") || !localStorage.getItem("languageCool")) {
        console.log("No language")
        localStorage.setItem("language", "EN-US");
        localStorage.setItem("languageCool", "🇬🇧 EN");
        Language = "EN-US";
        LanguageCool = "🇬🇧 EN";
      }
    //langue:
    SortMenuTextLa.addEventListener('touchstart', function(event) {
      SortMenuTextLa.textContent = LanguageCool.concat(" ▲")
      SousMenuLa.style.display = "block";
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
        !SortMenuTextLa.contains(event.target) && 
        !SousMenuLa.contains(event.target)) {
          SortMenuTextLa.textContent = LanguageCool.concat(" ▼");
      }
    });
  
    SortMenuTextLa.addEventListener('mouseenter', function(event) {
      SortMenuTextLa.textContent = LanguageCool.concat(" ▲")
      SousMenuLa.style.display = "block";
    })
  
    document.querySelector('li a[class="FR"]').addEventListener('click', function(event) {
        Language = "FR-FR";
        LanguageCool = "🇫🇷 FR";
        change();
    });
    document.querySelector('li a[class="EN"]').addEventListener('click', function(event) {
        Language = "EN-US";
        LanguageCool = "🇬🇧 EN";
        
        change();
    });
    document.querySelector('li a[class="DE"]').addEventListener('click', function(event) {
        Language = "DE-DE";
        LanguageCool = "🇩🇪 DE";
        
        change();
    });
    document.querySelector('li a[class="RU"]').addEventListener('click', function(event) {
        Language = "RU-RU";
        LanguageCool = "🇷🇺 RU";
        
        change();
    });
    document.querySelector('li a[class="PL"]').addEventListener('click', function(event) {
        Language = "PL-PL";
        LanguageCool = "🇵🇱 PL";
        
        change();
    });
    document.querySelector('li a[class="ES"]').addEventListener('click', function(event) {
        Language = "ES-ES";
        LanguageCool = "🇪🇸 ES";
        
        change();
    });
    document.querySelector('li a[class="PT"]').addEventListener('click', function(event) {
        Language = "PT-BR";
        LanguageCool = "🇵🇹 PT";
        
        change();
    });
    document.querySelector('li a[class="IT"]').addEventListener('click', function(event) {
        Language = "IT-IT";
        LanguageCool = "🇮🇹 IT";
        
        change();
    });

    document.querySelector('li a[class="KO"]').addEventListener('click', function(event) {
        Language = "KO-KR";
        LanguageCool = "🇰🇷 KR";
        
        change();
    });
    document.querySelector('li a[class="JA"]').addEventListener('click', function(event) {
        Language = "JA-JP";
        LanguageCool = "🇯🇵 JP";
        
        change();
    });
    document.querySelector('li a[class="ZH"]').addEventListener('click', function(event) {
        Language = "ZH-TW";
        LanguageCool = "🇨🇳 CN";
        
        change();
    });
    document.querySelector('li a[class="ID"]').addEventListener('click', function(event) {
        Language = "ID-ID";
        LanguageCool = "🇮🇩 ID";
        
        change();
    });
    document.querySelector('li a[class="TR"]').addEventListener('click', function(event) {
        Language = "TR-TR";
        LanguageCool = "🇹🇷 TR";
        
        change();
    });
    document.querySelector('li a[class="AR"]').addEventListener('click', function(event) {
        Language = "AR-SA";
        LanguageCool = "🇦🇪 AR";
        
        change();
    });
})