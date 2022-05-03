$(document).ready(function () {
  $.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1mXGmSAqV2_FKxKSOQWhHfwHWZmwCkt3KHuzPylvWD3c/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA",
    function (data) {
      data = data["values"];
      // console.log(data);
      showGoods(data);
    }
  );

  function showGoods(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (($.cookie()[i+1]) == data[i][0]) {
          const dodac_urzadzenie = document.createElement("td");
          const dodac_tr = document.createElement("tr");
          dodac_tr.className = "added";
          
          dodac_urzadzenie.textContent = `${data[i][j]}`;
          document.querySelector(".sprawdzone").appendChild(dodac_tr);
          document.querySelector('.added').appendChild(dodac_urzadzenie);
          if (document.querySelectorAll('.added').length < 6){

            // document.querySelector('.added').appendChild(dodac_urzadzenie);            
            
          }
         

          // var out = "";
          // // out += `<th scope="row">${i + 1}</th>`;
         
          // out += `<tr>`
          // for (let k = 0; k <= 6; k++) {
          // out += `<td>${data[i][k]}</td>`;
          // }
          // out += `</tr>`
          // // out += `<tr>`
          // // for (let l = 0; l <= 6; l++) {
          // // out += `<td>${data[j][l]}</td>`;
          // // }
          // // out += `</tr>`
          // // out += `<tr>`
          // // out += `<th scope="row">${data[j][0]}</th>`;
          // // out += `<td>${data[j][1]}</td>`;
          // // out += `<td>${data[j][2]}</td>`;
          // // out += `<td>${data[j][3]}</td>`;
          // // out += `<td>${data[j][4]}</td>`;
          // // out += `<td>${data[j][5]}</td>`;
          // // out += `<td>${data[j][6]}</td>`;
          // // out += `</tr>`

          // // out += `<td>${data[j]}</td> </tr>`;
         

          // $(".sprawdzone").html(out);
          
        }
      }
    }
  }
// console.log((document.cookie.replace(/; /g," ")));

  
});
