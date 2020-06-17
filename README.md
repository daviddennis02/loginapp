# Loginapp module
 This is a login module, I developed using NodeJs, PassportJS. It can be plugged into your NodeJs application.
 
 ## Note:
 This project is basically to show or experiment how PasportJs handles User Authentication. 
 It should not be used in a production environment, because data do not persist when you restart the server.
 
 
 Data is currently pushed into an array and reset to an empty array on restarting the server.
 However, It can be modified to suite Production environment by setting up a Database of choice and plugging to the app, so data can persist
 after logout.
 
 
 ## Installation
 
 
 Install the following;
 
 
 NodeJs
 
 
 NPM
 
 
 Nodemon - help automatically restart the node application when file changes in the directory are detected.
 i.e We don't need to type npm start or node server.js always
 
 
 Express
 
 
 EJS - template/view engine
 
 
 Dotenv - allows you to separate secret from your source code.
 
 
 PassportJS - Authentication, provides form details.
 
 
 Bcrypt - Hash user passwords for security.
 
 
 method-override - allow us to use DELETE http method in HTML
 
 
 Express Session - manage user's session
 
 
 Express Flash - help define flash message and render to the page without redirecting, 
 especially when there we need to inform a the user about an error during login or registration.


  ## Clone 
  git clone https://github.com/daviddennis02/loginapp.git
  
  
  npm install 
  
  
  Create a .env file to manage your environment variables - place this in the file "SESSION_SECRET=<your_secret>"
  
  
  nodemon start to start your server (App runs on Port:3000)



 
