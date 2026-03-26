document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeBtn = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    });

    function updateThemeIcon(theme) {
        themeBtn.forEach(btn => {
            btn.innerHTML = theme === 'light' ? '🌙' : '☀️';
        });
    }

    // 2. RTL Toggle
    const rtlBtn = document.querySelectorAll('.rtl-toggle');

    const savedDir = localStorage.getItem('direction') || 'ltr';
    html.setAttribute('dir', savedDir);

    rtlBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
        });
    });

    // 3. Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '☰';
            });
        });
    }

    // 4. Back to Top
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Active Link Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 6. Sticky Navbar Shadow
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // 7. Animations on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // If using a separate visible class
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
});
