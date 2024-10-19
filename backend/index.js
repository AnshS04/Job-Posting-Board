require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const companyRoutes = require('./Routes/companyRoutes');
const jobRoutes = require('./Routes/jobRoutes');
const cors = require('cors');

const uri = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');    
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);    
    }
};

connectDB();
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client URL
}));
app.use(express.json());

app.use('/api', companyRoutes);
app.use('/api', jobRoutes);

app.get('/', (req, res) => {
    res.send(`App is running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
