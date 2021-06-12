# Appointment Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.  

This angular project is a handin for webtechnologies II.  
The application store and manage appointments or to-do notes for users.  
After login you can see your appointments, add new ones and edit or delete the appointments in the *list appointments* link.  
The appointments which are closer to the defined date are appear as <span style="color:yellow">yellow</span>.  
The appointments which are expired, can be only deleted and appear as <span style="color:red">red</span>.

## Manual

To use the application first call the `npm install` in the root directory.  
After this call the `npm run start-frontend` in order to start the client side of the application.  
By the `npm run start-backend` command the backend server started.  
After a successfull start of the front and backend the application started at `http://localhost:4200/`.
After a successful login the list of appointments should appear.

## Features

 - Registration
 - Double password matching 
 - Login
 - User authorization with json web token
 - Appointment creation
 - Appointment modification
 - Appointment deletion
 - Appointment list by user
 - Userid by token 
 - Validation on forms
 - Router restriction (only logged in user can access certain links)
 - Server side restriction (unauthorized reponse if not logged in)
 - User timeout (server and client side)
 - Password SHA256 encryption
 - In case of large appointment body the application automatically collapse it and you can view it by a button.

## Used technologies
 - Angular
 - Node.js
 - Express
 - JWT
 - MongoDB
 - Bootstrap

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
