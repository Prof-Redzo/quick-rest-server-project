import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// In-memory database
let cars = [];

// Routes
app.get('/', (req, res) => {
  res.send('Car API is up and running!');
});

app.get('/cars', (req, res) => {
  res.json(cars);
});

app.post('/cars', (req, res) => {
  const car = req.body;
  cars.push(car);
  res.status(201).json(car);
});

app.get('/cars/:id', (req, res) => {
  const id = req.params.id;
  const car = cars.find(car => car.id === id);
  if (!car) {
    res.status(404).send('Car not found');
  } else {
    res.json(car);
  }
});

app.put('/cars/:id', (req, res) => {
  const id = req.params.id;
  const updatedCar = req.body;
  const index = cars.findIndex(car => car.id === id);
  if (index === -1) {
    res.status(404).send('Car not found');
  } else {
    cars[index] = updatedCar;
    res.json(updatedCar);
  }
});

app.delete('/cars/:id', (req, res) => {
  const id = req.params.id;
  const index = cars.findIndex(car => car.id === id);
  if (index === -1) {
    res.status(404).send('Car not found');
  } else {
    const deletedCar = cars.splice(index, 1)[0];
    res.json(deletedCar);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});