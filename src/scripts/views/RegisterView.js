// src/views/RegisterView.js
import registerTemplate from "./templates/registerTemplate";

const RegisterView = {
  render() {
    return registerTemplate;
  },

  onRegisterSubmit(callback) {
    setTimeout(() => {
      const form = document.querySelector('#register-form');
      if (!form) return;

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value.trim();
        callback(name, email, password);
      });
    }, 0);
  }
};

export default RegisterView;
