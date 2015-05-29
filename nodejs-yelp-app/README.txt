This is a passthrough app to the Yelp Search API and Yelp Business API
Usage:

1) Clone the repository from: https://innersource.accenture.com/aowp-academy-course2-team-general/nodejs-yelp-app.git
2) navigate to folder that you cloned it into
3) run 'node app.js'

Search API:

Example: http://localhost:8000/search?location=New+York&term=food&limit=2

The Search API supports all of the parameters that the Yelp API accepts.

Business API:

Example: http://localhost:8000/business?id=yelp-san-francisco

The Business API only supports the id parameter (limitation of the underlying NodeJS Yelp/oAuth integration I am using).
