// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => nav.classList.toggle('open'));

// Smooth scroll for on-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      nav.classList.remove('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Simple reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Lightbox
const lbImages = document.querySelectorAll('.lb');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbCap = document.getElementById('lightboxCap');
const lbClose = document.getElementById('lightboxClose');

lbImages.forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = img.dataset.caption || '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

lbClose.addEventListener('click', () => {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox.addEventListener('click', (e) => {
  if (e.target.classList.contains('lightbox-backdrop')) lbClose.click();
});

// Contact form (basic validation + message)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.name?.value && !document.getElementById('name').value.trim()) {
    formMsg.textContent = 'Please enter your name.';
    formMsg.style.color = 'crimson';
    return;
  }
  const email = document.getElementById('email').value.trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formMsg.textContent = 'Please enter a valid email.';
    formMsg.style.color = 'crimson';
    return;
  }
  if (!document.getElementById('message').value.trim()) {
    formMsg.textContent = 'Please enter your message.';
    formMsg.style.color = 'crimson';
    return;
  }
  formMsg.textContent = '✅ Thank you! We will get back to you soon.';
  formMsg.style.color = 'green';
  form.reset();
});
