/**
 * MOCHI MOCHI — Japanese Matcha & Mochi Café
 * Sticky header shadow, mobile navigation, and subtle scroll-reveal animation.
 */

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

function setHeaderShadow(){
  if (window.scrollY > 8){
    header.style.boxShadow = "0 1px 0 rgba(28,28,26,0.06)";
  } else {
    header.style.boxShadow = "none";
  }
}

setHeaderShadow();
window.addEventListener("scroll", setHeaderShadow, { passive: true });

function closeMobileNav(){
  mainNav.classList.remove("is-open");
  menuToggle.classList.remove("is-active");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMobileNav(){
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

menuToggle.addEventListener("click", toggleMobileNav);

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMobileNav);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMobileNav();
});

const revealTargets = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window){
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach(target => observer.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add("is-visible"));
}
