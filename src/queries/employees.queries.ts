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


