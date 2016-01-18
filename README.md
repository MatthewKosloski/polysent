# Polysent
[Polysent](http://polysent.com/) is an online poll maker that allows you to instantly obtain anonymously-submitted results with ease. In addition, you can browse and participate in other polls that people have submitted. The types of polls that you'll find here are relative to a myriad of topics such as: politics, entertainment, technology, etc.

##Running locally

1. Startup Mongo database:
  ```sh
    $ mongod
  ```
  
2. Start the app (in a new tab or window):
  ```sh
    $ nodemon
  ```
  
3. Start gulp (in a new tab or window):
  ```sh
    $ gulp
  ```
  
##Deploying to Digital Ocean

1. SSH into the server via Terminal. (username@PUBLIC_IP_ADDRESS)

2. Tell NVM to use Node v5.
  ```sh
    $ nvm use 5.0
  ``` 
  
3. Clone this repo.
  ```sh
    $ git clone https://github.com/MatthewKosloski/polysent.git /opt/polysent
  ``` 
  
4. Change directory to `/opt/polysent` and install the node modules.
  ```sh
    $ cd /opt/polysent
    $ npm install
  ``` 
  
5. Restart the server.
  ```sh
    $ pm2 restart server
  ``` 
