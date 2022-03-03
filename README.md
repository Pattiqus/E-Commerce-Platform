# E-Commerce-Platform
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Description
This application was created as a functional backend for an online retail company operating in the E-commerce space. It utilises the latest and greatest technology to ensure a seamless user experiance and optimal competivness. 
The application utilized CRUD methodology to allow the business to control and moniter:
- Products (Search / Update / Delete)
- Categories
- Product tags to group related products
- Stock levels
- Pricing

The application was written using JavaScript and includes the following technologies: 
- [Node.js](https://nodejs.org/en/) 
- [mysql2](https://www.npmjs.com/package/mysql2) 
- [Sequalize](https://sequelize.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
# Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#tests)
# Installation
The following dependencies are necessary to run this application: 

- To run this application effectively, please have Node.js & mySQL installed on your computer, other required modules are bundled in the package.json file provided, by running “npm install” from the command prompt, these modules will be installed.
- Have your mySQL password on hand. To avoid any potential data breaches and security risks, ensure that the ```.gitignore``` file includes the ```.env``` Environment file as to not upload your sensitive information. Create a ```.env``` file with the below:

```DB_NAME = ecommerce_db```
```DB_USER = root```
```DB_PASSWORD = yourPassword```

- yourPassword is the password which you have set for as the root user of mySQL on your local comptuter. 
- locate to ```/db``` and run the following command in your terminal ```mysql -u root -p```, you will then be prompted for you password.
- Type ```source schema.sql```, this will pre populate your DB with the required rows and columns. Then type ```quit`` to return to the terminal.
- Navigate to your root repository and run ```npm start```.

# Usage
In order to use this application please follow these instructions: 
This application does not have a dedicated front end to to interaction will occur through an API client such as```Insomnia``` or ```Postman```.
## Demonstration Video
- [Click-for-Demo-Video](https://drive.google.com/file/d/1ZeVpMDLesnr5SW0MvGKS088lTCVfnk9o/view?usp=sharing)
# License
This project is licensed under:
- [MIT](https://opensource.org/licenses/MIT)

# Contributing
Contributors: 

```
Pat Brown (Pattiqus)
```
# Tests
This application was not developed using a Test driven environment.

# Screenshots
- [Main-menu](./assets/images/mainMenu.PNG)
- [Main-menu-2](./assets/images/mainMenu2.PNG)
- [Sample-1](./assets/images/example1.PNG)
- [Sample-2](./assets/images/example2.PNG)


# Questions
If you have any qestions regrading the repository or the project please contact: <ul><li>GitHub:  <a href=https://github.com/pattiqus>pattiqus</a></li> <li>Email: <a href=mailto:Patticus.tv@gmail.com>Patticus.tv@gmail.com</a></li><li>LinkedIn: <a href=https://www.linkedin.com/in/patrick-brown-52553410a>Patrick Brown</a></li></ul>

# Links
- [Source-code](https://github.com/Pattiqus/E-Commerce-Platform)