# Polysent

[Polysent](http://polysent.com/) is an online poll maker that allows you to instantly obtain anonymously-submitted results with ease. In addition, you can browse and participate in other polls that people have submitted. The types of polls that you'll find here are relative to a myriad of topics such as: politics, entertainment, technology, etc.

Contact email: polysentdotcom@gmail.com

## Running locally

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
  $ gulp [dev|build]
```

## Docker

The web application is served from within a Docker container on a Digital Ocean VPS droplet running Ubuntu 18.04.

### Steps to Build The Image and Push to DockerHub

#### 1. Building the Image

To build an image for Polysent, type the following command from within the root directory:

```
  $ docker build -t matthewkosloski/polysent .
```

#### 2. Pushing the Image

Push the image to [DockerHub](https://hub.docker.com/u/matthewkosloski):

```
  $ docker push matthewkosloski/polysent
```

### Steps to Start up a Container Using A Previously Built Image

#### 3. Log in to VPS server

```
  $ ssh matt@polysent.com
```

#### 4. Pull the latest Image of Polysent

```
  $ sudo docker pull matthewkosloski/polysent
```

You can optionally delete the older images of Polysent with the `prune` command:

```
  $ sudo docker system prune
```

#### 5. Create a New Container

Create a new container for the Polysent web app.

Explanation of the command:

- `--network="host"`: Allows us to connect to the Mongo database running on the host (the VPS server).  Now, `localhost` in the app refers to the host (e.g., 'mongodb://localhost:27017/polysent').
- `--name=polysent_container`: By default, Docker generates a random name for the container.  This provides the container with the name of `polysent_container`.  This is helpful when we want to stop the container.
- `--rm`: This means that when we stop the container using `sudo docker stop polysent_container`, the container will automatically be deleted.  To confirm this, simply run `sudo docker ps -a`.
- `-d`: This means that we want the container to run in the background.  In other words, we do not want to be inside of the shell of the container after we run it.
- `matthewkosloski/polysent`: This is the name of the image.

```
  $ sudo docker run --network="host" --name=polysent_container --rm -d matthewkosloski/polysent
```

### Steps to Run a New Container with an Updated Image

When there is an updated image for Polysent, we would like to create a new container with it.

#### 1. Stop and Remove the Old Container

Use the following command to stop the old container (This assumes the name of the old container is `polysent_container`):

```
  $ sudo docker stop polysent_container
```

If the old container was ran using the `--rm` flag, it should have been deleted after running the above command.  To confirm, simply run:

```
  $ sudo docker ps -a
```

#### 2. Pull the New Image

Download the latest version of the Polysent image from DockerHub:

```
  $ sudo pull matthewkosloski/polysent
```

#### 3. Run the Container

```
  $ sudo docker run --network="host" --name=polysent_container --rm -d matthewkosloski/polysent
```

### Steps to Deploy on a new Digital Ocean Droplet

If we need to create a new droplet for Polysent, follow the below steps to set up a new droplet.

#### 1. Create the Droplet from the Digital Ocean Dashboard

We first want to create a droplet running Ubuntu.  Log in to Digital Ocean and create a new droplet, preferable the lowest tier running from New York.  Make sure to include your computer's SSH key to the droplet.

#### 2. Perform Initial Server Setup

Follow the steps in [this](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) blog post to perform initial server setup.  This includes created a non-root sudo user and setting up the `ufw` firewall.

#### 3. Install Docker

Follow the beginning part of [this](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04) blog post to install Docker on Ubuntu.

#### 4. Install MongoDB

Follow the steps in [this](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04) blog post to install MongoDB.

#### 5. Pull the Polysent Image from DockerHub.

```
  $ sudo docker pull matthewkosloski/polysent
```

#### 6. Start a Container

Follow the above steps to start a container.

## Export Database

We can use the `mongoexport` command to export the contents of the `polls` collection, which is part of the `polysent` database:

```
$ mongoexport --db polysent --collection polls --out polls_2020_04_20_1820.json
```

The filename convention we are using is `collection_YYYY_MM_DD_HHMM.json` where `HHMM` is time on the 24-hour clock.

## Import Database

We can use the `mongoimport` command to import the contents of a json file to populate the `polls` collection, which is part of the `polysent` database:

```
$ mongoimport --db polysent --collection polls --file polls_2020_04_20_1820.json
```
