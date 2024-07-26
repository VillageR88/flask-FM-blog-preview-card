from flask import Flask, render_template, send_from_directory
from flask_cors import CORS
import requests
import logging

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Configure logging
    logging.basicConfig(level=logging.INFO)

    @app.route('/')
    def index():
        base_url = 'https://backend.frontendmentor.io/rest/v2/articles'
        all_articles = []
        page = 1

        while True:
            try:
                response = requests.get(f'{base_url}?page={page}')
                response.raise_for_status()  # Raise an HTTPError for bad responses
            except requests.RequestException as e:
                logging.error(f"Request failed: {e}")
                break  # Stop if the request fails

            try:
                response_data = response.json()
            except ValueError as e:
                logging.error(f"JSON decoding failed: {e}")
                break  # Stop if JSON decoding fails

            if not response_data:  # Break the loop if no more articles are returned
                break
            if 'data' in response_data:
                all_articles.extend(response_data['data'])
            else:
                logging.error("Unexpected response structure")
                break  # Stop if the response structure is unexpected

            page += 1

        siteTitle = "Blog preview card Frontend Mentor"
        return render_template('index.html', siteTitle=siteTitle, response=all_articles)

    @app.route('/robots.txt')
    def robots_txt():
        try:
            return send_from_directory(app.static_folder, 'robots.txt')
        except FileNotFoundError:
            logging.error("robots.txt not found")
            return "robots.txt not found", 404

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)