const btn = document.querySelector(".btn");
const display_none = document.querySelector(".display_none");
const code = document.getElementById("code");


btn.addEventListener("click", btnClick);

function btnClick() {
    if (code.value == "DELL/1/22") {
        alert("Urządzenie dodane");
        console.log(code)
        
    } else {
        alert("Brak urządzenia w bazie, wpisz swoją uwagę");
        display_none.classList.remove("display_none");
        console.log(code.value)
    }
}