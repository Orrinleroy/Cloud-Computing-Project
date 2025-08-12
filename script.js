// Sample data for demonstration
const lostFoundItems = [
  {
    id: 1,
    type: "lost",
    name: "iPhone 14 Pro",
    category: "electronics",
    description: "Black iPhone 14 Pro with a clear case. Has a small scratch on the back.",
    date: "2025-01-10",
    time: "14:30",
    location: "Central Park, near the fountain",
    contactName: "John Smith",
    contactEmail: "john.smith@email.com",
    contactPhone: "(555) 123-4567",
    reward: "$100",
    image: "/black-iphone-14-pro-clear-case.png",
  },
  {
    id: 2,
    type: "found",
    name: "Blue Leather Wallet",
    category: "accessories",
    description: "Navy blue leather wallet with multiple card slots. Contains some cards and cash.",
    date: "2025-01-11",
    time: "09:15",
    location: "Downtown Coffee Shop on Main Street",
    contactName: "Sarah Johnson",
    contactEmail: "sarah.j@email.com",
    contactPhone: "(555) 987-6543",
    currentLocation: "Handed to coffee shop manager",
    image: "/placeholder-sllqv.png",
  },
  {
    id: 3,
    type: "lost",
    name: "Red Backpack",
    category: "bags",
    description: "Red hiking backpack with multiple pockets. Contains laptop and textbooks.",
    date: "2025-01-09",
    time: "16:45",
    location: "University Library, 3rd floor",
    contactName: "Mike Chen",
    contactEmail: "mike.chen@student.edu",
    contactPhone: "(555) 456-7890",
    reward: "None",
    image: "/placeholder-cjqla.png",
  },
  {
    id: 4,
    type: "found",
    name: "Car Keys with BMW Keychain",
    category: "keys",
    description: "Set of car keys with BMW keychain and house keys. Silver keyring.",
    date: "2025-01-12",
    time: "11:20",
    location: "Shopping Mall Parking Lot, Level 2",
    contactName: "Lisa Wong",
    contactEmail: "lisa.wong@email.com",
    contactPhone: "(555) 234-5678",
    currentLocation: "Mall security office",
    image: "/placeholder-vfgrc.png",
  },
  {
    id: 5,
    type: "lost",
    name: "Gold Wedding Ring",
    category: "accessories",
    description: 'Gold wedding band with engraving "Forever Yours - 2020". Size 7.',
    date: "2025-01-08",
    time: "13:00",
    location: "City Gym, locker room",
    contactName: "David Miller",
    contactEmail: "david.miller@email.com",
    contactPhone: "(555) 345-6789",
    reward: "$500",
    image: "/placeholder-sam7v.png",
  },
  {
    id: 6,
    type: "found",
    name: "Black Prescription Glasses",
    category: "accessories",
    description: "Black frame prescription glasses in a brown leather case.",
    date: "2025-01-11",
    time: "15:30",
    location: "Public Bus Stop on Oak Avenue",
    contactName: "Emma Davis",
    contactEmail: "emma.davis@email.com",
    contactPhone: "(555) 567-8901",
    currentLocation: "Local police station",
    image: "/placeholder-vckle.png",
  },
]

// Import Bootstrap
const bootstrap = window.bootstrap

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Load recent items on homepage
  if (document.getElementById("recentItems")) {
    loadRecentItems()
    updateStats()
  }

  // Load all items on browse page
  if (document.getElementById("itemsGrid")) {
    loadAllItems()
  }

  // Setup form handlers
  setupFormHandlers()

  // Setup search functionality
  setupSearchHandlers()
})

// Load recent items for homepage
function loadRecentItems() {
  const recentItemsContainer = document.getElementById("recentItems")
  const recentItems = lostFoundItems.slice(0, 6) // Show last 6 items

  recentItemsContainer.innerHTML = ""

  recentItems.forEach((item) => {
    const itemCard = createItemCard(item)
    recentItemsContainer.appendChild(itemCard)
  })
}

// Load all items for browse page
function loadAllItems() {
  const itemsGrid = document.getElementById("itemsGrid")
  const noResults = document.getElementById("noResults")

  if (lostFoundItems.length === 0) {
    itemsGrid.style.display = "none"
    noResults.style.display = "block"
    return
  }

  itemsGrid.innerHTML = ""
  itemsGrid.style.display = "flex"
  noResults.style.display = "none"

  lostFoundItems.forEach((item) => {
    const itemCard = createItemCard(item)
    itemsGrid.appendChild(itemCard)
  })
}

// Create item card HTML
function createItemCard(item) {
  const col = document.createElement("div")
  col.className = "col-md-6 col-lg-4 mb-4"

  const statusClass = item.type === "lost" ? "status-lost" : "status-found"
  const statusText = item.type === "lost" ? "LOST" : "FOUND"
  const badgeClass = item.type === "lost" ? "badge-lost" : "badge-found"

  col.innerHTML = `
        <div class="card item-card h-100" onclick="showItemDetails(${item.id})">
            <div class="position-relative">
                <img src="${item.image}" class="card-img-top item-image" alt="${item.name}">
                <span class="status-indicator ${statusClass}">${statusText}</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text text-muted">${item.description.substring(0, 100)}...</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <i class="fas fa-map-marker-alt me-1"></i>${item.location}
                    </small>
                    <span class="badge ${badgeClass}">${item.category}</span>
                </div>
                <div class="mt-2">
                    <small class="text-muted">
                        <i class="fas fa-calendar me-1"></i>${formatDate(item.date)}
                    </small>
                </div>
            </div>
        </div>
    `

  return col
}

// Show item details in modal
function showItemDetails(itemId) {
  const item = lostFoundItems.find((i) => i.id === itemId)
  if (!item) return

  const modal = new bootstrap.Modal(document.getElementById("itemModal"))
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")
  const contactBtn = document.getElementById("contactOwnerBtn")

  modalTitle.textContent = item.name

  const statusBadge =
    item.type === "lost"
      ? '<span class="badge bg-warning text-dark">LOST ITEM</span>'
      : '<span class="badge bg-success">FOUND ITEM</span>'

  modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${item.image}" class="img-fluid rounded mb-3" alt="${item.name}">
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    ${statusBadge}
                    <span class="badge bg-secondary ms-2">${item.category}</span>
                </div>
                <h6>Description:</h6>
                <p>${item.description}</p>
                
                <h6>Date ${item.type === "lost" ? "Lost" : "Found"}:</h6>
                <p><i class="fas fa-calendar me-2"></i>${formatDate(item.date)} ${item.time ? "at " + item.time : ""}</p>
                
                <h6>Location:</h6>
                <p><i class="fas fa-map-marker-alt me-2"></i>${item.location}</p>
                
                ${item.reward ? `<h6>Reward:</h6><p><i class="fas fa-gift me-2"></i>${item.reward}</p>` : ""}
                ${item.currentLocation ? `<h6>Current Location:</h6><p><i class="fas fa-building me-2"></i>${item.currentLocation}</p>` : ""}
            </div>
        </div>
        
        <div class="contact-info">
            <h6>Contact Information:</h6>
            <p><strong>Name:</strong> ${item.contactName}</p>
            <p><strong>Email:</strong> ${item.contactEmail}</p>
            ${item.contactPhone ? `<p><strong>Phone:</strong> ${item.contactPhone}</p>` : ""}
        </div>
    `

  contactBtn.onclick = () => contactOwner(item)
  modal.show()
}

// Contact owner function
function contactOwner(item) {
  const subject = encodeURIComponent(`Regarding ${item.type} item: ${item.name}`)
  const body = encodeURIComponent(
    `Hi ${item.contactName},\n\nI saw your ${item.type} item listing for "${item.name}" on the Lost & Found Portal.\n\n`,
  )

  window.location.href = `mailto:${item.contactEmail}?subject=${subject}&body=${body}`
}

// Setup form handlers
function setupFormHandlers() {
  // Lost item form
  const lostItemForm = document.getElementById("lostItemForm")
  if (lostItemForm) {
    lostItemForm.addEventListener("submit", handleLostItemSubmit)
  }

  // Found item form
  const foundItemForm = document.getElementById("foundItemForm")
  if (foundItemForm) {
    foundItemForm.addEventListener("submit", handleFoundItemSubmit)
  }
}

// Handle lost item form submission
function handleLostItemSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const newItem = {
    id: lostFoundItems.length + 1,
    type: "lost",
    name: document.getElementById("itemName").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    date: document.getElementById("dateLost").value,
    time: document.getElementById("timeLost").value,
    location: document.getElementById("location").value,
    contactName: document.getElementById("contactName").value,
    contactEmail: document.getElementById("contactEmail").value,
    contactPhone: document.getElementById("contactPhone").value,
    reward: document.getElementById("reward").value,
    image:
      "/placeholder.svg?height=200&width=300&query=" + encodeURIComponent(document.getElementById("itemName").value),
  }

  lostFoundItems.unshift(newItem)

  // Show success message
  alert("Your lost item has been reported successfully! You will be notified if someone finds it.")

  // Redirect to browse page
  window.location.href = "browse.html"
}

// Handle found item form submission
function handleFoundItemSubmit(e) {
  e.preventDefault()

  const newItem = {
    id: lostFoundItems.length + 1,
    type: "found",
    name: document.getElementById("foundItemName").value,
    category: document.getElementById("foundCategory").value,
    description: document.getElementById("foundDescription").value,
    date: document.getElementById("dateFound").value,
    time: document.getElementById("timeFound").value,
    location: document.getElementById("foundLocation").value,
    contactName: document.getElementById("finderName").value,
    contactEmail: document.getElementById("finderEmail").value,
    contactPhone: document.getElementById("finderPhone").value,
    currentLocation: document.getElementById("currentLocation").value,
    image:
      "/placeholder.svg?height=200&width=300&query=" +
      encodeURIComponent(document.getElementById("foundItemName").value),
  }

  lostFoundItems.unshift(newItem)

  // Show success message
  alert("Thank you for reporting the found item! The owner will be able to contact you.")

  // Redirect to browse page
  window.location.href = "browse.html"
}

// Setup search handlers
function setupSearchHandlers() {
  // Homepage search
  const searchForm = document.getElementById("searchForm")
  if (searchForm) {
    searchForm.addEventListener("submit", handleHomepageSearch)
  }

  // Browse page search
  const browseSearch = document.getElementById("browseSearch")
  if (browseSearch) {
    browseSearch.addEventListener("input", debounce(filterItems, 300))
  }
}

// Handle homepage search
function handleHomepageSearch(e) {
  e.preventDefault()
  const query = document.getElementById("searchQuery").value
  const category = document.getElementById("categoryFilter").value

  // Redirect to browse page with search parameters
  const params = new URLSearchParams()
  if (query) params.set("search", query)
  if (category) params.set("category", category)

  window.location.href = `browse.html?${params.toString()}`
}

// Filter items on browse page
function filterItems() {
  const typeFilter = document.getElementById("typeFilter")?.value || ""
  const categoryFilter = document.getElementById("browseCategoryFilter")?.value || ""
  const searchQuery = document.getElementById("browseSearch")?.value.toLowerCase() || ""

  let filteredItems = lostFoundItems

  // Filter by type
  if (typeFilter) {
    filteredItems = filteredItems.filter((item) => item.type === typeFilter)
  }

  // Filter by category
  if (categoryFilter) {
    filteredItems = filteredItems.filter((item) => item.category === categoryFilter)
  }

  // Filter by search query
  if (searchQuery) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.location.toLowerCase().includes(searchQuery),
    )
  }

  // Display filtered items
  displayFilteredItems(filteredItems)
}

// Display filtered items
function displayFilteredItems(items) {
  const itemsGrid = document.getElementById("itemsGrid")
  const noResults = document.getElementById("noResults")

  if (items.length === 0) {
    itemsGrid.style.display = "none"
    noResults.style.display = "block"
    return
  }

  itemsGrid.innerHTML = ""
  itemsGrid.style.display = "flex"
  noResults.style.display = "none"

  items.forEach((item) => {
    const itemCard = createItemCard(item)
    itemsGrid.appendChild(itemCard)
  })
}

// Update stats on homepage
function updateStats() {
  const lostCount = lostFoundItems.filter((item) => item.type === "lost").length
  const foundCount = lostFoundItems.filter((item) => item.type === "found").length
  const reuniteCount = 247 // This would come from a database in a real app

  document.getElementById("lostCount").textContent = lostCount
  document.getElementById("foundCount").textContent = foundCount
  document.getElementById("reuniteCount").textContent = reuniteCount
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Handle URL parameters on page load
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const searchParam = urlParams.get("search")
  const categoryParam = urlParams.get("category")

  if (searchParam && document.getElementById("browseSearch")) {
    document.getElementById("browseSearch").value = searchParam
  }

  if (categoryParam && document.getElementById("browseCategoryFilter")) {
    document.getElementById("browseCategoryFilter").value = categoryParam
  }

  if ((searchParam || categoryParam) && document.getElementById("itemsGrid")) {
    filterItems()
  }
})
