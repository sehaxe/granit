// main.js
// -------------------------------------------------
// Мини‑костыль для «восстановления» поведения в браузерах,
// где `scroll-behavior: smooth;` может не сработать.
// -------------------------------------------------

// Определяем все ссылки в навигации
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();                    // отменяем стандартный переход
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});