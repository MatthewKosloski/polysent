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

3. Remove the old directory.
  ```sh
    $ rm -rf /opt/polysent
  ``` 
  
4. Clone this repo into `/opt/polysent`.
  ```sh
    $ git clone https://github.com/MatthewKosloski/polysent.git /opt/polysent
  ``` 
  
5. Change directory to `/opt/polysent` and install the node modules.
  ```sh
    $ cd /opt/polysent
    $ npm install
  ``` 
  
6. Restart the server.
  ```sh
    $ pm2 restart server
  ``` 

  ###In the event of an error after all steps
  
  If the server errors, do the first 5 steps again.  Then, after the 5th step:
  
  1. Show the list of the currently running processes.  Under "status" for the server app it should say "errored" in red. 
    ```sh
      $ pm2 list
    ``` 
    
  2. Delete the server process and refresh the list.  (process should be removed and the list empty)
    ```sh
      $ pm2 delete server
    ``` 
    
  3. Now to recreate the process, run this:
    ```sh
      $ NODE_ENV=production PORT=80 pm2 start server.js --watch
    ``` 
    
  4. Run the `pm2 list` command at least two times to check for fatal errors.
