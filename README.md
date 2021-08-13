
# Climb Data

Duration: 2 week sprint

## Description

Current rock-climbing apps don’t allow users to store important information about what routes they have climbed, nor do they visualize data in a useful way. This full stack app allows users to enter and store information about what routes they are climbing and working on, including the main hold type of the route and the wall angle. After entering, users can view those routes in graph form, allowing them to see strengths and weaknesses beyond what a simple route grade reveals.

## Technology

Mobile First App made using:

JavaScript,
Material UI,
Chart.js,
Passport,
React,
React - Redux,
React - Saga, 
Jest,
Axios,
Node.js,
Express,
PostgreSQL, and
Postico.

## Development Setup Instructions

Make sure these are all installed:
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
   Replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep the application secure ([https://passwordsgenerator.net/](https://passwordsgenerator.net/)). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`


