# DietNER

## Installation
Installation tested on node `V18` for server and node `V16` for React.

```bash
$ cd DietNER
$ npm install package.json
$ cd client
$ npm install package.json
$ docker run -d --name nlp_demo -p 27017:27017 mongo
$ docker ps # verify that the container is running.
$ node server.js # start server.
$ node public/js/seed.js
$ cd client
# ensure node version manager is installed (or any other tool to switch node version)
$ nvm install lts/gallium # node v16
$ npm run start # start react client
$ go to localhost:3000 on browser, if CSS is not loading then refresh page.
```

# Named Entity Recognition 
# Home
![Home](../master/Showcase/home.jpg)
# Users
![Users](../master/Showcase/users.jpg)
# Diet Plan
![Diet Plan](../master/Showcase/foods1.jpg)
![Diet Plan](../master/Showcase/foods2.jpg)
# Calories
![Calories](../master/Showcase/calories.jpg)
# Console
![Console](../master/Showcase/console.jpg)
