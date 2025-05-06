import Swal from 'sweetalert2';
import AuthApi from '../api/auth.js';
import registerTemplate
 from '../views/templates/registerTemplate.js';
import RegisterView from '../views/RegisterView.js';
class RegisterPresenter {
  constructor({ view }) {
    this.view = view;
    this.init();
  }

  init() {
    this.view.onRegisterSubmit((name, email, password) =>
      this.handleRegister(name, email, password)
    );
  }

  async handleRegister(name, email, password) {
    try {
      await AuthApi.register(name, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You can now log in!',
      });
      window.location.hash = '#/login';
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'An unexpected error occurred. Please try again.',
      });
    }
  }
}

export default RegisterPresenter;
