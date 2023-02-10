import express from "express";
import { createEmployeeController, getEmployeeByIdController, getEmployeesController } from "../controllers/employees.controller";

const employeesRoute = express.Router();

employeesRoute.get('/', getEmployeesController);

employeesRoute.get('/:id', getEmployeeByIdController);

employeesRoute.post('/', createEmployeeController);

export default employeesRoute;