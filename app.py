from flask import Flask, render_template, send_from_directory
import os
# Импортируем Flask-Minify
from flask_minify import minify 

app = Flask(__name__)

# --- Инициализация Flask-Minify ---
# HTML, CSS и JS будут автоматически минифицированы.
minify(app=app)
# ------------------------------------

@app.route('/')
def home():
    # Шаблон index.html будет автоматически минифицирован после рендеринга.
    return render_template('index.html')

# МАРШРУТ ДЛЯ НОВОЙ СТРАНИЦЫ
@app.route('/museum-map')
def museum_map():
    # Шаблон museum_map.html также будет автоматически минифицирован.
    return render_template('museum_map.html')

# Маршруты для иконок (без изменений)
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