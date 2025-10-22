// main.js

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav a');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // =========================================================
    // 1. ПЛАВНЫЙ СКРОЛЛ И ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    // =========================================================
    
    function closeMobileMenu() {
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            closeMobileMenu(); // Закрыть меню после клика

            if (target) {
                // Используем небольшую задержку, чтобы гарантировать, что хедер виден
                setTimeout(() => {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100); 
            }
        });
    });

    // =========================================================
    // 2. МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР)
    // =========================================================
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Меняем иконку гамбургера на крестик и обратно
            if (nav.classList.contains('active')) {
                this.querySelector('i').classList.replace('fa-bars', 'fa-times');
            } else {
                this.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    }


    // =========================================================
    // 3. КНОПКА "НАВЕРХ"
    // =========================================================

    if (scrollToTopBtn) {
        // Показать/скрыть кнопку
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Функция прокрутки
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================================
    // 4. SCROLL-REVEAL АНИМАЦИЯ (Intersection Observer)
    // =========================================================
    
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealTargets = document.querySelectorAll('.section-content');

    revealTargets.forEach(target => {
        // Добавляем начальный класс для первой секции, чтобы она появилась сразу
        if (target.id === 'about') {
            target.classList.add('show');
        } else {
            observer.observe(target);
        }
    });

});


// =========================================================
// 5. АНИМАЦИЯ ЗАГРУЗКИ (PRELOADER)
// =========================================================

const preloader = document.getElementById('preloader');

window.addEventListener('load', function() {
    if (preloader) {
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            preloader.remove();
        }, 600); 
    }
});