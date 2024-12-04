const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require('express-jwt');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/final_project';
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://142.93.3.229',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define Schema and Models
const summarySchema = new mongoose.Schema({
    label: { type: String, required: true },
    data: { type: Number, required: true },
  });
const Summary = mongoose.model('Summary', summarySchema, 'summary');

const reportSchema = new mongoose.Schema({
    category: { type: String, required: true },
    cost: { type: Number, required: true },
  });
const Report = mongoose.model('Report', reportSchema, 'report');

const reactAppBuildDir = path.resolve('/var/www/final-project-T72/t72-react/build');
app.use(express.static(reactAppBuildDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secret = 'my_secret_key';
const jwtMW = exjwt({
    secret: secret,
    algorithms: ['HS256']
});

// Define the API calls that gets the data
app.get('/api/summary', async (req, res) => {
    try {
        const summaryData = await Summary.find();
        const chartData = {
            labels: summaryData.map(item => item.label),
            datasets: [
            {
                data: summaryData.map(item => item.data),
                backgroundColor: ['#4d5791', '#b0b7d6', 'e0e4f3', '#f2a3c7', '#2c3e6d'],
                borderColor: ['#4d5791', '#b0b7d6', 'e0e4f3', '#f2a3c7', '#2c3e6d'],
                borderWidth: 1,
            },
            ],
        };
        // Send the formatted chart data as JSON
        res.json(chartData);
        } catch (err) {
        console.error('Error fetching chart data:', err);
        res.status(500).json({ message: 'Server error' });
        }
    });

app.get('/api/report', async (req, res) => {
    try {
        const reportData = await Report.find();
        const reportChartData = {
            labels: reportData.map(item => item.category),
            datasets: [
            {
                data: reportData.map(item => item.cost),
                backgroundColor: ['#1a237e', '#4d79a1', '#607d8b', '#ff9800', '#e91e63', '#8bc34a', '#c2185b'],
                borderColor: ['#1a237e', '#4d79a1', '#607d8b', '#ff9800', '#e91e63', '#8bc34a', '#c2185b'],
                borderWidth: 1,
            },
            ],
        };
        // Send the formatted chart data as JSON
        res.json(reportChartData);
        } catch (err) {
        console.error('Error fetching chart data:', err);
        res.status(500).json({ message: 'Server error' });
        }
});

//Hardcoded user credentials - move to database later w encrypted password
let users = [
    {
        id: 1,
        username: 'taylor',
        password: 'taylor'
    }
];

//login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (user && user.password === password) {
        let token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });

        res.json({
            success: true,
            token,
            err: null
        });
    } else {
        res.status(401).json({
            success: false,
            token: null,
            err: 'Invalid login credentials'
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppBuildDir, 'index.html'));
  });

//handle unauthorized users
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            success: false,
            officialError: err,
            err: 'Invalid Token'
        });
    }
    else {
        next(err);
    }
});

//start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serving on port ${PORT}`);
});