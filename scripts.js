// scripts.js
// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.carousel-images img');
  let current = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  showImage(current);
  setInterval(nextImage, 5000); // Cambia a 5 segundos
});

function copiarCorreo() {
  navigator.clipboard.writeText('easyenglishcool6@gmail.com').then(function() {
    const msg = document.getElementById('copiado-msg');
    msg.style.display = 'inline-block';
    setTimeout(() => {
      msg.style.display = 'none';
    }, 1800);
  });
}