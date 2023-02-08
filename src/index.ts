import express from 'express';

// Create instance of express js
const app = express();

// set config to use JSON format for the api
app.use(express.json());

const PORT = 3000;

// req = request (the incoming request with params)
// res = response (the result that is returned)
// HTTP GET
app.get('/ping', (req, res) => {
    res.send('pong updated');
});

// Return all cars, with a in-memery collection

const carsArray = [
    {
        id: 1, brand: "toyota"
    },
    {
        id: 2, brand: "honda"
    },
    {
        id: 3, brand: "nissan"
    },
    {
        id: 4, brand: "mazda"
    }
]

// Return all cars

app.get('/api/cars', (_, res) => {
    res.send(carsArray);
});

// Return a given car by id

app.get('/api/cars/:id', (req, res) => {

    const id = req.params.id;
    const { id: carId } = req.params;

    const carFound = carsArray.filter(x => x.id === +id);

    res.send(carFound);
});



// Set the port for the express server, also a callback, a function that is executed when the server initilizes.
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

