// DOM Elements
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const menuGrid = document.querySelector('.menu-grid');
const testimonialSlides = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const quickOrderForm = document.getElementById('quick-order');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

// Menu Data
const menuItems = [
    {
        id: 1,
        title: 'Detox Delight',
        price: 50,
        category: 'detox',
        ingredients: 'Kale, cucumber, lemon, ginger, apple',
        description: 'Our most popular detox blend that cleanses and refreshes',
        img: 'assets/detox.png'
    },
    {
        id: 2,
        title: 'Energy Boost',
        price: 40,
        category: 'energy',
        ingredients: 'Orange, carrot, turmeric, pineapple',
        description: 'Perfect morning pick-me-up with natural energizers',
        img: 'assets/energy.jpg'
    },
    {
        id: 3,
        title: 'Immunity Shot',
        price: 70,
        category: 'immunity',
        ingredients: 'Grapefruit, lemon, ginger, cayenne',
        description: 'Powerful immune system support in every sip',
        img: 'assets/immunity.png'
    },
    {
        id: 4,
        title: 'Green Goddess',
        price: 70,
        category: 'detox',
        ingredients: 'Spinach, celery, apple, lime, parsley',
        description: 'Packed with chlorophyll and antioxidants',
        img: 'assets/green.png'
    },
    {
        id: 5,
        title: 'Tropical Sunrise',
        price: 40,
        category: 'energy',
        ingredients: 'Mango, pineapple, orange, coconut water',
        description: 'Sweet tropical flavors with natural electrolytes',
        img: 'assets/trophical.jpg'
    },
    {
        id: 6,
        title: 'Berry Blast',
        price: 90,
        category: 'immunity',
        ingredients: 'Strawberry, blueberry, raspberry, apple',
        description: 'Antioxidant-rich berry combination',
        img: 'assets/mixed.png'
    },
    {
        id: 7,
        title: 'Summer Refresher',
        price: 30,
        category: 'seasonal',
        ingredients: 'Watermelon, mint, lime, cucumber',
        description: 'Cooling and hydrating summer special',
        img: 'assets/refreshing.jpg'
    },
    {
        id: 8,
        title: 'Root Revival',
        price: 60,
        category: 'detox',
        ingredients: 'Beet, carrot, apple, lemon, ginger',
        description: 'Liver-supporting root vegetable blend',
        img: 'assets/abc.jpg'
    }
];

// Testimonial Slider
let currentSlide = 0;
const slideCount = testimonialSlides.length;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load menu items
    displayMenuItems('all');
    
    // Create dots for testimonial slider
    createDots();
    
    // Set up event listeners
    setupEventListeners();
    
    // Populate quick order form select
    populateQuickOrderSelect();
    
    // Show first testimonial
    showSlide(currentSlide);
});

// Functions
function setupEventListeners() {
    // Mobile menu toggle
    burger.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for nav links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Smooth scroll to target
                const target = document.querySelector(this.hash);
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this.hash);
            }
        });
    });
    
    // Menu tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Display filtered menu items
            displayMenuItems(category);
        });
    });
    
    // Testimonial slider controls
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    });
    
    // Form submissions
    if (quickOrderForm) {
        quickOrderForm.addEventListener('submit', handleQuickOrder);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
}

function toggleMobileMenu() {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    burger.setAttribute('aria-expanded', burger.classList.contains('active'));
}

function updateActiveNavLink(hash) {
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
}

function displayMenuItems(category) {
    menuGrid.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-img" style="background-image: url('${item.img}'); width:130px; height:180px"></div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.title}</h3>
                    <span class="menu-item-price">₹${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-desc">${item.description}</p>
                <p class="menu-item-ingredients">${item.ingredients}</p>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

function createDots() {
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
        dotsContainer.appendChild(dot);
    }
}

function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    testimonialSlides[index].classList.add('active');
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function populateQuickOrderSelect() {
    const select = document.getElementById('juice-select');
    
    menuItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.title} - ₹${item.price.toFixed(2)}`;
        select.appendChild(option);
    });
}

function handleQuickOrder(e) {
    e.preventDefault();
    
    const juiceId = parseInt(document.getElementById('juice-select').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    const selectedJuice = menuItems.find(item => item.id === juiceId);
    
    if (!selectedJuice) {
        alert('Please select a juice');
        return;
    }
    
    // In a real app, you would send this data to your backend
    alert(`Thank you, ${name}! Your order for ${quantity} ${selectedJuice.title} has been received. We'll call you at ${phone} to confirm.`);
    
    // Reset form
    e.target.reset();
}

function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // In a real app, you would send this data to your backend
    alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
    
    // Reset form
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input').value;
    
    // In a real app, you would send this data to your backend
    alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
    
    // Reset form
    e.target.reset();
}

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
});