$(document).ready(function(){
    $.getJSON(
        "https://sheets.googleapis.com/v4/spreadsheets/1mXGmSAqV2_FKxKSOQWhHfwHWZmwCkt3KHuzPylvWD3c/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA"
        , function(data){
        console.log(data);
    })
})

// var url = 'https://sheets.googleapis.com/v4/spreadsheets/1mXGmSAqV2_FKxKSOQWhHfwHWZmwCkt3KHuzPylvWD3c/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA';
// ($.getJSON(url, 'callback=?')).success(function(data) {
//     console.log(data);
// });