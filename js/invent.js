// window.onload = function(){
//   let getJSON = function(url, callback){
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onload = function(){
//       let status = xhr.status;
//       if(status == 200){
//         callback(null, xhr.response)
//       }
//       else {
//         callback(status, xhr.response);
//       }
//     };
//     xhr.send();
//   }
//   getJSON('https://sheets.googleapis.com/v4/spreadsheets/1mXGmSAqV2_FKxKSOQWhHfwHWZmwCkt3KHuzPylvWD3c/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA', function (err, data) {
//     // console.log(data);
//     if (err !== null){
//       alert ('Error: ' + err);
//     }
//     else {
//       // data = data["values"];
//       console.log(data);
//       document.querySelector('.dodaj_tu').innerHTML = showGoods(data);
//     }

//   });
//   function showGoods(data){
//     // data['0']['0'] = "lox";

//       let out = '';
//       for(var i=0; i<data.length; i++){
//           out += `<div> fdfjf`;
//           out +=`<p>dzila w ogóle: ${data[i]}</p>`;
//           out += `</div>`;

//       }
//       return out;
//   }

// }

$(document).ready(function () {
  $.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1mXGmSAqV2_FKxKSOQWhHfwHWZmwCkt3KHuzPylvWD3c/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA",
    function (data) {
      data = data["values"];
      console.log(data);
      showGoods(data);
    }
  );

  function showGoods(data) {
    var out = "";
    for (var i = 0; i < data.length; i++) {
      data[i][2] = i;
      
      out += `<div>`;
      out += `<p>...........${data[i][0]} ${data[i][2]}</p>`;
      // out += `<p>...........${data}</p>`;
      out += `</div>`; 
      function checkAvailability(arr, val) {
        return arr.some(function(arrVal) {
          return val === arrVal;
        });
      }
      console.log(checkAvailability(data[i], 'ACP/4/17'));

    }

    const btn = document.querySelector(".btn");
    const display_none = document.querySelector(".display_none");
    const code = document.getElementById("code");
    const message = document.getElementById("message");
    

    code.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();

        
        if (code.value === data[i]) {
          alert("Urządzenie dodane");
          console.log(code.value);
        } else {
          alert("Brak urządzenia w bazie, wpisz swoją uwagę");
          display_none.classList.remove("display_none");
          console.log(code.value);
          btn.addEventListener("click", btnClick);
          function btnClick() {
            data[i] = code.value + ' ' + message.value;
            alert("Uwaga dodana");
            
          }
        }
      }
      
    });
    $(".dodaj_tu").html(out);
  
   
  }
});
