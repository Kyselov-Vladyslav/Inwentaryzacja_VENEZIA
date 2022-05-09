$(document).ready(function () {
  $.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1QtK2Y98kBhAUA5ZQA5VGHgg13dLO7lO8mnbXmDplaXE/values/responses?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA",
    function (elemEdded) {
      elemEdded = elemEdded["values"];
      // console.log(done);
      showGoods(elemEdded);
    }
  );
  function showGoods(elemEdded) {
    for (let i = 1; i < elemEdded.length; i++) {
      
      let dodac_tr = document.createElement("tr");
      dodac_tr.className = "added";
    
      for (let j = 0; j < elemEdded[i].length; j++) {

     
          let dodac_urzadzenie = document.createElement("td");
          dodac_urzadzenie.innerHTML = elemEdded[i][j];
          dodac_tr.appendChild(dodac_urzadzenie);
     }
     if (elemEdded[i][6] == "#"){
      document.querySelector(".sprawdzone").appendChild(dodac_tr);
     }else {
      document.querySelector(".migracja").appendChild(dodac_tr);
     }
    }
  }
});
