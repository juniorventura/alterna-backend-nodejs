import express from "express";
import { getEmployeesController } from "../controllers/employees.controller";

const employeesRoute = express.Router();

employeesRoute.get('/', getEmployeesController);

export default employeesRoute;