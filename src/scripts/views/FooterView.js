// src/views/FooterView.js
import footerTemplate from './templates/footerTemplate.js';
class FooterView {
  constructor() {
    this.footerElement = document.createElement('footer');
    this.footerElement.classList.add('footer');
    this.footerElement.setAttribute('id', 'footer-content');
    this.footerElement.setAttribute('tabindex', '-1');
  }

  render() {
    this.footerElement.innerHTML = footerTemplate;
    return this.footerElement;
  }
}

export default FooterView;
