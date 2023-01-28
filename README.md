# Scheduling App 🗓️

<span style="color:grey">Semester End Project | IMY-210 | 2022</span>

## Navigation

- [About](#about-📖)
- [Built with](#built-with-🛠️)
- [Features](#features-📋)
- [Installation](#installation-📥)
- [Running the App](#running-the-app-📱)
    - [Backend](#backend-📱)
    - [Frontend](#frontend-📱)
- [Actions](#actions-📋)
- [Existing Users](#existing-users-📋)

---

## About 📖

This is a **scheduling app** I made for my second-year module, IMY-210 (Advanced Markup Languages 1). The app is a simple scheduling app that allows users to create their own shecdule as well as add, edit and delete events. The app also allows users to view their events in a calendar view, and view other's calendars (from a simple list).

The frontend is made with Vue, while the backend uses XML. The app makes use of a RESTful api to communicate between these. The xml files on the backend are automatically validated by my xsd document, and, when required, are brought to the frontend and converted to JSON.

The app also makes use of a very basic login system (no security for the purpose of this project), in which existing users are stored in a json file in the "database" (`index.json`), and each have their own .xml file.

---

## Built with 🛠️

![Vue](https://img.shields.io/badge/Vue-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![XML](https://img.shields.io/badge/XML-000000?style=flat-square&logo=xml&logoColor=white)
![XSD](https://img.shields.io/badge/XSD-000000?style=flat-square&logo=xml&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## Features 📋

- Login as an existing user ([Existing Users](#existing-users-📋))
- Create a new user (via "new user" button)
- View your schedule
- View other users' schedules
- Add an event to your schedule
- Edit an event in your schedule
- Delete an event in your schedule
- View your schedule in a calendar view
- Delete your "account" (schedule)

---

## Running the App 📱

*How to install & run the application:*

1. Clone the repository to your local machine

```git
git clone
```

2. Open up the project in your IDE of choice

<span style="color:lightgreen">

### Backend 📱

</span>

*(nodejs api) [`PORT: 3000`]*

1. Navigate to the `RESTful` folder
2. Open up the terminal from within the folder
3. Run the command 

```git
npm start
```

4. The server should install all the required dependencies and begin running using nodemon.

The server will begin running on port 3000 and in the browser 
you should be able to see: "*Hello, world! Welcome to my schedule api!*"

---

<span style="color:lightgreen">

### Frontend 📱

</span>

*(vue app) [`PORT: 8080`]*

1. Navigating to the `Vue` folder, you can run the command

```git
npm install
```

to download all dependencies needed for the app, and then "vue serve" to run the server.

*(if there is a CORS issue, the app is probably not running on port 8080, my API only allows apps running on port 8080 and port 3000 -itself- to make requests)*

2. You should be greeted by a login screen. You can log in as an **existing user** (see [Existing Users](#existing-users-📋)) to be able to edit and change their calandars. 

    Alternatively, you can **create a brand new profile** by typing in a unique 5+ character username and pressing "`new user`". This will generate a new blank xml file in the db.

    > The password is immaterial (it's purely for aesthetic purposes) and any 2+ character string will allow you to create a new profile/ log in.

3. Once in, you will see either a blank calendar (if you are a **new** user) or a calendar with some events already there (if you are an **existing** user).

---

## Actions 📋

- Click on any other calendar name on the side to view (only) that person's calendar.
- Click on the refresh button to see any changes made to your calendar 
- Click on the calendar add button next to refresh to add an event to the calendar.
- The calendar minus option (at the top of the event screen) is to cancel.
- Click on any event in the calendar to edit/delete it
    - Clicking on the event automatically opens the editor
    - The calendar tick option updates the event with your changes
    - The calendar cross option deletes the event from the calendar
- There is also basic calendar navigation like jumping forward/backward and to today
- If you are viewing anyone else's calendar, the add button is disabled, however you can still Click on events to view their details, you just can't edit/delete them.

---

## Existing Users 📋

1. Daddylonglegs
2. Mitski
3. BabyDoll
4. BobRoss
5. TomNook
