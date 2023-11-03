# Supermarket 

The current project consist of an application that manage fruit stocks and orders in a supermarket:
- Front-end is developed using React.js
- Back-end is developed using Spring Boot (Java 17)

## Table of Contents

- [Supermarket ](#project-name)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

Developed application has a main view with acces to the fruit list view and to the orders list view.

In the fruit list view the user can acces to:
- A paginated list of the fruits in stock
- A link to add, edit and delete a fruit record in the stock

In the orders list view the user can acces to:
- A paginated list of orders
- A link to create a new order, which returns the price of each fruit on the order and the total price 

## Installation

1. User have to create the database for the project:
    - CREATE DATABASE supermarket_spring_boot
    - USE supermarket_spring_boot

2. Run back-end application:
    1. Install Java:
        - Install JDK from oracle (v17.08)
        - Verify installation on cmd 
            - \> java -version
    2. Install IDE like IntelliJ
    3. Open supermarket-backend project on IntelliJ and run SupermarketBackendApplication

3. Run front-end application:
    1. Install Node JS (v18.17.1):
        - Download the installer for your OS from the official website https://nodejs.org/
        - Verify installation of NodeJS on cmd 
            - \> node --version
    2. Install IDE like VS Code
    3. Open supermarket-frontend folder on VS Code:
        - Install other dependencies
            - \> npm i axios --save
            - \> npm i react-router-dom --save
            - \> npm i react-bootstrap bootstrap
        - Run the application 
            * \> npm start  

## Usage

1. An script (supermarket_spring_boot_fruits.sql) is available to populate the database in MySQL
2. Run back-end and front-end applications
3. Opend front-end in localhost
  
## License

MIT License

Copyright (c) 2023 Ronald Garzón-Bohórquez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
