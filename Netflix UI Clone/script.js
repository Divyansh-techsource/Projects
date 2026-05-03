const movies = [
  {
    id: 1,
    title: "Midnight Chronicles",
    year: 2024, rating: "TV-MA", match: 97,
    genres: ["Crime", "Thriller"],
    desc: "A brilliant detective hunts a ghost-like serial killer through neon-lit city streets.",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=700&q=80"
  },
  {
    id: 2,
    title: "Neon Pulse",
    year: 2023, rating: "R", match: 94,
    genres: ["Action", "Sci-Fi"],
    desc: "Hackers discover a secret AI controlling the world's financial systems.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80"
  },
  {
    id: 3,
    title: "Pale Blue Dot",
    year: 2024, rating: "PG-13", match: 91,
    genres: ["Documentary", "Science"],
    desc: "A humbling journey through space exploring humanity's place in the universe.",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=700&q=80"
  },
  {
    id: 4,
    title: "The Forgotten Sea",
    year: 2023, rating: "PG", match: 88,
    genres: ["Adventure", "Drama"],
    desc: "A family discovers an ancient portal hidden beneath the ocean floor.",
    img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=700&q=80"
  },
  {
    id: 5,
    title: "Iron Oath",
    year: 2024, rating: "TV-14", match: 96,
    genres: ["Fantasy", "Action"],
    desc: "A disgraced knight must forge an unlikely alliance to reclaim his kingdom.",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&q=80"
  },
  {
    id: 6,
    title: "Quiet Storm",
    year: 2023, rating: "R", match: 89,
    genres: ["Drama", "Romance"],
    desc: "Two strangers meet on a cross-country train, hiding secrets that could destroy them.",
    img: "https://images.unsplash.com/photo-1474900368498-ff8f9bcb4e53?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1474900368498-ff8f9bcb4e53?w=700&q=80"
  },
  {
    id: 7,
    title: "Circuit Breaker",
    year: 2024, rating: "TV-MA", match: 93,
    genres: ["Thriller", "Tech"],
    desc: "A cybersecurity expert races against time to stop a global infrastructure attack.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80"
  },
  {
    id: 8,
    title: "Arctic Dawn",
    year: 2022, rating: "PG", match: 85,
    genres: ["Nature", "Documentary"],
    desc: "Rare footage of Arctic wildlife captured during six months of polar night.",
    img: "https://images.unsplash.com/photo-1534437724545-7f9c6ff36ae5?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1534437724545-7f9c6ff36ae5?w=700&q=80"
  },
  {
    id: 9,
    title: "Bloodline",
    year: 2023, rating: "TV-MA", match: 92,
    genres: ["Crime", "Family"],
    desc: "A Florida family's dark secrets unravel when a long-lost sibling returns.",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&q=80"
  },
  {
    id: 10,
    title: "Echo Valley",
    year: 2024, rating: "PG-13", match: 87,
    genres: ["Mystery", "Sci-Fi"],
    desc: "A small town is disrupted when its residents start hearing their own voices from the past.",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80"
  },
  {
    id: 11,
    title: "Rogue Protocol",
    year: 2024, rating: "R", match: 90,
    genres: ["Action", "Spy"],
    desc: "A retired spy is pulled back in when a former colleague goes missing in Eastern Europe.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
  },
  {
    id: 12,
    title: "The Glass Garden",
    year: 2023, rating: "TV-G", match: 84,
    genres: ["Animation", "Family"],
    desc: "A young girl discovers a magical garden where plants speak the languages of lost civilizations.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    landscape: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80"
  }
];

// The movie shown in the big hero banner at the top
const featuredMovie = movies[0];

// Row definitions: each has a label and an array of movie IDs to show
const rows = [
  { title: "🔥 Trending Now",      ids: [1, 5, 7, 2, 9, 3]  },
  { title: "⭐ Top Picks For You",  ids: [3, 8, 6, 10, 4, 12] },
  { title: "🎬 New Releases",       ids: [1, 2, 5, 7, 11, 10] },
  { title: "🚀 Sci-Fi & Fantasy",   ids: [2, 3, 5, 10, 7, 4]  },
];

const extraRows = [
  { title: "🏆 Award Winners",      ids: [6, 9, 3, 8, 12, 4]  },
  { title: "💥 Action & Thrillers", ids: [5, 11, 7, 2, 1, 9]  },
];

const genres = [
  "All", "Action", "Thriller", "Sci-Fi",
  "Drama", "Comedy", "Documentary", "Fantasy", "Crime"
];


// 2. RENDER FUNCTIONS

function renderGenrePills() {
  const bar = document.getElementById('genreBar');

  genres.forEach((genre, i) => {
    const pill = document.createElement('button');
    pill.className = 'genre-pill' + (i === 0 ? ' active' : '');
    pill.textContent = genre;

    // When a pill is clicked, highlight it and show a toast
    pill.addEventListener('click', () => {
      // Remove "active" from all pills first
      document.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
      // Then add it to the one that was clicked
      pill.classList.add('active');
      showToast(genre === 'All' ? 'Showing all genres' : `Filtering: ${genre}`);
    });

    bar.appendChild(pill);
  });
}


/**
 * createCard(movie)
 * Builds and returns one movie card <div> element.
 * @param {Object} movie - a movie object from the movies array
 */
function createCard(movie) {
  const card = document.createElement('div');
  card.className = 'card';

  // Open modal when the card is clicked
  card.addEventListener('click', () => openModal(movie));

  // Build inner HTML: poster image + hover overlay
  card.innerHTML = `
    <img
      class="card__img"
      src="${movie.img}"
      alt="${movie.title}"
      loading="lazy"
    />
    <div class="card__overlay">
      <div class="card__title">${movie.title}</div>
      <div class="card__actions">
        <button
          class="card__btn card__btn--play"
          title="Play"
          onclick="event.stopPropagation(); showToast('Playing ${movie.title}')">
          ▶
        </button>
        <button
          class="card__btn card__btn--add"
          title="Add to My List"
          onclick="event.stopPropagation(); showToast('Added to My List!')">
          +
        </button>
        <button
          class="card__btn card__btn--like"
          title="Like"
          onclick="event.stopPropagation(); showToast('Liked!')">
          ♥
        </button>
      </div>
      <div class="card__match">${movie.match}% Match</div>
      <div class="card__genres">${movie.genres.join(' • ')}</div>
    </div>
  `;

  return card;
}


/**
 * renderRow(rowData, container)
 * Builds one full row (title + scrollable cards)
 * and appends it to the given container element.
 * @param {Object} rowData  - { title, ids[] }
 * @param {Element} container - the DOM element to append into
 */
function renderRow(rowData, container) {
  const row = document.createElement('div');
  row.className = 'row';

  // Row header: title on left, "See All" on right
  row.innerHTML = `
    <div class="row__header">
      <h2 class="row__title">${rowData.title}</h2>
      <span class="row__see-all" onclick="showToast('See All clicked!')">See All ›</span>
    </div>
  `;

  // Horizontal scrollable track
  const track = document.createElement('div');
  track.className = 'row__track';

  // Find each movie by ID and create a card for it
  rowData.ids.forEach(id => {
    const movie = movies.find(m => m.id === id);
    if (movie) track.appendChild(createCard(movie));
  });

  row.appendChild(track);
  container.appendChild(row);
}


// 3. MODAL LOGIC

/**
 * openModal(movie)
 * Populates the modal with a movie's data and shows it.
 * @param {Object} movie - a movie object
 */
function openModal(movie) {
  // Fill in the modal content
  document.getElementById('modalImg').src           = movie.landscape;
  document.getElementById('modalImg').alt           = movie.title;
  document.getElementById('modalTitle').textContent = movie.title;
  document.getElementById('modalDesc').textContent  = movie.desc;

  document.getElementById('modalMeta').innerHTML = `
    <span class="match">${movie.match}% Match</span>
    <span>${movie.year}</span>
    <span>${movie.rating}</span>
    <span>${movie.genres.join(', ')}</span>
  `;

  // Show the backdrop (CSS handles the fade-in animation)
  document.getElementById('modalBackdrop').classList.add('open');

  // Prevent the page from scrolling while modal is open
  document.body.style.overflow = 'hidden';
}


/**
 * closeModal(event)
 * Hides the modal. Called when clicking the backdrop
 * or the ✕ close button.
 * @param {Event} [event] - the click event (optional)
 */
function closeModal(event) {
  // If triggered by a click, only close if the backdrop itself was clicked
  // (not the modal box inside it)
  if (event && event.target !== document.getElementById('modalBackdrop')) return;

  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = ''; // restore page scrolling
}

// Close the modal when the user presses the Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('modalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
  }
});


// 4. TOAST NOTIFICATION

let toastTimer = null; // keep track of the auto-hide timer

/**
 * showToast(message)
 * Shows a toast notification for 2.5 seconds.
 * @param {string} message - text to display
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  // Reset the timer so toasts don't stack
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}


// 5. NAVBAR SCROLL EFFECT

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');

  // If scrolled more than 60px down, add the "scrolled" class
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// 6. INIT — runs everything when the page loads

function init() {
  renderGenrePills();

  // Render main rows into #rowsContainer
  const container = document.getElementById('rowsContainer');
  rows.forEach(row => renderRow(row, container));

  // Render extra rows into #extraRows (below the banner)
  const extra = document.getElementById('extraRows');
  extraRows.forEach(row => renderRow(row, extra));
}

// Kick off the app!
init();
