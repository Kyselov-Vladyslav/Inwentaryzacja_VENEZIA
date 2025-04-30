/*  history.js
 *  ──────────────────────────────────────────────────────────────────────────
 *  Plik ładuje się PO głównym „invent.js”.
 *  • Po udanym wyszukaniu artykułu „invent.js” zapisuje klucz w:
 *        window.lastSearchKey   (np.  MON/18/18  lub  2C08480542)
 *  • Ten plik nasłuchuje kliknięcia przycisku „Pokaż historię zmian”
 *    (klasa .btn-history) i pobiera całą historię z arkusza „responses”.
 *  • Dane pokazuje w oknie-alert z tabelą; przycisk OK zamyka okno.
 *  ──────────────────────────────────────────────────────────────────────────
 */

(() => {
    "use strict";
  
    /* ╭──────────────────╮
       │  Stałe konfig.   │
       ╰──────────────────╯ */
    const API_KEY         = "AIzaSyAOaLT5FKyDIEqZn9XfMkjFEkIjc1J-jjA";
    const SPREADSHEET_ID  = "1QtK2Y98kBhAUA5ZQA5VGHgg13dLO7lO8mnbXmDplaXE";
    const RESP_URL =
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}` +
      `/values/responses?alt=json&key=${API_KEY}`;
  
    /* ╭──────────────────╮
       │  Szablon okna    │
       ╰──────────────────╯ */
    const modalHtml = `
    <div class="alert alert-history" style="display:none">
      <div class="alert-flexbox-history flexbox">
        <div class="alert-container-history container-history">
          <div class="alert-text">
            <p class="p-glowny mb-2">Historia zmian</p>
            <div class="history-content"></div>
          </div>
          <div class="center">
            <button type="button" class="btn ok-history">OK</button>
          </div>
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  
    const alertHistory   = document.querySelector(".alert-history");
    const historyBox     = alertHistory.querySelector(".history-content");
    const okHistoryBtn   = alertHistory.querySelector(".ok-history");
  
    /* ╭──────────────────╮
       │  Zamknięcie okna │
       ╰──────────────────╯ */
    okHistoryBtn.addEventListener("click", () => {
      alertHistory.style.display = "none";
      historyBox.innerHTML = "";
    });
  
    /* ╭───────────────────────────────────────────╮
       │  1. Pobierz i pokaż historię dla klucza   │
       ╰───────────────────────────────────────────╯ */
    async function showHistory(key) {
      try {
        const res   = await fetch(RESP_URL);
        const json  = await res.json();
        const rows  = json.values || [];
        if (rows.length <= 1) throw new Error("Brak danych w arkuszu.");
  
        // nagłówki w pierwszym wierszu
        const header = rows[0];
        const dataRows = rows.slice(1);
  
        const ucKey = key.toUpperCase();
  
        // kolumny: 1 = Ewida, 3 = Numer_seryjny
        const matches = dataRows.filter(r =>
          (r[1] && String(r[1]).toUpperCase() === ucKey) ||
          (r[3] && String(r[3]).toUpperCase() === ucKey));
  
        if (!matches.length) {
          historyBox.innerHTML = `<p class="p-glowny">Brak historii dla <strong>${key}</strong>.</p>`;
        } else {
          // budujemy tabelę
          let thead = "<thead class='thead-dark'><tr>";
          header.forEach(h => thead += `<th scope="col" class="th-style">${h}</th>`);
          thead += "</tr></thead>";
  
          let tbody = "<tbody>";
          matches.forEach(row => {
            tbody += "<tr>";
            header.forEach((_, idx) => {
              const cell = row[idx] || "";
              tbody += `<td>${cell}</td>`;
            });
            tbody += "</tr>";
          });
          tbody += "</tbody>";
  
          historyBox.innerHTML = `<table class="table table-sm">${thead}${tbody}</table>`;
        }
  
        alertHistory.style.display = "flex";
      } catch (err) {
        historyBox.innerHTML =
          `<p class="p-glowny">Błąd pobierania historii…</p><p>${err.message}</p>`;
        alertHistory.style.display = "flex";
      }
    }
  
    /* ╭───────────────────────────────────────────╮
       │  2. Delegowany click na .btn-history      │
       ╰───────────────────────────────────────────╯ */
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("btn-history")) return;
  
      const key = (window.lastSearchKey || "").trim();
      if (!key) return;            // brak wyszukiwania – nic nie robimy
  
      showHistory(key);
    });
  
  })();
  