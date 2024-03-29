# Teaching System
## Description
The Teaching System is a web-based platform designed to help educators manage and deliver lessons to students.
It offers features for tracking lessons, student progress, 
and ensuring secure user authentication.

## Key Features:

* User authentication and authorization using JWT (JSON Web Tokens).
* Creation, management, and scheduling of lessons.
* Tracking student attendance and participation.
* Secure password storage using bcrypt.
* Integration with MongoDB for data storage.


## Technologies Used:

* Client (React.js): The client-side of the application is built using React.js, a popular JavaScript library for building user interfaces.
* Server (Node.js/Express): The server-side is powered by Node.js and Express.js, providing the API and handling server-side logic.
* Database (MongoDB): MongoDB is used as the database to store lesson data and user information securely.
* Authentication: JSON Web Tokens (JWT) are used for user authentication and authorization.
* Password Security: Bcrypt is used to securely hash and store user passwords.


## Getting Started:
### Client (React.js):
1. Clone the repository to your local machine.
2. Navigate to the client directory.
3. Install dependencies using npm install.
4. Start the client application with npm start.

### server side
1. Navigate to the server directory.
2. Install dependencies using npm install.
3. install local mongodb 
4. run the command that run mongodb
5. run the server by the command npm start ( you should see in the console 'Server is running' 'Connected to db' )
6. chagne the links in react client to ('http://localhost:5000/') instead of deployed server
7. this is swagger documentation for backend [link](https://tahfeeth-system.onrender.com/docs)

## Usage:
After setting up both the client and server, you can access the teaching system through your web browser.
Users can log in, show thier tables. and admin can create lessons, track student attendance, and manage their teaching activities.
The system provides a user-friendly interface for educators and students to interact with the platform.
Contributing:
Contributions to this project are welcome. Please follow the guidelines in the respective README files in the client and server directories for contribution instructions.

## Live Demo
[Live Demo](https://tahfeeth.vercel.app/)

 
