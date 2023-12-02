# QuizParty


Quiz Party is a lighthearted trivia quiz app that tests your knowledge on Trivia questions from an external API or from quizzes your create yourself!
Check out the leaderboard, increase your highscore, and challenge yourself against your friends.

## Getting Started:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites:

- Google Chrome
- Gmail Account
- Google Client ID for Authenication
- API key from https://opentdb.com/api_config.php

### Setup:

Create a Google Client ID for Google Authentication and save the Google client ID and Google client secret as GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the .env file. When opening the repo, make sure to do the following steps in the root directory. When finished, open localhost:3000 to see the rendered app. 

### Scripts:
  - npm install (installs all dependencies)
  - npm run seed (seeds the database)
  - npm run build:client-dev (builds the client for the development environment)
  - npm start (starts the server and serves the client)


## Deployment:

This app was deployed on AWS in a putty terminal.

There is an .env file that includes the api token used to get unique questions (not necessary for the API to work), and the google oauth secrets that will need to be added to the pulled down deployed repo.
Steps to deploy:
  - create AWS account and ec2 instance to handle deploying
  - login in as ubuntu/root user
  - pull origin main from repo
  - run npm install
  - (run seed, if necessary)
  - npm run build:client
  - (update API token, if necessary)
  - start the server

## Built with: 

  - [Axios](https://axios-http.com/docs/api_intro)- handles client side requests
  - [Babel](https://babeljs.io/docs/)- complies the files to be brower compatible
  - [Bootstrap](https://getbootstrap.com/)- styling framework
  - [Express](https://expressjs.com/)- node.js framework 
  - [mySQL](https://www.mysql.com/)- database
  - [node](https://nodejs.org/en)- executes JS code for server/client side
  - [Passport](https://www.passportjs.org/)- middleware necessary for authentication requests
  - [Google](https://www.oauth.com/oauth2-servers/signing-in-with-google/) Oauth- authentication
  - [React](https://react.dev/)- front end framework
  - [Sequelize](https://sequelize.org/docs/v7/getting-started/)- mySQL database management system (ORM)

### Authors:
  - Alec Vierbuchen- [rvierbuc](https://github.com/rvierbuc)
  - Alex Beasley- [alexmbeasley](https://github.com/alexmbeasley)
  - Daniel Jaen- [danielalejandrojaen](https://github.com/danielalejandrojaen)
  - Gretchen Neuenhaus - [neuenhaus14](https://github.com/neuenhaus14)
  - Stephen Nelson - [SNelson723](https://github.com/SNelson723)

#### License:

This project is licensed under the MIT License - see the LICENSE.md file for details

#### Acknowledgments:

- To all of our kitties at home, and Stephen's chinchilla Pixie