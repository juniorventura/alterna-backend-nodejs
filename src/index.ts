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

// Set the port for the express server, also a callback, a function that is executed when the server initilizes.
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

