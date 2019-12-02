# Parking System Mobile Web App

## Background
This repository stores the source code of our parking system mobile web app.

- Parking System Mobile Web App: https://parkingwebappmobile.herokuapp.com/
- Parking System Management Console: https://binluis-parkingwebapp.herokuapp.com/login
- Parking System Backend: https://parkingsystem.herokuapp.com/
- Parking System Database: https://parkingsystem.herokuapp.com/h2-console (JDBC URL: jdbc:h2:file:./h2/binluis, User Name: sa, Blank Password)

Remark:
If the credential for parking system does not work, you may signup as below:


POST    https://parkingsystem.herokuapp.com/api/auth/signup

{
    "name":"clerk",
    "username":"clerk",
    "email":"clerk@email.com",
    "password":"clerk",
    "phoneNumber":"98765432",
    "role":"PARKINGCLERK"
}

This parking system is the final project of a bootcamp which we joint in Nov, 2018, we learnt several technology stacks as below

### Programming Languages
- Java
- Javascript

### Frameworks
- React JS
- Spring Boot

## Business Logic of Parking System
Assumption:
We have partnered with some parking service provider which will have their own parking clerks helping customers park their cars.

Our parking system is a platform showing which parking lot a customer is going to park his/her car to so that parking clerks can take the order and make money. On top of that, this parking system provides a management tool, covering utilization rate of each parking lot, resource planning (who are on duty).

Our parking system earns money by subscription for each parking service provider and advertisement.

## Business Flow (a.k.a Quickstart)
1. Create a parking clerk account
2. Create a manager account
3. Create a parking lot and assign a parking clerk to it
4. Create a parking request
5. Parking clerk accept the request
6. Manager can view the resource utilization, e.g. parking lot utilization rate and number of parking clerks
7. Creates a car pick-up request
8. Parking clerk will drive the car to customer's location and let customer pick up the car.

## Team Members (in alphabetical order)
- Connie Ip (Tech Lead & Full Stack)
- Iker Suen (Full Stack & Security Function)
- Kyle Yip (Fullstack)
- Joe Ho (Team Lead & Full Stack)
- Tommy Hui (Frontend)
- Venice Lam (Frontend)
