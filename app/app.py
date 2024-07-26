from flask import Flask, render_template, send_from_directory
import requests

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        base_url = 'https://backend.frontendmentor.io/rest/v2/articles'
        all_articles = []
        page = 1

        while True:
            response = requests.get(f'{base_url}?page={page}')
            if response.status_code != 200:
                break  # Stop if the response status is not OK
            try:
                response_data = response.json()
            except ValueError:
                break  # Stop if JSON decoding fails
            if not response_data:  # Break the loop if no more articles are returned
                break
            if 'data' in response_data:
                all_articles.extend(response_data['data'])
            else:
                break  # Stop if the response structure is unexpected
            page += 1

        siteTitle = "Blog preview card Frontend Mentor"
        return render_template('index.html', siteTitle=siteTitle, response=all_articles)

    @app.route('/robots.txt')
    def robots_txt():
        return send_from_directory(app.static_folder, 'robots.txt')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)