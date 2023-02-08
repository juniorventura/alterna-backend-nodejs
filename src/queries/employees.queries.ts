import prisma from "../db.init"

export const getEmployeesQuery = async () => {
    try {
        return await prisma.employees.findMany();
    } catch (error) {
        throw new Error(error as string);
    }
}