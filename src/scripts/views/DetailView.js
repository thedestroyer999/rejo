// src/views/DetailView.js
import L from 'leaflet';
import detailViewTemplate from './templates/detailViewTemplate';

const DetailView = {
  _map: null,

  render() {
    return detailViewTemplate;
  },

  showDetail(story) {
    const img = document.getElementById('detail-image');
    img.src = story.photoUrl || 'default.jpg';
    img.alt = story.name || 'Story Image';

    document.getElementById('detail-name').textContent = story.name || 'No name';
    document.getElementById('detail-description').textContent = story.description || 'No description';
    document.getElementById('detail-createdAt').textContent = new Date(story.createdAt).toLocaleString('en-GB');

    if (story.lat !== undefined && story.lon !== undefined) {
      document.getElementById('detail-location').textContent = `${story.lat}, ${story.lon}`;
      this.showMap(story.lat, story.lon);
    } else {
      document.getElementById('detail-location').textContent = 'Unknown';
    }
  },

  showMap(lat, lon) {
    if (this._map) {
      this._map.remove();
      this._map = null;
    }

    this._map = L.map('map').setView([lat, lon], 13);

    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    const satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=2sxrVeV47fFEDxOxOeGS', {
      attribution: '&copy; MapTiler & OpenStreetMap contributors'
    });

    const dark = L.tileLayer('https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=2sxrVeV47fFEDxOxOeGS', {
      attribution: '&copy; MapTiler & OpenStreetMap contributors'
    });

    streets.addTo(this._map);

    L.marker([lat, lon]).addTo(this._map)
      .bindPopup('Location of the Story')
      .openPopup();

    L.control.layers({
      "Streets": streets,
      "Satellite": satellite,
      "Dark Mode": dark
    }).addTo(this._map);
  }
};

export default DetailView;
