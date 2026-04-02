const AMENITY_ICONS = {
  "WiFi": "fa-wifi", "Pool": "fa-person-swimming", "Kitchen": "fa-utensils",
  "Parking": "fa-square-parking", "AC": "fa-snowflake", "Hot tub": "fa-hot-tub-person",
  "Fireplace": "fa-fire", "Washer": "fa-jug-detergent", "Smart TV": "fa-tv",
  "Garden": "fa-seedling", "Wine cellar": "fa-wine-bottle",
  "Breakfast included": "fa-mug-hot", "Private deck": "fa-chair",
  "Snorkeling gear": "fa-water", "Gym": "fa-dumbbell",
  "Rooftop": "fa-building", "Doorman": "fa-person",
  "Ski-in/Ski-out": "fa-person-skiing",
};

const MOCK_REVIEWS = [
  { name: "Alex", date: "March 2026", text: "Absolutely stunning property. Everything was exactly as described — even better in person. The host was incredibly responsive and welcoming." },
  { name: "Maria", date: "February 2026", text: "One of the best stays I've ever had. The location is unbeatable and the amenities are top-notch. Will definitely be coming back!" },
  { name: "James", date: "January 2026", text: "Perfect getaway. The space is beautifully designed and super clean. We loved every moment of our stay." },
  { name: "Priya", date: "December 2025", text: "Such a magical place. The views alone are worth the price. Host was a superstar — left us local tips that made our trip." },
];

const params = new URLSearchParams(window.location.search);
const listingId = parseInt(params.get("id")) || 1;
const listing = LISTINGS.find(l => l.id === listingId) || LISTINGS[0];

document.title = `${listing.title} — Airbnb Clone`;
document.getElementById("listingTitle").textContent = listing.title;
document.getElementById("listingRating").textContent = listing.rating;
document.getElementById("listingReviewCount").textContent = `${listing.reviewCount} reviews`;
document.getElementById("listingSuper").textContent = listing.superhost ? "⭐ Superhost" : listing.location;
document.getElementById("listingLocation").textContent = listing.location;
document.getElementById("listingDescription").textContent = listing.description || "A wonderful place to stay, full of character and comfort. Perfectly located to explore everything the area has to offer.";

document.getElementById("hostHeadline").textContent = `Hosted by ${listing.host?.name || "Your Host"}`;
document.getElementById("hostSubline").textContent = `${listing.beds} beds · ${listing.baths} baths · Up to ${listing.guests} guests`;
document.getElementById("hostNameHighlight").textContent = `${listing.host?.name || "Your Host"} is a Superhost`;

document.getElementById("bwPrice").textContent = `$${listing.price}`;
document.getElementById("bwRating").textContent = listing.rating;
document.getElementById("bwReviews").textContent = `(${listing.reviewCount} reviews)`;

document.getElementById("reviewsHeading").textContent = `${listing.rating} · ${listing.reviewCount} reviews`;

const photos = listing.images || [listing.image, listing.image];
const photoGrid = document.getElementById("photoGrid");
const photoUrls = [...photos, ...photos].slice(0, 3);
photoGrid.innerHTML = photoUrls.map((src, i) =>
  `<img src="${src}" alt="Photo ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}"/>`
).join("");

const amenities = listing.amenities || ["WiFi", "Kitchen", "Parking", "AC"];
document.getElementById("amenitiesGrid").innerHTML = amenities.map(a => `
  <div class="amenity-item">
    <i class="fa-solid ${AMENITY_ICONS[a] || "fa-check"}"></i>
    <span>${a}</span>
  </div>
`).join("");

document.getElementById("reviewsGrid").innerHTML = MOCK_REVIEWS.map(r => `
  <div class="review-card">
    <div class="review-header">
      <div class="review-avatar">${r.name[0]}</div>
      <div>
        <div class="review-name">${r.name}</div>
        <div class="review-date">${r.date}</div>
      </div>
    </div>
    <p class="review-text">${r.text}</p>
  </div>
`).join("");

let guests = 2;
function changeGuests(delta) {
  guests = Math.max(1, Math.min(listing.guests, guests + delta));
  document.getElementById("guestCount").textContent = guests;
  updateBreakdown();
}

function updateBreakdown() {
  const ci = document.getElementById("checkInDate").value;
  const co = document.getElementById("checkOutDate").value;
  if (!ci || !co) return;
  const nights = Math.max(1, Math.round((new Date(co) - new Date(ci)) / 86400000));
  const nightsCost = nights * listing.price;
  const serviceFee = Math.round(nightsCost * 0.12);
  const total = nightsCost + 75 + serviceFee;
  document.getElementById("bwNightsLabel").textContent = `$${listing.price} × ${nights} nights`;
  document.getElementById("bwNightsCost").textContent = `$${nightsCost}`;
  document.getElementById("bwServiceFee").textContent = `$${serviceFee}`;
  document.getElementById("bwTotal").textContent = `$${total}`;
  document.getElementById("bwBreakdown").style.display = "block";
}

document.getElementById("checkInDate").addEventListener("change", updateBreakdown);
document.getElementById("checkOutDate").addEventListener("change", updateBreakdown);

function handleReserve() {
  const ci = document.getElementById("checkInDate").value;
  const co = document.getElementById("checkOutDate").value;
  if (!ci || !co) {
    alert("Please select check-in and check-out dates.");
    return;
  }
  alert(`Booking confirmed! 🎉\n${listing.title}\n${ci} → ${co}\n${guests} guest(s)`);
}

const wBtn = document.getElementById("wishlistBtn");
wBtn.addEventListener("click", () => {
  const saved = wishlist.has(listing.id);
  saved ? wishlist.delete(listing.id) : wishlist.add(listing.id);
  wBtn.innerHTML = `<i class="fa-${!saved ? "solid" : "regular"} fa-heart"></i> ${!saved ? "Saved" : "Save"}`;
  wBtn.style.color = !saved ? "var(--primary)" : "";
});