# Employee Management CLI App

## Overview

This CLI application allows you to manage departments, roles, and employees in a company database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Dependencies](#dependencies)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Navigate to the project directory: `cd employee-management-cli`
3. Install dependencies: `npm install`

## Usage

To use the application, follow these instructions:

1. Start the application: `node index.js`
2. Choose from the main menu options:
   - Add departments, roles, or employees.
   - View all departments, roles, or employees.
   - Update employee roles or managers.
   - Delete departments, roles, or employees.
   - Exit the application.

## Database Setup

Before running the application, ensure your PostgreSQL database is set up:

1. Create a database named `employee_db`.
2. Set up the following tables:
   - `departments` (id, name)
   - `roles` (id, title, salary, department_id)
   - `employees` (id, first_name, last_name, role_id, manager_id)
3. Define environment variables for database connection:
   - DB_HOST=localhost
   - DB_USER=your_username
   - DB_PASSWORD=your_password
   - DB_NAME=employee_db
   - DB_PORT=5432

## Dependencies

- inquirer@8.2.4
- pg@8.7.1
- dotenv@10.0.0

## Demo

[![Watch the video](https://example.com/path_to_thumbnail_image.png)](https://example.com/path_to_video.mp4)


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/awesome-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add awesome feature'`).
5. Push to the branch (`git push origin feature/awesome-feature`).
6. Create a new Pull Request.

