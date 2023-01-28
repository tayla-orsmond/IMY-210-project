Tayla Orsmond u21467456
--------------------------------------------------------
IMY 210 Project - Node.js server and Vue Schedule App
--------------------------------------------------------
This app allows you to create your own schedule, view events,
create new events, delete events and update existing events
attatched to your profile's schedule. It also allows you to
view other's schedules (although you may not change anything).

The xml files on the backend are automatically validated by my
xsd document from phase 1. 

How to run the application:
---------------------------
BACKEND: (nodejs api) [PORT: 3000]
---------------------------
1. Navigate to the RESTful folder
2. Open up the terminal from within the folder
3. Run the command "npm start" 
4. The server should install all the required dependencies
and begin running using nodemon. 

The server will begin running on port 3000 and in the browser 
you should be able to see 
"Hello, world! Welcome to my schedule api!"

---------------------------
FRONTEND: (vue app) [PORT: 8080]
---------------------------
1. Navigating to the Vue folder, you can run the command "npm install" to download all 
dependencies needed for the app, and then "vue serve" to run the server.

(if there is a CORS issue, the app is probably not running on port 8080, my API only allows
apps running on port 8080 and port 3000 -itself- to make requests)

2. You should be greeted by a login screen. You can log in as
an existing user (see list below) to be able to edit and change their calandars.
ALternatively, you can create a brand new profile by typing in a unique 5+ character
username and pressing "new user". This will generate a new blank xml file in the db.

The password is immaterial (it's purely for aesthetic purposes) and any 2+ character 
string will allow you to create a new profile/ log in.

3. Once in, you will see either a blank calendar (if you are a new user) or a calendar 
with some events already there (if you are an existing user). 

--- click on any other calendar name on the side to view (only) that person's calendar.
--- click on the refresh button to see any changes made to your calendar 
--- click on the calendar add button next to refresh to add an event to the calendar.
--- the calendar minus option (at the top of the event screen) is to cancel.
--- click on any event in the calendar to edit/delete it
        -- clicking on the event automatically opens the editor
        -- the calendar tick option updates the event with your changes
        -- the calendar cross option deletes the event from the calendar
--- there is also basic calendar navigation like jumping forward/backward and to today
--- if you are viewing anyone else's calendar, the add button is disabled, however you 
can still click on events to view their details, you just can't edit/delete them.

LIST OF EXISTING USERS
----------------------
1. Daddylonglegs
2. Mitski
3. BabyDoll
4. BobRoss
5. TomNook