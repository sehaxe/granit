// main.js

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav a');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Элементы слайдера
    const slides = document.querySelectorAll('#hero-slider .slide');
    const dotsContainer = document.querySelector('.slider-dots-container');
    let slideIndex = 0;
    let slideTimer;
    
    // =========================================================
    // 0. ФУНКЦИИ СЛАЙДЕРА
    // =========================================================
    
    function showSlides(n) {
        // Останавливаем таймер перед сменой слайда
        clearInterval(slideTimer); 
        
        // Пересчитываем индекс для цикличного показа
        if (n >= slides.length) {slideIndex = 0}    
        if (n < 0) {slideIndex = slides.length - 1}
        
        // Скрываем все слайды и деактивируем все точки
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        // Показываем текущий слайд и активируем текущую точку
        slides[slideIndex].classList.add('active');
        document.querySelectorAll('.dot')[slideIndex].classList.add('active');
        
        // Запускаем таймер снова
        slideTimer = setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000); // Смена каждые 5 секунд
    }
    
    function currentSlide(n) {
        slideIndex = n;
        showSlides(slideIndex);
    }
    
    // Создание точек навигации
    function createDots() {
        if (!dotsContainer) return;
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => currentSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Инициализация первого слайда после создания точек
        if (slides.length > 0) {
            showSlides(slideIndex);
        }
    }

    createDots(); // Запускаем создание слайдера
    
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
            
            closeMobileMenu(); 

            if (target) {
                // Учитываем высоту хедера при прокрутке
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
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

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
        // Пропускаем первую секцию (about), так как она уже имеет класс 'show' в HTML
        if (target.id !== 'about') {
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
        }, 600); // Задержка для плавной анимации исчезновения
    }
});