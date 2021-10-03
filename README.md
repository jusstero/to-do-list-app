# To-do list app
This project is a full stack to-do list web application and was developed as a school project during late 2020 for a full stack web development course. Users can add tasks to a to-do list. Tasks have a name, deadline and a priority. Users can also edit or delete existing tasks. Frontend is built with React and tasks are saved to a SQL database.

The project is deployed to Heroku and is accessible from this url:
https://tamk-4a00ez62-3002-group24.herokuapp.com/

API entry point is located in
https://tamk-4a00ez62-3002-group24.herokuapp.com/api

<img src=todo-screenshot.png>



## Install instructions

Clone the repository:

    git clone https://github.com/jusstero/to-do-list-app


Move to the directory:

    cd to-do-list-app

Install modules:

    npm install
    
Move to frontend directory, install modules:

    cd todo-front
    npm install
    
Modify API_URL in todo-front/src/APIFunctions.js:

    import axios from "axios"
    
    const API_URL = "http://localhost:8080/api"
    
Create a frontend build:

    npm run build
    

Login to your SQL database and create a table:

    CREATE TABLE todos (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) DEFAULT NULL,
    is_done tinyint(1) NOT NULL DEFAULT '0',
    priority int(11) NOT NULL DEFAULT '0',
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deadline date DEFAULT NULL,
    PRIMARY KEY (id)
    );
    
Insert data:

    INSERT INTO todos(name, is_done, priority, deadline) VALUES("Do the dishes", 0, 5, "2020-12-31");
    

Edit database/herokuconfig.js file to match your own database 

    module.exports = {
      host: your_database_url,
      user: your_username,
      password: your_password,
      database: your_database, 
    };
    

Move to project root and start the app:

    npm start
    
Open your browser and enter 

    http://localhost:8080/
