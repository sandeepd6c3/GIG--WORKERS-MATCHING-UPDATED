/* =========================================================
   GigMatch AI — script.js
   Contains: demo data, render helpers, auth helpers,
   and a lightweight hash-based router for the single-page app.
========================================================= */

/* ---------------------------------------------------------
   1. DATA (static — hardcoded, no backend)
--------------------------------------------------------- */
const CATEGORIES = [
  { id: "electrician",     name: "Electrician",          icon: "⚡", desc: "Wiring, switchboards, fittings" },
  { id: "plumber",         name: "Plumber",               icon: "🔧", desc: "Leak fix, pipe fitting, tank work" },
  { id: "carpenter",       name: "Carpenter",             icon: "🪚", desc: "Furniture, doors, repairs" },
  { id: "painter",         name: "Painter",               icon: "🎨", desc: "Interior & exterior painting" },
  { id: "ac-repair",       name: "AC Repair & Service",   icon: "❄️", desc: "Installation, gas fill, servicing" },
  { id: "appliance-repair",name: "Appliance Repair",      icon: "🔩", desc: "Washing machine, fridge, oven" },
  { id: "home-cleaning",   name: "Home Cleaning",         icon: "🧹", desc: "Deep clean, sofa & carpet wash" },
  { id: "pest-control",    name: "Pest Control",          icon: "🐜", desc: "Cockroach, termite, rodent control" },
  { id: "gardening",       name: "Gardening",             icon: "🌱", desc: "Landscaping, lawn & plant care" },
  { id: "mason",           name: "Mason / Construction",  icon: "🧱", desc: "Tiling, brickwork, plastering" },
  { id: "welder",          name: "Welder",                icon: "🔥", desc: "Grills, gates, metal fabrication" },
  { id: "cctv",            name: "CCTV Installation",     icon: "📹", desc: "Camera setup & networking" },
  { id: "computer-repair", name: "Computer/Laptop Repair",icon: "💻", desc: "Hardware, software, virus removal" },
  { id: "mobile-repair",   name: "Mobile Repair",         icon: "📱", desc: "Screen, battery, software fix" },
  { id: "mechanic",        name: "Vehicle Mechanic",      icon: "🚗", desc: "Car & bike servicing" },
  { id: "driver",          name: "Driver",                icon: "🚙", desc: "On-demand & full-time drivers" },
  { id: "cook",            name: "Cook / Chef",           icon: "🍳", desc: "Daily meals & event catering" },
  { id: "tailor",          name: "Tailor",                icon: "🧵", desc: "Stitching & alterations" },
  { id: "salon-men",       name: "Salon at Home (Men)",   icon: "💈", desc: "Haircut, shave, grooming" },
  { id: "salon-women",     name: "Salon at Home (Women)", icon: "💅", desc: "Facial, waxing, styling" },
  { id: "movers",          name: "Packers & Movers",      icon: "📦", desc: "Home & office shifting" },
  { id: "interior",        name: "Interior Designer",     icon: "🏠", desc: "Space planning & decor" },
  { id: "photographer",    name: "Photographer",          icon: "📷", desc: "Events, portraits, product shoots" },
  { id: "tutor",           name: "Home Tutor",            icon: "📚", desc: "School & competitive exam prep" },
  { id: "security",        name: "Security Guard",        icon: "🛡️", desc: "Residential & event security" },
  { id: "babysitter",      name: "Babysitter / Nanny",    icon: "🍼", desc: "Childcare, verified caregivers" },
];

const TRUST_TIERS = {
  gold:   { label: "Gold Verified",   color: "#B8860B", ring: "#D4A72C" },
  silver: { label: "Silver Verified", color: "#5B6472", ring: "#9AA3B0" },
  bronze: { label: "Bronze Verified", color: "#8A5A2B", ring: "#B07C42" },
};

const FIRST_NAMES = ["Ramesh","Suresh","Anita","Pooja","Vikram","Sanjay","Kavita","Deepak","Manoj","Rekha","Arjun","Neha","Rajesh","Sunita","Ajay","Priya","Mohit","Geeta","Naveen","Shalini"];
const LAST_NAMES  = ["Sharma","Verma","Yadav","Kumar","Singh","Gupta","Mehta","Joshi","Patel","Reddy"];
const CITIES = ["Jaipur","Delhi","Mumbai","Bengaluru","Pune","Hyderabad"];
const TIERS = ["gold","silver","bronze"];

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const WORKERS = [];
let wid = 1;
CATEGORIES.forEach((cat, ci) => {
  const count = 3 + Math.floor(seededRandom(ci + 1) * 2); // 3-4 workers per category
  for (let i = 0; i < count; i++) {
    const seed = ci * 13 + i * 7;
    const fn = FIRST_NAMES[Math.floor(seededRandom(seed) * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(seededRandom(seed + 1) * LAST_NAMES.length)];
    const city = CITIES[Math.floor(seededRandom(seed + 2) * CITIES.length)];
    const tier = TIERS[Math.floor(seededRandom(seed + 3) * TIERS.length)];
    const rating = parseFloat((3.8 + seededRandom(seed + 4) * 1.2).toFixed(1));
    const jobs = 20 + Math.floor(seededRandom(seed + 5) * 380);
    const rate = 250 + Math.floor(seededRandom(seed + 6) * 550);
    const years = 1 + Math.floor(seededRandom(seed + 7) * 12);
    WORKERS.push({
      id: wid++,
      name: `${fn} ${ln}`,
      categoryId: cat.id,
      categoryName: cat.name,
      icon: cat.icon,
      city,
      tier,
      rating,
      jobsDone: jobs,
      rate,
      yearsExp: years,
      available: seededRandom(seed + 8) > 0.25,
      bio: `${fn} ${ln} is a ${years}-year experienced ${cat.name.toLowerCase()} professional based in ${city}, known for reliable and on-time work.`,
      skills: [cat.name, "On-time service", "Own tools", "Verified ID"],
    });
  }
});

function getCategory(id) {
  return CATEGORIES.find(c => c.id === id);
}

/* ---------------------------------------------------------
   2. RENDER HELPERS
--------------------------------------------------------- */
function initials(name) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

function trustBadgeHTML(tier) {
  const t = TRUST_TIERS[tier];
  return `<span class="trust-badge ${tier}">✓ ${t.label}</span>`;
}

function avatarRingHTML(name, tier, size = "") {
  const t = TRUST_TIERS[tier];
  return `<div class="avatar-ring ${size}" style="--ring-color:${t.ring}">${initials(name)}</div>`;
}

function starRow(rating) {
  return `<span class="rating-pill">★ ${rating.toFixed(1)}</span>`;
}

function workerCardHTML(w) {
  return `
    <div class="worker-card">
      <div class="worker-card-top">
        ${avatarRingHTML(w.name, w.tier)}
        <div>
          <div class="worker-card-name">${w.name}</div>
          <div class="worker-card-cat">${w.icon} ${w.categoryName} · ${w.city}</div>
        </div>
      </div>
      <div>${trustBadgeHTML(w.tier)}</div>
      <div class="worker-meta">
        ${starRow(w.rating)}
        <span><strong>${w.jobsDone}</strong> jobs done</span>
        <span><strong>${w.yearsExp}</strong> yrs exp</span>
      </div>
      <div class="worker-meta" style="border-top:none;padding-top:0;">
        <span class="availability ${w.available ? "available" : "busy"}">
          ${w.available ? "Available today" : "Busy this week"}
        </span>
        <span style="margin-left:auto;font-weight:700;color:var(--navy)">₹${w.rate}<span style="font-weight:400;color:var(--text-muted)">/visit</span></span>
      </div>
      <div class="worker-card-footer">
        <a href="#profile?id=${w.id}" class="btn btn-outline btn-sm btn-block">View profile</a>
        <a href="#profile?id=${w.id}" class="btn btn-primary btn-sm btn-block" data-scroll-book="1">Book now</a>
      </div>
    </div>`;
}

function categoryCardHTML(cat) {
  return `
    <a href="#workers?category=${cat.id}" class="category-card">
      <div class="cat-icon">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.desc}</p>
    </a>`;
}

/* ---------------------------------------------------------
   3. AUTH HELPERS (DEMO ONLY — no real backend)
--------------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}
function toggleFieldError(groupId, isValid) {
  const group = document.getElementById(groupId);
  if (!group) return isValid;
  group.classList.toggle("invalid", !isValid);
  return isValid;
}
function saveSession(user) {
  localStorage.setItem("gigmatch_user", JSON.stringify(user));
}
function getSession() {
  try { return JSON.parse(localStorage.getItem("gigmatch_user")); } catch { return null; }
}
function clearSession() {
  localStorage.removeItem("gigmatch_user");
}

/* ---------------------------------------------------------
   4. ROUTER — hash format: #page?key=value&key2=value2
--------------------------------------------------------- */
function parseRoute() {
  const raw = window.location.hash.slice(1) || "home";
  const [page, queryStr] = raw.split("?");
  return { page: page || "home", params: new URLSearchParams(queryStr || "") };
}

function router() {
  const { page, params } = parseRoute();
  const pages = document.querySelectorAll(".page");
  const target = document.getElementById(`page-${page}`) ? page : "home";

  pages.forEach(p => p.classList.toggle("active", p.id === `page-${target}`));

  document.querySelectorAll("[data-nav]").forEach(link => {
    link.classList.toggle("active", link.dataset.nav === target);
  });

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (target === "categories") renderCategoriesPage();
  if (target === "workers") renderWorkersPage(params);
  if (target === "profile") renderProfilePage(params);

  // Close mobile nav after navigating
  document.getElementById("navLinks").classList.remove("open");
}

/* ---------------------------------------------------------
   5. PAGE RENDERERS
--------------------------------------------------------- */
function renderHomePage() {
  const heroSelect = document.getElementById("heroCategory");
  heroSelect.innerHTML = `<option value="">All categories</option>` +
    CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

  document.getElementById("homeCategoryGrid").innerHTML =
    CATEGORIES.slice(0, 8).map(categoryCardHTML).join("");

  const featured = [...WORKERS].sort((a, b) => b.rating - a.rating).slice(0, 6);
  document.getElementById("featuredWorkers").innerHTML = featured.map(workerCardHTML).join("");
}

function renderCategoriesPage() {
  const grid = document.getElementById("allCategoryGrid");
  const search = document.getElementById("catSearch");

  function draw() {
    const q = search.value.toLowerCase().trim();
    const list = CATEGORIES.filter(c => c.name.toLowerCase().includes(q));
    grid.innerHTML = list.length
      ? list.map(categoryCardHTML).join("")
      : `<div class="empty-state"><h3>No categories found</h3><p>Try a different search term.</p></div>`;
  }
  search.oninput = draw;
  draw();
}

function renderWorkersPage(initialParams) {
  const catSelect = document.getElementById("fCategory");
  const citySelect = document.getElementById("fCity");

  if (!catSelect.dataset.filled) {
    catSelect.innerHTML = `<option value="">All categories</option>` +
      CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
    catSelect.dataset.filled = "1";
  }
  if (!citySelect.dataset.filled) {
    const cities = [...new Set(WORKERS.map(w => w.city))].sort();
    citySelect.innerHTML = `<option value="">All cities</option>` +
      cities.map(c => `<option value="${c}">${c}</option>`).join("");
    citySelect.dataset.filled = "1";
  }

  // Apply incoming route params (e.g. from category card or hero search)
  catSelect.value = initialParams.get("category") || "";
  const cityParam = initialParams.get("city");
  if (cityParam) {
    const match = [...citySelect.options].find(o => o.value.toLowerCase() === cityParam.toLowerCase());
    citySelect.value = match ? match.value : "";
  } else {
    citySelect.value = "";
  }

  function applyFilters() {
    let list = [...WORKERS];
    const cat = catSelect.value;
    const city = citySelect.value;
    const minRating = parseFloat(document.getElementById("fRating").value);
    const availableOnly = document.getElementById("fAvailable").checked;
    const sort = document.getElementById("fSort").value;

    if (cat) list = list.filter(w => w.categoryId === cat);
    if (city) list = list.filter(w => w.city === city);
    if (minRating) list = list.filter(w => w.rating >= minRating);
    if (availableOnly) list = list.filter(w => w.available);

    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "jobs") list.sort((a, b) => b.jobsDone - a.jobsDone);
    if (sort === "rate-low") list.sort((a, b) => a.rate - b.rate);
    if (sort === "rate-high") list.sort((a, b) => b.rate - a.rate);

    const grid = document.getElementById("resultsGrid");
    document.getElementById("countText").textContent = `${list.length} worker${list.length !== 1 ? "s" : ""} found`;

    const catName = cat ? getCategory(cat)?.name : null;
    document.getElementById("resultSummary").textContent = catName ? `Showing ${catName} professionals` : "Showing all workers";

    grid.innerHTML = list.length
      ? list.map(workerCardHTML).join("")
      : `<div class="empty-state"><h3>No workers match these filters</h3><p>Try widening your search — remove a filter or pick a different category.</p></div>`;
  }

  ["fCategory", "fCity", "fRating", "fSort", "fAvailable"].forEach(id => {
    document.getElementById(id).onchange = applyFilters;
  });

  document.getElementById("clearFilters").onclick = () => {
    catSelect.value = ""; citySelect.value = "";
    document.getElementById("fRating").value = "0";
    document.getElementById("fSort").value = "rating";
    document.getElementById("fAvailable").checked = false;
    applyFilters();
  };

  applyFilters();
}

function sampleReviews(w) {
  const reviews = [
    { name: "Aditi R.", text: `Very professional and on time. ${w.name.split(" ")[0]} explained the whole job clearly before starting.`, stars: 5 },
    { name: "Karan M.", text: "Good work overall, would book again for future jobs.", stars: 4 },
  ];
  return reviews.map(r => `
    <div style="padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;font-size:13.5px;font-weight:600;">
        <span>${r.name}</span><span style="color:var(--gold);">${"★".repeat(r.stars)}</span>
      </div>
      <p style="font-size:13.5px;color:var(--text-secondary);margin-top:4px;">${r.text}</p>
    </div>`).join("");
}

function renderProfilePage(params) {
  const id = parseInt(params.get("id"), 10);
  const worker = WORKERS.find(w => w.id === id);
  const root = document.getElementById("profileRoot");

  if (!worker) {
    document.getElementById("crumbName").textContent = "Profile";
    root.innerHTML = `
      <div class="empty-state">
        <h3>Worker not found</h3>
        <p>This profile may have been removed. Try browsing all workers instead.</p><br>
        <a href="#workers" class="btn btn-primary">Browse workers</a>
      </div>`;
    return;
  }

  document.getElementById("crumbName").textContent = worker.name;

  root.innerHTML = `
    <div class="profile-header">
      ${avatarRingHTML(worker.name, worker.tier, "lg")}
      <div class="profile-header-info">
        <h1>${worker.name}</h1>
        <div class="cat">${worker.icon} ${worker.categoryName} · ${worker.city}</div>
        ${trustBadgeHTML(worker.tier)}
        <div class="profile-stats-row">
          <div class="profile-stat"><div class="num">★ ${worker.rating.toFixed(1)}</div><div class="label">Rating</div></div>
          <div class="profile-stat"><div class="num">${worker.jobsDone}</div><div class="label">Jobs done</div></div>
          <div class="profile-stat"><div class="num">${worker.yearsExp} yrs</div><div class="label">Experience</div></div>
          <div class="profile-stat"><div class="num">${worker.available ? "Yes" : "No"}</div><div class="label">Available today</div></div>
        </div>
      </div>
    </div>

    <div class="profile-grid">
      <div>
        <div class="card">
          <h3>About</h3>
          <p style="color:var(--text-secondary);font-size:14.5px;">${worker.bio}</p>
        </div>
        <div class="card">
          <h3>Skills &amp; verification</h3>
          <div class="skill-tags">${worker.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}</div>
        </div>
        <div class="card">
          <h3>Customer reviews</h3>
          ${sampleReviews(worker)}
        </div>
      </div>

      <div>
        <div class="card book-card" id="book">
          <div class="rate">₹${worker.rate} <span>/ visit</span></div>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:18px;">Final price may vary by job scope</p>
          <button class="btn btn-primary btn-block" id="bookBtn">Request booking</button>
          <p id="bookConfirm" style="display:none;background:var(--teal-tint);color:var(--teal-dark);padding:10px;border-radius:8px;font-size:13px;margin-top:12px;font-weight:600;">
            ✓ Booking request sent to ${worker.name}
          </p>
          <div style="margin-top:18px;padding-top:18px;border-top:1px solid var(--border);font-size:13px;color:var(--text-secondary);">
            <p>🛡️ ID verified &amp; background checked</p>
            <p style="margin-top:8px;">📍 Serves ${worker.city} &amp; nearby areas</p>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById("bookBtn").addEventListener("click", () => {
    document.getElementById("bookConfirm").style.display = "block";
    document.getElementById("bookBtn").textContent = "Request sent ✓";
    document.getElementById("bookBtn").disabled = true;
  });
}

/* ---------------------------------------------------------
   6. STATIC PAGE WIRING (login / signup / nav toggle)
--------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

function initHeroSearch() {
  document.getElementById("heroSearchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const cat = document.getElementById("heroCategory").value;
    const loc = document.getElementById("heroLocation").value.trim();
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    if (loc) params.set("city", loc);
    window.location.hash = "workers" + (params.toString() ? "?" + params.toString() : "");
  });
}

function initLoginForm() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let valid = true;
    valid = toggleFieldError("loginEmailGroup", isValidEmail(email)) && valid;
    valid = toggleFieldError("loginPassGroup", password.length >= 6) && valid;
    if (!valid) return;

    saveSession({ email, role: "customer" });
    document.getElementById("loginSuccessMsg").style.display = "block";
    setTimeout(() => { window.location.hash = "home"; }, 900);
  });
}

function initSignupForm() {
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = `<option value="">Select category</option>` +
    CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

  const roleCustomerBtn = document.getElementById("roleCustomer");
  const roleWorkerBtn = document.getElementById("roleWorker");
  const categoryGroup = document.getElementById("categoryGroup");
  let selectedRole = "customer";

  function selectRole(role) {
    selectedRole = role;
    roleCustomerBtn.classList.toggle("active", role === "customer");
    roleWorkerBtn.classList.toggle("active", role === "worker");
    categoryGroup.style.display = role === "worker" ? "block" : "none";
  }
  roleCustomerBtn.addEventListener("click", () => selectRole("customer"));
  roleWorkerBtn.addEventListener("click", () => selectRole("worker"));

  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const category = categorySelect.value;

    let valid = true;
    valid = toggleFieldError("nameGroup", name.length >= 2) && valid;
    valid = toggleFieldError("signupEmailGroup", isValidEmail(email)) && valid;
    valid = toggleFieldError("phoneGroup", isValidPhone(phone)) && valid;
    valid = toggleFieldError("signupPassGroup", password.length >= 6) && valid;
    if (selectedRole === "worker") {
      valid = toggleFieldError("categoryGroup", category !== "") && valid;
    }
    if (!valid) return;

    saveSession({ name, email, phone, role: selectedRole, category });
    document.getElementById("signupSuccessMsg").style.display = "block";
    setTimeout(() => {
      window.location.hash = selectedRole === "worker" ? "home" : "workers";
    }, 900);
  });

  // Expose so router-level hash params (e.g. #signup?role=worker) can pre-select role
  window.__selectSignupRole = selectRole;
}

/* ---------------------------------------------------------
   7. INIT
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initHeroSearch();
  initLoginForm();
  initSignupForm();
  renderHomePage();

  window.addEventListener("hashchange", () => {
    const { page, params } = parseRoute();
    if (page === "signup" && params.get("role") === "worker") {
      window.__selectSignupRole("worker");
    }
    router();
  });

  // Handle initial load (including a direct link like #signup?role=worker)
  const { page, params } = parseRoute();
  if (page === "signup" && params.get("role") === "worker") {
    window.__selectSignupRole("worker");
  }
  router();
});
