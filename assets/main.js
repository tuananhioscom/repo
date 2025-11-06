// Main JavaScript for PrintPro Website

// State management
let currentCategory = 'all';
let allProducts = productsData;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productModal = document.getElementById('productModal');
const closeModalBtn = document.querySelector('.close-modal');
const categoryButtons = document.querySelectorAll('.category-btn');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const sortSelect = document.getElementById('sortSelect');
const productCount = document.getElementById('productCount');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeCategoryFilters();
    initializeNavigation();
    initializeModal();
    initializeSearch();
    initializeSort();
    initializeMobileMenu();
});

// Load and display products
function initializeProducts() {
    displayProducts(allProducts);
}

// Display products in the grid
function displayProducts(products) {
    // Update product count
    if (productCount) {
        productCount.innerHTML = `Hiển thị <strong>${products.length}</strong> sản phẩm`;
    }

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3 style="color: var(--text-light);">Không tìm thấy sản phẩm nào</h3>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="product-category">${product.categoryName}</span>
                <p class="product-description">${product.shortDescription}</p>
                <p class="product-price">${product.price}</p>
                <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">Xem chi tiết</button>
            </div>
        </div>
    `).join('');

    // Add click event to cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const productId = parseInt(this.getAttribute('data-product-id'));
                viewProductDetails(productId);
            }
        });
    });
}

// Category filtering
function initializeCategoryFilters() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);

            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Filter products by category
function filterByCategory(category) {
    currentCategory = category;

    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(product => product.category === category);
        displayProducts(filtered);
    }

    // Smooth scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// View product details in modal
function viewProductDetails(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    // Populate modal with product details
    document.getElementById('modalImage').src = '';
    document.getElementById('modalImage').style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    document.getElementById('modalImage').style.display = 'flex';
    document.getElementById('modalImage').style.alignItems = 'center';
    document.getElementById('modalImage').style.justifyContent = 'center';
    document.getElementById('modalImage').style.fontSize = '8rem';
    document.getElementById('modalImage').innerHTML = product.image;

    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalCategory').textContent = product.categoryName;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDescription').textContent = product.description;

    // Populate specifications
    const specsHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');
    document.getElementById('modalSpecs').innerHTML = specsHTML;

    // Populate options
    const optionsHTML = product.options.map(option => `
        <div class="option-item">✓ ${option}</div>
    `).join('');
    document.getElementById('modalOptions').innerHTML = optionsHTML;

    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Initialize modal functionality
function initializeModal() {
    // Close modal when clicking X
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Close modal function
function closeModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigation functionality
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        this.reset();
    });
}

// Initialize search functionality
function initializeSearch() {
    if (!searchInput || !searchBtn) return;

    // Search on button click
    searchBtn.addEventListener('click', performSearch);

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search (optional - debounced)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 500);
    });
}

function performSearch() {
    const query = searchInput.value.trim();

    if (query === '') {
        filterByCategory(currentCategory);
        return;
    }

    const filtered = allProducts.filter(product => {
        const searchLower = query.toLowerCase();
        return product.name.toLowerCase().includes(searchLower) ||
               product.description.toLowerCase().includes(searchLower) ||
               product.shortDescription.toLowerCase().includes(searchLower) ||
               product.categoryName.toLowerCase().includes(searchLower);
    });

    displayProducts(filtered);
}

// Initialize sort functionality
function initializeSort() {
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        applySortAndFilter(sortBy);
    });
}

function applySortAndFilter(sortBy) {
    let products = [...allProducts];

    // Apply current category filter
    if (currentCategory !== 'all') {
        products = products.filter(p => p.category === currentCategory);
    }

    // Apply search filter
    const query = searchInput ? searchInput.value.trim() : '';
    if (query !== '') {
        const searchLower = query.toLowerCase();
        products = products.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.shortDescription.toLowerCase().includes(searchLower) ||
            product.categoryName.toLowerCase().includes(searchLower)
        );
    }

    // Apply sorting
    switch(sortBy) {
        case 'price-low':
            products.sort((a, b) => a.priceValue - b.priceValue);
            break;
        case 'price-high':
            products.sort((a, b) => b.priceValue - a.priceValue);
            break;
        case 'name':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order
            break;
    }

    displayProducts(products);
}

// Initialize mobile menu
function initializeMobileMenu() {
    if (!mobileMenuToggle || !mainNav) return;

    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');

        // Change icon
        if (mainNav.classList.contains('active')) {
            this.textContent = '✕';
        } else {
            this.textContent = '☰';
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            }
        });
    });
}

// Search functionality (optional enhancement)
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.categoryName.toLowerCase().includes(searchTerm)
    );
    displayProducts(filtered);
}

// Sort products (optional enhancement)
function sortProducts(sortBy) {
    let sorted = [...allProducts];

    switch(sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.priceValue - b.priceValue);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.priceValue - a.priceValue);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            sorted = allProducts;
    }

    displayProducts(sorted);
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll (optional)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards for animation
setTimeout(() => {
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}, 100);
