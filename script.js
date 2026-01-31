// ===== Mobile menu =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function toggleMenu(force) {
  const isOpen = force ?? !mobileMenu.classList.contains("show");
  mobileMenu.classList.toggle("show", isOpen);
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  hamburger.setAttribute("aria-expanded", String(isOpen));
}
if (hamburger) hamburger.addEventListener("click", () => toggleMenu());
if (mobileMenu) {
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => toggleMenu(false));
  });
}

// ===== Reveal on scroll =====
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

// ===== Slider =====
const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsWrap = document.getElementById("dots");

let idx = 0;
let timer = null;

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot" + (i === idx ? " active" : "");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });
}

function show(i) {
  slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
  idx = i;
  renderDots();
}

function go(i, userAction = false) {
  const next = (i + slides.length) % slides.length;
  show(next);
  if (userAction) restart();
}

function restart() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => go(idx + 1), 4500);
}

if (slides.length) {
  show(0);
  restart();
}

if (prevBtn) prevBtn.addEventListener("click", () => go(idx - 1, true));
if (nextBtn) nextBtn.addEventListener("click", () => go(idx + 1, true));
