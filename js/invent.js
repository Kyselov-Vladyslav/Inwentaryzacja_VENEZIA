
/* ============================================================================
   invent.js – pełna, zoptymalizowana wersja 
   (struktura HTML bez zmian, klasy i style zostają jak były)
   ========================================================================== */
   (() => {
    "use strict";
  
    /* ------------------------------------------------------------------------
       0. Stałe – pobieramy raz, potem tylko używamy
       --------------------------------------------------------------------- */
    const blockDodane     = document.querySelector(".display_none_dodane");
    const blockNieDodane  = document.querySelector(".display_none_nie_dodane");
    const formScan        = document.querySelector(".form-scan");
    const codeInput       = document.getElementById("code");
    const tabelaDodawanie = document.querySelector(".dodawanie");
  
    const alertTest  = document.querySelector(".alert-test");
    const alertOk    = document.querySelector(".alert-ok");
    const alertIt    = document.querySelector(".alert-it");
    const alertBrak  = document.querySelector(".alert-brak");
    const alertPuste = document.querySelector(".alert-puste");
  
    const ok      = document.querySelector(".ok");
    const okIt    = document.querySelector(".ok-it");
    const okBrak  = document.querySelector(".ok-brak");
    const okPuste = document.querySelector(".ok-puste");
  
    /* ------------------------------------------------------------------------
       1. Wysłanie formularza do Apps Script
       --------------------------------------------------------------------- */
    $(".form").on("submit", function (e) {
      e.preventDefault();
  
      codeInput.value = codeInput.value.toUpperCase();   // ★ wymuś wielkie litery

      const appLink =
        "https://script.google.com/macros/s/AKfycbxuFwFLAPK3pqNMBFddWeZrjwH0bC1rKnHttCeeZUoqC9jZM-KtP4MIOX9ONzfsQMotgg/exec";
  
      $.ajax({
        url: appLink,
        type: "POST",
        data: new FormData(this),
        processData: false,
        contentType: false,
        beforeSend: () => (alertTest.style.display = "flex"),
      })
        .done((_, __, jqXHR) => {
          alertTest.style.display = "none";
          (jqXHR.status === 200 ? alertOk : alertIt).style.display = "flex";
        })
        .fail(() => {
          alertTest.style.display = "none";
          alertIt.style.display = "flex";
        });
    });
  
    /* zamykanie okienek */
    ok     .addEventListener("click", () => location.reload());
    okIt   .addEventListener("click", () => (alertIt  .style.display = "none"));
    okBrak .addEventListener("click", () => (alertBrak.style.display = "none"));
    okPuste.addEventListener("click", () => (alertPuste.style.display = "none"));
  
    /* ------------------------------------------------------------------------
       2. Jednorazowe pobranie arkusza „ewida” i zbudowanie mapy
          – dwa klucze na wiersz:  Ewida  oraz  Numer_seryjny
          – wszystko w UPPER-CASE, aby wyszukiwanie było niewrażliwe na wielkość
       --------------------------------------------------------------------- */
    const ewidaMap = new Map();
  
    $.getJSON(
      "https://sheets.googleapis.com/v4/spreadsheets/1QtK2Y98kBhAUA5ZQA5VGHgg13dLO7lO8mnbXmDplaXE/values/ewida?alt=json&key=AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA",
      ({ values }) => {
        values.forEach(row => {
          const keyEwida = String(row[0] || "").trim().toUpperCase(); // kol. A
          const keySN    = String(row[2] || "").trim().toUpperCase(); // kol. C
  
          if (keyEwida) ewidaMap.set(keyEwida, row);
          if (keySN && keySN !== keyEwida) ewidaMap.set(keySN, row);
        });
      }
    );
  
    /* ------------------------------------------------------------------------
       3. Obsługa Entera – wyszukiwanie po Ewida lub Numer_seryjny (bez przypadku)
       --------------------------------------------------------------------- */
    codeInput.addEventListener("keydown", (evt) => {
      if (evt.key !== "Enter") return;
  
      const typed = formScan.value.trim();
      if (!typed) { alertPuste.style.display = "flex"; return; }
  
      evt.preventDefault();
      formScan.readOnly = true;
  
      const row = ewidaMap.get(typed.toUpperCase());
  
      /* ---------- 3a. Urządzenie znalezione -------------------------------- */
      if (row) {
        blockNieDodane.remove();
        blockDodane.classList.remove("display_none_dodane");
      
        tabelaDodawanie.innerHTML = "";
      
        /* 1. kopia wiersza, 2. Ewida → UPPERCASE */
        const displayRow = [...row];
        displayRow[0] = String(displayRow[0]).toUpperCase();

        window.lastSearchKey = displayRow[0].toUpperCase();   // klucz dla historii

        /* 3. wstawiamy do tabeli WŁAŚNIE tę kopię */
        displayRow.forEach(col => {
          const td = document.createElement("td");
          td.className = "td-on";
          td.textContent = col;
          tabelaDodawanie.appendChild(td);
        });
      
        /* ukryte pola formularza – bez zmian */
        $(".lokalizacja")  .html(`<input name="Lokalizacja_gdzie_było" value="${row[3]}">`);
        $(".numer_seryjny").html(`<input name="Numer_seryjny"          value="${row[2]}">`);
        $(".dzial")        .html(`<input name="Dzial_gdzie_było"       value="${row[4]}">`);
        $(".model")        .html(`<input name="Model"                  value="${row[1]}">`);
      } else {
        blockDodane.remove();
        blockNieDodane.classList.remove("display_none_nie_dodane");
        alertBrak.style.display = "flex";
      }
    });
  
  })();