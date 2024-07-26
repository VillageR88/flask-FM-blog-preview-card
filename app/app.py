from flask import Flask, render_template, send_from_directory
import requests

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        response = requests.get('https://backend.frontendmentor.io/rest/v2/articles')
        response_data = response.json()  # Parse JSON data
        siteTitle = "Blog preview card"
        return render_template('index.html', siteTitle=siteTitle, response=response_data)

    @app.route('/robots.txt')
    def robots_txt():
        return send_from_directory(app.static_folder, 'robots.txt')

    return app