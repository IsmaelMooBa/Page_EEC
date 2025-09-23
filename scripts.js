// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carousel functionality
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

    if (images.length > 0) {
        showImage(current);
        setInterval(nextImage, 5000); // Cambia a 5 segundos
    }

    // Funcionalidad para el menú desplegable
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
    
    // Mostrar el menú adecuado según el tamaño de pantalla
    function checkScreenSize() {
        const inicioMenu = document.querySelector('.inicio-menu');
        const dropdown = document.querySelector('.dropdown');
        
        if (window.innerWidth >= 768) {
            // Pantallas grandes: mostrar menú horizontal
            if (inicioMenu) inicioMenu.style.display = 'flex';
            if (dropdown) dropdown.style.display = 'none';
        } else {
            // Pantallas pequeñas: mostrar menú desplegable
            if (inicioMenu) inicioMenu.style.display = 'none';
            if (dropdown) dropdown.style.display = 'inline-block';
        }
    }
    
    // Verificar el tamaño de pantalla al cargar y al redimensionar
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// Función para copiar correo
function copiarCorreo() {
    navigator.clipboard.writeText('easyenglishcool6@gmail.com').then(function() {
        const msg = document.getElementById('copiado-msg');
        if (msg) {
            msg.style.display = 'inline-block';
            setTimeout(() => {
                msg.style.display = 'none';
            }, 1800);
        }
    }).catch(function(err) {
        console.error('Error al copiar texto: ', err);
    });
}

// Función para mostrar el modal único
function mostrarModal(tipo) {
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
        `,
        descuentos: `
          <h2>Descuentos</h2>
          <p>Ofrecemos descuentos especiales para estudiantes, trabajadores de ciertos oficios y promociones por inscripción temprana. Consulta los requisitos y fechas vigentes con nuestro equipo.</p>
          <ul>
            <li>Descuento del 30% para estudiantes con credencial vigente</li>
            <li>Descuento del 15% para trabajadores de servicios públicos</li>
            <li>Promociones especiales por temporada</li>
          </ul>
        `,
        universidades: `
          <h2>Universidades Enlazadas</h2>
          <p>Tenemos convenios con universidades para facilitar el acceso a becas, apoyos y certificaciones. Pregunta por las instituciones participantes y los beneficios disponibles.</p>
          <ul>
            <li>Universidad Politecnica de Tecamac, UPT</li>
          </ul>
        `
    };
    
    const modal = document.getElementById('modal-unico');
    const infoDiv = document.getElementById('modal-info');
    
    if (modal && infoDiv) {
        infoDiv.innerHTML = info[tipo] || '<p>Información no disponible</p>';
        modal.style.display = 'flex';
    }
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal-unico');
    if (modal) modal.style.display = 'none';
}

// Cierra el modal al hacer clic fuera del contenido
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-unico');
    if (modal && e.target === modal) {
        modal.style.display = 'none';
    }
    
    // Eliminar estas líneas si ya no existen los modales antiguos
    const modal1 = document.getElementById('modal-modalidad');
    const modal2 = document.getElementById('modal-beca');
    
    if (modal1 && e.target === modal1) modal1.style.display = 'none';
    if (modal2 && e.target === modal2) modal2.style.display = 'none';
});

// Eliminar estas funciones si ya no se usan (modales antiguos)
/*
function mostrarModalidad(tipo) {
    // Esta función ya no es necesaria
}

function cerrarModalidad() {
    // Esta función ya no es necesaria
}

function mostrarModalidadBeca(tipo) {
    // Esta función ya no es necesaria
}

function cerrarModalidadBeca() {
    // Esta función ya no es necesaria
}
*/