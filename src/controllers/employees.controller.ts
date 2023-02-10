
import { employees } from '@prisma/client';
import { Request, Response } from 'express';
import { AlternaErrorEnum } from '../enums/error.enum';
import { createEmployee, getEmployeeById, getEmployees } from '../services/employees.service';
import { CustomError } from '../utils/errorHandler.util';

export const getEmployeesController = async (_: Request, res: Response) => {
    try {
        const employees = await getEmployees();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
}

export const getEmployeeByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const employee = await getEmployeeById(+id);
        res.status(200).send(employee);
    } catch (error) {
        // TODO: Handle different types of errors
        res.status(500).send((error as Error).message);
    }
}

export const createEmployeeController = async (req: Request, res: Response) => {
    try {
        const employeeData = req.body as employees;
        const createdEmployee = await createEmployee(employeeData);
        res.status(201).send(createdEmployee);
    } catch (error) {
        // CustomError instance means that is a bussiness logic error that we are handling
        if (error instanceof CustomError) {
            if (error.name === AlternaErrorEnum.BAD_REQUEST
                || error.name === AlternaErrorEnum.INVALID_VALUE) {
                res.status(400).send(error.message);
            }
        } else {
            res.status(500).send((error as Error).message);
        }
    }
}