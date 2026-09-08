/**
 * MOCHI MOCHI — Japanese Matcha & Mochi Café
 * Sticky header shadow, mobile navigation, and subtle scroll-reveal animation.
 */

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

/* モバイルナビの表示位置とアンカーのオフセットを、実測のヘッダー高さに合わせる。 */
function setHeaderHeight(){
  const height = header.getBoundingClientRect().height;
  document.documentElement.style.setProperty("--header-h", `${height}px`);
}

setHeaderHeight();

if ("ResizeObserver" in window){
  new ResizeObserver(setHeaderHeight).observe(header);
} else {
  window.addEventListener("resize", setHeaderHeight);
}

function setHeaderShadow(){
  if (window.scrollY > 8){
    header.style.boxShadow = "0 1px 0 rgba(28,28,26,0.06)";
  } else {
    header.style.boxShadow = "none";
  }
}

setHeaderShadow();
window.addEventListener("scroll", setHeaderShadow, { passive: true });

function setMobileNav(isOpen){
  mainNav.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
}

function closeMobileNav(){
  setMobileNav(false);
}

menuToggle.addEventListener("click", () => {
  setMobileNav(!mainNav.classList.contains("is-open"));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMobileNav);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMobileNav();
});

document.addEventListener("click", event => {
  if (!mainNav.classList.contains("is-open")) return;
  if (mainNav.contains(event.target) || menuToggle.contains(event.target)) return;
  closeMobileNav();
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
