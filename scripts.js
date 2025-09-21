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
  function mostrarModalidad(tipo) {
    const info = {
      ninos: `
        <h2>Modalidad Niños</h2>
        <p>Clases lúdicas, juegos, canciones y actividades interactivas para que los niños aprendan inglés de forma divertida y natural.</p>
        <ul>
          <li>Grupos reducidos y atención personalizada</li>
          <li>Material didáctico digital y físico</li>
          <li>Horarios flexibles entre semana y fines de semana</li>
          <li>Evaluaciones periódicas y retroalimentación a padres</li>
        </ul>
      `,
      jovenes: `
        <h2>Modalidad Jóvenes</h2>
        <p>Enfoque en inglés escolar, conversación, comprensión lectora y preparación para exámenes oficiales.</p>
        <ul>
          <li>Clases dinámicas y participación activa</li>
          <li>Preparación para certificaciones Cambridge</li>
          <li>Proyectos y actividades extracurriculares</li>
          <li>Grupos por nivel y edad</li>
        </ul>
      `,
      adultos: `
        <h2>Modalidad Adultos</h2>
        <p>Programas personalizados para el trabajo, viajes o metas personales.</p>
        <ul>
          <li>Clases prácticas y enfoque comunicativo</li>
          <li>Horarios flexibles y modalidad presencial/online</li>
          <li>Atención individualizada</li>
          <li>Material actualizado y adaptado a tus objetivos</li>
        </ul>
      `
    };
    const modal = document.getElementById('modal-modalidad');
    const infoDiv = document.getElementById('modal-info');
    if (modal && infoDiv) {
      infoDiv.innerHTML = info[tipo] || '';
      modal.style.display = 'flex';
    }
  }

  function cerrarModalidad() {
    const modal = document.getElementById('modal-modalidad');
    if (modal) modal.style.display = 'none';
  }

function mostrarModalidadBeca(tipo) {
  const info = {
    descuentos: `
      <h2>Descuentos</h2>
      <p>Ofrecemos descuentos especiales para estudiantes, trabajadores de ciertos oficios y promociones por inscripción temprana. Consulta los requisitos y fechas vigentes con nuestro equipo.</p>
    `,
    universidades: `
      <h2>Universidades Enlazadas</h2>
      <p>Tenemos convenios con diversas universidades para facilitar el acceso a becas, apoyos y certificaciones. Pregunta por las instituciones participantes y los beneficios disponibles.</p>
    `
  };
  const modal = document.getElementById('modal-beca');
  const infoDiv = document.getElementById('modal-info-beca');
  if (modal && infoDiv) {
    infoDiv.innerHTML = info[tipo] || '';
    modal.style.display = 'flex';
  }
}

function cerrarModalidadBeca() {
  const modal = document.getElementById('modal-beca');
  if (modal) modal.style.display = 'none';
}

// Cierra el modal al hacer clic fuera del contenido
window.addEventListener('click', function(e) {
  const modal1 = document.getElementById('modal-modalidad');
  const modal2 = document.getElementById('modal-beca');
  if (modal1 && e.target === modal1) modal1.style.display = 'none';
  if (modal2 && e.target === modal2) modal2.style.display = 'none';
});