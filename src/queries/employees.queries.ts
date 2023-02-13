import { employees, employee_territories } from "@prisma/client";
import prisma from "../db.init"

export const getEmployeesQuery = async () => {
    try {
        return await prisma.employees.findMany();
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getEmployeesQueryRaw = async () => {
    try {
        return await prisma.$queryRaw`select em.last_name, em.first_name, em.employee_id, count(ord.order_id) from employees em
join orders ord on em.employee_id = ord.employee_id
group by em.employee_id, em.first_name, em.last_name
having count(ord.order_id) > 100
order by em.last_name`;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getEmployeeByIdQuery = async (id: number) => {
    try {
        return await prisma.employees.findUnique({
            where: {
                employee_id: id
            }
        });
    } catch (error) {
        throw new Error(error as string);
    }
}

export const createEmployeeQuery = async (employee: employees) => {
    try {
        return await prisma.employees.create({
            data: employee
        });
    } catch (error) {
        throw new Error(error as string);
    }
}

export const updateEmployeeQuery = async (employee: employees) => {
    try {
        const employeeId = employee.employee_id;
        const data = {...employee} as any;
        delete data.employee_id;
        
        return await prisma.employees.update({
            where: {
                employee_id: employeeId
            },
            data
        });
    } catch (error) {
        throw new Error(error as string);
    }
}

export const existEmployeeWithFirstNameAndLastName = async (lastName: string, firstName: string) => {
    try {
        return await prisma.employees.findFirst({
            where: {
                last_name: lastName,
                AND: {
                    first_name: firstName
                }
            }
        });
    } catch (error) {
        throw new Error(error as string);
    }
}

export const deleteEmployeeQuery = async (id: number) => {
    try {
        return await prisma.employees.delete({
            where: {
                employee_id: id
            }
        });
    } catch (error) {
        throw new Error(error as string);
    }
}



