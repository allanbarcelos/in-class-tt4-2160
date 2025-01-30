import './../scss/contact.scss';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactform');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Success!');
      })
    }
  });