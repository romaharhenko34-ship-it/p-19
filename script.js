
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});

document.querySelectorAll('.movie').forEach(movie => {
  movie.addEventListener('click', () => {
    const title = movie.getAttribute('data-title');
    const desc = movie.getAttribute('data-desc');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modal').style.display = 'flex';
  });
});

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  if (email.trim() === '') {
    alert('Пожалуйста, введите email');
  } else {
    alert('Спасибо за обратную связь!');
    e.target.reset();
  }
});



