// 🎬 MOVIEFlix - 20+ функций, полностью JS
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const API_URL = 'https://api.themoviedb.org/3';

let movies = [], allMovies = [], favorites = {}, likes = {}, comments = {};
let currentPage = 1, totalPages = 1, isFavoritesView = false;

// 1. Инициализация
document.addEventListener('DOMContentLoaded', initMovieFlix);

// 2. Главная функция
function initMovieFlix() {
    injectNetflixStyles();
    createNetflixUI();
    bindAllEvents();
    loadStorageData();
    updateUI();
}

// 3. Внедрение стилей Netflix
function injectNetflixStyles() {
    const style = document.createElement('style');
    // If a stylesheet link exists, try to copy its href as an import. Fallback to empty string.
    const link = document.querySelector('link[rel="stylesheet"]');
    if (link && link.href) {
        style.textContent = `@import url("${link.href}");`;
    } else {
        style.textContent = '';
    }
    document.head.appendChild(style);
}

// 4. Создание UI Netflix
function createNetflixUI() {
    // Header
    createHeader();
    
    // Loader
    createLoader();
    
    // Main content
    const main = document.createElement('main');
    main.className = 'container movies-grid';
    main.id = 'moviesGrid';
    document.body.appendChild(main);
    
    // Modal
    createNetflixModal();
}

// 5. Header Netflix
function createHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <div class="container">
            <a href="#" class="logo">MovieFlix</a>
            <div class="search-container">
                <form id="searchForm">
                    <input type="text" class="search-input" id="searchInput" placeholder="Поиск фильмов...">
                    <button type="submit" class="search-btn">Найти</button>
                </form>
                <button id="favoritesBtn" class="favorites-btn">⭐ Избранное</button>
            </div>
        </div>
    `;
    document.body.appendChild(header);
}

// 6. Loader Netflix
function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.id = 'loader';
    loader.innerHTML = '<div class="netflix-spinner"></div>';
    document.body.appendChild(loader);
}

// 7. Модальное окно Netflix
function createNetflixModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'movieModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-poster" id="modalPoster"></div>
            <div class="modal-details">
                <div class="modal-header">
                    <h1 class="modal-title" id="modalTitle"></h1>
                    <button class="close-btn" id="closeModal">×</button>
                </div>
                <div class="action-buttons">
                    <button class="play-btn">▶ Воспроизвести</button>
                    <button class="info-btn">ℹ Подробнее</button>
                    <button class="like-btn" id="likeBtn">
                        ❤️ <span id="likeCount">0</span>
                    </button>
                </div>
                <div class="modal-rating" id="modalRating"></div>
                <div class="modal-genres" id="modalGenres"></div>
                <div class="comments-section" id="commentsSection"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 8. Привязка событий
function bindAllEvents() {
    document.querySelector('#searchForm').addEventListener('submit', handleSearch);
    document.querySelector('#searchInput').addEventListener('input', validateSearch);
    document.querySelector('#favoritesBtn').addEventListener('click', toggleFavorites);
    document.querySelector('#movieModal').addEventListener('click', closeModal);
    document.querySelector('#closeModal').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());
    document.getElementById('moviesGrid').addEventListener('click', handleMovieClick);
    window.addEventListener('scroll', handleScroll);
}// 9. Загрузка из LocalStorage
function loadStorageData() {
    favorites = JSON.parse(localStorage.getItem('movieflix_favorites')) || {};
    likes = JSON.parse(localStorage.getItem('movieflix_likes')) || {};
    comments = JSON.parse(localStorage.getItem('movieflix_comments')) || {};
}

// 10. Поиск фильмов
async function handleSearch(e) {
    e.preventDefault();
    const query = document.querySelector('#searchInput').value.trim();
    if (query.length < 2) return showError('Минимум 2 символа');
    
    showLoader();
    try {
        const data = await fetchMovies(query, 1);
        allMovies = data.results;
        renderMovies(allMovies.slice(0, 20));
    } catch (error) {
        showError('Фильмы не найдены');
    } finally {
        hideLoader();
    }
}

// 11. API запрос
async function fetchMovies(query, page = 1) {
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API Error');
    return res.json();
}

// 12. Рендер фильмов Netflix
function renderMovies(moviesList) {
    const grid = document.getElementById('moviesGrid');
    grid.innerHTML = '';
    
    moviesList.forEach(movie => {
        const row = document.createElement('div');
        row.className = 'movie-row';
        row.innerHTML = createMovieCard(movie);
        grid.appendChild(row);
    });
}

// 13. Карточка фильма
function createMovieCard(movie) {
    const isFav = favorites[movie.id];
    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path || ''}" alt="${movie.title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                    <button class="fav-btn ${isFav ? 'active' : ''}" data-movie-id="${movie.id}">⭐</button>
                </div>
            </div>
        </div>
    `;
}

// 14. Обработка клика по фильму
function handleMovieClick(e) {
    const card = e.target.closest('.movie-card');
    if (card) {
        const movieId = card.dataset.movieId;
        const movie = allMovies.find(m => m.id == movieId);
        showMovieModal(movie);
    }
    
    const favBtn = e.target.closest('.fav-btn');
    if (favBtn) toggleFavorite(favBtn.dataset.movieId, favBtn);
}

// 15. Модальное окно
function showMovieModal(movie) {
    if (!movie) return;
    document.querySelector('#modalTitle').textContent = movie.title || 'Без названия';
    document.querySelector('#modalPoster').style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || ''})`;
    document.querySelector('#modalRating').textContent = `⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10`;

    renderGenres(movie.genres || []);
    setupModalActions(movie.id);
    
    document.querySelector('#movieModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 16. Лайки
function toggleFavorite(movieId, btn) {
    favorites[movieId] = !favorites[movieId];
    if (btn) btn.classList.toggle('active', !!favorites[movieId]);
    localStorage.setItem('movieflix_favorites', JSON.stringify(favorites));
    updateUI();
}

// 17. Закрытие модалки
function closeModal() {
    document.querySelector('#movieModal').style.display = 'none';
    document.body.style.overflow = '';
}

// 18. Loader
function showLoader() { document.querySelector('#loader').style.display = 'block'; }
function hideLoader() { document.querySelector('#loader').style.display = 'none'; }

// 19. Ошибки
function showError(msg) {
    const error = document.createElement('div');
    error.className = 'error-msg';
    error.textContent = msg;
    document.querySelector('.container').appendChild(error);
    setTimeout(() => error.remove(), 3000);
}

// 20. Scroll эффект Header
function handleScroll() {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
}// 21+. Вспомогательные функции...
function validateSearch() {
    const input = document.querySelector('#searchInput');
    const btn = document.querySelector('.search-btn');
    btn.disabled = input.value.length < 2;
}