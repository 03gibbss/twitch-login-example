Simple express server to handle login with twitch to create and save a user to a mongoDB database with mongoose.

Uses passport to handle authentication and sessions.

Includes logic for protected routes for logged in users, users with specific roles and guest only routes.

To run this locally you will need to git clone the project, run npm install, create a .env file from the example file, and create a new twitch application (https://dev.twitch.tv/console/apps) and mongoDB database (https://www.mongodb.com/atlas/database/)
