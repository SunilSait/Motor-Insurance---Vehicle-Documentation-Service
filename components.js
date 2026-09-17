/* ===== MOTOR INSURANCE & VEHICLE DOCUMENTATION SERVICE — SHARED COMPONENTS ===== */
'use strict';

/* ─── THEME & DIRECTION ─────────────────────────────────────── */
(function initThemeDir() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('mivd_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('mivd_dir') === 'rtl') html.setAttribute('dir', 'rtl');
})();

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    localStorage.setItem('mivd_theme', html.classList.contains('dark') ? 'dark' : 'light');
    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);
}

function updateThemeIcon(el) {
    if (!el) return;
    const isDark = document.documentElement.classList.contains('dark');
    el.className = isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
}

function toggleDir() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
    localStorage.setItem('mivd_dir', isRTL ? 'ltr' : 'rtl');
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = isRTL ? 'LTR' : 'RTL';
    });
}

/* ─── SVG LOGO ─────────────────────────────────────────── */
function getLogoSVG(size = 38) {
    return `<img src="logo.svg" alt="VehicleSure Logo" width="${size}" height="${size}" class="nav-logo-img" style="width:${size}px;height:${size}px;object-fit:contain;display:block;flex-shrink:0;" />`;
}

/* ─── NAVBAR ─────────────────────────────────────────── */
function injectNav() {
    const el = document.getElementById('main-nav');
    if (!el) return;
    const page = location.pathname.split('/').pop() || 'index.html';
    const links = [
        { href: 'index.html',     label: 'Home' },
        { href: 'home2.html',     label: 'Home 2' },
        { href: 'services.html',  label: 'Services' },
        { href: 'documents.html', label: 'Documents' },
        { href: 'fees.html',      label: 'Fees' },
        { href: 'contact.html',   label: 'Contact' },
    ];

    const isDark = document.documentElement.classList.contains('dark');
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

    const navLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="nav-link ${isActive ? 'active' : ''}">${l.label}</a>`;
    }).join('');

    const mobileLinksHTML = links.map(l => {
        const isActive = page === l.href || (page === '' && l.href === 'index.html');
        return `<a href="${l.href}" class="mob-link ${isActive ? 'active' : ''}">${l.label}</a>`;
    }).join('');

    el.innerHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-inner">
            <!-- Logo -->
            <a href="index.html" class="nav-logo" aria-label="VehicleSure Home">
                ${getLogoSVG(38)}
                <div class="nav-logo-text">
                    <span class="brand-top">VehicleSure</span>
                    <span class="brand-bottom">Motor Insurance & Docs</span>
                </div>
            </a>

            <!-- Desktop Nav Links -->
            <div class="nav-links">
                ${navLinksHTML}
            </div>

            <!-- Right Actions -->
            <div class="nav-actions">
                <!-- RTL Toggle -->
                <button onclick="toggleDir()" class="nav-icon-btn" title="Toggle Direction">
                    <span class="dir-label" style="font-size:0.625rem;">${isRTL ? 'RTL' : 'LTR'}</span>
                </button>
                <!-- Theme Toggle -->
                <button onclick="toggleTheme()" class="nav-icon-btn" title="Toggle Theme" aria-label="Toggle dark mode">
                    <i class="${isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon'}"></i>
                </button>
                <!-- CTAs -->
                <a href="login.html" class="btn btn-secondary btn-sm">Login</a>
                <a href="contact.html" class="btn btn-primary btn-sm">Book Appointment</a>
                <!-- Mobile Hamburger -->
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Open menu">
                    <i class="fas fa-bars mobile-menu-icon"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Backdrop -->
        <div class="mobile-backdrop" id="mobile-backdrop" onclick="toggleMobileMenu()"></div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobile-menu">
            ${mobileLinksHTML}
            <div class="mob-actions">
                <a href="contact.html" class="btn btn-primary w-full">Book Appointment</a>
                <a href="login.html" class="btn btn-secondary w-full">Login</a>
            </div>
            <div class="mob-toggles">
                <button onclick="toggleDir()" class="nav-icon-btn" title="Toggle Direction">
                    <span class="dir-label" style="font-size:0.625rem;">${isRTL ? 'RTL' : 'LTR'}</span>
                </button>
                <button onclick="toggleTheme()" class="nav-icon-btn" title="Toggle Theme">
                    <i class="${isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon'}"></i>
                </button>
            </div>
        </div>
    </nav>
    <div class="navbar-spacer"></div>`;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const icon = document.querySelector('.mobile-menu-icon');
    if (!menu) return;

    const isOpen = menu.classList.contains('open');
    if (isOpen) {
        menu.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        if (icon) icon.className = 'fas fa-bars mobile-menu-icon';
    } else {
        menu.classList.add('open');
        if (backdrop) backdrop.classList.add('open');
        if (icon) icon.className = 'fas fa-xmark mobile-menu-icon';
    }
}

document.addEventListener('click', function(e) {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-backdrop');
    const btn = document.querySelector('.mobile-menu-btn');
    if (menu && menu.classList.contains('open') && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
        menu.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        const icon = document.querySelector('.mobile-menu-icon');
        if (icon) icon.className = 'fas fa-bars mobile-menu-icon';
    }
});

/* ─── FOOTER ─────────────────────────────────────────── */
function injectFooter() {
    const el = document.getElementById('main-footer');
    if (!el) return;
    el.innerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Column 1: Brand -->
                <div class="footer-brand">
                    <a href="index.html" class="nav-logo" style="margin-bottom:0.5rem;" aria-label="VehicleSure Home">
                        ${getLogoSVG(38)}
                        <div class="nav-logo-text">
                            <span class="brand-top" style="color:#fff;">VehicleSure</span>
                            <span class="brand-bottom">Motor Insurance & Docs</span>
                        </div>
                    </a>
                    <p>Your trusted partner for motor insurance renewal, RC transfer, fitness certificates, and PUC assistance for two-wheelers and four-wheelers.</p>
                    <div class="footer-socials">
                        <a href="#" class="footer-social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="footer-social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="footer-social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        <a href="#" class="footer-social-link" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div>
                    <h4 class="footer-col-title">Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="home2.html">Home 2 — Premium</a></li>
                        <li><a href="services.html">Our Services</a></li>
                        <li><a href="documents.html">Documents Required</a></li>
                        <li><a href="fees.html">Fees & Processing</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>

                <!-- Column 3: Resources -->
                <div>
                    <h4 class="footer-col-title">Resources</h4>
                    <ul class="footer-links">
                        <li><a href="coming-soon.html">Blog & Guides</a></li>
                        <li><a href="coming-soon.html">Careers</a></li>
                        <li><a href="login.html">Login</a></li>
                        <li><a href="signup.html">Sign Up</a></li>
                        <li><a href="404.html">404 Page</a></li>
                        <li><a href="coming-soon.html">Coming Soon</a></li>
                    </ul>
                </div>

                <!-- Column 4: Newsletter -->
                <div>
                    <div class="footer-newsletter">
                        <h4>Stay Informed</h4>
                        <p>Get renewal reminders, document tips & exclusive offers.</p>
                        <form onsubmit="event.preventDefault(); alert('Subscribed successfully!'); this.reset();" class="footer-newsletter-form">
                            <input type="email" placeholder="your@email.com" class="footer-newsletter-input" required>
                            <button type="submit" class="footer-newsletter-btn">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} VehicleSure. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </div>
    </footer>`;
}

/* ─── AUTH PAGE HELPERS ─────────────────────────────────── */
function initAuthPage() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('mivd_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) html.classList.add('dark');
    if (localStorage.getItem('mivd_dir') === 'rtl') html.setAttribute('dir', 'rtl');

    document.querySelectorAll('.theme-icon').forEach(updateThemeIcon);
    document.querySelectorAll('.dir-label').forEach(el => {
        el.textContent = html.getAttribute('dir') === 'rtl' ? 'RTL' : 'LTR';
    });
}

function togglePasswordVisibility(inputId, iconEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        iconEl.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        iconEl.className = 'fas fa-eye';
    }
}

/* ─── FAQ TOGGLE ─────────────────────────────────────────── */
function toggleFAQ(el) {
    const item = el.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(faq => faq.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
}

/* ─── TAB SYSTEM ─────────────────────────────────────────── */
function switchTab(tabId, groupName) {
    const group = groupName || 'default';
    document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll(`.tab-panel[data-group="${group}"]`).forEach(panel => panel.classList.remove('active'));
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const activePanel = document.getElementById(tabId);
    if (activeBtn) activeBtn.classList.add('active');
    if (activePanel) activePanel.classList.add('active');
}

/* ─── SCROLL ANIMATIONS ─────────────────────────────────── */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* ─── COUNTER ANIMATION ─────────────────────────────────── */
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const suffix = el.getAttribute('data-suffix') || '';
                const prefix = el.getAttribute('data-prefix') || '';
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = prefix + current.toLocaleString() + suffix;
                }, 25);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
}

/* ─── NAVBAR SCROLL ────────────────────────────────── */
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 15) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
}, { passive: true });

/* ─── INIT ON DOM READY ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
    injectNav();
    injectFooter();
    initScrollAnimations();
    animateCounters();
});
