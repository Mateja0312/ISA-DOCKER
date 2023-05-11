# ISA-22-23 DOCKER

### IMPORTANT NOTES

It is only required to have Docker installed on your machine for this app to run.

Application is using 3 main containers:
- ***cli*** - frontend container (_localhost:8080_)
- ***app*** - backend container (_localhost:8081_)
- ***mysql_server*** - database (_localhost:3306_)

The 4th container, ***mailcatcher*** is used to catch emails which are sent when a new registration is attempted. The email contains a link for account activation. It can be accessed at _localhost:1080_

**Please check the availability of specified the ports before running the application.**

### Setup guide:

1. Inside the main project directory run: 'docker compose up'. This command will create the required images and run containers.
2. Seed the database by running 'npx sequelize-cli db:seed:all --config "config/config.json" --env "production"' from the 'isa-docker-app' container

#### Application:
App should be running on: http://localhost:8080
Login credentials for every seeded user:  
- username: <users_role>@gmail.com, e.g. client@gmail.com  
- password: 123

#### Email:
- To send emails, configure an SMTP server and enter its credentials into .env
