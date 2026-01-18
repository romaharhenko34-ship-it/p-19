const btn = document.getElementById('clickMe');
let count = 0;
btn.addEventListener('click', () => {
  count += 1;
  console.log(`Clicked ${count} time(s)`);
});