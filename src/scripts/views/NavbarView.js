// src/views/NavbarView.js
import logoImg from '../../assets/images/logo.jpg';
import navbarTemplate from './templates/navbarTemplate';

class NavbarView {
  constructor(logoText = '') {
    this.logoText = logoText;
    this.navbarElement = document.createElement('header');
    this.navbarElement.classList.add('navbar');
  }

  render() {
    const isLoggedIn = !!localStorage.getItem('token');
    const userName = localStorage.getItem('userName') || ''; // Ambil nama pengguna dari localStorage
    const userEmail = localStorage.getItem('userEmail') || ''; // Ambil email pengguna dari localStorage
    
    this.navbarElement.innerHTML = navbarTemplate(logoImg, this.logoText, isLoggedIn, userName, userEmail);

    if (isLoggedIn) {
      setTimeout(() => {
        const logoutBtn = this.navbarElement.querySelector('#logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userName'); // Hapus nama pengguna
            localStorage.removeItem('userEmail'); // Hapus email pengguna
            window.location.hash = '/login';
          });
        }
      }, 0);
    }

    return this.navbarElement;
  }
}

export default NavbarView;
