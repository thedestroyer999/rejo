import Swal from 'sweetalert2';
import AuthApi from '../api/auth.js';
import loginTemplate from '../views/templates/loginTemplate.js';
import LoginView from '../views/Loginview.js';

class LoginPresenter {
  constructor({ view }) {
    this.view = view;
    this.init();
  }

  init() {
    this.view.onLoginSubmit(this.handleLogin.bind(this));
  }

  async handleLogin(email, password) {
    try {
      const result = await AuthApi.login(email, password); // result.token diasumsikan dari loginResult
      localStorage.setItem('token', result.token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You are now logged in!',
        timer: 2000,
        showConfirmButton: false,
      });

      window.location.hash = '#/stories'; // Ganti ke rute utama SPA-mu
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'An error occurred during login.',
      });
    }
  }
}

export default LoginPresenter;
