const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 4000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Proxy route
app.post('/api/proxy', async (req, res) => {
    const { appKey, authToken, worldId } = req.body;

    try {
        const response = await axios.get(`https://www.worldanvil.com/api/external/boromir/world/${worldId}?granularity=1`, {
            headers: {
                'appKey': appKey,
                'authToken': authToken
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
