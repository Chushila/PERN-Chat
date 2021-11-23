# PERN-Chat
Hello, I created PERN application based on this guide video https://www.youtube.com/watch?v=tBr-PybP_9c&t=5321s.
Here is my App deployed on Heroku:https://pern-messaging-app.herokuapp.com
I added backend database as PostgreSQL and used Redux store instead of contexts.
Also, I added Google sign in with Passport.js, but it works with only pre-defined User Emails and it needs HTTPS to fix.
I did not wanted to create OAuth login because I decided to not store passwords for my Users.

In order to run it locally, you will need some environmental variables:
PG_USER
PG_PASSWORD
PG_HOST
PG_PORT
PG_DATABASE
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET;

Postgress related variables can be obtained in PgAdminv4, after you created database in Postbird or other PosgreSQL programm.
Also, I will provide SQL Queries to create tables in database.md 


Attention!!!
Google related variables are not needed because Google authentication will not work locally, so you can put any value in them.
