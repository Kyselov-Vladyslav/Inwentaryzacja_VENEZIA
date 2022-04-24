

//wersia wanila JS dla invent
//__________________________________________________________//
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
//       // data = data['values'];
//       console.log(data);
//       document.querySelector('.dodaj_tu').innerHTML = showGoods(data);
//     }

//   });
//   function showGoods(data){
//     // data['0']['0'] = 'lox';

//       let out = '';
//       for(var i=0; i<data.length; i++){
//           out += `<div> fdfjf`;
//           out +=`<p>dzila w ogóle: ${data[i]}</p>`;
//           out += `</div>`;

//       }
//       return out;
//   }

// }