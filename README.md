# ISA-22-23

### IMPORTANT NOTES
Application has been tested on Ubuntu 22.04 LTS with node version v16.13.0  
Ports 8080 and 8081 should be free before starting the application, as frontend and backend are meant to use them

### Setup guide:

#### Database setup:
1. Install mysql (for ubuntu: sudo apt-get install mysql-server)
2. Create '.env' file, by copying the '.env.example' file.
3. Create a new connection (credentials should match with .env content)
4. Once connected, create a new schema with the same name defined in .env

#### Frontend/Backend setup:

5. Use 'npm install' command inside both 'server' and 'client' folders to install the required npm modules
6. Use 'npm run serve' command inside both 'server' and 'client' folders to start backend and frontend, respectively  
NOTE: Running the 'npm run serve' command inside the 'server' folder for the first time will generate the required tables in the database

#### Database seeding:
7. Use 'npx sequelize-cli db:seed:all' inside the 'server' folder to seed the database

#### Application: 
8. App should be running on: http://localhost:8080
9. Login credentials for every seeded user:  
    username: 'users_role'@gmail.com, e.g. client@gmail.com  
    password: 123

#### Email:
10. To send emails, configure an SMTP server and enter its credentials into .env
