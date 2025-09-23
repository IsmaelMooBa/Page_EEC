// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Cerrar menú dropdown si está abierto
                const dropdown = document.querySelector('.dropdown');
                if (dropdown && dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Carousel functionality (solo si existe el carousel)
    const carouselImages = document.querySelectorAll('.carousel-images img');
    let currentImage = 0;

    function showImage(index) {
        carouselImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    function nextImage() {
        currentImage = (currentImage + 1) % carouselImages.length;
        showImage(currentImage);
    }

    if (carouselImages.length > 0) {
        showImage(currentImage);
        setInterval(nextImage, 5000);
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
            if (inicioMenu) {
                inicioMenu.style.display = 'flex';
                inicioMenu.style.opacity = '1';
            }
            if (dropdown) dropdown.style.display = 'none';
        } else {
            // Pantallas pequeñas: mostrar menú desplegable
            if (inicioMenu) {
                inicioMenu.style.display = 'none';
                inicioMenu.style.opacity = '0';
            }
            if (dropdown) dropdown.style.display = 'inline-block';
        }
    }
    
    // Verificar el tamaño de pantalla al cargar y al redimensionar
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Animación al hacer scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Opcional: dejar de observar después de animar para mejor rendimiento
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Dropdown menu functionality para múltiples dropdowns
    const dropdownToggleElements = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggleElements.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const parentDropdown = this.closest('.dropdown');
            if (parentDropdown) {
                // Cerrar otros dropdowns abiertos
                document.querySelectorAll('.dropdown').forEach(drop => {
                    if (drop !== parentDropdown) {
                        drop.classList.remove('show');
                    }
                });
                parentDropdown.classList.toggle('show');
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-toggle') && !event.target.closest('.dropdown-toggle')) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // Efectos hover mejorados para tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Efecto para los elementos de lista en las tarjetas
    const cardListItems = document.querySelectorAll('.card li, .values-list li');
    cardListItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Inicializar animaciones de la sección inicio
    const inicioElements = document.querySelectorAll('.inicio-titulo, .inicio-desc, .inicio-texto, .inicio-menu');
    inicioElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Función para copiar correo
function copiarCorreo() {
    const email = 'easyenglishcool6@gmail.com';
    
    // Método moderno con Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function() {
            mostrarMensajeCopiado();
        }).catch(function(err) {
            fallbackCopyEmail(email);
        });
    } else {
        // Fallback para navegadores más antiguos o HTTP
        fallbackCopyEmail(email);
    }
}

function mostrarMensajeCopiado() {
    let msg = document.getElementById('copiado-msg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'copiado-msg';
        msg.textContent = '✓ Correo copiado al portapapeles';
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 10000;
            display: none;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(msg);
    }
    
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 1800);
}

function fallbackCopyEmail(email) {
    // Método fallback para copiar texto
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            mostrarMensajeCopiado();
        } else {
            alert('No se pudo copiar el correo automáticamente. Por favor, cópialo manualmente: ' + email);
        }
    } catch (err) {
        document.body.removeChild(textArea);
        alert('No se pudo copiar el correo. Por favor, cópialo manualmente: ' + email);
    }
}

// Función para mostrar el modal único
function mostrarModal(tipo) {
    const info = {
        ninos: `
            <h2>Curso para Niños (7-12 años)</h2>
            <p>Clases lúdicas, juegos, canciones y actividades interactivas para que los niños aprendan inglés de forma divertida y natural.</p>
            <ul>
                <li>Grupos reducidos y atención personalizada</li>
                <li>Material didáctico digital y físico</li>
                <li>Horarios flexibles entre semana y fines de semana</li>
                <li>Evaluaciones periódicas y retroalimentación a padres</li>
                <li>Método de inmersión gradual y natural</li>
            </ul>
        `,
        jovenes: `
            <h2>Curso para Jóvenes (13-17 años)</h2>
            <p>Enfoque en inglés escolar, conversación, comprensión lectora y preparación para exámenes oficiales.</p>
            <ul>
                <li>Clases dinámicas y participación activa</li>
                <li>Preparación para certificaciones Cambridge</li>
                <li>Proyectos y actividades extracurriculares</li>
                <li>Grupos por nivel y edad</li>
                <li>Tutorías personalizadas</li>
            </ul>
        `,
        adultos: `
            <h2>Curso para Adultos (18+ años)</h2>
            <p>Programas personalizados para el trabajo, viajes o metas personales.</p>
            <ul>
                <li>Clases prácticas y enfoque comunicativo</li>
                <li>Horarios flexibles y modalidad presencial/online</li>
                <li>Atención individualizada</li>
                <li>Material actualizado y adaptado a tus objetivos</li>
                <li>Preparación para entrevistas laborales</li>
            </ul>
        `,
        descuentos: `
            <h2>Descuentos y Promociones</h2>
            <p>Ofrecemos descuentos especiales para hacer tu educación más accesible.</p>
            <ul>
                <li><strong>30% de descuento:</strong> Estudiantes con credencial vigente</li>
                <li><strong>15% de descuento:</strong> Trabajadores de servicios públicos</li>
                <li><strong>Promociones por temporada:</strong> Consulta fechas vigentes</li>
                <li><strong>Descuento por referido:</strong> 10% por cada amigo que se inscriba</li>
                <li><strong>Pago anticipado:</strong> 5% de descuento en pagos semestrales</li>
            </ul>
        `,
        universidades: `
            <h2>Universidades con Convenio</h2>
            <p>Tenemos convenios con instituciones educativas para facilitar el acceso a beneficios especiales.</p>
            <ul>
                <li><strong>Universidad Politécnica de Tecámac (UPT)</strong></li>
            </ul>
        `
    };
    
    const modal = document.getElementById('modal-unico');
    const infoDiv = document.getElementById('modal-info');
    
    if (modal && infoDiv) {
        infoDiv.innerHTML = info[tipo] || '<p>Información no disponible en este momento. Por favor, contacta a nuestro equipo.</p>';
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Agregar clase para animación
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal-unico');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Cierra el modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal-unico');
    if (modal && e.target === modal) {
        cerrarModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// Prevenir que el modal se cierre al hacer clic dentro del contenido
document.addEventListener('click', function(e) {
    const modalContent = document.querySelector('.modal-contenido');
    if (modalContent && modalContent.contains(e.target)) {
        e.stopPropagation();
    }
});

// Efectos interactivos adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Efecto hover para botones sociales
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto para los badges de modalidad
    const badges = document.querySelectorAll('.modalidad-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});