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
    // for (let i = 0; i < data.length; i++) {
    //   for (let j = 0; j < data[i].length; j++) {
    //     out += `<div>`;
    //     out += `<p>...........${data[i][j]}</p>`;
    //     out += `</div>`;
    //     //   function checkAvailability(arr, val) {
    //     //     return arr.some(function(arrVal) {
    //     //       return val === arrVal;
    //     //     });
    //     //   }
    //     //   console.log(checkAvailability(data[i], 'ACP/4/17'));
    //   }
    // }

    const btn = document.querySelector(".btn");
    const display_none_dodane = document.querySelector(".display_none_dodane");
    const display_none_nie_dodane = document.querySelector(".display_none_nie_dodane");
    const code = document.getElementById("code");
    const message = document.getElementById("message");

    code.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();

        let flag = true;
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            if (code.value == data[i][0]) {
              const dodac_urzadzenie = document.createElement('td');

              dodac_urzadzenie.textContent = `${data[i][j]}`;
           

              document
                .querySelector(".dodawanie")
                .appendChild(dodac_urzadzenie);

              flag = false;
              // alert("Urządzenie dodane");
              display_none_dodane.classList.remove("display_none_dodane");
              btn.addEventListener("click", btnClick);
              function btnClick() {
                location.reload();
              }
            }
          }
        }
        if (flag == true) {
          alert("Brak urządzenia w bazie, wpisz swoją uwagę");
          display_none_nie_dodane.classList.remove("display_none_nie_dodane");
          btn.addEventListener("click", btnClick);
          function btnClick() {
            location.reload();
            data[i] = code.value + " " + message.value;
            alert("Uwaga dodana");
            
          }
        }
      }
    });
    $(".dodaj_tu").html(out);
  }
});

// const p = document.createElement('p');

// p.textContent = 'Przypisywanie dowolnej zawartości';

// // document.querySelector('body').appendChild(p);
// document.body.appendChild(p);

// const p2 = document.createElement('p');

// p2.textContent = 'Przypisywanie w divie...';

// document.querySelector('div').appendChild(p2);
