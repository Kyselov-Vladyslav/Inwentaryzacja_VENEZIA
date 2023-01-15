const rozwin = document.querySelector('.rozwin');
const rozwinActive = document.querySelector('.rozwin_active');
const tableZmigrowane = document.querySelector('.table-zmigrowane');


rozwin.addEventListener('click', () => {
  
  if (tableZmigrowane.style.display == 'none') {
    tableZmigrowane.style.display = 'table-footer-group';
    rozwin.style.display = 'none';
    rozwinActive.style.display = 'flex';
  }
});
rozwinActive.addEventListener('click', () => {
    if (tableZmigrowane.style.display == 'table-footer-group') {
      tableZmigrowane.style.display = 'none';
      rozwin.style.display = 'flex';
      rozwinActive.style.display = 'none';
    } 
  });