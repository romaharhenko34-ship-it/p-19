
function renderGenres(genres) {
    const container = document.querySelector('#modalGenres');
    container.innerHTML = (genres && genres.length) ? genres.map(g => `<span>${g.name}</span>`).join(' ') : '';
}

function updateUI() {
    const btn = document.querySelector('#favoritesBtn');
    if (btn) btn.textContent = `⭐ Избранное (${Object.keys(favorites).length})`;
}

function toggleFavorites() {
    isFavoritesView = !isFavoritesView;
    const movieList = isFavoritesView ? allMovies.filter(m => favorites[m.id]) : allMovies;
    renderMovies(movieList);
}

function setupModalActions(movieId) {
    renderComments(movieId);

    const commentsSection = document.querySelector('#commentsSection');
    if (!commentsSection) return;

    const existingForm = commentsSection.querySelector('form');
    if (existingForm) return;

    const form = document.createElement('form');
    form.id = 'commentForm';
    form.innerHTML = `
        <div style="display:flex;gap:.5rem;align-items:flex-start">
            <textarea id="commentInput" placeholder="Оставьте комментарий..." style="flex:1;padding:.5rem;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#fff;min-height:60px"></textarea>
            <button type="submit" class="play-btn" style="height:44px;padding:.45rem 1rem">Отправить</button>
        </div>
    `;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('#commentInput');
        const text = (input && input.value || '').trim();
        if (!text) return;
        addComment(movieId, text);
        input.value = '';
    });

    commentsSection.prepend(form);
}

function renderComments(movieId) {
    const container = document.querySelector('#commentsSection');
    if (!container) return;

    const list = comments[movieId] || [];

    const existingForm = container.querySelector('form');
    container.innerHTML = '';
    if (existingForm) container.appendChild(existingForm);

    const ul = document.createElement('div');
    ul.className = 'comments-list';
    if (!list.length) {
        ul.innerHTML = '<div style="color:#aaa;margin-top:.6rem">Пока нет комментариев. Будьте первым!</div>';
        container.appendChild(ul);
        return;
    }

    list.slice().reverse().forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = 'comment-item';
        item.style.padding = '.5rem .6rem';
        item.style.borderTop = '1px solid rgba(255,255,255,0.03)';
        item.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem">
                <div style="font-size:.95rem;color:#fff">${escapeHtml(c.text)}</div>
                <button class="delete-comment" data-idx="${list.length - 1 - idx}" style="background:transparent;border:0;color:#f66;cursor:pointer">Удалить</button>
            </div>
            <div style="font-size:.75rem;color:var(--accent);margin-top:.35rem">${formatTimestamp(c.ts)}</div>
        `;

        const delBtn = item.querySelector('.delete-comment');
        delBtn.addEventListener('click', () => {
            deleteComment(movieId, Number(delBtn.dataset.idx));
        });

        ul.appendChild(item);
    });

    container.appendChild(ul);
}

function addComment(movieId, text) {
    if (!comments[movieId]) comments[movieId] = [];
    comments[movieId].push({ text: text, ts: Date.now() });
    localStorage.setItem('movieflix_comments', JSON.stringify(comments));
    renderComments(movieId);
}

function deleteComment(movieId, idx) {
    if (!comments[movieId]) return;
    comments[movieId].splice(idx, 1);
    localStorage.setItem('movieflix_comments', JSON.stringify(comments));
    renderComments(movieId);
}

function formatTimestamp(ts) {
    const d = new Date(ts);
    return d.toLocaleString();
}

function escapeHtml(s){
    return String(s).replace(/[&<>\"]/g, function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
}