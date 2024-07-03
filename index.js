const inquirer = require('inquirer');
const db = require('./db');

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ],
    },
  ]);

  switch (answers.action) {
    case 'View All Departments':
      await viewAllDepartments();
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add a Department':
      await addDepartment();
      break;
    case 'Add a Role':
      await addRole();
      break;
    case 'Add an Employee':
      await addEmployee();
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }
  mainMenu(); // Call the menu again to allow for continuous interaction
};

// Implement functions to handle each action
const viewAllDepartments = async () => {
  const departments = await db.getAllDepartments();
  console.log(departments);
};

const viewAllRoles = async () => {
  const roles = await db.getAllRoles();
  console.log(roles);
};

const viewAllEmployees = async () => {
  const employees = await db.getAllEmployees();
  console.log(employees);
};

const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Enter the department name:',
    },
  ]);
  await db.addDepartment(answers.name);
};

const addRole = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the role title:',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the role salary:',
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID:',
    },
  ]);
  await db.addRole(answers.title, answers.salary, answers.department_id);
};

const addEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name:',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name:',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID:',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID (optional):',
      default: null,
    },
  ]);
  await db.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
};

const updateEmployeeRole = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the employee ID:',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID:',
    },
  ]);
  await db.updateEmployeeRole(answers.employee_id, answers.role_id);
};

mainMenu();
