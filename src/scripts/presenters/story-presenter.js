import Swal from 'sweetalert2';
import * as AuthApi from '../api/story.js';

import storyTemplate from '../views/templates/storyTemplate.js';
import StoryView from '../views/StoryView.js';
class StoryPresenter {
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

    try {
      const stories = await AuthApi.getStories(this.token);
      this.view.showStories(stories);
      this.attachDetailButtonListeners();
    } catch (error) {
      console.error('Error loading stories:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Stories',
        text: `Unable to load stories: ${error.message}`,
      });
    }
  }

  attachDetailButtonListeners() {
    const detailButtons = document.querySelectorAll('.detail-button');
    if (!detailButtons.length) return;

    detailButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const id = button.dataset.id;
        if (id) {
          window.location.hash = `#/stories/${id}`;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Story',
            text: 'Story ID not found.',
          });
        }
      });
    });
  }
}

export default StoryPresenter;
