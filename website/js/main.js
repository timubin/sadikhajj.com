/**
 * সাদিক হজ্ব ও ওমরাহ সার্ভিস (sadikhajj.com)
 * Interactive 3D Three.js Scene, 3D Card Tilt, Package Filter & WhatsApp Lead Funnel
 */

document.addEventListener("DOMContentLoaded", () => {
  initThreeHeroScene();
  init3DTiltCards();
  initPackageFilters();
  initFaqAccordion();
  initMobileMenu();
  initScrollReveal();
  initBookingModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Three.js Interactive 3D Kaaba-Inspired Geometric Monument
   -------------------------------------------------------------------------- */
function initThreeHeroScene() {
  const container = document.getElementById("hero-3d-container");
  if (!container || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 500;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 1.3, 6.2);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    return; // Graceful fallback if WebGL is disabled
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const goldLight = new THREE.PointLight(0xffd76a, 2.8, 20);
  goldLight.position.set(3.5, 4.5, 4);
  scene.add(goldLight);

  const emeraldRimLight = new THREE.PointLight(0x10b981, 1.8, 18);
  emeraldRimLight.position.set(-4, -2, 3);
  scene.add(emeraldRimLight);

  const topLight = new THREE.DirectionalLight(0xfffbeb, 1.2);
  topLight.position.set(0, 6, 2);
  scene.add(topLight);

  // Main Group
  const monumentGroup = new THREE.Group();
  scene.add(monumentGroup);

  // 1. Marble Pedestal Base (3D Octagonal-like stepped plinth)
  const plinthGeo1 = new THREE.CylinderGeometry(1.75, 1.95, 0.18, 8);
  const marbleMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.25,
    metalness: 0.1,
  });
  const plinth1 = new THREE.Mesh(plinthGeo1, marbleMat);
  plinth1.position.y = -1.05;
  monumentGroup.add(plinth1);

  const plinthGeo2 = new THREE.CylinderGeometry(1.42, 1.55, 0.16, 8);
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.22,
    metalness: 0.85,
    emissive: 0x3a2800,
    emissiveIntensity: 0.2,
  });
  const plinth2 = new THREE.Mesh(plinthGeo2, goldTrimMat);
  plinth2.position.y = -0.89;
  monumentGroup.add(plinth2);

  // 2. Central Kaaba-inspired 3D Cube (Kiswah Obsidian + Gold Calligraphy Band)
  const kaabaGeo = new THREE.BoxGeometry(1.45, 1.65, 1.45);
  const kiswahMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.38,
    metalness: 0.35,
  });
  const kaabaMesh = new THREE.Mesh(kaabaGeo, kiswahMat);
  kaabaMesh.position.y = 0.02;
  monumentGroup.add(kaabaMesh);

  // Golden Hizam (Belt) around upper third
  const hizamGeo = new THREE.BoxGeometry(1.48, 0.22, 1.48);
  const hizamMesh = new THREE.Mesh(hizamGeo, goldTrimMat);
  hizamMesh.position.y = 0.42;
  monumentGroup.add(hizamMesh);

  // Thin upper & lower gold accent lines
  const thinBandGeo = new THREE.BoxGeometry(1.47, 0.04, 1.47);
  const topBand = new THREE.Mesh(thinBandGeo, goldTrimMat);
  topBand.position.y = 0.72;
  monumentGroup.add(topBand);

  const bottomBand = new THREE.Mesh(thinBandGeo, goldTrimMat);
  bottomBand.position.y = -0.68;
  monumentGroup.add(bottomBand);

  // Golden Door (Multazam / Bab al-Kaaba) on front face
  const doorGeo = new THREE.BoxGeometry(0.32, 0.56, 0.04);
  const doorMesh = new THREE.Mesh(doorGeo, goldTrimMat);
  doorMesh.position.set(0.18, -0.15, 0.73);
  monumentGroup.add(doorMesh);

  // 3. Rotating Islamic 8-Pointed Star Halo (Rub el Hizb) behind/around
  const haloGroup = new THREE.Group();
  const squareRingGeo = new THREE.TorusGeometry(2.15, 0.022, 8, 4);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xe5b84b,
    roughness: 0.2,
    metalness: 0.9,
    transparent: true,
    opacity: 0.75,
  });

  const sq1 = new THREE.Mesh(squareRingGeo, ringMat);
  const sq2 = new THREE.Mesh(squareRingGeo, ringMat);
  sq2.rotation.z = Math.PI / 4;
  haloGroup.add(sq1, sq2);
  haloGroup.position.y = 0.15;
  haloGroup.rotation.x = Math.PI / 2.35;
  monumentGroup.add(haloGroup);

  // 4. Floating Golden Light Particles
  const particleCount = 70;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.6 + Math.random() * 1.9;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.4) * 3.2;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xfde68a,
    size: 0.055,
    transparent: true,
    opacity: 0.85,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Mouse parallax tracking
  let targetRotX = 0.12;
  let targetRotY = 0;
  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetRotY = nx * 0.45;
    targetRotX = 0.12 + ny * 0.2;
  });

  // Resize handler
  window.addEventListener("resize", () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });

  // Animation loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    monumentGroup.rotation.y += 0.0045;
    monumentGroup.rotation.x += (targetRotX - monumentGroup.rotation.x) * 0.05;
    monumentGroup.position.y = Math.sin(t * 1.2) * 0.08;

    haloGroup.rotation.z = t * 0.18;
    particles.rotation.y = -t * 0.08 + targetRotY * 0.3;

    renderer.render(scene, camera);
  }
  animate();
}

/* --------------------------------------------------------------------------
   2. 3D Perspective Tilt Effect on Cards
   -------------------------------------------------------------------------- */
function init3DTiltCards() {
  const cards = document.querySelectorAll(".card-3d");
  if (window.matchMedia("(pointer: coarse)").matches) return; // Skip tilt on touch devices

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

/* --------------------------------------------------------------------------
   3. Interactive Package Category Filter
   -------------------------------------------------------------------------- */
function initPackageFilters() {
  const tabs = document.querySelectorAll(".pkg-tab");
  const cards = document.querySelectorAll(".package-item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.filter;
      cards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.classList.remove("hidden");
          card.style.animation = "none";
          card.offsetHeight; // reflow
          card.style.animation = "";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq-trigger");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      items.forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

/* --------------------------------------------------------------------------
   5. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}

/* --------------------------------------------------------------------------
   6. Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. Package Booking Modal & Direct WhatsApp Lead Integration
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById("booking-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  const pkgInput = document.getElementById("modal-package-name");
  const pkgTitle = document.getElementById("modal-package-display");
  const form = document.getElementById("modal-booking-form");

  if (!modal) return;

  document.querySelectorAll("[data-book-package]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pkgName = btn.getAttribute("data-book-package");
      if (pkgInput) pkgInput.value = pkgName;
      if (pkgTitle) pkgTitle.textContent = pkgName;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("modal-user-name").value.trim();
      const phone = document.getElementById("modal-user-phone").value.trim();
      const travelers = document.getElementById("modal-travelers").value.trim();
      const pkg = pkgInput ? pkgInput.value : "ওমরাহ/হজ্ব প্যাকেজ";

      const message = `আসসালামু আলাইকুম সাদিক হজ্ব টিম,\nআমি "${pkg}" সম্পর্কে বুকিং ও বিস্তারিত জানতে চাই।\n\nনাম: ${name}\nমোবাইল: ${phone}\nযাত্রী সংখ্যা: ${travelers} জন`;
      window.open(`https://wa.me/8801979355145?text=${encodeURIComponent(message)}`, "_blank");
      closeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   8. Contact Inquiry Form -> WhatsApp Lead
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("hajj-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const topic = document.getElementById("contact-topic").value;
    const notes = document.getElementById("contact-message").value.trim();

    const message = `আসসালামু আলাইকুম সাদিক হজ্ব টিম,\nবিষয়: ${topic}\nনাম: ${name}\nমোবাইল: ${phone}\nবার্তা: ${notes || "বিস্তারিত জানতে চাই।"}`;
    window.open(`https://wa.me/8801979355145?text=${encodeURIComponent(message)}`, "_blank");
  });
}
