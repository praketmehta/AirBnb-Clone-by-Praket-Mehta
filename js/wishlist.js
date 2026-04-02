const savedWishlist = JSON.parse(localStorage.getItem("airbnb_wishlist") || "[]");
wishlist = new Set(savedWishlist);

function renderWishlistPage() {
  const grid  = document.getElementById("wishlistGrid");
  const empty = document.getElementById("wishlistEmpty");
  const savedIds = Array.from(wishlist);
  const savedListings = LISTINGS.filter(l => savedIds.includes(l.id));

  let countEl = document.getElementById("wishlistCount");
  if (!countEl) {
    countEl = document.createElement("p");
    countEl.id = "wishlistCount";
    countEl.className = "wishlist-count";
    document.querySelector(".wishlist-header").appendChild(countEl);
  }

  if (savedListings.length === 0) {
    empty.style.display = "block";
    grid.style.display  = "none";
    countEl.style.display = "none";
    return;
  }

  empty.style.display = "none";
  grid.style.display  = "grid";
  countEl.style.display = "block";
  countEl.textContent = `${savedListings.length} saved place${savedListings.length !== 1 ? "s" : ""}`;

  grid.innerHTML = savedListings.map(l => `
    <div class="wishlist-card" onclick="openListing(${l.id})">
      <div class="wishlist-card-img">
        <img src="${l.image}" alt="${l.title}" loading="lazy"/>
        <button class="wishlist-remove-btn"
          onclick="removeFromWishlist(event, ${l.id})"
          title="Remove from wishlist">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="wishlist-card-info">
        <div class="wishlist-card-top">
          <div class="wishlist-card-title">${l.title}</div>
          <div class="wishlist-card-rating">
            <i class="fa-solid fa-star"></i> ${l.rating}
          </div>
        </div>
        <div class="wishlist-card-location">${l.location}</div>
        <div class="wishlist-card-footer">
          <div class="wishlist-card-price">
            <strong>$${l.price}</strong>
            <span>/ night</span>
          </div>
          <button class="wishlist-view-btn"
            onclick="openListing(${l.id}); event.stopPropagation()">
            View →
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function removeFromWishlist(e, id) {
  e.stopPropagation();
  wishlist.delete(id);
  persistWishlist();
  renderWishlistPage();
  showToast("Removed from wishlist");
}

function openListing(id) {
  window.location.href = `listing.html?id=${id}`;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

renderWishlistPage();