# In Class 01260

```shell
#
docker run -p 8081:80 -v C:\Projects\<YOUR PROJECT FOLDER>\dist:/usr/share/nginx/html -d nginx

#
docker build -t allanbarcelos/in-class-2160:v1 .

#
docker run -e MARIADB_ROOT_PASSWORD=123456 -e MARIADB_DATABASE=in-class-db -e MARIADBL_USER=in-class-user -e MARIADB_PASSWORD=654321 -p 3306:3306 -d mariadb

```

# Good knowledgment in Linux/Unix
- Unix system = Linux (Debian, Ubuntu, Redhat, Slackware ... ), OS (Apple)

# Recomendation
You can run Ubuntu container in your machine and try do simple things using Linux commands.


# Next step
# create multiple and independets services
/ web --> container 1
/ api --> container 2
/ database --> conatiner 3 

# Docker Compose


## Load Balance

[Docker Load Balance](https://medium.com/@aedemirsen/load-balancing-with-docker-compose-and-nginx-b9077696f624)

WS1 WS2 WS3
C1   C2  C3
C4
(Load Balance Server)

^
.
.

C1 C2 C3 C4 ...