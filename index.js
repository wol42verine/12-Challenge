const inquirer = require('inquirer');
const db = require('./db');

const mainMenu = async () => {
  try {
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
          'Update an Employee Manager',
          'View Employees by Manager',
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
      case 'Update an Employee Manager':
        await updateEmployeeManager();
        break;
      case 'View Employees by Manager':
        await viewEmployeesByManager();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }
    mainMenu(); // Call the menu again to allow for continuous interaction
  } catch (err) {
    console.error('Error in main menu:', err);
    process.exit(1); // Exit process with error status
  }
};

// Implement functions to handle each action
const viewAllDepartments = async () => {
  try {
    const departments = await db.getAllDepartments();
    console.table(departments);
  } catch (err) {
    console.error('Error viewing departments:', err);
  }
};

const viewAllRoles = async () => {
  try {
    const roles = await db.getAllRoles();
    console.table(roles);
  } catch (err) {
    console.error('Error viewing roles:', err);
  }
};

const viewAllEmployees = async () => {
  try {
    const employees = await db.getAllEmployees();
    console.table(employees);
  } catch (err) {
    console.error('Error viewing employees:', err);
  }
};

const addDepartment = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the department name:',
        validate: input => input ? true : 'Department name cannot be empty'
      },
    ]);
    await db.addDepartment(answers.name);
    console.log('Department added successfully!\n');
  } catch (err) {
    console.error('Error adding department:', err);
  }
};

const addRole = async () => {
  try {
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

    if (departmentChoices.length === 0) {
      console.log('No departments found. Please add departments first.');
      return;
    }

    const answers = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the role title:',
        validate: input => input ? true : 'Role title cannot be empty'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the role salary:',
        validate: input => isNaN(input) ? 'Salary must be a number' : true
      },
      {
        name: 'department_id',
        type: 'list',
        message: 'Select the department:',
        choices: departmentChoices
      },
    ]);

    await db.addRole(answers.title, answers.salary, answers.department_id);
    console.log('Role added successfully!\n');
  } catch (err) {
    console.error('Error adding role:', err);
  }
};

const addEmployee = async () => {
  try {
    const roles = await db.getAllRoles();
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    const employees = await db.getAllEmployees();
    const managerChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    managerChoices.unshift({ name: 'None', value: null });

    const answers = await inquirer.prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter the first name:',
        validate: input => input ? true : 'First name cannot be empty'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter the last name:',
        validate: input => input ? true : 'Last name cannot be empty'
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'Select the role:',
        choices: roleChoices
      },
      {
        name: 'manager_id',
        type: 'list',
        message: 'Select the manager:',
        choices: managerChoices
      },
    ]);

    await db.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
    console.log('Employee added successfully!\n');
  } catch (err) {
    console.error('Error adding employee:', err);
  }
};

const updateEmployeeRole = async () => {
  try {
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const roles = await db.getAllRoles();
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    const answers = await inquirer.prompt([
      {
        name: 'employee_id',
        type: 'list',
        message: 'Select the employee:',
        choices: employeeChoices
      },
      {
        name: 'role_id',
        type: 'list',
        message: 'Select the new role:',
        choices: roleChoices
      },
    ]);

    await db.updateEmployeeRole(answers.employee_id, answers.role_id);
    console.log('Employee role updated successfully!\n');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
};

const updateEmployeeManager = async () => {
  try {
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    const managerChoices = [...employeeChoices];
    managerChoices.unshift({ name: 'None', value: null });

    const answers = await inquirer.prompt([
      {
        name: 'employee_id',
        type: 'list',
        message: 'Select the employee:',
        choices: employeeChoices
      },
      {
        name: 'manager_id',
        type: 'list',
        message: 'Select the new manager:',
        choices: managerChoices
      },
    ]);

    await db.updateEmployeeManager(answers.employee_id, answers.manager_id);
    console.log('Employee manager updated successfully!\n');
  } catch (err) {
    console.error('Error updating employee manager:', err);
  }
};

const viewEmployeesByManager = async () => {
  try {
    const employees = await db.getAllEmployees();
    const managerChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const answers = await inquirer.prompt([
      {
        name: 'manager_id',
        type: 'list',
        message: 'Select the manager:',
        choices: managerChoices
      },
    ]);

    const employeesByManager = await db.getEmployeesByManager(answers.manager_id);
    console.table(employeesByManager);
  } catch (err) {
    console.error('Error viewing employees by manager:', err);
  }
};

mainMenu();
