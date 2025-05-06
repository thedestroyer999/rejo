// src/views/StoryView.js
import L from 'leaflet';
import storyTemplate from './templates/storyTemplate.js';

const StoryView = {
  _map: null,

  render() {
    return storyTemplate;
  },

  showStories(stories) {
    const storyList = document.getElementById('story-list');
    const loadingIndicator = document.getElementById('loading-indicator');
    storyList.innerHTML = '';
    loadingIndicator.style.display = 'block';
  
    // Hapus map lama (jika ada) dan div-nya
    if (this._map) {
      this._map.remove();
      this._map = null;
    }
  
    // Ganti isi div map untuk menghindari re-inisialisasi error
    const mapContainer = document.getElementById('map');
    const newMapContainer = mapContainer.cloneNode(false); // kosongkan isinya
    mapContainer.parentNode.replaceChild(newMapContainer, mapContainer);
  
    // Inisialisasi ulang map
    this._map = L.map('map').setView([-6.200000, 106.816666], 5);
  

    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    });

    const satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=2sxrVeV47fFEDxOxOeGS', {
      attribution: '&copy; MapTiler & OpenStreetMap contributors',
    });

    const dark = L.tileLayer('https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=2sxrVeV47fFEDxOxOeGS', {
      attribution: '&copy; MapTiler & OpenStreetMap contributors',
    });

    // Set the default map layer
    streets.addTo(this._map);

    // Add control for map layers
    L.control.layers({
      "Streets": streets,
      "Satellite": satellite,
      "Dark Mode": dark
    }).addTo(this._map);

    const latLngs = [];

    stories.forEach((story) => {
      const storyItem = document.createElement('article');
      storyItem.classList.add('story-item', 'fade-in');
      storyItem.setAttribute('role', 'listitem');
      storyItem.setAttribute('tabindex', '0');
      storyItem.setAttribute('aria-label', `Cerita oleh ${story.name}`);

      storyItem.innerHTML = `
        <header class="story-header" style="display: flex; align-items: center; gap: 8px;">
          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(story.name)}"
               alt="Avatar ${story.name}" width="40" height="40" style="border-radius: 50%;" />
          <span class="username" style="font-weight: bold;">${story.name}</span>
        </header>

        <div class="story-image" style="margin-top: 8px;">
          <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" loading="lazy"
               style="width: 100%; border-radius: 8px;" />
        </div>

        <div class="story-caption" style="margin-top: 10px; word-break: break-word;">
          <p><strong>Nama:</strong> ${story.name}</p>
          <p><strong>Deskripsi:</strong> ${story.description}</p>
          <p><strong>Tanggal:</strong> ${new Date(story.createdAt).toLocaleDateString('id-ID')}</p>
          <div style="margin-top: 10px;">
            <button class="detail-button" data-id="${story.id}" aria-label="Lihat detail cerita dari ${story.name}">
              Lihat Detail
            </button>
          </div>
        </div>
      `;

      storyList.appendChild(storyItem);

      if (typeof story.lat === 'number' && typeof story.lon === 'number') {
        const marker = L.marker([story.lat, story.lon]).addTo(this._map);
        marker.bindPopup(`<strong>${story.name}</strong><br/>${story.description}`).openPopup();
        setTimeout(() => marker.closePopup(), 1500);
        latLngs.push([story.lat, story.lon]);
      }
    });

    // Hide loading indicator after stories are loaded
    loadingIndicator.style.display = 'none';

    // Fit map to the bounds of the markers
    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      this._map.fitBounds(bounds);
    }
  }
};

export default StoryView;
