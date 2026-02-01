// Property Data
const properties = [
    {
        id: 1,
        title: "Rumah Minimalis Modern",
        type: "rumah",
        price: 850000000,
        location: "Balikpapan Baru",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        description: "Rumah minimalis dengan desain modern, cocok untuk keluarga muda. Dilengkapi taman depan, carport untuk 2 mobil, dan dekat dengan fasilitas pendidikan.",
        features: ["Taman Depan", "Carport 2 Mobil", "Dekat Sekolah", "Air PDAM"],
        badge: "Best Seller",
        badgeType: "primary"
    },
    {
        id: 2,
        title: "Apartemen City View",
        type: "apartemen",
        price: 650000000,
        location: "Balikpapan Kota",
        bedrooms: 2,
        bathrooms: 1,
        area: 65,
        description: "Apartemen dengan view kota yang menakjubkan. Fasilitas lengkap: swimming pool, gym, dan 24/7 security.",
        features: ["Swimming Pool", "Fitness Center", "24/7 Security", "City View"],
        badge: "Ready Stock",
        badgeType: "success"
    },
    {
        id: 3,
        title: "Ruko Strategis 3 Lantai",
        type: "ruko",
        price: 1200000000,
        location: "Sepinggan",
        bedrooms: 4,
        bathrooms: 3,
        area: 180,
        description: "Ruko strategis di pusat bisnis Sepinggan. Cocok untuk usaha retail, kantor, atau investasi properti.",
        features: ["Lokasi Strategis", "Parkir Luas", "Siap Huni", "Akses Jalan Besar"],
        badge: "Investasi",
        badgeType: "warning"
    },
    {
        id: 4,
        title: "Rumah Cluster Premium",
        type: "rumah",
        price: 1500000000,
        location: "Manggar",
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        description: "Rumah cluster eksklusif di area premium Manggar. Lingkungan asri dengan keamanan 24 jam.",
        features: ["Cluster Eksklusif", "Security 24 Jam", "Taman Bermain", "Club House"],
        badge: "Limited Unit",
        badgeType: "error"
    },
    {
        id: 5,
        title: "Apartemen Studio Furnished",
        type: "apartemen",
        price: 450000000,
        location: "Balikpapan Utara",
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        description: "Apartemen studio fully furnished, cocok untuk single professional atau pasangan muda.",
        features: ["Fully Furnished", "Dekat Mall", "Internet Included", "Cleaning Service"],
        badge: "Furnished",
        badgeType: "info"
    },
    {
        id: 6,
        title: "Ruko 2 Lantai Corner",
        type: "ruko",
        price: 950000000,
        location: "Damai",
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        description: "Ruko corner 2 lantai di lokasi ramai. Potensi tinggi untuk berbagai jenis usaha.",
        features: ["Lokasi Corner", "Visibility Tinggi", "Listrik 3 Phase", "Air Sumur Bor"],
        badge: "Corner Lot",
        badgeType: "primary"
    }
];

// DOM Elements
const propertyGrid = document.getElementById('propertyGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('propertyModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const inquiryForm = document.getElementById('inquiryForm');
const dpInput = document.getElementById('dp');
const dpRange = document.getElementById('dpRange');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load properties
    renderProperties(properties);
    
    // Setup filter functionality
    setupFilters();
    
    // Setup modal functionality
    setupModal();
    
    // Setup mobile navigation
    setupMobileNav();
    
    // Setup form submission
    setupForms();
    
    // Setup KPR calculator sync
    setupKPRCalculator();
    
    // Setup smooth scroll for navigation links
    setupSmoothScroll();
    
    // Calculate initial KPR
    hitungKPR();
});

// Render Properties
function renderProperties(propertiesToRender) {
    propertyGrid.innerHTML = '';
    
    propertiesToRender.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertyGrid.appendChild(propertyCard);
    });
}

// Create Property Card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.dataset.id = property.id;
    card.dataset.type = property.type;
    
    const priceFormatted = formatCurrency(property.price);
    const areaFormatted = property.area.toLocaleString('id-ID');
    
    card.innerHTML = `
        ${property.badge ? `<div class="property-badge ${property.badgeType}">${property.badge}</div>` : ''}
        <div class="property-img">
            <i class="fas ${getPropertyIcon(property.type)}"></i>
        </div>
        <div class="property-info">
            <div class="property-header">
                <h3 class="property-title">${property.title}</h3>
            </div>
            <div class="property-price">${priceFormatted}</div>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </div>
            <div class="property-features">
                <div class="feature">
                    <i class="fas fa-bed"></i>
                    <span>${property.bedrooms} KT</span>
                </div>
                <div class="feature">
                    <i class="fas fa-bath"></i>
                    <span>${property.bathrooms} KM</span>
                </div>
                <div class="feature">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${areaFormatted} m²</span>
                </div>
            </div>
            <div class="property-actions">
                <button class="btn btn-secondary detail-btn" data-id="${property.id}">
                    <i class="fas fa-info-circle"></i> Detail
                </button>
                <a href="https://wa.me/6285824390625?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(property.title)}%20di%20${encodeURIComponent(property.location)}" 
                   class="btn btn-primary" target="_blank">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Setup Filter Functionality
function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter properties
            const filterType = this.dataset.filter;
            filterProperties(filterType);
        });
    });
}

// Filter Properties
function filterProperties(type) {
    let filteredProperties;
    
    if (type === 'all') {
        filteredProperties = properties;
    } else {
        filteredProperties = properties.filter(property => property.type === type);
    }
    
    renderProperties(filteredProperties);
}

// Setup Modal Functionality
function setupModal() {
    // Close modal when clicking X
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Add event listeners to detail buttons (delegated)
    propertyGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('detail-btn') || e.target.closest('.detail-btn')) {
            const detailBtn = e.target.classList.contains('detail-btn') ? e.target : e.target.closest('.detail-btn');
            const propertyId = parseInt(detailBtn.dataset.id);
            openModal(propertyId);
        }
    });
}

// Open Modal with Property Details
function openModal(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    
    if (!property) return;
    
    const priceFormatted = formatCurrency(property.price);
    const areaFormatted = property.area.toLocaleString('id-ID');
    
    modalBody.innerHTML = `
        <div class="property-detail">
            <div class="detail-header">
                <h2>${property.title}</h2>
                ${property.badge ? `<span class="detail-badge ${property.badgeType}">${property.badge}</span>` : ''}
            </div>
            
            <div class="detail-price">${priceFormatted}</div>
            
            <div class="detail-location">
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </div>
            
            <div class="detail-stats">
                <div class="stat">
                    <i class="fas fa-bed"></i>
                    <span>${property.bedrooms} Kamar Tidur</span>
                </div>
                <div class="stat">
                    <i class="fas fa-bath"></i>
                    <span>${property.bathrooms} Kamar Mandi</span>
                </div>
                <div class="stat">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${areaFormatted} m² Luas Bangunan</span>
                </div>
                <div class="stat">
                    <i class="fas fa-home"></i>
                    <span>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                </div>
            </div>
            
            <div class="detail-description">
                <h3>Deskripsi Properti</h3>
                <p>${property.description}</p>
            </div>
            
            ${property.features && property.features.length > 0 ? `
            <div class="detail-features">
                <h3>Fitur Unggulan</h3>
                <ul>
                    ${property.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            <div class="detail-highlight">
                <h3><i class="fas fa-star"></i> Keunggulan Lokasi</h3>
                <p>Lokasi strategis dengan akses mudah ke pusat kota, fasilitas pendidikan, pusat perbelanjaan, dan transportasi publik.</p>
            </div>
            
            <div class="detail-cta">
                <a href="https://wa.me/6285824390625?text=Halo,%20saya%20ingin%20bertanya%20lebih%20detail%20tentang%20${encodeURIComponent(property.title)}%20di%20${encodeURIComponent(property.location)}" 
                   class="btn btn-success" target="_blank">
                    <i class="fab fa-whatsapp"></i> Konsultasi via WhatsApp
                </a>
                <button class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Tutup
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Setup Mobile Navigation
function setupMobileNav() {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Setup Forms
function setupForms() {
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nama = document.getElementById('nama').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const propertyInterest = document.getElementById('propertyInterest').value;
            const pesan = document.getElementById('pesan').value;
            
            // Validate form
            if (!nama || !phone || !email || !propertyInterest) {
                alert('Harap lengkapi semua field yang wajib diisi.');
                return;
            }
            
            // Create WhatsApp message
            const propertyText = propertyInterest === 'lainnya' ? 'properti' : propertyInterest;
            const whatsappMessage = `Halo Borneo Property,\n\nSaya ${nama} tertarik dengan ${propertyText}.\n\nEmail: ${email}\nWhatsApp: ${phone}\n\nPesan: ${pesan || 'Tidak ada pesan tambahan'}\n\nSaya ingin konsultasi lebih lanjut.`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp
            window.open(`https://wa.me/6285824390625?text=${encodedMessage}`, '_blank');
            
            // Reset form
            inquiryForm.reset();
            
            // Show success message
            alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk konsultasi lebih lanjut.');
        });
    }
}

// Setup KPR Calculator Sync
function setupKPRCalculator() {
    // Sync DP input with range slider
    if (dpInput && dpRange) {
        dpInput.addEventListener('input', function() {
            dpRange.value = this.value;
            hitungKPR();
        });
        
        dpRange.addEventListener('input', function() {
            dpInput.value = this.value;
            hitungKPR();
        });
        
        // Sync other inputs
        const inputs = ['hargaProperti', 'tenor', 'bunga'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', hitungKPR);
            }
        });
    }
}

// Setup Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// KPR Calculator Function
function hitungKPR() {
    // Get input values
    const harga = parseFloat(document.getElementById('hargaProperti').value) || 0;
    const dpPersen = parseFloat(document.getElementById('dp').value) || 0;
    const tenor = parseFloat(document.getElementById('tenor').value) || 0;
    const bunga = parseFloat(document.getElementById('bunga').value) || 0;
    
    // Validate inputs
    let hasError = false;
    
    if (harga <= 0) {
        showError('hargaError', 'Harga properti harus lebih dari 0');
        hasError = true;
    } else {
        hideError('hargaError');
    }
    
    if (dpPersen < 10 || dpPersen > 50) {
        hasError = true;
    }
    
    if (tenor < 1 || tenor > 30) {
        hasError = true;
    }
    
    if (bunga < 0 || bunga > 20) {
        hasError = true;
    }
    
    if (hasError) {
        return;
    }
    
    // Calculate KPR
    const dpAmount = harga * (dpPersen / 100);
    const pinjaman = harga - dpAmount;
    const bungaBulanan = bunga / 100 / 12;
    const jumlahBulan = tenor * 12;
    
    let cicilan = 0;
    if (bungaBulanan > 0) {
        cicilan = pinjaman * (bungaBulanan * Math.pow(1 + bungaBulanan, jumlahBulan)) / (Math.pow(1 + bungaBulanan, jumlahBulan) - 1);
    } else {
        cicilan = pinjaman / jumlahBulan;
    }
    
    // Update result display
    document.getElementById('resultHarga').textContent = formatCurrency(harga);
    document.getElementById('resultDP').textContent = formatCurrency(dpAmount);
    document.getElementById('resultPinjaman').textContent = formatCurrency(pinjaman);
    document.getElementById('resultTenor').textContent = `${tenor} Tahun`;
    document.getElementById('resultBunga').textContent = `${bunga}%`;
    document.getElementById('resultCicilan').textContent = formatCurrency(Math.round(cicilan));
}

// Helper Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function getPropertyIcon(type) {
    switch(type) {
        case 'rumah': return 'fa-home';
        case 'apartemen': return 'fa-building';
        case 'ruko': return 'fa-store';
        default: return 'fa-home';
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Sticky Navbar on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});

// Form Validation Helper
function validatePhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}