## Super Simple Scheduling System

### Requirements
- Apache Maven `3.6.3`
- JDK `1.8`
- Nodejs `v14.16.0`
- NPM `7.6.0`

### Instructions for local development
- Clone the repository from the [github repository](https://github.com/c-marv/test-s4) and enter to project root folder. 
```shell
$ git clone https://github.com/c-marv/test-s4.git
$ cd test-s4 
```
- Install react dependencies and build
```shell
$ cd client
$ npm install
$ npm run build
$ cd ..
```
- Run the web application
```shell
$ mvn spring-boot:run
```
- Open web browser on http://localhost:8080

### Instructions to generate `.war` file
```shell
$ mvn compile war:war
```
The `.war` file generated is: `./target/test-s4-0.1.1-SNAPSHOT.war`