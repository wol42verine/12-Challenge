const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const query = (text, params) => pool.query(text, params);

const getAllDepartments = async () => {
  const res = await query('SELECT * FROM departments');
  return res.rows;
};

const getAllRoles = async () => {
  const res = await query('SELECT * FROM roles');
  return res.rows;
};

const getAllEmployees = async () => {
  const res = await query('SELECT * FROM employees');
  return res.rows;
};

const addDepartment = async (name) => {
  const res = await query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [name]);
  return res.rows[0];
};

const addRole = async (title, salary, department_id) => {
  const res = await query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
  return res.rows[0];
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  const res = await query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
  return res.rows[0];
};

const updateEmployeeRole = async (employee_id, role_id) => {
  const res = await query('UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, employee_id]);
  return res.rows[0];
};

module.exports = {
  query,
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
