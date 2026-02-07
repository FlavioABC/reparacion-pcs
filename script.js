document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.querySelector(".page-overlay");

  // Siempre iniciar limpio
  overlay.classList.remove("active");

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      const esPaginaInterna =
        href &&
        !href.startsWith("#") &&
        !href.includes("wa.me") &&
        (
            href.includes("index.html") ||
            href.includes("acercaDe.html") ||
            href.includes("certificaciones.html")
        );


      if (esPaginaInterna) {
        e.preventDefault();

        // Activa blur suave
        overlay.classList.add("active");

        // Cambia de página cuando el blur ya está visible
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });
});

document.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  const menu = document.querySelector(".menu");
  const icons = document.querySelectorAll(".social-float");

  const footerRect = footer.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const margenAbajo = 15;   // espacio sobre el footer
  const margenArriba = 15;  // espacio bajo el menu

  // Guardamos la posición BASE de CADA icono solo UNA VEZ
  icons.forEach(icon => {
    if (!icon.dataset.baseBottom) {
      const style = window.getComputedStyle(icon);
      icon.dataset.baseBottom = parseInt(style.bottom, 10);
    }
  });

  // 1) Si el footer entra en pantalla → calculamos UNA sola subida
  if (footerRect.top < windowHeight) {
    const desplazamiento = windowHeight - footerRect.top + margenAbajo;

    icons.forEach(icon => {
      const base = parseInt(icon.dataset.baseBottom, 10);
      icon.style.bottom = (base + desplazamiento) + "px";
    });

  } 
  // 2) Si estamos muy arriba y chocamos con el menu → bajamos TODOS por igual
  else if (menuRect.bottom > 0) {
    const desplazamiento = margenArriba;

    icons.forEach(icon => {
      const base = parseInt(icon.dataset.baseBottom, 10);
      icon.style.bottom = (base - desplazamiento) + "px";
    });

  } 
  // 3) Estado normal → vuelven a su posición original
  else {
    icons.forEach(icon => {
      icon.style.bottom = icon.dataset.baseBottom + "px";
    });
  }
});





