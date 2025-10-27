from flask import Flask, render_template, send_from_directory
import os
from flask_minify import minify 

app = Flask(__name__)

# --- 1. Настройка кэширования статических файлов ---
# Устанавливаем кэширование статических файлов (CSS, JS, Fonts, Images) на 30 дней.
# Это максимально ускоряет повторные загрузки.
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 60 * 60 * 12  # 12 часов

# --- Инициализация Flask-Minify ---
# HTML, CSS и JS будут автоматически минифицированы.
minify(app=app)
# ------------------------------------

# --- 2. Добавление заголовков кэширования для HTML-страниц ---
@app.after_request
def add_cache_headers(response):
    """
    Добавляет заголовки Cache-Control для динамических HTML-страниц (text/html).
    """
    if response.content_type == u'text/html; charset=utf-8':
        # Кэшируем HTML на 5 минут (300 секунд), разрешаем публичное кэширование.
        # must-revalidate гарантирует, что браузер проверит наличие новой версии
        # после истечения 5-минутного лимита.
        response.headers['Cache-Control'] = 'public, max-age=300, must-revalidate'
    
    return response

@app.route('/')
def home():
    # Шаблон index.html будет автоматически минифицирован после рендеринга.
    return render_template('index.html')

# МАРШРУТ ДЛЯ НОВОЙ СТРАНИЦЫ
@app.route('/museum-map')
def museum_map():
    # Шаблон museum_map.html также будет автоматически минифицирован.
    return render_template('museum_map.html')

# Маршруты для иконок (без изменений, теперь кэшируются на 30 дней)
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/favicon-16x16.png')
def favicon_16():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon-16x16.png', mimetype='image/png')

@app.route('/favicon-32x32.png')
def favicon_32():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon-32x32.png', mimetype='image/png')

@app.route('/apple-touch-icon.png')
def apple_touch_icon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'apple-touch-icon.png', mimetype='image/png')

@app.route('/android-chrome-192x192.png')
def android_chrome_192():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'android-chrome-192x192.png', mimetype='image/png')

@app.route('/android-chrome-512x512.png')
def android_chrome_512():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'android-chrome-512x512.png', mimetype='image/png')

if __name__ == '__main__':
    # Flask-Minify будет работать автоматически!
    app.run(debug=False)