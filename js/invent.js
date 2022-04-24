

$(document).ready(function () {
  $.getJSON(
    'https://sheets.googleapis.com/v4/spreadsheets/1mXGmSAqV2_FKxKSOQWhHfwHWZmwCkt3KHuzPylvWD3c/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA',
    function (data) {
      data = data['values'];
      console.log(data);
      showGoods(data);
    }
  );

  function showGoods(data) {
    var out = '';
    for (let i = 0; i < data.length; i++) {
      // out += `<div>`;
      // out += `<p>...........${data[i][1]}</p>`;
      // out += `</div>`;
      // function checkAvailability(arr, val) {
      //   return arr.some(function(arrVal) {
      //     return val === arrVal;
      //   });
      // }
      // console.log(checkAvailability(data[i], 'ACP/4/17'));
    }

    const btn = document.querySelector('.btn');
    const display_none = document.querySelector('.display_none');
    const code = document.getElementById('code');
    const message = document.getElementById('message');

    code.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();

        let flag = true;
        for (let i = 0; i < data.length; i++) {
          if (code.value == data[i][1]) {
            flag = false;
            alert('Urządzenie dodane');
            location.reload();
          } 
        }
        if (flag == true) {
          alert('Brak urządzenia w bazie, wpisz swoją uwagę');
          display_none.classList.remove('display_none');
          btn.addEventListener('click', btnClick);
          function btnClick() {
            data[i] = code.value + ' ' + message.value;
            alert('Uwaga dodana');
            location.reload();
          }
        }
      }
    });
    $('.dodaj_tu').html(out);
  }
});





// const p = document.createElement('p');

// p.textContent = 'Przypisywanie dowolnej zawartości';

// // document.querySelector('body').appendChild(p);
// document.body.appendChild(p);


// const p2 = document.createElement('p');

// p2.textContent = 'Przypisywanie w divie...';

// document.querySelector('div').appendChild(p2);