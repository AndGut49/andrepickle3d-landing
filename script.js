/* ⚙️ AndrePickle 3D - Script Interactivo Principal */

document.addEventListener("DOMContentLoaded", () => {
  // Inicialización de funciones
  initGalleryFilters();
  initQuoteForm();
  initScrollHighlighting();
  initInteractiveHeroCube();
});

/* ----------------------------------------------------
   1. FILTROS DINÁMICOS DE LA GALERÍA
------------------------------------------------------- */
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // 1. Quitar clase active de todos los botones y añadirla al actual
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      const filterValue = button.getAttribute("data-filter");

      // 2. Filtrar las tarjetas de producto
      productCards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          // Mostrar tarjeta con animación suave
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          // Ocultar tarjeta con animación suave
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300); // Duración de la transición en CSS (var(--transition-normal))
        }
      });
    });
  });
}

/* ----------------------------------------------------
   2. FORMULARIO DE COTIZACIÓN (SIMULACIÓN DE ENVÍO)
------------------------------------------------------- */
function initQuoteForm() {
  const form = document.getElementById("quote-form");
  const successMessage = document.getElementById("submit-success-message");
  const submitButton = document.getElementById("btn-submit-quote");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Desactivar el botón para evitar doble clic
    submitButton.disabled = true;
    submitButton.textContent = "Procesando...";

    // Obtener valores para simulación
    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;
    const category = document.getElementById("form-category").value;
    const message = document.getElementById("form-message").value;

    // Simular retraso de red (1.5 segundos)
    setTimeout(() => {
      // Mostrar mensaje de éxito
      successMessage.style.display = "block";
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

      // Limpiar formulario
      form.reset();

      // Restaurar botón
      submitButton.disabled = false;
      submitButton.textContent = "Enviar Solicitud";

      // Ocultar el mensaje después de 8 segundos
      setTimeout(() => {
        successMessage.style.opacity = "0";
        setTimeout(() => {
          successMessage.style.display = "none";
          successMessage.style.opacity = "1"; // restaurar opacidad para próxima vez
        }, 400);
      }, 8000);
    }, 1500);
  });
}

/* ----------------------------------------------------
   3. SEGUIMIENTO DE SECCIONES ACTIVAS (NAV SCROLL HIGHLIGHT)
------------------------------------------------------- */
function initScrollHighlighting() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120; // Compensar altura del header pegajoso

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ----------------------------------------------------
   4. INTERACTIVIDAD PARALLAX LEVE EN EL HERO CUBE
------------------------------------------------------- */
function initInteractiveHeroCube() {
  const visualBlock = document.getElementById("hero-visual-block");
  const cubeLogo = document.getElementById("hero-cube-logo");

  if (!visualBlock || !cubeLogo) return;

  // React al movimiento del mouse dentro del área del Hero
  visualBlock.addEventListener("mousemove", (e) => {
    const rect = visualBlock.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Calcular rotación leve basado en coordenadas del cursor (rango de -15 a 15 grados)
    const rotateX = -y / 12;
    const rotateY = x / 12;

    // Aplicar transformación sutil
    cubeLogo.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Restaurar posición cuando el mouse sale
  visualBlock.addEventListener("mouseleave", () => {
    cubeLogo.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    // Reactivar rotación continua CSS
    cubeLogo.style.transition = "transform 0.8s ease";
    setTimeout(() => {
      cubeLogo.style.transition = "";
    }, 800);
  });
}
