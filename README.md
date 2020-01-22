# News_Scraping_App

## Objective

The objective of this app is a allow an user to review Podcasts from NPR's Planet Money Podcast.  

##  Organization

The app is uses Node JS (with express) to run the server side code, with a mongoDB database to warehouse the data and Handlebars as the template engine.

- **main file** -- server.js
    - uses express to launch app and handles all route request from client side
    - connect mongoDB to the app using mongoose 
    - defines express-handlebars settings to use as a template engine
    - uses cheerio and axios to get html content of a webpage and scrap of specific info about the podcasts

- **NPM packages** -- package.json
    - houses app info and required packages (useful for new install and run on servers)

- **views** -- folder
    - layouts - contains the main handlebars file that is displayed for each unique handlebar page
    - index.handlebars is displayed on "/" route using render function
    - mypodcasts.handlebars is displayed on"/mypodcasts" route using render function

- **public/assets** -- folder
    - app.js - client side JS code to handles all click events

## How to Run

### app
1. clone or fork repo to your computer using git commands or github's website
2. run ```npm install``` in CLI to download required node modules to run app
3. navigate to folder with file contents in CLI (e.g. terminal)
4. enter the following line: 
    - ```node server.js```
5. access using browser with URL localhost:3000
6. click **Scrap New Podcasts** to get new podcasts
7. click **Link to Podcast** to visit the NPR website for specific podcast
8. click **Add Review** to add a review to specific podcast
9. click **Save Podcast** to save the podcast for review or listening in the future
10. click **My Podcasts** to view saved podcasts

## Deployment

link: 
github: https://github.com/parthmparmar/News_Scraping_App
heroku: 

## Technologies Used

- npm: to install required modules
- express: to enable server side http request
- node: to program server side workload and logic
- MongoDB: to house and manage the data
- Mongoose: to add schema and simplify interaction with MongoDB
- handlebars: to create page elements from data retrieved from the database and serve to the client

## Contact

Parth Parmar -- developer of the find a friend app using the technologies mentioned above


