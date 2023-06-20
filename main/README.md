# ISA-DOCKER

### ABOUT THIS REPO

This project is derived from ISA-22-23.   
ISA-22-23 is a single page web application developed using vue, node, express and a mysql database.
The purpouse of ISA-DOCKER is to utilize dockers virtualization in order to eliminate the mundane configuration tasks as well as make any future development easier, faster and portable.

### IMPORTANT NOTES

It is required to install Docker in order to run this project.

Application is using 3 main containers:
- ***cli*** - frontend container (_localhost:8080_)
- ***app*** - backend container (_localhost:8081_)
- ***mysql_server*** - database (_localhost:3306_)

The 4th container, ***mailcatcher*** is used to catch emails which are sent when a new registration is attempted. The email contains a link for account activation.   It can be accessed at _localhost:1080_

**Please check the availability of the specified ports before running the application.**

### Setup guide:
1. Add the .env file by copying the .env.example and setting all the parameters (SMTP_USERNAME and SMTP_PASSWORD not required if using mailcatcher).
    - **IMPORTANT**: Make sure the DB_HOST and SMTP_HOST are set as the names of the containers containing the database and the mailcatcher.
2. Add a folder named 'qrcodes' in the 'server' folder.
3. Inside the main project directory run: 'docker compose up'. This command will create the required images and run containers.
4. Seed the database by running 'npx sequelize-cli db:seed:all --config "config/config.json" --env "production"' from the 'isa-docker-app' container

#### Application:
App should be running on: http://localhost:8080
Login credentials for every seeded user:  
- username: <users_role>@gmail.com, e.g. client@gmail.com  
- password: 123

#### Email:
- To send emails, configure an SMTP server and enter its credentials into .env
