# QuizParty
Project Title:

Quiz Party is a lighthearted trivia quiz app that tests your knowledge on Trivia questions from an external API or from quizzes your create yourself!
You can checkout the leaderboard and follow people that stand out to you as competition or you can search for your friend's username to follow them out of comraderie. 
If you visit your profile, you can update your bio, checkout your friends status, and take a look at your favorited questions and quizzes. 
When you make it to the Play part of the game, you can select your difficulty and category. From there 5 correct answers increases your highscore and game count. Easy categories increase by 1, medium by 2, and hard by 3 highscore points. To create your own quizzes you just need to fill out the form! Then you can edit, play, or share your quizzes with fellow followers. 

Getting Started:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites:

Google Chrome
Gmail Account

Installing:

When opening the repo, make sure to do the following steps in the root directory. When finished, open localhost:3000 to see the rendered app.
npm install
npm run seed
npm build:client-dev
npm start

Deployment:

This app was deployed on AWS in a putty terminal. 
There is an .env file that includes the api token used to get unique questions (not necessary for the API to work), and the google oauth secrets that will need to be added to the pulled down deployed repo. 
Steps to deploy:
  - login in as ubuntu/root user
  - pull origin main from repo
  - run npm install
  - (run seed, if necessary)
  - npm run build:client
  - (update API token, if necessary)
  - start the server
  - go to the deployed urls: 
      option 1: http://18.216.224.164:3000/
      option 2: http://ec2-18-216-224-164.us-east-2.compute.amazonaws.com:3000
  
Built with: 

  Axios- handles client side requests
  Babel- complies the files to be brower compatible
  Bootstrap- styling framework
  Express- node.js framework 
  mySQL- database
  node- executes JS code for server/client side
  Passport- middleware necessary for authentication requests
  Google Oauth- authentication
  React- front end framework
  Sequelize- mySQL database management system

Authors:

Alec Vierbuchen- rvierbuc
Alex Beasley- alexmbeasley
Daniel Jaen- danielalejandrojaen
Gretchen Neuenhaus - neuenhaus14
Stephen Nelson - SNelson723

License:

This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments:

- To all of our kitties at home, and Stephen's chinchilla Pixie