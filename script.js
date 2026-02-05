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
