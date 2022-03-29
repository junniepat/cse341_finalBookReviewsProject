# cse341_finalBookReviewsProject

Book Reviews API project in fulfillment of the course CSE 341 at BYUI

To run the app locally please follow the instructions below.

1: Download the repo or clone it and then open up a terminal where the downloaded or cloned folder is.

2: In the terminal window you will need to run   npm install  to install all necessary node libraries

3: Next install nodemon (not required but very useful if you want to make changes to the app) run  npm install --save nodemon

4: Next you will need to create a .env file on the root of the folder. This file will contain two variables, MONGODB_URL and SECRET.
    You will need to add your MongoDB database and create your own secret token.

5: After those have been installed and the envirmoment varibles are put in you will need to run this command: npm run swagger

6: Then you can run: npm start

7: Once the app is running navigate to this URL: http://localhost:8080/api-docs