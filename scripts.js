// scripts.js - Código optimizado y corregido
document.addEventListener('DOMContentLoaded', function() {
    // ===== CONFIGURACIÓN INICIAL =====
    let currentImage = 0;
    let carouselInterval;

    // ===== FUNCIONES DE UTILIDAD =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
        document.querySelectorAll('nav a[href^="#"], .inicio-menu a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    // Cerrar menús abiertos
                    closeAllDropdowns();
                    closeMobileMenu();
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== CARRUSEL =====
    function initCarousel() {
        const carouselImages = document.querySelectorAll('.carousel-images img');
        
        function showImage(index) {
            carouselImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        function nextImage() {
            if (carouselImages.length > 0) {
                currentImage = (currentImage + 1) % carouselImages.length;
                showImage(currentImage);
            }
        }

        if (carouselImages.length > 0) {
            showImage(currentImage);
            // Limpiar intervalo existente antes de crear uno nuevo
            if (carouselInterval) clearInterval(carouselInterval);
            carouselInterval = setInterval(nextImage, 5000);
            
            // Pausar carrusel al hacer hover
            const carousel = document.querySelector('.carousel-images');
            if (carousel) {
                carousel.addEventListener('mouseenter', () => {
                    if (carouselInterval) clearInterval(carouselInterval);
                });
                
                carousel.addEventListener('mouseleave', () => {
                    if (carouselImages.length > 0) {
                        carouselInterval = setInterval(nextImage, 5000);
                    }
                });
            }
        }
    }

    // ===== DROPDOWNS =====
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isShowing = dropdown.classList.contains('show');
                    
                    // Cerrar otros dropdowns
                    closeAllDropdowns();
                    
                    // Abrir/cerrar el actual
                    if (!isShowing) {
                        dropdown.classList.add('show');
                    }
                });
            }
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                closeAllDropdowns();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllDropdowns();
            }
        });
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    // ===== MENÚ MÓVIL =====
    function initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const dropdownToggle = document.getElementById('dropdownToggle');
        const dropdownMenu = document.getElementById('dropdownMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
            });
        }
        
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('active');
            });
        }

        // Cerrar menús al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (navMenu && !e.target.closest('nav')) {
                navMenu.classList.remove('active');
            }
            
            if (dropdownMenu && !e.target.closest('.dropdown')) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // ===== RESPONSIVE MENU HANDLING =====
    function handleResponsiveMenu() {
        const inicioMenu = document.querySelector('.inicio-menu');
        const dropdown = document.querySelector('.dropdown');
        
        if (window.innerWidth >= 768) {
            // Desktop
            if (inicioMenu) {
                inicioMenu.style.display = 'flex';
            }
            if (dropdown) {
                dropdown.style.display = 'none';
            }
            closeMobileMenu();
        } else {
            // Mobile
            if (inicioMenu) {
                inicioMenu.style.display = 'none';
            }
            if (dropdown) {
                dropdown.style.display = 'block';
            }
        }
    }

    function closeMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) navMenu.classList.remove('active');
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
        
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
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
    }

    // ===== NAVBAR SCROLL EFFECT =====
    function initNavbarScroll() {
        const nav = document.querySelector('nav');
        
        if (nav) {
            window.addEventListener('scroll', debounce(function() {
                if (window.scrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }, 10));
        }
    }

    // ===== HOVER EFFECTS =====
    function initHoverEffects() {
        // Efectos para tarjetas
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Efectos para elementos de lista
        const listItems = document.querySelectorAll('.card li, .values-list li');
        listItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // Efectos para botones sociales
        const socialBtns = document.querySelectorAll('.social-btn');
        socialBtns.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Efectos para badges
        const badges = document.querySelectorAll('.modalidad-badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // ===== INICIALIZACIÓN DE ANIMACIONES =====
    function initInicioAnimations() {
        const inicioElements = document.querySelectorAll('.inicio-titulo, .inicio-desc, .inicio-texto');
        inicioElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // ===== INICIALIZACIÓN PRINCIPAL =====
    function init() {
        initSmoothScrolling();
        initCarousel();
        initDropdowns();
        initMobileMenu();
        initScrollAnimations();
        initNavbarScroll();
        initHoverEffects();
        initInicioAnimations();
        
        // Manejo responsive inicial
        handleResponsiveMenu();
        
        // Event listeners para resize
        window.addEventListener('resize', debounce(function() {
            handleResponsiveMenu();
            // Reiniciar carrusel si es necesario
            initCarousel();
        }, 250));
    }

    // Ejecutar inicialización
    init();
});

// ===== FUNCIONES GLOBALES =====

// Función para copiar correo
function copiarCorreo() {
    const email = 'easyenglishcool6@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function() {
            mostrarMensajeCopiado();
        }).catch(function(err) {
            fallbackCopyEmail(email);
        });
    } else {
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

// Función para mostrar el modal
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
                <li><strong>Descuento :</strong> Estudiantes con credencial vigente</li>
                <li><strong>Descuento:</strong> Trabajadores de servicios públicos</li>
                <li><strong>Promociones por temporada:</strong> Consulta fechas vigentes</li>
                <li><strong>Descuento por referido:</strong> 10% por cada amigo que se inscriba</li>
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

// Event listeners globales para el modal
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
});

// ===== CLEANUP ON UNLOAD =====
window.addEventListener('beforeunload', function() {
    // Limpiar intervalos si existen
    if (typeof carouselInterval !== 'undefined') {
        clearInterval(carouselInterval);
    }
});