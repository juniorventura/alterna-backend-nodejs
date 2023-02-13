
import { employees } from '@prisma/client';
import { Request, Response } from 'express';
import { AlternaErrorEnum } from '../enums/error.enum';
import { createEmployee, deleteEmployeeById, getEmployeeById, getEmployees, updateEmployees } from '../services/employees.service';
import { CustomError } from '../utils/errorHandler.util';

const errorHandler = (error: unknown, res: Response) => {
     // CustomError instance means that is a bussiness logic error that we are handling
     if (error instanceof CustomError) {
        if (error.name === AlternaErrorEnum.BAD_REQUEST
            || error.name === AlternaErrorEnum.INVALID_VALUE) {
            res.status(400).send(error.message);
        }
    } else {
        errorHandler(error, res);
    }
}

export const getEmployeesController = async (_: Request, res: Response) => {
    try {
        const employees = await getEmployees();
        res.status(200).send(employees);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const getEmployeeByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const employee = await getEmployeeById(+id);
        res.status(200).send(employee);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const createEmployeeController = async (req: Request, res: Response) => {
    try {
        const employeeData = req.body as employees;
        const createdEmployee = await createEmployee(employeeData);
        res.status(201).send(createdEmployee);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const updateEmployeeController = async (req: Request, res: Response) => {
    try {
        const employeeData = req.body as employees;
        console.log(employeeData)
        const updatedEmployee = await updateEmployees(employeeData);
        res.status(200).send(updatedEmployee);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const deleteEmployeeController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await deleteEmployeeById(+id);
        res.status(200).send(deletedEmployee);
    } catch (error) {
        errorHandler(error, res);
    }
}