import Swal from 'sweetalert2';
import * as AuthApi from '../api/story.js';
import DetailView from '../views/DetailView.js';
import detailViewTemplate from '../views/templates/detailViewTemplate.js';


class DetailPresenter {
  constructor({ view }) {
    this.view = view;
    this.token = localStorage.getItem('token');

    this.init();
  }

  async init() {
    if (!this.token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login first.',
      });
      window.location.hash = '#/login';
      return;
    }

    const id = this.extractStoryIdFromHash();
    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid URL',
        text: 'Story ID not found in URL.',
      });
      return;
    }

    try {
      const story = await AuthApi.getDetailStory(this.token, id);
      this.view.showDetail(story);
    } catch (error) {
      console.error('Error fetching story detail:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to load story detail: ${error.message}`,
      });
    }
  }

  extractStoryIdFromHash() {
    const parts = window.location.hash.split('/');
    return parts.length > 2 ? parts[2] : null;
  }
}

export default DetailPresenter;
