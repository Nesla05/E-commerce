const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', username, password); 
    try {
        const user = await User.findOne({ username, password });
        console.log('User found:', user); 
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



app.get('/ecom', (req, res) => {
    res.send('Welcome to the E-commerce site!');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
