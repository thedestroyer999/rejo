import logo from '../../assets/images/logo.jpg';
import loginTemplate from '../views/templates/loginTemplate.js';

const LoginView = {
  render() {
    return loginTemplate(logo); // perbaikan di sini
  },

  onLoginSubmit(callback) {
    setTimeout(() => {
      const form = document.querySelector('#login-form');
      if (!form) return;

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value.trim();
        callback(email, password);
      });
    }, 0);
  }
};

export default LoginView;
