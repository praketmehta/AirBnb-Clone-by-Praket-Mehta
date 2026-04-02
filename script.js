const LISTINGS = [
  {
    id: 1, title: "Oceanfront Villa with Infinity Pool",
    location: "Malibu, California", country: "United States",
    price: 850, rating: 4.97, reviewCount: 128,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    category: "beachfront", beds: 4, baths: 3, guests: 8,
    superhost: true,
  },
  {
    id: 2, title: "Cozy Mountain Cabin with Hot Tub",
    location: "Aspen, Colorado", country: "United States",
    price: 320, rating: 4.89, reviewCount: 94,
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=800",
    category: "cabins", beds: 2, baths: 1, guests: 4,
    superhost: false,
  },
  {
    id: 3, title: "Tuscan Countryside Villa",
    location: "Florence, Tuscany", country: "Italy",
    price: 520, rating: 4.95, reviewCount: 203,
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800",
    category: "countryside", beds: 5, baths: 4, guests: 10,
    superhost: true,
  },
  {
    id: 4, title: "Modern Tokyo Apartment",
    location: "Shibuya, Tokyo", country: "Japan",
    price: 180, rating: 4.82, reviewCount: 317,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    category: "trending", beds: 1, baths: 1, guests: 2,
    superhost: true,
  },
  {
    id: 5, title: "Overwater Bungalow",
    location: "Bora Bora", country: "French Polynesia",
    price: 1200, rating: 4.99, reviewCount: 76,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
    category: "amazing-views", beds: 1, baths: 1, guests: 2,
    superhost: true,
  },
  {
    id: 6, title: "NYC Penthouse with Skyline Views",
    location: "Manhattan, New York", country: "United States",
    price: 950, rating: 4.91, reviewCount: 145,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    category: "luxury", beds: 3, baths: 2, guests: 6,
    superhost: false,
  },
  {
    id: 7, title: "Luxury Pool Villa Phuket",
    location: "Phuket", country: "Thailand",
    price: 430, rating: 4.88, reviewCount: 211,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    category: "pools", beds: 3, baths: 3, guests: 6,
    superhost: true,
  },
  {
    id: 8, title: "Treehouse Retreat",
    location: "Portland, Oregon", country: "United States",
    price: 210, rating: 4.93, reviewCount: 88,
    image: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?w=800",
    category: "treehouses", beds: 1, baths: 1, guests: 2,
    superhost: false,
  },
];

let activeCategory = "all";
let wishlist = new Set();

// ===== RENDER LISTINGS =====
function renderListings(listings) {
  const grid = document.getElementById("listingsGrid");
  if (!listings.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px;color:var(--gray)">
      <i class="fa-solid fa-magnifying-glass" style="font-size:2rem;margin-bottom:12px;display:block"></i>
      No listings found for this category.
    </div>`;
    return;
  }
  grid.innerHTML = listings.map(l => `
    <div class="listing-card" onclick="openListing(${l.id})">
      <div class="card-img">
        <img src="${l.image}" alt="${l.title}" loading="lazy"/>
        ${l.superhost ? `<div class="superhost-badge">⭐ Superhost</div>` : ""}
        <button class="card-wishlist ${wishlist.has(l.id) ? "active" : ""}"
          onclick="toggleWishlist(event, ${l.id})">
          <i class="fa-${wishlist.has(l.id) ? "solid" : "regular"} fa-heart"></i>
        </button>
      </div>
      <div class="card-info">
        <div class="card-top">
          <div class="card-title">${l.title}</div>
          <div class="card-rating">
            <i class="fa-solid fa-star"></i> ${l.rating}
          </div>
        </div>
        <div class="card-location">${l.location}</div>
        <div class="card-dates">${l.beds} beds · ${l.baths} baths · ${l.guests} guests</div>
        <div class="card-price"><strong>$${l.price}</strong> <span>/ night</span></div>
      </div>
    </div>
  `).join("");
}

document.querySelectorAll(".category-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".category-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    activeCategory = item.dataset.cat;
    const filtered = activeCategory === "all"
      ? LISTINGS
      : LISTINGS.filter(l => l.category === activeCategory);
    renderListings(filtered);
  });
});

function toggleWishlist(e, id) {
  e.stopPropagation();
  wishlist.has(id) ? wishlist.delete(id) : wishlist.add(id);
  const filtered = activeCategory === "all"
    ? LISTINGS
    : LISTINGS.filter(l => l.category === activeCategory);
  renderListings(filtered);
}

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const navSearch = document.getElementById("navSearch");
  const scrolled = window.scrollY > 80;
  navbar.classList.toggle("scrolled", scrolled);
  navSearch.classList.toggle("visible", scrolled);
});

function openListing(id) {
  alert(`Listing detail page coming in next commit! (ID: ${id})`);
}

renderListings(LISTINGS);