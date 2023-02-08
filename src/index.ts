import express from 'express';
import employeesRoute from './routes/employees.routes';

// Create instance of express js
const app = express();

// set config to use JSON format for the api
app.use(express.json());

const PORT = 3000;

// Return all cars, with a in-memery collection

// Return all cars

app.use('/api/employees', employeesRoute)

// Set the port for the express server, also a callback, a function that is executed when the server initilizes.
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

