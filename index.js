const express = require('express');
const morgan = require('morgan'); //used as logger for HTTP request
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const app = express();

const PORT = 3005;

const limiter = rateLimit({ // i will allow only maximum 5 request from an IP within 2 minutes
    windowMs: 2*60*1000, //= 120000 ms
    max: 5
});

app.use(morgan('combined'));
app.use(limiter);

app.use('/bookingservice', async (req, res, next) => {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token not found'
        });
    }

    try {
        const response = await axios.get('http://localhost:3001/api/v1/isAuthenticated',
            {
                headers: {
                    'x-access-token': token
                },
                timeout: 5000 //How long axios should wait for response before failing
            }
        );

        console.log(response.data);

        if (response.data.success === true) {
            return next();
        }

        return res.status(401).json({
            success: false,
            message: 'Unauthorised'
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorised in Catch'
        });
    }
});

app.use('/bookingservice', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true
}));

app.get('/home',(req,res) => {
    return res.json({message:"Ok"});
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});