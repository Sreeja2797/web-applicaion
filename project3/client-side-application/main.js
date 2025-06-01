const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4200;

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/users?format=json');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

app.get('/users', (req, res) => {
    res.status(404).send('404 | The page not found');
});

app.listen(PORT, () => {
    console.log(`Client is running on http://localhost:${PORT}/api/users`);
});
