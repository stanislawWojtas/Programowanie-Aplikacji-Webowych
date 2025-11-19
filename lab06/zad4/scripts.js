const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

const accessToken = "ekXGbEDG68zIkHbugci8AqljSRMGNmGq47CncbpvdQ4"

const nextBtn = document.querySelector('.nav-btn.next');
const gallery = document.querySelector('.gallery');
const prevBtn = document.querySelector('.nav-btn.prev');

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

lightbox && lightbox.classList.add('hidden');

const state = {
  query: '',
  page: 1,
  perPage: 30,    
  windowSize: 8,  
  index: 0,        
  results: []
};

async function fetchImages(query, page = 1) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${state.perPage}`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessToken}` }
  });
  if (!res.ok) {
    console.error('Unsplash error', res.status, await res.text());
    return [];
  }
  const data = await res.json();
  return data.results || [];
}

function renderGallery() {
  gallery.innerHTML = '';
  const slice = state.results.slice(state.index, state.index + state.windowSize);

  slice.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description || photo.description || `Photo by ${photo.user?.name || 'Unsplash user'}`;
    img.dataset.large = photo.urls.regular; // <-- większa wersja do podglądu
    gallery.appendChild(img);
  });

  nextBtn.disabled = (state.index + state.windowSize >= state.results.length);
  prevBtn && (prevBtn.disabled = state.index === 0);
}

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  state.query = query;
  state.page = 1;
  state.index = 0;
  state.results = await fetchImages(state.query, state.page);

  renderGallery();
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleSearch();
  }
});

searchIcon.addEventListener('click', handleSearch);

searchIcon.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleSearch();
  }
});

nextBtn?.addEventListener('click', async () => {
  if (state.index + state.windowSize < state.results.length) {
    state.index += 1;
    renderGallery();
    return;
  }

  state.page += 1;
  const more = await fetchImages(state.query, state.page);
  if (more.length) {
    state.results = state.results.concat(more);
    state.index += 1;
    renderGallery();
  } else {
    // brak kolejnych zdjęć to blokuje przycisk
    nextBtn.disabled = true;
    
  }
});

prevBtn?.addEventListener('click', () => {
  if (state.index > 0) {
    state.index -= 1;
    renderGallery();
  }
});

gallery.addEventListener('dblclick', (e) => {
  const img = e.target.closest('img');
  if (!img) return;
  openLightbox(img.dataset.large || img.src, img.alt || '');
});

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; 
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
    closeLightbox();
  }
});