/* ============================================================
   GigMatch – script.js
   ============================================================ */

'use strict';

/* ============================================================
   1. WORKER DATA
   ============================================================ */
const workers = [
  { id: 1,  name: 'Rajesh Kumar',  skill: 'plumber',     avatar: '🔧', rating: 4.9, jobs: 248, rate: '₹450/hr', location: 'Jaipur, Rajasthan',    tags: ['Pipe Fitting', 'Leak Fix', 'Installation'], available: true  },
  { id: 2,  name: 'Sunil Sharma',  skill: 'electrician', avatar: '⚡', rating: 4.8, jobs: 312, rate: '₹500/hr', location: 'Mumbai, Maharashtra',   tags: ['Wiring', 'Panel Upgrades', 'Lighting'],    available: true  },
  { id: 3,  name: 'Mohan Das',     skill: 'carpenter',   avatar: '🪚', rating: 4.7, jobs: 186, rate: '₹400/hr', location: 'Delhi, NCR',             tags: ['Custom Furniture', 'Flooring', 'Frames'],  available: false },
  { id: 4,  name: 'Anil Verma',    skill: 'painter',     avatar: '🎨', rating: 4.9, jobs: 224, rate: '₹350/hr', location: 'Bangalore, Karnataka',   tags: ['Interior', 'Exterior', 'Waterproofing'],   available: true  },
  { id: 5,  name: 'Deepak Singh',  skill: 'cleaner',     avatar: '🧹', rating: 4.6, jobs: 410, rate: '₹300/hr', location: 'Chennai, Tamil Nadu',    tags: ['Deep Clean', 'Carpet', 'Kitchen'],          available: true  },
  { id: 6,  name: 'Ramesh Yadav',  skill: 'ac repair',   avatar: '❄️', rating: 4.8, jobs: 175, rate: '₹550/hr', location: 'Hyderabad, Telangana',   tags: ['Gas Refill', 'Installation', 'Servicing'], available: true  },
  { id: 7,  name: 'Vikas Patel',   skill: 'plumber',     avatar: '🔧', rating: 4.5, jobs: 134, rate: '₹420/hr', location: 'Ahmedabad, Gujarat',     tags: ['Drainage', 'Water Heater', 'Pipe Repair'], available: false },
  { id: 8,  name: 'Santosh Nair',  skill: 'electrician', avatar: '⚡', rating: 4.9, jobs: 289, rate: '₹480/hr', location: 'Pune, Maharashtra',      tags: ['MCB', 'CCTV Wiring', 'UPS Setup'],         available: true  },
  { id: 9,  name: 'Ganesh Ravi',   skill: 'carpenter',   avatar: '🪚', rating: 4.7, jobs: 201, rate: '₹380/hr', location: 'Kochi, Kerala',          tags: ['Kitchen Cabinets', 'Wardrobes', 'Doors'],  available: true  },
  { id: 10, name: 'Prem Malhotra', skill: 'painter',     avatar: '🎨', rating: 4.8, jobs: 156, rate: '₹370/hr', location: 'Chandigarh, Punjab',     tags: ['Textured Walls', 'Enamel', 'Primer'],      available: true  },
  { id: 11, name: 'Ravi Tiwari',   skill: 'cleaner',     avatar: '🧹', rating: 4.5, jobs: 320, rate: '₹280/hr', location: 'Lucknow, Uttar Pradesh', tags: ['Post Renovation', 'Sofa Clean', 'Glass'],  available: false },
  { id: 12, name: 'Ashok Dubey',   skill: 'ac repair',   avatar: '❄️', rating: 4.7, jobs: 198, rate: '₹520/hr', location: 'Nagpur, Maharashtra',    tags: ['Split AC', 'Window AC', 'Compressor'],     available: true  },
];

const suggestions = [
  { icon: '🔧', text: 'Plumber' },
  { icon: '⚡', text: 'Electrician' },
  { icon: '🪚', text: 'Carpenter' },
  { icon: '🎨', text: 'Painter' },
  { icon: '🧹', text: 'Cleaner' },
  { icon: '❄️', text: 'AC Repair' },
];

/* ============================================================
   2. DOM HELPERS
   ============================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ============================================================
   3. NAVBAR — scroll effect + hamburger
   ============================================================ */
const navbar    = $('navbar');
const hamburger = $('hamburger');
const navLinks  = $('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  $('scrollTop').classList.toggle('show', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ============================================================
   4. SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   5. SEARCH BAR
   ============================================================ */
const searchInput    = $('searchInput');
const suggestionsBox = $('searchSuggestions');

searchInput.addEventListener('input', () => {
  const val = searchInput.value.toLowerCase().trim();
  if (!val) { suggestionsBox.classList.remove('show'); return; }

  const matches = suggestions.filter(s => s.text.toLowerCase().includes(val));
  if (!matches.length) { suggestionsBox.classList.remove('show'); return; }

  suggestionsBox.innerHTML = matches.map(s =>
    `<div class="suggestion-item" onclick="selectSuggestion('${s.text}')">
       <span>${s.icon}</span><span>${s.text}</span>
     </div>`
  ).join('');
  suggestionsBox.classList.add('show');
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-bar')) suggestionsBox.classList.remove('show');
});

window.selectSuggestion = text => {
  searchInput.value = text;
  suggestionsBox.classList.remove('show');
  performSearch();
};

window.performSearch = () => {
  const val = searchInput.value.toLowerCase().trim();
  if (!val) { showToast('Please enter a service to search', 'error'); return; }
  suggestionsBox.classList.remove('show');
  document.querySelector('#workers').scrollIntoView({ behavior: 'smooth' });
  filterWorkers(val, null);
  showToast(`Showing results for "${searchInput.value}"`);
};

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

/* ============================================================
   6. WORKERS — render + filter
   ============================================================ */
function renderWorkers(list) {
  const grid = $('workersGrid');
  if (!list.length) {
    grid.innerHTML = `
      <div class="no-workers-msg">
        <span>😔</span>
        No workers found for that service right now.<br>Try a different category!
      </div>`;
    return;
  }

  grid.innerHTML = list.map((w, i) => `
    <div class="worker-card reveal" style="transition-delay:${(i % 3) * 0.08}s">
      <div class="wc-top">
        <div class="wc-avatar">${w.avatar}</div>
        <div>
          <div class="wc-name">${w.name}</div>
          <div class="wc-skill">${capitalize(w.skill)}</div>
          <div class="wc-location">📍 ${w.location}</div>
        </div>
        <div class="wc-avail ${w.available ? 'avail-yes' : 'avail-no'}">
          ${w.available ? 'Available' : 'Busy'}
        </div>
      </div>
      <div class="wc-rating-row">
        <div>
          <span class="wc-stars">${getStars(w.rating)}</span>
          <span style="font-size:.82rem;font-weight:700;color:#374151;margin-left:4px;">${w.rating}</span>
        </div>
        <span class="wc-jobs">${w.jobs} jobs done</span>
        <span class="wc-rate">${w.rate}</span>
      </div>
      <div class="wc-tags">
        ${w.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <button class="wc-hire-btn" onclick="hireWorker('${w.name}', '${w.skill}', ${w.available})">
        ${w.available ? 'Hire Now →' : 'Join Waitlist'}
      </button>
    </div>
  `).join('');

  setTimeout(observeReveal, 50);
}

window.filterWorkers = (category, btn) => {
  if (btn) {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  } else {
    $$('.filter-btn').forEach(b => {
      b.classList.remove('active');
      if (b.textContent.trim().toLowerCase() === category.toLowerCase()) {
        b.classList.add('active');
      }
    });
  }
  const filtered = category === 'all'
    ? workers
    : workers.filter(w => w.skill.includes(category.toLowerCase()));
  renderWorkers(filtered);
};

window.filterByService = category => {
  document.querySelector('#workers').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => filterWorkers(category, null), 400);
};

window.hireWorker = (name, skill, available) => {
  if (!available) {
    showToast(`Added to ${name}'s waitlist! We'll notify you when they're free.`);
    return;
  }
  openModal('hire', { name, skill });
};

/* ============================================================
   7. TESTIMONIAL SLIDER
   ============================================================ */
const sliderEl = $('testimonialSlider');
const prevBtn  = $('prevBtn');
const nextBtn  = $('nextBtn');
const dotsWrap = $('sliderDots');

let current = 0;
let autoplay;

const cards = () => sliderEl.querySelectorAll('.testimonial-card');

function buildDots() {
  dotsWrap.innerHTML = '';
  cards().forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Go to slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
}

function goTo(idx) {
  const total = cards().length;
  current = (idx + total) % total;
  sliderEl.style.transform  = `translateX(calc(-${current * 100}% - ${current * 24}px))`;
  sliderEl.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function startAutoplay() { autoplay = setInterval(() => goTo(current + 1), 4500); }
function stopAutoplay()  { clearInterval(autoplay); }

prevBtn.addEventListener('click', () => { stopAutoplay(); goTo(current - 1); startAutoplay(); });
nextBtn.addEventListener('click', () => { stopAutoplay(); goTo(current + 1); startAutoplay(); });

let touchStartX = 0;
sliderEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
sliderEl.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { stopAutoplay(); goTo(diff > 0 ? current + 1 : current - 1); startAutoplay(); }
});

/* ============================================================
   8. MODAL
   ============================================================ */
const modalOverlay = $('modalOverlay');
const modalContent = $('modalContent');

window.openModal = (type, data = {}) => {
  let html = '';

  if (type === 'login') {
    html = `
      <div class="modal-title">Welcome Back 👋</div>
      <p class="modal-sub">Sign in to your GigMatch account</p>
      <div class="modal-form">
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button class="btn-primary btn-full" style="margin-top:4px;" onclick="fakeAuth('login')">Sign In →</button>
        <p style="text-align:center;margin-top:16px;font-size:.85rem;color:var(--gray-500)">
          Don't have an account?
          <a href="#" style="color:var(--blue-500);font-weight:600" onclick="openModal('signup')">Sign Up</a>
        </p>
      </div>`;

  } else if (type === 'signup') {
    html = `
      <div class="modal-title">Join GigMatch 🚀</div>
      <p class="modal-sub">Create your free account today</p>
      <div class="modal-form">
        <div class="form-group"><label>Full Name</label><input type="text" placeholder="Rahul Gupta" /></div>
        <div class="form-group"><label>Email Address</label><input type="email" placeholder="you@example.com" /></div>
        <div class="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" /></div>
        <div class="form-group"><label>Password</label><input type="password" placeholder="Create a password" /></div>
        <button class="btn-primary btn-full" style="margin-top:4px;" onclick="fakeAuth('signup')">Create Account →</button>
        <p style="text-align:center;margin-top:16px;font-size:.85rem;color:var(--gray-500)">
          Already have an account?
          <a href="#" style="color:var(--blue-500);font-weight:600" onclick="openModal('login')">Sign In</a>
        </p>
      </div>`;

  } else if (type === 'worker') {
    html = `
      <div class="modal-title">Join as Worker 👷</div>
      <p class="modal-sub">Start earning with GigMatch — it's free to join!</p>
      <div class="modal-form">
        <div class="form-group"><label>Full Name</label><input type="text" placeholder="Your name" /></div>
        <div class="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" /></div>
        <div class="form-group">
          <label>Your Skill</label>
          <select style="padding:12px 16px;background:var(--white);border:1.5px solid #E5E7EB;border-radius:var(--radius-md);font-size:.9rem;color:var(--gray-900);outline:none;width:100%;">
            <option value="">Select your trade</option>
            <option>Plumber</option><option>Electrician</option><option>Carpenter</option>
            <option>Painter</option><option>Cleaner</option><option>AC Repair Technician</option>
          </select>
        </div>
        <div class="form-group"><label>City</label><input type="text" placeholder="e.g. Jaipur" /></div>
        <button class="btn-primary btn-full" style="margin-top:4px;" onclick="fakeAuth('worker')">Register as Worker →</button>
      </div>`;

  } else if (type === 'hire') {
    html = `
      <div style="text-align:center;padding:8px 0 20px">
        <div style="font-size:3rem;margin-bottom:12px">🏆</div>
        <div class="modal-title" style="text-align:center">Book ${data.name}</div>
        <p class="modal-sub" style="text-align:center">Expert ${capitalize(data.skill)}</p>
      </div>
      <div class="modal-form">
        <div class="form-group"><label>Your Name</label><input type="text" placeholder="Full name" /></div>
        <div class="form-group"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" /></div>
        <div class="form-group"><label>Service Date</label><input type="date" min="${new Date().toISOString().split('T')[0]}" /></div>
        <div class="form-group"><label>Your Address</label><input type="text" placeholder="Flat / Street / Area / City" /></div>
        <button class="btn-primary btn-full" style="margin-top:4px;" onclick="confirmBooking('${data.name}')">Confirm Booking →</button>
      </div>`;
  }

  modalContent.innerHTML = html;
  modalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
};

window.closeModal = () => {
  modalOverlay.classList.remove('show');
  document.body.style.overflow = '';
};

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

window.fakeAuth = type => {
  closeModal();
  const messages = {
    login:  '✅ Logged in successfully! Welcome back.',
    signup: '🎉 Account created! Welcome to GigMatch.',
    worker: '🚀 Registered! Our team will review your profile.',
  };
  showToast(messages[type] || 'Success!', 'success');
};

window.confirmBooking = name => {
  closeModal();
  showToast(`🎉 Booking confirmed with ${name}! They'll contact you shortly.`, 'success');
};

/* ============================================================
   9. CONTACT FORM
   ============================================================ */
window.handleContactSubmit = e => {
  e.preventDefault();
  showToast("✅ Message sent! We'll get back to you within 24 hours.", 'success');
  e.target.reset();
};

/* ============================================================
   10. TOAST NOTIFICATIONS
   ============================================================ */
let toastTimer;
window.showToast = (msg, type = '') => {
  const toast = $('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3800);
};

/* ============================================================
   11. SCROLL REVEAL
   ============================================================ */
function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => observer.observe(el));
}

function addRevealClasses() {
  ['.service-card', '.step-card', '.feature-card', '.ci-item', '.section-header', '.contact-form']
    .forEach(sel => {
      $$(sel).forEach((el, i) => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
          el.classList.add(`reveal-delay-${(i % 4) + 1}`);
        }
      });
    });
}

/* ============================================================
   12. SCROLL TO TOP
   ============================================================ */
window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ============================================================
   13. UTILITIES
   ============================================================ */
function capitalize(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
function getStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/* ============================================================
   14. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderWorkers(workers);
  buildDots();
  startAutoplay();
  addRevealClasses();
  observeReveal();

  // Active nav highlight on scroll
  const sectionIds = ['hero', 'services', 'how-it-works', 'workers', 'contact'];
  const navLinkEls = $$('.nav-link');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.classList.toggle('nav-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sectionIds.forEach(id => {
    const el = $(id);
    if (el) sectionObserver.observe(el);
  });
});