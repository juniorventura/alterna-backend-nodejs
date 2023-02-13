import express from "express";
import { createEmployeeController, deleteEmployeeController, getEmployeeByIdController, getEmployeesController, updateEmployeeController } from "../controllers/employees.controller";

const employeesRoute = express.Router();

employeesRoute.get('/', getEmployeesController);

employeesRoute.get('/:id', getEmployeeByIdController);

employeesRoute.post('/', createEmployeeController);

employeesRoute.put('/', updateEmployeeController);

employeesRoute.delete('/:id', deleteEmployeeController);

export default employeesRoute;