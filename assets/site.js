/* ==========================================================================
   VILLAS PETIT PARADIS — Script principal
   --------------------------------------------------------------------------
   ⚠️  ZONE À MODIFIER : PHOTOS
   Pour remplacer les photos temporaires par vos originaux :
   1. Déposez vos images dans le dossier /images/
   2. Remplacez simplement les URL ci-dessous par "images/mon-fichier.jpg"
   Aucune autre modification n'est nécessaire dans le reste du site.
   ========================================================================== */

const PHOTOS = {
  villa01: [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1MTYwNjE%3D/original/66ff7c3a-b080-4b40-8e73-777f78edef60.jpeg?im_w=1440",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1MTYwNjE%3D/original/28a055dd-10c8-46fe-831f-7b79f2c8087a.jpeg?im_w=1440",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1MTYwNjE%3D/original/30af832b-acd4-4092-8cba-94d648d50ce2.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1MTYwNjE%3D/original/d3469e52-6ea0-46dd-90e6-e940efed1e33.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1MTYwNjE%3D/original/bea6d11d-f455-43c4-ac43-a11a69551fba.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-45516061/original/63d14c49-3d10-47f0-a932-94f5e3e82346.jpeg?im_w=1200"
  ],
  villa02: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-48050382/original/c927b8b3-24b4-42a1-adc8-3148c2d33a57.jpeg?im_w=1440",
    "https://a0.muscache.com/im/pictures/9b2682c2-935e-447b-a24a-1b6a01114de3.jpg?im_w=1440",
    "https://a0.muscache.com/im/pictures/dcd23ea1-dcfd-4707-ac9b-c2e42508984e.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-48050382/original/a8cff7a2-6960-4bf1-8fc0-867db01784a8.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/798bb57f-a87e-4b8b-a404-1696c3494336.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/6528d188-77e1-4c05-99ad-ca8446927ab7.jpg?im_w=1200"
  ]
};

/* ---------- Injection des photos ---------- */
document.querySelectorAll("[data-photo]").forEach(el => {
  const [set, idx] = el.dataset.photo.split(":");
  const url = PHOTOS[set] && PHOTOS[set][Number(idx)];
  if (!url) return;
  if (el.tagName === "IMG") { el.src = url; }
  else { el.style.backgroundImage = `url('${url}')`; }
});

/* ---------- Navigation mobile ---------- */
const burger = document.querySelector(".nav__burger");
const links = document.querySelector(".nav__links");
if (burger && links) {
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("is-open");
    burger.classList.remove("is-open");
    document.body.style.overflow = "";
  }));
}

/* ---------- Lightbox galerie ---------- */
const lb = document.querySelector(".lightbox");
if (lb) {
  const lbImg = lb.querySelector("img");
  const lbCount = lb.querySelector(".lightbox__count");
  const items = [...document.querySelectorAll(".gallery__item")];
  const set = document.querySelector(".gallery")?.dataset.set;
  const list = PHOTOS[set] || [];
  let i = 0;

  const show = n => {
    i = (n + list.length) % list.length;
    lbImg.src = list[i];
    if (lbCount) lbCount.textContent = `${i + 1} / ${list.length}`;
  };
  const open = n => { show(n); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; };
  const close = () => { lb.classList.remove("is-open"); document.body.style.overflow = ""; };

  items.forEach((item, n) => item.addEventListener("click", () => open(n)));
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", e => { e.stopPropagation(); show(i - 1); });
  lb.querySelector(".lightbox__nav--next").addEventListener("click", e => { e.stopPropagation(); show(i + 1); });
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
}

/* ---------- Révélation au défilement ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
}, { threshold: .12, rootMargin: "0px 0px -60px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---------- Année automatique dans le pied de page ---------- */
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
