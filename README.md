Collaborative Online Judge System
=========
## Overview

*   Implemented a web-based collaborative code editor which supports multiple user editing simultaneously
*  Developed a  web application with Angular2 for frontend, OAuth for authentication, NodeJS for backend and MongoDB for database
* Used the socket.io as the communication protocol to handle the heavy client-server communication and used ACE, as client-side source code editor
* Built a user-code executor service in flask and execute user’s code in Docker container

![image1](https://s3.amazonaws.com/onlinejudge112/image/s4.png)

#Showcase
Home page 
![image1](https://s3.amazonaws.com/onlinejudge112/image/s1.png)
After authentication
![image1](https://s3.amazonaws.com/onlinejudge112/image/s2.png)
Edit page
![image1](https://s3.amazonaws.com/onlinejudge112/image/s3.png)

## How to run 

### Installation 
1. Install NodeJs:
```
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```
 
2. Install Nodemon

```
npm install -g nodemon
```

3. Install git
```
sudo apt-get install git
```

4. Install angular/cli
```
    npm install -g @angular/cli
```

5. Install Redis
```
    wget http://download.redis.io/releases/redis-3.2.6.tar.gz
    tar xzf redis-3.2.6.tar.gz
    cd redis-3.2.6
    make
    sudo make install
    cd utils
    sudo ./install_server.sh
```

6. Install python 2.7  
This is installed already in Ubuntu

7. Install pip
```
    (sudo apt-get update)
    sudo apt install python-pip
    sudo pip install Flask
```

8. Install Docker: 
```
    curl -fsSL https://get.docker.com/ | sh
```

9. Setup docker permission: 
```
   sudo usermod -aG docker $(whoami)
   # need to logout and login again after set permission
   To start docker when the system boots: sudo systemctl enable docker
```

10. Install Nginx  
   For ubuntu 16.04) Add following two lines into /etc/apt/sources.list 
```
   deb http://nginx.org/packages/ubuntu/ xenial nginx 
   deb-src http://nginx.org/packages/ubuntu/ xenial nginx 
``` 
   Then run: 
```
   sudo apt-get update 
   sudo apt-get install nginx
```
### Execute 
1. make sure replace the mongoDB  connection url and google API key for OAuth

run: 
```
   sudo sh launcher.sh
```
